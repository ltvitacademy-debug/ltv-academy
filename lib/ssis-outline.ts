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
      L(2, "ssdt-and-project-setup", "SSDT & Project Setup", { contentDir: "ch01/02-ssdt-and-project-setup" }),
      L(3, "the-ssis-architecture", "The SSIS Architecture", { contentDir: "ch01/03-the-ssis-architecture" }),
      L(4, "packages-projects-and-solutions", "Packages, Projects & Solutions", { contentDir: "ch01/04-packages-projects-and-solutions" }),
      L(5, "connection-managers", "Connection Managers", { contentDir: "ch01/05-connection-managers" }),
      L(6, "your-first-package", "Your First Package", { contentDir: "ch01/06-your-first-package" }),
    ],
  },
  {
    n: 2,
    title: "Control Flow",
    lessons: [
      L(7, "control-flow-fundamentals", "Control Flow Fundamentals", { contentDir: "ch02/07-control-flow-fundamentals" }),
      L(8, "execute-sql-task", "Execute SQL Task", { contentDir: "ch02/08-execute-sql-task" }),
      L(9, "execute-package-task", "Execute Package Task", { contentDir: "ch02/09-execute-package-task" }),
      L(10, "for-loop-and-foreach-loop", "For Loop & Foreach Loop Containers", { contentDir: "ch02/10-for-loop-and-foreach-loop" }),
      L(11, "sequence-containers", "Sequence Containers", { contentDir: "ch02/11-sequence-containers" }),
      L(12, "precedence-constraints", "Precedence Constraints", { contentDir: "ch02/12-precedence-constraints" }),
    ],
  },
  {
    n: 3,
    title: "Data Flow Fundamentals",
    lessons: [
      L(13, "data-flow-architecture", "Data Flow Architecture", { contentDir: "ch03/13-data-flow-architecture" }),
      L(14, "source-and-destination-components", "Source & Destination Components", { contentDir: "ch03/14-source-and-destination-components" }),
      L(15, "the-data-flow-buffer-concept", "The Data Flow Buffer Concept", { contentDir: "ch03/15-the-data-flow-buffer-concept" }),
      L(16, "ole-db-source-and-destination", "OLE DB Source & Destination", { contentDir: "ch03/16-ole-db-source-and-destination" }),
      L(17, "flat-file-source-and-destination", "Flat File Source & Destination", { contentDir: "ch03/17-flat-file-source-and-destination" }),
      L(18, "data-viewers-for-debugging", "Data Viewers for Debugging", { contentDir: "ch03/18-data-viewers-for-debugging" }),
    ],
  },
  {
    n: 4,
    title: "Data Flow Transformations",
    lessons: [
      L(19, "lookup-transformation", "Lookup Transformation", { contentDir: "ch04/19-lookup-transformation" }),
      L(20, "conditional-split", "Conditional Split", { contentDir: "ch04/20-conditional-split" }),
      L(21, "derived-column", "Derived Column", { contentDir: "ch04/21-derived-column" }),
      L(22, "data-conversion", "Data Conversion", { contentDir: "ch04/22-data-conversion" }),
      L(23, "aggregate", "Aggregate", { contentDir: "ch04/23-aggregate" }),
      L(24, "sort", "Sort", { contentDir: "ch04/24-sort" }),
      L(25, "merge-and-merge-join", "Merge & Merge Join", { contentDir: "ch04/25-merge-and-merge-join" }),
    ],
  },
  {
    n: 5,
    title: "Variables, Parameters & Expressions",
    lessons: [
      L(26, "package-variables", "Package Variables", { contentDir: "ch05/26-package-variables" }),
      L(27, "project-and-package-parameters", "Project & Package Parameters", { contentDir: "ch05/27-project-and-package-parameters" }),
      L(28, "expressions", "Expressions", { contentDir: "ch05/28-expressions" }),
      L(29, "dynamic-connection-strings", "Dynamic Connection Strings", { contentDir: "ch05/29-dynamic-connection-strings" }),
      L(30, "configuration-patterns", "Configuration Patterns", { contentDir: "ch05/30-configuration-patterns" }),
    ],
  },
  {
    n: 6,
    title: "Error Handling & Logging",
    lessons: [
      L(31, "event-handlers", "Event Handlers", { contentDir: "ch06/31-event-handlers" }),
      L(32, "error-outputs-on-data-flow-components", "Error Outputs on Data Flow Components", { contentDir: "ch06/32-error-outputs-on-data-flow-components" }),
      L(33, "logging-providers", "Logging Providers", { contentDir: "ch06/33-logging-providers" }),
      L(34, "checkpoints-and-restartability", "Checkpoints & Restartability", { contentDir: "ch06/34-checkpoints-and-restartability" }),
      L(35, "common-failure-patterns", "Common Failure Patterns", { contentDir: "ch06/35-common-failure-patterns" }),
    ],
  },
  {
    n: 7,
    title: "Advanced SSIS Patterns",
    lessons: [
      L(36, "incremental-loads-with-ssis", "Incremental Loads With SSIS", { contentDir: "ch07/36-incremental-loads-with-ssis" }),
      L(37, "scd-transformation", "The Slowly Changing Dimension Transformation", { contentDir: "ch07/37-scd-transformation" }),
      L(38, "script-tasks-and-components", "Script Tasks & Script Components: C# Basics", { contentDir: "ch07/38-script-tasks-and-components" }),
      L(39, "package-configurations", "Package Configurations", { contentDir: "ch07/39-package-configurations" }),
      L(40, "master-child-package-patterns", "Master/Child Package Patterns", { contentDir: "ch07/40-master-child-package-patterns" }),
    ],
  },
  {
    n: 8,
    title: "Deployment & Administration",
    lessons: [
      L(41, "the-ssis-catalog", "The SSIS Catalog", { contentDir: "ch08/41-the-ssis-catalog" }),
      L(42, "deploying-projects", "Deploying Projects", { contentDir: "ch08/42-deploying-projects" }),
      L(43, "environments-and-environment-variables", "Environments & Environment Variables", { contentDir: "ch08/43-environments-and-environment-variables" }),
      L(44, "scheduling-with-sql-server-agent", "Scheduling With SQL Server Agent", { contentDir: "ch08/44-scheduling-with-sql-server-agent" }),
      L(45, "monitoring-package-execution", "Monitoring Package Execution", { contentDir: "ch08/45-monitoring-package-execution" }),
    ],
  },
  {
    n: 9,
    title: "Capstone",
    lessons: [
      L(46, "capstone-kickoff", "Capstone Kickoff", { contentDir: "ch09/46-capstone-kickoff" }),
      L(47, "capstone-building-a-real-etl-package", "Capstone: Building a Real ETL Package", { contentDir: "ch09/47-capstone-building-a-real-etl-package" }),
      L(48, "capstone-incremental-load-and-error-handling", "Capstone: Incremental Load & Error Handling", { contentDir: "ch09/48-capstone-incremental-load-and-error-handling" }),
      L(49, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch09/49-capstone-wrap-up" }),
    ],
  },
];
