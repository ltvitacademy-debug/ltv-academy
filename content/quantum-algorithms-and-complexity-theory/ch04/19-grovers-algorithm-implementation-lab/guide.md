# Grover's Algorithm Implementation Lab

Time to trace the whole algorithm by hand, start to finish, on two worked examples — then apply what you've learned to a new size you haven't seen the numbers for yet. No new theory here; this lesson is about confirming you can actually run the mechanics yourself.

## What you'll learn

- How to trace the N=4 oracle-and-diffusion arithmetic end to end and confirm P(marked)=1.0
- How to read and interpret the full N=8 iteration-by-iteration trajectory
- How to identify the optimal stopping point directly from a probability table
- How to reason about a new case (N=16) using the formula and the overshoot argument, without new simulation numbers

## Worked example 1: N=4, by hand

Setup: 2 qubits, N=4 basis states, marked index 3 (the state |11⟩). Starting state — uniform superposition:

**a = [0.5, 0.5, 0.5, 0.5]**

**Oracle step.** The oracle flips the sign on index 3 only:

a → [0.5, 0.5, 0.5, **−0.5**]

**Diffusion step.** Compute the mean: (0.5 + 0.5 + 0.5 − 0.5) / 4 = 1.0 / 4 = 0.25. Apply new_aᵢ = 2(0.25) − aᵢ = 0.5 − aᵢ to each entry:

- 0.5 − 0.5 = 0.0
- 0.5 − 0.5 = 0.0
- 0.5 − 0.5 = 0.0
- 0.5 − (−0.5) = 1.0

Result: **[0.0, 0.0, 0.0, 1.0]**

Check: P(marked) = 1.0² = **1.0**. After exactly one iteration, measuring the 2 qubits returns |11⟩ with certainty — this matches the formula's prediction of t\* = ⌊(π/4)√4⌋ = 1 exactly, and N=4 happens to be one of the special cases where Grover's algorithm is not just probabilistically favorable but fully deterministic.

(For reference, continuing past the optimum here also overshoots: 2 iterations gives [−0.5,−0.5,−0.5,0.5], back down to P(marked)=0.25, and 3 iterations gives [−0.5,−0.5,−0.5,−0.5], still 0.25 — the same overshoot pattern you'll see magnified in the N=8 case below.)

## Worked example 2: N=8, the full trajectory

Setup: 3 qubits, N=8 basis states, marked index 5. Walk the verified trajectory iteration by iteration:

| Iteration | Unmarked amplitude | Marked amplitude | P(marked) |
|---|---|---|---|
| 0 (start) | 0.3536 | 0.3536 | 0.1250 |
| 1 | 0.1768 | 0.8839 | 0.7812 |
| 2 | −0.0884 | 0.9723 | **0.9453** |
| 3 | −0.3094 | 0.5745 | 0.3301 |
| 4 | −0.3757 | −0.1105 | 0.0122 |

Confirm for yourself: P(marked) at each step is just the marked amplitude squared (0.8839² ≈ 0.7812, 0.9723² ≈ 0.9453, and so on — small rounding aside). Reading down the P(marked) column: it rises from 0.1250 to 0.7812 to a peak of **0.9453 at iteration 2**, then falls to 0.3301, then collapses to 0.0122.

**Identify the optimal stopping point:** iteration 2 is where P(marked) is maximized — exactly matching t\* = ⌊(π/4)√8⌋ = ⌊2.2214⌋ = **2**. Stopping and measuring at iteration 2 gives a 94.53% chance of reading out the correct marked state. Running one more iteration (3) nearly triples your failure rate; running two more (4) very nearly guarantees failure.

## Applied exercise: N=16

Now reason through a case where you have the formula and the geometric argument, but no new simulation table was handed to you.

**Question:** For N=16 with one marked item, how many iterations should you run, and roughly what's the geometric reason the answer isn't "as many as possible"?

**Answer:** Using the same formula, t\* = ⌊(π/4)√16⌋ = ⌊(π/4)(4)⌋ = ⌊3.1416⌋ = **3**. You should run exactly 3 iterations.

The reason the answer isn't "as many as possible" is the same rotation argument from Lesson 18: each Grover iteration rotates the state vector by a *fixed* angle 2α (where sin α = 1/√16 = 0.25) toward the marked state, and that rotation doesn't stop or slow down once it reaches the marked state — it keeps going. 3 iterations lands you at (or very near) the angle that points directly at the marked state, maximizing P(marked). A 4th iteration would rotate *past* that point, moving the state vector away from the marked state again — exactly the collapse you traced numerically in the N=8 table above, where iteration 3 undid most of iteration 2's gain and iteration 4 undid essentially all of it. There's no simulation shortcut needed to see this: it's the direct consequence of a fixed-angle rotation applied one too many times.

## Key terms

| Term | Meaning |
|---|---|
| Trace by hand | Manually computing each oracle and diffusion step on the actual amplitude vector, rather than citing a result |
| Peak iteration | The specific iteration count where P(marked) is maximized, equal to t\* from the formula |
| Overshoot collapse | The sharp drop in P(marked) seen when iterating past t\*, as demonstrated numerically at N=8, iterations 3-4 |
| Formula-only reasoning | Determining t\* and the overshoot risk for a new N using only sin(α)=1/√N and the rotation argument, without needing a fresh simulation |

## Check yourself

For N=16 with one marked item, how many iterations should you run, and roughly what's the geometric reason the answer isn't "as many as possible"? Answer using the formula and the rotation-overshoot argument, without looking back at the worked answer above.
