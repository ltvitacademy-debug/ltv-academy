# Combinatorics & Counting

Lessons 35 and 36 both leaned informally on "count the ways this can happen" — enumerating the Monty Hall sample space, summing geometric waiting times. This lesson makes that counting systematic: permutations and combinations, the birthday problem (a counting argument dressed up as a probability puzzle), poker-hand probabilities, and the "stars and bars" technique for counting ways to split a quantity into parts. These are the exact tools quant interviews use to test whether you can turn "how many ways" into a clean formula under time pressure.

## What you'll learn

- Permutations vs. combinations, and when each applies
- The birthday problem: why 23 people is already enough for a 50/50 shared-birthday chance
- Counting poker hands exactly, including the famous "full house is rarer than a flush" result
- Stars and bars: counting ways to split $n$ identical items among $k$ categories

## Permutations and combinations

A **permutation** counts *ordered* arrangements; a **combination** counts *unordered* selections. Choosing $k$ items from $n$ distinct items:

$$P(n,k) = \frac{n!}{(n-k)!} \quad \text{(order matters)}, \qquad \binom{n}{k} = \frac{n!}{k!(n-k)!} \quad \text{(order doesn't matter)}$$

$\binom{n}{k}$ is always $P(n,k)$ divided by $k!$, because each unordered selection of $k$ items corresponds to exactly $k!$ different orderings. This single relationship — "count ordered arrangements, then divide out the orderings you don't care about" — is the engine behind every counting formula in this lesson.

## The birthday problem

In a room of $n$ people (birthdays uniform over 365 days, ignoring leap years), what's the probability at least two share a birthday? It's much easier to compute the complement — the probability **all** $n$ birthdays are distinct — and subtract from 1:

$$P(\text{all distinct}) = \frac{365}{365} \cdot \frac{364}{365} \cdot \frac{363}{365} \cdots \frac{365-n+1}{365}, \qquad P(\text{shared}) = 1 - P(\text{all distinct})$$

Each successive person must avoid all previously claimed birthdays, so the $i$-th term is $(365-i)/365$. This grows unintuitively fast:

```python
def birthday_prob(n, days=365):
    p_distinct = 1.0
    for i in range(n):
        p_distinct *= (days - i) / days
    return 1 - p_distinct

for n in [20, 23, 30, 50, 70]:
    print(f"n={n}: P(shared birthday) = {birthday_prob(n):.4f}")
# n=20: P(shared birthday) = 0.4114
# n=23: P(shared birthday) = 0.5073
# n=30: P(shared birthday) = 0.7063
# n=50: P(shared birthday) = 0.9704
# n=70: P(shared birthday) = 0.9992
```

Only 23 people are needed to cross 50% — far fewer than the naive intuition of "182ish, half of 365" suggests, because the comparison is across all $\binom{23}{2}=253$ *pairs* of people, not 23 individual dates. A quick Monte Carlo confirms it:

```python
import numpy as np

rng = np.random.default_rng(2)
trials = 20_000
bdays = rng.integers(0, 365, size=(trials, 23))
shared = np.array([len(set(row)) < 23 for row in bdays])
print(f"simulated P(shared, n=23): {shared.mean():.4f}")
# simulated P(shared, n=23): 0.5065
```

## Counting poker hands: why a full house beats a flush

A 5-card poker hand is drawn from a 52-card deck, so there are $\binom{52}{5} = 2{,}598{,}960$ equally likely hands. Two classic counting exercises:

**Full house** (three of one rank, two of another): choose the triple's rank ($13$ ways), choose 3 of its 4 suits ($\binom{4}{3}=4$ ways), choose the pair's rank from the remaining 12 ranks ($12$ ways), choose 2 of its 4 suits ($\binom{4}{2}=6$ ways):

$$13 \times \binom{4}{3} \times 12 \times \binom{4}{2} = 13 \times 4 \times 12 \times 6 = 3{,}744$$

**Flush, excluding straight flushes** (5 cards, same suit, not in sequence): choose the suit (4 ways), choose any 5 of its 13 ranks ($\binom{13}{5}$ ways), then subtract the 10 straight-flush rank-sequences per suit:

$$4 \times \binom{13}{5} - 4\times 10 = 4 \times 1287 - 40 = 5{,}108$$

```python
from math import comb

total_hands = comb(52, 5)
full_house = 13 * comb(4, 3) * 12 * comb(4, 2)
flush = 4 * comb(13, 5) - 4 * 10

print(f"P(full house) = {full_house}/{total_hands} = {full_house/total_hands:.6f}")
print(f"P(flush, excl. straight flush) = {flush}/{total_hands} = {flush/total_hands:.6f}")
# P(full house) = 3744/2598960 = 0.001441
# P(flush, excl. straight flush) = 5108/2598960 = 0.001965
```

A full house ($\approx 0.144\%$) is rarer than a flush ($\approx 0.197\%$) — exactly matching poker's standard hand rankings — and the reason is purely combinatorial: fixing two full ranks (triple + pair) is a tighter constraint than fixing one suit and any 5 of its 13 ranks.

## Stars and bars: splitting a quantity into parts

How many ways can you distribute $n$ identical items among $k$ distinct categories (order within a category doesn't matter, categories can get zero)? This is the **stars and bars** formula — think of $n$ stars in a row with $k-1$ "bars" inserted among them to mark the category boundaries:

$$\binom{n+k-1}{k-1}$$

**Worked example.** A trading desk has 10 identical slots of risk budget to allocate across 4 strategies, any allocation (including zero) allowed. The number of distinct allocations is:

$$\binom{10+4-1}{4-1} = \binom{13}{3} = 286$$

```python
n, k = 10, 4
ways = comb(n + k - 1, k - 1)
print(f"ways to split {n} identical units among {k} categories: {ways}")
# ways to split 10 identical units among 4 categories: 286
```

This same formula is the combinatorial backbone of counting non-negative integer solutions to $x_1 + x_2 + \cdots + x_k = n$ — a disguise that shows up constantly in interview counting problems ("how many ways can 10 trades be split across 4 desks," "how many ways can a portfolio's weight be allocated in whole-percent increments across 4 assets").

## Key terms

| Term | Meaning |
|---|---|
| Permutation, $P(n,k)$ | Ordered arrangements of $k$ items from $n$: $n!/(n-k)!$ |
| Combination, $\binom{n}{k}$ | Unordered selections of $k$ items from $n$: $n!/(k!(n-k)!)$ |
| Birthday problem | $n=23$ people already gives over 50% chance of a shared birthday |
| Full house / flush | Counting exercise showing a full house ($\approx 0.144\%$) is rarer than a flush ($\approx 0.197\%$) |
| Stars and bars | $\binom{n+k-1}{k-1}$, the count of ways to split $n$ identical items among $k$ categories |

## Recap

Every counting problem in this lesson reduces to the same move: count ordered arrangements with permutations, then divide out orderings you don't care about to get combinations — and stars and bars extends that machinery to splitting a quantity among categories. The birthday problem and the poker-hand comparison both show how fast these counts grow, which is exactly why naive intuition about "how many ways" is so often wrong. Next up, Lesson 38: Mental Math & Estimation, where you'll practice doing fast, good-enough versions of exactly this kind of arithmetic without a calculator.
