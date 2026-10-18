# Extracting a Reproducible Methodology From a Paper

Once you've picked a paper, the real work begins: turning its prose, figures, and equations into a concrete, buildable plan — the circuit, the parameters, the comparison — before you write a single line of code.

## What you'll learn

- A systematic process for extracting a methodology from text, figures, and equations
- How to handle the near-universal gap between what a paper describes and what it actually specifies
- Where to find the details papers often bury: appendices, supplementary material, and cited prior methods
- How to write your own methodology document before coding, and why that order matters
- A worked example extracting a methodology from a realistic paper excerpt

## A systematic extraction process

1. **Identify the exact result you're targeting.** One specific figure, one specific table row, one specific claimed number — not "the paper's overall finding."
2. **Trace that result backward through the methods section.** What circuit produces it? What parameters (shots, repetitions, optimizer settings for variational methods, specific gate sequence) does the methods section specify for that circuit?
3. **Check every figure caption and table footnote**, not just the body text — papers routinely put essential parameter values (shot counts, device names, error bars' meaning) in captions and footnotes that are easy to skip past.
4. **Check the appendix/supplementary material** for anything the main text references but doesn't fully specify — exact gate decompositions, calibration dates, random seeds.
5. **Check cited prior work for any method the paper builds on but doesn't re-explain** — a common and reasonable practice is "we use the technique described in [X]," which sends you to a second paper for the actual procedure.
6. **Write your own methodology document** before coding: a plain-language, step-by-step description of exactly what you're going to build, in your own words, distinct from the paper's. This step matters more than it looks — translating the paper's description into your own words is where you discover what you actually don't understand yet, before it costs you debugging time.

## The near-universal specification gap

Even well-written papers rarely specify every detail needed for an exact rebuild — not out of carelessness, but because some details (random seed, exact classical optimizer tolerance, minor circuit transpilation choices) are considered unimportant to the claim and are genuinely unimportant to its qualitative truth. Your job is to distinguish:

- **Details that plausibly don't affect the qualitative result** (e.g., the exact random seed for a stochastic optimizer, if the paper's claim is about convergence behavior on average) — reasonable to choose yourself and document that choice.
- **Details that plausibly do affect the result and aren't specified** (e.g., which specific error-mitigation sub-technique was used, when several variants exist) — this is a real gap you must flag explicitly, not silently guess around, because it directly affects how you interpret any discrepancy later (Lesson 9).

## A worked example

Imagine a paper's methods section states: *"We prepared a 3-qubit GHZ state and applied zero-noise extrapolation using the technique of [citation], executing 1,024 shots per noise-scaling factor on ibmq_device_name (accessed Q1 2024)."* A figure caption adds: *"Noise scaling factors: 1, 1.5, 2, 2.5, 3."* The appendix states: *"Richardson extrapolation was used to estimate the zero-noise limit."*

Extracting this methodology:

- **Circuit**: standard 3-qubit GHZ preparation (H on qubit 0, CNOT 0→1, CNOT 0→2) — a circuit you already know how to build from earlier courses.
- **Technique**: zero-noise extrapolation via unitary folding, per the cited method — you'd need to pull up that citation to confirm exactly how folding was implemented, since "the technique of [citation]" doesn't fully specify it in this paper alone.
- **Parameters**: 1,024 shots per scaling factor; scaling factors 1, 1.5, 2, 2.5, 3 (five total conditions); Richardson extrapolation (not linear) for the final estimate.
- **Hardware**: a specific named device, accessed in a specific quarter — you cannot access the identical calibration state, so you'd document that your attempt uses the same device model (if still available) or an explicitly different one, framing the comparison honestly per Lesson 6's robustness framing.
- **Gap flagged**: the paper doesn't state the exact classical fitting procedure's tolerance for the Richardson extrapolation — a detail you'd document as your own reasonable choice, not the paper's specification.

This is exactly the kind of methodology document — specific, honest about what's known versus assumed — that you'd write before coding anything.

## Key terms

| Term | Meaning |
|---|---|
| Methodology extraction | The process of turning a paper's description into a concrete, buildable experimental plan |
| Specification gap | A detail needed to rebuild an experiment that the paper doesn't fully specify |
| Unitary folding | A zero-noise extrapolation technique that artificially increases a circuit's noise in a controlled way |
| Richardson extrapolation | A method for estimating a zero-noise limit from measurements at multiple scaled noise levels |

## Check yourself

A paper you're extracting a methodology from states a circuit's gate sequence precisely, but never specifies how many shots were run per data point. Using this lesson's framework, is that a detail you can reasonably choose yourself and document, or a gap you should flag as potentially affecting the result? Justify your answer.
