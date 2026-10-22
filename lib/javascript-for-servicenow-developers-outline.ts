// JavaScript for ServiceNow Developers course outline. Lessons without a contentDir render as
// "in production". Course 5 of 14 in the ServiceNow Administrator → Developer → Technical
// Architect path: the JavaScript (both server-side Rhino/GraalVM and client-side) that every
// scripting lesson from here forward assumes.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/javascript-for-servicenow-developers/
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

export const JAVASCRIPT_FOR_SERVICENOW_DEVELOPERS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "JavaScript Fundamentals",
    lessons: [
      L(1, "variables-and-data-types", "Variables & Data Types", { contentDir: "ch01/01-variables-and-data-types", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792709343/ltv-javascript-for-servicenow-developers/variables-and-data-types.mp4", durationLabel: "2 min 26 s" }),
      L(2, "operators-and-control-flow", "Operators & Control Flow", { contentDir: "ch01/02-operators-and-control-flow", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792709404/ltv-javascript-for-servicenow-developers/operators-and-control-flow.mp4", durationLabel: "2 min 20 s" }),
      L(3, "functions", "Functions", { contentDir: "ch01/03-functions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792709459/ltv-javascript-for-servicenow-developers/functions.mp4", durationLabel: "2 min 7 s" }),
      L(4, "arrays", "Arrays", { contentDir: "ch01/04-arrays", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792709514/ltv-javascript-for-servicenow-developers/arrays.mp4", durationLabel: "2 min 8 s" }),
      L(5, "objects", "Objects", { contentDir: "ch01/05-objects", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792709569/ltv-javascript-for-servicenow-developers/objects.mp4", durationLabel: "2 min 2 s" }),
      L(6, "fundamentals-lab", "Fundamentals Lab", { contentDir: "ch01/06-fundamentals-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792709620/ltv-javascript-for-servicenow-developers/fundamentals-lab.mp4", durationLabel: "1 min 57 s" }),
    ],
  },
  {
    n: 2,
    title: "JavaScript for Server-Side Scripting",
    lessons: [
      L(7, "servicenows-server-side-javascript-engine", "ServiceNow's Server-Side JavaScript Engine", { contentDir: "ch02/07-servicenows-server-side-javascript-engine", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792709682/ltv-javascript-for-servicenow-developers/servicenows-server-side-javascript-engine.mp4", durationLabel: "2 min 19 s" }),
      L(8, "scope-and-the-this-keyword", "Scope & the this Keyword", { contentDir: "ch02/08-scope-and-the-this-keyword", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792709737/ltv-javascript-for-servicenow-developers/scope-and-the-this-keyword.mp4", durationLabel: "2 min 5 s" }),
      L(9, "string-and-date-handling", "String & Date Handling", { contentDir: "ch02/09-string-and-date-handling", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792709794/ltv-javascript-for-servicenow-developers/string-and-date-handling.mp4", durationLabel: "2 min 11 s" }),
      L(10, "json-parsing-and-serialization", "JSON Parsing & Serialization", { contentDir: "ch02/10-json-parsing-and-serialization", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792709848/ltv-javascript-for-servicenow-developers/json-parsing-and-serialization.mp4", durationLabel: "2 min 3 s" }),
      L(11, "server-side-javascript-lab", "Server-Side JavaScript Lab", { contentDir: "ch02/11-server-side-javascript-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792709906/ltv-javascript-for-servicenow-developers/server-side-javascript-lab.mp4", durationLabel: "2 min 13 s" }),
    ],
  },
  {
    n: 3,
    title: "GlideRecord",
    lessons: [
      L(12, "what-glide-record-actually-does", "What GlideRecord Actually Does", { contentDir: "ch03/12-what-glide-record-actually-does", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792709966/ltv-javascript-for-servicenow-developers/what-glide-record-actually-does.mp4", durationLabel: "2 min 19 s" }),
      L(13, "querying-with-gliderecord", "Querying With GlideRecord", { contentDir: "ch03/13-querying-with-gliderecord", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792710027/ltv-javascript-for-servicenow-developers/querying-with-gliderecord.mp4", durationLabel: "2 min 21 s" }),
      L(14, "inserting-updating-and-deleting-records", "Inserting, Updating & Deleting Records", { contentDir: "ch03/14-inserting-updating-and-deleting-records", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792710091/ltv-javascript-for-servicenow-developers/inserting-updating-and-deleting-records.mp4", durationLabel: "2 min 26 s" }),
      L(15, "encoded-queries-and-addquery-variants", "Encoded Queries & addQuery Variants", { contentDir: "ch03/15-encoded-queries-and-addquery-variants", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792710152/ltv-javascript-for-servicenow-developers/encoded-queries-and-addquery-variants.mp4", durationLabel: "2 min 23 s" }),
      L(16, "gliderecord-performance-pitfalls", "GlideRecord Performance Pitfalls", { contentDir: "ch03/16-gliderecord-performance-pitfalls", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792710211/ltv-javascript-for-servicenow-developers/gliderecord-performance-pitfalls.mp4", durationLabel: "2 min 17 s" }),
      L(17, "gliderecord-lab", "GlideRecord Lab", { contentDir: "ch03/17-gliderecord-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792710273/ltv-javascript-for-servicenow-developers/gliderecord-lab.mp4", durationLabel: "2 min 25 s" }),
    ],
  },
  {
    n: 4,
    title: "GlideAjax & Client-Server Communication",
    lessons: [
      L(18, "why-client-scripts-need-a-bridge-to-the-server", "Why Client Scripts Need a Bridge to the Server", { contentDir: "ch04/18-why-client-scripts-need-a-bridge-to-the-server", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792710335/ltv-javascript-for-servicenow-developers/why-client-scripts-need-a-bridge-to-the-server.mp4", durationLabel: "2 min 22 s" }),
      L(19, "building-a-script-include-for-glideajax", "Building a Script Include for GlideAjax", { contentDir: "ch04/19-building-a-script-include-for-glideajax", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792710398/ltv-javascript-for-servicenow-developers/building-a-script-include-for-glideajax.mp4", durationLabel: "2 min 25 s" }),
      L(20, "calling-glideajax-from-a-client-script", "Calling GlideAjax From a Client Script", { contentDir: "ch04/20-calling-glideajax-from-a-client-script", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792710456/ltv-javascript-for-servicenow-developers/calling-glideajax-from-a-client-script.mp4", durationLabel: "2 min 8 s" }),
      L(21, "glideajax-lab", "GlideAjax Lab", { contentDir: "ch04/21-glideajax-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792710520/ltv-javascript-for-servicenow-developers/glideajax-lab.mp4", durationLabel: "2 min 25 s" }),
    ],
  },
  {
    n: 5,
    title: "Client-Side JavaScript on the Platform",
    lessons: [
      L(22, "the-glideform-api", "The GlideForm API (g_form)", { contentDir: "ch05/22-the-glideform-api", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792710590/ltv-javascript-for-servicenow-developers/the-glideform-api.mp4", durationLabel: "2 min 40 s" }),
      L(23, "client-side-validation-patterns", "Client-Side Validation Patterns", { contentDir: "ch05/23-client-side-validation-patterns", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792710651/ltv-javascript-for-servicenow-developers/client-side-validation-patterns.mp4", durationLabel: "2 min 20 s" }),
      L(24, "asynchronous-client-scripts", "Asynchronous Client Scripts", { contentDir: "ch05/24-asynchronous-client-scripts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792710710/ltv-javascript-for-servicenow-developers/asynchronous-client-scripts.mp4", durationLabel: "2 min 17 s" }),
      L(25, "client-side-lab", "Client-Side Lab", { contentDir: "ch05/25-client-side-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792710769/ltv-javascript-for-servicenow-developers/client-side-lab.mp4", durationLabel: "2 min 14 s" }),
    ],
  },
  {
    n: 6,
    title: "Debugging JavaScript on ServiceNow",
    lessons: [
      L(26, "the-script-debugger", "The Script Debugger", { contentDir: "ch06/26-the-script-debugger", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792710823/ltv-javascript-for-servicenow-developers/the-script-debugger.mp4", durationLabel: "2 min 6 s" }),
      L(27, "gs-log-and-gs-info-for-server-side-logging", "gs.log() & gs.info() for Server-Side Logging", { contentDir: "ch06/27-gs-log-and-gs-info-for-server-side-logging", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792710880/ltv-javascript-for-servicenow-developers/gs-log-and-gs-info-for-server-side-logging.mp4", durationLabel: "2 min 13 s" }),
      L(28, "browser-devtools-for-client-script-debugging", "Browser DevTools for Client-Script Debugging", { contentDir: "ch06/28-browser-devtools-for-client-script-debugging", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792710938/ltv-javascript-for-servicenow-developers/browser-devtools-for-client-script-debugging.mp4", durationLabel: "2 min 13 s" }),
      L(29, "debugging-lab", "Debugging Lab", { contentDir: "ch06/29-debugging-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792711004/ltv-javascript-for-servicenow-developers/debugging-lab.mp4", durationLabel: "2 min 23 s" }),
    ],
  },
  {
    n: 7,
    title: "Capstone: a Reusable Script Include Library",
    lessons: [
      L(30, "capstone-kickoff-define-reusable-utilities", "Capstone Kickoff: Define Reusable Utilities", { contentDir: "ch07/30-capstone-kickoff-define-reusable-utilities", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792711077/ltv-javascript-for-servicenow-developers/capstone-kickoff-define-reusable-utilities.mp4", durationLabel: "2 min 53 s" }),
      L(31, "capstone-build-the-script-include-library", "Capstone: Build the Script Include Library", { contentDir: "ch07/31-capstone-build-the-script-include-library", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792711153/ltv-javascript-for-servicenow-developers/capstone-build-the-script-include-library.mp4", durationLabel: "2 min 55 s" }),
      L(32, "capstone-wrap-up-and-code-review", "Capstone Wrap-Up & Code Review", { contentDir: "ch07/32-capstone-wrap-up-and-code-review", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792711229/ltv-javascript-for-servicenow-developers/capstone-wrap-up-and-code-review.mp4", durationLabel: "2 min 59 s" }),
    ],
  },
];
