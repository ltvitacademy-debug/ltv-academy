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
      L(1, "variables-and-data-types", "Variables & Data Types"),
      L(2, "operators-and-control-flow", "Operators & Control Flow"),
      L(3, "functions", "Functions"),
      L(4, "arrays", "Arrays"),
      L(5, "objects", "Objects"),
      L(6, "fundamentals-lab", "Fundamentals Lab"),
    ],
  },
  {
    n: 2,
    title: "JavaScript for Server-Side Scripting",
    lessons: [
      L(7, "servicenows-server-side-javascript-engine", "ServiceNow's Server-Side JavaScript Engine"),
      L(8, "scope-and-the-this-keyword", "Scope & the this Keyword"),
      L(9, "string-and-date-handling", "String & Date Handling"),
      L(10, "json-parsing-and-serialization", "JSON Parsing & Serialization"),
      L(11, "server-side-javascript-lab", "Server-Side JavaScript Lab"),
    ],
  },
  {
    n: 3,
    title: "GlideRecord",
    lessons: [
      L(12, "what-glide-record-actually-does", "What GlideRecord Actually Does"),
      L(13, "querying-with-gliderecord", "Querying With GlideRecord"),
      L(14, "inserting-updating-and-deleting-records", "Inserting, Updating & Deleting Records"),
      L(15, "encoded-queries-and-addquery-variants", "Encoded Queries & addQuery Variants"),
      L(16, "gliderecord-performance-pitfalls", "GlideRecord Performance Pitfalls"),
      L(17, "gliderecord-lab", "GlideRecord Lab"),
    ],
  },
  {
    n: 4,
    title: "GlideAjax & Client-Server Communication",
    lessons: [
      L(18, "why-client-scripts-need-a-bridge-to-the-server", "Why Client Scripts Need a Bridge to the Server"),
      L(19, "building-a-script-include-for-glideajax", "Building a Script Include for GlideAjax"),
      L(20, "calling-glideajax-from-a-client-script", "Calling GlideAjax From a Client Script"),
      L(21, "glideajax-lab", "GlideAjax Lab"),
    ],
  },
  {
    n: 5,
    title: "Client-Side JavaScript on the Platform",
    lessons: [
      L(22, "the-glideform-api", "The GlideForm API (g_form)"),
      L(23, "client-side-validation-patterns", "Client-Side Validation Patterns"),
      L(24, "asynchronous-client-scripts", "Asynchronous Client Scripts"),
      L(25, "client-side-lab", "Client-Side Lab"),
    ],
  },
  {
    n: 6,
    title: "Debugging JavaScript on ServiceNow",
    lessons: [
      L(26, "the-script-debugger", "The Script Debugger"),
      L(27, "gs-log-and-gs-info-for-server-side-logging", "gs.log() & gs.info() for Server-Side Logging"),
      L(28, "browser-devtools-for-client-script-debugging", "Browser DevTools for Client-Script Debugging"),
      L(29, "debugging-lab", "Debugging Lab"),
    ],
  },
  {
    n: 7,
    title: "Capstone: a Reusable Script Include Library",
    lessons: [
      L(30, "capstone-kickoff-define-reusable-utilities", "Capstone Kickoff: Define Reusable Utilities"),
      L(31, "capstone-build-the-script-include-library", "Capstone: Build the Script Include Library"),
      L(32, "capstone-wrap-up-and-code-review", "Capstone Wrap-Up & Code Review"),
    ],
  },
];
