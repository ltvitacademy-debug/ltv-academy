# Capstone Wrap-Up: Document Limitations & Costs

The last skill this course teaches isn't an algorithm — it's how to write up what you found, honestly and completely, in a way someone else could verify and trust. This lesson closes the capstone (and the course) by modeling that writeup using the Number Partitioning results from Lessons 24-26, and giving you a template for your own.

## What you'll learn

- The five sections every honest optimization writeup needs
- A fully worked model writeup, using this chapter's own verified results
- How to document computational cost, not just solution quality
- How to state limitations precisely, rather than vaguely
- A final checklist to run before you consider your own capstone "done"

## The five sections of an honest writeup

**1. Problem statement.** State the decision variables, objective, and constraints precisely, with the real-world interpretation in one sentence. *Model example*: "Four tasks with durations d=[3,5,2,4] hours are split between two workers; minimize the squared difference in total hours assigned to each worker."

**2. Formulation.** Show the QUBO and its Ising conversion, with coefficients stated explicitly and the conversion verified (not asserted). *Model example*: F(x) converts to H(s) = 54 + 2Σd_i·d_j·s_i·s_j, verified to match F(x) exactly across all 16 possible assignments (maximum discrepancy found: 0).

**3. Methods compared, and their results.** List every method tried, with its actual result — not just the best one. *Model example*: brute force found the true optimum (F=0, two mirror solutions); LPT (classical heuristic) also found F=0 in one deterministic pass; simulated QAOA at depth 1, after a (γ,β) search, reached expected cost ≈14.2, with the true optimal bitstrings carrying only ≈0.95% combined measurement probability.

**4. Honest comparison, applying the fairness checklist.** State plainly which method won by which metric, and flag anything that makes the comparison less than fully fair. *Model example*: by "found the true optimum" (the model problem's explicit success criterion), LPT and brute force both succeeded; QAOA did not reliably. This is a 4-variable toy instance scoped for verifiability (Lesson 24) — the result doesn't generalize to larger scale without separately testing that scale, and the QAOA comparison doesn't include the classical angle-search's own computational cost.

**5. Limitations and costs.** Be specific, not vague.

## Documenting computational cost specifically

"It was slow" or "it required more resources" is not a usable limitations statement. Specify: how many classical function evaluations did the γ,β search require (the refinement procedure in Lesson 25 used a grid search plus iterative coordinate refinement — hundreds of evaluations, each one simulating the full quantum state)? How many measurement shots would be needed, in expectation, to observe the true optimum at least once, given its ≈0.95% probability (roughly 1/0.0095 ≈ 105 shots on average, by the geometric-distribution expectation for a rare event)? How does that compare to LPT's single deterministic pass? A reader of your writeup should be able to reconstruct the actual computational burden of each method from your numbers, not just rank them qualitatively.

## Stating limitations precisely

Vague: "Quantum methods might do better with more qubits." Precise: "This result used a depth-1 (p=1) QAOA circuit; Lesson 9 showed depth-2 QAOA substantially improved the approximation ratio on a different problem (Max-Cut, 4-cycle: 0.75 → 0.9999), so testing depth-2 or higher on this Number Partitioning instance is a natural next step this capstone did not pursue, and there's no guarantee it would reach the true optimum's bitstring with higher probability specifically (as opposed to simply lowering expected cost further) without testing it directly." Precision means naming the specific untested variable (circuit depth here), citing the specific related evidence you do have (Lesson 9's result), and being explicit about what remains unknown rather than assumed.

## Final checklist before calling your capstone done

Confirm: (1) every numeric claim in your writeup was computed, not estimated or recalled from memory — if you can't point to the specific calculation, redo it; (2) your classical baseline is a real, named method (not "classical search" vaguely), matching Lesson 20's standard; (3) your comparison states an explicit, shared success criterion applied identically to both methods, matching Lesson 21; (4) your limitations section names specific untested variables rather than offering general hedging language. If all four hold, your capstone — and this course's entire approach to honest quantum optimization benchmarking — is complete.

## Key terms

| Term | Meaning |
|---|---|
| Honest writeup | A results document where every claim is independently verifiable and limitations are stated specifically, not vaguely |
| Computational cost documentation | Specifying actual counts (function evaluations, shots needed) rather than qualitative claims like "slower" or "more resource-intensive" |
| Geometric-distribution expectation | For an event with probability p per trial, the expected number of trials until it first occurs is 1/p |
| Precise limitation | A statement naming a specific untested variable and citing related evidence, rather than a general hedge |

## Check yourself

Using the ≈0.95% probability of observing a true-optimal bitstring from Lesson 25's QAOA result, compute the expected number of measurement shots needed to see it at least once (using the 1/p approximation), and write one precise sentence (following this lesson's "vague vs. precise" standard) stating what that number means for whether this specific QAOA configuration would be a practical choice compared to LPT's single deterministic pass.
