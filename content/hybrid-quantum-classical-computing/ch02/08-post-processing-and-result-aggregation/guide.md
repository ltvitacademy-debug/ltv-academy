# Post-Processing & Result Aggregation

A quantum circuit doesn't hand you an answer — it hands you a dictionary of bitstring counts. Turning that into the number your business logic actually needs is entirely classical code, and it's where a surprising number of production bugs hide.

## What you'll learn

- What a raw measurement result actually looks like coming back from a quantum backend
- How to convert measurement counts into an expectation value, with real arithmetic
- Why you must report a standard error alongside every expectation value, not just the value itself
- How to aggregate results across multiple circuit submissions (e.g., program sets) correctly
- Common post-processing bugs: sign errors, wrong basis mapping, and silently dropped shots

## What comes back from the backend

A circuit measuring a single qubit 1,000 times does not return "0.224." It returns something like:

```json
{ "counts": { "0": 612, "1": 388 }, "shots": 1000 }
```

Everything past this point — converting these counts into a usable number — is classical post-processing code you write and test like any other code.

## Converting counts into an expectation value

For a Z-basis measurement, the convention is `|0⟩ → eigenvalue +1`, `|1⟩ → eigenvalue -1`. The expectation value is the counts-weighted average of these eigenvalues:

```
<Z> = (counts[0] x (+1) + counts[1] x (-1)) / shots
    = (612 x 1 + 388 x (-1)) / 1000
    = (612 - 388) / 1000
    = 224 / 1000
    = 0.2240
```

This single number — 0.2240 — is what feeds into the cost function in the variational loop (Lesson 2) or into the final business result. Get the eigenvalue mapping backwards (treating `|0⟩` as -1 and `|1⟩` as +1) and every downstream number has its sign flipped, silently, with no error thrown anywhere in the pipeline.

## Always attach a standard error to the number

The same 1,000-shot measurement has an approximate standard error of `1/sqrt(1000) ≈ 0.0316`. Reporting `<Z> = 0.2240` with no uncertainty attached invites exactly the Mistake-4 error from Lesson 5: treating two expectation values that differ by less than the standard error as meaningfully different. The correct way to report this result, every time, is `<Z> = 0.224 ± 0.032` (one standard error), so that anyone consuming the number downstream — a dashboard, an optimizer, a human reviewer — can immediately judge whether an observed difference is signal or noise.

## Aggregating results across multiple circuit submissions

When a job is split across multiple submissions — for example, a program set of 100 circuits (Chapter 4 covers why providers offer these for cost reasons) — each circuit returns its own counts dictionary, and classical code has to combine them correctly. The common mistake is averaging the per-circuit expectation values with equal weight when the circuits didn't run the same number of shots each (e.g., one partially failed and was retried with fewer shots). The correct aggregation weights each circuit's contribution by its actual shot count:

```
combined <Z> = sum(counts_i[0] - counts_i[1] for each circuit i) / sum(shots_i for each circuit i)
```

not a simple average of each circuit's individual `<Z>_i`, which would silently over-weight low-shot (and therefore noisier) circuits equally with high-shot ones.

## Three post-processing bugs that are easy to ship

1. **Sign/basis errors**: assuming the wrong eigenvalue convention for a measurement basis, silently flipping every downstream result.
2. **Dropped or double-counted shots**: a retried sub-task's counts get added to the original partial result instead of replacing it (or vice versa), corrupting the shot total used in the denominator.
3. **Ignoring readout error without correction**: raw counts include a known, roughly-characterized measurement error rate; some pipelines apply a readout-error mitigation step (reweighting counts based on a calibration matrix) before computing the expectation value, and skipping this step when the pipeline was designed around it silently biases every result.

Every one of these is caught the same way any classical data-pipeline bug is caught: unit tests against known-answer synthetic counts dictionaries, not by staring at the final number and guessing whether it looks right.

## Key terms

| Term | Meaning |
|---|---|
| Measurement counts | The raw dictionary of bitstring -> occurrence-count returned by a quantum backend after a circuit's shots complete |
| Expectation value | The counts-weighted average of a basis's eigenvalues, e.g. <Z>, used as the cost-function value in a variational loop |
| Standard error | The statistical uncertainty of an expectation value estimated from a finite number of shots, approximately 1/sqrt(shots) |
| Shot-weighted aggregation | Combining results across multiple circuit submissions by weighting each by its own shot count, not by simple averaging |
| Readout-error mitigation | A calibration-based correction applied to raw counts to reduce bias from known measurement error rates |

## Check yourself

Two circuit submissions for the same observable returned: submission A, 800 shots, counts {0: 500, 1: 300}; submission B, 200 shots (a partial retry), counts {0: 140, 1: 60}. Compute the correctly shot-weighted combined expectation value, and separately compute what a naive unweighted average of the two circuits' individual expectation values would give. Explain why the two numbers differ.
