# Collaborative Filtering

Collaborative filtering is the idea behind "people like you also liked...". It ignores what items *are* and looks only at who interacted with what. If two users clicked many of the same items, they probably share taste, so what one liked is a good candidate for the other. In this lesson you implement it three ways on the illustrative click matrix from the previous lesson: user-based, item-based, and matrix factorization.

## What you'll learn

- How cosine similarity measures how alike two users or two items are
- How to build user-based and item-based collaborative filters in a few lines of numpy
- How matrix factorization with `TruncatedSVD` compresses tastes into a few latent factors
- The main limitations: cold start, sparsity, and popularity bias

## Setup: the same click matrix

We reuse the dataset from the last lesson: 60 users, 30 items, and a 1 where the user clicked. Users 0 to 29 lean toward items 0 to 14, users 30 to 59 lean toward items 15 to 29, and all users share a popularity effect.

```python
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.decomposition import TruncatedSVD

rng = np.random.default_rng(42)
n_users, n_items = 60, 30
taste = np.zeros((n_users, n_items))
taste[:30, :15] = 0.45
taste[30:, 15:] = 0.45
pop = np.linspace(0.25, 0.02, n_items)
prob = np.clip(taste + pop, 0, 1)
clicks = (rng.random((n_users, n_items)) < prob).astype(int)

def top_k(scores, k=5):
    scores = np.where(clicks == 1, -np.inf, scores)
    return np.argsort(-scores, axis=1)[:, :k]
```

`top_k` ranks the highest-scoring items per user and, as before, excludes items the user already clicked.

## Cosine similarity

Treat each item as a column of 60 zeros and ones. Two items are similar if the *same users* clicked them. Cosine similarity measures the angle between the two columns: 1 means they point the same way, 0 means no overlap at all.

## Item-based collaborative filtering

```python
item_sim = cosine_similarity(clicks.T)   # 30 x 30
np.fill_diagonal(item_sim, 0)            # ignore self-similarity
print("items like item 0:", np.argsort(-item_sim[0])[:5])
print("sim 0-1:", round(item_sim[0, 1], 2),
      " sim 0-20:", round(item_sim[0, 20], 2))

scores = clicks @ item_sim
print("user 0 seen:", np.flatnonzero(clicks[0]))
print("item-item recs:", top_k(scores)[0])
```

```
items like item 0: [ 2 11  7  5  8]
sim 0-1: 0.52  sim 0-20: 0.29
user 0 seen: [ 1  4  8  9 10 14 17]
item-item recs: [ 2 13  6  3  7]
```

Item 0 is more similar to item 1 (same taste group) than to item 20 (other group), which is the structure we built into the data. The line `clicks @ item_sim` is the whole recommender: each candidate item's score is the sum of its similarities to items the user already clicked. User 0's recommendations all come from the group 0 to 14 catalog area.

## User-based collaborative filtering

Flip the perspective: find similar *users* and borrow their clicks.

```python
user_sim = cosine_similarity(clicks)     # 60 x 60
np.fill_diagonal(user_sim, 0)
print("user-user recs:", top_k(user_sim @ clicks)[0])
```

```
user-user recs: [2 3 7 0 6]
```

Both methods produce plausible lists that overlap heavily but are not identical. Item-based is often preferred in practice because item similarities tend to be more stable than user behavior and can be precomputed, but which works better depends on the data, so measure both (the last lesson of this chapter shows how).

## Matrix factorization with TruncatedSVD

Similarity methods compare raw columns. Matrix factorization instead compresses the matrix into a small number of *latent factors*, hidden dimensions that capture taste, and reconstructs the empty cells from them.

```python
svd = TruncatedSVD(n_components=2, random_state=0)
U = svd.fit_transform(clicks)            # users x 2
scores = U @ svd.components_             # rank-2 reconstruction
print("SVD recs:", top_k(scores)[0])
```

```
SVD recs: [2 3 7 5 6]
```

Each user is now described by just two numbers. Plotting them shows the two taste groups separating on their own:

```python
import matplotlib.pyplot as plt

group = np.arange(n_users) >= 30
fig, ax = plt.subplots(figsize=(6, 4))
ax.scatter(U[~group, 0], U[~group, 1], label="users 0-29")
ax.scatter(U[group, 0], U[group, 1], label="users 30-59")
ax.set_xlabel("latent factor 1")
ax.set_ylabel("latent factor 2")
ax.legend()
```

Two notes. `TruncatedSVD` does not center the data, which suits a click matrix full of zeros and works on sparse input. And two components is a deliberately tiny choice for a toy dataset; on real data the number of factors is a hyperparameter you tune.

Libraries such as `surprise` (aimed at explicit ratings) and `implicit` (aimed at implicit feedback) package more sophisticated factorization methods. They are worth exploring, but check their current documentation and maintenance status before relying on them; everything here uses only numpy and scikit-learn.

## Limitations

- **Cold start.** A new user or item has no clicks, so there is nothing to compare.
- **Sparsity.** Real matrices are mostly empty, so overlaps between users are thin and similarities are noisy.
- **Popularity bias.** Popular items co-occur with everything, so they tend to dominate the recommendations.
- **No content understanding.** The model has no idea *why* users clicked, only that they did.

## Recap

Collaborative filtering recommends from behavior alone. Cosine similarity powers user-based and item-based versions, and `TruncatedSVD` learns latent factors that compress the matrix. All three produced sensible lists on our illustrative data, but none can handle a brand-new item. That gap is exactly what content-based recommendation fills, in the next lesson.
