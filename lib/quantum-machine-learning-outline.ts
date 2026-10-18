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
      L(1, "why-quantum-machine-learning-is-an-open-research-question", "Why Quantum Machine Learning Is an Open Research Question", { contentDir: "ch01/01-why-quantum-machine-learning-is-an-open-research-question" }),
      L(2, "classical-ml-recap-what-qml-is-trying-to-augment", "Classical ML Recap: What QML Is Trying to Augment", { contentDir: "ch01/02-classical-ml-recap-what-qml-is-trying-to-augment" }),
      L(3, "the-qml-toolchain-pennylane-and-qiskit-machine-learning", "The QML Toolchain: PennyLane & Qiskit Machine Learning", { contentDir: "ch01/03-the-qml-toolchain-pennylane-and-qiskit-machine-learning" }),
      L(4, "honest-framing-no-proven-practical-advantage-yet", "Honest Framing: No Proven Practical Advantage Yet", { contentDir: "ch01/04-honest-framing-no-proven-practical-advantage-yet" }),
    ],
  },
  {
    n: 2,
    title: "Variational Quantum Circuits",
    lessons: [
      L(5, "what-a-variational-circuit-actually-is", "What a Variational Circuit Actually Is", { contentDir: "ch02/05-what-a-variational-circuit-actually-is" }),
      L(6, "parameterized-quantum-circuits-as-trainable-models", "Parameterized Quantum Circuits as Trainable Models", { contentDir: "ch02/06-parameterized-quantum-circuits-as-trainable-models" }),
      L(7, "the-parameter-shift-rule", "The Parameter-Shift Rule", { contentDir: "ch02/07-the-parameter-shift-rule" }),
      L(8, "barren-plateaus-a-real-training-obstacle", "Barren Plateaus: a Real Training Obstacle", { contentDir: "ch02/08-barren-plateaus-a-real-training-obstacle" }),
      L(9, "variational-circuits-lab", "Variational Circuits Lab", { contentDir: "ch02/09-variational-circuits-lab" }),
    ],
  },
  {
    n: 3,
    title: "Quantum Classifiers & Data Encoding",
    lessons: [
      L(10, "encoding-classical-data-into-quantum-states", "Encoding Classical Data Into Quantum States", { contentDir: "ch03/10-encoding-classical-data-into-quantum-states" }),
      L(11, "angle-encoding-vs-amplitude-encoding", "Angle Encoding vs. Amplitude Encoding", { contentDir: "ch03/11-angle-encoding-vs-amplitude-encoding" }),
      L(12, "building-a-variational-quantum-classifier", "Building a Variational Quantum Classifier", { contentDir: "ch03/12-building-a-variational-quantum-classifier" }),
      L(13, "quantum-kernel-methods", "Quantum Kernel Methods", { contentDir: "ch03/13-quantum-kernel-methods" }),
      L(14, "quantum-classifier-lab", "Quantum Classifier Lab", { contentDir: "ch03/14-quantum-classifier-lab" }),
    ],
  },
  {
    n: 4,
    title: "Quantum Neural Networks",
    lessons: [
      L(15, "quantum-neural-network-architectures", "Quantum Neural Network Architectures", { contentDir: "ch04/15-quantum-neural-network-architectures" }),
      L(16, "training-a-quantum-neural-network", "Training a Quantum Neural Network", { contentDir: "ch04/16-training-a-quantum-neural-network" }),
      L(17, "quantum-convolutional-circuits-overview", "Quantum Convolutional Circuits: Overview", { contentDir: "ch04/17-quantum-convolutional-circuits-overview" }),
      L(18, "quantum-neural-network-lab", "Quantum Neural Network Lab", { contentDir: "ch04/18-quantum-neural-network-lab" }),
    ],
  },
  {
    n: 5,
    title: "Hybrid QML Workflows",
    lessons: [
      L(19, "classical-quantum-hybrid-training-loops", "Classical-Quantum Hybrid Training Loops", { contentDir: "ch05/19-classical-quantum-hybrid-training-loops" }),
      L(20, "integrating-qml-with-pytorch-or-tensorflow", "Integrating QML With PyTorch or TensorFlow", { contentDir: "ch05/20-integrating-qml-with-pytorch-or-tensorflow" }),
      L(21, "when-a-hybrid-model-is-and-isnt-worth-the-complexity", "When a Hybrid Model Is — and Isn't — Worth the Complexity", { contentDir: "ch05/21-when-a-hybrid-model-is-and-isnt-worth-the-complexity" }),
      L(22, "hybrid-workflow-lab", "Hybrid Workflow Lab", { contentDir: "ch05/22-hybrid-workflow-lab" }),
    ],
  },
  {
    n: 6,
    title: "QML Project Lab",
    lessons: [
      L(23, "project-kickoff-choosing-a-real-dataset", "Project Kickoff: Choosing a Real Dataset", { contentDir: "ch06/23-project-kickoff-choosing-a-real-dataset" }),
      L(24, "project-build-and-train-a-quantum-classifier", "Project: Build & Train a Quantum Classifier", { contentDir: "ch06/24-project-build-and-train-a-quantum-classifier" }),
      L(25, "project-benchmark-against-a-classical-baseline", "Project: Benchmark Against a Classical Baseline", { contentDir: "ch06/25-project-benchmark-against-a-classical-baseline" }),
      L(26, "project-wrap-up-honest-results-reporting", "Project Wrap-Up: Honest Results Reporting", { contentDir: "ch06/26-project-wrap-up-honest-results-reporting" }),
    ],
  },
];
