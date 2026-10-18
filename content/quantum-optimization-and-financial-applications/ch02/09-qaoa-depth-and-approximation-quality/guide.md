# QAOA Depth & Approximation Quality

Does adding more layers to a QAOA circuit actually help? This lesson answers that with a direct, exactly-simulated comparison — depth 1 versus depth 2 on the same problem — and then confronts the real cost of that improvement: more gates, more parameters, more exposure to hardware noise.

## What you'll learn

- The definition of approximation ratio and why it's the standard way to score a QAOA run
- A directly-simulated p=1 vs. p=2 comparison on the 4-cycle Max-Cut problem from Chapter 1
- Why deeper circuits can, in principle, approach the true optimum as p grows
- The real-world cost of depth: more parameters to optimize, more gates, more noise exposure
- Why "just increase p" is not a free lunch on real hardware today

## Approximation ratio

For a maximization problem like Max-Cut, the **approximation ratio** of a QAOA run is defined as:

**r = ⟨H_C⟩ achieved / (true optimal cost)**

A ratio of 1.0 means the circuit's expected measured cost exactly matches the best possible answer; a ratio of 0.75 means the circuit is, on average, capturing 75% of the available optimization value. This is the standard metric used throughout the QAOA literature (and in Chapter 5's benchmarking work) to compare circuit configurations and compare quantum results against classical heuristics on equal footing.

## The 4-cycle Max-Cut problem, revisited

Recall from Chapter 1, Lesson 4: the 4-node cycle graph with edges {(0,1), (1,2), (2,3), (3,0)} has a true optimal cut of **4** (every edge cut simultaneously, achieved by the alternating assignment x = (1,0,1,0)).

**Depth p=1.** Running an exact state-vector simulation of the full (γ, β) landscape for this 4-qubit problem (the same exhaustive-scan method from Lesson 6, extended to 4 qubits), the best achievable expected cost at depth 1 is **≈2.9996**, found at γ ≈ 2.346, β ≈ 1.183. That gives an approximation ratio of **≈0.75** (2.9996/4) — a single layer gets you most of the way, but leaves real value on the table.

**Depth p=2.** Running the same kind of search over the now-4-parameter landscape (γ_1, β_1, γ_2, β_2) — a coarse grid followed by local coordinate-wise refinement, exactly the classical-optimizer pattern from Lesson 8 — the best found expected cost rises to **≈3.9998**, at parameters γ_1≈1.563, β_1≈0.397, γ_2≈0.793, β_2≈0.782. That's an approximation ratio of **≈0.9999** — essentially the true optimum of 4, confirmed by direct simulation, not estimation.

| Depth p | Best expected cost | Approximation ratio |
|---|---|---|
| 1 | ≈2.9996 | ≈0.75 |
| 2 | ≈3.9998 | ≈0.9999 |

Doubling the depth here took this specific problem from "75% of optimal" to "essentially optimal." This matches the general theoretical expectation: as p → ∞, QAOA's achievable expected cost provably converges to the true optimum (this is a known mathematical result — the circuit becomes expressive enough to represent an adiabatic-like evolution toward the ground state). The practical question is never "does more depth help in principle" (it does) — it's "can you afford the depth," which is where the real tension lives.

## The real cost of depth

Each additional layer adds exactly 2 more parameters to optimize (Lesson 8's classical search problem gets harder — more dimensions to search, more circuit evaluations needed per optimization step) and, more importantly on real hardware, more quantum gates. Every gate on physical quantum hardware today has some probability of introducing an error — gate fidelities in the 99.0%–99.9% range are typical for current devices, meaning a circuit with hundreds of gates accumulates meaningful total error probability. A deeper QAOA circuit is more expressive in theory, but on noisy hardware it also has strictly more opportunities to decohere before you ever get to measure it. This is exactly why Chapter 5's benchmarking discussion won't let you assume "higher p is just better" without qualification — on today's hardware, there's a depth beyond which added noise outweighs added expressiveness, and where that crossover sits depends heavily on the specific hardware and problem.

## Key terms

| Term | Meaning |
|---|---|
| Approximation ratio | The ratio of a QAOA run's achieved expected cost to the true optimal cost; 1.0 means exactly optimal |
| Depth p | The number of cost/mixer layer repetitions; higher p means more parameters and, in principle, better achievable approximation ratio |
| Gate fidelity | The probability a physical quantum gate executes correctly; typically 99.0%-99.9% on current hardware, compounding over many gates |
| Adiabatic-like convergence | The theoretical result that QAOA's achievable cost converges to the true optimum as p approaches infinity |
| Noise-depth tradeoff | The practical tension where deeper circuits are more expressive but accumulate more hardware error, limiting useful depth on real devices today |

## Check yourself

Given the directly-simulated results in this lesson (p=1 ratio ≈0.75, p=2 ratio ≈0.9999 on the 4-cycle problem), would you expect p=3 to improve further, stay flat, or potentially get worse on real noisy hardware versus on a noiseless simulator? Explain your reasoning using both the theoretical convergence result and the gate-fidelity tradeoff described in this lesson.
