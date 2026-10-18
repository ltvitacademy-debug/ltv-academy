# Complex Vector Spaces

Chapter 2 built your vector and matrix intuition entirely on real numbers. Now that you have complex arithmetic, modulus, and conjugates in hand, it's time to put a vector of complex numbers to the exact use you've been building toward: describing the state of a single qubit.

## What you'll learn

- What it means for a vector space to be defined over the complex numbers, using C^2 as the concrete example
- Why a single qubit's state lives in C^2
- The general qubit state `alpha|0> + beta|1>` with complex `alpha` and `beta`
- The normalization condition `|alpha|^2 + |beta|^2 = 1`, verified numerically for both a normalized and a non-normalized example

## From R^2 to C^2

In Chapter 2, a 2D real vector was a pair of real numbers, `(x, y)`, with `x, y` in `R`. **C^2** is the same idea, one level up: it's the set of all pairs `(z1, z2)` where `z1` and `z2` are allowed to be *complex* numbers instead of just real ones. Vector addition and scalar multiplication work exactly the way you'd expect — component by component — except now a "scalar" can itself be a complex number, and each component can carry its own real and imaginary part.

**This is why we say C^2 is a vector space "over the complex numbers"** — the scalars you're allowed to multiply by, and the entries you're allowed to have in each slot, are drawn from `C` instead of `R`.

## Why a qubit's state lives in C^2

A classical bit has two possible values, 0 and 1. A qubit also has two basis possibilities, written `|0>` and `|1>` (read "ket zero" and "ket one" — standard quantum notation you'll use throughout this course), but instead of being *either* 0 *or* 1, a qubit's state is a weighted combination of both at once:

**|psi> = alpha|0> + beta|1>**

Here `alpha` and `beta` are the **amplitudes** attached to each basis state — and from Lesson 11 you already know why they have to be complex numbers rather than real ones: each amplitude needs to encode both an amount and a phase. Written as a vector, this state is just the pair `(alpha, beta)` — a vector in C^2, with `|0>` corresponding to `(1, 0)` and `|1>` corresponding to `(0, 1)`, exactly the way standard basis vectors worked in Chapter 2.

## The normalization condition

Not every pair of complex numbers `(alpha, beta)` is a valid qubit state. There's exactly one constraint, and you already have every tool needed to check it: the sum of the squared moduli of the amplitudes must equal 1.

**|alpha|^2 + |beta|^2 = 1**

This is the complex-vector-space version of "the vector has length 1." It will make much more sense once you reach the Born rule: `|alpha|^2` and `|beta|^2` will turn out to be the probabilities of measuring `|0>` and `|1>` respectively, and probabilities of all possible outcomes always have to add up to exactly 1. For now, treat it as the one algebraic check that tells you whether a given `(alpha, beta)` pair is actually a legitimate qubit state.

## Worked example: a normalized state

Let `alpha = 3/5` and `beta = 4i/5`. Compute each squared modulus:

```
|alpha|^2 = (3/5)^2 = 9/25
|beta|^2  = |4i/5|^2 = (4/5)^2 = 16/25
```

(For `beta = 4i/5`, the real part is 0 and the imaginary part is 4/5, so `|beta| = sqrt(0^2 + (4/5)^2) = 4/5`.)

```
|alpha|^2 + |beta|^2 = 9/25 + 16/25 = 25/25 = 1
```

The amplitudes sum to exactly 1 — this is a valid, normalized qubit state. (If the 3-4-5 pattern looks familiar, that's the same Pythagorean relationship from Lesson 12's `3 + 4i` example, just repurposed here as a probability-style constraint instead of a modulus calculation.)

## Worked example: a state that is NOT normalized

Now let `alpha = 1 + i` and `beta = 1 - i`. Compute each squared modulus:

```
|alpha|^2 = 1^2 + 1^2 = 2
|beta|^2  = 1^2 + (-1)^2 = 2
```

```
|alpha|^2 + |beta|^2 = 2 + 2 = 4
```

4 does **not** equal 1, so this pair is **not a valid qubit state** as written — it's not normalized. To fix it, divide both amplitudes by the square root of that total, `sqrt(4) = 2`:

```
alpha_normalized = (1 + i)/2
beta_normalized  = (1 - i)/2
```

Checking: `|alpha_normalized|^2 = (1/2)^2 + (1/2)^2 = 1/4 + 1/4 = 1/2`, and the same for `beta_normalized`, so the total is `1/2 + 1/2 = 1`. Dividing every amplitude by the square root of the un-normalized total always fixes it — this process is called **normalizing** the state.

**Common mistake:** forgetting to square the modulus before summing (checking `|alpha| + |beta| = 1` instead of `|alpha|^2 + |beta|^2 = 1`) — these are different conditions, and only the squared version is the correct physical constraint.

## Key terms

| Term | Meaning |
|---|---|
| C^2 | The 2-dimensional vector space whose components and scalars are complex numbers; the state space of a single qubit |
| Ket (\|0>, \|1>) | Standard quantum notation for the two basis states of a qubit, corresponding to the vectors (1,0) and (0,1) in C^2 |
| Amplitude | The complex coefficient (alpha or beta) attached to a basis state in a qubit's state |
| Normalization condition | The requirement \|alpha\|^2 + \|beta\|^2 = 1 that a valid qubit state's amplitudes must satisfy |
| Normalizing | Dividing every amplitude by the square root of the (un-normalized) sum of squared moduli, to produce a valid state |

## Check yourself

Is the pair `alpha = 1/2`, `beta = i/2` a valid, normalized qubit state? Compute `|alpha|^2 + |beta|^2` to check, and if it isn't normalized, say what you'd need to multiply both amplitudes by to fix it.
