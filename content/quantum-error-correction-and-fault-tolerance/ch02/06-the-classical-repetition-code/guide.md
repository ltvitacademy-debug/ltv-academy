# The Classical Repetition Code

Before you can appreciate why quantum error correction is hard, it helps to see the simplest error-correcting idea that actually works for classical bits — and exactly what it buys you.

## What you'll learn

- How the 3-bit and 5-bit majority-vote repetition codes encode and decode a single bit
- How to turn a per-bit flip probability into an actual success probability for the encoded bit
- Why more redundancy helps, and why it isn't free
- Why this simple idea is the conceptual starting point for every error-correcting code in this course, classical or quantum

## The idea: say it three times

The simplest possible error-correcting code is **repetition**. To protect a single bit *b* against noise, don't send it once — send it three times: encode 0 as **000** and 1 as **111**. If the channel flips at most one of the three bits, the receiver can still recover the original bit by **majority vote**: count the 0s and 1s among the three received bits, and go with whichever is more common.

Concretely: if the true bit is 0 (encoded as 000) and the channel flips the middle bit, the receiver sees **010**. Two 0s, one 1 — majority vote says 0. The single error was fully corrected, with no need to know *which* bit flipped in advance; the voting procedure figures that out automatically from the pattern.

This only fails if **two or more** of the three bits flip, because then the majority vote is wrong. A 5-bit version (00000 / 11111) tolerates up to 2 flips before majority vote fails, at the cost of sending 5 bits instead of 3.

## From flip probability to success probability

Suppose each individual bit, independently, flips with probability *p* during transmission. For the 3-bit code, majority vote succeeds unless 2 or 3 of the bits flip; more generally, for an *n*-bit repetition code (*n* odd), it succeeds as long as fewer than *n*/2 bits flip. The exact success probability is:

**P(success) = Σ (for flips = 0 to ⌊n/2⌋) of C(n, flips) · p^flips · (1−p)^(n−flips)**

Computing this directly (verified numerically) gives:

| Channel flip rate *p* | No code (n=1) | 3-bit code (n=3) | 5-bit code (n=5) |
|---|---|---|---|
| 0.01 | 0.990000 | 0.999702 | 0.999990 |
| 0.05 | 0.950000 | 0.992750 | 0.998842 |
| 0.10 | 0.900000 | 0.972000 | 0.991440 |
| 0.20 | 0.800000 | 0.896000 | 0.942080 |

Read the p=0.10 row carefully: an uncoded bit is wrong 10% of the time. The 3-bit code cuts that down to 2.8% (1 − 0.972000). The 5-bit code cuts it further, to 0.856% (1 − 0.991440). Each extra layer of redundancy buys a real, computable improvement — but the improvement shrinks as the channel gets noisier, and at a high enough *p* repetition stops helping at all (if p > 0.5, the "majority" is more often wrong than right, and the code backfires).

## The real cost: overhead

The 3-bit code uses 3 physical bits to protect 1 logical bit — a 3x overhead. The 5-bit code is 5x. This tradeoff, **more physical resources bought in exchange for a lower logical error rate**, is the single idea that this entire course generalizes. Chapter 6 will do exactly this same kind of table, but for physical qubits protecting one logical qubit under the surface code, where the "exchange rate" is far steeper — hundreds to thousands of physical qubits per logical qubit, not 3 or 5.

## Key terms

| Term | Meaning |
|---|---|
| Repetition code | Encoding a single bit as n identical copies to protect it against noise |
| Majority vote | Decoding an n-bit repetition code by taking whichever bit value appears most often |
| Logical bit | The single bit of information being protected |
| Overhead | The ratio of physical resources (bits, later qubits) used per logical bit protected |

## Check yourself

Using the success-probability table above, is it ever possible for a *larger* repetition code (say, n=5) to have a *worse* success probability than a smaller one (n=3) at the same channel flip rate p? Why or why not, based on how the majority-vote failure condition changes with n?
