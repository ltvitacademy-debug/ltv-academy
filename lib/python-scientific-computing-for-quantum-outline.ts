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
      L(1, "why-python-for-quantum-computing", "Why Python for Quantum Computing"),
      L(2, "setting-up-a-scientific-python-environment", "Setting Up a Scientific Python Environment"),
      L(3, "functions-classes-and-code-organization-review", "Functions, Classes & Code Organization Review"),
      L(4, "working-with-jupyter-notebooks", "Working With Jupyter Notebooks"),
    ],
  },
  {
    n: 2,
    title: "NumPy for Linear Algebra",
    lessons: [
      L(5, "numpy-arrays-vs-python-lists", "NumPy Arrays vs. Python Lists"),
      L(6, "vector-and-matrix-operations-in-numpy", "Vector & Matrix Operations in NumPy"),
      L(7, "eigenvalues-and-eigenvectors-with-numpy-linalg", "Eigenvalues & Eigenvectors With numpy.linalg"),
      L(8, "kronecker-products-for-multi-qubit-systems", "Kronecker Products for Multi-Qubit Systems"),
      L(9, "numpy-linear-algebra-lab", "NumPy Linear Algebra Lab"),
    ],
  },
  {
    n: 3,
    title: "Complex Number & Matrix Computation in Python",
    lessons: [
      L(10, "complex-numbers-in-python", "Complex Numbers in Python"),
      L(11, "unitary-and-hermitian-checks-in-code", "Unitary & Hermitian Checks in Code"),
      L(12, "numerical-precision-and-floating-point-pitfalls", "Numerical Precision & Floating-Point Pitfalls"),
      L(13, "complex-matrix-computation-lab", "Complex Matrix Computation Lab"),
    ],
  },
  {
    n: 4,
    title: "Visualization for Quantum Computing",
    lessons: [
      L(14, "matplotlib-fundamentals-for-scientific-plots", "Matplotlib Fundamentals for Scientific Plots"),
      L(15, "plotting-probability-distributions", "Plotting Probability Distributions"),
      L(16, "visualizing-a-qubit-state-on-the-bloch-sphere", "Visualizing a Qubit State on the Bloch Sphere"),
      L(17, "visualization-lab-measurement-histograms", "Visualization Lab: Measurement Histograms"),
    ],
  },
  {
    n: 5,
    title: "Scientific Reproducibility & Workflow",
    lessons: [
      L(18, "random-seeds-and-reproducible-simulation", "Random Seeds & Reproducible Simulation"),
      L(19, "organizing-a-scientific-computing-project", "Organizing a Scientific Computing Project"),
      L(20, "documenting-numerical-results-honestly", "Documenting Numerical Results Honestly"),
      L(21, "version-control-for-research-code", "Version Control for Research Code"),
    ],
  },
  {
    n: 6,
    title: "Capstone: A Mini Quantum Math Toolkit",
    lessons: [
      L(22, "capstone-kickoff-planning-the-toolkit", "Capstone Kickoff: Planning the Toolkit"),
      L(23, "capstone-build-state-vector-and-gate-operations", "Capstone: Build State-Vector & Gate Operations"),
      L(24, "capstone-build-measurement-and-visualization", "Capstone: Build Measurement & Visualization"),
      L(25, "capstone-wrap-up-and-code-review", "Capstone: Wrap-Up & Code Review"),
    ],
  },
];
