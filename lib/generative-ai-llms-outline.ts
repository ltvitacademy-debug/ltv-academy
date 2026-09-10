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
      L(1, "the-transformer-architecture", "The Transformer Architecture, Conceptually"),
      L(2, "tokens-and-tokenization", "Tokens & Tokenization"),
      L(3, "embeddings", "Embeddings"),
      L(4, "next-token-prediction", "Next-Token Prediction"),
      L(5, "context-windows", "Context Windows"),
      L(6, "model-sizes-and-capability-tradeoffs", "Model Sizes & Capability Trade-offs"),
      L(7, "why-llms-hallucinate", "Why LLMs Hallucinate"),
    ],
  },
  {
    n: 2,
    title: "The LLM Landscape",
    lessons: [
      L(8, "major-model-providers-and-families", "Major Model Providers & Families"),
      L(9, "open-source-vs-closed-models", "Open-Source vs. Closed Models"),
      L(10, "choosing-a-model-for-a-task", "Choosing a Model for a Task"),
      L(11, "cost-latency-quality-tradeoffs", "Cost, Latency & Quality Trade-offs"),
      L(12, "model-versioning-and-deprecation", "Model Versioning & Deprecation"),
    ],
  },
  {
    n: 3,
    title: "Working With LLM APIs",
    lessons: [
      L(13, "chat-completion-basics", "Chat Completion Basics"),
      L(14, "system-user-assistant-roles", "System, User & Assistant Roles"),
      L(15, "temperature-and-sampling-parameters", "Temperature & Sampling Parameters"),
      L(16, "streaming-completions", "Streaming Completions"),
      L(17, "function-tool-calling", "Function/Tool Calling"),
      L(18, "structured-output-json-mode", "Structured Output: JSON Mode"),
      L(19, "the-llm-api-request-lifecycle", "The LLM API Request Lifecycle, End to End"),
    ],
  },
  {
    n: 4,
    title: "Fine-Tuning & Customization",
    lessons: [
      L(20, "when-to-fine-tune-vs-prompt", "When to Fine-Tune vs. Prompt"),
      L(21, "fine-tuning-basics", "Fine-Tuning, Basics"),
      L(22, "lora-and-parameter-efficient-tuning", "LoRA & Parameter-Efficient Tuning, Conceptually"),
      L(23, "evaluating-a-fine-tuned-model", "Evaluating a Fine-Tuned Model"),
      L(24, "the-real-cost-of-fine-tuning", "The Real Cost of Fine-Tuning"),
    ],
  },
  {
    n: 5,
    title: "Multimodal & Beyond-Text Models",
    lessons: [
      L(25, "image-generation-models-overview", "Image Generation Models, Overview"),
      L(26, "vision-language-models", "Vision-Language Models"),
      L(27, "audio-and-speech-models-overview", "Audio & Speech Models, Overview"),
      L(28, "choosing-multimodal-vs-text-only", "Choosing Multimodal vs. Text-Only"),
    ],
  },
  {
    n: 6,
    title: "Capstone",
    lessons: [
      L(29, "capstone-kickoff", "Capstone Kickoff"),
      L(30, "capstone-building-a-chat-application", "Capstone: Building a Simple Chat Application"),
      L(31, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
