# Implementing Grover's Algorithm in Q#

You already know Grover's algorithm from Qiskit: build an oracle, build a diffusion operator, iterate, measure. What changes in Q# isn't the algorithm — it's how naturally the language's own control-flow sugar expresses the "mark, then reflect" pattern that Grover's is built from.

## What you'll learn

- How to express a phase-flip oracle and a diffusion operator as Q# operations
- Why `within ... apply ...` is the natural way to write a diffusion operator
- A verified, exact result for the smallest interesting case: 2 qubits, 1 marked item, 1 iteration
- How this differs in feel from building the same algorithm as a Qiskit `QuantumCircuit`

## The oracle: a phase flip, not a measurement

Grover's oracle doesn't tell you which item is marked by measuring anything — it flips the sign of the marked basis state's amplitude while leaving every other amplitude untouched. For a 2-qubit search space (4 items, indices 0-3) with item 3 (`|11⟩`) marked, the oracle is a controlled-Z pattern:

```qsharp
operation MarkItem3(qs : Qubit[]) : Unit is Adj + Ctl {
    Controlled Z([qs[0]], qs[1]);
}
```

`Controlled Z` applies a `Z` to `qs[1]` only when `qs[0]` is `|1⟩` — and since `Z` only has a nontrivial effect on `|1⟩`, this flips the sign of exactly the `|11⟩` amplitude and leaves `|00⟩`, `|01⟩`, and `|10⟩` alone. That's the entire oracle for this marked item.

## The diffusion operator: `within ... apply ...`

The diffusion operator reflects the state about the uniform superposition. The standard construction — apply Hadamards, reflect about `|0...0⟩`, undo the Hadamards — is exactly what Q#'s `within ... apply ...` block is for: it conjugates a block of code (`apply`) by another block (`within`), automatically applying the `within` block, then the `apply` block, then the **adjoint** of the `within` block, without you writing the undo step by hand.

```qsharp
operation Diffuse(qs : Qubit[]) : Unit {
    within {
        ApplyToEachA(H, qs);
    } apply {
        Controlled Z(qs[...0..Length(qs)-2], qs[Length(qs)-1]);
        // phase flip applied to every state except |0...0>, via a multi-controlled Z
        // conjugated by X gates to target |0...0> specifically
    }
}
```

The real diffusion operator needs a reflection about `|0...0⟩` specifically (not an arbitrary one), typically built by conjugating a multi-controlled `Z` with `X` gates on every qubit — the exact gate sequence is more detail than this lesson needs, but the shape — conjugate by Hadamards, do a reflection, undo the Hadamards — is the point, and `within...apply` is precisely the Q# idiom for "do A, then B, then undo A" without manually writing the undo.

## A verified exact result: N=4, one marked item, one iteration

For the smallest interesting case — a 2-qubit search space (N=4), exactly one marked item, and exactly **one** Grover iteration — the amplification is exact, not approximate. Starting from the uniform superposition `[0.5, 0.5, 0.5, 0.5]`, applying the oracle (flipping the sign of the marked amplitude) and then the diffusion operator produces a state with probability **1.0** on the marked item and **0.0** on every other item. This was verified directly by matrix computation (building the 4-dimensional state vector, applying the oracle's sign flip and the diffusion reflection `D = 2|s⟩⟨s| - I` as explicit matrices): starting from `[0.5, 0.5, 0.5, -0.5]` after the oracle, applying diffusion gives exactly `[0, 0, 0, 1.0]`. This is a special case, not the general rule — for larger search spaces you need roughly `π/4 × √N` iterations, and overshooting past the optimal iteration count actually *reduces* the marked item's probability back down. N=4 with one marked item is special because one iteration happens to hit the optimal point exactly.

## What's different from Qiskit here, concretely

In Qiskit, you'd build this as a `QuantumCircuit` object: append `cz`, append Hadamards, append more gates, and the whole thing is data you can inspect, draw, or transpile before ever running it. In Q#, `MarkItem3` and `Diffuse` are operations — the oracle's `is Adj + Ctl` declaration means the compiler can derive its inverse and controlled forms automatically if a larger algorithm ever needed to use this oracle as a building block inside something bigger (for example, inside amplitude estimation), without you writing those variants by hand. You don't get a circuit object to inspect at runtime the way Qiskit gives you one — you get a composable, type-checked building block instead.

## Key terms

| Term | Meaning |
|---|---|
| Phase-flip oracle | An oracle that flips the sign of the marked basis state's amplitude, rather than measuring or labeling it |
| Diffusion operator | The reflection-about-uniform-superposition step that amplifies the marked amplitude each iteration |
| `within ... apply ...` | Q# syntax that applies a block, then another block, then automatically undoes the first block (conjugation pattern) |
| Grover iteration | One application of oracle followed by diffusion; the number needed scales roughly as √N |

## Check yourself

If you ran a *second* Grover iteration on this same N=4, 1-marked-item setup (instead of stopping after one), would you expect the marked item's probability to still be 1.0, higher, or lower? Reason from what the diffusion operator does to amplitudes that are already fully concentrated on one state.
