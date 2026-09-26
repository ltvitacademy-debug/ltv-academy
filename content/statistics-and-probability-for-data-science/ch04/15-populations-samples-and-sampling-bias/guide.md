# Populations, Samples & Sampling Bias

Almost every statistical analysis starts from the same uncomfortable fact: you rarely see everything. You want to know about all your customers, all your machines, or every future visitor, but you only have some of them. This lesson introduces the vocabulary of populations and samples, shows with a simulation how much a sample can wander from the truth, and, most importantly, shows how a badly collected sample can be wrong in a way that no amount of extra data fixes.

Data here is illustrative and simulated, so we can peek at the "truth" that you never see in real life. Code was run with numpy 1.23 and pandas 1.4.

## What you'll learn

- The difference between a population, a sample, a parameter, and a statistic
- Why two random samples give different answers
- What sampling bias is and how it differs from random error
- Common sampling designs: simple random, stratified, and the risky ones
- Why more data does not cure a biased sample

## Vocabulary

The **population** is the complete group you care about. A **sample** is the subset you actually observe. A number describing the population, such as its true average spend, is a **parameter**. A number computed from the sample is a **statistic**, and we use it to estimate the parameter. Parameters are fixed but usually unknown; statistics change from sample to sample.

## A population we can see

We simulate 100,000 customers, each with a region, a number of orders per year, and an annual spend. In real work you would not have this table, but here it lets us check our answers.

```python
import numpy as np, pandas as pd
rng = np.random.default_rng(15)
N = 100_000
pop = pd.DataFrame({
    "region": rng.choice(["North", "South", "West"], size=N, p=[0.5, 0.3, 0.2]),
    "orders_per_year": rng.poisson(4, N) + 1,
})
pop["annual_spend"] = (pop["orders_per_year"] * rng.lognormal(3.4, 0.5, N)).round(2)
print(round(pop["annual_spend"].mean(), 2))   # 170.22
```

The population mean spend is 170.22. That is the parameter.

## Random samples wander

A simple random sample gives every member an equal chance of selection. Pandas does this with `sample`.

```python
samp = pop.sample(n=200, random_state=1)
print(round(samp["annual_spend"].mean(), 2))   # 180.31
means = [pop["annual_spend"].sample(200, random_state=s).mean() for s in range(5)]
print([round(m, 1) for m in means])
# [169.4, 180.3, 160.6, 162.9, 159.2]
```

Five samples of 200 give five different estimates, from 159.2 to 180.3. None is wrong; they just reflect random luck. This is **sampling variability**, and the next three lessons quantify it. Crucially, random error averages out: it has no systematic lean up or down.

## Sampling bias is different

Bias is a systematic tilt caused by how you collect the data. Suppose you email a survey and only customers with 6 or more orders a year bother to respond (37% of customers here).

```python
heavy = pop[pop["orders_per_year"] >= 6]
print(round(len(heavy) / N, 3))                            # 0.371
bs = heavy.sample(n=2000, random_state=1)
print(round(bs["annual_spend"].mean(), 2))                 # 241.55
```

Even with 2,000 respondents the estimate is 241.55, far above the true 170.22. This is **selection bias** at work. Collecting 20,000 respondents from the same group would not repair it; it would only make you more precisely wrong.

A close cousin is voluntary response, where people opt in and the ones who do are unusual. Suppose the chance of responding is proportional to spend:

```python
w = pop["annual_spend"] / pop["annual_spend"].sum()
vr = pop.sample(n=2000, weights=w, random_state=2)
print(round(vr["annual_spend"].mean(), 2))   # 250.05
```

The estimate of 250.05 is about 47% too high. Other classic biases include survivorship bias (only looking at customers who stayed) and undercoverage (your list misses part of the population).

## Better designs

**Simple random sampling** is the baseline. **Stratified sampling** splits the population into groups (strata) and samples within each, guaranteeing each group is represented in proportion:

```python
strat = pop.groupby("region", group_keys=False).apply(
    lambda g: g.sample(frac=0.002, random_state=3))
print(len(strat), strat["region"].value_counts().to_dict())
# 200 {'North': 100, 'South': 60, 'West': 40}
print(round(strat["annual_spend"].mean(), 2))   # 174.39
```

Stratifying helps most when groups differ on what you measure. **Cluster sampling** picks whole groups (say, entire stores) and is cheaper but noisier. **Convenience sampling**, using whoever is easy to reach, is common and risky.

## Working with data you did not design

Most analysts inherit data rather than design the sampling. Always ask: who is missing from this data, and why? Who chose to be in it? A dataset of logged-in users says little about people who never log in.

## Recap

A statistic from a sample estimates a population parameter. Random sampling error is unavoidable but averages out and shrinks with more data. Bias comes from how the data was collected and does not shrink with more data. Fix bias with design, not volume.
