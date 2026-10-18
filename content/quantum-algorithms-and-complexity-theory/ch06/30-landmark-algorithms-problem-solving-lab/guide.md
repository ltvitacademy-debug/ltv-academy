# Landmark Algorithms Problem-Solving Lab

This lab is a classification drill, not a new derivation. Across every landmark algorithm in this chapter — plus Grover's and Shor's from earlier chapters — the skill being tested is recognizing which algorithm a scenario describes and stating its real speedup precisely, without rounding a quadratic gap up to an exponential one or letting a caveat quietly drop out of a claim.

## What you'll learn

- How to match a problem scenario's promise structure to the correct named algorithm
- How to state each algorithm's quantum-vs-classical gap precisely, without overselling it
- How to spot an overhyped claim about HHL-style algorithms and name the specific caveat it ignores
- Why Simon's algorithm's exponential separation is qualitatively different from Grover's and quantum walks' quadratic separations
- How this honest-benchmarking habit carries directly into Chapter 7

## Exercise 1: constant or balanced

**Scenario.** You're handed oracle access to a function and told only that it's either constant or balanced — nothing else. Which algorithm applies, and what's the exact query gap?

**Worked answer.** This is the Deutsch-Jozsa promise exactly as defined in Lesson 26. The quantum algorithm settles the question with a single oracle query, regardless of the input size n, by exploiting exact destructive interference so that the all-zeros outcome has probability exactly 1 if f is constant and exactly 0 if f is balanced. Classically, the worst case needs 2ⁿ⁻¹ + 1 queries — you must query more than half the domain before the pigeonhole principle forces an answer. The gap is 1 vs. 2ⁿ⁻¹+1.

## Exercise 2: a hidden XOR mask

**Scenario.** A function f : {0,1}ⁿ → {0,1}ⁿ is promised 2-to-1, with a hidden string s such that f(x) = f(x⊕s) for all x. You need to recover s. Which algorithm, and is the speedup quadratic or exponential?

**Worked answer.** This is Simon's problem, from Lesson 27. The quantum algorithm needs O(n) queries: collect roughly n independent samples y satisfying y·s ≡ 0 (mod 2), then solve a linear system over GF(2). The best possible classical algorithm needs a proven Ω(2ⁿ/²) queries. That is an **exponential** gap, not a quadratic one — a qualitatively stronger separation than Grover's or quantum walks' quadratic speedups, because the ratio between the two query counts grows without bound as n increases rather than settling into a fixed power relationship.

## Exercise 3: the HHL overclaim

**Scenario.** Someone tells you: "HHL exponentially speeds up solving any system of linear equations you'll encounter in practice." What's wrong with this claim?

**Worked answer.** Lesson 28 gives three specific caveats this claim ignores. First, HHL's log(N) advantage assumes b can be loaded into a quantum state efficiently — in general, state preparation can itself cost O(N), erasing the advantage before the algorithm starts. Second, HHL's runtime scales as κ² in the condition number, while classical conjugate gradient scales only linearly in κ — so poorly conditioned systems, common in real discretized or noisy data, shrink or erase the advantage exactly where real systems are hardest. Third, HHL's output is a quantum state |x⟩, not a classical vector; extracting a specific classical number from it costs further measurement, and reading out the *entire* vector would cost at least O(N), again erasing the advantage. "Any" is wrong because the speedup is conditional on favorable state preparation, condition number, and a narrow readout need (one aggregate quantity, not the full vector); "exponentially" is wrong as a blanket claim because it only holds when those conditions are met.

## Exercise 4: coin, shift, and a marked node

**Scenario.** A search algorithm is described as repeatedly applying a "coin flip" followed by a "shift" on a graph, rather than amplitude amplification on a flat list, to find a marked node faster than classical search. What concept is this, and is its speedup quadratic or exponential relative to the best classical search on the same graph?

**Worked answer.** This is a quantum walk search, from Lesson 29. It generalizes Grover's algorithm (which is itself a special case of quantum walk search on a particular graph) to structured search spaces. Its speedup — like Grover's — is **quadratic**: hitting time scales as O(t) for the quantum walk vs. O(√t) diffusive spreading classically, or equivalently O(d) steps to reach distance d quantum-mechanically vs. O(d²) classically. This sits in the same speedup family as Grover's, not Simon's.

## Exercise 5: tying period-finding back to Simon's

**Scenario.** An algorithm needs to find the period of a function using oracle queries and Fourier-style interference. Which earlier algorithm's structure did this directly inspire, and how does its promise differ from Simon's?

**Worked answer.** This describes Shor's algorithm's period-finding reduction (Chapter 5), and Lesson 27 named Simon's algorithm as its direct conceptual ancestor: both are instances of the hidden subgroup problem, attacked with the same technique of Fourier-style interference around an oracle followed by classical post-processing. The difference is in the structure being hidden and the group it lives over: Simon's algorithm recovers a hidden XOR mask s over the group (Z/2)ⁿ, while Shor's period-finding recovers a hidden period r over the integers mod N (using the full Quantum Fourier Transform from Chapter 2, rather than simple Hadamards). Simon's is the simpler, cleaner version of the same underlying idea.

## The theme carrying into Chapter 7

Every exercise above required the same two-part discipline: name the correct algorithm for the promise structure described, and then state its real speedup precisely — 1 vs. 2ⁿ⁻¹+1, O(n) vs. Ω(2ⁿ/²), a quadratic hitting-time gap, or a conditional exponential gap with three named caveats — rather than defaulting to a vague "quantum is faster." Chapter 7, "Algorithm Benchmarking Against Classical Alternatives," turns this exact habit into a formal skill: how to honestly benchmark a quantum algorithm against its best classical competitor, starting with Grover's algorithm as the running example.

## Key terms

| Term | Meaning |
|---|---|
| Query gap | The precise ratio or relationship between quantum and classical query counts for a given problem, stated exactly rather than rounded up |
| Quadratic speedup | A gap where the quantum cost scales as roughly the square root of the classical cost (Grover's, quantum walks) |
| Exponential speedup | A gap that grows without bound as the problem size increases, rather than settling into a fixed power relationship (Simon's) |
| Conditional speedup | A speedup, like HHL's, that only holds when specific preconditions (state preparation, condition number, readout need) are met |
| Hidden subgroup problem | The general problem class (Simon's, Shor's) of recovering a hidden algebraic structure from oracle queries via Fourier-style interference |

## Check yourself

A colleague claims: "Quantum walks and Simon's algorithm both give exponential speedups, since they're both more advanced than Deutsch-Jozsa." Identify exactly which part of this claim is incorrect, and restate the three algorithms' speedups correctly.
