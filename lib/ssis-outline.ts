// The full SSIS Development course outline. Only lessons with a
// contentDir + videoUrl are playable; everything else renders as "in
// production". Assumes T-SQL Development's SQL foundation — this course
// teaches the ETL platform itself: control flow, data flow, transformations,
// error handling, and deployment.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/ssis/
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

export const SSIS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "SSIS Fundamentals",
    lessons: [
      L(1, "what-is-ssis", "What Is SSIS?", { contentDir: "ch01/01-what-is-ssis" }),
      L(2, "ssdt-and-project-setup", "SSDT & Project Setup"),
      L(3, "the-ssis-architecture", "The SSIS Architecture"),
      L(4, "packages-projects-and-solutions", "Packages, Projects & Solutions"),
      L(5, "connection-managers", "Connection Managers"),
      L(6, "your-first-package", "Your First Package"),
    ],
  },
  {
    n: 2,
    title: "Control Flow",
    lessons: [
      L(7, "control-flow-fundamentals", "Control Flow Fundamentals"),
      L(8, "execute-sql-task", "Execute SQL Task"),
      L(9, "execute-package-task", "Execute Package Task"),
      L(10, "for-loop-and-foreach-loop", "For Loop & Foreach Loop Containers"),
      L(11, "sequence-containers", "Sequence Containers"),
      L(12, "precedence-constraints", "Precedence Constraints"),
    ],
  },
  {
    n: 3,
    title: "Data Flow Fundamentals",
    lessons: [
      L(13, "data-flow-architecture", "Data Flow Architecture"),
      L(14, "source-and-destination-components", "Source & Destination Components"),
      L(15, "the-data-flow-buffer-concept", "The Data Flow Buffer Concept"),
      L(16, "ole-db-source-and-destination", "OLE DB Source & Destination"),
      L(17, "flat-file-source-and-destination", "Flat File Source & Destination"),
      L(18, "data-viewers-for-debugging", "Data Viewers for Debugging"),
    ],
  },
  {
    n: 4,
    title: "Data Flow Transformations",
    lessons: [
      L(19, "lookup-transformation", "Lookup Transformation"),
      L(20, "conditional-split", "Conditional Split"),
      L(21, "derived-column", "Derived Column"),
      L(22, "data-conversion", "Data Conversion"),
      L(23, "aggregate", "Aggregate"),
      L(24, "sort", "Sort"),
      L(25, "merge-and-merge-join", "Merge & Merge Join"),
    ],
  },
  {
    n: 5,
    title: "Variables, Parameters & Expressions",
    lessons: [
      L(26, "package-variables", "Package Variables"),
      L(27, "project-and-package-parameters", "Project & Package Parameters"),
      L(28, "expressions", "Expressions"),
      L(29, "dynamic-connection-strings", "Dynamic Connection Strings"),
      L(30, "configuration-patterns", "Configuration Patterns"),
    ],
  },
  {
    n: 6,
    title: "Error Handling & Logging",
    lessons: [
      L(31, "event-handlers", "Event Handlers"),
      L(32, "error-outputs-on-data-flow-components", "Error Outputs on Data Flow Components"),
      L(33, "logging-providers", "Logging Providers"),
      L(34, "checkpoints-and-restartability", "Checkpoints & Restartability"),
      L(35, "common-failure-patterns", "Common Failure Patterns"),
    ],
  },
  {
    n: 7,
    title: "Advanced SSIS Patterns",
    lessons: [
      L(36, "incremental-loads-with-ssis", "Incremental Loads With SSIS"),
      L(37, "scd-transformation", "The Slowly Changing Dimension Transformation"),
      L(38, "script-tasks-and-components", "Script Tasks & Script Components: C# Basics"),
      L(39, "package-configurations", "Package Configurations"),
      L(40, "master-child-package-patterns", "Master/Child Package Patterns"),
    ],
  },
  {
    n: 8,
    title: "Deployment & Administration",
    lessons: [
      L(41, "the-ssis-catalog", "The SSIS Catalog"),
      L(42, "deploying-projects", "Deploying Projects"),
      L(43, "environments-and-environment-variables", "Environments & Environment Variables"),
      L(44, "scheduling-with-sql-server-agent", "Scheduling With SQL Server Agent"),
      L(45, "monitoring-package-execution", "Monitoring Package Execution"),
    ],
  },
  {
    n: 9,
    title: "Capstone",
    lessons: [
      L(46, "capstone-kickoff", "Capstone Kickoff"),
      L(47, "capstone-building-a-real-etl-package", "Capstone: Building a Real ETL Package"),
      L(48, "capstone-incremental-load-and-error-handling", "Capstone: Incremental Load & Error Handling"),
      L(49, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
