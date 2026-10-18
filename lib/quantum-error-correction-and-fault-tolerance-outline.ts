// Quantum Error Correction & Fault Tolerance course outline. Lessons without a contentDir
// render as "in production". Course 9 of 14 in the Quantum Computing Software Engineer path:
// why real quantum computers need error correction, and the codes/resource math behind it.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/quantum-error-correction-and-fault-tolerance/
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

export const QUANTUM_ERROR_CORRECTION_AND_FAULT_TOLERANCE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Noise Models in Quantum Systems",
    lessons: [
      L(1, "why-qubits-decohere", "Why Qubits Decohere"),
      L(2, "bit-flip-and-phase-flip-errors", "Bit-Flip & Phase-Flip Errors"),
      L(3, "the-depolarizing-noise-model", "The Depolarizing Noise Model"),
      L(4, "gate-errors-vs-decoherence-errors", "Gate Errors vs. Decoherence Errors"),
      L(5, "noise-modeling-lab", "Noise-Modeling Lab"),
    ],
  },
  {
    n: 2,
    title: "Classical Error Correction Review",
    lessons: [
      L(6, "the-classical-repetition-code", "The Classical Repetition Code"),
      L(7, "why-classical-error-correction-doesnt-port-directly", "Why Classical Error Correction Doesn't Port Directly"),
      L(8, "the-no-cloning-constraint-on-quantum-error-correction", "The No-Cloning Constraint on Quantum Error Correction"),
      L(9, "classical-coding-theory-lab", "Classical Coding Theory Lab"),
    ],
  },
  {
    n: 3,
    title: "Quantum Error Correction Basics",
    lessons: [
      L(10, "the-three-qubit-bit-flip-code", "The Three-Qubit Bit-Flip Code"),
      L(11, "the-three-qubit-phase-flip-code", "The Three-Qubit Phase-Flip Code"),
      L(12, "the-shor-nine-qubit-code", "The Shor Nine-Qubit Code"),
      L(13, "syndrome-measurement", "Syndrome Measurement"),
      L(14, "basic-qec-implementation-lab", "Basic QEC Implementation Lab"),
    ],
  },
  {
    n: 4,
    title: "Stabilizer Codes",
    lessons: [
      L(15, "the-stabilizer-formalism", "The Stabilizer Formalism"),
      L(16, "the-steane-code", "The Steane Code"),
      L(17, "css-codes", "CSS Codes"),
      L(18, "stabilizer-codes-problem-solving-lab", "Stabilizer Codes Problem-Solving Lab"),
    ],
  },
  {
    n: 5,
    title: "Surface Code Fundamentals",
    lessons: [
      L(19, "why-the-surface-code-is-the-leading-candidate", "Why the Surface Code Is the Leading Candidate"),
      L(20, "surface-code-lattice-structure", "Surface Code Lattice Structure"),
      L(21, "surface-code-syndrome-extraction", "Surface Code Syndrome Extraction"),
      L(22, "decoding-the-surface-code-overview", "Decoding the Surface Code: Overview"),
      L(23, "surface-code-lab", "Surface Code Lab"),
    ],
  },
  {
    n: 6,
    title: "Logical vs. Physical Qubits & Resource Estimation",
    lessons: [
      L(24, "what-a-logical-qubit-actually-costs-in-physical-qubits", "What a Logical Qubit Actually Costs in Physical Qubits"),
      L(25, "the-error-threshold-theorem", "The Error Threshold Theorem"),
      L(26, "resource-estimation-for-a-real-algorithm", "Resource Estimation for a Real Algorithm"),
      L(27, "resource-estimation-lab", "Resource-Estimation Lab"),
    ],
  },
  {
    n: 7,
    title: "Fault-Tolerant Computing",
    lessons: [
      L(28, "what-fault-tolerance-actually-means", "What Fault Tolerance Actually Means"),
      L(29, "fault-tolerant-gate-sets-and-magic-state-distillation", "Fault-Tolerant Gate Sets & Magic-State Distillation"),
      L(30, "the-current-state-of-fault-tolerant-hardware", "The Current State of Fault-Tolerant Hardware"),
      L(31, "nisq-era-vs-fault-tolerant-era-honest-framing", "NISQ-Era vs. Fault-Tolerant Era: Honest Framing"),
      L(32, "capstone-the-quantum-error-correction-laboratory", "Capstone: the Quantum Error Correction Laboratory"),
    ],
  },
];
