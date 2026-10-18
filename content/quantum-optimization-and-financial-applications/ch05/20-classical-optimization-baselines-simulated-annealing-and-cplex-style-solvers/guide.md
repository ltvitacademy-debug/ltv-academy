# Classical Optimization Baselines: Simulated Annealing & Solver-Style Methods

You cannot honestly evaluate a quantum optimization result without a real classical baseline to compare it against. This lesson builds that baseline directly: greedy local search, caught getting stuck, and simulated annealing, directly demonstrated escaping that exact same trap.

## What you'll learn

- Why greedy local search gets stuck in local optima, demonstrated on a concrete example
- How simulated annealing's "accept worse moves sometimes" mechanism escapes those traps
- A directly-run comparison: both methods started from the identical point, with different outcomes
- What commercial solver-style methods (branch-and-bound, as used in CPLEX/Gurobi-class tools) add beyond heuristics
- Why these classical methods are the real competition any quantum result must be measured against

## Greedy local search, caught getting stuck

Recall the 5-node graph from Chapter 1's lab (Lesson 5): nodes {0,1,2,3,4}, edges {(0,1),(0,2),(1,2),(1,3),(2,4),(3,4)}, true maximum cut = 5 (one edge of the triangle 0-1-2 can never be cut). Greedy local search — starting from an assignment and repeatedly flipping whichever single bit most improves the cut, stopping when no single flip helps — was run from all 32 possible starting points. The result, confirmed by direct computation: **24 of 32 starting points (75%) reached the true optimum of 5**, but **8 of 32 (25%) got stuck at a local optimum of only 4**. One specific stuck example: starting from x = (0,1,0,0,0), greedy converges to x = (0,1,1,0,0) with cut = 4 — a point where no single bit flip improves the cut, but which isn't the global best.

## Simulated annealing, directly shown escaping the same trap

Simulated annealing (SA) differs from greedy search in exactly one mechanism: instead of only ever accepting a move that improves the current solution, it sometimes accepts a *worse* move, with a probability that depends on a temperature parameter T (which starts high and gradually cools): a worsening move of size Δ is accepted with probability e^(Δ/T). Early on, when T is high, SA accepts a lot of worsening moves, letting it explore broadly; as T cools, it becomes progressively more greedy, settling into a strong local optimum by the end.

Running SA from the **exact same starting point** where greedy got stuck — x = (0,1,0,0,0) — with an initial temperature T=2.0, cooling rate 0.95 per step, over 100 steps: SA found the true optimum of **5**, reaching x = (0,0,1,1,0). A representative trajectory from this run (recorded every 10 steps) shows exactly how: cut=4 at step 0, cut=3 at step 10 (SA *accepted a worsening move* here — exactly the mechanism greedy forbids), cut=4 at step 20, and cut=5 by step 30, holding there through step 40. Repeating this run across 5 different random seeds, all 5 runs found the true optimum of 5 — this wasn't a lucky one-off result.

| Starting point | Greedy result | Simulated annealing result (5 seeds) |
|---|---|---|
| x = (0,1,0,0,0) | Stuck at cut=4 | Cut=5 on all 5 runs |

This is the textbook demonstration of why SA is a stronger classical heuristic than plain greedy search: the willingness to temporarily accept a worse solution is precisely what lets it escape a trap that greedy cannot.

## What commercial solvers add

Tools like CPLEX and Gurobi (industry-standard commercial optimization solvers) use a fundamentally different strategy for problems that can be written as integer or mixed-integer programs: **branch-and-bound**, which systematically partitions the search space, computes provable upper and lower bounds on each partition, and prunes away any partition whose bound proves it cannot contain the optimum. Unlike greedy search or simulated annealing, branch-and-bound (when run to completion) delivers a **provably optimal** answer, not just a good one — the tradeoff is that for very large or poorly structured problems, the search tree can still grow too large to finish in reasonable time, at which point these solvers report the best bound-certified solution found so far along with a guaranteed gap to the true optimum (a transparency heuristic methods like SA generally cannot offer).

## Why this is the real competition

Any claim that a quantum algorithm "solves" or "approximates" a combinatorial optimization problem well needs to be benchmarked against exactly these classical tools — not against an unoptimized brute-force search, and not against nothing at all. Simulated annealing and its relatives (tabu search, genetic algorithms) are the realistic heuristic competition; branch-and-bound solvers are the realistic exact-answer competition when problems are small or structured enough. Lesson 21 formalizes exactly how to run that comparison fairly.

## Key terms

| Term | Meaning |
|---|---|
| Greedy local search | A search method that only accepts moves improving the current solution, stopping at the first local optimum found |
| Simulated annealing | A heuristic that sometimes accepts worsening moves (with probability e^(Δ/T)) to escape local optima, cooling over time to converge |
| Local optimum | A solution where no small change (e.g. single bit flip) improves the result, but which may not be the global best |
| Branch-and-bound | An exact algorithmic strategy (used in CPLEX, Gurobi) that partitions and prunes the search space using provable bounds, guaranteeing optimality when run to completion |
| Temperature (SA) | The parameter controlling how likely simulated annealing is to accept a worsening move; starts high, cools over time |

## Check yourself

The simulated annealing run accepted a worsening move at step 10 (cut dropped from 4 to 3) before eventually reaching cut=5 by step 30. Explain, using the e^(Δ/T) acceptance formula, why this kind of worsening move becomes less and less likely to be accepted as the algorithm progresses and T cools — and why that cooling schedule, not just the acceptance rule itself, is essential to SA eventually settling on a strong answer rather than wandering indefinitely.
