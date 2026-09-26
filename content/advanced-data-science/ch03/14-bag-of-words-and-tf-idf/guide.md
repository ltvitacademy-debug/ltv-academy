# Bag-of-Words & TF-IDF

Last lesson we turned raw strings into clean tokens. A model still cannot read tokens; it needs a table of numbers with one row per example and one column per feature. This lesson builds that table two ways: **bag-of-words**, which counts, and **TF-IDF**, which counts and then weighs each word by how informative it is. Together they power search engines, spam filters and most classic text classifiers.

## What you'll learn

- How bag-of-words turns documents into a sparse count matrix
- Why word order is lost, and how n-grams recover a little of it
- What TF-IDF adds and how to read its weights
- How to compare documents with cosine similarity
- The one rule that prevents leakage: fit on training data only

## Bag-of-words with CountVectorizer

The idea: collect every distinct word (the **vocabulary**), give each its own column, and count how often it appears in each document. Order is thrown away, as if the words were shaken loose in a bag.

Four tiny illustrative reviews:

```python
import pandas as pd
from sklearn.feature_extraction.text import (
    CountVectorizer, TfidfVectorizer)

docs = ["battery lasts all day",
        "battery died after one day",
        "screen is bright and sharp",
        "screen cracked after one day"]

cv = CountVectorizer()
X = cv.fit_transform(docs)
print(X.shape)     # (4, 13)
```

Four documents, thirteen distinct words. Here are four of the thirteen columns:

```python
df = pd.DataFrame(X.toarray(), columns=cv.get_feature_names_out())
print(df[["battery", "day", "died", "screen"]])
```

```
   battery  day  died  screen
0        1    1     0       0
1        1    1     1       0
2        0    0     0       1
3        0    1     0       1
```

Two details matter. First, `X` is a **sparse matrix**: it stores only the non-zero cells, which is essential because a real vocabulary has tens of thousands of columns and any one document uses a tiny fraction. Even here, 63% of the cells are zero. Second, we call `fit_transform` on the corpus: `fit` learns the vocabulary, `transform` produces the counts.

Bag-of-words cannot tell "dog bites man" from "man bites dog". Setting `ngram_range=(1, 2)` adds two-word phrases as features, so "not good" becomes its own column; the cost is a much larger vocabulary.

## TF-IDF: not all words are equal

A raw count treats every word alike. But a word that appears in nearly every document says little about any one of them. TF-IDF multiplies two ideas: **term frequency** (how often the word appears in this document) and **inverse document frequency** (how rare the word is across the corpus). Rare-but-present words get the biggest weights.

```python
tf = TfidfVectorizer()
T = tf.fit_transform(docs)
```

scikit-learn's smoothed IDF on our corpus comes out as:

```
day      1.22   (appears in 3 of 4 documents)
battery  1.51   (2 of 4)
died     1.92   (1 of 4)
```

So in the second review, "died" outweighs "day". By default each row is also scaled to length 1, which stops long documents from dominating short ones. Exact formulas differ between textbooks and libraries; scikit-learn's is documented, so check it before comparing with other tools.

## Finding similar documents

Because each document is now a vector, we can measure how alike two are with **cosine similarity**, which compares the direction of the vectors:

```python
from sklearn.metrics.pairwise import cosine_similarity

q = tf.transform(["the battery died"])
print(cosine_similarity(q, T).round(2))
# [[0.28 0.7  0.   0.  ]]
```

The new sentence is closest to review 1 ("battery died after one day"). Words never seen during fitting, like "the", are silently ignored.

## Controlling the vocabulary

- `min_df=2` drops words that appear in fewer than two documents; on our corpus it leaves five words: after, battery, day, one, screen.
- `max_features=5000` keeps only the most frequent words.
- `ngram_range=(1, 2)` adds phrases.
- **Always fit the vectorizer on training data only**, then `transform` the test set. Fitting on everything leaks test vocabulary and document frequencies into training.

Remember the limits of a four-review corpus: these numbers illustrate the mechanics, not what a real corpus looks like.

## Recap

- Bag-of-words turns each document into a row of word counts in a sparse matrix.
- TF-IDF down-weights words that appear everywhere and up-weights distinctive ones.
- Cosine similarity compares document vectors.
- Prune the vocabulary with `min_df`, `max_features` and n-grams, and fit on training data only.

Next lesson: feeding these features to a classifier.
