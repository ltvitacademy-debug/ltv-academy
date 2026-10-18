# Gate Errors vs. Decoherence Errors

Not all quantum errors come from the same place. A qubit sitting perfectly idle can still accumulate errors just from waiting — and a qubit being actively manipulated can pick up errors from the manipulation itself, independent of how long that takes. Telling these two sources apart is essential for knowing where to spend engineering effort.

## What you'll learn

- The difference between idle (decoherence-driven) errors and active gate errors
- Why idle errors scale with time while gate errors scale with gate count
- What causes gate errors specifically: control pulse miscalibration and crosstalk
- Why both error budgets have to be managed together, not traded off against each other

## Two different clocks are running

Lesson 1 showed that decoherence probability grows with elapsed time: decayProb = 1 − e^(−t/T1). That error source doesn't care whether a gate is being applied or the qubit is just sitting there waiting its turn in the circuit — it only cares about how much *time* has passed since the qubit was last in a clean state. Call this an **idle error**, or more precisely a **decoherence error**: it accumulates continuously, driven by the T1/T2 physics covered in Lesson 1, whether or not anything is actively being done to the qubit.

A **gate error** is a different animal entirely. It's the error introduced by the *imperfection of an operation itself* — the control pulse that implements an X rotation isn't shaped with perfect precision, the microwave or laser pulse amplitude is slightly miscalibrated, or a pulse meant for one qubit bleeds a little bit of its energy into a neighboring qubit (**crosstalk**). These errors happen because of what the gate is doing, not primarily because of how long it takes. To a reasonable first approximation, a given gate type on a given piece of hardware carries roughly the same error probability per application, largely independent of whether that gate's native duration is 20 ns or 200 ns.

## Why the distinction matters: two different scaling laws

This is the crux of the lesson: these two error sources scale differently as a circuit grows.

- **Decoherence (idle) error** scales with **total elapsed time** — run a longer circuit, or add idle "wait" periods between operations, and this error source grows accordingly, following the exponential relationship from Lesson 1.
- **Gate error** scales with **number of gate operations** — add more gates to a circuit, and you add roughly that many fixed, roughly-constant-sized error contributions, regardless of each gate's individual duration.

Revisit the Lesson 1 table with this distinction in mind:

| Gate time | Decoherence probability (idle, T1=100 µs) |
|---|---|
| 20 ns | ≈ 1.9998 × 10⁻⁴ |
| 50 ns | ≈ 4.9988 × 10⁻⁴ |
| 200 ns | ≈ 1.9980 × 10⁻³ |
| 1,000 ns | ≈ 9.9502 × 10⁻³ |

If a hardware platform has, say, a fixed gate-error budget around 1 × 10⁻³ per gate (a realistic order of magnitude for a well-calibrated two-qubit gate on current hardware) regardless of whether that gate takes 20 ns or 200 ns to execute, then at short gate times the gate error actually *dominates* the decoherence error (compare 1×10⁻³ against 20ns's 2×10⁻⁴ decoherence) — while at longer gate times decoherence catches up and can become comparable or larger. Neither error source is free to ignore: a hardware team racing to shrink gate durations purely to cut decoherence will still be capped by whatever fixed gate-error floor their control electronics can achieve, and a team improving pulse calibration to cut gate error will still watch decoherence creep up if their circuits run long.

## Why both budgets matter for circuit design

This is exactly why quantum circuit compilers and error-correction engineers track **both** numbers for a given piece of hardware, not just one: the per-gate error rate and T1/T2. A circuit with few gates that happen to be individually slow may be dominated by decoherence; a circuit with many gates that are each individually fast may be dominated by gate error. Reducing total circuit error means attacking whichever source actually dominates for a given hardware platform and algorithm — and quantum error-correcting codes, built in the chapters ahead, are designed to tolerate a combined error budget from both sources, not just one.

## Key terms

| Term | Meaning |
|---|---|
| Idle / decoherence error | Error accumulated from T1/T2 physics as a function of elapsed time, independent of whether a gate is being applied |
| Gate error | Error introduced by the imperfection of an operation itself (pulse miscalibration, crosstalk), roughly constant per gate application regardless of its duration |
| Crosstalk | Unwanted interference where a control pulse intended for one qubit partially affects a neighboring qubit |
| Error budget | The total tolerable error rate for a circuit or gate, used to decide how much margin is available for each error source |

## Check yourself

Suppose a hardware team doubles their qubit's T1 (cutting decoherence error roughly in half for a given gate duration) but makes no changes to their control pulse calibration. For a circuit that was previously dominated by gate error rather than decoherence, roughly how much would you expect total circuit error to improve — and why does that tell you where the team should have focused their engineering effort instead?
