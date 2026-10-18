# Capstone: Compare Against a Classical Baseline

Lesson 25 left you with a QAOA circuit that concentrated most of its probability on a *near*-optimal answer rather than the true optimum. This lesson runs the real classical competition — a simple, well-known heuristic — on the exact same problem, and applies Lesson 21's fairness checklist to the result honestly.

## What you'll learn

- How the Longest Processing Time (LPT) heuristic works, and why it's a legitimate classical baseline
- A directly-run LPT result on the capstone's Number Partitioning problem
- A side-by-side comparison applying every one of Lesson 21's fairness checks
- Why "classical won this round" is a valid, useful capstone finding, not a disappointing one
- How to present a result like this honestly in your own capstone writeup

## The classical baseline: LPT

**Longest Processing Time first (LPT)** is a simple, well-studied classical heuristic for Number Partitioning (and the related bin-packing and scheduling problems): sort all items in decreasing order, then assign each one, in that order, to whichever group currently has the smaller total. It has none of QAOA's machinery — no quantum circuit, no continuous parameters to search over, no probability distribution to sample from. It runs in a single deterministic pass.

## Running LPT on the capstone problem

Using the same task durations d = [3,5,2,4] from Lesson 24, sorted in decreasing order: **5, 4, 3, 2** (tasks 2, 4, 1, 3 respectively). Assigning greedily:

- Task with duration 5 (task 2): both groups empty, assign to A. A = 5, B = 0.
- Task with duration 4 (task 4): B is smaller (0 < 5), assign to B. A = 5, B = 4.
- Task with duration 3 (task 1): B is smaller (4 < 5), assign to B. A = 5, B = 7.
- Task with duration 2 (task 3): A is smaller (5 < 7), assign to A. A = 7, B = 7.

**Final result: A = 7, B = 7, imbalance² = 0 — the exact true optimum**, found deterministically, in one pass, with zero randomness and zero iterative search.

## The side-by-side comparison

| Method | Result found | True optimum? | Search required |
|---|---|---|---|
| LPT (classical heuristic) | 7-7 split, F=0 | **Yes, exactly** | Single deterministic pass |
| QAOA p=1 (Lesson 25) | Expected cost ≈14.2; true-optimum bitstrings carry only ≈0.95% probability | Not reliably, at these angles | Continuous (γ,β) search, then many measurement shots needed |

## Applying Lesson 21's fairness checklist honestly

**Strongest baseline?** Yes — LPT is a real, widely used classical method for exactly this problem class, not a strawman.

**Metric clearly specified?** Yes, and specifying it carefully matters here: judged by "found the true optimum," LPT wins outright. Judged by "expected cost across repeated runs," the comparison would need many more LPT runs to even be meaningful, since LPT is deterministic (it gives the same answer every time on this instance) — a subtlety worth noting rather than skating past.

**Representative problem size?** This is a 4-variable toy instance, explicitly scoped that way in Lesson 24 for verifiability — this result says nothing about either method's behavior at hundreds of tasks, and claiming otherwise would be exactly Lesson 21's third failure mode.

**Full pipeline accounted for?** LPT required no classical parameter search at all. QAOA's result, even setting aside the honest surprise from Lesson 25, required a (γ,β) search that itself has a real computational cost (Lesson 8) — a cost LPT simply doesn't incur. Any time comparison between the two would need to include that search cost on the QAOA side.

## Why "classical won this round" is the right finding to report

On this specific, small, verifiably-solved instance, the simple classical heuristic found the exact true optimum deterministically, while the quantum approach — even after a real parameter search — concentrated most of its probability on a good-but-not-optimal cluster. This is not a disappointing result to bury; it's precisely the kind of honest, specific finding Chapter 5 built an entire methodology around surfacing. It is also consistent with the chapter's broader claim: current quantum optimization methods have not demonstrated an advantage over strong classical baselines on problems at this scale, and this capstone just gave you a from-scratch, hand-verified example of exactly that pattern, rather than a claim you had to take on faith.

## Key terms

| Term | Meaning |
|---|---|
| LPT (Longest Processing Time) | A deterministic classical heuristic: sort items descending, greedily assign each to the currently smaller-total group |
| Deterministic method | An algorithm that produces the same output every time on the same input, with no randomness involved |
| Honest negative result | A finding where the classical baseline outperforms or matches the quantum method, reported plainly rather than downplayed |

## Check yourself

LPT found the true optimum deterministically on this specific 4-task instance — but is LPT mathematically *guaranteed* to always find the true optimum for every possible Number Partitioning instance, or did it simply succeed on this particular set of numbers? Test it on d = [5, 6, 4, 1, 9, 8] (total = 33): run LPT's sort-and-greedily-assign procedure by hand and find its resulting imbalance, then separately check whether a split into {9,8} (sum 17) and {6,5,4,1} (sum 16) — an imbalance of just 1 — beats what LPT found. What does the outcome tell you about generalizing classical-baseline success from a single test case, and why does this matter for how you'd report your own capstone's classical comparison?
