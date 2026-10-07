# Script — Capstone Kickoff: A High-Performance C++ Pricing Library

## Segment 1 (title)

This is it — the project that pulls together everything from modern C++ syntax through memory management, object-oriented design, the STL, concurrency, performance tuning, and the pybind11 bridge you just finished. Over the next two lessons you'll design and build QuantPricer, a small, real pricing library you can genuinely put on a resume.

## Segment 2 (steps)

Keep the scope tight enough to finish. QuantPricer prices two things: European options, with a closed-form Black-Scholes formula and a Monte Carlo pricer as a cross-check, and fixed-rate bonds, priced by discounting their cash flows. Early exercise, a full yield curve, and any kind of graphical interface are explicitly out of scope. A capstone that does two things correctly and fast beats one that attempts everything and finishes nothing.

## Segment 3 (steps)

The design sits in three layers. A thin Python package gives callers a clean, convenient API. Underneath that, a pybind11 extension translates NumPy arrays into raw pointers and back. And underneath that is the actual C++ pricing core — and critically, that core never includes a single pybind11 header. It's a plain C++ library that happens to also be callable from Python.

## Segment 4 (code)

Before writing a single pricing formula, the requirements get written down as numbers, not adjectives. Correctness means matching published Black-Scholes values to within one part in a million. Performance means the vectorized C++ path has to beat an equivalent pure-Python loop by at least twenty times, measured with timeit. And usability means pip install just works, with a clean function signature callers can actually use.

## Segment 5 (steps)

That separation — pricing core with zero Python awareness, bindings layer as a thin translator — is what pays off twice. It means the core is unit-testable with no Python interpreter running at all, and it means the performance numbers from the requirements are actually measurable once the benchmarking lesson comes around.

## Segment 6 (outro)

Scope is set, the architecture is decided, and the requirements are numbers you can check. Next, lesson thirty-six: capstone, build it — turning this plan into real, compiling C++ and pybind11 code.
