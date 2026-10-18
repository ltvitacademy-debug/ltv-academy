// Quantum Programming with Qiskit course outline. Lessons without a contentDir render as
// "in production". Course 5 of 14 in the Quantum Computing Software Engineer path: real,
// current IBM Quantum / Qiskit development workflows, from first circuit to running on hardware.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/quantum-programming-with-qiskit/
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

export const QUANTUM_PROGRAMMING_WITH_QISKIT_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Qiskit Setup & Development Workflow",
    lessons: [
      L(1, "what-qiskit-actually-is", "What Qiskit Actually Is"),
      L(2, "installing-qiskit-and-ibm-quantum-setup", "Installing Qiskit & IBM Quantum Setup"),
      L(3, "the-qiskit-sdk-vs-ibm-quantum-platform", "The Qiskit SDK vs. the IBM Quantum Platform"),
      L(4, "your-first-qiskit-circuit", "Your First Qiskit Circuit"),
    ],
  },
  {
    n: 2,
    title: "Building Circuits in Qiskit",
    lessons: [
      L(5, "the-quantumcircuit-class", "The QuantumCircuit Class"),
      L(6, "adding-gates-to-a-circuit", "Adding Gates to a Circuit"),
      L(7, "classical-registers-and-measurement", "Classical Registers & Measurement"),
      L(8, "building-multi-qubit-circuits", "Building Multi-Qubit Circuits"),
      L(9, "parameterized-circuits", "Parameterized Circuits"),
      L(10, "circuit-building-lab", "Circuit-Building Lab"),
    ],
  },
  {
    n: 3,
    title: "Qiskit Simulators & Running Circuits",
    lessons: [
      L(11, "the-qiskit-aer-simulator", "The Qiskit Aer Simulator"),
      L(12, "statevector-vs-qasm-simulation", "Statevector vs. QASM Simulation"),
      L(13, "shots-and-measurement-statistics", "Shots & Measurement Statistics"),
      L(14, "simulating-noise-in-aer", "Simulating Noise in Aer"),
      L(15, "simulator-lab-interpreting-results", "Simulator Lab: Interpreting Results"),
    ],
  },
  {
    n: 4,
    title: "Visualizing Quantum States in Qiskit",
    lessons: [
      L(16, "plot-histogram-and-measurement-results", "plot_histogram & Measurement Results"),
      L(17, "bloch-sphere-visualization-in-qiskit", "Bloch Sphere Visualization in Qiskit"),
      L(18, "qsphere-and-state-city-plots", "Q-Sphere & State-City Plots"),
      L(19, "visualization-lab-communicating-results", "Visualization Lab: Communicating Results"),
    ],
  },
  {
    n: 5,
    title: "Working With Real IBM Quantum Hardware",
    lessons: [
      L(20, "choosing-a-backend", "Choosing a Backend"),
      L(21, "transpilation-mapping-a-circuit-to-real-hardware", "Transpilation: Mapping a Circuit to Real Hardware"),
      L(22, "queueing-and-job-management", "Queueing & Job Management"),
      L(23, "reading-real-hardware-results-vs-simulation", "Reading Real-Hardware Results vs. Simulation"),
      L(24, "hardware-access-lab-free-tier-realities", "Hardware-Access Lab: Free-Tier Realities"),
    ],
  },
  {
    n: 6,
    title: "The Qiskit Algorithms Library",
    lessons: [
      L(25, "overview-of-qiskit-algorithms", "Overview of Qiskit Algorithms"),
      L(26, "grovers-algorithm-in-qiskit", "Grover's Algorithm in Qiskit"),
      L(27, "quantum-fourier-transform-in-qiskit", "Quantum Fourier Transform in Qiskit"),
      L(28, "variational-algorithms-in-qiskit", "Variational Algorithms in Qiskit"),
      L(29, "algorithms-library-lab", "Algorithms Library Lab"),
    ],
  },
  {
    n: 7,
    title: "Noise & Error Mitigation in Qiskit",
    lessons: [
      L(30, "noise-models-in-qiskit-aer", "Noise Models in Qiskit Aer"),
      L(31, "readout-error-mitigation", "Readout Error Mitigation"),
      L(32, "zero-noise-extrapolation", "Zero-Noise Extrapolation"),
      L(33, "error-mitigation-lab", "Error Mitigation Lab"),
    ],
  },
  {
    n: 8,
    title: "Capstone: Building a Quantum Circuit Simulator",
    lessons: [
      L(34, "capstone-kickoff-circuit-simulator-requirements", "Capstone Kickoff: Circuit Simulator Requirements"),
      L(35, "capstone-build-the-circuit-and-simulation-layer", "Capstone: Build the Circuit & Simulation Layer"),
      L(36, "capstone-build-measurement-validation", "Capstone: Build Measurement Validation"),
      L(37, "capstone-wrap-up-and-state-vector-explanation", "Capstone: Wrap-Up & State-Vector Explanation"),
    ],
  },
];
