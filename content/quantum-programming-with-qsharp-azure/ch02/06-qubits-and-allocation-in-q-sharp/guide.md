# Qubits & Allocation in Q#

In Qiskit, a qubit is really just an index into a `QuantumRegister` sitting inside a `QuantumCircuit` object — you never "have" a qubit, you have a circuit and refer to its wires by position. Q# takes a different stance: a qubit is a real, first-class value in the language, requested from the runtime, held by a variable, and released when you're done with it. That shift in how qubits exist in the program is the first thing to get comfortable with.

## What you'll learn

- Why `Qubit` is an opaque type with no readable classical state
- How `use` statements request qubits from the runtime (and why they replaced the old `using` blocks)
- How to allocate and index arrays of qubits with `use qs = Qubit[n];`
- The scoped-lifetime model: automatic release at the end of a block
- How this first-class, dynamically-scoped model differs from Qiskit's register-and-circuit approach

## The `Qubit` type is opaque

A `Qubit` in Q# is a handle, not a container you can peek inside. You cannot write `let x = q.value;` or print a qubit's amplitude — there is no such member, because the whole point of the type is to prevent you from pretending quantum information is classical information you can read for free. The only legitimate ways to get classical information out of a qubit are measurement operations like `M` or `Measure`, and even then you only get a single classical `Result` (`Zero` or `One`), not the full state vector. This is a deliberate type-system choice: Q# bakes "you cannot clone or directly inspect a qubit" into what the type lets you do, rather than leaving it as a convention programmers are trusted to respect.

Contrast this with how a classical simulator state is often inspected informally — print statements, debugger watches, full access to the numbers. Q#'s `Qubit` type refuses that by construction. Whatever runtime the program ends up on — a full-state simulator for development, or real QPU hardware through Azure Quantum — the same `Qubit`-typed code runs, because nothing in the type depends on being able to read a vector of amplitudes.

## Allocating qubits with `use`

Modern Q# allocates qubits with a `use` statement:

```qsharp
operation PrepareAndMeasure() : Result {
    use q = Qubit();   // allocate one qubit, starts in |0>
    H(q);               // put it in superposition
    return M(q);         // measure, consuming the superposition
}
```

`use` is the current syntax; it replaced the older `using (q = Qubit()) { ... }` block form from earlier QDK versions, which required explicit braces around the qubit's entire lifetime. `use` instead scopes the qubit to the enclosing block automatically — no extra nesting needed. A freshly allocated qubit always starts in the `|0⟩` state. That's a guarantee from the runtime, not something you set up by hand.

## Arrays of qubits

Most real algorithms need more than one qubit, so Q# lets you allocate a whole array at once:

```qsharp
operation EntangleAll() : Result[] {
    use qs = Qubit[3];      // three qubits, each starts in |0>
    H(qs[0]);
    CNOT(qs[0], qs[1]);
    CNOT(qs[1], qs[2]);
    return [M(qs[0]), M(qs[1]), M(qs[2])];
}
```

`qs` is indexed like any array (`qs[0]`, `qs[1]`, …), and you can slice it (`qs[1...]`) or pass individual elements or sub-arrays into other operations. Each element is its own independent `Qubit` handle; the array is just a convenient way to allocate and manage many of them together instead of writing five separate `use` statements.

## Scoped lifetime and release

A qubit allocated with `use` is automatically released when control leaves the block it was declared in — you never call a `Release` function yourself. But "released" carries an obligation: on most simulators, a qubit must be back in a classically known state (typically `|0⟩`) or have been measured before release, because releasing a qubit that is still in an unknown superposition is treated as a runtime error on simulators that track exact state (they can detect when you forgot to resolve it). This is why so many Q# snippets end with a measurement, or with gates that explicitly undo whatever superposition was created, right before the `use` block's scope ends. It's a sharper version of a pattern Python developers already know from `with open(...) as f:` — guaranteed cleanup at scope exit — except here the cleanup has a physical precondition attached to it, not just a "close the handle" formality.

## Qiskit's model, by contrast

In Qiskit, you write `qc = QuantumCircuit(3)` and qubit 0, 1, 2 are positions in that circuit object — they exist only as indices, for the lifetime of the circuit object itself, and there's no separate "allocate" step with its own scope. You build the whole circuit first, as a static description, then hand it to a simulator or backend afterward. Q#'s `use` statement means allocation is a dynamic, imperative action that happens *as the program runs* — you can allocate a qubit, use it, release it, and allocate a fresh one later in the same operation, interleaved with ordinary classical control flow like loops and conditionals. That's a direct consequence of qubits being runtime values instead of circuit-object indices.

## Key terms

| Term | Meaning |
|---|---|
| `Qubit` | Q#'s opaque type for a single qubit handle; no readable classical state |
| `use` | Statement that allocates one or more qubits, scoped to the enclosing block, auto-released at scope exit |
| `Qubit[n]` | Array allocation syntax for `n` qubits at once, indexable like any Q# array |
| `using` block | The deprecated predecessor to `use`, requiring explicit braces around the qubit's lifetime |
| `Result` | The classical type (`Zero` or `One`) returned by measuring a qubit |

## Check yourself

A simulator will often raise a runtime error if you try to release a qubit that's still in superposition without measuring it first. Why does that restriction make sense given that `Qubit` is deliberately opaque — what would it mean, physically, to "release" a qubit whose state nobody ever resolved?
