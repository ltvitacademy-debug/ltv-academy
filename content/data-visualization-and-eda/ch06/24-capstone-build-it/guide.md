# Capstone: Build It

In the kickoff we framed a question, generated 800 illustrative customers, and found a baseline churn rate of 19.6%. Now we do the analysis: check quality, compare churn across each variable, test whether the patterns hold up, and save one clear figure. Every number below comes from running this code on the seeded dataset from the kickoff. Follow along in your own notebook, and predict each result before you run it.

## What you'll learn

- How to handle a small amount of missing data and check that the choice does not matter
- How to compare churn rates across variables against the baseline
- How to sanity-check a surprising pattern with a test
- How to combine two variables and save one clear figure

## Step 1: Data quality

Twelve monthly spend values are missing. Before choosing what to do, check whether the missing rows look different on the outcome:

```python
m = df.monthly_spend.isna()
print(m.sum(), round(df[m].churned.mean(), 3),
      round(df[~m].churned.mean(), 3))
```

Output: `12 0.417 0.193`. Five of the 12 customers with missing spend churned, 41.7%, against 19.3% for everyone else. That looks striking, but 12 customers is far too few to conclude anything, since a single customer moves the rate by more than 8 points. We note it and move on. We fill the gaps with the median spend for each plan, which keeps them plausible:

```python
med = df.groupby("plan").monthly_spend.transform("median")
df["monthly_spend"] = df.monthly_spend.fillna(med)
```

A good habit is to check that your choice does not drive the result. We re-ran the ticket comparison after simply dropping those 12 rows. The churn rates for 0, 1, 2, and 3 or more tickets were 11.0%, 14.7%, 26.1%, and 43.6%, nearly identical to the filled version. The choice does not matter here.

## Step 2: Compare churn across variables

Now compare each variable to the baseline. We cap tickets at 3 (meaning 3 or more) and bin tenure into bands:

```python
tix = df.support_tickets.clip(upper=3)
df["tenure_band"] = pd.cut(df.tenure_months,
    [0, 12, 24, 36, 60],
    labels=["0-12", "13-24", "25-36", "37-60"])
for c in [tix, "tenure_band", "plan", "region"]:
    print(df.groupby(c).churned.mean().round(3))
```

The rates were:

| Variable | Churn rate by group |
| --- | --- |
| Support tickets (0, 1, 2, 3+) | 11.3%, 14.9%, 26.0%, 44.7% |
| Tenure (0-12, 13-24, 25-36, 37-60 months) | 30.9%, 28.5%, 16.9%, 10.6% |
| Plan (Basic, Plus, Premium) | 22.0%, 19.5%, 13.6% |
| Region (East, North, South, West) | 26.4%, 17.7%, 15.4%, 19.4% |

Tickets and tenure show strong, steady gradients. Plan shows a milder one. Region shows a gap, with East highest, but no clean pattern.

## Step 3: Is the region gap real?

East stands out at 26.4%. Before we tell anyone, check whether that gap could be chance. A chi-square test of independence (from the statistics course) compares the observed counts with what we would expect if region had no effect:

```python
from scipy.stats import chi2_contingency

ct = pd.crosstab(df.region, df.churned)
p = chi2_contingency(ct)[1]
print(round(p, 3))
```

The p-value was 0.037. That is under the usual 0.05 line, but only just, and we have looked at four variables. When you scan many variables, a few will cross the line by luck. Running the same test on plan gave about 0.085, and on tickets and tenure the p-values were vanishingly small (far below 0.001). So region deserves a hedge: "worth watching, not yet convincing." Since we built this dataset, we can peek at the answer key: region plays no part in the recipe, so the East gap is a live demonstration of chance. On real data you would not have that luxury, and the honest response is to say the evidence is weak and to check whether it holds in new data.

## Step 4: Combine two variables

Do tickets and tenure tell the same story or separate ones? Cross them:

```python
df["tix3"] = tix
print(df.pivot_table(index="tenure_band", columns="tix3",
                     values="churned", aggfunc="mean").round(2))
```

```text
tix3            0     1     2     3
tenure_band                        
0-12         0.21  0.29  0.39  0.50
13-24        0.16  0.18  0.40  0.63
25-36        0.07  0.14  0.29  0.38
37-60        0.05  0.07  0.12  0.32
```

Read across each row and churn climbs with tickets in every tenure band. Read down each column and it falls with tenure. Even among long-tenure customers, 3 or more tickets means 32% churn versus 5% with none. The two effects add up rather than duplicate each other. Some cells are small (the 25-36 month, 3+ ticket cell has only 13 customers), so treat individual cells loosely and read the overall pattern.

## Step 5: Save one clear figure

```python
fig, axes = plt.subplots(1, 2, figsize=(9, 3.5))
by_tix = df.groupby(tix).churned.mean()*100
by_ten = df.groupby("tenure_band").churned.mean()*100
by_tix.plot(kind="bar", ax=axes[0], rot=0)
by_ten.plot(kind="bar", ax=axes[1], rot=0)
axes[0].set_title("Churn % by support tickets")
axes[1].set_title("Churn % by tenure (months)")
plt.tight_layout()
plt.savefig("findings.png")
```

In the left panel, the label 3 means 3 or more tickets. In the wrap-up lesson we polish this into a proper deliverable with finding-style titles and a highlighted bar.

## Recap

- Check missing data against the outcome, then confirm your handling does not change the answer.
- Compare groups against the 19.6% baseline; tickets and tenure are strong, plan is mild, region is weak.
- Test surprising gaps, and remember that scanning many variables produces lucky ones.
- Cross two variables to see whether effects overlap or add up.
