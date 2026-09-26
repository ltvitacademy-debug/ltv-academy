# How Recommenders Work

"Customers who bought this also bought..." and "Because you watched..." are everywhere, and they are usually worth real money to the business that runs them. Under the hood, almost every recommender starts from the same simple object: a table of which users interacted with which items. In this lesson you build that table, make the simplest possible recommender, and learn the vocabulary that the next three lessons build on, ending with how to evaluate the results.

## What you'll learn

- What the user-item matrix is and how to build one from an interaction log
- The difference between explicit feedback (ratings) and implicit feedback (clicks)
- How a popularity recommender works and why it is the baseline to beat
- The three families of recommender and the cold-start problem

## From a log to a user-item matrix

Recommenders learn from an interaction log: one row per event, saying who did what to which item. Here is a tiny illustrative log of explicit star ratings:

```python
import pandas as pd

log = pd.DataFrame({
    "user": ["ana", "ana", "ben", "ben", "ben", "cy"],
    "item": ["mug", "lamp", "mug", "desk", "lamp", "desk"],
    "rating": [5, 3, 4, 2, 5, 4],
})
print(log.pivot(index="user", columns="item", values="rating"))
```

```
item  desk  lamp  mug
user
ana    NaN   3.0  5.0
ben    2.0   5.0  4.0
cy     4.0   NaN  NaN
```

That grid is the **user-item matrix**: rows are users, columns are items, and each cell holds the interaction. The empty cells are the whole point. The recommender's job is to guess which empty cells a user would fill in with a high value, then show those items.

## Explicit vs implicit feedback

**Explicit feedback** means the user told you their opinion, such as a star rating. It is clear but rare, because most people never rate anything.

**Implicit feedback** is behavior: clicks, purchases, plays, add-to-cart. It is abundant but ambiguous. A click means interest, but a missing click does not mean dislike; the user may simply never have seen the item. Most production recommenders lean heavily on implicit data.

For the rest of this chapter we use one small illustrative implicit dataset: 60 users, 30 items, and a 1 where the user clicked. It is the same one the evaluation lesson at the end of the chapter uses, generated with two taste groups (users 0 to 29 lean toward items 0 to 14, the others toward items 15 to 29) plus a popularity effect.

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

print(clicks.shape, clicks.sum())
print("density", round(clicks.mean(), 3))
```

```
(60, 30) 638
density 0.354
```

The matrix has 638 clicks, filling about 35% of the cells. That is far denser than real data: production matrices are typically extremely sparse, because each user touches a tiny fraction of a large catalog. We keep ours small so you can run everything in seconds.

## The simplest recommender: popularity

Recommend whatever most users clicked, skipping items this user already has.

```python
item_pop = clicks.sum(axis=0)
u = 0
scores = np.where(clicks[u] == 1, -np.inf, item_pop)
top5 = np.argsort(-scores)[:5]
print("seen", np.flatnonzero(clicks[u]))
print("recs", top5)
print("new user", np.argsort(-item_pop)[:5])
```

```
seen [ 1  4  8  9 10 14 17]
recs [ 2  7  0  3 16]
new user [ 2  7  0 10  3]
```

Two things to notice. Setting seen items to minus infinity keeps the model from recommending something the user already clicked (item 10 is popular, but user 0 has it, so it is skipped). And every user without history gets the identical list. Popularity is not personalized, yet it is surprisingly hard to beat on sparse data, which is why the last lesson of this chapter treats it as the bar every model must clear.

## Three families of recommender

1. **Popularity and rules.** Same list for everyone, or simple rules like "newest in this category."
2. **Collaborative filtering.** Uses only the user-item matrix: people who behaved like you liked these items. Next lesson.
3. **Content-based.** Uses item attributes such as text descriptions or categories: you liked items that look like these. The lesson after that.

Hybrids combine them, and most production systems are hybrids.

## The cold-start problem

Collaborative methods need history. A brand-new user has no row of clicks; a brand-new item has no column. That is **cold start**, and it is the classic weakness of collaborative filtering. Content-based methods handle new items well (a description is enough), and popularity is the usual fallback for new users, which is exactly what the `new user` line above did.

## Recap

A recommender starts with a user-item matrix built from explicit or implicit interactions, and its job is to score the empty cells. Popularity is the simple, non-personalized baseline. Collaborative filtering and content-based methods personalize, each with its own strengths and cold-start behavior. Next up: collaborative filtering, built from scratch with cosine similarity.
