# Evaluating Recommenders

You have built two kinds of recommender in this chapter: collaborative filtering and content-based. Now the question every stakeholder asks first: *is it any good?* Evaluating a recommender is trickier than scoring a classifier, because the "right answer" is a ranked list, not a single label, and because the best-looking accuracy number is often not the one that makes the business money.

## What you'll learn

- The three families of recommender metrics: rating accuracy, ranking quality, and beyond-accuracy measures
- How to build an offline train/test split for a recommender by holding out interactions
- How to compute precision@k, recall@k, NDCG@k, and catalog coverage in a few lines of numpy
- Why a popularity baseline is the bar every model must clear

## Three families of metrics

**Rating accuracy.** If your model predicts star ratings, RMSE or MAE measures how far the predictions are from what users actually gave. It is easy to compute, but users never see predicted ratings, they see a *ranked list*. A model can have a great RMSE and a poor top-10.

**Ranking quality.** These metrics look only at the top *k* items you would show: precision@k (what share of the shown items were relevant), recall@k (what share of the user's relevant items you found), and NDCG@k (like precision, but a hit at position 1 counts more than a hit at position 5).

**Beyond accuracy.** Coverage (how much of the catalog ever gets recommended), novelty, and diversity. A recommender that shows the same ten bestsellers to everyone can score respectably on accuracy while being useless for discovery.

## Build an offline split

We use a small illustrative implicit-feedback dataset: 60 users, 30 items, and a 1 where the user clicked. Two taste groups plus a popularity effect are baked in, and the seed makes it reproducible.

```python
import numpy as np

rng = np.random.default_rng(42)
n_users, n_items = 60, 30
taste = np.zeros((n_users, n_items))
taste[:30, :15] = 0.45
taste[30:, 15:] = 0.45
pop = np.linspace(0.25, 0.02, n_items)
prob = np.clip(taste + pop, 0, 1)
clicks = (rng.random((n_users, n_items)) < prob).astype(int)

train = clicks.copy()
test = np.zeros_like(clicks)
for u in range(n_users):
    liked = np.flatnonzero(clicks[u])
    if len(liked) >= 3:
        held = rng.choice(liked)
        train[u, held] = 0
        test[u, held] = 1
```

For every user we hide one item they interacted with. The question the model must answer: *can you put that hidden item near the top of the list?* Notice we never split by random rows of a flat table; each user keeps most of their history in `train`, which is what a real recommender would have.

## Precision@k, recall@k, and three competitors

```python
def precision_recall_at_k(scores, k=5):
    scores = np.where(train == 1, -np.inf, scores)
    top = np.argsort(-scores, axis=1)[:, :k]
    p, r, n = 0.0, 0.0, 0
    for u in range(n_users):
        rel = np.flatnonzero(test[u])
        if len(rel) == 0:
            continue
        hits = len(set(top[u]) & set(rel))
        p += hits / k
        r += hits / len(rel)
        n += 1
    return p / n, r / n
```

The first line matters: we set already-seen items to minus infinity so the model is never credited for re-recommending something the user already has. Now score three candidates: random, "most popular in training", and item-item collaborative filtering using cosine similarity.

```python
pop_scores = np.tile(train.sum(axis=0), (n_users, 1)).astype(float)
norm = np.linalg.norm(train, axis=0, keepdims=True)
sim = (train.T @ train) / (norm.T @ norm + 1e-9)
np.fill_diagonal(sim, 0)
cf_scores = train @ sim
rand_scores = rng.random((n_users, n_items))
```

Output we saw for the three models:

```
random       P@5=0.037 R@5=0.183
popular      P@5=0.070 R@5=0.350
item-item CF P@5=0.123 R@5=0.617
```

Because each user has exactly one held-out item, recall@5 is simply the share of users whose hidden item landed in the top five. Random gets it right about 18% of the time (with roughly 20 unseen items per user and 5 slots you would expect about 25%; with only 60 users the number is noisy), popularity gets 35%, and the collaborative model gets 62%. Computing NDCG@5 the same way gave 0.100, 0.214, and 0.374.

## Beyond accuracy

```
popular      coverage=0.57
item-item CF coverage=0.93
```

Coverage is the share of the catalog recommended to at least one user. The popularity baseline only ever surfaces 57% of items; the collaborative model reaches 93%, so more of your catalog gets a chance to sell.

## Two cautions

- **Always beat the popularity baseline.** It is cheap, hard to beat on sparse data, and if your model cannot clear it, the complexity is not paying off.
- **Offline metrics are a proxy.** They measure how well you predict past behavior, which is already shaped by what the old system showed. The real test is an online A/B experiment measuring clicks, conversions, or revenue.

## Recap

Evaluate recommenders on the ranked list a user would actually see. Hold out interactions per user, compare against random and popularity baselines, report precision@k, recall@k, and NDCG@k, and check coverage so you are not just recommending bestsellers. Confirm with an online test before declaring victory. Next chapter: opening up the black box with model explainability.
