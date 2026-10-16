# ML Model Selection Quick Reference

A side-by-side comparison of the four model families covered in Chapter 2, so you can decide
which one to reach for first on a new problem without re-reading five lessons. Start with the
simplest model that could plausibly work — every model below is genuinely still used in
production, not a stepping stone to "the real model."

| | Linear Regression | Classification (Logistic Regression) | Decision Trees & Ensembles | Neural Networks |
|---|---|---|---|---|
| **Predicts** | A continuous number (price, temperature) | A category (spam/not spam, malignant/benign) | Either, depending on the algorithm | Either, depending on architecture |
| **How it decides** | Fits a straight line/hyperplane minimizing squared error | Fits a decision boundary via a probability curve | Asks a sequence of single-feature yes/no questions | Layers of weighted connections, trained via backpropagation |
| **Decision boundary shape** | A straight line/plane | A straight line/plane (logistic regression specifically) | Boxy, rectangular regions | Can be any shape, given enough layers/data |
| **Training speed** | Very fast — closed-form solution | Fast — convex optimization | Fast for one tree; ensembles slower | Slow — needs many epochs and more data |
| **Interpretability** | High — two numbers per feature (weight, bias) | High — coefficients show direction and magnitude per feature | High for one tree (readable rules); low for ensembles | Low — weights don't map to a human-readable rule |
| **Overfitting risk** | Low (too simple to overfit easily) | Low–moderate | High for a single unconstrained tree; much lower for ensembles | High without enough data/regularization |
| **Needs feature scaling?** | Helps, not required | Helps, not required | No — splits are threshold-based regardless of scale | Yes — required for stable training |
| **Data volume needed** | Works with small datasets | Works with small datasets | Works with small-to-medium datasets | Needs substantially more data to be worth the complexity |
| **Reach for it when** | The relationship is genuinely close to linear and you need something fast and explainable | You need a probability or category with an explainable "why" | You want strong accuracy and can give up single-tree readability (ensembles), or you want a fully human-readable rule (single tree) | The pattern is too complex for the above, and you have the data and compute to justify it |

## Minimal code pattern for each (scikit-learn)

```python
# Linear Regression
from sklearn.linear_model import LinearRegression
model = LinearRegression().fit(X_train, y_train)

# Classification (Logistic Regression)
from sklearn.linear_model import LogisticRegression
model = LogisticRegression(max_iter=5000).fit(X_train_scaled, y_train)

# Decision Tree / Random Forest
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
tree_model = DecisionTreeClassifier().fit(X_train, y_train)
forest_model = RandomForestClassifier(n_estimators=200).fit(X_train, y_train)

# Neural Network (conceptual shape — Chapter 4)
# built from layers + activation functions, trained via gradient descent
# over many epochs; not a one-line .fit() call at the architecture level.
```

## The decision in one paragraph

Start with linear regression or logistic regression as your baseline — they train in seconds,
tell you directly which features matter and in which direction, and are hard to overfit. If the
baseline's train/test gap (see the Evaluation Metrics cheat sheet) shows underfitting — both
scores mediocre — the relationship probably isn't linear, and a decision tree or ensemble is the
next step up in flexibility. Reach for a neural network only once you have enough data to
justify it and a simpler model has genuinely hit a ceiling, not by default because it sounds more
advanced. A model you can explain to the person who has to act on its prediction is worth more
in most business settings than a marginally more accurate one you can't.

## Related resources

- `evaluation-metrics-and-model-diagnosis-cheat-sheet.md` — for diagnosing underfitting/overfitting on whichever model you pick here.
