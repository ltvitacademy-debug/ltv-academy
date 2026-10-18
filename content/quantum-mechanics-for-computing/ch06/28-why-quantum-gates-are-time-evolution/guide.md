# Why Quantum Gates Are Time Evolution

Every quantum gate you'll study in future courses — Hadamard, CNOT, Pauli-X/Y/Z, phase gates — is, physically, a unitary matrix. This lesson makes the connection to everything in this chapter explicit: gates ARE time evolution, and unitarity is not a design choice but a physical necessity.

## What you'll learn

- Why physically applying a gate means engineering a Hamiltonian and waiting a precise duration
- Verified confirmation that H·H=I, X·X=I, and S²=Z — concrete unitary gates behaving exactly as required
- Why non-unitary operations cannot correspond to any valid stretch of Schrödinger-equation evolution
- Why this makes quantum gates reversible, unlike most classical logic gates

## A gate is a chosen U(t)

Lesson 26 showed that solving the Schrödinger equation for a fixed Hamiltonian H produces a specific unitary matrix U(t) = exp(−iHt/ħ) for each duration t. Physically building a quantum gate means the reverse process: starting from the *matrix you want* (say, the Hadamard gate), and engineering a Hamiltonian H and a duration t such that exp(−iHt/ħ) equals that matrix. Applying "the Hadamard gate" to a real physical qubit means literally letting it sit under a specifically engineered Hamiltonian for a specifically calibrated amount of time — there is no other mechanism available. A gate is not a separate kind of operation layered on top of physics; it's a particular instance of the same time evolution covered in Lessons 25-27, chosen on purpose.

## Verified: real gates satisfy exactly the unitary conditions this chapter has been building toward

Three concrete, previously verified facts tie this together directly:

- **Hadamard**: H=(1/√2)[[1,1],[1,−1]]. Direct matrix multiplication confirms H·H=I exactly — Hadamard is its own inverse. This also means Hadamard is unitary (U†U=I reduces to U·U=I here since H's entries are real and H is symmetric).
- **Pauli-X**: X=[[0,1],[1,0]]. Direct matrix multiplication confirms X·X=I exactly — applying a bit-flip twice returns the original state, also its own inverse.
- **S (phase) gate**: S=diag(1,i). Direct computation confirms S²=Z (specifically: i×i=−1, matching Z's second diagonal entry exactly) — applying the S gate twice is the same as applying a Pauli-Z.

Each of these matrices, in a real device, corresponds to some specific engineered Hamiltonian applied for some specific duration. The algebraic facts (H·H=I, X·X=I, S²=Z) aren't just convenient bookkeeping identities — they're statements about what happens when you let the corresponding physical system evolve for exactly twice the duration of a single gate.

## Why unitarity is non-negotiable

A matrix that is *not* unitary cannot correspond to any valid stretch of Schrödinger-equation time evolution under any Hamiltonian, full stop — because, as Lesson 26 established, U†U=I is exactly the condition for ⟨ψ(t)|ψ(t)⟩ to stay equal to 1 (probability conservation) at every moment. A non-unitary "gate" would mean a qubit's total measurement probability drifting away from 1 over time — not "a worse gate," but a mathematical impossibility for a closed quantum system. This is why every gate in every real quantum circuit specification is unitary: it's not an arbitrary design rule imposed by circuit designers, it's a direct consequence of what time evolution is allowed to do.

## Reversibility: a genuine difference from classical logic

Because every unitary matrix has an inverse (its conjugate transpose, U†, which is also unitary), every quantum gate is **reversible** — given the output state, you can always recover the input exactly by applying U† (or, as seen above, sometimes by applying the exact same gate again, when it's self-inverse). Classical logic gates are generally not reversible: AND and OR gates destroy information (given the output of an AND gate, you cannot always recover both inputs). Quantum circuits, because they're built entirely from unitary operations, never lose information this way mid-circuit — the only place information genuinely gets "thrown away" is at measurement (Chapter 3), which is a fundamentally different kind of step from gate application.

## What this means for computing

This closes the loop the whole course has been building toward: a qubit is a vector (Ch2), it can be in superposition (Ch3), multiple qubits can be entangled (Ch4), information can't be freely copied (Ch5), and now — gates are physically engineered time evolution, always unitary, always reversible. Every later course in this path that teaches you to design circuits is teaching you to compose unitary matrices, and every unitary matrix traces back to some real, physical Hamiltonian applied for some real, physical duration.

## Key terms

| Term | Meaning |
|---|---|
| Gate as time evolution | Physically applying a gate means letting a qubit evolve under an engineered Hamiltonian for a calibrated duration, so U(t) matches the desired gate matrix |
| Self-inverse gate | A gate U satisfying U·U=I, meaning applying it twice returns the original state (e.g. Hadamard, Pauli-X) |
| Reversibility | The property that every unitary operation has an inverse, so no information is lost by applying a quantum gate (unlike most classical logic gates) |

## Check yourself

Classical AND and OR gates are not reversible (you can't always recover both inputs from the output), but every quantum gate is. Explain why this difference traces directly back to the requirement that quantum gates must be unitary matrices corresponding to valid Schrödinger-equation time evolution.
