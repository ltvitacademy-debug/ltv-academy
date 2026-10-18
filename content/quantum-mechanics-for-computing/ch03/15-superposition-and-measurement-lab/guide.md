# Superposition & Measurement Lab

You've now got four separate pieces — what superposition really is, the Born rule, collapse, and basis choice. The only way to be sure they've actually stuck is to run them together on a handful of concrete problems, the same way you'd debug a circuit by tracing through its numbers rather than just reading the gate list.

## What you'll learn

- How to combine the Born rule and collapse to fully answer a measurement question, end to end
- How to work the full numeric example √(1/3)|0⟩+√(2/3)|1⟩ from state to probability to post-measurement outcome
- How to re-check the Hadamard self-inverse behavior in light of what you now know about collapse
- How to re-check the X-basis result for |0⟩ and |1⟩ side by side
- Where each idea in this chapter will resurface in chapter 4's treatment of entanglement

## Scenario 1: Born rule plus collapse, together

Take |ψ⟩ = √(1/3)|0⟩ + √(2/3)|1⟩. First, check normalization: (√(1/3))² + (√(2/3))² = 1/3 + 2/3 = 1 — valid. Apply the Born rule: P(0) = |√(1/3)|² = 1/3 ≈ 0.333, and P(1) = |√(2/3)|² = 2/3 ≈ 0.667. So measuring this qubit gives 0 about a third of the time and 1 about two-thirds of the time. Now add collapse into the picture: suppose this particular measurement happens to yield 1. What is the qubit's state immediately afterward? By the collapse postulate from lesson 13, it is exactly |1⟩ — not "mostly |1⟩," not retaining any trace of the original 1/3-and-2/3 split, just |1⟩, full stop. If you measured again right away, you'd get 1 with certainty. This is the complete pattern you'll use constantly: compute probabilities with the Born rule, then separately apply collapse to get the definite post-measurement state for whichever outcome actually occurred.

## Scenario 2: revisiting the Hadamard double-apply with collapse in mind

Lesson 11 showed that H|0⟩ = |+⟩ and then H|+⟩ = |0⟩ again, and used that fact to argue superposition is real, not hidden ignorance. It's worth explicitly contrasting that gate sequence with measurement. Applying H twice in a row, with no measurement in between, is a fully reversible, deterministic process — it's just two applications of a gate, and H·H = I exactly. But if you instead measured the qubit while it was in state |+⟩ — say, getting outcome 0 — you would collapse it to exactly |0⟩, and that specific collapse event is not reversible the way gate application is. The lesson: gates (unmeasured) preserve and transform superposition reversibly; measurement resolves superposition irreversibly. Confusing "applying a gate" with "measuring" is one of the most common early mistakes, and this contrast is the cleanest way to keep them straight.

## Scenario 3: the X-basis, side by side for |0⟩ and |1⟩

Lesson 14 verified that measuring |0⟩ in the X-basis {|+⟩,|−⟩} gives P(+) = 0.5, P(−) = 0.5. The identical result holds for |1⟩: measuring |1⟩ in the X-basis also gives P(+) = 0.5, P(−) = 0.5. Put side by side, this is a useful sanity check on basis-dependence: in the computational basis, |0⟩ and |1⟩ are as different from each other as two states can be (P(0)=1 vs. P(0)=0). Yet in the X-basis, they produce *identical* measurement statistics — both an even coin flip between + and −. This is the same lesson as scenario 1 in reverse: measurement statistics in one chosen basis don't necessarily distinguish states that are genuinely different in another basis, which is exactly why algorithm and protocol designers have to be deliberate about which basis they measure in, not just pick one out of habit.

## Scenario 4: |+⟩ and |−⟩ in the computational basis, recapped

One more pairing worth holding in your head: |+⟩ and |−⟩ give identical 50/50 computational-basis statistics (lesson 12), even though they are different states that the Hadamard gate treats completely differently (H|+⟩=|0⟩ but H|−⟩=|1⟩, lesson 11). Combined with scenario 3 above, you now have two complementary examples of the same underlying fact: single-basis measurement statistics are not a complete fingerprint of a quantum state. Full information about a state requires more than one basis's worth of measurement statistics — a theme that becomes concrete and consequential in chapter 4's Bell-inequality tests, which are built entirely out of comparing statistics across multiple deliberately chosen bases to reveal correlations that no single-basis view could expose.

## Key terms

| Term | Meaning |
|---|---|
| Born rule (recap) | P(0)=\|a\|², P(1)=\|b\|² for \|ψ⟩=a\|0⟩+b\|1⟩ — converts amplitudes to measurement probabilities |
| Collapse (recap) | After measurement yields a given outcome, the state becomes exactly that outcome's basis state |
| Reversible vs. irreversible | Gate application (unmeasured) is reversible and deterministic; measurement/collapse is irreversible and probabilistic |
| Single-basis statistics | The probability distribution over outcomes in one chosen basis, which can be identical for genuinely different states |
| Basis-dependence (recap) | Whether a state looks definite or superposed depends on the chosen measurement basis, not the state alone |

## Check yourself

A qubit is prepared in |ψ⟩ = √(1/3)|0⟩ + √(2/3)|1⟩, measured in the computational basis, and happens to yield outcome 0 this time. State the probability of that outcome occurring, describe the qubit's exact state immediately after this measurement, and explain what would happen if you then applied a Hadamard gate to that post-measurement state and measured again — walking through each step rather than jumping to the final answer.
