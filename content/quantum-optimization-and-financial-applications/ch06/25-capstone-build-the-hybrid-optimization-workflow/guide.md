# Capstone: Build the Hybrid Optimization Workflow

With the model problem scoped (Lesson 24), it's time to run it through the full pipeline: QUBO, Ising Hamiltonian, and an actual simulated QAOA circuit. This lesson does exactly that for the Number Partitioning example, including an honest surprise in the result that's worth sitting with rather than smoothing over.

## What you'll learn

- How to algebraically derive a QUBO's Ising form directly from its squared-difference structure
- How to verify that derivation by direct computation across every possible assignment
- How to run a simulated QAOA circuit on the resulting cost Hamiltonian
- A genuinely surprising, directly-computed result about where QAOA concentrated its probability
- Why this surprise is a feature of honest benchmarking, not a failure to hide

## From QUBO to Ising, derived algebraically

Recall the Number Partitioning objective from Lesson 24: F(x) = (Σ_{x_i=0} d_i − Σ_{x_i=1} d_i)², with d = [3,5,2,4]. Using the substitution s_i = 1-2x_i (Lesson 3), notice that Σ_i d_i·s_i exactly equals Σ_{x_i=0} d_i − Σ_{x_i=1} d_i (each term contributes +d_i when s_i=+1, i.e., x_i=0, and -d_i when s_i=-1, i.e., x_i=1). So:

**F = (Σ_i d_i·s_i)² = Σ_i d_i²·s_i² + 2·Σ_{i<j} d_i·d_j·s_i·s_j**

Since s_i² = 1 always (spins only take ±1), this simplifies to:

**H(s) = Σ_i d_i² + 2·Σ_{i<j} d_i·d_j·s_i·s_j**

Plugging in d = [3,5,2,4]: the constant term is 3²+5²+2²+4² = 9+25+4+16 = **54**, and the coupling coefficients are J_01=2(3)(5)=30, J_02=2(3)(2)=12, J_03=2(3)(4)=24, J_12=2(5)(2)=20, J_13=2(5)(4)=40, J_23=2(2)(4)=16. Checking this Ising Hamiltonian against the original F(x) across **all 16 possible assignments** (direct computation, not spot-checking): the maximum difference found was **exactly 0** — confirming the algebraic derivation is correct, not just plausible.

## Running a simulated QAOA circuit

Treating H(s) as the cost Hamiltonian, running a simulated depth-1 QAOA circuit and searching for the best (γ, β) that minimizes the expected cost (since this time the goal is minimization, not maximization like Max-Cut): a wide grid search followed by local refinement found:

**Best expected cost ≈14.197, at γ ≈ 4.037, β ≈ 2.012**

This is already informative: compared to a uniformly random guess (which would average the cost function evenly across all 16 bitstrings, giving a much higher expected cost), the circuit has found parameters that noticeably pull the expected cost down.

## The honest surprise

Here's where this result gets genuinely interesting. Looking at the *full* probability distribution at these optimized angles:

| Bitstring | Cost F(x) | Probability |
|---|---|---|
| 1100 | 4 | **0.2462** |
| 0011 | 4 | **0.2462** |
| 1010 | 16 | 0.1967 |
| 0101 | 16 | 0.1967 |
| 0110 | **0 (true optimum)** | 0.0048 |
| 1001 | **0 (true optimum)** | 0.0048 |

The two **true optimal** bitstrings (0110 and 1001, cost = 0) together carry only about **0.95% probability** — while the two *near*-optimal bitstrings (1100 and 0011, cost = 4) together carry about **49.2% probability**. The circuit's parameters were chosen to minimize *expected* cost, and they succeeded at that specific goal — but minimizing expected cost across the whole distribution is a different objective than maximizing the probability of landing exactly on the single best bitstring, and this result shows those two goals pulling in different directions for this particular problem and this particular depth.

## Why this matters, and why it isn't a failure to hide

This is not evidence that the simulation was done wrong — every number here was independently verified (the Ising conversion checked against all 16 assignments with zero discrepancy, and the probability table sums to 1.0 as it must). It's a genuine, informative result: a well-optimized QAOA circuit, judged purely by its expected-cost metric, can still assign very little probability to the exact true optimum, concentrating instead on a cluster of near-optimal answers. This is exactly the kind of nuance Lesson 21's benchmarking discipline exists to surface rather than paper over — and it directly sets up Lesson 26's classical comparison, where you'll see whether a classical heuristic handles this same tension differently.

## Key terms

| Term | Meaning |
|---|---|
| Expected-cost minimization | QAOA's actual optimization target: the probability-weighted average cost across the full measured distribution |
| Probability concentration | How much of a distribution's total probability mass sits on a specific outcome (or small set of outcomes) |
| Near-optimal cluster | A set of bitstrings with cost close to, but not equal to, the true optimum, which can collectively dominate a distribution |
| Verification-by-exhaustion | Confirming an algebraic derivation by checking it against every possible case, not a sample of cases |

## Check yourself

The true optimal bitstrings (cost=0) received only ≈0.95% combined probability, while near-optimal bitstrings (cost=4) received ≈49.2%. If you ran this circuit for 200 real measurement shots, roughly how many shots would you expect to land on a true-optimal bitstring versus a cost-4 bitstring? Given that result, would "best-of-many-shots" (Lesson 10's readout strategy) still likely find the true optimum within 200 shots — and how does your answer depend on probability concentration, not just on whether the probability is nonzero?
