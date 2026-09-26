# Content-Based Recommendation

Collaborative filtering needs a history of clicks. But what about a product that launched this morning and nobody has clicked yet? Content-based recommendation solves that by looking at what an item *is*: its description, category, or attributes. The logic is simple: if you liked items that look like these, you will probably like other items that look like these. You already know the tool for turning text into numbers, TF-IDF, so this lesson applies it to a catalog.

## What you'll learn

- How to describe items as TF-IDF vectors built from their text
- How to build a user profile from the items a user clicked
- How to score and rank items by cosine similarity to the profile
- Why content-based methods handle new items, and where they fall short

## The catalog

We attach a short text description to each of the 30 items in the click matrix from the previous lessons. The descriptions are invented for this lesson: items 0 to 14 are home-office products and items 15 to 29 are outdoor and camping gear, mirroring the two taste groups we built into the click data.

```python
descriptions = [
    "ergonomic office chair with lumbar support and adjustable arms",
    "standing desk with electric height adjustment and cable tray",
    "wireless ergonomic mouse with quiet clicks and long battery",
    # ... 12 more home-office items (3 to 14)
    "two person camping tent waterproof with easy setup",
    "lightweight sleeping bag warm for cold camping nights",
    # ... 13 more outdoor items (17 to 29)
]
```

One caution up front: because *we* wrote these descriptions to line up with the groups, the results below look cleaner than real product text would. Real descriptions are messier and less consistent.

## Step 1: item vectors

```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

tfidf = TfidfVectorizer(stop_words="english")
X_items = tfidf.fit_transform(descriptions)
print(X_items.shape)

item_sim = cosine_similarity(X_items)
np.fill_diagonal(item_sim, 0)
print("like item 0:", np.argsort(-item_sim[0])[:5])
```

The matrix has shape `(30, 112)`: 30 items and 112 distinct words. The five items with the most similar text to item 0 (the office chair) are:

```
like item 0: [10 23 12  6 14]
```

Items 10, 12, 6 and 14 are home-office products, which makes sense. Item 23 is a camping chair; it sneaks in because the two descriptions share the word "chair", and in a catalog this small one shared word is enough to matter. That is a real limitation of matching on words, not a bug in the code.

## Step 2: user profiles and scores

A user profile is the sum of the TF-IDF vectors of everything the user clicked. Multiply the click matrix by the item vectors, and each row of the result is one user's profile in word space. Then score every item by its cosine similarity to that profile.

```python
profiles = clicks @ X_items.toarray()      # users x words
scores = cosine_similarity(profiles, X_items)
scores = np.where(clicks == 1, -np.inf, scores)
top5 = np.argsort(-scores, axis=1)[:, :5]

print("user 0 seen:", np.flatnonzero(clicks[0]))
print("user 0 recs:", top5[0])

terms = tfidf.get_feature_names_out()
top_terms = terms[np.argsort(-profiles[0])[:3]]
print("profile:", ", ".join(top_terms))
```

```
user 0 seen: [ 1  4  8  9 10 14 17]
user 0 recs: [11 13  0  5  2]
profile: desk, adjustable, ergonomic
```

User 0's profile is dominated by "desk", "adjustable", and "ergonomic", so the recommendations are office items they have not clicked yet. Unlike a black-box factorization, you can also *explain* the result: "recommended because you looked at desk and ergonomic products."

## The cold-start win

Here is what collaborative filtering could not do. Add a brand-new item with no clicks at all, and score it for two users:

```python
new = tfidf.transform(
    ["ergonomic vertical mouse with adjustable dpi"])
for u in (0, 40):
    s = cosine_similarity(profiles[[u]], new)[0, 0]
    print("new item, user", u, round(s, 2))
```

```
new item, user 0 0.4
new item, user 40 0.08
```

The new mouse scores 0.4 for user 0 (an office shopper) and only 0.08 for user 40, whose clicks lean toward outdoor gear, without a single click on the new item. Words the vectorizer never saw during fitting, such as "vertical" and "dpi", are simply ignored by `transform`.

## Limitations

- **Filter bubble.** The model only finds more of what the user already liked. It rarely surprises anyone.
- **Only as good as the item data.** Thin, inconsistent, or keyword-stuffed descriptions produce weak recommendations, and words shared across categories cause mistakes like the camping chair.
- **No sense of quality or popularity.** Two items with similar text score equally even if one is far better loved.
- **New users still need some history** to build a profile.

Production systems usually build **hybrids**: content-based scores for new items, collaborative scores where there is history, blended together.

## Recap

Content-based recommendation represents items as TF-IDF vectors, users as the sum of the items they clicked, and ranks by cosine similarity. It works for brand-new items and can explain itself, but it stays inside the user's existing tastes and depends on good item data. You now have popularity, collaborative, and content-based recommenders, and one question remains: which is actually better? That is the next lesson.
