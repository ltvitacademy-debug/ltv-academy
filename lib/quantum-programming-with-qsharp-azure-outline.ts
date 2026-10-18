// Quantum Programming with Q# & Azure Quantum course outline. Lessons without a contentDir
// render as "in production". Course 6 of 14 in the Quantum Computing Software Engineer path:
// the second major vendor toolchain, giving students real breadth beyond Qiskit alone.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/quantum-programming-with-qsharp-azure/
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

export const QUANTUM_PROGRAMMING_WITH_QSHARP_AZURE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Q# Language Fundamentals",
    lessons: [
      L(1, "what-q-sharp-is-and-when-to-reach-for-it", "What Q# Is & When to Reach for It", { contentDir: "ch01/01-what-q-sharp-is-and-when-to-reach-for-it", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792360680/ltv-quantum/quantum-programming-with-qsharp-azure-ch01-01-what-q-sharp-is-and-when-to-reach-for-it.mp4", durationLabel: "3:03" }),
      L(2, "setting-up-the-q-sharp-development-environment", "Setting Up the Q# Development Environment", { contentDir: "ch01/02-setting-up-the-q-sharp-development-environment", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792360806/ltv-quantum/quantum-programming-with-qsharp-azure-ch01-02-setting-up-the-q-sharp-development-environment.mp4", durationLabel: "2:44" }),
      L(3, "q-sharp-syntax-basics", "Q# Syntax Basics", { contentDir: "ch01/03-q-sharp-syntax-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792360932/ltv-quantum/quantum-programming-with-qsharp-azure-ch01-03-q-sharp-syntax-basics.mp4", durationLabel: "2:46" }),
      L(4, "your-first-q-sharp-operation", "Your First Q# Operation", { contentDir: "ch01/04-your-first-q-sharp-operation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792361052/ltv-quantum/quantum-programming-with-qsharp-azure-ch01-04-your-first-q-sharp-operation.mp4", durationLabel: "2:45" }),
      L(5, "q-sharp-fundamentals-lab", "Q# Fundamentals Lab", { contentDir: "ch01/05-q-sharp-fundamentals-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792361170/ltv-quantum/quantum-programming-with-qsharp-azure-ch01-05-q-sharp-fundamentals-lab.mp4", durationLabel: "2:37" }),
    ],
  },
  {
    n: 2,
    title: "Q# Operations & Quantum Data Types",
    lessons: [
      L(6, "qubits-and-allocation-in-q-sharp", "Qubits & Allocation in Q#", { contentDir: "ch02/06-qubits-and-allocation-in-q-sharp", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792361326/ltv-quantum/quantum-programming-with-qsharp-azure-ch02-06-qubits-and-allocation-in-q-sharp.mp4", durationLabel: "2:40" }),
      L(7, "operations-vs-functions-in-q-sharp", "Operations vs. Functions in Q#", { contentDir: "ch02/07-operations-vs-functions-in-q-sharp", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792361451/ltv-quantum/quantum-programming-with-qsharp-azure-ch02-07-operations-vs-functions-in-q-sharp.mp4", durationLabel: "2:26" }),
      L(8, "intrinsic-gates-in-q-sharp", "Intrinsic Gates in Q#", { contentDir: "ch02/08-intrinsic-gates-in-q-sharp", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792361591/ltv-quantum/quantum-programming-with-qsharp-azure-ch02-08-intrinsic-gates-in-q-sharp.mp4", durationLabel: "2:55" }),
      L(9, "controlled-and-adjoint-operations", "Controlled & Adjoint Operations", { contentDir: "ch02/09-controlled-and-adjoint-operations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792361720/ltv-quantum/quantum-programming-with-qsharp-azure-ch02-09-controlled-and-adjoint-operations.mp4", durationLabel: "2:46" }),
      L(10, "q-sharp-data-types-lab", "Q# Data Types Lab", { contentDir: "ch02/10-q-sharp-data-types-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792361864/ltv-quantum/quantum-programming-with-qsharp-azure-ch02-10-q-sharp-data-types-lab.mp4", durationLabel: "3:17" }),
    ],
  },
  {
    n: 3,
    title: "Azure Quantum Workspace & Resource Estimation",
    lessons: [
      L(11, "setting-up-an-azure-quantum-workspace", "Setting Up an Azure Quantum Workspace", { contentDir: "ch03/11-setting-up-an-azure-quantum-workspace", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792361999/ltv-quantum/quantum-programming-with-qsharp-azure-ch03-11-setting-up-an-azure-quantum-workspace.mp4", durationLabel: "2:15" }),
      L(12, "azure-quantum-hardware-and-simulator-providers", "Azure Quantum Hardware & Simulator Providers", { contentDir: "ch03/12-azure-quantum-hardware-and-simulator-providers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792362113/ltv-quantum/quantum-programming-with-qsharp-azure-ch03-12-azure-quantum-hardware-and-simulator-providers.mp4", durationLabel: "2:39" }),
      L(13, "the-azure-quantum-resource-estimator", "The Azure Quantum Resource Estimator", { contentDir: "ch03/13-the-azure-quantum-resource-estimator", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792362231/ltv-quantum/quantum-programming-with-qsharp-azure-ch03-13-the-azure-quantum-resource-estimator.mp4", durationLabel: "2:36" }),
      L(14, "submitting-and-monitoring-jobs-in-azure-quantum", "Submitting & Monitoring Jobs in Azure Quantum", { contentDir: "ch03/14-submitting-and-monitoring-jobs-in-azure-quantum", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792362371/ltv-quantum/quantum-programming-with-qsharp-azure-ch03-14-submitting-and-monitoring-jobs-in-azure-quantum.mp4", durationLabel: "2:53" }),
    ],
  },
  {
    n: 4,
    title: "Q# Algorithm Implementation",
    lessons: [
      L(15, "implementing-grovers-algorithm-in-q-sharp", "Implementing Grover's Algorithm in Q#", { contentDir: "ch04/15-implementing-grovers-algorithm-in-q-sharp", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792362510/ltv-quantum/quantum-programming-with-qsharp-azure-ch04-15-implementing-grovers-algorithm-in-q-sharp.mp4", durationLabel: "2:31" }),
      L(16, "implementing-quantum-fourier-transform-in-q-sharp", "Implementing Quantum Fourier Transform in Q#", { contentDir: "ch04/16-implementing-quantum-fourier-transform-in-q-sharp", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792362640/ltv-quantum/quantum-programming-with-qsharp-azure-ch04-16-implementing-quantum-fourier-transform-in-q-sharp.mp4", durationLabel: "2:47" }),
      L(17, "implementing-teleportation-in-q-sharp", "Implementing Teleportation in Q#", { contentDir: "ch04/17-implementing-teleportation-in-q-sharp", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792362777/ltv-quantum/quantum-programming-with-qsharp-azure-ch04-17-implementing-teleportation-in-q-sharp.mp4", durationLabel: "2:54" }),
      L(18, "q-sharp-algorithms-lab", "Q# Algorithms Lab", { contentDir: "ch04/18-q-sharp-algorithms-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792362910/ltv-quantum/quantum-programming-with-qsharp-azure-ch04-18-q-sharp-algorithms-lab.mp4", durationLabel: "2:46" }),
    ],
  },
  {
    n: 5,
    title: "Interoperability: Python + Q#",
    lessons: [
      L(19, "calling-q-sharp-from-python", "Calling Q# From Python", { contentDir: "ch05/19-calling-q-sharp-from-python", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792363026/ltv-quantum/quantum-programming-with-qsharp-azure-ch05-19-calling-q-sharp-from-python.mp4", durationLabel: "2:05" }),
      L(20, "the-qsharp-python-package-workflow", "The qsharp Python Package Workflow", { contentDir: "ch05/20-the-qsharp-python-package-workflow", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792363148/ltv-quantum/quantum-programming-with-qsharp-azure-ch05-20-the-qsharp-python-package-workflow.mp4", durationLabel: "2:30" }),
      L(21, "mixed-language-project-structure", "Mixed-Language Project Structure", { contentDir: "ch05/21-mixed-language-project-structure", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792363264/ltv-quantum/quantum-programming-with-qsharp-azure-ch05-21-mixed-language-project-structure.mp4", durationLabel: "2:48" }),
      L(22, "interoperability-lab", "Interoperability Lab", { contentDir: "ch05/22-interoperability-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792363370/ltv-quantum/quantum-programming-with-qsharp-azure-ch05-22-interoperability-lab.mp4", durationLabel: "2:25" }),
    ],
  },
  {
    n: 6,
    title: "Q# vs. Qiskit: Comparative Project",
    lessons: [
      L(23, "comparing-language-design-philosophies", "Comparing Language Design Philosophies", { contentDir: "ch06/23-comparing-language-design-philosophies", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792363499/ltv-quantum/quantum-programming-with-qsharp-azure-ch06-23-comparing-language-design-philosophies.mp4", durationLabel: "2:55" }),
      L(24, "comparing-resource-estimation-approaches", "Comparing Resource-Estimation Approaches", { contentDir: "ch06/24-comparing-resource-estimation-approaches", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792363600/ltv-quantum/quantum-programming-with-qsharp-azure-ch06-24-comparing-resource-estimation-approaches.mp4", durationLabel: "2:20" }),
      L(25, "capstone-port-a-circuit-between-qiskit-and-q-sharp", "Capstone: Port a Circuit Between Qiskit & Q#", { contentDir: "ch06/25-capstone-port-a-circuit-between-qiskit-and-q-sharp", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792363719/ltv-quantum/quantum-programming-with-qsharp-azure-ch06-25-capstone-port-a-circuit-between-qiskit-and-q-sharp.mp4", durationLabel: "2:54" }),
      L(26, "capstone-wrap-up-choosing-the-right-tool", "Capstone: Wrap-Up — Choosing the Right Tool", { contentDir: "ch06/26-capstone-wrap-up-choosing-the-right-tool", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792363836/ltv-quantum/quantum-programming-with-qsharp-azure-ch06-26-capstone-wrap-up-choosing-the-right-tool.mp4", durationLabel: "2:40" }),
    ],
  },
];
