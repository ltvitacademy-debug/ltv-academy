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
      L(1, "what-qiskit-actually-is", "What Qiskit Actually Is", { contentDir: "ch01/01-what-qiskit-actually-is" }),
      L(2, "installing-qiskit-and-ibm-quantum-setup", "Installing Qiskit & IBM Quantum Setup", { contentDir: "ch01/02-installing-qiskit-and-ibm-quantum-setup" }),
      L(3, "the-qiskit-sdk-vs-ibm-quantum-platform", "The Qiskit SDK vs. the IBM Quantum Platform", { contentDir: "ch01/03-the-qiskit-sdk-vs-ibm-quantum-platform" }),
      L(4, "your-first-qiskit-circuit", "Your First Qiskit Circuit", { contentDir: "ch01/04-your-first-qiskit-circuit" }),
    ],
  },
  {
    n: 2,
    title: "Building Circuits in Qiskit",
    lessons: [
      L(5, "the-quantumcircuit-class", "The QuantumCircuit Class", { contentDir: "ch02/05-the-quantumcircuit-class" }),
      L(6, "adding-gates-to-a-circuit", "Adding Gates to a Circuit", { contentDir: "ch02/06-adding-gates-to-a-circuit" }),
      L(7, "classical-registers-and-measurement", "Classical Registers & Measurement", { contentDir: "ch02/07-classical-registers-and-measurement" }),
      L(8, "building-multi-qubit-circuits", "Building Multi-Qubit Circuits", { contentDir: "ch02/08-building-multi-qubit-circuits" }),
      L(9, "parameterized-circuits", "Parameterized Circuits", { contentDir: "ch02/09-parameterized-circuits" }),
      L(10, "circuit-building-lab", "Circuit-Building Lab", { contentDir: "ch02/10-circuit-building-lab" }),
    ],
  },
  {
    n: 3,
    title: "Qiskit Simulators & Running Circuits",
    lessons: [
      L(11, "the-qiskit-aer-simulator", "The Qiskit Aer Simulator", { contentDir: "ch03/11-the-qiskit-aer-simulator" }),
      L(12, "statevector-vs-qasm-simulation", "Statevector vs. QASM Simulation", { contentDir: "ch03/12-statevector-vs-qasm-simulation" }),
      L(13, "shots-and-measurement-statistics", "Shots & Measurement Statistics", { contentDir: "ch03/13-shots-and-measurement-statistics" }),
      L(14, "simulating-noise-in-aer", "Simulating Noise in Aer", { contentDir: "ch03/14-simulating-noise-in-aer" }),
      L(15, "simulator-lab-interpreting-results", "Simulator Lab: Interpreting Results", { contentDir: "ch03/15-simulator-lab-interpreting-results" }),
    ],
  },
  {
    n: 4,
    title: "Visualizing Quantum States in Qiskit",
    lessons: [
      L(16, "plot-histogram-and-measurement-results", "plot_histogram & Measurement Results", { contentDir: "ch04/16-plot-histogram-and-measurement-results" }),
      L(17, "bloch-sphere-visualization-in-qiskit", "Bloch Sphere Visualization in Qiskit", { contentDir: "ch04/17-bloch-sphere-visualization-in-qiskit" }),
      L(18, "qsphere-and-state-city-plots", "Q-Sphere & State-City Plots", { contentDir: "ch04/18-qsphere-and-state-city-plots" }),
      L(19, "visualization-lab-communicating-results", "Visualization Lab: Communicating Results", { contentDir: "ch04/19-visualization-lab-communicating-results" }),
    ],
  },
  {
    n: 5,
    title: "Working With Real IBM Quantum Hardware",
    lessons: [
      L(20, "choosing-a-backend", "Choosing a Backend", { contentDir: "ch05/20-choosing-a-backend" }),
      L(21, "transpilation-mapping-a-circuit-to-real-hardware", "Transpilation: Mapping a Circuit to Real Hardware", { contentDir: "ch05/21-transpilation-mapping-a-circuit-to-real-hardware" }),
      L(22, "queueing-and-job-management", "Queueing & Job Management", { contentDir: "ch05/22-queueing-and-job-management" }),
      L(23, "reading-real-hardware-results-vs-simulation", "Reading Real-Hardware Results vs. Simulation", { contentDir: "ch05/23-reading-real-hardware-results-vs-simulation" }),
      L(24, "hardware-access-lab-free-tier-realities", "Hardware-Access Lab: Free-Tier Realities", { contentDir: "ch05/24-hardware-access-lab-free-tier-realities" }),
    ],
  },
  {
    n: 6,
    title: "The Qiskit Algorithms Library",
    lessons: [
      L(25, "overview-of-qiskit-algorithms", "Overview of Qiskit Algorithms", { contentDir: "ch06/25-overview-of-qiskit-algorithms" }),
      L(26, "grovers-algorithm-in-qiskit", "Grover's Algorithm in Qiskit", { contentDir: "ch06/26-grovers-algorithm-in-qiskit" }),
      L(27, "quantum-fourier-transform-in-qiskit", "Quantum Fourier Transform in Qiskit", { contentDir: "ch06/27-quantum-fourier-transform-in-qiskit" }),
      L(28, "variational-algorithms-in-qiskit", "Variational Algorithms in Qiskit", { contentDir: "ch06/28-variational-algorithms-in-qiskit" }),
      L(29, "algorithms-library-lab", "Algorithms Library Lab", { contentDir: "ch06/29-algorithms-library-lab" }),
    ],
  },
  {
    n: 7,
    title: "Noise & Error Mitigation in Qiskit",
    lessons: [
      L(30, "noise-models-in-qiskit-aer", "Noise Models in Qiskit Aer", { contentDir: "ch07/30-noise-models-in-qiskit-aer" }),
      L(31, "readout-error-mitigation", "Readout Error Mitigation", { contentDir: "ch07/31-readout-error-mitigation" }),
      L(32, "zero-noise-extrapolation", "Zero-Noise Extrapolation", { contentDir: "ch07/32-zero-noise-extrapolation" }),
      L(33, "error-mitigation-lab", "Error Mitigation Lab", { contentDir: "ch07/33-error-mitigation-lab" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: Building a Quantum Circuit Simulator",
    lessons: [
      L(34, "capstone-kickoff-circuit-simulator-requirements", "Capstone Kickoff: Circuit Simulator Requirements", { contentDir: "ch08/34-capstone-kickoff-circuit-simulator-requirements" }),
      L(35, "capstone-build-the-circuit-and-simulation-layer", "Capstone: Build the Circuit & Simulation Layer", { contentDir: "ch08/35-capstone-build-the-circuit-and-simulation-layer" }),
      L(36, "capstone-build-measurement-validation", "Capstone: Build Measurement Validation", { contentDir: "ch08/36-capstone-build-measurement-validation" }),
      L(37, "capstone-wrap-up-and-state-vector-explanation", "Capstone: Wrap-Up & State-Vector Explanation", { contentDir: "ch08/37-capstone-wrap-up-and-state-vector-explanation" }),
    ],
  },
];
