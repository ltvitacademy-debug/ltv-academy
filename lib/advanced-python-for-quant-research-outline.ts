// The Advanced Python for Quantitative Research course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Step 2 of the Quantitative Developer / Researcher path. Builds on Python for Data Science; the emphasis is performance, numerical correctness, and research workflow.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/advanced-python-for-quant-research/
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

export const ADVANCED_PYTHON_FOR_QUANT_RESEARCH_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "High-Performance NumPy & pandas",
    lessons: [
      L(1, "vectorization-thinking", "Vectorization Thinking"),
      L(2, "broadcasting-and-memory-layout", "Broadcasting & Memory Layout"),
      L(3, "advanced-pandas-multiindex-and-time-series", "Advanced pandas: MultiIndex & Time Series"),
      L(4, "working-with-large-datasets", "Working With Large Datasets"),
      L(5, "parquet-arrow-and-efficient-storage", "Parquet, Arrow & Efficient Storage"),
      L(6, "polars-and-modern-dataframe-tools", "Polars & Modern DataFrame Tools"),
    ],
  },
  {
    n: 2,
    title: "Numerical Computing",
    lessons: [
      L(7, "floating-point-arithmetic-and-numerical-stability", "Floating-Point Arithmetic & Numerical Stability"),
      L(8, "scipy-for-scientific-computing", "SciPy for Scientific Computing"),
      L(9, "linear-algebra-routines-in-practice", "Linear Algebra Routines in Practice"),
      L(10, "numerical-integration-and-root-finding", "Numerical Integration & Root Finding"),
      L(11, "random-number-generation-and-reproducibility", "Random Number Generation & Reproducibility"),
    ],
  },
  {
    n: 3,
    title: "Profiling & Speeding Up Python",
    lessons: [
      L(12, "profiling-tools", "Profiling Tools"),
      L(13, "algorithmic-complexity-in-practice", "Algorithmic Complexity in Practice"),
      L(14, "numba-and-jit-compilation", "Numba & JIT Compilation"),
      L(15, "cython-basics", "Cython Basics"),
      L(16, "multiprocessing-and-parallelism", "Multiprocessing & Parallelism"),
      L(17, "when-python-is-too-slow", "When Python Is Too Slow"),
    ],
  },
  {
    n: 4,
    title: "Software Engineering for Research",
    lessons: [
      L(18, "object-oriented-design-for-quant-code", "Object-Oriented Design for Quant Code"),
      L(19, "type-hints-and-static-checking", "Type Hints & Static Checking"),
      L(20, "testing-numerical-code", "Testing Numerical Code"),
      L(21, "packaging-and-project-structure", "Packaging & Project Structure"),
      L(22, "logging-configuration-and-reproducibility", "Logging, Configuration & Reproducibility"),
    ],
  },
  {
    n: 5,
    title: "Research Frameworks & Tooling",
    lessons: [
      L(23, "jupyter-to-production-workflows", "Jupyter to Production Workflows"),
      L(24, "experiment-tracking-and-data-versioning", "Experiment Tracking & Data Versioning"),
      L(25, "building-a-research-data-layer", "Building a Research Data Layer"),
      L(26, "working-with-market-data-vendors-and-apis", "Working With Market Data Vendors & APIs"),
      L(27, "scheduling-and-automating-research-jobs", "Scheduling & Automating Research Jobs"),
    ],
  },
  {
    n: 6,
    title: "Databases & Data Access for Quants",
    lessons: [
      L(28, "sql-for-time-series-data", "SQL for Time-Series Data"),
      L(29, "columnar-and-time-series-databases", "Columnar & Time-Series Databases"),
      L(30, "kdbplus-q-and-specialized-tools-overview", "kdb+/q & Specialized Tools Overview"),
      L(31, "caching-and-data-pipelines", "Caching & Data Pipelines"),
    ],
  },
  {
    n: 7,
    title: "Capstone",
    lessons: [
      L(32, "capstone-kickoff-a-fast-reproducible-research-library", "Capstone Kickoff: A Fast, Reproducible Research Library"),
      L(33, "capstone-build-it", "Capstone: Build It"),
      L(34, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
