# The Current State of Fault-Tolerant Hardware

An honest status report: what real hardware has demonstrated, and how far that actually is from a useful fault-tolerant computer.

## What you'll learn

- What kinds of QEC demonstrations real hardware groups have shown
- Why "logical error rate below physical error rate" is a genuine milestone, not the finish line
- Why multiple hardware platforms are pursuing this in parallel
- Why none of this adds up to a fault-tolerant computer yet, by this course's own resource-estimation math

## What's actually been demonstrated

Across several hardware platforms — superconducting circuits, trapped ions, neutral atoms, and photonic systems — research groups have demonstrated genuine, scientifically meaningful quantum error correction experiments: encoding a small number of logical qubits (often just one or a handful) into their physical qubits, running repeated rounds of syndrome extraction, and in some cases showing that the resulting **logical** qubit's error rate can be made **lower** than the error rate of its best individual physical qubit. That last result in particular is a real, nontrivial milestone — it's direct experimental evidence that the core idea this entire course has been building (redundancy, correctly extracted syndromes, and correction can net out to *better* reliability than any single component) actually works in a real lab, not just on paper.

## Why multiple platforms are racing in parallel

No single qubit technology has definitively "won" the race to fault tolerance. Superconducting circuits benefit from fast gates and an existing chip-fabrication ecosystem. Trapped ions offer longer coherence times and high-fidelity gates, at the cost of generally slower operations. Neutral atoms offer flexible qubit layouts. Photonic approaches avoid some decoherence channels entirely by using light. This diversity reflects genuine scientific uncertainty about which platform's tradeoffs will ultimately scale best — not a sign that the field has stalled.

## Why this isn't fault-tolerant computing yet

Go back to chapter 6's numbers. A genuinely useful fault-tolerant computation needs hundreds to (per the cited Gidney & Ekerå estimate) tens of millions of physical qubits, depending on the task and target reliability. Current demonstration devices operate with a small number of encoded logical qubits, not the hundreds-to-thousands a real algorithm's logical-qubit count alone would require, let alone the physical-qubit multiplier on top of that. Today's hardware remains in the **NISQ (Noisy Intermediate-Scale Quantum)** regime for general-purpose computation — these QEC demonstrations are important, necessary scientific and engineering steps *toward* fault tolerance, not evidence that it has arrived.

## Being careful about specific numbers

This course deliberately avoids stating specific qubit-count or fidelity records as settled, permanent facts, for a simple reason: those numbers change quickly, and a course asserting one as "the current record" would likely be stating something stale or imprecise. The honest, durable claim this lesson makes instead is about the *category* of what's been shown (small-scale logical-qubit demonstrations, some with logical error rates below physical) versus the *category* of what real fault tolerance requires (large-scale, many-logical-qubit, continuously-operating systems) — that categorical gap is the well-established, durable fact, regardless of which specific numbers are current this year.

## Key terms

| Term | Meaning |
|---|---|
| Logical error rate below physical | A demonstrated milestone where an encoded logical qubit outperforms its best constituent physical qubit |
| NISQ regime | Noisy Intermediate-Scale Quantum — today's era, still the operating regime for general-purpose quantum computation |
| Platform diversity | Multiple qubit technologies (superconducting, trapped-ion, neutral-atom, photonic) being pursued in parallel, with no settled winner |

## Check yourself

Why does the lesson treat "a logical qubit's error rate was shown to be lower than its best physical qubit's error rate" as a genuine, important milestone, while still insisting this is far short of fault-tolerant computing at a useful scale? What's the categorical gap between the two claims?
