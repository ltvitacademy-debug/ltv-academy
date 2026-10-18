// Quantum Machine Learning course outline. Lessons without a contentDir render as
// "in production". Course 10 of 14 in the Quantum Computing Software Engineer path: variational
// circuits and quantum-classical ML hybrids, taught with honest claims about current advantage.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/quantum-machine-learning/
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

export const QUANTUM_MACHINE_LEARNING_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Quantum Machine Learning Foundations",
    lessons: [
      L(1, "why-quantum-machine-learning-is-an-open-research-question", "Why Quantum Machine Learning Is an Open Research Question", { contentDir: "ch01/01-why-quantum-machine-learning-is-an-open-research-question", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792364134/ltv-quantum/quantum-machine-learning-ch01-01-why-quantum-machine-learning-is-an-open-research-question.mp4", durationLabel: "02:11" }),
      L(2, "classical-ml-recap-what-qml-is-trying-to-augment", "Classical ML Recap: What QML Is Trying to Augment", { contentDir: "ch01/02-classical-ml-recap-what-qml-is-trying-to-augment", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792364227/ltv-quantum/quantum-machine-learning-ch01-02-classical-ml-recap-what-qml-is-trying-to-augment.mp4", durationLabel: "02:04" }),
      L(3, "the-qml-toolchain-pennylane-and-qiskit-machine-learning", "The QML Toolchain: PennyLane & Qiskit Machine Learning", { contentDir: "ch01/03-the-qml-toolchain-pennylane-and-qiskit-machine-learning", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792364319/ltv-quantum/quantum-machine-learning-ch01-03-the-qml-toolchain-pennylane-and-qiskit-machine-learning.mp4", durationLabel: "01:59" }),
      L(4, "honest-framing-no-proven-practical-advantage-yet", "Honest Framing: No Proven Practical Advantage Yet", { contentDir: "ch01/04-honest-framing-no-proven-practical-advantage-yet", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792364422/ltv-quantum/quantum-machine-learning-ch01-04-honest-framing-no-proven-practical-advantage-yet.mp4", durationLabel: "02:08" }),
    ],
  },
  {
    n: 2,
    title: "Variational Quantum Circuits",
    lessons: [
      L(5, "what-a-variational-circuit-actually-is", "What a Variational Circuit Actually Is", { contentDir: "ch02/05-what-a-variational-circuit-actually-is", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792364515/ltv-quantum/quantum-machine-learning-ch02-05-what-a-variational-circuit-actually-is.mp4", durationLabel: "02:14" }),
      L(6, "parameterized-quantum-circuits-as-trainable-models", "Parameterized Quantum Circuits as Trainable Models", { contentDir: "ch02/06-parameterized-quantum-circuits-as-trainable-models", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792364652/ltv-quantum/quantum-machine-learning-ch02-06-parameterized-quantum-circuits-as-trainable-models.mp4", durationLabel: "02:13" }),
      L(7, "the-parameter-shift-rule", "The Parameter-Shift Rule", { contentDir: "ch02/07-the-parameter-shift-rule", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792364776/ltv-quantum/quantum-machine-learning-ch02-07-the-parameter-shift-rule.mp4", durationLabel: "02:13" }),
      L(8, "barren-plateaus-a-real-training-obstacle", "Barren Plateaus: a Real Training Obstacle", { contentDir: "ch02/08-barren-plateaus-a-real-training-obstacle", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792364907/ltv-quantum/quantum-machine-learning-ch02-08-barren-plateaus-a-real-training-obstacle.mp4", durationLabel: "02:17" }),
      L(9, "variational-circuits-lab", "Variational Circuits Lab", { contentDir: "ch02/09-variational-circuits-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792365010/ltv-quantum/quantum-machine-learning-ch02-09-variational-circuits-lab.mp4", durationLabel: "02:04" }),
    ],
  },
  {
    n: 3,
    title: "Quantum Classifiers & Data Encoding",
    lessons: [
      L(10, "encoding-classical-data-into-quantum-states", "Encoding Classical Data Into Quantum States", { contentDir: "ch03/10-encoding-classical-data-into-quantum-states", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792365140/ltv-quantum/quantum-machine-learning-ch03-10-encoding-classical-data-into-quantum-states.mp4", durationLabel: "02:05" }),
      L(11, "angle-encoding-vs-amplitude-encoding", "Angle Encoding vs. Amplitude Encoding", { contentDir: "ch03/11-angle-encoding-vs-amplitude-encoding", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792365298/ltv-quantum/quantum-machine-learning-ch03-11-angle-encoding-vs-amplitude-encoding.mp4", durationLabel: "02:17" }),
      L(12, "building-a-variational-quantum-classifier", "Building a Variational Quantum Classifier", { contentDir: "ch03/12-building-a-variational-quantum-classifier", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792365427/ltv-quantum/quantum-machine-learning-ch03-12-building-a-variational-quantum-classifier.mp4", durationLabel: "02:10" }),
      L(13, "quantum-kernel-methods", "Quantum Kernel Methods", { contentDir: "ch03/13-quantum-kernel-methods", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792365548/ltv-quantum/quantum-machine-learning-ch03-13-quantum-kernel-methods.mp4", durationLabel: "01:57" }),
      L(14, "quantum-classifier-lab", "Quantum Classifier Lab", { contentDir: "ch03/14-quantum-classifier-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792365678/ltv-quantum/quantum-machine-learning-ch03-14-quantum-classifier-lab.mp4", durationLabel: "01:59" }),
    ],
  },
  {
    n: 4,
    title: "Quantum Neural Networks",
    lessons: [
      L(15, "quantum-neural-network-architectures", "Quantum Neural Network Architectures", { contentDir: "ch04/15-quantum-neural-network-architectures", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792365814/ltv-quantum/quantum-machine-learning-ch04-15-quantum-neural-network-architectures.mp4", durationLabel: "02:06" }),
      L(16, "training-a-quantum-neural-network", "Training a Quantum Neural Network", { contentDir: "ch04/16-training-a-quantum-neural-network", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792365913/ltv-quantum/quantum-machine-learning-ch04-16-training-a-quantum-neural-network.mp4", durationLabel: "01:52" }),
      L(17, "quantum-convolutional-circuits-overview", "Quantum Convolutional Circuits: Overview", { contentDir: "ch04/17-quantum-convolutional-circuits-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792366001/ltv-quantum/quantum-machine-learning-ch04-17-quantum-convolutional-circuits-overview.mp4", durationLabel: "02:04" }),
      L(18, "quantum-neural-network-lab", "Quantum Neural Network Lab", { contentDir: "ch04/18-quantum-neural-network-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792366108/ltv-quantum/quantum-machine-learning-ch04-18-quantum-neural-network-lab.mp4", durationLabel: "02:20" }),
    ],
  },
  {
    n: 5,
    title: "Hybrid QML Workflows",
    lessons: [
      L(19, "classical-quantum-hybrid-training-loops", "Classical-Quantum Hybrid Training Loops", { contentDir: "ch05/19-classical-quantum-hybrid-training-loops", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792366201/ltv-quantum/quantum-machine-learning-ch05-19-classical-quantum-hybrid-training-loops.mp4", durationLabel: "02:05" }),
      L(20, "integrating-qml-with-pytorch-or-tensorflow", "Integrating QML With PyTorch or TensorFlow", { contentDir: "ch05/20-integrating-qml-with-pytorch-or-tensorflow", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792366293/ltv-quantum/quantum-machine-learning-ch05-20-integrating-qml-with-pytorch-or-tensorflow.mp4", durationLabel: "02:04" }),
      L(21, "when-a-hybrid-model-is-and-isnt-worth-the-complexity", "When a Hybrid Model Is — and Isn't — Worth the Complexity", { contentDir: "ch05/21-when-a-hybrid-model-is-and-isnt-worth-the-complexity", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792366380/ltv-quantum/quantum-machine-learning-ch05-21-when-a-hybrid-model-is-and-isnt-worth-the-complexity.mp4", durationLabel: "02:12" }),
      L(22, "hybrid-workflow-lab", "Hybrid Workflow Lab", { contentDir: "ch05/22-hybrid-workflow-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792366476/ltv-quantum/quantum-machine-learning-ch05-22-hybrid-workflow-lab.mp4", durationLabel: "02:22" }),
    ],
  },
  {
    n: 6,
    title: "QML Project Lab",
    lessons: [
      L(23, "project-kickoff-choosing-a-real-dataset", "Project Kickoff: Choosing a Real Dataset", { contentDir: "ch06/23-project-kickoff-choosing-a-real-dataset", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792366865/ltv-quantum/quantum-machine-learning-ch06-23-project-kickoff-choosing-a-real-dataset.mp4", durationLabel: "01:53" }),
      L(24, "project-build-and-train-a-quantum-classifier", "Project: Build & Train a Quantum Classifier", { contentDir: "ch06/24-project-build-and-train-a-quantum-classifier", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792367082/ltv-quantum/quantum-machine-learning-ch06-24-project-build-and-train-a-quantum-classifier.mp4", durationLabel: "02:28" }),
      L(25, "project-benchmark-against-a-classical-baseline", "Project: Benchmark Against a Classical Baseline", { contentDir: "ch06/25-project-benchmark-against-a-classical-baseline", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792367161/ltv-quantum/quantum-machine-learning-ch06-25-project-benchmark-against-a-classical-baseline.mp4", durationLabel: "01:57" }),
      L(26, "project-wrap-up-honest-results-reporting", "Project Wrap-Up: Honest Results Reporting", { contentDir: "ch06/26-project-wrap-up-honest-results-reporting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792367244/ltv-quantum/quantum-machine-learning-ch06-26-project-wrap-up-honest-results-reporting.mp4", durationLabel: "02:08" }),
    ],
  },
];
