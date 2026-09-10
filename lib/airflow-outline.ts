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
      L(1, "why-orchestration", "What Is Airflow & Why Orchestration?"),
      L(2, "the-dag-concept", "The DAG Concept"),
      L(3, "installing-and-running-airflow", "Installing & Running Airflow"),
      L(4, "the-airflow-ui", "The Airflow UI, Tour"),
      L(5, "operators-overview", "Operators Overview"),
      L(6, "your-first-dag", "Your First DAG"),
    ],
  },
  {
    n: 2,
    title: "Building DAGs",
    lessons: [
      L(7, "tasks-and-dependencies", "Tasks & Dependencies"),
      L(8, "pythonoperator", "PythonOperator"),
      L(9, "bashoperator", "BashOperator"),
      L(10, "scheduling-and-cron", "Scheduling & Cron Expressions"),
      L(11, "task-instances-and-runs", "Task Instances & DAG Runs"),
      L(12, "xcoms", "XComs: Passing Data Between Tasks"),
    ],
  },
  {
    n: 3,
    title: "Connections, Hooks & Providers",
    lessons: [
      L(13, "connections", "Connections"),
      L(14, "hooks", "Hooks"),
      L(15, "provider-packages", "Provider Packages"),
      L(16, "connecting-to-snowflake-and-databases", "Connecting to Snowflake & Other Databases"),
    ],
  },
  {
    n: 4,
    title: "Sensors, Branching & Trigger Rules",
    lessons: [
      L(17, "sensors", "Sensors"),
      L(18, "branching", "Branching"),
      L(19, "trigger-rules", "Trigger Rules"),
      L(20, "dynamic-task-mapping", "Dynamic Task Mapping"),
    ],
  },
  {
    n: 5,
    title: "Practical Data Pipelines With Airflow",
    lessons: [
      L(21, "building-an-elt-dag", "Building an ELT DAG"),
      L(22, "airflow-plus-dbt", "Airflow + dbt"),
      L(23, "airflow-plus-snowflake-copy-into", "Airflow + Snowflake COPY INTO"),
      L(24, "error-handling-and-retries", "Error Handling & Retries"),
      L(25, "alerting-from-airflow", "Alerting From Airflow"),
    ],
  },
  {
    n: 6,
    title: "Deploying & Monitoring Airflow",
    lessons: [
      L(26, "deployment-options", "Deployment Options: Managed vs. Self-Hosted"),
      L(27, "monitoring-and-logging", "Monitoring & Logging"),
      L(28, "troubleshooting-failed-dags", "Troubleshooting Failed DAGs"),
    ],
  },
  {
    n: 7,
    title: "Capstone",
    lessons: [
      L(29, "capstone-project", "Capstone: An Orchestrated ELT Pipeline"),
      L(30, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
