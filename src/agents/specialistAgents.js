import { callClaude, parseClaudeJSON } from "../lib/anthropicClient";
import { retrieveChunks, buildRagContext } from "./ragAgent";

// ─── Shared system prompt base ────────────────────────────────────────────────
const BASE_SYSTEM = `You are a Canadian AI governance expert assessing AI/ML products for a federally regulated financial institution (FRFI) — specifically Canada Life, a subsidiary of Great-West Lifeco under OSFI supervision.

Your role is to score the product's governance readiness on a specific risk dimension, explain each finding in plain language, cite the relevant Canadian regulation, and provide concrete remediation steps.

CRITICAL RULES:
- Respond ONLY in valid JSON — no preamble, no markdown, no explanation outside the JSON.
- Scores are 0–100 where 100 = fully compliant / no risk gap.
- Risk ratings: "green" (score 75–100), "amber" (score 45–74), "red" (score 0–44).
- Be specific — cite the exact regulation, guideline, and section.
- Remediation steps must be actionable within 90 days for amber and 30 days for red findings.
- Write for a Product Owner audience — clear, not overly legalistic.`;

// ─── Response schema (all agents return this shape) ───────────────────────────
/*
{
  score: 0–100,
  riskRating: "green" | "amber" | "red",
  riskTier: "Low" | "Medium" | "High" | "Critical",
  summary: "2-sentence plain-language summary",
  keyStrength: "The single strongest governance element found",
  keyGap: "The single most urgent gap identified",
  questionRationales: [
    {
      questionId: string,
      question: string,
      answer: string,
      finding: string,         // what this answer means for governance
      implication: string,     // why it matters / what could go wrong
      regulation: string,      // specific regulation triggered
      remediationSteps: [      // 1–3 concrete action steps
        { step: string, priority: "immediate" | "short-term" | "planned" }
      ]
    }
  ],
  topRisks: ["risk 1", "risk 2", "risk 3"],
  citedSources: ["source 1", "source 2"]
}
*/

function buildProductContext(product) {
  return `
PRODUCT PROFILE:
- Name: ${product.name}
- Type: ${product.type}
- Business Line: ${product.businessLine}
- Stage: ${product.deploymentStage}
- Affects Customers Directly: ${product.affectedCustomers}
- Makes Automated Decisions: ${product.automatedDecisions}
- Third-Party Tool: ${product.thirdParty}
- Data Types: ${Array.isArray(product.dataTypes) ? product.dataTypes.join(", ") : product.dataTypes}`;
}

function buildAnswersContext(answers, questions) {
  if (!answers || !questions) return "No answers provided.";
  return questions.map(q => {
    const answer = answers[q.id] || "Not answered";
    return `Q: ${q.label}\nA: ${answer}\nRegulation: ${q.regulation}`;
  }).join("\n\n");
}

// ─── AIA AGENT ────────────────────────────────────────────────────────────────
export async function aiaAgent(product, answers, questions) {
  const keywords = ["algorithmic impact", "fairness", "automated decision", "bias", "explainability", "human oversight", "appeal", "transparency"];
  const chunks = retrieveChunks("aia", keywords, 5);
  const ragContext = buildRagContext(chunks);

  const system = `${BASE_SYSTEM}\n\nYou are assessing the ALGORITHMIC IMPACT dimension — covering fairness, bias, explainability, human oversight, and appeal mechanisms for AI decisions.`;

  const user = `
REGULATORY CONTEXT:
${ragContext}

${buildProductContext(product)}

ASSESSMENT ANSWERS — Algorithmic Impact Assessment:
${buildAnswersContext(answers, questions)}

Return the JSON assessment object exactly matching the schema described.`;

  const raw = await callClaude(system, user, 2000);
  return parseClaudeJSON(raw);
}

// ─── MODEL RISK AGENT ─────────────────────────────────────────────────────────
export async function modelRiskAgent(product, answers, questions) {
  const keywords = ["model risk", "validation", "inventory", "drift", "hallucination", "LLM", "GenAI", "revalidation", "E-23"];
  const chunks = retrieveChunks("model_risk", keywords, 5);
  const ragContext = buildRagContext(chunks);

  const system = `${BASE_SYSTEM}\n\nYou are assessing the MODEL RISK dimension — covering OSFI E-23 compliance, independent validation, model inventory, drift monitoring, GenAI/LLM-specific risks, and revalidation schedules.`;

  const user = `
REGULATORY CONTEXT:
${ragContext}

${buildProductContext(product)}

ASSESSMENT ANSWERS — Model Risk:
${buildAnswersContext(answers, questions)}

Return the JSON assessment object exactly matching the schema described.`;

  const raw = await callClaude(system, user, 2000);
  return parseClaudeJSON(raw);
}

