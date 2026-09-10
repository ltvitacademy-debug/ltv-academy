// The full JavaScript & TypeScript for Blockchain Developers course
// outline. Only lessons with a contentDir + videoUrl are playable;
// everything else renders as "in production". The entry point of the
// standalone Blockchain Engineer path — teaches programming fundamentals
// through JavaScript (no prior course assumed), then TypeScript and
// Node.js, since this path is its own door into LTV.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/js-ts-blockchain/
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

export const JS_TS_BLOCKCHAIN_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Programming Fundamentals Through JavaScript",
    lessons: [
      L(1, "why-javascript-for-web3", "Why JavaScript for Web3?"),
      L(2, "setting-up-your-dev-environment", "Setting Up Your Dev Environment"),
      L(3, "variables-and-data-types", "Variables & Data Types"),
      L(4, "control-flow", "Control Flow"),
      L(5, "functions", "Functions"),
      L(6, "arrays-and-objects", "Arrays & Objects"),
      L(7, "console-and-debugging", "Working With the Console & Debugging"),
    ],
  },
  {
    n: 2,
    title: "Modern JavaScript",
    lessons: [
      L(8, "es6-plus-syntax", "ES6+ Syntax"),
      L(9, "arrow-functions-and-destructuring", "Arrow Functions & Destructuring"),
      L(10, "template-literals", "Template Literals"),
      L(11, "modules-import-export", "Modules: import & export"),
      L(12, "array-methods", "Array Methods: map, filter & reduce"),
      L(13, "spread-and-rest-operators", "Spread & Rest Operators"),
    ],
  },
  {
    n: 3,
    title: "Asynchronous JavaScript",
    lessons: [
      L(14, "the-event-loop", "The Event Loop"),
      L(15, "callbacks", "Callbacks"),
      L(16, "promises", "Promises"),
      L(17, "async-await", "async/await"),
      L(18, "error-handling-in-async-code", "Error Handling in Async Code"),
      L(19, "fetching-data-from-an-api", "Fetching Data From an API"),
    ],
  },
  {
    n: 4,
    title: "TypeScript Fundamentals",
    lessons: [
      L(20, "why-typescript", "Why TypeScript?"),
      L(21, "basic-types", "Basic Types"),
      L(22, "interfaces-and-type-aliases", "Interfaces & Type Aliases"),
      L(23, "functions-with-types", "Functions With Types"),
      L(24, "generics-basics", "Generics, Basics"),
      L(25, "type-narrowing", "Type Narrowing"),
    ],
  },
  {
    n: 5,
    title: "TypeScript for Blockchain Development",
    lessons: [
      L(26, "typing-blockchain-data-structures", "Typing Blockchain Data Structures"),
      L(27, "ethers-and-viem-types", "Working With ethers.js/viem Types"),
      L(28, "type-safe-contract-interactions", "Type-Safe Contract Interactions"),
      L(29, "ts-project-configuration", "TS Project Configuration"),
      L(30, "common-ts-patterns-in-web3-repos", "Common TS Patterns in Web3 Repos"),
    ],
  },
  {
    n: 6,
    title: "Node.js Basics",
    lessons: [
      L(31, "what-is-node-js", "What Is Node.js?"),
      L(32, "npm-and-package-management", "npm & Package Management"),
      L(33, "building-a-simple-node-script", "Building a Simple Node Script"),
      L(34, "environment-variables-and-config", "Environment Variables & Config"),
      L(35, "file-system-basics", "File System Basics"),
      L(36, "a-simple-express-server", "A Simple Express Server"),
    ],
  },
  {
    n: 7,
    title: "Capstone",
    lessons: [
      L(37, "capstone-kickoff", "Capstone Kickoff"),
      L(38, "capstone-a-typed-node-script", "Capstone: A Typed Node/TS Script That Reads Blockchain Data"),
      L(39, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
