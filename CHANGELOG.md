# Changelog
## Canada Life AI & ML Governance Command Centre

All notable changes to this project are documented here.  
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.0.0] — May 2026 — Initial Prototype Release

### Added
- **Product Registry** — structured intake form for AI/ML products with auto risk-tier classification
- **6-Module Assessment** — Algorithmic Impact, Model Risk, Privacy, Data Risk, Cybersecurity, IT/Operational
- **Multi-Agent RAG Architecture** — 6 specialist agents + orchestrator, running in parallel via Anthropic API
- **22-Chunk Regulatory Corpus** — OSFI E-23, B-10, B-13, PIPEDA, Quebec Law 25, Treasury Board Directive on ADM, OSFI-FCAC Joint Report, CLHIA AI Principles
- **Governance Readiness Score** — weighted composite 0–100 with Green / Amber / Red rating
- **4-Level Governance Gate** — Approved / Proceed with Conditions / Hold / Escalate to Risk Council
- **Plain-Language Rationale** — per-question findings, regulation citations, remediation steps with urgency
- **Executive Summary** — AI-generated 3–4 sentence senior leader summary
- **Portfolio Dashboard** — all registered products, aggregate stats, filter by business line / risk / stage
- **Governance Report** — radar chart, score rings, accordion module breakdown, priority actions table
- **PDF Export** — report exportable via jsPDF + html2canvas
- **Knowledge Base** — searchable regulatory corpus, filterable by domain
- **Document Upload** — PDF upload extends RAG context with organization-specific policy docs
- **Prototype Disclaimer** — displayed on all pages and report cover

### Regulatory Coverage (v1.0)
- OSFI Guideline E-23 (updated September 2025) — Model Risk
- OSFI Guideline B-13 — Cybersecurity
- OSFI Guideline B-10 — Operational Risk / Outsourcing
- OSFI-FCAC Joint Report on AI Uses and Risks (September 2024)
- PIPEDA — Principles 4.3, 4.5, 4.9
- Quebec Law 25 — Sections 12.1 and 63.1
- Treasury Board Directive on Automated Decision-Making
- CLHIA AI Principles for Life & Health Insurers

---

## [Planned] 1.5.0 — Enhanced Prototype

### Planned
- Re-assessment score tracking — show score delta over time
- Remediation action tracker — mark actions complete, trigger re-score
- Portfolio benchmarking — compare product score to portfolio average
- Email notifications for upcoming review dates
- Expanded regulatory corpus — AIDA concepts, provincial human rights codes
- Improved PDF layout — cover page, table of contents

---

## [Planned] 2.0.0 — Enterprise MVP

### Planned
- Role-based access control (Submitter / Reviewer / Approver)
- Digital sign-off workflow per module
- JIRA / ServiceNow integration for remediation tracking
- Model inventory API connection
- OSFI examination readiness report format
- Full audit trail
- Supabase pgvector upgrade for semantic RAG
- Backend proxy for Anthropic API (production security)

---

*Maintained by Mahesh Kumar | github.com/mkumar84*
