# Capstone Kickoff: Circuit Simulator Requirements

Every chapter so far has taught you one piece of Qiskit in isolation — building circuits, running simulations, visualizing results, dealing with hardware, running algorithms, handling noise. The capstone asks you to do something different: wire those pieces together into one small, genuinely useful tool, and then be able to explain exactly what it's doing under the hood.

## What you'll learn

- The five concrete requirements that define this capstone's deliverable
- Why a "circuit simulator/validator" is a realistic small project, not a toy exercise
- Why you build it on top of Qiskit's existing engine rather than reimplementing linear algebra from scratch
- Why you test the tool against a case whose correct answer is already known, before trusting it on anything new
- The specific test case — the 3-qubit GHZ circuit — that the next three lessons will build around

## The deliverable: a small circuit simulator/validator

You're going to build a Python tool that takes a simple circuit description and tells you, with evidence, whether its own simulation results can be trusted. Concretely, the tool has five jobs:

1. **Accept a simple circuit specification.** Not a full DSL — just a short list of gate tuples, like `[('h', 0), ('cx', 0, 1), ('cx', 1, 2)]`, where each tuple names a gate and the qubit index or indices it acts on.
2. **Build the corresponding `QuantumCircuit`.** Translate that plain-Python spec into an actual Qiskit circuit object, so the rest of the toolchain — transpilation, simulation, visualization — can operate on it normally.
3. **Run it two ways: exact and shot-based.** Use `Statevector` to get the *exact* theoretical amplitudes (no randomness, no sampling — the real mathematical answer), and separately run the circuit on `AerSimulator` with a fixed number of shots to get an *empirical* distribution, the kind you'd actually see from a real device.
4. **Compare the two and flag disagreements.** This is the validation feature that makes the tool worth building: take the exact probabilities, take the shot-based observed frequencies, and automatically flag any outcome where the two disagree by more than a reasonable statistical threshold. A handful of shot noise is normal; a disagreement far outside that range is a signal something is wrong — in your code, in your circuit, or (on real hardware) in the device itself.
5. **Produce a written, gate-by-gate explanation.** Beyond the numbers, the tool's output should include a plain-language account of how the state evolved gate by gate — what each gate did to the amplitudes, in order.

Notice what this is and isn't. You are not writing your own matrix-multiplication engine to simulate quantum circuits from scratch — Qiskit's `Statevector` and `AerSimulator` already do that correctly and efficiently. What you're building sits one layer above the engine: it takes a circuit spec, drives Qiskit's existing simulation machinery in two different modes, and adds a comparison/validation layer on top. That's a realistic shape for a lot of real engineering work — not inventing the hard math, but building tooling that uses a trusted engine correctly and checks its own outputs.

## Why validate against a known answer first

Here's the trap this capstone is deliberately designed to avoid: building a tool, running it once, getting *some* numbers back, and assuming they're correct because the code didn't crash. A number with no errors raised is not the same thing as a correct number.

The fix is a basic but genuinely important engineering discipline: before you trust a tool on a case where you don't already know the answer, you run it on a case where you *do* know the answer, and you confirm the tool reproduces it. If your "exact vs. shot-based" comparison logic has a bug — a sign error, an off-by-one in how you index basis states, a backwards probability lookup — running it on an unknown circuit won't reveal that. Running it on a known circuit will, because you can check the output against ground truth yourself.

## The test case for this capstone: the 3-qubit GHZ circuit

The circuit you'll use throughout the next three lessons is the same one from Chapter 2's circuit-building lab:

```python
spec = [('h', 0), ('cx', 0, 1), ('cx', 1, 2)]
```

This is a 3-qubit GHZ ("Greenberger–Horne–Zeilinger") state preparation: a Hadamard on qubit 0, followed by a chain of CX gates that propagates entanglement outward to qubits 1 and 2. It's an ideal validation case for three reasons. First, you've already built this exact circuit before, so there's no new circuit-construction logic to debug. Second, its exact final state is simple and well understood — an equal superposition of `|000⟩` and `|111⟩`, with every other 3-qubit basis state at exactly zero amplitude. Third, because the theoretical answer is already independently known, you can build your validator, run it on this circuit, and check that it correctly reports agreement between the exact and shot-based layers — proving the tool itself works — before you'd ever point it at a circuit whose correct answer you don't already have memorized.

## Key terms

| Term | Meaning |
|---|---|
| Circuit specification | A plain-Python list of gate tuples (e.g. `[('h', 0), ('cx', 0, 1)]`) describing a circuit before it's built into a `QuantumCircuit` |
| Exact (statevector) layer | The theoretical result from `Statevector(qc)` — exact amplitudes and probabilities, no sampling involved |
| Shot-based (empirical) layer | The observed counts from running the circuit on `AerSimulator` a fixed number of times |
| Validation/flagging logic | Code that compares exact probabilities to shot-based frequencies and flags disagreements beyond a statistical threshold |
| Known-answer test case | A circuit (here, the 3-qubit GHZ state) whose correct output is already established, used to confirm a new tool works before trusting it elsewhere |

## Check yourself

Why does testing your validator on the GHZ circuit — a case whose exact answer you already know — actually prove something useful about the tool, when testing it on a brand-new circuit whose answer you don't know wouldn't prove the same thing?
