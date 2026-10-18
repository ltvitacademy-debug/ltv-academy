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
      L(1, "vectors-and-vector-spaces", "Vectors & Vector Spaces"),
      L(2, "basis-span-and-linear-independence", "Basis, Span & Linear Independence"),
      L(3, "dot-products-and-norms", "Dot Products & Norms"),
      L(4, "linear-combinations-and-change-of-basis", "Linear Combinations & Change of Basis"),
      L(5, "vector-spaces-problem-solving-lab", "Vector Spaces Problem-Solving Lab"),
    ],
  },
  {
    n: 2,
    title: "Matrices & Linear Transformations",
    lessons: [
      L(6, "matrix-operations", "Matrix Operations"),
      L(7, "matrices-as-linear-transformations", "Matrices as Linear Transformations"),
      L(8, "matrix-inverses-and-determinants", "Matrix Inverses & Determinants"),
      L(9, "special-matrices-identity-diagonal-block", "Special Matrices: Identity, Diagonal & Block"),
      L(10, "matrix-transformations-problem-solving-lab", "Matrix Transformations Problem-Solving Lab"),
    ],
  },
  {
    n: 3,
    title: "Complex Numbers & Complex Vector Spaces",
    lessons: [
      L(11, "complex-numbers-fundamentals", "Complex Numbers Fundamentals"),
      L(12, "the-complex-plane-and-polar-form", "The Complex Plane & Polar Form"),
      L(13, "complex-conjugates-and-magnitude", "Complex Conjugates & Magnitude"),
      L(14, "complex-vector-spaces", "Complex Vector Spaces"),
      L(15, "complex-numbers-problem-solving-lab", "Complex Numbers Problem-Solving Lab"),
    ],
  },
  {
    n: 4,
    title: "Eigenvalues, Eigenvectors & Diagonalization",
    lessons: [
      L(16, "what-eigenvalues-and-eigenvectors-actually-mean", "What Eigenvalues & Eigenvectors Actually Mean"),
      L(17, "computing-eigenvalues-and-eigenvectors", "Computing Eigenvalues & Eigenvectors"),
      L(18, "diagonalization", "Diagonalization"),
      L(19, "why-eigenvalues-matter-for-quantum-measurement", "Why Eigenvalues Matter for Quantum Measurement"),
      L(20, "eigenvalues-problem-solving-lab", "Eigenvalues Problem-Solving Lab"),
    ],
  },
  {
    n: 5,
    title: "Inner Product Spaces, Unitary & Hermitian Operators",
    lessons: [
      L(21, "inner-products-and-the-hilbert-space-idea", "Inner Products & the Hilbert Space Idea"),
      L(22, "hermitian-operators", "Hermitian Operators"),
      L(23, "unitary-operators-and-why-quantum-gates-are-unitary", "Unitary Operators & Why Quantum Gates Are Unitary"),
      L(24, "orthonormal-bases-and-projections", "Orthonormal Bases & Projections"),
      L(25, "operators-problem-solving-lab", "Operators Problem-Solving Lab"),
    ],
  },
  {
    n: 6,
    title: "Tensor Products & Multi-Qubit Mathematics",
    lessons: [
      L(26, "what-a-tensor-product-actually-does", "What a Tensor Product Actually Does"),
      L(27, "computing-tensor-products-of-vectors-and-matrices", "Computing Tensor Products of Vectors & Matrices"),
      L(28, "multi-qubit-state-spaces", "Multi-Qubit State Spaces"),
      L(29, "tensor-products-and-entanglement-the-math-view", "Tensor Products & Entanglement: the Math View"),
      L(30, "tensor-products-problem-solving-lab", "Tensor Products Problem-Solving Lab"),
    ],
  },
  {
    n: 7,
    title: "Probability, Statistics & Calculus for Quantum Computing",
    lessons: [
      L(31, "probability-distributions-and-expectation", "Probability Distributions & Expectation"),
      L(32, "variance-and-standard-deviation-in-measurement", "Variance & Standard Deviation in Measurement"),
      L(33, "derivatives-and-differential-equations-review", "Derivatives & Differential Equations Review"),
      L(34, "complex-exponentials-and-oscillation", "Complex Exponentials & Oscillation"),
      L(35, "capstone-the-math-behind-a-real-quantum-circuit", "Capstone: The Math Behind a Real Quantum Circuit"),
    ],
  },
];
