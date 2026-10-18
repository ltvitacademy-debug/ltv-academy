# Classical Complexity Classes Review

Before you can say a quantum computer is "fast" at something, you need a precise, classical baseline for what "fast" and "hard" already mean — this lesson is that baseline, and every later claim in this course about quantum speedup gets measured against it.

## What you'll learn

- The exact definitions of P, NP, NP-complete, PSPACE, and EXPTIME — and the one mistake almost everyone makes about NP
- Why NP is defined by verification speed, not solving speed
- Concrete example problems that live in each class
- The containment chain P ⊆ NP ⊆ PSPACE ⊆ EXPTIME, and why P vs NP is still unsolved
- Why exponential time complexity is a wall, not just "slow" — with real computed numbers

## P: Problems You Can Solve Quickly

**P** (polynomial time) is the class of decision problems — problems with a YES/NO answer — that a classical, deterministic computer can *solve* in time that grows polynomially with the size of the input, like O(n), O(n²), or O(n⁵). "Polynomial" here is the dividing line between "tractable" and "intractable" in complexity theory, even though an O(n⁵) algorithm can be slow in practice. Sorting a list of n numbers (O(n log n)), checking whether a number is prime (known to be in P since 2002), and finding the shortest path between two nodes in a graph (O(n²)-ish with Dijkstra's algorithm) are all in P. The common thread: there's a step-by-step procedure that *finds* the answer directly, without guessing, in a bounded number of steps that doesn't explode as the input grows.

## NP: Problems You Can Verify Quickly

**NP** (nondeterministic polynomial time) is the class of decision problems where, if the answer is YES, there exists a *certificate* — a piece of evidence — that a classical computer can **verify** in polynomial time. This is the single most misunderstood definition in complexity theory: NP is **not** "takes exponential time to solve." NP says nothing directly about how hard it is to *find* the answer — only that once you (or an oracle, or a lucky guess) hand over a candidate solution, checking that it's correct is fast. Take the Subset-Sum problem: "does some subset of these n numbers add up to exactly k?" Finding such a subset might take exponential time in the worst known case, but if someone hands you a candidate subset, adding it up and comparing to k takes only O(n) time — that's the certificate check. Every problem in P is also in NP (if you can solve it quickly, you can certainly verify a given answer quickly), but whether every problem in NP is also in P — whether fast verification implies fast solving — is the famous open P vs NP question.

## NP-Complete: The Hardest Problems in NP

**NP-complete** problems are the hardest problems inside NP, in a precise technical sense: a problem is NP-complete if (1) it is in NP, and (2) every other problem in NP can be transformed into it using only a polynomial-time reduction. That second property means an NP-complete problem is, in effect, a universal stand-in for the entire class — if you found a polynomial-time algorithm for even one NP-complete problem, you could use that same reduction trick to solve every problem in NP in polynomial time, proving P = NP. Boolean satisfiability (**SAT** — given a logical formula, is there an assignment of TRUE/FALSE to its variables that makes it evaluate to TRUE?) was the first problem proven NP-complete, by the Cook-Levin theorem. The decision version of the Traveling Salesman Problem ("is there a route visiting all n cities with total length ≤ k?") and graph coloring ("can this graph's nodes be colored with k colors so no two adjacent nodes share a color?") are both NP-complete too. No polynomial-time algorithm is known for any of them, despite decades of effort, which is the main empirical evidence (not proof) that P ≠ NP.

## PSPACE and EXPTIME: Beyond NP

**PSPACE** is the class of problems solvable using an amount of *memory* that grows polynomially with input size, regardless of how much *time* it takes (time can be exponential). Generalized game-tree evaluation problems — like deciding who wins from a given position in a generalized n×n version of a board game — are PSPACE-complete: you can explore the full game tree using only polynomial space (by reusing memory as you backtrack), even though the tree itself has exponentially many nodes you'd have to visit in the worst case. **EXPTIME** is the class of problems solvable in time that grows exponentially with input size (like O(2^n)), with no restriction on space. The accepted containment chain across all of these classes is:

**P ⊆ NP ⊆ PSPACE ⊆ EXPTIME**

Each class is known to contain the one before it. What is *not* known is whether any of these containments is strict everywhere — in particular, whether P = NP is one of the most important open problems in all of mathematics and computer science, with a $1,000,000 Clay Millennium Prize still unclaimed for resolving it either way.

## Why the Containment Chain Matters: The Cost of Exponential Growth

The reason this whole hierarchy matters in practice is that polynomial and exponential growth are not just "different speeds" — they're different *orders of reality* once n gets large. Take n = 100 (a genuinely small input by real-world standards):

| Growth rate | Value at n = 100 |
|---|---|
| O(n) | 100 |
| O(n²) | 10,000 |
| O(2^n) | 1,267,650,600,228,229,401,496,703,205,376 (≈ 1.27 × 10³⁰) |

An O(n) or O(n²) algorithm on 100 items finishes instantly on any modern computer. An O(2^n) algorithm on just 100 items would require more operations than there are atoms in a small planet — it is not "slow," it is *uncomputable in the lifetime of the universe* at that input size. This is the baseline every later claim about quantum computing in this course has to be measured against: a quantum speedup is only meaningful if it changes which side of this wall a problem falls on, or at minimum meaningfully narrows the gap. Keep this table in mind — Lesson 2 asks exactly how far quantum computers actually move that needle.

## Key terms

| Term | Meaning |
|---|---|
| P | Decision problems solvable in polynomial time on a classical deterministic computer |
| NP | Decision problems whose YES-instances have a certificate verifiable in polynomial time |
| NP-complete | The hardest problems in NP; every NP problem reduces to them in polynomial time (e.g. SAT, TSP-decision) |
| PSPACE | Problems solvable using polynomial memory, regardless of time taken |
| EXPTIME | Problems solvable in exponential time, with no restriction on memory |
| Polynomial-time reduction | A polynomial-time transformation of one problem into another, used to compare problem difficulty |

## Check yourself

The Subset-Sum problem ("does some subset of these n numbers sum to exactly k?") is in NP. Explain, in your own words, why this does *not* mean it can be solved quickly — and what it *does* tell you about checking a proposed answer.
