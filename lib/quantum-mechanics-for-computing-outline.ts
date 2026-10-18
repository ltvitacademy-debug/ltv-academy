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
      L(1, "why-classical-physics-breaks-down", "Why Classical Physics Breaks Down", { contentDir: "ch01/01-why-classical-physics-breaks-down" }),
      L(2, "wave-particle-duality", "Wave-Particle Duality", { contentDir: "ch01/02-wave-particle-duality" }),
      L(3, "the-postulates-of-quantum-mechanics", "The Postulates of Quantum Mechanics", { contentDir: "ch01/03-the-postulates-of-quantum-mechanics" }),
      L(4, "quantum-mechanics-for-computing-not-physics-majors", "Quantum Mechanics for Computing, Not Physics Majors", { contentDir: "ch01/04-quantum-mechanics-for-computing-not-physics-majors" }),
      L(5, "foundations-check-yourself-lab", "Foundations Check-Yourself Lab", { contentDir: "ch01/05-foundations-check-yourself-lab" }),
    ],
  },
  {
    n: 2,
    title: "Quantum States & Dirac Notation",
    lessons: [
      L(6, "the-qubit-as-a-quantum-state", "The Qubit as a Quantum State", { contentDir: "ch02/06-the-qubit-as-a-quantum-state" }),
      L(7, "dirac-notation-ket-and-bra", "Dirac Notation: Ket and Bra", { contentDir: "ch02/07-dirac-notation-ket-and-bra" }),
      L(8, "the-computational-basis", "The Computational Basis", { contentDir: "ch02/08-the-computational-basis" }),
      L(9, "state-vectors-and-normalization", "State Vectors & Normalization", { contentDir: "ch02/09-state-vectors-and-normalization" }),
      L(10, "dirac-notation-problem-solving-lab", "Dirac Notation Problem-Solving Lab", { contentDir: "ch02/10-dirac-notation-problem-solving-lab" }),
    ],
  },
  {
    n: 3,
    title: "Superposition & Measurement",
    lessons: [
      L(11, "what-superposition-actually-means", "What Superposition Actually Means", { contentDir: "ch03/11-what-superposition-actually-means" }),
      L(12, "measurement-and-the-born-rule", "Measurement & the Born Rule", { contentDir: "ch03/12-measurement-and-the-born-rule" }),
      L(13, "wavefunction-collapse", "Wavefunction Collapse", { contentDir: "ch03/13-wavefunction-collapse" }),
      L(14, "measurement-bases-beyond-computational", "Measurement Bases Beyond Computational", { contentDir: "ch03/14-measurement-bases-beyond-computational" }),
      L(15, "superposition-and-measurement-lab", "Superposition & Measurement Lab", { contentDir: "ch03/15-superposition-and-measurement-lab" }),
    ],
  },
  {
    n: 4,
    title: "Entanglement",
    lessons: [
      L(16, "what-entanglement-actually-is", "What Entanglement Actually Is", { contentDir: "ch04/16-what-entanglement-actually-is" }),
      L(17, "bell-states", "Bell States", { contentDir: "ch04/17-bell-states" }),
      L(18, "entanglement-vs-classical-correlation", "Entanglement vs. Classical Correlation", { contentDir: "ch04/18-entanglement-vs-classical-correlation" }),
      L(19, "the-epr-paradox-and-bell-inequalities", "The EPR Paradox & Bell Inequalities", { contentDir: "ch04/19-the-epr-paradox-and-bell-inequalities" }),
      L(20, "entanglement-problem-solving-lab", "Entanglement Problem-Solving Lab", { contentDir: "ch04/20-entanglement-problem-solving-lab" }),
    ],
  },
  {
    n: 5,
    title: "The No-Cloning Theorem & Quantum Information",
    lessons: [
      L(21, "the-no-cloning-theorem", "The No-Cloning Theorem", { contentDir: "ch05/21-the-no-cloning-theorem" }),
      L(22, "why-no-cloning-matters-for-computing-and-security", "Why No-Cloning Matters for Computing & Security", { contentDir: "ch05/22-why-no-cloning-matters-for-computing-and-security" }),
      L(23, "quantum-teleportation", "Quantum Teleportation", { contentDir: "ch05/23-quantum-teleportation" }),
      L(24, "superdense-coding", "Superdense Coding", { contentDir: "ch05/24-superdense-coding" }),
    ],
  },
  {
    n: 6,
    title: "Quantum Dynamics",
    lessons: [
      L(25, "the-schrodinger-equation-conceptually", "The Schrödinger Equation, Conceptually", { contentDir: "ch06/25-the-schrodinger-equation-conceptually" }),
      L(26, "unitary-time-evolution", "Unitary Time Evolution", { contentDir: "ch06/26-unitary-time-evolution" }),
      L(27, "the-hamiltonian-and-energy", "The Hamiltonian & Energy", { contentDir: "ch06/27-the-hamiltonian-and-energy" }),
      L(28, "why-quantum-gates-are-time-evolution", "Why Quantum Gates Are Time Evolution", { contentDir: "ch06/28-why-quantum-gates-are-time-evolution" }),
      L(29, "quantum-dynamics-problem-solving-lab", "Quantum Dynamics Problem-Solving Lab", { contentDir: "ch06/29-quantum-dynamics-problem-solving-lab" }),
    ],
  },
  {
    n: 7,
    title: "Quantum Mechanics Problem-Solving Lab",
    lessons: [
      L(30, "worked-problem-set-states-and-measurement", "Worked Problem Set: States & Measurement", { contentDir: "ch07/30-worked-problem-set-states-and-measurement" }),
      L(31, "worked-problem-set-entanglement-and-teleportation", "Worked Problem Set: Entanglement & Teleportation", { contentDir: "ch07/31-worked-problem-set-entanglement-and-teleportation" }),
      L(32, "capstone-explaining-quantum-mechanics-to-a-software-engineer", "Capstone: Explaining Quantum Mechanics to a Software Engineer", { contentDir: "ch07/32-capstone-explaining-quantum-mechanics-to-a-software-engineer" }),
    ],
  },
];
