# Controlled & Adjoint Operations

If you've written `circuit.inverse()` or `gate.control(1)` in Qiskit, you've already used the ideas behind this lesson — but in Qiskit those are library methods that build a new circuit object by composing gates together. In Q#, "give me the inverse" and "give me a controlled version" are language-level **functors**: the compiler derives them automatically from how you wrote the original operation, and you never hand-author the inverse circuit yourself.

## What you'll learn

- What a functor is in Q#, and why `Adjoint` and `Controlled` are the two that matter most
- How declaring an operation `is Adj + Ctl` gets you both variants for free
- How to call `Adjoint Foo(q)` and `Controlled Foo([ctrl], q)`
- Why this is a compiler guarantee in Q#, not a library-level convenience like in Qiskit
- What kinds of operations can and cannot be marked `is Adj + Ctl`

## Functors: operations that transform operations

A **functor** in Q# takes an operation and produces a related operation without you writing new code for it. The two built into the language are:

- **`Adjoint`** — produces the inverse of an operation (undoes its effect)
- **`Controlled`** — produces a version of an operation that only executes if a set of control qubits are all `|1⟩`

Not every operation supports both. You opt in by declaring the characteristics it has:

```qsharp
operation PrepareSuperposition(q : Qubit) : Unit is Adj + Ctl {
    H(q);
}
```

The `is Adj + Ctl` clause tells the compiler: "generate both the adjoint and the controlled version of this operation automatically." For a simple self-inverse gate like `H`, the compiler can work out that the inverse of `H` is `H` itself. For more complex operations built from sequences of gates, the compiler reverses the sequence and substitutes each gate's own adjoint — you never write that reversal by hand.

## Calling the generated variants

Once an operation is declared `is Adj + Ctl`, you call the functor-applied versions just by prefixing the call:

```qsharp
operation DemoFunctors(q : Qubit, ctrl : Qubit) : Unit {
    PrepareSuperposition(q);              // apply it normally
    Adjoint PrepareSuperposition(q);       // undo it
    Controlled PrepareSuperposition([ctrl], q);  // apply it only if ctrl is |1>
}
```

`Adjoint PrepareSuperposition(q)` doesn't require you to know, or care, what the inverse of `PrepareSuperposition` actually looks like — the compiler already generated it when it compiled the `is Adj + Ctl` declaration. `Controlled PrepareSuperposition([ctrl], q)` takes an array of control qubits as its first argument (so it composes naturally with multiple controls) and the original operation's own arguments after that.

## A slightly richer example

Functors compose with operations that do more than one gate's worth of work:

```qsharp
operation EncodeAngle(q : Qubit, theta : Double) : Unit is Adj + Ctl {
    Ry(theta, q);
    S(q);
}

operation UseEncodeAngle(q : Qubit, ctrl : Qubit, theta : Double) : Unit {
    EncodeAngle(q, theta);                      // Ry(theta), then S
    Adjoint EncodeAngle(q, theta);               // compiler-generated inverse: Adjoint S, then Adjoint Ry(theta) -- i.e. Ry(-theta)
    Controlled EncodeAngle([ctrl], (q, theta));  // apply the whole sequence only if ctrl is |1>
}
```

Notice the order reversal in the generated adjoint: to undo "`Ry(theta)` then `S`", the compiler doesn't just invert each gate in the original order — it reverses the sequence *and* inverts each step, giving "undo `S`, then undo `Ry(theta)`." That's exactly the mathematically correct way to invert a composed sequence of unitary operations, and it's exactly what you'd have to work out by hand if you were building `EncodeAngle.inverse()` as a Qiskit circuit method yourself.

## Why this is a language-level guarantee, not a library convenience

Qiskit gives you `.inverse()` on a `QuantumCircuit` and `.control()` on many gate objects, and these are genuinely useful — but they operate on already-built circuit objects, composing a new circuit from the old one at the Python level. Nothing in Qiskit's type system requires that every gate or circuit *support* `.inverse()` correctly by construction; it's something the library implements for the gate types it knows about, and you're responsible for making sure custom gates behave correctly under it. In Q#, `is Adj + Ctl` is a declaration the compiler checks: if your operation's body contains something that can't be adjointed or controlled (for instance, a measurement — measurement is not unitary and has no well-defined inverse), the compiler will reject the `is Adj + Ctl` claim at compile time rather than let you discover the problem at runtime.

## Key terms

| Term | Meaning |
|---|---|
| Functor | A language-level transformation from one operation to a related one; Q# has `Adjoint` and `Controlled` |
| `Adjoint` | Functor producing the inverse of an operation |
| `Controlled` | Functor producing a version of an operation gated on an array of control qubits |
| `is Adj + Ctl` | Declaration that an operation supports both functors, compiler-checked and compiler-generated |
| Non-unitary operation | An operation (like measurement) that has no valid adjoint, and so cannot be declared `is Adj + Ctl` |

## Check yourself

Why can't an operation that calls `M` or `Measure` internally be declared `is Adj`? Think about what "the inverse of a measurement" would have to mean physically, and connect that back to why the compiler rejects it rather than generating something anyway.
