// ─────────────────────────────────────────────────────────────
// MODULE 1 — Product Intake / Registry
// ─────────────────────────────────────────────────────────────
export const intakeFields = [
  { id: "name", label: "Product / Model Name", type: "text", required: true,
    helpText: "The official name of the AI/ML product or model being registered." },
  { id: "type", label: "Product Type", type: "select", required: true,
    helpText: "Select the category that best describes this AI/ML system.",
    options: [
      "Generative AI (LLM)",
      "ML Classification Model",
      "ML Regression Model",
      "Recommendation Engine",
      "Anomaly Detection",
      "NLP / Text Analytics",
      "Computer Vision",
      "Third-Party AI Tool",
      "Agentic / Multi-Agent System",
      "Other"
    ]
  },
  { id: "businessLine", label: "Business Line", type: "select", required: true,
    helpText: "The Canada Life business line that owns or primarily uses this system.",
    options: [
      "Group Benefits",
      "Individual Insurance",
      "Wealth Management",
      "Reinsurance",
      "Customer Experience",
      "Fraud & Risk",
      "Internal Operations",
      "IT / Technology",
      "Other"
    ]
  },
  { id: "deploymentStage", label: "Current Deployment Stage", type: "select", required: true,
    helpText: "Where is this system in its lifecycle right now?",
    options: [
      "Ideation / Concept",
      "Proof of Concept (POC)",
      "Pilot / Limited Deployment",
      "Production",
      "Monitoring / Iteration",
      "Decommissioning"
    ]
  },
  { id: "affectedCustomers", label: "Does this system directly affect customers or policyholders?",
    type: "boolean", required: true,
    helpText: "Include any system that influences a customer-facing decision, communication, or outcome." },
  { id: "automatedDecisions", label: "Does this system make or significantly influence automated decisions about individuals?",
    type: "boolean", required: true,
    helpText: "Examples: claims adjudication, underwriting decisions, benefit eligibility, fraud flags." },
  { id: "thirdParty", label: "Is this a third-party AI tool or vendor-supplied model?",
    type: "boolean", required: true,
    helpText: "Include SaaS AI tools, vendor ML models, and any externally hosted AI capabilities." },
  { id: "dataTypes", label: "Types of data used by this system", type: "multiselect", required: true,
    helpText: "Select all that apply.",
    options: [
      "Personal Health Information (PHI)",
      "Financial Data",
      "Behavioural / Usage Data",
      "Demographic Data",
      "Third-Party Data",
      "Publicly Available Data",
      "Internal Operational Data",
      "Biometric Data",
      "No Personal Data"
    ]
  },
  { id: "owner", label: "Product Owner Name", type: "text", required: true,
    helpText: "The individual accountable for this AI/ML system." },
  { id: "ownerEmail", label: "Product Owner Email", type: "email", required: true,
    helpText: "" },
  { id: "reviewDate", label: "Next Scheduled Review Date", type: "date", required: false,
    helpText: "When is this system next due for governance review?" },
  { id: "description", label: "Brief Description", type: "textarea", required: true,
    helpText: "Describe what this system does, what decisions it supports, and who uses it." }
];

