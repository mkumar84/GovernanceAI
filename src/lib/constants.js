// ─── Brand & Design Tokens ────────────────────────────────────────────────────
export const COLORS = {
  navy:       "#1B2A4A",
  navyLight:  "#2C3E5D",
  red:        "#C41230",
  slate:      "#4A5568",
  fog:        "#F7F8FA",
  fogDark:    "#EEF1F5",
  white:      "#FFFFFF",
  green:      "#227D52",
  greenLight: "#D1FAE5",
  amber:      "#D97706",
  amberLight: "#FEF3C7",
  redRisk:    "#DC2626",
  redLight:   "#FEE2E2",
  border:     "#E2E8F0",
  borderDark: "#CBD5E1",
  text:       "#1A202C",
  textMuted:  "#718096",
};

// ─── Risk Rating Config ───────────────────────────────────────────────────────
export const RISK_CONFIG = {
  green: {
    label: "Low Risk",
    bg: "#D1FAE5",
    text: "#065F46",
    border: "#6EE7B7",
    dot: "#10B981",
    description: "Governance requirements substantially met. Minor gaps may exist."
  },
  amber: {
    label: "Moderate Risk",
    bg: "#FEF3C7",
    text: "#92400E",
    border: "#FCD34D",
    dot: "#F59E0B",
    description: "Material gaps identified. Remediation required before full approval."
  },
  red: {
    label: "High Risk",
    bg: "#FEE2E2",
    text: "#991B1B",
    border: "#FCA5A5",
    dot: "#EF4444",
    description: "Critical governance gaps. Escalation to Risk Council recommended."
  }
};

// ─── Governance Gate Config ───────────────────────────────────────────────────
export const GATE_CONFIG = {
  approved_to_proceed: {
    label: "Approved to Proceed",
    color: "#065F46",
    bg: "#D1FAE5",
    icon: "CheckCircle2",
    description: "Product meets first-level governance requirements. Ready for next approval gate."
  },
  proceed_with_conditions: {
    label: "Proceed with Conditions",
    color: "#92400E",
    bg: "#FEF3C7",
    icon: "AlertTriangle",
    description: "Conditional approval. Identified gaps must be remediated within agreed timeline."
  },
  hold_pending_remediation: {
    label: "Hold — Remediation Required",
    color: "#991B1B",
    bg: "#FEE2E2",
    icon: "XCircle",
    description: "Significant gaps prevent progression. Remediation plan required before resubmission."
  },
  escalate_to_risk_council: {
    label: "Escalate to Risk Council",
    color: "#7C2D12",
    bg: "#FEE2E2",
    icon: "AlertOctagon",
    description: "Critical risk exposure identified. Immediate escalation to AI Working Group / Risk Council required."
  }
};

// ─── Disclaimer ───────────────────────────────────────────────────────────────
export const DISCLAIMER = `This tool is a prototype developed by Mahesh Kumar for demonstration and portfolio purposes only. It is not a substitute for formal legal, regulatory, or risk management advice. AI governance assessments produced by this tool should be reviewed by qualified compliance, legal, and model risk professionals before being used in any official approval process. Regulatory references are accurate as of May 2026 but should be verified against current OSFI, PIPEDA, and Treasury Board guidance. Canada Life and Great-West Lifeco are referenced for contextual purposes only. This prototype is not affiliated with, endorsed by, or representative of Canada Life or Great-West Lifeco Inc.`;

// ─── Navigation ───────────────────────────────────────────────────────────────
export const NAV_ITEMS = [
  { id: "dashboard",    label: "Portfolio",       icon: "LayoutDashboard", path: "/" },
  { id: "new",          label: "Register Product", icon: "PlusCircle",     path: "/new" },
  { id: "assess",       label: "Assess",           icon: "ClipboardCheck", path: "/assess" },
  { id: "knowledge",    label: "Knowledge Base",   icon: "BookOpen",       path: "/knowledge" },
];

// ─── Module color map ─────────────────────────────────────────────────────────
export const MODULE_COLORS = {
  aia:           "#7C3AED",
  model_risk:    "#1B2A4A",
  privacy:       "#0891B2",
  data_risk:     "#0D9488",
  cybersecurity: "#DC2626",
  it_risk:       "#D97706",
};
