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
      L(1, "the-transformer-architecture", "The Transformer Architecture, Conceptually", { contentDir: "ch01/01-the-transformer-architecture" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792506007/ltv-generative-ai-llms/the-transformer-architecture.mp4", durationLabel: "2 min 5 s" }),
      L(2, "tokens-and-tokenization", "Tokens & Tokenization", { contentDir: "ch01/02-tokens-and-tokenization" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792506808/ltv-generative-ai-llms/tokens-and-tokenization.mp4", durationLabel: "1 min 55 s" }),
      L(3, "embeddings", "Embeddings", { contentDir: "ch01/03-embeddings" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792507500/ltv-generative-ai-llms/embeddings.mp4", durationLabel: "1 min 45 s" }),
      L(4, "next-token-prediction", "Next-Token Prediction", { contentDir: "ch01/04-next-token-prediction" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792508115/ltv-generative-ai-llms/next-token-prediction.mp4", durationLabel: "1 min 44 s" }),
      L(5, "context-windows", "Context Windows", { contentDir: "ch01/05-context-windows" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792508759/ltv-generative-ai-llms/context-windows.mp4", durationLabel: "1 min 39 s" }),
      L(6, "model-sizes-and-capability-tradeoffs", "Model Sizes & Capability Trade-offs", { contentDir: "ch01/06-model-sizes-and-capability-tradeoffs" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792509440/ltv-generative-ai-llms/model-sizes-and-capability-tradeoffs.mp4", durationLabel: "1 min 49 s" }),
      L(7, "why-llms-hallucinate", "Why LLMs Hallucinate", { contentDir: "ch01/07-why-llms-hallucinate" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792510121/ltv-generative-ai-llms/why-llms-hallucinate.mp4", durationLabel: "1 min 53 s" }),
    ],
  },
  {
    n: 2,
    title: "The LLM Landscape",
    lessons: [
      L(8, "major-model-providers-and-families", "Major Model Providers & Families", { contentDir: "ch02/08-major-model-providers-and-families" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792510877/ltv-generative-ai-llms/major-model-providers-and-families.mp4", durationLabel: "1 min 59 s" }),
      L(9, "open-source-vs-closed-models", "Open-Source vs. Closed Models", { contentDir: "ch02/09-open-source-vs-closed-models" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792511534/ltv-generative-ai-llms/open-source-vs-closed-models.mp4", durationLabel: "1 min 46 s" }),
      L(10, "choosing-a-model-for-a-task", "Choosing a Model for a Task", { contentDir: "ch02/10-choosing-a-model-for-a-task" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792512203/ltv-generative-ai-llms/choosing-a-model-for-a-task.mp4", durationLabel: "1 min 47 s" }),
      L(11, "cost-latency-quality-tradeoffs", "Cost, Latency & Quality Trade-offs", { contentDir: "ch02/11-cost-latency-quality-tradeoffs" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792512823/ltv-generative-ai-llms/cost-latency-quality-tradeoffs.mp4", durationLabel: "1 min 37 s" }),
      L(12, "model-versioning-and-deprecation", "Model Versioning & Deprecation", { contentDir: "ch02/12-model-versioning-and-deprecation" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792513549/ltv-generative-ai-llms/model-versioning-and-deprecation.mp4", durationLabel: "1 min 55 s" }),
    ],
  },
  {
    n: 3,
    title: "Working With LLM APIs",
    lessons: [
      L(13, "chat-completion-basics", "Chat Completion Basics", { contentDir: "ch03/13-chat-completion-basics" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792514482/ltv-generative-ai-llms/chat-completion-basics.mp4", durationLabel: "2 min 28 s" }),
      L(14, "system-user-assistant-roles", "System, User & Assistant Roles", { contentDir: "ch03/14-system-user-assistant-roles" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792515385/ltv-generative-ai-llms/system-user-assistant-roles.mp4", durationLabel: "2 min 12 s" }),
      L(15, "temperature-and-sampling-parameters", "Temperature & Sampling Parameters", { contentDir: "ch03/15-temperature-and-sampling-parameters" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792516381/ltv-generative-ai-llms/temperature-and-sampling-parameters.mp4", durationLabel: "2 min 25 s" }),
      L(16, "streaming-completions", "Streaming Completions", { contentDir: "ch03/16-streaming-completions" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792517333/ltv-generative-ai-llms/streaming-completions.mp4", durationLabel: "2 min 26 s" }),
      L(17, "function-tool-calling", "Function/Tool Calling", { contentDir: "ch03/17-function-tool-calling" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792518169/ltv-generative-ai-llms/function-tool-calling.mp4", durationLabel: "2 min 7 s" }),
      L(18, "structured-output-json-mode", "Structured Output: JSON Mode", { contentDir: "ch03/18-structured-output-json-mode" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792519093/ltv-generative-ai-llms/structured-output-json-mode.mp4", durationLabel: "2 min 13 s" }),
      L(19, "the-llm-api-request-lifecycle", "The LLM API Request Lifecycle, End to End", { contentDir: "ch03/19-the-llm-api-request-lifecycle" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792520117/ltv-generative-ai-llms/the-llm-api-request-lifecycle.mp4", durationLabel: "2 min 35 s" }),
    ],
  },
  {
    n: 4,
    title: "Fine-Tuning & Customization",
    lessons: [
      L(20, "when-to-fine-tune-vs-prompt", "When to Fine-Tune vs. Prompt", { contentDir: "ch04/20-when-to-fine-tune-vs-prompt" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792521080/ltv-generative-ai-llms/when-to-fine-tune-vs-prompt.mp4", durationLabel: "2 min 29 s" }),
      L(21, "fine-tuning-basics", "Fine-Tuning, Basics", { contentDir: "ch04/21-fine-tuning-basics" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792521970/ltv-generative-ai-llms/fine-tuning-basics.mp4", durationLabel: "2 min 6 s" }),
      L(22, "lora-and-parameter-efficient-tuning", "LoRA & Parameter-Efficient Tuning, Conceptually", { contentDir: "ch04/22-lora-and-parameter-efficient-tuning" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792522823/ltv-generative-ai-llms/lora-and-parameter-efficient-tuning.mp4", durationLabel: "2 min 15 s" }),
      L(23, "evaluating-a-fine-tuned-model", "Evaluating a Fine-Tuned Model", { contentDir: "ch04/23-evaluating-a-fine-tuned-model" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792523810/ltv-generative-ai-llms/evaluating-a-fine-tuned-model.mp4", durationLabel: "2 min 27 s" }),
      L(24, "the-real-cost-of-fine-tuning", "The Real Cost of Fine-Tuning", { contentDir: "ch04/24-the-real-cost-of-fine-tuning" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792531966/ltv-generative-ai-llms/the-real-cost-of-fine-tuning.mp4", durationLabel: "2 min 30 s" }),
    ],
  },
  {
    n: 5,
    title: "Multimodal & Beyond-Text Models",
    lessons: [
      L(25, "image-generation-models-overview", "Image Generation Models, Overview", { contentDir: "ch05/25-image-generation-models-overview" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792525436/ltv-generative-ai-llms/image-generation-models-overview.mp4", durationLabel: "2 min 32 s" }),
      L(26, "vision-language-models", "Vision-Language Models", { contentDir: "ch05/26-vision-language-models" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792526389/ltv-generative-ai-llms/vision-language-models.mp4", durationLabel: "2 min 28 s" }),
      L(27, "audio-and-speech-models-overview", "Audio & Speech Models, Overview", { contentDir: "ch05/27-audio-and-speech-models-overview" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792527398/ltv-generative-ai-llms/audio-and-speech-models-overview.mp4", durationLabel: "2 min 39 s" }),
      L(28, "choosing-multimodal-vs-text-only", "Choosing Multimodal vs. Text-Only", { contentDir: "ch05/28-choosing-multimodal-vs-text-only" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792528435/ltv-generative-ai-llms/choosing-multimodal-vs-text-only.mp4", durationLabel: "2 min 43 s" }),
    ],
  },
  {
    n: 6,
    title: "Capstone",
    lessons: [
      L(29, "capstone-kickoff", "Capstone Kickoff", { contentDir: "ch06/29-capstone-kickoff" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792529255/ltv-generative-ai-llms/capstone-kickoff.mp4", durationLabel: "2 min 10 s" }),
      L(30, "capstone-building-a-chat-application", "Capstone: Building a Simple Chat Application", { contentDir: "ch06/30-capstone-building-a-chat-application" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792530083/ltv-generative-ai-llms/capstone-building-a-chat-application.mp4", durationLabel: "2 min 7 s" }),
      L(31, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch06/31-capstone-wrap-up" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792530917/ltv-generative-ai-llms/capstone-wrap-up.mp4", durationLabel: "2 min 29 s" }),
    ],
  },
];
