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
      L(1, "monitoring-vs-observability", "Monitoring vs. Observability"),
      L(2, "the-three-pillars-metrics-logs-and-traces", "The Three Pillars: Metrics, Logs & Traces"),
      L(3, "slis-slos-and-error-budgets", "SLIs, SLOs & Error Budgets"),
      L(4, "the-golden-signals", "The Golden Signals"),
      L(5, "alerting-philosophy", "Alerting Philosophy"),
    ],
  },
  {
    n: 2,
    title: "Azure Monitoring",
    lessons: [
      L(6, "azure-monitor-metrics-and-logs", "Azure Monitor Metrics & Logs"),
      L(7, "log-analytics-and-kql", "Log Analytics & KQL"),
      L(8, "application-insights", "Application Insights"),
      L(9, "alerts-and-action-groups", "Alerts & Action Groups"),
    ],
  },
  {
    n: 3,
    title: "AWS Monitoring",
    lessons: [
      L(10, "cloudwatch-metrics-and-alarms", "CloudWatch Metrics & Alarms"),
      L(11, "cloudwatch-logs-and-insights", "CloudWatch Logs & Insights"),
      L(12, "x-ray-and-distributed-tracing", "X-Ray & Distributed Tracing"),
      L(13, "cloudtrail-and-audit-logging", "CloudTrail & Audit Logging"),
    ],
  },
  {
    n: 4,
    title: "Prometheus & Grafana",
    lessons: [
      L(14, "prometheus-architecture", "Prometheus Architecture"),
      L(15, "instrumenting-applications", "Instrumenting Applications"),
      L(16, "promql-basics", "PromQL Basics"),
      L(17, "exporters-and-kubernetes-monitoring", "Exporters & Kubernetes Monitoring"),
      L(18, "grafana-dashboards", "Grafana Dashboards"),
      L(19, "alertmanager", "Alertmanager"),
    ],
  },
  {
    n: 5,
    title: "Logging & Tracing",
    lessons: [
      L(20, "structured-logging", "Structured Logging"),
      L(21, "centralized-logging-with-elk-and-loki", "Centralized Logging With ELK & Loki"),
      L(22, "opentelemetry-and-distributed-tracing", "OpenTelemetry & Distributed Tracing"),
      L(23, "correlating-metrics-logs-and-traces", "Correlating Metrics, Logs & Traces"),
    ],
  },
  {
    n: 6,
    title: "Troubleshooting & Incident Response",
    lessons: [
      L(24, "a-troubleshooting-methodology", "A Troubleshooting Methodology"),
      L(25, "on-call-practices-and-incident-management", "On-Call Practices & Incident Management"),
      L(26, "runbooks-and-automation", "Runbooks & Automation"),
      L(27, "postmortems", "Postmortems"),
      L(28, "reducing-alert-fatigue", "Reducing Alert Fatigue"),
    ],
  },
  {
    n: 7,
    title: "Capstone",
    lessons: [
      L(29, "capstone-kickoff-instrument-and-monitor-a-service", "Capstone Kickoff: Instrument and Monitor a Service"),
      L(30, "capstone-build-it", "Capstone: Build It"),
      L(31, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
