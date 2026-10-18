# Writing a Capstone Proposal

Before building anything, write the proposal — a short document that forces you to commit to a specific hypothesis, method, and scope before you've sunk any time into code. This lesson gives you the structure and a worked example you can compare your own draft against.

## What you'll learn

- The six sections a capstone proposal needs, and what each one is actually for
- Why writing the proposal before coding catches problems that are expensive to catch later
- A worked proposal for a reproduction + extension capstone, built on Chapter 2's GHZ/mitigation example
- How to self-review your own draft proposal against a short checklist before moving to Lesson 13's scoping pass

## The six sections of a capstone proposal

1. **Research question** — one or two sentences, not a hypothesis yet, just the question you're investigating.
2. **Hypothesis** — your testable, falsifiable hypothesis, written using Lesson 3's template.
3. **Method summary** — the circuit/algorithm, technique, hardware or simulator, and comparison condition(s), at the level of detail Lesson 8 taught you to extract from someone else's paper, now written about your own planned work.
4. **Related work** — the paper(s) you're reproducing or building on, and what specifically you're extending or comparing against.
5. **Deliverables** — what you will actually produce: a specific figure/table, a written report, a presentation. Specific, not "I will investigate X."
6. **Risks and fallback plan** — what could go wrong (hardware queue times, a specification gap you can't resolve, a result that doesn't let you draw a clean conclusion) and what you'd do instead if it does.

## Why writing this before coding matters

A proposal forces three decisions that are cheap to change on paper and expensive to change after you've written code: exactly what you're measuring, exactly what you're comparing it against, and exactly what "done" looks like. Projects without a written proposal tend to drift — the scope silently expands mid-project, or the original question gets fuzzy by the time you're writing the final report. Lesson 13 will stress-test your proposal's scope specifically; this lesson is about getting a complete, honest draft down first.

## A worked proposal

<details>
<summary>A worked capstone proposal (reproduction + extension)</summary>

**Research question.** Does zero-noise extrapolation improve measured GHZ-state fidelity on accessible IBM Quantum hardware, and does the size of that improvement change meaningfully when the GHZ state is extended from 3 to 5 qubits?

**Hypothesis.** On a GHZ-state preparation circuit run on [specific IBM Quantum open-tier device], applying zero-noise extrapolation via unitary folding will increase the measured probability of ideal GHZ outcomes relative to no mitigation, at both 3 and 5 qubits — and the size of that improvement will be smaller at 5 qubits than at 3 qubits, because larger circuits accumulate more gate-error noise for the same mitigation technique to correct.

**Method summary.** Reproduce [specific paper]'s 3-qubit GHZ + zero-noise-extrapolation result (Richardson extrapolation, five noise-scaling factors, 1,024 shots per factor), following this course's reproduction framework (Chapters 1–2). Extend by running the identical procedure on a 5-qubit GHZ circuit, same device, same shot count and scaling factors, and comparing the measured improvement at both sizes.

**Related work.** [Specific paper], whose 3-qubit result is the reproduction target; this proposal's original contribution is the 3-vs-5-qubit comparison, which the paper does not report.

**Deliverables.** A reproduction report (per Chapter 2's format) for the 3-qubit result; a comparison table and plot of measured error reduction at 3 vs. 5 qubits; a written final report (Lesson 20) and presentation (Lessons 21–22).

**Risks and fallback plan.** IBM Quantum open-tier queue times may limit how many shot-repetitions are practical within the course timeline — fallback: reduce to 512 shots per factor if queue time becomes a binding constraint, and state this explicitly in the final report's limitations section. If the 5-qubit circuit's device-reported error rate is too high to produce an interpretable signal at all, fallback: run the comparison on a simulator with an injected, controlled noise model instead, explicitly reframing the claim as about the mitigation technique's theoretical scaling rather than this specific device's real noise.

</details>

## Self-review checklist before moving on

- Does the hypothesis section actually use Lesson 3's testable/falsifiable template, or is it still vague?
- Does the method summary name a specific device/simulator, not "a quantum computer"?
- Does the deliverables section name a specific figure/table, not just "results"?
- Does the risks section name a real, specific risk with a real, specific fallback — not a generic "it might not work"?

## Key terms

| Term | Meaning |
|---|---|
| Capstone proposal | A short document committing to a research question, hypothesis, method, and scope before building begins |
| Fallback plan | A predetermined alternative approach if a named risk actually occurs |

## Check yourself

Your own draft proposal's "risks and fallback plan" section currently reads: "The experiment might not work, in which case I will try something else." Using the worked example as a model, rewrite this into a specific risk and a specific fallback for your own topic.