// ─────────────────────────────────────────────────────────────
// MODULE 2 — Algorithmic Impact Assessment (AIA)
// ─────────────────────────────────────────────────────────────
export const aiaQuestions = [
  {
    id: "aia_q1",
    label: "Does this system make or influence decisions that could adversely affect an individual's insurance coverage, claim outcome, or financial standing?",
    type: "select",
    weight: 20,
    regulation: "Treasury Board Directive on ADM — Impact Level Classification",
    options: ["Yes — fully automated decision", "Yes — human-in-the-loop", "No", "Unsure"],
    scoringGuide: { "Yes — fully automated decision": 0, "Yes — human-in-the-loop": 60, "No": 100, "Unsure": 30 }
  },
  {
    id: "aia_q2",
    label: "Has a bias assessment been conducted on the training data and model outputs against protected characteristics (race, sex, age, disability)?",
    type: "select",
    weight: 20,
    regulation: "CLHIA AI Principles — Fairness & Non-Discrimination; Canadian Human Rights Act",
    options: ["Yes — fully documented and repeatable", "In progress", "No", "Not applicable"],
    scoringGuide: { "Yes — fully documented and repeatable": 100, "In progress": 50, "No": 0, "Not applicable": 85 }
  },
  {
    id: "aia_q3",
    label: "Can this system's decision be explained in plain language to the affected individual?",
    type: "select",
    weight: 15,
    regulation: "CLHIA AI Principles — Explainability; Quebec Law 25 s.12.1",
    options: ["Yes — always, with documented explanation template", "Yes — in most cases", "Partially", "No"],
    scoringGuide: { "Yes — always, with documented explanation template": 100, "Yes — in most cases": 70, "Partially": 40, "No": 0 }
  },
  {
    id: "aia_q4",
    label: "Is there a documented and tested human override mechanism for automated decisions?",
    type: "select",
    weight: 20,
    regulation: "OSFI E-23 — Human Override and Escalation",
    options: ["Yes — documented and tested", "Yes — exists but not documented", "No", "Not applicable — no automated decisions"],
    scoringGuide: { "Yes — documented and tested": 100, "Yes — exists but not documented": 50, "No": 0, "Not applicable — no automated decisions": 90 }
  },
  {
    id: "aia_q5",
    label: "Has a formal Algorithmic Impact Assessment (AIA) been completed using a recognized framework?",
    type: "select",
    weight: 15,
    regulation: "Treasury Board — Directive on Automated Decision-Making",
    options: ["Yes — Treasury Board AIA framework", "Yes — internal AIA framework", "No", "Planned within 90 days"],
    scoringGuide: { "Yes — Treasury Board AIA framework": 100, "Yes — internal AIA framework": 80, "No": 0, "Planned within 90 days": 30 }
  },
  {
    id: "aia_q6",
    label: "Is there an appeal or recourse mechanism for individuals adversely affected by an AI-driven decision?",
    type: "select",
    weight: 10,
    regulation: "Treasury Board Directive on ADM — Impact Level IV Requirements",
    options: ["Yes — formal appeal process documented", "Informal process exists", "No", "Not applicable"],
    scoringGuide: { "Yes — formal appeal process documented": 100, "Informal process exists": 50, "No": 0, "Not applicable": 80 }
  }
];

// ─────────────────────────────────────────────────────────────
// MODULE 3 — Privacy Risk Assessment
// ─────────────────────────────────────────────────────────────
export const privacyQuestions = [
  {
    id: "priv_q1",
    label: "Has a Privacy Impact Assessment (PIA) been completed for this AI/ML system?",
    type: "select",
    weight: 20,
    regulation: "Quebec Law 25 — Section 63.1; PIPEDA Best Practices",
    options: ["Yes — completed and documented", "In progress", "No", "Not required (no personal data)"],
    scoringGuide: { "Yes — completed and documented": 100, "In progress": 50, "No": 0, "Not required (no personal data)": 90 }
  },
  {
    id: "priv_q2",
    label: "What is the legal basis for using personal information in this system?",
    type: "select",
    weight: 20,
    regulation: "PIPEDA — Schedule I, Principle 4.3 (Consent)",
    options: ["Explicit consent obtained", "Implied consent (contractual relationship)", "Legal obligation", "Not yet determined"],
    scoringGuide: { "Explicit consent obtained": 100, "Implied consent (contractual relationship)": 75, "Legal obligation": 85, "Not yet determined": 0 }
  },
  {
    id: "priv_q3",
    label: "Is personal information used in model training minimized to what is strictly necessary for the stated purpose?",
    type: "select",
    weight: 15,
    regulation: "PIPEDA — Schedule I, Principle 4.5 (Data Minimization)",
    options: ["Yes — documented and enforced", "Partially — some unnecessary data included", "No", "Under review"],
    scoringGuide: { "Yes — documented and enforced": 100, "Partially — some unnecessary data included": 50, "No": 0, "Under review": 30 }
  },
  {
    id: "priv_q4",
    label: "Does this system process personal information of Quebec residents?",
    type: "select",
    weight: 15,
    regulation: "Quebec Law 25 — Sections 12.1 and 63.1",
    options: ["Yes — Law 25 requirements applied", "Yes — Law 25 requirements not yet applied", "No", "Unsure"],
    scoringGuide: { "Yes — Law 25 requirements applied": 100, "Yes — Law 25 requirements not yet applied": 0, "No": 90, "Unsure": 20 }
  },
  {
    id: "priv_q5",
    label: "Are data retention and deletion schedules defined and enforced for personal data used in this AI system?",
    type: "select",
    weight: 15,
    regulation: "PIPEDA — Schedule I, Principle 4.5",
    options: ["Yes — defined and enforced", "Defined but not consistently enforced", "No", "In progress"],
    scoringGuide: { "Yes — defined and enforced": 100, "Defined but not consistently enforced": 50, "No": 0, "In progress": 25 }
  },
  {
    id: "priv_q6",
    label: "Is personal data shared with third-party AI vendors or cloud providers?",
    type: "select",
    weight: 15,
    regulation: "PIPEDA — Schedule I, Principle 4.1.3; OSFI B-10",
    options: ["Yes — with executed data processing agreements", "Yes — without formal agreements", "No"],
    scoringGuide: { "Yes — with executed data processing agreements": 90, "Yes — without formal agreements": 0, "No": 100 }
  }
];

