// Cloud Operations, Observability, FinOps & Reliability course outline. Lessons without a
// contentDir render as "in production". Course 10 of the Cloud Engineer → Cloud Architect path —
// the third course of the Advanced Specialization stage: operating, observing, costing, and
// keeping reliable the infrastructure already built in Terraform and Kubernetes in courses 8-9,
// rather than re-teaching what monitoring or the cloud is.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/cloud-reliability-monitoring-finops/
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

export const CLOUD_RELIABILITY_MONITORING_FINOPS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Cloud Observability Fundamentals",
    lessons: [
      L(1, "the-three-pillars-metrics-logs-and-traces", "The Three Pillars: Metrics, Logs, and Traces", { contentDir: "ch01/01-the-three-pillars-metrics-logs-and-traces", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-reliability-monitoring-finops/the-three-pillars-metrics-logs-and-traces.mp4", durationLabel: "2 min 49 s" }),
      L(2, "structured-logging-so-a-log-line-is-actually-queryable", "Structured Logging So a Log Line Is Actually Queryable", { contentDir: "ch01/02-structured-logging-so-a-log-line-is-actually-queryable", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-reliability-monitoring-finops/structured-logging-so-a-log-line-is-actually-queryable.mp4", durationLabel: "2 min 48 s" }),
      L(3, "distributed-tracing-following-a-request-across-services", "Distributed Tracing: Following a Request Across Services", { contentDir: "ch01/03-distributed-tracing-following-a-request-across-services", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-reliability-monitoring-finops/distributed-tracing-following-a-request-across-services.mp4", durationLabel: "2 min 44 s" }),
      L(4, "choosing-what-to-instrument-signal-over-noise", "Choosing What to Instrument: Signal Over Noise", { contentDir: "ch01/04-choosing-what-to-instrument-signal-over-noise", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-reliability-monitoring-finops/choosing-what-to-instrument-signal-over-noise.mp4", durationLabel: "2 min 47 s" }),
    ],
  },
  {
    n: 2,
    title: "Azure Monitor & Log Analytics in Depth",
    lessons: [
      L(5, "azure-monitor-metrics-vs-logs-and-where-each-one-lives", "Azure Monitor: Metrics vs. Logs, and Where Each One Lives", { contentDir: "ch02/05-azure-monitor-metrics-vs-logs-and-where-each-one-lives", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-reliability-monitoring-finops/azure-monitor-metrics-vs-logs-and-where-each-one-lives.mp4", durationLabel: "2 min 26 s" }),
      L(6, "writing-real-log-analytics-kql-queries-for-operations", "Writing Real Log Analytics KQL Queries for Operations", { contentDir: "ch02/06-writing-real-log-analytics-kql-queries-for-operations", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-reliability-monitoring-finops/writing-real-log-analytics-kql-queries-for-operations.mp4", durationLabel: "2 min 39 s" }),
      L(7, "application-insights-for-tracing-real-application-performance", "Application Insights for Tracing Real Application Performance", { contentDir: "ch02/07-application-insights-for-tracing-real-application-performance", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-reliability-monitoring-finops/application-insights-for-tracing-real-application-performance.mp4", durationLabel: "2 min 27 s" }),
      L(8, "container-insights-for-aks-workloads", "Container Insights for AKS Workloads", { contentDir: "ch02/08-container-insights-for-aks-workloads", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-reliability-monitoring-finops/container-insights-for-aks-workloads.mp4", durationLabel: "2 min 39 s" }),
    ],
  },
  {
    n: 3,
    title: "AWS CloudWatch & X-Ray in Depth",
    lessons: [
      L(9, "cloudwatch-metrics-logs-and-logs-insights-queries", "CloudWatch Metrics, Logs, and Logs Insights Queries", { contentDir: "ch03/09-cloudwatch-metrics-logs-and-logs-insights-queries", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-reliability-monitoring-finops/cloudwatch-metrics-logs-and-logs-insights-queries.mp4", durationLabel: "3 min 8 s" }),
      L(10, "cloudwatch-alarms-and-composite-alarms-that-dont-flap", "CloudWatch Alarms and Composite Alarms That Don't Flap", { contentDir: "ch03/10-cloudwatch-alarms-and-composite-alarms-that-dont-flap", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-reliability-monitoring-finops/cloudwatch-alarms-and-composite-alarms-that-dont-flap.mp4", durationLabel: "3 min 9 s" }),
      L(11, "aws-x-ray-for-distributed-tracing", "AWS X-Ray for Distributed Tracing", { contentDir: "ch03/11-aws-x-ray-for-distributed-tracing", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-reliability-monitoring-finops/aws-x-ray-for-distributed-tracing.mp4", durationLabel: "3 min 3 s" }),
      L(12, "container-insights-for-eks-workloads", "Container Insights for EKS Workloads", { contentDir: "ch03/12-container-insights-for-eks-workloads", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-reliability-monitoring-finops/container-insights-for-eks-workloads.mp4", durationLabel: "3 min 12 s" }),
    ],
  },
  {
    n: 4,
    title: "Dashboards and Alerts That Matter",
    lessons: [
      L(13, "designing-a-dashboard-around-a-real-incident-not-a-vanity-metric", "Designing a Dashboard Around a Real Incident, Not a Vanity Metric", { contentDir: "ch04/13-designing-a-dashboard-around-a-real-incident-not-a-vanity-metric", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-reliability-monitoring-finops/designing-a-dashboard-around-a-real-incident-not-a-vanity-metric.mp4", durationLabel: "2 min 53 s" }),
      L(14, "grafana-on-top-of-azure-monitor-and-cloudwatch", "Grafana on Top of Azure Monitor and CloudWatch", { contentDir: "ch04/14-grafana-on-top-of-azure-monitor-and-cloudwatch", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-reliability-monitoring-finops/grafana-on-top-of-azure-monitor-and-cloudwatch.mp4", durationLabel: "2 min 46 s" }),
      L(15, "alert-routing-and-on-call-without-alert-fatigue", "Alert Routing and On-Call Without Alert Fatigue", { contentDir: "ch04/15-alert-routing-and-on-call-without-alert-fatigue", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-reliability-monitoring-finops/alert-routing-and-on-call-without-alert-fatigue.mp4", durationLabel: "2 min 49 s" }),
      L(16, "runbooks-what-an-alert-should-link-to", "Runbooks: What an Alert Should Link To", { contentDir: "ch04/16-runbooks-what-an-alert-should-link-to", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-reliability-monitoring-finops/runbooks-what-an-alert-should-link-to.mp4", durationLabel: "2 min 44 s" }),
    ],
  },
  {
    n: 5,
    title: "Cost Management & FinOps Fundamentals",
    lessons: [
      L(17, "the-finops-framework-inform-optimize-operate", "The FinOps Framework: Inform, Optimize, Operate", { contentDir: "ch05/17-the-finops-framework-inform-optimize-operate", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-reliability-monitoring-finops/the-finops-framework-inform-optimize-operate.mp4", durationLabel: "3 min 1 s" }),
      L(18, "reading-an-azure-cost-analysis-and-an-aws-cost-explorer-report", "Reading an Azure Cost Analysis and an AWS Cost Explorer Report", { contentDir: "ch05/18-reading-an-azure-cost-analysis-and-an-aws-cost-explorer-report", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-reliability-monitoring-finops/reading-an-azure-cost-analysis-and-an-aws-cost-explorer-report.mp4", durationLabel: "2 min 47 s" }),
      L(19, "tagging-for-cost-allocation-across-teams-and-projects", "Tagging for Cost Allocation Across Teams and Projects", { contentDir: "ch05/19-tagging-for-cost-allocation-across-teams-and-projects", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-reliability-monitoring-finops/tagging-for-cost-allocation-across-teams-and-projects.mp4", durationLabel: "2 min 53 s" }),
      L(20, "budgets-and-anomaly-alerts-catching-a-cost-spike-early", "Budgets and Anomaly Alerts: Catching a Cost Spike Early", { contentDir: "ch05/20-budgets-and-anomaly-alerts-catching-a-cost-spike-early", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-reliability-monitoring-finops/budgets-and-anomaly-alerts-catching-a-cost-spike-early.mp4", durationLabel: "3 min 2 s" }),
    ],
  },
  {
    n: 6,
    title: "Optimizing Cloud Spend Without Breaking Reliability",
    lessons: [
      L(21, "right-sizing-compute-without-guessing", "Right-Sizing Compute Without Guessing", { contentDir: "ch06/21-right-sizing-compute-without-guessing", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-reliability-monitoring-finops/right-sizing-compute-without-guessing.mp4", durationLabel: "2 min 50 s" }),
      L(22, "reserved-instances-savings-plans-and-spot-the-real-tradeoffs", "Reserved Instances, Savings Plans, and Spot: The Real Tradeoffs", { contentDir: "ch06/22-reserved-instances-savings-plans-and-spot-the-real-tradeoffs", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-reliability-monitoring-finops/reserved-instances-savings-plans-and-spot-the-real-tradeoffs.mp4", durationLabel: "2 min 31 s" }),
      L(23, "autoscaling-as-a-cost-lever-not-just-a-performance-lever", "Autoscaling as a Cost Lever, Not Just a Performance Lever", { contentDir: "ch06/23-autoscaling-as-a-cost-lever-not-just-a-performance-lever", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-reliability-monitoring-finops/autoscaling-as-a-cost-lever-not-just-a-performance-lever.mp4", durationLabel: "2 min 28 s" }),
      L(24, "storage-lifecycle-policies-and-cleaning-up-orphaned-resources", "Storage Lifecycle Policies and Cleaning Up Orphaned Resources", { contentDir: "ch06/24-storage-lifecycle-policies-and-cleaning-up-orphaned-resources", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-reliability-monitoring-finops/storage-lifecycle-policies-and-cleaning-up-orphaned-resources.mp4", durationLabel: "3 min 5 s" }),
    ],
  },
  {
    n: 7,
    title: "Site Reliability Engineering Fundamentals",
    lessons: [
      L(25, "slis-slos-and-error-budgets-in-plain-terms", "SLIs, SLOs, and Error Budgets in Plain Terms", { contentDir: "ch07/25-slis-slos-and-error-budgets-in-plain-terms", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-reliability-monitoring-finops/slis-slos-and-error-budgets-in-plain-terms.mp4", durationLabel: "2 min 8 s" }),
      L(26, "setting-an-slo-that-the-business-actually-agrees-with", "Setting an SLO That the Business Actually Agrees With", { contentDir: "ch07/26-setting-an-slo-that-the-business-actually-agrees-with", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-reliability-monitoring-finops/setting-an-slo-that-the-business-actually-agrees-with.mp4", durationLabel: "2 min 4 s" }),
      L(27, "incident-management-severity-roles-and-a-real-timeline", "Incident Management: Severity, Roles, and a Real Timeline", { contentDir: "ch07/27-incident-management-severity-roles-and-a-real-timeline", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-reliability-monitoring-finops/incident-management-severity-roles-and-a-real-timeline.mp4", durationLabel: "2 min 5 s" }),
      L(28, "blameless-postmortems-and-closing-the-loop-on-an-incident", "Blameless Postmortems, and Closing the Loop on an Incident", { contentDir: "ch07/28-blameless-postmortems-and-closing-the-loop-on-an-incident", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-reliability-monitoring-finops/blameless-postmortems-and-closing-the-loop-on-an-incident.mp4", durationLabel: "2 min 10 s" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: Operating a Production Cloud Environment",
    lessons: [
      L(29, "lab-instrumenting-an-application-with-logs-metrics-and-traces", "Lab: Instrumenting an Application with Logs, Metrics, and Traces", { contentDir: "ch08/29-lab-instrumenting-an-application-with-logs-metrics-and-traces", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-reliability-monitoring-finops/lab-instrumenting-an-application-with-logs-metrics-and-traces.mp4", durationLabel: "2 min 47 s" }),
      L(30, "lab-building-a-cost-dashboard-and-a-budget-alert", "Lab: Building a Cost Dashboard and a Budget Alert", { contentDir: "ch08/30-lab-building-a-cost-dashboard-and-a-budget-alert", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-reliability-monitoring-finops/lab-building-a-cost-dashboard-and-a-budget-alert.mp4", durationLabel: "2 min 26 s" }),
      L(31, "case-study-an-slo-violation-that-was-actually-a-cost-cutting-decision", "Case Study: An SLO Violation That Was Actually a Cost-Cutting Decision", { contentDir: "ch08/31-case-study-an-slo-violation-that-was-actually-a-cost-cutting-decision", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-reliability-monitoring-finops/case-study-an-slo-violation-that-was-actually-a-cost-cutting-decision.mp4", durationLabel: "2 min 34 s" }),
      L(32, "chapter-capstone-cloud-operations-and-finops-review", "Chapter Capstone: Cloud Operations and FinOps Review", { contentDir: "ch08/32-chapter-capstone-cloud-operations-and-finops-review", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cloud-reliability-monitoring-finops/chapter-capstone-cloud-operations-and-finops-review.mp4", durationLabel: "2 min 29 s" }),
    ],
  },
];
