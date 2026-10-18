# What Entanglement Actually Is

Every popular-science article calls entanglement "spooky," but as a software engineer you need the precise, checkable definition: a multi-qubit state is entangled exactly when it *cannot* be written as a tensor product of independent single-qubit states. That's it — no mysticism, just a factoring question you can actually verify.

## What you'll learn

- The exact definition: entanglement = "cannot be factored into a tensor product of single-qubit states"
- How to build and read a genuine product state (not entangled), amplitude by amplitude
- Why the Bell state |Φ+⟩ provably cannot be factored — the full proof by contradiction
- How to use this factoring test on any two-qubit state you're handed
- Why non-factorizability is the actual computational resource later chapters build on

## Product states: when qubits really are independent

Chapter 3 showed you single-qubit states like |+⟩ = (|0⟩+|1⟩)/√2. When you have two qubits that were prepared completely independently — say, two separate Hadamard gates applied to two separate |0⟩ qubits — the combined two-qubit state is the **tensor product** of the two single-qubit states:

|+⟩⊗|+⟩ = [(|0⟩+|1⟩)/√2] ⊗ [(|0⟩+|1⟩)/√2] = (|00⟩ + |01⟩ + |10⟩ + |11⟩) / 2

Multiply it out term by term: each of the four basis outcomes gets amplitude 1/2 = 0.5. Check normalization: four amplitudes, each squared is 0.25, and 4 × 0.25 = 1 — it checks out. This is a perfectly good two-qubit state, and it has a very specific property: it **factors**. You can split it back apart into "qubit 1 is in state |+⟩" and "qubit 2 is in state |+⟩," completely independently of each other. Measure qubit 1, and the result tells you nothing new about qubit 2 — it was already independently 50/50 on its own. This is the "boring" case: two separate qubits that happen to sit next to each other, with no special relationship between them at all.

## The Bell state: a state that refuses to factor

Now compare that to the state |Φ+⟩ = (|00⟩ + |11⟩) / √2. At a glance it looks similar — two terms, clean coefficients, normalized (two amplitudes of 1/√2, squared and summed: 1/2 + 1/2 = 1). But try to write it as a product of two independent single-qubit states, the same way you did above for |+⟩⊗|+⟩.

Suppose it *could* be factored: |Φ+⟩ = (a|0⟩ + b|1⟩) ⊗ (c|0⟩ + d|1⟩). Multiplying this out gives:

ac|00⟩ + ad|01⟩ + bc|10⟩ + bd|11⟩

For this to equal (|00⟩ + |11⟩)/√2, you need to match every coefficient: ac = 1/√2, ad = 0, bc = 0, and bd = 1/√2. Look closely at those four conditions together. Since ac = 1/√2 ≠ 0, neither a nor c can be zero. Since bd = 1/√2 ≠ 0, neither b nor d can be zero. But ad = 0 requires a = 0 or d = 0 — and you just established that neither a nor d is zero. That's a direct contradiction. (The same contradiction falls out of bc = 0 as well.) There is no choice of a, b, c, d that satisfies all four equations simultaneously — so no such factorization exists, for any values whatsoever.

That's the whole proof. It's not a hand-wave; it's four linear equations that are jointly unsatisfiable. |Φ+⟩ genuinely cannot be decomposed into "qubit 1's state" and "qubit 2's state" separately. The two qubits don't have individual states of their own anymore — only the pair, as a whole, has a well-defined state. That is what physicists mean by **entangled**.

## Why this distinction is the whole point

This isn't a notational curiosity — it's the dividing line between "two qubits" and "one genuinely joint quantum object with no classical two-separate-parts description." A product state like |+⟩⊗|+⟩ never gives you anything a pair of independent classical coins couldn't eventually imitate for simple measurements. An unfactorizable state like |Φ+⟩ cannot be reduced to two independent objects under any circumstances — and, as you'll see in lesson 19, the consequences of that are experimentally measurable and provably exceed what any classical system can produce. This non-factorizability is the actual resource that algorithms, teleportation (coming in chapter 5), and quantum cryptography are built on — not "spookiness," but a hard mathematical fact about which states admit a tensor-product decomposition and which don't.

## How to apply the test yourself

Given any two-qubit state, the recipe is always the same: write down the general product-state ansatz (a|0⟩+b|1⟩)⊗(c|0⟩+d|1⟩), expand it, and try to match coefficients against the state you were given. If a consistent set of a, b, c, d exists, the state is a product state (not entangled). If the system of equations is contradictory — as it was for |Φ+⟩ — the state is entangled. You'll use exactly this technique again in lesson 20's problem-solving lab.

## Key terms

| Term | Meaning |
|---|---|
| Tensor product | The operation (⊗) that combines two independent single-qubit states into a joint two-qubit state |
| Product state | A multi-qubit state that can be written as a tensor product of individual single-qubit states |
| Entangled state | A multi-qubit state that cannot be written as any tensor product of single-qubit states |
| Factoring test | Writing the general product-state form, expanding it, and checking whether the resulting coefficient equations have any consistent solution |
| Proof by contradiction | Assuming a factorization exists, deriving equations that cannot all hold at once, and concluding no factorization exists |

## Check yourself

Take the state (|00⟩ + |01⟩) / √2. Set up the same product-state ansatz used for |Φ+⟩ above, match coefficients, and determine whether this state is a product state or an entangled state. Show the specific values of a, b, c, d if it factors, or show exactly where the contradiction arises if it doesn't.
