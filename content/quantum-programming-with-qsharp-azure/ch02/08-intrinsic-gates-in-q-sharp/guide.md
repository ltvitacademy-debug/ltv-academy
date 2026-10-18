# Intrinsic Gates in Q#

Every quantum program eventually bottoms out in a small set of primitive gates that the runtime (simulator or hardware) implements directly. In Q#, these are the **intrinsic operations** — built-in callables like `H`, `X`, `CNOT`, and the rotation family — and the way multi-qubit gates are expressed often leans on functors rather than a long list of dedicated named gates. This lesson walks through the real intrinsic set and verifies one of its most-used facts with actual numbers instead of just asserting it.

## What you'll learn

- The core single-qubit intrinsics: `H`, `X`, `Y`, `Z`, `S`, `T`
- The rotation gates `Rx`, `Ry`, `Rz` and how they take an angle parameter
- `Measure` and `M` for turning quantum state into a classical `Result`
- How `CNOT` and `CCNOT` relate to `Controlled X` and `Controlled Controlled X`
- A verified numeric check of `H`'s effect on measurement probabilities

## The single-qubit intrinsic set

Q#'s core single-qubit gates are `H` (Hadamard), `X`, `Y`, `Z` (the Pauli gates), `S` (a quarter-turn phase gate), and `T` (an eighth-turn phase gate):

```qsharp
operation DemoGates(q : Qubit) : Unit {
    H(q);   // superposition
    X(q);   // bit flip
    Y(q);   // bit flip + phase flip
    Z(q);   // phase flip
    S(q);   // phase rotation by pi/2
    T(q);   // phase rotation by pi/4
}
```

`X`, `Y`, and `Z` are the Pauli operators — the same three matrices you'd meet in Qiskit as `circuit.x(0)`, `circuit.y(0)`, `circuit.z(0)`. `S` and `T` only change relative phase; they don't change measurement probabilities on their own, which is exactly why they're easy to get wrong when you expect a gate to "do something visible" and it doesn't in isolation.

## Rotation gates take a classical angle

`Rx`, `Ry`, and `Rz` rotate around their respective axes of the Bloch sphere by an angle you supply as a `Double`:

```qsharp
operation RotateExample(q : Qubit, theta : Double) : Unit {
    Ry(theta, q);
}
```

Note the parameter order: the angle comes first, then the qubit. This is where the `function`/`operation` split from the previous lesson shows up constantly in practice — `theta` is very often computed by a pure `function` first, then handed to an `operation` like this one.

## Measurement: `M` and `Measure`

`M(q)` measures a single qubit in the computational basis and returns a `Result` (`Zero` or `One`). `Measure(bases, qubits)` is the more general form, letting you specify a Pauli basis per qubit for multi-qubit joint measurements. Most single-qubit code uses the shorter `M`.

```qsharp
operation CheckBit(q : Qubit) : Result {
    return M(q);
}
```

## Verifying a real number: what does `H` actually give you?

It's worth not just asserting "`H` creates a 50/50 superposition" — here's the actual matrix computation, hand-done with no simulator involved. `H`'s matrix is `(1/√2) * [[1, 1], [1, -1]]`, and `|0⟩ = [1, 0]`. Multiplying:

`H|0⟩ = (1/√2)·[1·1 + 1·0, 1·1 + (-1)·0] = (1/√2)·[1, 1] = [0.7071..., 0.7071...]`

Measurement probability is the squared magnitude of each amplitude: `0.7071...² = 0.4999999999999999 ≈ 0.5` for both outcomes. That's `P(0) = 0.5` and `P(1) = 0.5` exactly, confirmed by direct matrix-vector multiplication, not a rule taken on faith. This is the standard behavior you'd expect from Qiskit's `h` gate too — the physics is identical; what differs is only how you invoke it.

## Multi-qubit gates: functors over single-qubit intrinsics vs. named convenience operations

A controlled-X (the standard "CNOT") can be written two equivalent ways in Q#. The explicit, functor-based form applies the `Controlled` functor to the single-qubit intrinsic `X`:

```qsharp
operation ManualCnot(control : Qubit, target : Qubit) : Unit {
    Controlled X([control], target);
}
```

`Controlled X([control], target)` reads as: "apply `X` to `target`, controlled on the qubit array `[control]`." The control list can hold more than one qubit, which is exactly how a Toffoli-style multi-controlled gate is built from the same primitive. Q# also ships `CNOT` and `CCNOT` (Toffoli) as convenience operations that are defined, under the hood, in exactly these functor terms:

```qsharp
operation UsingConvenienceGates(control : Qubit, target : Qubit, control2 : Qubit) : Unit {
    CNOT(control, target);              // equivalent to Controlled X([control], target)
    CCNOT(control, control2, target);   // equivalent to Controlled X([control, control2], target)
}
```

Both forms compile to the same underlying controlled operation. `CNOT` and `CCNOT` exist for readability on the two- and three-qubit cases that come up constantly; `Controlled X([...], target)` is what you reach for once you need more controls, or when you're applying the `Controlled` functor to something other than a bare Pauli gate (the subject of the next lesson).

## Key terms

| Term | Meaning |
|---|---|
| Intrinsic operation | A gate the runtime implements directly, e.g. `H`, `X`, `Y`, `Z`, `S`, `T`, `Rx`, `Ry`, `Rz` |
| `S`, `T` gates | Phase-only gates (quarter-turn and eighth-turn) that don't change measurement probabilities by themselves |
| `M` / `Measure` | Operations that collapse a qubit (or qubits) to a classical `Result`, in the computational or a specified Pauli basis |
| `Controlled X([control], target)` | The functor-based way to express a controlled-X gate directly from the single-qubit intrinsic `X` |
| `CNOT` / `CCNOT` | Convenience operations equivalent to `Controlled X` with one or two controls respectively |

## Check yourself

The lesson verified that `H|0⟩` gives `P(0) = P(1) = 0.5` by hand-multiplying the matrix. Without doing the full matrix multiplication, what would you expect `H|1⟩` to give for `P(0)` and `P(1)`, and why — based only on what you know about what `H` does to the computational basis states?
