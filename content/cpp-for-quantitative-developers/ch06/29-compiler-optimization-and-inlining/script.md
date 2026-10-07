# Script — Compiler Optimization & Inlining

## Segment 1 (title)

Everything so far in this chapter has been about writing code the compiler can optimize well. This lesson flips to the other side of that — what the compiler actually does for you, and the handful of choices that let it do more.

## Segment 2 (code)

A debug build applies essentially no optimization, which is exactly what you want while stepping through code line by line, but it's dramatically slower than necessary for anything performance-sensitive. Minus-O-2 is the typical release default — most of the safe, beneficial optimizations, without the more aggressive and occasionally fragile transformations minus-O-3 adds. Don't just assume minus-O-3 is faster; measure it on your actual workload.

## Segment 3 (code)

Calling a function has real cost — pushing arguments, jumping to its code, jumping back. Inlining replaces that call with a direct copy of the function's body right at the call site, removing the call overhead entirely, and often more importantly, letting the optimizer reason across what used to be a function boundary. It helps most for small functions called constantly — a mid-price calculation running millions of times in a pricing loop is the textbook case.

## Segment 4 (steps)

Here's the part people get wrong: the inline keyword's real, standard-mandated job is mostly about letting a function be defined identically across multiple files without violating the one-definition rule — not about forcing inlining. Whether a given call actually gets inlined is the compiler's own decision, based on size and estimated call frequency. Modern compilers inline plenty of functions you never marked inline, and skip some you did mark. A compiler-specific always-inline attribute can force the issue, but that's a tool for after you've measured the compiler got it wrong, not a default habit.

## Segment 5 (code)

Const and constexpr aren't just documentation for the reader — they're information the optimizer can use. Const tells the compiler a value won't change, which can unlock things like hoisting a repeated read out of a loop. Constexpr goes further and asks for compile-time evaluation wherever possible. A constexpr basis-points conversion computed on a literal gets baked straight into the binary as a constant — there's no division happening at runtime at all.

## Segment 6 (outro)

Pick the right optimization level for release builds, let inlining do its job on small hot functions rather than fighting it, and feed the compiler const and constexpr information wherever it's true. Up next, lesson thirty: profiling tools — how you find out which function actually deserves any of this effort in the first place.
