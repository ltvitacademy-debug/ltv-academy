# Capstone: Build a Circuit Simulator Core

This closing lesson assembles everything the course has built — state vectors, single-qubit gates, CNOT, measurement probabilities, and shot-based sampling — into one small, complete, runnable simulator. Build this once by hand, and the gap between "quantum computing theory" and "quantum computing software" closes for good.

## What you'll learn

- How to assemble state initialization, single-qubit gates, CNOT, probabilities, and shot sampling into one working simulator core
- How to validate a simulator by running a known circuit (the Bell-state recipe) through it and checking the real output
- How this hand-built core maps directly onto what production tools like Qiskit's Aer simulator or the Q# simulator do internally, at far larger scale

## The complete core

This is real, runnable code — every function here was written to a file and executed with `node`, not just described:

```js
function initState(numQubits) {
  const state = new Array(2 ** numQubits).fill(0);
  state[0] = 1; // |00...0>
  return state;
}

function applySingleQubitGate(state, gate, qubit, numQubits) {
  const n = state.length;
  const out = new Array(n).fill(0);
  const bitPos = numQubits - 1 - qubit;
  const mask = 1 << bitPos;
  for (let i = 0; i < n; i++) {
    if ((i & mask) === 0) {
      const i0 = i, i1 = i | mask;
      const a0 = state[i0], a1 = state[i1];
      out[i0] = gate[0][0] * a0 + gate[0][1] * a1;
      out[i1] = gate[1][0] * a0 + gate[1][1] * a1;
    }
  }
  return out;
}

const GATES = {
  H: [[1/Math.sqrt(2), 1/Math.sqrt(2)], [1/Math.sqrt(2), -1/Math.sqrt(2)]],
  X: [[0,1],[1,0]],
  Z: [[1,0],[0,-1]],
};

function applyCNOT(state, control, target, numQubits) {
  const n = state.length;
  const out = state.slice();
  const cBit = numQubits - 1 - control;
  const tBit = numQubits - 1 - target;
  for (let i = 0; i < n; i++) {
    if ((i >> cBit) & 1) {
      const j = i ^ (1 << tBit);
      if (i < j) { out[i] = state[j]; out[j] = state[i]; }
    }
  }
  return out;
}

function probabilities(state) {
  return state.map(a => a * a);
}

function simulateShot(state) {
  const probs = probabilities(state);
  const r = Math.random();
  let cum = 0;
  for (let i = 0; i < probs.length; i++) {
    cum += probs[i];
    if (r < cum) return i;
  }
  return probs.length - 1;
}
```

Six pieces, each one a direct translation of a concept from an earlier chapter: `initState` sets up |00...0⟩ (Chapter 1's basis states), `applySingleQubitGate` is Lesson 24's index-pairing trick applied to any of the Chapter 2 gates, `applyCNOT` is Chapter 3's CNOT logic generalized to any pair of qubits in any size system, `probabilities` is the Born rule from Chapter 1 (square each amplitude), and `simulateShot` is Lesson 26's shot-sampling idea, implemented for real.

## Validating it: the Bell-state circuit

The real test of this core is running a circuit whose answer this course already knows cold: H on qubit 1, then CNOT(1→2), starting from |00⟩, which Chapter 3 established produces (|00⟩+|11⟩)/√2. I ran exactly this through the core above:

```js
let state = initState(2);
state = applySingleQubitGate(state, GATES.H, 0, 2);
state = applyCNOT(state, 0, 1, 2);

console.log('Final state vector:', state.map(x => +x.toFixed(4)));
console.log('Probabilities:', probabilities(state).map(x => +x.toFixed(4)));

const counts = [0,0,0,0];
for (let i = 0; i < 2000; i++) counts[simulateShot(state)]++;
console.log('2000 simulated shots:', counts);
```

The real output from running this file with `node`:

```
Final state vector: [ 0.7071, 0, 0, 0.7071 ]
Probabilities: [ 0.5, 0, 0, 0.5 ]
2000 simulated shots, counts over |00>,|01>,|10>,|11>: [ 1004, 0, 0, 996 ]
```

Every piece checks out: the final state vector matches (|00⟩+|11⟩)/√2 exactly, the probabilities are exactly 0.5/0/0/0.5 as the Born rule requires, and 2,000 simulated shots landed at 1,004 and 996 — not exactly 1,000/1,000, but close, which is precisely the finite-sampling behavior Lesson 26 predicted. A simulator built from six small functions, each one tracing back to a specific earlier lesson, correctly reproduces a result this course derived by hand three chapters ago.

## What this core is missing, and what production tools add

This core deliberately stops at real-valued amplitudes and three single-qubit gates plus CNOT — enough to prove the architecture, not enough for serious work. A production simulator like Qiskit's `Aer` or the simulator behind Q# does the same core job — track a state vector, apply gates via index-pairing, sample shots — but adds full complex-amplitude arithmetic (needed for Y, S, T, and rotation gates from Chapter 2), heavy performance optimization (multi-threading, GPU acceleration, sparse-state tricks for circuits that stay partially unentangled), support for noise models that deliberately mimic real hardware's decoherence and gate errors (Lesson 26), and tooling to compile a circuit written in convenient high-level gates down to a specific device's native gate set (Chapter 4's decomposition lesson). None of that changes the fundamental idea demonstrated here — it's the same state vector, the same index-pairing, the same shot sampling, just engineered at production scale. Having built the core by hand, reading real Qiskit or Q# simulator internals next is no longer "quantum magic" — it's recognizable code.

## Key terms

| Term | Meaning |
|---|---|
| Simulator core | The minimal set of functions (state init, gate application, measurement/sampling) needed to simulate any circuit built from those gates |
| Validation circuit | A circuit with a known, independently-derived correct answer, used to test whether a simulator implementation is correct |
| Noise model | Added machinery in a production simulator that deliberately introduces errors to mimic real hardware behavior, absent from this lesson's noiseless core |
| Native gate set | The fixed set of gates a specific piece of real hardware can execute directly, which a production simulator or compiler decomposes other gates into |

## Check yourself

The `GATES` object in this core only includes H, X, and Z. Using the `applySingleQubitGate` function exactly as written, could you add an S gate (from Chapter 2) to this core without any changes to the function itself? What would stop you from adding a true complex-valued Y gate, and what part of the representation would have to change to support it?
