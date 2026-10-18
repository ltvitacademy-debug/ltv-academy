// Python & Scientific Computing for Quantum Applications course outline. Lessons without a
// contentDir render as "in production". Course 2 of 14 in the Quantum Computing Software
// Engineer path: the NumPy/scientific-Python fluency every later lab course assumes.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/python-scientific-computing-for-quantum/
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

export const PYTHON_SCIENTIFIC_COMPUTING_FOR_QUANTUM_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Python Refresher for Scientific Computing",
    lessons: [
      L(1, "why-python-for-quantum-computing", "Why Python for Quantum Computing", { contentDir: "ch01/01-why-python-for-quantum-computing", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792360559/ltv-quantum/python-scientific-computing-for-quantum-ch01-01-why-python-for-quantum-computing.mp4", durationLabel: "2:05" }),
      L(2, "setting-up-a-scientific-python-environment", "Setting Up a Scientific Python Environment", { contentDir: "ch01/02-setting-up-a-scientific-python-environment", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792360671/ltv-quantum/python-scientific-computing-for-quantum-ch01-02-setting-up-a-scientific-python-environment.mp4", durationLabel: "1:56" }),
      L(3, "functions-classes-and-code-organization-review", "Functions, Classes & Code Organization Review", { contentDir: "ch01/03-functions-classes-and-code-organization-review", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792360782/ltv-quantum/python-scientific-computing-for-quantum-ch01-03-functions-classes-and-code-organization-review.mp4", durationLabel: "2:02" }),
      L(4, "working-with-jupyter-notebooks", "Working With Jupyter Notebooks", { contentDir: "ch01/04-working-with-jupyter-notebooks", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792360933/ltv-quantum/python-scientific-computing-for-quantum-ch01-04-working-with-jupyter-notebooks.mp4", durationLabel: "1:48" }),
    ],
  },
  {
    n: 2,
    title: "NumPy for Linear Algebra",
    lessons: [
      L(5, "numpy-arrays-vs-python-lists", "NumPy Arrays vs. Python Lists", { contentDir: "ch02/05-numpy-arrays-vs-python-lists", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792361027/ltv-quantum/python-scientific-computing-for-quantum-ch02-05-numpy-arrays-vs-python-lists.mp4", durationLabel: "1:43" }),
      L(6, "vector-and-matrix-operations-in-numpy", "Vector & Matrix Operations in NumPy", { contentDir: "ch02/06-vector-and-matrix-operations-in-numpy", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792361136/ltv-quantum/python-scientific-computing-for-quantum-ch02-06-vector-and-matrix-operations-in-numpy.mp4", durationLabel: "2:05" }),
      L(7, "eigenvalues-and-eigenvectors-with-numpy-linalg", "Eigenvalues & Eigenvectors With numpy.linalg", { contentDir: "ch02/07-eigenvalues-and-eigenvectors-with-numpy-linalg", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792361227/ltv-quantum/python-scientific-computing-for-quantum-ch02-07-eigenvalues-and-eigenvectors-with-numpy-linalg.mp4", durationLabel: "1:51" }),
      L(8, "kronecker-products-for-multi-qubit-systems", "Kronecker Products for Multi-Qubit Systems", { contentDir: "ch02/08-kronecker-products-for-multi-qubit-systems", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792361325/ltv-quantum/python-scientific-computing-for-quantum-ch02-08-kronecker-products-for-multi-qubit-systems.mp4", durationLabel: "1:58" }),
      L(9, "numpy-linear-algebra-lab", "NumPy Linear Algebra Lab", { contentDir: "ch02/09-numpy-linear-algebra-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792361438/ltv-quantum/python-scientific-computing-for-quantum-ch02-09-numpy-linear-algebra-lab.mp4", durationLabel: "2:02" }),
    ],
  },
  {
    n: 3,
    title: "Complex Number & Matrix Computation in Python",
    lessons: [
      L(10, "complex-numbers-in-python", "Complex Numbers in Python", { contentDir: "ch03/10-complex-numbers-in-python", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792361548/ltv-quantum/python-scientific-computing-for-quantum-ch03-10-complex-numbers-in-python.mp4", durationLabel: "2:01" }),
      L(11, "unitary-and-hermitian-checks-in-code", "Unitary & Hermitian Checks in Code", { contentDir: "ch03/11-unitary-and-hermitian-checks-in-code", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792361640/ltv-quantum/python-scientific-computing-for-quantum-ch03-11-unitary-and-hermitian-checks-in-code.mp4", durationLabel: "1:59" }),
      L(12, "numerical-precision-and-floating-point-pitfalls", "Numerical Precision & Floating-Point Pitfalls", { contentDir: "ch03/12-numerical-precision-and-floating-point-pitfalls", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792361751/ltv-quantum/python-scientific-computing-for-quantum-ch03-12-numerical-precision-and-floating-point-pitfalls.mp4", durationLabel: "2:09" }),
      L(13, "complex-matrix-computation-lab", "Complex Matrix Computation Lab", { contentDir: "ch03/13-complex-matrix-computation-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792361857/ltv-quantum/python-scientific-computing-for-quantum-ch03-13-complex-matrix-computation-lab.mp4", durationLabel: "2:01" }),
    ],
  },
  {
    n: 4,
    title: "Visualization for Quantum Computing",
    lessons: [
      L(14, "matplotlib-fundamentals-for-scientific-plots", "Matplotlib Fundamentals for Scientific Plots", { contentDir: "ch04/14-matplotlib-fundamentals-for-scientific-plots", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792361956/ltv-quantum/python-scientific-computing-for-quantum-ch04-14-matplotlib-fundamentals-for-scientific-plots.mp4", durationLabel: "1:48" }),
      L(15, "plotting-probability-distributions", "Plotting Probability Distributions", { contentDir: "ch04/15-plotting-probability-distributions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792362051/ltv-quantum/python-scientific-computing-for-quantum-ch04-15-plotting-probability-distributions.mp4", durationLabel: "1:58" }),
      L(16, "visualizing-a-qubit-state-on-the-bloch-sphere", "Visualizing a Qubit State on the Bloch Sphere", { contentDir: "ch04/16-visualizing-a-qubit-state-on-the-bloch-sphere", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792362180/ltv-quantum/python-scientific-computing-for-quantum-ch04-16-visualizing-a-qubit-state-on-the-bloch-sphere.mp4", durationLabel: "2:25" }),
      L(17, "visualization-lab-measurement-histograms", "Visualization Lab: Measurement Histograms", { contentDir: "ch04/17-visualization-lab-measurement-histograms", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792362286/ltv-quantum/python-scientific-computing-for-quantum-ch04-17-visualization-lab-measurement-histograms.mp4", durationLabel: "2:14" }),
    ],
  },
  {
    n: 5,
    title: "Scientific Reproducibility & Workflow",
    lessons: [
      L(18, "random-seeds-and-reproducible-simulation", "Random Seeds & Reproducible Simulation", { contentDir: "ch05/18-random-seeds-and-reproducible-simulation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792362389/ltv-quantum/python-scientific-computing-for-quantum-ch05-18-random-seeds-and-reproducible-simulation.mp4", durationLabel: "2:06" }),
      L(19, "organizing-a-scientific-computing-project", "Organizing a Scientific Computing Project", { contentDir: "ch05/19-organizing-a-scientific-computing-project", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792362504/ltv-quantum/python-scientific-computing-for-quantum-ch05-19-organizing-a-scientific-computing-project.mp4", durationLabel: "2:10" }),
      L(20, "documenting-numerical-results-honestly", "Documenting Numerical Results Honestly", { contentDir: "ch05/20-documenting-numerical-results-honestly", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792362616/ltv-quantum/python-scientific-computing-for-quantum-ch05-20-documenting-numerical-results-honestly.mp4", durationLabel: "2:01" }),
      L(21, "version-control-for-research-code", "Version Control for Research Code", { contentDir: "ch05/21-version-control-for-research-code", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792362729/ltv-quantum/python-scientific-computing-for-quantum-ch05-21-version-control-for-research-code.mp4", durationLabel: "1:58" }),
    ],
  },
  {
    n: 6,
    title: "Capstone: A Mini Quantum Math Toolkit",
    lessons: [
      L(22, "capstone-kickoff-planning-the-toolkit", "Capstone Kickoff: Planning the Toolkit", { contentDir: "ch06/22-capstone-kickoff-planning-the-toolkit", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792362823/ltv-quantum/python-scientific-computing-for-quantum-ch06-22-capstone-kickoff-planning-the-toolkit.mp4", durationLabel: "2:03" }),
      L(23, "capstone-build-state-vector-and-gate-operations", "Capstone: Build State-Vector & Gate Operations", { contentDir: "ch06/23-capstone-build-state-vector-and-gate-operations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792362931/ltv-quantum/python-scientific-computing-for-quantum-ch06-23-capstone-build-state-vector-and-gate-operations.mp4", durationLabel: "1:59" }),
      L(24, "capstone-build-measurement-and-visualization", "Capstone: Build Measurement & Visualization", { contentDir: "ch06/24-capstone-build-measurement-and-visualization", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792363040/ltv-quantum/python-scientific-computing-for-quantum-ch06-24-capstone-build-measurement-and-visualization.mp4", durationLabel: "2:05" }),
      L(25, "capstone-wrap-up-and-code-review", "Capstone: Wrap-Up & Code Review", { contentDir: "ch06/25-capstone-wrap-up-and-code-review", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792363162/ltv-quantum/python-scientific-computing-for-quantum-ch06-25-capstone-wrap-up-and-code-review.mp4", durationLabel: "2:23" }),
    ],
  },
];
