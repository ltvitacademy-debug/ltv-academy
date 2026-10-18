# Shor's Algorithm: the Period-Finding Reduction

Shor's algorithm doesn't factor N directly. It solves a completely different-looking problem — finding the period of a modular exponentiation sequence — and then shows that solving that problem solves factoring almost for free. This lesson derives that reduction in full, with a real worked numeric example, so the logic is airtight rather than asserted.

## What you'll learn

- How factoring N reduces to finding the multiplicative order (period) of a random a mod N
- The algebraic proof that an even period r with a^(r/2) ≢ −1 (mod N) yields nontrivial factors via gcd
- The full worked example: N = 15, a = 7, period r = 4, landing on factors 3 and 5
- The probabilistic guarantee that makes retrying a non-issue, not a flaw

## Setting up the reduction

Choose N to factor and pick a random integer a with 1 < a < N that is coprime to N (checked with a classical gcd — if gcd(a, N) > 1, you've accidentally already found a factor, which is rare but handled separately). Consider the sequence a mod N, a² mod N, a³ mod N, … . Because there are only finitely many residues mod N, this sequence is eventually periodic. The **multiplicative order** of a mod N is the smallest positive integer r such that a^r ≡ 1 (mod N). Finding r — this is **period-finding**, or **order-finding** — is the one computational step Shor's algorithm asks a quantum computer to do. Everything else in the pipeline is classical bookkeeping.

## Why order-finding solves factoring: the proof

Suppose you've found r, the order of a mod N, and suppose r is even. Then:

a^r ≡ 1 (mod N)
⟺ a^r − 1 ≡ 0 (mod N)
⟺ (a^(r/2) − 1)(a^(r/2) + 1) ≡ 0 (mod N)

That factorization of a^r − 1 as a difference of squares is just algebra — it holds because r/2 is a whole number exactly when r is even, which is why evenness matters. The last line says N divides the product (a^(r/2) − 1)(a^(r/2) + 1).

Now add one more condition: a^(r/2) ≢ −1 (mod N) (and by the definition of order, a^(r/2) ≢ 1 (mod N) either, since r is the *smallest* exponent giving 1). Under that condition, neither factor individually is ≡ 0 (mod N) — but N still divides their product. The only way a number can divide a product without dividing either factor outright is by sharing a nontrivial piece of its own factorization with each factor separately. That's exactly what gcd(a^(r/2) − 1, N) and gcd(a^(r/2) + 1, N) extract: each gcd pulls out the part of N hiding in that respective factor, and because neither factor is itself ≡ 0 (mod N), each gcd is guaranteed to be a nontrivial divisor of N — a real factor, not just 1 or N itself.

## The full worked example: N = 15, a = 7

Compute successive powers of 7 mod 15:

7¹ mod 15 = 7
7² mod 15 = 4
7³ mod 15 = 13
7⁴ mod 15 = 1

The sequence has hit 1 at k = 4, and no smaller k worked — so the order is **r = 4**. r is even, good. Now compute a^(r/2) mod N = 7² mod 15 = 49 mod 15 = **4**. Check: is 4 ≡ −1 (mod 15)? −1 mod 15 = 14, and 4 ≠ 14, so the condition holds. Compute both gcds:

gcd(4 − 1, 15) = gcd(3, 15) = **3**
gcd(4 + 1, 15) = gcd(5, 15) = **5**

Both are nontrivial, and 3 × 5 = 15. The reduction worked exactly as the proof above predicts, turning "find the period of 7 mod 15" into "15 = 3 × 5" using nothing but arithmetic once r was known.

## The probabilistic guarantee

Not every random a works on the first try — r might come out odd, or a^(r/2) might land exactly on −1 (mod N), both of which produce only trivial gcds (this failure case is explored numerically in Lesson 25). The reassuring part is a proven theorem: for N a product of two distinct odd primes, a randomly chosen a coprime to N has probability at least 1/2 of giving an r that is even **and** satisfies a^(r/2) ≢ −1 (mod N). That means on average, two attempts suffice. A failed attempt isn't a bug in the algorithm — it's an expected, bounded-probability outcome that a simple retry with a fresh random a resolves.

## Key terms

| Term | Meaning |
|---|---|
| Multiplicative order (period) | The smallest r > 0 such that a^r ≡ 1 (mod N), for a coprime to N |
| Period-finding / order-finding | The problem of computing r; the one step Shor's algorithm accelerates quantumly |
| Difference-of-squares factorization | a^r − 1 = (a^(r/2) − 1)(a^(r/2) + 1) when r is even; the algebraic core of the reduction |
| Nontrivial factor | A divisor of N other than 1 or N itself; what gcd extracts when the reduction succeeds |

## Check yourself

Using the same algebraic argument as the N = 15, a = 7 example, suppose instead a different a gave order r = 6 with a^3 mod N ≢ ±1 (mod N). Walk through which quantities you would compute next, in order, to recover N's factors — you don't need new numbers, just name the steps in the same order the proof above uses them.
