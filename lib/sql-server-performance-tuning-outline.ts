// The full SQL Server Performance Tuning course outline. Only lessons with
// a contentDir + videoUrl are playable; everything else renders as "in
// production". Goes far past T-SQL for DBAs' performance-troubleshooting
// chapter — this is performance tuning as its own discipline: query
// tuning, index tuning, wait-based methodology, and configuration tuning.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/sql-server-performance-tuning/
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

export const SQL_SERVER_PERFORMANCE_TUNING_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Performance Tuning Methodology",
    lessons: [
      L(1, "a-systematic-approach", "A Systematic Approach to Performance Tuning"),
      L(2, "defining-slow", "Defining \"Slow\""),
      L(3, "gathering-a-baseline", "Gathering a Performance Baseline"),
      L(4, "the-tuning-workflow", "The Tuning Workflow"),
      L(5, "tools-overview", "Tools Overview"),
    ],
  },
  {
    n: 2,
    title: "Understanding Execution Plans Deeply",
    lessons: [
      L(6, "reading-plans-in-depth", "Reading Execution Plans, in Depth"),
      L(7, "actual-vs-estimated-plans", "Actual vs. Estimated Plans"),
      L(8, "plan-operator-cost-analysis", "Plan Operator Cost Analysis"),
      L(9, "parameter-sniffing", "Parameter Sniffing"),
      L(10, "plan-cache-internals", "Plan Cache Internals"),
      L(11, "forcing-and-hinting-plans", "Forcing & Hinting Plans"),
    ],
  },
  {
    n: 3,
    title: "Index Tuning in Depth",
    lessons: [
      L(12, "index-design-principles", "Index Design Principles"),
      L(13, "covering-indexes", "Covering Indexes"),
      L(14, "included-columns", "Included Columns"),
      L(15, "filtered-indexes", "Filtered Indexes"),
      L(16, "columnstore-indexes-for-analytics", "Columnstore Indexes for Analytics"),
      L(17, "the-index-tuning-workflow", "The Index Tuning Workflow"),
    ],
  },
  {
    n: 4,
    title: "Query Tuning Techniques",
    lessons: [
      L(18, "rewriting-queries-for-performance", "Rewriting Queries for Performance"),
      L(19, "set-based-vs-procedural-thinking", "Set-Based vs. Procedural Thinking"),
      L(20, "avoiding-common-anti-patterns", "Avoiding Common Anti-Patterns"),
      L(21, "temp-tables-vs-table-variables", "Temp Tables vs. Table Variables"),
      L(22, "function-performance-pitfalls", "Function Performance Pitfalls"),
      L(23, "batch-processing-techniques", "Batch Processing Techniques"),
    ],
  },
  {
    n: 5,
    title: "Wait Statistics & Bottleneck Analysis",
    lessons: [
      L(24, "wait-stats-methodology", "Wait Stats Methodology"),
      L(25, "cpu-bound-troubleshooting", "CPU-Bound Troubleshooting"),
      L(26, "io-bound-troubleshooting", "I/O-Bound Troubleshooting"),
      L(27, "memory-pressure-diagnosis", "Memory Pressure Diagnosis"),
      L(28, "network-related-waits", "Network-Related Waits"),
    ],
  },
  {
    n: 6,
    title: "TempDB & Memory Tuning",
    lessons: [
      L(29, "tempdb-contention", "TempDB Contention"),
      L(30, "memory-grants", "Memory Grants"),
      L(31, "buffer-pool-tuning", "Buffer Pool Tuning"),
      L(32, "resource-governor-for-performance", "Resource Governor for Performance"),
    ],
  },
  {
    n: 7,
    title: "Query Store & Automatic Tuning",
    lessons: [
      L(33, "query-store-deep-dive", "Query Store, Deep Dive"),
      L(34, "forcing-plans", "Forcing Plans"),
      L(35, "automatic-plan-correction", "Automatic Plan Correction"),
      L(36, "regressed-query-workflows", "Regressed Query Workflows"),
      L(37, "query-store-in-production", "Query Store in Production"),
    ],
  },
  {
    n: 8,
    title: "Parallelism & Configuration Tuning",
    lessons: [
      L(38, "maxdop-and-cost-threshold", "MAXDOP & Cost Threshold for Parallelism"),
      L(39, "parallelism-troubleshooting", "Parallelism Troubleshooting"),
      L(40, "server-level-configuration-tuning", "Server-Level Configuration Tuning"),
      L(41, "instance-level-settings-for-performance", "Instance-Level Settings for Performance"),
      L(42, "hardware-considerations", "Hardware Considerations"),
    ],
  },
  {
    n: 9,
    title: "Monitoring for Performance",
    lessons: [
      L(43, "building-a-monitoring-baseline", "Building a Monitoring Baseline"),
      L(44, "alerting-on-performance-degradation", "Alerting on Performance Degradation"),
      L(45, "third-party-tools-overview", "Third-Party Tools, Overview"),
      L(46, "diy-monitoring-scripts", "DIY Monitoring Scripts"),
    ],
  },
  {
    n: 10,
    title: "Capstone",
    lessons: [
      L(47, "capstone-kickoff", "Capstone Kickoff: A Slow Production Database"),
      L(48, "capstone-diagnose", "Capstone: Diagnose"),
      L(49, "capstone-tune", "Capstone: Tune"),
      L(50, "capstone-validate", "Capstone: Validate the Fix"),
      L(51, "capstone-document-findings", "Capstone: Document Your Findings"),
      L(52, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
