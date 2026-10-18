# Debugging a Circuit That Gives Wrong Results

A failing statistical test tells you *that* something's wrong, not *what*. Debugging a quantum circuit means systematically ruling out causes in a specific order — because the wrong order wastes hours chasing hardware noise when the real bug is a transposed qubit index.

## What you'll learn

- A debugging order that rules out cheap, likely causes before expensive, rare ones
- How to use a statevector simulator to check logic correctness with zero sampling noise
- How to distinguish "this is noise" from "this is a real bug" using a noiseless baseline
- Common quantum-specific bug patterns: qubit index/endianness mix-ups, global vs. relative phase confusion, and classical-control-flow bugs in hybrid loops
- A worked debugging walkthrough for a Bell state that's producing the wrong correlation pattern

## The debugging order: cheap and likely first

When a statistical test fails, resist the urge to immediately suspect "quantum weirdness." Work through causes in this order:

1. **Construction bug.** Re-run the construction tests from Lesson 6 first. A huge fraction of "wrong results" bugs are a qubit index swapped, a gate applied to the wrong qubit, or an off-by-one in a loop — all things a construction test should have caught, so check whether one is missing.
2. **Statevector mismatch.** Run the circuit on a noiseless statevector simulator and inspect the exact amplitudes, not sampled counts. This tells you the *ideal* behavior with zero sampling noise, isolating whether the bug is in the circuit's logic at all.
3. **Test tolerance mismatch.** Re-check whether the statistical test's tolerance (Lesson 7) was set appropriately for the shot count used — an overly tight tolerance produces "failures" on correct code.
4. **Backend/noise effect.** Only after ruling out 1–3, consider whether the failure is a real hardware noise effect rather than a logic bug — and confirm this by comparing the same circuit's noiseless-simulator result against its noisy-simulator or hardware result.

## Statevector inspection: ground truth with no sampling noise

A statevector simulator returns exact amplitudes rather than sampled counts, which removes sampling noise from the picture entirely:

```python
from qiskit.quantum_info import Statevector

def test_bell_pair_statevector_is_exact():
    qc = build_bell_pair()
    sv = Statevector.from_instruction(qc)
    probabilities = sv.probabilities_dict()
    # Expect exactly {'00': 0.5, '11': 0.5}, with no sampling noise at all
    assert set(probabilities.keys()) == {'00', '11'}
    assert abs(probabilities['00'] - 0.5) < 1e-9
    assert abs(probabilities['11'] - 0.5) < 1e-9
```

If this fails, the bug is in the circuit's logic, full stop — there is no sampling noise excuse available here, since a statevector simulator has none. If this passes but your shot-based statistical test (Lesson 7) still fails, the bug is somewhere in step 3 or 4, not in the circuit itself.

## Common quantum-specific bug patterns

- **Qubit index / endianness mix-ups.** Qiskit reports bitstrings with qubit 0 as the *rightmost* bit by default. A bug where you expect `counts['01']` to mean "qubit 0 is 1" when it actually means "qubit 1 is 1" (reading the string left-to-right instead of right-to-left) is one of the single most common quantum debugging traps — and it looks exactly like a "wrong correlation" bug in a statistical test.
- **Global vs. relative phase confusion.** Two statevectors that differ only by a global phase (e.g. multiplying the whole state by `-1` or `i`) are physically indistinguishable by any measurement, but a naive `assert statevector == expected_statevector` comparison will flag them as different. Compare via `Statevector.equiv()`, which correctly ignores global phase, rather than raw equality.
- **Classical-control-flow bugs in hybrid loops.** In a variational algorithm, a bug in the classical optimizer loop (e.g. feeding the wrong gradient back, or not updating parameters between iterations) produces results that *look* like a quantum noise problem — consistently poor convergence — but is pure classical logic, debuggable with ordinary print-statement or debugger tracing of the classical loop, no quantum reasoning required.

## Worked walkthrough: a Bell state with wrong correlations

Suppose a Bell-state statistical test fails, showing roughly equal `00`, `01`, `10`, `11` counts instead of only `00`/`11`. Following the order above:

1. Construction test check: inspect `circuit.data` — suppose it shows `H(0), CX(1, 0)` instead of the intended `H(0), CX(0, 1)`. Found it: the control and target qubits are swapped.
2. Confirm with the statevector: `Statevector.from_instruction(qc)` on the buggy circuit would show a non-entangled or differently-entangled state, confirming the logic error rather than a noise artifact.
3. No need to reach steps 3–4 — the bug was found and confirmed at step 1–2, which is the common case when the debugging order is followed instead of jumping straight to "maybe it's the hardware."

## Key terms

| Term | Meaning |
|---|---|
| Statevector simulator | A simulator that returns exact quantum amplitudes rather than sampled measurement counts, with zero sampling noise |
| Endianness (qubit ordering) | The convention for which qubit index corresponds to which position in a reported bitstring; a common source of debugging confusion |
| Global phase | A multiplicative factor (like -1 or i) applied to an entire state vector that has no effect on any measurement outcome |
| `Statevector.equiv()` | A comparison method that correctly treats two statevectors differing only by global phase as equivalent |

## Check yourself

A statistical test for a 2-qubit circuit expected to produce only `'01'` (never `'00'`, `'10'`, or `'11'`) is failing. The statevector simulator shows the exact state `|01⟩` with probability 1.0. What does this tell you about where the bug is, and which debugging step would you move to next?
