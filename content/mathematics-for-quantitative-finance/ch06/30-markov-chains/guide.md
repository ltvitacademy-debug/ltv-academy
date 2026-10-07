# Markov Chains

The random walk in Lesson 29 had a property worth naming precisely: its next step depends only on where it is now, not on the path it took to get there. A **Markov chain** generalizes that idea beyond simple additive steps to any finite set of states with arbitrary transition probabilities between them — the standard tool for modeling credit-rating migration, default risk, and regime switching in markets.

## What you'll learn

- The Markov property and the transition matrix that encodes it
- How to compute n-step transition probabilities by taking matrix powers
- The stationary distribution and how to find it as an eigenvector problem
- A worked example modeling corporate credit-rating transitions, including an absorbing default state

## The Markov property

A discrete-time process X_0, X_1, X_2, ... taking values in a finite set of states {1, ..., k} has the **Markov property** if:

P(X_{n+1} = j | X_n = i, X_{n-1}, ..., X_0) = P(X_{n+1} = j | X_n = i)

In words: the future depends on the past only through the present state, not on the full history. All the information relevant to predicting tomorrow is already contained in today's state. The random walk in Lesson 29 satisfies this trivially (the next value only depends on the current value plus an independent new step), but a Markov chain allows the transition probabilities to depend on the current state in any way, not just by adding an i.i.d. increment.

## The transition matrix

A **time-homogeneous** Markov chain is fully specified by a **transition matrix** P, where P_{ij} = P(X_{n+1}=j | X_n=i). Each row of P sums to 1 (from state i, the process must go somewhere, including possibly staying at i). The probability of being in state j after n steps, starting from state i, is given by the (i,j) entry of the **matrix power** Pⁿ — this follows directly from the Markov property via the Chapman-Kolmogorov equation, which says P^{m+n} = Pᵃ · Pⁿ.

## The stationary distribution

A probability row-vector π is a **stationary distribution** if πP = π — once the chain's state distribution reaches π, it stays at π forever. Equivalently, πᵀ is a left eigenvector of P with eigenvalue 1 (normalized so its entries sum to 1 and are non-negative). For many well-behaved chains (irreducible and aperiodic), the distribution of X_n converges to this unique π as n → ∞, regardless of the starting state — the long-run "typical" distribution across states.

## Worked example: credit-rating transitions

Model four states — AAA, BBB, CCC, and Default (D), where D is an **absorbing state** (once a firm defaults, it stays defaulted: P_{DD} = 1, and that row has no other nonzero entries):

```python
import numpy as np

states = ["AAA", "BBB", "CCC", "D"]
P = np.array([
    [0.90, 0.08, 0.015, 0.005],   # from AAA
    [0.03, 0.85, 0.10,  0.02 ],   # from BBB
    [0.00, 0.10, 0.70,  0.20 ],   # from CCC
    [0.00, 0.00, 0.00,  1.00 ],   # from D (absorbing)
])
assert np.allclose(P.sum(axis=1), 1.0)   # every row is a valid distribution

# Probability of each rating after 5 years, starting from BBB
P5 = np.linalg.matrix_power(P, 5)
start = np.array([0, 1, 0, 0])            # starts in BBB
dist_year5 = start @ P5
print(dict(zip(states, dist_year5.round(4))))

# Cumulative probability of default by year 10, starting from AAA
P10 = np.linalg.matrix_power(P, 10)
print("P(default by year 10 | AAA):", P10[0, 3].round(4))
```

Because D is absorbing, the probability of eventually ending in default approaches 1 as n → ∞ for every starting state here (there's no other truly absorbing state to compete with it) — a stationary distribution in the classical sense doesn't exist for the non-default states; instead, mass drains steadily into D. This is the right qualitative behavior for a credit model: absent a stationary distribution among the "alive" ratings, every obligor eventually defaults in the limit, which is why real credit risk models track finite-horizon probabilities (year 1, year 5, year 10 default probabilities), exactly as computed above, rather than a long-run stationary mix.

```python
# For a chain WITHOUT an absorbing state, the stationary distribution
# solves pi @ P = pi via the eigenvector for eigenvalue 1:
# eigvals, eigvecs = np.linalg.eig(P.T)
# pi = eigvecs[:, np.isclose(eigvals, 1)].real.flatten()
# pi = pi / pi.sum()
```

## Key terms

| Term | Meaning |
|---|---|
| Markov property | The future depends on the past only through the present state |
| Transition matrix (P) | P_{ij} = probability of moving from state i to state j in one step |
| n-step transition | Given by the matrix power Pⁿ |
| Stationary distribution | π with πP = π; the long-run state distribution for well-behaved chains |
| Absorbing state | A state the process can enter but never leave (P_{ii}=1) |

## Recap

A Markov chain generalizes the random walk's "no memory beyond the present" property to any finite set of states and transition probabilities, with n-step transitions given by matrix powers and long-run behavior given by the stationary distribution (or, with an absorbing state like default, by eventual absorption). Next, Lesson 31 takes the random walk to its continuous-time limit: Brownian motion.
