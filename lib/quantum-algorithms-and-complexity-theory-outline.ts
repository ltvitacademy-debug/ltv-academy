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
      L(1, "classical-complexity-classes-review", "Classical Complexity Classes Review", { contentDir: "ch01/01-classical-complexity-classes-review" }),
      L(2, "bqp-and-quantum-complexity", "BQP & Quantum Complexity", { contentDir: "ch01/02-bqp-and-quantum-complexity" }),
      L(3, "what-quantum-speedup-actually-means", "What Quantum Speedup Actually Means", { contentDir: "ch01/03-what-quantum-speedup-actually-means" }),
      L(4, "complexity-classes-problem-solving-lab", "Complexity Classes Problem-Solving Lab", { contentDir: "ch01/04-complexity-classes-problem-solving-lab" }),
    ],
  },
  {
    n: 2,
    title: "Quantum Fourier Transform",
    lessons: [
      L(5, "the-classical-discrete-fourier-transform", "The Classical Discrete Fourier Transform", { contentDir: "ch02/05-the-classical-discrete-fourier-transform" }),
      L(6, "the-quantum-fourier-transform-derivation", "The Quantum Fourier Transform: Derivation", { contentDir: "ch02/06-the-quantum-fourier-transform-derivation" }),
      L(7, "qft-circuit-construction", "QFT Circuit Construction", { contentDir: "ch02/07-qft-circuit-construction" }),
      L(8, "why-qft-is-exponentially-faster-and-what-that-doesnt-mean", "Why QFT Is Exponentially Faster — and What That Doesn't Mean", { contentDir: "ch02/08-why-qft-is-exponentially-faster-and-what-that-doesnt-mean" }),
      L(9, "qft-implementation-lab", "QFT Implementation Lab", { contentDir: "ch02/09-qft-implementation-lab" }),
    ],
  },
  {
    n: 3,
    title: "Quantum Phase Estimation",
    lessons: [
      L(10, "the-phase-estimation-problem", "The Phase Estimation Problem", { contentDir: "ch03/10-the-phase-estimation-problem" }),
      L(11, "the-phase-estimation-circuit", "The Phase Estimation Circuit", { contentDir: "ch03/11-the-phase-estimation-circuit" }),
      L(12, "precision-and-ancilla-qubit-tradeoffs", "Precision & Ancilla-Qubit Tradeoffs", { contentDir: "ch03/12-precision-and-ancilla-qubit-tradeoffs" }),
      L(13, "phase-estimation-as-a-building-block-for-other-algorithms", "Phase Estimation as a Building Block for Other Algorithms", { contentDir: "ch03/13-phase-estimation-as-a-building-block-for-other-algorithms" }),
      L(14, "phase-estimation-implementation-lab", "Phase Estimation Implementation Lab", { contentDir: "ch03/14-phase-estimation-implementation-lab" }),
    ],
  },
  {
    n: 4,
    title: "Grover's Algorithm",
    lessons: [
      L(15, "the-unstructured-search-problem", "The Unstructured Search Problem", { contentDir: "ch04/15-the-unstructured-search-problem" }),
      L(16, "the-grover-oracle-and-amplitude-amplification", "The Grover Oracle & Amplitude Amplification", { contentDir: "ch04/16-the-grover-oracle-and-amplitude-amplification" }),
      L(17, "grovers-algorithm-circuit-construction", "Grover's Algorithm: Circuit Construction", { contentDir: "ch04/17-grovers-algorithm-circuit-construction" }),
      L(18, "optimal-iteration-count-and-why-more-isnt-better", "Optimal Iteration Count — and Why More Isn't Better", { contentDir: "ch04/18-optimal-iteration-count-and-why-more-isnt-better" }),
      L(19, "grovers-algorithm-implementation-lab", "Grover's Algorithm Implementation Lab", { contentDir: "ch04/19-grovers-algorithm-implementation-lab" }),
    ],
  },
  {
    n: 5,
    title: "Shor's Algorithm & Its Practical Limitations",
    lessons: [
      L(20, "the-integer-factoring-problem", "The Integer Factoring Problem", { contentDir: "ch05/20-the-integer-factoring-problem" }),
      L(21, "shors-algorithm-the-period-finding-reduction", "Shor's Algorithm: the Period-Finding Reduction", { contentDir: "ch05/21-shors-algorithm-the-period-finding-reduction" }),
      L(22, "shors-algorithm-circuit-structure", "Shor's Algorithm: Circuit Structure", { contentDir: "ch05/22-shors-algorithm-circuit-structure" }),
      L(23, "why-breaking-rsa-today-is-not-practical", "Why Breaking RSA Today Is Not Practical", { contentDir: "ch05/23-why-breaking-rsa-today-is-not-practical" }),
      L(24, "post-quantum-cryptography-context", "Post-Quantum Cryptography: Context", { contentDir: "ch05/24-post-quantum-cryptography-context" }),
      L(25, "shors-algorithm-small-scale-lab", "Shor's Algorithm Small-Scale Lab", { contentDir: "ch05/25-shors-algorithm-small-scale-lab" }),
    ],
  },
  {
    n: 6,
    title: "Other Landmark Quantum Algorithms",
    lessons: [
      L(26, "the-deutsch-jozsa-algorithm", "The Deutsch-Jozsa Algorithm", { contentDir: "ch06/26-the-deutsch-jozsa-algorithm" }),
      L(27, "simons-algorithm", "Simon's Algorithm", { contentDir: "ch06/27-simons-algorithm" }),
      L(28, "the-hhl-algorithm-for-linear-systems-overview", "The HHL Algorithm for Linear Systems: Overview", { contentDir: "ch06/28-the-hhl-algorithm-for-linear-systems-overview" }),
      L(29, "quantum-walks-overview", "Quantum Walks: Overview", { contentDir: "ch06/29-quantum-walks-overview" }),
      L(30, "landmark-algorithms-problem-solving-lab", "Landmark Algorithms Problem-Solving Lab", { contentDir: "ch06/30-landmark-algorithms-problem-solving-lab" }),
    ],
  },
  {
    n: 7,
    title: "Algorithm Benchmarking Against Classical Alternatives",
    lessons: [
      L(31, "how-to-honestly-benchmark-a-quantum-algorithm", "How to Honestly Benchmark a Quantum Algorithm", { contentDir: "ch07/31-how-to-honestly-benchmark-a-quantum-algorithm" }),
      L(32, "benchmarking-grover-against-classical-search", "Benchmarking Grover Against Classical Search", { contentDir: "ch07/32-benchmarking-grover-against-classical-search" }),
      L(33, "benchmarking-lab-writing-up-an-honest-comparison", "Benchmarking Lab: Writing Up an Honest Comparison", { contentDir: "ch07/33-benchmarking-lab-writing-up-an-honest-comparison" }),
      L(34, "capstone-the-quantum-algorithms-laboratory-project", "Capstone: the Quantum Algorithms Laboratory Project", { contentDir: "ch07/34-capstone-the-quantum-algorithms-laboratory-project" }),
    ],
  },
];
