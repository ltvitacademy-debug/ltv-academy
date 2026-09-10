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
      L(1, "prompt-injection", "Prompt Injection"),
      L(2, "jailbreaking", "Jailbreaking"),
      L(3, "data-exfiltration-via-ai", "Data Exfiltration via AI"),
      L(4, "model-and-api-key-security", "Model & API Key Security"),
      L(5, "supply-chain-risks", "Supply Chain Risks: Third-Party Models"),
      L(6, "insecure-output-handling", "Insecure Output Handling"),
    ],
  },
  {
    n: 2,
    title: "Evaluating AI Systems",
    lessons: [
      L(7, "building-eval-datasets", "Building Eval Datasets"),
      L(8, "automated-eval-metrics", "Automated Eval Metrics: Accuracy, Relevance & Faithfulness"),
      L(9, "human-evaluation-processes", "Human Evaluation Processes"),
      L(10, "regression-testing-ai-systems", "Regression Testing AI Systems"),
      L(11, "red-teaming-your-own-ai-app", "Red-Teaming Your Own AI App"),
      L(12, "benchmarking-models", "Benchmarking Models"),
    ],
  },
  {
    n: 3,
    title: "Monitoring AI in Production",
    lessons: [
      L(13, "logging-ai-inputs-and-outputs-responsibly", "Logging AI Inputs & Outputs, Responsibly"),
      L(14, "tracking-cost-and-latency", "Tracking Cost & Latency"),
      L(15, "drift-detection", "Drift Detection"),
      L(16, "monitoring-for-hallucinations", "Monitoring for Hallucinations"),
      L(17, "alerting-on-ai-failures", "Alerting on AI Failures"),
    ],
  },
  {
    n: 4,
    title: "Responsible AI & Governance",
    lessons: [
      L(18, "bias-and-fairness-basics", "Bias & Fairness, Basics"),
      L(19, "privacy-considerations", "Privacy Considerations: PII in Prompts"),
      L(20, "compliance-overview", "Compliance, Overview: AI-Specific Regulations"),
      L(21, "documentation-and-model-cards", "Documentation & Model Cards"),
      L(22, "incident-response-for-ai-systems", "Incident Response for AI Systems"),
    ],
  },
  {
    n: 5,
    title: "Capstone",
    lessons: [
      L(23, "capstone-kickoff", "Capstone Kickoff"),
      L(24, "capstone-building-an-eval-and-monitoring-pipeline", "Capstone: Building an Eval + Monitoring Pipeline"),
      L(25, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
