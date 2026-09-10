// The full APIs & JSON for AI Applications course outline. Only lessons
// with a contentDir + videoUrl are playable; everything else renders as
// "in production". Assumes Python for AI Engineering — this course goes
// deep on the actual interface every AI application is built around: REST
// APIs and JSON, including the specific shapes AI provider APIs use.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/apis-json-ai/
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

export const APIS_JSON_AI_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Understanding APIs",
    lessons: [
      L(1, "what-is-an-api", "What Is an API?"),
      L(2, "rest-fundamentals", "REST Fundamentals"),
      L(3, "http-methods-and-status-codes", "HTTP Methods & Status Codes"),
      L(4, "request-response-anatomy", "Request/Response Anatomy"),
      L(5, "reading-api-documentation", "Reading API Documentation"),
    ],
  },
  {
    n: 2,
    title: "JSON Deep Dive",
    lessons: [
      L(6, "json-syntax-and-structure", "JSON Syntax & Structure"),
      L(7, "nested-json", "Nested JSON"),
      L(8, "json-schema-basics", "JSON Schema, Basics"),
      L(9, "parsing-and-validating-json", "Parsing & Validating JSON"),
      L(10, "common-json-pitfalls", "Common JSON Pitfalls"),
    ],
  },
  {
    n: 3,
    title: "Working With AI Provider APIs",
    lessons: [
      L(11, "openai-style-api-structure", "OpenAI-Style API Structure"),
      L(12, "streaming-responses", "Streaming Responses"),
      L(13, "function-tool-calling-schemas", "Function/Tool Calling Schemas"),
      L(14, "handling-api-errors-and-retries", "Handling API Errors & Retries"),
      L(15, "pagination", "Pagination"),
      L(16, "webhooks-basics", "Webhooks, Basics"),
    ],
  },
  {
    n: 4,
    title: "Building a Simple API Wrapper",
    lessons: [
      L(17, "designing-a-client-class", "Designing a Client Class"),
      L(18, "error-handling-and-retries", "Error Handling & Retries"),
      L(19, "rate-limiting-and-backoff", "Rate Limiting & Backoff"),
      L(20, "testing-an-api-wrapper", "Testing an API Wrapper"),
    ],
  },
  {
    n: 5,
    title: "Capstone",
    lessons: [
      L(21, "capstone-project", "Capstone: A Reusable AI API Client"),
      L(22, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