// ─────────────────────────────────────────────────────────────
// MODULE 4 — Data Risk Assessment
// ─────────────────────────────────────────────────────────────
export const dataRiskQuestions = [
  {
    id: "data_q1",
    label: "Is data lineage documented for all data sources feeding this AI system?",
    type: "select",
    weight: 20,
    regulation: "OSFI-FCAC Joint Report — Data Governance Risks in AI",
    options: ["Yes — fully documented", "Partially documented", "No", "In progress"],
    scoringGuide: { "Yes — fully documented": 100, "Partially documented": 50, "No": 0, "In progress": 25 }
  },
  {
    id: "data_q2",
    label: "Has data quality been formally assessed and validated before model training or deployment?",
    type: "select",
    weight: 20,
    regulation: "OSFI E-23 — Model Validation; OSFI-FCAC Joint Report",
    options: ["Yes — with documented quality checks and thresholds", "Informally assessed", "No"],
    scoringGuide: { "Yes — with documented quality checks and thresholds": 100, "Informally assessed": 40, "No": 0 }
  },
  {
    id: "data_q3",
    label: "Are third-party or external data sources used, and if so, are they governed by formal data agreements?",
    type: "select",
    weight: 20,
    regulation: "OSFI B-10 — Third-Party Risk; OSFI-FCAC Joint Report",
    options: ["Yes — formal data sharing / licensing agreements in place", "Yes — without formal agreements", "No third-party data used"],
    scoringGuide: { "Yes — formal data sharing / licensing agreements in place": 90, "Yes — without formal agreements": 0, "No third-party data used": 100 }
  },
  {
    id: "data_q4",
    label: "Has the training dataset been tested for representativeness across the population the model will serve?",
    type: "select",
    weight: 20,
    regulation: "OSFI E-23 — Model Validation; CLHIA Fairness Principles",
    options: ["Yes — tested and documented", "Believed to be representative but not formally tested", "No", "Not applicable"],
    scoringGuide: { "Yes — tested and documented": 100, "Believed to be representative but not formally tested": 40, "No": 0, "Not applicable": 80 }
  },
  {
    id: "data_q5",
    label: "Is there a process to detect and remediate data drift in production inputs?",
    type: "select",
    weight: 10,
    regulation: "OSFI E-23 — Ongoing Model Monitoring; OSFI-FCAC Joint Report",
    options: ["Yes — automated monitoring with alerting", "Manual periodic checks", "No"],
    scoringGuide: { "Yes — automated monitoring with alerting": 100, "Manual periodic checks": 50, "No": 0 }
  },
  {
    id: "data_q6",
    label: "Are role-based access controls enforced to restrict who can access training data and model outputs?",
    type: "select",
    weight: 10,
    regulation: "OSFI B-13 — Access Controls; PIPEDA Principle 4.7",
    options: ["Yes — RBAC enforced and audited", "Partial controls", "No"],
    scoringGuide: { "Yes — RBAC enforced and audited": 100, "Partial controls": 50, "No": 0 }
  }
];

