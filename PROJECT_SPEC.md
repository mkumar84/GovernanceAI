# Product Requirements Document
## Canada Life AI & ML Governance Command Centre
### Version 1.0 | May 2026

---

**Author:** Mahesh Kumar, Lead Product Owner — GenAI Products, RBC Insurance  
**Status:** Prototype / Portfolio Demonstration  
**Classification:** Public — Portfolio Project  
**Last Updated:** May 2026

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Regulatory Context](#3-regulatory-context)
4. [Target Users](#4-target-users)
5. [Product Goals & Success Metrics](#5-product-goals--success-metrics)
6. [Functional Requirements](#6-functional-requirements)
7. [Non-Functional Requirements](#7-non-functional-requirements)
8. [Multi-Agent Architecture](#8-multi-agent-architecture)
9. [Assessment Module Specifications](#9-assessment-module-specifications)
10. [Scoring & Rating Methodology](#10-scoring--rating-methodology)
11. [UI/UX Principles](#11-uiux-principles)
12. [Data Model](#12-data-model)
13. [Roadmap](#13-roadmap)
14. [Risks & Mitigations](#14-risks--mitigations)
15. [Disclaimer](#15-disclaimer)

---

## 1. Executive Summary

The Canada Life AI & ML Governance Command Centre is a first-level governance platform that enables any product, risk, or technical role to register an AI/ML product, complete a multi-dimensional risk assessment grounded in Canadian regulatory requirements, and receive an AI-generated Governance Readiness Score with detailed plain-language rationale and remediation guidance.

The platform acts as a structured **pre-screen gate** before AI/ML products proceed to formal governance committees — reducing committee preparation burden, improving consistency of risk assessment, and creating a persistent registry of all AI/ML in flight.

It is built on a **multi-agent RAG architecture** using the Anthropic API, with six specialist agents each grounded in a domain-specific slice of the Canadian regulatory corpus (OSFI E-23, B-10, B-13, PIPEDA, Quebec Law 25, Treasury Board Directive on Automated Decision-Making, CLHIA AI Principles).

---

## 2. Problem Statement

### 2.1 The Governance Gap at Canadian Life Insurers

Canadian life and health insurers are accelerating AI/ML adoption across underwriting, claims adjudication, fraud detection, and customer experience — but governance infrastructure has not kept pace. The OSFI-FCAC Joint Report (September 2024) explicitly identified that **risk management is consistently lagging behind the speed of AI deployment** at federally regulated financial institutions.

Publicly observable gaps at Canada Life / Great-West Lifeco include:

| Gap | Evidence | Regulatory Risk |
|-----|----------|----------------|
| No public AI use case inventory | Only 2 documented AI outcomes (Evident AI Index, 2024) vs. Sun Life (8+), Manulife (6+) | OSFI E-23 — mandatory model inventory |
| No evidence of algorithmic impact assessment process | No public AIA documentation or framework disclosure | Treasury Board Directive on ADM; OSFI E-23 |
| No AI employee training program | Rated below Manulife and Sun Life on AI talent development (Evident Index) | OSFI-FCAC recommendation; CLHIA principles |
| No third-party AI vendor governance framework | CLHIA/Shift Technology fraud detection used without public governance disclosure | OSFI B-10, B-13 |
| No structured model monitoring / drift framework | Most common gap flagged by OSFI-FCAC Joint Report | OSFI E-23 lifecycle requirements |

### 2.2 The Current Process Problem

Without a standardized first-level review tool, AI/ML governance at large insurers typically suffers from:

- **Inconsistent intake** — different teams use different templates (or none) for describing AI products to risk committees
- **Over-burdened committees** — AI Working Groups and Risk Councils spend time on basic compliance screening that should happen earlier
- **No persistent registry** — no single source of truth for what AI/ML is in flight, who owns it, and what its risk posture is
- **Reactive, not proactive** — issues are discovered at committee stage rather than at product inception
- **Siloed assessment** — model risk teams assess model risk; cyber teams assess cyber risk; no tool connects them into a holistic view

### 2.3 The Opportunity

A lightweight, role-agnostic first-level governance tool that:
- Takes 20–30 minutes to complete
- Is grounded in actual Canadian regulation (not generic frameworks)
- Produces a structured, explainable output ready for committee submission
- Acts as a persistent registry across the AI/ML portfolio
- Gets smarter as it accumulates assessment data

---

## 3. Regulatory Context

### 3.1 Primary Regulatory Obligations

**OSFI Guideline E-23 — Model Risk Management (Updated September 2025)**
- Applies to all FRFIs including Canada Life (subsidiary of Great-West Lifeco)
- Requires: model inventory, independent validation, ongoing monitoring, human override for customer-facing decisions
- September 2025 update explicitly extends to GenAI/LLMs: hallucination risk, prompt injection, output consistency

**OSFI Guideline B-13 — Technology and Cyber Risk**
- AI/ML systems are explicitly in scope as technology risk
- Requires: adversarial input controls, role-based access, AI-specific incident response, third-party vendor security standards

**OSFI Guideline B-10 — Outsourcing and Operational Risk**
- Third-party AI tools (e.g., vendor fraud detection models) — FRFI remains fully accountable
- Requires: data governance terms, audit rights, exit provisions in vendor contracts
- Business continuity and disaster recovery must include AI-dependent workflows

**PIPEDA — Personal Information Protection and Electronic Documents Act**
- Principle 4.3 (Consent): meaningful consent for use of personal data in AI training and inference
- Principle 4.5 (Data Minimization): personal data limited to what is necessary; retention schedules enforced
- Principle 4.9 (Transparency): individuals must understand how AI influences decisions about them

**Quebec Law 25 (Bill 64)**
- Section 12.1: right to be informed of fully automated decisions; right to request human review
- Section 63.1: mandatory Privacy Impact Assessment (PIA) before any AI project using personal data

**Treasury Board — Directive on Automated Decision-Making**
- Sets the Canadian standard for Algorithmic Impact Assessment (AIA)
- Classifies automated decision systems into 4 impact tiers; higher tiers require stricter oversight
- Best practice standard adopted by OSFI and privacy regulators for financial institutions

**CLHIA — AI Principles for Life & Health Insurers**
- Fairness and non-discrimination: no discriminatory outcomes based on protected characteristics (Canadian Human Rights Act)
- Explainability: plain-language explanation of AI-driven adverse decisions to policyholders

### 3.2 Regulatory Trajectory

The regulatory environment is tightening:
- AIDA (Artificial Intelligence and Data Act) did not proceed when Parliament was prorogued in January 2025, but its core concepts (risk-based classification, human oversight, accountability) continue to influence Canadian regulatory thinking
- Canada's first Minister of AI and Digital Innovation (Evan Solomon) appointed May 2025
- AI Strategy Task Force consulting on Canada's next national AI strategy — expected 2026
- OSFI E-23 update (September 2025) signals ongoing regulatory evolution — institutions that build governance infrastructure now will be better positioned

---

## 4. Target Users

### Primary User — AI/ML Product Owner
**Profile:** Responsible for an AI/ML product or initiative. May be a Product Owner, Product Manager, or technical lead. Wants to understand the governance requirements for their product and get ahead of committee review.

**Needs:**
- Clear, jargon-light guidance on what regulators expect
- A structured way to document their product's governance posture
- Actionable feedback on gaps, not just a score
- A report they can bring to a committee without starting from scratch

**Pain points:** Doesn't know which regulations apply to their specific product type. Has to chase multiple teams (model risk, privacy, cyber) for separate assessments. No single artifact to bring to committee.

### Secondary User — Risk / Compliance Reviewer
**Profile:** Model Risk Manager, Privacy Officer, CISO, or Compliance Analyst. Reviews AI products on behalf of a governance committee.

**Needs:**
- Consistent intake format across all products
- Risk-tiered prioritization (focus on red/amber first)
- Evidence trail for regulatory examination
- Portfolio view of all AI/ML in flight

### Tertiary User — Senior Leader / Committee Member
**Profile:** VP, CRO, Chief AI Officer, or AI Working Group member. Needs a high-level view without wading through technical detail.

**Needs:**
- Executive summary and governance gate recommendation
- Portfolio-level risk heat map
- Confidence that a structured first-level review has occurred

---

## 5. Product Goals & Success Metrics

### Goals
1. **Reduce governance committee preparation time** by providing a structured, regulation-grounded first-level assessment artifact
2. **Create a persistent AI/ML product registry** as a single source of truth
3. **Improve consistency** of risk assessment across different product teams and business lines
4. **Enable proactive governance** by surfacing gaps at product inception rather than committee stage
5. **Demonstrate AI governance as a platform capability** — scalable across the enterprise

### Success Metrics (Prototype)

| Metric | Target |
|--------|--------|
| Time to complete full assessment | ≤ 30 minutes |
| Regulatory coverage | 8 Canadian frameworks / guidelines |
| Assessment modules | 6 risk dimensions |
| AI agents | 6 specialist + 1 orchestrator |
| Governance readiness score accuracy | Validated against OSFI E-23 checklist |
| Report usefulness (demo feedback) | Qualitatively: "I could submit this to a committee" |

---

## 6. Functional Requirements

### 6.1 Product Registry (P0 — Must Have)

| ID | Requirement |
|----|-------------|
| REG-01 | User can register a new AI/ML product via a structured intake form |
| REG-02 | System auto-classifies risk tier (Low / Medium / High / Critical) based on: automated decisions flag + affects customers flag + data types |
| REG-03 | Registry persists across sessions in Supabase |
| REG-04 | Product cards display: name, type, business line, stage, risk tier, overall score (if assessed), last assessed date |
| REG-05 | Portfolio dashboard shows aggregate stats: total products, assessments complete, red risk items, pending review |
| REG-06 | User can filter portfolio by business line, risk rating, deployment stage |
| REG-07 | Each product links to its most recent assessment report |

### 6.2 Multi-Module Assessment (P0 — Must Have)

| ID | Requirement |
|----|-------------|
| ASS-01 | Assessment covers 6 risk modules: AIA, Model Risk, Privacy, Data Risk, Cybersecurity, IT/Operational Risk |
| ASS-02 | Each module contains 6–7 questions with dropdown answer options |
| ASS-03 | Each question shows a "Why this matters" expandable hint citing the relevant regulation in plain language |
| ASS-04 | User can complete modules in any order; progress is saved automatically |
| ASS-05 | "Run Assessment" triggers the multi-agent scoring process |
| ASS-06 | Loading state shows which agent is currently running (named progress steps) |
| ASS-07 | Assessment results are saved to Supabase on completion |
| ASS-08 | User can re-run assessment after updating answers |

### 6.3 AI-Powered Scoring & Rationale (P0 — Must Have)

| ID | Requirement |
|----|-------------|
| SCO-01 | Each module produces a score (0–100) and risk rating (green / amber / red) |
| SCO-02 | Composite Governance Readiness Score is a weighted average of 6 module scores |
| SCO-03 | Each module score is accompanied by a 2-sentence plain-language summary |
| SCO-04 | Each question produces a detailed rationale: finding, implication, regulation cited, remediation steps with urgency |
| SCO-05 | Orchestrator produces an executive summary (3–4 sentences) for senior audience |
| SCO-06 | System recommends a governance gate: Approved / Proceed with Conditions / Hold / Escalate |
| SCO-07 | Priority actions table: action | suggested owner | urgency (Immediate / 30-day / 90-day) |

### 6.4 Governance Report (P0 — Must Have)

| ID | Requirement |
|----|-------------|
| RPT-01 | Report displays: product name, date, composite score ring, risk rating badge, governance gate |
| RPT-02 | Radar chart shows all 6 module scores simultaneously (Recharts RadarChart) |
| RPT-03 | Executive summary displayed prominently before module detail |
| RPT-04 | Module breakdown displayed as accordion — collapsed by default, expandable |
| RPT-05 | Question rationales displayed as 4-step stepper (Answer → Finding → Regulation → Remediation) |
| RPT-06 | Priority actions table clearly separated from diagnostic detail |
| RPT-07 | All cited regulatory sources listed at bottom of report |
| RPT-08 | Disclaimer block displayed on report |
| RPT-09 | Report is exportable as PDF |

### 6.5 Knowledge Base (P1 — Should Have)

| ID | Requirement |
|----|-------------|
| KB-01 | All 22 regulatory corpus chunks are browsable and searchable |
| KB-02 | Search filters by domain (Model Risk, Privacy, Cybersecurity, IT Risk, AIA, Data Risk) |
| KB-03 | Each chunk displays: source, title, full text, domain tag |
| KB-04 | User can upload PDF policy documents (Canada Life internal policies, additional regulatory guidance) |
| KB-05 | Uploaded documents are stored in Supabase and available as additional RAG context |
| KB-06 | Uploaded documents appear in a separate "Your Documents" section |

### 6.6 Non-Functional (P0)

| ID | Requirement |
|----|-------------|
| NF-01 | Anthropic API key stored as environment secret (never in code) |
| NF-02 | All 6 specialist agents run in parallel (Promise.all) — assessment completes in ≤ 60 seconds |
| NF-03 | App is responsive and usable on desktop and tablet |
| NF-04 | All data persists in Supabase across sessions |
| NF-05 | Graceful error handling if Anthropic API call fails — display error message and allow retry |
| NF-06 | Disclaimer displayed in footer on all pages and on report cover |

---

## 7. Non-Functional Requirements

### 7.1 Performance
- Full 6-agent assessment completes in under 60 seconds (parallel execution)
- Page load under 3 seconds on standard broadband
- Supabase queries return in under 1 second for portfolio dashboard

### 7.2 Security
- Anthropic API key stored as environment variable — never exposed in client-side code logs
- Supabase Row Level Security enabled for production deployment
- No personal health information (PHI) or real customer data used in the prototype

### 7.3 Accessibility
- WCAG 2.1 AA compliant colour contrast ratios
- All interactive elements keyboard navigable
- Screen reader compatible labels on all form fields

### 7.4 Browser Support
- Chrome 120+, Firefox 120+, Safari 17+, Edge 120+

---

## 8. Multi-Agent Architecture

### 8.1 Agent Roles

```
User Assessment Answers
        │
        ▼
┌───────────────────┐
│  Orchestrator     │  ← Dispatches all agents, aggregates results,
│  Agent            │    computes composite score, generates executive
└─────────┬─────────┘    summary + governance gate recommendation
          │
    ┌─────┴──────────────────────────────────────┐
    │ Promise.all — 6 agents run simultaneously  │
    └──────┬───────┬──────┬──────┬───────┬───────┘
           │       │      │      │       │
           ▼       ▼      ▼      ▼       ▼
         AIA    Model  Privacy  Data  Cyber   IT Risk
        Agent   Risk   Agent   Risk  Agent   Agent
               Agent          Agent
           │       │      │      │       │
           └───────┴──────┴──────┴───────┘
                          │
               ┌──────────▼──────────┐
               │    RAG Agent        │
               │  Keyword retrieval  │
               │  from corpus        │
               └──────────┬──────────┘
                          │
               ┌──────────▼──────────┐
               │  Regulatory Corpus  │
               │  (22 chunks) +      │
               │  User uploads       │
               └─────────────────────┘
```

### 8.2 RAG Implementation

**No external vector database required.** The corpus is small enough (22 chunks, ~8,000 tokens total) that keyword overlap scoring is sufficient and avoids infrastructure complexity.

**Retrieval algorithm:**
1. Each agent passes a domain filter (e.g., `domain === "model_risk"`) and a set of keywords
2. Each corpus chunk is scored by counting keyword overlaps (case-insensitive, partial match)
3. Top 5 chunks by score are selected and formatted as RAG context
4. RAG context is injected into the agent's system prompt before the user prompt

**User document uploads:**
- PDFs are uploaded to Supabase Storage
- Text is extracted client-side and stored in the `documents` table
- On assessment, user document text is appended to RAG context if domain matches

### 8.3 Agent Prompt Structure

Each specialist agent uses:
```
System: Base governance expert persona + domain-specific focus + JSON-only output instruction
User:   [RAG context] + [Product profile] + [Assessment answers] + [JSON schema]
```

The orchestrator uses:
```
System: Chief AI Governance Officer persona + synthesis instruction + JSON-only output
User:   [RAG context] + [All 6 module results] + [Composite score] + [JSON schema]
```

### 8.4 Module Weights (Composite Score)

| Module | Weight | Rationale |
|--------|--------|-----------|
| AIA — Algorithmic Impact | 20% | Highest regulatory exposure — customer-facing automated decisions |
| Model Risk | 20% | OSFI E-23 is the primary regulatory anchor for AI at FRFIs |
| Privacy | 18% | PIPEDA + Quebec Law 25 = dual federal/provincial exposure |
| Data Risk | 15% | Foundation for model quality — upstream of model risk |
| Cybersecurity | 12% | OSFI B-13 in scope; AI-specific attack surface growing |
| IT / Operational | 10% | OSFI B-10 — important but lower regulatory specificity to AI |
| Intake Completeness | 5% | Bonus for complete product registration (improves data quality) |

---

## 9. Assessment Module Specifications

### Module 1 — Algorithmic Impact Assessment (AIA)
**Regulatory anchor:** Treasury Board Directive on Automated Decision-Making; CLHIA AI Principles; Canadian Human Rights Act  
**Questions:** 6  
**Key areas:** Automated decision scope, bias assessment, explainability, human override, formal AIA completion, appeal mechanism

### Module 2 — Model Risk Assessment
**Regulatory anchor:** OSFI Guideline E-23 (updated September 2025)  
**Questions:** 7  
**Key areas:** Independent validation, model inventory registration, OSFI risk tier assignment, drift monitoring, model documentation, GenAI/LLM hallucination risk, revalidation schedule

### Module 3 — Privacy Risk Assessment
**Regulatory anchor:** PIPEDA (Principles 4.3, 4.5, 4.9); Quebec Law 25 (s.12.1, s.63.1)  
**Questions:** 6  
**Key areas:** PIA completion, legal basis for data use, data minimization, Quebec Law 25 compliance, retention/deletion schedules, third-party data sharing agreements

### Module 4 — Data Risk Assessment
**Regulatory anchor:** OSFI E-23; OSFI-FCAC Joint Report (September 2024)  
**Questions:** 6  
**Key areas:** Data lineage documentation, data quality validation, third-party data governance, dataset representativeness, data drift detection, access controls on training data

### Module 5 — Cybersecurity Risk
**Regulatory anchor:** OSFI Guideline B-13; OSFI E-23 (September 2025 update — GenAI risks)  
**Questions:** 6  
**Key areas:** AI-specific cyber risk assessment, adversarial input protection, MFA + RBAC enforcement, encryption, AI incident response plan, third-party vendor security contracts

### Module 6 — IT / Operational Risk
**Regulatory anchor:** OSFI Guideline B-10  
**Questions:** 6  
**Key areas:** BCP/DR inclusion, RTO/RPO definition and testing, rollback/failover mechanisms, SDLC and change management, version control and audit trail, production monitoring

---

## 10. Scoring & Rating Methodology

### 10.1 Question-Level Scoring
Each question has a defined `scoringGuide` mapping each answer option to a score (0–100). Scores are determined by regulatory compliance level:
- **100** = Fully compliant / documented and enforced
- **75–90** = Substantially compliant with minor gaps
- **40–60** = Partially compliant / informal practice only
- **0–30** = Non-compliant or not assessed

### 10.2 Module Score
Each module score is the weighted average of its question scores (question weights defined per module to reflect relative regulatory importance).

### 10.3 Composite Governance Readiness Score
Weighted average of 6 module scores + intake completeness bonus (max 5 points).

### 10.4 Risk Rating Thresholds

| Score | Rating | Label | Interpretation |
|-------|--------|-------|----------------|
| 75–100 | 🟢 Green | Low Risk | Governance requirements substantially met |
| 45–74 | 🟡 Amber | Moderate Risk | Material gaps — remediation required before full approval |
| 0–44 | 🔴 Red | High Risk | Critical gaps — escalation recommended |

### 10.5 Governance Gate Logic

| Condition | Gate Recommendation |
|-----------|-------------------|
| Composite ≥ 75, no module < 60 | Approved to Proceed |
| Composite 55–74, or 1–2 modules < 60 | Proceed with Conditions |
| Composite 35–54, or any module < 40 | Hold — Remediation Required |
| Composite < 35, or AIA / Model Risk < 30 | Escalate to Risk Council |

---

## 11. UI/UX Principles

### 11.1 Design Philosophy
**Minimalistic and human-centric.** Every element earns its place. The primary user is doing a governance task — not browsing a marketing site. The interface should feel calm, trustworthy, and efficient.

### 11.2 Progressive Disclosure
The single most important UX principle for this tool. Detailed rationale is always available but never forced on the user. The hierarchy is:
1. Score ring + key strength + key gap (always visible — 10 seconds to scan)
2. Module summary (2 sentences — expandable)
3. Question-by-question findings (accordion — expandable)
4. Remediation steps (expandable within each finding)

### 11.3 Typography
- **Headings:** Playfair Display — authoritative, professional, Canada Life marketing adjacent
- **Body / UI:** Source Sans 3 — clean, readable, accessible

### 11.4 Color Usage
- **Navy (#1B2A4A):** Primary — headers, navigation, key UI elements
- **Red (#C41230):** Accent only — CTAs, Canada Life brand reference
- **Fog (#F7F8FA):** Background — creates breathing room
- **Green / Amber / Red:** Risk status indicators only — never decorative

### 11.5 What Not To Do
- No data tables for rationale display — use steppers and cards
- No information wall on first view — lead with score and summary
- No jargon without explanation — every regulation reference has a plain-language note
- No dark backgrounds — financial services professional = light, clean
- No purple gradients — this is not a startup landing page

---

## 12. Data Model

### Products Table
```sql
create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text,                          -- GenAI, ML Classification, etc.
  business_line text,                 -- Group Benefits, Individual Insurance, etc.
  deployment_stage text,              -- POC, Pilot, Production, etc.
  affected_customers boolean,         -- Direct customer impact flag
  automated_decisions boolean,        -- Automated decision flag (key risk signal)
  third_party boolean,                -- Third-party vendor tool flag
  data_types text[],                  -- Array of data types used
  owner text,
  owner_email text,
  review_date date,
  description text,
  risk_tier text,                     -- Auto-computed: Low/Medium/High/Critical
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

### Assessments Table
```sql
create table assessments (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  status text default 'draft',        -- draft | complete | submitted
  answers jsonb default '{}',         -- { aia: {...}, model_risk: {...}, ... }
  results jsonb default '{}',         -- { aia: {score, rationales...}, ... }
  composite_score integer,            -- 0–100
  overall_rating text,                -- green | amber | red
  overall_tier text,                  -- Low | Medium | High | Critical
  governance_gate text,               -- approved_to_proceed | proceed_with_conditions | ...
  completed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

### Documents Table
```sql
create table documents (
  id uuid primary key default gen_random_uuid(),
  name text,
  file_url text,                      -- Supabase Storage URL
  extracted_text text,                -- Full text for RAG retrieval
  domain text,                        -- Optional: tag to a specific risk domain
  uploaded_at timestamptz default now()
);
```

---

## 13. Roadmap

### Version 1.0 — Prototype (Current)
- ✅ 6-module assessment with multi-agent RAG scoring
- ✅ Governance Readiness Score + gate recommendation
- ✅ Detailed question-level rationale with regulation citations
- ✅ Portfolio dashboard
- ✅ Regulatory knowledge base (22 chunks)
- ✅ PDF report export
- ✅ Document upload for extended RAG context

### Version 1.5 — Enhanced Prototype
- [ ] Re-assessment tracking — show score change over time per product
- [ ] Comparison view — benchmark a product against portfolio average
- [ ] Email notification for upcoming review dates
- [ ] Remediation tracking — mark actions as complete, re-score automatically
- [ ] Expanded regulatory corpus (AIDA concepts, provincial human rights codes)

### Version 2.0 — Enterprise MVP
- [ ] Role-based access (Submitter / Reviewer / Approver)
- [ ] Approval workflow with digital sign-off per module
- [ ] Integration with JIRA / ServiceNow for remediation action tracking
- [ ] Model inventory API — connect to enterprise model registry
- [ ] OSFI examination readiness report — formatted for regulatory submission
- [ ] Audit trail — full log of all assessment activity
- [ ] Multi-institution configuration (white-label for other FRFIs)

---

## 14. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| AI agent returns invalid JSON | Medium | High — breaks assessment | Robust try/catch; fallback to static score with error message |
| Anthropic API rate limiting | Low | Medium — slow assessment | Retry logic with exponential backoff; parallel agents reduce per-call load |
| Regulatory corpus becomes outdated | Medium | Medium — incorrect guidance | Version-controlled corpus with dated chunks; note "accurate as of May 2026" |
| User misinterprets score as official compliance | Medium | High — regulatory risk | Prominent disclaimer; "first-level review only" language throughout |
| Supabase data loss | Low | High — registry lost | Regular Supabase backups; export to CSV available |
| Browser API key exposure | Low | High — security risk | Key in env secrets only; `anthropic-dangerous-direct-browser-access` header required and understood |

---

## 15. Disclaimer

This tool is a prototype developed by **Mahesh Kumar** for demonstration and portfolio purposes only. It is not a substitute for formal legal, regulatory, or risk management advice. AI governance assessments produced by this tool should be reviewed by qualified compliance, legal, and model risk professionals before use in any official approval process.

Regulatory references are based on publicly available guidance accurate as of May 2026. Users should verify all regulatory content against current OSFI, PIPEDA, Treasury Board, and CLHIA publications before relying on any guidance in this tool.

Canada Life and Great-West Lifeco are referenced for contextual and illustrative purposes only. This prototype is not affiliated with, endorsed by, or representative of Canada Life Assurance Company, Great-West Lifeco Inc., or any of their subsidiaries.

---

*Canada Life AI Governance Command Centre — Portfolio Project 5*  
*Mahesh Kumar | github.com/mkumar84 | May 2026*
