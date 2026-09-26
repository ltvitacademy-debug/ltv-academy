# Bayes' Theorem

A fraud detector flags a transaction. It catches 95 percent of real fraud and only raises a false alarm on 2 percent of legitimate transactions. Surely, when it flags something, it is very likely fraud? Most people say "around 95 percent." The real answer, with the numbers below, is about 19 percent. **Bayes' theorem** is the tool that explains why, and it is one of the most useful ideas in data science: it tells you how to turn "how likely is this evidence if the hypothesis were true?" into "how likely is the hypothesis, now that I have seen the evidence?"

## What you'll learn

- The formula for Bayes' theorem and the meaning of prior, likelihood, and posterior
- Why the base rate matters and how to avoid the base rate fallacy
- How to compute a posterior in Python, by formula and by simulation
- How updating with a second piece of evidence works, and its caveats

## The theorem

From the definition of conditional probability, P(A and B) can be written two ways: P(A | B) x P(B) and P(B | A) x P(A). Set them equal and rearrange:

**P(A | B) = P(B | A) x P(A) / P(B)**

For a hypothesis H and evidence E, the pieces have names:

- **Prior**, P(H): how likely H was *before* the evidence. For fraud, this is the **base rate**: the overall share of transactions that are fraudulent.
- **Likelihood**, P(E | H): how likely the evidence is if H is true.
- **Evidence** (or marginal likelihood), P(E): how likely the evidence is overall, from either cause. By the law of total probability, P(E) = P(E | H) x P(H) + P(E | not H) x P(not H).
- **Posterior**, P(H | E): the updated belief. This is the answer we want.

## The fraud example (illustrative numbers)

Assume 0.5 percent of transactions are fraud (the prior), the detector flags 95 percent of real fraud (its *sensitivity*), and it flags 2 percent of legitimate transactions (its *false positive rate*):

```python
p_fraud, sens, fpr = 0.005, 0.95, 0.02

p_flag = sens * p_fraud + fpr * (1 - p_fraud)
post = sens * p_fraud / p_flag
print(p_flag, post)
```

Output:

```
0.02465  0.19269776876267747
```

Overall, 2.465 percent of transactions are flagged, but only about **19.3 percent of flagged transactions are actually fraud**. The other roughly 81 percent are false alarms.

## Why? Use natural frequencies

Percentages are slippery; counts are easier. Imagine 100,000 transactions:

- 500 are fraud (0.5 percent). The detector flags 475 of them (95 percent).
- 99,500 are legitimate. The detector flags 1,990 of them (2 percent).
- Total flagged: 475 + 1,990 = 2,465. The fraction that is truly fraud is 475 / 2,465, about 19.3 percent.

Even a 2 percent false positive rate, applied to a huge legitimate majority, produces four times more false alarms than true catches. Ignoring the small base rate is called the **base rate fallacy**, and it is the most common way people misread test results, alerts, and model predictions on rare events.

## Checking by simulation

When Bayes' formula feels abstract, simulate the world and count:

```python
rng = np.random.default_rng(11)
n = 2_000_000
fraud = rng.random(n) < 0.005
flag = np.where(fraud,
                rng.random(n) < 0.95,
                rng.random(n) < 0.02)
print(fraud[flag].mean())     # 0.1921
```

Among 2 million simulated transactions, the fraction of *flagged* ones that were truly fraud came out at 0.1921, close to the exact 0.1927 (the small gap is simulation noise). Note how the simulation only counts fraud rates among flagged cases: it is literally the definition of conditional probability.

## The prior matters a lot

Holding the detector fixed and changing only the base rate (computed with the same formula):

| Prior P(fraud) | Posterior P(fraud given flag) |
|---|---|
| 0.1% | 4.5% |
| 0.5% | 19.3% |
| 5% | 71.4% |
| 20% | 92.2% |

The same detector is nearly useless on very rare events and quite strong on common ones. This is why evaluating a classifier by "accuracy" or by its true positive rate alone can be misleading when classes are imbalanced, a theme you will meet again in machine learning.

## Updating with more evidence

Bayes' theorem chains. Yesterday's posterior becomes today's prior. If a second, *independent* alert flags the same transaction, use 0.1927 as the new prior:

```python
p2 = sens * post / (sens * post + fpr * (1 - post))
print(p2)     # 0.9189
```

The probability of fraud jumps to about 92 percent. A caveat: this assumes the two alerts are independent given the true status. If both alerts look at the same features, their errors are correlated and the real posterior would be lower. Checking such assumptions is part of the job.

## Another look at Lesson 8

Recall the plan-and-churn table: P(churn | Free) = 0.3, P(Free) = 0.5, P(churn) = 0.2. Bayes gives P(Free | churn) = 0.3 x 0.5 / 0.2 = 0.75, exactly the 150-of-200 we counted directly. Bayes' theorem is the bridge between the two directions of a conditional.

## Where this shows up later

The Naive Bayes classifier applies this formula with many features. Bayesian statistics, an entire approach to inference, treats parameters themselves as having priors and posteriors. This course mostly uses the frequentist approach, but the reasoning here, "update belief with evidence, weighted by base rates," applies everywhere.

## Recap

Bayes' theorem: P(H | E) = P(E | H) x P(H) / P(E). Always ask for the base rate; a strong test on a rare event still produces mostly false positives. Natural frequencies and simulation make the result concrete. Next, we move from events to numbers: random variables and expected value.
