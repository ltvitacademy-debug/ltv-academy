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
      L(1, "the-classical-bit-and-its-limits", "The Classical Bit & Its Limits", { contentDir: "ch01/01-the-classical-bit-and-its-limits" }),
      L(2, "the-qubit-model", "The Qubit Model", { contentDir: "ch01/02-the-qubit-model" }),
      L(3, "why-quantum-computers-are-not-just-faster-classical-computers", "Why Quantum Computers Are Not Just Faster Classical Computers", { contentDir: "ch01/03-why-quantum-computers-are-not-just-faster-classical-computers" }),
      L(4, "classical-vs-quantum-information-lab", "Classical vs. Quantum Information Lab", { contentDir: "ch01/04-classical-vs-quantum-information-lab" }),
    ],
  },
  {
    n: 2,
    title: "Single-Qubit Gates",
    lessons: [
      L(5, "the-pauli-gates-x-y-z", "The Pauli Gates: X, Y, Z", { contentDir: "ch02/05-the-pauli-gates-x-y-z" }),
      L(6, "the-hadamard-gate", "The Hadamard Gate", { contentDir: "ch02/06-the-hadamard-gate" }),
      L(7, "phase-gates-s-and-t", "Phase Gates: S & T", { contentDir: "ch02/07-phase-gates-s-and-t" }),
      L(8, "rotation-gates", "Rotation Gates", { contentDir: "ch02/08-rotation-gates" }),
      L(9, "single-qubit-gates-problem-solving-lab", "Single-Qubit Gates Problem-Solving Lab", { contentDir: "ch02/09-single-qubit-gates-problem-solving-lab" }),
    ],
  },
  {
    n: 3,
    title: "Multi-Qubit & Entangling Gates",
    lessons: [
      L(10, "the-cnot-gate", "The CNOT Gate", { contentDir: "ch03/10-the-cnot-gate" }),
      L(11, "controlled-gates-in-general", "Controlled Gates in General", { contentDir: "ch03/11-controlled-gates-in-general" }),
      L(12, "the-swap-and-toffoli-gates", "The SWAP & Toffoli Gates", { contentDir: "ch03/12-the-swap-and-toffoli-gates" }),
      L(13, "building-bell-states-with-gates", "Building Bell States With Gates", { contentDir: "ch03/13-building-bell-states-with-gates" }),
      L(14, "multi-qubit-gates-problem-solving-lab", "Multi-Qubit Gates Problem-Solving Lab", { contentDir: "ch03/14-multi-qubit-gates-problem-solving-lab" }),
    ],
  },
  {
    n: 4,
    title: "Quantum Circuits & Circuit Diagrams",
    lessons: [
      L(15, "reading-a-quantum-circuit-diagram", "Reading a Quantum Circuit Diagram", { contentDir: "ch04/15-reading-a-quantum-circuit-diagram" }),
      L(16, "circuit-depth-and-width", "Circuit Depth & Width", { contentDir: "ch04/16-circuit-depth-and-width" }),
      L(17, "gate-decomposition-and-universal-gate-sets", "Gate Decomposition & Universal Gate Sets", { contentDir: "ch04/17-gate-decomposition-and-universal-gate-sets" }),
      L(18, "designing-a-circuit-from-a-specification", "Designing a Circuit From a Specification", { contentDir: "ch04/18-designing-a-circuit-from-a-specification" }),
      L(19, "circuit-design-problem-solving-lab", "Circuit Design Problem-Solving Lab", { contentDir: "ch04/19-circuit-design-problem-solving-lab" }),
    ],
  },
  {
    n: 5,
    title: "Quantum Teleportation & Superdense Coding in Practice",
    lessons: [
      L(20, "building-the-teleportation-circuit", "Building the Teleportation Circuit", { contentDir: "ch05/20-building-the-teleportation-circuit" }),
      L(21, "building-the-superdense-coding-circuit", "Building the Superdense Coding Circuit", { contentDir: "ch05/21-building-the-superdense-coding-circuit" }),
      L(22, "why-these-protocols-dont-violate-no-cloning", "Why These Protocols Don't Violate No-Cloning", { contentDir: "ch05/22-why-these-protocols-dont-violate-no-cloning" }),
      L(23, "teleportation-and-coding-lab", "Teleportation & Coding Lab", { contentDir: "ch05/23-teleportation-and-coding-lab" }),
    ],
  },
  {
    n: 6,
    title: "Simulating Quantum Circuits",
    lessons: [
      L(24, "state-vector-simulation-from-scratch", "State-Vector Simulation From Scratch", { contentDir: "ch06/24-state-vector-simulation-from-scratch" }),
      L(25, "why-simulators-dont-scale-the-exponential-wall", "Why Simulators Don't Scale: the Exponential Wall", { contentDir: "ch06/25-why-simulators-dont-scale-the-exponential-wall" }),
      L(26, "simulator-vs-real-hardware-what-changes", "Simulator vs. Real Hardware: What Changes", { contentDir: "ch06/26-simulator-vs-real-hardware-what-changes" }),
      L(27, "capstone-build-a-circuit-simulator-core", "Capstone: Build a Circuit Simulator Core", { contentDir: "ch06/27-capstone-build-a-circuit-simulator-core" }),
    ],
  },
];
