# Capstone Kickoff: Planning the Toolkit

Every tool you've built in isolation so far — array math, Kronecker products, unitary checks, Bloch-sphere coordinates, reproducible seeding — is about to become one small, real piece of software: a quantum math toolkit you design, build, and review yourself over the next four lessons.

## What you'll learn

- What the capstone toolkit needs to do, end to end
- How to scope a small project so it's finishable, not just ambitious
- The module layout the next three lessons will build into
- What "done" looks like for this specific project
- How this capstone reuses nearly every earlier chapter on purpose

## What the toolkit actually needs to do

The goal is a small Python package that can: represent a single- or multi-qubit state vector, apply a sequence of gates to it, compute measurement probabilities from the resulting state, simulate sampling measurement outcomes reproducibly, and visualize the result (as a Bloch-sphere point for one qubit, or a histogram of outcome counts for more). That's the whole scope — not a general-purpose quantum SDK, not a circuit compiler, just enough real, correct code to simulate and inspect small circuits like the Bell state.

## Scoping it so it's finishable

A common failure mode for a capstone like this is scope creep: "I'll also add noise simulation, and a circuit-drawing feature, and support for arbitrary n qubits with optimized tensor contractions." All of those are real, legitimate extensions — and all of them are explicitly *out of scope* for this four-lesson build. The toolkit you'll finish in Lesson 25 should handle exactly: 1-2 qubit systems, a small fixed set of gates (X, H, CNOT at minimum), probability computation, reproducible sampling, and one visualization. Finishing a small, correct thing is the actual skill being practiced here — a correct 2-qubit simulator teaches you everything a correct 20-qubit one would, at a fraction of the implementation risk.

## The module layout

Following the project-organization pattern from Chapter 5, the toolkit will take this shape across the next three lessons:

```
quantum_toolkit/
  gates.py        # Lesson 23: gate matrices + apply_gate / apply_gates functions
  simulate.py       # Lesson 23-24: state-vector construction, measurement probabilities, sampling
  visualize.py       # Lesson 24: Bloch-sphere coordinates, histogram plotting
  tests/
    test_gates.py
    test_simulate.py
```

Lesson 23 builds `gates.py` and the core of `simulate.py` (state representation and gate application). Lesson 24 extends `simulate.py` with measurement simulation and builds `visualize.py`. Lesson 25 reviews the whole thing end to end — checking correctness against known results, assessing test coverage, and deciding what (if anything) to do next.

## What "done" looks like

By the end of Lesson 24, the toolkit should be able to do this, correctly, starting from nothing:

```python
from quantum_toolkit.simulate import zero_state, apply_gate, apply_gates, probabilities
from quantum_toolkit.gates import H, CNOT, kron_gate, I

# Build a 2-qubit Bell state: H on qubit 0, then CNOT
state = zero_state(num_qubits=2)              # |00>
state = apply_gate(kron_gate(H, I), state)       # H (x) I
state = apply_gate(CNOT, state)                 # CNOT
print(probabilities(state))
# [0.5, 0.0, 0.0, 0.5]  -- the Bell state: equal chance of |00> or |11>, never |01> or |10>
```

That specific result — probabilities `[0.5, 0, 0, 0.5]` for the Bell state — is something you can verify by hand right now (and will verify again numerically in Lesson 23-24): it's exactly what entanglement looks like in probability terms, and it's the benchmark the finished toolkit gets checked against in Lesson 25.

## Why this capstone deliberately reuses almost everything

This project isn't introducing new quantum concepts — it's forcing the NumPy, complex-number, visualization, and reproducibility skills from Chapters 1-5 to work together in one piece of code that has to actually run correctly, not just illustrate a concept in isolation. That's a deliberately different kind of difficulty than any single earlier lesson: getting one gate matrix right is easy; getting a state representation, a gate-application function, a probability calculation, and a plotting function to all agree with each other is where real bugs tend to hide.

## Key terms

| Term | Meaning |
|---|---|
| Scope | The deliberately limited set of features a project commits to building, as distinct from every feature that could plausibly be added |
| State vector | The array representing a quantum system's full probability-amplitude information; the core data structure this toolkit manipulates |
| Module layout | The planned split of the toolkit's code into `gates.py`, `simulate.py`, and `visualize.py`, following Chapter 5's project-organization pattern |
| Bell state | The specific 2-qubit entangled state `(|00> + |11>)/sqrt(2)` used throughout this capstone as the end-to-end correctness benchmark |

## Check yourself

A classmate wants to add support for arbitrary n-qubit systems and a full noise model to their capstone before building the basic single-Bell-state case. Using this lesson's scoping argument, what would you tell them, and what should they build first instead?
