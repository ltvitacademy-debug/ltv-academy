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
      L(1, "what-is-an-api", "What Is an API?", { contentDir: "ch01/01-what-is-an-api" }),
      L(2, "rest-fundamentals", "REST Fundamentals", { contentDir: "ch01/02-rest-fundamentals" }),
      L(3, "http-methods-and-status-codes", "HTTP Methods & Status Codes", { contentDir: "ch01/03-http-methods-and-status-codes" }),
      L(4, "request-response-anatomy", "Request/Response Anatomy", { contentDir: "ch01/04-request-response-anatomy" }),
      L(5, "reading-api-documentation", "Reading API Documentation", { contentDir: "ch01/05-reading-api-documentation" }),
    ],
  },
  {
    n: 2,
    title: "JSON Deep Dive",
    lessons: [
      L(6, "json-syntax-and-structure", "JSON Syntax & Structure", { contentDir: "ch02/06-json-syntax-and-structure" }),
      L(7, "nested-json", "Nested JSON", { contentDir: "ch02/07-nested-json" }),
      L(8, "json-schema-basics", "JSON Schema, Basics", { contentDir: "ch02/08-json-schema-basics" }),
      L(9, "parsing-and-validating-json", "Parsing & Validating JSON", { contentDir: "ch02/09-parsing-and-validating-json" }),
      L(10, "common-json-pitfalls", "Common JSON Pitfalls", { contentDir: "ch02/10-common-json-pitfalls" }),
    ],
  },
  {
    n: 3,
    title: "Working With AI Provider APIs",
    lessons: [
      L(11, "openai-style-api-structure", "OpenAI-Style API Structure", { contentDir: "ch03/11-openai-style-api-structure" }),
      L(12, "streaming-responses", "Streaming Responses", { contentDir: "ch03/12-streaming-responses" }),
      L(13, "function-tool-calling-schemas", "Function/Tool Calling Schemas", { contentDir: "ch03/13-function-tool-calling-schemas" }),
      L(14, "handling-api-errors-and-retries", "Handling API Errors & Retries", { contentDir: "ch03/14-handling-api-errors-and-retries" }),
      L(15, "pagination", "Pagination", { contentDir: "ch03/15-pagination" }),
      L(16, "webhooks-basics", "Webhooks, Basics", { contentDir: "ch03/16-webhooks-basics" }),
    ],
  },
  {
    n: 4,
    title: "Building a Simple API Wrapper",
    lessons: [
      L(17, "designing-a-client-class", "Designing a Client Class", { contentDir: "ch04/17-designing-a-client-class" }),
      L(18, "error-handling-and-retries", "Error Handling & Retries", { contentDir: "ch04/18-error-handling-and-retries" }),
      L(19, "rate-limiting-and-backoff", "Rate Limiting & Backoff", { contentDir: "ch04/19-rate-limiting-and-backoff" }),
      L(20, "testing-an-api-wrapper", "Testing an API Wrapper", { contentDir: "ch04/20-testing-an-api-wrapper" }),
    ],
  },
  {
    n: 5,
    title: "Capstone",
    lessons: [
      L(21, "capstone-project", "Capstone: A Reusable AI API Client", { contentDir: "ch05/21-capstone-project" }),
      L(22, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch05/22-capstone-wrap-up" }),
    ],
  },
];
