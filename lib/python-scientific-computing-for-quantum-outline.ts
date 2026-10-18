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
      L(1, "why-python-for-quantum-computing", "Why Python for Quantum Computing", { contentDir: "ch01/01-why-python-for-quantum-computing" }),
      L(2, "setting-up-a-scientific-python-environment", "Setting Up a Scientific Python Environment", { contentDir: "ch01/02-setting-up-a-scientific-python-environment" }),
      L(3, "functions-classes-and-code-organization-review", "Functions, Classes & Code Organization Review", { contentDir: "ch01/03-functions-classes-and-code-organization-review" }),
      L(4, "working-with-jupyter-notebooks", "Working With Jupyter Notebooks", { contentDir: "ch01/04-working-with-jupyter-notebooks" }),
    ],
  },
  {
    n: 2,
    title: "NumPy for Linear Algebra",
    lessons: [
      L(5, "numpy-arrays-vs-python-lists", "NumPy Arrays vs. Python Lists", { contentDir: "ch02/05-numpy-arrays-vs-python-lists" }),
      L(6, "vector-and-matrix-operations-in-numpy", "Vector & Matrix Operations in NumPy", { contentDir: "ch02/06-vector-and-matrix-operations-in-numpy" }),
      L(7, "eigenvalues-and-eigenvectors-with-numpy-linalg", "Eigenvalues & Eigenvectors With numpy.linalg", { contentDir: "ch02/07-eigenvalues-and-eigenvectors-with-numpy-linalg" }),
      L(8, "kronecker-products-for-multi-qubit-systems", "Kronecker Products for Multi-Qubit Systems", { contentDir: "ch02/08-kronecker-products-for-multi-qubit-systems" }),
      L(9, "numpy-linear-algebra-lab", "NumPy Linear Algebra Lab", { contentDir: "ch02/09-numpy-linear-algebra-lab" }),
    ],
  },
  {
    n: 3,
    title: "Complex Number & Matrix Computation in Python",
    lessons: [
      L(10, "complex-numbers-in-python", "Complex Numbers in Python", { contentDir: "ch03/10-complex-numbers-in-python" }),
      L(11, "unitary-and-hermitian-checks-in-code", "Unitary & Hermitian Checks in Code", { contentDir: "ch03/11-unitary-and-hermitian-checks-in-code" }),
      L(12, "numerical-precision-and-floating-point-pitfalls", "Numerical Precision & Floating-Point Pitfalls", { contentDir: "ch03/12-numerical-precision-and-floating-point-pitfalls" }),
      L(13, "complex-matrix-computation-lab", "Complex Matrix Computation Lab", { contentDir: "ch03/13-complex-matrix-computation-lab" }),
    ],
  },
  {
    n: 4,
    title: "Visualization for Quantum Computing",
    lessons: [
      L(14, "matplotlib-fundamentals-for-scientific-plots", "Matplotlib Fundamentals for Scientific Plots", { contentDir: "ch04/14-matplotlib-fundamentals-for-scientific-plots" }),
      L(15, "plotting-probability-distributions", "Plotting Probability Distributions", { contentDir: "ch04/15-plotting-probability-distributions" }),
      L(16, "visualizing-a-qubit-state-on-the-bloch-sphere", "Visualizing a Qubit State on the Bloch Sphere", { contentDir: "ch04/16-visualizing-a-qubit-state-on-the-bloch-sphere" }),
      L(17, "visualization-lab-measurement-histograms", "Visualization Lab: Measurement Histograms", { contentDir: "ch04/17-visualization-lab-measurement-histograms" }),
    ],
  },
  {
    n: 5,
    title: "Scientific Reproducibility & Workflow",
    lessons: [
      L(18, "random-seeds-and-reproducible-simulation", "Random Seeds & Reproducible Simulation", { contentDir: "ch05/18-random-seeds-and-reproducible-simulation" }),
      L(19, "organizing-a-scientific-computing-project", "Organizing a Scientific Computing Project", { contentDir: "ch05/19-organizing-a-scientific-computing-project" }),
      L(20, "documenting-numerical-results-honestly", "Documenting Numerical Results Honestly", { contentDir: "ch05/20-documenting-numerical-results-honestly" }),
      L(21, "version-control-for-research-code", "Version Control for Research Code", { contentDir: "ch05/21-version-control-for-research-code" }),
    ],
  },
  {
    n: 6,
    title: "Capstone: A Mini Quantum Math Toolkit",
    lessons: [
      L(22, "capstone-kickoff-planning-the-toolkit", "Capstone Kickoff: Planning the Toolkit", { contentDir: "ch06/22-capstone-kickoff-planning-the-toolkit" }),
      L(23, "capstone-build-state-vector-and-gate-operations", "Capstone: Build State-Vector & Gate Operations", { contentDir: "ch06/23-capstone-build-state-vector-and-gate-operations" }),
      L(24, "capstone-build-measurement-and-visualization", "Capstone: Build Measurement & Visualization", { contentDir: "ch06/24-capstone-build-measurement-and-visualization" }),
      L(25, "capstone-wrap-up-and-code-review", "Capstone: Wrap-Up & Code Review", { contentDir: "ch06/25-capstone-wrap-up-and-code-review" }),
    ],
  },
];
