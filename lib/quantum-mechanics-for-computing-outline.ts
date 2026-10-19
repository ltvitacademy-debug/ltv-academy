// Quantum Mechanics for Computing course outline. Lessons without a contentDir render as
// "in production". Course 3 of 14 in the Quantum Computing Software Engineer path: the physics
// concepts (states, superposition, entanglement, measurement) every later course relies on.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/quantum-mechanics-for-computing/
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

export const QUANTUM_MECHANICS_FOR_COMPUTING_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Foundations of Quantum Mechanics",
    lessons: [
      L(1, "why-classical-physics-breaks-down", "Why Classical Physics Breaks Down", { contentDir: "ch01/01-why-classical-physics-breaks-down", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792368315/ltv-quantum/quantum-mechanics-for-computing-ch01-01-why-classical-physics-breaks-down.mp4", durationLabel: "2:45" }),
      L(2, "wave-particle-duality", "Wave-Particle Duality", { contentDir: "ch01/02-wave-particle-duality", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792368454/ltv-quantum/quantum-mechanics-for-computing-ch01-02-wave-particle-duality.mp4", durationLabel: "2:40" }),
      L(3, "the-postulates-of-quantum-mechanics", "The Postulates of Quantum Mechanics", { contentDir: "ch01/03-the-postulates-of-quantum-mechanics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792368586/ltv-quantum/quantum-mechanics-for-computing-ch01-03-the-postulates-of-quantum-mechanics.mp4", durationLabel: "2:42" }),
      L(4, "quantum-mechanics-for-computing-not-physics-majors", "Quantum Mechanics for Computing, Not Physics Majors", { contentDir: "ch01/04-quantum-mechanics-for-computing-not-physics-majors", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792368712/ltv-quantum/quantum-mechanics-for-computing-ch01-04-quantum-mechanics-for-computing-not-physics-majors.mp4", durationLabel: "2:21" }),
      L(5, "foundations-check-yourself-lab", "Foundations Check-Yourself Lab", { contentDir: "ch01/05-foundations-check-yourself-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792368843/ltv-quantum/quantum-mechanics-for-computing-ch01-05-foundations-check-yourself-lab.mp4", durationLabel: "2:33" }),
    ],
  },
  {
    n: 2,
    title: "Quantum States & Dirac Notation",
    lessons: [
      L(6, "the-qubit-as-a-quantum-state", "The Qubit as a Quantum State", { contentDir: "ch02/06-the-qubit-as-a-quantum-state", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792368965/ltv-quantum/quantum-mechanics-for-computing-ch02-06-the-qubit-as-a-quantum-state.mp4", durationLabel: "2:39" }),
      L(7, "dirac-notation-ket-and-bra", "Dirac Notation: Ket and Bra", { contentDir: "ch02/07-dirac-notation-ket-and-bra", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792369102/ltv-quantum/quantum-mechanics-for-computing-ch02-07-dirac-notation-ket-and-bra.mp4", durationLabel: "2:35" }),
      L(8, "the-computational-basis", "The Computational Basis", { contentDir: "ch02/08-the-computational-basis", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792369241/ltv-quantum/quantum-mechanics-for-computing-ch02-08-the-computational-basis.mp4", durationLabel: "2:32" }),
      L(9, "state-vectors-and-normalization", "State Vectors & Normalization", { contentDir: "ch02/09-state-vectors-and-normalization", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792369376/ltv-quantum/quantum-mechanics-for-computing-ch02-09-state-vectors-and-normalization.mp4", durationLabel: "2:40" }),
      L(10, "dirac-notation-problem-solving-lab", "Dirac Notation Problem-Solving Lab", { contentDir: "ch02/10-dirac-notation-problem-solving-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792369507/ltv-quantum/quantum-mechanics-for-computing-ch02-10-dirac-notation-problem-solving-lab.mp4", durationLabel: "2:33" }),
    ],
  },
  {
    n: 3,
    title: "Superposition & Measurement",
    lessons: [
      L(11, "what-superposition-actually-means", "What Superposition Actually Means", { contentDir: "ch03/11-what-superposition-actually-means", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792369645/ltv-quantum/quantum-mechanics-for-computing-ch03-11-what-superposition-actually-means.mp4", durationLabel: "2:57" }),
      L(12, "measurement-and-the-born-rule", "Measurement & the Born Rule", { contentDir: "ch03/12-measurement-and-the-born-rule", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792369810/ltv-quantum/quantum-mechanics-for-computing-ch03-12-measurement-and-the-born-rule.mp4", durationLabel: "2:41" }),
      L(13, "wavefunction-collapse", "Wavefunction Collapse", { contentDir: "ch03/13-wavefunction-collapse", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792369926/ltv-quantum/quantum-mechanics-for-computing-ch03-13-wavefunction-collapse.mp4", durationLabel: "2:13" }),
      L(14, "measurement-bases-beyond-computational", "Measurement Bases Beyond Computational", { contentDir: "ch03/14-measurement-bases-beyond-computational", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792370028/ltv-quantum/quantum-mechanics-for-computing-ch03-14-measurement-bases-beyond-computational.mp4", durationLabel: "2:22" }),
      L(15, "superposition-and-measurement-lab", "Superposition & Measurement Lab", { contentDir: "ch03/15-superposition-and-measurement-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792370135/ltv-quantum/quantum-mechanics-for-computing-ch03-15-superposition-and-measurement-lab.mp4", durationLabel: "2:18" }),
    ],
  },
  {
    n: 4,
    title: "Entanglement",
    lessons: [
      L(16, "what-entanglement-actually-is", "What Entanglement Actually Is", { contentDir: "ch04/16-what-entanglement-actually-is", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792370268/ltv-quantum/quantum-mechanics-for-computing-ch04-16-what-entanglement-actually-is.mp4", durationLabel: "2:32" }),
      L(17, "bell-states", "Bell States", { contentDir: "ch04/17-bell-states", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792370398/ltv-quantum/quantum-mechanics-for-computing-ch04-17-bell-states.mp4", durationLabel: "2:37" }),
      L(18, "entanglement-vs-classical-correlation", "Entanglement vs. Classical Correlation", { contentDir: "ch04/18-entanglement-vs-classical-correlation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792370515/ltv-quantum/quantum-mechanics-for-computing-ch04-18-entanglement-vs-classical-correlation.mp4", durationLabel: "2:10" }),
      L(19, "the-epr-paradox-and-bell-inequalities", "The EPR Paradox & Bell Inequalities", { contentDir: "ch04/19-the-epr-paradox-and-bell-inequalities", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792370686/ltv-quantum/quantum-mechanics-for-computing-ch04-19-the-epr-paradox-and-bell-inequalities.mp4", durationLabel: "3:02" }),
      L(20, "entanglement-problem-solving-lab", "Entanglement Problem-Solving Lab", { contentDir: "ch04/20-entanglement-problem-solving-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792370809/ltv-quantum/quantum-mechanics-for-computing-ch04-20-entanglement-problem-solving-lab.mp4", durationLabel: "2:46" }),
    ],
  },
  {
    n: 5,
    title: "The No-Cloning Theorem & Quantum Information",
    lessons: [
      L(21, "the-no-cloning-theorem", "The No-Cloning Theorem", { contentDir: "ch05/21-the-no-cloning-theorem", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792370951/ltv-quantum/quantum-mechanics-for-computing-ch05-21-the-no-cloning-theorem.mp4", durationLabel: "2:49" }),
      L(22, "why-no-cloning-matters-for-computing-and-security", "Why No-Cloning Matters for Computing & Security", { contentDir: "ch05/22-why-no-cloning-matters-for-computing-and-security", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792371077/ltv-quantum/quantum-mechanics-for-computing-ch05-22-why-no-cloning-matters-for-computing-and-security.mp4", durationLabel: "2:33" }),
      L(23, "quantum-teleportation", "Quantum Teleportation", { contentDir: "ch05/23-quantum-teleportation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792371213/ltv-quantum/quantum-mechanics-for-computing-ch05-23-quantum-teleportation.mp4", durationLabel: "2:48" }),
      L(24, "superdense-coding", "Superdense Coding", { contentDir: "ch05/24-superdense-coding", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792371343/ltv-quantum/quantum-mechanics-for-computing-ch05-24-superdense-coding.mp4", durationLabel: "2:32" }),
    ],
  },
  {
    n: 6,
    title: "Quantum Dynamics",
    lessons: [
      L(25, "the-schrodinger-equation-conceptually", "The Schrödinger Equation, Conceptually", { contentDir: "ch06/25-the-schrodinger-equation-conceptually", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792371438/ltv-quantum/quantum-mechanics-for-computing-ch06-25-the-schrodinger-equation-conceptually.mp4", durationLabel: "2:05" }),
      L(26, "unitary-time-evolution", "Unitary Time Evolution", { contentDir: "ch06/26-unitary-time-evolution", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792371542/ltv-quantum/quantum-mechanics-for-computing-ch06-26-unitary-time-evolution.mp4", durationLabel: "2:20" }),
      L(27, "the-hamiltonian-and-energy", "The Hamiltonian & Energy", { contentDir: "ch06/27-the-hamiltonian-and-energy", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792371640/ltv-quantum/quantum-mechanics-for-computing-ch06-27-the-hamiltonian-and-energy.mp4", durationLabel: "2:10" }),
      L(28, "why-quantum-gates-are-time-evolution", "Why Quantum Gates Are Time Evolution", { contentDir: "ch06/28-why-quantum-gates-are-time-evolution", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792371755/ltv-quantum/quantum-mechanics-for-computing-ch06-28-why-quantum-gates-are-time-evolution.mp4", durationLabel: "2:42" }),
      L(29, "quantum-dynamics-problem-solving-lab", "Quantum Dynamics Problem-Solving Lab", { contentDir: "ch06/29-quantum-dynamics-problem-solving-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792371855/ltv-quantum/quantum-mechanics-for-computing-ch06-29-quantum-dynamics-problem-solving-lab.mp4", durationLabel: "2:20" }),
    ],
  },
  {
    n: 7,
    title: "Quantum Mechanics Problem-Solving Lab",
    lessons: [
      L(30, "worked-problem-set-states-and-measurement", "Worked Problem Set: States & Measurement", { contentDir: "ch07/30-worked-problem-set-states-and-measurement", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792371963/ltv-quantum/quantum-mechanics-for-computing-ch07-30-worked-problem-set-states-and-measurement.mp4", durationLabel: "2:40" }),
      L(31, "worked-problem-set-entanglement-and-teleportation", "Worked Problem Set: Entanglement & Teleportation", { contentDir: "ch07/31-worked-problem-set-entanglement-and-teleportation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792372072/ltv-quantum/quantum-mechanics-for-computing-ch07-31-worked-problem-set-entanglement-and-teleportation.mp4", durationLabel: "2:41" }),
      L(32, "capstone-explaining-quantum-mechanics-to-a-software-engineer", "Capstone: Explaining Quantum Mechanics to a Software Engineer", { contentDir: "ch07/32-capstone-explaining-quantum-mechanics-to-a-software-engineer", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792372215/ltv-quantum/quantum-mechanics-for-computing-ch07-32-capstone-explaining-quantum-mechanics-to-a-software-engineer.mp4", durationLabel: "3:50" }),
    ],
  },
];
