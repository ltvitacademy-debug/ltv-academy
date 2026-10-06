// The Deep Learning & PyTorch course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". First course of the AI/ML Research Engineer & Alignment Engineer
// destination. Assumes the AI Engineer path (Python, AI/ML Foundations, Generative AI
// & LLMs). Builds real PyTorch fluency and a from-scratch Transformer, the foundation
// the rest of the destination's courses build on.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/deep-learning-and-pytorch/
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

export const DEEP_LEARNING_AND_PYTORCH_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "PyTorch Fundamentals",
    lessons: [
      L(1, "tensors-and-tensor-operations", "Tensors & Tensor Operations"),
      L(2, "autograd-and-computational-graphs", "Autograd & Computational Graphs"),
      L(3, "devices-cpu-gpu-and-moving-data", "Devices: CPU, GPU & Moving Data"),
      L(4, "the-training-loop-from-scratch", "The Training Loop, From Scratch"),
      L(5, "datasets-and-dataloaders", "Datasets & DataLoaders"),
      L(6, "saving-and-loading-models", "Saving & Loading Models"),
      L(7, "pytorch-debugging-basics", "PyTorch Debugging Basics"),
    ],
  },
  {
    n: 2,
    title: "Building Neural Networks",
    lessons: [
      L(8, "nn-module-and-parameters", "nn.Module & Parameters"),
      L(9, "linear-layers-and-activation-functions", "Linear Layers & Activation Functions"),
      L(10, "loss-functions", "Loss Functions"),
      L(11, "optimizers-sgd-momentum-and-adam", "Optimizers: SGD, Momentum & Adam"),
      L(12, "building-a-multilayer-perceptron", "Building a Multilayer Perceptron"),
      L(13, "weight-initialization", "Weight Initialization"),
      L(14, "custom-layers-and-modules", "Custom Layers & Modules"),
    ],
  },
  {
    n: 3,
    title: "Training Deep Networks in Practice",
    lessons: [
      L(15, "batching-and-batch-size-effects", "Batching & Batch Size Effects"),
      L(16, "regularization-weight-decay-and-dropout", "Regularization: Weight Decay & Dropout"),
      L(17, "batch-normalization-and-layer-normalization", "Batch Normalization & Layer Normalization"),
      L(18, "learning-rate-schedules", "Learning Rate Schedules"),
      L(19, "gradient-clipping", "Gradient Clipping"),
      L(20, "checkpointing-and-resuming-training", "Checkpointing & Resuming Training"),
      L(21, "early-stopping-and-validation-strategy", "Early Stopping & Validation Strategy"),
      L(22, "hyperparameter-search-basics", "Hyperparameter Search, Basics"),
    ],
  },
  {
    n: 4,
    title: "Convolutional Networks & Vision Foundations",
    lessons: [
      L(23, "convolutions-conceptually", "Convolutions, Conceptually"),
      L(24, "building-a-cnn-in-pytorch", "Building a CNN in PyTorch"),
      L(25, "pooling-and-feature-maps", "Pooling & Feature Maps"),
      L(26, "image-classification-end-to-end", "Image Classification, End to End"),
      L(27, "transfer-learning-with-pretrained-vision-models", "Transfer Learning With Pretrained Vision Models"),
      L(28, "data-augmentation", "Data Augmentation"),
    ],
  },
  {
    n: 5,
    title: "Sequence Models & Attention",
    lessons: [
      L(29, "sequence-data-and-rnns", "Sequence Data & RNNs"),
      L(30, "lstms-and-the-vanishing-gradient-problem", "LSTMs & the Vanishing Gradient Problem"),
      L(31, "the-attention-mechanism", "The Attention Mechanism"),
      L(32, "self-attention-vs-cross-attention", "Self-Attention vs. Cross-Attention"),
      L(33, "multi-head-attention", "Multi-Head Attention"),
      L(34, "positional-encoding", "Positional Encoding"),
      L(35, "why-transformers-replaced-rnns", "Why Transformers Replaced RNNs"),
      L(36, "attention-is-all-you-need-reading-the-paper", "\"Attention Is All You Need,\" Reading the Paper"),
    ],
  },
  {
    n: 6,
    title: "Building a Transformer From Scratch",
    lessons: [
      L(37, "the-transformer-block", "The Transformer Block"),
      L(38, "feed-forward-sublayers", "Feed-Forward Sublayers"),
      L(39, "residual-connections-and-layer-norm-placement", "Residual Connections & Layer-Norm Placement"),
      L(40, "building-a-decoder-only-transformer", "Building a Decoder-Only Transformer"),
      L(41, "implementing-the-training-loop-for-a-tiny-gpt", "Implementing the Training Loop for a Tiny GPT"),
      L(42, "sampling-strategies-greedy-top-k-top-p", "Sampling Strategies: Greedy, Top-K, Top-P"),
      L(43, "evaluating-a-tiny-language-model", "Evaluating a Tiny Language Model"),
      L(44, "scaling-the-tiny-gpt-up", "Scaling the Tiny GPT Up"),
    ],
  },
  {
    n: 7,
    title: "Scaling Up: Mixed Precision & Multi-GPU Basics",
    lessons: [
      L(45, "floating-point-precision-fp32-fp16-bf16", "Floating-Point Precision: FP32, FP16, BF16"),
      L(46, "automatic-mixed-precision-training", "Automatic Mixed Precision Training"),
      L(47, "gradient-accumulation", "Gradient Accumulation"),
      L(48, "dataparallel-vs-distributeddataparallel", "DataParallel vs. DistributedDataParallel"),
      L(49, "torch-compile-and-graph-optimization", "torch.compile & Graph Optimization"),
      L(50, "profiling-a-training-run", "Profiling a Training Run"),
    ],
  },
  {
    n: 8,
    title: "Debugging & Experiment Tracking",
    lessons: [
      L(51, "reading-loss-curves", "Reading Loss Curves"),
      L(52, "vanishing-and-exploding-gradients-in-practice", "Vanishing & Exploding Gradients, in Practice"),
      L(53, "silent-bugs-in-training-code", "Silent Bugs in Training Code"),
      L(54, "experiment-tracking-tools", "Experiment Tracking Tools"),
      L(55, "reproducibility-seeds-and-determinism", "Reproducibility: Seeds & Determinism"),
      L(56, "comparing-runs-and-ablations", "Comparing Runs & Ablations"),
    ],
  },
  {
    n: 9,
    title: "Capstone: Train and Evaluate a Small Transformer",
    lessons: [
      L(57, "capstone-kickoff-and-dataset-selection", "Capstone Kickoff & Dataset Selection"),
      L(58, "capstone-building-and-training-the-model", "Capstone: Building & Training the Model"),
      L(59, "capstone-evaluation-and-error-analysis", "Capstone: Evaluation & Error Analysis"),
      L(60, "capstone-writeup-and-next-steps", "Capstone: Write-Up & Next Steps"),
    ],
  },
];
