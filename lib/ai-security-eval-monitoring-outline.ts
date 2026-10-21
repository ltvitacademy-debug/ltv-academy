// The full AI Security, Evaluation & Monitoring course outline. Only
// lessons with a contentDir + videoUrl are playable; everything else
// renders as "in production". The production-readiness layer for AI
// applications specifically: the risks that don't exist in ordinary
// software, and the eval/monitoring discipline that catches them.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/ai-security-eval-monitoring/
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

export const AI_SECURITY_EVAL_MONITORING_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "AI-Specific Security Risks",
    lessons: [
      L(1, "prompt-injection", "Prompt Injection", { contentDir: "ch01/01-prompt-injection", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792505460/ltv-ai-security-eval-monitoring/prompt-injection.mp4", durationLabel: "1 min 38 s" }),
      L(2, "jailbreaking", "Jailbreaking", { contentDir: "ch01/02-jailbreaking", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792505942/ltv-ai-security-eval-monitoring/jailbreaking.mp4", durationLabel: "1 min 38 s" }),
      L(3, "data-exfiltration-via-ai", "Data Exfiltration via AI", { contentDir: "ch01/03-data-exfiltration-via-ai", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792506660/ltv-ai-security-eval-monitoring/data-exfiltration-via-ai.mp4", durationLabel: "1 min 42 s" }),
      L(4, "model-and-api-key-security", "Model & API Key Security", { contentDir: "ch01/04-model-and-api-key-security", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792507412/ltv-ai-security-eval-monitoring/model-and-api-key-security.mp4", durationLabel: "1 min 42 s" }),
      L(5, "supply-chain-risks", "Supply Chain Risks: Third-Party Models", { contentDir: "ch01/05-supply-chain-risks", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792508092/ltv-ai-security-eval-monitoring/supply-chain-risks.mp4", durationLabel: "1 min 47 s" }),
      L(6, "insecure-output-handling", "Insecure Output Handling", { contentDir: "ch01/06-insecure-output-handling", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792508826/ltv-ai-security-eval-monitoring/insecure-output-handling.mp4", durationLabel: "1 min 43 s" }),
    ],
  },
  {
    n: 2,
    title: "Evaluating AI Systems",
    lessons: [
      L(7, "building-eval-datasets", "Building Eval Datasets", { contentDir: "ch02/07-building-eval-datasets", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792509535/ltv-ai-security-eval-monitoring/building-eval-datasets.mp4", durationLabel: "1 min 45 s" }),
      L(8, "automated-eval-metrics", "Automated Eval Metrics: Accuracy, Relevance & Faithfulness", { contentDir: "ch02/08-automated-eval-metrics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792510783/ltv-ai-security-eval-monitoring/automated-eval-metrics.mp4", durationLabel: "1 min 34 s" }),
      L(9, "human-evaluation-processes", "Human Evaluation Processes", { contentDir: "ch02/09-human-evaluation-processes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792511408/ltv-ai-security-eval-monitoring/human-evaluation-processes.mp4", durationLabel: "1 min 32 s" }),
      L(10, "regression-testing-ai-systems", "Regression Testing AI Systems", { contentDir: "ch02/10-regression-testing-ai-systems", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792511974/ltv-ai-security-eval-monitoring/regression-testing-ai-systems.mp4", durationLabel: "1 min 25 s" }),
      L(11, "red-teaming-your-own-ai-app", "Red-Teaming Your Own AI App", { contentDir: "ch02/11-red-teaming-your-own-ai-app", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792512572/ltv-ai-security-eval-monitoring/red-teaming-your-own-ai-app.mp4", durationLabel: "1 min 26 s" }),
      L(12, "benchmarking-models", "Benchmarking Models", { contentDir: "ch02/12-benchmarking-models", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792513203/ltv-ai-security-eval-monitoring/benchmarking-models.mp4", durationLabel: "1 min 30 s" }),
    ],
  },
  {
    n: 3,
    title: "Monitoring AI in Production",
    lessons: [
      L(13, "logging-ai-inputs-and-outputs-responsibly", "Logging AI Inputs & Outputs, Responsibly", { contentDir: "ch03/13-logging-ai-inputs-and-outputs-responsibly", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792513885/ltv-ai-security-eval-monitoring/logging-ai-inputs-and-outputs-responsibly.mp4", durationLabel: "1 min 34 s" }),
      L(14, "tracking-cost-and-latency", "Tracking Cost & Latency", { contentDir: "ch03/14-tracking-cost-and-latency", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792514390/ltv-ai-security-eval-monitoring/tracking-cost-and-latency.mp4", durationLabel: "1 min 17 s" }),
      L(15, "drift-detection", "Drift Detection", { contentDir: "ch03/15-drift-detection", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792514911/ltv-ai-security-eval-monitoring/drift-detection.mp4", durationLabel: "1 min 15 s" }),
      L(16, "monitoring-for-hallucinations", "Monitoring for Hallucinations", { contentDir: "ch03/16-monitoring-for-hallucinations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792515461/ltv-ai-security-eval-monitoring/monitoring-for-hallucinations.mp4", durationLabel: "1 min 13 s" }),
      L(17, "alerting-on-ai-failures", "Alerting on AI Failures", { contentDir: "ch03/17-alerting-on-ai-failures", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792516038/ltv-ai-security-eval-monitoring/alerting-on-ai-failures.mp4", durationLabel: "1 min 19 s" }),
    ],
  },
  {
    n: 4,
    title: "Responsible AI & Governance",
    lessons: [
      L(18, "bias-and-fairness-basics", "Bias & Fairness, Basics", { contentDir: "ch04/18-bias-and-fairness-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792516539/ltv-ai-security-eval-monitoring/bias-and-fairness-basics.mp4", durationLabel: "1 min 6 s" }),
      L(19, "privacy-considerations", "Privacy Considerations: PII in Prompts", { contentDir: "ch04/19-privacy-considerations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792516960/ltv-ai-security-eval-monitoring/privacy-considerations.mp4", durationLabel: "1 min 1 s" }),
      L(20, "compliance-overview", "Compliance, Overview: AI-Specific Regulations", { contentDir: "ch04/20-compliance-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792517548/ltv-ai-security-eval-monitoring/compliance-overview.mp4", durationLabel: "1 min 16 s" }),
      L(21, "documentation-and-model-cards", "Documentation & Model Cards", { contentDir: "ch04/21-documentation-and-model-cards", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792518056/ltv-ai-security-eval-monitoring/documentation-and-model-cards.mp4", durationLabel: "1 min 7 s" }),
      L(22, "incident-response-for-ai-systems", "Incident Response for AI Systems", { contentDir: "ch04/22-incident-response-for-ai-systems", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792518639/ltv-ai-security-eval-monitoring/incident-response-for-ai-systems.mp4", durationLabel: "1 min 12 s" }),
    ],
  },
  {
    n: 5,
    title: "Capstone",
    lessons: [
      L(23, "capstone-kickoff", "Capstone Kickoff", { contentDir: "ch05/23-capstone-kickoff", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792519172/ltv-ai-security-eval-monitoring/capstone-kickoff.mp4", durationLabel: "1 min 8 s" }),
      L(24, "capstone-building-an-eval-and-monitoring-pipeline", "Capstone: Building an Eval + Monitoring Pipeline", { contentDir: "ch05/24-capstone-building-an-eval-and-monitoring-pipeline", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792519660/ltv-ai-security-eval-monitoring/capstone-building-an-eval-and-monitoring-pipeline.mp4", durationLabel: "1 min 2 s" }),
      L(25, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch05/25-capstone-wrap-up", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792520169/ltv-ai-security-eval-monitoring/capstone-wrap-up.mp4", durationLabel: "1 min 3 s" }),
    ],
  },
];
