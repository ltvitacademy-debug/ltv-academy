# Selecting an Appropriate Paper to Reproduce

Not every interesting paper is a reasonable reproduction target. Picking well here saves you from the single most common failure mode in this kind of exercise: discovering, weeks in, that the paper was never actually reproducible with the resources you have.

## What you'll learn

- A concrete checklist for screening candidate papers before committing to one
- Why landmark, heavily-cited papers are often worse reproduction targets than smaller, specific ones
- How to judge whether a paper's hardware/resource requirements match what you can actually access
- Where to look for papers that explicitly provide code and data, which dramatically improves your odds
- A worked example of screening three candidate papers against the checklist

## A screening checklist

Before committing to a paper, check it against each of these:

1. **Resource match.** Does the paper's circuit fit on hardware or simulators you can actually access — IBM Quantum's free/open tier, Azure Quantum, Amazon Braket's free simulators, or a local simulator like Qiskit Aer? A paper requiring 50+ noise-free logical qubits or a proprietary device you have no access to is not a realistic target.
2. **Specificity of the method section.** Can you identify the exact circuit, exact parameters, and exact comparison from the paper's text and figures alone, or does it require guessing at unstated details? Some ambiguity is normal (Lesson 8 covers handling it), but a method section that's pure prose with no circuit diagram or parameter table is a much harder starting point.
3. **Availability of code or data.** A GitHub link, a Zenodo dataset, or an explicit "code available upon request" statement meaningfully changes the odds of a successful attempt, even if you're aiming for replicability (your own implementation) rather than reproducibility (their exact code) — the original code is still useful as a methodology reference.
4. **Scope relative to your timeline.** A capstone-appropriate reproduction target is usually a single figure or a single table's main result from the paper, not the paper's entire set of experiments.
5. **Age and citation context.** A paper with later citing work that confirms or disputes it gives you an independent sanity check on whether the result is considered solid — useful context before you invest time.

## Why landmark papers are often worse targets

It's tempting to pick a famous, heavily-cited paper — but landmark results (the first demonstration of a named algorithm, a widely cited "advantage" claim) are frequently the *hardest* to reproduce precisely because they pushed the edge of available hardware or scale at the time, often on access-restricted devices, with extensive supplementary engineering not fully described in the main text. A smaller, more specific, recent paper — "we benchmarked technique X on a 4-qubit circuit on publicly available hardware Y" — is usually a far better reproduction target: narrower scope, more current and accessible hardware, and often better-documented methodology precisely because it wasn't trying to be a landmark claim.

## Matching resource requirements to what you can access

Before reading deeply, skim a candidate paper's methods/results specifically for: qubit count, circuit depth, which hardware or simulator was used, and whether that hardware has any public/free access tier today. IBM Quantum, Azure Quantum, and Amazon Braket all offer free or low-cost access tiers with queueing (not guaranteed instant access) — factor realistic queue time into your project timeline (directly relevant to Lesson 13's scoping discussion). If a paper used a proprietary or access-restricted device, a noiseless-simulator version of the same circuit is often still a legitimate, if different, reproduction target — just be explicit that you're reproducing the *algorithmic* claim, not the *hardware-noise* behavior.

## A worked example: screening three candidates

| Candidate paper | Qubits/hardware needed | Method specificity | Code/data available | Verdict |
|---|---|---|---|---|
| A landmark "quantum advantage" demonstration on a 50+ qubit proprietary device | Far beyond public access | High, but assumes proprietary engineering details | No | Reject — resource mismatch |
| A recent benchmark of two error-mitigation techniques on a 3-qubit circuit on IBM's open-access hardware | Fits free tier | High — circuit diagram and parameters given | Partial (circuit described, no raw data) | Strong candidate |
| A theoretical complexity-bound paper with no circuit implementation at all | None — it's pure theory | N/A, not an experimental method | N/A | Reject — not an experimental reproduction target at all |

The middle row is the realistic shape of a good capstone reproduction target: modest, accessible, specific, and honestly scoped.

## Key terms

| Term | Meaning |
|---|---|
| Resource match | Whether a paper's hardware/qubit requirements fit what you can actually access |
| Landmark paper | A widely cited, field-defining result, often harder to reproduce due to scale and access barriers |
| Method specificity | How precisely a paper's methods section defines the exact circuit, parameters, and comparison |

## Check yourself

You find a paper claiming a notable result on a 20-qubit proprietary device with no code or data available, and a second paper benchmarking a narrower technique on a 4-qubit circuit on IBM's open-access hardware, with the circuit diagram and parameters given in the text. Using the screening checklist, which would you choose as your reproduction target, and name the two strongest reasons.
