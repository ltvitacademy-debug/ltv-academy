# Q# Data Types Lab

This lab pulls together everything from this chapter — the opaque `Qubit` type and `use` allocation, the operation/function split, intrinsic gates, and functors — into one small, concrete piece of code you build yourself: a reusable state-preparation operation, undone by its own compiler-generated `Adjoint`, and verified by measurement.

## What you'll learn

- How to write a reusable `operation` marked `is Adj + Ctl` that prepares a specific single-qubit state
- How a pure `function` supplies the classical angle that operation depends on
- How to call `Adjoint` on your own operation to undo it, and confirm the qubit returns to `|0⟩`
- How to call `Controlled` on your own operation to apply it conditionally
- How to verify a claimed probability by hand-computing it, rather than trusting intuition

## Step 1: a pure function for the angle

Start with a `function` — no qubits, no side effects — that returns a fixed rotation angle. Using a function here (rather than hardcoding the angle inline) is the same pattern from Lesson 7: classical computation stays classical-typed.

```qsharp
function PrepAngle() : Double {
    return PI() / 3.0;   // 60 degrees
}
```

## Step 2: a reusable `operation`, marked `is Adj + Ctl`

Now write the operation that actually touches a qubit, using `Ry` with the angle from `PrepAngle`:

```qsharp
operation PrepareState(q : Qubit) : Unit is Adj + Ctl {
    Ry(PrepAngle(), q);
}
```

Because `PrepareState` only contains a single intrinsic rotation, and `Ry` itself supports both functors, the compiler can generate a correct `Adjoint` and `Controlled` variant automatically — you never write `Ry(-PrepAngle(), q)` by hand, even though that is exactly what the generated adjoint does underneath.

## Step 3: verify the superposition probabilities by hand

Before trusting what measurement will show, it's worth computing the real numbers. `Ry(theta)`'s matrix is `[[cos(theta/2), -sin(theta/2)], [sin(theta/2), cos(theta/2)]]`. With `theta = PI()/3` (60°), `theta/2 = 30°`, so `cos(30°) = 0.8660254037844387` and `sin(30°) = 0.49999999999999994`. Applying this to `|0⟩ = [1, 0]` gives:

`Ry(60°)|0⟩ = [0.8660254037844387, 0.49999999999999994]`

Squaring each amplitude's magnitude gives the measurement probabilities:

`P(0) = 0.8660254037844387² = 0.7500000000000001 ≈ 0.75`
`P(1) = 0.49999999999999994² = 0.24999999999999994 ≈ 0.25`

Both numbers were produced by direct matrix-vector multiplication (not assumed), confirming `PrepareState` puts the qubit in a state where measuring `0` happens 75% of the time and `1` happens 25% of the time, in the long run over many shots.

## Step 4: undo it with `Adjoint`, and verify the return to `|0⟩`

```qsharp
operation PrepareThenUndo() : Result {
    use q = Qubit();
    PrepareState(q);
    Adjoint PrepareState(q);
    return M(q);
}
```

`Adjoint PrepareState(q)` applies the compiler-generated inverse — mathematically, `Ry(-PI()/3)` — right after `Ry(PI()/3)` was applied. Multiplying those two rotations together is multiplying a matrix by its own inverse, which gives the identity matrix exactly. Working through the matrix multiplication by hand confirms this: `Ry(-60°) · Ry(60°) · |0⟩ = [1, 0]` exactly, with no rounding residue in the amplitude on `|1⟩` — it comes out as precisely `0`. That means `M(q)` in `PrepareThenUndo` returns `Zero` with probability `1.0`, every single time, on an ideal noiseless simulator. This is the real payoff of the functor system: you didn't write the undo logic, and the verification confirms the compiler's generated inverse is exactly correct, not approximately correct.

## Step 5: apply it conditionally with `Controlled`

```qsharp
operation ConditionalPrep(ctrl : Qubit, target : Qubit) : (Result, Result) {
    Controlled PrepareState([ctrl], target);
    return (M(ctrl), M(target));
}
```

If `ctrl` is `|0⟩` when this runs, `Controlled PrepareState([ctrl], target)` does nothing to `target` — it stays `|0⟩`, and measuring it returns `Zero` with certainty. If `ctrl` had instead been set to `|1⟩` first (for example with `X(ctrl);` before the call), `target` would receive the same `Ry(PI()/3)` rotation as in Step 3, with the same `P(0) = 0.75`, `P(1) = 0.25` split verified above. The control qubit's state is what decides which of those two behaviors actually happens — nothing about `PrepareState`'s own code needs to change.

## Putting it together

What makes this lab a genuine synthesis rather than just a longer gate list: `PrepAngle` stays a `function` because it has no business touching a qubit; `PrepareState` is an `operation` because it does; `is Adj + Ctl` is what makes Steps 4 and 5 possible without writing a second version of the rotation logic; and every numeric claim about what measurement will show was checked by hand-multiplying matrices rather than asserted from memory.

## Key terms

| Term | Meaning |
|---|---|
| State preparation operation | An operation whose job is to put a qubit into a specific, non-default quantum state from `\|0⟩` |
| Compiler-generated inverse | The `Adjoint` variant of an `is Adj` operation, derived automatically rather than hand-written |
| Conditional application | Using `Controlled` so an operation's effect depends on another qubit's state at runtime |
| Ideal noiseless simulator | A simulator that reproduces exact theoretical probabilities (like `P(0) = 1.0` after undo) with no hardware error |

## Check yourself

If you changed `PrepAngle` to return `PI() / 2.0` instead of `PI() / 3.0`, what would the new `P(0)` and `P(1)` be after `PrepareState` runs (work it out using the same `Ry` matrix approach), and would `PrepareThenUndo` still return `Zero` with certainty? Why or why not?
