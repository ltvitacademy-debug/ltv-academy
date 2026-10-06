// The full Python for AI Engineering course outline. Only lessons with a
// contentDir + videoUrl are playable; everything else renders as "in
// production". The entry point of the standalone AI Engineer path — no
// prior programming assumed, since this path is its own door into LTV,
// not an add-on to an existing program.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/python-for-ai/
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

export const PYTHON_FOR_AI_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Python Fundamentals",
    lessons: [
      L(1, "why-python-for-ai", "Why Python for AI Engineering?", { contentDir: "ch01/01-why-python-for-ai" }),
      L(2, "installing-python-and-environments", "Installing Python & Environments", { contentDir: "ch01/02-installing-python-and-environments" }),
      L(3, "variables-and-data-types", "Variables & Data Types", { contentDir: "ch01/03-variables-and-data-types" }),
      L(4, "control-flow", "Control Flow: if, for & while", { contentDir: "ch01/04-control-flow" }),
      L(5, "functions", "Functions", { contentDir: "ch01/05-functions" }),
      L(6, "error-handling", "Error Handling: try/except", { contentDir: "ch01/06-error-handling" }),
      L(7, "working-with-modules", "Working With Modules", { contentDir: "ch01/07-working-with-modules" }),
    ],
  },
  {
    n: 2,
    title: "Data Structures for AI Work",
    lessons: [
      L(8, "lists-and-comprehensions", "Lists & List Comprehensions", { contentDir: "ch02/08-lists-and-comprehensions" }),
      L(9, "dictionaries", "Dictionaries", { contentDir: "ch02/09-dictionaries" }),
      L(10, "sets-and-tuples", "Sets & Tuples", { contentDir: "ch02/10-sets-and-tuples" }),
      L(11, "nested-json-like-structures", "Working With Nested, JSON-Like Structures", { contentDir: "ch02/11-nested-json-like-structures" }),
      L(12, "file-io", "File I/O", { contentDir: "ch02/12-file-io" }),
    ],
  },
  {
    n: 3,
    title: "Object-Oriented Python",
    lessons: [
      L(13, "classes-and-objects", "Classes & Objects", { contentDir: "ch03/13-classes-and-objects" }),
      L(14, "inheritance-basics", "Inheritance, Basics", { contentDir: "ch03/14-inheritance-basics" }),
      L(15, "dataclasses", "Dataclasses", { contentDir: "ch03/15-dataclasses" }),
      L(16, "why-oop-matters-for-ai-sdks", "Why OOP Matters for AI SDKs", { contentDir: "ch03/16-why-oop-matters-for-ai-sdks" }),
      L(17, "a-class-based-client-wrapper", "Writing a Simple Class-Based Client Wrapper", { contentDir: "ch03/17-a-class-based-client-wrapper" }),
    ],
  },
  {
    n: 4,
    title: "Virtual Environments & Package Management",
    lessons: [
      L(18, "venv-and-pip", "venv & pip", { contentDir: "ch04/18-venv-and-pip" }),
      L(19, "requirements-txt", "requirements.txt", { contentDir: "ch04/19-requirements-txt" }),
      L(20, "dependency-conflicts", "Dependency Conflicts", { contentDir: "ch04/20-dependency-conflicts" }),
      L(21, "popular-ai-libraries-overview", "Popular AI Libraries, Overview", { contentDir: "ch04/21-popular-ai-libraries-overview" }),
    ],
  },
  {
    n: 5,
    title: "Working With APIs in Python",
    lessons: [
      L(22, "the-requests-library", "The requests Library", { contentDir: "ch05/22-the-requests-library" }),
      L(23, "making-http-calls", "Making HTTP Calls", { contentDir: "ch05/23-making-http-calls" }),
      L(24, "handling-responses-and-errors", "Handling Responses & Errors", { contentDir: "ch05/24-handling-responses-and-errors" }),
      L(25, "authentication-headers-and-api-keys", "Authentication Headers & API Keys", { contentDir: "ch05/25-authentication-headers-and-api-keys" }),
      L(26, "rate-limiting-basics", "Rate Limiting, Basics", { contentDir: "ch05/26-rate-limiting-basics" }),
    ],
  },
  {
    n: 6,
    title: "Async Python for AI Workloads",
    lessons: [
      L(27, "why-async-matters-for-ai-calls", "Why Async Matters for AI Calls", { contentDir: "ch06/27-why-async-matters-for-ai-calls" }),
      L(28, "async-await-basics", "async/await Basics", { contentDir: "ch06/28-async-await-basics" }),
      L(29, "asyncio-fundamentals", "asyncio Fundamentals", { contentDir: "ch06/29-asyncio-fundamentals" }),
      L(30, "calling-multiple-ai-apis-concurrently", "Calling Multiple AI APIs Concurrently", { contentDir: "ch06/30-calling-multiple-ai-apis-concurrently" }),
    ],
  },
  {
    n: 7,
    title: "Testing & Code Quality",
    lessons: [
      L(31, "writing-basic-unit-tests", "Writing Basic Unit Tests", { contentDir: "ch07/31-writing-basic-unit-tests" }),
      L(32, "type-hints", "Type Hints", { contentDir: "ch07/32-type-hints" }),
      L(33, "linting-and-formatting-tools", "Linting & Formatting Tools", { contentDir: "ch07/33-linting-and-formatting-tools" }),
      L(34, "debugging-techniques", "Debugging Techniques", { contentDir: "ch07/34-debugging-techniques" }),
    ],
  },
  {
    n: 8,
    title: "Capstone",
    lessons: [
      L(35, "capstone-kickoff", "Capstone Kickoff", { contentDir: "ch08/35-capstone-kickoff" }),
      L(36, "capstone-building-a-python-cli-that-calls-an-api", "Capstone: Building a Python CLI Tool That Calls an API", { contentDir: "ch08/36-capstone-building-a-python-cli-that-calls-an-api" }),
      L(37, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch08/37-capstone-wrap-up" }),
    ],
  },
];
