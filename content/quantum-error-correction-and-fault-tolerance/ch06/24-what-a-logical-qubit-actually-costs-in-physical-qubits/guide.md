# What a Logical Qubit Actually Costs in Physical Qubits

Every code in this course has been building toward one number: how many real, physical qubits does it actually take to get one qubit's worth of reliable, protected logical information? The answer depends heavily on which code family you pick.

## What you'll learn

- The surface code's qubit cost at increasing code distance, tabulated directly
- The Steane-code-style concatenation's qubit cost, tabulated directly, for comparison
- Why these two cost curves (quadratic vs. exponential) diverge so sharply at scale
- Why this divergence is part of the real argument for the surface code's practicality

## Surface code: cost grows as 2d² − 1

Chapter 5 built this formula directly from the lattice geometry: a distance-*d* surface code uses **2d² − 1** total physical qubits to protect 1 logical qubit. The verified values across a wide range of distances:

| Code distance d | Physical qubits per logical qubit |
|---|---|
| 3 | 17 |
| 5 | 49 |
| 7 | 97 |
| 9 | 161 |
| 11 | 241 |
| 15 | 449 |
| 21 | 881 |
| 27 | 1,457 |
| 41 | 3,361 |

Increasing *d* buys exponentially lower logical error rates (next lesson), at a cost that grows only **quadratically** in *d*.

## Concatenated Steane code: cost grows as 7^L

Contrast this against repeatedly concatenating the Steane [[7,1,3]] code from chapter 4 — encoding each physical qubit of a Steane-encoded logical qubit using *another* Steane code, and so on, for *L* levels. Each level multiplies the physical-qubit count by 7:

| Concatenation level L | Physical qubits per logical qubit |
|---|---|
| 1 | 7 |
| 2 | 49 |
| 3 | 343 |
| 4 | 2,401 |

At low levels this looks competitive with, even better than, the surface code (level 1's 7 qubits beats even the surface code's smallest useful distance of 17). But the growth rate is **exponential** in L, not quadratic — by level 4, concatenation already costs 2,401 qubits, more than a distance-15 surface code's 449, for a correction power that isn't even directly comparable (concatenation level and surface-code distance measure error suppression differently, but the qubit-cost trajectories tell the real story).

## Why the shape of the curve matters more than any single number

This is the central, honest point of this lesson: at small scale, concatenation can look cheaper. At the scale real fault-tolerant algorithms actually need (chapter 6's next two lessons quantify this directly), the surface code's quadratic growth wins decisively over concatenation's exponential growth, because exponential curves always eventually overtake quadratic ones, no matter how good the exponential curve's starting point looked. This — not any claim that the surface code is "cheap" in an absolute sense — is the real, honest reason the surface code is favored at scale, on top of the hardware-connectivity reasons from chapter 5.

## Key terms

| Term | Meaning |
|---|---|
| Quadratic cost growth | Qubit cost scaling as d² (surface code), eventually far more favorable than exponential growth at scale |
| Exponential cost growth | Qubit cost scaling as (base)^L (concatenated codes), favorable at small L but unsustainable at scale |
| Concatenation level (L) | How many times a code has been recursively applied to itself (chapter 3's Shor code is L=1 of a mixed concatenation) |
| Cost curve crossover | The point at which an initially cheaper exponential-cost approach becomes more expensive than a quadratic-cost approach |

## Check yourself

Looking at the two tables above, at roughly what physical-qubit budget does concatenation's cost overtake the surface code's cost for comparable-scale protection? Why does this crossover point matter more than comparing the cheapest possible instance of each code family (surface code d=3 vs. concatenation L=1)?
