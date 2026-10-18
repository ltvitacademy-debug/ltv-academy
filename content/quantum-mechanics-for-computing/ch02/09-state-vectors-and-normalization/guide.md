# State Vectors & Normalization

The normalization condition |a|²+|b|²=1 has come up twice already as a rule to check. This lesson is about why that rule exists at all — and about a second, subtler fact: two states can look numerically different and still be physically identical.

## What you'll learn

- Why normalization is a physical requirement, not a mathematical nicety
- How to verify normalization for several concrete worked examples
- What "global phase" means and why it's physically unobservable
- How to distinguish a normalization error from a legitimate phase difference

## Why normalization has to hold

A quantum state's amplitudes aren't free-floating numbers — they're directly tied to measurement probabilities. For |ψ⟩=a|0⟩+b|1⟩, the Born rule (covered in full in Chapter 3) says P(0)=|a|² and P(1)=|b|². Since 0 and 1 are the *only* two possible outcomes of a computational-basis measurement on a single qubit, their probabilities have to add up to exactly 1 — that's just what "these are all the possible outcomes" means for any probability distribution. So |a|²+|b|² = P(0)+P(1) = 1 is forced, not a convention someone chose. A vector that doesn't satisfy it isn't describing a possible physical state; it's just two numbers that happen not to correspond to anything real.

## Two verified worked examples

**Example 1:** |ψ⟩ = 0.6|0⟩ + 0.8|1⟩. Check: 0.6² + 0.8² = 0.36 + 0.64 = 1. Normalized — valid.

**Example 2:** |ψ⟩ = √(1/3)|0⟩ + √(2/3)|1⟩. Check: (√(1/3))² + (√(2/3))² = 1/3 + 2/3 = 1. Normalized — valid. This state gives P(0) = 1/3 ≈ 0.333 and P(1) = 2/3 ≈ 0.667 (verified) — a qubit that, if measured many times, comes up 0 about a third of the time and 1 about two-thirds of the time.

Both examples obey the same single rule, even though the amplitudes look nothing alike. Normalization is a constraint on the *relationship* between a and b, not on either one individually.

## Global phase: a state can look different and be identical

Here's a fact that trips people up the first time they see it: multiply an entire state vector by e^(iθ) for any real angle θ, and you get a state that is *physically indistinguishable* from the original — same measurement probabilities in every basis, same everything observable. For example, −|0⟩ (which is e^(iπ) times |0⟩) is physically the same state as |0⟩; the minus sign is a **global phase**, applied equally to the whole vector, and it cancels out of every observable prediction. This is different from a *relative* phase between the a and b coefficients — a phase difference between amplitudes on different basis states — which absolutely is observable (Chapter 6 works through a fully verified example of exactly this distinction). The rule of thumb: a phase multiplying the *entire* state vector is invisible; a phase difference *between components* is physical.

## Distinguishing a normalization error from a phase difference

It's worth being precise about what normalization does and doesn't forbid. Changing −|0⟩+0|1⟩ to |0⟩+0|1⟩ changes nothing physical (global phase). But changing 0.6|0⟩+0.8|1⟩ to 0.6|0⟩+0.9|1⟩ is a real error, because 0.6²+0.9²=1.17≠1 — this isn't a phase issue, it's a vector that no longer describes a valid quantum state at all. Telling these apart matters: one is a legitimate alternate way of writing the same state, the other is simply wrong.

## What this means for computing

Any time you write down, simulate, or debug a qubit state by hand, normalization is the first sanity check — exactly the way you'd check array bounds or null references in ordinary code. And global-phase invariance is why two mathematically different-looking state vectors returned by two different (correct) simulators or algorithms can both be right: comparing raw vectors for equality can give a false mismatch if you forget that an overall phase doesn't matter.

## Key terms

| Term | Meaning |
|---|---|
| Normalization | The requirement \|a\|²+\|b\|²=1, forced because measurement probabilities over all outcomes must sum to 1 |
| Global phase | A factor e^(iθ) multiplying an entire state vector; physically unobservable, since it cancels out of every measurement probability |
| Relative phase | A phase difference between individual amplitudes (e.g. between a and b); unlike global phase, this IS physically observable |

## Check yourself

Is the state |ψ⟩ = 0.5|0⟩ + (√0.75)|1⟩ normalized? Show the calculation, and then explain whether multiplying this entire state by −1 changes anything physically observable about it.
