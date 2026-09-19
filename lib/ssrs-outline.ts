// The full SSRS Development course outline. Only lessons with a
// contentDir + videoUrl are playable; everything else renders as "in
// production". Assumes T-SQL Development — this course teaches paginated
// reporting itself: report design, parameters, expressions, drilldowns,
// subscriptions, and deployment.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/ssrs/
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

export const SSRS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "SSRS Fundamentals",
    lessons: [
      L(1, "what-is-ssrs-and-paginated-reporting", "What Is SSRS & Paginated Reporting?", { contentDir: "ch01/01-what-is-ssrs-and-paginated-reporting",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789834193/ltv-ssrs/ch01-01-what-is-ssrs-and-paginated-reporting.mp4",
        durationLabel: "2 min 15 s",
      }),
      L(2, "report-server-architecture", "Report Server Architecture", { contentDir: "ch01/02-report-server-architecture",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789834259/ltv-ssrs/ch01-02-report-server-architecture.mp4",
        durationLabel: "1 min 50 s",
      }),
      L(3, "report-builder-vs-ssdt", "Report Builder vs. SSDT/Visual Studio", { contentDir: "ch01/03-report-builder-vs-ssdt",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789834339/ltv-ssrs/ch01-03-report-builder-vs-ssdt.mp4",
        durationLabel: "2 min 7 s",
      }),
      L(4, "setting-up-a-report-project", "Setting Up a Report Project", { contentDir: "ch01/04-setting-up-a-report-project",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789834404/ltv-ssrs/ch01-04-setting-up-a-report-project.mp4",
        durationLabel: "1 min 46 s",
      }),
      L(5, "deploying-to-report-server", "Deploying to Report Server", { contentDir: "ch01/05-deploying-to-report-server",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789834474/ltv-ssrs/ch01-05-deploying-to-report-server.mp4",
        durationLabel: "2 min 4 s",
      }),
    ],
  },
  {
    n: 2,
    title: "Building Reports",
    lessons: [
      L(6, "datasets-and-data-sources", "Datasets & Data Sources", { contentDir: "ch02/06-datasets-and-data-sources",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789834546/ltv-ssrs/ch02-06-datasets-and-data-sources.mp4",
        durationLabel: "1 min 57 s",
      }),
      L(7, "the-report-design-surface", "The Report Design Surface", { contentDir: "ch02/07-the-report-design-surface",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789834633/ltv-ssrs/ch02-07-the-report-design-surface.mp4",
        durationLabel: "2 min 26 s",
      }),
      L(8, "tables-and-lists", "Tables & Lists", { contentDir: "ch02/08-tables-and-lists",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789834705/ltv-ssrs/ch02-08-tables-and-lists.mp4",
        durationLabel: "2 min 7 s",
      }),
      L(9, "matrices", "Matrices", { contentDir: "ch02/09-matrices",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789834779/ltv-ssrs/ch02-09-matrices.mp4",
        durationLabel: "2 min 2 s",
      }),
      L(10, "grouping-and-sorting", "Grouping & Sorting", { contentDir: "ch02/10-grouping-and-sorting",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789834859/ltv-ssrs/ch02-10-grouping-and-sorting.mp4",
        durationLabel: "2 min 13 s",
      }),
      L(11, "report-layout-best-practices", "Report Layout Best Practices", { contentDir: "ch02/11-report-layout-best-practices",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789834938/ltv-ssrs/ch02-11-report-layout-best-practices.mp4",
        durationLabel: "2 min 24 s",
      }),
    ],
  },
  {
    n: 3,
    title: "Parameters",
    lessons: [
      L(12, "report-parameters", "Report Parameters", { contentDir: "ch03/12-report-parameters",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789835006/ltv-ssrs/ch03-12-report-parameters.mp4",
        durationLabel: "1 min 53 s",
      }),
      L(13, "cascading-parameters", "Cascading Parameters", { contentDir: "ch03/13-cascading-parameters",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789835068/ltv-ssrs/ch03-13-cascading-parameters.mp4",
        durationLabel: "1 min 39 s",
      }),
      L(14, "default-values", "Default Values", { contentDir: "ch03/14-default-values",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789835129/ltv-ssrs/ch03-14-default-values.mp4",
        durationLabel: "1 min 42 s",
      }),
      L(15, "multi-value-parameters", "Multi-Value Parameters", { contentDir: "ch03/15-multi-value-parameters",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789835186/ltv-ssrs/ch03-15-multi-value-parameters.mp4",
        durationLabel: "1 min 33 s",
      }),
      L(16, "parameter-driven-datasets", "Parameter-Driven Datasets", { contentDir: "ch03/16-parameter-driven-datasets",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789835256/ltv-ssrs/ch03-16-parameter-driven-datasets.mp4",
        durationLabel: "1 min 53 s",
      }),
    ],
  },
  {
    n: 4,
    title: "Expressions & Formatting",
    lessons: [
      L(17, "the-expression-editor", "The Expression Editor", { contentDir: "ch04/17-the-expression-editor",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789835341/ltv-ssrs/ch04-17-the-expression-editor.mp4",
        durationLabel: "2 min 30 s",
      }),
      L(18, "common-expression-patterns", "Common Expression Patterns", { contentDir: "ch04/18-common-expression-patterns",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789835416/ltv-ssrs/ch04-18-common-expression-patterns.mp4",
        durationLabel: "2 min 6 s",
      }),
      L(19, "conditional-formatting", "Conditional Formatting", { contentDir: "ch04/19-conditional-formatting",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789835505/ltv-ssrs/ch04-19-conditional-formatting.mp4",
        durationLabel: "2 min 21 s",
      }),
      L(20, "text-box-formatting", "Text Box Formatting", { contentDir: "ch04/20-text-box-formatting",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789835580/ltv-ssrs/ch04-20-text-box-formatting.mp4",
        durationLabel: "2 min 3 s",
      }),
      L(21, "formatting-numbers-dates-currency", "Formatting Numbers, Dates & Currency", { contentDir: "ch04/21-formatting-numbers-dates-currency",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789835664/ltv-ssrs/ch04-21-formatting-numbers-dates-currency.mp4",
        durationLabel: "2 min 28 s",
      }),
    ],
  },
  {
    n: 5,
    title: "Charts & Visual Elements",
    lessons: [
      L(22, "charts-in-ssrs", "Charts in SSRS", { contentDir: "ch05/22-charts-in-ssrs",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789835789/ltv-ssrs/ch05-22-charts-in-ssrs.mp4",
        durationLabel: "3 min 40 s",
      }),
      L(23, "gauges", "Gauges", { contentDir: "ch05/23-gauges",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789835892/ltv-ssrs/ch05-23-gauges.mp4",
        durationLabel: "2 min 53 s",
      }),
      L(24, "indicators", "Indicators", { contentDir: "ch05/24-indicators",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789835979/ltv-ssrs/ch05-24-indicators.mp4",
        durationLabel: "2 min 22 s",
      }),
      L(25, "sparklines", "Sparklines", { contentDir: "ch05/25-sparklines",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789836107/ltv-ssrs/ch05-25-sparklines.mp4",
        durationLabel: "3 min 22 s",
      }),
    ],
  },
  {
    n: 6,
    title: "Drilldowns & Navigation",
    lessons: [
      L(26, "drilldown-reports", "Drilldown Reports", { contentDir: "ch06/26-drilldown-reports",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789836203/ltv-ssrs/ch06-26-drilldown-reports.mp4",
        durationLabel: "2 min 38 s",
      }),
      L(27, "drillthrough-reports", "Drillthrough Reports", { contentDir: "ch06/27-drillthrough-reports",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789836282/ltv-ssrs/ch06-27-drillthrough-reports.mp4",
        durationLabel: "2 min 6 s",
      }),
      L(28, "subreports", "Subreports", { contentDir: "ch06/28-subreports",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789836373/ltv-ssrs/ch06-28-subreports.mp4",
        durationLabel: "2 min 29 s",
      }),
      L(29, "bookmarks-and-document-maps", "Bookmarks & Document Maps", { contentDir: "ch06/29-bookmarks-and-document-maps",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789836456/ltv-ssrs/ch06-29-bookmarks-and-document-maps.mp4",
        durationLabel: "2 min 30 s",
      }),
    ],
  },
  {
    n: 7,
    title: "Subscriptions & Delivery",
    lessons: [
      L(30, "standard-subscriptions", "Standard Subscriptions", { contentDir: "ch07/30-standard-subscriptions",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789837256/ltv-ssrs/ch07-30-standard-subscriptions.mp4",
        durationLabel: "2 min 35 s",
      }),
      L(31, "data-driven-subscriptions", "Data-Driven Subscriptions", { contentDir: "ch07/31-data-driven-subscriptions",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789837345/ltv-ssrs/ch07-31-data-driven-subscriptions.mp4",
        durationLabel: "2 min 25 s",
      }),
      L(32, "delivery-to-email-and-file-share", "Delivery to Email & File Share", { contentDir: "ch07/32-delivery-to-email-and-file-share",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789837440/ltv-ssrs/ch07-32-delivery-to-email-and-file-share.mp4",
        durationLabel: "2 min 41 s",
      }),
      L(33, "subscription-scheduling", "Subscription Scheduling", { contentDir: "ch07/33-subscription-scheduling",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789836554/ltv-ssrs/ch07-33-subscription-scheduling.mp4",
        durationLabel: "2 min 47 s",
      }),
    ],
  },
  {
    n: 8,
    title: "Deployment & Administration",
    lessons: [
      L(34, "report-server-administration", "Report Server Administration", { contentDir: "ch08/34-report-server-administration",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789836629/ltv-ssrs/ch08-34-report-server-administration.mp4",
        durationLabel: "2 min 1 s",
      }),
      L(35, "security-and-role-assignments", "Security & Role Assignments", { contentDir: "ch08/35-security-and-role-assignments",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789836700/ltv-ssrs/ch08-35-security-and-role-assignments.mp4",
        durationLabel: "2 min 2 s",
      }),
      L(36, "report-caching-and-snapshots", "Report Caching & Snapshots", { contentDir: "ch08/36-report-caching-and-snapshots",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789836769/ltv-ssrs/ch08-36-report-caching-and-snapshots.mp4",
        durationLabel: "1 min 58 s",
      }),
      L(37, "performance-considerations", "Performance Considerations", { contentDir: "ch08/37-performance-considerations",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789836834/ltv-ssrs/ch08-37-performance-considerations.mp4",
        durationLabel: "1 min 52 s",
      }),
    ],
  },
  {
    n: 9,
    title: "Capstone",
    lessons: [
      L(38, "capstone-kickoff", "Capstone Kickoff", { contentDir: "ch09/38-capstone-kickoff",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789836908/ltv-ssrs/ch09-38-capstone-kickoff.mp4",
        durationLabel: "2 min 6 s",
      }),
      L(39, "capstone-building-a-report-suite", "Capstone: Building a Real Paginated Report Suite", { contentDir: "ch09/39-capstone-building-a-report-suite",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789836998/ltv-ssrs/ch09-39-capstone-building-a-report-suite.mp4",
        durationLabel: "2 min 39 s",
      }),
      L(40, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch09/40-capstone-wrap-up",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789837074/ltv-ssrs/ch09-40-capstone-wrap-up.mp4",
        durationLabel: "2 min 18 s",
      }),
    ],
  },
];
