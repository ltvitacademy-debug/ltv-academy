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
      L(1, "why-quantum-machine-learning-is-an-open-research-question", "Why Quantum Machine Learning Is an Open Research Question"),
      L(2, "classical-ml-recap-what-qml-is-trying-to-augment", "Classical ML Recap: What QML Is Trying to Augment"),
      L(3, "the-qml-toolchain-pennylane-and-qiskit-machine-learning", "The QML Toolchain: PennyLane & Qiskit Machine Learning"),
      L(4, "honest-framing-no-proven-practical-advantage-yet", "Honest Framing: No Proven Practical Advantage Yet"),
    ],
  },
  {
    n: 2,
    title: "Variational Quantum Circuits",
    lessons: [
      L(5, "what-a-variational-circuit-actually-is", "What a Variational Circuit Actually Is"),
      L(6, "parameterized-quantum-circuits-as-trainable-models", "Parameterized Quantum Circuits as Trainable Models"),
      L(7, "the-parameter-shift-rule", "The Parameter-Shift Rule"),
      L(8, "barren-plateaus-a-real-training-obstacle", "Barren Plateaus: a Real Training Obstacle"),
      L(9, "variational-circuits-lab", "Variational Circuits Lab"),
    ],
  },
  {
    n: 3,
    title: "Quantum Classifiers & Data Encoding",
    lessons: [
      L(10, "encoding-classical-data-into-quantum-states", "Encoding Classical Data Into Quantum States"),
      L(11, "angle-encoding-vs-amplitude-encoding", "Angle Encoding vs. Amplitude Encoding"),
      L(12, "building-a-variational-quantum-classifier", "Building a Variational Quantum Classifier"),
      L(13, "quantum-kernel-methods", "Quantum Kernel Methods"),
      L(14, "quantum-classifier-lab", "Quantum Classifier Lab"),
    ],
  },
  {
    n: 4,
    title: "Quantum Neural Networks",
    lessons: [
      L(15, "quantum-neural-network-architectures", "Quantum Neural Network Architectures"),
      L(16, "training-a-quantum-neural-network", "Training a Quantum Neural Network"),
      L(17, "quantum-convolutional-circuits-overview", "Quantum Convolutional Circuits: Overview"),
      L(18, "quantum-neural-network-lab", "Quantum Neural Network Lab"),
    ],
  },
  {
    n: 5,
    title: "Hybrid QML Workflows",
    lessons: [
      L(19, "classical-quantum-hybrid-training-loops", "Classical-Quantum Hybrid Training Loops"),
      L(20, "integrating-qml-with-pytorch-or-tensorflow", "Integrating QML With PyTorch or TensorFlow"),
      L(21, "when-a-hybrid-model-is-and-isnt-worth-the-complexity", "When a Hybrid Model Is — and Isn't — Worth the Complexity"),
      L(22, "hybrid-workflow-lab", "Hybrid Workflow Lab"),
    ],
  },
  {
    n: 6,
    title: "QML Project Lab",
    lessons: [
      L(23, "project-kickoff-choosing-a-real-dataset", "Project Kickoff: Choosing a Real Dataset"),
      L(24, "project-build-and-train-a-quantum-classifier", "Project: Build & Train a Quantum Classifier"),
      L(25, "project-benchmark-against-a-classical-baseline", "Project: Benchmark Against a Classical Baseline"),
      L(26, "project-wrap-up-honest-results-reporting", "Project Wrap-Up: Honest Results Reporting"),
    ],
  },
];
