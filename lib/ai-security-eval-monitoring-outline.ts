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
      L(1, "prompt-injection", "Prompt Injection", { contentDir: "ch01/01-prompt-injection" }),
      L(2, "jailbreaking", "Jailbreaking", { contentDir: "ch01/02-jailbreaking" }),
      L(3, "data-exfiltration-via-ai", "Data Exfiltration via AI", { contentDir: "ch01/03-data-exfiltration-via-ai" }),
      L(4, "model-and-api-key-security", "Model & API Key Security", { contentDir: "ch01/04-model-and-api-key-security" }),
      L(5, "supply-chain-risks", "Supply Chain Risks: Third-Party Models", { contentDir: "ch01/05-supply-chain-risks" }),
      L(6, "insecure-output-handling", "Insecure Output Handling", { contentDir: "ch01/06-insecure-output-handling" }),
    ],
  },
  {
    n: 2,
    title: "Evaluating AI Systems",
    lessons: [
      L(7, "building-eval-datasets", "Building Eval Datasets", { contentDir: "ch02/07-building-eval-datasets" }),
      L(8, "automated-eval-metrics", "Automated Eval Metrics: Accuracy, Relevance & Faithfulness", { contentDir: "ch02/08-automated-eval-metrics" }),
      L(9, "human-evaluation-processes", "Human Evaluation Processes", { contentDir: "ch02/09-human-evaluation-processes" }),
      L(10, "regression-testing-ai-systems", "Regression Testing AI Systems", { contentDir: "ch02/10-regression-testing-ai-systems" }),
      L(11, "red-teaming-your-own-ai-app", "Red-Teaming Your Own AI App", { contentDir: "ch02/11-red-teaming-your-own-ai-app" }),
      L(12, "benchmarking-models", "Benchmarking Models", { contentDir: "ch02/12-benchmarking-models" }),
    ],
  },
  {
    n: 3,
    title: "Monitoring AI in Production",
    lessons: [
      L(13, "logging-ai-inputs-and-outputs-responsibly", "Logging AI Inputs & Outputs, Responsibly", { contentDir: "ch03/13-logging-ai-inputs-and-outputs-responsibly" }),
      L(14, "tracking-cost-and-latency", "Tracking Cost & Latency", { contentDir: "ch03/14-tracking-cost-and-latency" }),
      L(15, "drift-detection", "Drift Detection", { contentDir: "ch03/15-drift-detection" }),
      L(16, "monitoring-for-hallucinations", "Monitoring for Hallucinations", { contentDir: "ch03/16-monitoring-for-hallucinations" }),
      L(17, "alerting-on-ai-failures", "Alerting on AI Failures", { contentDir: "ch03/17-alerting-on-ai-failures" }),
    ],
  },
  {
    n: 4,
    title: "Responsible AI & Governance",
    lessons: [
      L(18, "bias-and-fairness-basics", "Bias & Fairness, Basics", { contentDir: "ch04/18-bias-and-fairness-basics" }),
      L(19, "privacy-considerations", "Privacy Considerations: PII in Prompts", { contentDir: "ch04/19-privacy-considerations" }),
      L(20, "compliance-overview", "Compliance, Overview: AI-Specific Regulations", { contentDir: "ch04/20-compliance-overview" }),
      L(21, "documentation-and-model-cards", "Documentation & Model Cards", { contentDir: "ch04/21-documentation-and-model-cards" }),
      L(22, "incident-response-for-ai-systems", "Incident Response for AI Systems", { contentDir: "ch04/22-incident-response-for-ai-systems" }),
    ],
  },
  {
    n: 5,
    title: "Capstone",
    lessons: [
      L(23, "capstone-kickoff", "Capstone Kickoff", { contentDir: "ch05/23-capstone-kickoff" }),
      L(24, "capstone-building-an-eval-and-monitoring-pipeline", "Capstone: Building an Eval + Monitoring Pipeline", { contentDir: "ch05/24-capstone-building-an-eval-and-monitoring-pipeline" }),
      L(25, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch05/25-capstone-wrap-up" }),
    ],
  },
];
