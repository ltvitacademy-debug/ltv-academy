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
      L(1, "pretrain-sft-align-the-three-stage-pipeline", "Pretrain, SFT, Align: the Three-Stage Pipeline", { contentDir: "ch01/01-pretrain-sft-align-the-three-stage-pipeline" }),
      L(2, "compute-budgets-and-why-they-matter", "Compute Budgets & Why They Matter", { contentDir: "ch01/02-compute-budgets-and-why-they-matter" }),
      L(3, "the-data-pipeline-overview", "The Data Pipeline, Overview", { contentDir: "ch01/03-the-data-pipeline-overview" }),
      L(4, "model-families-and-architecture-choices-today", "Model Families & Architecture Choices Today", { contentDir: "ch01/04-model-families-and-architecture-choices-today" }),
      L(5, "what-a-training-run-actually-costs", "What a Training Run Actually Costs", { contentDir: "ch01/05-what-a-training-run-actually-costs" }),
      L(6, "reading-a-model-technical-report", "Reading a Model Technical Report", { contentDir: "ch01/06-reading-a-model-technical-report" }),
    ],
  },
  {
    n: 2,
    title: "Tokenization & Data Pipelines at Scale",
    lessons: [
      L(7, "training-a-bpe-tokenizer", "Training a BPE Tokenizer", { contentDir: "ch02/07-training-a-bpe-tokenizer" }),
      L(8, "vocabulary-size-tradeoffs", "Vocabulary Size Trade-offs", { contentDir: "ch02/08-vocabulary-size-tradeoffs" }),
      L(9, "data-curation-and-sourcing", "Data Curation & Sourcing", { contentDir: "ch02/09-data-curation-and-sourcing" }),
      L(10, "deduplication-at-scale", "Deduplication at Scale", { contentDir: "ch02/10-deduplication-at-scale" }),
      L(11, "quality-filtering-and-toxicity-filtering", "Quality Filtering & Toxicity Filtering", { contentDir: "ch02/11-quality-filtering-and-toxicity-filtering" }),
      L(12, "sequence-packing", "Sequence Packing", { contentDir: "ch02/12-sequence-packing" }),
      L(13, "data-mixtures-and-domain-weighting", "Data Mixtures & Domain Weighting", { contentDir: "ch02/13-data-mixtures-and-domain-weighting" }),
    ],
  },
  {
    n: 3,
    title: "Pretraining Large Models",
    lessons: [
      L(14, "scaling-laws-conceptually", "Scaling Laws, Conceptually", { contentDir: "ch03/14-scaling-laws-conceptually" }),
      L(15, "the-chinchilla-tradeoff-params-vs-tokens", "The Chinchilla Trade-off: Params vs. Tokens", { contentDir: "ch03/15-the-chinchilla-tradeoff-params-vs-tokens" }),
      L(16, "learning-rate-warmup-and-decay-at-scale", "Learning Rate Warmup & Decay at Scale", { contentDir: "ch03/16-learning-rate-warmup-and-decay-at-scale" }),
      L(17, "loss-spikes-and-training-instability", "Loss Spikes & Training Instability", { contentDir: "ch03/17-loss-spikes-and-training-instability" }),
      L(18, "monitoring-a-pretraining-run", "Monitoring a Pretraining Run", { contentDir: "ch03/18-monitoring-a-pretraining-run" }),
      L(19, "when-and-why-to-restart-a-run", "When & Why to Restart a Run", { contentDir: "ch03/19-when-and-why-to-restart-a-run" }),
      L(20, "architecture-ablations-at-small-scale", "Architecture Ablations at Small Scale", { contentDir: "ch03/20-architecture-ablations-at-small-scale" }),
    ],
  },
  {
    n: 4,
    title: "Supervised Fine-Tuning (SFT)",
    lessons: [
      L(21, "instruction-tuning-why-it-works", "Instruction Tuning: Why It Works", { contentDir: "ch04/21-instruction-tuning-why-it-works" }),
      L(22, "chat-templates-and-conversation-formatting", "Chat Templates & Conversation Formatting", { contentDir: "ch04/22-chat-templates-and-conversation-formatting" }),
      L(23, "building-an-sft-dataset", "Building an SFT Dataset", { contentDir: "ch04/23-building-an-sft-dataset" }),
      L(24, "full-fine-tuning-vs-parameter-efficient-tuning", "Full Fine-Tuning vs. Parameter-Efficient Tuning", { contentDir: "ch04/24-full-fine-tuning-vs-parameter-efficient-tuning" }),
      L(25, "lora-in-depth", "LoRA, in Depth", { contentDir: "ch04/25-lora-in-depth" }),
      L(26, "qlora-and-quantized-fine-tuning", "QLoRA & Quantized Fine-Tuning", { contentDir: "ch04/26-qlora-and-quantized-fine-tuning" }),
      L(27, "catastrophic-forgetting", "Catastrophic Forgetting", { contentDir: "ch04/27-catastrophic-forgetting" }),
    ],
  },
  {
    n: 5,
    title: "Scaling Training: Parallelism Strategies",
    lessons: [
      L(28, "data-parallelism", "Data Parallelism", { contentDir: "ch05/28-data-parallelism" }),
      L(29, "model-parallelism-tensor-and-pipeline", "Model Parallelism: Tensor & Pipeline", { contentDir: "ch05/29-model-parallelism-tensor-and-pipeline" }),
      L(30, "zero-and-fsdp-conceptually", "ZeRO & FSDP, Conceptually", { contentDir: "ch05/30-zero-and-fsdp-conceptually" }),
      L(31, "activation-checkpointing", "Activation Checkpointing", { contentDir: "ch05/31-activation-checkpointing" }),
      L(32, "choosing-a-parallelism-strategy", "Choosing a Parallelism Strategy", { contentDir: "ch05/32-choosing-a-parallelism-strategy" }),
      L(33, "communication-overhead-and-its-costs", "Communication Overhead & Its Costs", { contentDir: "ch05/33-communication-overhead-and-its-costs" }),
      L(34, "putting-it-together-a-training-config-walkthrough", "Putting It Together: a Training Config Walkthrough", { contentDir: "ch05/34-putting-it-together-a-training-config-walkthrough" }),
    ],
  },
  {
    n: 6,
    title: "ML Systems for Training",
    lessons: [
      L(35, "checkpointing-at-scale", "Checkpointing at Scale", { contentDir: "ch06/35-checkpointing-at-scale" }),
      L(36, "fault-tolerance-for-long-training-runs", "Fault Tolerance for Long Training Runs", { contentDir: "ch06/36-fault-tolerance-for-long-training-runs" }),
      L(37, "mixed-precision-at-scale", "Mixed Precision at Scale", { contentDir: "ch06/37-mixed-precision-at-scale" }),
      L(38, "straggler-nodes-and-synchronization", "Straggler Nodes & Synchronization", { contentDir: "ch06/38-straggler-nodes-and-synchronization" }),
      L(39, "training-run-observability", "Training Run Observability", { contentDir: "ch06/39-training-run-observability" }),
    ],
  },
  {
    n: 7,
    title: "Evaluating LLMs",
    lessons: [
      L(40, "held-out-loss-and-perplexity", "Held-Out Loss & Perplexity", { contentDir: "ch07/40-held-out-loss-and-perplexity" }),
      L(41, "standard-benchmarks-and-their-limits", "Standard Benchmarks & Their Limits", { contentDir: "ch07/41-standard-benchmarks-and-their-limits" }),
      L(42, "human-evaluation-design", "Human Evaluation Design", { contentDir: "ch07/42-human-evaluation-design" }),
      L(43, "llm-as-judge-evaluation", "LLM-as-Judge Evaluation", { contentDir: "ch07/43-llm-as-judge-evaluation" }),
      L(44, "benchmark-contamination", "Benchmark Contamination", { contentDir: "ch07/44-benchmark-contamination" }),
      L(45, "building-a-task-specific-eval-set", "Building a Task-Specific Eval Set", { contentDir: "ch07/45-building-a-task-specific-eval-set" }),
    ],
  },
  {
    n: 8,
    title: "Efficient Inference Basics for Training Teams",
    lessons: [
      L(46, "why-training-teams-need-to-know-inference", "Why Training Teams Need to Know Inference", { contentDir: "ch08/46-why-training-teams-need-to-know-inference" }),
      L(47, "the-kv-cache-conceptually", "The KV Cache, Conceptually", { contentDir: "ch08/47-the-kv-cache-conceptually" }),
      L(48, "quantization-for-inference-an-overview", "Quantization for Inference, an Overview", { contentDir: "ch08/48-quantization-for-inference-an-overview" }),
      L(49, "estimating-serving-cost-from-a-training-run", "Estimating Serving Cost From a Training Run", { contentDir: "ch08/49-estimating-serving-cost-from-a-training-run" }),
      L(50, "handing-a-model-off-to-a-serving-team", "Handing a Model Off to a Serving Team", { contentDir: "ch08/50-handing-a-model-off-to-a-serving-team" }),
    ],
  },
  {
    n: 9,
    title: "Capstone: Fine-Tune and Evaluate an Open-Weight Model",
    lessons: [
      L(51, "capstone-kickoff-and-model-selection", "Capstone Kickoff & Model Selection", { contentDir: "ch09/51-capstone-kickoff-and-model-selection" }),
      L(52, "capstone-building-the-sft-dataset", "Capstone: Building the SFT Dataset", { contentDir: "ch09/52-capstone-building-the-sft-dataset" }),
      L(53, "capstone-running-the-fine-tune", "Capstone: Running the Fine-Tune", { contentDir: "ch09/53-capstone-running-the-fine-tune" }),
      L(54, "capstone-evaluation-against-a-baseline", "Capstone: Evaluation Against a Baseline", { contentDir: "ch09/54-capstone-evaluation-against-a-baseline" }),
      L(55, "capstone-writeup-and-next-steps", "Capstone: Write-Up & Next Steps", { contentDir: "ch09/55-capstone-writeup-and-next-steps" }),
    ],
  },
];
