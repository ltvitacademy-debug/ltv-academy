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
      L(1, "a-systematic-approach", "A Systematic Approach to Performance Tuning", {
        contentDir: "ch01/01-a-systematic-approach",
        // videoUrl/durationLabel pending
      }),
      L(2, "defining-slow", "Defining \"Slow\"", { contentDir: "ch01/02-defining-slow" }),
      L(3, "gathering-a-baseline", "Gathering a Performance Baseline", { contentDir: "ch01/03-gathering-a-baseline" }),
      L(4, "the-tuning-workflow", "The Tuning Workflow", { contentDir: "ch01/04-the-tuning-workflow" }),
      L(5, "tools-overview", "Tools Overview", { contentDir: "ch01/05-tools-overview" }),
    ],
  },
  {
    n: 2,
    title: "Understanding Execution Plans Deeply",
    lessons: [
      L(6, "reading-plans-in-depth", "Reading Execution Plans, in Depth", { contentDir: "ch02/06-reading-plans-in-depth" }),
      L(7, "actual-vs-estimated-plans", "Actual vs. Estimated Plans", { contentDir: "ch02/07-actual-vs-estimated-plans" }),
      L(8, "plan-operator-cost-analysis", "Plan Operator Cost Analysis", { contentDir: "ch02/08-plan-operator-cost-analysis" }),
      L(9, "parameter-sniffing", "Parameter Sniffing", { contentDir: "ch02/09-parameter-sniffing" }),
      L(10, "plan-cache-internals", "Plan Cache Internals", { contentDir: "ch02/10-plan-cache-internals" }),
      L(11, "forcing-and-hinting-plans", "Forcing & Hinting Plans", { contentDir: "ch02/11-forcing-and-hinting-plans" }),
    ],
  },
  {
    n: 3,
    title: "Index Tuning in Depth",
    lessons: [
      L(12, "index-design-principles", "Index Design Principles", { contentDir: "ch03/12-index-design-principles" }),
      L(13, "covering-indexes", "Covering Indexes", { contentDir: "ch03/13-covering-indexes" }),
      L(14, "included-columns", "Included Columns", { contentDir: "ch03/14-included-columns" }),
      L(15, "filtered-indexes", "Filtered Indexes", { contentDir: "ch03/15-filtered-indexes" }),
      L(16, "columnstore-indexes-for-analytics", "Columnstore Indexes for Analytics", { contentDir: "ch03/16-columnstore-indexes-for-analytics" }),
      L(17, "the-index-tuning-workflow", "The Index Tuning Workflow", { contentDir: "ch03/17-the-index-tuning-workflow" }),
    ],
  },
  {
    n: 4,
    title: "Query Tuning Techniques",
    lessons: [
      L(18, "rewriting-queries-for-performance", "Rewriting Queries for Performance", { contentDir: "ch04/18-rewriting-queries-for-performance" }),
      L(19, "set-based-vs-procedural-thinking", "Set-Based vs. Procedural Thinking", { contentDir: "ch04/19-set-based-vs-procedural-thinking" }),
      L(20, "avoiding-common-anti-patterns", "Avoiding Common Anti-Patterns", { contentDir: "ch04/20-avoiding-common-anti-patterns" }),
      L(21, "temp-tables-vs-table-variables", "Temp Tables vs. Table Variables", { contentDir: "ch04/21-temp-tables-vs-table-variables" }),
      L(22, "function-performance-pitfalls", "Function Performance Pitfalls", { contentDir: "ch04/22-function-performance-pitfalls" }),
      L(23, "batch-processing-techniques", "Batch Processing Techniques", { contentDir: "ch04/23-batch-processing-techniques" }),
    ],
  },
  {
    n: 5,
    title: "Wait Statistics & Bottleneck Analysis",
    lessons: [
      L(24, "wait-stats-methodology", "Wait Stats Methodology", { contentDir: "ch05/24-wait-stats-methodology" }),
      L(25, "cpu-bound-troubleshooting", "CPU-Bound Troubleshooting", { contentDir: "ch05/25-cpu-bound-troubleshooting" }),
      L(26, "io-bound-troubleshooting", "I/O-Bound Troubleshooting", { contentDir: "ch05/26-io-bound-troubleshooting" }),
      L(27, "memory-pressure-diagnosis", "Memory Pressure Diagnosis", { contentDir: "ch05/27-memory-pressure-diagnosis" }),
      L(28, "network-related-waits", "Network-Related Waits", { contentDir: "ch05/28-network-related-waits" }),
    ],
  },
  {
    n: 6,
    title: "TempDB & Memory Tuning",
    lessons: [
      L(29, "tempdb-contention", "TempDB Contention", { contentDir: "ch06/29-tempdb-contention" }),
      L(30, "memory-grants", "Memory Grants", { contentDir: "ch06/30-memory-grants" }),
      L(31, "buffer-pool-tuning", "Buffer Pool Tuning", { contentDir: "ch06/31-buffer-pool-tuning" }),
      L(32, "resource-governor-for-performance", "Resource Governor for Performance", { contentDir: "ch06/32-resource-governor-for-performance" }),
    ],
  },
  {
    n: 7,
    title: "Query Store & Automatic Tuning",
    lessons: [
      L(33, "query-store-deep-dive", "Query Store, Deep Dive", { contentDir: "ch07/33-query-store-deep-dive" }),
      L(34, "forcing-plans", "Forcing Plans", { contentDir: "ch07/34-forcing-plans" }),
      L(35, "automatic-plan-correction", "Automatic Plan Correction", { contentDir: "ch07/35-automatic-plan-correction" }),
      L(36, "regressed-query-workflows", "Regressed Query Workflows", { contentDir: "ch07/36-regressed-query-workflows" }),
      L(37, "query-store-in-production", "Query Store in Production", { contentDir: "ch07/37-query-store-in-production" }),
    ],
  },
  {
    n: 8,
    title: "Parallelism & Configuration Tuning",
    lessons: [
      L(38, "maxdop-and-cost-threshold", "MAXDOP & Cost Threshold for Parallelism", { contentDir: "ch08/38-maxdop-and-cost-threshold" }),
      L(39, "parallelism-troubleshooting", "Parallelism Troubleshooting", { contentDir: "ch08/39-parallelism-troubleshooting" }),
      L(40, "server-level-configuration-tuning", "Server-Level Configuration Tuning", { contentDir: "ch08/40-server-level-configuration-tuning" }),
      L(41, "instance-level-settings-for-performance", "Instance-Level Settings for Performance", { contentDir: "ch08/41-instance-level-settings-for-performance" }),
      L(42, "hardware-considerations", "Hardware Considerations", { contentDir: "ch08/42-hardware-considerations" }),
    ],
  },
  {
    n: 9,
    title: "Monitoring for Performance",
    lessons: [
      L(43, "building-a-monitoring-baseline", "Building a Monitoring Baseline", {
        contentDir: "ch09/43-building-a-monitoring-baseline",
      }),
      L(44, "alerting-on-performance-degradation", "Alerting on Performance Degradation", {
        contentDir: "ch09/44-alerting-on-performance-degradation",
      }),
      L(45, "third-party-tools-overview", "Third-Party Tools, Overview", {
        contentDir: "ch09/45-third-party-tools-overview",
      }),
      L(46, "diy-monitoring-scripts", "DIY Monitoring Scripts", {
        contentDir: "ch09/46-diy-monitoring-scripts",
      }),
    ],
  },
  {
    n: 10,
    title: "Capstone",
    lessons: [
      L(47, "capstone-kickoff", "Capstone Kickoff: A Slow Production Database", {
        contentDir: "ch10/47-capstone-kickoff",
      }),
      L(48, "capstone-diagnose", "Capstone: Diagnose", {
        contentDir: "ch10/48-capstone-diagnose",
      }),
      L(49, "capstone-tune", "Capstone: Tune", {
        contentDir: "ch10/49-capstone-tune",
      }),
      L(50, "capstone-validate", "Capstone: Validate the Fix", {
        contentDir: "ch10/50-capstone-validate",
      }),
      L(51, "capstone-document-findings", "Capstone: Document Your Findings", {
        contentDir: "ch10/51-capstone-document-findings",
      }),
      L(52, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", {
        contentDir: "ch10/52-capstone-wrap-up",
      }),
    ],
  },
];
