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
      L(1, "tensors-and-tensor-operations", "Tensors & Tensor Operations", { contentDir: "ch01/01-tensors-and-tensor-operations" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792506635/ltv-deep-learning-and-pytorch/tensors-and-tensor-operations.mp4", durationLabel: "2 min 22 s" }),
      L(2, "autograd-and-computational-graphs", "Autograd & Computational Graphs", { contentDir: "ch01/02-autograd-and-computational-graphs" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792507647/ltv-deep-learning-and-pytorch/autograd-and-computational-graphs.mp4", durationLabel: "2 min 8 s" }),
      L(3, "devices-cpu-gpu-and-moving-data", "Devices: CPU, GPU & Moving Data", { contentDir: "ch01/03-devices-cpu-gpu-and-moving-data" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792508481/ltv-deep-learning-and-pytorch/devices-cpu-gpu-and-moving-data.mp4", durationLabel: "1 min 54 s" }),
      L(4, "the-training-loop-from-scratch", "The Training Loop, From Scratch", { contentDir: "ch01/04-the-training-loop-from-scratch" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792509286/ltv-deep-learning-and-pytorch/the-training-loop-from-scratch.mp4", durationLabel: "1 min 59 s" }),
      L(5, "datasets-and-dataloaders", "Datasets & DataLoaders", { contentDir: "ch01/05-datasets-and-dataloaders" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792510091/ltv-deep-learning-and-pytorch/datasets-and-dataloaders.mp4", durationLabel: "1 min 59 s" }),
      L(6, "saving-and-loading-models", "Saving & Loading Models", { contentDir: "ch01/06-saving-and-loading-models" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792510909/ltv-deep-learning-and-pytorch/saving-and-loading-models.mp4", durationLabel: "1 min 58 s" }),
      L(7, "pytorch-debugging-basics", "PyTorch Debugging Basics", { contentDir: "ch01/07-pytorch-debugging-basics" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792511647/ltv-deep-learning-and-pytorch/pytorch-debugging-basics.mp4", durationLabel: "1 min 55 s" }),
    ],
  },
  {
    n: 2,
    title: "Building Neural Networks",
    lessons: [
      L(8, "nn-module-and-parameters", "nn.Module & Parameters", { contentDir: "ch02/08-nn-module-and-parameters" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792512546/ltv-deep-learning-and-pytorch/nn-module-and-parameters.mp4", durationLabel: "2 min 19 s" }),
      L(9, "linear-layers-and-activation-functions", "Linear Layers & Activation Functions", { contentDir: "ch02/09-linear-layers-and-activation-functions" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792513361/ltv-deep-learning-and-pytorch/linear-layers-and-activation-functions.mp4", durationLabel: "2 min 12 s" }),
      L(10, "loss-functions", "Loss Functions", { contentDir: "ch02/10-loss-functions" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792514223/ltv-deep-learning-and-pytorch/loss-functions.mp4", durationLabel: "2 min 8 s" }),
      L(11, "optimizers-sgd-momentum-and-adam", "Optimizers: SGD, Momentum & Adam", { contentDir: "ch02/11-optimizers-sgd-momentum-and-adam" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792515088/ltv-deep-learning-and-pytorch/optimizers-sgd-momentum-and-adam.mp4", durationLabel: "2 min 9 s" }),
      L(12, "building-a-multilayer-perceptron", "Building a Multilayer Perceptron", { contentDir: "ch02/12-building-a-multilayer-perceptron" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792516011/ltv-deep-learning-and-pytorch/building-a-multilayer-perceptron.mp4", durationLabel: "2 min 8 s" }),
      L(13, "weight-initialization", "Weight Initialization", { contentDir: "ch02/13-weight-initialization" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792516849/ltv-deep-learning-and-pytorch/weight-initialization.mp4", durationLabel: "2 min 2 s" }),
      L(14, "custom-layers-and-modules", "Custom Layers & Modules", { contentDir: "ch02/14-custom-layers-and-modules" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792517712/ltv-deep-learning-and-pytorch/custom-layers-and-modules.mp4", durationLabel: "2 min 10 s" }),
    ],
  },
  {
    n: 3,
    title: "Training Deep Networks in Practice",
    lessons: [
      L(15, "batching-and-batch-size-effects", "Batching & Batch Size Effects", { contentDir: "ch03/15-batching-and-batch-size-effects" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792518341/ltv-deep-learning-and-pytorch/batching-and-batch-size-effects.mp4", durationLabel: "1 min 30 s" }),
      L(16, "regularization-weight-decay-and-dropout", "Regularization: Weight Decay & Dropout", { contentDir: "ch03/16-regularization-weight-decay-and-dropout" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792519048/ltv-deep-learning-and-pytorch/regularization-weight-decay-and-dropout.mp4", durationLabel: "1 min 36 s" }),
      L(17, "batch-normalization-and-layer-normalization", "Batch Normalization & Layer Normalization", { contentDir: "ch03/17-batch-normalization-and-layer-normalization" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792599521/ltv-deep-learning-and-pytorch/batch-normalization-and-layer-normalization.mp4", durationLabel: "1 min 31 s" }),
      L(18, "learning-rate-schedules", "Learning Rate Schedules", { contentDir: "ch03/18-learning-rate-schedules" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792520126/ltv-deep-learning-and-pytorch/learning-rate-schedules.mp4", durationLabel: "1 min 30 s" }),
      L(19, "gradient-clipping", "Gradient Clipping", { contentDir: "ch03/19-gradient-clipping" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792520858/ltv-deep-learning-and-pytorch/gradient-clipping.mp4", durationLabel: "1 min 42 s" }),
      L(20, "checkpointing-and-resuming-training", "Checkpointing & Resuming Training", { contentDir: "ch03/20-checkpointing-and-resuming-training" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792521549/ltv-deep-learning-and-pytorch/checkpointing-and-resuming-training.mp4", durationLabel: "1 min 43 s" }),
      L(21, "early-stopping-and-validation-strategy", "Early Stopping & Validation Strategy", { contentDir: "ch03/21-early-stopping-and-validation-strategy" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792522244/ltv-deep-learning-and-pytorch/early-stopping-and-validation-strategy.mp4", durationLabel: "1 min 40 s" }),
      L(22, "hyperparameter-search-basics", "Hyperparameter Search, Basics", { contentDir: "ch03/22-hyperparameter-search-basics" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792522825/ltv-deep-learning-and-pytorch/hyperparameter-search-basics.mp4", durationLabel: "1 min 24 s" }),
    ],
  },
  {
    n: 4,
    title: "Convolutional Networks & Vision Foundations",
    lessons: [
      L(23, "convolutions-conceptually", "Convolutions, Conceptually", { contentDir: "ch04/23-convolutions-conceptually" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792523516/ltv-deep-learning-and-pytorch/convolutions-conceptually.mp4", durationLabel: "1 min 40 s" }),
      L(24, "building-a-cnn-in-pytorch", "Building a CNN in PyTorch", { contentDir: "ch04/24-building-a-cnn-in-pytorch" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792524102/ltv-deep-learning-and-pytorch/building-a-cnn-in-pytorch.mp4", durationLabel: "1 min 24 s" }),
      L(25, "pooling-and-feature-maps", "Pooling & Feature Maps", { contentDir: "ch04/25-pooling-and-feature-maps" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792524739/ltv-deep-learning-and-pytorch/pooling-and-feature-maps.mp4", durationLabel: "1 min 29 s" }),
      L(26, "image-classification-end-to-end", "Image Classification, End to End", { contentDir: "ch04/26-image-classification-end-to-end" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792525361/ltv-deep-learning-and-pytorch/image-classification-end-to-end.mp4", durationLabel: "1 min 29 s" }),
      L(27, "transfer-learning-with-pretrained-vision-models", "Transfer Learning With Pretrained Vision Models", { contentDir: "ch04/27-transfer-learning-with-pretrained-vision-models" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792526032/ltv-deep-learning-and-pytorch/transfer-learning-with-pretrained-vision-models.mp4", durationLabel: "1 min 38 s" }),
      L(28, "data-augmentation", "Data Augmentation", { contentDir: "ch04/28-data-augmentation" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792526692/ltv-deep-learning-and-pytorch/data-augmentation.mp4", durationLabel: "1 min 39 s" }),
    ],
  },
  {
    n: 5,
    title: "Sequence Models & Attention",
    lessons: [
      L(29, "sequence-data-and-rnns", "Sequence Data & RNNs", { contentDir: "ch05/29-sequence-data-and-rnns" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792527455/ltv-deep-learning-and-pytorch/sequence-data-and-rnns.mp4", durationLabel: "1 min 48 s" }),
      L(30, "lstms-and-the-vanishing-gradient-problem", "LSTMs & the Vanishing Gradient Problem", { contentDir: "ch05/30-lstms-and-the-vanishing-gradient-problem" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792528140/ltv-deep-learning-and-pytorch/lstms-and-the-vanishing-gradient-problem.mp4", durationLabel: "1 min 46 s" }),
      L(31, "the-attention-mechanism", "The Attention Mechanism", { contentDir: "ch05/31-the-attention-mechanism" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792528858/ltv-deep-learning-and-pytorch/the-attention-mechanism.mp4", durationLabel: "1 min 47 s" }),
      L(32, "self-attention-vs-cross-attention", "Self-Attention vs. Cross-Attention", { contentDir: "ch05/32-self-attention-vs-cross-attention" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792529422/ltv-deep-learning-and-pytorch/self-attention-vs-cross-attention.mp4", durationLabel: "1 min 19 s" }),
      L(33, "multi-head-attention", "Multi-Head Attention", { contentDir: "ch05/33-multi-head-attention" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792530166/ltv-deep-learning-and-pytorch/multi-head-attention.mp4", durationLabel: "1 min 49 s" }),
      L(34, "positional-encoding", "Positional Encoding", { contentDir: "ch05/34-positional-encoding" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792530707/ltv-deep-learning-and-pytorch/positional-encoding.mp4", durationLabel: "1 min 30 s" }),
      L(35, "why-transformers-replaced-rnns", "Why Transformers Replaced RNNs", { contentDir: "ch05/35-why-transformers-replaced-rnns" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792531332/ltv-deep-learning-and-pytorch/why-transformers-replaced-rnns.mp4", durationLabel: "1 min 36 s" }),
      L(36, "attention-is-all-you-need-reading-the-paper", "\"Attention Is All You Need,\" Reading the Paper", { contentDir: "ch05/36-attention-is-all-you-need-reading-the-paper" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792532113/ltv-deep-learning-and-pytorch/attention-is-all-you-need-reading-the-paper.mp4", durationLabel: "1 min 47 s" }),
    ],
  },
  {
    n: 6,
    title: "Building a Transformer From Scratch",
    lessons: [
      L(37, "the-transformer-block", "The Transformer Block", { contentDir: "ch06/37-the-transformer-block" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792532771/ltv-deep-learning-and-pytorch/the-transformer-block.mp4", durationLabel: "2 min 8 s" }),
      L(38, "feed-forward-sublayers", "Feed-Forward Sublayers", { contentDir: "ch06/38-feed-forward-sublayers" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533218/ltv-deep-learning-and-pytorch/feed-forward-sublayers.mp4", durationLabel: "2 min 1 s" }),
      L(39, "residual-connections-and-layer-norm-placement", "Residual Connections & Layer-Norm Placement", { contentDir: "ch06/39-residual-connections-and-layer-norm-placement" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533578/ltv-deep-learning-and-pytorch/residual-connections-and-layer-norm-placement.mp4", durationLabel: "1 min 57 s" }),
      L(40, "building-a-decoder-only-transformer", "Building a Decoder-Only Transformer", { contentDir: "ch06/40-building-a-decoder-only-transformer" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533790/ltv-deep-learning-and-pytorch/building-a-decoder-only-transformer.mp4", durationLabel: "1 min 59 s" }),
      L(41, "implementing-the-training-loop-for-a-tiny-gpt", "Implementing the Training Loop for a Tiny GPT", { contentDir: "ch06/41-implementing-the-training-loop-for-a-tiny-gpt" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533974/ltv-deep-learning-and-pytorch/implementing-the-training-loop-for-a-tiny-gpt.mp4", durationLabel: "2 min 13 s" }),
      L(42, "sampling-strategies-greedy-top-k-top-p", "Sampling Strategies: Greedy, Top-K, Top-P", { contentDir: "ch06/42-sampling-strategies-greedy-top-k-top-p" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534160/ltv-deep-learning-and-pytorch/sampling-strategies-greedy-top-k-top-p.mp4", durationLabel: "2 min 24 s" }),
      L(43, "evaluating-a-tiny-language-model", "Evaluating a Tiny Language Model", { contentDir: "ch06/43-evaluating-a-tiny-language-model" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534320/ltv-deep-learning-and-pytorch/evaluating-a-tiny-language-model.mp4", durationLabel: "2 min 22 s" }),
      L(44, "scaling-the-tiny-gpt-up", "Scaling the Tiny GPT Up", { contentDir: "ch06/44-scaling-the-tiny-gpt-up" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534476/ltv-deep-learning-and-pytorch/scaling-the-tiny-gpt-up.mp4", durationLabel: "2 min 25 s" }),
    ],
  },
  {
    n: 7,
    title: "Scaling Up: Mixed Precision & Multi-GPU Basics",
    lessons: [
      L(45, "floating-point-precision-fp32-fp16-bf16", "Floating-Point Precision: FP32, FP16, BF16", { contentDir: "ch07/45-floating-point-precision-fp32-fp16-bf16" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534578/ltv-deep-learning-and-pytorch/floating-point-precision-fp32-fp16-bf16.mp4", durationLabel: "1 min 56 s" }),
      L(46, "automatic-mixed-precision-training", "Automatic Mixed Precision Training", { contentDir: "ch07/46-automatic-mixed-precision-training" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534688/ltv-deep-learning-and-pytorch/automatic-mixed-precision-training.mp4", durationLabel: "1 min 56 s" }),
      L(47, "gradient-accumulation", "Gradient Accumulation", { contentDir: "ch07/47-gradient-accumulation" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534793/ltv-deep-learning-and-pytorch/gradient-accumulation.mp4", durationLabel: "1 min 51 s" }),
      L(48, "dataparallel-vs-distributeddataparallel", "DataParallel vs. DistributedDataParallel", { contentDir: "ch07/48-dataparallel-vs-distributeddataparallel" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534894/ltv-deep-learning-and-pytorch/dataparallel-vs-distributeddataparallel.mp4", durationLabel: "1 min 49 s" }),
      L(49, "torch-compile-and-graph-optimization", "torch.compile & Graph Optimization", { contentDir: "ch07/49-torch-compile-and-graph-optimization" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534998/ltv-deep-learning-and-pytorch/torch-compile-and-graph-optimization.mp4", durationLabel: "1 min 50 s" }),
      L(50, "profiling-a-training-run", "Profiling a Training Run", { contentDir: "ch07/50-profiling-a-training-run" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535092/ltv-deep-learning-and-pytorch/profiling-a-training-run.mp4", durationLabel: "1 min 49 s" }),
    ],
  },
  {
    n: 8,
    title: "Debugging & Experiment Tracking",
    lessons: [
      L(51, "reading-loss-curves", "Reading Loss Curves", { contentDir: "ch08/51-reading-loss-curves" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535191/ltv-deep-learning-and-pytorch/reading-loss-curves.mp4", durationLabel: "1 min 38 s" }),
      L(52, "vanishing-and-exploding-gradients-in-practice", "Vanishing & Exploding Gradients, in Practice", { contentDir: "ch08/52-vanishing-and-exploding-gradients-in-practice" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535293/ltv-deep-learning-and-pytorch/vanishing-and-exploding-gradients-in-practice.mp4", durationLabel: "1 min 47 s" }),
      L(53, "silent-bugs-in-training-code", "Silent Bugs in Training Code", { contentDir: "ch08/53-silent-bugs-in-training-code" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535388/ltv-deep-learning-and-pytorch/silent-bugs-in-training-code.mp4", durationLabel: "1 min 47 s" }),
      L(54, "experiment-tracking-tools", "Experiment Tracking Tools", { contentDir: "ch08/54-experiment-tracking-tools" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535480/ltv-deep-learning-and-pytorch/experiment-tracking-tools.mp4", durationLabel: "1 min 40 s" }),
      L(55, "reproducibility-seeds-and-determinism", "Reproducibility: Seeds & Determinism", { contentDir: "ch08/55-reproducibility-seeds-and-determinism" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535579/ltv-deep-learning-and-pytorch/reproducibility-seeds-and-determinism.mp4", durationLabel: "1 min 51 s" }),
      L(56, "comparing-runs-and-ablations", "Comparing Runs & Ablations", { contentDir: "ch08/56-comparing-runs-and-ablations" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535673/ltv-deep-learning-and-pytorch/comparing-runs-and-ablations.mp4", durationLabel: "1 min 43 s" }),
    ],
  },
  {
    n: 9,
    title: "Capstone: Train and Evaluate a Small Transformer",
    lessons: [
      L(57, "capstone-kickoff-and-dataset-selection", "Capstone Kickoff & Dataset Selection", { contentDir: "ch09/57-capstone-kickoff-and-dataset-selection" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535789/ltv-deep-learning-and-pytorch/capstone-kickoff-and-dataset-selection.mp4", durationLabel: "1 min 53 s" }),
      L(58, "capstone-building-and-training-the-model", "Capstone: Building & Training the Model", { contentDir: "ch09/58-capstone-building-and-training-the-model" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535892/ltv-deep-learning-and-pytorch/capstone-building-and-training-the-model.mp4", durationLabel: "2 min 2 s" }),
      L(59, "capstone-evaluation-and-error-analysis", "Capstone: Evaluation & Error Analysis", { contentDir: "ch09/59-capstone-evaluation-and-error-analysis" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535975/ltv-deep-learning-and-pytorch/capstone-evaluation-and-error-analysis.mp4", durationLabel: "1 min 54 s" }),
      L(60, "capstone-writeup-and-next-steps", "Capstone: Write-Up & Next Steps", { contentDir: "ch09/60-capstone-writeup-and-next-steps" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792536056/ltv-deep-learning-and-pytorch/capstone-writeup-and-next-steps.mp4", durationLabel: "1 min 47 s" }),
    ],
  },
];
