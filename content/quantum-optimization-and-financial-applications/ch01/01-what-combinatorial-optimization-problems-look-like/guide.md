# What Combinatorial Optimization Problems Look Like

Quantum optimization doesn't start with qubits — it starts with a very ordinary class of hard problems that businesses already pay classical solvers to chew on. Before you touch a quantum circuit, you need to recognize what these problems look like and why their size alone makes them brutal.

## What you'll learn

- The defining shape of a combinatorial optimization problem: a finite set of discrete choices and a cost function to minimize or maximize
- Why "finite" doesn't mean "easy" — how choice count explodes combinatorially
- Three concrete business examples: portfolio selection, route planning, and scheduling
- The difference between the search space size and the actual difficulty of search
- Why this entire course cares about these problems: they're the ones QAOA and quantum annealers specifically target

## The shape of the problem

A combinatorial optimization problem asks you to pick values for a set of discrete variables — often just 0s and 1s — so that some cost function is as small (or as large) as possible, subject to constraints. That's the whole shape. No calculus, no continuous curves to slide along — just a finite, but often enormous, set of candidate solutions to search through.

Three ingredients define every instance:

- **Decision variables**: the things you're choosing. "Is asset i in the portfolio?" "Does the truck visit city j right after city i?" "Is nurse k assigned to the Tuesday night shift?"
- **An objective function**: a number that scores any particular choice of variables — total return, total distance, total unmet demand.
- **Constraints**: rules that rule out some combinations — a budget cap, "visit every city exactly once," "no nurse works two shifts in a row."

## Why finite doesn't mean easy

Here's the part that surprises people coming from continuous optimization (gradient descent, calculus-based methods): having a finite number of choices doesn't make the problem small. It makes it *combinatorially* large.

With n binary decision variables, the number of candidate solutions is 2^n. At n = 20, that's 1,048,576 candidates — still searchable by brute force on a laptop in well under a second. At n = 50, it's about 1.13 × 10^15 — already far beyond brute force on any machine. At n = 300 (a modest-sized real portfolio or routing problem), the number of candidates exceeds the number of atoms estimated to exist in the observable universe. No amount of classical hardware scaling fixes that growth rate; you need smarter algorithms, not faster brute force, and this is exactly the gap both classical heuristics (Chapter 5) and quantum algorithms (Chapters 2–3) are trying to close from different directions.

## Three business-shaped examples

**Portfolio selection.** Given N candidate assets and a budget to select K of them, choose the subset that maximizes expected return while keeping risk (correlated volatility across the picks) under control. You'll build this exact QUBO in Lesson 15.

**Vehicle routing / the Traveling Salesman Problem (TSP).** Given a set of delivery stops, find the order that minimizes total distance or time, possibly subject to time windows and vehicle capacity. This is the canonical example used in nearly every quantum-optimization paper because it's easy to state and brutal to scale.

**Shift scheduling.** Assign workers to shifts so every shift is covered, no one works an illegal pattern (e.g., back-to-back closing/opening shifts), and total cost (overtime, understaffing penalties) is minimized.

Every one of these reduces, with some algebraic work, to the same underlying mathematical object you'll meet formally in the next lesson: a QUBO — a Quadratic Unconstrained Binary Optimization problem. That's the universal translation layer this whole course depends on: whatever your real-world problem is, if you can express it as 0/1 choices with a quadratic cost, QAOA and quantum annealers have something to say about it.

## Search space size vs. actual difficulty

A subtlety worth flagging now, because Chapter 5 is built around it: a huge search space doesn't automatically mean every known classical method is helpless. Some combinatorially large problems have exploitable structure (say, convexity, or a polynomial-time algorithm specific to that problem class) that avoids brute-force search entirely — Max-Flow and many scheduling-with-easy-constraints problems fall here. Others, like generic Max-Cut or TSP, are NP-hard: no known classical algorithm solves every instance efficiently, so practitioners lean on heuristics (simulated annealing, genetic algorithms, specialized solvers) that find *good* answers fast without guaranteeing the *best* one. Quantum optimization methods are heuristics too, in this same sense — a point this course will keep returning to rather than overselling.

## Key terms

| Term | Meaning |
|---|---|
| Combinatorial optimization | Finding the best assignment of discrete decision variables to minimize/maximize a cost function, subject to constraints |
| Decision variable | A discrete choice in the problem, often binary (0 or 1) |
| Objective function | The quantity being minimized or maximized, evaluated on a specific assignment of variables |
| NP-hard | A problem class with no known classical algorithm that solves every instance in polynomial time |
| Heuristic | An algorithm that searches for a good (not provably optimal) solution quickly, used when exact solving is infeasible |

## Check yourself

A delivery company has 40 stops to visit in one day. Explain, in terms of 2^n or a similar combinatorial count, why "just try every possible route order" is not a viable strategy — and name one real-world combinatorial optimization problem (not listed in this lesson) you've personally encountered that has this same shape.
