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
      L(1, "why-quantum-code-needs-the-same-discipline-as-any-production-code", "Why Quantum Code Needs the Same Discipline as Any Production Code", { contentDir: "ch01/01-why-quantum-code-needs-the-same-discipline-as-any-production-code" }),
      L(2, "project-structure-for-a-quantum-software-package", "Project Structure for a Quantum Software Package", { contentDir: "ch01/02-project-structure-for-a-quantum-software-package" }),
      L(3, "dependency-management-for-quantum-sdks", "Dependency Management for Quantum SDKs", { contentDir: "ch01/03-dependency-management-for-quantum-sdks" }),
      L(4, "documentation-standards-for-quantum-code", "Documentation Standards for Quantum Code", { contentDir: "ch01/04-documentation-standards-for-quantum-code" }),
    ],
  },
  {
    n: 2,
    title: "Testing & Debugging Quantum Programs",
    lessons: [
      L(5, "why-testing-a-quantum-program-is-genuinely-different", "Why Testing a Quantum Program Is Genuinely Different", { contentDir: "ch02/05-why-testing-a-quantum-program-is-genuinely-different" }),
      L(6, "unit-testing-circuit-construction-logic", "Unit-Testing Circuit-Construction Logic", { contentDir: "ch02/06-unit-testing-circuit-construction-logic" }),
      L(7, "statistical-testing-of-measurement-outcomes", "Statistical Testing of Measurement Outcomes", { contentDir: "ch02/07-statistical-testing-of-measurement-outcomes" }),
      L(8, "debugging-a-circuit-that-gives-wrong-results", "Debugging a Circuit That Gives Wrong Results", { contentDir: "ch02/08-debugging-a-circuit-that-gives-wrong-results" }),
      L(9, "testing-lab", "Testing Lab", { contentDir: "ch02/09-testing-lab" }),
    ],
  },
  {
    n: 3,
    title: "Quantum Software Architecture & Design Patterns",
    lessons: [
      L(10, "separating-circuit-logic-from-execution-backend", "Separating Circuit Logic From Execution Backend", { contentDir: "ch03/10-separating-circuit-logic-from-execution-backend" }),
      L(11, "the-backend-abstraction-pattern", "The Backend-Abstraction Pattern", { contentDir: "ch03/11-the-backend-abstraction-pattern" }),
      L(12, "designing-for-multiple-sdks-qiskit-and-q-sharp-together", "Designing for Multiple SDKs: Qiskit & Q# Together", { contentDir: "ch03/12-designing-for-multiple-sdks-qiskit-and-q-sharp-together" }),
      L(13, "architecture-lab", "Architecture Lab", { contentDir: "ch03/13-architecture-lab" }),
    ],
  },
  {
    n: 4,
    title: "Version Control & Reproducibility for Quantum Research",
    lessons: [
      L(14, "version-control-practices-for-research-code", "Version Control Practices for Research Code", { contentDir: "ch04/14-version-control-practices-for-research-code" }),
      L(15, "pinning-sdk-versions-and-why-it-matters-more-here", "Pinning SDK Versions — and Why It Matters More Here", { contentDir: "ch04/15-pinning-sdk-versions-and-why-it-matters-more-here" }),
      L(16, "recording-random-seeds-shots-and-backend-versions", "Recording Random Seeds, Shots & Backend Versions", { contentDir: "ch04/16-recording-random-seeds-shots-and-backend-versions" }),
      L(17, "reproducibility-lab", "Reproducibility Lab", { contentDir: "ch04/17-reproducibility-lab" }),
    ],
  },
  {
    n: 5,
    title: "Performance & Resource Estimation in Practice",
    lessons: [
      L(18, "profiling-a-quantum-classical-hybrid-program", "Profiling a Quantum-Classical Hybrid Program", { contentDir: "ch05/18-profiling-a-quantum-classical-hybrid-program" }),
      L(19, "estimating-circuit-resource-requirements-before-running", "Estimating Circuit Resource Requirements Before Running", { contentDir: "ch05/19-estimating-circuit-resource-requirements-before-running" }),
      L(20, "performance-lab", "Performance Lab", { contentDir: "ch05/20-performance-lab" }),
    ],
  },
  {
    n: 6,
    title: "Capstone: Building a Quantum Software Library",
    lessons: [
      L(21, "capstone-kickoff-library-scope-and-requirements", "Capstone Kickoff: Library Scope & Requirements", { contentDir: "ch06/21-capstone-kickoff-library-scope-and-requirements" }),
      L(22, "capstone-build-the-core-library-and-tests", "Capstone: Build the Core Library & Tests", { contentDir: "ch06/22-capstone-build-the-core-library-and-tests" }),
      L(23, "capstone-build-documentation-and-examples", "Capstone: Build Documentation & Examples", { contentDir: "ch06/23-capstone-build-documentation-and-examples" }),
      L(24, "capstone-wrap-up-and-code-review", "Capstone: Wrap-Up & Code Review", { contentDir: "ch06/24-capstone-wrap-up-and-code-review" }),
    ],
  },
];
