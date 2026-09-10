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
      L(2, "requirements-gathering", "Requirements Gathering — Functional vs. Non-Functional"),
      L(3, "back-of-the-envelope-estimation", "Back-of-the-Envelope Estimation"),
      L(4, "choosing-storage", "Choosing Storage — OLTP vs. OLAP vs. Object Storage"),
      L(5, "choosing-a-processing-model", "Choosing a Processing Model — Batch, Streaming, or Hybrid"),
      L(6, "the-lambda-architecture", "The Lambda Architecture"),
      L(7, "the-kappa-architecture", "The Kappa Architecture"),
      L(8, "data-modeling-at-scale", "Data Modeling at Scale — Star Schema Revisited"),
      L(9, "partitioning-strategies", "Partitioning Strategies"),
      L(10, "sharding-a-data-store", "Sharding a Data Store"),
      L(11, "designing-for-idempotency", "Designing for Idempotency"),
      L(12, "delivery-guarantees", "Exactly-Once vs. At-Least-Once Delivery"),
      L(13, "designing-an-ingestion-layer", "Designing an Ingestion Layer"),
      L(14, "designing-a-transformation-layer", "Designing a Transformation Layer"),
      L(15, "designing-a-serving-layer", "Designing a Serving Layer"),
      L(16, "caching-strategies", "Caching Strategies for Analytics"),
      L(17, "designing-for-multi-tenancy", "Designing for Multi-Tenancy"),
      L(18, "designing-for-freshness-slas", "Designing for Data Freshness SLAs"),
      L(19, "cap-theorem-for-data-engineers", "Trade-off Analysis — CAP Theorem for Data Engineers"),
      L(20, "case-study-ride-sharing-platform", "Case Study: A Ride-Sharing Analytics Platform"),
      L(21, "case-study-fraud-detection", "Case Study: A Real-Time Fraud Detection System"),
      L(22, "case-study-retail-inventory", "Case Study: A Retail Inventory Data Platform"),
      L(23, "case-study-social-media-analytics", "Case Study: A Social Media Analytics Pipeline"),
      L(24, "presenting-a-system-design", "Presenting a System Design — Whiteboarding Like an Interview"),
      L(25, "system-design-chapter-recap", "System Design Chapter Recap"),
    ],
  },
  {
    n: 2,
    title: "DP-700 Certification Prep",
    lessons: [
      L(26, "what-is-dp-700", "What Is the DP-700 Certification?"),
      L(27, "exam-domains-and-weighting", "Exam Domains and Weighting"),
      L(28, "implementing-an-analytics-solution", "Implementing and Managing an Analytics Solution"),
      L(29, "ingesting-and-transforming-exam-focus", "Ingesting and Transforming Data — Exam Focus"),
      L(30, "monitoring-and-optimizing-exam-focus", "Monitoring and Optimizing a Solution — Exam Focus"),
      L(31, "practice-onelake-and-lakehouses", "Practice Questions: OneLake and Lakehouses"),
      L(32, "practice-data-warehouses", "Practice Questions: Data Warehouses"),
      L(33, "practice-eventstreams-and-kql", "Practice Questions: Eventstreams and KQL"),
      L(34, "practice-notebooks-and-spark", "Practice Questions: Notebooks and Spark"),
      L(35, "practice-security-and-governance", "Practice Questions: Security and Governance"),
      L(36, "practice-monitoring-and-deployment", "Practice Questions: Monitoring and Deployment"),
      L(37, "common-dp-700-traps", "Common DP-700 Traps and Gotchas"),
      L(38, "building-a-study-plan", "Building a Study Plan"),
      L(39, "exam-day-strategy", "Exam-Day Strategy and Time Management"),
      L(40, "full-length-practice-exam-part-1", "Full-Length Practice Exam, Part 1"),
      L(41, "full-length-practice-exam-part-2", "Full-Length Practice Exam, Part 2"),
      L(42, "dp-700-chapter-recap", "DP-700 Chapter Recap"),
    ],
  },
  {
    n: 3,
    title: "AI for Data Engineers (Bonus)",
    lessons: [
      L(43, "why-ai-matters-now", "Why AI Matters for Data Engineers Now"),
      L(44, "copilot-in-fabric", "Copilot in Microsoft Fabric"),
      L(45, "copilot-generating-a-notebook", "Using Copilot to Generate a Notebook"),
      L(46, "copilot-explaining-a-kql-query", "Using Copilot to Explain and Fix a KQL Query"),
      L(47, "ai-assisted-anomaly-detection", "AI-Assisted Data Quality — Anomaly Detection Basics"),
      L(48, "llms-for-data-documentation", "LLMs for Automated Data Documentation"),
      L(49, "prompting-patterns-for-data-engineering", "Prompting Patterns for Data Engineering Tasks"),
      L(50, "rag-explained", "Retrieval-Augmented Generation (RAG), Explained"),
      L(51, "building-a-vector-index-over-a-catalog", "Building a Vector Index Over Your Data Catalog"),
      L(52, "a-rag-pipeline-over-fabric-metadata", "A RAG Pipeline Over Fabric Metadata"),
      L(53, "ai-generated-test-cases", "AI-Generated Test Cases for Pipelines"),
      L(54, "ai-drafted-root-cause-analysis", "Using an LLM to Draft a Root Cause Analysis"),
      L(55, "ai-assisted-schema-mapping", "AI-Assisted Schema Mapping"),
      L(56, "guardrails-what-not-to-hand-an-llm", "Guardrails — What Not to Hand an LLM"),
      L(57, "cost-and-latency-tradeoffs-of-ai", "Cost and Latency Trade-offs of AI-Augmented Pipelines"),
      L(58, "evaluating-ai-output", "Evaluating AI Output for Correctness"),
      L(59, "worked-example-ai-assisted-debugging", "A Worked Example: AI-Assisted Pipeline Debugging"),
      L(60, "ai-and-production-practices", "Where AI Fits in the Production Practices From Course 3"),
      L(61, "the-limits-of-ai", "The Limits of AI in Data Engineering, Honestly"),
      L(62, "ai-chapter-recap", "AI for Data Engineers Chapter Recap"),
    ],
  },
  {
    n: 4,
    title: "Added Projects — Capstones",
    lessons: [
      L(63, "capstone-overview", "Capstone Overview — What You'll Build"),
      L(64, "project-1-kickoff-retail-analytics", "Project 1 Kickoff: A Real-Time Retail Analytics Platform"),
      L(65, "project-1-ingestion-design", "Project 1: Ingestion Design"),
      L(66, "project-1-transformation-and-modeling", "Project 1: Transformation and Modeling"),
      L(67, "project-1-serving-and-dashboards", "Project 1: Serving and Dashboards"),
      L(68, "project-1-production-hardening", "Project 1: Production Hardening"),
      L(69, "project-1-wrap-up", "Project 1: Wrap-Up and Retrospective"),
      L(70, "project-2-kickoff-warehouse-migration", "Project 2 Kickoff: A Multi-Source Data Warehouse Migration"),
      L(71, "project-2-assessment-and-migration-plan", "Project 2: Source Assessment and Migration Plan"),
      L(72, "project-2-building-the-target-warehouse", "Project 2: Building the Target Warehouse"),
      L(73, "project-2-cutover-strategy", "Project 2: Cutover Strategy"),
      L(74, "project-2-wrap-up", "Project 2: Wrap-Up and Retrospective"),
      L(75, "project-3-kickoff-fraud-detector", "Project 3 Kickoff: An End-to-End Streaming Fraud Detector"),
      L(76, "project-3-ingestion-and-features", "Project 3: Streaming Ingestion and Feature Computation"),
      L(77, "project-3-scoring-and-alerting", "Project 3: Real-Time Scoring and Alerting"),
      L(78, "project-3-wrap-up", "Project 3: Wrap-Up and Retrospective"),
      L(79, "building-your-portfolio", "Building Your Data Engineering Portfolio"),
      L(80, "telling-your-project-story", "Telling Your Project Story in an Interview"),
      L(81, "course-and-track-finale", "Data Engineering Career & Capstone — Course and Track Finale"),
    ],
  },
];
