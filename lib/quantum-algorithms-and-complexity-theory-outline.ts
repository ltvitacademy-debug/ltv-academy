// Quantum Algorithms & Complexity Theory course outline. Lessons without a contentDir render as
// "in production". Course 7 of 14 in the Quantum Computing Software Engineer path: the
// landmark algorithms (Grover, QFT, phase estimation, Shor) and what quantum speedup really means.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/quantum-algorithms-and-complexity-theory/
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

export const QUANTUM_ALGORITHMS_AND_COMPLEXITY_THEORY_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Quantum Complexity Classes",
    lessons: [
      L(1, "classical-complexity-classes-review", "Classical Complexity Classes Review"),
      L(2, "bqp-and-quantum-complexity", "BQP & Quantum Complexity"),
      L(3, "what-quantum-speedup-actually-means", "What Quantum Speedup Actually Means"),
      L(4, "complexity-classes-problem-solving-lab", "Complexity Classes Problem-Solving Lab"),
    ],
  },
  {
    n: 2,
    title: "Quantum Fourier Transform",
    lessons: [
      L(5, "the-classical-discrete-fourier-transform", "The Classical Discrete Fourier Transform"),
      L(6, "the-quantum-fourier-transform-derivation", "The Quantum Fourier Transform: Derivation"),
      L(7, "qft-circuit-construction", "QFT Circuit Construction"),
      L(8, "why-qft-is-exponentially-faster-and-what-that-doesnt-mean", "Why QFT Is Exponentially Faster — and What That Doesn't Mean"),
      L(9, "qft-implementation-lab", "QFT Implementation Lab"),
    ],
  },
  {
    n: 3,
    title: "Quantum Phase Estimation",
    lessons: [
      L(10, "the-phase-estimation-problem", "The Phase Estimation Problem"),
      L(11, "the-phase-estimation-circuit", "The Phase Estimation Circuit"),
      L(12, "precision-and-ancilla-qubit-tradeoffs", "Precision & Ancilla-Qubit Tradeoffs"),
      L(13, "phase-estimation-as-a-building-block-for-other-algorithms", "Phase Estimation as a Building Block for Other Algorithms"),
      L(14, "phase-estimation-implementation-lab", "Phase Estimation Implementation Lab"),
    ],
  },
  {
    n: 4,
    title: "Grover's Algorithm",
    lessons: [
      L(15, "the-unstructured-search-problem", "The Unstructured Search Problem"),
      L(16, "the-grover-oracle-and-amplitude-amplification", "The Grover Oracle & Amplitude Amplification"),
      L(17, "grovers-algorithm-circuit-construction", "Grover's Algorithm: Circuit Construction"),
      L(18, "optimal-iteration-count-and-why-more-isnt-better", "Optimal Iteration Count — and Why More Isn't Better"),
      L(19, "grovers-algorithm-implementation-lab", "Grover's Algorithm Implementation Lab"),
    ],
  },
  {
    n: 5,
    title: "Shor's Algorithm & Its Practical Limitations",
    lessons: [
      L(20, "the-integer-factoring-problem", "The Integer Factoring Problem"),
      L(21, "shors-algorithm-the-period-finding-reduction", "Shor's Algorithm: the Period-Finding Reduction"),
      L(22, "shors-algorithm-circuit-structure", "Shor's Algorithm: Circuit Structure"),
      L(23, "why-breaking-rsa-today-is-not-practical", "Why Breaking RSA Today Is Not Practical"),
      L(24, "post-quantum-cryptography-context", "Post-Quantum Cryptography: Context"),
      L(25, "shors-algorithm-small-scale-lab", "Shor's Algorithm Small-Scale Lab"),
    ],
  },
  {
    n: 6,
    title: "Other Landmark Quantum Algorithms",
    lessons: [
      L(26, "the-deutsch-jozsa-algorithm", "The Deutsch-Jozsa Algorithm"),
      L(27, "simons-algorithm", "Simon's Algorithm"),
      L(28, "the-hhl-algorithm-for-linear-systems-overview", "The HHL Algorithm for Linear Systems: Overview"),
      L(29, "quantum-walks-overview", "Quantum Walks: Overview"),
      L(30, "landmark-algorithms-problem-solving-lab", "Landmark Algorithms Problem-Solving Lab"),
    ],
  },
  {
    n: 7,
    title: "Algorithm Benchmarking Against Classical Alternatives",
    lessons: [
      L(31, "how-to-honestly-benchmark-a-quantum-algorithm", "How to Honestly Benchmark a Quantum Algorithm"),
      L(32, "benchmarking-grover-against-classical-search", "Benchmarking Grover Against Classical Search"),
      L(33, "benchmarking-lab-writing-up-an-honest-comparison", "Benchmarking Lab: Writing Up an Honest Comparison"),
      L(34, "capstone-the-quantum-algorithms-laboratory-project", "Capstone: the Quantum Algorithms Laboratory Project"),
    ],
  },
];
