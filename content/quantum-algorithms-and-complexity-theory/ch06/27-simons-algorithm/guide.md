# Simon's Algorithm

Simon's algorithm looks, at first glance, like a small variation on Deutsch-Jozsa: same Hadamard-oracle-Hadamard shape, same promise-problem framing. But the gap it proves between quantum and classical computing jumps from a one-extra-query curiosity to a provable exponential separation — and its circuit became the direct blueprint for Shor's algorithm.

## What you'll learn

- The hidden XOR-mask problem Simon's algorithm solves: recovering s from a promised 2-to-1 function
- How the quantum circuit's Hadamard-oracle-Hadamard structure produces samples orthogonal to s
- How to recover s classically by solving a linear system over GF(2) from roughly n independent samples
- Why the classical-vs-quantum gap here is exponential, not a small constant-factor gap like Deutsch-Jozsa's
- Why Simon's algorithm is the direct conceptual ancestor of Shor's period-finding structure

## The problem: a hidden XOR mask

You're given oracle access to a function f : {0,1}ⁿ → {0,1}ⁿ, with a promise: f is **2-to-1**, and there is a fixed nonzero string s ∈ {0,1}ⁿ such that f(x) = f(x ⊕ s) for every x, where ⊕ is bitwise XOR — and this is the *only* collision structure in f (no two inputs collide unless they differ by exactly s). Your job is to find s using as few oracle queries as possible. Think of s as a hidden "symmetry" baked into f that you can only detect indirectly, by noticing which pairs of inputs happen to produce the same output.

## The quantum circuit: same shape, new structure

The circuit follows the same skeleton as Deutsch-Jozsa, with one key difference: the oracle's output register now has n qubits instead of one ancilla bit, because f itself maps n bits to n bits. Prepare n input qubits in |0⟩ and an n-qubit output register in |0⟩, apply Hadamards to the input register, apply the oracle |x⟩|0⟩ → |x⟩|f(x)⟩, then apply Hadamards to the input register again, and measure the input register (the output register is typically also measured or simply discarded). The interference this produces is more structured than Deutsch-Jozsa's binary constant/balanced split: each run outputs a string y that satisfies y · s ≡ 0 (mod 2) — that is, y lands in the subspace of strings whose bitwise dot product with s is even — and the measurement distribution is uniform over that subspace. Every single run gives you one linear constraint on the unknown s, not s itself.

## Collecting enough samples and solving for s

Because each run of the circuit yields a y satisfying y · s ≡ 0 (mod 2), you need to repeat the circuit enough times to collect n − 1 *linearly independent* such y's (occasionally a repeat run gives a y that isn't independent of what you already have, so a little extra repetition is used in practice to be safe). Once you have n − 1 independent linear equations over GF(2) — the field with two elements, where addition is XOR — in n unknown bits, that system pins down s up to an overall sign, which for strings of bits over GF(2) means it pins down s exactly (the all-zeros solution is excluded because s is promised nonzero). This last step is pure classical linear algebra: Gaussian elimination over GF(2), nothing quantum about it.

## The complexity gap: exponential, not quadratic

Here's the headline result, and it's worth stating with precision because it's easy to round up carelessly: the quantum algorithm needs **O(n) queries** — collect roughly n samples, solve a linear system, done. The best possible classical algorithm, by contrast, needs **Ω(2ⁿ/²) queries** in the worst case — this is a proven lower bound, not just "nobody has found a faster classical algorithm yet." Compare this to Grover's algorithm's gap (quadratic: √N vs. N) or even Deutsch-Jozsa's gap (linear-vs-constant: 2ⁿ⁻¹+1 vs. 1). Simon's algorithm is the first algorithm in this course where the gap itself is **exponential** in the input size — the quantum algorithm's advantage doesn't just help, it grows without bound as n increases.

## Historical importance: the bridge to Shor's algorithm

Simon's algorithm isn't just a bigger version of Deutsch-Jozsa's trick — it's the direct template Shor's algorithm's period-finding reduction (Chapter 5) was built from. Both problems are instances of what's called the **hidden subgroup problem**: there's a hidden algebraic structure (a period, for Shor; an XOR mask, for Simon) embedded in a function, and the function is only accessible through queries. Both algorithms attack this using the same core technique — Hadamards (or, for Shor, the full Quantum Fourier Transform from Chapter 2) interfering around the oracle to sample from a distribution concentrated on strings related to the hidden structure, then finishing with classical post-processing to extract that structure. Simon's algorithm is the simpler, cleaner case of this idea — over the group (Z/2)ⁿ instead of the integers mod N that Shor's period-finding uses — which is exactly why it's taught as the conceptual stepping stone between Deutsch-Jozsa's single trick and Shor's full period-finding machinery.

## Key terms

| Term | Meaning |
|---|---|
| Hidden XOR mask (s) | The fixed nonzero string such that f(x) = f(x⊕s) for all x, which the algorithm must recover |
| 2-to-1 promise | The guarantee that f collides exactly in pairs {x, x⊕s}, with no other collision structure |
| GF(2) linear system | A system of linear equations over the two-element field, solved via XOR-based Gaussian elimination |
| Hidden subgroup problem | The general class of problems (including Simon's and Shor's) involving recovering a hidden algebraic structure from oracle queries |
| Exponential separation | A quantum-vs-classical query gap, like Simon's O(n) vs. Ω(2^(n/2)), that grows without bound as the problem size increases |

## Check yourself

Why does Simon's algorithm need roughly n independent samples from the quantum circuit (not just one), in contrast to Deutsch-Jozsa needing only a single query to get its answer?
