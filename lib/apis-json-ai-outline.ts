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
      L(1, "what-is-an-api", "What Is an API?", { contentDir: "ch01/01-what-is-an-api", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792518214/ltv-apis-json-ai/what-is-an-api.mp4", durationLabel: "1 min 23 s" }),
      L(2, "rest-fundamentals", "REST Fundamentals", { contentDir: "ch01/02-rest-fundamentals", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792518873/ltv-apis-json-ai/rest-fundamentals.mp4", durationLabel: "1 min 29 s" }),
      L(3, "http-methods-and-status-codes", "HTTP Methods & Status Codes", { contentDir: "ch01/03-http-methods-and-status-codes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792531044/ltv-apis-json-ai/http-methods-and-status-codes.mp4", durationLabel: "1 min 44 s" }),
      L(4, "request-response-anatomy", "Request/Response Anatomy", { contentDir: "ch01/04-request-response-anatomy", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792519942/ltv-apis-json-ai/request-response-anatomy.mp4", durationLabel: "1 min 42 s" }),
      L(5, "reading-api-documentation", "Reading API Documentation", { contentDir: "ch01/05-reading-api-documentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792531941/ltv-apis-json-ai/reading-api-documentation.mp4", durationLabel: "1 min 50 s" }),
    ],
  },
  {
    n: 2,
    title: "JSON Deep Dive",
    lessons: [
      L(6, "json-syntax-and-structure", "JSON Syntax & Structure", { contentDir: "ch02/06-json-syntax-and-structure", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792520705/ltv-apis-json-ai/json-syntax-and-structure.mp4", durationLabel: "1 min 23 s" }),
      L(7, "nested-json", "Nested JSON", { contentDir: "ch02/07-nested-json", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792521231/ltv-apis-json-ai/nested-json.mp4", durationLabel: "1 min 19 s" }),
      L(8, "json-schema-basics", "JSON Schema, Basics", { contentDir: "ch02/08-json-schema-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792521707/ltv-apis-json-ai/json-schema-basics.mp4", durationLabel: "1 min 12 s" }),
      L(9, "parsing-and-validating-json", "Parsing & Validating JSON", { contentDir: "ch02/09-parsing-and-validating-json", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792522248/ltv-apis-json-ai/parsing-and-validating-json.mp4", durationLabel: "1 min 31 s" }),
      L(10, "common-json-pitfalls", "Common JSON Pitfalls", { contentDir: "ch02/10-common-json-pitfalls", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792522843/ltv-apis-json-ai/common-json-pitfalls.mp4", durationLabel: "1 min 32 s" }),
    ],
  },
  {
    n: 3,
    title: "Working With AI Provider APIs",
    lessons: [
      L(11, "openai-style-api-structure", "OpenAI-Style API Structure", { contentDir: "ch03/11-openai-style-api-structure", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792523588/ltv-apis-json-ai/openai-style-api-structure.mp4", durationLabel: "1 min 52 s" }),
      L(12, "streaming-responses", "Streaming Responses", { contentDir: "ch03/12-streaming-responses", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792524362/ltv-apis-json-ai/streaming-responses.mp4", durationLabel: "1 min 59 s" }),
      L(13, "function-tool-calling-schemas", "Function/Tool Calling Schemas", { contentDir: "ch03/13-function-tool-calling-schemas", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792525074/ltv-apis-json-ai/function-tool-calling-schemas.mp4", durationLabel: "1 min 41 s" }),
      L(14, "handling-api-errors-and-retries", "Handling API Errors & Retries", { contentDir: "ch03/14-handling-api-errors-and-retries", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792525610/ltv-apis-json-ai/handling-api-errors-and-retries.mp4", durationLabel: "1 min 24 s" }),
      L(15, "pagination", "Pagination", { contentDir: "ch03/15-pagination", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792526161/ltv-apis-json-ai/pagination.mp4", durationLabel: "1 min 25 s" }),
      L(16, "webhooks-basics", "Webhooks, Basics", { contentDir: "ch03/16-webhooks-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792526733/ltv-apis-json-ai/webhooks-basics.mp4", durationLabel: "1 min 30 s" }),
    ],
  },
  {
    n: 4,
    title: "Building a Simple API Wrapper",
    lessons: [
      L(17, "designing-a-client-class", "Designing a Client Class", { contentDir: "ch04/17-designing-a-client-class", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792527263/ltv-apis-json-ai/designing-a-client-class.mp4", durationLabel: "1 min 14 s" }),
      L(18, "error-handling-and-retries", "Error Handling & Retries", { contentDir: "ch04/18-error-handling-and-retries", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792527722/ltv-apis-json-ai/error-handling-and-retries.mp4", durationLabel: "1 min 15 s" }),
      L(19, "rate-limiting-and-backoff", "Rate Limiting & Backoff", { contentDir: "ch04/19-rate-limiting-and-backoff", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792528251/ltv-apis-json-ai/rate-limiting-and-backoff.mp4", durationLabel: "1 min 23 s" }),
      L(20, "testing-an-api-wrapper", "Testing an API Wrapper", { contentDir: "ch04/20-testing-an-api-wrapper", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792528828/ltv-apis-json-ai/testing-an-api-wrapper.mp4", durationLabel: "1 min 25 s" }),
    ],
  },
  {
    n: 5,
    title: "Capstone",
    lessons: [
      L(21, "capstone-project", "Capstone: A Reusable AI API Client", { contentDir: "ch05/21-capstone-project", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792529436/ltv-apis-json-ai/capstone-project.mp4", durationLabel: "1 min 30 s" }),
      L(22, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch05/22-capstone-wrap-up", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792529949/ltv-apis-json-ai/capstone-wrap-up.mp4", durationLabel: "1 min 24 s" }),
    ],
  },
];
