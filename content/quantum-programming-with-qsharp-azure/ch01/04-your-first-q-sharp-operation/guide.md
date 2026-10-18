# Your First Q# Operation

Every piece of syntax from the last lesson exists to let you write one shape of program: allocate a qubit, do something to it, measure it, and get a classical answer back out. This lesson writes that program for real, and checks the math behind what it should actually produce.

## What you'll learn

- How `use` allocates a qubit, and what state it starts in
- What `H` does to that qubit, in exact amplitude terms
- How `M` collapses a qubit to a classical `Result`, and what that type actually is
- Why running one shot tells you almost nothing, and what running many shots reveals
- How to read this operation in both the VS Code and Python/Jupyter entry points

## Allocating a qubit with `use`

Every qubit in Q# starts life in the `use` statement, and every qubit `use` allocates starts in the `|0⟩` state — this is a guarantee of the language, not something you need to verify or initialize yourself:

```qsharp
use q = Qubit();
```

At this point `q` is a fresh qubit in `|0⟩`, allocated for the rest of the enclosing block and automatically released at the end of it (Q# manages the allocation lifetime for you; you don't manually "free" a qubit the way you'd free memory).

## Applying `H`: an exact, verified calculation

`H` is the Hadamard gate, the standard way to put a qubit into superposition. Written as amplitudes, `|0⟩ = [1, 0]` and `H` applied to it produces `(|0⟩ + |1⟩)/√2`, i.e. the amplitude vector `[1/√2, 1/√2]`. The probability of measuring a given outcome is the square of its amplitude — and that's exact, checkable arithmetic, not a hand-wave:

```
amplitude for |0⟩ = 1/√2 ≈ 0.7071067811865476
amplitude for |1⟩ = 1/√2 ≈ 0.7071067811865476
P(0) = (1/√2)² = 0.5
P(1) = (1/√2)² = 0.5
```

Running that squaring directly confirms both probabilities come out to exactly `0.5` (floating-point arithmetic returns `0.5000000000000001`, which is `0.5` with ordinary rounding noise — not a different number). So after `H` on a freshly allocated `|0⟩` qubit, the two outcomes are genuinely equally likely, not approximately, not "roughly" — the amplitudes are mathematically identical, so their squares are identical too.

```qsharp
use q = Qubit();
H(q);
```

## Measuring with `M`

`M` measures a qubit along the computational basis (the `|0⟩`/`|1⟩` basis) and collapses it to a classical outcome of type `Result`, which can only be one of two values: `Zero` or `One`. Measurement is irreversible within the program — once you call `M`, the superposition is gone and `q` is now definitely in whichever basis state it collapsed to.

```qsharp
namespace FirstOperation {
    @EntryPoint()
    operation MeasureSuperposition() : Result {
        use q = Qubit();
        H(q);
        let outcome = M(q);
        Reset(q);
        return outcome;
    }
}
```

`Reset(q)` forces the qubit back to `|0⟩` before the end of the block — good practice so a qubit's allocation always ends in a known state, which matters once you start allocating many qubits in sequence.

## One shot tells you nothing; many shots tell you everything

Run `MeasureSuperposition()` once and you'll get `Zero` or `One` — and that single result, on its own, is uninformative, because both outcomes are equally valid and equally likely. What actually demonstrates the 50/50 split from the calculation above is running the operation many times and looking at the distribution of outcomes, not reading any single result as "the" answer.

From the Python/Jupyter entry point, this is one call:

```python
import qsharp
qsharp.eval(open("MeasureSuperposition.qs").read())
results = qsharp.run("FirstOperation.MeasureSuperposition()", shots=1000)
# results is a list of 1000 Result values; roughly half Zero, half One
```

From the VS Code entry point, the Run code lens executes a single shot by default — to see the distribution there, you'd use the companion histogram/shot-count tooling the extension exposes, which runs the operation repeatedly and tallies outcomes, same idea, different interface.

## Key terms

| Term | Meaning |
|---|---|
| `use` | Allocates one or more qubits, each starting in the `\|0⟩` state, scoped to the enclosing block |
| `H` | The Hadamard gate; applied to `\|0⟩` it produces the equal superposition `(\|0⟩ + \|1⟩)/√2` |
| `M` | Measures a qubit in the computational basis, collapsing it and returning a classical `Result` |
| `Result` | Q#'s two-valued measurement-outcome type: `Zero` or `One` |
| Shot | One full run of a quantum program from qubit allocation through measurement; distributions require many shots |

## Check yourself

You run `MeasureSuperposition()` once and get `One`. A classmate says this proves the Hadamard gate is broken because they expected `Zero`. Using the exact amplitude calculation from this lesson, explain why a single `One` result is completely consistent with `H` working correctly, and what experiment would actually let you check the gate's behavior.
