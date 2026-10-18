# Portfolio Optimization as a QUBO Problem

This is the lesson where Chapter 1's abstract QUBO machinery meets an actual finance problem. Choosing which assets to hold under a budget constraint is, underneath the finance vocabulary, exactly the same mathematical object as the Max-Cut problems you've already solved — just with risk-correlation terms where graph edges used to be.

## What you'll learn

- How to express "pick a subset of assets under a budget" as a QUBO objective
- How risk aversion and covariance between assets enter the quadratic term
- How the budget constraint folds in as a penalty term, exactly as in Lesson 2
- A fully worked 3-asset example with real numeric evaluation of every candidate
- Why this QUBO is what gets fed into QAOA (Chapter 2) for a real portfolio problem

## The problem setup

Given N candidate assets, each with an expected return r_i and a covariance matrix Σ describing how their returns move together (Σ_ii is asset i's own variance; Σ_ij for i≠j is the covariance between assets i and j), and a risk-aversion parameter q, the classic **mean-variance portfolio selection** objective (a simplified, binary version of the Markowitz model) is to choose a binary vector x = (x_1,...,x_N), x_i ∈ {0,1}, selecting exactly B of the N assets, to minimize:

**F(x) = q·x^T Σ x − r^T x**

The term x^T Σ x is the portfolio's total risk (variance), scaled up by q (larger q means you care more about avoiding risk relative to chasing return); the term r^T x is the portfolio's total expected return, subtracted because the objective is being minimized (so subtracting it is equivalent to rewarding higher return). This is a QUBO exactly in the Lesson 2 sense: q·x^T Σ x contributes the quadratic terms (asset-pair covariances), and −r^T x contributes the linear terms (individual expected returns) — both baked directly into a single Q matrix.

## Folding in the budget constraint

"Select exactly B assets" becomes a penalty term exactly as in Lesson 2:

**F(x) = q·x^T Σ x − r^T x + P·(Σx_i − B)²**

with P chosen large enough that violating the budget always costs more than any possible gain elsewhere in the objective.

## A fully worked 3-asset example

Take 3 candidate assets with expected annual returns **r = [0.10, 0.07, 0.05]** (10%, 7%, 5%) and covariance matrix:

Σ =
```
[ 0.04  0.01  0.02 ]
[ 0.01  0.03  0.015]
[ 0.02  0.015 0.05 ]
```

(Asset 1 has the highest individual risk at 0.04 variance, but also the highest return; asset 3 has the highest risk-return tradeoff in the other direction.) Use risk aversion q = 0.5, penalty strength P = 1, and budget B = 2 (select exactly 2 of the 3 assets). Evaluate F(x) at every candidate satisfying and violating the budget (computed directly, term by term):

| x = (x1,x2,x3) | Risk term (q·xᵗΣx) | Return term (−r·x) | Penalty | **Total F(x)** |
|---|---|---|---|---|
| (1,1,0) | 0.045 | -0.170 | 0 | **-0.125** |
| (1,0,1) | 0.065 | -0.150 | 0 | -0.085 |
| (0,1,1) | 0.055 | -0.120 | 0 | -0.065 |
| (1,1,1) | 0.105 | -0.220 | 1.000 | 0.885 |
| (0,0,0) | 0.000 | 0.000 | 4.000 | 4.000 |

All five values were computed directly from the formula, not estimated. The lowest (best, since minimizing) total is **F = -0.125, achieved by x = (1,1,0)** — select assets 1 and 2, skip asset 3. This makes intuitive financial sense: assets 1 and 2 have the two highest expected returns (0.10 and 0.07), and while asset 1 carries the most individual risk, the combined risk-adjusted return of holding both still beats every other budget-respecting combination. Notice also how decisively the penalty term does its job: (1,1,1) and (0,0,0) both violate the budget of 2, and their penalty contributions (1.0 and 4.0 respectively) swamp whatever risk/return numbers they'd otherwise have — exactly the "always costs more to violate" behavior Lesson 2 described.

## From this QUBO to a real quantum circuit

Converting this F(x) into its Ising form (Lesson 3's substitution) and then into Pauli-Z terms (Lesson 7) produces exactly the cost Hamiltonian a QAOA circuit would be built around for this problem — the asset-pair covariance terms become two-qubit Z_iZ_j interactions, and the return/penalty-linear terms become single-qubit Z_i terms, no different in kind from the Max-Cut Hamiltonians you've already simulated directly in Chapter 2. The honest caveat, developed fully in Lesson 18: real portfolios have tens, hundreds, or thousands of assets, and translating that scale onto today's quantum hardware runs immediately into the same qubit-count and noise limitations discussed throughout this course — this 3-asset example is a faithful *formulation* exercise, not a demonstration that quantum hardware currently handles realistic portfolio sizes better than classical solvers.

## Key terms

| Term | Meaning |
|---|---|
| Mean-variance objective | F(x) = q·xᵗΣx − rᵗx; balances portfolio risk (variance) against expected return |
| Covariance matrix (Σ) | Describes how asset returns move together; Σ_ii is variance, Σ_ij is covariance between assets i and j |
| Risk aversion (q) | A scalar weighting how strongly risk is penalized relative to return in the objective |
| Budget constraint | "Select exactly B assets," folded in via the penalty term P·(Σx_i − B)² |
| Binary portfolio QUBO | The specific QUBO formed by combining the mean-variance objective and budget penalty into one x^T Q x expression |

## Check yourself

Using the same r and Σ from this lesson, suppose the risk-aversion parameter were raised to q = 3 instead of 0.5 (a much more risk-averse investor). Recompute the risk term (3·xᵗΣx) for x = (1,1,0) and x = (0,1,1), and determine whether the previously-best choice (1,1,0) is still favored, or whether the much higher risk penalty now favors a different pair of assets.
