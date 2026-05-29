# Contributing & Extending the Tool
## Canada Life AI Governance Command Centre

This document explains how to extend the regulatory corpus, add new assessment modules, and update regulatory references.

---

## Adding Regulatory Chunks to the Corpus

Open `src/knowledge/regulatoryCorpus.js` and add a new object to the array:

```javascript
{
  id: "unique-id-001",          // Unique string ID
  source: "OSFI Guideline X-XX",// Full source name as you want it cited
  domain: "model_risk",          // One of: model_risk | privacy | cybersecurity |
                                 //         it_risk | data_risk | aia
  title: "Short descriptive title",
  text: "The full regulatory text or paraphrase you want agents to use.
         Be specific — agents cite this directly in their rationale.",
  keywords: ["keyword1", "keyword2", "relevant term"]
  // Keywords drive retrieval — include terms users are likely to ask about
}
```

**Tips for good corpus chunks:**
- Keep each chunk to 100–200 words — long chunks dilute relevance
- One regulatory concept per chunk — don't combine two requirements
- Keywords should include both the regulatory jargon AND plain-language equivalents
- Always include the guideline number/section in the `source` field — agents cite it

---

## Adding a New Assessment Module

### Step 1 — Add questions to `assessmentQuestions.js`

```javascript
export const newModuleQuestions = [
  {
    id: "new_q1",
    label: "Your question text here?",
    type: "select",
    weight: 20,                              // Weights across questions should sum to 100
    regulation: "Regulation Name — Section", // Shown as hint to user
    options: ["Option A", "Option B", "Option C"],
    scoringGuide: {
      "Option A": 100,   // Score 0–100 per answer
      "Option B": 50,
      "Option C": 0
    }
  }
  // ... more questions
];
```

### Step 2 — Add module config to `MODULE_CONFIG` in `assessmentQuestions.js`

```javascript
{
  id: "new_module",
  label: "Module Display Name",
  shortLabel: "Short",
  icon: "IconName",              // lucide-react icon name
  weight: 0.XX,                  // Adjust all module weights to still sum to ~0.95
  domain: "new_domain",          // Must match corpus chunk domains
  questions: newModuleQuestions,
  color: "#HEX",
  regulation: "Primary regulation anchor",
  description: "One sentence describing what this module assesses."
}
```

### Step 3 — Create a specialist agent in `specialistAgents.js`

Copy the pattern from any existing agent (e.g., `aiaAgent`) and update:
- The keywords array (drives RAG retrieval)
- The domain filter in `retrieveChunks()`
- The system prompt focus description
- The user prompt label

### Step 4 — Register the agent in `orchestratorAgent.js`

Add the new agent to the `Promise.all` call and update the `WEIGHTS` object (ensure weights still sum to 1.0).

---

## Updating Regulatory References

When a regulation is updated (e.g., OSFI issues a new guideline version):

1. **Update the corpus chunk** — edit `regulatoryCorpus.js`:
   - Update the `source` field to include the new version/date
   - Update the `text` to reflect the new requirement
   - Keep the same `id` so existing assessments reference it consistently

2. **Update the CHANGELOG** — add the regulatory update to `CHANGELOG.md`

3. **Update the README** — update the regulatory coverage table

4. **Note the date** — add a comment in the corpus chunk: `// Updated: [Month Year]`

---

## Updating the Disclaimer Date

The disclaimer text in `src/lib/constants.js` includes "accurate as of [date]". Update this when regulatory content is refreshed:

```javascript
export const DISCLAIMER = `... Regulatory references are accurate as of [NEW DATE]...`;
```

---

## Code Style

- JavaScript (not TypeScript) for agent files — keeps Lovable compatibility
- Async/await for all agent calls
- All agent functions return the same JSON schema — don't change the schema without updating all consumers
- Comments on all non-obvious logic

---

*Canada Life AI Governance Command Centre | github.com/mkumar84*
