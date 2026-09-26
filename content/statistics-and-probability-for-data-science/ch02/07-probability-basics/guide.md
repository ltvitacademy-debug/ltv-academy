# Probability Basics

Chapter 1 described data we already have. Chapter 2 flips the direction: **probability** describes what data we should *expect* from a process governed by chance. It is the language behind every later idea in this course, from sampling to hypothesis tests, and behind much of machine learning. This lesson builds the vocabulary and three rules, and uses simulation in numpy to check the math.

## What you'll learn

- Sample space, outcomes, and events
- How to compute a probability by counting equally likely outcomes
- The complement rule and the addition rule
- What the law of large numbers means, and how to see it in a simulation

## Vocabulary

- An **experiment** is any process with an uncertain result: rolling two dice, showing an ad to a visitor, checking whether a customer churns.
- An **outcome** is one possible result. The **sample space** is the set of *all* possible outcomes.
- An **event** is a set of outcomes we care about, such as "the two dice sum to 7."
- The **probability** of an event A, written P(A), is a number from 0 (impossible) to 1 (certain).

When every outcome is equally likely, probability is just counting:

**P(A) = (number of outcomes in A) / (number of outcomes in the sample space)**

The "equally likely" condition matters. Applying this formula to outcomes that are *not* equally likely, such as "it either rains or it doesn't, so 50 percent," is a classic mistake.

## Counting with Python

Roll two fair six-sided dice. The sample space is every ordered pair (first die, second die), so 6 times 6 = 36 equally likely outcomes. We can list them with `itertools`:

```python
import itertools

space = list(itertools.product(range(1, 7), repeat=2))
print(len(space))                          # 36

seven = [o for o in space if sum(o) == 7]
print(len(seven), len(seven) / len(space))  # 6  0.1666...
```

Six outcomes sum to 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). So P(sum = 7) = 6/36, about 0.1667.

## The complement rule

The **complement** of A is "A does not happen." Because something must happen, P(A) + P(not A) = 1, so:

**P(not A) = 1 - P(A)**

This is a huge shortcut for "at least one" questions. What is the chance of *at least one six* in two rolls? Counting directly works, but the complement is easier: the chance of *no* six on a roll is 5/6, and the two rolls are independent (formalized in Lesson 8), so P(no sixes) = (5/6) squared and P(at least one six) = 1 minus that.

```python
one_six = [o for o in space if 6 in o]
print(len(one_six) / 36)      # 0.3056 (11 of 36)
print(1 - (5/6) ** 2)         # 0.3056
```

Both routes give 0.3056.

## The addition rule

For "A or B," add the probabilities but subtract the overlap so you do not count it twice:

**P(A or B) = P(A) + P(B) - P(A and B)**

If A and B can never happen together (they are **mutually exclusive**), the overlap is zero and you just add. Example with one die: A is "even" ({2, 4, 6}) and B is "greater than 4" ({5, 6}). They overlap at 6, so P(A or B) = 3/6 + 2/6 - 1/6 = 4/6, about 0.667, which matches counting the union {2, 4, 5, 6} directly.

## Probability as long-run frequency

What does "0.1667" mean for a single roll? One common interpretation: if you repeated the experiment many times, the *fraction* of times the event occurs would settle near that number. This is the **law of large numbers**. Simulation lets us watch it happen:

```python
import numpy as np
rng = np.random.default_rng(1)
n = 1_000_000
r = rng.integers(1, 7, size=(n, 2)).sum(axis=1)
print((r == 7).mean())
```

Drawing successively larger batches (n = 10, 100, 10,000, then 1,000,000) from one generator seeded with 1, we saw:

```
n = 10          -> 0.2
n = 100         -> 0.17
n = 10,000      -> 0.1651
n = 1,000,000   -> 0.1665
```

The exact answer is 0.1667. Small samples wobble (0.2 is a 20 percent error), and large ones converge. Note the law of large numbers is about *long-run fractions*, not a promise that a short streak "must balance out." After five losses in a row, the coin is still 50/50 on the next flip.

Simulation is a powerful check throughout this course: when a formula is confusing, simulate the process and compare.

## Probability from data

You can also *estimate* probabilities from data. If 12 percent of past customers churned, `df["churned"].mean()` on a 0/1 column estimates P(churn) for a new, similar customer. That estimate is itself a sample statistic with uncertainty, exactly the theme of Lesson 1.

## Recap

Probability lives between 0 and 1. With equally likely outcomes, count favorable over total. Use 1 minus P(A) for complements, add and subtract the overlap for "or," and remember that probability describes long-run frequency. Next, we ask how probabilities change when we know something has already happened: conditional probability and independence.
