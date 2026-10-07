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
      L(1, "latency-vs-throughput", "Latency vs. Throughput", { contentDir: "ch01/01-latency-vs-throughput" }),
      L(2, "the-inference-request-lifecycle", "The Inference Request Lifecycle", { contentDir: "ch01/02-the-inference-request-lifecycle" }),
      L(3, "static-vs-dynamic-batching", "Static vs. Dynamic Batching", { contentDir: "ch01/03-static-vs-dynamic-batching" }),
      L(4, "prefill-vs-decode-for-llms", "Prefill vs. Decode, for LLMs", { contentDir: "ch01/04-prefill-vs-decode-for-llms" }),
      L(5, "measuring-inference-performance", "Measuring Inference Performance", { contentDir: "ch01/05-measuring-inference-performance" }),
    ],
  },
  {
    n: 2,
    title: "Serving Frameworks",
    lessons: [
      L(6, "why-dedicated-serving-frameworks-exist", "Why Dedicated Serving Frameworks Exist", { contentDir: "ch02/06-why-dedicated-serving-frameworks-exist" }),
      L(7, "vllm-overview", "vLLM, Overview", { contentDir: "ch02/07-vllm-overview" }),
      L(8, "tensorrt-llm-overview", "TensorRT-LLM, Overview", { contentDir: "ch02/08-tensorrt-llm-overview" }),
      L(9, "triton-inference-server", "Triton Inference Server", { contentDir: "ch02/09-triton-inference-server" }),
      L(10, "choosing-a-serving-framework", "Choosing a Serving Framework", { contentDir: "ch02/10-choosing-a-serving-framework" }),
      L(11, "deploying-a-model-with-a-serving-framework", "Deploying a Model With a Serving Framework", { contentDir: "ch02/11-deploying-a-model-with-a-serving-framework" }),
    ],
  },
  {
    n: 3,
    title: "Model Optimization for Inference",
    lessons: [
      L(12, "quantization-for-inference-in-depth", "Quantization for Inference, in Depth", { contentDir: "ch03/12-quantization-for-inference-in-depth" }),
      L(13, "int8-and-int4-quantization", "INT8 & INT4 Quantization", { contentDir: "ch03/13-int8-and-int4-quantization" }),
      L(14, "pruning", "Pruning", { contentDir: "ch03/14-pruning" }),
      L(15, "knowledge-distillation", "Knowledge Distillation", { contentDir: "ch03/15-knowledge-distillation" }),
      L(16, "measuring-the-quality-cost-tradeoff", "Measuring the Quality/Cost Trade-off", { contentDir: "ch03/16-measuring-the-quality-cost-tradeoff" }),
    ],
  },
  {
    n: 4,
    title: "KV Cache & LLM-Specific Serving Techniques",
    lessons: [
      L(17, "the-kv-cache-in-depth", "The KV Cache, in Depth", { contentDir: "ch04/17-the-kv-cache-in-depth" }),
      L(18, "paged-attention", "Paged Attention", { contentDir: "ch04/18-paged-attention" }),
      L(19, "continuous-batching", "Continuous Batching", { contentDir: "ch04/19-continuous-batching" }),
      L(20, "speculative-decoding", "Speculative Decoding", { contentDir: "ch04/20-speculative-decoding" }),
      L(21, "prompt-caching", "Prompt Caching", { contentDir: "ch04/21-prompt-caching" }),
      L(22, "long-context-serving-challenges", "Long-Context Serving Challenges", { contentDir: "ch04/22-long-context-serving-challenges" }),
    ],
  },
  {
    n: 5,
    title: "Scaling Inference",
    lessons: [
      L(23, "autoscaling-inference-services", "Autoscaling Inference Services", { contentDir: "ch05/23-autoscaling-inference-services" }),
      L(24, "load-balancing-across-gpus", "Load Balancing Across GPUs", { contentDir: "ch05/24-load-balancing-across-gpus" }),
      L(25, "multi-model-serving", "Multi-Model Serving", { contentDir: "ch05/25-multi-model-serving" }),
      L(26, "model-routing-and-fallback-strategies", "Model Routing & Fallback Strategies", { contentDir: "ch05/26-model-routing-and-fallback-strategies" }),
      L(27, "serving-at-the-edge-vs-centrally", "Serving at the Edge vs. Centrally", { contentDir: "ch05/27-serving-at-the-edge-vs-centrally" }),
      L(28, "handling-traffic-spikes", "Handling Traffic Spikes", { contentDir: "ch05/28-handling-traffic-spikes" }),
    ],
  },
  {
    n: 6,
    title: "Cost & Performance Tuning",
    lessons: [
      L(29, "cost-per-token-economics", "Cost-per-Token Economics", { contentDir: "ch06/29-cost-per-token-economics" }),
      L(30, "benchmarking-a-serving-stack", "Benchmarking a Serving Stack", { contentDir: "ch06/30-benchmarking-a-serving-stack" }),
      L(31, "setting-slos-for-inference", "Setting SLOs for Inference", { contentDir: "ch06/31-setting-slos-for-inference" }),
      L(32, "capacity-planning-for-serving", "Capacity Planning for Serving", { contentDir: "ch06/32-capacity-planning-for-serving" }),
      L(33, "tradeoffs-between-cost-latency-and-quality", "Trade-offs Between Cost, Latency & Quality", { contentDir: "ch06/33-tradeoffs-between-cost-latency-and-quality" }),
    ],
  },
  {
    n: 7,
    title: "Capstone: Deploy and Benchmark a Serving Stack",
    lessons: [
      L(34, "capstone-kickoff-and-model-selection", "Capstone Kickoff & Model Selection", { contentDir: "ch07/34-capstone-kickoff-and-model-selection" }),
      L(35, "capstone-deploying-the-serving-stack", "Capstone: Deploying the Serving Stack", { contentDir: "ch07/35-capstone-deploying-the-serving-stack" }),
      L(36, "capstone-benchmarking-and-tuning", "Capstone: Benchmarking & Tuning", { contentDir: "ch07/36-capstone-benchmarking-and-tuning" }),
      L(37, "capstone-writeup-and-destination-wrap-up", "Capstone Write-Up & Destination Wrap-Up", { contentDir: "ch07/37-capstone-writeup-and-destination-wrap-up" }),
    ],
  },
];
