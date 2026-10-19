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
      L(1, "why-qubits-decohere", "Why Qubits Decohere", { contentDir: "ch01/01-why-qubits-decohere", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792372536/ltv-quantum/quantum-error-correction-and-fault-tolerance-ch01-01-why-qubits-decohere.mp4", durationLabel: "3:18" }),
      L(2, "bit-flip-and-phase-flip-errors", "Bit-Flip & Phase-Flip Errors", { contentDir: "ch01/02-bit-flip-and-phase-flip-errors", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792372680/ltv-quantum/quantum-error-correction-and-fault-tolerance-ch01-02-bit-flip-and-phase-flip-errors.mp4", durationLabel: "2:55" }),
      L(3, "the-depolarizing-noise-model", "The Depolarizing Noise Model", { contentDir: "ch01/03-the-depolarizing-noise-model", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792372821/ltv-quantum/quantum-error-correction-and-fault-tolerance-ch01-03-the-depolarizing-noise-model.mp4", durationLabel: "3:00" }),
      L(4, "gate-errors-vs-decoherence-errors", "Gate Errors vs. Decoherence Errors", { contentDir: "ch01/04-gate-errors-vs-decoherence-errors", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792372962/ltv-quantum/quantum-error-correction-and-fault-tolerance-ch01-04-gate-errors-vs-decoherence-errors.mp4", durationLabel: "2:58" }),
      L(5, "noise-modeling-lab", "Noise-Modeling Lab", { contentDir: "ch01/05-noise-modeling-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792373138/ltv-quantum/quantum-error-correction-and-fault-tolerance-ch01-05-noise-modeling-lab.mp4", durationLabel: "3:37" }),
    ],
  },
  {
    n: 2,
    title: "Classical Error Correction Review",
    lessons: [
      L(6, "the-classical-repetition-code", "The Classical Repetition Code", { contentDir: "ch02/06-the-classical-repetition-code", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792373294/ltv-quantum/quantum-error-correction-and-fault-tolerance-ch02-06-the-classical-repetition-code.mp4", durationLabel: "2:30" }),
      L(7, "why-classical-error-correction-doesnt-port-directly", "Why Classical Error Correction Doesn't Port Directly", { contentDir: "ch02/07-why-classical-error-correction-doesnt-port-directly", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792373434/ltv-quantum/quantum-error-correction-and-fault-tolerance-ch02-07-why-classical-error-correction-doesnt-port-directly.mp4", durationLabel: "2:29" }),
      L(8, "the-no-cloning-constraint-on-quantum-error-correction", "The No-Cloning Constraint on Quantum Error Correction", { contentDir: "ch02/08-the-no-cloning-constraint-on-quantum-error-correction", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792373569/ltv-quantum/quantum-error-correction-and-fault-tolerance-ch02-08-the-no-cloning-constraint-on-quantum-error-correction.mp4", durationLabel: "2:22" }),
      L(9, "classical-coding-theory-lab", "Classical Coding Theory Lab", { contentDir: "ch02/09-classical-coding-theory-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792373689/ltv-quantum/quantum-error-correction-and-fault-tolerance-ch02-09-classical-coding-theory-lab.mp4", durationLabel: "2:32" }),
    ],
  },
  {
    n: 3,
    title: "Quantum Error Correction Basics",
    lessons: [
      L(10, "the-three-qubit-bit-flip-code", "The Three-Qubit Bit-Flip Code", { contentDir: "ch03/10-the-three-qubit-bit-flip-code", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792373834/ltv-quantum/quantum-error-correction-and-fault-tolerance-ch03-10-the-three-qubit-bit-flip-code.mp4", durationLabel: "2:30" }),
      L(11, "the-three-qubit-phase-flip-code", "The Three-Qubit Phase-Flip Code", { contentDir: "ch03/11-the-three-qubit-phase-flip-code", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792373992/ltv-quantum/quantum-error-correction-and-fault-tolerance-ch03-11-the-three-qubit-phase-flip-code.mp4", durationLabel: "2:42" }),
      L(12, "the-shor-nine-qubit-code", "The Shor Nine-Qubit Code", { contentDir: "ch03/12-the-shor-nine-qubit-code", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792374232/ltv-quantum/quantum-error-correction-and-fault-tolerance-ch03-12-the-shor-nine-qubit-code.mp4", durationLabel: "2:34" }),
      L(13, "syndrome-measurement", "Syndrome Measurement", { contentDir: "ch03/13-syndrome-measurement", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792374380/ltv-quantum/quantum-error-correction-and-fault-tolerance-ch03-13-syndrome-measurement.mp4", durationLabel: "2:54" }),
      L(14, "basic-qec-implementation-lab", "Basic QEC Implementation Lab", { contentDir: "ch03/14-basic-qec-implementation-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792374517/ltv-quantum/quantum-error-correction-and-fault-tolerance-ch03-14-basic-qec-implementation-lab.mp4", durationLabel: "2:23" }),
    ],
  },
  {
    n: 4,
    title: "Stabilizer Codes",
    lessons: [
      L(15, "the-stabilizer-formalism", "The Stabilizer Formalism", { contentDir: "ch04/15-the-stabilizer-formalism", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792374665/ltv-quantum/quantum-error-correction-and-fault-tolerance-ch04-15-the-stabilizer-formalism.mp4", durationLabel: "2:20" }),
      L(16, "the-steane-code", "The Steane Code", { contentDir: "ch04/16-the-steane-code", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792374793/ltv-quantum/quantum-error-correction-and-fault-tolerance-ch04-16-the-steane-code.mp4", durationLabel: "2:18" }),
      L(17, "css-codes", "CSS Codes", { contentDir: "ch04/17-css-codes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792374901/ltv-quantum/quantum-error-correction-and-fault-tolerance-ch04-17-css-codes.mp4", durationLabel: "2:22" }),
      L(18, "stabilizer-codes-problem-solving-lab", "Stabilizer Codes Problem-Solving Lab", { contentDir: "ch04/18-stabilizer-codes-problem-solving-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792375002/ltv-quantum/quantum-error-correction-and-fault-tolerance-ch04-18-stabilizer-codes-problem-solving-lab.mp4", durationLabel: "2:05" }),
    ],
  },
  {
    n: 5,
    title: "Surface Code Fundamentals",
    lessons: [
      L(19, "why-the-surface-code-is-the-leading-candidate", "Why the Surface Code Is the Leading Candidate", { contentDir: "ch05/19-why-the-surface-code-is-the-leading-candidate", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792375144/ltv-quantum/quantum-error-correction-and-fault-tolerance-ch05-19-why-the-surface-code-is-the-leading-candidate.mp4", durationLabel: "2:21" }),
      L(20, "surface-code-lattice-structure", "Surface Code Lattice Structure", { contentDir: "ch05/20-surface-code-lattice-structure", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792375372/ltv-quantum/quantum-error-correction-and-fault-tolerance-ch05-20-surface-code-lattice-structure.mp4", durationLabel: "2:36" }),
      L(21, "surface-code-syndrome-extraction", "Surface Code Syndrome Extraction", { contentDir: "ch05/21-surface-code-syndrome-extraction", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792375481/ltv-quantum/quantum-error-correction-and-fault-tolerance-ch05-21-surface-code-syndrome-extraction.mp4", durationLabel: "2:13" }),
      L(22, "decoding-the-surface-code-overview", "Decoding the Surface Code: Overview", { contentDir: "ch05/22-decoding-the-surface-code-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792375599/ltv-quantum/quantum-error-correction-and-fault-tolerance-ch05-22-decoding-the-surface-code-overview.mp4", durationLabel: "2:34" }),
      L(23, "surface-code-lab", "Surface Code Lab", { contentDir: "ch05/23-surface-code-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792375727/ltv-quantum/quantum-error-correction-and-fault-tolerance-ch05-23-surface-code-lab.mp4", durationLabel: "2:16" }),
    ],
  },
  {
    n: 6,
    title: "Logical vs. Physical Qubits & Resource Estimation",
    lessons: [
      L(24, "what-a-logical-qubit-actually-costs-in-physical-qubits", "What a Logical Qubit Actually Costs in Physical Qubits", { contentDir: "ch06/24-what-a-logical-qubit-actually-costs-in-physical-qubits", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792375880/ltv-quantum/quantum-error-correction-and-fault-tolerance-ch06-24-what-a-logical-qubit-actually-costs-in-physical-qubits.mp4", durationLabel: "2:38" }),
      L(25, "the-error-threshold-theorem", "The Error Threshold Theorem", { contentDir: "ch06/25-the-error-threshold-theorem", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792376021/ltv-quantum/quantum-error-correction-and-fault-tolerance-ch06-25-the-error-threshold-theorem.mp4", durationLabel: "2:38" }),
      L(26, "resource-estimation-for-a-real-algorithm", "Resource Estimation for a Real Algorithm", { contentDir: "ch06/26-resource-estimation-for-a-real-algorithm", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792376149/ltv-quantum/quantum-error-correction-and-fault-tolerance-ch06-26-resource-estimation-for-a-real-algorithm.mp4", durationLabel: "2:33" }),
      L(27, "resource-estimation-lab", "Resource-Estimation Lab", { contentDir: "ch06/27-resource-estimation-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792376257/ltv-quantum/quantum-error-correction-and-fault-tolerance-ch06-27-resource-estimation-lab.mp4", durationLabel: "2:09" }),
    ],
  },
  {
    n: 7,
    title: "Fault-Tolerant Computing",
    lessons: [
      L(28, "what-fault-tolerance-actually-means", "What Fault Tolerance Actually Means", { contentDir: "ch07/28-what-fault-tolerance-actually-means", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792376410/ltv-quantum/quantum-error-correction-and-fault-tolerance-ch07-28-what-fault-tolerance-actually-means.mp4", durationLabel: "2:31" }),
      L(29, "fault-tolerant-gate-sets-and-magic-state-distillation", "Fault-Tolerant Gate Sets & Magic-State Distillation", { contentDir: "ch07/29-fault-tolerant-gate-sets-and-magic-state-distillation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792376541/ltv-quantum/quantum-error-correction-and-fault-tolerance-ch07-29-fault-tolerant-gate-sets-and-magic-state-distillation.mp4", durationLabel: "2:16" }),
      L(30, "the-current-state-of-fault-tolerant-hardware", "The Current State of Fault-Tolerant Hardware", { contentDir: "ch07/30-the-current-state-of-fault-tolerant-hardware", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792376684/ltv-quantum/quantum-error-correction-and-fault-tolerance-ch07-30-the-current-state-of-fault-tolerant-hardware.mp4", durationLabel: "2:30" }),
      L(31, "nisq-era-vs-fault-tolerant-era-honest-framing", "NISQ-Era vs. Fault-Tolerant Era: Honest Framing", { contentDir: "ch07/31-nisq-era-vs-fault-tolerant-era-honest-framing", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792376821/ltv-quantum/quantum-error-correction-and-fault-tolerance-ch07-31-nisq-era-vs-fault-tolerant-era-honest-framing.mp4", durationLabel: "2:30" }),
      L(32, "capstone-the-quantum-error-correction-laboratory", "Capstone: the Quantum Error Correction Laboratory", { contentDir: "ch07/32-capstone-the-quantum-error-correction-laboratory", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792376939/ltv-quantum/quantum-error-correction-and-fault-tolerance-ch07-32-capstone-the-quantum-error-correction-laboratory.mp4", durationLabel: "3:00" }),
    ],
  },
];
