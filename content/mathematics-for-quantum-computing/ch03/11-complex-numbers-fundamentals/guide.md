# Complex Numbers Fundamentals

Every matrix operation you just finished in Chapter 2 worked on ordinary real numbers. Quantum computing can't stop there — a qubit's state is described by numbers that need an extra dimension real numbers don't have, and that extra dimension is exactly what complex numbers give you.

## What you'll learn

- What `i` is, and why `i^2 = -1` is a definition, not something you can derive from real-number rules
- How to write, add, subtract, and multiply complex numbers in `a + bi` form by hand
- Why quantum amplitudes are complex numbers, not just real ones
- How to recognize the real part and imaginary part of a result

## The problem real numbers can't solve

Try to solve `x^2 = -1` using only real numbers. Squaring any real number — positive, negative, or zero — always gives a result that is zero or positive. There is no real number whose square is negative. Mathematicians didn't abandon the equation; they extended the number system instead, by defining a new quantity:

**i = sqrt(-1)**, so that **i^2 = -1**.

This isn't something you prove from scratch — it's the starting axiom of the entire complex number system, the same way "parallel lines never meet" is a starting axiom of ordinary geometry. Everything else in this chapter builds on that one definition.

## The a + bi form

A **complex number** is written as `a + bi`, where `a` and `b` are both ordinary real numbers:
- `a` is called the **real part**
- `b` is called the **imaginary part** (note: `b` itself is real — it's the number multiplying `i`)

For example, `3 + 4i` has real part 3 and imaginary part 4. A real number like `7` is just the complex number `7 + 0i` — real numbers are a special case of complex numbers, not a separate category.

## Addition and subtraction: combine like parts

Adding or subtracting complex numbers works exactly like combining like terms in algebra — add the real parts together, and add the imaginary parts together, separately.

Worked example. Let `z1 = 3 + 4i` and `z2 = 2 - 5i`.

**Addition:**
`z1 + z2 = (3 + 2) + (4 + (-5))i = 5 + (-1)i = 5 - i`

**Subtraction:**
`z1 - z2 = (3 - 2) + (4 - (-5))i = 1 + 9i`

That's the whole rule — real parts combine with real parts, imaginary parts combine with imaginary parts, and they never mix into each other during addition or subtraction.

## Multiplication: distribute, then simplify using i^2 = -1

Multiplying two complex numbers uses ordinary distribution (FOIL), with one extra step: wherever `i * i` appears, replace it with `-1`.

Worked example. Multiply the same `z1 = 3 + 4i` and `z2 = 2 - 5i`:

```
(3 + 4i)(2 - 5i)
= 3(2) + 3(-5i) + 4i(2) + 4i(-5i)
= 6 - 15i + 8i - 20i^2
```

Now substitute `i^2 = -1`, so `-20i^2` becomes `-20(-1) = +20`:

```
= 6 - 15i + 8i + 20
= (6 + 20) + (-15 + 8)i
= 26 - 7i
```

So `z1 * z2 = 26 - 7i`. Notice the real part of the answer (26) came partly from multiplying the two imaginary pieces together — that `i^2 = -1` substitution is the one step that makes complex multiplication different from multiplying ordinary binomials.

**Common mistake:** forgetting to apply `i^2 = -1` and leaving a stray `i^2` in the final answer, or applying it with the wrong sign (writing `i^2 = 1` instead of `-1`). Always double-check that your final answer has no `i^2`, `i^3`, etc. left in it.

## Why quantum computing needs complex numbers, not just real ones

A classical bit is 0 or 1 — no numbers needed beyond that. A qubit's state, however, is described by **amplitudes**: coefficients attached to the possibilities `|0>` and `|1>` that must be able to encode something real numbers alone cannot — a notion of *phase*, a kind of "rotational position" that determines how quantum states interfere with each other (reinforcing or cancelling out, the way waves do). A single real number per amplitude can only tell you "how much" of each outcome; it can't also tell you the phase relationship between them. Complex numbers pack both pieces of information — an amount and a phase — into a single number. You'll make this precise with polar form in the next lesson, but the key idea to hold onto now is: **amplitudes are complex because quantum states need more information per coefficient than a real number can hold.**

## Key terms

| Term | Meaning |
|---|---|
| Imaginary unit (i) | The defined quantity satisfying `i^2 = -1`; the starting point of the complex number system |
| Complex number | A number of the form `a + bi`, where `a` and `b` are real numbers |
| Real part | The `a` in `a + bi` — the ordinary real-number component |
| Imaginary part | The `b` in `a + bi` — the real coefficient multiplying `i` |
| Amplitude | In quantum computing, the (generally complex) coefficient attached to a basis state like `|0>` or `|1>` |

## Check yourself

Let `z1 = 1 + 2i` and `z2 = 3 - i`. Compute `z1 + z2`, `z1 - z2`, and `z1 * z2` by hand, being careful to substitute `i^2 = -1` in the multiplication step. (Check your multiplication: the real part should come out to 5.)