// ─────────────────────────────────────────────────────────────
// MODULE 5 — Cybersecurity Risk
// ─────────────────────────────────────────────────────────────
export const cyberQuestions = [
  {
    id: "cyber_q1",
    label: "Has a cybersecurity risk assessment been conducted specifically for this AI/ML system?",
    type: "select",
    weight: 20,
    regulation: "OSFI Guideline B-13 — Technology and Cyber Risk Management",
    options: ["Yes — documented and signed off", "In progress", "No"],
    scoringGuide: { "Yes — documented and signed off": 100, "In progress": 40, "No": 0 }
  },
  {
    id: "cyber_q2",
    label: "Is the AI model protected against adversarial inputs or model poisoning attacks?",
    type: "select",
    weight: 20,
    regulation: "OSFI B-13 — AI Attack Surface Management",
    options: ["Yes — controls documented and tested", "Partially addressed", "No", "Not yet assessed"],
    scoringGuide: { "Yes — controls documented and tested": 100, "Partially addressed": 50, "No": 0, "Not yet assessed": 10 }
  },
  {
    id: "cyber_q3",
    label: "Are access controls (MFA + RBAC) enforced for model endpoints, training pipelines, and inference APIs?",
    type: "select",
    weight: 20,
    regulation: "OSFI B-13 — Access Controls for AI Systems",
    options: ["Yes — MFA and RBAC enforced", "Partial controls in place", "No"],
    scoringGuide: { "Yes — MFA and RBAC enforced": 100, "Partial controls in place": 50, "No": 0 }
  },
  {
    id: "cyber_q4",
    label: "Is sensitive data encrypted at rest and in transit throughout the AI system?",
    type: "select",
    weight: 20,
    regulation: "OSFI B-13 — Data Security",
    options: ["Yes — end-to-end encryption enforced", "Partially encrypted", "No"],
    scoringGuide: { "Yes — end-to-end encryption enforced": 100, "Partially encrypted": 40, "No": 0 }
  },
  {
    id: "cyber_q5",
    label: "Is there an AI-specific incident response plan covering model compromise, data breach via AI output, or prompt injection?",
    type: "select",
    weight: 10,
    regulation: "OSFI B-13 — Incident Response; OSFI E-23 (Sep 2025 update — GenAI risks)",
    options: ["Yes — documented and tested", "Covered under general IR plan (not AI-specific)", "No"],
    scoringGuide: { "Yes — documented and tested": 100, "Covered under general IR plan (not AI-specific)": 50, "No": 0 }
  },
  {
    id: "cyber_q6",
    label: "For third-party AI tools: have contractual security standards, audit rights, and incident notification requirements been established?",
    type: "select",
    weight: 10,
    regulation: "OSFI B-13 — Third-Party Technology Risk; OSFI B-10",
    options: ["Yes — contractually established", "In negotiation", "No", "Not applicable — internal system"],
    scoringGuide: { "Yes — contractually established": 100, "In negotiation": 40, "No": 0, "Not applicable — internal system": 90 }
  }
];

