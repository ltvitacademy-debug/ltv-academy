// The full Data Engineering Career & Capstone course outline. Only lessons
// with a contentDir + videoUrl are playable; everything else renders as
// "in production". Fourth and final course of a 4-course Data Engineering
// track: Foundations -> Azure Databricks & Delta Lake -> Microsoft Fabric &
// Real-Time Analytics -> Career & Capstone (this course).

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/career-capstone/
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

export const CAREER_CAPSTONE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "System Design for Data Engineers",
    lessons: [
      L(1, "what-is-system-design", "What Is System Design, for Data Engineers?", {
        contentDir: "ch01/01-what-is-system-design",
        // videoUrl/durationLabel pending
      }),
      L(2, "requirements-gathering", "Requirements Gathering — Functional vs. Non-Functional", {
        contentDir: "ch01/02-requirements-gathering",
        // videoUrl/durationLabel pending
      }),
      L(3, "back-of-the-envelope-estimation", "Back-of-the-Envelope Estimation", {
        contentDir: "ch01/03-back-of-the-envelope-estimation",
        // videoUrl/durationLabel pending
      }),
      L(4, "choosing-storage", "Choosing Storage — OLTP vs. OLAP vs. Object Storage", {
        contentDir: "ch01/04-choosing-storage",
        // videoUrl/durationLabel pending
      }),
      L(5, "choosing-a-processing-model", "Choosing a Processing Model — Batch, Streaming, or Hybrid", {
        contentDir: "ch01/05-choosing-a-processing-model",
        // videoUrl/durationLabel pending
      }),
      L(6, "the-lambda-architecture", "The Lambda Architecture", {
        contentDir: "ch01/06-the-lambda-architecture",
        // videoUrl/durationLabel pending
      }),
      L(7, "the-kappa-architecture", "The Kappa Architecture", {
        contentDir: "ch01/07-the-kappa-architecture",
        // videoUrl/durationLabel pending
      }),
      L(8, "data-modeling-at-scale", "Data Modeling at Scale — Star Schema Revisited", {
        contentDir: "ch01/08-data-modeling-at-scale",
        // videoUrl/durationLabel pending
      }),
      L(9, "partitioning-strategies", "Partitioning Strategies", {
        contentDir: "ch01/09-partitioning-strategies",
        // videoUrl/durationLabel pending
      }),
      L(10, "sharding-a-data-store", "Sharding a Data Store", {
        contentDir: "ch01/10-sharding-a-data-store",
        // videoUrl/durationLabel pending
      }),
      L(11, "designing-for-idempotency", "Designing for Idempotency", {
        contentDir: "ch01/11-designing-for-idempotency",
        // videoUrl/durationLabel pending
      }),
      L(12, "delivery-guarantees", "Exactly-Once vs. At-Least-Once Delivery", {
        contentDir: "ch01/12-delivery-guarantees",
        // videoUrl/durationLabel pending
      }),
      L(13, "designing-an-ingestion-layer", "Designing an Ingestion Layer", {
        contentDir: "ch01/13-designing-an-ingestion-layer",
        // videoUrl/durationLabel pending
      }),
      L(14, "designing-a-transformation-layer", "Designing a Transformation Layer", {
        contentDir: "ch01/14-designing-a-transformation-layer",
        // videoUrl/durationLabel pending
      }),
      L(15, "designing-a-serving-layer", "Designing a Serving Layer", {
        contentDir: "ch01/15-designing-a-serving-layer",
        // videoUrl/durationLabel pending
      }),
      L(16, "caching-strategies", "Caching Strategies for Analytics", {
        contentDir: "ch01/16-caching-strategies",
        // videoUrl/durationLabel pending
      }),
      L(17, "designing-for-multi-tenancy", "Designing for Multi-Tenancy", {
        contentDir: "ch01/17-designing-for-multi-tenancy",
        // videoUrl/durationLabel pending
      }),
      L(18, "designing-for-freshness-slas", "Designing for Data Freshness SLAs", {
        contentDir: "ch01/18-designing-for-freshness-slas",
        // videoUrl/durationLabel pending
      }),
      L(19, "cap-theorem-for-data-engineers", "Trade-off Analysis — CAP Theorem for Data Engineers", {
        contentDir: "ch01/19-cap-theorem-for-data-engineers",
        // videoUrl/durationLabel pending
      }),
      L(20, "case-study-ride-sharing-platform", "Case Study: A Ride-Sharing Analytics Platform", {
        contentDir: "ch01/20-case-study-ride-sharing-platform",
        // videoUrl/durationLabel pending
      }),
      L(21, "case-study-fraud-detection", "Case Study: A Real-Time Fraud Detection System", {
        contentDir: "ch01/21-case-study-fraud-detection",
        // videoUrl/durationLabel pending
      }),
      L(22, "case-study-retail-inventory", "Case Study: A Retail Inventory Data Platform", {
        contentDir: "ch01/22-case-study-retail-inventory",
        // videoUrl/durationLabel pending
      }),
      L(23, "case-study-social-media-analytics", "Case Study: A Social Media Analytics Pipeline", {
        contentDir: "ch01/23-case-study-social-media-analytics",
        // videoUrl/durationLabel pending
      }),
      L(24, "presenting-a-system-design", "Presenting a System Design — Whiteboarding Like an Interview", {
        contentDir: "ch01/24-presenting-a-system-design",
        // videoUrl/durationLabel pending
      }),
      L(25, "system-design-chapter-recap", "System Design Chapter Recap", {
        contentDir: "ch01/25-system-design-chapter-recap",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 2,
    title: "DP-700 Certification Prep",
    lessons: [
      L(26, "what-is-dp-700", "What Is the DP-700 Certification?", {
        contentDir: "ch02/26-what-is-dp-700",
        // videoUrl/durationLabel pending
      }),
      L(27, "exam-domains-and-weighting", "Exam Domains and Weighting", {
        contentDir: "ch02/27-exam-domains-and-weighting",
        // videoUrl/durationLabel pending
      }),
      L(28, "implementing-an-analytics-solution", "Implementing and Managing an Analytics Solution", {
        contentDir: "ch02/28-implementing-an-analytics-solution",
        // videoUrl/durationLabel pending
      }),
      L(29, "ingesting-and-transforming-exam-focus", "Ingesting and Transforming Data — Exam Focus", {
        contentDir: "ch02/29-ingesting-and-transforming-exam-focus",
        // videoUrl/durationLabel pending
      }),
      L(30, "monitoring-and-optimizing-exam-focus", "Monitoring and Optimizing a Solution — Exam Focus", {
        contentDir: "ch02/30-monitoring-and-optimizing-exam-focus",
        // videoUrl/durationLabel pending
      }),
      L(31, "practice-onelake-and-lakehouses", "Practice Questions: OneLake and Lakehouses", {
        contentDir: "ch02/31-practice-onelake-and-lakehouses",
        // videoUrl/durationLabel pending
      }),
      L(32, "practice-data-warehouses", "Practice Questions: Data Warehouses", {
        contentDir: "ch02/32-practice-data-warehouses",
        // videoUrl/durationLabel pending
      }),
      L(33, "practice-eventstreams-and-kql", "Practice Questions: Eventstreams and KQL", {
        contentDir: "ch02/33-practice-eventstreams-and-kql",
        // videoUrl/durationLabel pending
      }),
      L(34, "practice-notebooks-and-spark", "Practice Questions: Notebooks and Spark", {
        contentDir: "ch02/34-practice-notebooks-and-spark",
        // videoUrl/durationLabel pending
      }),
      L(35, "practice-security-and-governance", "Practice Questions: Security and Governance", {
        contentDir: "ch02/35-practice-security-and-governance",
        // videoUrl/durationLabel pending
      }),
      L(36, "practice-monitoring-and-deployment", "Practice Questions: Monitoring and Deployment", {
        contentDir: "ch02/36-practice-monitoring-and-deployment",
        // videoUrl/durationLabel pending
      }),
      L(37, "common-dp-700-traps", "Common DP-700 Traps and Gotchas", {
        contentDir: "ch02/37-common-dp-700-traps",
        // videoUrl/durationLabel pending
      }),
      L(38, "building-a-study-plan", "Building a Study Plan", {
        contentDir: "ch02/38-building-a-study-plan",
        // videoUrl/durationLabel pending
      }),
      L(39, "exam-day-strategy", "Exam-Day Strategy and Time Management", {
        contentDir: "ch02/39-exam-day-strategy",
        // videoUrl/durationLabel pending
      }),
      L(40, "full-length-practice-exam-part-1", "Full-Length Practice Exam, Part 1", {
        contentDir: "ch02/40-full-length-practice-exam-part-1",
        // videoUrl/durationLabel pending
      }),
      L(41, "full-length-practice-exam-part-2", "Full-Length Practice Exam, Part 2", {
        contentDir: "ch02/41-full-length-practice-exam-part-2",
        // videoUrl/durationLabel pending
      }),
      L(42, "dp-700-chapter-recap", "DP-700 Chapter Recap", {
        contentDir: "ch02/42-dp-700-chapter-recap",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 3,
    title: "AI for Data Engineers (Bonus)",
    lessons: [
      L(43, "why-ai-matters-now", "Why AI Matters for Data Engineers Now", {
        contentDir: "ch03/43-why-ai-matters-now",
        // videoUrl/durationLabel pending
      }),
      L(44, "copilot-in-fabric", "Copilot in Microsoft Fabric", {
        contentDir: "ch03/44-copilot-in-fabric",
        // videoUrl/durationLabel pending
      }),
      L(45, "copilot-generating-a-notebook", "Using Copilot to Generate a Notebook", {
        contentDir: "ch03/45-copilot-generating-a-notebook",
        // videoUrl/durationLabel pending
      }),
      L(46, "copilot-explaining-a-kql-query", "Using Copilot to Explain and Fix a KQL Query", {
        contentDir: "ch03/46-copilot-explaining-a-kql-query",
        // videoUrl/durationLabel pending
      }),
      L(47, "ai-assisted-anomaly-detection", "AI-Assisted Data Quality — Anomaly Detection Basics", {
        contentDir: "ch03/47-ai-assisted-anomaly-detection",
        // videoUrl/durationLabel pending
      }),
      L(48, "llms-for-data-documentation", "LLMs for Automated Data Documentation", {
        contentDir: "ch03/48-llms-for-data-documentation",
        // videoUrl/durationLabel pending
      }),
      L(49, "prompting-patterns-for-data-engineering", "Prompting Patterns for Data Engineering Tasks", {
        contentDir: "ch03/49-prompting-patterns-for-data-engineering",
        // videoUrl/durationLabel pending
      }),
      L(50, "rag-explained", "Retrieval-Augmented Generation (RAG), Explained", {
        contentDir: "ch03/50-rag-explained",
        // videoUrl/durationLabel pending
      }),
      L(51, "building-a-vector-index-over-a-catalog", "Building a Vector Index Over Your Data Catalog", {
        contentDir: "ch03/51-building-a-vector-index-over-a-catalog",
        // videoUrl/durationLabel pending
      }),
      L(52, "a-rag-pipeline-over-fabric-metadata", "A RAG Pipeline Over Fabric Metadata", {
        contentDir: "ch03/52-a-rag-pipeline-over-fabric-metadata",
        // videoUrl/durationLabel pending
      }),
      L(53, "ai-generated-test-cases", "AI-Generated Test Cases for Pipelines", {
        contentDir: "ch03/53-ai-generated-test-cases",
        // videoUrl/durationLabel pending
      }),
      L(54, "ai-drafted-root-cause-analysis", "Using an LLM to Draft a Root Cause Analysis", {
        contentDir: "ch03/54-ai-drafted-root-cause-analysis",
        // videoUrl/durationLabel pending
      }),
      L(55, "ai-assisted-schema-mapping", "AI-Assisted Schema Mapping", {
        contentDir: "ch03/55-ai-assisted-schema-mapping",
        // videoUrl/durationLabel pending
      }),
      L(56, "guardrails-what-not-to-hand-an-llm", "Guardrails — What Not to Hand an LLM", {
        contentDir: "ch03/56-guardrails-what-not-to-hand-an-llm",
        // videoUrl/durationLabel pending
      }),
      L(57, "cost-and-latency-tradeoffs-of-ai", "Cost and Latency Trade-offs of AI-Augmented Pipelines", {
        contentDir: "ch03/57-cost-and-latency-tradeoffs-of-ai",
        // videoUrl/durationLabel pending
      }),
      L(58, "evaluating-ai-output", "Evaluating AI Output for Correctness", {
        contentDir: "ch03/58-evaluating-ai-output",
        // videoUrl/durationLabel pending
      }),
      L(59, "worked-example-ai-assisted-debugging", "A Worked Example: AI-Assisted Pipeline Debugging", {
        contentDir: "ch03/59-worked-example-ai-assisted-debugging",
        // videoUrl/durationLabel pending
      }),
      L(60, "ai-and-production-practices", "Where AI Fits in the Production Practices From Course 3", {
        contentDir: "ch03/60-ai-and-production-practices",
        // videoUrl/durationLabel pending
      }),
      L(61, "the-limits-of-ai", "The Limits of AI in Data Engineering, Honestly", {
        contentDir: "ch03/61-the-limits-of-ai",
        // videoUrl/durationLabel pending
      }),
      L(62, "ai-chapter-recap", "AI for Data Engineers Chapter Recap", {
        contentDir: "ch03/62-ai-chapter-recap",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 4,
    title: "Added Projects — Capstones",
    lessons: [
      L(63, "capstone-overview", "Capstone Overview — What You'll Build", {
        contentDir: "ch04/63-capstone-overview",
        // videoUrl/durationLabel pending
      }),
      L(64, "project-1-kickoff-retail-analytics", "Project 1 Kickoff: A Real-Time Retail Analytics Platform", {
        contentDir: "ch04/64-project-1-kickoff-retail-analytics",
        // videoUrl/durationLabel pending
      }),
      L(65, "project-1-ingestion-design", "Project 1: Ingestion Design", {
        contentDir: "ch04/65-project-1-ingestion-design",
        // videoUrl/durationLabel pending
      }),
      L(66, "project-1-transformation-and-modeling", "Project 1: Transformation and Modeling", {
        contentDir: "ch04/66-project-1-transformation-and-modeling",
        // videoUrl/durationLabel pending
      }),
      L(67, "project-1-serving-and-dashboards", "Project 1: Serving and Dashboards", {
        contentDir: "ch04/67-project-1-serving-and-dashboards",
        // videoUrl/durationLabel pending
      }),
      L(68, "project-1-production-hardening", "Project 1: Production Hardening", {
        contentDir: "ch04/68-project-1-production-hardening",
        // videoUrl/durationLabel pending
      }),
      L(69, "project-1-wrap-up", "Project 1: Wrap-Up and Retrospective", {
        contentDir: "ch04/69-project-1-wrap-up",
        // videoUrl/durationLabel pending
      }),
      L(70, "project-2-kickoff-warehouse-migration", "Project 2 Kickoff: A Multi-Source Data Warehouse Migration", {
        contentDir: "ch04/70-project-2-kickoff-warehouse-migration",
        // videoUrl/durationLabel pending
      }),
      L(71, "project-2-assessment-and-migration-plan", "Project 2: Source Assessment and Migration Plan", {
        contentDir: "ch04/71-project-2-assessment-and-migration-plan",
        // videoUrl/durationLabel pending
      }),
      L(72, "project-2-building-the-target-warehouse", "Project 2: Building the Target Warehouse", {
        contentDir: "ch04/72-project-2-building-the-target-warehouse",
        // videoUrl/durationLabel pending
      }),
      L(73, "project-2-cutover-strategy", "Project 2: Cutover Strategy", {
        contentDir: "ch04/73-project-2-cutover-strategy",
        // videoUrl/durationLabel pending
      }),
      L(74, "project-2-wrap-up", "Project 2: Wrap-Up and Retrospective", {
        contentDir: "ch04/74-project-2-wrap-up",
        // videoUrl/durationLabel pending
      }),
      L(75, "project-3-kickoff-fraud-detector", "Project 3 Kickoff: An End-to-End Streaming Fraud Detector", {
        contentDir: "ch04/75-project-3-kickoff-fraud-detector",
        // videoUrl/durationLabel pending
      }),
      L(76, "project-3-ingestion-and-features", "Project 3: Streaming Ingestion and Feature Computation", {
        contentDir: "ch04/76-project-3-ingestion-and-features",
        // videoUrl/durationLabel pending
      }),
      L(77, "project-3-scoring-and-alerting", "Project 3: Real-Time Scoring and Alerting", {
        contentDir: "ch04/77-project-3-scoring-and-alerting",
        // videoUrl/durationLabel pending
      }),
      L(78, "project-3-wrap-up", "Project 3: Wrap-Up and Retrospective", {
        contentDir: "ch04/78-project-3-wrap-up",
        // videoUrl/durationLabel pending
      }),
      L(79, "building-your-portfolio", "Building Your Data Engineering Portfolio", {
        contentDir: "ch04/79-building-your-portfolio",
        // videoUrl/durationLabel pending
      }),
      L(80, "telling-your-project-story", "Telling Your Project Story in an Interview", {
        contentDir: "ch04/80-telling-your-project-story",
        // videoUrl/durationLabel pending
      }),
      L(81, "course-and-track-finale", "Data Engineering Career & Capstone — Course and Track Finale", {
        contentDir: "ch04/81-course-and-track-finale",
        // videoUrl/durationLabel pending
      }),
    ],
  },
];
