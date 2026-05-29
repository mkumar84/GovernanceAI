# Architecture Decision Record
## Canada Life AI Governance Command Centre
### Multi-Agent RAG System Design

---

## Overview

This document explains the architectural decisions behind the multi-agent RAG (Retrieval-Augmented Generation) system that powers the assessment engine.

---

## Why Multi-Agent?

A single LLM call with all 6 assessment modules in one prompt would produce:
- **Lower quality output** — models perform better on focused, domain-specific tasks
- **Mixed regulatory grounding** — a single RAG context would dilute regulatory precision across domains
- **Slower iteration** — any change to one module's logic requires re-testing everything
- **No parallelism** — sequential processing would be 6x slower

Six specialist agents, each expert in one regulatory domain and running in parallel, produce better scores, cleaner rationale, and more accurate regulation citations.

---

## Agent Architecture

```
User Answers
    │
    ▼
Orchestrator Agent
    │
    ├── AIA Agent          ──┐
    ├── Model Risk Agent   ──┤
    ├── Privacy Agent      ──┼── Promise.all (parallel)
    ├── Data Risk Agent    ──┤
    ├── Cyber Risk Agent   ──┤
    └── IT Risk Agent      ──┘
              │
              ▼
    Orchestrator aggregates
    ─ Weighted composite score
    ─ Executive summary
    ─ Governance gate
              │
              ▼
         Results → Supabase → Report UI
```

---

## RAG Implementation Decision

### Why no vector database?

The regulatory corpus contains 22 chunks totalling approximately 8,000 tokens. At this scale:
- **Vector DB is unnecessary overhead** — Pinecone, Weaviate, etc. add infrastructure complexity with no meaningful retrieval quality improvement over keyword scoring at this corpus size
- **Keyword overlap scoring is deterministic and debuggable** — easier to understand why a chunk was retrieved
- **Corpus updates are simple** — add a new object to the JavaScript array; no embedding re-run required
- **Zero cost** — no vector DB API calls or storage costs

### Retrieval Algorithm

```javascript
// Keyword overlap scoring
const scored = corpus
  .filter(chunk => chunk.domain === targetDomain)
  .map(chunk => {
    const overlap = queryKeywords.filter(k =>
      chunk.keywords.some(ck =>
        ck.toLowerCase().includes(k.toLowerCase()) ||
        k.toLowerCase().includes(ck.toLowerCase())
      )
    ).length;
    return { ...chunk, score: overlap };
  })
  .sort((a, b) => b.score - a.score)
  .slice(0, topK);
```

Top 5 chunks per agent are selected, formatted, and injected into the agent prompt.

### When would we upgrade to a vector DB?

- Corpus grows beyond ~100 chunks
- User-uploaded documents become the primary knowledge source (PDFs with complex layout)
- Semantic similarity matters more than keyword matching (e.g., regulatory question answering across domains)

At that point: **Supabase pgvector** is the natural upgrade path given Supabase is already in the stack.

---

## Prompt Design

### System Prompt Structure
```
[1] Expert persona definition
    "You are a Canadian AI governance expert specializing in [domain]
     for federally regulated financial institutions..."

[2] Regulatory domain focus
    "You are assessing the [DOMAIN] dimension — covering [specific areas]..."

[3] Output constraint
    "Respond ONLY in valid JSON — no preamble, no markdown, no explanation
     outside the JSON."

[4] Audience calibration
    "Write for a Product Owner audience — clear, not overly legalistic."
```

### User Prompt Structure
```
[1] RAG context
    "REGULATORY CONTEXT:
    [Source] Title
    Text..."

[2] Product profile
    "PRODUCT PROFILE:
    Name: X | Type: Y | Business Line: Z..."

[3] Assessment answers
    "ASSESSMENT ANSWERS — [Module]:
    Q: [question]
    A: [answer]
    Regulation: [regulation anchor]"

[4] Output schema
    "Return a JSON object with this exact structure: {...}"
```

### Why explicit JSON schema in prompt?
Claude reliably returns valid JSON when:
1. The system prompt says "ONLY valid JSON — no preamble, no markdown"
2. The user prompt includes the exact JSON structure expected
3. A `parseClaudeJSON()` wrapper strips any accidental markdown fences

---

## Scoring Design

### Module Weight Rationale

Weights are not arbitrary — they reflect the relative regulatory exposure for a Canadian FRFI:

