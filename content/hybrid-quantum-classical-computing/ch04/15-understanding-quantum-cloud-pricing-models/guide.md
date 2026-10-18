# Understanding Quantum Cloud Pricing Models

Two teams can run the identical algorithm on the identical problem and get wildly different bills, purely because of which backend and pricing model they chose. This lesson works through real, current pricing from the major providers so you can estimate cost before committing to an architecture, not after the invoice arrives.

## What you'll learn

- The real per-task/per-shot pricing AWS Braket charges across different QPU vendors
- How IBM Quantum's runtime-second billing compares to Braket's shot-based billing for the same workload
- How "program sets" reduce cost for batched workloads, with a verified real-world number
- How to compute and compare total cost across backends for the same job before running it
- Why picking the cheapest backend is not always the right choice once latency and accuracy are factored in

## AWS Braket's real pricing structure

AWS Braket charges a flat per-task fee plus a per-shot fee that varies by hardware vendor. As of the provider's published pricing:

| Device | Per-task fee | Per-shot fee |
|---|---|---|
| IonQ Aria | $0.30 | $0.03 |
| IonQ Harmony / QuEra Aquila | $0.30 | $0.01 |
| Rigetti Ankaa-3 | $0.30 | $0.0009 |
| OQC Lucy / Rigetti Aspen-M | $0.30 | $0.00035 |

For the same 200-task, 1,000-shot-per-task job, the total cost differs enormously by device:

```
IonQ Aria:      200 x $0.30 + 200,000 x $0.03     = $60.00 + $6,000.00  = $6,060.00
Rigetti Ankaa-3: 200 x $0.30 + 200,000 x $0.0009   = $60.00 +    $180.00 =   $240.00
OQC Lucy:        200 x $0.30 + 200,000 x $0.00035  = $60.00 +     $70.00 =   $130.00
```

A 25-46x cost difference for the identical workload, purely from device choice — before any discussion of which device's qubit count, connectivity, or error rate actually suits the problem.

![Amazon Braket Create spending limit form](/courses/hybrid-quantum-classical-computing/ch04/15-understanding-quantum-cloud-pricing-models/aws-create-spending-limit.webp)
*The actual form behind every pricing decision in this lesson — a real per-device dollar ceiling.*

![Amazon Braket Spending limits, live](/courses/hybrid-quantum-classical-computing/ch04/15-understanding-quantum-cloud-pricing-models/aws-spending-limits.webp)
*Real per-QPU caps as they appear once set — the control panel these pricing decisions feed into.*

## IBM Quantum's different pricing dimension

IBM Quantum's Pay-As-You-Go plan bills by runtime second (roughly $1.60/billable second), not by task or shot count directly. Estimating a job's cost on IBM therefore requires estimating its wall-clock runtime, not its shot count:

```
Estimated runtime for the same job: 240 seconds (4 minutes)
IBM Pay-As-You-Go cost = 240 x $1.60 = $384.00
IBM Premium-plan-equivalent rate ($48/min = $0.80/sec) = 240 x $0.80 = $192.00
```

This is why Lesson 10's point about pricing dimension matters concretely: you cannot compare Braket's $240 Ankaa-3 quote against IBM's cost by just looking at shot counts — IBM's number depends on how long the job actually takes to run, which depends on circuit depth and queueing behavior IBM counts toward billable time, not on shots directly.

![Microsoft's own Azure Quantum resource estimator diagram](/courses/hybrid-quantum-classical-computing/ch04/15-understanding-quantum-cloud-pricing-models/azure-resource-estimator-overview.png)
*A different provider, a different pricing dimension — this is Azure's own real estimation model.*

## Program sets: a verified real discount for batched workloads

AWS's own published example: running 100 circuits at 1,000 shots each on Rigetti Ankaa-3, submitted as 100 separate tasks versus as one program set:

```
Without program sets: 100 x $0.30 + 100,000 x $0.0009 = $30.00 + $90.00 = $120.00
With program sets:       1 x $0.30 + 100,000 x $0.0009 =  $0.30 + $90.00 =  $90.30
Savings: $29.70 (24.75% reduction), entirely from paying the per-task fee once instead of 100 times
```

The per-shot cost is identical either way — the saving comes entirely from eliminating 99 redundant per-task fees, which is exactly the batching benefit described from a latency angle in Lesson 11 and from a cost angle here.

## Why the cheapest backend isn't automatically the right choice

OQC Lucy was the cheapest device in the first table, but a real selection decision also has to weigh: qubit count and connectivity (does the circuit even fit?), native gate error rates (does a cheap, noisy device produce an answer precise enough to be useful, independent of shot count?), and queue depth (Chapter 3's latency lesson) — a cheaper device with a much longer queue may cost more in total project time than a pricier one with fast turnaround. Cost is one input to the backend-selection decision, never the only one.

## Key terms

| Term | Meaning |
|---|---|
| Per-task fee | A flat fee charged per circuit submission, independent of shot count, on providers like AWS Braket |
| Per-shot fee | A fee charged per individual shot executed, varying by device/hardware vendor |
| Runtime-second billing | IBM Quantum's pricing model charging by wall-clock execution time rather than shots or tasks |
| Program set | A Braket mechanism batching multiple circuits under a single per-task fee while still billing per-shot normally |
| Backend selection tradeoff | Balancing cost against qubit count/connectivity, error rate, and queue depth when choosing a device |

## Check yourself

A job needs 50 tasks at 2,000 shots each. Compute its total cost on IonQ Harmony ($0.30/task + $0.01/shot) both with and without program-set batching, and state the dollar and percentage savings from batching.
