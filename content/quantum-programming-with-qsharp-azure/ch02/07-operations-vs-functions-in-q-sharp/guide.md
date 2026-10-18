# Operations vs. Functions in Q#

Qiskit code is just Python: whether a function builds a circuit, computes an angle, or does both at once, it's all the same `def`, with no language-level distinction. Q# makes a hard distinction between code that can touch quantum state and code that can't — and the compiler, not convention, enforces it. That distinction is one of the more genuinely different ideas in Q#, and it's worth taking seriously before you write much more of it.

## What you'll learn

- The difference between `operation` and `function` as Q# keywords, not just naming style
- Why functions are pure, deterministic, and forbidden from touching qubits
- Why operations are the only place quantum side effects (and randomness) are allowed
- How to write a pure classical helper and call it from an operation
- Why Qiskit/Python has no compiler-enforced equivalent of this split

## Two keywords, two contracts

Q# has exactly two kinds of callable routines: `function` and `operation`. A `function` is a pure, deterministic, classical computation — same inputs always produce the same output, no side effects, no qubits, no randomness, no calling an operation. An `operation` is the only kind of callable allowed to act on qubits, call intrinsic gates, call other operations, or use any source of quantum randomness (such as measurement outcomes).

```qsharp
function AngleForFraction(numerator : Int, denominator : Int) : Double {
    return PI() * IntAsDouble(numerator) / IntAsDouble(denominator);
}

operation ApplyFractionalRotation(q : Qubit, numerator : Int, denominator : Int) : Unit {
    let theta = AngleForFraction(numerator, denominator);
    Rz(theta, q);
}
```

`AngleForFraction` is a `function`: given the same `numerator` and `denominator`, it always returns the same `Double`, and it never mentions a `Qubit`. `ApplyFractionalRotation` is an `operation`: it calls the pure function to compute a classical angle, then uses that angle as the parameter to `Rz`, an intrinsic gate that only operations are allowed to call.

## The compiler enforces the boundary

This isn't a style guideline — it's checked at compile time. If you tried to write:

```qsharp
function BadAttempt(q : Qubit) : Unit {
    H(q);   // compiler error: functions cannot call operations
}
```

the Q# compiler rejects it outright, because `H` is an intrinsic operation and `BadAttempt` is declared as a `function`. There is no way to sneak quantum side effects into a `function` — the type system simply won't allow a call graph where a `function` invokes an `operation`. Operations, however, can freely call functions, since pure classical computation is always safe to use from quantum code. The dependency only ever flows one direction: operations may depend on functions, functions may never depend on operations.

## Why this is more than naming convention

In Qiskit, there's no analogous restriction. A Python function that builds part of a circuit, a function that computes a rotation angle from input data, and a function that runs a simulation and returns measurement counts are all just `def` — nothing in the language stops a "helper" function from secretly calling `backend.run(...)` or mutating a `QuantumCircuit` passed to it. You rely entirely on your own discipline (and maybe docstrings) to keep "pure helper logic" separate from "circuit-touching logic." Q# turns that discipline into an enforced contract: if you declared something a `function`, you — and anyone who reads or maintains it — can trust, with compiler-backed certainty, that it does not touch a qubit, consume randomness, or have any side effect beyond returning a value.

This matters practically once programs grow. A classical pre-processing step (say, computing rotation angles from a dataset, or normalizing a probability distribution before encoding it into amplitudes) can be written, unit-tested, and reasoned about as ordinary deterministic code — because it's `function`-typed, you know it behaves like one, with no need to trace through it looking for a stray gate call or measurement.

## When you need both in sequence

A common real pattern is exactly what the opening example showed: a `function` that turns classical input into a parameter, followed by an `operation` that feeds that parameter into a gate. You'll see this constantly with rotation gates (`Rx`, `Ry`, `Rz`), where the angle itself is often derived from classical data — a dataset value, an index, a result of earlier classical computation — rather than being a hardcoded literal.

```qsharp
function NormalizedAngle(rawValue : Double, maxValue : Double) : Double {
    return (rawValue / maxValue) * PI();
}

operation EncodeValue(q : Qubit, rawValue : Double, maxValue : Double) : Unit {
    let theta = NormalizedAngle(rawValue, maxValue);
    Ry(theta, q);
}
```

`NormalizedAngle` could be tested with ordinary assertions on plain numbers, with zero quantum simulation involved — a real practical benefit of the split, not just a theoretical one.

## Key terms

| Term | Meaning |
|---|---|
| `function` | A pure, deterministic Q# callable: no qubits, no randomness, no side effects, cannot call an `operation` |
| `operation` | A Q# callable allowed to act on qubits, call intrinsic gates, call other operations, and use quantum randomness |
| Call-graph restriction | The compiler-enforced rule that `function`s may never call `operation`s, though `operation`s may freely call `function`s |
| Deterministic | Always produces the same output for the same input — the defining property a `function` must have |

## Check yourself

Suppose you're asked to port a Qiskit helper function that both computes a rotation angle from a dataset *and* appends the rotation gate to a `QuantumCircuit` in the same function body. What would you have to do differently to express that same logic in Q#, and why would the compiler force that change?
