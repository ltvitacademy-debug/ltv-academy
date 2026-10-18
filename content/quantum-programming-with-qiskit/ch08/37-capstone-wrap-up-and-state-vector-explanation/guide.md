# Capstone: Wrap-Up & State-Vector Explanation

The last piece of the capstone's five-part spec is the one that's easy to skip but is arguably the most important for actually understanding what you built: a written, gate-by-gate explanation of how the state evolved. This lesson writes that explanation for the GHZ circuit, then closes out the whole course by connecting every chapter back to this one small project.

## What you'll learn

- How to trace the GHZ circuit's exact statevector change after each individual gate
- Why each CX gate in the chain "propagates" entanglement to one new qubit at a time
- The general recipe this circuit is an instance of: building an n-qubit GHZ state with one H and a chain of CX gates
- How every chapter in this course — circuits, simulation, visualization, hardware, algorithms, noise — shows up in this one capstone project

## Tracing the state, gate by gate

The circuit is `[('h', 0), ('cx', 0, 1), ('cx', 1, 2)]`. Basis-state labels below follow Qiskit's standard convention: a bitstring read left-to-right as `q2 q1 q0` — the same convention `Statevector` and `.draw()` use.

**Before any gate.** All three qubits start in `|0⟩`. The state is entirely amplitude 1.0 on label `000`, and exactly 0 on all seven other labels. Nothing has happened yet.

**After `h(0)`.** The Hadamard acts only on qubit 0, putting it into an equal superposition of `|0⟩` and `|1⟩` while qubits 1 and 2 are untouched. The result: amplitude 0.7071068 on label `000` and 0.7071068 on label `001`, with the other six labels still exactly 0. Notice what changed and what didn't — qubit 0 is now "split" between 0 and 1, but qubits 1 and 2 are still both definitely 0 in both branches. There's no entanglement yet; this is a single qubit in superposition, full stop.

**After `h(0)` then `cx(0, 1)`.** The CX gate has control = qubit 0, target = qubit 1: whenever qubit 0 is 1, it flips qubit 1. Apply that to the two branches from the previous step. The `000` branch has qubit 0 = 0, so the control condition isn't met — qubit 1 stays 0, and this branch is untouched. The `001` branch has qubit 0 = 1, so the control condition *is* met — qubit 1 flips from 0 to 1, turning that branch into `011` (reading q2 q1 q0 = 0,1,1). Result: amplitude 0.7071068 on `000` and 0.7071068 on `011`, all other six labels exactly 0. This is the moment entanglement is created — qubits 0 and 1 are now correlated: whichever branch you're in, they agree with each other.

**After `h(0)`, `cx(0, 1)`, then `cx(1, 2)`.** The second CX gate has control = qubit 1, target = qubit 2: whenever qubit 1 is 1, it flips qubit 2. Apply that to the current two branches. The `000` branch has qubit 1 = 0, so it's untouched — still `000`. The `011` branch has qubit 1 = 1, so qubit 2 flips from 0 to 1, turning that branch into `111`. Final result: amplitude 0.7071068 on `000` and 0.7071068 on `111`, with all other six labels exactly 0 — the completed GHZ state `(|000⟩ + |111⟩)/√2`.

## What each gate type actually did

Step back from the individual numbers and look at the pattern. The single Hadamard created the *only* superposition in this whole circuit — one qubit split between two possibilities. Everything after that was a CX gate doing one specific job: taking whichever qubit is already "carrying" the superposition and extending it to one more qubit, so that qubit's value becomes perfectly correlated with the branch it's propagating from. The first CX extended the split from qubit 0 to qubit 1; the second extended it from qubit 1 to qubit 2. No new superposition was created after the initial Hadamard — the two amplitudes stayed at 0.7071068 the entire time. What changed, gate by gate, was *which qubits* were entangled with that original split.

This is exactly the general recipe for building an n-qubit GHZ state for any n: one Hadamard on the first qubit, followed by a chain of CX gates, each with control equal to the previous qubit in the chain and target equal to the next one. A 3-qubit GHZ state uses one H and two CX gates; a 10-qubit GHZ state would use the same one H and a chain of nine CX gates, propagating the same correlation all the way down the line.

## Closing the loop: how this capstone used the whole course

Look back at what this one small project actually required. Building the circuit from a plain-Python spec (requirement #2) is Chapter 2's territory — the `QuantumCircuit` class, adding gates, multi-qubit circuits. Running it two ways, exact and shot-based (requirement #3), is Chapter 3 — the Aer simulator, statevector vs. shot-based simulation, what shots and measurement statistics actually mean. The histograms and state visualizations you'd use to eyeball these same results before trusting the numbers are Chapter 4's plot_histogram, Bloch sphere, and Q-sphere tools. The reason a real device wouldn't give you a clean 1069/979 split but something messier — and the reason your validator's exact-zero special case matters at all — traces back to Chapter 5's hardware realities and Chapter 7's noise models and mitigation techniques. And the gate-by-gate bookkeeping you just walked through for a simple GHZ state is the same bookkeeping, just repeated far more times with far more structure, that makes an algorithm like Grover's (Chapter 6) work: a longer, more deliberately engineered sequence of exactly this kind of amplitude tracking, built to make the right answer's amplitude grow and everything else's shrink.

That's the real takeaway to leave this course with. A quantum circuit, no matter how sophisticated the algorithm built from it, is still just a sequence of gates moving amplitudes around a statevector, one step at a time, in a way you can trace by hand for small cases and must trust Qiskit's engine for at scale — and now you've built, and validated, a small tool that does exactly that tracing and trusting for you.

## Key terms

| Term | Meaning |
|---|---|
| Basis-state label convention | A bitstring read left-to-right as `q(n-1)...q1q0` — Qiskit's standard convention for `Statevector` and `.draw()` output |
| Entanglement propagation | Each CX gate in a GHZ-building chain extends the existing superposition's correlation to one additional qubit, without creating new superposition |
| GHZ state recipe | One Hadamard on the first qubit, then a chain of CX gates (control = previous qubit, target = next qubit), generalizing to any number of qubits |
| Gate-by-gate amplitude tracking | Following the exact statevector after each individual gate, the same bookkeeping that underlies both this capstone and algorithms like Grover's |
| GHZ state | `(|00...0⟩ + |11...1⟩)/√2`, an n-qubit maximally entangled state where every qubit agrees with every other qubit across both branches |

## Check yourself

If you extended this circuit to 4 qubits using the same recipe — `[('h', 0), ('cx', 0, 1), ('cx', 1, 2), ('cx', 2, 3)]` — what would the two nonzero basis-state labels be after the final gate, and what amplitude would each carry? Walk through the gate-by-gate propagation yourself to justify your answer.
