# Grover's Algorithm in Qiskit

Searching an unsorted list of N items classically takes, on average, O(N) tries — you check items one by one until you find what you're looking for. Grover's algorithm does the same job on a quantum computer in roughly O(√N) steps, and this lesson builds the smallest possible example by hand so you can see exactly how that speedup happens.

## What you'll learn

- The problem Grover's algorithm solves: finding a marked item in an unsorted search space faster than classical search
- How to hand-build a 2-qubit, 1-iteration Grover circuit using only gates you already know
- Why one Grover iteration on a 4-item space with 1 marked item gives an exact, deterministic result
- Why real iteration counts are usually approximate, and why "too many iterations" can hurt you
- How to reach for `qiskit_algorithms.Grover` and `AmplificationProblem` instead of hand-building the oracle and diffuser yourself

## The problem: unstructured search

Imagine a list of 4 items, numbered 00, 01, 10, 11, with no order to exploit — you can only ask "is this the one?" one at a time. Classically, finding a specific marked item takes up to 4 checks, 2 on average. Grover's algorithm reframes this as a quantum search: encode all 4 items as the 4 computational basis states of 2 qubits, start in an equal superposition of all of them, then use a sequence of operations to boost the probability of measuring the marked state — all without ever "looking" at the answer along the way. For N items with M marked, Grover needs on the order of √(N/M) iterations instead of N/M classical checks, which is the quadratic speedup the algorithm is famous for.

## Building the circuit by hand

Here's a complete, minimal 2-qubit Grover circuit that searches a 4-item space (states `|00>`, `|01>`, `|10>`, `|11>`) for the single marked item `|11>`, using exactly one Grover iteration:

```python
from qiskit import QuantumCircuit

qc = QuantumCircuit(2, 2)
qc.h([0, 1])          # uniform superposition over 4 states
qc.cz(0, 1)           # oracle: phase-flips the marked state |11>
qc.h([0, 1]); qc.x([0, 1]); qc.cz(0, 1); qc.x([0, 1]); qc.h([0, 1])   # diffuser
qc.measure([0, 1], [0, 1])
```

Walking through it piece by piece:

- `qc.h([0, 1])` puts both qubits into superposition, so the system is in an equal mix of all 4 states, each at probability 0.25. No single outcome is favored yet.
- `qc.cz(0, 1)` is the **oracle**. A controlled-Z flips the sign of the amplitude on `|11>` only — it leaves every other state's amplitude untouched. This marks the target without collapsing anything or revealing which state got marked if you tried to measure right now (all probabilities are still 0.25; only the phase of one term changed).
- The five-gate block starting with the second `qc.h([0, 1])` is the **diffuser** (sometimes called the "inversion about the mean" operator). It reflects every amplitude around the average amplitude, which converts that single phase flip into a large boost in the marked state's measurement probability.
- `qc.measure([0, 1], [0, 1])` reads out the result.

## The exact result for this case

This specific case — N=4 items, M=1 marked — is a genuinely exact, clean result, not an approximation. Starting from uniform superposition (each of the 4 states at probability 0.25), after the oracle marks `|11>` and exactly one full Grover iteration (oracle + diffuser) as shown above, the resulting state is **exactly** `|11>` with probability 1.0, and every other outcome at probability 0. Run this circuit on a simulator and you will get `11` as the measured bitstring every single time, with zero statistical spread.

This perfect result is a special case, not the general rule. The optimal number of Grover iterations is approximately (π/4)·√(N/M) — for N=4, M=1, that formula happens to work out to exactly 1 iteration giving 100% success. For larger search spaces, the optimal iteration count is a real number that gets rounded to a nearby integer, so you land close to probability 1 but not exactly at it — which is why practical Grover searches are typically followed by re-measuring or otherwise double-checking the result rather than trusting a single shot blindly.

## Why "more iterations" isn't always better

Grover's diffuser-and-oracle step is a geometric rotation in the state space, and rotations are periodic — they cycle. Running more iterations past the optimal count doesn't keep improving your odds; it starts rotating the state *past* the marked outcome and back toward the unmarked ones, decreasing the success probability again. If you ran two full iterations on this same 4-item, 1-marked circuit instead of one, you would not get an even "more certain" result — you'd move backward. Getting the iteration count right is as important as getting the oracle and diffuser right.

## Doing this with `qiskit-algorithms` instead

Hand-building the oracle and diffuser is valuable for understanding the mechanics, but for real search problems you don't want to derive a custom diffuser every time. `qiskit-algorithms` provides `Grover` and `AmplificationProblem` to handle this generically:

```python
from qiskit_algorithms import Grover, AmplificationProblem
```

`AmplificationProblem` takes your oracle (as a circuit or a boolean expression) and automatically builds the matching diffuser and figures out the iteration count; `Grover` runs the resulting circuit through a `Sampler` and returns the most likely result. The manual circuit above is exactly what these classes build for you under the hood — knowing how to build it by hand is what makes the library version make sense rather than feel like a black box.

## Key terms

| Term | Meaning |
|---|---|
| Oracle | The part of a Grover circuit (here, a single `cz`) that phase-flips the marked state without revealing it via measurement |
| Diffuser | The "inversion about the mean" operator that converts a phase flip into a measurable probability boost |
| Grover iteration | One application of oracle followed by diffuser; the unit that is repeated an optimal number of times |
| `AmplificationProblem` | The `qiskit-algorithms` class that packages an oracle into a problem Grover can solve automatically |
| Quadratic speedup | Grover's algorithm's core advantage: O(√N) quantum queries vs. O(N) classical queries for unstructured search |

## Check yourself

If you had a search space of N=16 items with exactly 1 marked item instead of N=4, would you expect one Grover iteration to still give exactly probability 1.0 on the marked state? Why or why not, based on the (π/4)·√(N/M) formula?
