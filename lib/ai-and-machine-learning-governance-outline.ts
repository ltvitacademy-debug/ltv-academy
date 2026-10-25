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
      L(1, "what-ai-governance-is", "What AI Governance Is", { contentDir: "ch01/01-what-ai-governance-is", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792416150/ltv-ai-and-machine-learning-governance/what-ai-governance-is.mp4", durationLabel: "1 min 57 s" }),
      L(2, "why-ai-needs-governance", "Why AI Needs Governance", { contentDir: "ch01/02-why-ai-needs-governance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792416460/ltv-ai-and-machine-learning-governance/why-ai-needs-governance.mp4", durationLabel: "1 min 53 s" }),
      L(3, "ai-risks-bias-privacy-security-and-hallucination", "AI Risks: Bias, Privacy, Security and Hallucination", { contentDir: "ch01/03-ai-risks-bias-privacy-security-and-hallucination", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792416799/ltv-ai-and-machine-learning-governance/ai-risks-bias-privacy-security-and-hallucination.mp4", durationLabel: "1 min 59 s" }),
      L(4, "ai-governance-roles", "AI Governance Roles", { contentDir: "ch01/04-ai-governance-roles", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792417130/ltv-ai-and-machine-learning-governance/ai-governance-roles.mp4", durationLabel: "1 min 42 s" }),
      L(5, "ai-and-existing-data-governance", "AI and Existing Data Governance", { contentDir: "ch01/05-ai-and-existing-data-governance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792417425/ltv-ai-and-machine-learning-governance/ai-and-existing-data-governance.mp4", durationLabel: "1 min 47 s" }),
    ],
  },
  {
    n: 2,
    title: "Data for AI",
    lessons: [
      L(6, "training-data-governance", "Training Data Governance", { contentDir: "ch02/06-training-data-governance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792417792/ltv-ai-and-machine-learning-governance/training-data-governance.mp4", durationLabel: "1 min 49 s" }),
      L(7, "data-provenance-and-consent", "Data Provenance and Consent", { contentDir: "ch02/07-data-provenance-and-consent", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792418085/ltv-ai-and-machine-learning-governance/data-provenance-and-consent.mp4", durationLabel: "1 min 51 s" }),
      L(8, "data-quality-for-machine-learning", "Data Quality for Machine Learning", { contentDir: "ch02/08-data-quality-for-machine-learning", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792418396/ltv-ai-and-machine-learning-governance/data-quality-for-machine-learning.mp4", durationLabel: "1 min 58 s" }),
      L(9, "bias-in-data", "Bias in Data", { contentDir: "ch02/09-bias-in-data", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792419175/ltv-ai-and-machine-learning-governance/bias-in-data.mp4", durationLabel: "1 min 48 s" }),
      L(10, "data-labeling-and-governance", "Data Labeling and Governance", { contentDir: "ch02/10-data-labeling-and-governance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792419521/ltv-ai-and-machine-learning-governance/data-labeling-and-governance.mp4", durationLabel: "1 min 53 s" }),
      L(11, "synthetic-data-considerations", "Synthetic Data Considerations", { contentDir: "ch02/11-synthetic-data-considerations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792425117/ltv-ai-and-machine-learning-governance/synthetic-data-considerations.mp4", durationLabel: "1 min 56 s" }),
    ],
  },
  {
    n: 3,
    title: "Model Governance",
    lessons: [
      L(12, "model-documentation-and-model-cards", "Model Documentation and Model Cards", { contentDir: "ch03/12-model-documentation-and-model-cards", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792425668/ltv-ai-and-machine-learning-governance/model-documentation-and-model-cards.mp4", durationLabel: "1 min 53 s" }),
      L(13, "model-inventory-and-registry", "Model Inventory and Registry", { contentDir: "ch03/13-model-inventory-and-registry", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792419936/ltv-ai-and-machine-learning-governance/model-inventory-and-registry.mp4", durationLabel: "1 min 30 s" }),
      L(14, "ai-lineage", "AI Lineage", { contentDir: "ch03/14-ai-lineage", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792420351/ltv-ai-and-machine-learning-governance/ai-lineage.mp4", durationLabel: "1 min 41 s" }),
      L(15, "model-versioning-and-change-control", "Model Versioning and Change Control", { contentDir: "ch03/15-model-versioning-and-change-control", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792420606/ltv-ai-and-machine-learning-governance/model-versioning-and-change-control.mp4", durationLabel: "1 min 32 s" }),
      L(16, "model-approval-workflows", "Model Approval Workflows", { contentDir: "ch03/16-model-approval-workflows", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792420876/ltv-ai-and-machine-learning-governance/model-approval-workflows.mp4", durationLabel: "1 min 39 s" }),
    ],
  },
  {
    n: 4,
    title: "Security, Access and Monitoring",
    lessons: [
      L(17, "securing-ai-systems", "Securing AI Systems", { contentDir: "ch04/17-securing-ai-systems", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792421165/ltv-ai-and-machine-learning-governance/securing-ai-systems.mp4", durationLabel: "1 min 50 s" }),
      L(18, "access-to-models-and-data", "Access to Models and Data", { contentDir: "ch04/18-access-to-models-and-data", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792421563/ltv-ai-and-machine-learning-governance/access-to-models-and-data.mp4", durationLabel: "1 min 41 s" }),
      L(19, "prompt-and-output-governance-for-generative-ai", "Prompt and Output Governance for Generative AI", { contentDir: "ch04/19-prompt-and-output-governance-for-generative-ai", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792421872/ltv-ai-and-machine-learning-governance/prompt-and-output-governance-for-generative-ai.mp4", durationLabel: "1 min 46 s" }),
      L(20, "monitoring-models-in-production", "Monitoring Models in Production", { contentDir: "ch04/20-monitoring-models-in-production", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792422109/ltv-ai-and-machine-learning-governance/monitoring-models-in-production.mp4", durationLabel: "1 min 36 s" }),
      L(21, "drift-and-performance-monitoring", "Drift and Performance Monitoring", { contentDir: "ch04/21-drift-and-performance-monitoring", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792422364/ltv-ai-and-machine-learning-governance/drift-and-performance-monitoring.mp4", durationLabel: "1 min 46 s" }),
      L(22, "incident-response-for-ai", "Incident Response for AI", { contentDir: "ch04/22-incident-response-for-ai", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792422615/ltv-ai-and-machine-learning-governance/incident-response-for-ai.mp4", durationLabel: "1 min 44 s" }),
    ],
  },
  {
    n: 5,
    title: "Responsible AI and Risk",
    lessons: [
      L(23, "responsible-ai-principles", "Responsible AI Principles", { contentDir: "ch05/23-responsible-ai-principles", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792422826/ltv-ai-and-machine-learning-governance/responsible-ai-principles.mp4", durationLabel: "1 min 20 s" }),
      L(24, "ai-risk-management", "AI Risk Management", { contentDir: "ch05/24-ai-risk-management", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792422997/ltv-ai-and-machine-learning-governance/ai-risk-management.mp4", durationLabel: "1 min 14 s" }),
      L(25, "ai-governance-frameworks-overview", "AI Governance Frameworks Overview", { contentDir: "ch05/25-ai-governance-frameworks-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792423210/ltv-ai-and-machine-learning-governance/ai-governance-frameworks-overview.mp4", durationLabel: "1 min 26 s" }),
      L(26, "ai-regulation-overview", "AI Regulation Overview", { contentDir: "ch05/26-ai-regulation-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792423438/ltv-ai-and-machine-learning-governance/ai-regulation-overview.mp4", durationLabel: "1 min 27 s" }),
      L(27, "auditing-ai-systems", "Auditing AI Systems", { contentDir: "ch05/27-auditing-ai-systems", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792423620/ltv-ai-and-machine-learning-governance/auditing-ai-systems.mp4", durationLabel: "1 min 17 s" }),
    ],
  },
  {
    n: 6,
    title: "Applied AI Governance",
    lessons: [
      L(28, "ai-governance-case-study-credit-decisioning", "AI Governance Case Study: Credit Decisioning", { contentDir: "ch06/28-ai-governance-case-study-credit-decisioning", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792423865/ltv-ai-and-machine-learning-governance/ai-governance-case-study-credit-decisioning.mp4", durationLabel: "1 min 20 s" }),
      L(29, "ai-governance-case-study-customer-facing-generative-ai", "AI Governance Case Study: Customer-Facing Generative AI", { contentDir: "ch06/29-ai-governance-case-study-customer-facing-generative-ai", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792424074/ltv-ai-and-machine-learning-governance/ai-governance-case-study-customer-facing-generative-ai.mp4", durationLabel: "1 min 23 s" }),
      L(30, "building-an-ai-governance-program", "Building an AI Governance Program", { contentDir: "ch06/30-building-an-ai-governance-program", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792424696/ltv-ai-and-machine-learning-governance/building-an-ai-governance-program.mp4", durationLabel: "1 min 26 s" }),
    ],
  },
];
