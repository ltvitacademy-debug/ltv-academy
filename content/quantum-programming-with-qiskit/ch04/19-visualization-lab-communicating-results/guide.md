# Visualization Lab: Communicating Results

You now have three different ways to picture the same quantum state. This lab is about building the judgment to pick the right one for the right audience — a skill that matters as much as knowing the plotting calls themselves.

## What you'll learn

- How to generate all three visualizations (histogram, Bloch sphere, Q-sphere) from one circuit
- Why a Bloch sphere genuinely fails to represent an entangled qubit's individual state
- How to match a visualization to a non-technical stakeholder vs. a fellow quantum engineer
- How to write a short, defensible explanation of a visualization choice

## The circuit and the data you already have

Reuse the Bell-state circuit from this chapter: `qc.h(0); qc.cx(0,1)`, then measure both qubits. You already have every number you need, verified earlier in this chapter:

- Theoretical probabilities: P(00) = 0.5, P(11) = 0.5, P(01) = P(10) = 0
- A real seeded draw at `shots=1024`: `{'00': 503, '11': 521, '01': 0, '10': 0}`
- The exact statevector amplitudes: 0.7071068 on `00` and `11`, exactly 0 on `01` and `10`

## Step 1: produce the histogram

```python
from qiskit.visualization import plot_histogram
plot_histogram({'00': 503, '11': 521, '01': 0, '10': 0})
```

This renders two bars, `00` and `11`, each near the chart's mid-height, with no bars at all for `01`/`10`. This is a measurement-outcome picture: it tells you what came out of actually running the circuit N times, nothing more and nothing less.

## Step 2: attempt the Bloch sphere, and hit its real limit

```python
from qiskit.quantum_info import Statevector
from qiskit.visualization import plot_bloch_multivector

state = Statevector(qc)
plot_bloch_multivector(state)
```

Here's the part that matters most in this lab. If you run this, Qiskit will still produce *some* picture — one small sphere per qubit. But those pictures are misleading if you read them the way you read last lesson's single-qubit examples. Each qubit's own reduced state, when it's entangled with the other qubit, is a maximally mixed state: it has a 50/50 chance of being measured as 0 or 1, with no definite phase relationship to point to. A maximally mixed single-qubit state doesn't sit at a point on the surface of the Bloch sphere at all — geometrically, it sits at the exact center, because it's an equal mixture of every pure state, not a single pure state. If Qiskit's rendering doesn't make that center-point collapse immediately obvious, that's precisely the trap: a per-qubit Bloch sphere on an entangled state looks like it's showing you something, but what it's actually showing you is the absence of any definite single-qubit state to point to. This is a real teaching moment, not just a caveat — it's the exact reason the Q-sphere exists.

## Step 3: produce the Q-sphere, where the entanglement actually shows up

```python
from qiskit.visualization import plot_state_qsphere
plot_state_qsphere(state)
```

This renders exactly two blobs, at `00` and `11`, equal in size (each corresponding to 0.5 probability) and equal in color (no relative phase between them), with nothing at `01` or `10`. Unlike the Bloch sphere attempt, this picture directly shows the real structure of the entangled state: which basis states participate, with what relative weight, and with what relative phase.

## Choosing the right visualization for the audience

Here's the actual judgment call this lab is testing. For a **non-technical stakeholder** — someone who wants to know "did the quantum computer do the thing we expected?" — the histogram is almost always the right choice. It maps directly onto a question they already understand ("we ran it 1024 times, and about half the time we got one answer, about half the time we got another, and the other two possible answers never happened"), with no need to explain phase, superposition, or Hilbert space first.

For a **fellow quantum engineer** debugging or verifying circuit behavior, the Q-sphere (or state-city) is usually more useful than the histogram, because it shows the actual quantum structure generating those measurement statistics — the relative phase between `00` and `11`, which the histogram simply cannot show since measurement destroys phase information. If a colleague's circuit were subtly wrong in a way that flipped a relative phase but left the measurement probabilities identical, the histogram would look unchanged while the Q-sphere would immediately show the color difference. The Bloch sphere, despite being the most visually familiar of the three, is the wrong tool here specifically because this state is entangled — reaching for it on this circuit is itself a mistake worth being able to name.

## Key terms

| Term | Meaning |
|---|---|
| Measurement-outcome picture | What a histogram shows: the result of actually running and measuring the circuit, no phase information |
| Maximally mixed state | An entangled qubit's individual reduced state: 50/50 outcome probability with no definite phase, sitting at the Bloch sphere's center rather than its surface |
| Quantum-structure picture | What a Q-sphere or state-city shows: the underlying amplitudes and relative phase that produce the measurement statistics |
| Audience fit | Histogram for a results-only non-technical audience; Q-sphere/state-city for an engineer who needs the underlying quantum structure |
| Visualization choice as a skill | Picking the picture that matches both the audience's background and the state's actual structure (entangled vs. not) |

## Check yourself

A colleague shows you a Bloch sphere plot of a qubit from an entangled pair and the sphere's arrow appears to sit right at the center rather than on the surface. What does that center position actually tell you about the qubit's state, and why would switching to a Q-sphere of the full 2-qubit system give you more useful information than trying to interpret that single-qubit plot further?
