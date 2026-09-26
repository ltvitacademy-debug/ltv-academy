# What Statistics Is For

Welcome to Statistics & Probability for Data Science, step three of the Data Scientist path. You have already learned to pull data with SQL and to manipulate it with Python. This course answers the question that comes next: once you have the data, what can you honestly *conclude* from it? No prior statistics is assumed. We will build every idea from plain-language intuition, then check it with short numpy, scipy and pandas snippets that you can run yourself.

## What you'll learn

- The difference between describing data and drawing conclusions from it
- What a population and a sample are, and why the gap between them matters
- Why two honest analysts can get slightly different answers from the same business
- How this course is organized and what you will be able to do by the end

## Statistics in one sentence

Statistics is the discipline of learning from data *while being honest about uncertainty*. That last phrase is the whole point. Computing an average is easy; knowing how much to trust that average is the skill that separates a data scientist from someone with a calculator.

Statistics does three jobs:

1. **Describe.** Summarize what you actually have: an average, a spread, a shape, a chart. This is *descriptive statistics*, the subject of Chapter 1.
2. **Infer.** Use the data in front of you to say something about a larger group you did not fully observe. This is *inferential statistics*, and it fills the second half of the course.
3. **Quantify uncertainty.** Attach an honest "how sure are we?" to every conclusion, using probability.

## Populations and samples

A **population** is the complete group you care about: every order your company will ever receive, every customer who might churn. A **sample** is the part of that group you actually measured. Nearly all real analysis is done on samples, because measuring everything is expensive or impossible.

Here is the idea in code. We invent a "population" of 10,000 order values (illustrative data, generated with numpy), then pretend we can only afford to look at 50 of them at a time:

```python
import numpy as np, pandas as pd

rng = np.random.default_rng(42)
orders = pd.Series(
    rng.gamma(2.0, 30.0, size=10000).round(2)
)
print("population mean:", round(orders.mean(), 2))

for i in range(3):
    s = orders.sample(50, random_state=i)
    print("sample", i, "mean:", round(s.mean(), 2))
```

Output from running this:

```
population mean: 60.44
sample 0 mean: 60.7
sample 1 mean: 58.77
sample 2 mean: 58.38
```

Three samples, three different answers, and none of them equals the true population mean of 60.44. Nobody made a mistake. This is **sampling variability**: every sample is a slightly different random slice of the population. In real work you never get to see the true 60.44; you see one sample mean and must decide how far to trust it. Everything in the inference chapters is about answering exactly that.

## Why this matters for a data scientist

Data science decisions rest on statistical claims: "the new checkout page increases conversion," "this model is better than the last one," "customers in this region spend more." Without statistics you cannot tell a real effect from an ordinary wobble caused by sampling. Statistics gives you the vocabulary and the tools to say "this is probably real" or "we cannot tell yet."

## The road ahead

- **Descriptive statistics** (Chapter 1): types of data, center, spread, shape, and charts.
- **Probability** (Chapter 2): the math of chance, conditional probability, and Bayes' theorem.
- **Distributions and sampling** (Chapters 3 and 4): the standard shapes randomness takes, and how samples relate to populations.
- **Hypothesis testing** (Chapter 5): a disciplined way to decide between "real effect" and "just noise."
- **Correlation, experiments and a capstone** (Chapters 6 and 7): regression, A/B testing, common pitfalls, and a full analysis from start to finish.

A note on honesty: the datasets in this course are small and illustrative, chosen so that you can see every number. The habits transfer directly to real, messy data.

## Recap

Statistics describes data, infers from samples to populations, and quantifies uncertainty. Samples vary, so a single sample statistic is an estimate, not the truth. Next, we look at the different *kinds* of data you will meet, because the kind of data decides which statistics make sense.
