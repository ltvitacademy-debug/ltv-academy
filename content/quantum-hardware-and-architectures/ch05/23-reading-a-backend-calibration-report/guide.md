# Reading a Backend Calibration Report

Knowing that qubits drift and get recalibrated is only useful if you can actually read the data a provider publishes about a given backend and use it to make a real decision. This lesson is hands-on: what's actually in a calibration report, and how a practitioner uses it.

## What you'll learn

- The core fields that appear in a real backend/calibration report, and what each one tells you
- How to read per-qubit data (T1, T2, readout error) alongside per-gate error rates
- How to use a "last calibrated" timestamp to judge whether data is still trustworthy
- How to pick which qubits and connections (edges) on a chip to target for a given circuit
- A quick sanity-check routine for deciding whether a device is fit to use right now

## What's actually in a calibration report

Providers that give users access to real quantum hardware typically publish a calibration report (sometimes through a dashboard, sometimes via an API call) listing, at minimum:

- **Per-qubit T1** — the energy relaxation time, roughly how long a qubit holds an excited state before decaying, usually reported in microseconds.
- **Per-qubit T2** — the dephasing time, roughly how long the qubit's phase information survives, also in microseconds, and typically shorter than or comparable to T1.
- **Readout error** — the probability that measuring a qubit gives the wrong classical result (reading a 0 as a 1, or vice versa), per qubit.
- **Per-qubit (single-qubit gate) error rates** — the error associated with applying a single-qubit gate to that specific qubit.
- **Per-gate / per-edge (two-qubit gate) error rates** — the error associated with a two-qubit gate (commonly a CNOT or similar entangling gate) acting on a specific pair of physically connected qubits. These vary noticeably from one connection to another on the same chip.
- **Gate times** — how long each gate type actually takes to execute, which matters because a circuit takes real time to run and real decoherence happens during that time.
- **Last-calibrated timestamp** — when this specific data was last measured and updated.

## Reading the per-qubit and per-edge data together

A chip is not uniform. On any real device, some qubits will have a longer T1/T2 than others, some will have worse readout error, and the connections between qubits will have a wide spread of two-qubit gate error rates — often spanning more than a factor of two between the best and worst edges on the same chip. This means two circuits using the "same device" can see meaningfully different real-world performance depending entirely on which physical qubits and which connections they happen to land on.

## Using this to pick qubits for a circuit

A practical workflow looks like this:

1. **Identify the connectivity your circuit actually needs** — which qubits need to interact directly via two-qubit gates, and in what pattern.
2. **Scan the edge error rates** for connections matching that pattern, and preferentially map your circuit onto the lowest-error edges available, not just any edges that happen to be adjacent in the chip's native layout.
3. **Check T1/T2 against your circuit's expected runtime.** If your circuit's total gate depth, multiplied by typical gate times, approaches a meaningful fraction of a qubit's T1 or T2, expect decoherence to show up directly in your results — favor qubits with longer coherence times for deeper circuits.
4. **Check readout error on the qubits you'll actually measure**, especially for circuits where the final answer depends on getting classical bits right on specific qubits.

Most provider toolchains include an automated qubit-mapping/transpilation step that does a version of this already, but understanding the underlying data lets you sanity-check that automated choice or override it when you have reason to.

## Sanity-checking whether a device is fit to use right now

Before trusting a run, a quick practical check:

- **How old is the calibration?** A report that's hours old on a device with comparatively fast-drifting parameters is less trustworthy than the same report would be on a device that's historically more stable — compare the timestamp against what you know about that platform's typical drift behavior, not against a single universal rule.
- **Do the numbers look like the device's normal range, or like an outlier?** If reported error rates are noticeably worse than that device's recent historical performance, that's a signal the device may currently be degraded (sometimes providers themselves will flag a backend as down for maintenance or recalibration), not necessarily that something is wrong with your circuit.
- **Does the device have any qubits/edges good enough for your actual error budget?** A device can have a very respectable median error rate while still lacking enough simultaneously good qubits and edges, in the specific connectivity pattern you need, to run your particular circuit well — the median number alone doesn't tell you this.

Treat the calibration report as the primary tool for turning "is this device good" from a vague impression into a specific, checkable answer for your specific circuit, right now — not as a one-time spec you read once and remember.

## Key terms

| Term | Meaning |
|---|---|
| T1 (relaxation time) | How long a qubit typically holds an excited state before decaying, in microseconds |
| T2 (dephasing time) | How long a qubit's phase information typically survives, in microseconds |
| Readout error | The probability of measuring a qubit's state incorrectly |
| Edge (two-qubit) error rate | The error rate of a two-qubit gate on a specific physically connected qubit pair |
| Last-calibrated timestamp | The time a published calibration report's data was last measured and updated |

## Check yourself

Two backends from the same provider report similar median two-qubit gate error rates, but your circuit needs five qubits connected in a specific chain. What additional calibration-report data would you check before picking one backend over the other, and why would the median number alone not be enough?
