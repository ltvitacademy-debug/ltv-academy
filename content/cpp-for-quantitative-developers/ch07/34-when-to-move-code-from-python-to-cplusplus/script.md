# Script — When to Move Code From Python to C++

## Segment 1 (title)

Everything so far in this chapter gave you the mechanics of crossing the Python-C++ boundary. This lesson is about judgment: when is a compiled extension actually worth the trouble, and when does it just add complexity for no real speedup?

## Segment 2 (steps)

"Python is slow" is the wrong framing. Most slow-looking Python code isn't running Python bytecode in a loop at all — it's calling into NumPy or pandas, which are already fast, compiled libraries underneath. The real question is narrower: is this specific function spending real wall-clock time in genuinely Python-interpreted, element-by-element work?

## Segment 3 (code)

Answer that with a profiler, not intuition. Run cProfile over the suspect code path. If the output shows almost all the time sitting inside a pure-Python per-path loop, that's a legitimate candidate for porting. If instead the time is dominated by a call into NumPy's random number generator or a pandas groupby, those are already C-backed — porting your wrapper around them buys you nothing.

## Segment 4 (steps)

There's also a real cost to crossing the boundary itself — every call into a compiled extension has overhead. Call a tiny function with one scalar ten million times, and that overhead can dominate the actual work. Call a vectorized function once with a ten-million-element array, and the overhead is amortized to almost nothing. The rule of thumb: port the whole loop, not just the one inner step.

## Segment 5 (code)

So the same multiplication has two completely different cost profiles depending on how you call it. A scalar function called millions of times is overhead-bound and not worth porting on its own. A vectorized function called once per batch over a huge array is compute-bound, and that's exactly the shape worth moving into C++.

## Segment 6 (outro)

That judgment — profile first, port the loop, vectorize the boundary — is exactly what you'll apply in the capstone. Up next, lesson thirty-five: capstone kickoff, where you design a real, high-performance C++ pricing library exposed to Python from the ground up.
