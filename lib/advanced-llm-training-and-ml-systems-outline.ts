// The Advanced LLM Training & ML Systems course outline — FRAMEWORK ONLY (chapter and
// lesson titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Second course of the AI/ML Research Engineer & Alignment Engineer
// destination. Assumes Deep Learning & PyTorch and Generative AI & LLMs. Goes from a
// from-scratch tiny Transformer to how production-scale LLMs are actually pretrained,
// fine-tuned and evaluated.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/advanced-llm-training-and-ml-systems/
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

export const ADVANCED_LLM_TRAINING_AND_ML_SYSTEMS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "The Modern LLM Training Pipeline",
    lessons: [
      L(1, "pretrain-sft-align-the-three-stage-pipeline", "Pretrain, SFT, Align: the Three-Stage Pipeline", { contentDir: "ch01/01-pretrain-sft-align-the-three-stage-pipeline", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792507658/ltv-advanced-llm-training-and-ml-systems/pretrain-sft-align-the-three-stage-pipeline.mp4", durationLabel: "2 min 13 s" }),
      L(2, "compute-budgets-and-why-they-matter", "Compute Budgets & Why They Matter", { contentDir: "ch01/02-compute-budgets-and-why-they-matter", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792508347/ltv-advanced-llm-training-and-ml-systems/compute-budgets-and-why-they-matter.mp4", durationLabel: "1 min 53 s" }),
      L(3, "the-data-pipeline-overview", "The Data Pipeline, Overview", { contentDir: "ch01/03-the-data-pipeline-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792509103/ltv-advanced-llm-training-and-ml-systems/the-data-pipeline-overview.mp4", durationLabel: "1 min 59 s" }),
      L(4, "model-families-and-architecture-choices-today", "Model Families & Architecture Choices Today", { contentDir: "ch01/04-model-families-and-architecture-choices-today", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792509822/ltv-advanced-llm-training-and-ml-systems/model-families-and-architecture-choices-today.mp4", durationLabel: "2 min 2 s" }),
      L(5, "what-a-training-run-actually-costs", "What a Training Run Actually Costs", { contentDir: "ch01/05-what-a-training-run-actually-costs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792510549/ltv-advanced-llm-training-and-ml-systems/what-a-training-run-actually-costs.mp4", durationLabel: "1 min 57 s" }),
      L(6, "reading-a-model-technical-report", "Reading a Model Technical Report", { contentDir: "ch01/06-reading-a-model-technical-report", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792511321/ltv-advanced-llm-training-and-ml-systems/reading-a-model-technical-report.mp4", durationLabel: "2 min 0 s" }),
    ],
  },
  {
    n: 2,
    title: "Tokenization & Data Pipelines at Scale",
    lessons: [
      L(7, "training-a-bpe-tokenizer", "Training a BPE Tokenizer", { contentDir: "ch02/07-training-a-bpe-tokenizer", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792512024/ltv-advanced-llm-training-and-ml-systems/training-a-bpe-tokenizer.mp4", durationLabel: "1 min 58 s" }),
      L(8, "vocabulary-size-tradeoffs", "Vocabulary Size Trade-offs", { contentDir: "ch02/08-vocabulary-size-tradeoffs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792512771/ltv-advanced-llm-training-and-ml-systems/vocabulary-size-tradeoffs.mp4", durationLabel: "2 min 1 s" }),
      L(9, "data-curation-and-sourcing", "Data Curation & Sourcing", { contentDir: "ch02/09-data-curation-and-sourcing", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792513498/ltv-advanced-llm-training-and-ml-systems/data-curation-and-sourcing.mp4", durationLabel: "1 min 54 s" }),
      L(10, "deduplication-at-scale", "Deduplication at Scale", { contentDir: "ch02/10-deduplication-at-scale", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792514263/ltv-advanced-llm-training-and-ml-systems/deduplication-at-scale.mp4", durationLabel: "1 min 57 s" }),
      L(11, "quality-filtering-and-toxicity-filtering", "Quality Filtering & Toxicity Filtering", { contentDir: "ch02/11-quality-filtering-and-toxicity-filtering" }),
      L(12, "sequence-packing", "Sequence Packing", { contentDir: "ch02/12-sequence-packing", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792514998/ltv-advanced-llm-training-and-ml-systems/sequence-packing.mp4", durationLabel: "1 min 52 s" }),
      L(13, "data-mixtures-and-domain-weighting", "Data Mixtures & Domain Weighting", { contentDir: "ch02/13-data-mixtures-and-domain-weighting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792515872/ltv-advanced-llm-training-and-ml-systems/data-mixtures-and-domain-weighting.mp4", durationLabel: "2 min 7 s" }),
    ],
  },
  {
    n: 3,
    title: "Pretraining Large Models",
    lessons: [
      L(14, "scaling-laws-conceptually", "Scaling Laws, Conceptually", { contentDir: "ch03/14-scaling-laws-conceptually", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792516592/ltv-advanced-llm-training-and-ml-systems/scaling-laws-conceptually.mp4", durationLabel: "1 min 43 s" }),
      L(15, "the-chinchilla-tradeoff-params-vs-tokens", "The Chinchilla Trade-off: Params vs. Tokens", { contentDir: "ch03/15-the-chinchilla-tradeoff-params-vs-tokens", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792517326/ltv-advanced-llm-training-and-ml-systems/the-chinchilla-tradeoff-params-vs-tokens.mp4", durationLabel: "1 min 51 s" }),
      L(16, "learning-rate-warmup-and-decay-at-scale", "Learning Rate Warmup & Decay at Scale", { contentDir: "ch03/16-learning-rate-warmup-and-decay-at-scale", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792517998/ltv-advanced-llm-training-and-ml-systems/learning-rate-warmup-and-decay-at-scale.mp4", durationLabel: "1 min 44 s" }),
      L(17, "loss-spikes-and-training-instability", "Loss Spikes & Training Instability", { contentDir: "ch03/17-loss-spikes-and-training-instability", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792518831/ltv-advanced-llm-training-and-ml-systems/loss-spikes-and-training-instability.mp4", durationLabel: "1 min 42 s" }),
      L(18, "monitoring-a-pretraining-run", "Monitoring a Pretraining Run", { contentDir: "ch03/18-monitoring-a-pretraining-run", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792519964/ltv-advanced-llm-training-and-ml-systems/monitoring-a-pretraining-run.mp4", durationLabel: "1 min 47 s" }),
      L(19, "when-and-why-to-restart-a-run", "When & Why to Restart a Run", { contentDir: "ch03/19-when-and-why-to-restart-a-run", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792520701/ltv-advanced-llm-training-and-ml-systems/when-and-why-to-restart-a-run.mp4", durationLabel: "1 min 45 s" }),
      L(20, "architecture-ablations-at-small-scale", "Architecture Ablations at Small Scale", { contentDir: "ch03/20-architecture-ablations-at-small-scale", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792522028/ltv-advanced-llm-training-and-ml-systems/architecture-ablations-at-small-scale.mp4", durationLabel: "1 min 47 s" }),
    ],
  },
  {
    n: 4,
    title: "Supervised Fine-Tuning (SFT)",
    lessons: [
      L(21, "instruction-tuning-why-it-works", "Instruction Tuning: Why It Works", { contentDir: "ch04/21-instruction-tuning-why-it-works", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792522731/ltv-advanced-llm-training-and-ml-systems/instruction-tuning-why-it-works.mp4", durationLabel: "1 min 53 s" }),
      L(22, "chat-templates-and-conversation-formatting", "Chat Templates & Conversation Formatting", { contentDir: "ch04/22-chat-templates-and-conversation-formatting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792523494/ltv-advanced-llm-training-and-ml-systems/chat-templates-and-conversation-formatting.mp4", durationLabel: "1 min 53 s" }),
      L(23, "building-an-sft-dataset", "Building an SFT Dataset", { contentDir: "ch04/23-building-an-sft-dataset", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792524238/ltv-advanced-llm-training-and-ml-systems/building-an-sft-dataset.mp4", durationLabel: "1 min 54 s" }),
      L(24, "full-fine-tuning-vs-parameter-efficient-tuning", "Full Fine-Tuning vs. Parameter-Efficient Tuning", { contentDir: "ch04/24-full-fine-tuning-vs-parameter-efficient-tuning", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792524979/ltv-advanced-llm-training-and-ml-systems/full-fine-tuning-vs-parameter-efficient-tuning.mp4", durationLabel: "1 min 52 s" }),
      L(25, "lora-in-depth", "LoRA, in Depth", { contentDir: "ch04/25-lora-in-depth", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792525735/ltv-advanced-llm-training-and-ml-systems/lora-in-depth.mp4", durationLabel: "1 min 54 s" }),
      L(26, "qlora-and-quantized-fine-tuning", "QLoRA & Quantized Fine-Tuning", { contentDir: "ch04/26-qlora-and-quantized-fine-tuning", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792526474/ltv-advanced-llm-training-and-ml-systems/qlora-and-quantized-fine-tuning.mp4", durationLabel: "1 min 55 s" }),
      L(27, "catastrophic-forgetting", "Catastrophic Forgetting", { contentDir: "ch04/27-catastrophic-forgetting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792527171/ltv-advanced-llm-training-and-ml-systems/catastrophic-forgetting.mp4", durationLabel: "1 min 48 s" }),
    ],
  },
  {
    n: 5,
    title: "Scaling Training: Parallelism Strategies",
    lessons: [
      L(28, "data-parallelism", "Data Parallelism", { contentDir: "ch05/28-data-parallelism", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792527973/ltv-advanced-llm-training-and-ml-systems/data-parallelism.mp4", durationLabel: "2 min 3 s" }),
      L(29, "model-parallelism-tensor-and-pipeline", "Model Parallelism: Tensor & Pipeline", { contentDir: "ch05/29-model-parallelism-tensor-and-pipeline", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792528692/ltv-advanced-llm-training-and-ml-systems/model-parallelism-tensor-and-pipeline.mp4", durationLabel: "1 min 57 s" }),
      L(30, "zero-and-fsdp-conceptually", "ZeRO & FSDP, Conceptually", { contentDir: "ch05/30-zero-and-fsdp-conceptually", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792529491/ltv-advanced-llm-training-and-ml-systems/zero-and-fsdp-conceptually.mp4", durationLabel: "2 min 1 s" }),
      L(31, "activation-checkpointing", "Activation Checkpointing", { contentDir: "ch05/31-activation-checkpointing", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792530284/ltv-advanced-llm-training-and-ml-systems/activation-checkpointing.mp4", durationLabel: "2 min 4 s" }),
      L(32, "choosing-a-parallelism-strategy", "Choosing a Parallelism Strategy", { contentDir: "ch05/32-choosing-a-parallelism-strategy", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792531022/ltv-advanced-llm-training-and-ml-systems/choosing-a-parallelism-strategy.mp4", durationLabel: "2 min 6 s" }),
      L(33, "communication-overhead-and-its-costs", "Communication Overhead & Its Costs", { contentDir: "ch05/33-communication-overhead-and-its-costs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792531846/ltv-advanced-llm-training-and-ml-systems/communication-overhead-and-its-costs.mp4", durationLabel: "2 min 3 s" }),
      L(34, "putting-it-together-a-training-config-walkthrough", "Putting It Together: a Training Config Walkthrough", { contentDir: "ch05/34-putting-it-together-a-training-config-walkthrough", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792532601/ltv-advanced-llm-training-and-ml-systems/putting-it-together-a-training-config-walkthrough.mp4", durationLabel: "2 min 21 s" }),
    ],
  },
  {
    n: 6,
    title: "ML Systems for Training",
    lessons: [
      L(35, "checkpointing-at-scale", "Checkpointing at Scale", { contentDir: "ch06/35-checkpointing-at-scale", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533061/ltv-advanced-llm-training-and-ml-systems/checkpointing-at-scale.mp4", durationLabel: "2 min 4 s" }),
      L(36, "fault-tolerance-for-long-training-runs", "Fault Tolerance for Long Training Runs", { contentDir: "ch06/36-fault-tolerance-for-long-training-runs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533477/ltv-advanced-llm-training-and-ml-systems/fault-tolerance-for-long-training-runs.mp4", durationLabel: "2 min 2 s" }),
      L(37, "mixed-precision-at-scale", "Mixed Precision at Scale", { contentDir: "ch06/37-mixed-precision-at-scale", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533728/ltv-advanced-llm-training-and-ml-systems/mixed-precision-at-scale.mp4", durationLabel: "2 min 13 s" }),
      L(38, "straggler-nodes-and-synchronization", "Straggler Nodes & Synchronization", { contentDir: "ch06/38-straggler-nodes-and-synchronization", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533897/ltv-advanced-llm-training-and-ml-systems/straggler-nodes-and-synchronization.mp4", durationLabel: "2 min 1 s" }),
      L(39, "training-run-observability", "Training Run Observability", { contentDir: "ch06/39-training-run-observability", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534049/ltv-advanced-llm-training-and-ml-systems/training-run-observability.mp4", durationLabel: "2 min 4 s" }),
    ],
  },
  {
    n: 7,
    title: "Evaluating LLMs",
    lessons: [
      L(40, "held-out-loss-and-perplexity", "Held-Out Loss & Perplexity", { contentDir: "ch07/40-held-out-loss-and-perplexity", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534181/ltv-advanced-llm-training-and-ml-systems/held-out-loss-and-perplexity.mp4", durationLabel: "1 min 51 s" }),
      L(41, "standard-benchmarks-and-their-limits", "Standard Benchmarks & Their Limits", { contentDir: "ch07/41-standard-benchmarks-and-their-limits", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534320/ltv-advanced-llm-training-and-ml-systems/standard-benchmarks-and-their-limits.mp4", durationLabel: "1 min 57 s" }),
      L(42, "human-evaluation-design", "Human Evaluation Design", { contentDir: "ch07/42-human-evaluation-design", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534457/ltv-advanced-llm-training-and-ml-systems/human-evaluation-design.mp4", durationLabel: "2 min 4 s" }),
      L(43, "llm-as-judge-evaluation", "LLM-as-Judge Evaluation", { contentDir: "ch07/43-llm-as-judge-evaluation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534564/ltv-advanced-llm-training-and-ml-systems/llm-as-judge-evaluation.mp4", durationLabel: "2 min 4 s" }),
      L(44, "benchmark-contamination", "Benchmark Contamination", { contentDir: "ch07/44-benchmark-contamination", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534680/ltv-advanced-llm-training-and-ml-systems/benchmark-contamination.mp4", durationLabel: "2 min 6 s" }),
      L(45, "building-a-task-specific-eval-set", "Building a Task-Specific Eval Set", { contentDir: "ch07/45-building-a-task-specific-eval-set", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534799/ltv-advanced-llm-training-and-ml-systems/building-a-task-specific-eval-set.mp4", durationLabel: "2 min 12 s" }),
    ],
  },
  {
    n: 8,
    title: "Efficient Inference Basics for Training Teams",
    lessons: [
      L(46, "why-training-teams-need-to-know-inference", "Why Training Teams Need to Know Inference", { contentDir: "ch08/46-why-training-teams-need-to-know-inference", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534898/ltv-advanced-llm-training-and-ml-systems/why-training-teams-need-to-know-inference.mp4", durationLabel: "2 min 7 s" }),
      L(47, "the-kv-cache-conceptually", "The KV Cache, Conceptually", { contentDir: "ch08/47-the-kv-cache-conceptually", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535007/ltv-advanced-llm-training-and-ml-systems/the-kv-cache-conceptually.mp4", durationLabel: "2 min 3 s" }),
      L(48, "quantization-for-inference-an-overview", "Quantization for Inference, an Overview", { contentDir: "ch08/48-quantization-for-inference-an-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535123/ltv-advanced-llm-training-and-ml-systems/quantization-for-inference-an-overview.mp4", durationLabel: "2 min 10 s" }),
      L(49, "estimating-serving-cost-from-a-training-run", "Estimating Serving Cost From a Training Run", { contentDir: "ch08/49-estimating-serving-cost-from-a-training-run", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535239/ltv-advanced-llm-training-and-ml-systems/estimating-serving-cost-from-a-training-run.mp4", durationLabel: "1 min 55 s" }),
      L(50, "handing-a-model-off-to-a-serving-team", "Handing a Model Off to a Serving Team", { contentDir: "ch08/50-handing-a-model-off-to-a-serving-team", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535348/ltv-advanced-llm-training-and-ml-systems/handing-a-model-off-to-a-serving-team.mp4", durationLabel: "1 min 58 s" }),
    ],
  },
  {
    n: 9,
    title: "Capstone: Fine-Tune and Evaluate an Open-Weight Model",
    lessons: [
      L(51, "capstone-kickoff-and-model-selection", "Capstone Kickoff & Model Selection", { contentDir: "ch09/51-capstone-kickoff-and-model-selection", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535448/ltv-advanced-llm-training-and-ml-systems/capstone-kickoff-and-model-selection.mp4", durationLabel: "1 min 52 s" }),
      L(52, "capstone-building-the-sft-dataset", "Capstone: Building the SFT Dataset", { contentDir: "ch09/52-capstone-building-the-sft-dataset", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535547/ltv-advanced-llm-training-and-ml-systems/capstone-building-the-sft-dataset.mp4", durationLabel: "1 min 58 s" }),
      L(53, "capstone-running-the-fine-tune", "Capstone: Running the Fine-Tune", { contentDir: "ch09/53-capstone-running-the-fine-tune", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535649/ltv-advanced-llm-training-and-ml-systems/capstone-running-the-fine-tune.mp4", durationLabel: "1 min 58 s" }),
      L(54, "capstone-evaluation-against-a-baseline", "Capstone: Evaluation Against a Baseline", { contentDir: "ch09/54-capstone-evaluation-against-a-baseline", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535760/ltv-advanced-llm-training-and-ml-systems/capstone-evaluation-against-a-baseline.mp4", durationLabel: "1 min 56 s" }),
      L(55, "capstone-writeup-and-next-steps", "Capstone: Write-Up & Next Steps", { contentDir: "ch09/55-capstone-writeup-and-next-steps", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535878/ltv-advanced-llm-training-and-ml-systems/capstone-writeup-and-next-steps.mp4", durationLabel: "2 min 9 s" }),
    ],
  },
];
