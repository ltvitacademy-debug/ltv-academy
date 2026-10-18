# Benchmarking Lab: Writing Up an Honest Comparison

Reading a checklist is one thing; filling out a real write-up with it is another. This lab walks through a complete, honest benchmarking document for Grover's algorithm at N=8, section by section, using only numbers already verified earlier in this course.

## What you'll learn

- A reusable six-section template for writing up any quantum-vs-classical comparison
- How to fill every section of that template completely, using real verified numbers rather than placeholders
- How to write a "bottom-line verdict" that is hedged appropriately instead of overselling or underselling the result
- How to reuse this exact template for a different algorithm (the Check Yourself exercise)

## The template

Every honest benchmarking write-up should have six sections: **Problem statement**, **Classical baseline**, **Quantum approach**, **Experimental/verified numbers**, **Honest caveats**, **Bottom-line verdict**. Below is a complete worked example filling in all six for Grover's algorithm.

## Worked example: Grover's algorithm vs. classical search at N=8

**Problem statement.** Given an unstructured search space of N=8 items with exactly one marked item, accessible only through a black-box membership test (no sorting, hashing, or index available), find the marked item using as few test invocations as possible.

**Classical baseline.** The best possible classical strategy with no structure to exploit is sequential or random probing. Worst case: 8 checks (the marked item is checked last). Average case: (N+1)/2 = 4.5 checks, from the standard uniform-position expectation argument. No classical algorithm can do better without some structural assumption about the data, by definition of the unstructured-search problem.

**Quantum approach.** Grover's algorithm (Chapter 4) initializes a uniform superposition over the 8 basis states, then applies iterations of an oracle (sign-flips the marked amplitude) followed by a diffusion operator (reflects all amplitudes about their mean). The optimal number of iterations is t* = ⌊(π/4)√N⌋, which for N=8 computes to ⌊(π/4)·2.828⌋ = ⌊2.221⌋ = 2.

**Experimental/verified numbers.** Direct matrix simulation of the oracle and diffusion operators (Chapter 4, independently re-verified) gives this exact probability trajectory:

| Iterations | P(marked) |
|---|---|
| 0 | 0.1250 |
| 1 | 0.7812 |
| 2 | 0.9453 |
| 3 | 0.3301 |
| 4 | 0.0122 |

The peak at iteration 2 (94.53%) matches the formula's prediction exactly. Classical: 8 worst-case / 4.5 average-case queries for the same problem.

**Honest caveats.** (1) Each Grover iteration is one oracle circuit execution; the real gate cost of that oracle for a *specific* search problem is not included in the "2 iterations" figure and must be assessed separately. (2) This advantage is specific to genuinely unstructured search — any available structure (sorting, hashing) lets classical algorithms win without quantum hardware. (3) The 94.53% figure assumes a noiseless circuit; real hardware error rates will lower it. (4) At N=8 the problem is small enough that quantum hardware overhead (initialization, error correction, I/O) could easily dominate any raw query-count advantage in practice — the comparison is cleanest for large N, not small N.

**Bottom-line verdict.** For a genuinely unstructured search problem at sufficient scale, Grover's algorithm provides a real, mathematically verified quadratic reduction in the number of oracle queries needed (√N vs N), confirmed here exactly for N=8 (2 vs up to 8 queries). This is not evidence that quantum computers search faster "in general" — it depends on the absence of exploitable structure, the oracle's real implementation cost, and sufficiently low hardware error rates, none of which are automatically satisfied by a real-world search task.

## Why this structure matters

Notice what the template prevents: it is impossible to fill in "Quantum approach" and "Bottom-line verdict" honestly without having already written "Classical baseline" and "Honest caveats." The structure forces the comparison to be complete before a verdict is allowed, which is exactly the discipline that casual claims about quantum advantage skip.

## Key terms

| Term | Meaning |
|---|---|
| Benchmarking template | A fixed six-section structure (problem, classical baseline, quantum approach, verified numbers, caveats, verdict) that forces completeness before conclusions |
| Bottom-line verdict | A conclusion statement that names its own conditions rather than generalizing past them |
| Worked example | A fully filled-in instance of the template, used here as the model for the capstone project |

## Check yourself

Using this exact six-section template, sketch (one or two sentences per section is enough) an honest benchmarking write-up for Shor's algorithm against the General Number Field Sieve, reusing the N=15, a=7 worked example from Chapter 5 and the RSA-2048 practicality discussion from Lesson 23.
