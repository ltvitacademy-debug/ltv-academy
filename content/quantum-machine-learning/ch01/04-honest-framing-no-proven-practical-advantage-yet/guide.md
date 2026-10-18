# Honest Framing: No Proven Practical Advantage Yet

This lesson closes out the foundations chapter with the single most important disclaimer in the whole course, stated precisely enough that you can defend it in a technical conversation rather than just repeating it as a slogan.

## What you'll learn

- The precise claim this course makes (and does not make) about quantum advantage in ML
- What "quantum supremacy/advantage" experiments have actually demonstrated, and why none were ML tasks with practical value
- Common overclaiming patterns in QML papers and vendor marketing, and how to spot them
- What evidence WOULD convince a skeptical reader that a QML practical advantage exists
- Why "no proven advantage yet" is not the same as "QML is worthless"

## The precise claim

Say it exactly, not loosely: **as of today, there is no peer-reviewed, independently reproduced result showing a quantum machine learning method outperforming the best available classical method on a real-world, practically relevant task, under a fair comparison.** Every clause there is load-bearing:

- "Peer-reviewed and independently reproduced" rules out single-paper claims that haven't been checked by other groups, and rules out vendor press releases.
- "Real-world, practically relevant task" rules out carefully constructed, artificial problems designed specifically to favor the quantum method (these exist and are legitimate complexity-theory results, but they are not business problems).
- "Best available classical method" rules out comparisons against a weak or outdated classical baseline — a common way papers inflate apparent "advantage."
- "Fair comparison" rules out comparisons that ignore the classical cost of simulating the quantum part, or that don't count the classical optimizer overhead in a hybrid loop.

## What quantum advantage experiments have actually shown

You may have heard of "quantum supremacy" or "quantum advantage" demonstrations (Google's 2019 Sycamore experiment, later experiments from USTC and others). These are real, legitimate results — but it's critical to know exactly what they showed: that a quantum processor can sample from the output distribution of a specific, contrived random circuit faster than a classical supercomputer could simulate it. This is a deliberately chosen task with no practical application; it exists purely to demonstrate a measurable gap between quantum and classical computation on *some* task. It is not an ML task, it is not an optimization task someone needs solved, and it does not generalize to a claim about ML advantage.

Separately, some of these specific classical-simulation-time estimates were later revised downward by improved classical algorithms — part of the same cat-and-mouse dynamic you saw with "dequantization" in Lesson 1. None of this is cause for cynicism about quantum computing broadly; it's exactly why "advantage" claims need to be read carefully and re-checked over time rather than taken as permanent.

## Common overclaiming patterns to watch for

When you read a QML paper, vendor blog post, or conference talk, watch for these patterns:

1. **Weak classical baseline**: comparing against an unoptimized or outdated classical model instead of a strong one (e.g., a shallow neural net instead of a tuned gradient-boosted tree).
2. **Cherry-picked dataset size**: showing an "advantage" only at a toy dataset size that happens to flatter the quantum method, with no discussion of what happens as data scales.
3. **Ignoring classical simulation cost**: if the "quantum" result was actually produced by classically simulating the circuit (common for small qubit counts), the comparison should honestly include that simulation's classical cost.
4. **Confusing a speedup proof for a near-term claim**: citing a theoretical big-O speedup from an idealized, fault-tolerant setting as though it applies to current NISQ hardware.
5. **No error bars or hyperparameter search parity**: the quantum model was tuned extensively while the classical baseline was run with defaults, or vice versa.

## What would actually count as evidence

A convincing claim would include: a real dataset practitioners already care about, a classical baseline tuned with comparable effort (same hyperparameter search budget, same feature engineering effort), a clear accounting of total cost (compute time, hardware access cost, including classical simulation overhead if applicable), and independent replication by a group with no commercial stake in the result. This is a high bar — intentionally so, because extraordinary claims about beating decades of classical ML optimization deserve extraordinary scrutiny.

## "No advantage yet" is not "worthless"

This is not a course about why QML is pointless. It's a course about building real skill in an early-stage research field where the correct professional posture is calibrated uncertainty: build things, understand them deeply, and don't claim more than the evidence supports. That posture is itself a valuable, rare skill — in quantum computing and everywhere else.

## Key terms

| Term | Meaning |
|---|---|
| Quantum advantage / supremacy | A demonstrated gap where a quantum processor completes a specific task faster than any known classical method; existing demonstrations use contrived, non-practical tasks |
| Fair comparison | A benchmark that uses a strong classical baseline, honest cost accounting, and comparable tuning effort on both sides |
| Weak baseline | An outdated or under-tuned classical model used (sometimes unintentionally) to make a new method look better than it is |
| Calibrated uncertainty | Holding a belief in proportion to the actual evidence for it — neither dismissing nor overclaiming a result |

## Check yourself

A vendor claims their quantum classifier "beats classical ML by 20% on fraud detection." List three specific questions from this lesson you would ask before accepting that claim.
