# Q# Fundamentals Lab

This lab puts the last four lessons together into one program: you'll write an operation that allocates two qubits instead of one, entangles them instead of just superposing one, and reasons about outcomes that are correlated instead of independent.

## What you'll learn

- How to allocate a pair of qubits and apply gates across both
- What `CNOT` does, and how it turns superposition into entanglement
- The exact, verified probability distribution of a two-qubit Bell pair
- Why the two measurement outcomes come out correlated instead of independent
- How to structure and read a multi-qubit operation using everything from Ch.1

## The build: `use`, `H`, `CNOT`, `M` — now with two qubits

You already know every ingredient. The only new piece is allocating two qubits and applying a two-qubit gate across them:

```qsharp
namespace FundamentalsLab {
    @EntryPoint()
    operation CreateBellPair() : (Result, Result) {
        use (q0, q1) = (Qubit(), Qubit());
        H(q0);
        CNOT(q0, q1);
        let r0 = M(q0);
        let r1 = M(q1);
        Reset(q0);
        Reset(q1);
        return (r0, r1);
    }
}
```

`use (q0, q1) = (Qubit(), Qubit());` allocates both qubits in one statement, each starting in `|0⟩`, exactly like the single-qubit lesson — just two of them, named so you can refer to each individually. `H(q0)` puts only the first qubit into superposition, same as before. `CNOT(q0, q1)` is new: it's the two-qubit controlled-NOT gate, which flips the target qubit (`q1`) if and only if the control qubit (`q0`) is `One` — but because `q0` is in superposition rather than a definite value, this is where entanglement comes from.

## Tracing the math, exactly

Starting state `|00⟩` is the amplitude vector `[1, 0, 0, 0]` over the basis order `|00⟩, |01⟩, |10⟩, |11⟩`. `H` on the first qubit turns this into `[1/√2, 0, 1/√2, 0]` — an equal superposition of `|00⟩` and `|10⟩`, with `|01⟩` and `|11⟩` still at zero amplitude. Applying `CNOT` (control = first qubit, target = second) swaps the `|10⟩` and `|11⟩` amplitude slots, because `CNOT` flips the second qubit exactly when the first is `1`: `|10⟩` becomes `|11⟩`, and since there was no amplitude on `|11⟩` or `|01⟩` to begin with, the result is `[1/√2, 0, 0, 1/√2]` — amplitude on `|00⟩` and `|11⟩` only, nothing on `|01⟩` or `|10⟩`.

Squaring each amplitude to get probabilities gives an exact result, confirmed directly:

```
P(00) = (1/√2)² = 0.5
P(01) = 0² = 0
P(10) = 0² = 0
P(11) = (1/√2)² = 0.5
```

This is the Bell state `(|00⟩ + |11⟩)/√2`. Two outcomes are possible, each with exactly 50% probability — and the other two outcomes, `01` and `10`, have exactly zero probability, not "unlikely," genuinely zero given this exact circuit.

## Why the outcomes are correlated, not independent

This is the entire point of the exercise. If `q0` and `q1` had been superposed independently (say, `H` applied to both separately, with no `CNOT`), all four outcomes `00`, `01`, `10`, `11` would each land at 25% — two independent coin flips. The Bell-pair circuit produces something categorically different: `r0` and `r1` always come out equal to each other. If you measure `q0` as `Zero`, `q1` is guaranteed `Zero` too; if `q0` comes out `One`, `q1` is guaranteed `One` too. Neither qubit has a definite value before measurement — each one individually still looks 50/50 if you only look at it alone — but the *pair* always agrees. That joint guarantee, with no definite individual value beforehand, is what "entangled" means operationally, and it's exactly what the zero probabilities on `01` and `10` are telling you.

## Running the lab and checking your result

Run `CreateBellPair()` many shots (either via the VS Code Run lens repeatedly, or `qsharp.run("FundamentalsLab.CreateBellPair()", shots=1000)` from Python) and tally the pairs you get back. You should see roughly half land on `(Zero, Zero)`, roughly half on `(One, One)`, and — this is the part worth actually checking, not assuming — effectively none on `(Zero, One)` or `(One, Zero)`. If you see a meaningful number of mismatched pairs, that's a sign of a bug in the circuit (for example, applying `H` to the wrong qubit, or getting the control/target order backwards in `CNOT`), not a feature of entanglement.

## Key terms

| Term | Meaning |
|---|---|
| `CNOT` | The controlled-NOT gate: flips the target qubit if and only if the control qubit is `One` |
| Entanglement | A joint state where measurement outcomes of two or more qubits are correlated, with no definite individual value before measurement |
| Bell state | The specific two-qubit entangled state `(\|00⟩ + \|11⟩)/√2`, produced here by `H` then `CNOT` |
| Basis order | The convention `\|00⟩, \|01⟩, \|10⟩, \|11⟩` used to index a two-qubit amplitude vector |
| Correlated outcomes | Measurement results that always agree (or always relate in some fixed way) across qubits, as opposed to independent random outcomes |

## Check yourself

You run `CreateBellPair()` 1000 times and tally the results: 498 pairs of `(Zero, Zero)`, 502 pairs of `(One, One)`, and 0 pairs of either `(Zero, One)` or `(One, Zero)`. Using the exact amplitude calculation from this lesson, explain why this specific pattern -- not a 25/25/25/25 split -- is exactly what correct code should produce, and what you'd suspect went wrong in your circuit if you instead saw a roughly even split across all four outcomes.
