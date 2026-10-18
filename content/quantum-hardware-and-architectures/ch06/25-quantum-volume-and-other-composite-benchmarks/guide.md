# Quantum Volume & Other Composite Benchmarks

The last lesson argued that qubit count, fidelity, and connectivity all matter together, not separately — which raises an obvious question: can you fold them into one number? Several vendors have tried. This lesson covers the best-known attempt and teaches you to stay skeptical of all of them.

## What you'll learn

- What IBM's Quantum Volume (QV) benchmark actually measures and how it's constructed
- Why QV folds qubit count, connectivity, gate fidelity, and crosstalk into a single comparable number
- The doubling relationship between QV and the largest "square" circuit a device can reliably run
- That other composite benchmarks exist (CLOPS, algorithmic qubits) and measure genuinely different things
- Why no single benchmark number should be trusted uncritically, especially one promoted by the vendor it favors

## What Quantum Volume actually does

Quantum Volume, introduced by IBM, is built around a simple idea: stop asking "how many qubits does this chip have" and instead ask "what is the largest *random* circuit this chip can run and still trust the answer." Concretely, QV testing runs many random "square" circuits — circuits using `n` qubits arranged in `n` layers of random two-qubit operations drawn from a fixed model — and checks whether the device's output distribution is close enough to the ideal (simulated) output distribution, using a specific statistical threshold for "close enough." The benchmark then finds the largest `n` for which the device passes that test reliably. That single number, `n`, is deliberately converted into a benchmark score using `QV = 2^n`, so if a device's largest passing square circuit is `n = 6`, its Quantum Volume is `2^6 = 64`; if it manages `n = 7`, its QV is `2^7 = 128`. The reason QV doubles with each step up in `n` rather than growing linearly is intentional — it reflects how quickly circuits actually get harder to run correctly as both qubit count and depth grow together, so a jump from QV 64 to QV 128 represents a real, nontrivial jump in capability, not a small increment.

## Why this is more informative than qubit count alone

A device cannot score well on Quantum Volume by having many qubits alone, because the test circuits grow in *depth* at the same rate they grow in *width* — an `n`-qubit circuit uses `n` layers of gates. To pass at a given `n`, the device needs enough qubits to hold the circuit, good enough gate fidelity to survive `n` layers of two-qubit operations without the result degrading past the statistical threshold, and good enough connectivity that the random two-qubit operations the test calls for don't require so much SWAP overhead that the effective depth blows past what the device's fidelity can sustain. In other words, QV is a deliberate attempt to force exactly the three-way AND from the previous lesson into a single falling-or-passing test, repeated across increasing values of `n` until the device fails. That's a meaningfully more honest number than qubit count, because a device can't game it just by adding qubits that don't connect well or that compound too much error once the circuit gets deep enough.

## What Quantum Volume does not tell you

QV is still a single aggregate number, and aggregating always loses information. It uses one specific family of random circuits, so it measures how a device handles *that* statistical profile of circuit, not necessarily how it will handle your specific structured algorithm, which may stress connectivity or depth very differently than a random circuit does. It also doesn't tell you anything about raw speed — how long the device takes to actually run those circuits — which matters a great deal if your workload needs many repeated circuit executions. And because the test circuits are square (`n` qubits by `n` layers), QV doesn't directly tell you how a device handles circuits that are much wider than they are deep, or much deeper than they are wide — both of which are common in real algorithms.

## Other composite benchmarks exist, and they measure different things

QV is not the only attempt to compress hardware capability into one number, and you should expect to see others cited, especially by vendors whose devices score well on them:

- **CLOPS** (Circuit Layer Operations Per Second) — introduced alongside QV, this measures *speed*: how many layers of a benchmark circuit a device can execute per second, which QV itself does not capture.
- **Algorithmic qubits** — a metric promoted by some trapped-ion vendors that attempts to express, in qubit-count-like units, how many "good enough" qubits a device effectively provides once realistic error rates are accounted for — a deliberate attempt to make a fidelity-adjusted number as easy to compare at a glance as a raw qubit count.

The existence of multiple competing composite metrics is itself a lesson: a benchmark isn't a neutral law of physics, it's a specific test with specific assumptions, and a vendor whose architecture happens to score well on one particular benchmark has every incentive to promote exactly that one. A superconducting vendor emphasizing QV, a trapped-ion vendor emphasizing algorithmic qubits, and a vendor emphasizing raw speed via CLOPS may all be describing real, truthful numbers about their own hardware — while each conveniently foregrounds the dimension where their architecture looks best.

## The discipline this lesson asks for

Treat every composite benchmark — QV included — the way you'd treat any single summary statistic: useful for a fast first comparison, never sufficient for a real decision. When a number like "Quantum Volume 128" is quoted, it should prompt questions, not conclusions: which circuit family was used, how recent is the number, does it reflect the whole device or a particular favorable subset of qubits, and does the benchmark's circuit shape resemble the shape of the workload you actually care about. Note too that quantum volume figures climb over time as vendors improve calibration and control, so any specific number you see quoted for a specific device should be treated as a snapshot, not a permanent fact. The next lesson puts this discipline to work by walking through how you'd actually choose hardware for specific, realistic workloads — using benchmarks as one input among several, never as the whole answer.

## Key terms

| Term | Meaning |
|---|---|
| Quantum Volume (QV) | IBM's composite benchmark; finds the largest `n` for which a device reliably runs random `n`-qubit, `n`-layer ("square") circuits, reported as `QV = 2^n` |
| Square circuit | A benchmark circuit with equal qubit count and layer count (width equals depth), used by the QV test |
| CLOPS | Circuit Layer Operations Per Second; a composite benchmark measuring execution speed rather than circuit size/fidelity |
| Algorithmic qubits | A fidelity-adjusted, qubit-count-like metric promoted by some trapped-ion vendors |
| Benchmark bias | The tendency for a vendor to promote whichever benchmark happens to favor their own architecture's strengths |

## Check yourself

Suppose Device A reports a Quantum Volume of 128 and Device B reports a Quantum Volume of 64. Using the QV = 2^n relationship, explain in your own words what "128 vs. 64" actually implies about the largest square circuit each device can reliably run — and then list two pieces of information this comparison still leaves out that you'd want before choosing between them for a real project.
