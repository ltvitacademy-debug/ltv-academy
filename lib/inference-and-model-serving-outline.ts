// The Inference & Model Serving course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Fourth and final course of the AI Infrastructure / ML Systems
// Engineer destination. Assumes ML Infrastructure & Platform Engineering. The last
// mile — getting a trained model to actually answer requests fast and cheaply at
// scale, closing the destination with a deployed, benchmarked serving stack.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/inference-and-model-serving/
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

export const INFERENCE_AND_MODEL_SERVING_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Inference Fundamentals",
    lessons: [
      L(1, "latency-vs-throughput", "Latency vs. Throughput"),
      L(2, "the-inference-request-lifecycle", "The Inference Request Lifecycle"),
      L(3, "static-vs-dynamic-batching", "Static vs. Dynamic Batching"),
      L(4, "prefill-vs-decode-for-llms", "Prefill vs. Decode, for LLMs"),
      L(5, "measuring-inference-performance", "Measuring Inference Performance"),
    ],
  },
  {
    n: 2,
    title: "Serving Frameworks",
    lessons: [
      L(6, "why-dedicated-serving-frameworks-exist", "Why Dedicated Serving Frameworks Exist"),
      L(7, "vllm-overview", "vLLM, Overview"),
      L(8, "tensorrt-llm-overview", "TensorRT-LLM, Overview"),
      L(9, "triton-inference-server", "Triton Inference Server"),
      L(10, "choosing-a-serving-framework", "Choosing a Serving Framework"),
      L(11, "deploying-a-model-with-a-serving-framework", "Deploying a Model With a Serving Framework"),
    ],
  },
  {
    n: 3,
    title: "Model Optimization for Inference",
    lessons: [
      L(12, "quantization-for-inference-in-depth", "Quantization for Inference, in Depth"),
      L(13, "int8-and-int4-quantization", "INT8 & INT4 Quantization"),
      L(14, "pruning", "Pruning"),
      L(15, "knowledge-distillation", "Knowledge Distillation"),
      L(16, "measuring-the-quality-cost-tradeoff", "Measuring the Quality/Cost Trade-off"),
    ],
  },
  {
    n: 4,
    title: "KV Cache & LLM-Specific Serving Techniques",
    lessons: [
      L(17, "the-kv-cache-in-depth", "The KV Cache, in Depth"),
      L(18, "paged-attention", "Paged Attention"),
      L(19, "continuous-batching", "Continuous Batching"),
      L(20, "speculative-decoding", "Speculative Decoding"),
      L(21, "prompt-caching", "Prompt Caching"),
      L(22, "long-context-serving-challenges", "Long-Context Serving Challenges"),
    ],
  },
  {
    n: 5,
    title: "Scaling Inference",
    lessons: [
      L(23, "autoscaling-inference-services", "Autoscaling Inference Services"),
      L(24, "load-balancing-across-gpus", "Load Balancing Across GPUs"),
      L(25, "multi-model-serving", "Multi-Model Serving"),
      L(26, "model-routing-and-fallback-strategies", "Model Routing & Fallback Strategies"),
      L(27, "serving-at-the-edge-vs-centrally", "Serving at the Edge vs. Centrally"),
      L(28, "handling-traffic-spikes", "Handling Traffic Spikes"),
    ],
  },
  {
    n: 6,
    title: "Cost & Performance Tuning",
    lessons: [
      L(29, "cost-per-token-economics", "Cost-per-Token Economics"),
      L(30, "benchmarking-a-serving-stack", "Benchmarking a Serving Stack"),
      L(31, "setting-slos-for-inference", "Setting SLOs for Inference"),
      L(32, "capacity-planning-for-serving", "Capacity Planning for Serving"),
      L(33, "tradeoffs-between-cost-latency-and-quality", "Trade-offs Between Cost, Latency & Quality"),
    ],
  },
  {
    n: 7,
    title: "Capstone: Deploy and Benchmark a Serving Stack",
    lessons: [
      L(34, "capstone-kickoff-and-model-selection", "Capstone Kickoff & Model Selection"),
      L(35, "capstone-deploying-the-serving-stack", "Capstone: Deploying the Serving Stack"),
      L(36, "capstone-benchmarking-and-tuning", "Capstone: Benchmarking & Tuning"),
      L(37, "capstone-writeup-and-destination-wrap-up", "Capstone Write-Up & Destination Wrap-Up"),
    ],
  },
];