// ─────────────────────────────────────────────────────────────
// MODULE 6 — IT / Operational Risk
// ─────────────────────────────────────────────────────────────
export const itRiskQuestions = [
  {
    id: "it_q1",
    label: "Is this AI system included in the organization's Business Continuity and Disaster Recovery plan?",
    type: "select",
    weight: 20,
    regulation: "OSFI Guideline B-10 — Business Continuity for AI Systems",
    options: ["Yes — explicitly included", "Covered under general BCP", "No"],
    scoringGuide: { "Yes — explicitly included": 100, "Covered under general BCP": 60, "No": 0 }
  },
  {
    id: "it_q2",
    label: "Are Recovery Time Objectives (RTO) and Recovery Point Objectives (RPO) defined and tested for this AI system?",
    type: "select",
    weight: 20,
    regulation: "OSFI B-10 — Business Continuity",
    options: ["Yes — defined and tested", "Defined but not tested", "No"],
    scoringGuide: { "Yes — defined and tested": 100, "Defined but not tested": 50, "No": 0 }
  },
  {
    id: "it_q3",
    label: "Is there a rollback or failover mechanism if the AI system produces erroneous or degraded outputs?",
    type: "select",
    weight: 20,
    regulation: "OSFI E-23 — Model Risk Controls; OSFI B-10",
    options: ["Yes — automated failover", "Yes — manual fallback process", "No"],
    scoringGuide: { "Yes — automated failover": 100, "Yes — manual fallback process": 60, "No": 0 }
  },
  {
    id: "it_q4",
    label: "Is the AI system subject to the organization's Software Development Lifecycle (SDLC) and change management process?",
    type: "select",
    weight: 20,
    regulation: "OSFI B-10 — Technology Risk; OSFI B-13",
    options: ["Yes — fully governed by SDLC", "Partially", "No"],
    scoringGuide: { "Yes — fully governed by SDLC": 100, "Partially": 50, "No": 0 }
  },
  {
    id: "it_q5",
    label: "Are model versions and deployments version-controlled and auditable?",
    type: "select",
    weight: 10,
    regulation: "OSFI E-23 — Model Inventory and Audit Trail",
    options: ["Yes — full version control and audit trail", "Partial", "No"],
    scoringGuide: { "Yes — full version control and audit trail": 100, "Partial": 50, "No": 0 }
  },
  {
    id: "it_q6",
    label: "Is there automated monitoring for AI system uptime, latency, and output quality in production?",
    type: "select",
    weight: 10,
    regulation: "OSFI E-23 — Ongoing Monitoring; OSFI-FCAC Joint Report",
    options: ["Yes — automated dashboards with alerting", "Manual monitoring", "No"],
    scoringGuide: { "Yes — automated dashboards with alerting": 100, "Manual monitoring": 40, "No": 0 }
  }
];

// ─────────────────────────────────────────────────────────────
// MODULE 7 — Model Risk Assessment
// ─────────────────────────────────────────────────────────────
export const modelRiskQuestions = [
  {
    id: "mr_q1",
    label: "Has this model been independently validated before deployment?",
    type: "select",
    weight: 20,
    regulation: "OSFI Guideline E-23 — Model Validation Requirements",
    options: ["Yes — by an independent team or party", "Self-validated by the development team", "Not yet validated", "Planned before go-live"],
    scoringGuide: { "Yes — by an independent team or party": 100, "Self-validated by the development team": 40, "Not yet validated": 0, "Planned before go-live": 20 }
  },
  {
    id: "mr_q2",
    label: "Is this model registered in the enterprise model inventory?",
    type: "select",
    weight: 15,
    regulation: "OSFI E-23 — Model Inventory",
    options: ["Yes", "In progress", "No"],
    scoringGuide: { "Yes": 100, "In progress": 30, "No": 0 }
  },
  {
    id: "mr_q3",
    label: "Has the model been assigned an OSFI E-23 risk tier?",
    type: "select",
    weight: 15,
    regulation: "OSFI E-23 — Model Risk Tiering",
    options: ["Yes — Low", "Yes — Medium", "Yes — High", "Yes — Critical", "Not yet tiered"],
    scoringGuide: { "Yes — Low": 100, "Yes — Medium": 100, "Yes — High": 100, "Yes — Critical": 100, "Not yet tiered": 0 }
  },
  {
    id: "mr_q4",
    label: "Is there ongoing automated monitoring for model drift and performance degradation in production?",
    type: "select",
    weight: 20,
    regulation: "OSFI E-23 — Ongoing Monitoring; OSFI-FCAC Joint Report — Risk Management Lag",
    options: ["Yes — automated monitoring with alerting thresholds", "Manual periodic review", "No"],
    scoringGuide: { "Yes — automated monitoring with alerting thresholds": 100, "Manual periodic review": 40, "No": 0 }
  },
  {
    id: "mr_q5",
    label: "Are model assumptions, limitations, and known failure modes documented and communicated to business users?",
    type: "select",
    weight: 15,
    regulation: "OSFI E-23 — Model Documentation",
    options: ["Yes — fully documented and communicated", "Partially documented", "No"],
    scoringGuide: { "Yes — fully documented and communicated": 100, "Partially documented": 50, "No": 0 }
  },
  {
    id: "mr_q6",
    label: "For GenAI / LLM systems: has hallucination risk, output consistency, and prompt injection vulnerability been formally evaluated?",
    type: "select",
    weight: 10,
    regulation: "OSFI E-23 (September 2025 update) — Generative AI and LLM Governance",
    options: ["Yes — with documented benchmarks and controls", "Informally tested", "No", "Not applicable — not a GenAI system"],
    scoringGuide: { "Yes — with documented benchmarks and controls": 100, "Informally tested": 40, "No": 0, "Not applicable — not a GenAI system": 90 }
  },
  {
    id: "mr_q7",
    label: "Is there a defined model revalidation schedule (annual or triggered by material change)?",
    type: "select",
    weight: 5,
    regulation: "OSFI E-23 — Periodic Review",
    options: ["Yes — annual review cycle defined", "Yes — triggered by material change only", "Ad hoc", "No"],
    scoringGuide: { "Yes — annual review cycle defined": 100, "Yes — triggered by material change only": 70, "Ad hoc": 30, "No": 0 }
  }
];

