# Building the Stakeholder Presentation

You now have a model, a test result, an explanation, a package, and a monitoring plan. None of it matters until the people who decide about retention money understand it well enough to say yes, no, or "prove it." Technical audiences reward the order in which you did the work. Business audiences want the reverse: the answer first, the evidence second, the method last. This lesson builds the deck. Every number in it comes from code shown here, run on the synthetic Harvest Table data, and every dollar figure rests on the illustrative assumptions from lesson 3.

## What you'll learn

- How to structure a talk as answer first, then evidence, then risks, then the ask
- How to choose numbers and one chart that an executive can read in ten seconds
- How to test the value claim against its assumptions instead of hiding them
- How to write a one-slide summary and a deck outline
- How to state limitations so they build trust

## Answer first

Open with the recommendation and the ask, not the data. A typical audience here has three people, and each asks a different question.

- **The retention lead** asks: who do I call, how many, and what happens if I ignore this?
- **Finance** asks: what does it cost, what does it return, and how sure are you?
- **An engineer or analyst** asks: is it leakage-free, will it keep working, and can I rerun it?

The main deck serves the first two. The third gets an appendix, so the technical work is visible without burying the decision.

## Compute the numbers you will show

One caution about which numbers. The test set gave precision of 0.405 in the top 10%, but that was only 74 customers. For the deck, use cross-validated predictions over all 3,690 customers: every prediction comes from a model that never saw that customer, and the top 10% is the full 369 the team can actually contact. Show both, and note that they agree.

```python
from common import *   # X, y, prep, BREAK_EVEN
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedKFold, cross_val_predict

final = Pipeline([("prep", prep),
                  ("model", LogisticRegression(C=0.1, max_iter=1000))])
oof = cross_val_predict(final, X, y, method="predict_proba",
                        cv=StratifiedKFold(5, shuffle=True,
                                           random_state=42))[:, 1]
yv = y.values
order = np.argsort(-oof)
dec = np.empty(len(oof), int)
dec[order] = np.arange(len(oof)) * 10 // len(oof) + 1      # 1 = top 10%
tbl = pd.DataFrame({"decile": dec, "churn": yv}).groupby("decile").churn.agg(["size", "mean"])
tbl["lift"] = tbl["mean"] / yv.mean()
tbl["captured"] = (tbl["mean"] * tbl["size"]).cumsum() / yv.sum()
print(tbl.round(3).to_string())

k = int(round(0.10 * len(oof)))
prec = yv[order[:k]].mean()
rng = np.random.default_rng(0)
boot = [yv[b][np.argsort(-oof[b])[:k]].mean()
        for b in (rng.integers(0, len(yv), len(yv)) for _ in range(1000))]
print("top-10%% precision %.3f (n=%d), 95%% CI %.3f-%.3f, lift %.2fx" % (
    prec, k, *np.percentile(boot, [2.5, 97.5]), prec / yv.mean()))
```

```
        size   mean   lift  captured
decile                              
1        369  0.401  2.606     0.261
2        369  0.263  1.708     0.431
3        369  0.195  1.268     0.558
4        369  0.173  1.127     0.671
5        369  0.127  0.827     0.754
6        369  0.117  0.757     0.829
7        369  0.081  0.528     0.882
8        369  0.073  0.475     0.930
9        369  0.062  0.405     0.970
10       369  0.046  0.299     1.000
top-10% precision 0.401 (n=369), 95% CI 0.350-0.450, lift 2.61x
```

The top decile churns at 40.1% against 15.4% for the average customer, a lift of 2.6 times, and holds 26% of all churners. The interval, 35.0% to 45.0%, is comfortably above the 20.8% break-even. The second decile (26.3%) also clears break-even; the third (19.5%) does not.

## One chart

An executive should be able to read the point of a chart in ten seconds. A bar per risk decile, with the average and the break-even drawn as reference lines, does it: the two tallest bars are the customers worth contacting. Skip ROC curves in the main deck; they answer a question the audience did not ask. The chart is drawn from the code below.

