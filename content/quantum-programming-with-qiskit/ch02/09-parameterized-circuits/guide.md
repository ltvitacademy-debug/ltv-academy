# Parameterized Circuits

So far, every rotation angle you've passed to a gate has been a fixed number baked straight into the circuit. Real quantum algorithms — especially the variational algorithms you'll meet in Chapter 6 — need something more flexible: a circuit template whose angles are left open, to be filled in later, possibly many times, possibly by an optimizer searching for the best value. That's what `Parameter` is for.

## What you'll learn

- The difference between a plain Python float angle and a symbolic `Parameter`
- How to build a circuit template with `Parameter` and bind a concrete value later with `assign_parameters`
- Why this pattern matters for the variational algorithms covered in Chapter 6
- The exact, closed-form relationship between an RX angle and its measurement probabilities
- A verified table of four RX angles and their exact probabilities

## A plain float angle vs. a symbolic `Parameter`

You already know how to rotate with a fixed numeric angle:

```python
import math
qc = QuantumCircuit(1)
qc.rx(math.pi / 4, 0)   # angle is baked in now, permanently
```

This circuit is done — the angle `π/4` is fixed the moment you call `.rx()`. But what if you want to build the circuit once and try many different angles without rebuilding it each time? That's where `Parameter` comes in:

```python
from qiskit.circuit import Parameter
from qiskit import QuantumCircuit

theta = Parameter('θ')
qc = QuantumCircuit(1)
qc.rx(theta, 0)
```

`theta` here is a symbolic placeholder, not a number. The circuit is now a template: it knows it needs an RX rotation on qubit 0, but the actual angle is left unresolved until you supply one.

## Binding a value with `assign_parameters`

To turn the template into a concrete, runnable circuit, call `.assign_parameters()` with a dictionary mapping each parameter to a real number:

```python
bound_qc = qc.assign_parameters({theta: 1.57})
```

`bound_qc` is now a normal, fully-specified circuit — you can draw it, simulate it, or run it exactly like any circuit built with fixed numbers. The original `qc` template is untouched, so you can bind different values to it repeatedly, which is exactly the pattern a classical optimizer uses: propose an angle, bind it, run the circuit, look at the result, propose a better angle, repeat. Chapter 6's variational algorithms are built almost entirely on this loop.

## The exact math behind RX angles

For `qc = QuantumCircuit(1); qc.rx(theta, 0)` starting from `|0>`, there's a clean closed-form relationship between the angle and the probability of measuring `1`: P(1) = sin²(θ/2). This is exact, deterministic mathematics — no sampling, no shot noise, since we're talking about the ideal probability before any measurement is taken.

| θ (radians) | P(0) | P(1) |
|---|---|---|
| π/4 (0.7854) | 0.853553 | 0.146447 |
| π/2 (1.5708) | 0.5 | 0.5 |
| π (3.1416) | 0.0 | 1.0 |
| 2π/3 (2.0944) | 0.25 | 0.75 |

Two of these rows are worth pausing on. At θ=π/2, RX gives exactly the same 50/50 probability split as the Hadamard gate — a useful sanity check, since it confirms a quarter-turn rotation is the "halfway point" between no rotation and a full flip. At θ=π, the qubit lands on `|1>` with absolute certainty: a full π rotation around X is a complete bit-flip, mathematically equivalent in effect to the fixed `X` gate, just reached by a different, continuously-tunable route.

## Why this matters for what's coming

A fixed gate like `X` or `H` is a single, specific operation — useful, but inflexible. `Parameter`-based rotations are what let an algorithm explore a continuous landscape of possible circuits by adjusting one or more angles, scoring the result, and adjusting again. Every variational quantum algorithm in Chapter 6 — VQE, QAOA, and the rest — is built by wrapping exactly this bind-run-score-repeat loop around parameterized circuits like the one in this lesson.

## Key terms

| Term | Meaning |
|---|---|
| `Parameter` | A symbolic placeholder for a numeric value, used to build a circuit template before any concrete angle is chosen |
| `assign_parameters({...})` | Binds concrete numeric values to a parameterized circuit's symbols, producing a fully-specified, runnable circuit |
| Circuit template | A circuit built with one or more `Parameter` objects instead of fixed numbers, reusable with many different bound values |
| P(1) = sin²(θ/2) | The exact closed-form probability of measuring `1` after `rx(θ)` starting from `\|0>` |
| Variational algorithm | An algorithm (covered in Chapter 6) that repeatedly binds, runs, and scores a parameterized circuit to search for an optimal angle |

## Check yourself

Using P(1) = sin²(θ/2), explain why θ=π/2 gives RX the same measurement probabilities as the Hadamard gate, and why θ=π gives the same measurement outcome as the fixed X gate, even though RX and these fixed gates are built completely differently.
