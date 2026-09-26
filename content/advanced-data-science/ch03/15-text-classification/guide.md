# Text Classification

Support teams, spam filters, content moderators and legal-discovery tools all do the same thing: read a piece of text and assign it a label. In the last two lessons you cleaned text and turned it into TF-IDF vectors. Now we close the loop by training a classifier on those vectors, evaluating it honestly, and looking inside to see what it learned.

## What you'll learn

- How to build a text classifier as a single scikit-learn `Pipeline`
- Why a stratified split and a baseline come before any accuracy number
- How cross-validation exposes the noise in a small test set
- How to read a linear model's coefficients as "which words matter"
- What small corpora do to your conclusions

## The task: three ticket queues

Our data is 60 short, hand-written, illustrative support tickets, 20 each labeled `billing`, `bug` and `howto`. Real ticket sets are far larger and messier; this one is small enough to run in a second and read in full, which makes the mechanics visible. `tickets` is a list of `(text, label)` pairs such as `("I was charged twice for my subscription this month", "billing")`.

```python
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

texts = [t for t, _ in tickets]
labels = [l for _, l in tickets]

X_tr, X_te, y_tr, y_te = train_test_split(
    texts, labels, test_size=0.25,
    stratify=labels, random_state=42)

model = make_pipeline(TfidfVectorizer(),
    LogisticRegression(max_iter=1000))
model.fit(X_tr, y_tr)
```

`stratify=labels` keeps the three classes balanced in both splits. The pipeline bundles the vectorizer with the classifier, so when you call `fit` the vocabulary and IDF weights are learned from training text only, and when you call `predict` the same steps are applied to new text. That single object also prevents the leakage mistake from the previous lesson.

## Evaluate against a baseline

```python
print(model.score(X_te, y_te))   # 0.667
```

Two-thirds correct sounds mediocre until you compare it with `DummyClassifier(strategy="most_frequent")`, which scores 0.333 here because the classes are balanced. So the model has learned something. The per-class report shows where it struggles:

```
         precision  recall
billing       0.57    0.80
bug           0.67    0.40
howto         0.80    0.80
```

Bug tickets have the lowest recall: two of the five test bugs were routed to billing. But notice the test set holds only 15 tickets, five per class. One ticket changes accuracy by nearly seven points, so treat these numbers as anecdotes.

## Cross-validation for a steadier estimate

```python
from sklearn.model_selection import StratifiedKFold, cross_val_score

cv = StratifiedKFold(5, shuffle=True, random_state=42)
scores = cross_val_score(model, texts, labels, cv=cv)
print(scores.round(2), scores.mean().round(2))
# [0.75 0.83 0.83 0.67 0.83] 0.78
```

Five folds, five scores, ranging from 0.67 to 0.83. That spread is the real message: with 60 examples you cannot distinguish a 0.78 model from a 0.82 one. We also tried a few variations under the same folds. Adding `stop_words="english"` dropped the mean to 0.70; raising the regularization strength setting `C` to 10 lifted it to 0.80. Both differences are within the noise, so on data this small they would not justify a decision, though the stop-word result is a reminder that removing words is not automatically an improvement.

## Reading the model

A linear model gives each word a coefficient per class. Plotting the top six for each class:

```python
import numpy as np
import matplotlib.pyplot as plt

fn = model[0].get_feature_names_out()
coef = model[1].coef_
fig, axes = plt.subplots(1, 3, figsize=(11, 4))
for i, ax in enumerate(axes):
    top = np.argsort(coef[i])[-6:]
    ax.barh(fn[top], coef[i][top])
    ax.set_title(model.classes_[i])
plt.tight_layout()
plt.savefig("top_words.png", dpi=150)
```

Some words are sensible: `invoice`, `card` and `refund` for billing, `error` and `fails` for bug. Others expose how tiny data misleads. `my` is the strongest billing word, only because 15 of our 20 billing tickets happen to say "my invoice", "my card" or "my payment" (against 6 how-to and 3 bug tickets). `how`, `can` and `do` mark the how-to queue. Question words are genuine signal for "howto", which is why removing stop words hurt in our comparison. Inspecting coefficients like this is one of the fastest ways to catch a model that is learning quirks of a sample rather than the concept.

Finally, prediction on new text is just `model.predict(["I was billed twice and want my money back"])`, which returns `billing`. Use `predict_proba` too: for that ticket the top probability is only about 0.53. With so little training data, the model's confidence is low even when it is right.

## Recap

- Wrap vectorizer and classifier in a `Pipeline`; split first, stratified.
- Compare against a majority-class baseline before celebrating.
- Cross-validate: a single small test set gives noisy scores.
- Read the coefficients to see whether the model learned concepts or quirks.
- With 60 examples, treat every number as illustrative; real projects need far more labeled text.

Next lesson: sentiment analysis, where negation and tone make the words harder to count.
