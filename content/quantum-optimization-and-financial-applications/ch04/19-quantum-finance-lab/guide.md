# Quantum Finance Lab

Time to formulate and solve a new portfolio QUBO yourself — one with a twist that should make you second-guess any "just pick the highest-return assets" intuition. This lab closes Chapter 4 by putting the full formulate-then-solve pipeline from Lesson 15 to work on a problem large enough (4 assets, 16 combinations) that brute-force checking every option actually teaches you something non-obvious.

## What you'll learn

- How to build and brute-force solve a 4-asset portfolio QUBO
- Why the "obvious" choice (highest individual returns) can lose to a less obvious, lower-risk combination
- How to read a full brute-force results table and verify a claimed optimum
- The direct link between this lab's result and why QAOA-style exploration (Chapter 2) is valuable even for small instances
- A closing checklist connecting every piece of this chapter back to Chapter 1's QUBO foundation

## The lab problem

Four candidate assets with expected annual returns **r = [0.12, 0.09, 0.06, 0.04]** (asset 1 is the highest-return, asset 4 the lowest) and covariance matrix:

Σ =
```
[ 0.05   0.02   0.01   0.00 ]
[ 0.02   0.04   0.015  0.01 ]
[ 0.01   0.015  0.03   0.02 ]
[ 0.00   0.01   0.02   0.025]
```

Notice asset 4 has both the lowest return *and* the lowest covariance with every other asset (especially with asset 1: Σ_14 = 0.00, meaning assets 1 and 4 are uncorrelated). Use risk aversion q = 1.0, penalty strength P = 2.0, and budget B = 2 (select exactly 2 of the 4 assets).

## Step 1: Naive intuition

If you only looked at expected returns, you'd pick the two highest: asset 1 (0.12) and asset 2 (0.09), giving x = (1,1,0,0). That seems like the obvious answer.

## Step 2: Brute-force the full objective

Evaluating F(x) = q·xᵗΣx − rᵗx + P·(Σx_i−2)² at every one of the 6 budget-satisfying combinations (computed directly, term by term):

| x = (x1,x2,x3,x4) | Risk term | Return term | Total F(x) |
|---|---|---|---|
| (1,1,0,0) | 0.1300 | -0.2100 | **-0.0800** |
| (1,0,1,0) | 0.1000 | -0.1800 | -0.0800 |
| (0,1,1,0) | 0.1000 | -0.1500 | -0.0500 |
| (1,0,0,1) | 0.0750 | -0.1600 | **-0.0850** |
| (0,1,0,1) | 0.0850 | -0.1300 | -0.0450 |
| (0,0,1,1) | 0.0950 | -0.1000 | -0.0050 |

The true optimum is **x = (1,0,0,1), with F(x) = -0.0850** — assets 1 and 4, *not* the naive "top two returns" pick of (1,1,0,0), which only manages -0.0800. Despite asset 4 having the lowest individual return of the group, pairing it with asset 1 produces a lower-risk combination (risk term 0.075, versus 0.130 for the naive pick) precisely because assets 1 and 4 have zero covariance (Σ_14 = 0.00) — they move independently of each other, which the risk-aversion term rewards heavily enough to overcome asset 4's weaker individual return. The naive pick (1,1,0,0) actually ties for second place with (1,0,1,0), both at -0.0800, a real but smaller shortfall than it might first appear — still, it is not the optimum, and brute-force confirmation (checking every one of the 16 total combinations, not just the 6 shown) verifies -0.0850 is in fact the global best.

## Step 3: Why this matters for quantum optimization

This is exactly the kind of result that makes QUBO-based optimization valuable in the first place: a portfolio manager's intuition ("pick high-return assets") is a reasonable heuristic but not a reliable optimizer once genuine risk correlations are accounted for, and the correct answer can be counterintuitive even at a small scale like this 4-asset, 16-combination example. At real portfolio scale (hundreds of assets, millions or billions of combinations), brute-force checking every option stops being possible entirely — which is precisely why this exact objective function, converted to its Ising form (Lesson 3) and Pauli-Z cost Hamiltonian (Lesson 7), is the kind of problem QAOA (Chapter 2) is built to search over heuristically instead.

## Closing checklist: the whole course's pipeline, in one lab

This lab is a good moment to check that the full pipeline from Chapter 1 onward actually connects end to end for you: (1) a real-world problem (portfolio selection) becomes (2) a QUBO objective with linear and quadratic terms (this lesson), which becomes (3) an Ising Hamiltonian via the s=1-2x substitution (Lesson 3), which becomes (4) a Pauli-Z cost Hamiltonian (Lesson 7) that a QAOA circuit (Lesson 6) can be built around and optimized (Lesson 8) to some achievable approximation ratio (Lesson 9) — all while classical brute force or heuristic search (as used here, and formalized further in Chapter 5) remains the honest benchmark every quantum result needs to be checked against.

## Key terms

| Term | Meaning |
|---|---|
| Naive return-maximizing pick | Selecting assets purely by highest individual expected return, ignoring risk correlations — often suboptimal once covariance is accounted for |
| Zero covariance pair | Two assets whose returns move independently (Σ_ij = 0); pairing them can sharply reduce combined portfolio risk |
| Brute-force verification | Checking every one of the 2^n possible assignments directly to confirm a claimed optimum, feasible here with n=4 (16 combinations) |
| End-to-end QUBO pipeline | The full chain: real problem → QUBO → Ising Hamiltonian → Pauli cost Hamiltonian → QAOA circuit → classical-optimized result |

## Check yourself

Suppose the risk aversion parameter were lowered to q = 0.1 (a much less risk-averse investor) instead of 1.0. Recompute the risk terms for x=(1,1,0,0) and x=(1,0,0,1) at this lower q (risk term scales linearly with q, so just rescale the xᵗΣx values given), and determine whether the naive highest-return pick (1,1,0,0) now wins instead — explaining, in terms of risk aversion, why the optimal choice can flip depending on q.
