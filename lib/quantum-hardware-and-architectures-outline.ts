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
      L(1, "how-a-superconducting-qubit-works", "How a Superconducting Qubit Works", { contentDir: "ch01/01-how-a-superconducting-qubit-works", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792364677/ltv-quantum/quantum-hardware-and-architectures-ch01-01-how-a-superconducting-qubit-works.mp4", durationLabel: "2:43" }),
      L(2, "transmon-qubits", "Transmon Qubits", { contentDir: "ch01/02-transmon-qubits", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792364822/ltv-quantum/quantum-hardware-and-architectures-ch01-02-transmon-qubits.mp4", durationLabel: "2:16" }),
      L(3, "coherence-times-t1-and-t2", "Coherence Times: T1 & T2", { contentDir: "ch01/03-coherence-times-t1-and-t2", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792364967/ltv-quantum/quantum-hardware-and-architectures-ch01-03-coherence-times-t1-and-t2.mp4", durationLabel: "2:43" }),
      L(4, "dilution-refrigerators-and-why-qubits-need-them", "Dilution Refrigerators & Why Qubits Need Them", { contentDir: "ch01/04-dilution-refrigerators-and-why-qubits-need-them", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792365139/ltv-quantum/quantum-hardware-and-architectures-ch01-04-dilution-refrigerators-and-why-qubits-need-them.mp4", durationLabel: "2:25" }),
      L(5, "superconducting-platforms-ibm-google-rigetti", "Superconducting Platforms: IBM, Google, Rigetti", { contentDir: "ch01/05-superconducting-platforms-ibm-google-rigetti", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792365343/ltv-quantum/quantum-hardware-and-architectures-ch01-05-superconducting-platforms-ibm-google-rigetti.mp4", durationLabel: "2:47" }),
    ],
  },
  {
    n: 2,
    title: "Trapped-Ion Qubits",
    lessons: [
      L(6, "how-a-trapped-ion-qubit-works", "How a Trapped-Ion Qubit Works", { contentDir: "ch02/06-how-a-trapped-ion-qubit-works", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792365505/ltv-quantum/quantum-hardware-and-architectures-ch02-06-how-a-trapped-ion-qubit-works.mp4", durationLabel: "2:19" }),
      L(7, "laser-control-and-gate-operations", "Laser Control & Gate Operations", { contentDir: "ch02/07-laser-control-and-gate-operations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792365667/ltv-quantum/quantum-hardware-and-architectures-ch02-07-laser-control-and-gate-operations.mp4", durationLabel: "2:21" }),
      L(8, "trapped-ion-connectivity-advantages", "Trapped-Ion Connectivity Advantages", { contentDir: "ch02/08-trapped-ion-connectivity-advantages", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792365824/ltv-quantum/quantum-hardware-and-architectures-ch02-08-trapped-ion-connectivity-advantages.mp4", durationLabel: "2:39" }),
      L(9, "trapped-ion-platforms-ionq-quantinuum", "Trapped-Ion Platforms: IonQ, Quantinuum", { contentDir: "ch02/09-trapped-ion-platforms-ionq-quantinuum", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792365965/ltv-quantum/quantum-hardware-and-architectures-ch02-09-trapped-ion-platforms-ionq-quantinuum.mp4", durationLabel: "2:39" }),
      L(10, "superconducting-vs-trapped-ion-tradeoffs", "Superconducting vs. Trapped-Ion Tradeoffs", { contentDir: "ch02/10-superconducting-vs-trapped-ion-tradeoffs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792366098/ltv-quantum/quantum-hardware-and-architectures-ch02-10-superconducting-vs-trapped-ion-tradeoffs.mp4", durationLabel: "2:44" }),
    ],
  },
  {
    n: 3,
    title: "Photonic & Neutral-Atom Quantum Computing",
    lessons: [
      L(11, "how-photonic-quantum-computing-works", "How Photonic Quantum Computing Works", { contentDir: "ch03/11-how-photonic-quantum-computing-works", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792366218/ltv-quantum/quantum-hardware-and-architectures-ch03-11-how-photonic-quantum-computing-works.mp4", durationLabel: "2:22" }),
      L(12, "photonic-platforms-and-use-cases", "Photonic Platforms & Use Cases", { contentDir: "ch03/12-photonic-platforms-and-use-cases", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792366332/ltv-quantum/quantum-hardware-and-architectures-ch03-12-photonic-platforms-and-use-cases.mp4", durationLabel: "2:38" }),
      L(13, "how-neutral-atom-qubits-work", "How Neutral-Atom Qubits Work", { contentDir: "ch03/13-how-neutral-atom-qubits-work", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792366440/ltv-quantum/quantum-hardware-and-architectures-ch03-13-how-neutral-atom-qubits-work.mp4", durationLabel: "2:14" }),
      L(14, "neutral-atom-platforms-and-scalability-claims", "Neutral-Atom Platforms & Scalability Claims", { contentDir: "ch03/14-neutral-atom-platforms-and-scalability-claims", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792366554/ltv-quantum/quantum-hardware-and-architectures-ch03-14-neutral-atom-platforms-and-scalability-claims.mp4", durationLabel: "2:26" }),
      L(15, "comparing-all-four-modalities", "Comparing All Four Modalities", { contentDir: "ch03/15-comparing-all-four-modalities", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792366677/ltv-quantum/quantum-hardware-and-architectures-ch03-15-comparing-all-four-modalities.mp4", durationLabel: "2:01" }),
    ],
  },
  {
    n: 4,
    title: "Qubit Connectivity & Hardware Topology",
    lessons: [
      L(16, "qubit-connectivity-graphs", "Qubit Connectivity Graphs", { contentDir: "ch04/16-qubit-connectivity-graphs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792366802/ltv-quantum/quantum-hardware-and-architectures-ch04-16-qubit-connectivity-graphs.mp4", durationLabel: "2:19" }),
      L(17, "why-connectivity-limits-affect-circuit-design", "Why Connectivity Limits Affect Circuit Design", { contentDir: "ch04/17-why-connectivity-limits-affect-circuit-design", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792366919/ltv-quantum/quantum-hardware-and-architectures-ch04-17-why-connectivity-limits-affect-circuit-design.mp4", durationLabel: "2:32" }),
      L(18, "swap-networks-and-routing-overhead", "SWAP Networks & Routing Overhead", { contentDir: "ch04/18-swap-networks-and-routing-overhead", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792367031/ltv-quantum/quantum-hardware-and-architectures-ch04-18-swap-networks-and-routing-overhead.mp4", durationLabel: "2:56" }),
      L(19, "topology-lab-reading-a-real-device-map", "Topology Lab: Reading a Real Device Map", { contentDir: "ch04/19-topology-lab-reading-a-real-device-map", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792367151/ltv-quantum/quantum-hardware-and-architectures-ch04-19-topology-lab-reading-a-real-device-map.mp4", durationLabel: "2:37" }),
    ],
  },
  {
    n: 5,
    title: "Control Systems & Calibration",
    lessons: [
      L(20, "classical-control-electronics-for-qubits", "Classical Control Electronics for Qubits", { contentDir: "ch05/20-classical-control-electronics-for-qubits", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792367268/ltv-quantum/quantum-hardware-and-architectures-ch05-20-classical-control-electronics-for-qubits.mp4", durationLabel: "2:27" }),
      L(21, "pulse-level-control", "Pulse-Level Control", { contentDir: "ch05/21-pulse-level-control", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792367371/ltv-quantum/quantum-hardware-and-architectures-ch05-21-pulse-level-control.mp4", durationLabel: "2:41" }),
      L(22, "calibration-and-drift", "Calibration & Drift", { contentDir: "ch05/22-calibration-and-drift", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792367465/ltv-quantum/quantum-hardware-and-architectures-ch05-22-calibration-and-drift.mp4", durationLabel: "2:32" }),
      L(23, "reading-a-backend-calibration-report", "Reading a Backend Calibration Report", { contentDir: "ch05/23-reading-a-backend-calibration-report", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792367558/ltv-quantum/quantum-hardware-and-architectures-ch05-23-reading-a-backend-calibration-report.mp4", durationLabel: "2:24" }),
    ],
  },
  {
    n: 6,
    title: "Comparing Hardware Platforms",
    lessons: [
      L(24, "metrics-that-actually-matter-qubit-count-fidelity-connectivity", "Metrics That Actually Matter: Qubit Count, Fidelity, Connectivity", { contentDir: "ch06/24-metrics-that-actually-matter-qubit-count-fidelity-connectivity", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792367655/ltv-quantum/quantum-hardware-and-architectures-ch06-24-metrics-that-actually-matter-qubit-count-fidelity-connectivity.mp4", durationLabel: "2:35" }),
      L(25, "quantum-volume-and-other-composite-benchmarks", "Quantum Volume & Other Composite Benchmarks", { contentDir: "ch06/25-quantum-volume-and-other-composite-benchmarks", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792367761/ltv-quantum/quantum-hardware-and-architectures-ch06-25-quantum-volume-and-other-composite-benchmarks.mp4", durationLabel: "2:55" }),
      L(26, "choosing-hardware-for-a-given-workload", "Choosing Hardware for a Given Workload", { contentDir: "ch06/26-choosing-hardware-for-a-given-workload", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792367860/ltv-quantum/quantum-hardware-and-architectures-ch06-26-choosing-hardware-for-a-given-workload.mp4", durationLabel: "2:33" }),
      L(27, "capstone-write-a-hardware-selection-brief", "Capstone: Write a Hardware-Selection Brief", { contentDir: "ch06/27-capstone-write-a-hardware-selection-brief", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792367959/ltv-quantum/quantum-hardware-and-architectures-ch06-27-capstone-write-a-hardware-selection-brief.mp4", durationLabel: "2:34" }),
    ],
  },
];
