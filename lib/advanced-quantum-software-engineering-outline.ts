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
      L(1, "why-quantum-code-needs-the-same-discipline-as-any-production-code", "Why Quantum Code Needs the Same Discipline as Any Production Code", { contentDir: "ch01/01-why-quantum-code-needs-the-same-discipline-as-any-production-code", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792360592/ltv-quantum/advanced-quantum-software-engineering-ch01-01-why-quantum-code-needs-the-same-discipline-as-any-production-code.mp4", durationLabel: "3:16" }),
      L(2, "project-structure-for-a-quantum-software-package", "Project Structure for a Quantum Software Package", { contentDir: "ch01/02-project-structure-for-a-quantum-software-package", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792360720/ltv-quantum/advanced-quantum-software-engineering-ch01-02-project-structure-for-a-quantum-software-package.mp4", durationLabel: "2:44" }),
      L(3, "dependency-management-for-quantum-sdks", "Dependency Management for Quantum SDKs", { contentDir: "ch01/03-dependency-management-for-quantum-sdks", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792360849/ltv-quantum/advanced-quantum-software-engineering-ch01-03-dependency-management-for-quantum-sdks.mp4", durationLabel: "3:00" }),
      L(4, "documentation-standards-for-quantum-code", "Documentation Standards for Quantum Code", { contentDir: "ch01/04-documentation-standards-for-quantum-code", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792360981/ltv-quantum/advanced-quantum-software-engineering-ch01-04-documentation-standards-for-quantum-code.mp4", durationLabel: "2:40" }),
    ],
  },
  {
    n: 2,
    title: "Testing & Debugging Quantum Programs",
    lessons: [
      L(5, "why-testing-a-quantum-program-is-genuinely-different", "Why Testing a Quantum Program Is Genuinely Different", { contentDir: "ch02/05-why-testing-a-quantum-program-is-genuinely-different", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792361131/ltv-quantum/advanced-quantum-software-engineering-ch02-05-why-testing-a-quantum-program-is-genuinely-different.mp4", durationLabel: "3:00" }),
      L(6, "unit-testing-circuit-construction-logic", "Unit-Testing Circuit-Construction Logic", { contentDir: "ch02/06-unit-testing-circuit-construction-logic", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792361284/ltv-quantum/advanced-quantum-software-engineering-ch02-06-unit-testing-circuit-construction-logic.mp4", durationLabel: "2:59" }),
      L(7, "statistical-testing-of-measurement-outcomes", "Statistical Testing of Measurement Outcomes", { contentDir: "ch02/07-statistical-testing-of-measurement-outcomes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792361442/ltv-quantum/advanced-quantum-software-engineering-ch02-07-statistical-testing-of-measurement-outcomes.mp4", durationLabel: "3:04" }),
      L(8, "debugging-a-circuit-that-gives-wrong-results", "Debugging a Circuit That Gives Wrong Results", { contentDir: "ch02/08-debugging-a-circuit-that-gives-wrong-results", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792361608/ltv-quantum/advanced-quantum-software-engineering-ch02-08-debugging-a-circuit-that-gives-wrong-results.mp4", durationLabel: "3:24" }),
      L(9, "testing-lab", "Testing Lab", { contentDir: "ch02/09-testing-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792361772/ltv-quantum/advanced-quantum-software-engineering-ch02-09-testing-lab.mp4", durationLabel: "3:23" }),
    ],
  },
  {
    n: 3,
    title: "Quantum Software Architecture & Design Patterns",
    lessons: [
      L(10, "separating-circuit-logic-from-execution-backend", "Separating Circuit Logic From Execution Backend", { contentDir: "ch03/10-separating-circuit-logic-from-execution-backend", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792361905/ltv-quantum/advanced-quantum-software-engineering-ch03-10-separating-circuit-logic-from-execution-backend.mp4", durationLabel: "2:55" }),
      L(11, "the-backend-abstraction-pattern", "The Backend-Abstraction Pattern", { contentDir: "ch03/11-the-backend-abstraction-pattern", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792362038/ltv-quantum/advanced-quantum-software-engineering-ch03-11-the-backend-abstraction-pattern.mp4", durationLabel: "2:45" }),
      L(12, "designing-for-multiple-sdks-qiskit-and-q-sharp-together", "Designing for Multiple SDKs: Qiskit & Q# Together", { contentDir: "ch03/12-designing-for-multiple-sdks-qiskit-and-q-sharp-together", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792362192/ltv-quantum/advanced-quantum-software-engineering-ch03-12-designing-for-multiple-sdks-qiskit-and-q-sharp-together.mp4", durationLabel: "2:57" }),
      L(13, "architecture-lab", "Architecture Lab", { contentDir: "ch03/13-architecture-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792362347/ltv-quantum/advanced-quantum-software-engineering-ch03-13-architecture-lab.mp4", durationLabel: "3:11" }),
    ],
  },
  {
    n: 4,
    title: "Version Control & Reproducibility for Quantum Research",
    lessons: [
      L(14, "version-control-practices-for-research-code", "Version Control Practices for Research Code", { contentDir: "ch04/14-version-control-practices-for-research-code", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792362474/ltv-quantum/advanced-quantum-software-engineering-ch04-14-version-control-practices-for-research-code.mp4", durationLabel: "2:33" }),
      L(15, "pinning-sdk-versions-and-why-it-matters-more-here", "Pinning SDK Versions — and Why It Matters More Here", { contentDir: "ch04/15-pinning-sdk-versions-and-why-it-matters-more-here", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792362598/ltv-quantum/advanced-quantum-software-engineering-ch04-15-pinning-sdk-versions-and-why-it-matters-more-here.mp4", durationLabel: "2:30" }),
      L(16, "recording-random-seeds-shots-and-backend-versions", "Recording Random Seeds, Shots & Backend Versions", { contentDir: "ch04/16-recording-random-seeds-shots-and-backend-versions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792362786/ltv-quantum/advanced-quantum-software-engineering-ch04-16-recording-random-seeds-shots-and-backend-versions.mp4", durationLabel: "2:52" }),
      L(17, "reproducibility-lab", "Reproducibility Lab", { contentDir: "ch04/17-reproducibility-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792362933/ltv-quantum/advanced-quantum-software-engineering-ch04-17-reproducibility-lab.mp4", durationLabel: "3:01" }),
    ],
  },
  {
    n: 5,
    title: "Performance & Resource Estimation in Practice",
    lessons: [
      L(18, "profiling-a-quantum-classical-hybrid-program", "Profiling a Quantum-Classical Hybrid Program", { contentDir: "ch05/18-profiling-a-quantum-classical-hybrid-program", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792363071/ltv-quantum/advanced-quantum-software-engineering-ch05-18-profiling-a-quantum-classical-hybrid-program.mp4", durationLabel: "2:52" }),
      L(19, "estimating-circuit-resource-requirements-before-running", "Estimating Circuit Resource Requirements Before Running", { contentDir: "ch05/19-estimating-circuit-resource-requirements-before-running", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792363216/ltv-quantum/advanced-quantum-software-engineering-ch05-19-estimating-circuit-resource-requirements-before-running.mp4", durationLabel: "3:05" }),
      L(20, "performance-lab", "Performance Lab", { contentDir: "ch05/20-performance-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792363343/ltv-quantum/advanced-quantum-software-engineering-ch05-20-performance-lab.mp4", durationLabel: "2:50" }),
    ],
  },
  {
    n: 6,
    title: "Capstone: Building a Quantum Software Library",
    lessons: [
      L(21, "capstone-kickoff-library-scope-and-requirements", "Capstone Kickoff: Library Scope & Requirements", { contentDir: "ch06/21-capstone-kickoff-library-scope-and-requirements", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792363464/ltv-quantum/advanced-quantum-software-engineering-ch06-21-capstone-kickoff-library-scope-and-requirements.mp4", durationLabel: "2:57" }),
      L(22, "capstone-build-the-core-library-and-tests", "Capstone: Build the Core Library & Tests", { contentDir: "ch06/22-capstone-build-the-core-library-and-tests", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792363576/ltv-quantum/advanced-quantum-software-engineering-ch06-22-capstone-build-the-core-library-and-tests.mp4", durationLabel: "2:26" }),
      L(23, "capstone-build-documentation-and-examples", "Capstone: Build Documentation & Examples", { contentDir: "ch06/23-capstone-build-documentation-and-examples", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792363694/ltv-quantum/advanced-quantum-software-engineering-ch06-23-capstone-build-documentation-and-examples.mp4", durationLabel: "2:40" }),
      L(24, "capstone-wrap-up-and-code-review", "Capstone: Wrap-Up & Code Review", { contentDir: "ch06/24-capstone-wrap-up-and-code-review", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792363824/ltv-quantum/advanced-quantum-software-engineering-ch06-24-capstone-wrap-up-and-code-review.mp4", durationLabel: "2:59" }),
    ],
  },
];
