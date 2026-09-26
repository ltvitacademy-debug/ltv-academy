# The Logic of Hypothesis Testing

Your marketing team sends a redesigned email to 40 customers and the old email to another 40. The new email's customers spent an average of $58.20 per order; the old email's customers spent $52.57. Is the new email better, or did you just get a lucky batch of shoppers? Hypothesis testing is the formal, repeatable way to answer that question. The logic is unusual, and once you see it, every test in the rest of this chapter is a variation on the same idea.

## What you'll learn

- Why a sample difference alone never settles a question
- The null and alternative hypotheses, and why we test the boring one
- The four-step recipe behind every hypothesis test
- How to build a test from scratch by shuffling data (a permutation test)
- What a test result does and does not let you conclude

## Why "it's higher" is not enough

Two groups of customers will never have exactly the same average, even if the email makes no difference at all. Random variation between people alone guarantees a gap. The real question is: **is this gap bigger than the gaps that chance produces by itself?** Lesson 17 gave you standard error to describe how much sample statistics wobble. Hypothesis testing turns that idea into a decision.

## Null and alternative

A hypothesis test sets two competing claims:

- **Null hypothesis (H0):** nothing interesting is going on. The two emails produce the same average order value; any gap is chance.
- **Alternative hypothesis (H1):** there is a real difference in average order value.

We test the null because it is precise. "No difference" gives us one concrete world to simulate. "Some difference" could mean $1 or $100, and we can't simulate a vague claim.

The logic mirrors a courtroom. The defendant is presumed innocent (the null) until the evidence is unlikely enough under that presumption that we reject it. Failing to convict does not prove innocence, and failing to reject the null does not prove "no effect". It only says the evidence wasn't strong enough.

## The four-step recipe

1. State H0 and H1 before you look at the results.
2. Pick a test statistic that measures the gap (here, the difference in means).
3. Ask: if H0 were true, how often would chance alone produce a statistic at least this extreme?
4. If that probability is small enough, reject H0; otherwise, don't.

Step 3 is where the machinery lives. Classical tests such as the t-test use a formula. A **permutation test** uses brute force, and it makes the logic visible.

## A permutation test in Python

If the email made no difference, then the labels "old" and "new" are meaningless, so we can shuffle them freely and see what gaps arise by luck alone. (The data below is simulated for illustration.)

```python
import numpy as np
rng = np.random.default_rng(42)
old = rng.normal(52, 15, 40).round(2)
new = rng.normal(58, 15, 40).round(2)
obs = new.mean() - old.mean()
print(round(obs, 2))   # 5.62
```

Now pool all 80 orders, shuffle, split into fake groups of 40, and record the gap. Repeat 10,000 times:

```python
pooled = np.concatenate([old, new])
diffs = np.empty(10000)
for i in range(10000):
    rng.shuffle(pooled)
    diffs[i] = (pooled[40:].mean()
                - pooled[:40].mean())
p = (np.abs(diffs) >= abs(obs)).mean()
print(p)   # 0.0343
```

In this run, only about 3.4% of the shuffles produced a gap as large as 5.62 in either direction. That number is the **p-value**, the subject of the next lesson. It says: in a world where the email does nothing, a gap this big would be rare, so the null looks hard to defend.

## What you can and cannot conclude

A small probability lets you reject H0: the data are hard to explain by chance alone. It does not tell you the size of the effect, that it matters commercially, or that the email caused it (that depends on how the groups were formed, a theme returning in Chapter 6). And a large probability means "inconclusive", not "proven identical".

## Recap

Hypothesis testing compares your observed statistic to what chance alone would produce under the null hypothesis. You state H0 and H1, choose a test statistic, work out how surprising your result would be if H0 were true, and decide. A permutation test does this by shuffling; formula-based tests do it with math. Next, we look closely at the number that comes out: the p-value.
