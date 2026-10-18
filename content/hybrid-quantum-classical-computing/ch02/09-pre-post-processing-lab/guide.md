# Pre/Post-Processing Lab

This lab chains the two halves of the classical sandwich around a quantum circuit — data prep going in (Lesson 6), result aggregation coming out (Lesson 8) — into one worked pipeline, the shape you'll actually write in production.

## What you'll learn

- How to build a full classical-prep -> circuit -> classical-post-process pipeline end to end
- How to catch a normalization bug and a sign-convention bug using the same test strategy
- How to structure pipeline code so pre- and post-processing are independently testable
- How to validate a pipeline's correctness using a synthetic, known-answer input before trusting it on real data
- What a complete pipeline's cost and latency "surface area" looks like once pre/post are counted

## The pipeline, with both classical halves explicit

```
raw feature vector [3,1,4,1,5,9,2,6]
        │  classical: normalize (Lesson 6) -> [0.2281, 0.0760, 0.3041, 0.0760,
        ▼               0.3801, 0.6843, 0.1521, 0.4562], 3 qubits
   amplitude-encoded circuit
        │  quantum: execute 1,000 shots
        ▼
   measurement counts {"0":612, "1":388, ...}  (full 3-qubit counts in practice;
        │               simplified to a single-qubit observable here)
        │  classical: aggregate (Lesson 8) -> <Z> = 0.224, stderr = 0.032
        ▼
   result consumed by business logic / optimizer
```

Notice both the top and bottom of this diagram are classical code you own completely, and the middle is the one line that calls a remote API. This is the same shape as the architecture diagram from Lesson 1, now filled in with the specific classical operations from this chapter.

## Building it so each half is independently testable

A pipeline written as one long function (`run_pipeline(raw_data)` that normalizes, submits, waits, and aggregates in one block) is hard to test, because the only way to exercise the normalization logic is to also run a real circuit. Split it into three units with clear boundaries:

```
normalize(raw_vector) -> normalized_vector            # pure function, no I/O
submit_and_wait(normalized_vector, shots) -> counts    # the only part touching the network/QPU
aggregate(counts, shots) -> (expectation_value, stderr)  # pure function, no I/O
```

`normalize` and `aggregate` are pure functions with no network dependency — they can be unit-tested with hardcoded inputs and known-correct outputs in milliseconds, with zero QPU cost, exactly like testing any other data-transformation function. Only `submit_and_wait` needs an integration test against a simulator or real backend.

## Catching the two classic bugs with unit tests

**Normalization bug test**: feed `normalize` the vector `[2,2,2,2]` and assert the output is `[0.5, 0.5, 0.5, 0.5]` (since `sqrt(4x4)=4`, each entry becomes `2/4=0.5`) and that `sum(x**2 for x in output) == 1.0`. A bug that normalizes by the sum instead of the sum-of-squares, or forgets the square root, fails this test immediately — before ever touching a circuit.

**Sign-convention bug test**: feed `aggregate` the synthetic counts `{"0": 1000, "1": 0}` (shots=1000) and assert the result is exactly `+1.0` (since every shot measured `|0⟩`), then feed `{"0": 0, "1": 1000}` and assert exactly `-1.0`. A sign-convention bug (Lesson 8's Mistake) flips one or both of these, and the test catches it without needing any ambiguous real-world data where the "right" answer isn't already known.

## Why this test strategy matters more here than in typical software

In most classical pipelines, a bug like this gets caught quickly because wrong answers look obviously wrong. In a hybrid pipeline, a sign-flip or bad normalization doesn't crash anything and doesn't look obviously wrong — it produces a plausible-looking number that is simply incorrect, and because the "ground truth" for a real quantum problem is often exactly what you're trying to discover, there's no obvious sanity check available on real data. Testing pre/post-processing against synthetic, known-answer inputs is the only reliable way to catch these bugs before they corrupt a real, expensive run.

## Key terms

| Term | Meaning |
|---|---|
| Pure function | A function with no side effects or external dependencies (no network calls), given the same input it always returns the same output |
| Known-answer test | A unit test using a synthetic input chosen specifically because its correct output is already known, independent of any real circuit execution |
| Pipeline boundary | The clear separation between classical pre-processing, the one network-touching call, and classical post-processing, enabling independent testing |
| Integration test | A test exercising the real network/QPU call, as opposed to the pure-function unit tests around it |
| Silent corruption | A bug that produces a plausible-looking but incorrect result with no crash or visible error, common in pre/post-processing bugs |

## Check yourself

Write out (in pseudocode or prose) a known-answer unit test for the shot-weighted aggregation logic from Lesson 8, using two synthetic circuit submissions whose correct combined expectation value you can compute by hand before writing the test. State the two inputs and the expected output.
