# BQP & Quantum Complexity

Quantum computers get their own complexity class, and understanding exactly what it does and doesn't contain is the difference between a realistic view of quantum computing and science-fiction hype.

## What you'll learn

- The precise definition of BQP, including why "bounded-error" and "amplifiable" are load-bearing words
- How running a quantum algorithm multiple times turns a so-so success probability into a near-certainty
- The proven containments: P ⊆ BQP, BPP ⊆ BQP, BQP ⊆ PSPACE, BQP ⊆ PP
- Where factoring (Shor's problem) actually sits in this picture, stated carefully
- Why BQP is not believed to contain NP-complete problems, and what that implies about quantum computers

## Defining BQP

**BQP** stands for **Bounded-error Quantum Polynomial time**. A decision problem is in BQP if there exists a quantum computer that, for every input, runs in a number of steps that's polynomial in the input size, and outputs the correct YES/NO answer with probability at least 2/3 (equivalently: with error probability at most 1/3). Two words in that definition are doing all the work. "Bounded-error" means the algorithm doesn't have to be perfectly correct every single run — it just has to be correct noticeably more often than a coin flip, specifically at least 2/3 of the time. "Polynomial" means the quantum circuit's size (its number of gates) grows only polynomially with the input size, the same tractability bar used for classical P.

## Why a 2/3 Success Rate Is Actually Enough: Error Amplification

A 1-in-3 chance of being wrong sounds too unreliable to build anything on — but it isn't, because of **error amplification**. If you run the same BQP algorithm k independent times and take the majority answer, the probability that the majority is wrong shrinks *exponentially* in k, not linearly. This is a standard result from probability theory (the same reasoning used for randomized classical algorithms in BPP): independent trials with a fixed per-trial error below 1/2 push the combined error toward zero at an exponential rate as you add more trials. So "bounded-error" at 2/3 isn't a weak guarantee — it means you can drive the error down to, say, one in a billion, just by running the algorithm a modest number of extra times and voting. This is why the specific constant (2/3, or 0.51, or any fixed value above 1/2) doesn't matter for the definition of BQP: any such constant can be amplified to any other.

## The Known Containments

Several relationships between BQP and classical complexity classes are proven:

- **P ⊆ BQP** — anything a classical deterministic computer can do in polynomial time, a quantum computer can also do in polynomial time (a quantum computer can always simulate a classical deterministic circuit).
- **BPP ⊆ BQP** — anything solvable in polynomial time with bounded-error *classical randomness* (BPP, "bounded-error probabilistic polynomial time") is also in BQP, for the same reason.
- **BQP ⊆ PSPACE** — any BQP computation can be simulated using only polynomial memory classically, though possibly taking exponential time to do so.
- **BQP ⊆ PP** — BQP sits inside PP ("probabilistic polynomial time," a classical class with a much looser, non-amplifiable error bound), a containment proven by Adleman, DeMarrais, and Huang in 1997.

Put together: **P ⊆ BPP ⊆ BQP ⊆ PSPACE**, with BQP also known to sit inside PP. Quantum computers are therefore strictly at least as powerful as classical deterministic and randomized computers (for anything classical computers can do efficiently, quantum computers can too), and not more powerful than PSPACE.

## Where This Gets Genuinely Open: BQP vs NP

Here is the honest, careful statement of what is *not* known: whether BQP ⊆ NP, whether NP ⊆ BQP, or whether the two classes are simply incomparable, is an open question. Integer factorization — the problem Shor's algorithm solves — is known to be in BQP (Shor's algorithm runs in polynomial time on a quantum computer) and is also known to be in **NP ∩ co-NP** (you can verify a factorization quickly, and you can also verify a number is prime quickly, which is a certificate for the "no nontrivial factors" answer). Factoring is *believed*, but not proven, to be outside P classically — that belief is the entire basis of RSA encryption's security, not a mathematical certainty. So factoring is a carefully-chosen example precisely because it sits in the overlap: in BQP, in NP ∩ co-NP, and conjectured (not proven) to be outside classical P. It is not evidence that BQP contains all of NP.

## Why Quantum Computers Are Not Believed to Solve All of NP

This is the single most important corrective in this lesson: **BQP is not believed to contain NP-complete problems.** Grover's algorithm (covered in full in Chapter 4) gives a quadratic speedup on unstructured search — O(√N) instead of O(N) — and that quadratic speedup is the *best known* general-purpose quantum technique applicable to NP-complete problems treated as brute-force search. A quadratic speedup on an exponential search space is still exponential: even with Grover's help, brute-forcing an NP-complete problem's search space on a quantum computer still takes time exponential in the input size, just with a smaller exponent. No known quantum algorithm gives an *exponential* speedup on NP-complete problems the way Shor's algorithm does on factoring. This is exactly why "quantum computers will solve everything instantly" is a myth: the structure that lets Shor's algorithm achieve exponential speedup (the hidden periodicity in modular exponentiation, extracted via the quantum Fourier transform) simply isn't present in NP-complete problems like SAT or the Traveling Salesman Problem, and nobody has found an equivalent structure to exploit there.

## Key terms

| Term | Meaning |
|---|---|
| BQP | Bounded-error Quantum Polynomial time: problems solvable by a polynomial-time quantum algorithm with error probability ≤ 1/3 |
| Error amplification | Running an algorithm multiple times and taking a majority vote to exponentially shrink the probability of a wrong answer |
| BPP | Bounded-error Probabilistic Polynomial time, the classical analog of BQP using random bits instead of quantum effects |
| NP ∩ co-NP | Problems where both YES and NO answers have polynomial-time-verifiable certificates; factoring lives here |
| Quadratic vs. exponential speedup | Grover's O(√N) vs. O(N) is quadratic; Shor's polynomial-time factoring vs. the best classical sub-exponential algorithm is a much larger, structure-dependent speedup |

## Check yourself

Factoring is in BQP, and also in NP ∩ co-NP. Explain why this fact does *not* imply that BQP contains NP-complete problems like SAT — what would have to be true about BQP for that implication to hold, and why is factoring a poor example for proving it?
