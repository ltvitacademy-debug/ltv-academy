# Experimental Design: Controls & Baselines

A sharp hypothesis still needs an experiment capable of actually testing it. On real quantum hardware, that's harder than it sounds: the device itself is noisy and drifts over time, so without deliberate controls you can't tell whether a change in your measured result came from what you changed, or from the hardware changing underneath you.

## What you'll learn

- What a control condition is, and why quantum hardware makes controls unusually important
- The difference between a baseline and a control, and why both matter
- Sources of confounding variance specific to quantum experiments: hardware drift, queue-time calibration changes, shot noise, and simulator-vs-hardware differences
- How to design a basic quantum experiment with a real control group and a real baseline
- Why repetition (shots, and repeated circuit runs) is not optional in this domain

## Controls vs. baselines: related, but not the same thing

A **baseline** is the reference point your result is measured against — "no mitigation applied," "the classical algorithm's runtime," "the textbook-predicted success probability." A **control condition** is an experimental run designed specifically to isolate whether your change caused the effect you observed, as opposed to something else that happened to change at the same time. You can have a baseline without a proper control (compare your mitigated result to a baseline number from someone else's paper, run on different hardware, months apart — not a real control), and the difference between those two situations is exactly where many beginner "experiments" go wrong.

## Why quantum hardware makes controls unusually important

Real quantum devices are not static instruments. Between the time you queue a job and the time it runs, qubit error rates can shift from routine recalibration, temperature drift, and even which other jobs ran recently on a shared device. This means:

- Comparing "my technique, run today" against "someone else's reported baseline, run last month, on possibly different hardware" is **not a controlled comparison** — too many things differ besides the one variable you intended to test.
- The only comparison you can really trust is: **same hardware (or at least the same device generation and calibration window), same circuit structure, same number of shots, run as close together in time as practically possible, with only your one intended variable changed.**

## Designing a real control into a quantum experiment

Say your hypothesis is "zero-noise extrapolation reduces measured error on a 3-qubit GHZ circuit on Device X, relative to no mitigation." A properly controlled design:

1. **Control group**: run the identical GHZ circuit on Device X, same number of shots, with no mitigation applied.
2. **Treatment group**: run the identical GHZ circuit on Device X, same number of shots, with zero-noise extrapolation applied.
3. **Interleave them in time** — alternate control/treatment runs rather than running all controls first and all treatments hours later, specifically to average out hardware drift across both groups rather than letting drift become a confound for one group only.
4. **Hold circuit structure, qubit count, and shot count fixed** across both groups — the only thing that should differ is the one variable named in your hypothesis.

## Shot noise and why repetition is not optional

A single "run" of a quantum circuit on real hardware is a single projective measurement — inherently probabilistic, not a fixed deterministic output. Reporting a quantum result from one shot is like reporting a coin's fairness from one flip. Standard practice is to request many **shots** (repeated executions of the same circuit, typically hundreds to thousands) to build a measured probability distribution with a quantifiable statistical uncertainty, and often to repeat the *entire experiment* (not just shots within one job) multiple times across different queue windows to average out drift. A result reported without a shot count, or from a suspiciously small shot count, is a red flag you learned to spot in Lesson 2 — and a mistake to avoid making yourself.

## Simulator vs. hardware as its own variable

A noiseless simulator and real hardware are not interchangeable baselines. If your hypothesis is about a noise-mitigation technique, running it only on a noiseless simulator tells you nothing — there's no noise to mitigate. Conversely, if your hypothesis is about an algorithm's theoretical convergence behavior, real hardware's noise can dominate the measured result and hide the thing you're actually trying to test. Decide, as part of your experimental design, whether simulator or real hardware (or both, as separate conditions) actually matches what your hypothesis claims.

## Key terms

| Term | Meaning |
|---|---|
| Baseline | The reference value or condition a result is compared against |
| Control condition | An experimental run designed to isolate whether your intended variable, not something else, caused the observed effect |
| Confounding variable | An uncontrolled factor that changes alongside your intended variable, making cause unclear |
| Shot | One repeated execution of a quantum circuit on hardware or simulator, contributing to a measured probability distribution |
| Hardware drift | Real, time-varying change in a quantum device's error rates and calibration |

## Check yourself

A student runs their novel error-mitigation technique once on IBM's cloud hardware this week, then compares the result to a baseline number quoted from a paper published two years ago on a different device. Identify at least two specific confounds this comparison fails to control for, and describe the controlled design you'd use instead.
