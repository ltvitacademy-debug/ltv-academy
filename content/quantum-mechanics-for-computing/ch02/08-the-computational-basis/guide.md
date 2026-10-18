# The Computational Basis

Every qubit state can be written in infinitely many equivalent bases, but one of them gets used by default everywhere — in circuit diagrams, in the readout at the end of an algorithm, in how a quantum SDK prints results. This lesson is about that one basis, and about the fact that it is a choice, not the only option.

## What you'll learn

- Why {|0⟩,|1⟩} is called the "computational basis"
- Why hardware readout defaults to this specific basis
- How to express the alternate X-basis states |+⟩ and |−⟩ as combinations of |0⟩,|1⟩
- Why "the state is 0 or 1" only makes sense once you've fixed a basis

## What makes a basis "computational"

{|0⟩, |1⟩} is called the computational basis because it's the basis in which a quantum computer's final measurement is physically read out. When a real quantum processor measures a qubit at the end of a circuit, the hardware is built to report one of two outcomes — conventionally labeled 0 and 1 — and those outcomes correspond exactly to projecting onto |0⟩ and |1⟩. Every circuit diagram, every bitstring a quantum program returns, is expressed in this basis by default. It's not mathematically special in any deeper sense than that — it's just the one the hardware and the surrounding software tooling have standardized on.

## Any orthonormal pair can be a valid basis

{|0⟩,|1⟩} is one orthonormal basis for the 2-dimensional space a qubit lives in, but it's far from the only one. Any pair of orthonormal vectors works as a basis. A commonly used alternative is the **X-basis**: {|+⟩, |−⟩}, where

|+⟩ = (|0⟩+|1⟩)/√2  and  |−⟩ = (|0⟩−|1⟩)/√2

Both of these are normalized: (1/√2)² + (1/√2)² = 1/2 + 1/2 = 1 for each (verified). They're also orthogonal to each other (their inner product works out to zero, by the same kind of computation covered in the previous lesson). So {|+⟩,|−⟩} is every bit as valid a basis as {|0⟩,|1⟩} — it's just a *different* pair of directions to measure along.

## Expressing one basis in terms of the other

Just as |+⟩ and |−⟩ can be written as combinations of |0⟩ and |1⟩, the reverse works too:

|0⟩ = (|+⟩+|−⟩)/√2  and  |1⟩ = (|+⟩−|−⟩)/√2

This is the same relationship rearranged — any state in this 2-dimensional space can be expressed in either basis, and switching between them is just a change of coordinates, exactly like changing basis for an ordinary vector in linear algebra. Nothing about the physical qubit changes when you decide to describe it this way instead of that way.

## Why basis choice matters for measurement

Here's the subtlety that makes this more than a notational exercise: *which* basis you measure in determines what "the outcome" even means, and a state that looks "definite" in one basis can look like an even split in another. Chapter 3 will work through this precisely (measuring |0⟩ in the X-basis gives a 50/50 result, even though |0⟩ is about as "definite" as a computational-basis state gets) — the point to take now is that saying "the qubit's state is 0 or 1" is incomplete unless you also say *which basis* you mean. The computational basis is the default, but it is a default, not a law of nature.

## What this means for computing

Quantum algorithms routinely rotate a qubit's state into a different basis mid-circuit (using gates like Hadamard) specifically so that interference effects line up correctly, then rotate back into the computational basis right before the final measurement, because that's the basis the hardware actually reads out. Understanding that the computational basis is a deliberate convention — not the only possible description of a qubit — is what makes sense of why algorithms are full of basis changes.

## Key terms

| Term | Meaning |
|---|---|
| Computational basis | The standard basis {\|0⟩,\|1⟩}, matching what quantum hardware reports when it measures a qubit |
| X-basis | The alternate orthonormal basis {\|+⟩,\|−⟩}, rotated 90° from the computational basis on the Bloch sphere's equator |
| Change of basis | Re-expressing the same physical state's amplitudes relative to a different orthonormal basis; the state itself doesn't change |

## Check yourself

Using |0⟩=(|+⟩+|−⟩)/√2 and |1⟩=(|+⟩−|−⟩)/√2, express the state |ψ⟩=|0⟩ entirely in terms of |+⟩ and |−⟩, and explain in words why this is a legitimate alternative description of the exact same physical state.
