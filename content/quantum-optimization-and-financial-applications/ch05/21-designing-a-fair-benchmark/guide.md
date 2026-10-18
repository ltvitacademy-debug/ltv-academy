# Designing a Fair Benchmark

Lesson 20 gave you real classical baselines. This lesson is about the discipline of comparing a quantum method against them fairly — because it is remarkably easy, even without any intent to mislead, to construct a comparison that looks like a quantum win but isn't one.

## What you'll learn

- The four most common ways quantum-vs-classical benchmarks go wrong, each with a concrete illustration
- What "same problem instance, same success criterion" actually requires in practice
- Why wall-clock time and iteration/query count are both necessary, and neither is sufficient alone
- How to account for classical pre- and post-processing time that's often left out of quantum benchmark claims
- A checklist you can apply before trusting (or publishing) any optimization benchmark

## Four ways benchmarks go wrong

**1. Comparing against a weak classical baseline.** If "classical" in a benchmark means an unoptimized greedy search (Lesson 20 showed this fails 25% of the time on a trivial 5-node graph) rather than simulated annealing or a tuned commercial solver, a quantum method can look impressive purely by beating a strawman. The fix: always benchmark against the *best* classical method reasonably available for the problem class, not an easy one.

**2. Reporting query count without query cost.** Lesson 16's amplitude estimation discussion showed exactly this trap: "1,000x fewer queries" sounds decisive, but if each quantum query is dramatically slower or noisier than a classical sample, the query-count comparison alone is misleading. The fix: report wall-clock time (or a clearly justified proxy for it) alongside, or instead of, raw query/iteration counts.

**3. Cherry-picking problem size or instance.** A quantum method might outperform classical baselines on a small, specially structured problem instance while losing badly (or being untestable) at realistic scale. Chapter 2's QAOA depth-vs-approximation-ratio result (Lesson 9: ratio 0.75 at p=1, ≈1.0 at p=2, on a tiny 4-node graph) is a legitimate result at that size — but it would be a cherry-pick to present it as evidence of anything about a 1,000-node version of the same graph without separately testing that scale. The fix: report the problem sizes tested explicitly, and never imply scale-invariance without evidence.

**4. Excluding classical overhead that's actually part of the pipeline.** A full quantum optimization pipeline includes classical steps: building the QUBO, converting to Ising form, constructing the circuit, and running the classical parameter optimizer (Lesson 8) across potentially hundreds of circuit evaluations. If a benchmark times only the "quantum part" and ignores the classical optimizer's wall-clock cost, it's comparing an incomplete pipeline against a complete classical one. The fix: time the entire pipeline, end to end, on both sides of the comparison.

## What "same instance, same success criterion" requires

A fair comparison needs the quantum and classical methods to be solving the *literal same problem instance* (same graph, same QUBO coefficients, same constraints) and to be judged by the *same success criterion*. If the quantum method's "success" is defined as "approximation ratio ≥ 0.9" while the classical method's success is "found the provable optimum," those are different bars, and a comparison across them doesn't actually tell you which method is better — only that they were asked different questions. The practical fix is to pick one shared, explicit criterion in advance (e.g., "best solution found within X seconds of wall-clock time, evaluated as approximation ratio against the known or best-found optimum") and apply it identically to every method being compared.

## Wall-clock time and query count: both necessary, neither sufficient

Query/iteration count tells you about an algorithm's intrinsic scaling behavior (useful for Lesson 16's "quadratic speedup" kind of claim) — but says nothing about practical usefulness until you know the per-query cost. Wall-clock time tells you about practical usefulness *today*, on *specific* hardware — but can obscure a real asymptotic advantage that just hasn't materialized yet because current hardware is still small or noisy. A rigorous benchmark reports both, labeled clearly, rather than picking whichever one makes the point the author wants to make.

## A checklist before trusting any benchmark

Before accepting a quantum-vs-classical optimization benchmark as meaningful, check: (1) Is the classical baseline the strongest reasonably available method, not a weak one? (2) Is the comparison metric (wall-clock time, query count, or both) clearly specified and applied identically to both sides? (3) Is the tested problem size representative of what's claimed, or a cherry-picked favorable case? (4) Does the timing/cost accounting include the full pipeline on both sides, including classical pre/post-processing? A benchmark that answers all four transparently is rare, genuinely useful, and worth taking seriously — which is exactly the standard Lesson 22 applies to the current state of the field, and the standard you'll apply yourself in the Lesson 23 lab.

## Key terms

| Term | Meaning |
|---|---|
| Weak baseline | A classical comparison method that is not the strongest reasonably available, which can make a quantum result look better than it is |
| Query cost vs. query count | The distinction between how many oracle calls/iterations an algorithm needs versus how expensive each one actually is in practice |
| Success criterion | The explicit, shared standard (e.g., approximation ratio threshold, provable optimum) both sides of a benchmark must be judged against identically |
| Pipeline accounting | Including the full cost of a method, including classical pre/post-processing steps, rather than isolating only the most favorable component |
| Cherry-picked instance | A specially chosen or small problem instance used to showcase a result that may not generalize to realistic scale |

## Check yourself

A paper claims "our QAOA implementation found a better Max-Cut solution than classical search in fewer iterations." Using this lesson's four failure modes and the checklist, list the specific questions you would need answered about this claim before deciding whether it represents a fair, meaningful benchmark.
