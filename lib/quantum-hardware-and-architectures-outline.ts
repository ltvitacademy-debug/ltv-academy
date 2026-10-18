// Quantum Hardware & Architectures course outline. Lessons without a contentDir render as
// "in production". Course 8 of 14 in the Quantum Computing Software Engineer path: the real
// physical platforms behind the gates and circuits taught so far, and their honest tradeoffs.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/quantum-hardware-and-architectures/
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

export const QUANTUM_HARDWARE_AND_ARCHITECTURES_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Superconducting Qubits",
    lessons: [
      L(1, "how-a-superconducting-qubit-works", "How a Superconducting Qubit Works", { contentDir: "ch01/01-how-a-superconducting-qubit-works" }),
      L(2, "transmon-qubits", "Transmon Qubits", { contentDir: "ch01/02-transmon-qubits" }),
      L(3, "coherence-times-t1-and-t2", "Coherence Times: T1 & T2", { contentDir: "ch01/03-coherence-times-t1-and-t2" }),
      L(4, "dilution-refrigerators-and-why-qubits-need-them", "Dilution Refrigerators & Why Qubits Need Them", { contentDir: "ch01/04-dilution-refrigerators-and-why-qubits-need-them" }),
      L(5, "superconducting-platforms-ibm-google-rigetti", "Superconducting Platforms: IBM, Google, Rigetti", { contentDir: "ch01/05-superconducting-platforms-ibm-google-rigetti" }),
    ],
  },
  {
    n: 2,
    title: "Trapped-Ion Qubits",
    lessons: [
      L(6, "how-a-trapped-ion-qubit-works", "How a Trapped-Ion Qubit Works", { contentDir: "ch02/06-how-a-trapped-ion-qubit-works" }),
      L(7, "laser-control-and-gate-operations", "Laser Control & Gate Operations", { contentDir: "ch02/07-laser-control-and-gate-operations" }),
      L(8, "trapped-ion-connectivity-advantages", "Trapped-Ion Connectivity Advantages", { contentDir: "ch02/08-trapped-ion-connectivity-advantages" }),
      L(9, "trapped-ion-platforms-ionq-quantinuum", "Trapped-Ion Platforms: IonQ, Quantinuum", { contentDir: "ch02/09-trapped-ion-platforms-ionq-quantinuum" }),
      L(10, "superconducting-vs-trapped-ion-tradeoffs", "Superconducting vs. Trapped-Ion Tradeoffs", { contentDir: "ch02/10-superconducting-vs-trapped-ion-tradeoffs" }),
    ],
  },
  {
    n: 3,
    title: "Photonic & Neutral-Atom Quantum Computing",
    lessons: [
      L(11, "how-photonic-quantum-computing-works", "How Photonic Quantum Computing Works", { contentDir: "ch03/11-how-photonic-quantum-computing-works" }),
      L(12, "photonic-platforms-and-use-cases", "Photonic Platforms & Use Cases", { contentDir: "ch03/12-photonic-platforms-and-use-cases" }),
      L(13, "how-neutral-atom-qubits-work", "How Neutral-Atom Qubits Work", { contentDir: "ch03/13-how-neutral-atom-qubits-work" }),
      L(14, "neutral-atom-platforms-and-scalability-claims", "Neutral-Atom Platforms & Scalability Claims", { contentDir: "ch03/14-neutral-atom-platforms-and-scalability-claims" }),
      L(15, "comparing-all-four-modalities", "Comparing All Four Modalities", { contentDir: "ch03/15-comparing-all-four-modalities" }),
    ],
  },
  {
    n: 4,
    title: "Qubit Connectivity & Hardware Topology",
    lessons: [
      L(16, "qubit-connectivity-graphs", "Qubit Connectivity Graphs", { contentDir: "ch04/16-qubit-connectivity-graphs" }),
      L(17, "why-connectivity-limits-affect-circuit-design", "Why Connectivity Limits Affect Circuit Design", { contentDir: "ch04/17-why-connectivity-limits-affect-circuit-design" }),
      L(18, "swap-networks-and-routing-overhead", "SWAP Networks & Routing Overhead", { contentDir: "ch04/18-swap-networks-and-routing-overhead" }),
      L(19, "topology-lab-reading-a-real-device-map", "Topology Lab: Reading a Real Device Map", { contentDir: "ch04/19-topology-lab-reading-a-real-device-map" }),
    ],
  },
  {
    n: 5,
    title: "Control Systems & Calibration",
    lessons: [
      L(20, "classical-control-electronics-for-qubits", "Classical Control Electronics for Qubits", { contentDir: "ch05/20-classical-control-electronics-for-qubits" }),
      L(21, "pulse-level-control", "Pulse-Level Control", { contentDir: "ch05/21-pulse-level-control" }),
      L(22, "calibration-and-drift", "Calibration & Drift", { contentDir: "ch05/22-calibration-and-drift" }),
      L(23, "reading-a-backend-calibration-report", "Reading a Backend Calibration Report", { contentDir: "ch05/23-reading-a-backend-calibration-report" }),
    ],
  },
  {
    n: 6,
    title: "Comparing Hardware Platforms",
    lessons: [
      L(24, "metrics-that-actually-matter-qubit-count-fidelity-connectivity", "Metrics That Actually Matter: Qubit Count, Fidelity, Connectivity", { contentDir: "ch06/24-metrics-that-actually-matter-qubit-count-fidelity-connectivity" }),
      L(25, "quantum-volume-and-other-composite-benchmarks", "Quantum Volume & Other Composite Benchmarks", { contentDir: "ch06/25-quantum-volume-and-other-composite-benchmarks" }),
      L(26, "choosing-hardware-for-a-given-workload", "Choosing Hardware for a Given Workload", { contentDir: "ch06/26-choosing-hardware-for-a-given-workload" }),
      L(27, "capstone-write-a-hardware-selection-brief", "Capstone: Write a Hardware-Selection Brief", { contentDir: "ch06/27-capstone-write-a-hardware-selection-brief" }),
    ],
  },
];
