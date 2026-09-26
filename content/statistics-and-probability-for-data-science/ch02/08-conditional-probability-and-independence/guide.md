# Conditional Probability & Independence

Probabilities are not fixed facts about the world; they depend on what you already know. The chance a random customer churns is one number. The chance a customer on the *free plan* churns may be a very different number. **Conditional probability** is the tool for updating a probability given information, and **independence** is the special case where the information changes nothing. Both are everywhere in data science: every classifier, from logistic regression to a random forest, is estimating a conditional probability.

## What you'll learn

- What P(A given B) means and how to compute it from a table
- The multiplication rule
- What independence means and how to check it with data
- Common traps: reversing the condition, and confusing "independent" with "mutually exclusive"

## A small illustrative table

Suppose 1,000 customers (illustrative numbers, not real data) are split evenly between a free and a paid plan, and we record whether each churned:

```python
import pandas as pd

df = pd.DataFrame({
  "plan":    ["Free"]*500 + ["Paid"]*500,
  "churned": [1]*150 + [0]*350 + [1]*50 + [0]*450})
print(pd.crosstab(df.plan, df.churned, margins=True))
```

```
churned    0    1   All
Free     350  150   500
Paid     450   50   500
All      800  200  1000
```

The overall churn probability is 200 out of 1,000, so P(churn) = 0.2, which is `df["churned"].mean()`. But look inside each plan:

```python
print(df.groupby("plan")["churned"].mean())
# Free    0.3
# Paid    0.1
```

Among free customers, 150 of 500 churned, so **P(churn given Free) = 0.3**. Among paid customers it is 0.1. Knowing the plan changed the probability from 0.2 to 0.3 or 0.1.

## The definition

The conditional probability of A given B, written P(A | B), is:

**P(A | B) = P(A and B) / P(B)**

In words: restrict attention to the cases where B happened, then ask what fraction of those also had A. Check with the table: P(Free and churn) = 150/1000 = 0.15 and P(Free) = 0.5, so P(churn | Free) = 0.15 / 0.5 = 0.3. It matches. In pandas terms, conditioning is just **filtering** and then taking a mean, something you already do with `groupby`.

## The multiplication rule

Rearranging the definition gives the **multiplication rule**:

**P(A and B) = P(B) x P(A | B)**

This is how we compute "both happen." Without replacement, if you draw two cards from a 52-card deck, the probability both are aces is 4/52 x 3/51, about 0.004525. The second factor is *conditional*: once one ace is gone, only 3 of the remaining 51 cards are aces. Using (4/52) squared, about 0.0059, would be wrong because it ignores that the first draw changed the deck.

## Independence

Events A and B are **independent** if knowing one tells you nothing about the other: P(A | B) = P(A). Equivalently, the multiplication rule simplifies to:

**P(A and B) = P(A) x P(B)**

Our plan and churn are clearly *not* independent: P(churn | Free) = 0.3 is not P(churn) = 0.2. Two dice, on the other hand, should be independent. Let us check by simulation with a million rolls of two dice (A: first die is 6; B: second die is 4 or more):

```python
import numpy as np
rng = np.random.default_rng(3)
d = rng.integers(1, 7, size=(1_000_000, 2))
A = d[:, 0] == 6
B = d[:, 1] >= 4
print(A.mean(), B.mean())      # 0.1665  0.5003
print((A & B).mean())          # 0.0831
print(A.mean() * B.mean())     # 0.0833
```

P(A and B) matches P(A) x P(B) to within simulation noise, the signature of independence. With real data, the numbers will never match *exactly*, so a formal test is needed (Chapter 5 covers this).

## Traps to avoid

1. **Reversing the condition.** P(A | B) is not P(B | A). In our table, P(churn | Free) = 0.3, but P(Free | churn) = 150/200 = 0.75. Different questions, different answers. The next lesson, Bayes' theorem, shows how to convert between them.
2. **Independent is not the same as mutually exclusive.** Mutually exclusive events cannot both happen; if you know one occurred, the other is impossible, so they are *dependent*, not independent.
3. **Assuming independence because it is convenient.** Many models assume independent observations, but customers in the same household, sessions from the same user, and measurements over time are often correlated. Assuming independence when it is false can make results look more certain than they are.

## Recap

Conditional probability restricts the world to cases where B happened: P(A | B) = P(A and B) / P(B). The multiplication rule chains conditionals, and independence is the special case where conditioning changes nothing. Next: Bayes' theorem, which flips a conditional probability around.
