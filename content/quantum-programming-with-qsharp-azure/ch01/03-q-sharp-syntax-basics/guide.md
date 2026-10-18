# Q# Syntax Basics

Q# looks unfamiliar for about ten minutes and then starts feeling like a strict, quantum-aware cousin of C#. Before you write anything that touches a qubit, you need the classical skeleton: namespaces, the operation/function split, typed bindings, and control flow — none of it quantum yet, all of it load-bearing for every lesson after this one.

## What you'll learn

- How namespaces organize Q# code, and the project-folder convention behind them
- The real difference between `operation` and `function`, and why it exists
- `let` vs. `mutable` bindings, and Q#'s core type annotations
- Arrays, `Range`, and the `Unit` return type
- Control flow (`if`, `for`, `repeat-until`) and string interpolation

## Namespaces

Every Q# file lives inside a `namespace` block, which groups related operations and functions the way a Python module groups functions, or a C# namespace groups classes:

```qsharp
namespace QsharpBasics {
    function Square(x : Int) : Int {
        return x * x;
    }
}
```

Namespaces don't have to match folder or file names exactly, but by convention a project's entry namespace matches the project name, and you `open` a namespace to use its contents from elsewhere, similar to a Python `import`.

## `operation` vs. `function`: why the split exists

Q# draws a hard line that Python never needs to: a `function` is purely classical and deterministic — same inputs always produce the same outputs, no qubits touched, no randomness. An `operation` is anything that can have quantum effects or non-deterministic behavior — allocating or measuring qubits, calling another operation, or anything that isn't a pure classical computation. The compiler enforces this: you cannot call an operation from inside a function, because a function's whole contract is "deterministic, no side effects," and operations break that contract by definition.

```qsharp
function Double(x : Int) : Int {       // pure, classical -- a function
    return x * 2;
}

operation PrepareAndMeasure() : Result {  // touches a qubit -- must be an operation
    use q = Qubit();
    H(q);
    return M(q);
}
```

This isn't a style preference — it's the compiler's way of statically tracking which parts of your program are quantum and which aren't, which matters enormously once resource estimation needs to reason about what actually runs on hardware.

## `let`, `mutable`, and type annotations

Q# bindings are explicit about mutability. `let` creates an immutable binding — once set, it cannot be reassigned. `mutable` creates a binding you can later update with `set`:

```qsharp
let threshold = 10;         // immutable
mutable counter = 0;        // mutable
set counter = counter + 1;  // only `mutable` bindings can use `set`
```

Type annotations use a `name : Type` form, most visibly in function/operation signatures. The core primitive types are `Int`, `Double`, `Bool`, `String`, `Qubit`, and `Result` (the outcome of a measurement, either `Zero` or `One`). `Unit` is Q#'s "nothing to return" type — the equivalent of `void` in C# or `None` in Python, used whenever an operation's whole point is a side effect rather than a value:

```qsharp
operation Greet(name : String) : Unit {
    Message($"Hello, {name}!");
}
```

That last line is Q#'s string interpolation: a `$"..."` string with `{expression}` placeholders evaluated and inserted, directly analogous to Python's f-strings.

## Arrays and `Range`

Arrays are written as `Type[]` — `Int[]` for an array of integers, `Qubit[]` for an array of qubits, `Result[]` for an array of measurement outcomes:

```qsharp
let scores : Int[] = [10, 20, 30];
use qubits = Qubit[3];          // allocates an array of 3 qubits
```

A `Range` describes a sequence of integers with an optional step, written `start..step..stop` (the step defaults to 1 if omitted) — most commonly seen driving a `for` loop:

```qsharp
for i in 0..2..10 {
    Message($"i = {i}");   // prints 0, 2, 4, 6, 8, 10
}
```

## Control flow: `if`, `for`, `repeat-until`

`if`/`elif`/`else` and `for` look close to what you'd expect from C-family languages, with Q#'s braces-always-required style:

```qsharp
function Classify(x : Int) : String {
    if x < 0 {
        return "negative";
    } elif x == 0 {
        return "zero";
    } else {
        return "positive";
    }
}
```

`repeat-until` is the one loop shape with no common classical equivalent in mainstream languages (it's closest to a classical `do-while`, but built specifically for the "keep retrying a quantum measurement until you get the outcome you need" pattern you'll use constantly once qubits enter the picture):

```qsharp
operation FlipUntilOne() : Int {
    mutable attempts = 0;
    mutable outcome = Zero;
    use q = Qubit();
    repeat {
        H(q);
        set attempts += 1;
        set outcome = M(q);
        Reset(q);
    } until outcome == One;
    return attempts;
}
```

The body always runs at least once, then the `until` condition is checked; if false, it loops again. Notice `outcome` had to be declared `mutable` *before* the `repeat` block — a variable set with `set` inside the loop body needs to already exist in an outer scope so the `until` clause can read it.

## Key terms

| Term | Meaning |
|---|---|
| `namespace` | A named grouping of Q# operations and functions, analogous to a Python module |
| `function` vs. `operation` | A `function` is pure and classical (no qubits, no side effects); an `operation` can allocate/measure qubits or call other operations |
| `let` / `mutable` | `let` creates an immutable binding; `mutable` creates a binding that can later be reassigned with `set` |
| `Unit` | Q#'s "no return value" type, used for operations whose purpose is a side effect |
| `Range` | An integer sequence written `start..step..stop`, commonly used to drive `for` loops |
| `repeat-until` | A loop that always runs its body at least once, then repeats until a stated condition becomes true |

## Check yourself

You try to call an operation that measures a qubit from inside a `function` you've written, and the compiler rejects it. Why does Q# enforce this rule, and what change would you make to get the behavior you want?
