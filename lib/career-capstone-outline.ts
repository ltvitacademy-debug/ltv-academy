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
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792146206/ltv-career-capstone/what-is-system-design.mp4",
        durationLabel: "1 min 4 s",
      }),
      L(2, "requirements-gathering", "Requirements Gathering — Functional vs. Non-Functional", {
        contentDir: "ch01/02-requirements-gathering",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792146249/ltv-career-capstone/requirements-gathering.mp4",
        durationLabel: "55 s",
      }),
      L(3, "back-of-the-envelope-estimation", "Back-of-the-Envelope Estimation", {
        contentDir: "ch01/03-back-of-the-envelope-estimation",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792146300/ltv-career-capstone/back-of-the-envelope-estimation.mp4",
        durationLabel: "60 s",
      }),
      L(4, "choosing-storage", "Choosing Storage — OLTP vs. OLAP vs. Object Storage", {
        contentDir: "ch01/04-choosing-storage",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792146343/ltv-career-capstone/choosing-storage.mp4",
        durationLabel: "1 min 3 s",
      }),
      L(5, "choosing-a-processing-model", "Choosing a Processing Model — Batch, Streaming, or Hybrid", {
        contentDir: "ch01/05-choosing-a-processing-model",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792146381/ltv-career-capstone/choosing-a-processing-model.mp4",
        durationLabel: "56 s",
      }),
      L(6, "the-lambda-architecture", "The Lambda Architecture", {
        contentDir: "ch01/06-the-lambda-architecture",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792146435/ltv-career-capstone/the-lambda-architecture.mp4",
        durationLabel: "1 min 6 s",
      }),
      L(7, "the-kappa-architecture", "The Kappa Architecture", {
        contentDir: "ch01/07-the-kappa-architecture",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792146473/ltv-career-capstone/the-kappa-architecture.mp4",
        durationLabel: "51 s",
      }),
      L(8, "data-modeling-at-scale", "Data Modeling at Scale — Star Schema Revisited", {
        contentDir: "ch01/08-data-modeling-at-scale",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792146533/ltv-career-capstone/data-modeling-at-scale.mp4",
        durationLabel: "1 min 17 s",
      }),
      L(9, "partitioning-strategies", "Partitioning Strategies", {
        contentDir: "ch01/09-partitioning-strategies",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792146603/ltv-career-capstone/partitioning-strategies.mp4",
        durationLabel: "1 min 25 s",
      }),
      L(10, "sharding-a-data-store", "Sharding a Data Store", {
        contentDir: "ch01/10-sharding-a-data-store",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792146669/ltv-career-capstone/sharding-a-data-store.mp4",
        durationLabel: "1 min 23 s",
      }),
      L(11, "designing-for-idempotency", "Designing for Idempotency", {
        contentDir: "ch01/11-designing-for-idempotency",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792146748/ltv-career-capstone/designing-for-idempotency.mp4",
        durationLabel: "1 min 32 s",
      }),
      L(12, "delivery-guarantees", "Exactly-Once vs. At-Least-Once Delivery", {
        contentDir: "ch01/12-delivery-guarantees",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792146819/ltv-career-capstone/delivery-guarantees.mp4",
        durationLabel: "1 min 29 s",
      }),
      L(13, "designing-an-ingestion-layer", "Designing an Ingestion Layer", {
        contentDir: "ch01/13-designing-an-ingestion-layer",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792146881/ltv-career-capstone/designing-an-ingestion-layer.mp4",
        durationLabel: "1 min 18 s",
      }),
      L(14, "designing-a-transformation-layer", "Designing a Transformation Layer", {
        contentDir: "ch01/14-designing-a-transformation-layer",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792146963/ltv-career-capstone/designing-a-transformation-layer.mp4",
        durationLabel: "1 min 30 s",
      }),
      L(15, "designing-a-serving-layer", "Designing a Serving Layer", {
        contentDir: "ch01/15-designing-a-serving-layer",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792147047/ltv-career-capstone/designing-a-serving-layer.mp4",
        durationLabel: "1 min 34 s",
      }),
      L(16, "caching-strategies", "Caching Strategies for Analytics", {
        contentDir: "ch01/16-caching-strategies",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792147123/ltv-career-capstone/caching-strategies.mp4",
        durationLabel: "1 min 33 s",
      }),
      L(17, "designing-for-multi-tenancy", "Designing for Multi-Tenancy", {
        contentDir: "ch01/17-designing-for-multi-tenancy",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792147196/ltv-career-capstone/designing-for-multi-tenancy.mp4",
        durationLabel: "1 min 31 s",
      }),
      L(18, "designing-for-freshness-slas", "Designing for Data Freshness SLAs", {
        contentDir: "ch01/18-designing-for-freshness-slas",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792147266/ltv-career-capstone/designing-for-freshness-slas.mp4",
        durationLabel: "1 min 25 s",
      }),
      L(19, "cap-theorem-for-data-engineers", "Trade-off Analysis — CAP Theorem for Data Engineers", {
        contentDir: "ch01/19-cap-theorem-for-data-engineers",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792147337/ltv-career-capstone/cap-theorem-for-data-engineers.mp4",
        durationLabel: "1 min 27 s",
      }),
      L(20, "case-study-ride-sharing-platform", "Case Study: A Ride-Sharing Analytics Platform", {
        contentDir: "ch01/20-case-study-ride-sharing-platform",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792147403/ltv-career-capstone/case-study-ride-sharing-platform.mp4",
        durationLabel: "1 min 24 s",
      }),
      L(21, "case-study-fraud-detection", "Case Study: A Real-Time Fraud Detection System", {
        contentDir: "ch01/21-case-study-fraud-detection",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792147471/ltv-career-capstone/case-study-fraud-detection.mp4",
        durationLabel: "1 min 19 s",
      }),
      L(22, "case-study-retail-inventory", "Case Study: A Retail Inventory Data Platform", {
        contentDir: "ch01/22-case-study-retail-inventory",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792147536/ltv-career-capstone/case-study-retail-inventory.mp4",
        durationLabel: "1 min 25 s",
      }),
      L(23, "case-study-social-media-analytics", "Case Study: A Social Media Analytics Pipeline", {
        contentDir: "ch01/23-case-study-social-media-analytics",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792147606/ltv-career-capstone/case-study-social-media-analytics.mp4",
        durationLabel: "1 min 26 s",
      }),
      L(24, "presenting-a-system-design", "Presenting a System Design — Whiteboarding Like an Interview", {
        contentDir: "ch01/24-presenting-a-system-design",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792147672/ltv-career-capstone/presenting-a-system-design.mp4",
        durationLabel: "1 min 19 s",
      }),
      L(25, "system-design-chapter-recap", "System Design Chapter Recap", {
        contentDir: "ch01/25-system-design-chapter-recap",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792147727/ltv-career-capstone/system-design-chapter-recap.mp4",
        durationLabel: "1 min 12 s",
      }),
    ],
  },
  {
    n: 2,
    title: "DP-700 Certification Prep",
    lessons: [
      L(26, "what-is-dp-700", "What Is the DP-700 Certification?", {
        contentDir: "ch02/26-what-is-dp-700",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792147802/ltv-career-capstone/what-is-dp-700.mp4",
        durationLabel: "1 min 27 s",
      }),
      L(27, "exam-domains-and-weighting", "Exam Domains and Weighting", {
        contentDir: "ch02/27-exam-domains-and-weighting",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792147860/ltv-career-capstone/exam-domains-and-weighting.mp4",
        durationLabel: "1 min 24 s",
      }),
      L(28, "implementing-an-analytics-solution", "Implementing and Managing an Analytics Solution", {
        contentDir: "ch02/28-implementing-an-analytics-solution",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792147916/ltv-career-capstone/implementing-an-analytics-solution.mp4",
        durationLabel: "1 min 21 s",
      }),
      L(29, "ingesting-and-transforming-exam-focus", "Ingesting and Transforming Data — Exam Focus", {
        contentDir: "ch02/29-ingesting-and-transforming-exam-focus",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792147981/ltv-career-capstone/ingesting-and-transforming-exam-focus.mp4",
        durationLabel: "1 min 16 s",
      }),
      L(30, "monitoring-and-optimizing-exam-focus", "Monitoring and Optimizing a Solution — Exam Focus", {
        contentDir: "ch02/30-monitoring-and-optimizing-exam-focus",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792148046/ltv-career-capstone/monitoring-and-optimizing-exam-focus.mp4",
        durationLabel: "1 min 15 s",
      }),
      L(31, "practice-onelake-and-lakehouses", "Practice Questions: OneLake and Lakehouses", {
        contentDir: "ch02/31-practice-onelake-and-lakehouses",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792148097/ltv-career-capstone/practice-onelake-and-lakehouses.mp4",
        durationLabel: "1 min 0 s",
      }),
      L(32, "practice-data-warehouses", "Practice Questions: Data Warehouses", {
        contentDir: "ch02/32-practice-data-warehouses",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792148153/ltv-career-capstone/practice-data-warehouses.mp4",
        durationLabel: "1 min 11 s",
      }),
      L(33, "practice-eventstreams-and-kql", "Practice Questions: Eventstreams and KQL", {
        contentDir: "ch02/33-practice-eventstreams-and-kql",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792148201/ltv-career-capstone/practice-eventstreams-and-kql.mp4",
        durationLabel: "1 min 4 s",
      }),
      L(34, "practice-notebooks-and-spark", "Practice Questions: Notebooks and Spark", {
        contentDir: "ch02/34-practice-notebooks-and-spark",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792148240/ltv-career-capstone/practice-notebooks-and-spark.mp4",
        durationLabel: "58 s",
      }),
      L(35, "practice-security-and-governance", "Practice Questions: Security and Governance", {
        contentDir: "ch02/35-practice-security-and-governance",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792148296/ltv-career-capstone/practice-security-and-governance.mp4",
        durationLabel: "1 min 25 s",
      }),
      L(36, "practice-monitoring-and-deployment", "Practice Questions: Monitoring and Deployment", {
        contentDir: "ch02/36-practice-monitoring-and-deployment",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792148350/ltv-career-capstone/practice-monitoring-and-deployment.mp4",
        durationLabel: "1 min 23 s",
      }),
      L(37, "common-dp-700-traps", "Common DP-700 Traps and Gotchas", {
        contentDir: "ch02/37-common-dp-700-traps",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792148397/ltv-career-capstone/common-dp-700-traps.mp4",
        durationLabel: "1 min 9 s",
      }),
      L(38, "building-a-study-plan", "Building a Study Plan", {
        contentDir: "ch02/38-building-a-study-plan",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792148457/ltv-career-capstone/building-a-study-plan.mp4",
        durationLabel: "1 min 26 s",
      }),
      L(39, "exam-day-strategy", "Exam-Day Strategy and Time Management", {
        contentDir: "ch02/39-exam-day-strategy",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792148502/ltv-career-capstone/exam-day-strategy.mp4",
        durationLabel: "1 min 8 s",
      }),
      L(40, "full-length-practice-exam-part-1", "Full-Length Practice Exam, Part 1", {
        contentDir: "ch02/40-full-length-practice-exam-part-1",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792148547/ltv-career-capstone/full-length-practice-exam-part-1.mp4",
        durationLabel: "1 min 12 s",
      }),
      L(41, "full-length-practice-exam-part-2", "Full-Length Practice Exam, Part 2", {
        contentDir: "ch02/41-full-length-practice-exam-part-2",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792148596/ltv-career-capstone/full-length-practice-exam-part-2.mp4",
        durationLabel: "1 min 11 s",
      }),
      L(42, "dp-700-chapter-recap", "DP-700 Chapter Recap", {
        contentDir: "ch02/42-dp-700-chapter-recap",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792148651/ltv-career-capstone/dp-700-chapter-recap.mp4",
        durationLabel: "1 min 24 s",
      }),
    ],
  },
  {
    n: 3,
    title: "AI for Data Engineers (Bonus)",
    lessons: [
      L(43, "why-ai-matters-now", "Why AI Matters for Data Engineers Now", {
        contentDir: "ch03/43-why-ai-matters-now",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792148699/ltv-career-capstone/why-ai-matters-now.mp4",
        durationLabel: "1 min 13 s",
      }),
      L(44, "copilot-in-fabric", "Copilot in Microsoft Fabric", {
        contentDir: "ch03/44-copilot-in-fabric",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792148750/ltv-career-capstone/copilot-in-fabric.mp4",
        durationLabel: "1 min 24 s",
      }),
      L(45, "copilot-generating-a-notebook", "Using Copilot to Generate a Notebook", {
        contentDir: "ch03/45-copilot-generating-a-notebook",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792148803/ltv-career-capstone/copilot-generating-a-notebook.mp4",
        durationLabel: "1 min 19 s",
      }),
      L(46, "copilot-explaining-a-kql-query", "Using Copilot to Explain and Fix a KQL Query", {
        contentDir: "ch03/46-copilot-explaining-a-kql-query",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792148857/ltv-career-capstone/copilot-explaining-a-kql-query.mp4",
        durationLabel: "1 min 16 s",
      }),
      L(47, "ai-assisted-anomaly-detection", "AI-Assisted Data Quality — Anomaly Detection Basics", {
        contentDir: "ch03/47-ai-assisted-anomaly-detection",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792148913/ltv-career-capstone/ai-assisted-anomaly-detection.mp4",
        durationLabel: "1 min 19 s",
      }),
      L(48, "llms-for-data-documentation", "LLMs for Automated Data Documentation", {
        contentDir: "ch03/48-llms-for-data-documentation",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792148963/ltv-career-capstone/llms-for-data-documentation.mp4",
        durationLabel: "1 min 22 s",
      }),
      L(49, "prompting-patterns-for-data-engineering", "Prompting Patterns for Data Engineering Tasks", {
        contentDir: "ch03/49-prompting-patterns-for-data-engineering",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792149010/ltv-career-capstone/prompting-patterns-for-data-engineering.mp4",
        durationLabel: "1 min 17 s",
      }),
      L(50, "rag-explained", "Retrieval-Augmented Generation (RAG), Explained", {
        contentDir: "ch03/50-rag-explained",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792149066/ltv-career-capstone/rag-explained.mp4",
        durationLabel: "1 min 22 s",
      }),
      L(51, "building-a-vector-index-over-a-catalog", "Building a Vector Index Over Your Data Catalog", {
        contentDir: "ch03/51-building-a-vector-index-over-a-catalog",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792149125/ltv-career-capstone/building-a-vector-index-over-a-catalog.mp4",
        durationLabel: "1 min 29 s",
      }),
      L(52, "a-rag-pipeline-over-fabric-metadata", "A RAG Pipeline Over Fabric Metadata", {
        contentDir: "ch03/52-a-rag-pipeline-over-fabric-metadata",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792149183/ltv-career-capstone/a-rag-pipeline-over-fabric-metadata.mp4",
        durationLabel: "1 min 24 s",
      }),
      L(53, "ai-generated-test-cases", "AI-Generated Test Cases for Pipelines", {
        contentDir: "ch03/53-ai-generated-test-cases",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792149226/ltv-career-capstone/ai-generated-test-cases.mp4",
        durationLabel: "1 min 1 s",
      }),
      L(54, "ai-drafted-root-cause-analysis", "Using an LLM to Draft a Root Cause Analysis", {
        contentDir: "ch03/54-ai-drafted-root-cause-analysis",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792149268/ltv-career-capstone/ai-drafted-root-cause-analysis.mp4",
        durationLabel: "1 min 2 s",
      }),
      L(55, "ai-assisted-schema-mapping", "AI-Assisted Schema Mapping", {
        contentDir: "ch03/55-ai-assisted-schema-mapping",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792149308/ltv-career-capstone/ai-assisted-schema-mapping.mp4",
        durationLabel: "1 min 1 s",
      }),
      L(56, "guardrails-what-not-to-hand-an-llm", "Guardrails — What Not to Hand an LLM", {
        contentDir: "ch03/56-guardrails-what-not-to-hand-an-llm",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792149354/ltv-career-capstone/guardrails-what-not-to-hand-an-llm.mp4",
        durationLabel: "1 min 6 s",
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
