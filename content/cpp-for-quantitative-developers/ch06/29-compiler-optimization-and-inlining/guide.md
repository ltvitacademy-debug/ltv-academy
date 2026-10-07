# Compiler Optimization & Inlining

Everything so far in this chapter has been about writing code the compiler can optimize well. This lesson looks at the other side: what the compiler actually does for you, and the handful of decisions (optimization level, `const`, inlining) that let it do more. The goal is not to memorize every optimization pass — it's to understand enough to stop accidentally blocking the compiler from helping you.

## What you'll learn

- Why debug builds are slow, and the optimization levels (`-O0` through `-O3`) that fix it
- What function inlining is, and why small, hot functions benefit from it most
- `inline` and compiler-specific hints, and why they are requests, not commands
- `const` and `constexpr` as information the compiler can use to optimize more aggressively

## Optimization levels

A debug build (GCC/Clang's `-O0`, the default with no flag) applies essentially no optimization, so you can step through code in a debugger line-by-line and see exactly what you wrote. That same property makes debug builds dramatically slower than necessary for anything performance-sensitive. `-O2` is the typical default for release builds — it enables most safe, beneficial optimizations (inlining, loop unrolling, dead-code elimination, and more) without the more aggressive, occasionally fragile transformations of `-O3`. For most quant code, measure `-O2` against `-O3` on your actual workload rather than assuming `-O3` is always faster — the extra transformations sometimes make no difference or occasionally even regress, depending on the code.

```
g++ -O0 pricer.cpp -o pricer_debug     # no optimization, fast to compile, slow to run
g++ -O2 pricer.cpp -o pricer_release   # the usual release choice
```

## What inlining actually does

Calling a function has real cost: pushing arguments, jumping to the function's code, jumping back, and (for a non-inlined call) possibly disrupting instruction-cache locality. **Inlining** replaces a call to a small function with a direct copy of that function's body at the call site, eliminating the call overhead entirely — and, often more importantly, opening the door to further optimization across what used to be a function boundary (the optimizer can now reason about the caller and callee's code together).

```cpp
// A small, "hot" function called millions of times in a pricing loop —
// exactly the kind of function that benefits most from inlining.
inline double mid_price(double bid, double ask) {
    return (bid + ask) * 0.5;
}
```

Inlining helps most for small functions called very frequently ("hot" functions) — the per-call overhead is a larger fraction of a tiny function's total cost, and eliminating it adds up fast across millions of calls. Inlining a large function, by contrast, can bloat the binary and hurt instruction-cache locality more than it saves in call overhead — the compiler weighs this trade-off itself.

## inline is a hint, not a command

The `inline` keyword's actual, standard-mandated job is subtly different from what the name suggests: it primarily allows a function to be defined identically in multiple translation units without violating the one-definition rule (useful for small functions defined in headers). Whether the compiler *actually* inlines a given call is a separate decision the optimizer makes based on the function's size, call frequency estimate, and optimization level — `inline` is a hint the compiler is free to ignore, and modern compilers routinely inline functions you never marked `inline` at all, and decline to inline some you did mark. Compiler-specific attributes like `[[gnu::always_inline]]` (GCC/Clang) push harder, forcing inlining except in cases where it's outright impossible — useful rarely, and only once you've measured that the compiler's own judgment was wrong for a specific hot function.

## const and constexpr help the optimizer, not just the reader

Marking a value `const` tells the compiler (and other programmers) it won't change, which can unlock optimizations the compiler couldn't otherwise safely make — for instance, hoisting a repeated read out of a loop, knowing nothing can modify it in between. `constexpr` goes further: it asks for the value to be computed at **compile time** wherever possible, so it costs nothing at runtime at all.

```cpp
constexpr double basis_points_to_decimal(double bps) {
    return bps / 10000.0;
}

constexpr double tick_size = basis_points_to_decimal(1.0);  // computed at compile time
```

`tick_size` here is baked into the binary as a literal constant — there is no runtime division at all, because the compiler evaluated the whole expression while compiling.

## Key terms

| Term | Meaning |
|---|---|
| `-O0` / `-O2` / `-O3` | Compiler optimization levels; `-O0` is debug (unoptimized), `-O2`/`-O3` are release |
| Inlining | Replacing a function call with a direct copy of its body at the call site |
| `inline` | A hint (and a one-definition-rule allowance) the compiler may ignore |
| `const` | Marks a value as unmodifiable, which can unlock additional optimizations |
| `constexpr` | Requests compile-time evaluation wherever possible, costing nothing at runtime |

## Recap

Release builds need real optimization flags, inlining removes call overhead for small hot functions (as a request the compiler ultimately controls), and `const`/`constexpr` give the compiler information it can turn into speed, sometimes eliminating runtime cost entirely. Next up, Lesson 30: Profiling Tools, where you'll learn to find out exactly which function is actually worth any of this effort in the first place.
