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
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792142224/ltv-fabric-realtime/what-is-microsoft-fabric.mp4",
        durationLabel: "1 min 32 s",
      }),
      L(2, "fabric-workspaces", "Fabric Workspaces", {
        contentDir: "ch01/02-fabric-workspaces",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792142283/ltv-fabric-realtime/fabric-workspaces.mp4",
        durationLabel: "1 min 21 s",
      }),
      L(3, "onelake", "OneLake — One Lake for the Whole Organization", {
        contentDir: "ch01/03-onelake",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792142331/ltv-fabric-realtime/onelake.mp4",
        durationLabel: "1 min 15 s",
      }),
      L(4, "creating-a-lakehouse", "Creating a Lakehouse", {
        contentDir: "ch01/04-creating-a-lakehouse",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792142381/ltv-fabric-realtime/creating-a-lakehouse.mp4",
        durationLabel: "1 min 17 s",
      }),
      L(5, "fabric-lakehouse-vs-databricks-lakehouse", "Fabric Lakehouse vs. Databricks Lakehouse", {
        contentDir: "ch01/05-fabric-lakehouse-vs-databricks-lakehouse",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792142429/ltv-fabric-realtime/fabric-lakehouse-vs-databricks-lakehouse.mp4",
        durationLabel: "1 min 21 s",
      }),
      L(6, "fabric-notebooks", "Fabric Notebooks", {
        contentDir: "ch01/06-fabric-notebooks",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792142480/ltv-fabric-realtime/fabric-notebooks.mp4",
        durationLabel: "1 min 20 s",
      }),
      L(7, "shortcuts", "Shortcuts — Referencing Data Without Copying It", {
        contentDir: "ch01/07-shortcuts",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792142538/ltv-fabric-realtime/shortcuts.mp4",
        durationLabel: "1 min 23 s",
      }),
      L(8, "fabric-data-factory-pipelines", "Fabric Data Factory — Pipelines", {
        contentDir: "ch01/08-fabric-data-factory-pipelines",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792142599/ltv-fabric-realtime/fabric-data-factory-pipelines.mp4",
        durationLabel: "1 min 23 s",
      }),
      L(9, "dataflows-gen2", "Dataflows Gen2", {
        contentDir: "ch01/09-dataflows-gen2",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792142667/ltv-fabric-realtime/dataflows-gen2.mp4",
        durationLabel: "1 min 28 s",
      }),
      L(10, "fabric-warehouse", "Fabric Warehouse", {
        contentDir: "ch01/10-fabric-warehouse",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792142728/ltv-fabric-realtime/fabric-warehouse.mp4",
        durationLabel: "1 min 19 s",
      }),
      L(11, "lakehouse-vs-warehouse", "Lakehouse vs. Warehouse — Choosing the Right Engine", {
        contentDir: "ch01/11-lakehouse-vs-warehouse",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792142787/ltv-fabric-realtime/lakehouse-vs-warehouse.mp4",
        durationLabel: "1 min 16 s",
      }),
      L(12, "direct-lake-mode", "Direct Lake Mode", {
        contentDir: "ch01/12-direct-lake-mode",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792142855/ltv-fabric-realtime/direct-lake-mode.mp4",
        durationLabel: "1 min 18 s",
      }),
      L(13, "semantic-models-in-fabric", "Semantic Models in Fabric", {
        contentDir: "ch01/13-semantic-models-in-fabric",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792142911/ltv-fabric-realtime/semantic-models-in-fabric.mp4",
        durationLabel: "1 min 13 s",
      }),
      L(14, "fabric-capacities-and-skus", "Fabric Capacities and SKUs", {
        contentDir: "ch01/14-fabric-capacities-and-skus",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792142978/ltv-fabric-realtime/fabric-capacities-and-skus.mp4",
        durationLabel: "1 min 24 s",
      }),
      L(15, "git-integration-and-deployment-pipelines", "Git Integration and Deployment Pipelines", {
        contentDir: "ch01/15-git-integration-and-deployment-pipelines",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143040/ltv-fabric-realtime/git-integration-and-deployment-pipelines.mp4",
        durationLabel: "1 min 17 s",
      }),
      L(16, "the-monitoring-hub", "The Monitoring Hub", {
        contentDir: "ch01/16-the-monitoring-hub",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143102/ltv-fabric-realtime/the-monitoring-hub.mp4",
        durationLabel: "1 min 18 s",
      }),
      L(17, "fabric-chapter-recap", "Fabric Chapter Recap — Where This Fits With Databricks", {
        contentDir: "ch01/17-fabric-chapter-recap",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143171/ltv-fabric-realtime/fabric-chapter-recap.mp4",
        durationLabel: "1 min 29 s",
      }),
    ],
  },
  {
    n: 2,
    title: "Real-Time Data Engineering",
    lessons: [
      L(18, "what-is-real-time-intelligence", "What Is Real-Time Intelligence?", {
        contentDir: "ch02/18-what-is-real-time-intelligence",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143238/ltv-fabric-realtime/what-is-real-time-intelligence.mp4",
        durationLabel: "1 min 24 s",
      }),
      L(19, "eventstreams", "Eventstreams — Ingesting Streaming Data", {
        contentDir: "ch02/19-eventstreams",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143298/ltv-fabric-realtime/eventstreams.mp4",
        durationLabel: "1 min 16 s",
      }),
      L(20, "event-sources", "Event Sources: Azure Event Hubs and IoT Hub", {
        contentDir: "ch02/20-event-sources",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143362/ltv-fabric-realtime/event-sources.mp4",
        durationLabel: "1 min 19 s",
      }),
      L(21, "eventhouse-and-kql-database", "Eventhouse and KQL Database", {
        contentDir: "ch02/21-eventhouse-and-kql-database",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143443/ltv-fabric-realtime/eventhouse-and-kql-database.mp4",
        durationLabel: "1 min 32 s",
      }),
      L(22, "what-is-kql", "What Is KQL?", {
        contentDir: "ch02/22-what-is-kql",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143509/ltv-fabric-realtime/what-is-kql.mp4",
        durationLabel: "1 min 21 s",
      }),
      L(23, "kql-where-and-project", "KQL: Basic Queries With where and project", {
        contentDir: "ch02/23-kql-where-and-project",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143566/ltv-fabric-realtime/kql-where-and-project.mp4",
        durationLabel: "1 min 8 s",
      }),
      L(24, "kql-summarize", "KQL: summarize and Aggregations", {
        contentDir: "ch02/24-kql-summarize",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143626/ltv-fabric-realtime/kql-summarize.mp4",
        durationLabel: "1 min 15 s",
      }),
      L(25, "kql-joins", "KQL: Joins", {
        contentDir: "ch02/25-kql-joins",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143693/ltv-fabric-realtime/kql-joins.mp4",
        durationLabel: "1 min 18 s",
      }),
      L(26, "kql-time-series-functions", "KQL: Time Series Functions", {
        contentDir: "ch02/26-kql-time-series-functions",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143770/ltv-fabric-realtime/kql-time-series-functions.mp4",
        durationLabel: "1 min 31 s",
      }),
      L(27, "ingesting-data-into-kql", "Ingesting Data Into a KQL Database", {
        contentDir: "ch02/27-ingesting-data-into-kql",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143833/ltv-fabric-realtime/ingesting-data-into-kql.mp4",
        durationLabel: "1 min 16 s",
      }),
      L(28, "real-time-dashboards", "Real-Time Dashboards", {
        contentDir: "ch02/28-real-time-dashboards",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143896/ltv-fabric-realtime/real-time-dashboards.mp4",
        durationLabel: "1 min 25 s",
      }),
      L(29, "windowing-in-streaming-data", "Windowing in Streaming Data", {
        contentDir: "ch02/29-windowing-in-streaming-data",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143962/ltv-fabric-realtime/windowing-in-streaming-data.mp4",
        durationLabel: "1 min 16 s",
      }),
      L(30, "tumbling-windows", "Tumbling Windows", {
        contentDir: "ch02/30-tumbling-windows",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792144015/ltv-fabric-realtime/tumbling-windows.mp4",
        durationLabel: "1 min 11 s",
      }),
      L(31, "hopping-and-sliding-windows", "Hopping and Sliding Windows", {
        contentDir: "ch02/31-hopping-and-sliding-windows",
        // videoUrl/durationLabel pending
      }),
      L(32, "session-windows", "Session Windows", {
        contentDir: "ch02/32-session-windows",
        // videoUrl/durationLabel pending
      }),
      L(33, "watermarks-in-real-streaming-systems", "Watermarks in Real Streaming Systems", {
        contentDir: "ch02/33-watermarks-in-real-streaming-systems",
        // videoUrl/durationLabel pending
      }),
      L(34, "handling-out-of-order-events", "Handling Out-of-Order Events", {
        contentDir: "ch02/34-handling-out-of-order-events",
        // videoUrl/durationLabel pending
      }),
      L(35, "eventstream-transformations", "Eventstream Transformations", {
        contentDir: "ch02/35-eventstream-transformations",
        // videoUrl/durationLabel pending
      }),
      L(36, "routing-events-to-multiple-destinations", "Routing Events to Multiple Destinations", {
        contentDir: "ch02/36-routing-events-to-multiple-destinations",
        // videoUrl/durationLabel pending
      }),
      L(37, "activator-real-time-alerting", "Activator — Real-Time Alerting", {
        contentDir: "ch02/37-activator-real-time-alerting",
        // videoUrl/durationLabel pending
      }),
      L(38, "change-data-capture-streamed", "Change Data Capture, Streamed", {
        contentDir: "ch02/38-change-data-capture-streamed",
        // videoUrl/durationLabel pending
      }),
      L(39, "real-time-data-quality", "Real-Time Data Quality", {
        contentDir: "ch02/39-real-time-data-quality",
        // videoUrl/durationLabel pending
      }),
      L(40, "fabric-realtime-vs-databricks-streaming", "Comparing Fabric Real-Time to Databricks Structured Streaming", {
        contentDir: "ch02/40-fabric-realtime-vs-databricks-streaming",
        // videoUrl/durationLabel pending
      }),
      L(41, "a-real-time-nyc-taxi-dashboard", "A Real-Time NYC Taxi Dashboard, Start to Finish", {
        contentDir: "ch02/41-a-real-time-nyc-taxi-dashboard",
        // videoUrl/durationLabel pending
      }),
      L(42, "real-time-chapter-recap", "Real-Time Chapter Recap", {
        contentDir: "ch02/42-real-time-chapter-recap",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 3,
    title: "Production Data Engineering",
    lessons: [
      L(43, "what-makes-a-pipeline-production-ready", "What Makes a Pipeline \"Production Ready\"?", {
        contentDir: "ch03/43-what-makes-a-pipeline-production-ready",
        // videoUrl/durationLabel pending
      }),
      L(44, "environments-dev-test-prod", "Environments: Dev, Test, and Prod", {
        contentDir: "ch03/44-environments-dev-test-prod",
        // videoUrl/durationLabel pending
      }),
      L(45, "ci-cd-for-data-pipelines", "CI/CD for Data Pipelines", {
        contentDir: "ch03/45-ci-cd-for-data-pipelines",
        // videoUrl/durationLabel pending
      }),
      L(46, "version-control-for-notebooks-and-pipelines", "Version Control for Notebooks and Pipelines", {
        contentDir: "ch03/46-version-control-for-notebooks-and-pipelines",
        // videoUrl/durationLabel pending
      }),
      L(47, "infrastructure-as-code", "Infrastructure as Code — ARM/Bicep and Terraform Basics", {
        contentDir: "ch03/47-infrastructure-as-code",
        // videoUrl/durationLabel pending
      }),
      L(48, "testing-data-pipelines", "Testing Data Pipelines", {
        contentDir: "ch03/48-testing-data-pipelines",
        // videoUrl/durationLabel pending
      }),
      L(49, "unit-testing-pyspark-transformations", "Unit Testing PySpark Transformations", {
        contentDir: "ch03/49-unit-testing-pyspark-transformations",
        // videoUrl/durationLabel pending
      }),
      L(50, "data-contracts", "Data Contracts", {
        contentDir: "ch03/50-data-contracts",
        // videoUrl/durationLabel pending
      }),
      L(51, "schema-drift-and-breaking-changes", "Schema Drift and Breaking Changes", {
        contentDir: "ch03/51-schema-drift-and-breaking-changes",
        // videoUrl/durationLabel pending
      }),
      L(52, "observability-logs-metrics-traces", "Observability: Logs, Metrics, and Traces", {
        contentDir: "ch03/52-observability-logs-metrics-traces",
        // videoUrl/durationLabel pending
      }),
      L(53, "alerts-for-pipeline-failures", "Setting Up Alerts for Pipeline Failures", {
        contentDir: "ch03/53-alerts-for-pipeline-failures",
        // videoUrl/durationLabel pending
      }),
      L(54, "cost-management-and-optimization", "Cost Management and Optimization", {
        contentDir: "ch03/54-cost-management-and-optimization",
        // videoUrl/durationLabel pending
      }),
      L(55, "right-sizing-compute", "Right-Sizing Compute", {
        contentDir: "ch03/55-right-sizing-compute",
        // videoUrl/durationLabel pending
      }),
      L(56, "slas-and-slos", "SLAs and SLOs for Data Pipelines", {
        contentDir: "ch03/56-slas-and-slos",
        // videoUrl/durationLabel pending
      }),
      L(57, "incident-response", "Incident Response for Data Pipelines", {
        contentDir: "ch03/57-incident-response",
        // videoUrl/durationLabel pending
      }),
      L(58, "root-cause-analysis", "Root Cause Analysis, Step by Step", {
        contentDir: "ch03/58-root-cause-analysis",
        // videoUrl/durationLabel pending
      }),
      L(59, "disaster-recovery-and-backup", "Disaster Recovery and Backup Strategies", {
        contentDir: "ch03/59-disaster-recovery-and-backup",
        // videoUrl/durationLabel pending
      }),
      L(60, "data-governance-in-production", "Data Governance in Production", {
        contentDir: "ch03/60-data-governance-in-production",
        // videoUrl/durationLabel pending
      }),
      L(61, "handling-pii-and-sensitive-data", "Handling PII and Sensitive Data", {
        contentDir: "ch03/61-handling-pii-and-sensitive-data",
        // videoUrl/durationLabel pending
      }),
      L(62, "secrets-management", "Secrets Management", {
        contentDir: "ch03/62-secrets-management",
        // videoUrl/durationLabel pending
      }),
      L(63, "access-reviews-and-least-privilege", "Access Reviews and Least Privilege", {
        contentDir: "ch03/63-access-reviews-and-least-privilege",
        // videoUrl/durationLabel pending
      }),
      L(64, "capacity-planning", "Capacity Planning", {
        contentDir: "ch03/64-capacity-planning",
        // videoUrl/durationLabel pending
      }),
      L(65, "blue-green-and-canary-deployments", "Blue-Green and Canary Deployments for Pipelines", {
        contentDir: "ch03/65-blue-green-and-canary-deployments",
        // videoUrl/durationLabel pending
      }),
      L(66, "rollback-strategies", "Rollback Strategies", {
        contentDir: "ch03/66-rollback-strategies",
        // videoUrl/durationLabel pending
      }),
      L(67, "documentation-that-gets-used", "Documentation That Actually Gets Used", {
        contentDir: "ch03/67-documentation-that-gets-used",
        // videoUrl/durationLabel pending
      }),
      L(68, "on-call-for-data-engineers", "On-Call for Data Engineers", {
        contentDir: "ch03/68-on-call-for-data-engineers",
        // videoUrl/durationLabel pending
      }),
      L(69, "a-production-incident-start-to-finish", "A Production Incident, Start to Finish", {
        contentDir: "ch03/69-a-production-incident-start-to-finish",
        // videoUrl/durationLabel pending
      }),
      L(70, "course-recap", "Production Data Engineering Recap — and This Course's Finale", {
        contentDir: "ch03/70-course-recap",
        // videoUrl/durationLabel pending
      }),
    ],
  },
];
