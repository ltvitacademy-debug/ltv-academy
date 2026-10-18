# The Azure Quantum Resource Estimator

Fault-tolerant quantum computers that can run serious algorithms don't exist yet — but the decision of whether an algorithm is even worth pursuing on one, and what hardware characteristics it would need, can't wait for them to exist. The Azure Quantum Resource Estimator is Microsoft's answer: a free, first-class service that answers "what would this actually cost?" years before the hardware to run it is built.

## What you'll learn

- What problem the resource estimator solves, and why it's not a simulator
- The inputs it takes: your compiled Q# program plus configurable qubit/error-correction assumptions
- The outputs it produces: physical qubit counts and runtime projections
- Why this is a genuinely distinctive first-class Azure Quantum feature with no equivalent integrated service in the Qiskit ecosystem
- A worked, explicitly simplified illustrative calculation (not a real estimator output)

## The problem: planning for hardware that doesn't exist yet

Today's quantum hardware is "noisy intermediate-scale" — too error-prone and too small to run most algorithms that would actually outperform classical computers at a useful problem size. The algorithms that matter for real applications (large-scale Shor's algorithm, serious quantum chemistry simulation) need **fault-tolerant** hardware: many physical, noisy qubits combined via quantum error correction into a smaller number of reliable **logical qubits**. That hardware is still being engineered. But a team deciding whether to invest further research into an algorithm, or a hardware group deciding which error-correction approach to prioritize, needs a real answer now, not once the hardware exists.

The resource estimator answers exactly that question: given your algorithm and a set of assumptions about future hardware, how many physical qubits and how much runtime would it actually need?

## Inputs: your program plus configurable hardware assumptions

You submit a compiled Q# program to the resource estimator target, exactly the way you'd submit to a simulator — but instead of getting measurement results back, you configure **qubit parameters** that describe the hardware you're asking it to assume: the physical qubit technology (for example, gate-based superconducting-style assumptions versus Majorana-based topological-qubit assumptions, each with different native error rates and gate speeds), the target logical error rate you need the whole computation to achieve, and the error-correction code parameters used to get there. Changing these assumptions and re-running the estimate is the entire point — it lets you ask "how much would a better physical qubit, or a different error-correction code, actually save me?" without needing the better qubit to exist yet.

## Outputs: physical qubits and runtime, not measurement results

Where a simulator job returns a histogram of measurement outcomes, a resource estimator job returns a structured report: the number of physical qubits required, the total runtime, the number of logical qubits the algorithm needs, and the logical error budget breakdown across the computation. This is the number that actually matters for a hardware/algorithm co-design conversation — "will this fit on a machine with N physical qubits" is a very different, and often more useful, question than "what's the exact answer to this one input."

## A worked illustrative calculation (not a real estimator run)

To make this concrete without claiming to have run the actual service: a common simplified way to reason about surface-code-style error correction is that the number of physical qubits needed per logical qubit scales roughly with the square of the **code distance** `d` you choose to hit your target error rate — a simplified order-of-magnitude form often written as roughly `2 × d²` physical qubits per logical qubit. Choosing an illustrative `d = 15` (a plausible distance for a moderate target error rate, not a real estimator recommendation) gives:

```
physical qubits per logical qubit ≈ 2 × 15² = 450
```

For an illustrative algorithm needing 6 logical qubits:

```
illustrative total physical qubits ≈ 450 × 6 = 2,700
```

This arithmetic is verified and consistent as stated, but it is a deliberately simplified formula with an assumed distance, not the real Azure Quantum Resource Estimator's actual output — the real service runs a much more detailed analysis against your specific compiled program and chosen qubit parameters. The value of doing the real version is exactly this kind of number, but trustworthy and specific to your algorithm, which is why teams use the actual service rather than back-of-envelope formulas for real decisions.

## Why this doesn't have a direct Qiskit-ecosystem equivalent

Qiskit's ecosystem gives you transpilation and circuit-depth/gate-count analysis — useful, but aimed at today's near-term circuits, not at a standardized, integrated, vendor-agnostic projection of fault-tolerant hardware requirements. IBM and others publish separate research and tooling on resource estimation, but it isn't built into the core Qiskit toolchain as a single first-class, free, push-button service the way the Resource Estimator is built into Azure Quantum. That integration — write a Q# program, submit it to the estimator target, get a hardware-requirements report back, using the exact same workspace and submission model as every other target in this chapter — is the distinctive thing to take away from this lesson.

## Key terms

| Term | Meaning |
|---|---|
| Resource estimator | An Azure Quantum service that projects physical qubit count and runtime for a program on future fault-tolerant hardware, without executing it |
| Logical qubit | A reliable qubit built from many noisy physical qubits combined via quantum error correction |
| Qubit parameters | Configurable assumptions (hardware technology, error rates, code distance) the estimator uses to produce its projection |
| Code distance | An error-correction code parameter controlling the tradeoff between physical-qubit overhead and achievable logical error rate |

## Check yourself

Why does it make sense to run the same Q# program through the resource estimator multiple times with different qubit-parameter assumptions, rather than treating one estimate as "the" answer for that algorithm?
