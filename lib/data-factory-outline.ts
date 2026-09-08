// The full Data Factory course outline. Only lessons with a contentDir +
// videoUrl are playable; everything else renders as "in production".
// Mirrors the pattern in powerbi-outline.ts / python-outline.ts.

import type { ChapterMeta, LessonMeta } from "./powerbi-outline";

const L = (n: number, slug: string, title: string, extra?: Partial<LessonMeta>): LessonMeta => ({
  n,
  slug,
  title,
  ...extra,
});

export const DATA_FACTORY_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Getting Started",
    lessons: [
      L(1, "what-is-azure-data-factory", "What Is Azure Data Factory?", {
        contentDir: "ch01/01-what-is-azure-data-factory",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788835827/ltv-data-factory/ch01-01-what-is-azure-data-factory.mp4",
        durationLabel: "3 min 41 s",
      }),
      L(2, "etl-vs-elt", "ETL vs. ELT", {
        contentDir: "ch01/02-etl-vs-elt",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788836007/ltv-data-factory/ch01-02-etl-vs-elt.mp4",
        durationLabel: "2 min 18 s",
      }),
      L(3, "adf-vs-ssis-vs-fabric", "Data Factory vs. SSIS vs. Fabric Data Factory", {
        contentDir: "ch01/03-adf-vs-ssis-vs-fabric",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788836425/ltv-data-factory/ch01-03-adf-vs-ssis-vs-fabric.mp4",
        durationLabel: "2 min 29 s",
      }),
      L(4, "creating-a-data-factory", "Creating a Data Factory Instance", {
        contentDir: "ch01/04-creating-a-data-factory",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788836641/ltv-data-factory/ch01-04-creating-a-data-factory.mp4",
        durationLabel: "2 min 36 s",
      }),
      L(5, "studio-tour", "The Data Factory Studio Tour", {
        contentDir: "ch01/05-studio-tour",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788836868/ltv-data-factory/ch01-05-studio-tour.mp4",
        durationLabel: "2 min 54 s",
      }),
    ],
  },
  {
    n: 2,
    title: "Connecting to Data",
    lessons: [
      L(6, "linked-services-explained", "Linked Services Explained", {
        contentDir: "ch02/06-linked-services-explained",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788859764/ltv-data-factory/ch02-06-linked-services-explained.mp4",
        durationLabel: "2 min 32 s",
      }),
      L(7, "connecting-blob-storage", "Connecting to Azure Blob Storage", {
        contentDir: "ch02/07-connecting-blob-storage",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788859767/ltv-data-factory/ch02-07-connecting-blob-storage.mp4",
        durationLabel: "2 min 10 s",
      }),
      L(8, "connecting-sql-sources", "Connecting to Azure SQL & On-Premises SQL Server", {
        contentDir: "ch02/08-connecting-sql-sources",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788859769/ltv-data-factory/ch02-08-connecting-sql-sources.mp4",
        durationLabel: "2 min 9 s",
      }),
      L(9, "datasets-structure-schema", "Datasets: Structure & Schema", {
        contentDir: "ch02/09-datasets-structure-schema",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788859771/ltv-data-factory/ch02-09-datasets-structure-schema.mp4",
        durationLabel: "2 min 19 s",
      }),
      L(10, "parameterizing-linked-services", "Parameterizing Linked Services & Datasets", {
        contentDir: "ch02/10-parameterizing-linked-services",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788859774/ltv-data-factory/ch02-10-parameterizing-linked-services.mp4",
        durationLabel: "2 min 14 s",
      }),
    ],
  },
  {
    n: 3,
    title: "Pipelines & Activities",
    lessons: [
      L(11, "what-is-a-pipeline", "What Is a Pipeline?"),
      L(12, "copy-activity", "The Copy Activity"),
      L(13, "copy-activity-mapping-schema-drift", "Copy Activity: Mapping & Schema Drift"),
      L(14, "lookup-stored-procedure-activities", "Lookup & Stored Procedure Activities"),
      L(15, "web-wait-fail-set-variable", "Web, Wait, Fail & Set Variable Activities"),
      L(16, "first-end-to-end-pipeline", "Building Your First End-to-End Pipeline"),
    ],
  },
  {
    n: 4,
    title: "Control Flow & Orchestration",
    lessons: [
      L(17, "parameters-vs-variables", "Parameters vs. Variables"),
      L(18, "if-condition-switch", "If Condition & Switch Activities"),
      L(19, "foreach-activity", "ForEach Activity"),
      L(20, "until-activity", "Until Activity"),
      L(21, "execute-pipeline-activity", "Execute Pipeline Activity"),
      L(22, "expression-language-system-variables", "Expression Language & System Variables"),
    ],
  },
  {
    n: 5,
    title: "Mapping Data Flows",
    lessons: [
      L(23, "what-is-a-mapping-data-flow", "What Is a Mapping Data Flow?"),
      L(24, "data-flow-debug-mode", "Data Flow Debug Mode"),
      L(25, "source-sink-transformations", "Source & Sink Transformations"),
      L(26, "filter-select-derived-column", "Filter, Select & Derived Column"),
      L(27, "join-aggregate-transformations", "Join & Aggregate Transformations"),
      L(28, "conditional-split-pivot-unpivot", "Conditional Split, Pivot & Unpivot"),
      L(29, "data-flow-performance-tuning", "Data Flow Performance Tuning"),
    ],
  },
  {
    n: 6,
    title: "Triggers & Scheduling",
    lessons: [
      L(30, "schedule-triggers", "Schedule Triggers"),
      L(31, "tumbling-window-triggers", "Tumbling Window Triggers"),
      L(32, "event-based-triggers", "Event-Based Triggers"),
      L(33, "trigger-dependencies-chaining", "Trigger Dependencies & Chaining"),
    ],
  },
  {
    n: 7,
    title: "Integration Runtimes",
    lessons: [
      L(34, "what-is-an-integration-runtime", "What Is an Integration Runtime?"),
      L(35, "azure-integration-runtime", "Azure Integration Runtime"),
      L(36, "self-hosted-integration-runtime", "Self-Hosted Integration Runtime"),
      L(37, "connecting-on-premises-securely", "Connecting to On-Premises Data Securely"),
    ],
  },
  {
    n: 8,
    title: "Monitoring & Error Handling",
    lessons: [
      L(38, "the-monitor-hub", "The Monitor Hub"),
      L(39, "alerts-metrics-retry-policies", "Alerts, Metrics & Retry Policies"),
      L(40, "error-handling-patterns", "Error Handling Patterns"),
      L(41, "logging-to-log-analytics", "Logging to Log Analytics"),
    ],
  },
  {
    n: 9,
    title: "Fabric Data Factory",
    lessons: [
      L(42, "fabric-data-factory-overview", "Fabric Data Factory Overview"),
      L(43, "dataflow-gen2-vs-mapping-data-flows", "Dataflow Gen2 vs. Mapping Data Flows"),
      L(44, "pipelines-in-fabric", "Pipelines in Fabric"),
      L(45, "onelake-as-a-destination", "OneLake as a Destination"),
      L(46, "migrating-adf-to-fabric", "Migrating ADF Pipelines to Fabric"),
      L(47, "adf-vs-fabric-when-to-choose", "When to Choose ADF vs. Fabric"),
    ],
  },
  {
    n: 10,
    title: "Security, DevOps & CI/CD",
    lessons: [
      L(48, "managed-identities-key-vault", "Managed Identities & Key Vault Integration"),
      L(49, "role-based-access-control", "Role-Based Access Control (RBAC)"),
      L(50, "git-integration-source-control", "Git Integration & Source Control"),
      L(51, "publishing-and-environments", "Publishing & Environments (Dev/Test/Prod)"),
      L(52, "arm-templates-devops-pipelines", "ARM Templates & Azure DevOps Pipelines"),
    ],
  },
  {
    n: 11,
    title: "Capstone Project",
    lessons: [
      L(53, "capstone-requirements", "Capstone: Business Requirements"),
      L(54, "capstone-connect-copy-pipeline", "Capstone: Connect & Build the Copy Pipeline"),
      L(55, "capstone-control-flow-error-handling", "Capstone: Add Control Flow & Error Handling"),
      L(56, "capstone-mapping-data-flow", "Capstone: Build the Mapping Data Flow"),
      L(57, "capstone-schedule-secure-monitor", "Capstone: Schedule, Secure & Monitor"),
      L(58, "capstone-present", "Capstone: Present the Finished Pipeline"),
    ],
  },
];
