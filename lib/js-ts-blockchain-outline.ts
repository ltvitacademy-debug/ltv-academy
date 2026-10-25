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
      L(1, "why-javascript-for-web3", "Why JavaScript for Web3?", {
        contentDir: "ch01/01-why-javascript-for-web3",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792408280/ltv-js-ts-blockchain/ch01-01-why-javascript-for-web3.mp4",
        durationLabel: "2 min 27 s",
      }),
      L(2, "setting-up-your-dev-environment", "Setting Up Your Dev Environment", {
        contentDir: "ch01/02-setting-up-your-dev-environment",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792408970/ltv-js-ts-blockchain/ch01-02-setting-up-your-dev-environment.mp4",
        durationLabel: "2 min 7 s",
      }),
      L(3, "variables-and-data-types", "Variables & Data Types", {
        contentDir: "ch01/03-variables-and-data-types",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409504/ltv-js-ts-blockchain/ch01-03-variables-and-data-types.mp4",
        durationLabel: "2 min 12 s",
      }),
      L(4, "control-flow", "Control Flow", {
        contentDir: "ch01/04-control-flow",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410000/ltv-js-ts-blockchain/ch01-04-control-flow.mp4",
        durationLabel: "1 min 59 s",
      }),
      L(5, "functions", "Functions", {
        contentDir: "ch01/05-functions",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410343/ltv-js-ts-blockchain/ch01-05-functions.mp4",
        durationLabel: "2 min 21 s",
      }),
      L(6, "arrays-and-objects", "Arrays & Objects", {
        contentDir: "ch01/06-arrays-and-objects",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410661/ltv-js-ts-blockchain/ch01-06-arrays-and-objects.mp4",
        durationLabel: "2 min 20 s",
      }),
      L(7, "console-and-debugging", "Working With the Console & Debugging", {
        contentDir: "ch01/07-console-and-debugging",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410939/ltv-js-ts-blockchain/ch01-07-console-and-debugging.mp4",
        durationLabel: "2 min 3 s",
      }),
    ],
  },
  {
    n: 2,
    title: "Modern JavaScript",
    lessons: [
      L(8, "es6-plus-syntax", "ES6+ Syntax", {
        contentDir: "ch02/08-es6-plus-syntax",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411242/ltv-js-ts-blockchain/ch02-08-es6-plus-syntax.mp4",
        durationLabel: "2 min 7 s",
      }),
      L(9, "arrow-functions-and-destructuring", "Arrow Functions & Destructuring", {
        contentDir: "ch02/09-arrow-functions-and-destructuring",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411555/ltv-js-ts-blockchain/ch02-09-arrow-functions-and-destructuring.mp4",
        durationLabel: "2 min 13 s",
      }),
      L(10, "template-literals", "Template Literals", {
        contentDir: "ch02/10-template-literals",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411875/ltv-js-ts-blockchain/ch02-10-template-literals.mp4",
        durationLabel: "2 min 17 s",
      }),
      L(11, "modules-import-export", "Modules: import & export", {
        contentDir: "ch02/11-modules-import-export",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412153/ltv-js-ts-blockchain/ch02-11-modules-import-export.mp4",
        durationLabel: "2 min 1 s",
      }),
      L(12, "array-methods", "Array Methods: map, filter & reduce", {
        contentDir: "ch02/12-array-methods",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412464/ltv-js-ts-blockchain/ch02-12-array-methods.mp4",
        durationLabel: "2 min 7 s",
      }),
      L(13, "spread-and-rest-operators", "Spread & Rest Operators", {
        contentDir: "ch02/13-spread-and-rest-operators",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412749/ltv-js-ts-blockchain/ch02-13-spread-and-rest-operators.mp4",
        durationLabel: "2 min 7 s",
      }),
    ],
  },
  {
    n: 3,
    title: "Asynchronous JavaScript",
    lessons: [
      L(14, "the-event-loop", "The Event Loop", {
        contentDir: "ch03/14-the-event-loop",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413049/ltv-js-ts-blockchain/ch03-14-the-event-loop.mp4",
        durationLabel: "2 min 15 s",
      }),
      L(15, "callbacks", "Callbacks", {
        contentDir: "ch03/15-callbacks",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413324/ltv-js-ts-blockchain/ch03-15-callbacks.mp4",
        durationLabel: "2 min 5 s",
      }),
      L(16, "promises", "Promises", {
        contentDir: "ch03/16-promises",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413636/ltv-js-ts-blockchain/ch03-16-promises.mp4",
        durationLabel: "2 min 25 s",
      }),
      L(17, "async-await", "async/await", {
        contentDir: "ch03/17-async-await",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413929/ltv-js-ts-blockchain/ch03-17-async-await.mp4",
        durationLabel: "2 min 19 s",
      }),
      L(18, "error-handling-in-async-code", "Error Handling in Async Code", {
        contentDir: "ch03/18-error-handling-in-async-code",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792414269/ltv-js-ts-blockchain/ch03-18-error-handling-in-async-code.mp4",
        durationLabel: "2 min 36 s",
      }),
      L(19, "fetching-data-from-an-api", "Fetching Data From an API", {
        contentDir: "ch03/19-fetching-data-from-an-api",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792414586/ltv-js-ts-blockchain/ch03-19-fetching-data-from-an-api.mp4",
        durationLabel: "2 min 31 s",
      }),
    ],
  },
  {
    n: 4,
    title: "TypeScript Fundamentals",
    lessons: [
      L(20, "why-typescript", "Why TypeScript?", {
        contentDir: "ch04/20-why-typescript",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792414910/ltv-js-ts-blockchain/ch04-20-why-typescript.mp4",
        durationLabel: "2 min 26 s",
      }),
      L(21, "basic-types", "Basic Types", {
        contentDir: "ch04/21-basic-types",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792415296/ltv-js-ts-blockchain/ch04-21-basic-types.mp4",
        durationLabel: "2 min 33 s",
      }),
      L(22, "interfaces-and-type-aliases", "Interfaces & Type Aliases", {
        contentDir: "ch04/22-interfaces-and-type-aliases",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792415776/ltv-js-ts-blockchain/ch04-22-interfaces-and-type-aliases.mp4",
        durationLabel: "2 min 19 s",
      }),
      L(23, "functions-with-types", "Functions With Types", {
        contentDir: "ch04/23-functions-with-types",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792416178/ltv-js-ts-blockchain/ch04-23-functions-with-types.mp4",
        durationLabel: "2 min 16 s",
      }),
      L(24, "generics-basics", "Generics, Basics", {
        contentDir: "ch04/24-generics-basics",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792416647/ltv-js-ts-blockchain/ch04-24-generics-basics.mp4",
        durationLabel: "2 min 38 s",
      }),
      L(25, "type-narrowing", "Type Narrowing", {
        contentDir: "ch04/25-type-narrowing",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792417129/ltv-js-ts-blockchain/ch04-25-type-narrowing.mp4",
        durationLabel: "2 min 30 s",
      }),
    ],
  },
  {
    n: 5,
    title: "TypeScript for Blockchain Development",
    lessons: [
      L(26, "typing-blockchain-data-structures", "Typing Blockchain Data Structures", {
        contentDir: "ch05/26-typing-blockchain-data-structures",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792417514/ltv-js-ts-blockchain/ch05-26-typing-blockchain-data-structures.mp4",
        durationLabel: "2 min 20 s",
      }),
      L(27, "ethers-and-viem-types", "Working With ethers.js/viem Types", {
        contentDir: "ch05/27-ethers-and-viem-types",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792417990/ltv-js-ts-blockchain/ch05-27-ethers-and-viem-types.mp4",
        durationLabel: "2 min 22 s",
      }),
      L(28, "type-safe-contract-interactions", "Type-Safe Contract Interactions", {
        contentDir: "ch05/28-type-safe-contract-interactions",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792418333/ltv-js-ts-blockchain/ch05-28-type-safe-contract-interactions.mp4",
        durationLabel: "2 min 9 s",
      }),
      L(29, "ts-project-configuration", "TS Project Configuration", {
        contentDir: "ch05/29-ts-project-configuration",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792418795/ltv-js-ts-blockchain/ch05-29-ts-project-configuration.mp4",
        durationLabel: "2 min 24 s",
      }),
      L(30, "common-ts-patterns-in-web3-repos", "Common TS Patterns in Web3 Repos", {
        contentDir: "ch05/30-common-ts-patterns-in-web3-repos",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792419165/ltv-js-ts-blockchain/ch05-30-common-ts-patterns-in-web3-repos.mp4",
        durationLabel: "2 min 19 s",
      }),
    ],
  },
  {
    n: 6,
    title: "Node.js Basics",
    lessons: [
      L(31, "what-is-node-js", "What Is Node.js?", {
        contentDir: "ch06/31-what-is-node-js",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792419476/ltv-js-ts-blockchain/ch06-31-what-is-node-js.mp4",
        durationLabel: "1 min 48 s",
      }),
      L(32, "npm-and-package-management", "npm & Package Management", {
        contentDir: "ch06/32-npm-and-package-management",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792419793/ltv-js-ts-blockchain/ch06-32-npm-and-package-management.mp4",
        durationLabel: "1 min 50 s",
      }),
      L(33, "building-a-simple-node-script", "Building a Simple Node Script", {
        contentDir: "ch06/33-building-a-simple-node-script",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792420184/ltv-js-ts-blockchain/ch06-33-building-a-simple-node-script.mp4",
        durationLabel: "1 min 50 s",
      }),
      L(34, "environment-variables-and-config", "Environment Variables & Config", {
        contentDir: "ch06/34-environment-variables-and-config",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792420553/ltv-js-ts-blockchain/ch06-34-environment-variables-and-config.mp4",
        durationLabel: "2 min 6 s",
      }),
      L(35, "file-system-basics", "File System Basics", {
        contentDir: "ch06/35-file-system-basics",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792420845/ltv-js-ts-blockchain/ch06-35-file-system-basics.mp4",
        durationLabel: "1 min 52 s",
      }),
      L(36, "a-simple-express-server", "A Simple Express Server", {
        contentDir: "ch06/36-a-simple-express-server",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792421123/ltv-js-ts-blockchain/ch06-36-a-simple-express-server.mp4",
        durationLabel: "1 min 47 s",
      }),
    ],
  },
  {
    n: 7,
    title: "Capstone",
    lessons: [
      L(37, "capstone-kickoff", "Capstone Kickoff", {
        contentDir: "ch07/37-capstone-kickoff",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792421418/ltv-js-ts-blockchain/ch07-37-capstone-kickoff.mp4",
        durationLabel: "1 min 41 s",
      }),
      L(38, "capstone-a-typed-node-script", "Capstone: A Typed Node/TS Script That Reads Blockchain Data", {
        contentDir: "ch07/38-capstone-a-typed-node-script",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792421826/ltv-js-ts-blockchain/ch07-38-capstone-a-typed-node-script.mp4",
        durationLabel: "1 min 56 s",
      }),
      L(39, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", {
        contentDir: "ch07/39-capstone-wrap-up",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792422071/ltv-js-ts-blockchain/ch07-39-capstone-wrap-up.mp4",
        durationLabel: "1 min 42 s",
      }),
    ],
  },
];
