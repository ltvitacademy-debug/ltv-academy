# Worked Problem Set: States & Measurement

A synthesis problem set spanning Chapters 1-3: states, Dirac notation, normalization, the Born rule, measurement, and measurement bases. Every number used below was already verified earlier in the course — this lesson is about combining the ideas, not introducing new ones.

## What you'll learn

- How to check normalization and compute measurement probabilities in one pass
- How to compute probabilities in both the computational basis and the X-basis for the same state
- Why interference (not just probability) distinguishes superposition from classical uncertainty
- What happens to a state's probabilities immediately after a specific measurement outcome

## Problem 1: Full state analysis

**Problem:** Is |ψ⟩=0.6|0⟩+0.8|1⟩ a valid quantum state? If so, what are P(0) and P(1)?

**Solution:** Check normalization: 0.6²+0.8²=0.36+0.64=1 ✓ (verified). Valid state. Born rule: P(0)=|0.6|²=0.36, P(1)=|0.8|²=0.64 (verified). These sum to 1, consistent with 0 and 1 being the only possible outcomes.

## Problem 2: The same state, two different bases

**Problem:** For |+⟩=(|0⟩+|1⟩)/√2, find P(0) and P(1) in the computational basis, and P(+) and P(−) in the X-basis.

**Solution:** First confirm normalization: (1/√2)²+(1/√2)²=0.5+0.5=1 ✓. In the computational basis: P(0)=P(1)=0.5 (verified). In the X-basis: since |ψ⟩ literally *is* |+⟩, P(+)=1 and P(−)=0 — definitional, since measuring a state in a basis that includes that exact state gives that outcome with certainty. The lesson here: the *same* physical state gives a perfectly even split in one basis and a perfectly certain result in another. Neither description is "more true" than the other — they're both correct, for their respective bases.

## Problem 3: Why Hadamard proves interference, not uncertainty

**Problem:** H|0⟩=|+⟩, and H|+⟩=|0⟩ again (verified: H·H=I). Explain why this disproves "superposition is just unknown classical randomness."

**Solution:** If |+⟩ were genuinely "secretly 0 or secretly 1, we just don't know which," then applying any fixed physical operation to it would still leave genuine uncertainty afterward — a classical operation applied to a probabilistic mixture produces another probabilistic mixture, never a guaranteed, single, predictable outcome. But H|+⟩ returns |0⟩ with *certainty*, every single time, verified by direct matrix computation. That deterministic reconstruction is only possible because the two amplitudes making up |+⟩ interfere — reinforcing into the |0⟩ component and cancelling in the |1⟩ component — something a classical probability distribution has no mechanism to do.

## Problem 4: Collapse after a specific outcome

**Problem:** |ψ⟩=√(1/3)|0⟩+√(2/3)|1⟩ is measured and the outcome is 1. What is P(0) and P(1) for the qubit immediately after this measurement?

**Solution:** Before measurement: P(0)=1/3≈0.333, P(1)=2/3≈0.667 (verified). But the question asks about *immediately after* a measurement that already yielded 1. By the collapse postulate (Chapter 3), the state becomes exactly |1⟩ the instant that outcome occurs — so immediately afterward, P(0)=0 and P(1)=1 with certainty. The pre-measurement probabilities (1/3, 2/3) described the *likelihood of getting* each outcome; once outcome 1 actually happens, the state updates to reflect that outcome with certainty, discarding the prior superposition completely.

## Problem 5: Spot the error

**Problem:** A colleague says "|0⟩ measured in the X-basis will definitely give +, since |0⟩ is a definite state." Is this correct?

**Solution:** No. "Definite" is basis-dependent. |0⟩ is a definite (100%-certain) outcome *in the computational basis*, but measuring it in the X-basis gives P(+)=0.5 and P(−)=0.5 (verified in Chapter 3) — an even split, not a certainty. The colleague's error is treating "definite" as an absolute property of the state, when it's really a property of the state *relative to a chosen measurement basis*.

## Key terms

| Term | Meaning |
|---|---|
| Basis-relative certainty | Whether a measurement outcome is "definite" or "even odds" depends on which basis you measure in, not just on the state itself |
| Post-measurement state | The exact state a system is in immediately after a measurement yields a specific outcome: the corresponding basis state, with certainty |

## Check yourself

Using the same reasoning as Problem 4, suppose |ψ⟩=0.6|0⟩+0.8|1⟩ is measured and the outcome is 0 (which happens with probability 0.36, verified). What is the qubit's state and its measurement probabilities immediately afterward, and how is this different from saying "there was a 36% chance of this"?
