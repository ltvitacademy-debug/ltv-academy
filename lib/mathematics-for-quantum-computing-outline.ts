// Mathematics for Quantum Computing course outline. Lessons without a contentDir render as
// "in production". Course 1 of 14 in the Quantum Computing Software Engineer path: the linear
// algebra, complex numbers, and probability foundation every later quantum course assumes.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/mathematics-for-quantum-computing/
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

export const MATHEMATICS_FOR_QUANTUM_COMPUTING_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Linear Algebra Foundations",
    lessons: [
      L(1, "vectors-and-vector-spaces", "Vectors & Vector Spaces", { contentDir: "ch01/01-vectors-and-vector-spaces" }),
      L(2, "basis-span-and-linear-independence", "Basis, Span & Linear Independence", { contentDir: "ch01/02-basis-span-and-linear-independence" }),
      L(3, "dot-products-and-norms", "Dot Products & Norms", { contentDir: "ch01/03-dot-products-and-norms" }),
      L(4, "linear-combinations-and-change-of-basis", "Linear Combinations & Change of Basis", { contentDir: "ch01/04-linear-combinations-and-change-of-basis" }),
      L(5, "vector-spaces-problem-solving-lab", "Vector Spaces Problem-Solving Lab", { contentDir: "ch01/05-vector-spaces-problem-solving-lab" }),
    ],
  },
  {
    n: 2,
    title: "Matrices & Linear Transformations",
    lessons: [
      L(6, "matrix-operations", "Matrix Operations", { contentDir: "ch02/06-matrix-operations" }),
      L(7, "matrices-as-linear-transformations", "Matrices as Linear Transformations", { contentDir: "ch02/07-matrices-as-linear-transformations" }),
      L(8, "matrix-inverses-and-determinants", "Matrix Inverses & Determinants", { contentDir: "ch02/08-matrix-inverses-and-determinants" }),
      L(9, "special-matrices-identity-diagonal-block", "Special Matrices: Identity, Diagonal & Block", { contentDir: "ch02/09-special-matrices-identity-diagonal-block" }),
      L(10, "matrix-transformations-problem-solving-lab", "Matrix Transformations Problem-Solving Lab", { contentDir: "ch02/10-matrix-transformations-problem-solving-lab" }),
    ],
  },
  {
    n: 3,
    title: "Complex Numbers & Complex Vector Spaces",
    lessons: [
      L(11, "complex-numbers-fundamentals", "Complex Numbers Fundamentals", { contentDir: "ch03/11-complex-numbers-fundamentals" }),
      L(12, "the-complex-plane-and-polar-form", "The Complex Plane & Polar Form", { contentDir: "ch03/12-the-complex-plane-and-polar-form" }),
      L(13, "complex-conjugates-and-magnitude", "Complex Conjugates & Magnitude", { contentDir: "ch03/13-complex-conjugates-and-magnitude" }),
      L(14, "complex-vector-spaces", "Complex Vector Spaces", { contentDir: "ch03/14-complex-vector-spaces" }),
      L(15, "complex-numbers-problem-solving-lab", "Complex Numbers Problem-Solving Lab", { contentDir: "ch03/15-complex-numbers-problem-solving-lab" }),
    ],
  },
  {
    n: 4,
    title: "Eigenvalues, Eigenvectors & Diagonalization",
    lessons: [
      L(16, "what-eigenvalues-and-eigenvectors-actually-mean", "What Eigenvalues & Eigenvectors Actually Mean", { contentDir: "ch04/16-what-eigenvalues-and-eigenvectors-actually-mean" }),
      L(17, "computing-eigenvalues-and-eigenvectors", "Computing Eigenvalues & Eigenvectors", { contentDir: "ch04/17-computing-eigenvalues-and-eigenvectors" }),
      L(18, "diagonalization", "Diagonalization", { contentDir: "ch04/18-diagonalization" }),
      L(19, "why-eigenvalues-matter-for-quantum-measurement", "Why Eigenvalues Matter for Quantum Measurement", { contentDir: "ch04/19-why-eigenvalues-matter-for-quantum-measurement" }),
      L(20, "eigenvalues-problem-solving-lab", "Eigenvalues Problem-Solving Lab", { contentDir: "ch04/20-eigenvalues-problem-solving-lab" }),
    ],
  },
  {
    n: 5,
    title: "Inner Product Spaces, Unitary & Hermitian Operators",
    lessons: [
      L(21, "inner-products-and-the-hilbert-space-idea", "Inner Products & the Hilbert Space Idea", { contentDir: "ch05/21-inner-products-and-the-hilbert-space-idea" }),
      L(22, "hermitian-operators", "Hermitian Operators", { contentDir: "ch05/22-hermitian-operators" }),
      L(23, "unitary-operators-and-why-quantum-gates-are-unitary", "Unitary Operators & Why Quantum Gates Are Unitary", { contentDir: "ch05/23-unitary-operators-and-why-quantum-gates-are-unitary" }),
      L(24, "orthonormal-bases-and-projections", "Orthonormal Bases & Projections", { contentDir: "ch05/24-orthonormal-bases-and-projections" }),
      L(25, "operators-problem-solving-lab", "Operators Problem-Solving Lab", { contentDir: "ch05/25-operators-problem-solving-lab" }),
    ],
  },
  {
    n: 6,
    title: "Tensor Products & Multi-Qubit Mathematics",
    lessons: [
      L(26, "what-a-tensor-product-actually-does", "What a Tensor Product Actually Does", { contentDir: "ch06/26-what-a-tensor-product-actually-does" }),
      L(27, "computing-tensor-products-of-vectors-and-matrices", "Computing Tensor Products of Vectors & Matrices", { contentDir: "ch06/27-computing-tensor-products-of-vectors-and-matrices" }),
      L(28, "multi-qubit-state-spaces", "Multi-Qubit State Spaces", { contentDir: "ch06/28-multi-qubit-state-spaces" }),
      L(29, "tensor-products-and-entanglement-the-math-view", "Tensor Products & Entanglement: the Math View", { contentDir: "ch06/29-tensor-products-and-entanglement-the-math-view" }),
      L(30, "tensor-products-problem-solving-lab", "Tensor Products Problem-Solving Lab", { contentDir: "ch06/30-tensor-products-problem-solving-lab" }),
    ],
  },
  {
    n: 7,
    title: "Probability, Statistics & Calculus for Quantum Computing",
    lessons: [
      L(31, "probability-distributions-and-expectation", "Probability Distributions & Expectation", { contentDir: "ch07/31-probability-distributions-and-expectation" }),
      L(32, "variance-and-standard-deviation-in-measurement", "Variance & Standard Deviation in Measurement", { contentDir: "ch07/32-variance-and-standard-deviation-in-measurement" }),
      L(33, "derivatives-and-differential-equations-review", "Derivatives & Differential Equations Review", { contentDir: "ch07/33-derivatives-and-differential-equations-review" }),
      L(34, "complex-exponentials-and-oscillation", "Complex Exponentials & Oscillation", { contentDir: "ch07/34-complex-exponentials-and-oscillation" }),
      L(35, "capstone-the-math-behind-a-real-quantum-circuit", "Capstone: The Math Behind a Real Quantum Circuit", { contentDir: "ch07/35-capstone-the-math-behind-a-real-quantum-circuit" }),
    ],
  },
];
