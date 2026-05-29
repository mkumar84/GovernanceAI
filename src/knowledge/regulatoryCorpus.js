export const regulatoryCorpus = [

  // ── OSFI E-23 MODEL RISK ──────────────────────────────────────────
  {
    id: "e23-001",
    source: "OSFI Guideline E-23",
    domain: "model_risk",
    title: "Model Risk Management — Scope",
    text: "OSFI Guideline E-23 applies to all federally regulated financial institutions (FRFIs) and covers models used for risk measurement, valuation, financial reporting, and operational decisions — including AI and machine learning models. Institutions must establish a model risk management framework proportionate to their model risk exposure.",
    keywords: ["model risk", "FRFI", "AI", "machine learning", "framework", "E-23"]
  },
  {
    id: "e23-002",
    source: "OSFI Guideline E-23",
    domain: "model_risk",
    title: "Model Validation Requirements",
    text: "All models must undergo independent validation before deployment and on a regular review cycle thereafter. Validation must assess conceptual soundness, data quality, model performance, and limitations. For AI/ML models, validation must include testing for bias, drift, and performance degradation over time.",
    keywords: ["validation", "independent", "bias", "drift", "performance", "deployment"]
  },
  {
    id: "e23-003",
    source: "OSFI Guideline E-23",
    domain: "model_risk",
    title: "Model Inventory",
    text: "FRFIs must maintain a comprehensive inventory of all models, including AI/ML systems, that captures model purpose, owner, risk tier, validation status, and review dates. The inventory must be kept current and available to senior management and the board.",
    keywords: ["inventory", "register", "owner", "tier", "review", "board"]
  },
  {
    id: "e23-004",
    source: "OSFI Guideline E-23",
    domain: "model_risk",
    title: "Human Override and Escalation",
    text: "AI/ML models used in customer-facing decisions must incorporate mechanisms for human review and override. Institutions must document escalation paths for adverse model outputs and ensure that automated decisions can be reviewed, challenged, and reversed by qualified personnel.",
    keywords: ["human override", "escalation", "automated decision", "customer-facing", "review"]
  },
  {
    id: "e23-005",
    source: "OSFI Guideline E-23 (Updated September 2025)",
    domain: "model_risk",
    title: "Generative AI and LLM Governance",
    text: "The September 2025 update to E-23 extends model risk management expectations explicitly to generative AI and large language models (LLMs). Institutions must assess hallucination risk, prompt injection vulnerability, output consistency, and the reliability of LLM-generated content used in any business or regulatory process.",
    keywords: ["generative AI", "LLM", "hallucination", "prompt injection", "GenAI"]
  },

  // ── OSFI B-13 CYBERSECURITY ───────────────────────────────────────
  {
    id: "b13-001",
    source: "OSFI Guideline B-13",
    domain: "cybersecurity",
    title: "Technology and Cyber Risk Management",
    text: "OSFI Guideline B-13 requires FRFIs to manage technology and cyber risks as part of their enterprise risk framework. This includes AI/ML systems, which introduce new attack surfaces including model poisoning, adversarial inputs, and data exfiltration through model outputs.",
    keywords: ["cyber", "technology risk", "model poisoning", "adversarial", "B-13", "attack surface"]
  },
  {
    id: "b13-002",
    source: "OSFI Guideline B-13",
    domain: "cybersecurity",
    title: "Third-Party Technology Risk",
    text: "FRFIs must assess and manage cyber risks introduced by third-party technology providers, including AI/ML vendors. Due diligence must cover data security, access controls, incident response, and contractual rights to audit AI vendor systems.",
    keywords: ["third-party", "vendor", "cyber risk", "access control", "audit", "due diligence"]
  },
  {
    id: "b13-003",
    source: "OSFI Guideline B-13",
    domain: "cybersecurity",
    title: "Access Controls for AI Systems",
    text: "Access to AI/ML model training data, model weights, inference endpoints, and output logs must be governed by role-based access controls, multi-factor authentication, and least-privilege principles. Unauthorized access to AI systems can result in model theft, manipulation, or data breach.",
    keywords: ["access control", "RBAC", "least privilege", "MFA", "inference", "model weights"]
  },

  // ── OSFI B-10 OPERATIONAL RISK ────────────────────────────────────
  {
    id: "b10-001",
    source: "OSFI Guideline B-10",
    domain: "it_risk",
    title: "Outsourcing and Third-Party AI Risk",
    text: "OSFI Guideline B-10 governs outsourcing arrangements at FRFIs. When AI/ML capabilities are sourced from third parties, institutions remain fully accountable for the outcomes produced by those systems. Contracts must include data governance terms, performance standards, audit rights, and exit provisions.",
    keywords: ["outsourcing", "third-party", "accountability", "contract", "B-10", "exit"]
  },
  {
    id: "b10-002",
    source: "OSFI Guideline B-10",
    domain: "it_risk",
    title: "Business Continuity for AI Systems",
    text: "AI/ML systems used in core business processes must be included in business continuity and disaster recovery planning. Institutions must define recovery time objectives (RTO) and recovery point objectives (RPO) for AI-dependent workflows and test continuity plans regularly.",
    keywords: ["business continuity", "disaster recovery", "RTO", "RPO", "continuity", "failover"]
  },

  // ── PIPEDA ────────────────────────────────────────────────────────
  {
    id: "pipeda-001",
    source: "PIPEDA — Schedule I, Principle 4.3",
    domain: "privacy",
    title: "Consent for AI Use of Personal Information",
    text: "Under PIPEDA, organizations must obtain meaningful consent before collecting, using, or disclosing personal information — including its use in AI/ML model training, inference, or automated decision-making. Consent must be informed: individuals must understand how their data will be used by AI systems.",
    keywords: ["consent", "personal information", "PIPEDA", "collection", "disclosure", "informed"]
  },
  {
    id: "pipeda-002",
    source: "PIPEDA — Schedule I, Principle 4.9",
    domain: "privacy",
    title: "Automated Decision-Making Transparency",
    text: "PIPEDA Principle 4.9 requires organizations to be transparent about the use of automated decision-making systems that affect individuals. Where AI makes or significantly influences a decision about a person, individuals must be able to understand the basis of that decision.",
    keywords: ["automated decision", "transparency", "AI decision", "insurance", "PIPEDA 4.9"]
  },
  {
    id: "pipeda-003",
    source: "PIPEDA — Schedule I, Principle 4.5",
    domain: "privacy",
    title: "Data Minimization and Retention",
    text: "Personal information used in AI/ML systems must be limited to what is necessary for the identified purpose (data minimization). Retention periods must be defined and enforced — AI training datasets containing personal information must be purged according to the institution's retention schedule.",
    keywords: ["data minimization", "retention", "purge", "personal data", "training data", "PIPEDA 4.5"]
  },

  // ── QUEBEC LAW 25 ─────────────────────────────────────────────────
  {
    id: "law25-001",
    source: "Quebec Law 25 — Section 12.1",
    domain: "privacy",
    title: "Right to Explanation for Automated Decisions",
    text: "Quebec Law 25 Section 12.1 grants individuals the right to be informed when a decision is made exclusively by automated means, and the right to request human review of that decision. Insurers operating in Quebec must be able to identify which AI decisions are fully automated and provide a clear explanation of the factors that led to the decision.",
    keywords: ["Quebec", "Law 25", "automated decision", "human review", "explanation", "12.1"]
  },
  {
    id: "law25-002",
    source: "Quebec Law 25 — Section 63.1",
    domain: "privacy",
    title: "Privacy Impact Assessments for AI",
    text: "Quebec Law 25 requires organizations to conduct a Privacy Impact Assessment (PIA) for any project involving the collection, use, or communication of personal information — including AI/ML projects. The PIA must be completed before the project is launched and must be renewed when the project changes materially.",
    keywords: ["PIA", "privacy impact assessment", "Quebec", "Law 25", "personal information", "63.1"]
  },

  // ── FEDERAL DIRECTIVE ON AUTOMATED DECISION-MAKING ────────────────
  {
    id: "adm-001",
    source: "Treasury Board — Directive on Automated Decision-Making",
    domain: "aia",
    title: "Algorithmic Impact Assessment Requirement",
    text: "The Treasury Board Directive on Automated Decision-Making requires completion of an Algorithmic Impact Assessment (AIA) before deploying any automated decision system. The AIA evaluates impact on rights, fairness, transparency, and human oversight. Federally regulated financial institutions are expected to align with this standard of practice.",
    keywords: ["AIA", "algorithmic impact", "automated decision", "fairness", "transparency", "Treasury Board"]
  },
  {
    id: "adm-002",
    source: "Treasury Board — Directive on Automated Decision-Making",
    domain: "aia",
    title: "Risk Tiers for Automated Decision Systems",
    text: "The Directive classifies automated decision systems into four impact levels (I–IV) based on the potential harm to individuals. Level I systems have minimal impact; Level IV systems make decisions with potentially irreversible consequences (e.g., denial of insurance coverage, disability claim rejection). Higher impact levels require more rigorous human oversight, transparency, and appeal mechanisms.",
    keywords: ["impact level", "tier", "risk classification", "harm", "irreversible", "appeal"]
  },

  // ── OSFI-FCAC JOINT REPORT ────────────────────────────────────────
  {
    id: "osfi-fcac-001",
    source: "OSFI-FCAC Joint Report — AI Uses and Risks (September 2024)",
    domain: "model_risk",
    title: "AI as a Transverse Risk",
    text: "OSFI and FCAC have adopted the view that AI risk is a transverse risk — it amplifies and interacts with existing risk categories including model risk, operational risk, cyber risk, conduct risk, and data risk. Institutions that address AI risk only within individual silos will have governance gaps. A comprehensive, multidisciplinary AI governance framework is required.",
    keywords: ["transverse risk", "OSFI", "FCAC", "multidisciplinary", "governance", "silo"]
  },
  {
    id: "osfi-fcac-002",
    source: "OSFI-FCAC Joint Report — AI Uses and Risks (September 2024)",
    domain: "data_risk",
    title: "Data Governance Risks in AI",
    text: "Data-related risks are among the most significant risks in AI adoption at Canadian financial institutions. These include: data quality issues that propagate through model training, lack of data lineage documentation, use of biased or unrepresentative training datasets, and inadequate controls over third-party data sources used in AI models.",
    keywords: ["data quality", "lineage", "bias", "training data", "third-party data", "data governance"]
  },
  {
    id: "osfi-fcac-003",
    source: "OSFI-FCAC Joint Report — AI Uses and Risks (September 2024)",
    domain: "model_risk",
    title: "Risk Management Lagging AI Adoption",
    text: "The greatest risk impact of AI adoption identified by OSFI and FCAC is risk management frameworks lagging behind the speed of AI deployment. Initial risk assessments often overlook the full lifecycle of AI models — particularly ongoing monitoring, drift detection, and periodic reassessment after deployment.",
    keywords: ["risk management", "lag", "adoption", "lifecycle", "monitoring", "drift", "reassessment"]
  },

  // ── CLHIA AI PRINCIPLES ───────────────────────────────────────────
  {
    id: "clhia-001",
    source: "CLHIA — AI Principles for Life & Health Insurers",
    domain: "aia",
    title: "Fairness and Non-Discrimination in AI",
    text: "The Canadian Life and Health Insurance Association (CLHIA) expects member insurers to ensure that AI systems used in underwriting, claims, and customer service do not produce discriminatory outcomes based on protected characteristics under the Canadian Human Rights Act — including race, sex, disability, or age. Fairness testing must be documented and repeatable.",
    keywords: ["fairness", "non-discrimination", "CLHIA", "underwriting", "claims", "human rights", "protected"]
  },
  {
    id: "clhia-002",
    source: "CLHIA — AI Principles for Life & Health Insurers",
    domain: "aia",
    title: "Explainability for Insurance AI Decisions",
    text: "CLHIA expects insurers to be able to explain AI-driven decisions to policyholders in plain language. When an AI system contributes to an adverse insurance decision (e.g., claim denial, coverage restriction), the insurer must be able to provide a clear, understandable explanation of the factors considered.",
    keywords: ["explainability", "plain language", "adverse decision", "claim denial", "CLHIA", "policyholder"]
  }
];
