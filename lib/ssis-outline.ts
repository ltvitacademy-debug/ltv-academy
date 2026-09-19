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
      L(1, "what-is-ssis", "What Is SSIS?", {
        contentDir: "ch01/01-what-is-ssis",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789828705/ltv-ssis/ch01-01-what-is-ssis.mp4",
        durationLabel: "2 min 55 s",
      }),
      L(2, "ssdt-and-project-setup", "SSDT & Project Setup", { contentDir: "ch01/02-ssdt-and-project-setup",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789828990/ltv-ssis/ch01-02-ssdt-and-project-setup.mp4",
        durationLabel: "2 min 4 s",
      }),
      L(3, "the-ssis-architecture", "The SSIS Architecture", { contentDir: "ch01/03-the-ssis-architecture",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789829107/ltv-ssis/ch01-03-the-ssis-architecture.mp4",
        durationLabel: "2 min 14 s",
      }),
      L(4, "packages-projects-and-solutions", "Packages, Projects & Solutions", { contentDir: "ch01/04-packages-projects-and-solutions",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789829216/ltv-ssis/ch01-04-packages-projects-and-solutions.mp4",
        durationLabel: "2 min 24 s",
      }),
      L(5, "connection-managers", "Connection Managers", { contentDir: "ch01/05-connection-managers",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789829345/ltv-ssis/ch01-05-connection-managers.mp4",
        durationLabel: "2 min 3 s",
      }),
      L(6, "your-first-package", "Your First Package", { contentDir: "ch01/06-your-first-package",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789829473/ltv-ssis/ch01-06-your-first-package.mp4",
        durationLabel: "2 min 3 s",
      }),
    ],
  },
  {
    n: 2,
    title: "Control Flow",
    lessons: [
      L(7, "control-flow-fundamentals", "Control Flow Fundamentals", { contentDir: "ch02/07-control-flow-fundamentals",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789829676/ltv-ssis/ch02-07-control-flow-fundamentals.mp4",
        durationLabel: "2 min 43 s",
      }),
      L(8, "execute-sql-task", "Execute SQL Task", { contentDir: "ch02/08-execute-sql-task",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789829828/ltv-ssis/ch02-08-execute-sql-task.mp4",
        durationLabel: "2 min 47 s",
      }),
      L(9, "execute-package-task", "Execute Package Task", { contentDir: "ch02/09-execute-package-task",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789829925/ltv-ssis/ch02-09-execute-package-task.mp4",
        durationLabel: "2 min 1 s",
      }),
      L(10, "for-loop-and-foreach-loop", "For Loop & Foreach Loop Containers", { contentDir: "ch02/10-for-loop-and-foreach-loop",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789830024/ltv-ssis/ch02-10-for-loop-and-foreach-loop.mp4",
        durationLabel: "2 min 18 s",
      }),
      L(11, "sequence-containers", "Sequence Containers", { contentDir: "ch02/11-sequence-containers",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789830119/ltv-ssis/ch02-11-sequence-containers.mp4",
        durationLabel: "2 min 11 s",
      }),
      L(12, "precedence-constraints", "Precedence Constraints", { contentDir: "ch02/12-precedence-constraints",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789830259/ltv-ssis/ch02-12-precedence-constraints.mp4",
        durationLabel: "2 min 18 s",
      }),
    ],
  },
  {
    n: 3,
    title: "Data Flow Fundamentals",
    lessons: [
      L(13, "data-flow-architecture", "Data Flow Architecture", { contentDir: "ch03/13-data-flow-architecture",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789830358/ltv-ssis/ch03-13-data-flow-architecture.mp4",
        durationLabel: "2 min 20 s",
      }),
      L(14, "source-and-destination-components", "Source & Destination Components", { contentDir: "ch03/14-source-and-destination-components",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789830458/ltv-ssis/ch03-14-source-and-destination-components.mp4",
        durationLabel: "2 min 17 s",
      }),
      L(15, "the-data-flow-buffer-concept", "The Data Flow Buffer Concept", { contentDir: "ch03/15-the-data-flow-buffer-concept",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789830557/ltv-ssis/ch03-15-the-data-flow-buffer-concept.mp4",
        durationLabel: "2 min 14 s",
      }),
      L(16, "ole-db-source-and-destination", "OLE DB Source & Destination", { contentDir: "ch03/16-ole-db-source-and-destination",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789830649/ltv-ssis/ch03-16-ole-db-source-and-destination.mp4",
        durationLabel: "2 min 2 s",
      }),
      L(17, "flat-file-source-and-destination", "Flat File Source & Destination", { contentDir: "ch03/17-flat-file-source-and-destination",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789830717/ltv-ssis/ch03-17-flat-file-source-and-destination.mp4",
        durationLabel: "1 min 34 s",
      }),
      L(18, "data-viewers-for-debugging", "Data Viewers for Debugging", { contentDir: "ch03/18-data-viewers-for-debugging",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789830787/ltv-ssis/ch03-18-data-viewers-for-debugging.mp4",
        durationLabel: "1 min 36 s",
      }),
    ],
  },
  {
    n: 4,
    title: "Data Flow Transformations",
    lessons: [
      L(19, "lookup-transformation", "Lookup Transformation", { contentDir: "ch04/19-lookup-transformation",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789830926/ltv-ssis/ch04-19-lookup-transformation.mp4",
        durationLabel: "2 min 38 s",
      }),
      L(20, "conditional-split", "Conditional Split", { contentDir: "ch04/20-conditional-split",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789831005/ltv-ssis/ch04-20-conditional-split.mp4",
        durationLabel: "1 min 47 s",
      }),
      L(21, "derived-column", "Derived Column", { contentDir: "ch04/21-derived-column",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789831118/ltv-ssis/ch04-21-derived-column.mp4",
        durationLabel: "2 min 29 s",
      }),
      L(22, "data-conversion", "Data Conversion", { contentDir: "ch04/22-data-conversion",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789831217/ltv-ssis/ch04-22-data-conversion.mp4",
        durationLabel: "2 min 4 s",
      }),
      L(23, "aggregate", "Aggregate", { contentDir: "ch04/23-aggregate",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789831319/ltv-ssis/ch04-23-aggregate.mp4",
        durationLabel: "2 min 10 s",
      }),
      L(24, "sort", "Sort", { contentDir: "ch04/24-sort",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789831405/ltv-ssis/ch04-24-sort.mp4",
        durationLabel: "2 min 9 s",
      }),
      L(25, "merge-and-merge-join", "Merge & Merge Join", { contentDir: "ch04/25-merge-and-merge-join",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789831513/ltv-ssis/ch04-25-merge-and-merge-join.mp4",
        durationLabel: "2 min 26 s",
      }),
    ],
  },
  {
    n: 5,
    title: "Variables, Parameters & Expressions",
    lessons: [
      L(26, "package-variables", "Package Variables", { contentDir: "ch05/26-package-variables",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789831643/ltv-ssis/ch05-26-package-variables.mp4",
        durationLabel: "2 min 55 s",
      }),
      L(27, "project-and-package-parameters", "Project & Package Parameters", { contentDir: "ch05/27-project-and-package-parameters",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789831747/ltv-ssis/ch05-27-project-and-package-parameters.mp4",
        durationLabel: "2 min 16 s",
      }),
      L(28, "expressions", "Expressions", { contentDir: "ch05/28-expressions",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789831831/ltv-ssis/ch05-28-expressions.mp4",
        durationLabel: "1 min 56 s",
      }),
      L(29, "dynamic-connection-strings", "Dynamic Connection Strings", { contentDir: "ch05/29-dynamic-connection-strings",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789831943/ltv-ssis/ch05-29-dynamic-connection-strings.mp4",
        durationLabel: "2 min 24 s",
      }),
      L(30, "configuration-patterns", "Configuration Patterns", { contentDir: "ch05/30-configuration-patterns",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789832021/ltv-ssis/ch05-30-configuration-patterns.mp4",
        durationLabel: "1 min 54 s",
      }),
    ],
  },
  {
    n: 6,
    title: "Error Handling & Logging",
    lessons: [
      L(31, "event-handlers", "Event Handlers", { contentDir: "ch06/31-event-handlers",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789832149/ltv-ssis/ch06-31-event-handlers.mp4",
        durationLabel: "2 min 39 s",
      }),
      L(32, "error-outputs-on-data-flow-components", "Error Outputs on Data Flow Components", { contentDir: "ch06/32-error-outputs-on-data-flow-components",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789832276/ltv-ssis/ch06-32-error-outputs-on-data-flow-components.mp4",
        durationLabel: "2 min 39 s",
      }),
      L(33, "logging-providers", "Logging Providers", { contentDir: "ch06/33-logging-providers",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789832386/ltv-ssis/ch06-33-logging-providers.mp4",
        durationLabel: "2 min 42 s",
      }),
      L(34, "checkpoints-and-restartability", "Checkpoints & Restartability", { contentDir: "ch06/34-checkpoints-and-restartability",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789832499/ltv-ssis/ch06-34-checkpoints-and-restartability.mp4",
        durationLabel: "2 min 38 s",
      }),
      L(35, "common-failure-patterns", "Common Failure Patterns", { contentDir: "ch06/35-common-failure-patterns",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789832627/ltv-ssis/ch06-35-common-failure-patterns.mp4",
        durationLabel: "2 min 42 s",
      }),
    ],
  },
  {
    n: 7,
    title: "Advanced SSIS Patterns",
    lessons: [
      L(36, "incremental-loads-with-ssis", "Incremental Loads With SSIS", { contentDir: "ch07/36-incremental-loads-with-ssis",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789832727/ltv-ssis/ch07-36-incremental-loads-with-ssis.mp4",
        durationLabel: "2 min 13 s",
      }),
      L(37, "scd-transformation", "The Slowly Changing Dimension Transformation", { contentDir: "ch07/37-scd-transformation",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789832832/ltv-ssis/ch07-37-scd-transformation.mp4",
        durationLabel: "2 min 26 s",
      }),
      L(38, "script-tasks-and-components", "Script Tasks & Script Components: C# Basics", { contentDir: "ch07/38-script-tasks-and-components",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789832934/ltv-ssis/ch07-38-script-tasks-and-components.mp4",
        durationLabel: "2 min 49 s",
      }),
      L(39, "package-configurations", "Package Configurations", { contentDir: "ch07/39-package-configurations",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789833025/ltv-ssis/ch07-39-package-configurations.mp4",
        durationLabel: "2 min 21 s",
      }),
      L(40, "master-child-package-patterns", "Master/Child Package Patterns", { contentDir: "ch07/40-master-child-package-patterns",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789833101/ltv-ssis/ch07-40-master-child-package-patterns.mp4",
        durationLabel: "1 min 43 s",
      }),
    ],
  },
  {
    n: 8,
    title: "Deployment & Administration",
    lessons: [
      L(41, "the-ssis-catalog", "The SSIS Catalog", { contentDir: "ch08/41-the-ssis-catalog",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789833192/ltv-ssis/ch08-41-the-ssis-catalog.mp4",
        durationLabel: "2 min 19 s",
      }),
      L(42, "deploying-projects", "Deploying Projects", { contentDir: "ch08/42-deploying-projects",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789833296/ltv-ssis/ch08-42-deploying-projects.mp4",
        durationLabel: "2 min 26 s",
      }),
      L(43, "environments-and-environment-variables", "Environments & Environment Variables", { contentDir: "ch08/43-environments-and-environment-variables",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789833384/ltv-ssis/ch08-43-environments-and-environment-variables.mp4",
        durationLabel: "2 min 11 s",
      }),
      L(44, "scheduling-with-sql-server-agent", "Scheduling With SQL Server Agent", { contentDir: "ch08/44-scheduling-with-sql-server-agent",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789833454/ltv-ssis/ch08-44-scheduling-with-sql-server-agent.mp4",
        durationLabel: "1 min 53 s",
      }),
      L(45, "monitoring-package-execution", "Monitoring Package Execution", { contentDir: "ch08/45-monitoring-package-execution",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789833524/ltv-ssis/ch08-45-monitoring-package-execution.mp4",
        durationLabel: "1 min 43 s",
      }),
    ],
  },
  {
    n: 9,
    title: "Capstone",
    lessons: [
      L(46, "capstone-kickoff", "Capstone Kickoff", { contentDir: "ch09/46-capstone-kickoff",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789833645/ltv-ssis/ch09-46-capstone-kickoff.mp4",
        durationLabel: "3 min 10 s",
      }),
      L(47, "capstone-building-a-real-etl-package", "Capstone: Building a Real ETL Package", { contentDir: "ch09/47-capstone-building-a-real-etl-package",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789833747/ltv-ssis/ch09-47-capstone-building-a-real-etl-package.mp4",
        durationLabel: "2 min 38 s",
      }),
      L(48, "capstone-incremental-load-and-error-handling", "Capstone: Incremental Load & Error Handling", { contentDir: "ch09/48-capstone-incremental-load-and-error-handling",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789833838/ltv-ssis/ch09-48-capstone-incremental-load-and-error-handling.mp4",
        durationLabel: "2 min 26 s",
      }),
      L(49, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch09/49-capstone-wrap-up",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789833924/ltv-ssis/ch09-49-capstone-wrap-up.mp4",
        durationLabel: "2 min 34 s",
      }),
    ],
  },
];
