// Advanced Quantum Software Engineering course outline. Lessons without a contentDir render as
// "in production". Course 13 of 14 in the Quantum Computing Software Engineer path: real
// software-engineering discipline (testing, architecture, reproducibility) applied to quantum code.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/advanced-quantum-software-engineering/
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

export const ADVANCED_QUANTUM_SOFTWARE_ENGINEERING_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Software Engineering Practices for Quantum Code",
    lessons: [
      L(1, "why-quantum-code-needs-the-same-discipline-as-any-production-code", "Why Quantum Code Needs the Same Discipline as Any Production Code"),
      L(2, "project-structure-for-a-quantum-software-package", "Project Structure for a Quantum Software Package"),
      L(3, "dependency-management-for-quantum-sdks", "Dependency Management for Quantum SDKs"),
      L(4, "documentation-standards-for-quantum-code", "Documentation Standards for Quantum Code"),
    ],
  },
  {
    n: 2,
    title: "Testing & Debugging Quantum Programs",
    lessons: [
      L(5, "why-testing-a-quantum-program-is-genuinely-different", "Why Testing a Quantum Program Is Genuinely Different"),
      L(6, "unit-testing-circuit-construction-logic", "Unit-Testing Circuit-Construction Logic"),
      L(7, "statistical-testing-of-measurement-outcomes", "Statistical Testing of Measurement Outcomes"),
      L(8, "debugging-a-circuit-that-gives-wrong-results", "Debugging a Circuit That Gives Wrong Results"),
      L(9, "testing-lab", "Testing Lab"),
    ],
  },
  {
    n: 3,
    title: "Quantum Software Architecture & Design Patterns",
    lessons: [
      L(10, "separating-circuit-logic-from-execution-backend", "Separating Circuit Logic From Execution Backend"),
      L(11, "the-backend-abstraction-pattern", "The Backend-Abstraction Pattern"),
      L(12, "designing-for-multiple-sdks-qiskit-and-q-sharp-together", "Designing for Multiple SDKs: Qiskit & Q# Together"),
      L(13, "architecture-lab", "Architecture Lab"),
    ],
  },
  {
    n: 4,
    title: "Version Control & Reproducibility for Quantum Research",
    lessons: [
      L(14, "version-control-practices-for-research-code", "Version Control Practices for Research Code"),
      L(15, "pinning-sdk-versions-and-why-it-matters-more-here", "Pinning SDK Versions — and Why It Matters More Here"),
      L(16, "recording-random-seeds-shots-and-backend-versions", "Recording Random Seeds, Shots & Backend Versions"),
      L(17, "reproducibility-lab", "Reproducibility Lab"),
    ],
  },
  {
    n: 5,
    title: "Performance & Resource Estimation in Practice",
    lessons: [
      L(18, "profiling-a-quantum-classical-hybrid-program", "Profiling a Quantum-Classical Hybrid Program"),
      L(19, "estimating-circuit-resource-requirements-before-running", "Estimating Circuit Resource Requirements Before Running"),
      L(20, "performance-lab", "Performance Lab"),
    ],
  },
  {
    n: 6,
    title: "Capstone: Building a Quantum Software Library",
    lessons: [
      L(21, "capstone-kickoff-library-scope-and-requirements", "Capstone Kickoff: Library Scope & Requirements"),
      L(22, "capstone-build-the-core-library-and-tests", "Capstone: Build the Core Library & Tests"),
      L(23, "capstone-build-documentation-and-examples", "Capstone: Build Documentation & Examples"),
      L(24, "capstone-wrap-up-and-code-review", "Capstone: Wrap-Up & Code Review"),
    ],
  },
];
