# Entanglement Problem-Solving Lab

You've learned the definition, built a Bell state with real gates, drawn the classical-vs-quantum line, and seen the numeric test that proves entanglement is real. Now it's time to apply all four together on a set of worked problems — the same skills you'll use constantly for the rest of this course.

## What you'll learn

- How to apply the factoring test from lesson 16 to a state you haven't seen before
- How to reason about measurement correlations the way lesson 17 taught you
- How to recognize when a "looks correlated" argument needs the lesson 18/19 multi-basis distinction
- How to walk through a full solution methodically instead of guessing
- Where the gaps in your understanding are, before you move on to chapter 5

## Problem 1 — Is (|00⟩ + |01⟩ + |10⟩ − |11⟩) / 2 entangled?

**Setup.** This state has four terms, all with magnitude-1/2 amplitudes (and it's normalized: four terms, each squared is 0.25, summing to 1). Having four terms doesn't tell you anything by itself — lesson 16 showed that |+⟩⊗|+⟩ also has four terms and is a product state. The only way to know is to run the factoring test.

**Solution.** Assume it factors: (a|0⟩+b|1⟩)⊗(c|0⟩+d|1⟩) = ac|00⟩ + ad|01⟩ + bc|10⟩ + bd|11⟩. Matching this against the given state requires ac = 1/2, ad = 1/2, bc = 1/2, and bd = −1/2. Look at the ratios: from ac = 1/2 and ad = 1/2, you get c = d (dividing the two equations, since a cancels). From bc = 1/2 and bd = −1/2, you get c = −d (dividing those two, since b cancels). But c = d and c = −d together force d = 0 — and if d = 0, then bd = 0, which contradicts bd = −1/2 ≠ 0. That's a contradiction, using exactly the same coefficient-matching technique lesson 16 walked through for |Φ+⟩. **This state is entangled.** You don't need any shortcut or pattern-recognition to see this — the factoring test alone, applied mechanically, settles it.

## Problem 2 — Is (|01⟩ + |10⟩) / √2 entangled, and what would you measure?

**Setup.** This is the Bell state |Ψ+⟩ from lesson 17's list. Normalization checks out (two terms, each squared 0.5, sum to 1).

**Solution, part A (factoring).** Assume (a|0⟩+b|1⟩)⊗(c|0⟩+d|1⟩) = ac|00⟩+ad|01⟩+bc|10⟩+bd|11⟩ equals (|01⟩+|10⟩)/√2. That requires ac = 0, ad = 1/√2, bc = 1/√2, bd = 0. Since ad ≠ 0, neither a nor d is zero. Since bc ≠ 0, neither b nor c is zero. But ac = 0 requires a = 0 or c = 0 — and you just established both are nonzero. Contradiction. **Entangled**, by the same technique as |Φ+⟩ in lesson 16.

**Solution, part B (measurement).** By the Born rule, measuring qubit 1 gives 0 or 1 each with probability 0.5 (the squared amplitudes of the two terms are each 0.5). But here's the key difference from |Φ+⟩: if qubit 1 measures 0, the surviving term is |01⟩, so qubit 2 is guaranteed 1 — the *opposite* of qubit 1, not the same value. If qubit 1 measures 1, qubit 2 is guaranteed 0. So |Ψ+⟩ gives perfect *anti*-correlation: P(01) = P(10) = 0.5, P(00) = P(11) = 0, exactly mirroring the logic from lesson 17 but with the roles of "same" and "different" swapped.

## Problem 3 — "My colleague says two classical coins could explain |Φ+⟩'s correlation. Are they wrong?"

**Setup.** This is the lesson 18 objection, restated as a problem you need to answer precisely rather than just intuitively.

**Solution.** They are partially right and partially missing the point, and a good answer says exactly where each part applies. If the only experiment ever run is "measure both qubits in the computational basis, every time," then yes — a local hidden-variable script (two coins pre-agreed to always show the same face) reproduces P(00)=P(11)=0.5, P(01)=P(10)=0 perfectly. Single-basis correlation alone cannot distinguish a genuinely entangled pair from a classical shared-randomness scheme. The colleague's mistake is concluding this means entanglement is *never* distinguishable from classical correlation. Lesson 19 showed the resolution: once you measure at multiple different angles (the CHSH setup with a, a′, b, b′), the entangled pair produces |S| = 2√2 ≈ 2.828, while no local hidden-variable script — no matter how it's built — can produce anything above |S| = 2. That multi-basis gap, confirmed by real experiments, is the precise, checkable answer to give your colleague.

## Problem 4 — Spot the error: "Since measuring qubit 1 of |Φ+⟩ instantly tells you qubit 2's value, information traveled faster than light between them."

**Setup.** This is a common misreading of lesson 17's perfect-correlation result, and it's worth dismantling carefully since it echoes the EPR debate from lesson 19.

**Solution.** The error is treating "I can now predict your result" as "I caused your result" or "information moved to you." Nothing travels between the two qubits at measurement time. What actually happens: before measurement, neither qubit has an individual definite value — the pair only has a joint description (that's the non-factorizability from lesson 16). When qubit 1 is measured, the *correlation that was already built into the joint state* becomes visible, but qubit 2's measurement outcome, on its own, still shows the same 50/50 statistics it always would — there's no detectable change at qubit 2's location that a observer sitting only with qubit 2 could notice. The "prediction" only becomes useful once someone physically brings the two measurement results together and compares them — which requires ordinary (slower-than-light) communication. This is exactly why EPR's "complete the theory" argument was reasonable to raise but ultimately wrong: the correlation is real and stronger than any classical model (lesson 19), but it still doesn't transmit information outside the ordinary rules of causality.

## Key terms

| Term | Meaning |
|---|---|
| Factoring test | Assuming a product-state form, matching coefficients against a given state, and checking whether the resulting system of equations has a solution |
| Anti-correlation | A measurement pattern where the two qubits' outcomes are always opposite rather than always equal, as seen in \|Ψ+⟩ |
| Single-basis correlation | Measurement correlation observed only within one fixed basis, which a classical hidden-variable script can always reproduce |
| Multi-basis violation | The CHSH-quantified excess of quantum correlation over the classical bound, visible only once multiple measurement angles are compared |
| No-signaling | The principle that entanglement's correlations, however strong, never allow information to be transmitted faster than light |

## Check yourself

A friend hands you the state (|00⟩ − |01⟩ − |10⟩ + |11⟩) / 2 and asks whether it's entangled. Run the full factoring test yourself — write the product-state ansatz, match all four coefficients, and determine whether a consistent solution for a, b, c, d exists or whether you hit a contradiction. State your final answer and show the specific values (or the specific contradiction) that prove it.
