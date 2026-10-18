# Complexity Classes Problem-Solving Lab

You've seen the definitions in isolation across the last three lessons — now the real skill: given a problem you've never seen before, correctly place it in P, NP-complete, "in BQP with a known quantum speedup," or "no known quantum advantage," and defend that placement. This lab is worked practice, not new theory.

## What you'll learn

- A repeatable four-question checklist for classifying any computational problem
- Worked classifications for four concrete problems, reasoned through step by step
- Why the same problem can have a different classical answer and quantum answer
- How to avoid the two most common classification mistakes from Lessons 1-3

## The Classification Checklist

Before classifying any problem, ask these four questions in order:

1. **Can a classical computer solve it directly in polynomial time?** If yes, it's in P (and therefore also in NP, PSPACE, EXPTIME, and BQP, since each class contains the ones before it).
2. **If not solved quickly, can a proposed answer be *verified* quickly?** If yes, it's at least in NP. Then ask whether every other NP problem reduces to it — if so, it's NP-complete.
3. **Is there a known quantum algorithm that solves it faster than the best known classical algorithm?** If yes, classify the *kind* of speedup: exponential (Shor-type, relies on hidden structure like periodicity) or quadratic (Grover-type, applies to unstructured search).
4. **If no quantum algorithm offers an advantage, say so explicitly** — "no known quantum advantage" is a real, correct, final answer for most problems, not a gap in your knowledge.

## Worked Example 1: Sorting a List

*Problem: given a list of n numbers, put them in ascending order.*

Walking the checklist: Can a classical computer do this in polynomial time? Yes — comparison-based sorting algorithms like merge sort run in O(n log n), which is polynomial in n. Stop at question 1. **Classification: P.** There's no need to even discuss certificates or quantum algorithms — once a problem is confirmed to be in P, it's automatically in every larger class too, but "P" is the most specific and useful answer. Quantum computers offer no meaningful advantage here: you can't beat O(n log n) by a structurally interesting margin for general comparison-based sorting, classical or quantum.

## Worked Example 2: The Traveling Salesman Decision Problem

*Problem: given n cities with distances between them and a budget k, is there a route visiting every city with total length ≤ k?*

Can a classical computer solve this directly in polynomial time? No known algorithm does — the best known classical approaches are exponential in the worst case. Can a proposed answer be verified quickly? Yes: if someone hands you a specific route, adding up its total distance and comparing to k takes only polynomial time. So it's in NP. Does every other NP problem reduce to it in polynomial time? Yes — this is a textbook NP-complete problem. **Classification: NP-complete.** Now the quantum question: is there a known quantum algorithm offering an exponential speedup here? No — the only generally applicable quantum technique for brute-force search over NP-complete problem spaces is Grover's algorithm, which gives a quadratic speedup at best (checking candidate routes faster, but the search space is still exponential in the number of cities). **No known exponential quantum advantage.**

## Worked Example 3: Factoring a 2048-bit RSA Modulus

*Problem: given a 2048-bit number known to be the product of two large primes, find those two primes.*

Can a classical computer do this in polynomial time? No efficient classical algorithm is known; the best is the General Number Field Sieve, running in sub-exponential time — slow enough that a 2048-bit RSA modulus is considered safe against classical attack with current technology. Is it in NP? Yes — given a candidate factor, multiplying it out and checking the product takes polynomial time (and it's also in NP ∩ co-NP, since primality of the factors is also quickly verifiable). Is it NP-complete? No — factoring is not known to be NP-complete, and most complexity theorists doubt that it is. Now the quantum question: is there a known quantum algorithm with a *polynomial*-time solution? Yes — **Shor's algorithm**, covered in full in Chapter 5, factors in time polynomial in the bit-length, which is an exponential speedup relative to GNFS. **Classification: in BQP via Shor's algorithm; not known to be in classical P; exponential quantum speedup relative to the best known classical algorithm.**

## Worked Example 4: Searching an Unsorted Billion-Record Database for One Matching Entry

*Problem: given a billion unsorted records and a black-box test for "is this the record I'm looking for," find the one matching record.*

Classically, with no structure to exploit (the records are unsorted and the only operation is the black-box test), you need up to N = 1,000,000,000 checks in the worst case — this is **unstructured search**, O(N). Quantum mechanically, Grover's algorithm applies directly: the number of oracle queries needed is roughly floor((π/4)·√N). For N = 1,000,000,000, √N ≈ 31,622.8, and floor((π/4)·31,622.8) = 24,836 queries. **Classification: classical O(N) ≈ 1,000,000,000 queries in the worst case; quantum Grover O(√N) ≈ 24,836 queries — a real, quadratic, provable speedup, but not exponential.** Notice this is the same *shape* of problem as Example 2's brute-force search, but phrased as a pure oracle-query problem rather than a decision problem with real-world structure — which is exactly why Grover's algorithm applies cleanly here but only helps the brute-force portion of problems like TSP.

## The Two Most Common Mistakes

**Mistake 1: Confusing "NP" with "exponential to solve."** NP is defined by fast *verification*, not slow solving. A problem can be in NP and also happen to be in P (every P problem is in NP) — being in NP never by itself tells you a problem is hard to solve, only that a proposed solution is fast to check.

**Mistake 2: Assuming any quantum speedup must be exponential.** Most known quantum speedups — including the most famous general-purpose one, Grover's algorithm — are quadratic, not exponential. Only problems with the right exploitable structure (like the hidden periodicity Shor's algorithm uses) get the exponential kind. "Quantum algorithm exists" and "exponential speedup" are not the same claim.

## Key terms

| Term | Meaning |
|---|---|
| Classification checklist | The four-question sequence: solvable in P? verifiable fast (NP)? reduces from all of NP (NP-complete)? known quantum speedup, and what kind? |
| Unstructured search | A search problem with no exploitable structure beyond a black-box membership test; Grover's algorithm's natural domain |
| Exponential vs. quadratic quantum speedup | Shor-type speedups rely on hidden mathematical structure; Grover-type speedups apply generically but only quadratically |
| No known quantum advantage | A valid, final classification for the overwhelming majority of computational problems |

## Check yourself

A classmate hands you a new problem: "given a graph, can its nodes be colored with k colors so that no two adjacent nodes share a color?" Walk through the four-question checklist yourself and classify this problem, including what you can and cannot say about any quantum speedup for it.
