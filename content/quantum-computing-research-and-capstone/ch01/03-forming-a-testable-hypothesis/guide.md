# Forming a Testable Hypothesis

A vague curiosity — "I wonder if error mitigation helps here" — is not a hypothesis. Research starts from a hypothesis specific enough that an experiment could actually prove it wrong. This lesson teaches you to write one.

## What you'll learn

- Why "testable" and "falsifiable" are the two non-negotiable properties of a usable hypothesis
- The structural difference between a vague research interest and a testable hypothesis
- A template for writing quantum-computing hypotheses that name the independent variable, the dependent variable, and the expected direction
- Common hypothesis-writing mistakes specific to quantum computing experiments
- How your hypothesis choice directly determines your experimental design (previewed for Lesson 4)

## Testable and falsifiable: the two properties that matter

A hypothesis is **testable** if there exists some experiment, with real measurable outputs, that could support or contradict it. It is **falsifiable** if it's possible, in principle, for the experiment's outcome to show the hypothesis is wrong — if no outcome could possibly disprove it, it isn't a scientific hypothesis, just an unfalsifiable belief. "Quantum computers are powerful" is neither testable nor falsifiable as stated — it names no measurement and no way to fail. "Zero-noise extrapolation reduces the measured bit-flip error rate of this specific 3-qubit circuit on this specific IBM device, relative to no mitigation, at the 95% confidence level" is both: you can run it, measure it, and it can come out false.

## From vague interest to testable hypothesis

Most research starts as a vague interest, and that's fine — the work is in sharpening it. Take the interest "I wonder if error mitigation helps on noisy hardware" through three tightening passes:

1. **Name the specific technique and the specific noise/error you're measuring.** "Does zero-noise extrapolation reduce measurement error" is sharper than "does error mitigation help."
2. **Name the specific circuit, problem, or benchmark you'll run it on.** Error mitigation's effect size varies enormously by circuit depth and qubit count — a hypothesis about "circuits in general" isn't testable with one experiment.
3. **Name the specific comparison and direction.** "Reduces error relative to no mitigation" is a direction; "affects error" is not, because a null or even a worsening result would also satisfy "affects."

The result: "Applying zero-noise extrapolation to a 10-gate, 3-qubit GHZ-state preparation circuit, run on [specific IBM Quantum device], will reduce the measured deviation from the ideal GHZ-state probability distribution, compared to running the same circuit with no mitigation." That's testable, falsifiable, and specific enough to design an experiment around.

## A template for quantum computing hypotheses

> On [specific circuit/problem/benchmark], using [specific technique/algorithm/parameter], measured on [specific hardware or simulator, named], [dependent variable] will [increase/decrease/show no significant change] relative to [specific baseline/comparison condition].

Every blank forces a decision you'll need to make anyway for Lesson 4's experimental design — which is exactly the point. A hypothesis that leaves a blank vague ("some hardware," "some improvement") is a sign the underlying experiment hasn't actually been thought through yet.

## Common mistakes specific to quantum computing hypotheses

- **Confusing a simulator result with a hardware result.** "This algorithm converges faster" needs to specify whether you mean on a noiseless simulator (where only the algorithm's structure matters) or on real noisy hardware (where device noise dominates) — these can give opposite answers.
- **No stated comparison condition.** "Error mitigation improves results" compared to what — no mitigation? a different mitigation technique? a different device? Without a named baseline, "improves" is unfalsifiable because there's nothing to measure against.
- **Hypotheses that are actually engineering tasks.** "Can I implement Grover's algorithm in Qiskit" is a valid learning goal, but it isn't a hypothesis — there's no comparison, no prediction, nothing that could come out false in an interesting way. (It can become one: "Grover's algorithm will find the marked item with success probability above 90% within the theoretically predicted number of iterations, on an 8-item unstructured search space, on [simulator].")
- **Hypotheses whose outcome is already certain from known theory.** Re-deriving a textbook result isn't wrong as a learning exercise, but it isn't research — a good capstone hypothesis has a real, currently-unknown-to-you answer.

## Why your hypothesis determines your experimental design

Every blank in the template above is a design decision: naming the hardware determines what noise model you're actually testing against; naming the baseline determines what you need to run as a control; naming the direction determines what statistical comparison you'll need (Lesson 4 covers this in depth). Write a vague hypothesis, and your experimental design has nothing solid to anchor to — you'll discover the missing decisions mid-experiment instead of before you start.

## Key terms

| Term | Meaning |
|---|---|
| Testable hypothesis | A prediction specific enough that a real experiment could produce measurable support or contradiction |
| Falsifiable | Capable, in principle, of being shown wrong by some possible experimental outcome |
| Independent variable | The thing you deliberately change between conditions (e.g., mitigation technique, circuit depth) |
| Dependent variable | The thing you measure as an outcome (e.g., error rate, success probability) |
| Baseline/control condition | The comparison condition a hypothesis's claim is measured against |

## Check yourself

Rewrite this vague interest into a testable, falsifiable hypothesis using the template: "I want to know if a variational algorithm does better with more layers." Name the specific technique, circuit/problem, hardware or simulator, comparison, and direction you would need to specify.
