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
      L(1, "why-classical-physics-breaks-down", "Why Classical Physics Breaks Down"),
      L(2, "wave-particle-duality", "Wave-Particle Duality"),
      L(3, "the-postulates-of-quantum-mechanics", "The Postulates of Quantum Mechanics"),
      L(4, "quantum-mechanics-for-computing-not-physics-majors", "Quantum Mechanics for Computing, Not Physics Majors"),
      L(5, "foundations-check-yourself-lab", "Foundations Check-Yourself Lab"),
    ],
  },
  {
    n: 2,
    title: "Quantum States & Dirac Notation",
    lessons: [
      L(6, "the-qubit-as-a-quantum-state", "The Qubit as a Quantum State"),
      L(7, "dirac-notation-ket-and-bra", "Dirac Notation: Ket and Bra"),
      L(8, "the-computational-basis", "The Computational Basis"),
      L(9, "state-vectors-and-normalization", "State Vectors & Normalization"),
      L(10, "dirac-notation-problem-solving-lab", "Dirac Notation Problem-Solving Lab"),
    ],
  },
  {
    n: 3,
    title: "Superposition & Measurement",
    lessons: [
      L(11, "what-superposition-actually-means", "What Superposition Actually Means"),
      L(12, "measurement-and-the-born-rule", "Measurement & the Born Rule"),
      L(13, "wavefunction-collapse", "Wavefunction Collapse"),
      L(14, "measurement-bases-beyond-computational", "Measurement Bases Beyond Computational"),
      L(15, "superposition-and-measurement-lab", "Superposition & Measurement Lab"),
    ],
  },
  {
    n: 4,
    title: "Entanglement",
    lessons: [
      L(16, "what-entanglement-actually-is", "What Entanglement Actually Is"),
      L(17, "bell-states", "Bell States"),
      L(18, "entanglement-vs-classical-correlation", "Entanglement vs. Classical Correlation"),
      L(19, "the-epr-paradox-and-bell-inequalities", "The EPR Paradox & Bell Inequalities"),
      L(20, "entanglement-problem-solving-lab", "Entanglement Problem-Solving Lab"),
    ],
  },
  {
    n: 5,
    title: "The No-Cloning Theorem & Quantum Information",
    lessons: [
      L(21, "the-no-cloning-theorem", "The No-Cloning Theorem"),
      L(22, "why-no-cloning-matters-for-computing-and-security", "Why No-Cloning Matters for Computing & Security"),
      L(23, "quantum-teleportation", "Quantum Teleportation"),
      L(24, "superdense-coding", "Superdense Coding"),
    ],
  },
  {
    n: 6,
    title: "Quantum Dynamics",
    lessons: [
      L(25, "the-schrodinger-equation-conceptually", "The Schrödinger Equation, Conceptually"),
      L(26, "unitary-time-evolution", "Unitary Time Evolution"),
      L(27, "the-hamiltonian-and-energy", "The Hamiltonian & Energy"),
      L(28, "why-quantum-gates-are-time-evolution", "Why Quantum Gates Are Time Evolution"),
      L(29, "quantum-dynamics-problem-solving-lab", "Quantum Dynamics Problem-Solving Lab"),
    ],
  },
  {
    n: 7,
    title: "Quantum Mechanics Problem-Solving Lab",
    lessons: [
      L(30, "worked-problem-set-states-and-measurement", "Worked Problem Set: States & Measurement"),
      L(31, "worked-problem-set-entanglement-and-teleportation", "Worked Problem Set: Entanglement & Teleportation"),
      L(32, "capstone-explaining-quantum-mechanics-to-a-software-engineer", "Capstone: Explaining Quantum Mechanics to a Software Engineer"),
    ],
  },
];
