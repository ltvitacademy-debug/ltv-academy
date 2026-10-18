# Calibration & Drift

A quantum chip's error rates are not a fixed spec printed on a datasheet — they are a snapshot of a system that keeps changing underneath you. This lesson covers why qubits drift, what providers do about it, and why this remains a real, ongoing operational burden rather than a problem anyone has fully solved.

## What you'll learn

- Why qubit parameters (frequency, coherence times, gate error rates) change over time instead of staying fixed
- The physical sources of that drift: thermal fluctuations, material defects, flux noise
- What a recalibration routine actually does, and why providers run them repeatedly
- Why a device's published fidelity number is a snapshot, not a permanent guarantee
- Why this is an open, ongoing engineering burden rather than solved infrastructure

## Qubits are not static

It's natural to assume that once a qubit is built and characterized, its properties — resonant frequency, coherence times (T1, T2), gate error rates — stay put. In real hardware, they don't. These parameters measurably drift on timescales ranging from minutes to days, and a calibration done this morning can already be meaningfully stale by this afternoon on some systems. This is one of the least glamorous but most consequential facts about operating real quantum hardware.

## Why qubits drift: three real physical sources

- **Thermal fluctuations.** Even inside a dilution refrigerator held near 10-20 millikelvin, small temperature fluctuations occur, and some qubit parameters are sensitive enough to them that tiny temperature changes shift behavior measurably.
- **Material defects — two-level systems (TLS) in dielectrics.** The physical materials a qubit is built from (insulating layers, substrates) are never perfectly uniform at the atomic scale. Microscopic defects in these dielectrics can themselves behave like tiny two-level quantum systems that interact with the qubit, and these defects can shift their own state over time, changing how they couple to the qubit and shifting its effective coherence.
- **Flux noise.** For qubit designs that are tuned via magnetic flux (common in superconducting qubits with tunable frequencies), low-frequency magnetic flux noise in the surrounding materials and circuitry causes the qubit's operating frequency to wander over time.

None of these are design mistakes — they're intrinsic to the physical materials and environment involved, and they are an active area of materials-science and device-engineering research in their own right, not something expected to disappear soon.

## What recalibration actually does

Because of this drift, providers don't calibrate a device once and leave it; they run **periodic recalibration jobs** — automated routines that re-measure key qubit parameters and re-tune the control pulses accordingly. A typical recalibration pass might re-measure each qubit's resonant frequency, re-optimize pulse amplitudes and timings for each gate, re-check readout discrimination, and update the error-rate numbers the provider publishes. These routines run on a schedule set by the provider (the exact cadence varies by platform and qubit type, and providers generally don't publish a single universal number), and they are themselves a meaningful operational cost — time spent recalibrating is time the device isn't running user circuits.

## The published fidelity number is a snapshot

This is the key practical consequence: when a device page shows a two-qubit gate error of, say, roughly 1%, that number reflects the most recent calibration run, not a permanent physical constant of that qubit pair. By the time you submit a job, actual performance could be somewhat better or meaningfully worse than the published number, depending on how much drift has occurred since that calibration and how sensitive your particular circuit is to the parameters that drifted. For workloads where this matters — deep circuits, tight error budgets, time-critical results — practitioners sometimes need to pull fresh calibration data close to actual runtime rather than trusting a number that could be hours or days old.

## Be honest about where this stands

It would be easy to describe recalibration as a solved background process that quietly keeps everything running smoothly. It isn't, fully. Recalibration is itself engineering work with real costs and real limits: it takes machine time away from running circuits, it can't outrun drift that happens faster than the recalibration cadence, and it doesn't eliminate run-to-run variability — it only bounds it. Anyone building a serious workload on real quantum hardware should plan for calibration drift as an ongoing fact of the platform, not treat it as an edge case that's already been engineered away.

## Key terms

| Term | Meaning |
|---|---|
| Drift | The gradual change in a qubit's frequency, coherence times, or error rates over time |
| Two-level system (TLS) defect | A microscopic material defect that behaves like its own quantum two-level system and can couple to and perturb a qubit |
| Flux noise | Low-frequency magnetic noise that causes the operating frequency of flux-tunable qubits to wander |
| Recalibration job | An automated, periodically run routine that re-measures qubit parameters and re-tunes control pulses |
| Fidelity snapshot | The idea that a published error rate reflects the most recent calibration, not a permanent guarantee |

## Check yourself

A team submits a long, sensitive circuit to a real device at 2 PM, relying on a calibration report generated at 6 AM that morning. What could go wrong, and what would you recommend they check before trusting the result?
