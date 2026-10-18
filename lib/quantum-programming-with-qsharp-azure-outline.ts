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
      L(1, "what-q-sharp-is-and-when-to-reach-for-it", "What Q# Is & When to Reach for It", { contentDir: "ch01/01-what-q-sharp-is-and-when-to-reach-for-it" }),
      L(2, "setting-up-the-q-sharp-development-environment", "Setting Up the Q# Development Environment", { contentDir: "ch01/02-setting-up-the-q-sharp-development-environment" }),
      L(3, "q-sharp-syntax-basics", "Q# Syntax Basics", { contentDir: "ch01/03-q-sharp-syntax-basics" }),
      L(4, "your-first-q-sharp-operation", "Your First Q# Operation", { contentDir: "ch01/04-your-first-q-sharp-operation" }),
      L(5, "q-sharp-fundamentals-lab", "Q# Fundamentals Lab", { contentDir: "ch01/05-q-sharp-fundamentals-lab" }),
    ],
  },
  {
    n: 2,
    title: "Q# Operations & Quantum Data Types",
    lessons: [
      L(6, "qubits-and-allocation-in-q-sharp", "Qubits & Allocation in Q#", { contentDir: "ch02/06-qubits-and-allocation-in-q-sharp" }),
      L(7, "operations-vs-functions-in-q-sharp", "Operations vs. Functions in Q#", { contentDir: "ch02/07-operations-vs-functions-in-q-sharp" }),
      L(8, "intrinsic-gates-in-q-sharp", "Intrinsic Gates in Q#", { contentDir: "ch02/08-intrinsic-gates-in-q-sharp" }),
      L(9, "controlled-and-adjoint-operations", "Controlled & Adjoint Operations", { contentDir: "ch02/09-controlled-and-adjoint-operations" }),
      L(10, "q-sharp-data-types-lab", "Q# Data Types Lab", { contentDir: "ch02/10-q-sharp-data-types-lab" }),
    ],
  },
  {
    n: 3,
    title: "Azure Quantum Workspace & Resource Estimation",
    lessons: [
      L(11, "setting-up-an-azure-quantum-workspace", "Setting Up an Azure Quantum Workspace", { contentDir: "ch03/11-setting-up-an-azure-quantum-workspace" }),
      L(12, "azure-quantum-hardware-and-simulator-providers", "Azure Quantum Hardware & Simulator Providers", { contentDir: "ch03/12-azure-quantum-hardware-and-simulator-providers" }),
      L(13, "the-azure-quantum-resource-estimator", "The Azure Quantum Resource Estimator", { contentDir: "ch03/13-the-azure-quantum-resource-estimator" }),
      L(14, "submitting-and-monitoring-jobs-in-azure-quantum", "Submitting & Monitoring Jobs in Azure Quantum", { contentDir: "ch03/14-submitting-and-monitoring-jobs-in-azure-quantum" }),
    ],
  },
  {
    n: 4,
    title: "Q# Algorithm Implementation",
    lessons: [
      L(15, "implementing-grovers-algorithm-in-q-sharp", "Implementing Grover's Algorithm in Q#", { contentDir: "ch04/15-implementing-grovers-algorithm-in-q-sharp" }),
      L(16, "implementing-quantum-fourier-transform-in-q-sharp", "Implementing Quantum Fourier Transform in Q#", { contentDir: "ch04/16-implementing-quantum-fourier-transform-in-q-sharp" }),
      L(17, "implementing-teleportation-in-q-sharp", "Implementing Teleportation in Q#", { contentDir: "ch04/17-implementing-teleportation-in-q-sharp" }),
      L(18, "q-sharp-algorithms-lab", "Q# Algorithms Lab", { contentDir: "ch04/18-q-sharp-algorithms-lab" }),
    ],
  },
  {
    n: 5,
    title: "Interoperability: Python + Q#",
    lessons: [
      L(19, "calling-q-sharp-from-python", "Calling Q# From Python", { contentDir: "ch05/19-calling-q-sharp-from-python" }),
      L(20, "the-qsharp-python-package-workflow", "The qsharp Python Package Workflow", { contentDir: "ch05/20-the-qsharp-python-package-workflow" }),
      L(21, "mixed-language-project-structure", "Mixed-Language Project Structure", { contentDir: "ch05/21-mixed-language-project-structure" }),
      L(22, "interoperability-lab", "Interoperability Lab", { contentDir: "ch05/22-interoperability-lab" }),
    ],
  },
  {
    n: 6,
    title: "Q# vs. Qiskit: Comparative Project",
    lessons: [
      L(23, "comparing-language-design-philosophies", "Comparing Language Design Philosophies", { contentDir: "ch06/23-comparing-language-design-philosophies" }),
      L(24, "comparing-resource-estimation-approaches", "Comparing Resource-Estimation Approaches", { contentDir: "ch06/24-comparing-resource-estimation-approaches" }),
      L(25, "capstone-port-a-circuit-between-qiskit-and-q-sharp", "Capstone: Port a Circuit Between Qiskit & Q#", { contentDir: "ch06/25-capstone-port-a-circuit-between-qiskit-and-q-sharp" }),
      L(26, "capstone-wrap-up-choosing-the-right-tool", "Capstone: Wrap-Up — Choosing the Right Tool", { contentDir: "ch06/26-capstone-wrap-up-choosing-the-right-tool" }),
    ],
  },
];
