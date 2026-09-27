// The AI & Machine Learning Governance course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Data Governance career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/ai-and-machine-learning-governance/
  videoUrl?: string;
  durationLabel?: string;
};

export type ChapterMeta = { n: number; title: string; lessons: LessonMeta[] };

const L = (n: number, slug: string, title: string, extra?: Partial<LessonMeta>): LessonMeta => ({
  n,
  slug,
  title,
  ...extra,
});

export const GOV_AI_AND_MACHINE_LEARNING_GOVERNANCE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "AI Governance Foundations",
    lessons: [
      L(1, "what-ai-governance-is", "What AI Governance Is"),
      L(2, "why-ai-needs-governance", "Why AI Needs Governance"),
      L(3, "ai-risks-bias-privacy-security-and-hallucination", "AI Risks: Bias, Privacy, Security and Hallucination"),
      L(4, "ai-governance-roles", "AI Governance Roles"),
      L(5, "ai-and-existing-data-governance", "AI and Existing Data Governance"),
    ],
  },
  {
    n: 2,
    title: "Data for AI",
    lessons: [
      L(6, "training-data-governance", "Training Data Governance"),
      L(7, "data-provenance-and-consent", "Data Provenance and Consent"),
      L(8, "data-quality-for-machine-learning", "Data Quality for Machine Learning"),
      L(9, "bias-in-data", "Bias in Data"),
      L(10, "data-labeling-and-governance", "Data Labeling and Governance"),
      L(11, "synthetic-data-considerations", "Synthetic Data Considerations"),
    ],
  },
  {
    n: 3,
    title: "Model Governance",
    lessons: [
      L(12, "model-documentation-and-model-cards", "Model Documentation and Model Cards"),
      L(13, "model-inventory-and-registry", "Model Inventory and Registry"),
      L(14, "ai-lineage", "AI Lineage"),
      L(15, "model-versioning-and-change-control", "Model Versioning and Change Control"),
      L(16, "model-approval-workflows", "Model Approval Workflows"),
    ],
  },
  {
    n: 4,
    title: "Security, Access and Monitoring",
    lessons: [
      L(17, "securing-ai-systems", "Securing AI Systems"),
      L(18, "access-to-models-and-data", "Access to Models and Data"),
      L(19, "prompt-and-output-governance-for-generative-ai", "Prompt and Output Governance for Generative AI"),
      L(20, "monitoring-models-in-production", "Monitoring Models in Production"),
      L(21, "drift-and-performance-monitoring", "Drift and Performance Monitoring"),
      L(22, "incident-response-for-ai", "Incident Response for AI"),
    ],
  },
  {
    n: 5,
    title: "Responsible AI and Risk",
    lessons: [
      L(23, "responsible-ai-principles", "Responsible AI Principles"),
      L(24, "ai-risk-management", "AI Risk Management"),
      L(25, "ai-governance-frameworks-overview", "AI Governance Frameworks Overview"),
      L(26, "ai-regulation-overview", "AI Regulation Overview"),
      L(27, "auditing-ai-systems", "Auditing AI Systems"),
    ],
  },
  {
    n: 6,
    title: "Applied AI Governance",
    lessons: [
      L(28, "ai-governance-case-study-credit-decisioning", "AI Governance Case Study: Credit Decisioning"),
      L(29, "ai-governance-case-study-customer-facing-generative-ai", "AI Governance Case Study: Customer-Facing Generative AI"),
      L(30, "building-an-ai-governance-program", "Building an AI Governance Program"),
    ],
  },
];
