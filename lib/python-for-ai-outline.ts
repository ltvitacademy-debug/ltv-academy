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
      L(1, "why-python-for-ai", "Why Python for AI Engineering?", { contentDir: "ch01/01-why-python-for-ai", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792621756/ltv-python-for-ai/why-python-for-ai.mp4", durationLabel: "1 min 18 s" }),
      L(2, "installing-python-and-environments", "Installing Python & Environments", { contentDir: "ch01/02-installing-python-and-environments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792621820/ltv-python-for-ai/installing-python-and-environments.mp4", durationLabel: "1 min 22 s" }),
      L(3, "variables-and-data-types", "Variables & Data Types", { contentDir: "ch01/03-variables-and-data-types", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792621867/ltv-python-for-ai/variables-and-data-types.mp4", durationLabel: "1 min 26 s" }),
      L(4, "control-flow", "Control Flow: if, for & while", { contentDir: "ch01/04-control-flow", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792621911/ltv-python-for-ai/control-flow.mp4", durationLabel: "1 min 13 s" }),
      L(5, "functions", "Functions", { contentDir: "ch01/05-functions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792621970/ltv-python-for-ai/functions.mp4", durationLabel: "1 min 10 s" }),
      L(6, "error-handling", "Error Handling: try/except", { contentDir: "ch01/06-error-handling", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792622012/ltv-python-for-ai/error-handling.mp4", durationLabel: "1 min 9 s" }),
      L(7, "working-with-modules", "Working With Modules", { contentDir: "ch01/07-working-with-modules", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792622064/ltv-python-for-ai/working-with-modules.mp4", durationLabel: "1 min 16 s" }),
    ],
  },
  {
    n: 2,
    title: "Data Structures for AI Work",
    lessons: [
      L(8, "lists-and-comprehensions", "Lists & List Comprehensions", { contentDir: "ch02/08-lists-and-comprehensions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792622104/ltv-python-for-ai/lists-and-comprehensions.mp4", durationLabel: "1 min 8 s" }),
      L(9, "dictionaries", "Dictionaries", { contentDir: "ch02/09-dictionaries", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792622145/ltv-python-for-ai/dictionaries.mp4", durationLabel: "1 min 13 s" }),
      L(10, "sets-and-tuples", "Sets & Tuples", { contentDir: "ch02/10-sets-and-tuples", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792622227/ltv-python-for-ai/sets-and-tuples.mp4", durationLabel: "1 min 10 s" }),
      L(11, "nested-json-like-structures", "Working With Nested, JSON-Like Structures", { contentDir: "ch02/11-nested-json-like-structures", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792622306/ltv-python-for-ai/nested-json-like-structures.mp4", durationLabel: "1 min 22 s" }),
      L(12, "file-io", "File I/O", { contentDir: "ch02/12-file-io", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792622386/ltv-python-for-ai/file-io.mp4", durationLabel: "1 min 16 s" }),
    ],
  },
  {
    n: 3,
    title: "Object-Oriented Python",
    lessons: [
      L(13, "classes-and-objects", "Classes & Objects", { contentDir: "ch03/13-classes-and-objects", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792622551/ltv-python-for-ai/classes-and-objects.mp4", durationLabel: "1 min 55 s" }),
      L(14, "inheritance-basics", "Inheritance, Basics", { contentDir: "ch03/14-inheritance-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792622709/ltv-python-for-ai/inheritance-basics.mp4", durationLabel: "1 min 46 s" }),
      L(15, "dataclasses", "Dataclasses", { contentDir: "ch03/15-dataclasses", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792622853/ltv-python-for-ai/dataclasses.mp4", durationLabel: "1 min 46 s" }),
      L(16, "why-oop-matters-for-ai-sdks", "Why OOP Matters for AI SDKs", { contentDir: "ch03/16-why-oop-matters-for-ai-sdks", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792623018/ltv-python-for-ai/why-oop-matters-for-ai-sdks.mp4", durationLabel: "1 min 51 s" }),
      L(17, "a-class-based-client-wrapper", "Writing a Simple Class-Based Client Wrapper", { contentDir: "ch03/17-a-class-based-client-wrapper", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792623170/ltv-python-for-ai/a-class-based-client-wrapper.mp4", durationLabel: "1 min 49 s" }),
    ],
  },
  {
    n: 4,
    title: "Virtual Environments & Package Management",
    lessons: [
      L(18, "venv-and-pip", "venv & pip", { contentDir: "ch04/18-venv-and-pip", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792623327/ltv-python-for-ai/venv-and-pip.mp4", durationLabel: "1 min 46 s" }),
      L(19, "requirements-txt", "requirements.txt", { contentDir: "ch04/19-requirements-txt", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792623453/ltv-python-for-ai/requirements-txt.mp4", durationLabel: "1 min 35 s" }),
      L(20, "dependency-conflicts", "Dependency Conflicts", { contentDir: "ch04/20-dependency-conflicts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792623603/ltv-python-for-ai/dependency-conflicts.mp4", durationLabel: "1 min 48 s" }),
      L(21, "popular-ai-libraries-overview", "Popular AI Libraries, Overview", { contentDir: "ch04/21-popular-ai-libraries-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792623768/ltv-python-for-ai/popular-ai-libraries-overview.mp4", durationLabel: "1 min 55 s" }),
    ],
  },
  {
    n: 5,
    title: "Working With APIs in Python",
    lessons: [
      L(22, "the-requests-library", "The requests Library", { contentDir: "ch05/22-the-requests-library", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792623907/ltv-python-for-ai/the-requests-library.mp4", durationLabel: "1 min 41 s" }),
      L(23, "making-http-calls", "Making HTTP Calls", { contentDir: "ch05/23-making-http-calls", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792624055/ltv-python-for-ai/making-http-calls.mp4", durationLabel: "1 min 42 s" }),
      L(24, "handling-responses-and-errors", "Handling Responses & Errors", { contentDir: "ch05/24-handling-responses-and-errors", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792624220/ltv-python-for-ai/handling-responses-and-errors.mp4", durationLabel: "1 min 48 s" }),
      L(25, "authentication-headers-and-api-keys", "Authentication Headers & API Keys", { contentDir: "ch05/25-authentication-headers-and-api-keys", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792624361/ltv-python-for-ai/authentication-headers-and-api-keys.mp4", durationLabel: "1 min 40 s" }),
      L(26, "rate-limiting-basics", "Rate Limiting, Basics", { contentDir: "ch05/26-rate-limiting-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792624507/ltv-python-for-ai/rate-limiting-basics.mp4", durationLabel: "1 min 45 s" }),
    ],
  },
  {
    n: 6,
    title: "Async Python for AI Workloads",
    lessons: [
      L(27, "why-async-matters-for-ai-calls", "Why Async Matters for AI Calls", { contentDir: "ch06/27-why-async-matters-for-ai-calls", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792624629/ltv-python-for-ai/why-async-matters-for-ai-calls.mp4", durationLabel: "1 min 28 s" }),
      L(28, "async-await-basics", "async/await Basics", { contentDir: "ch06/28-async-await-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792624763/ltv-python-for-ai/async-await-basics.mp4", durationLabel: "1 min 36 s" }),
      L(29, "asyncio-fundamentals", "asyncio Fundamentals", { contentDir: "ch06/29-asyncio-fundamentals", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792624910/ltv-python-for-ai/asyncio-fundamentals.mp4", durationLabel: "1 min 46 s" }),
      L(30, "calling-multiple-ai-apis-concurrently", "Calling Multiple AI APIs Concurrently", { contentDir: "ch06/30-calling-multiple-ai-apis-concurrently", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792625056/ltv-python-for-ai/calling-multiple-ai-apis-concurrently.mp4", durationLabel: "1 min 42 s" }),
    ],
  },
  {
    n: 7,
    title: "Testing & Code Quality",
    lessons: [
      L(31, "writing-basic-unit-tests", "Writing Basic Unit Tests", { contentDir: "ch07/31-writing-basic-unit-tests", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792625184/ltv-python-for-ai/writing-basic-unit-tests.mp4", durationLabel: "1 min 33 s" }),
      L(32, "type-hints", "Type Hints", { contentDir: "ch07/32-type-hints", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792625313/ltv-python-for-ai/type-hints.mp4", durationLabel: "1 min 40 s" }),
      L(33, "linting-and-formatting-tools", "Linting & Formatting Tools", { contentDir: "ch07/33-linting-and-formatting-tools", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792625443/ltv-python-for-ai/linting-and-formatting-tools.mp4", durationLabel: "1 min 35 s" }),
      L(34, "debugging-techniques", "Debugging Techniques", { contentDir: "ch07/34-debugging-techniques", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792625567/ltv-python-for-ai/debugging-techniques.mp4", durationLabel: "1 min 41 s" }),
    ],
  },
  {
    n: 8,
    title: "Capstone",
    lessons: [
      L(35, "capstone-kickoff", "Capstone Kickoff", { contentDir: "ch08/35-capstone-kickoff", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792625684/ltv-python-for-ai/capstone-kickoff.mp4", durationLabel: "1 min 27 s" }),
      L(36, "capstone-building-a-python-cli-that-calls-an-api", "Capstone: Building a Python CLI Tool That Calls an API", { contentDir: "ch08/36-capstone-building-a-python-cli-that-calls-an-api", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792625849/ltv-python-for-ai/capstone-building-a-python-cli-that-calls-an-api.mp4", durationLabel: "2 min 4 s" }),
      L(37, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch08/37-capstone-wrap-up", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792625968/ltv-python-for-ai/capstone-wrap-up.mp4", durationLabel: "1 min 32 s" }),
    ],
  },
];
