# Canada Life AI & ML Governance Command Centre

> **A first-level AI governance intake, risk scoring, and reporting platform for federally regulated Canadian insurers.**

[![Portfolio](https://img.shields.io/badge/Portfolio-AI%20PM-1B2A4A?style=flat-square)](https://github.com/mkumar84)
[![Status](https://img.shields.io/badge/Status-Prototype-C41230?style=flat-square)]()
[![Regulation](https://img.shields.io/badge/Regulation-OSFI%20E--23%20%7C%20PIPEDA%20%7C%20Quebec%20Law%2025-227D52?style=flat-square)]()
[![Built With](https://img.shields.io/badge/Built%20With-React%20%7C%20Claude%20API%20%7C%20Supabase-0891B2?style=flat-square)]()

---

## Overview

This prototype addresses a critical gap in AI governance at Canadian life and health insurers: the absence of a structured, regulation-aware first-level review process before AI/ML products reach formal governance committees (Model Risk, Risk Council, AI Working Group).

Built to demonstrate **AI governance as a platform capability** — not a compliance checklist — the tool enables any role (Product Owner, Risk Manager, Data Scientist) to register an AI/ML product, complete a multi-dimensional risk assessment grounded in Canadian regulatory requirements, and receive an AI-generated governance readiness score with detailed, plain-language rationale and remediation guidance.

> **Portfolio Project 5** | Mahesh Kumar — Lead Product Owner, GenAI Products @ RBC Insurance  
> M.Mgmt (AI), Queen's Smith School of Business

---

## The Problem This Solves

Canadian life and health insurers face a compounding governance challenge:

- **OSFI Guideline E-23** (updated September 2025) now explicitly covers GenAI and LLMs, requiring model inventories, independent validation, drift monitoring, and hallucination risk assessment
- **OSFI/FCAC Joint Report (September 2024)** flagged that risk management is consistently lagging AI adoption, and that siloed governance (model risk only, or cyber only) creates dangerous gaps
- **PIPEDA and Quebec Law 25** require Privacy Impact Assessments and the right to explanation for automated decisions affecting individuals
- The **Evident AI Index** found that Great-West Lifeco (Canada Life's parent) showed no evidence of AI employee training programs — while peers Manulife and Sun Life were ranked among top insurers for AI talent development
- Most Canadian insurers have **no standardized first-level AI governance gate** before products reach formal risk committees — creating bottlenecks, inconsistent review quality, and regulatory exposure

This tool is that missing first gate.

---

## Key Features

### 🗂️ AI/ML Product Registry
Structured intake for any AI/ML system — GenAI, ML models, third-party AI tools, agentic systems. Auto-classifies risk tier based on whether the system makes automated decisions, affects customers, and uses personal data.

### 🤖 Multi-Agent Risk Assessment (7 Dimensions)
Six specialist AI agents run in parallel via the Anthropic API, each grounded in a Canadian regulatory RAG corpus:

| Module | Regulation Anchor | Weight |
|--------|------------------|--------|
| Algorithmic Impact Assessment | Treasury Board Directive on ADM; CLHIA AI Principles | 20% |
| Model Risk | OSFI Guideline E-23 (updated Sep 2025) | 20% |
| Privacy Risk | PIPEDA; Quebec Law 25 | 18% |
| Data Risk | OSFI E-23; OSFI-FCAC Joint Report | 15% |
| Cybersecurity Risk | OSFI Guideline B-13 | 12% |
| IT / Operational Risk | OSFI Guideline B-10 | 10% |

An **Orchestrator Agent** aggregates results, computes a weighted composite Governance Readiness Score, and generates an executive summary with a governance gate recommendation.

### 📊 Governance Readiness Score
- **Composite score (0–100)** with weighted module contributions
- **Risk rating:** Green (75–100) / Amber (45–74) / Red (0–44)
- **Governance gate:** Approved to Proceed / Proceed with Conditions / Hold — Remediation Required / Escalate to Risk Council

### 📝 Detailed, Plain-Language Rationale
Every score is explained — not just a number. Each question produces:
- What the answer means for governance
- Why it matters / what could go wrong
- The specific regulation triggered (OSFI E-23 s.X, PIPEDA Principle 4.3, etc.)
- Concrete remediation steps with urgency (Immediate / 30-day / 90-day)

Displayed as a **4-step progressive disclosure stepper** — clean, not crowded.

### 📚 Regulatory Knowledge Base
22-chunk Canadian regulatory corpus (OSFI E-23, B-10, B-13, PIPEDA, Quebec Law 25, Treasury Board Directive on ADM, OSFI-FCAC Joint Report, CLHIA AI Principles) — searchable and browsable. Users can upload additional policy documents (PDF) to extend the RAG context.

### 📄 Governance Report & PDF Export
Print-ready assessment report with radar chart, executive summary, module breakdown, priority actions table, and regulatory citations. Exportable as PDF for submission to governance committees.

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    React Frontend                        │
│            (Vite + Tailwind + shadcn/ui)                 │
│   Dashboard | Registry | Assessment | Report | KB        │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                 Orchestrator Agent                        │
│   Routes → aggregates → scores → executive summary       │
└──┬──────┬────────┬──────────┬──────────┬────────────────┘
   │      │        │          │          │
   ▼      ▼        ▼          ▼          ▼
  AIA  Model    Privacy    Data      Cyber    IT Risk
Agent  Risk     Agent      Risk      Agent    Agent
       Agent               Agent
   │      │        │          │          │
   └──────┴────────┴──────────┴──────────┘
                       │
         ┌─────────────▼─────────────┐
         │    RAG Agent              │
         │  Keyword retrieval from   │
         │  22-chunk regulatory      │
         │  corpus + user uploads    │
         └───────────────────────────┘
                       │
         ┌─────────────▼─────────────┐
         │  Anthropic API            │
         │  claude-sonnet-4-20250514 │
         └───────────────────────────┘
                       │
         ┌─────────────▼─────────────┐
         │  Supabase                 │
         │  products | assessments   │
         │  documents                │
         └───────────────────────────┘
```

### Multi-Agent RAG Flow
1. User completes assessment answers across 6 modules
2. Orchestrator dispatches 6 specialist agents in **parallel** (`Promise.all`)
3. Each agent retrieves the top 5 relevant regulatory chunks via **keyword overlap scoring** against the 22-chunk corpus
4. Agent builds a grounded prompt (RAG context + product profile + answers) and calls Claude
5. Claude returns structured JSON: score, rationale, regulation citations, remediation steps
6. Orchestrator computes **weighted composite score** and calls Claude once more for executive summary + governance gate
7. Results saved to Supabase; report rendered with progressive disclosure UI

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend Framework | React + Vite |
| Styling | Tailwind CSS + shadcn/ui |
| State Management | React useState + useReducer |
| Database | Supabase (PostgreSQL) |
| AI / Agents | Anthropic API — `claude-sonnet-4-20250514` |
| RAG | Custom keyword retrieval — no external vector DB |
| Charts | Recharts (Radar + Bar) |
| PDF Export | jsPDF + html2canvas |
| Icons | lucide-react |
| Fonts | Playfair Display + Source Sans 3 |
| Hosting | Lovable (lovable.app) |

---

## Project Structure

```
src/
├── agents/
│   ├── orchestratorAgent.js      # Routes, aggregates, executive summary
│   ├── specialistAgents.js       # 6 specialist AI agents
│   └── ragAgent.js               # Keyword retrieval + corpus search
├── knowledge/
│   ├── regulatoryCorpus.js       # 22-chunk Canadian regulatory RAG corpus
│   └── assessmentQuestions.js    # 6 module question banks + scoring guides
├── components/
│   ├── layout/                   # Navbar, sidebar
│   ├── dashboard/                # Portfolio cards, heat map
│   ├── intake/                   # Product registration form
│   ├── assessment/               # Module tabs, score gauges, explanation UI
│   ├── report/                   # Governance report, radar chart, PDF export
│   └── knowledge/                # Knowledge base, document uploader
├── pages/
│   ├── Dashboard.jsx             # Portfolio overview
│   ├── NewProduct.jsx            # Product intake / registry
│   ├── Assess.jsx                # 6-module assessment
│   ├── Report.jsx                # Governance readiness report
│   └── KnowledgeBase.jsx         # Regulatory reference + doc upload
└── lib/
    ├── anthropicClient.js        # Anthropic API wrapper
    ├── supabaseClient.js         # Supabase client
    └── constants.js              # Design tokens, risk config, disclaimer
```

---

## Regulatory Coverage

| Regulation | Domain | Key Requirements Assessed |
|------------|--------|--------------------------|
| OSFI Guideline E-23 (Sep 2025) | Model Risk | Validation, inventory, drift monitoring, GenAI/LLM governance |
| OSFI Guideline B-13 | Cybersecurity | Adversarial inputs, access controls, AI incident response |
| OSFI Guideline B-10 | Operational Risk | BCP/DR, RTO/RPO, third-party AI accountability |
| OSFI-FCAC Joint Report (Sep 2024) | AI Risk | Transverse risk framework, data governance gaps |
| PIPEDA (Principles 4.3, 4.5, 4.9) | Privacy | Consent, data minimization, automated decision transparency |
| Quebec Law 25 (s.12.1, s.63.1) | Privacy | Right to explanation, mandatory PIA |
| Treasury Board Directive on ADM | AIA | Algorithmic Impact Assessment, impact tiers I–IV |
| CLHIA AI Principles | Fairness | Non-discrimination, explainability for insurance decisions |

---

## Governance Gap Context — Canada Life / Great-West Lifeco

This prototype was designed in response to publicly observable governance gaps at Canada Life (Great-West Lifeco):

1. **No public AI use case inventory** — only 2 documented AI outcomes per the Evident AI Index vs. peers
2. **No evidence of algorithmic impact assessment process** — required by OSFI E-23 and the Treasury Board Directive
3. **No AI employee training program** — rated below Manulife and Sun Life on AI talent development
4. **No public third-party AI vendor governance framework** — despite using Shift Technology for fraud detection (CLHIA program)
5. **No structured model monitoring / drift framework** — flagged as the most common gap by OSFI-FCAC

This tool directly addresses all five gaps as a single integrated platform.

---

## Getting Started

### Prerequisites
- Node.js 18+
- Supabase account (free tier sufficient)
- Anthropic API key

### Environment Variables
```env
VITE_ANTHROPIC_API_KEY=your_anthropic_key_here
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Setup
Run the SQL in `docs/schema.sql` in your Supabase SQL Editor.

### Installation
```bash
npm install
npm run dev
```

---

## Disclaimer

This tool is a prototype developed by **Mahesh Kumar** for demonstration and portfolio purposes only. It is not a substitute for formal legal, regulatory, or risk management advice. AI governance assessments produced by this tool should be reviewed by qualified compliance, legal, and model risk professionals before use in any official approval process. Regulatory references are accurate as of May 2026 but should be verified against current OSFI, PIPEDA, and Treasury Board guidance. Canada Life and Great-West Lifeco are referenced for contextual purposes only. This prototype is not affiliated with, endorsed by, or representative of Canada Life or Great-West Lifeco Inc.

---

## About the Author

**Mahesh Kumar**  
Lead Product Owner — GenAI Products, RBC Insurance  
M.Mgmt (AI), Queen's University Smith School of Business | MBA, University of Aberdeen

Targeting Director-level AI Product and Enablement roles at Canadian financial institutions.

🔗 [GitHub Portfolio](https://github.com/mkumar84) · [LinkedIn](https://linkedin.com/in/maheshkumar-ai)

---

*Part of the Mahesh Kumar AI PM Portfolio — 5 production-grade GenAI systems demonstrating end-to-end AI product thinking.*