// ─── PRIVACY AGENT ────────────────────────────────────────────────────────────
export async function privacyAgent(product, answers, questions) {
  const keywords = ["consent", "PIA", "data minimization", "retention", "Quebec", "Law 25", "PIPEDA", "automated decision", "personal information"];
  const chunks = retrieveChunks("privacy", keywords, 5);
  const ragContext = buildRagContext(chunks);

  const system = `${BASE_SYSTEM}\n\nYou are assessing the PRIVACY RISK dimension — covering PIPEDA compliance (consent, minimization, retention), Quebec Law 25 obligations (PIA, right to explanation), and third-party data sharing arrangements.`;

  const user = `
REGULATORY CONTEXT:
${ragContext}

${buildProductContext(product)}

ASSESSMENT ANSWERS — Privacy Risk:
${buildAnswersContext(answers, questions)}

Return the JSON assessment object exactly matching the schema described.`;

  const raw = await callClaude(system, user, 2000);
  return parseClaudeJSON(raw);
}

// ─── DATA RISK AGENT ──────────────────────────────────────────────────────────
export async function dataRiskAgent(product, answers, questions) {
  const keywords = ["data lineage", "data quality", "representativeness", "third-party data", "data drift", "access control", "data governance"];
  const chunks = retrieveChunks("data_risk", keywords, 5);
  const ragContext = buildRagContext(chunks);

  const system = `${BASE_SYSTEM}\n\nYou are assessing the DATA RISK dimension — covering data lineage, quality validation, dataset representativeness, third-party data governance, drift detection, and access controls on training data.`;

  const user = `
REGULATORY CONTEXT:
${ragContext}

${buildProductContext(product)}

ASSESSMENT ANSWERS — Data Risk:
${buildAnswersContext(answers, questions)}

Return the JSON assessment object exactly matching the schema described.`;

  const raw = await callClaude(system, user, 2000);
  return parseClaudeJSON(raw);
}

// ─── CYBER RISK AGENT ─────────────────────────────────────────────────────────
export async function cyberRiskAgent(product, answers, questions) {
  const keywords = ["cyber", "model poisoning", "adversarial", "access control", "RBAC", "MFA", "encryption", "incident response", "B-13", "third-party vendor"];
  const chunks = retrieveChunks("cybersecurity", keywords, 5);
  const ragContext = buildRagContext(chunks);

  const system = `${BASE_SYSTEM}\n\nYou are assessing the CYBERSECURITY RISK dimension — covering OSFI B-13 compliance, adversarial attack surface, access controls, encryption, AI-specific incident response, and third-party vendor security standards.`;

  const user = `
REGULATORY CONTEXT:
${ragContext}

${buildProductContext(product)}

ASSESSMENT ANSWERS — Cybersecurity Risk:
${buildAnswersContext(answers, questions)}

Return the JSON assessment object exactly matching the schema described.`;

  const raw = await callClaude(system, user, 2000);
  return parseClaudeJSON(raw);
}

// ─── IT RISK AGENT ────────────────────────────────────────────────────────────
export async function itRiskAgent(product, answers, questions) {
  const keywords = ["business continuity", "RTO", "RPO", "failover", "rollback", "SDLC", "change management", "version control", "B-10"];
  const chunks = retrieveChunks("it_risk", keywords, 5);
  const ragContext = buildRagContext(chunks);

  const system = `${BASE_SYSTEM}\n\nYou are assessing the IT / OPERATIONAL RISK dimension — covering OSFI B-10 compliance, business continuity, disaster recovery, RTO/RPO, rollback mechanisms, SDLC governance, and production monitoring.`;

  const user = `
REGULATORY CONTEXT:
${ragContext}

${buildProductContext(product)}

ASSESSMENT ANSWERS — IT / Operational Risk:
${buildAnswersContext(answers, questions)}

Return the JSON assessment object exactly matching the schema described.`;

  const raw = await callClaude(system, user, 2000);
  return parseClaudeJSON(raw);
}
