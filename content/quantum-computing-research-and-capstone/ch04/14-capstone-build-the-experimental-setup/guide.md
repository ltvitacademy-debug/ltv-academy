# Capstone: Build the Experimental Setup

Chapter 4 follows one capstone — the Lesson 12 proposal's 3-vs-5-qubit GHZ/zero-noise-extrapolation comparison — through building, running, analyzing, handling the unexpected, iterating, and finalizing. This lesson covers the build step: turning your proposal into working, testable code before you spend any real queue time on it.

## What you'll learn

- Why you build and validate on a simulator before ever submitting to real hardware
- A concrete checklist for what "built" actually means before you run anything for real
- How to structure your code so a later unexpected result (Chapter 4's Lesson 17) is diagnosable, not a mystery
- A worked build plan for the running GHZ/ZNE capstone example

## Always validate on a simulator first

Every piece of your experimental setup — the GHZ circuit construction, the noise-scaling/folding logic for zero-noise extrapolation, the data-collection and extrapolation code — should run correctly on a noiseless local simulator (Qiskit Aer or equivalent) before it ever touches real cloud hardware. This isn't just about saving queue time, though it does that: a noiseless simulator run should produce the *exact theoretically predicted* GHZ measurement distribution, which gives you a hard, known-correct check on your circuit construction completely independent of hardware noise. A bug in your circuit will show up immediately against this known target; it would be far harder to spot once real hardware noise is also in the picture.

## A checklist for "built," before spending real queue time

- The circuit construction (GHZ state, any qubit count) produces the theoretically correct distribution on a noiseless simulator — verified, not assumed.
- The noise-scaling/folding logic for zero-noise extrapolation runs without errors on a simulator with an *injected, controlled* noise model (most Qiskit-family tools support this), and produces plausible-looking scaled results — larger scaling factors should show visibly more degraded distributions.
- The Richardson extrapolation fitting code runs on this injected-noise simulator data and produces an extrapolated estimate — check that the fit itself looks reasonable (not wildly extrapolating past the range of your actual data points) before trusting it on real data.
- Your data-recording format (Lesson 15 covers this directly) is decided and tested now, on simulator output, not improvised later on real hardware output when you're also managing queue time pressure.
- Your code can run the full pipeline — circuit, scaling, extrapolation — end to end on one qubit count with one command, so that running it on 3 qubits and then 5 qubits later is a configuration change, not a rewrite.

## Structuring code for diagnosability

Chapter 4's Lesson 17 will specifically ask you to handle an unexpected result — and the single biggest factor in whether that's a quick diagnosis or a frustrating mystery is whether you structured your code, right now, so you can isolate each stage. Concretely: save the raw measurement counts from each shot batch (not just the final computed probability), save the per-scaling-factor results before extrapolation (not just the final extrapolated number), and log which specific device and calibration timestamp each real-hardware run used. This is the direct software-engineering analog of Lesson 9's diagnostic checklist — you can't trace a discrepancy to its source if you only kept the final number.

## A worked build plan

For the running GHZ/ZNE capstone: build a `build_ghz_circuit(n_qubits)` function, tested against the known-correct distribution for n=3 on a noiseless simulator. Build a `apply_noise_scaling(circuit, factor)` function implementing unitary folding, tested against an injected-noise simulator model where you can confirm degradation increases with the scaling factor. Build a `richardson_extrapolate(scaled_results)` function, tested on simulator-generated data where you know the "true" zero-noise answer in advance (since you injected the noise model yourself), so you can confirm the extrapolation recovers something close to that known answer before ever trusting it on real hardware's actual unknown noise.

## Key terms

| Term | Meaning |
|---|---|
| Injected/controlled noise model | A simulator-level noise model with known parameters, used to validate analysis code against a known ground truth |
| Diagnosability | How easily a later unexpected result can be traced to its specific cause, determined largely by what intermediate data you chose to save |
| End-to-end pipeline | Code that runs every stage (circuit, data collection, analysis) with one command and a configuration change, not a rewrite, between conditions |

## Check yourself

Why does validating your zero-noise-extrapolation code against a simulator with a KNOWN injected noise model (where you can compute the true zero-noise answer yourself) give you a stronger check than validating only on a noiseless simulator? What specifically would the noiseless-only check fail to catch?
