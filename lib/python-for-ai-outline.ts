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
      L(1, "why-python-for-ai", "Why Python for AI Engineering?"),
      L(2, "installing-python-and-environments", "Installing Python & Environments"),
      L(3, "variables-and-data-types", "Variables & Data Types"),
      L(4, "control-flow", "Control Flow: if, for & while"),
      L(5, "functions", "Functions"),
      L(6, "error-handling", "Error Handling: try/except"),
      L(7, "working-with-modules", "Working With Modules"),
    ],
  },
  {
    n: 2,
    title: "Data Structures for AI Work",
    lessons: [
      L(8, "lists-and-comprehensions", "Lists & List Comprehensions"),
      L(9, "dictionaries", "Dictionaries"),
      L(10, "sets-and-tuples", "Sets & Tuples"),
      L(11, "nested-json-like-structures", "Working With Nested, JSON-Like Structures"),
      L(12, "file-io", "File I/O"),
    ],
  },
  {
    n: 3,
    title: "Object-Oriented Python",
    lessons: [
      L(13, "classes-and-objects", "Classes & Objects"),
      L(14, "inheritance-basics", "Inheritance, Basics"),
      L(15, "dataclasses", "Dataclasses"),
      L(16, "why-oop-matters-for-ai-sdks", "Why OOP Matters for AI SDKs"),
      L(17, "a-class-based-client-wrapper", "Writing a Simple Class-Based Client Wrapper"),
    ],
  },
  {
    n: 4,
    title: "Virtual Environments & Package Management",
    lessons: [
      L(18, "venv-and-pip", "venv & pip"),
      L(19, "requirements-txt", "requirements.txt"),
      L(20, "dependency-conflicts", "Dependency Conflicts"),
      L(21, "popular-ai-libraries-overview", "Popular AI Libraries, Overview"),
    ],
  },
  {
    n: 5,
    title: "Working With APIs in Python",
    lessons: [
      L(22, "the-requests-library", "The requests Library"),
      L(23, "making-http-calls", "Making HTTP Calls"),
      L(24, "handling-responses-and-errors", "Handling Responses & Errors"),
      L(25, "authentication-headers-and-api-keys", "Authentication Headers & API Keys"),
      L(26, "rate-limiting-basics", "Rate Limiting, Basics"),
    ],
  },
  {
    n: 6,
    title: "Async Python for AI Workloads",
    lessons: [
      L(27, "why-async-matters-for-ai-calls", "Why Async Matters for AI Calls"),
      L(28, "async-await-basics", "async/await Basics"),
      L(29, "asyncio-fundamentals", "asyncio Fundamentals"),
      L(30, "calling-multiple-ai-apis-concurrently", "Calling Multiple AI APIs Concurrently"),
    ],
  },
  {
    n: 7,
    title: "Testing & Code Quality",
    lessons: [
      L(31, "writing-basic-unit-tests", "Writing Basic Unit Tests"),
      L(32, "type-hints", "Type Hints"),
      L(33, "linting-and-formatting-tools", "Linting & Formatting Tools"),
      L(34, "debugging-techniques", "Debugging Techniques"),
    ],
  },
  {
    n: 8,
    title: "Capstone",
    lessons: [
      L(35, "capstone-kickoff", "Capstone Kickoff"),
      L(36, "capstone-building-a-python-cli-that-calls-an-api", "Capstone: Building a Python CLI Tool That Calls an API"),
      L(37, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
