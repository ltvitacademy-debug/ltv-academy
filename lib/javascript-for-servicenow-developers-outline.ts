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
      L(1, "variables-and-data-types", "Variables & Data Types", { contentDir: "ch01/01-variables-and-data-types" }),
      L(2, "operators-and-control-flow", "Operators & Control Flow", { contentDir: "ch01/02-operators-and-control-flow" }),
      L(3, "functions", "Functions", { contentDir: "ch01/03-functions" }),
      L(4, "arrays", "Arrays", { contentDir: "ch01/04-arrays" }),
      L(5, "objects", "Objects", { contentDir: "ch01/05-objects" }),
      L(6, "fundamentals-lab", "Fundamentals Lab", { contentDir: "ch01/06-fundamentals-lab" }),
    ],
  },
  {
    n: 2,
    title: "JavaScript for Server-Side Scripting",
    lessons: [
      L(7, "servicenows-server-side-javascript-engine", "ServiceNow's Server-Side JavaScript Engine", { contentDir: "ch02/07-servicenows-server-side-javascript-engine" }),
      L(8, "scope-and-the-this-keyword", "Scope & the this Keyword", { contentDir: "ch02/08-scope-and-the-this-keyword" }),
      L(9, "string-and-date-handling", "String & Date Handling", { contentDir: "ch02/09-string-and-date-handling" }),
      L(10, "json-parsing-and-serialization", "JSON Parsing & Serialization", { contentDir: "ch02/10-json-parsing-and-serialization" }),
      L(11, "server-side-javascript-lab", "Server-Side JavaScript Lab", { contentDir: "ch02/11-server-side-javascript-lab" }),
    ],
  },
  {
    n: 3,
    title: "GlideRecord",
    lessons: [
      L(12, "what-glide-record-actually-does", "What GlideRecord Actually Does", { contentDir: "ch03/12-what-glide-record-actually-does" }),
      L(13, "querying-with-gliderecord", "Querying With GlideRecord", { contentDir: "ch03/13-querying-with-gliderecord" }),
      L(14, "inserting-updating-and-deleting-records", "Inserting, Updating & Deleting Records", { contentDir: "ch03/14-inserting-updating-and-deleting-records" }),
      L(15, "encoded-queries-and-addquery-variants", "Encoded Queries & addQuery Variants", { contentDir: "ch03/15-encoded-queries-and-addquery-variants" }),
      L(16, "gliderecord-performance-pitfalls", "GlideRecord Performance Pitfalls", { contentDir: "ch03/16-gliderecord-performance-pitfalls" }),
      L(17, "gliderecord-lab", "GlideRecord Lab", { contentDir: "ch03/17-gliderecord-lab" }),
    ],
  },
  {
    n: 4,
    title: "GlideAjax & Client-Server Communication",
    lessons: [
      L(18, "why-client-scripts-need-a-bridge-to-the-server", "Why Client Scripts Need a Bridge to the Server", { contentDir: "ch04/18-why-client-scripts-need-a-bridge-to-the-server" }),
      L(19, "building-a-script-include-for-glideajax", "Building a Script Include for GlideAjax", { contentDir: "ch04/19-building-a-script-include-for-glideajax" }),
      L(20, "calling-glideajax-from-a-client-script", "Calling GlideAjax From a Client Script", { contentDir: "ch04/20-calling-glideajax-from-a-client-script" }),
      L(21, "glideajax-lab", "GlideAjax Lab", { contentDir: "ch04/21-glideajax-lab" }),
    ],
  },
  {
    n: 5,
    title: "Client-Side JavaScript on the Platform",
    lessons: [
      L(22, "the-glideform-api", "The GlideForm API (g_form)", { contentDir: "ch05/22-the-glideform-api" }),
      L(23, "client-side-validation-patterns", "Client-Side Validation Patterns", { contentDir: "ch05/23-client-side-validation-patterns" }),
      L(24, "asynchronous-client-scripts", "Asynchronous Client Scripts", { contentDir: "ch05/24-asynchronous-client-scripts" }),
      L(25, "client-side-lab", "Client-Side Lab", { contentDir: "ch05/25-client-side-lab" }),
    ],
  },
  {
    n: 6,
    title: "Debugging JavaScript on ServiceNow",
    lessons: [
      L(26, "the-script-debugger", "The Script Debugger", { contentDir: "ch06/26-the-script-debugger" }),
      L(27, "gs-log-and-gs-info-for-server-side-logging", "gs.log() & gs.info() for Server-Side Logging", { contentDir: "ch06/27-gs-log-and-gs-info-for-server-side-logging" }),
      L(28, "browser-devtools-for-client-script-debugging", "Browser DevTools for Client-Script Debugging", { contentDir: "ch06/28-browser-devtools-for-client-script-debugging" }),
      L(29, "debugging-lab", "Debugging Lab", { contentDir: "ch06/29-debugging-lab" }),
    ],
  },
  {
    n: 7,
    title: "Capstone: a Reusable Script Include Library",
    lessons: [
      L(30, "capstone-kickoff-define-reusable-utilities", "Capstone Kickoff: Define Reusable Utilities", { contentDir: "ch07/30-capstone-kickoff-define-reusable-utilities" }),
      L(31, "capstone-build-the-script-include-library", "Capstone: Build the Script Include Library", { contentDir: "ch07/31-capstone-build-the-script-include-library" }),
      L(32, "capstone-wrap-up-and-code-review", "Capstone Wrap-Up & Code Review", { contentDir: "ch07/32-capstone-wrap-up-and-code-review" }),
    ],
  },
];
