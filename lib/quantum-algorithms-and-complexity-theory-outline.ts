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
      L(1, "classical-complexity-classes-review", "Classical Complexity Classes Review", { contentDir: "ch01/01-classical-complexity-classes-review", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792372516/ltv-quantum/quantum-algorithms-and-complexity-theory-ch01-01-classical-complexity-classes-review.mp4", durationLabel: "2:43" }),
      L(2, "bqp-and-quantum-complexity", "BQP & Quantum Complexity", { contentDir: "ch01/02-bqp-and-quantum-complexity", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792372626/ltv-quantum/quantum-algorithms-and-complexity-theory-ch01-02-bqp-and-quantum-complexity.mp4", durationLabel: "2:19" }),
      L(3, "what-quantum-speedup-actually-means", "What Quantum Speedup Actually Means", { contentDir: "ch01/03-what-quantum-speedup-actually-means", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792372731/ltv-quantum/quantum-algorithms-and-complexity-theory-ch01-03-what-quantum-speedup-actually-means.mp4", durationLabel: "2:07" }),
      L(4, "complexity-classes-problem-solving-lab", "Complexity Classes Problem-Solving Lab", { contentDir: "ch01/04-complexity-classes-problem-solving-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792372860/ltv-quantum/quantum-algorithms-and-complexity-theory-ch01-04-complexity-classes-problem-solving-lab.mp4", durationLabel: "2:26" }),
    ],
  },
  {
    n: 2,
    title: "Quantum Fourier Transform",
    lessons: [
      L(5, "the-classical-discrete-fourier-transform", "The Classical Discrete Fourier Transform", { contentDir: "ch02/05-the-classical-discrete-fourier-transform", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792372991/ltv-quantum/quantum-algorithms-and-complexity-theory-ch02-05-the-classical-discrete-fourier-transform.mp4", durationLabel: "2:31" }),
      L(6, "the-quantum-fourier-transform-derivation", "The Quantum Fourier Transform: Derivation", { contentDir: "ch02/06-the-quantum-fourier-transform-derivation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792373121/ltv-quantum/quantum-algorithms-and-complexity-theory-ch02-06-the-quantum-fourier-transform-derivation.mp4", durationLabel: "2:20" }),
      L(7, "qft-circuit-construction", "QFT Circuit Construction", { contentDir: "ch02/07-qft-circuit-construction", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792373251/ltv-quantum/quantum-algorithms-and-complexity-theory-ch02-07-qft-circuit-construction.mp4", durationLabel: "2:12" }),
      L(8, "why-qft-is-exponentially-faster-and-what-that-doesnt-mean", "Why QFT Is Exponentially Faster — and What That Doesn't Mean", { contentDir: "ch02/08-why-qft-is-exponentially-faster-and-what-that-doesnt-mean", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792373389/ltv-quantum/quantum-algorithms-and-complexity-theory-ch02-08-why-qft-is-exponentially-faster-and-what-that-doesnt-mean.mp4", durationLabel: "2:33" }),
      L(9, "qft-implementation-lab", "QFT Implementation Lab", { contentDir: "ch02/09-qft-implementation-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792373527/ltv-quantum/quantum-algorithms-and-complexity-theory-ch02-09-qft-implementation-lab.mp4", durationLabel: "2:18" }),
    ],
  },
  {
    n: 3,
    title: "Quantum Phase Estimation",
    lessons: [
      L(10, "the-phase-estimation-problem", "The Phase Estimation Problem", { contentDir: "ch03/10-the-phase-estimation-problem", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792373648/ltv-quantum/quantum-algorithms-and-complexity-theory-ch03-10-the-phase-estimation-problem.mp4", durationLabel: "2:11" }),
      L(11, "the-phase-estimation-circuit", "The Phase Estimation Circuit", { contentDir: "ch03/11-the-phase-estimation-circuit", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792373773/ltv-quantum/quantum-algorithms-and-complexity-theory-ch03-11-the-phase-estimation-circuit.mp4", durationLabel: "2:16" }),
      L(12, "precision-and-ancilla-qubit-tradeoffs", "Precision & Ancilla-Qubit Tradeoffs", { contentDir: "ch03/12-precision-and-ancilla-qubit-tradeoffs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792373918/ltv-quantum/quantum-algorithms-and-complexity-theory-ch03-12-precision-and-ancilla-qubit-tradeoffs.mp4", durationLabel: "2:28" }),
      L(13, "phase-estimation-as-a-building-block-for-other-algorithms", "Phase Estimation as a Building Block for Other Algorithms", { contentDir: "ch03/13-phase-estimation-as-a-building-block-for-other-algorithms", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792374059/ltv-quantum/quantum-algorithms-and-complexity-theory-ch03-13-phase-estimation-as-a-building-block-for-other-algorithms.mp4", durationLabel: "2:29" }),
      L(14, "phase-estimation-implementation-lab", "Phase Estimation Implementation Lab", { contentDir: "ch03/14-phase-estimation-implementation-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792374167/ltv-quantum/quantum-algorithms-and-complexity-theory-ch03-14-phase-estimation-implementation-lab.mp4", durationLabel: "2:10" }),
    ],
  },
  {
    n: 4,
    title: "Grover's Algorithm",
    lessons: [
      L(15, "the-unstructured-search-problem", "The Unstructured Search Problem", { contentDir: "ch04/15-the-unstructured-search-problem", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792374281/ltv-quantum/quantum-algorithms-and-complexity-theory-ch04-15-the-unstructured-search-problem.mp4", durationLabel: "1:58" }),
      L(16, "the-grover-oracle-and-amplitude-amplification", "The Grover Oracle & Amplitude Amplification", { contentDir: "ch04/16-the-grover-oracle-and-amplitude-amplification", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792374419/ltv-quantum/quantum-algorithms-and-complexity-theory-ch04-16-the-grover-oracle-and-amplitude-amplification.mp4", durationLabel: "2:27" }),
      L(17, "grovers-algorithm-circuit-construction", "Grover's Algorithm: Circuit Construction", { contentDir: "ch04/17-grovers-algorithm-circuit-construction", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792374545/ltv-quantum/quantum-algorithms-and-complexity-theory-ch04-17-grovers-algorithm-circuit-construction.mp4", durationLabel: "2:02" }),
      L(18, "optimal-iteration-count-and-why-more-isnt-better", "Optimal Iteration Count — and Why More Isn't Better", { contentDir: "ch04/18-optimal-iteration-count-and-why-more-isnt-better", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792374689/ltv-quantum/quantum-algorithms-and-complexity-theory-ch04-18-optimal-iteration-count-and-why-more-isnt-better.mp4", durationLabel: "2:31" }),
      L(19, "grovers-algorithm-implementation-lab", "Grover's Algorithm Implementation Lab", { contentDir: "ch04/19-grovers-algorithm-implementation-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792374805/ltv-quantum/quantum-algorithms-and-complexity-theory-ch04-19-grovers-algorithm-implementation-lab.mp4", durationLabel: "2:09" }),
    ],
  },
  {
    n: 5,
    title: "Shor's Algorithm & Its Practical Limitations",
    lessons: [
      L(20, "the-integer-factoring-problem", "The Integer Factoring Problem", { contentDir: "ch05/20-the-integer-factoring-problem", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792374930/ltv-quantum/quantum-algorithms-and-complexity-theory-ch05-20-the-integer-factoring-problem.mp4", durationLabel: "2:21" }),
      L(21, "shors-algorithm-the-period-finding-reduction", "Shor's Algorithm: the Period-Finding Reduction", { contentDir: "ch05/21-shors-algorithm-the-period-finding-reduction", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792375062/ltv-quantum/quantum-algorithms-and-complexity-theory-ch05-21-shors-algorithm-the-period-finding-reduction.mp4", durationLabel: "2:17" }),
      L(22, "shors-algorithm-circuit-structure", "Shor's Algorithm: Circuit Structure", { contentDir: "ch05/22-shors-algorithm-circuit-structure", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792375189/ltv-quantum/quantum-algorithms-and-complexity-theory-ch05-22-shors-algorithm-circuit-structure.mp4", durationLabel: "2:07" }),
      L(23, "why-breaking-rsa-today-is-not-practical", "Why Breaking RSA Today Is Not Practical", { contentDir: "ch05/23-why-breaking-rsa-today-is-not-practical", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792375325/ltv-quantum/quantum-algorithms-and-complexity-theory-ch05-23-why-breaking-rsa-today-is-not-practical.mp4", durationLabel: "2:09" }),
      L(24, "post-quantum-cryptography-context", "Post-Quantum Cryptography: Context", { contentDir: "ch05/24-post-quantum-cryptography-context", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792375443/ltv-quantum/quantum-algorithms-and-complexity-theory-ch05-24-post-quantum-cryptography-context.mp4", durationLabel: "2:24" }),
      L(25, "shors-algorithm-small-scale-lab", "Shor's Algorithm Small-Scale Lab", { contentDir: "ch05/25-shors-algorithm-small-scale-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792375571/ltv-quantum/quantum-algorithms-and-complexity-theory-ch05-25-shors-algorithm-small-scale-lab.mp4", durationLabel: "2:28" }),
    ],
  },
  {
    n: 6,
    title: "Other Landmark Quantum Algorithms",
    lessons: [
      L(26, "the-deutsch-jozsa-algorithm", "The Deutsch-Jozsa Algorithm", { contentDir: "ch06/26-the-deutsch-jozsa-algorithm", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792375705/ltv-quantum/quantum-algorithms-and-complexity-theory-ch06-26-the-deutsch-jozsa-algorithm.mp4", durationLabel: "2:03" }),
      L(27, "simons-algorithm", "Simon's Algorithm", { contentDir: "ch06/27-simons-algorithm", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792375854/ltv-quantum/quantum-algorithms-and-complexity-theory-ch06-27-simons-algorithm.mp4", durationLabel: "2:26" }),
      L(28, "the-hhl-algorithm-for-linear-systems-overview", "The HHL Algorithm for Linear Systems: Overview", { contentDir: "ch06/28-the-hhl-algorithm-for-linear-systems-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792375993/ltv-quantum/quantum-algorithms-and-complexity-theory-ch06-28-the-hhl-algorithm-for-linear-systems-overview.mp4", durationLabel: "2:18" }),
      L(29, "quantum-walks-overview", "Quantum Walks: Overview", { contentDir: "ch06/29-quantum-walks-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792376106/ltv-quantum/quantum-algorithms-and-complexity-theory-ch06-29-quantum-walks-overview.mp4", durationLabel: "2:15" }),
      L(30, "landmark-algorithms-problem-solving-lab", "Landmark Algorithms Problem-Solving Lab", { contentDir: "ch06/30-landmark-algorithms-problem-solving-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792376222/ltv-quantum/quantum-algorithms-and-complexity-theory-ch06-30-landmark-algorithms-problem-solving-lab.mp4", durationLabel: "2:18" }),
    ],
  },
  {
    n: 7,
    title: "Algorithm Benchmarking Against Classical Alternatives",
    lessons: [
      L(31, "how-to-honestly-benchmark-a-quantum-algorithm", "How to Honestly Benchmark a Quantum Algorithm", { contentDir: "ch07/31-how-to-honestly-benchmark-a-quantum-algorithm", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792376360/ltv-quantum/quantum-algorithms-and-complexity-theory-ch07-31-how-to-honestly-benchmark-a-quantum-algorithm.mp4", durationLabel: "2:03" }),
      L(32, "benchmarking-grover-against-classical-search", "Benchmarking Grover Against Classical Search", { contentDir: "ch07/32-benchmarking-grover-against-classical-search", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792376492/ltv-quantum/quantum-algorithms-and-complexity-theory-ch07-32-benchmarking-grover-against-classical-search.mp4", durationLabel: "2:06" }),
      L(33, "benchmarking-lab-writing-up-an-honest-comparison", "Benchmarking Lab: Writing Up an Honest Comparison", { contentDir: "ch07/33-benchmarking-lab-writing-up-an-honest-comparison", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792376612/ltv-quantum/quantum-algorithms-and-complexity-theory-ch07-33-benchmarking-lab-writing-up-an-honest-comparison.mp4", durationLabel: "1:58" }),
      L(34, "capstone-the-quantum-algorithms-laboratory-project", "Capstone: the Quantum Algorithms Laboratory Project", { contentDir: "ch07/34-capstone-the-quantum-algorithms-laboratory-project", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792376746/ltv-quantum/quantum-algorithms-and-complexity-theory-ch07-34-capstone-the-quantum-algorithms-laboratory-project.mp4", durationLabel: "2:12" }),
    ],
  },
];
