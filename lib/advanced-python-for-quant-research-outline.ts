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
      L(1, "vectorization-thinking", "Vectorization Thinking", { contentDir: "ch01/01-vectorization-thinking" }),
      L(2, "broadcasting-and-memory-layout", "Broadcasting & Memory Layout", { contentDir: "ch01/02-broadcasting-and-memory-layout" }),
      L(3, "advanced-pandas-multiindex-and-time-series", "Advanced pandas: MultiIndex & Time Series", { contentDir: "ch01/03-advanced-pandas-multiindex-and-time-series" }),
      L(4, "working-with-large-datasets", "Working With Large Datasets", { contentDir: "ch01/04-working-with-large-datasets" }),
      L(5, "parquet-arrow-and-efficient-storage", "Parquet, Arrow & Efficient Storage", { contentDir: "ch01/05-parquet-arrow-and-efficient-storage" }),
      L(6, "polars-and-modern-dataframe-tools", "Polars & Modern DataFrame Tools", { contentDir: "ch01/06-polars-and-modern-dataframe-tools" }),
    ],
  },
  {
    n: 2,
    title: "Numerical Computing",
    lessons: [
      L(7, "floating-point-arithmetic-and-numerical-stability", "Floating-Point Arithmetic & Numerical Stability", { contentDir: "ch02/07-floating-point-arithmetic-and-numerical-stability" }),
      L(8, "scipy-for-scientific-computing", "SciPy for Scientific Computing", { contentDir: "ch02/08-scipy-for-scientific-computing" }),
      L(9, "linear-algebra-routines-in-practice", "Linear Algebra Routines in Practice", { contentDir: "ch02/09-linear-algebra-routines-in-practice" }),
      L(10, "numerical-integration-and-root-finding", "Numerical Integration & Root Finding", { contentDir: "ch02/10-numerical-integration-and-root-finding" }),
      L(11, "random-number-generation-and-reproducibility", "Random Number Generation & Reproducibility", { contentDir: "ch02/11-random-number-generation-and-reproducibility" }),
    ],
  },
  {
    n: 3,
    title: "Profiling & Speeding Up Python",
    lessons: [
      L(12, "profiling-tools", "Profiling Tools", { contentDir: "ch03/12-profiling-tools" }),
      L(13, "algorithmic-complexity-in-practice", "Algorithmic Complexity in Practice", { contentDir: "ch03/13-algorithmic-complexity-in-practice" }),
      L(14, "numba-and-jit-compilation", "Numba & JIT Compilation", { contentDir: "ch03/14-numba-and-jit-compilation" }),
      L(15, "cython-basics", "Cython Basics", { contentDir: "ch03/15-cython-basics" }),
      L(16, "multiprocessing-and-parallelism", "Multiprocessing & Parallelism", { contentDir: "ch03/16-multiprocessing-and-parallelism" }),
      L(17, "when-python-is-too-slow", "When Python Is Too Slow", { contentDir: "ch03/17-when-python-is-too-slow" }),
    ],
  },
  {
    n: 4,
    title: "Software Engineering for Research",
    lessons: [
      L(18, "object-oriented-design-for-quant-code", "Object-Oriented Design for Quant Code", { contentDir: "ch04/18-object-oriented-design-for-quant-code" }),
      L(19, "type-hints-and-static-checking", "Type Hints & Static Checking", { contentDir: "ch04/19-type-hints-and-static-checking" }),
      L(20, "testing-numerical-code", "Testing Numerical Code", { contentDir: "ch04/20-testing-numerical-code" }),
      L(21, "packaging-and-project-structure", "Packaging & Project Structure", { contentDir: "ch04/21-packaging-and-project-structure" }),
      L(22, "logging-configuration-and-reproducibility", "Logging, Configuration & Reproducibility", { contentDir: "ch04/22-logging-configuration-and-reproducibility" }),
    ],
  },
  {
    n: 5,
    title: "Research Frameworks & Tooling",
    lessons: [
      L(23, "jupyter-to-production-workflows", "Jupyter to Production Workflows", { contentDir: "ch05/23-jupyter-to-production-workflows" }),
      L(24, "experiment-tracking-and-data-versioning", "Experiment Tracking & Data Versioning", { contentDir: "ch05/24-experiment-tracking-and-data-versioning" }),
      L(25, "building-a-research-data-layer", "Building a Research Data Layer", { contentDir: "ch05/25-building-a-research-data-layer" }),
      L(26, "working-with-market-data-vendors-and-apis", "Working With Market Data Vendors & APIs", { contentDir: "ch05/26-working-with-market-data-vendors-and-apis" }),
      L(27, "scheduling-and-automating-research-jobs", "Scheduling & Automating Research Jobs", { contentDir: "ch05/27-scheduling-and-automating-research-jobs" }),
    ],
  },
  {
    n: 6,
    title: "Databases & Data Access for Quants",
    lessons: [
      L(28, "sql-for-time-series-data", "SQL for Time-Series Data", { contentDir: "ch06/28-sql-for-time-series-data" }),
      L(29, "columnar-and-time-series-databases", "Columnar & Time-Series Databases", { contentDir: "ch06/29-columnar-and-time-series-databases" }),
      L(30, "kdbplus-q-and-specialized-tools-overview", "kdb+/q & Specialized Tools Overview", { contentDir: "ch06/30-kdbplus-q-and-specialized-tools-overview" }),
      L(31, "caching-and-data-pipelines", "Caching & Data Pipelines", { contentDir: "ch06/31-caching-and-data-pipelines" }),
    ],
  },
  {
    n: 7,
    title: "Capstone",
    lessons: [
      L(32, "capstone-kickoff-a-fast-reproducible-research-library", "Capstone Kickoff: A Fast, Reproducible Research Library", { contentDir: "ch07/32-capstone-kickoff-a-fast-reproducible-research-library" }),
      L(33, "capstone-build-it", "Capstone: Build It", { contentDir: "ch07/33-capstone-build-it" }),
      L(34, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch07/34-capstone-wrap-up-and-portfolio-presentation" }),
    ],
  },
];
