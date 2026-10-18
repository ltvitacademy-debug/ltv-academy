# Shor's Algorithm Small-Scale Lab

This lab is a hand trace, not a circuit build — you'll walk through the exact arithmetic Shor's algorithm's classical post-processing performs, for the same N = 15 used throughout this chapter, with two different choices of a. One succeeds cleanly. One fails cleanly. Both outcomes are correct behavior, and the lab's job is to make that distinction concrete rather than abstract.

## What you'll learn

- How to trace the full N = 15, a = 7 reduction by hand, from modular powers to final factors
- How to trace the N = 15, a = 14 case and recognize the failure mode as it happens
- Why the a = 14 failure is expected algorithm behavior, not a bug, and what the correct next step is
- How this toy example's total triviality connects back to Lesson 23's honest practicality discussion

## Exercise 1: the successful case, N = 15, a = 7

Start from the sequence of powers of 7 modulo 15:

7¹ mod 15 = 7
7² mod 15 = 4
7³ mod 15 = 13
7⁴ mod 15 = 1

**Step 1 — find r.** The sequence returns to 1 at the 4th power, and no earlier power did, so r = 4.

**Step 2 — check r is even.** 4 is even. Continue.

**Step 3 — compute a^(r/2) mod N.** 7^(4/2) mod 15 = 7² mod 15 = 49 mod 15 = 4.

**Step 4 — check the −1 condition.** Is 4 ≡ −1 (mod 15)? −1 mod 15 = 14. 4 ≠ 14, so the condition for a useful factor holds — proceed.

**Step 5 — compute both gcds.** gcd(4 − 1, 15) = gcd(3, 15) = 3. gcd(4 + 1, 15) = gcd(5, 15) = 5.

**Result.** 3 and 5 are both nontrivial factors of 15, and 3 × 5 = 15. The reduction succeeded on this attempt, using exactly the proof from Lesson 21.

## Exercise 2: the failure case, N = 15, a = 14

Now trace a = 14 the same way.

**Step 1 — find r.** 14¹ mod 15 = 14. 14² mod 15 = 196 mod 15 = 1. The sequence returns to 1 already at the 2nd power, so r = 2.

**Step 2 — check r is even.** 2 is even. Continue — so far this looks promising.

**Step 3 — compute a^(r/2) mod N.** 14^(2/2) mod 15 = 14¹ mod 15 = 14.

**Step 4 — check the −1 condition.** Is 14 ≡ −1 (mod 15)? −1 mod 15 = 14. Yes — 14 ≡ −1 (mod 15) exactly. This is the condition the proof in Lesson 21 flagged as a failure case.

**Step 5 — compute both gcds anyway, to see why they fail.** gcd(14 − 1, 15) = gcd(13, 15) = 1 (trivial — gives no information). gcd(14 + 1, 15) = gcd(15, 15) = 15 (trivial — just N itself, also no information).

**Result.** Both gcds came back trivial. This run of the algorithm produced no factor at all, even though every individual step was computed correctly.

## What to do after a failure like a = 14

The correct response is not to debug the algorithm or suspect an error in the arithmetic — the arithmetic above is exactly right, and this is precisely the failure mode predicted algebraically in Lesson 21 whenever a^(r/2) lands exactly on −1 (mod N). The correct response is simply: discard this a, pick a new random a, and run the whole reduction again. Lesson 21's probabilistic guarantee says a random a has at least a 1/2 chance of avoiding this failure mode, so on average, a second attempt (or occasionally a third) resolves it. This is what a real run of Shor's algorithm looks like sometimes — a quantum computer running the circuit from Lesson 22 would measure a result consistent with r = 2 just as validly as any other r, and the classical post-processing would correctly detect the −1 condition and correctly know to retry. That's the algorithm working as designed, not failing.

## Connecting back to practicality

Notice what this entire lab actually required: a handful of modular multiplications on numbers smaller than 20, done by hand or with a calculator. Even simulating this "quantum" algorithm classically for N = 15 is trivial — there was no quantum computer involved anywhere in this lab, only the classical arithmetic the algorithm's reduction defines. That triviality is the whole point of using N = 15 as a teaching example: it makes the logic inspectable, not that it represents any real cryptographic scale. Lesson 23 was explicit that an n-bit N worth attacking in practice (RSA-2048, n = 2048) needs a real quantum circuit performing controlled modular exponentiation (Lesson 22) on registers of thousands of qubits, at a scale and error rate no existing hardware reaches. The gap between "trace this by hand in five minutes" (N = 15) and "requires 20 million noisy qubits" (RSA-2048, per the widely cited Gidney & Ekerå estimate) is not a gap in understanding the algorithm — this lab proves the algorithm itself is fully understood and mechanically simple to trace. The gap is entirely the hardware scale-up problem Lesson 23 described.

## Key terms

| Term | Meaning |
|---|---|
| Successful run | An attempt where r is even and a^(r/2) ≢ −1 (mod N), yielding nontrivial factors via gcd |
| Failed run | An attempt where a^(r/2) ≡ −1 (mod N) (or r is odd), yielding only trivial gcds (1 or N) |
| Retry | The correct response to a failed run: discard the current a and repeat the reduction with a new random a |
| Toy example | A deliberately small N (like 15) used to make the algorithm's logic fully inspectable by hand |

## Check yourself

Trace N = 15, a = 4 by hand using the same five steps as Exercise 1 and Exercise 2 (you may use the fact, stated earlier in this chapter, that 4¹ mod 15 = 4 and 4² mod 15 = 1). Does this attempt succeed or fail, and what are the resulting factors or gcds?
