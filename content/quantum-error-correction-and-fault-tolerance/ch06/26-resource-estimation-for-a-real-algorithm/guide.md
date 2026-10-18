# Resource Estimation for a Real Algorithm

Put the last two lessons' math to work on an actual question: how many physical qubits would it really take to run a well-known quantum algorithm at a scale that matters?

## What you'll learn

- A widely cited published resource estimate for factoring RSA-2048 with Shor's algorithm
- How to compute your own illustrative resource estimate from the surface-code formula
- Why these two numbers serve different purposes, and why they shouldn't be confused
- Why both numbers are far beyond anything current hardware can run

## A cited estimate from the literature

A frequently cited 2019 resource-estimation paper (Gidney & Ekerå) estimated that breaking RSA-2048 encryption using Shor's algorithm, implemented on a surface-code-based fault-tolerant architecture, would require on the order of **20 million physical qubits**, running for roughly **8 hours**. This number is presented here explicitly as **a widely cited estimate from the published literature**, not as something derived in this lesson — it reflects a detailed, specific analysis of Shor's algorithm's actual circuit structure (not just a generic "qubits per logical qubit" multiplication), including the magic-state distillation overhead covered in chapter 7.

## Your own worked estimate, computed directly

To see the *mechanism* behind a simpler version of this kind of estimate, use the surface-code qubit-cost table from lesson 24. Suppose a hypothetical algorithm needs **100 logical qubits**, each protected at code distance **d = 15** (449 physical qubits per logical qubit, verified in lesson 24):

**100 logical qubits × 449 physical qubits per logical qubit = 44,900 physical qubits**

This is a clearly-labeled **illustrative worked example**, computed directly from the surface-code formula for this lesson, using a round, hypothetical logical-qubit count — it is a different kind of number from the Gidney & Ekerå estimate above, which accounts for an actual algorithm's real circuit structure and additional overheads (like magic-state distillation) that a flat multiplication doesn't capture. Keep these two numbers distinct: one is a literature citation about a specific, real algorithm; the other is this lesson's own simplified arithmetic, meant to show the *method*, not to reproduce or validate the cited figure.

## Why the method still matters, even simplified

Even though the 44,900-qubit illustrative number doesn't include every real-world overhead (distillation, routing, idle qubits waiting their turn), the core multiplication — **(physical qubits per logical qubit) × (number of logical qubits needed)** — is the first-order building block every more detailed resource estimate, including Gidney & Ekerå's, starts from. Getting comfortable computing this multiplication directly, and distinguishing it clearly from a fuller literature estimate, is exactly the skill the next lesson's lab exercises build on.

## The honest bottom line

Whether you look at the cited 20-million-qubit estimate for a cryptographically relevant run of Shor's algorithm, or this lesson's illustrative 44,900-qubit toy example, both numbers are **vastly larger** than anything current NISQ-era hardware (tens to low hundreds of noisy physical qubits, as of this course) can run. This gap is the central, honest reason fault-tolerant quantum computing at a genuinely useful scale remains a forward-looking engineering goal.

## Key terms

| Term | Meaning |
|---|---|
| Cited literature estimate | A specific published resource-estimation result (e.g. Gidney & Ekerå's ~20 million qubits for RSA-2048), reported as a citation, not derived here |
| Illustrative worked estimate | A simplified, directly computed example multiplying qubits-per-logical-qubit by logical-qubit count, to show the method |
| First-order estimate | A simple multiplication that captures the dominant cost term, without every real-world overhead included |

## Check yourself

Why would a real detailed resource estimate for an algorithm like Shor's (such as the cited Gidney & Ekerå figure) come out different from simply multiplying "physical qubits per logical qubit" by "number of logical qubits," the way this lesson's illustrative example does?
