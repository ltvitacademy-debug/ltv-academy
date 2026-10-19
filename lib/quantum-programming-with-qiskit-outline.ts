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
      L(1, "what-qiskit-actually-is", "What Qiskit Actually Is", { contentDir: "ch01/01-what-qiskit-actually-is", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792378433/ltv-quantum/quantum-programming-with-qiskit-ch01-01-what-qiskit-actually-is.mp4", durationLabel: "2:06" }),
      L(2, "installing-qiskit-and-ibm-quantum-setup", "Installing Qiskit & IBM Quantum Setup", { contentDir: "ch01/02-installing-qiskit-and-ibm-quantum-setup", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792373143/ltv-quantum/quantum-programming-with-qiskit-ch01-02-installing-qiskit-and-ibm-quantum-setup.mp4", durationLabel: "2:06" }),
      L(3, "the-qiskit-sdk-vs-ibm-quantum-platform", "The Qiskit SDK vs. the IBM Quantum Platform", { contentDir: "ch01/03-the-qiskit-sdk-vs-ibm-quantum-platform", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792378441/ltv-quantum/quantum-programming-with-qiskit-ch01-03-the-qiskit-sdk-vs-ibm-quantum-platform.mp4", durationLabel: "2:11" }),
      L(4, "your-first-qiskit-circuit", "Your First Qiskit Circuit", { contentDir: "ch01/04-your-first-qiskit-circuit", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792373372/ltv-quantum/quantum-programming-with-qiskit-ch01-04-your-first-qiskit-circuit.mp4", durationLabel: "2:35" }),
    ],
  },
  {
    n: 2,
    title: "Building Circuits in Qiskit",
    lessons: [
      L(5, "the-quantumcircuit-class", "The QuantumCircuit Class", { contentDir: "ch02/05-the-quantumcircuit-class", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792373482/ltv-quantum/quantum-programming-with-qiskit-ch02-05-the-quantumcircuit-class.mp4", durationLabel: "2:17" }),
      L(6, "adding-gates-to-a-circuit", "Adding Gates to a Circuit", { contentDir: "ch02/06-adding-gates-to-a-circuit", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792378450/ltv-quantum/quantum-programming-with-qiskit-ch02-06-adding-gates-to-a-circuit.mp4", durationLabel: "2:31" }),
      L(7, "classical-registers-and-measurement", "Classical Registers & Measurement", { contentDir: "ch02/07-classical-registers-and-measurement", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792373683/ltv-quantum/quantum-programming-with-qiskit-ch02-07-classical-registers-and-measurement.mp4", durationLabel: "2:10" }),
      L(8, "building-multi-qubit-circuits", "Building Multi-Qubit Circuits", { contentDir: "ch02/08-building-multi-qubit-circuits", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792378469/ltv-quantum/quantum-programming-with-qiskit-ch02-08-building-multi-qubit-circuits.mp4", durationLabel: "2:23" }),
      L(9, "parameterized-circuits", "Parameterized Circuits", { contentDir: "ch02/09-parameterized-circuits", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792373914/ltv-quantum/quantum-programming-with-qiskit-ch02-09-parameterized-circuits.mp4", durationLabel: "2:21" }),
      L(10, "circuit-building-lab", "Circuit-Building Lab", { contentDir: "ch02/10-circuit-building-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792379018/ltv-quantum/quantum-programming-with-qiskit-ch02-10-circuit-building-lab.mp4", durationLabel: "2:30" }),
    ],
  },
  {
    n: 3,
    title: "Qiskit Simulators & Running Circuits",
    lessons: [
      L(11, "the-qiskit-aer-simulator", "The Qiskit Aer Simulator", { contentDir: "ch03/11-the-qiskit-aer-simulator", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792379022/ltv-quantum/quantum-programming-with-qiskit-ch03-11-the-qiskit-aer-simulator.mp4", durationLabel: "2:10" }),
      L(12, "statevector-vs-qasm-simulation", "Statevector vs. QASM Simulation", { contentDir: "ch03/12-statevector-vs-qasm-simulation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792379027/ltv-quantum/quantum-programming-with-qiskit-ch03-12-statevector-vs-qasm-simulation.mp4", durationLabel: "2:12" }),
      L(13, "shots-and-measurement-statistics", "Shots & Measurement Statistics", { contentDir: "ch03/13-shots-and-measurement-statistics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792379032/ltv-quantum/quantum-programming-with-qiskit-ch03-13-shots-and-measurement-statistics.mp4", durationLabel: "2:35" }),
      L(14, "simulating-noise-in-aer", "Simulating Noise in Aer", { contentDir: "ch03/14-simulating-noise-in-aer", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792379255/ltv-quantum/quantum-programming-with-qiskit-ch03-14-simulating-noise-in-aer.mp4", durationLabel: "2:40" }),
      L(15, "simulator-lab-interpreting-results", "Simulator Lab: Interpreting Results", { contentDir: "ch03/15-simulator-lab-interpreting-results", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792379097/ltv-quantum/quantum-programming-with-qiskit-ch03-15-simulator-lab-interpreting-results.mp4", durationLabel: "2:54" }),
    ],
  },
  {
    n: 4,
    title: "Visualizing Quantum States in Qiskit",
    lessons: [
      L(16, "plot-histogram-and-measurement-results", "plot_histogram & Measurement Results", { contentDir: "ch04/16-plot-histogram-and-measurement-results", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792374958/ltv-quantum/quantum-programming-with-qiskit-ch04-16-plot-histogram-and-measurement-results.mp4", durationLabel: "2:10" }),
      L(17, "bloch-sphere-visualization-in-qiskit", "Bloch Sphere Visualization in Qiskit", { contentDir: "ch04/17-bloch-sphere-visualization-in-qiskit", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792379100/ltv-quantum/quantum-programming-with-qiskit-ch04-17-bloch-sphere-visualization-in-qiskit.mp4", durationLabel: "2:15" }),
      L(18, "qsphere-and-state-city-plots", "Q-Sphere & State-City Plots", { contentDir: "ch04/18-qsphere-and-state-city-plots", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792375193/ltv-quantum/quantum-programming-with-qiskit-ch04-18-qsphere-and-state-city-plots.mp4", durationLabel: "2:08" }),
      L(19, "visualization-lab-communicating-results", "Visualization Lab: Communicating Results", { contentDir: "ch04/19-visualization-lab-communicating-results", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792379104/ltv-quantum/quantum-programming-with-qiskit-ch04-19-visualization-lab-communicating-results.mp4", durationLabel: "2:33" }),
    ],
  },
  {
    n: 5,
    title: "Working With Real IBM Quantum Hardware",
    lessons: [
      L(20, "choosing-a-backend", "Choosing a Backend", { contentDir: "ch05/20-choosing-a-backend", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792379283/ltv-quantum/quantum-programming-with-qiskit-ch05-20-choosing-a-backend.mp4", durationLabel: "2:07" }),
      L(21, "transpilation-mapping-a-circuit-to-real-hardware", "Transpilation: Mapping a Circuit to Real Hardware", { contentDir: "ch05/21-transpilation-mapping-a-circuit-to-real-hardware", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792379286/ltv-quantum/quantum-programming-with-qiskit-ch05-21-transpilation-mapping-a-circuit-to-real-hardware.mp4", durationLabel: "2:37" }),
      L(22, "queueing-and-job-management", "Queueing & Job Management", { contentDir: "ch05/22-queueing-and-job-management", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792375811/ltv-quantum/quantum-programming-with-qiskit-ch05-22-queueing-and-job-management.mp4", durationLabel: "2:24" }),
      L(23, "reading-real-hardware-results-vs-simulation", "Reading Real-Hardware Results vs. Simulation", { contentDir: "ch05/23-reading-real-hardware-results-vs-simulation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792379289/ltv-quantum/quantum-programming-with-qiskit-ch05-23-reading-real-hardware-results-vs-simulation.mp4", durationLabel: "3:01" }),
      L(24, "hardware-access-lab-free-tier-realities", "Hardware-Access Lab: Free-Tier Realities", { contentDir: "ch05/24-hardware-access-lab-free-tier-realities", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792379291/ltv-quantum/quantum-programming-with-qiskit-ch05-24-hardware-access-lab-free-tier-realities.mp4", durationLabel: "2:37" }),
    ],
  },
  {
    n: 6,
    title: "The Qiskit Algorithms Library",
    lessons: [
      L(25, "overview-of-qiskit-algorithms", "Overview of Qiskit Algorithms", { contentDir: "ch06/25-overview-of-qiskit-algorithms", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792379312/ltv-quantum/quantum-programming-with-qiskit-ch06-25-overview-of-qiskit-algorithms.mp4", durationLabel: "2:28" }),
      L(26, "grovers-algorithm-in-qiskit", "Grover's Algorithm in Qiskit", { contentDir: "ch06/26-grovers-algorithm-in-qiskit", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792379315/ltv-quantum/quantum-programming-with-qiskit-ch06-26-grovers-algorithm-in-qiskit.mp4", durationLabel: "2:32" }),
      L(27, "quantum-fourier-transform-in-qiskit", "Quantum Fourier Transform in Qiskit", { contentDir: "ch06/27-quantum-fourier-transform-in-qiskit", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792379317/ltv-quantum/quantum-programming-with-qiskit-ch06-27-quantum-fourier-transform-in-qiskit.mp4", durationLabel: "2:27" }),
      L(28, "variational-algorithms-in-qiskit", "Variational Algorithms in Qiskit", { contentDir: "ch06/28-variational-algorithms-in-qiskit", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792379320/ltv-quantum/quantum-programming-with-qiskit-ch06-28-variational-algorithms-in-qiskit.mp4", durationLabel: "2:52" }),
      L(29, "algorithms-library-lab", "Algorithms Library Lab", { contentDir: "ch06/29-algorithms-library-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792379323/ltv-quantum/quantum-programming-with-qiskit-ch06-29-algorithms-library-lab.mp4", durationLabel: "2:29" }),
    ],
  },
  {
    n: 7,
    title: "Noise & Error Mitigation in Qiskit",
    lessons: [
      L(30, "noise-models-in-qiskit-aer", "Noise Models in Qiskit Aer", { contentDir: "ch07/30-noise-models-in-qiskit-aer", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792377020/ltv-quantum/quantum-programming-with-qiskit-ch07-30-noise-models-in-qiskit-aer.mp4", durationLabel: "2:48" }),
      L(31, "readout-error-mitigation", "Readout Error Mitigation", { contentDir: "ch07/31-readout-error-mitigation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792379061/ltv-quantum/quantum-programming-with-qiskit-ch07-31-readout-error-mitigation.mp4", durationLabel: "3:23" }),
      L(32, "zero-noise-extrapolation", "Zero-Noise Extrapolation", { contentDir: "ch07/32-zero-noise-extrapolation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792379066/ltv-quantum/quantum-programming-with-qiskit-ch07-32-zero-noise-extrapolation.mp4", durationLabel: "3:05" }),
      L(33, "error-mitigation-lab", "Error Mitigation Lab", { contentDir: "ch07/33-error-mitigation-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792379071/ltv-quantum/quantum-programming-with-qiskit-ch07-33-error-mitigation-lab.mp4", durationLabel: "2:47" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: Building a Quantum Circuit Simulator",
    lessons: [
      L(34, "capstone-kickoff-circuit-simulator-requirements", "Capstone Kickoff: Circuit Simulator Requirements", { contentDir: "ch08/34-capstone-kickoff-circuit-simulator-requirements", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792379346/ltv-quantum/quantum-programming-with-qiskit-ch08-34-capstone-kickoff-circuit-simulator-requirements.mp4", durationLabel: "2:16" }),
      L(35, "capstone-build-the-circuit-and-simulation-layer", "Capstone: Build the Circuit & Simulation Layer", { contentDir: "ch08/35-capstone-build-the-circuit-and-simulation-layer", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792379349/ltv-quantum/quantum-programming-with-qiskit-ch08-35-capstone-build-the-circuit-and-simulation-layer.mp4", durationLabel: "2:24" }),
      L(36, "capstone-build-measurement-validation", "Capstone: Build Measurement Validation", { contentDir: "ch08/36-capstone-build-measurement-validation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792379351/ltv-quantum/quantum-programming-with-qiskit-ch08-36-capstone-build-measurement-validation.mp4", durationLabel: "2:54" }),
      L(37, "capstone-wrap-up-and-state-vector-explanation", "Capstone: Wrap-Up & State-Vector Explanation", { contentDir: "ch08/37-capstone-wrap-up-and-state-vector-explanation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792379354/ltv-quantum/quantum-programming-with-qiskit-ch08-37-capstone-wrap-up-and-state-vector-explanation.mp4", durationLabel: "3:10" }),
    ],
  },
];
