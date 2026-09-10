// The full Microsoft Fabric & Real-Time Analytics course outline. Only lessons
// with a contentDir + videoUrl are playable; everything else renders as
// "in production". Third of a 4-course Data Engineering track: Foundations ->
// Azure Databricks & Delta Lake -> Microsoft Fabric & Real-Time Analytics
// (this course) -> Career & Capstone.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/fabric-realtime/
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

export const FABRIC_REALTIME_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Microsoft Fabric",
    lessons: [
      L(1, "what-is-microsoft-fabric", "What Is Microsoft Fabric?", {
        contentDir: "ch01/01-what-is-microsoft-fabric",
        // videoUrl/durationLabel pending
      }),
      L(2, "fabric-workspaces", "Fabric Workspaces", {
        contentDir: "ch01/02-fabric-workspaces",
        // videoUrl/durationLabel pending
      }),
      L(3, "onelake", "OneLake — One Lake for the Whole Organization", {
        contentDir: "ch01/03-onelake",
        // videoUrl/durationLabel pending
      }),
      L(4, "creating-a-lakehouse", "Creating a Lakehouse", {
        contentDir: "ch01/04-creating-a-lakehouse",
        // videoUrl/durationLabel pending
      }),
      L(5, "fabric-lakehouse-vs-databricks-lakehouse", "Fabric Lakehouse vs. Databricks Lakehouse", {
        contentDir: "ch01/05-fabric-lakehouse-vs-databricks-lakehouse",
        // videoUrl/durationLabel pending
      }),
      L(6, "fabric-notebooks", "Fabric Notebooks", {
        contentDir: "ch01/06-fabric-notebooks",
        // videoUrl/durationLabel pending
      }),
      L(7, "shortcuts", "Shortcuts — Referencing Data Without Copying It", {
        contentDir: "ch01/07-shortcuts",
        // videoUrl/durationLabel pending
      }),
      L(8, "fabric-data-factory-pipelines", "Fabric Data Factory — Pipelines", {
        contentDir: "ch01/08-fabric-data-factory-pipelines",
        // videoUrl/durationLabel pending
      }),
      L(9, "dataflows-gen2", "Dataflows Gen2", {
        contentDir: "ch01/09-dataflows-gen2",
        // videoUrl/durationLabel pending
      }),
      L(10, "fabric-warehouse", "Fabric Warehouse", {
        contentDir: "ch01/10-fabric-warehouse",
        // videoUrl/durationLabel pending
      }),
      L(11, "lakehouse-vs-warehouse", "Lakehouse vs. Warehouse — Choosing the Right Engine", {
        contentDir: "ch01/11-lakehouse-vs-warehouse",
        // videoUrl/durationLabel pending
      }),
      L(12, "direct-lake-mode", "Direct Lake Mode", {
        contentDir: "ch01/12-direct-lake-mode",
        // videoUrl/durationLabel pending
      }),
      L(13, "semantic-models-in-fabric", "Semantic Models in Fabric", {
        contentDir: "ch01/13-semantic-models-in-fabric",
        // videoUrl/durationLabel pending
      }),
      L(14, "fabric-capacities-and-skus", "Fabric Capacities and SKUs", {
        contentDir: "ch01/14-fabric-capacities-and-skus",
        // videoUrl/durationLabel pending
      }),
      L(15, "git-integration-and-deployment-pipelines", "Git Integration and Deployment Pipelines", {
        contentDir: "ch01/15-git-integration-and-deployment-pipelines",
        // videoUrl/durationLabel pending
      }),
      L(16, "the-monitoring-hub", "The Monitoring Hub", {
        contentDir: "ch01/16-the-monitoring-hub",
        // videoUrl/durationLabel pending
      }),
      L(17, "fabric-chapter-recap", "Fabric Chapter Recap — Where This Fits With Databricks", {
        contentDir: "ch01/17-fabric-chapter-recap",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 2,
    title: "Real-Time Data Engineering",
    lessons: [
      L(18, "what-is-real-time-intelligence", "What Is Real-Time Intelligence?", {
        contentDir: "ch02/18-what-is-real-time-intelligence",
        // videoUrl/durationLabel pending
      }),
      L(19, "eventstreams", "Eventstreams — Ingesting Streaming Data", {
        contentDir: "ch02/19-eventstreams",
        // videoUrl/durationLabel pending
      }),
      L(20, "event-sources", "Event Sources: Azure Event Hubs and IoT Hub", {
        contentDir: "ch02/20-event-sources",
        // videoUrl/durationLabel pending
      }),
      L(21, "eventhouse-and-kql-database", "Eventhouse and KQL Database", {
        contentDir: "ch02/21-eventhouse-and-kql-database",
        // videoUrl/durationLabel pending
      }),
      L(22, "what-is-kql", "What Is KQL?", {
        contentDir: "ch02/22-what-is-kql",
        // videoUrl/durationLabel pending
      }),
      L(23, "kql-where-and-project", "KQL: Basic Queries With where and project", {
        contentDir: "ch02/23-kql-where-and-project",
        // videoUrl/durationLabel pending
      }),
      L(24, "kql-summarize", "KQL: summarize and Aggregations", {
        contentDir: "ch02/24-kql-summarize",
        // videoUrl/durationLabel pending
      }),
      L(25, "kql-joins", "KQL: Joins", {
        contentDir: "ch02/25-kql-joins",
        // videoUrl/durationLabel pending
      }),
      L(26, "kql-time-series-functions", "KQL: Time Series Functions", {
        contentDir: "ch02/26-kql-time-series-functions",
        // videoUrl/durationLabel pending
      }),
      L(27, "ingesting-data-into-kql", "Ingesting Data Into a KQL Database", {
        contentDir: "ch02/27-ingesting-data-into-kql",
        // videoUrl/durationLabel pending
      }),
      L(28, "real-time-dashboards", "Real-Time Dashboards"),
      L(29, "windowing-in-streaming-data", "Windowing in Streaming Data"),
      L(30, "tumbling-windows", "Tumbling Windows"),
      L(31, "hopping-and-sliding-windows", "Hopping and Sliding Windows"),
      L(32, "session-windows", "Session Windows"),
      L(33, "watermarks-in-real-streaming-systems", "Watermarks in Real Streaming Systems"),
      L(34, "handling-out-of-order-events", "Handling Out-of-Order Events"),
      L(35, "eventstream-transformations", "Eventstream Transformations"),
      L(36, "routing-events-to-multiple-destinations", "Routing Events to Multiple Destinations"),
      L(37, "activator-real-time-alerting", "Activator — Real-Time Alerting"),
      L(38, "change-data-capture-streamed", "Change Data Capture, Streamed"),
      L(39, "real-time-data-quality", "Real-Time Data Quality"),
      L(40, "fabric-realtime-vs-databricks-streaming", "Comparing Fabric Real-Time to Databricks Structured Streaming"),
      L(41, "a-real-time-nyc-taxi-dashboard", "A Real-Time NYC Taxi Dashboard, Start to Finish"),
      L(42, "real-time-chapter-recap", "Real-Time Chapter Recap"),
    ],
  },
  {
    n: 3,
    title: "Production Data Engineering",
    lessons: [
      L(43, "what-makes-a-pipeline-production-ready", "What Makes a Pipeline \"Production Ready\"?"),
      L(44, "environments-dev-test-prod", "Environments: Dev, Test, and Prod"),
      L(45, "ci-cd-for-data-pipelines", "CI/CD for Data Pipelines"),
      L(46, "version-control-for-notebooks-and-pipelines", "Version Control for Notebooks and Pipelines"),
      L(47, "infrastructure-as-code", "Infrastructure as Code — ARM/Bicep and Terraform Basics"),
      L(48, "testing-data-pipelines", "Testing Data Pipelines"),
      L(49, "unit-testing-pyspark-transformations", "Unit Testing PySpark Transformations"),
      L(50, "data-contracts", "Data Contracts"),
      L(51, "schema-drift-and-breaking-changes", "Schema Drift and Breaking Changes"),
      L(52, "observability-logs-metrics-traces", "Observability: Logs, Metrics, and Traces"),
      L(53, "alerts-for-pipeline-failures", "Setting Up Alerts for Pipeline Failures"),
      L(54, "cost-management-and-optimization", "Cost Management and Optimization"),
      L(55, "right-sizing-compute", "Right-Sizing Compute"),
      L(56, "slas-and-slos", "SLAs and SLOs for Data Pipelines"),
      L(57, "incident-response", "Incident Response for Data Pipelines"),
      L(58, "root-cause-analysis", "Root Cause Analysis, Step by Step"),
      L(59, "disaster-recovery-and-backup", "Disaster Recovery and Backup Strategies"),
      L(60, "data-governance-in-production", "Data Governance in Production"),
      L(61, "handling-pii-and-sensitive-data", "Handling PII and Sensitive Data"),
      L(62, "secrets-management", "Secrets Management"),
      L(63, "access-reviews-and-least-privilege", "Access Reviews and Least Privilege"),
      L(64, "capacity-planning", "Capacity Planning"),
      L(65, "blue-green-and-canary-deployments", "Blue-Green and Canary Deployments for Pipelines"),
      L(66, "rollback-strategies", "Rollback Strategies"),
      L(67, "documentation-that-gets-used", "Documentation That Actually Gets Used"),
      L(68, "on-call-for-data-engineers", "On-Call for Data Engineers"),
      L(69, "a-production-incident-start-to-finish", "A Production Incident, Start to Finish"),
      L(70, "course-recap", "Production Data Engineering Recap — and This Course's Finale"),
    ],
  },
];
