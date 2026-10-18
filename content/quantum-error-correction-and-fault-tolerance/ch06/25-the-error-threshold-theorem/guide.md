# The Error Threshold Theorem

The single theoretical result that justifies everything this course has been building toward: that scaling up a code is actually worth doing, provided one condition holds.

## What you'll learn

- The precise statement of the threshold theorem
- The illustrative exponential-suppression scaling, computed directly
- Why the theorem's existence is well-established, but the real physical threshold value is an empirical, hardware-specific question
- Why "above threshold" makes scaling up actively harmful, not just unhelpful

## The theorem, stated precisely

**Threshold theorem:** for a given code family (such as the surface code), there exists a physical error rate **p_th** (the threshold) such that, if the actual physical error rate *p* is below p_th, increasing the code's distance *d* suppresses the **logical** error rate exponentially in *d*. If *p* is at or above p_th, increasing *d* does not help — and can actively make the logical error rate worse.

This is a well-established, proven theoretical result (for the surface code and other code families) — the mathematical reason this entire field believes that scalable, reliable quantum computation is *possible in principle*, not just a hopeful slogan.

## Illustrative scaling, computed directly

The shape of the below-threshold suppression follows roughly **p_L ∼ (p / p_th)^((d+1)/2)** — the logical error rate falls off as an increasing power of (p/p_th) as distance grows. Using illustrative values (p_th = 0.01, p = 0.001, i.e. a physical error rate at one-tenth of the threshold — chosen to show the *shape* of the scaling, not any specific hardware's measured numbers), computed directly:

| Code distance d | Exponent (d+1)/2 | (p/p_th)^exponent |
|---|---|---|
| 3 | 2 | ≈ 1.000 × 10⁻² |
| 5 | 3 | ≈ 1.000 × 10⁻³ |
| 7 | 4 | ≈ 1.000 × 10⁻⁴ |
| 9 | 5 | ≈ 1.000 × 10⁻⁵ |
| 11 | 6 | ≈ 1.000 × 10⁻⁶ |
| 15 | 8 | ≈ 1.000 × 10⁻⁸ |

Each step up in distance buys roughly another order of magnitude of error suppression in this illustrative case — exactly the exponential behavior the theorem promises, provided the physical error rate stays below p_th. Combine this table with the previous lesson's qubit-cost table: going from d=7 to d=15 costs roughly 4.6x more physical qubits (449/97) but buys roughly 10,000x better logical error suppression (10⁻⁸ vs 10⁻⁴) in this illustrative scaling — a genuinely favorable trade, which is the whole point of having a threshold theorem at all.

## The asymmetry above threshold

If *p* is at or above p_th, the same formula's logic inverts: (p/p_th) is now ≥ 1, so raising it to a higher power (larger *d*) doesn't shrink the result — it keeps it flat or grows it. Scaling up a code above threshold doesn't just "fail to help," it can make the logical error rate *worse* by adding more physical qubits (and therefore more opportunities for something to go wrong) without the exponential suppression mechanism available to compensate. This asymmetry is why reaching below-threshold operation is treated as a hard prerequisite, not a nice-to-have, before scaling up a real device.

## What's proven vs. what's still empirical

Be precise about what's settled and what isn't: the *existence* of a threshold for the surface code (and related CSS code families) is an accepted, proven theoretical result. The *actual numerical value* of that threshold, and whether a given real piece of hardware's physical error rate genuinely sits below it under real operating conditions, is an empirical, hardware-specific, and still actively evolving question — not something this course states as a settled fact about any particular real device.

## Key terms

| Term | Meaning |
|---|---|
| Threshold (p_th) | The physical error rate below which increasing code distance helps, and above which it doesn't |
| Exponential suppression | The below-threshold behavior where logical error rate falls off as an increasing power of distance |
| Below-threshold / above-threshold | The two regimes with opposite scaling behavior as distance increases |

## Check yourself

Using the illustrative scaling table, if the physical error rate p were instead exactly equal to p_th (so p/p_th = 1), what would (p/p_th)^((d+1)/2) equal for every value of d, and what does that tell you about why operating exactly at threshold is still not good enough in practice?
