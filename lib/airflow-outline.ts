// The full Airflow course outline. Only lessons with a contentDir +
// videoUrl are playable; everything else renders as "in production".
// Assumes prior Python and SQL — this course teaches orchestration, not
// programming fundamentals.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/airflow/
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

export const AIRFLOW_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Airflow Fundamentals",
    lessons: [
      L(1, "why-orchestration", "What Is Airflow & Why Orchestration?", { contentDir: "ch01/01-why-orchestration", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792120420/ltv-airflow/why-orchestration.mp4", durationLabel: "1 min 50 s" }),
      L(2, "the-dag-concept", "The DAG Concept", { contentDir: "ch01/02-the-dag-concept", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792120472/ltv-airflow/the-dag-concept.mp4", durationLabel: "1 min 42 s" }),
      L(3, "installing-and-running-airflow", "Installing & Running Airflow", { contentDir: "ch01/03-installing-and-running-airflow", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792120522/ltv-airflow/installing-and-running-airflow.mp4", durationLabel: "1 min 40 s" }),
      L(4, "the-airflow-ui", "The Airflow UI, Tour", { contentDir: "ch01/04-the-airflow-ui", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792120569/ltv-airflow/the-airflow-ui.mp4", durationLabel: "1 min 33 s" }),
      L(5, "operators-overview", "Operators Overview", { contentDir: "ch01/05-operators-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792120619/ltv-airflow/operators-overview.mp4", durationLabel: "1 min 39 s" }),
      L(6, "your-first-dag", "Your First DAG", { contentDir: "ch01/06-your-first-dag", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792120668/ltv-airflow/your-first-dag.mp4", durationLabel: "1 min 36 s" }),
    ],
  },
  {
    n: 2,
    title: "Building DAGs",
    lessons: [
      L(7, "tasks-and-dependencies", "Tasks & Dependencies", { contentDir: "ch02/07-tasks-and-dependencies", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792120718/ltv-airflow/tasks-and-dependencies.mp4", durationLabel: "1 min 39 s" }),
      L(8, "pythonoperator", "PythonOperator", { contentDir: "ch02/08-pythonoperator", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792120767/ltv-airflow/pythonoperator.mp4", durationLabel: "1 min 32 s" }),
      L(9, "bashoperator", "BashOperator", { contentDir: "ch02/09-bashoperator", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792120819/ltv-airflow/bashoperator.mp4", durationLabel: "1 min 43 s" }),
      L(10, "scheduling-and-cron", "Scheduling & Cron Expressions", { contentDir: "ch02/10-scheduling-and-cron", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792120867/ltv-airflow/scheduling-and-cron.mp4", durationLabel: "1 min 37 s" }),
      L(11, "task-instances-and-runs", "Task Instances & DAG Runs", { contentDir: "ch02/11-task-instances-and-runs" }),
      L(12, "xcoms", "XComs: Passing Data Between Tasks", { contentDir: "ch02/12-xcoms" }),
    ],
  },
  {
    n: 3,
    title: "Connections, Hooks & Providers",
    lessons: [
      L(13, "connections", "Connections", { contentDir: "ch03/13-connections" }),
      L(14, "hooks", "Hooks", { contentDir: "ch03/14-hooks" }),
      L(15, "provider-packages", "Provider Packages", { contentDir: "ch03/15-provider-packages" }),
      L(16, "connecting-to-snowflake-and-databases", "Connecting to Snowflake & Other Databases", { contentDir: "ch03/16-connecting-to-snowflake-and-databases" }),
    ],
  },
  {
    n: 4,
    title: "Sensors, Branching & Trigger Rules",
    lessons: [
      L(17, "sensors", "Sensors", { contentDir: "ch04/17-sensors" }),
      L(18, "branching", "Branching", { contentDir: "ch04/18-branching" }),
      L(19, "trigger-rules", "Trigger Rules", { contentDir: "ch04/19-trigger-rules" }),
      L(20, "dynamic-task-mapping", "Dynamic Task Mapping", { contentDir: "ch04/20-dynamic-task-mapping" }),
    ],
  },
  {
    n: 5,
    title: "Practical Data Pipelines With Airflow",
    lessons: [
      L(21, "building-an-elt-dag", "Building an ELT DAG", { contentDir: "ch05/21-building-an-elt-dag" }),
      L(22, "airflow-plus-dbt", "Airflow + dbt", { contentDir: "ch05/22-airflow-plus-dbt" }),
      L(23, "airflow-plus-snowflake-copy-into", "Airflow + Snowflake COPY INTO", { contentDir: "ch05/23-airflow-plus-snowflake-copy-into" }),
      L(24, "error-handling-and-retries", "Error Handling & Retries", { contentDir: "ch05/24-error-handling-and-retries" }),
      L(25, "alerting-from-airflow", "Alerting From Airflow", { contentDir: "ch05/25-alerting-from-airflow" }),
    ],
  },
  {
    n: 6,
    title: "Deploying & Monitoring Airflow",
    lessons: [
      L(26, "deployment-options", "Deployment Options: Managed vs. Self-Hosted", { contentDir: "ch06/26-deployment-options" }),
      L(27, "monitoring-and-logging", "Monitoring & Logging", { contentDir: "ch06/27-monitoring-and-logging" }),
      L(28, "troubleshooting-failed-dags", "Troubleshooting Failed DAGs", { contentDir: "ch06/28-troubleshooting-failed-dags" }),
    ],
  },
  {
    n: 7,
    title: "Capstone",
    lessons: [
      L(29, "capstone-project", "Capstone: An Orchestrated ELT Pipeline", { contentDir: "ch07/29-capstone-project" }),
      L(30, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch07/30-capstone-wrap-up" }),
    ],
  },
];
