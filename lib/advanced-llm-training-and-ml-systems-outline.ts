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
      L(1, "pretrain-sft-align-the-three-stage-pipeline", "Pretrain, SFT, Align: the Three-Stage Pipeline"),
      L(2, "compute-budgets-and-why-they-matter", "Compute Budgets & Why They Matter"),
      L(3, "the-data-pipeline-overview", "The Data Pipeline, Overview"),
      L(4, "model-families-and-architecture-choices-today", "Model Families & Architecture Choices Today"),
      L(5, "what-a-training-run-actually-costs", "What a Training Run Actually Costs"),
      L(6, "reading-a-model-technical-report", "Reading a Model Technical Report"),
    ],
  },
  {
    n: 2,
    title: "Tokenization & Data Pipelines at Scale",
    lessons: [
      L(7, "training-a-bpe-tokenizer", "Training a BPE Tokenizer"),
      L(8, "vocabulary-size-tradeoffs", "Vocabulary Size Trade-offs"),
      L(9, "data-curation-and-sourcing", "Data Curation & Sourcing"),
      L(10, "deduplication-at-scale", "Deduplication at Scale"),
      L(11, "quality-filtering-and-toxicity-filtering", "Quality Filtering & Toxicity Filtering"),
      L(12, "sequence-packing", "Sequence Packing"),
      L(13, "data-mixtures-and-domain-weighting", "Data Mixtures & Domain Weighting"),
    ],
  },
  {
    n: 3,
    title: "Pretraining Large Models",
    lessons: [
      L(14, "scaling-laws-conceptually", "Scaling Laws, Conceptually"),
      L(15, "the-chinchilla-tradeoff-params-vs-tokens", "The Chinchilla Trade-off: Params vs. Tokens"),
      L(16, "learning-rate-warmup-and-decay-at-scale", "Learning Rate Warmup & Decay at Scale"),
      L(17, "loss-spikes-and-training-instability", "Loss Spikes & Training Instability"),
      L(18, "monitoring-a-pretraining-run", "Monitoring a Pretraining Run"),
      L(19, "when-and-why-to-restart-a-run", "When & Why to Restart a Run"),
      L(20, "architecture-ablations-at-small-scale", "Architecture Ablations at Small Scale"),
    ],
  },
  {
    n: 4,
    title: "Supervised Fine-Tuning (SFT)",
    lessons: [
      L(21, "instruction-tuning-why-it-works", "Instruction Tuning: Why It Works"),
      L(22, "chat-templates-and-conversation-formatting", "Chat Templates & Conversation Formatting"),
      L(23, "building-an-sft-dataset", "Building an SFT Dataset"),
      L(24, "full-fine-tuning-vs-parameter-efficient-tuning", "Full Fine-Tuning vs. Parameter-Efficient Tuning"),
      L(25, "lora-in-depth", "LoRA, in Depth"),
      L(26, "qlora-and-quantized-fine-tuning", "QLoRA & Quantized Fine-Tuning"),
      L(27, "catastrophic-forgetting", "Catastrophic Forgetting"),
    ],
  },
  {
    n: 5,
    title: "Scaling Training: Parallelism Strategies",
    lessons: [
      L(28, "data-parallelism", "Data Parallelism"),
      L(29, "model-parallelism-tensor-and-pipeline", "Model Parallelism: Tensor & Pipeline"),
      L(30, "zero-and-fsdp-conceptually", "ZeRO & FSDP, Conceptually"),
      L(31, "activation-checkpointing", "Activation Checkpointing"),
      L(32, "choosing-a-parallelism-strategy", "Choosing a Parallelism Strategy"),
      L(33, "communication-overhead-and-its-costs", "Communication Overhead & Its Costs"),
      L(34, "putting-it-together-a-training-config-walkthrough", "Putting It Together: a Training Config Walkthrough"),
    ],
  },
  {
    n: 6,
    title: "ML Systems for Training",
    lessons: [
      L(35, "checkpointing-at-scale", "Checkpointing at Scale"),
      L(36, "fault-tolerance-for-long-training-runs", "Fault Tolerance for Long Training Runs"),
      L(37, "mixed-precision-at-scale", "Mixed Precision at Scale"),
      L(38, "straggler-nodes-and-synchronization", "Straggler Nodes & Synchronization"),
      L(39, "training-run-observability", "Training Run Observability"),
    ],
  },
  {
    n: 7,
    title: "Evaluating LLMs",
    lessons: [
      L(40, "held-out-loss-and-perplexity", "Held-Out Loss & Perplexity"),
      L(41, "standard-benchmarks-and-their-limits", "Standard Benchmarks & Their Limits"),
      L(42, "human-evaluation-design", "Human Evaluation Design"),
      L(43, "llm-as-judge-evaluation", "LLM-as-Judge Evaluation"),
      L(44, "benchmark-contamination", "Benchmark Contamination"),
      L(45, "building-a-task-specific-eval-set", "Building a Task-Specific Eval Set"),
    ],
  },
  {
    n: 8,
    title: "Efficient Inference Basics for Training Teams",
    lessons: [
      L(46, "why-training-teams-need-to-know-inference", "Why Training Teams Need to Know Inference"),
      L(47, "the-kv-cache-conceptually", "The KV Cache, Conceptually"),
      L(48, "quantization-for-inference-an-overview", "Quantization for Inference, an Overview"),
      L(49, "estimating-serving-cost-from-a-training-run", "Estimating Serving Cost From a Training Run"),
      L(50, "handing-a-model-off-to-a-serving-team", "Handing a Model Off to a Serving Team"),
    ],
  },
  {
    n: 9,
    title: "Capstone: Fine-Tune and Evaluate an Open-Weight Model",
    lessons: [
      L(51, "capstone-kickoff-and-model-selection", "Capstone Kickoff & Model Selection"),
      L(52, "capstone-building-the-sft-dataset", "Capstone: Building the SFT Dataset"),
      L(53, "capstone-running-the-fine-tune", "Capstone: Running the Fine-Tune"),
      L(54, "capstone-evaluation-against-a-baseline", "Capstone: Evaluation Against a Baseline"),
      L(55, "capstone-writeup-and-next-steps", "Capstone: Write-Up & Next Steps"),
    ],
  },
];
