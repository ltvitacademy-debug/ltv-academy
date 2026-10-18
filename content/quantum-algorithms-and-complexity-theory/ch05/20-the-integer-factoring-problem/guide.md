# The Integer Factoring Problem

Every lesson in this chapter builds toward one famous result, so it starts with the problem itself: given a composite number N, find its prime factors. That sentence sounds almost too simple to matter — but the difficulty of answering it, classically, is the entire reason RSA encryption has protected internet traffic for decades, and the reason Shor's algorithm is the most consequential result in quantum computing.

## What you'll learn

- The precise statement of the integer factoring problem
- Why factoring underpins RSA's security
- The best known classical algorithm's complexity, honestly stated (sub-exponential, not polynomial)
- Why Shor's quantum algorithm's polynomial-time result is a genuinely different kind of speedup than Grover's

## The problem, precisely

Given a composite integer N, find integers p and q, both greater than 1, such that N = p × q. In the cryptographically interesting case, N is the product of two large primes (N = p·q, p ≠ q), and the problem is to recover p and q knowing only N. Multiplying two large primes together is computationally cheap. Reversing that multiplication — going from the product back to the two factors — is, as far as anyone has proven classically, dramatically harder. This asymmetry (easy one direction, hard the other) is called a one-way function, and it's exactly what RSA exploits.

## Why this matters: RSA

RSA public-key encryption generates a public modulus N = p·q from two large, secret primes p and q. The public key (which anyone can see) includes N. The private key depends on p and q individually. An attacker who could factor N back into p and q could reconstruct the private key and break the encryption entirely. So RSA's entire security guarantee rests on one specific computational claim: that factoring a large N is infeasible for an adversary within any practical amount of time. Note this is a claim about computational difficulty, not a mathematical impossibility — nothing says factoring can't be done, only that nobody has found a fast enough classical way to do it.

## The best classical algorithm: honest complexity

The best known classical factoring algorithm is the **General Number Field Sieve (GNFS)**. For an n-bit number N, GNFS runs in time roughly exp(O(n^(1/3)(log n)^(2/3))) — a **sub-exponential** running time. This is worth sitting with precisely because it's easy to round it incorrectly in either direction:

- It is **not exponential** in the naive brute-force sense (trying every possible divisor up to √N, which would take exp(O(n)) time) — GNFS is meaningfully faster than that.
- It is **not polynomial** either — it still grows faster than any polynomial in n, which is exactly why doubling the key size (going from RSA-1024 to RSA-2048) made factoring dramatically harder in practice, not just twice as hard.

This sub-exponential-but-not-polynomial status is precisely why choosing a large enough N (RSA-2048, RSA-4096) has kept RSA secure against every classical computer built so far.

## Shor's algorithm: a different kind of speedup

Shor's algorithm factors an n-bit N in time polynomial in n — roughly O(n³) gate operations (the exact exponent depends on implementation details covered in Lesson 22). Going from sub-exponential to polynomial is not an incremental improvement; it changes which problems are tractable at all as N grows. Recall Chapter 1's speedup taxonomy: Grover's algorithm gives a **quadratic** speedup over the best classical search (O(√N) vs O(N) oracle calls) — a real but bounded improvement, where classical and quantum running times are both exponential or both polynomial, just with different constants or exponents. Shor's algorithm is categorically different: it moves a problem from one complexity class (sub-exponential) into another (polynomial) outright. That's the reason factoring, specifically, is the result that made cryptographers pay attention to quantum computing — not because it's a bigger number, but because it changes what kind of problem factoring is.

## Key terms

| Term | Meaning |
|---|---|
| Integer factoring problem | Given composite N, find its prime factors p, q such that N = p·q |
| One-way function | A function easy to compute in one direction and believed hard to invert, the basis of RSA's security |
| General Number Field Sieve (GNFS) | The best known classical factoring algorithm; sub-exponential time, not polynomial |
| Sub-exponential time | Growth slower than any exponential exp(O(n)) but faster than any polynomial in n |
| Polynomial time | Growth bounded by n^k for some fixed k; what Shor's algorithm achieves for factoring |

## Check yourself

RSA-1024 was once considered secure and later deprecated in favor of RSA-2048. Using the GNFS complexity formula exp(O(n^(1/3)(log n)^(2/3))), explain why doubling the bit-length n has a much larger effect on classical factoring difficulty than doubling would have under a merely linear or polynomial running time.
