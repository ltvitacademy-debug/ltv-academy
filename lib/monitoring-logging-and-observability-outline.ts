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
      L(1, "monitoring-vs-observability", "Monitoring vs. Observability", { contentDir: "ch01/01-monitoring-vs-observability", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792450597/ltv-monitoring-logging-and-observability/monitoring-vs-observability.mp4", durationLabel: "1 min 47 s" }),
      L(2, "the-three-pillars-metrics-logs-and-traces", "The Three Pillars: Metrics, Logs & Traces", { contentDir: "ch01/02-the-three-pillars-metrics-logs-and-traces", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453872/ltv-monitoring-logging-and-observability/the-three-pillars-metrics-logs-and-traces.mp4", durationLabel: "1 min 46 s" }),
      L(3, "slis-slos-and-error-budgets", "SLIs, SLOs & Error Budgets", { contentDir: "ch01/03-slis-slos-and-error-budgets", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453917/ltv-monitoring-logging-and-observability/slis-slos-and-error-budgets.mp4", durationLabel: "1 min 35 s" }),
      L(4, "the-golden-signals", "The Golden Signals", { contentDir: "ch01/04-the-golden-signals", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792450865/ltv-monitoring-logging-and-observability/the-golden-signals.mp4", durationLabel: "1 min 32 s" }),
      L(5, "alerting-philosophy", "Alerting Philosophy", { contentDir: "ch01/05-alerting-philosophy", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792450958/ltv-monitoring-logging-and-observability/alerting-philosophy.mp4", durationLabel: "1 min 40 s" }),
    ],
  },
  {
    n: 2,
    title: "Azure Monitoring",
    lessons: [
      L(6, "azure-monitor-metrics-and-logs", "Azure Monitor Metrics & Logs", { contentDir: "ch02/06-azure-monitor-metrics-and-logs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451074/ltv-monitoring-logging-and-observability/azure-monitor-metrics-and-logs.mp4", durationLabel: "2 min 12 s" }),
      L(7, "log-analytics-and-kql", "Log Analytics & KQL", { contentDir: "ch02/07-log-analytics-and-kql", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451175/ltv-monitoring-logging-and-observability/log-analytics-and-kql.mp4", durationLabel: "1 min 54 s" }),
      L(8, "application-insights", "Application Insights", { contentDir: "ch02/08-application-insights", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451290/ltv-monitoring-logging-and-observability/application-insights.mp4", durationLabel: "1 min 59 s" }),
      L(9, "alerts-and-action-groups", "Alerts & Action Groups", { contentDir: "ch02/09-alerts-and-action-groups", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451391/ltv-monitoring-logging-and-observability/alerts-and-action-groups.mp4", durationLabel: "1 min 55 s" }),
    ],
  },
  {
    n: 3,
    title: "AWS Monitoring",
    lessons: [
      L(10, "cloudwatch-metrics-and-alarms", "CloudWatch Metrics & Alarms", { contentDir: "ch03/10-cloudwatch-metrics-and-alarms", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451502/ltv-monitoring-logging-and-observability/cloudwatch-metrics-and-alarms.mp4", durationLabel: "1 min 58 s" }),
      L(11, "cloudwatch-logs-and-insights", "CloudWatch Logs & Insights", { contentDir: "ch03/11-cloudwatch-logs-and-insights", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451615/ltv-monitoring-logging-and-observability/cloudwatch-logs-and-insights.mp4", durationLabel: "2 min 0 s" }),
      L(12, "x-ray-and-distributed-tracing", "X-Ray & Distributed Tracing", { contentDir: "ch03/12-x-ray-and-distributed-tracing", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451715/ltv-monitoring-logging-and-observability/x-ray-and-distributed-tracing.mp4", durationLabel: "1 min 53 s" }),
      L(13, "cloudtrail-and-audit-logging", "CloudTrail & Audit Logging", { contentDir: "ch03/13-cloudtrail-and-audit-logging", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451833/ltv-monitoring-logging-and-observability/cloudtrail-and-audit-logging.mp4", durationLabel: "2 min 8 s" }),
    ],
  },
  {
    n: 4,
    title: "Prometheus & Grafana",
    lessons: [
      L(14, "prometheus-architecture", "Prometheus Architecture", { contentDir: "ch04/14-prometheus-architecture", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451947/ltv-monitoring-logging-and-observability/prometheus-architecture.mp4", durationLabel: "2 min 2 s" }),
      L(15, "instrumenting-applications", "Instrumenting Applications", { contentDir: "ch04/15-instrumenting-applications", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452058/ltv-monitoring-logging-and-observability/instrumenting-applications.mp4", durationLabel: "1 min 59 s" }),
      L(16, "promql-basics", "PromQL Basics", { contentDir: "ch04/16-promql-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452167/ltv-monitoring-logging-and-observability/promql-basics.mp4", durationLabel: "1 min 56 s" }),
      L(17, "exporters-and-kubernetes-monitoring", "Exporters & Kubernetes Monitoring", { contentDir: "ch04/17-exporters-and-kubernetes-monitoring", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452280/ltv-monitoring-logging-and-observability/exporters-and-kubernetes-monitoring.mp4", durationLabel: "1 min 57 s" }),
      L(18, "grafana-dashboards", "Grafana Dashboards", { contentDir: "ch04/18-grafana-dashboards", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452399/ltv-monitoring-logging-and-observability/grafana-dashboards.mp4", durationLabel: "1 min 54 s" }),
      L(19, "alertmanager", "Alertmanager", { contentDir: "ch04/19-alertmanager", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452518/ltv-monitoring-logging-and-observability/alertmanager.mp4", durationLabel: "2 min 2 s" }),
    ],
  },
  {
    n: 5,
    title: "Logging & Tracing",
    lessons: [
      L(20, "structured-logging", "Structured Logging", { contentDir: "ch05/20-structured-logging", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452628/ltv-monitoring-logging-and-observability/structured-logging.mp4", durationLabel: "1 min 53 s" }),
      L(21, "centralized-logging-with-elk-and-loki", "Centralized Logging With ELK & Loki", { contentDir: "ch05/21-centralized-logging-with-elk-and-loki", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452737/ltv-monitoring-logging-and-observability/centralized-logging-with-elk-and-loki.mp4", durationLabel: "1 min 57 s" }),
      L(22, "opentelemetry-and-distributed-tracing", "OpenTelemetry & Distributed Tracing", { contentDir: "ch05/22-opentelemetry-and-distributed-tracing", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452844/ltv-monitoring-logging-and-observability/opentelemetry-and-distributed-tracing.mp4", durationLabel: "1 min 59 s" }),
      L(23, "correlating-metrics-logs-and-traces", "Correlating Metrics, Logs & Traces", { contentDir: "ch05/23-correlating-metrics-logs-and-traces", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452953/ltv-monitoring-logging-and-observability/correlating-metrics-logs-and-traces.mp4", durationLabel: "1 min 53 s" }),
    ],
  },
  {
    n: 6,
    title: "Troubleshooting & Incident Response",
    lessons: [
      L(24, "a-troubleshooting-methodology", "A Troubleshooting Methodology", { contentDir: "ch06/24-a-troubleshooting-methodology", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453071/ltv-monitoring-logging-and-observability/a-troubleshooting-methodology.mp4", durationLabel: "2 min 6 s" }),
      L(25, "on-call-practices-and-incident-management", "On-Call Practices & Incident Management", { contentDir: "ch06/25-on-call-practices-and-incident-management", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453184/ltv-monitoring-logging-and-observability/on-call-practices-and-incident-management.mp4", durationLabel: "2 min 0 s" }),
      L(26, "runbooks-and-automation", "Runbooks & Automation", { contentDir: "ch06/26-runbooks-and-automation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453279/ltv-monitoring-logging-and-observability/runbooks-and-automation.mp4", durationLabel: "1 min 59 s" }),
      L(27, "postmortems", "Postmortems", { contentDir: "ch06/27-postmortems", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453385/ltv-monitoring-logging-and-observability/postmortems.mp4", durationLabel: "1 min 60 s" }),
      L(28, "reducing-alert-fatigue", "Reducing Alert Fatigue", { contentDir: "ch06/28-reducing-alert-fatigue", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453481/ltv-monitoring-logging-and-observability/reducing-alert-fatigue.mp4", durationLabel: "1 min 59 s" }),
    ],
  },
  {
    n: 7,
    title: "Capstone",
    lessons: [
      L(29, "capstone-kickoff-instrument-and-monitor-a-service", "Capstone Kickoff: Instrument and Monitor a Service", { contentDir: "ch07/29-capstone-kickoff-instrument-and-monitor-a-service", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453561/ltv-monitoring-logging-and-observability/capstone-kickoff-instrument-and-monitor-a-service.mp4", durationLabel: "1 min 51 s" }),
      L(30, "capstone-build-it", "Capstone: Build It", { contentDir: "ch07/30-capstone-build-it", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453632/ltv-monitoring-logging-and-observability/capstone-build-it.mp4", durationLabel: "1 min 49 s" }),
      L(31, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch07/31-capstone-wrap-up-and-portfolio-presentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453706/ltv-monitoring-logging-and-observability/capstone-wrap-up-and-portfolio-presentation.mp4", durationLabel: "1 min 44 s" }),
    ],
  },
];
