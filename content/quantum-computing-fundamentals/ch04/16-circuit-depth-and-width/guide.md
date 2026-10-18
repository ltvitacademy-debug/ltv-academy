# Circuit Depth & Width

Not every circuit that uses the same gates costs the same amount on real hardware. Two numbers — width and depth — capture the cost that actually matters, and this lesson defines both precisely and shows you how to count them by hand.

## What you'll learn

- The precise definition of a circuit's width (number of qubits/wires)
- The precise definition of a circuit's depth (longest chain of sequentially-dependent gates)
- Why gates on different qubits can share a "layer" and not add to depth, while gates sharing a qubit cannot
- A fully worked example circuit with width and depth counted explicitly
- Why depth, specifically, is the metric that dominates performance on real noisy hardware

## Width: how many qubits

A circuit's **width** is simply the number of qubits it uses — equivalently, the number of wires drawn in its diagram. Width is the most literal resource count a circuit has: a circuit with width 5 needs a device with at least 5 physical qubits available to run it at all, full stop. There's no way to compress width the way you can sometimes compress other costs; if your algorithm's structure genuinely needs 20 qubits of entangled state, you need 20 physical qubits, and this is exactly why "how many qubits does this processor have" is the headline number vendors advertise.

## Depth: how many sequential layers

**Depth** is subtler. It is not the total number of gates in the circuit. It is the length of the *longest chain of gates that must happen in strict time order on some path through the circuit* — equivalently, the minimum number of time-steps ("layers") needed to execute every gate if gates on different qubits that don't interact are allowed to run at the same time.

Two gates can share a layer (run in parallel, contributing only 1 to depth between them) exactly when they act on completely disjoint sets of qubits — no shared control, no shared target. Two gates cannot share a layer, and must be in different layers, if they share any qubit — because a qubit can only pass through one gate at a time, and the second gate applied to that qubit necessarily depends on having the first gate's output already in hand.

## Worked example

Take a 3-qubit circuit: apply H to qubit 1 and H to qubit 2, then apply CNOT with qubit 1 as control and qubit 2 as target. Qubit 3 has no gates at all. As a diagram:

```
q1: ──H──●──
q2: ──H──X──
q3: ─────────
```

**Width** is 3 — three wires, regardless of how many of them actually have gates on them. Width counts qubits used by the circuit's register, not qubits that happen to have an active gate in every layer.

**Depth** is 2. Here's the layer-by-layer accounting: the H on q1 and the H on q2 act on disjoint qubits (q1 only, q2 only), so they can run in the same layer — call it layer 1. The CNOT, however, acts on both q1 and q2, and it must happen *after* each qubit's H gate has already been applied (CNOT needs q1's post-H state as its control input and q2's post-H state as its target input) — so the CNOT cannot share a layer with either H, and must go in layer 2. Qubit 3 contributes nothing to either layer since it has no gates. Two layers total: depth 2.

Contrast this with a circuit that applied H to q1, then H to q2, then CNOT, if the two H gates had instead both touched q1 (say, H on q1, then another single-qubit gate on q1, then CNOT) — that would force three separate layers on q1's own chain, giving depth 3 even though the total gate count is the same. Depth tracks dependency chains, not raw gate count.

## Why depth is the metric that matters most

On real hardware, every qubit is a physical system slowly losing its quantum information to its environment — a process called decoherence, along with accumulating small gate-execution errors. Each sequential layer takes real time to execute, and that time is time during which decoherence and error can corrupt the state. A circuit with depth 50 spends roughly 50 time-steps' worth of accumulated noise before it finishes; a circuit with depth 5, doing comparable work, spends far less. This is why hardware vendors and compiler/transpiler tools (the subject of the next lesson) work hard specifically to *reduce depth* when converting a logical circuit into something that runs on real hardware, sometimes even at the cost of using more gates overall, as long as more of them can run in parallel. Chapter 6 picks this exact tension back up when it contrasts an idealized simulator (where depth has no error cost) against real hardware (where it does).

Width matters for a different, more basic reason: real devices have a hard ceiling on the number of physical qubits available, so a circuit's width is a strict admission requirement — a 50-qubit circuit simply cannot run on a 20-qubit processor, no matter how shallow its depth is.

## Key terms

| Term | Meaning |
|---|---|
| Width | The number of qubits (wires) a circuit uses |
| Depth | The length of the longest chain of sequentially-dependent gates; the minimum number of parallel time-layers needed |
| Layer | A set of gates, all acting on disjoint qubits, that can execute at the same time step |
| Decoherence | The gradual loss of a qubit's quantum information to its environment over time; a key reason low depth matters |

## Check yourself

Consider a 4-qubit circuit: H on q1, H on q3 (same layer), then CNOT with control q1 and target q2, and separately CNOT with control q3 and target q4. Assume the two CNOTs also don't share any qubit with each other. What are this circuit's width and depth, and which gates share a layer with which?