// ─────────────────────────────────────────────────────────────
// MODULE METADATA — used by the assessment shell and scoring agent
// ─────────────────────────────────────────────────────────────
export const MODULE_CONFIG = [
  {
    id: "aia",
    label: "Algorithmic Impact",
    shortLabel: "AIA",
    icon: "Scale",
    weight: 0.20,
    domain: "aia",
    questions: aiaQuestions,
    color: "#7C3AED",
    regulation: "Treasury Board Directive on ADM; CLHIA AI Principles",
    description: "Assesses fairness, explainability, human oversight, and bias risk for AI-driven decisions affecting individuals."
  },
  {
    id: "model_risk",
    label: "Model Risk",
    shortLabel: "Model",
    icon: "BrainCircuit",
    weight: 0.20,
    domain: "model_risk",
    questions: modelRiskQuestions,
    color: "#1B2A4A",
    regulation: "OSFI Guideline E-23 (Updated Sep 2025)",
    description: "Evaluates model validation, inventory registration, drift monitoring, GenAI-specific risks, and revalidation cadence."
  },
  {
    id: "privacy",
    label: "Privacy Risk",
    shortLabel: "Privacy",
    icon: "ShieldCheck",
    weight: 0.18,
    domain: "privacy",
    questions: privacyQuestions,
    color: "#0891B2",
    regulation: "PIPEDA; Quebec Law 25",
    description: "Reviews consent basis, PIA completion, data minimization, Quebec Law 25 obligations, and third-party data sharing."
  },
  {
    id: "data_risk",
    label: "Data Risk",
    shortLabel: "Data",
    icon: "Database",
    weight: 0.15,
    domain: "data_risk",
    questions: dataRiskQuestions,
    color: "#0D9488",
    regulation: "OSFI E-23; OSFI-FCAC Joint Report (Sep 2024)",
    description: "Assesses data lineage, quality validation, representativeness, third-party data governance, and access controls."
  },
  {
    id: "cybersecurity",
    label: "Cybersecurity Risk",
    shortLabel: "Cyber",
    icon: "Lock",
    weight: 0.12,
    domain: "cybersecurity",
    questions: cyberQuestions,
    color: "#DC2626",
    regulation: "OSFI Guideline B-13",
    description: "Covers adversarial attack protection, access controls, encryption, third-party vendor security, and AI incident response."
  },
  {
    id: "it_risk",
    label: "IT / Operational Risk",
    shortLabel: "IT/Ops",
    icon: "Server",
    weight: 0.10,
    domain: "it_risk",
    questions: itRiskQuestions,
    color: "#D97706",
    regulation: "OSFI Guideline B-10",
    description: "Reviews BCP/DR inclusion, RTO/RPO, rollback mechanisms, SDLC adherence, and production monitoring."
  }
];
