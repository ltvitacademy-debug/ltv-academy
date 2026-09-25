// The C++ for Quantitative Developers course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Step 3 of the Quantitative Developer / Researcher path. Assumes programming experience (Python); teaches modern C++ (C++17/20) with a performance-engineering focus.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/cpp-for-quantitative-developers/
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

export const CPP_FOR_QUANTITATIVE_DEVELOPERS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "C++ Foundations",
    lessons: [
      L(1, "why-cplusplus-in-finance", "Why C++ in Finance"),
      L(2, "toolchains-compilers-and-build-systems", "Toolchains, Compilers & Build Systems"),
      L(3, "types-variables-and-control-flow", "Types, Variables & Control Flow"),
      L(4, "functions-and-references", "Functions & References"),
      L(5, "headers-compilation-and-linking", "Headers, Compilation & Linking"),
    ],
  },
  {
    n: 2,
    title: "Memory & Pointers",
    lessons: [
      L(6, "the-stack-the-heap-and-object-lifetime", "The Stack, the Heap & Object Lifetime"),
      L(7, "pointers-and-references-in-depth", "Pointers & References in Depth"),
      L(8, "smart-pointers-and-raii", "Smart Pointers & RAII"),
      L(9, "memory-bugs-and-sanitizers", "Memory Bugs & Sanitizers"),
      L(10, "move-semantics", "Move Semantics"),
    ],
  },
  {
    n: 3,
    title: "Object-Oriented & Generic C++",
    lessons: [
      L(11, "classes-and-encapsulation", "Classes & Encapsulation"),
      L(12, "inheritance-and-polymorphism", "Inheritance & Polymorphism"),
      L(13, "operator-overloading", "Operator Overloading"),
      L(14, "templates-and-generic-programming", "Templates & Generic Programming"),
      L(15, "modern-cplusplus-features-cplusplus17-20", "Modern C++ Features (C++17/20)"),
    ],
  },
  {
    n: 4,
    title: "The Standard Template Library",
    lessons: [
      L(16, "containers", "Containers"),
      L(17, "iterators-and-algorithms", "Iterators & Algorithms"),
      L(18, "strings-streams-and-i-o", "Strings, Streams & I/O"),
      L(19, "lambdas-and-functional-style", "Lambdas & Functional Style"),
      L(20, "choosing-the-right-container", "Choosing the Right Container"),
    ],
  },
  {
    n: 5,
    title: "Concurrency & Multithreading",
    lessons: [
      L(21, "threads-and-data-races", "Threads & Data Races"),
      L(22, "mutexes-locks-and-condition-variables", "Mutexes, Locks & Condition Variables"),
      L(23, "atomics-and-memory-ordering", "Atomics & Memory Ordering"),
      L(24, "thread-pools-and-task-based-parallelism", "Thread Pools & Task-Based Parallelism"),
      L(25, "lock-free-ideas-overview", "Lock-Free Ideas Overview"),
    ],
  },
  {
    n: 6,
    title: "Performance Optimization",
    lessons: [
      L(26, "measuring-performance-and-benchmarking", "Measuring Performance & Benchmarking"),
      L(27, "cpu-caches-and-data-layout", "CPU Caches & Data Layout"),
      L(28, "avoiding-allocation-and-copies", "Avoiding Allocation & Copies"),
      L(29, "compiler-optimization-and-inlining", "Compiler Optimization & Inlining"),
      L(30, "profiling-tools", "Profiling Tools"),
    ],
  },
  {
    n: 7,
    title: "Python/C++ Integration",
    lessons: [
      L(31, "calling-cplusplus-from-python-with-pybind11", "Calling C++ From Python With pybind11"),
      L(32, "exposing-numerical-code-to-numpy", "Exposing Numerical Code to NumPy"),
      L(33, "building-and-distributing-extensions", "Building & Distributing Extensions"),
      L(34, "when-to-move-code-from-python-to-cplusplus", "When to Move Code From Python to C++"),
    ],
  },
  {
    n: 8,
    title: "Capstone",
    lessons: [
      L(35, "capstone-kickoff-a-high-performance-cplusplus-pricing-library", "Capstone Kickoff: A High-Performance C++ Pricing Library"),
      L(36, "capstone-build-it", "Capstone: Build It"),
      L(37, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
