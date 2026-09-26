# When Neural Networks Beat Classical ML

You now understand how a neural network works and how to keep it from overfitting. The practical question is when to reach for one. The honest answer surprises many newcomers: **on ordinary tabular data (the rows and columns most business analytics runs on), gradient-boosted trees usually match or beat neural networks, with less tuning.** Neural networks earn their place elsewhere. This lesson gives you a decision framework and a small experiment you can run yourself, so the advice is something you have seen rather than something you have been told.

## What you'll learn

- Where neural networks clearly win, and where classical ML holds its own
- How to run a fair head-to-head comparison in scikit-learn
- Why data structure (thresholds versus smooth, rotated patterns) tips the balance
- A short checklist for choosing between the two

## A fair comparison

We compare three models with 5-fold cross-validation and the same preprocessing rules: a **logistic regression** baseline, **gradient boosting** (`HistGradientBoostingClassifier`, scikit-learn's fast histogram-based version), and an **MLP** with two hidden layers of 64 neurons (standardized inputs, since networks are sensitive to feature scale). Four datasets:

- **cancer**: scikit-learn's real breast-cancer data, 569 rows, 30 numeric features
- **churn-style**: illustrative synthetic customer data (tenure, monthly charge, support tickets, contract type, plus 8 irrelevant noise columns), where churn follows threshold rules and an interaction
- **smooth/rotated**: illustrative synthetic data where the label depends smoothly on a weighted combination of 20 features
- **digits**: scikit-learn's real 8-by-8 handwritten-digit pixel images, 1,797 rows

Be clear-eyed about the two synthetic sets: **we wrote the rules that generated them**, so each is built to favor one kind of model. They illustrate mechanisms; they are not a verdict on real-world data.

```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_breast_cancer, load_digits
from sklearn.ensemble import HistGradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score
from sklearn.neural_network import MLPClassifier
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

rng = np.random.default_rng(0)

# A) illustrative tabular "churn" data: thresholds, an interaction, noise columns
n = 3000
tenure = rng.integers(1, 72, n)
monthly = rng.uniform(20, 120, n)
tickets = rng.poisson(1.5, n)
contract = rng.integers(0, 3, n)                # 0 monthly, 1 yearly, 2 two-year
noise = rng.normal(size=(n, 8))                 # irrelevant columns
risk = (1.2 * (tenure < 12) + 1.0 * (tickets >= 3)
        + 1.5 * ((monthly > 80) & (contract == 0)) - 1.0 * (contract == 2))
churn = (risk + rng.normal(scale=0.7, size=n) > 1.0).astype(int)
X_churn = np.column_stack([tenure, monthly, tickets, contract, noise])

# B) illustrative "smooth" data: the label depends on a rotated direction
X_smooth = rng.normal(size=(n, 20))
w = rng.normal(size=20)
y_smooth = (np.sin(X_smooth @ w / 2) + rng.normal(scale=0.15, size=n) > 0).astype(int)

datasets = {
    "cancer (real)": load_breast_cancer(return_X_y=True),
    "churn-style (synthetic)": (X_churn, churn),
    "smooth/rotated (synthetic)": (X_smooth, y_smooth),
    "digits pixels (real)": load_digits(return_X_y=True),
}
models = {
    "logistic": make_pipeline(StandardScaler(), LogisticRegression(max_iter=2000)),
    "boosting": HistGradientBoostingClassifier(random_state=0),
    "MLP": make_pipeline(StandardScaler(), MLPClassifier(
        (64, 64), max_iter=500, random_state=0)),
}
results = {}
print(f"{'dataset':28s}" + "".join(f"{k:>10s}" for k in models))
for name, (X, y) in datasets.items():
    results[name] = [cross_val_score(m, X, y, cv=5).mean() for m in models.values()]
    print(f"{name:28s}" + "".join(f"{r:10.3f}" for r in results[name]), flush=True)
```

Our output (mean 5-fold accuracy):

```
dataset                       logistic  boosting       MLP
cancer (real)                    0.981     0.967     0.975
churn-style (synthetic)          0.811     0.850     0.799
smooth/rotated (synthetic)       0.701     0.600     0.880
digits pixels (real)             0.920     0.935     0.935
```

The chart below is drawn from the `results` dictionary:

```python
fig, ax = plt.subplots(figsize=(10, 4))
width = 0.25
for i, model_name in enumerate(models):
    ax.bar(np.arange(len(results)) + i * width,
           [r[i] for r in results.values()], width, label=model_name)
ax.set_xticks(np.arange(len(results)) + width)
ax.set_xticklabels(results.keys(), fontsize=8)
ax.set_ylabel("5-fold accuracy")
ax.set_ylim(0.5, 1.0)
ax.legend()
plt.tight_layout()
plt.savefig("nn_vs_boosting.png", dpi=150)
```

Read the table carefully, row by row.

- **cancer**: with only 569 rows the plain logistic regression wins; both flexible models are slightly behind. Small data rarely rewards a big model.
- **churn-style**: boosting wins (0.850), the MLP is last. Trees split naturally on thresholds like "tenure under 12 months" and "3 or more tickets", and they are not distracted by the 8 noise columns.
- **smooth/rotated**: the pattern depends on a *combination* of all 20 features, and the network wins by a wide margin (0.880 versus 0.600 for boosting). Trees can only cut along one feature at a time, so a diagonal, curved boundary is expensive for them. This is the kind of structure where a network's learned features pay off.
- **digits**: a tie between boosting and the MLP (0.935). This is raw pixel data at tiny scale. Real image problems are where neural networks (specifically convolutional networks and transformers, not run here) pull far ahead, but they need much more data than 1,797 images.

## What the research says

This is not just our toy: the 2022 NeurIPS paper "Why do tree-based models still outperform deep learning on typical tabular data?" (Grinsztajn, Oyallon and Varoquaux) benchmarked many models on 45 tabular datasets and found tree-based models remained state of the art on medium-sized data (around 10,000 samples). It attributed this partly to trees handling irregular, non-smooth targets better, and to neural networks being hurt more by uninformative features, both of which our two synthetic sets echo. Tabular deep learning is an active research area, so treat this as a strong default, not a law.

## Where neural networks clearly win

- **Unstructured data**: images, audio, video, and free text, where there are no hand-made columns and the model must learn features itself.
- **Sequences and language**: the Transformers coming up in the next lessons.
- **Very large datasets** with complex structure, where more capacity keeps paying off.
- **Transfer learning**: start from a network pretrained on huge data and adapt it, instead of training from scratch.
- **Multi-modal or multi-output problems**, and embeddings for search and recommendations.

## A decision checklist

1. Always fit a simple baseline first (logistic or linear regression).
2. For tabular data, try gradient boosting next: it is fast and needs little tuning.
3. Try a network only if the data is unstructured, very large, or you have evidence of smooth, high-dimensional structure.
4. Weigh the costs: networks need feature scaling, more tuning, more compute, and are harder to explain.
5. Decide by cross-validated results on your data, not by fashion.

## Recap

- Boosted trees are the strong default for tabular data; networks win on unstructured data, sequences, and scale.
- Data structure decides: thresholds and noise columns favor trees, smooth combinations favor networks.
- Next: how sequence models and attention led to the Transformer.