```python
import matplotlib.pyplot as plt
fig, ax = plt.subplots(figsize=(8, 4.2), dpi=150)
ax.bar(tbl.index, tbl["mean"], color="#8E1C1C")
ax.axhline(yv.mean(), ls="--", color="gray", label="average customer (15.4%)")
ax.axhline(BREAK_EVEN, ls=":", color="black", label="break-even (20.8%)")
ax.set_xticks(range(1, 11))
ax.set_xlabel("Risk decile (1 = highest predicted risk, 369 customers each)")
ax.set_ylabel("Share who cancelled within 60 days")
ax.legend(frameon=False)
plt.tight_layout(); plt.savefig("decile_chart.png")
```

## Stress-test the value claim

Finance will ask what happens if your assumptions are wrong. Answer before they do. Under the lesson 3 economics, each contact costs 15, an offer saves 30% of would-be churners, and a saved customer is worth 240:

```python
net = lambda p, save, value: k * (p * save * value - 15)
print("net per cycle at 0.30 save, 240 value: %.0f" % net(prec, 0.30, 240))
print("break-even save rate at this precision: %.3f" % (15 / (prec * 240)))
grid = pd.DataFrame({v: {s: round(net(prec, s, v)) for s in (0.10, 0.15, 0.20, 0.30, 0.40)}
                     for v in (120, 240, 360)})
print(grid.to_string())
lo = np.percentile(boot, 2.5)
print("pessimistic (lower CI precision %.3f) net at 0.30/240: %.0f" % (lo, net(lo, 0.30, 240)))
```

```
net per cycle at 0.30 save, 240 value: 5121
break-even save rate at this precision: 0.156
       120   240    360
0.10 -3759 -1983   -207
0.15 -2871  -207   2457
0.20 -1983  1569   5121
0.30  -207  5121  10449
0.40  1569  8673  15777
pessimistic (lower CI precision 0.350) net at 0.30/240: 3753
```

The rows are save rates, the columns the value of a saved customer. Under the base assumptions the program returns about 5,100 per cycle, or about 3,750 at the pessimistic end of the precision interval. But the table exposes the real risk: if the offer saves fewer than about 16% of would-be churners, the program loses money. The model predicts who is likely to leave, not who will respond to an offer, and the 30% save rate is an assumption. That gap is the honest core of your recommendation.

## The one-slide summary

Write it as a page you could paste into an email:

```
RECOMMENDATION
Each cycle, offer a retention contact to the 369 active customers the
model ranks as highest risk (the top 10%).

WHY
- They cancel within 60 days at 40% (95% CI 35-45%) versus 15.4% for the
  average customer: 2.6 times the rate, and above the 20.8% break-even.
- Tested on customers the model never saw. The simplest rule ("longest
  since last order") did not reach break-even; the model did.

VALUE (illustrative assumptions: 15 per contact, 30% save rate, 240 per save)
About 5,100 per cycle; about 3,750 at the pessimistic end.

RISKS
- The 30% save rate is assumed. Below about 16% the program loses money.
- One snapshot of data; not yet tested on a later period.
- The model ranks risk. It does not show who responds to an offer.

NEXT STEP
Run a pilot with a randomized holdout group, sized in advance, to measure
the real save rate; monitor drift and precision each cycle.
```

## The deck, slide by slide

1. **The ask:** the summary above, in two lines.
2. **The problem:** 15.4% of 3,690 active customers cancel within 60 days; contacting everyone loses money.
3. **The approach in one picture:** data, features as of the snapshot, model, ranked list, no jargon.
4. **The evidence:** the decile chart.
5. **What drives risk:** low order rate, delivery problems, plan and channel; tenure as a stand-in for accumulated bad deliveries (a hypothesis, said so).
6. **The value and its assumptions:** the sensitivity table.
7. **Limitations and risks:** below.
8. **The plan:** pilot with holdout, monitoring, retraining triggers.
9. **Appendix:** validation design, metrics with intervals, calibration, packaging, drift plan.

## Say the limitations out loud

- One snapshot and a random split, so we have no evidence yet about a later period.
- Cost, save rate, and customer value are assumptions, not company data.
- Modest signal: average precision 0.33 and AUC 0.755. The list is better than random, not oracular; six in ten of the customers on it would not have left.
- Explanations describe the model, not causes. Do not promise that fixing deliveries fixes churn.
- The test set is spent; changes need fresh data.
- Deployment is local and illustrative.

A limitations slide that is specific reads as competence. One that is vague reads as evasion.

## Recap

Lead with the recommendation, show one clear chart, stress-test the value against its own assumptions, and state limitations plainly. Next you rehearse the questions you will be asked.
