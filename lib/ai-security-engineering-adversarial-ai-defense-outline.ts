// AI Security Engineering & Adversarial AI Defense course outline. Lessons without a contentDir
// render as "in production". Course 14 of the Cybersecurity Analyst → Security Engineer path —
// the third of four Expert Specialization courses (any order), building on the whole path's
// security engineering, cloud security, and automation foundation.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/ai-security-engineering-adversarial-ai-defense/
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

export const AI_SECURITY_ENGINEERING_ADVERSARIAL_AI_DEFENSE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "AI and LLM Security Fundamentals",
    lessons: [
      L(1, "why-ai-systems-have-a-genuinely-new-attack-surface", "Why AI Systems Have a Genuinely New Attack Surface", { contentDir: "ch01/01-why-ai-systems-have-a-genuinely-new-attack-surface", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-security-engineering-adversarial-ai-defense/why-ai-systems-have-a-genuinely-new-attack-surface.mp4", durationLabel: "2 min 31 s" }),
      L(2, "the-owasp-top-10-for-llm-applications", "The OWASP Top 10 for LLM Applications", { contentDir: "ch01/02-the-owasp-top-10-for-llm-applications", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-security-engineering-adversarial-ai-defense/the-owasp-top-10-for-llm-applications.mp4", durationLabel: "3 min 1 s" }),
      L(3, "the-nist-ai-risk-management-framework", "The NIST AI Risk Management Framework", { contentDir: "ch01/03-the-nist-ai-risk-management-framework", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-security-engineering-adversarial-ai-defense/the-nist-ai-risk-management-framework.mp4", durationLabel: "2 min 43 s" }),
      L(4, "where-ai-security-overlaps-with-everything-you-already-know", "Where AI Security Overlaps with Everything You Already Know", { contentDir: "ch01/04-where-ai-security-overlaps-with-everything-you-already-know" }),
    ],
  },
  {
    n: 2,
    title: "Prompt Injection Attacks and Defenses",
    lessons: [
      L(5, "direct-prompt-injection-how-it-actually-works", "Direct Prompt Injection: How It Actually Works", { contentDir: "ch02/05-direct-prompt-injection-how-it-actually-works" }),
      L(6, "indirect-prompt-injection-when-the-attack-hides-in-retrieved-content", "Indirect Prompt Injection: When the Attack Hides in Retrieved Content", { contentDir: "ch02/06-indirect-prompt-injection-when-the-attack-hides-in-retrieved-content" }),
      L(7, "defenses-input-sanitization-isnt-enough-on-its-own", "Defenses: Input Sanitization Isn't Enough on Its Own", { contentDir: "ch02/07-defenses-input-sanitization-isnt-enough-on-its-own" }),
      L(8, "privilege-separation-for-llm-agents", "Privilege Separation for LLM Agents", { contentDir: "ch02/08-privilege-separation-for-llm-agents" }),
    ],
  },
  {
    n: 3,
    title: "Data Poisoning and Training-Time Attacks",
    lessons: [
      L(9, "what-data-poisoning-actually-targets", "What Data Poisoning Actually Targets", { contentDir: "ch03/09-what-data-poisoning-actually-targets" }),
      L(10, "supply-chain-risk-in-training-data-and-pretrained-models", "Supply Chain Risk in Training Data and Pretrained Models", { contentDir: "ch03/10-supply-chain-risk-in-training-data-and-pretrained-models" }),
      L(11, "backdoor-attacks-and-how-theyre-detected", "Backdoor Attacks, and How They're Detected", { contentDir: "ch03/11-backdoor-attacks-and-how-theyre-detected" }),
      L(12, "data-provenance-and-validation-as-a-defense", "Data Provenance and Validation as a Defense", { contentDir: "ch03/12-data-provenance-and-validation-as-a-defense" }),
    ],
  },
  {
    n: 4,
    title: "Model Extraction and Inversion Attacks",
    lessons: [
      L(13, "model-extraction-stealing-a-model-through-its-api", "Model Extraction: Stealing a Model Through Its API", { contentDir: "ch04/13-model-extraction-stealing-a-model-through-its-api" }),
      L(14, "model-inversion-and-membership-inference-attacks", "Model Inversion and Membership Inference Attacks", { contentDir: "ch04/14-model-inversion-and-membership-inference-attacks" }),
      L(15, "rate-limiting-and-query-monitoring-as-real-defenses", "Rate Limiting and Query Monitoring as Real Defenses", { contentDir: "ch04/15-rate-limiting-and-query-monitoring-as-real-defenses" }),
      L(16, "differential-privacy-concepts-for-protecting-training-data", "Differential Privacy Concepts for Protecting Training Data", { contentDir: "ch04/16-differential-privacy-concepts-for-protecting-training-data" }),
    ],
  },
  {
    n: 5,
    title: "Adversarial Examples and Evasion Attacks",
    lessons: [
      L(17, "what-an-adversarial-example-actually-is", "What an Adversarial Example Actually Is", { contentDir: "ch05/17-what-an-adversarial-example-actually-is" }),
      L(18, "evasion-attacks-against-classifiers-in-practice", "Evasion Attacks Against Classifiers in Practice", { contentDir: "ch05/18-evasion-attacks-against-classifiers-in-practice" }),
      L(19, "adversarial-robustness-techniques-and-their-real-tradeoffs", "Adversarial Robustness Techniques and Their Real Tradeoffs", { contentDir: "ch05/19-adversarial-robustness-techniques-and-their-real-tradeoffs" }),
      L(20, "testing-a-model-for-adversarial-robustness", "Testing a Model for Adversarial Robustness", { contentDir: "ch05/20-testing-a-model-for-adversarial-robustness" }),
    ],
  },
  {
    n: 6,
    title: "Securing AI Application Architecture",
    lessons: [
      L(21, "securing-a-rag-pipeline-end-to-end", "Securing a RAG Pipeline End to End", { contentDir: "ch06/21-securing-a-rag-pipeline-end-to-end" }),
      L(22, "api-security-for-ai-endpoints", "API Security for AI Endpoints", { contentDir: "ch06/22-api-security-for-ai-endpoints" }),
      L(23, "agent-security-tool-use-and-the-blast-radius-of-autonomy", "Agent Security: Tool Use and the Blast Radius of Autonomy", { contentDir: "ch06/23-agent-security-tool-use-and-the-blast-radius-of-autonomy" }),
      L(24, "secrets-and-credential-handling-in-ai-applications", "Secrets and Credential Handling in AI Applications", { contentDir: "ch06/24-secrets-and-credential-handling-in-ai-applications" }),
    ],
  },
  {
    n: 7,
    title: "AI Governance, Red-Teaming, and Compliance",
    lessons: [
      L(25, "ai-red-teaming-what-its-actually-testing-for", "AI Red-Teaming: What It's Actually Testing For", { contentDir: "ch07/25-ai-red-teaming-what-its-actually-testing-for" }),
      L(26, "building-an-ai-specific-threat-model", "Building an AI-Specific Threat Model", { contentDir: "ch07/26-building-an-ai-specific-threat-model" }),
      L(27, "ai-governance-frameworks-and-emerging-regulation", "AI Governance Frameworks and Emerging Regulation", { contentDir: "ch07/27-ai-governance-frameworks-and-emerging-regulation" }),
      L(28, "responsible-ai-and-security-where-they-actually-intersect", "Responsible AI and Security: Where They Actually Intersect", { contentDir: "ch07/28-responsible-ai-and-security-where-they-actually-intersect" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: Securing an AI Application End to End",
    lessons: [
      L(29, "lab-red-teaming-a-rag-application-for-prompt-injection", "Lab: Red-Teaming a RAG Application for Prompt Injection", { contentDir: "ch08/29-lab-red-teaming-a-rag-application-for-prompt-injection" }),
      L(30, "lab-building-a-security-review-checklist-for-an-ai-feature", "Lab: Building a Security Review Checklist for an AI Feature", { contentDir: "ch08/30-lab-building-a-security-review-checklist-for-an-ai-feature" }),
      L(31, "case-study-an-ai-agent-that-did-exactly-what-it-was-tricked-into-doing", "Case Study: An AI Agent That Did Exactly What It Was Tricked Into Doing", { contentDir: "ch08/31-case-study-an-ai-agent-that-did-exactly-what-it-was-tricked-into-doing" }),
      L(32, "chapter-capstone-ai-security-engineering-review", "Chapter Capstone: AI Security Engineering Review", { contentDir: "ch08/32-chapter-capstone-ai-security-engineering-review" }),
    ],
  },
];
