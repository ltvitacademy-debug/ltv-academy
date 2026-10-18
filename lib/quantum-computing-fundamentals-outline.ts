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
      L(1, "the-classical-bit-and-its-limits", "The Classical Bit & Its Limits", { contentDir: "ch01/01-the-classical-bit-and-its-limits", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792364088/ltv-quantum/quantum-computing-fundamentals-ch01-01-the-classical-bit-and-its-limits.mp4", durationLabel: "2:08" }),
      L(2, "the-qubit-model", "The Qubit Model", { contentDir: "ch01/02-the-qubit-model", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792364194/ltv-quantum/quantum-computing-fundamentals-ch01-02-the-qubit-model.mp4", durationLabel: "2:19" }),
      L(3, "why-quantum-computers-are-not-just-faster-classical-computers", "Why Quantum Computers Are Not Just Faster Classical Computers", { contentDir: "ch01/03-why-quantum-computers-are-not-just-faster-classical-computers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792364297/ltv-quantum/quantum-computing-fundamentals-ch01-03-why-not-just-faster.mp4", durationLabel: "2:13" }),
      L(4, "classical-vs-quantum-information-lab", "Classical vs. Quantum Information Lab", { contentDir: "ch01/04-classical-vs-quantum-information-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792364406/ltv-quantum/quantum-computing-fundamentals-ch01-04-classical-vs-quantum-lab.mp4", durationLabel: "2:19" }),
    ],
  },
  {
    n: 2,
    title: "Single-Qubit Gates",
    lessons: [
      L(5, "the-pauli-gates-x-y-z", "The Pauli Gates: X, Y, Z", { contentDir: "ch02/05-the-pauli-gates-x-y-z", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792364548/ltv-quantum/quantum-computing-fundamentals-ch02-05-pauli-gates.mp4", durationLabel: "2:12" }),
      L(6, "the-hadamard-gate", "The Hadamard Gate", { contentDir: "ch02/06-the-hadamard-gate", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792364673/ltv-quantum/quantum-computing-fundamentals-ch02-06-hadamard-gate.mp4", durationLabel: "1:58" }),
      L(7, "phase-gates-s-and-t", "Phase Gates: S & T", { contentDir: "ch02/07-phase-gates-s-and-t", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792364675/ltv-quantum/quantum-computing-fundamentals-ch02-07-phase-gates.mp4", durationLabel: "2:00" }),
      L(8, "rotation-gates", "Rotation Gates", { contentDir: "ch02/08-rotation-gates", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792364811/ltv-quantum/quantum-computing-fundamentals-ch02-08-rotation-gates.mp4", durationLabel: "2:27" }),
      L(9, "single-qubit-gates-problem-solving-lab", "Single-Qubit Gates Problem-Solving Lab", { contentDir: "ch02/09-single-qubit-gates-problem-solving-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792364827/ltv-quantum/quantum-computing-fundamentals-ch02-09-gates-lab.mp4", durationLabel: "2:33" }),
    ],
  },
  {
    n: 3,
    title: "Multi-Qubit & Entangling Gates",
    lessons: [
      L(10, "the-cnot-gate", "The CNOT Gate", { contentDir: "ch03/10-the-cnot-gate", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792364930/ltv-quantum/quantum-computing-fundamentals-ch03-10-cnot-gate.mp4", durationLabel: "2:09" }),
      L(11, "controlled-gates-in-general", "Controlled Gates in General", { contentDir: "ch03/11-controlled-gates-in-general", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792364943/ltv-quantum/quantum-computing-fundamentals-ch03-11-controlled-gates.mp4", durationLabel: "2:18" }),
      L(12, "the-swap-and-toffoli-gates", "The SWAP & Toffoli Gates", { contentDir: "ch03/12-the-swap-and-toffoli-gates", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792365040/ltv-quantum/quantum-computing-fundamentals-ch03-12-swap-toffoli.mp4", durationLabel: "2:14" }),
      L(13, "building-bell-states-with-gates", "Building Bell States With Gates", { contentDir: "ch03/13-building-bell-states-with-gates", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792365156/ltv-quantum/quantum-computing-fundamentals-ch03-13-bell-states.mp4", durationLabel: "2:21" }),
      L(14, "multi-qubit-gates-problem-solving-lab", "Multi-Qubit Gates Problem-Solving Lab", { contentDir: "ch03/14-multi-qubit-gates-problem-solving-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792365271/ltv-quantum/quantum-computing-fundamentals-ch03-14-multi-qubit-lab.mp4", durationLabel: "2:07" }),
    ],
  },
  {
    n: 4,
    title: "Quantum Circuits & Circuit Diagrams",
    lessons: [
      L(15, "reading-a-quantum-circuit-diagram", "Reading a Quantum Circuit Diagram", { contentDir: "ch04/15-reading-a-quantum-circuit-diagram", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792365169/ltv-quantum/quantum-computing-fundamentals-ch04-15-reading-circuit-diagram.mp4", durationLabel: "2:14" }),
      L(16, "circuit-depth-and-width", "Circuit Depth & Width", { contentDir: "ch04/16-circuit-depth-and-width", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792365299/ltv-quantum/quantum-computing-fundamentals-ch04-16-depth-width.mp4", durationLabel: "2:09" }),
      L(17, "gate-decomposition-and-universal-gate-sets", "Gate Decomposition & Universal Gate Sets", { contentDir: "ch04/17-gate-decomposition-and-universal-gate-sets", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792365376/ltv-quantum/quantum-computing-fundamentals-ch04-17-gate-decomposition.mp4", durationLabel: "2:16" }),
      L(18, "designing-a-circuit-from-a-specification", "Designing a Circuit From a Specification", { contentDir: "ch04/18-designing-a-circuit-from-a-specification", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792365399/ltv-quantum/quantum-computing-fundamentals-ch04-18-designing-from-spec.mp4", durationLabel: "2:12" }),
      L(19, "circuit-design-problem-solving-lab", "Circuit Design Problem-Solving Lab", { contentDir: "ch04/19-circuit-design-problem-solving-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792365477/ltv-quantum/quantum-computing-fundamentals-ch04-19-circuit-design-lab.mp4", durationLabel: "2:02" }),
    ],
  },
  {
    n: 5,
    title: "Quantum Teleportation & Superdense Coding in Practice",
    lessons: [
      L(20, "building-the-teleportation-circuit", "Building the Teleportation Circuit", { contentDir: "ch05/20-building-the-teleportation-circuit", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792365516/ltv-quantum/quantum-computing-fundamentals-ch05-20-teleportation-circuit.mp4", durationLabel: "2:19" }),
      L(21, "building-the-superdense-coding-circuit", "Building the Superdense Coding Circuit", { contentDir: "ch05/21-building-the-superdense-coding-circuit", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792365575/ltv-quantum/quantum-computing-fundamentals-ch05-21-superdense-coding.mp4", durationLabel: "2:13" }),
      L(22, "why-these-protocols-dont-violate-no-cloning", "Why These Protocols Don't Violate No-Cloning", { contentDir: "ch05/22-why-these-protocols-dont-violate-no-cloning", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792365634/ltv-quantum/quantum-computing-fundamentals-ch05-22-no-cloning.mp4", durationLabel: "2:26" }),
      L(23, "teleportation-and-coding-lab", "Teleportation & Coding Lab", { contentDir: "ch05/23-teleportation-and-coding-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792365690/ltv-quantum/quantum-computing-fundamentals-ch05-23-teleportation-coding-lab.mp4", durationLabel: "2:17" }),
    ],
  },
  {
    n: 6,
    title: "Simulating Quantum Circuits",
    lessons: [
      L(24, "state-vector-simulation-from-scratch", "State-Vector Simulation From Scratch", { contentDir: "ch06/24-state-vector-simulation-from-scratch", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792365734/ltv-quantum/quantum-computing-fundamentals-ch06-24-simulation-from-scratch.mp4", durationLabel: "2:10" }),
      L(25, "why-simulators-dont-scale-the-exponential-wall", "Why Simulators Don't Scale: the Exponential Wall", { contentDir: "ch06/25-why-simulators-dont-scale-the-exponential-wall", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792365808/ltv-quantum/quantum-computing-fundamentals-ch06-25-exponential-wall.mp4", durationLabel: "2:20" }),
      L(26, "simulator-vs-real-hardware-what-changes", "Simulator vs. Real Hardware: What Changes", { contentDir: "ch06/26-simulator-vs-real-hardware-what-changes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792365844/ltv-quantum/quantum-computing-fundamentals-ch06-26-sim-vs-hardware.mp4", durationLabel: "2:22" }),
      L(27, "capstone-build-a-circuit-simulator-core", "Capstone: Build a Circuit Simulator Core", { contentDir: "ch06/27-capstone-build-a-circuit-simulator-core", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792365905/ltv-quantum/quantum-computing-fundamentals-ch06-27-capstone-simulator-core.mp4", durationLabel: "2:38" }),
    ],
  },
];
