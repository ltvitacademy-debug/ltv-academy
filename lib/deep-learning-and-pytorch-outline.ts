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
      L(1, "tensors-and-tensor-operations", "Tensors & Tensor Operations", { contentDir: "ch01/01-tensors-and-tensor-operations" }),
      L(2, "autograd-and-computational-graphs", "Autograd & Computational Graphs", { contentDir: "ch01/02-autograd-and-computational-graphs" }),
      L(3, "devices-cpu-gpu-and-moving-data", "Devices: CPU, GPU & Moving Data", { contentDir: "ch01/03-devices-cpu-gpu-and-moving-data" }),
      L(4, "the-training-loop-from-scratch", "The Training Loop, From Scratch", { contentDir: "ch01/04-the-training-loop-from-scratch" }),
      L(5, "datasets-and-dataloaders", "Datasets & DataLoaders", { contentDir: "ch01/05-datasets-and-dataloaders" }),
      L(6, "saving-and-loading-models", "Saving & Loading Models", { contentDir: "ch01/06-saving-and-loading-models" }),
      L(7, "pytorch-debugging-basics", "PyTorch Debugging Basics", { contentDir: "ch01/07-pytorch-debugging-basics" }),
    ],
  },
  {
    n: 2,
    title: "Building Neural Networks",
    lessons: [
      L(8, "nn-module-and-parameters", "nn.Module & Parameters", { contentDir: "ch02/08-nn-module-and-parameters" }),
      L(9, "linear-layers-and-activation-functions", "Linear Layers & Activation Functions", { contentDir: "ch02/09-linear-layers-and-activation-functions" }),
      L(10, "loss-functions", "Loss Functions", { contentDir: "ch02/10-loss-functions" }),
      L(11, "optimizers-sgd-momentum-and-adam", "Optimizers: SGD, Momentum & Adam", { contentDir: "ch02/11-optimizers-sgd-momentum-and-adam" }),
      L(12, "building-a-multilayer-perceptron", "Building a Multilayer Perceptron", { contentDir: "ch02/12-building-a-multilayer-perceptron" }),
      L(13, "weight-initialization", "Weight Initialization", { contentDir: "ch02/13-weight-initialization" }),
      L(14, "custom-layers-and-modules", "Custom Layers & Modules", { contentDir: "ch02/14-custom-layers-and-modules" }),
    ],
  },
  {
    n: 3,
    title: "Training Deep Networks in Practice",
    lessons: [
      L(15, "batching-and-batch-size-effects", "Batching & Batch Size Effects", { contentDir: "ch03/15-batching-and-batch-size-effects" }),
      L(16, "regularization-weight-decay-and-dropout", "Regularization: Weight Decay & Dropout", { contentDir: "ch03/16-regularization-weight-decay-and-dropout" }),
      L(17, "batch-normalization-and-layer-normalization", "Batch Normalization & Layer Normalization", { contentDir: "ch03/17-batch-normalization-and-layer-normalization" }),
      L(18, "learning-rate-schedules", "Learning Rate Schedules", { contentDir: "ch03/18-learning-rate-schedules" }),
      L(19, "gradient-clipping", "Gradient Clipping", { contentDir: "ch03/19-gradient-clipping" }),
      L(20, "checkpointing-and-resuming-training", "Checkpointing & Resuming Training", { contentDir: "ch03/20-checkpointing-and-resuming-training" }),
      L(21, "early-stopping-and-validation-strategy", "Early Stopping & Validation Strategy", { contentDir: "ch03/21-early-stopping-and-validation-strategy" }),
      L(22, "hyperparameter-search-basics", "Hyperparameter Search, Basics", { contentDir: "ch03/22-hyperparameter-search-basics" }),
    ],
  },
  {
    n: 4,
    title: "Convolutional Networks & Vision Foundations",
    lessons: [
      L(23, "convolutions-conceptually", "Convolutions, Conceptually", { contentDir: "ch04/23-convolutions-conceptually" }),
      L(24, "building-a-cnn-in-pytorch", "Building a CNN in PyTorch", { contentDir: "ch04/24-building-a-cnn-in-pytorch" }),
      L(25, "pooling-and-feature-maps", "Pooling & Feature Maps", { contentDir: "ch04/25-pooling-and-feature-maps" }),
      L(26, "image-classification-end-to-end", "Image Classification, End to End", { contentDir: "ch04/26-image-classification-end-to-end" }),
      L(27, "transfer-learning-with-pretrained-vision-models", "Transfer Learning With Pretrained Vision Models", { contentDir: "ch04/27-transfer-learning-with-pretrained-vision-models" }),
      L(28, "data-augmentation", "Data Augmentation", { contentDir: "ch04/28-data-augmentation" }),
    ],
  },
  {
    n: 5,
    title: "Sequence Models & Attention",
    lessons: [
      L(29, "sequence-data-and-rnns", "Sequence Data & RNNs", { contentDir: "ch05/29-sequence-data-and-rnns" }),
      L(30, "lstms-and-the-vanishing-gradient-problem", "LSTMs & the Vanishing Gradient Problem", { contentDir: "ch05/30-lstms-and-the-vanishing-gradient-problem" }),
      L(31, "the-attention-mechanism", "The Attention Mechanism", { contentDir: "ch05/31-the-attention-mechanism" }),
      L(32, "self-attention-vs-cross-attention", "Self-Attention vs. Cross-Attention", { contentDir: "ch05/32-self-attention-vs-cross-attention" }),
      L(33, "multi-head-attention", "Multi-Head Attention", { contentDir: "ch05/33-multi-head-attention" }),
      L(34, "positional-encoding", "Positional Encoding", { contentDir: "ch05/34-positional-encoding" }),
      L(35, "why-transformers-replaced-rnns", "Why Transformers Replaced RNNs", { contentDir: "ch05/35-why-transformers-replaced-rnns" }),
      L(36, "attention-is-all-you-need-reading-the-paper", "\"Attention Is All You Need,\" Reading the Paper", { contentDir: "ch05/36-attention-is-all-you-need-reading-the-paper" }),
    ],
  },
  {
    n: 6,
    title: "Building a Transformer From Scratch",
    lessons: [
      L(37, "the-transformer-block", "The Transformer Block", { contentDir: "ch06/37-the-transformer-block" }),
      L(38, "feed-forward-sublayers", "Feed-Forward Sublayers", { contentDir: "ch06/38-feed-forward-sublayers" }),
      L(39, "residual-connections-and-layer-norm-placement", "Residual Connections & Layer-Norm Placement", { contentDir: "ch06/39-residual-connections-and-layer-norm-placement" }),
      L(40, "building-a-decoder-only-transformer", "Building a Decoder-Only Transformer", { contentDir: "ch06/40-building-a-decoder-only-transformer" }),
      L(41, "implementing-the-training-loop-for-a-tiny-gpt", "Implementing the Training Loop for a Tiny GPT", { contentDir: "ch06/41-implementing-the-training-loop-for-a-tiny-gpt" }),
      L(42, "sampling-strategies-greedy-top-k-top-p", "Sampling Strategies: Greedy, Top-K, Top-P", { contentDir: "ch06/42-sampling-strategies-greedy-top-k-top-p" }),
      L(43, "evaluating-a-tiny-language-model", "Evaluating a Tiny Language Model", { contentDir: "ch06/43-evaluating-a-tiny-language-model" }),
      L(44, "scaling-the-tiny-gpt-up", "Scaling the Tiny GPT Up", { contentDir: "ch06/44-scaling-the-tiny-gpt-up" }),
    ],
  },
  {
    n: 7,
    title: "Scaling Up: Mixed Precision & Multi-GPU Basics",
    lessons: [
      L(45, "floating-point-precision-fp32-fp16-bf16", "Floating-Point Precision: FP32, FP16, BF16", { contentDir: "ch07/45-floating-point-precision-fp32-fp16-bf16" }),
      L(46, "automatic-mixed-precision-training", "Automatic Mixed Precision Training", { contentDir: "ch07/46-automatic-mixed-precision-training" }),
      L(47, "gradient-accumulation", "Gradient Accumulation", { contentDir: "ch07/47-gradient-accumulation" }),
      L(48, "dataparallel-vs-distributeddataparallel", "DataParallel vs. DistributedDataParallel", { contentDir: "ch07/48-dataparallel-vs-distributeddataparallel" }),
      L(49, "torch-compile-and-graph-optimization", "torch.compile & Graph Optimization", { contentDir: "ch07/49-torch-compile-and-graph-optimization" }),
      L(50, "profiling-a-training-run", "Profiling a Training Run", { contentDir: "ch07/50-profiling-a-training-run" }),
    ],
  },
  {
    n: 8,
    title: "Debugging & Experiment Tracking",
    lessons: [
      L(51, "reading-loss-curves", "Reading Loss Curves", { contentDir: "ch08/51-reading-loss-curves" }),
      L(52, "vanishing-and-exploding-gradients-in-practice", "Vanishing & Exploding Gradients, in Practice", { contentDir: "ch08/52-vanishing-and-exploding-gradients-in-practice" }),
      L(53, "silent-bugs-in-training-code", "Silent Bugs in Training Code", { contentDir: "ch08/53-silent-bugs-in-training-code" }),
      L(54, "experiment-tracking-tools", "Experiment Tracking Tools", { contentDir: "ch08/54-experiment-tracking-tools" }),
      L(55, "reproducibility-seeds-and-determinism", "Reproducibility: Seeds & Determinism", { contentDir: "ch08/55-reproducibility-seeds-and-determinism" }),
      L(56, "comparing-runs-and-ablations", "Comparing Runs & Ablations", { contentDir: "ch08/56-comparing-runs-and-ablations" }),
    ],
  },
  {
    n: 9,
    title: "Capstone: Train and Evaluate a Small Transformer",
    lessons: [
      L(57, "capstone-kickoff-and-dataset-selection", "Capstone Kickoff & Dataset Selection", { contentDir: "ch09/57-capstone-kickoff-and-dataset-selection" }),
      L(58, "capstone-building-and-training-the-model", "Capstone: Building & Training the Model", { contentDir: "ch09/58-capstone-building-and-training-the-model" }),
      L(59, "capstone-evaluation-and-error-analysis", "Capstone: Evaluation & Error Analysis", { contentDir: "ch09/59-capstone-evaluation-and-error-analysis" }),
      L(60, "capstone-writeup-and-next-steps", "Capstone: Write-Up & Next Steps", { contentDir: "ch09/60-capstone-writeup-and-next-steps" }),
    ],
  },
];
