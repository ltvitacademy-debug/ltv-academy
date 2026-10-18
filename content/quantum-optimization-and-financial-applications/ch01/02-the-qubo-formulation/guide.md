# The QUBO Formulation

QUBO is the single mathematical mold that almost every quantum optimization algorithm in this course is built to pour into. If you can write your problem in this form, QAOA, quantum annealers, and even many classical heuristics all have something concrete to run on.

## What you'll learn

- The precise definition of a Quadratic Unconstrained Binary Optimization (QUBO) problem
- How to read and evaluate the matrix form x^T Q x by hand
- Why binary variables (x_i ∈ {0,1}) make x_i^2 = x_i, which is what keeps everything "quadratic" instead of higher-order
- How constraints get folded into an "unconstrained" QUBO using penalty terms
- A fully worked, hand-verified numeric example

## The definition

A QUBO problem asks you to find the binary vector x = (x_1, x_2, ..., x_n), with each x_i ∈ {0, 1}, that minimizes:

**f(x) = x^T Q x**

where Q is an n×n matrix of real coefficients. Written out, with Q taken as upper-triangular (the common convention — diagonal terms are linear, off-diagonal terms are the quadratic interactions):

f(x) = Σ_i Q_ii x_i + Σ_{i<j} Q_ij x_i x_j

"Quadratic" means the cost function involves terms up to degree 2 in the variables (the x_i x_j cross terms). "Unconstrained" means the optimization itself has no explicit constraints baked into the search — any of the 2^n binary strings is a legal candidate. (Real constraints like "pick exactly 2" still show up, just folded in as penalty terms — more on that below, and you'll build real constrained examples in Lesson 15.) "Binary" means each variable is 0 or 1, not continuous.

## Why binary variables keep it quadratic

Suppose you tried to express the same kind of cost function using variables that could be 0, 1, 2, 3, ... (not binary). You'd likely need higher powers (x_i^3, x_i^4) to capture real cost structures, and the whole machine for mapping problems to quantum hardware would get much harder. The reason QUBO stays "quadratic" and tractable is a small but crucial fact: for binary x_i, x_i^2 = x_i (since 0^2 = 0 and 1^2 = 1). That means any diagonal term Q_ii x_i^2 collapses to a plain linear term Q_ii x_i, and the only genuinely "interaction" terms are the cross terms x_i x_j for i ≠ j. This is why QUBOs map so cleanly onto quantum hardware that natively implements two-body interactions (pairs of qubits) — you never need three-way or higher interaction terms.

## A fully worked example

Take n = 2 variables and the upper-triangular matrix:

Q = [ [-5, 2], [0, -3] ]

So f(x1, x2) = -5·x1 + 2·x1·x2 - 3·x2 (the diagonal entries -5 and -3 become linear terms, the off-diagonal entry 2 becomes the x1·x2 cross term).

Evaluate f at all four possible binary assignments:

| x1 | x2 | f(x1, x2) |
|---|---|---|
| 0 | 0 | -5(0) + 2(0)(0) - 3(0) = **0** |
| 0 | 1 | -5(0) + 2(0)(1) - 3(1) = **-3** |
| 1 | 0 | -5(1) + 2(1)(0) - 3(0) = **-5** |
| 1 | 1 | -5(1) + 2(1)(1) - 3(1) = -5 + 2 - 3 = **-6** |

These four values were checked by direct substitution (confirmed computationally, not estimated). The minimum is f = -6 at x = (1, 1) — meaning "select both variables" is the lowest-cost choice for this particular Q. In a real application, Q_11 = -5 and Q_22 = -3 might represent individual rewards for selecting items 1 and 2, and Q_12 = +2 a *penalty* for selecting both together — except here the penalty (+2) isn't large enough to outweigh the combined individual rewards (-5 and -3), so selecting both still wins. That trade-off between individual term strength and interaction strength is exactly what a QUBO solver is searching over.

## Folding constraints into an "unconstrained" problem

Real problems have constraints: "pick exactly 2 of 5 assets," "each delivery stop visited exactly once." QUBO has no native syntax for constraints, so you add a **penalty term** to the objective that becomes large whenever a constraint is violated and zero when it's satisfied. The classic pattern for an equality constraint Σx_i = B (pick exactly B items) is:

penalty = P · (Σ_i x_i - B)^2

where P is a penalty strength chosen large enough that violating the constraint always costs more than any benefit gained from a "better" objective value. Because (Σx_i - B)^2 is zero exactly when the constraint holds and strictly positive otherwise, adding P times this term to f(x) steers the minimizer toward constraint-satisfying solutions without ever writing an explicit "subject to" clause. You'll build this exact pattern for a real portfolio-selection budget constraint in Lesson 15, and practice it directly in this chapter's lab (Lesson 5).

## Key terms

| Term | Meaning |
|---|---|
| QUBO | Quadratic Unconstrained Binary Optimization — minimize x^T Q x over binary vectors x |
| Q matrix | The matrix of coefficients defining a QUBO's linear (diagonal) and quadratic (off-diagonal) terms |
| Penalty term | An added term, like P(Σx_i - B)^2, that makes constraint-violating solutions costlier so an "unconstrained" QUBO still respects real constraints |
| Penalty strength (P) | The scalar multiplier on a penalty term, chosen large enough to dominate the objective whenever a constraint is broken |
| Upper-triangular Q | The convention where diagonal entries are linear coefficients and off-diagonal entries (only i<j) hold the quadratic interaction coefficients |

## Check yourself

Using Q = [[-5, 2], [0, -3]] from the worked example, suppose you instead needed exactly one of x1, x2 to be selected (not both, not neither). Write the penalty term P(x1 + x2 - 1)^2 and evaluate the full objective f(x) + penalty at all four binary assignments for P = 10. Which assignment now wins, and why does it differ from the unconstrained result?
