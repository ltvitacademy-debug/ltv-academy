# Wavefunction Collapse

The Born rule tells you the probability of each measurement outcome, but it doesn't tell you what happens to the qubit the instant after you measure it. The answer is both simple and drastic: the superposition is gone, permanently, and that fact shapes how every quantum algorithm is structured.

## What you'll learn

- What "collapse" means: the qubit's state snaps to exactly the measured outcome
- Why measuring the same qubit again immediately afterward gives the same result with certainty
- Why collapse is irreversible and destroys the original superposition information
- How this connects forward to the no-cloning theorem (chapter 5)
- Why you can't "peek" at a quantum computation mid-circuit without destroying it

## What collapse means, precisely

Suppose a qubit is in superposition, |ψ⟩ = a|0⟩ + b|1⟩, and you measure it in the computational basis. By the Born rule, you get outcome 0 with probability |a|² or outcome 1 with probability |b|². But the Born rule only describes the *probability* of each outcome — it doesn't describe the qubit's state after the measurement happens. That's a separate, additional postulate of quantum mechanics called **collapse** (or state reduction): if the measurement outcome is 0, the qubit's state immediately becomes exactly |0⟩ — not "mostly |0⟩ with a little |1⟩ left over," not a weaker version of the original superposition, but exactly |0⟩, full stop. Symmetrically, if the outcome is 1, the state becomes exactly |1⟩.

This means that immediately after you measure and get 0, measuring the *same* qubit again (with no gates in between) is guaranteed to give 0 again, with probability 1. The randomness was a one-time event, consumed at the moment of measurement; once it's resolved, the qubit sits in a definite state and stays there until you act on it with another gate.

## Collapse is a one-way door

Here's the part that trips people up: collapse is irreversible, and it destroys information. Before you measured, the qubit's full state carried two amplitudes, a and b, encoding both magnitude and relative phase — a continuous, information-rich description. After you measure and collapse to, say, |0⟩, all of that is gone. You cannot look at the post-measurement |0⟩ and work backward to recover what a and b originally were. The measurement didn't just reveal a pre-existing fact (recall lesson 11 — there was no pre-existing fact to reveal); it actively converted a rich superposition into one of two definite outcomes, and in doing so it threw away everything else the superposition contained. There is no gate, no clever trick, no amount of post-processing that can undo a measurement and hand you back the original pre-measurement superposition. Once collapsed, that specific superposition's information is gone for good.

## Why this previews the no-cloning theorem

This irreversibility is closely tied to a result you'll study formally in chapter 5: the **no-cloning theorem**, which says there is no quantum operation that can copy an arbitrary unknown quantum state. The connection is intuitive even before you see the proof: if you could somehow make a perfect duplicate of a qubit before measuring it, you could measure the copy, learn the outcome, and still have the original untouched superposition to work with or duplicate again — effectively dodging collapse's destructiveness entirely. The fact that collapse really is destructive and irreversible is part of why nature also forbids copying unknown states; the two restrictions reinforce each other, and you'll see the rigorous version of the no-cloning argument in chapter 5.

## Why you can't peek mid-circuit

This is the single most important practical consequence for writing quantum software: you cannot measure a qubit partway through a circuit just to "check how it's doing" and then keep going as if nothing happened. The instant you measure, you collapse that qubit out of whatever rich superposition the earlier gates had built up, and the information in the amplitudes you haven't used yet is gone. This is exactly why quantum algorithms are designed to build up the right superposition through an entire uninterrupted sequence of gates and only measure at the very end, once, to extract a final classical answer. Debugging a quantum circuit is nothing like inserting a classical `print()` statement mid-function — doing the quantum equivalent destroys the very computation you were trying to inspect. Any debugging or verification of intermediate quantum states has to happen a different way: by running the whole circuit repeatedly on fresh copies and reasoning statistically, or by simulating the circuit classically (on hardware where that's feasible), never by peeking at a live qubit mid-flight.

## Key terms

| Term | Meaning |
|---|---|
| Collapse (state reduction) | The qubit's state snapping to exactly the measured outcome's basis state the instant measurement occurs |
| Irreversibility of collapse | The fact that no operation can recover the original pre-measurement superposition once collapse has happened |
| Post-measurement state | The qubit's new, definite state (e.g., exactly \|0⟩) immediately after a measurement yields that outcome |
| No-cloning theorem (preview) | The chapter 5 result that no quantum operation can copy an arbitrary unknown quantum state — related to why collapse can't be dodged by duplicating first |
| Mid-circuit measurement | Measuring a qubit before a circuit finishes, which destroys the superposition being built and is avoided except when the algorithm is specifically designed around it |

## Check yourself

A qubit starts in |+⟩ = (|0⟩+|1⟩)/√2. You measure it in the computational basis and get outcome 0. Describe exactly what the qubit's state is immediately afterward, what you would get if you measured it again right away, and explain specifically why you cannot now "undo" the measurement to get back the original |+⟩ state.
