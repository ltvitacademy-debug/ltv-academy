# Cloud Quantum Provider APIs: Overview

Every hybrid application talks to quantum hardware through a cloud provider's API — there is no on-premise alternative at any real scale today. Knowing the shape of these APIs, and where they genuinely differ, is what the provider-abstraction fix from Lesson 5 is built around.

## What you'll learn

- The common API shape shared by the major quantum cloud providers
- Where AWS Braket, IBM Quantum, and Azure Quantum genuinely differ (pricing model, device access, queueing)
- What a job's lifecycle (submit -> queue -> run -> complete/fail) looks like from your orchestration code's point of view
- How to read a provider's device-status/calibration metadata before submitting a job
- Why the abstraction layer from Lesson 5 has to hide these differences, not just the SDK's syntax

## The common shape: submit, poll or subscribe, retrieve

Every major provider's API follows the same basic lifecycle from the caller's side:

```
1. submit(circuit, shots, device_id) -> job_id      # async, returns immediately
2. poll(job_id) -> status                            # QUEUED | RUNNING | COMPLETED | FAILED | CANCELLED
   (or subscribe to a completion callback/webhook, where supported)
3. get_result(job_id) -> counts (if COMPLETED) or error details (if FAILED)
```

This asynchronous submit-then-poll shape exists because a QPU job can sit in a queue for seconds to hours depending on device demand — there is no "call and block" model for real hardware the way there is for a local simulator. Your classical orchestration code (Lesson 11) has to be written around this asynchronous lifecycle from the start, not bolted on afterward.

## Where the three major providers genuinely differ

| Dimension | AWS Braket | IBM Quantum | Azure Quantum |
|---|---|---|---|
| Pricing model | Per-task fee + per-shot fee, varies by device (e.g., $0.30/task + $0.03/shot on IonQ Aria) | Runtime-second billing on Pay-As-You-Go (around $1.60/billable second); contract-based Premium/Flex plans | Marketplace model: billing terms set per hardware-partner (varies by partner) |
| Device access | Multiple hardware vendors (IonQ, Rigetti, OQC, QuEra) through one account/API | IBM's own superconducting devices (plus simulators) | Multiple hardware partners (IonQ, Quantinuum, Rigetti, others) through one portal |
| Cost unit that matters most | Shots x price-per-shot, plus a flat per-task fee — cost scales with shot count | Wall-clock runtime seconds — cost scales with how long your circuit/session actually runs, not shot count directly | Depends on the selected partner's own pricing unit |
| Program batching | "Program sets" let many circuits share one per-task fee (covered in Chapter 4) | Qiskit Runtime "primitives" (Sampler/Estimator) batch related circuit executions within one session | Partner-dependent |

The practical consequence: a cost model built around "per shot" (natural for Braket) doesn't translate directly to IBM's "per runtime second" billing — your cost-estimation code (Chapter 4) has to know which pricing dimension actually applies to the backend currently selected, which is exactly the kind of provider-specific detail the abstraction layer's `estimate_cost()` method (Lesson 5) is responsible for hiding behind one consistent interface.

## Reading device status before you submit

Every provider exposes device/backend metadata — queue depth, operational status, and calibration data (error rates per qubit, last calibration timestamp) — before you submit a job. Checking this metadata first is a cheap, zero-cost API call that can save an expensive, slow job: a device flagged `offline` or mid-recalibration will reject or badly degrade a submission, and a device with a long queue might make a different (even if slightly more expensive) device the better choice for a latency-sensitive job (Chapter 4's latency-budget lesson covers this tradeoff explicitly).

## Why the abstraction layer needs to hide pricing dimension, not just syntax

Lesson 5 introduced a thin interface (`submit_circuit`, `get_result`, `estimate_cost`) to avoid vendor lock-in. The pricing comparison above shows why `estimate_cost()` specifically can't be a single shared formula — a Braket adapter computes cost from `(tasks, shots)`, while an IBM adapter has to estimate cost from `(predicted runtime seconds)`, an entirely different input. The abstraction's job is to let calling code say `estimate_cost(circuit, shots)` and get back a correct dollar figure regardless of which pricing dimension the underlying provider actually bills on — the complexity lives in the adapter, not the caller.

## Key terms

| Term | Meaning |
|---|---|
| Job lifecycle | The submit -> queue -> run -> complete/fail sequence every cloud quantum job goes through, queried asynchronously |
| Device/backend metadata | Provider-exposed data on a device's queue depth, operational status, and calibration quality, checkable before submission |
| Runtime-second billing | IBM Quantum's pricing model, charging by wall-clock execution time rather than per-shot |
| Program set / session | A provider mechanism for batching multiple circuit executions to amortize a flat per-task fee or share session overhead |
| Pricing dimension | The specific unit (shots, runtime seconds, etc.) a given provider actually bills on, which an abstraction layer must account for |

## Check yourself

Your orchestration code needs to estimate the cost of the same 500-shot circuit on both an AWS Braket IonQ device and an IBM Quantum Pay-As-You-Go device. Explain why a single `cost = shots x price_per_shot` formula works for one provider but not the other, and what information your `estimate_cost()` adapter would need for each.
