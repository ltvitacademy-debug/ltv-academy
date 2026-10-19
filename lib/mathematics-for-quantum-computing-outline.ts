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
      L(1, "vectors-and-vector-spaces", "Vectors & Vector Spaces", { contentDir: "ch01/01-vectors-and-vector-spaces", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792372518/ltv-quantum/mathematics-for-quantum-computing-ch01-01-vectors-and-vector-spaces.mp4", durationLabel: "1:53" }),
      L(2, "basis-span-and-linear-independence", "Basis, Span & Linear Independence", { contentDir: "ch01/02-basis-span-and-linear-independence", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792372701/ltv-quantum/mathematics-for-quantum-computing-ch01-02-basis-span-and-linear-independence.mp4", durationLabel: "1:56" }),
      L(3, "dot-products-and-norms", "Dot Products & Norms", { contentDir: "ch01/03-dot-products-and-norms", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792372782/ltv-quantum/mathematics-for-quantum-computing-ch01-03-dot-products-and-norms.mp4", durationLabel: "2:07" }),
      L(4, "linear-combinations-and-change-of-basis", "Linear Combinations & Change of Basis", { contentDir: "ch01/04-linear-combinations-and-change-of-basis", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792372867/ltv-quantum/mathematics-for-quantum-computing-ch01-04-linear-combinations-and-change-of-basis.mp4", durationLabel: "2:02" }),
      L(5, "vector-spaces-problem-solving-lab", "Vector Spaces Problem-Solving Lab", { contentDir: "ch01/05-vector-spaces-problem-solving-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792372956/ltv-quantum/mathematics-for-quantum-computing-ch01-05-vector-spaces-problem-solving-lab.mp4", durationLabel: "1:56" }),
    ],
  },
  {
    n: 2,
    title: "Matrices & Linear Transformations",
    lessons: [
      L(6, "matrix-operations", "Matrix Operations", { contentDir: "ch02/06-matrix-operations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792373171/ltv-quantum/mathematics-for-quantum-computing-ch02-06-matrix-operations.mp4", durationLabel: "1:53" }),
      L(7, "matrices-as-linear-transformations", "Matrices as Linear Transformations", { contentDir: "ch02/07-matrices-as-linear-transformations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792373280/ltv-quantum/mathematics-for-quantum-computing-ch02-07-matrices-as-linear-transformations.mp4", durationLabel: "2:02" }),
      L(8, "matrix-inverses-and-determinants", "Matrix Inverses & Determinants", { contentDir: "ch02/08-matrix-inverses-and-determinants", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792373373/ltv-quantum/mathematics-for-quantum-computing-ch02-08-matrix-inverses-and-determinants.mp4", durationLabel: "1:43" }),
      L(9, "special-matrices-identity-diagonal-block", "Special Matrices: Identity, Diagonal & Block", { contentDir: "ch02/09-special-matrices-identity-diagonal-block", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792373463/ltv-quantum/mathematics-for-quantum-computing-ch02-09-special-matrices-identity-diagonal-block.mp4", durationLabel: "1:49" }),
      L(10, "matrix-transformations-problem-solving-lab", "Matrix Transformations Problem-Solving Lab", { contentDir: "ch02/10-matrix-transformations-problem-solving-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792373567/ltv-quantum/mathematics-for-quantum-computing-ch02-10-matrix-transformations-problem-solving-lab.mp4", durationLabel: "2:05" }),
    ],
  },
  {
    n: 3,
    title: "Complex Numbers & Complex Vector Spaces",
    lessons: [
      L(11, "complex-numbers-fundamentals", "Complex Numbers Fundamentals", { contentDir: "ch03/11-complex-numbers-fundamentals", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792373810/ltv-quantum/mathematics-for-quantum-computing-ch03-11-complex-numbers-fundamentals.mp4", durationLabel: "2:09" }),
      L(12, "the-complex-plane-and-polar-form", "The Complex Plane & Polar Form", { contentDir: "ch03/12-the-complex-plane-and-polar-form", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792373935/ltv-quantum/mathematics-for-quantum-computing-ch03-12-the-complex-plane-and-polar-form.mp4", durationLabel: "2:21" }),
      L(13, "complex-conjugates-and-magnitude", "Complex Conjugates & Magnitude", { contentDir: "ch03/13-complex-conjugates-and-magnitude", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792374030/ltv-quantum/mathematics-for-quantum-computing-ch03-13-complex-conjugates-and-magnitude.mp4", durationLabel: "1:51" }),
      L(14, "complex-vector-spaces", "Complex Vector Spaces", { contentDir: "ch03/14-complex-vector-spaces", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792374112/ltv-quantum/mathematics-for-quantum-computing-ch03-14-complex-vector-spaces.mp4", durationLabel: "1:58" }),
      L(15, "complex-numbers-problem-solving-lab", "Complex Numbers Problem-Solving Lab", { contentDir: "ch03/15-complex-numbers-problem-solving-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792374189/ltv-quantum/mathematics-for-quantum-computing-ch03-15-complex-numbers-problem-solving-lab.mp4", durationLabel: "1:52" }),
    ],
  },
  {
    n: 4,
    title: "Eigenvalues, Eigenvectors & Diagonalization",
    lessons: [
      L(16, "what-eigenvalues-and-eigenvectors-actually-mean", "What Eigenvalues & Eigenvectors Actually Mean", { contentDir: "ch04/16-what-eigenvalues-and-eigenvectors-actually-mean", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792374441/ltv-quantum/mathematics-for-quantum-computing-ch04-16-what-eigenvalues-and-eigenvectors-actually-mean.mp4", durationLabel: "2:09" }),
      L(17, "computing-eigenvalues-and-eigenvectors", "Computing Eigenvalues & Eigenvectors", { contentDir: "ch04/17-computing-eigenvalues-and-eigenvectors", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792374547/ltv-quantum/mathematics-for-quantum-computing-ch04-17-computing-eigenvalues-and-eigenvectors.mp4", durationLabel: "2:06" }),
      L(18, "diagonalization", "Diagonalization", { contentDir: "ch04/18-diagonalization", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792374653/ltv-quantum/mathematics-for-quantum-computing-ch04-18-diagonalization.mp4", durationLabel: "2:01" }),
      L(19, "why-eigenvalues-matter-for-quantum-measurement", "Why Eigenvalues Matter for Quantum Measurement", { contentDir: "ch04/19-why-eigenvalues-matter-for-quantum-measurement", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792374761/ltv-quantum/mathematics-for-quantum-computing-ch04-19-why-eigenvalues-matter-for-quantum-measurement.mp4", durationLabel: "2:26" }),
      L(20, "eigenvalues-problem-solving-lab", "Eigenvalues Problem-Solving Lab", { contentDir: "ch04/20-eigenvalues-problem-solving-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792374835/ltv-quantum/mathematics-for-quantum-computing-ch04-20-eigenvalues-problem-solving-lab.mp4", durationLabel: "2:02" }),
    ],
  },
  {
    n: 5,
    title: "Inner Product Spaces, Unitary & Hermitian Operators",
    lessons: [
      L(21, "inner-products-and-the-hilbert-space-idea", "Inner Products & the Hilbert Space Idea", { contentDir: "ch05/21-inner-products-and-the-hilbert-space-idea", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792375095/ltv-quantum/mathematics-for-quantum-computing-ch05-21-inner-products-and-the-hilbert-space-idea.mp4", durationLabel: "2:28" }),
      L(22, "hermitian-operators", "Hermitian Operators", { contentDir: "ch05/22-hermitian-operators", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792375212/ltv-quantum/mathematics-for-quantum-computing-ch05-22-hermitian-operators.mp4", durationLabel: "2:29" }),
      L(23, "unitary-operators-and-why-quantum-gates-are-unitary", "Unitary Operators & Why Quantum Gates Are Unitary", { contentDir: "ch05/23-unitary-operators-and-why-quantum-gates-are-unitary", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792375331/ltv-quantum/mathematics-for-quantum-computing-ch05-23-unitary-operators-and-why-quantum-gates-are-unitary.mp4", durationLabel: "2:16" }),
      L(24, "orthonormal-bases-and-projections", "Orthonormal Bases & Projections", { contentDir: "ch05/24-orthonormal-bases-and-projections", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792375421/ltv-quantum/mathematics-for-quantum-computing-ch05-24-orthonormal-bases-and-projections.mp4", durationLabel: "2:19" }),
      L(25, "operators-problem-solving-lab", "Operators Problem-Solving Lab", { contentDir: "ch05/25-operators-problem-solving-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792375506/ltv-quantum/mathematics-for-quantum-computing-ch05-25-operators-problem-solving-lab.mp4", durationLabel: "1:58" }),
    ],
  },
  {
    n: 6,
    title: "Tensor Products & Multi-Qubit Mathematics",
    lessons: [
      L(26, "what-a-tensor-product-actually-does", "What a Tensor Product Actually Does", { contentDir: "ch06/26-what-a-tensor-product-actually-does", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792375745/ltv-quantum/mathematics-for-quantum-computing-ch06-26-what-a-tensor-product-actually-does.mp4", durationLabel: "1:57" }),
      L(27, "computing-tensor-products-of-vectors-and-matrices", "Computing Tensor Products of Vectors & Matrices", { contentDir: "ch06/27-computing-tensor-products-of-vectors-and-matrices", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792375863/ltv-quantum/mathematics-for-quantum-computing-ch06-27-computing-tensor-products-of-vectors-and-matrices.mp4", durationLabel: "2:14" }),
      L(28, "multi-qubit-state-spaces", "Multi-Qubit State Spaces", { contentDir: "ch06/28-multi-qubit-state-spaces", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792375961/ltv-quantum/mathematics-for-quantum-computing-ch06-28-multi-qubit-state-spaces.mp4", durationLabel: "1:59" }),
      L(29, "tensor-products-and-entanglement-the-math-view", "Tensor Products & Entanglement: the Math View", { contentDir: "ch06/29-tensor-products-and-entanglement-the-math-view", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792376047/ltv-quantum/mathematics-for-quantum-computing-ch06-29-tensor-products-and-entanglement-the-math-view.mp4", durationLabel: "2:12" }),
      L(30, "tensor-products-problem-solving-lab", "Tensor Products Problem-Solving Lab", { contentDir: "ch06/30-tensor-products-problem-solving-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792376130/ltv-quantum/mathematics-for-quantum-computing-ch06-30-tensor-products-problem-solving-lab.mp4", durationLabel: "1:49" }),
    ],
  },
  {
    n: 7,
    title: "Probability, Statistics & Calculus for Quantum Computing",
    lessons: [
      L(31, "probability-distributions-and-expectation", "Probability Distributions & Expectation", { contentDir: "ch07/31-probability-distributions-and-expectation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792376363/ltv-quantum/mathematics-for-quantum-computing-ch07-31-probability-distributions-and-expectation.mp4", durationLabel: "2:05" }),
      L(32, "variance-and-standard-deviation-in-measurement", "Variance & Standard Deviation in Measurement", { contentDir: "ch07/32-variance-and-standard-deviation-in-measurement", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792376463/ltv-quantum/mathematics-for-quantum-computing-ch07-32-variance-and-standard-deviation-in-measurement.mp4", durationLabel: "2:08" }),
      L(33, "derivatives-and-differential-equations-review", "Derivatives & Differential Equations Review", { contentDir: "ch07/33-derivatives-and-differential-equations-review", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792376553/ltv-quantum/mathematics-for-quantum-computing-ch07-33-derivatives-and-differential-equations-review.mp4", durationLabel: "1:47" }),
      L(34, "complex-exponentials-and-oscillation", "Complex Exponentials & Oscillation", { contentDir: "ch07/34-complex-exponentials-and-oscillation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792376657/ltv-quantum/mathematics-for-quantum-computing-ch07-34-complex-exponentials-and-oscillation.mp4", durationLabel: "2:08" }),
      L(35, "capstone-the-math-behind-a-real-quantum-circuit", "Capstone: The Math Behind a Real Quantum Circuit", { contentDir: "ch07/35-capstone-the-math-behind-a-real-quantum-circuit", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792376766/ltv-quantum/mathematics-for-quantum-computing-ch07-35-capstone-the-math-behind-a-real-quantum-circuit.mp4", durationLabel: "2:18" }),
    ],
  },
];