| Module | Weight | Primary Driver |
|--------|--------|---------------|
| AIA | 20% | Customer-facing automated decisions carry the highest reputational and regulatory risk (Quebec Law 25 + CLHIA = two regulators watching) |
| Model Risk | 20% | OSFI E-23 is the primary AI regulation for FRFIs — non-compliance is an examination finding |
| Privacy | 18% | PIPEDA + Quebec Law 25 = dual exposure; Privacy Commissioner enforcement is active |
| Data Risk | 15% | Data quality is upstream of model quality; OSFI-FCAC flagged as top gap |
| Cybersecurity | 12% | B-13 is important but AI-specific cyber risk is still emerging in regulatory focus |
| IT/Ops | 10% | B-10 covers outsourcing accountability — real risk but lower AI-specificity |
| Intake bonus | 5% | Rewards complete product documentation — improves registry data quality |

### Composite Score Formula
```javascript
composite = Math.min(100, Math.round(
  aia.score        * 0.20 +
  model_risk.score * 0.20 +
  privacy.score    * 0.18 +
  data_risk.score  * 0.15 +
  cyber.score      * 0.12 +
  it_risk.score    * 0.10 +
  intakeBonusScore(product)  // max 5 points
));
```

---

## Error Handling Strategy

### Agent Failure
If a specialist agent call fails (network error, API rate limit, malformed JSON):
```javascript
try {
  return parseClaudeJSON(raw);
} catch {
  return {
    score: 0,
    riskRating: "red",
    summary: "Assessment could not be completed for this module. Please retry.",
    questionRationales: [],
    topRisks: ["Assessment incomplete — manual review required"],
    citedSources: []
  };
}
```
The orchestrator continues with the failed module scored at 0 — ensuring the user gets a result (conservative/red) rather than a broken experience.

### Orchestrator Failure
If the orchestrator's executive summary call fails, the UI falls back to:
- Displaying individual module scores and summaries
- Showing a static governance gate based purely on composite score thresholds
- Flagging that the executive summary is unavailable

---

## Data Flow

```
1. User fills intake form
   → Product saved to Supabase products table
   → Risk tier auto-computed

2. User completes 6 assessment modules
   → Answers saved to Supabase assessments.answers (jsonb)
   → Answers structured as: { aia: {q1: "answer", ...}, model_risk: {...}, ... }

3. User clicks "Run Assessment"
   → orchestratorAgent.runFullAssessment(product, answers) called
   → 6 specialist agents dispatched via Promise.all
   → Each agent: retrieves RAG chunks → builds prompt → calls Claude → parses JSON
   → Orchestrator: receives all 6 results → computes composite → calls Claude for summary
   → Total API calls: 7 (6 specialist + 1 orchestrator)

4. Results returned
   → Saved to Supabase assessments.results (jsonb)
   → composite_score, overall_rating, governance_gate saved as top-level fields
   → UI routes to report page

5. Report rendered
   → Data read from Supabase
   → Radar chart: 6 module scores from results
   → Score rings: per module from results
   → Rationale: question-by-question from results.aia.questionRationales, etc.
   → PDF export: html2canvas + jsPDF on report DOM element
```

---

## Security Considerations

### API Key Handling
- Anthropic API key stored as `VITE_ANTHROPIC_API_KEY` in Lovable Secrets (environment variable)
- Never committed to source code or logs
- Browser-side API calls require `anthropic-dangerous-direct-browser-access: true` header — this is intentional for browser-hosted prototypes; production would route through a backend proxy

### Data Privacy
- No real customer data or PHI is processed in the prototype
- Assessment answers describe a product's governance posture — not customer records
- Supabase RLS (Row Level Security) should be enabled before any production deployment

### Prompt Injection
- User inputs (product descriptions, names) are interpolated into prompts
- Mitigation: field length limits on intake form; Claude is instructed to respond in JSON only (limits instruction-following from injected content)

---

## Future Architecture — Production Path

```
Current (Prototype)                 Production MVP
─────────────────────               ─────────────────────────────
Browser → Anthropic API             Browser → Backend API → Anthropic
Supabase (direct)                   Supabase + RLS + Auth
Keyword RAG                         pgvector semantic RAG
Single user                         Role-based (Submitter/Reviewer/Approver)
Lovable hosting                     Vercel/Railway + custom domain
No audit log                        Full audit trail in Supabase
Static corpus                       Corpus versioned + admin-editable
```

---

*Architecture Decision Record v1.0 | Mahesh Kumar | May 2026*
