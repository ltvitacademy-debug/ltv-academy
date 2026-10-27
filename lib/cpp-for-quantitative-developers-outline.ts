// The C++ for Quantitative Developers course outline. Lessons without a contentDir render as
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
      L(1, "why-cplusplus-in-finance", "Why C++ in Finance", { contentDir: "ch01/01-why-cplusplus-in-finance", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cpp-for-quantitative-developers/why-cplusplus-in-finance.mp4", durationLabel: "2 min 23 s" }),
      L(2, "toolchains-compilers-and-build-systems", "Toolchains, Compilers & Build Systems", { contentDir: "ch01/02-toolchains-compilers-and-build-systems", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cpp-for-quantitative-developers/toolchains-compilers-and-build-systems.mp4", durationLabel: "2 min 19 s" }),
      L(3, "types-variables-and-control-flow", "Types, Variables & Control Flow", { contentDir: "ch01/03-types-variables-and-control-flow", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cpp-for-quantitative-developers/types-variables-and-control-flow.mp4", durationLabel: "2 min 7 s" }),
      L(4, "functions-and-references", "Functions & References", { contentDir: "ch01/04-functions-and-references", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cpp-for-quantitative-developers/functions-and-references.mp4", durationLabel: "2 min 12 s" }),
      L(5, "headers-compilation-and-linking", "Headers, Compilation & Linking", { contentDir: "ch01/05-headers-compilation-and-linking", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cpp-for-quantitative-developers/headers-compilation-and-linking.mp4", durationLabel: "2 min 15 s" }),
    ],
  },
  {
    n: 2,
    title: "Memory & Pointers",
    lessons: [
      L(6, "the-stack-the-heap-and-object-lifetime", "The Stack, the Heap & Object Lifetime", { contentDir: "ch02/06-the-stack-the-heap-and-object-lifetime", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cpp-for-quantitative-developers/the-stack-the-heap-and-object-lifetime.mp4", durationLabel: "2 min 26 s" }),
      L(7, "pointers-and-references-in-depth", "Pointers & References in Depth", { contentDir: "ch02/07-pointers-and-references-in-depth", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cpp-for-quantitative-developers/pointers-and-references-in-depth.mp4", durationLabel: "2 min 30 s" }),
      L(8, "smart-pointers-and-raii", "Smart Pointers & RAII", { contentDir: "ch02/08-smart-pointers-and-raii", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cpp-for-quantitative-developers/smart-pointers-and-raii.mp4", durationLabel: "2 min 49 s" }),
      L(9, "memory-bugs-and-sanitizers", "Memory Bugs & Sanitizers", { contentDir: "ch02/09-memory-bugs-and-sanitizers", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cpp-for-quantitative-developers/memory-bugs-and-sanitizers.mp4", durationLabel: "2 min 35 s" }),
      L(10, "move-semantics", "Move Semantics", { contentDir: "ch02/10-move-semantics", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-cpp-for-quantitative-developers/move-semantics.mp4", durationLabel: "2 min 42 s" }),
    ],
  },
  {
    n: 3,
    title: "Object-Oriented & Generic C++",
    lessons: [
      L(11, "classes-and-encapsulation", "Classes & Encapsulation", { contentDir: "ch03/11-classes-and-encapsulation" }),
      L(12, "inheritance-and-polymorphism", "Inheritance & Polymorphism", { contentDir: "ch03/12-inheritance-and-polymorphism" }),
      L(13, "operator-overloading", "Operator Overloading", { contentDir: "ch03/13-operator-overloading" }),
      L(14, "templates-and-generic-programming", "Templates & Generic Programming", { contentDir: "ch03/14-templates-and-generic-programming" }),
      L(15, "modern-cplusplus-features-cplusplus17-20", "Modern C++ Features (C++17/20)", { contentDir: "ch03/15-modern-cplusplus-features-cplusplus17-20" }),
    ],
  },
  {
    n: 4,
    title: "The Standard Template Library",
    lessons: [
      L(16, "containers", "Containers", { contentDir: "ch04/16-containers" }),
      L(17, "iterators-and-algorithms", "Iterators & Algorithms", { contentDir: "ch04/17-iterators-and-algorithms" }),
      L(18, "strings-streams-and-i-o", "Strings, Streams & I/O", { contentDir: "ch04/18-strings-streams-and-i-o" }),
      L(19, "lambdas-and-functional-style", "Lambdas & Functional Style", { contentDir: "ch04/19-lambdas-and-functional-style" }),
      L(20, "choosing-the-right-container", "Choosing the Right Container", { contentDir: "ch04/20-choosing-the-right-container" }),
    ],
  },
  {
    n: 5,
    title: "Concurrency & Multithreading",
    lessons: [
      L(21, "threads-and-data-races", "Threads & Data Races", { contentDir: "ch05/21-threads-and-data-races" }),
      L(22, "mutexes-locks-and-condition-variables", "Mutexes, Locks & Condition Variables", { contentDir: "ch05/22-mutexes-locks-and-condition-variables" }),
      L(23, "atomics-and-memory-ordering", "Atomics & Memory Ordering", { contentDir: "ch05/23-atomics-and-memory-ordering" }),
      L(24, "thread-pools-and-task-based-parallelism", "Thread Pools & Task-Based Parallelism", { contentDir: "ch05/24-thread-pools-and-task-based-parallelism" }),
      L(25, "lock-free-ideas-overview", "Lock-Free Ideas Overview", { contentDir: "ch05/25-lock-free-ideas-overview" }),
    ],
  },
  {
    n: 6,
    title: "Performance Optimization",
    lessons: [
      L(26, "measuring-performance-and-benchmarking", "Measuring Performance & Benchmarking", { contentDir: "ch06/26-measuring-performance-and-benchmarking" }),
      L(27, "cpu-caches-and-data-layout", "CPU Caches & Data Layout", { contentDir: "ch06/27-cpu-caches-and-data-layout" }),
      L(28, "avoiding-allocation-and-copies", "Avoiding Allocation & Copies", { contentDir: "ch06/28-avoiding-allocation-and-copies" }),
      L(29, "compiler-optimization-and-inlining", "Compiler Optimization & Inlining", { contentDir: "ch06/29-compiler-optimization-and-inlining" }),
      L(30, "profiling-tools", "Profiling Tools", { contentDir: "ch06/30-profiling-tools" }),
    ],
  },
  {
    n: 7,
    title: "Python/C++ Integration",
    lessons: [
      L(31, "calling-cplusplus-from-python-with-pybind11", "Calling C++ From Python With pybind11", { contentDir: "ch07/31-calling-cplusplus-from-python-with-pybind11" }),
      L(32, "exposing-numerical-code-to-numpy", "Exposing Numerical Code to NumPy", { contentDir: "ch07/32-exposing-numerical-code-to-numpy" }),
      L(33, "building-and-distributing-extensions", "Building & Distributing Extensions", { contentDir: "ch07/33-building-and-distributing-extensions" }),
      L(34, "when-to-move-code-from-python-to-cplusplus", "When to Move Code From Python to C++", { contentDir: "ch07/34-when-to-move-code-from-python-to-cplusplus" }),
    ],
  },
  {
    n: 8,
    title: "Capstone",
    lessons: [
      L(35, "capstone-kickoff-a-high-performance-cplusplus-pricing-library", "Capstone Kickoff: A High-Performance C++ Pricing Library", { contentDir: "ch08/35-capstone-kickoff-a-high-performance-cplusplus-pricing-library" }),
      L(36, "capstone-build-it", "Capstone: Build It", { contentDir: "ch08/36-capstone-build-it" }),
      L(37, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch08/37-capstone-wrap-up-and-portfolio-presentation" }),
    ],
  },
  {
    n: 9,
    title: "Networking, Allocators & Latency Engineering",
    lessons: [
      L(38, "linux-sockets-fundamentals", "Linux Sockets Fundamentals", { contentDir: "ch09/38-linux-sockets-fundamentals" }),
      L(39, "tcp-in-practice-framing-nagle-and-backpressure", "TCP in Practice: Framing, Nagle's Algorithm & Backpressure", { contentDir: "ch09/39-tcp-in-practice-framing-nagle-and-backpressure" }),
      L(40, "udp-and-non-blocking-io", "UDP & Non-Blocking I/O", { contentDir: "ch09/40-udp-and-non-blocking-io" }),
      L(41, "custom-allocators-arena-and-pool-allocation", "Custom Allocators: Arena & Pool Allocation", { contentDir: "ch09/41-custom-allocators-arena-and-pool-allocation" }),
      L(42, "percentile-latency-and-throughput-benchmarking", "Percentile Latency & Throughput Benchmarking", { contentDir: "ch09/42-percentile-latency-and-throughput-benchmarking" }),
      L(43, "capstone-building-and-benchmarking-a-market-data-processor", "Capstone: Building & Benchmarking a Market-Data Processor", { contentDir: "ch09/43-capstone-building-and-benchmarking-a-market-data-processor" }),
    ],
  },
];
