# When Python Is Too Slow

Chapter 3 has covered five tools for making Python numerical code faster: profiling to find bottlenecks, understanding algorithmic complexity to know what's actually fixable, Numba, Cython, and multiprocessing. None of them is "the answer" on its own — each is the right tool for a different shape of problem, and reaching for the wrong one wastes effort without the payoff. This closing lesson is the decision framework that ties them together: what order to try things in, and — just as important — when "Python is slow here" isn't actually a problem worth solving.

## What you'll learn

- A concrete order of operations: profile, then vectorize, then Numba, then multiprocessing, then Cython, then (rarely) something else entirely
- Why that ordering roughly follows effort-vs-payoff, not just raw speed
- When to leave slow code alone: I/O-bound scripts, one-off research, code that already meets its latency requirement
- When speed genuinely matters: production pipelines, tight latency loops, code that runs at scale
- A single checklist that ties Lessons 12 through 16 together

## Step 1: always profile first

Every lesson in this chapter, and the checklist below, starts from the same place: measure before you act. Lesson 12's `cProfile` and `line_profiler` exist because intuition about what's slow is unreliable — the real bottleneck in a 90-second backtest might be a tiny JSON-parsing helper called in a loop, not the matrix math everyone assumes is the culprit. Skipping this step and jumping straight to "let's add Numba" risks a lot of work optimizing code that was never the actual problem.

## Step 2: check if it's a complexity problem, not a speed problem

Once you know which function is slow, Lesson 13's question comes next: is this slow because of a bad constant factor (fixable by vectorizing or compiling), or because the algorithm itself doesn't scale (an O(n²) approach applied to data that's grown past the size where that's acceptable)? A compiled O(n²) loop is still O(n²) — if the real problem is that the universe of assets grew from 50 to 5,000, no amount of Numba or Cython changes the fact that you're now doing 10,000x more work. Sometimes the fix is a genuinely different algorithm (sorting instead of pairwise comparison, a smarter data structure), not a faster version of the same one.

## Step 3: vectorize → Numba → multiprocessing → Cython, roughly in that order

Once you've confirmed it's a real bottleneck worth fixing and the algorithm's shape is sound, this is the order of increasing effort, matched against typical payoff:

1. **Vectorize** (Chapter 1's whole premise). Lowest effort, works for anything expressible as array operations, and the 15-22x constant-factor speedups measured in Lesson 13 show how much is on the table before you touch a compiler.
2. **Numba** (`@njit`), when the hot code is a genuine loop that doesn't vectorize cleanly. Low effort — one decorator — and the measured Lesson 14 benchmark showed it beating even NumPy vectorization for loop-shaped work. Remember the one-time compilation cost and that `parallel=True` isn't automatically a win.
3. **Multiprocessing**, when the work is naturally split into independent, sufficiently expensive chunks (a parameter sweep, independent simulations). Moderate effort, and — as Lesson 16's measurements showed hard — it can make things dramatically *worse* if the chunks are too small.
4. **Cython**, when you need something Numba's nopython mode structurally can't do — wrapping a C library, arbitrary Python object manipulation in the hot path, or shipping a compiled extension without a JIT dependency. Highest effort of the four: a real build step, a new (if Python-like) syntax, and the setup from Lesson 15.
5. **Rewrite the hot path in another language or service**, as a last resort — e.g. a latency-critical pricing kernel in C++ called from Python, or moving a piece of the pipeline to a dedicated service entirely. Reach for this only once the first four have been tried and the requirement genuinely demands it; it's the most effort and the most ongoing maintenance cost of any option here.

This order isn't a strict law — a team that already has Cython expertise and no Numba experience might reasonably reorder steps 2 and 4 — but as a default, it goes roughly from "an afternoon's work with broad applicability" to "a multi-day investment with a narrower set of problems it solves."

## Step 4: know when to stop

Not every slow piece of code is worth fixing. A one-off research script that takes three minutes to run once, read the result, and move on, is not a performance problem — it's a correct use of three minutes. A notebook cell that's I/O-bound (waiting on a database query or an API call) won't be meaningfully sped up by anything in this chapter, since the CPU isn't the bottleneck; that's a different problem (reducing round trips, caching, async I/O) outside this chapter's scope. The signal that something *is* worth optimizing is usually one of: it runs repeatedly (a production pipeline, a nightly job, a function called millions of times), it sits in a latency-sensitive path (anything quoting a price or responding to a live signal), or it's now blocking other work because it got slow enough to notice. "This feels slow" is a reason to profile, per Step 1 — it's not, by itself, a reason to reach for Numba.

## The Chapter 3 checklist

1. Profile (`cProfile` → `line_profiler`) to find the actual bottleneck — never guess.
2. Check whether it's a constant-factor problem or a Big-O problem; a compiled O(n²) loop is still O(n²).
3. Try vectorization first; it's usually the highest payoff for the lowest effort.
4. If a genuine loop remains, try `@njit`; warm it up before timing, and don't assume `parallel=True` helps without measuring.
5. If the work splits into independent, sufficiently large chunks, try multiprocessing; measure to confirm the chunks are big enough to be worth it.
6. Reach for Cython only when Numba's restrictions, not just its speed, are the actual blocker.
7. Before doing any of this: confirm the code is actually run often enough, or is latency-sensitive enough, to justify the effort.

## Key terms

| Term | Meaning |
|---|---|
| Effort-vs-payoff ordering | Trying lower-effort, broadly-applicable fixes (vectorization) before higher-effort, narrower ones (Cython) |
| Constant-factor problem | Slowness fixable by a faster implementation of the same algorithm |
| Complexity problem | Slowness inherent to the algorithm's growth rate, not fixable by implementation speed alone |
| I/O-bound | Bottlenecked by waiting on external resources (network, disk), not CPU — none of this chapter's tools help |
| Latency-sensitive path | Code where response time directly matters (e.g. live pricing), as opposed to a one-off script |

## Recap

The checklist for "is this worth optimizing, and how" is: profile first, distinguish a constant-factor problem from a complexity problem, then try vectorization, Numba, multiprocessing, and Cython roughly in that order of effort — and before any of it, confirm the code actually runs often enough or matters enough latency-wise to be worth the work. That closes Chapter 3 on profiling and speed. Chapter 4 turns to software engineering practices for research code, starting with object-oriented design for quant code — when a `Strategy` base class or a `PositionBook` earns its keep, and when a plain script is the better choice.
