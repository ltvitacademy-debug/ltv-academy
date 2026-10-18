// Quantum Computing Fundamentals course outline. Lessons without a contentDir render as
// "in production". Course 4 of 14 in the Quantum Computing Software Engineer path: gates,
// circuits, and the core building blocks every programming-tool course builds on.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/quantum-computing-fundamentals/
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

export const QUANTUM_COMPUTING_FUNDAMENTALS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Qubits vs. Classical Bits",
    lessons: [
      L(1, "the-classical-bit-and-its-limits", "The Classical Bit & Its Limits"),
      L(2, "the-qubit-model", "The Qubit Model"),
      L(3, "why-quantum-computers-are-not-just-faster-classical-computers", "Why Quantum Computers Are Not Just Faster Classical Computers"),
      L(4, "classical-vs-quantum-information-lab", "Classical vs. Quantum Information Lab"),
    ],
  },
  {
    n: 2,
    title: "Single-Qubit Gates",
    lessons: [
      L(5, "the-pauli-gates-x-y-z", "The Pauli Gates: X, Y, Z"),
      L(6, "the-hadamard-gate", "The Hadamard Gate"),
      L(7, "phase-gates-s-and-t", "Phase Gates: S & T"),
      L(8, "rotation-gates", "Rotation Gates"),
      L(9, "single-qubit-gates-problem-solving-lab", "Single-Qubit Gates Problem-Solving Lab"),
    ],
  },
  {
    n: 3,
    title: "Multi-Qubit & Entangling Gates",
    lessons: [
      L(10, "the-cnot-gate", "The CNOT Gate"),
      L(11, "controlled-gates-in-general", "Controlled Gates in General"),
      L(12, "the-swap-and-toffoli-gates", "The SWAP & Toffoli Gates"),
      L(13, "building-bell-states-with-gates", "Building Bell States With Gates"),
      L(14, "multi-qubit-gates-problem-solving-lab", "Multi-Qubit Gates Problem-Solving Lab"),
    ],
  },
  {
    n: 4,
    title: "Quantum Circuits & Circuit Diagrams",
    lessons: [
      L(15, "reading-a-quantum-circuit-diagram", "Reading a Quantum Circuit Diagram"),
      L(16, "circuit-depth-and-width", "Circuit Depth & Width"),
      L(17, "gate-decomposition-and-universal-gate-sets", "Gate Decomposition & Universal Gate Sets"),
      L(18, "designing-a-circuit-from-a-specification", "Designing a Circuit From a Specification"),
      L(19, "circuit-design-problem-solving-lab", "Circuit Design Problem-Solving Lab"),
    ],
  },
  {
    n: 5,
    title: "Quantum Teleportation & Superdense Coding in Practice",
    lessons: [
      L(20, "building-the-teleportation-circuit", "Building the Teleportation Circuit"),
      L(21, "building-the-superdense-coding-circuit", "Building the Superdense Coding Circuit"),
      L(22, "why-these-protocols-dont-violate-no-cloning", "Why These Protocols Don't Violate No-Cloning"),
      L(23, "teleportation-and-coding-lab", "Teleportation & Coding Lab"),
    ],
  },
  {
    n: 6,
    title: "Simulating Quantum Circuits",
    lessons: [
      L(24, "state-vector-simulation-from-scratch", "State-Vector Simulation From Scratch"),
      L(25, "why-simulators-dont-scale-the-exponential-wall", "Why Simulators Don't Scale: the Exponential Wall"),
      L(26, "simulator-vs-real-hardware-what-changes", "Simulator vs. Real Hardware: What Changes"),
      L(27, "capstone-build-a-circuit-simulator-core", "Capstone: Build a Circuit Simulator Core"),
    ],
  },
];
