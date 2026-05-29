import { aiaAgent, modelRiskAgent, privacyAgent, dataRiskAgent, cyberRiskAgent, itRiskAgent } from "./specialistAgents";
import { callClaude, parseClaudeJSON } from "../lib/anthropicClient";
import { retrieveAllDomains, buildRagContext } from "./ragAgent";
import { MODULE_CONFIG } from "../knowledge/assessmentQuestions";

// Module weights — must sum to 1.0
const WEIGHTS = {
  aia:          0.20,
  model_risk:   0.20,
  privacy:      0.18,
  data_risk:    0.15,
  cybersecurity: 0.12,
  it_risk:      0.10,
  // registry (intake) contributes 0.05 as completeness bonus
};

/**
 * Determines overall risk rating from composite score.
 */
function ratingFromScore(score) {
  if (score >= 75) return "green";
  if (score >= 45) return "amber";
  return "red";
}

/**
 * Determines risk tier label.
 */
function tierFromScore(score) {
  if (score >= 85) return "Low";
  if (score >= 65) return "Medium";
  if (score >= 40) return "High";
  return "Critical";
}

/**
 * Calculates a completeness bonus (0–5 points) from the intake form.
 */
function intakeBonusScore(product) {
  const requiredFields = ["name", "type", "businessLine", "deploymentStage", "owner", "ownerEmail", "description"];
  const filled = requiredFields.filter(f => product[f] && String(product[f]).trim() !== "").length;
  return Math.round((filled / requiredFields.length) * 5);
}

/**
 * Main orchestrator — runs all 6 specialist agents in parallel, then
 * computes the composite score and generates an executive summary.
 */
export async function runFullAssessment(product, answers) {
  // Find question sets for each module
  const getQuestions = (id) => {
    const mod = MODULE_CONFIG.find(m => m.id === id);
    return mod ? mod.questions : [];
  };

  // Run all specialist agents in parallel
  const [aia, model_risk, privacy, data_risk, cybersecurity, it_risk] =
    await Promise.all([
      aiaAgent(product,          answers.aia,           getQuestions("aia")),
      modelRiskAgent(product,    answers.model_risk,    getQuestions("model_risk")),
      privacyAgent(product,      answers.privacy,       getQuestions("privacy")),
      dataRiskAgent(product,     answers.data_risk,     getQuestions("data_risk")),
      cyberRiskAgent(product,    answers.cybersecurity, getQuestions("cybersecurity")),
      itRiskAgent(product,       answers.it_risk,       getQuestions("it_risk")),
    ]);

  const modules = { aia, model_risk, privacy, data_risk, cybersecurity, it_risk };

  // Compute weighted composite score
  const weightedSum =
    (aia.score          * WEIGHTS.aia) +
    (model_risk.score   * WEIGHTS.model_risk) +
    (privacy.score      * WEIGHTS.privacy) +
    (data_risk.score    * WEIGHTS.data_risk) +
    (cybersecurity.score * WEIGHTS.cybersecurity) +
    (it_risk.score      * WEIGHTS.it_risk);

  const intakeBonus = intakeBonusScore(product);
  const composite = Math.min(100, Math.round(weightedSum + intakeBonus));
  const overallRating = ratingFromScore(composite);
  const overallTier = tierFromScore(composite);

  // Identify the two weakest modules for the executive summary
  const moduleScores = Object.entries(modules).map(([id, result]) => ({
    id, label: MODULE_CONFIG.find(m => m.id === id)?.label || id, score: result.score
  })).sort((a, b) => a.score - b.score);

  const weakest = moduleScores.slice(0, 2);
  const strongest = moduleScores[moduleScores.length - 1];

  // Generate executive summary via orchestrator LLM call
  const summaryKeywords = ["governance", "OSFI", "risk", "compliance", "AI", "regulated"];
  const ragChunks = retrieveAllDomains(summaryKeywords, 4);
  const ragContext = buildRagContext(ragChunks);

  const summarySystem = `You are the Chief AI Governance Officer at a Canadian FRFI. 
Synthesize the results of a multi-dimensional AI governance assessment into a concise, actionable executive summary.
Respond ONLY in valid JSON — no preamble, no markdown.`;

  const summaryUser = `
REGULATORY CONTEXT:
${ragContext}

PRODUCT: ${product.name} (${product.type} | ${product.businessLine})
COMPOSITE SCORE: ${composite}/100
OVERALL RATING: ${overallRating.toUpperCase()}
OVERALL TIER: ${overallTier}

MODULE SCORES:
${moduleScores.map(m => `- ${m.label}: ${m.score}/100`).join("\n")}

STRONGEST MODULE: ${strongest.label} (${strongest.score}/100)
WEAKEST MODULES: ${weakest.map(m => `${m.label} (${m.score}/100)`).join(", ")}

MODULE SUMMARIES:
${Object.entries(modules).map(([id, r]) => {
  const label = MODULE_CONFIG.find(m => m.id === id)?.label || id;
  return `${label}: ${r.summary}`;
}).join("\n")}

Return JSON with this structure:
{
  "executiveSummary": "<3–4 sentence plain-language summary for a senior leader — what is the overall governance posture, what are the top 2 concerns, and what is the recommended first action>",
  "readinessStatement": "<1 sentence verdict — is this product ready for the next governance gate?>",
  "priorityActions": [
    { "action": "<specific action>", "owner": "<suggested role>", "urgency": "immediate | 30-day | 90-day" }
  ],
  "governanceGate": "approved_to_proceed" | "proceed_with_conditions" | "hold_pending_remediation" | "escalate_to_risk_council",
  "gateRationale": "<1 sentence explaining the gate recommendation>"
}`;

  const summaryRaw = await callClaude(summarySystem, summaryUser, 1200);
  const executiveSummary = parseClaudeJSON(summaryRaw);

  return {
    product,
    modules,
    composite,
    overallRating,
    overallTier,
    moduleScores,
    executiveSummary,
    completedAt: new Date().toISOString()
  };
}

/**
 * Quick re-score a single module without re-running the full assessment.
 * Used when a user updates answers to one module only.
 */
export async function rescoreModule(moduleId, product, answers) {
  const getQuestions = (id) => {
    const mod = MODULE_CONFIG.find(m => m.id === id);
    return mod ? mod.questions : [];
  };

  const agentMap = {
    aia:           aiaAgent,
    model_risk:    modelRiskAgent,
    privacy:       privacyAgent,
    data_risk:     dataRiskAgent,
    cybersecurity: cyberRiskAgent,
    it_risk:       itRiskAgent,
  };

  const agent = agentMap[moduleId];
  if (!agent) throw new Error(`Unknown module: ${moduleId}`);

  return await agent(product, answers[moduleId], getQuestions(moduleId));
}
