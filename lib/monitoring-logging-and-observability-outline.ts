// The Monitoring & Observability course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Step 11 of the DevOps Engineer path: metrics, logs, traces, alerting, and incident practice, across both cloud-native tooling and the open-source stack most teams run.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/monitoring-logging-and-observability/
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

export const MONITORING_LOGGING_AND_OBSERVABILITY_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Observability Foundations",
    lessons: [
      L(1, "monitoring-vs-observability", "Monitoring vs. Observability", { contentDir: "ch01/01-monitoring-vs-observability" }),
      L(2, "the-three-pillars-metrics-logs-and-traces", "The Three Pillars: Metrics, Logs & Traces", { contentDir: "ch01/02-the-three-pillars-metrics-logs-and-traces" }),
      L(3, "slis-slos-and-error-budgets", "SLIs, SLOs & Error Budgets", { contentDir: "ch01/03-slis-slos-and-error-budgets" }),
      L(4, "the-golden-signals", "The Golden Signals", { contentDir: "ch01/04-the-golden-signals" }),
      L(5, "alerting-philosophy", "Alerting Philosophy", { contentDir: "ch01/05-alerting-philosophy" }),
    ],
  },
  {
    n: 2,
    title: "Azure Monitoring",
    lessons: [
      L(6, "azure-monitor-metrics-and-logs", "Azure Monitor Metrics & Logs", { contentDir: "ch02/06-azure-monitor-metrics-and-logs" }),
      L(7, "log-analytics-and-kql", "Log Analytics & KQL", { contentDir: "ch02/07-log-analytics-and-kql" }),
      L(8, "application-insights", "Application Insights", { contentDir: "ch02/08-application-insights" }),
      L(9, "alerts-and-action-groups", "Alerts & Action Groups", { contentDir: "ch02/09-alerts-and-action-groups" }),
    ],
  },
  {
    n: 3,
    title: "AWS Monitoring",
    lessons: [
      L(10, "cloudwatch-metrics-and-alarms", "CloudWatch Metrics & Alarms", { contentDir: "ch03/10-cloudwatch-metrics-and-alarms" }),
      L(11, "cloudwatch-logs-and-insights", "CloudWatch Logs & Insights", { contentDir: "ch03/11-cloudwatch-logs-and-insights" }),
      L(12, "x-ray-and-distributed-tracing", "X-Ray & Distributed Tracing", { contentDir: "ch03/12-x-ray-and-distributed-tracing" }),
      L(13, "cloudtrail-and-audit-logging", "CloudTrail & Audit Logging", { contentDir: "ch03/13-cloudtrail-and-audit-logging" }),
    ],
  },
  {
    n: 4,
    title: "Prometheus & Grafana",
    lessons: [
      L(14, "prometheus-architecture", "Prometheus Architecture", { contentDir: "ch04/14-prometheus-architecture" }),
      L(15, "instrumenting-applications", "Instrumenting Applications", { contentDir: "ch04/15-instrumenting-applications" }),
      L(16, "promql-basics", "PromQL Basics", { contentDir: "ch04/16-promql-basics" }),
      L(17, "exporters-and-kubernetes-monitoring", "Exporters & Kubernetes Monitoring", { contentDir: "ch04/17-exporters-and-kubernetes-monitoring" }),
      L(18, "grafana-dashboards", "Grafana Dashboards", { contentDir: "ch04/18-grafana-dashboards" }),
      L(19, "alertmanager", "Alertmanager", { contentDir: "ch04/19-alertmanager" }),
    ],
  },
  {
    n: 5,
    title: "Logging & Tracing",
    lessons: [
      L(20, "structured-logging", "Structured Logging", { contentDir: "ch05/20-structured-logging" }),
      L(21, "centralized-logging-with-elk-and-loki", "Centralized Logging With ELK & Loki", { contentDir: "ch05/21-centralized-logging-with-elk-and-loki" }),
      L(22, "opentelemetry-and-distributed-tracing", "OpenTelemetry & Distributed Tracing", { contentDir: "ch05/22-opentelemetry-and-distributed-tracing" }),
      L(23, "correlating-metrics-logs-and-traces", "Correlating Metrics, Logs & Traces", { contentDir: "ch05/23-correlating-metrics-logs-and-traces" }),
    ],
  },
  {
    n: 6,
    title: "Troubleshooting & Incident Response",
    lessons: [
      L(24, "a-troubleshooting-methodology", "A Troubleshooting Methodology", { contentDir: "ch06/24-a-troubleshooting-methodology" }),
      L(25, "on-call-practices-and-incident-management", "On-Call Practices & Incident Management", { contentDir: "ch06/25-on-call-practices-and-incident-management" }),
      L(26, "runbooks-and-automation", "Runbooks & Automation", { contentDir: "ch06/26-runbooks-and-automation" }),
      L(27, "postmortems", "Postmortems", { contentDir: "ch06/27-postmortems" }),
      L(28, "reducing-alert-fatigue", "Reducing Alert Fatigue", { contentDir: "ch06/28-reducing-alert-fatigue" }),
    ],
  },
  {
    n: 7,
    title: "Capstone",
    lessons: [
      L(29, "capstone-kickoff-instrument-and-monitor-a-service", "Capstone Kickoff: Instrument and Monitor a Service", { contentDir: "ch07/29-capstone-kickoff-instrument-and-monitor-a-service" }),
      L(30, "capstone-build-it", "Capstone: Build It", { contentDir: "ch07/30-capstone-build-it" }),
      L(31, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch07/31-capstone-wrap-up-and-portfolio-presentation" }),
    ],
  },
];
