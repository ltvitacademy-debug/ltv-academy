// The full Generative AI & LLMs course outline. Only lessons with a
// contentDir + videoUrl are playable; everything else renders as "in
// production". Assumes AI/ML Foundations — this course goes specifically
// into how large language models work, the current model landscape, and
// working with LLM APIs directly.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/generative-ai-llms/
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

export const GENERATIVE_AI_LLMS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "How LLMs Actually Work",
    lessons: [
      L(1, "the-transformer-architecture", "The Transformer Architecture, Conceptually", { contentDir: "ch01/01-the-transformer-architecture" }),
      L(2, "tokens-and-tokenization", "Tokens & Tokenization", { contentDir: "ch01/02-tokens-and-tokenization" }),
      L(3, "embeddings", "Embeddings", { contentDir: "ch01/03-embeddings" }),
      L(4, "next-token-prediction", "Next-Token Prediction", { contentDir: "ch01/04-next-token-prediction" }),
      L(5, "context-windows", "Context Windows", { contentDir: "ch01/05-context-windows" }),
      L(6, "model-sizes-and-capability-tradeoffs", "Model Sizes & Capability Trade-offs", { contentDir: "ch01/06-model-sizes-and-capability-tradeoffs" }),
      L(7, "why-llms-hallucinate", "Why LLMs Hallucinate", { contentDir: "ch01/07-why-llms-hallucinate" }),
    ],
  },
  {
    n: 2,
    title: "The LLM Landscape",
    lessons: [
      L(8, "major-model-providers-and-families", "Major Model Providers & Families", { contentDir: "ch02/08-major-model-providers-and-families" }),
      L(9, "open-source-vs-closed-models", "Open-Source vs. Closed Models", { contentDir: "ch02/09-open-source-vs-closed-models" }),
      L(10, "choosing-a-model-for-a-task", "Choosing a Model for a Task", { contentDir: "ch02/10-choosing-a-model-for-a-task" }),
      L(11, "cost-latency-quality-tradeoffs", "Cost, Latency & Quality Trade-offs", { contentDir: "ch02/11-cost-latency-quality-tradeoffs" }),
      L(12, "model-versioning-and-deprecation", "Model Versioning & Deprecation", { contentDir: "ch02/12-model-versioning-and-deprecation" }),
    ],
  },
  {
    n: 3,
    title: "Working With LLM APIs",
    lessons: [
      L(13, "chat-completion-basics", "Chat Completion Basics", { contentDir: "ch03/13-chat-completion-basics" }),
      L(14, "system-user-assistant-roles", "System, User & Assistant Roles", { contentDir: "ch03/14-system-user-assistant-roles" }),
      L(15, "temperature-and-sampling-parameters", "Temperature & Sampling Parameters", { contentDir: "ch03/15-temperature-and-sampling-parameters" }),
      L(16, "streaming-completions", "Streaming Completions", { contentDir: "ch03/16-streaming-completions" }),
      L(17, "function-tool-calling", "Function/Tool Calling", { contentDir: "ch03/17-function-tool-calling" }),
      L(18, "structured-output-json-mode", "Structured Output: JSON Mode", { contentDir: "ch03/18-structured-output-json-mode" }),
      L(19, "the-llm-api-request-lifecycle", "The LLM API Request Lifecycle, End to End", { contentDir: "ch03/19-the-llm-api-request-lifecycle" }),
    ],
  },
  {
    n: 4,
    title: "Fine-Tuning & Customization",
    lessons: [
      L(20, "when-to-fine-tune-vs-prompt", "When to Fine-Tune vs. Prompt", { contentDir: "ch04/20-when-to-fine-tune-vs-prompt" }),
      L(21, "fine-tuning-basics", "Fine-Tuning, Basics", { contentDir: "ch04/21-fine-tuning-basics" }),
      L(22, "lora-and-parameter-efficient-tuning", "LoRA & Parameter-Efficient Tuning, Conceptually", { contentDir: "ch04/22-lora-and-parameter-efficient-tuning" }),
      L(23, "evaluating-a-fine-tuned-model", "Evaluating a Fine-Tuned Model", { contentDir: "ch04/23-evaluating-a-fine-tuned-model" }),
      L(24, "the-real-cost-of-fine-tuning", "The Real Cost of Fine-Tuning", { contentDir: "ch04/24-the-real-cost-of-fine-tuning" }),
    ],
  },
  {
    n: 5,
    title: "Multimodal & Beyond-Text Models",
    lessons: [
      L(25, "image-generation-models-overview", "Image Generation Models, Overview", { contentDir: "ch05/25-image-generation-models-overview" }),
      L(26, "vision-language-models", "Vision-Language Models", { contentDir: "ch05/26-vision-language-models" }),
      L(27, "audio-and-speech-models-overview", "Audio & Speech Models, Overview", { contentDir: "ch05/27-audio-and-speech-models-overview" }),
      L(28, "choosing-multimodal-vs-text-only", "Choosing Multimodal vs. Text-Only", { contentDir: "ch05/28-choosing-multimodal-vs-text-only" }),
    ],
  },
  {
    n: 6,
    title: "Capstone",
    lessons: [
      L(29, "capstone-kickoff", "Capstone Kickoff", { contentDir: "ch06/29-capstone-kickoff" }),
      L(30, "capstone-building-a-chat-application", "Capstone: Building a Simple Chat Application", { contentDir: "ch06/30-capstone-building-a-chat-application" }),
      L(31, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch06/31-capstone-wrap-up" }),
    ],
  },
];
