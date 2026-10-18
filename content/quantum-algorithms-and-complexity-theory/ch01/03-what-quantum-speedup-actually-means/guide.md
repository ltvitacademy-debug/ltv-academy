# What Quantum Speedup Actually Means

"Quantum speedup" gets used as if it's a single thing, but it comes in at least three very different flavors — and knowing which flavor applies to a given problem is what separates a real claim from marketing.

## What you'll learn

- The difference between exponential speedup (Shor), quadratic speedup (Grover), and no speedup at all (most problems)
- Why Shor's algorithm's speedup is measured against the *best known* classical algorithm, not the best possible one
- The exact iteration formula behind Grover's quadratic speedup, as a preview of Chapter 4
- Why "speedup" claims are always conditional on a model (query/oracle model, or current best classical algorithm)
- Why "quantum computers are faster at everything" is refuted by complexity theory itself, not just by engineering limits

## Exponential Speedup: Shor's Algorithm

**Shor's algorithm** factors an n-bit integer in time polynomial in n on a quantum computer — specifically, in roughly O(n³) gate operations (modern refinements do better, but polynomial either way). The best known *classical* algorithm for factoring, the **General Number Field Sieve (GNFS)**, runs in roughly sub-exponential time: about exp(O(n^(1/3) (log n)^(2/3))) for an n-bit number. The gap between "polynomial in n" and "sub-exponential in n" is enormous and grows explosively as n increases — this is what people mean by an **exponential speedup**: the quantum algorithm's running time grows so much more slowly than the classical algorithm's that for large enough n, the classical approach becomes practically impossible while the quantum approach stays feasible. This is precisely the gap that threatens RSA encryption, which relies on factoring large numbers being classically infeasible.

## Quadratic Speedup: Grover's Algorithm

**Grover's algorithm** solves unstructured search — "find the one marked item among N unsorted items, given only a black-box test for 'is this the marked one'" — using roughly ⌊(π/4)·√N⌋ queries to the oracle, compared to the O(N) queries a classical algorithm needs in the worst case (you'd expect to check about half the items, on average, before finding it classically). Going from O(N) to O(√N) is a **quadratic speedup**: real, provable, and useful, but categorically smaller than an exponential speedup. If N = 1,000,000, classical search needs on the order of a million checks in the worst case, while Grover's algorithm needs only about 785 oracle queries (⌊(π/4)·√1,000,000⌋ = 785) — a huge practical win, but N is still inside the square root, not the exponent. Chapter 4 derives this formula, the surrounding geometry, and why overshooting the iteration count actually destroys your result — this lesson is only the preview.

## Speedup Is Always Relative to Something

Every speedup claim in quantum computing is conditional, and glossing over the condition is how myths get started. There are two different things a "speedup" can be measured against:

1. **The query/oracle model** — Grover's quadratic speedup is a provable statement about the *number of oracle queries* needed in a black-box model. It's a clean mathematical result precisely because the model restricts what "work" means to oracle calls.
2. **The best currently known classical algorithm** — Shor's exponential speedup is measured against GNFS, the best classical factoring algorithm *anyone has found so far*. It is not a proof that no faster classical factoring algorithm could ever be discovered. Nobody has proven that factoring requires super-polynomial classical time — it's a conjecture (the same conjecture RSA's security rests on), well-supported by decades of failed attempts to beat it, but a conjecture nonetheless.

This matters because a "speedup" is a comparison, not an absolute property of a problem. If a better classical algorithm is ever discovered, some quantum speedup claims that are measured against "best known classical" would shrink or vanish — this is exactly why complexity theorists are careful to say a problem is "believed," not "proven," to be outside P.

## No Speedup At All: The Common Case

For the overwhelming majority of computational problems, no quantum algorithm offering any advantage over the best classical algorithm is known — and for many problems, none is expected to exist based on the complexity-theoretic arguments from Lesson 2. Quantum computers are not a universal accelerator; they are a different model of computation that happens to offer dramatic advantages for a narrow, specific set of problems with the right underlying mathematical structure (hidden periodicity for Shor-type problems, unstructured search for Grover-type problems) and no advantage at all for most everything else, including the general NP-complete problems most real-world optimization tasks reduce to.

## Why "Quantum Computers Are Faster at Everything" Is a Myth

This myth is not just an exaggeration — it is directly contradicted by the complexity theory covered in Lesson 2. BQP is not believed to contain NP-complete problems. If quantum computers really were faster at *everything*, BQP would have to contain NP (at minimum, it would need to efficiently solve NP-complete problems, which would collapse much of the structure complexity theorists have spent decades mapping out). No evidence supports that, and Grover's algorithm — the best general-purpose tool quantum computers have for brute-force search over NP-complete problem spaces — only delivers a quadratic speedup, which still leaves those problems exponential overall. "Quantum" is not a synonym for "fast." It's a specific, structured kind of computation that is dramatically better at a specific, narrow category of tasks, roughly the same bar as calling a GPU "faster at everything" because it's extraordinarily good at the narrow, specific case of parallel numeric computation.

## Key terms

| Term | Meaning |
|---|---|
| Exponential speedup | A quantum algorithm's running time grows polynomially while the best known classical algorithm's grows exponentially or sub-exponentially (e.g. Shor's algorithm vs. GNFS) |
| Quadratic speedup | A quantum algorithm needs O(√N) operations where the classical equivalent needs O(N) (e.g. Grover's algorithm) |
| General Number Field Sieve (GNFS) | The best known classical algorithm for integer factoring, running in roughly sub-exponential time |
| Oracle/query model | A computational model where "work" is counted as calls to a black-box function, used to make speedup claims like Grover's provable and precise |
| Conditional speedup claim | A speedup measured against the best *currently known* algorithm in a category, not a proof that no better algorithm could ever be found |

## Check yourself

A colleague claims: "Since Shor's algorithm gives an exponential speedup on factoring, quantum computers must give at least a quadratic speedup on every other hard problem too." Using what you learned in this lesson and Lesson 2, explain exactly where this reasoning breaks down.
