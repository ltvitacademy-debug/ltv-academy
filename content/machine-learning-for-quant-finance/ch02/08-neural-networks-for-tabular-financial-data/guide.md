# Neural Networks for Tabular Financial Data

Deep learning dominates images, text, and audio, so it's natural to ask why this course waits until Lesson 8 to even mention it — and even then, treats it as an option rather than a default. The honest answer: for the kind of tabular, low-signal, modest-sized datasets that dominate quantitative finance, neural networks usually aren't the best tool, and understanding why is as important as knowing how to build one.

## What you'll learn

- Why deep learning's usual advantages (huge data, raw unstructured inputs, hierarchical feature learning) often don't apply to financial tabular data
- When neural networks genuinely help in finance: large alternative-data sets, or as part of an ensemble
- A simple `MLPRegressor` example from `sklearn.neural_network`
- Dropout and weight decay as the standard regularization tools for neural nets, paralleling what Ridge/Lasso do for linear models

## Why deep learning usually isn't the default here

Neural networks earn their reputation on problems with (a) huge amounts of training data, (b) raw, unstructured inputs like pixels or text tokens where the network can learn its own feature hierarchy, and (c) a genuinely strong underlying signal. Quantitative finance data typically has none of these in abundance: datasets are tabular (already feature-engineered, not raw pixels), the *effective* sample size is much smaller than the row count suggests once you account for the overlapping, non-IID labels from Lesson 4, and the signal is famously faint (Lesson 1). Gradient boosting (Lesson 7) tends to match or beat neural networks on exactly this kind of small, tabular, low-signal data, while being easier to tune and more resistant to overfitting out of the box.

## Where neural networks can actually help

Deep learning becomes genuinely competitive when the inputs are closer to its comfort zone — large alternative-data sets like satellite imagery, raw text from news or filings (previewed in Lesson 23), or very large tick-level datasets where sheer data volume compensates for low per-sample signal. It's also commonly used as one member of an ensemble (Lesson 9) rather than a standalone model, contributing a different error pattern than tree-based models.

## A simple MLP example

```python
from sklearn.neural_network import MLPRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline

mlp_model = make_pipeline(
    StandardScaler(),           # neural nets are sensitive to feature scale
    MLPRegressor(
        hidden_layer_sizes=(32, 16),
        activation="relu",
        alpha=0.01,              # L2 weight decay -- the main regularization knob here
        early_stopping=True,     # holds out validation data internally, stops when it plateaus
        max_iter=2000,
        random_state=0,
    )
)
mlp_model.fit(X_train, y_train)
```

`alpha` in `MLPRegressor` is an L2 weight-decay penalty, functioning much like Ridge's penalty in Lesson 5 — it discourages the network from growing large weights to fit noise. `early_stopping=True` reserves a slice of training data to monitor validation loss and halts before the network overfits, the neural-network analog of the boosting early stopping from Lesson 7.

## Dropout, for context

Dropout (randomly zeroing a fraction of neurons during training) is the other standard regularizer, more commonly available in dedicated deep learning frameworks like PyTorch or Keras than in `sklearn.neural_network`. Conceptually, it forces the network to not rely too heavily on any single neuron — a similar spirit to how random forests' feature subsampling (Lesson 6) forces diversity across trees. A minimal PyTorch sketch, for reference:

```python
import torch.nn as nn

model = nn.Sequential(
    nn.Linear(n_features, 32), nn.ReLU(), nn.Dropout(0.3),
    nn.Linear(32, 16), nn.ReLU(), nn.Dropout(0.3),
    nn.Linear(16, 1),
)
# weight_decay in the optimizer (e.g. torch.optim.Adam(model.parameters(), weight_decay=0.01))
# plays the same role as MLPRegressor's alpha above
```

## Key terms

| Term | Meaning |
|---|---|
| Effective sample size | The number of truly independent observations, smaller than row count under overlap |
| MLPRegressor | scikit-learn's basic feed-forward neural network for regression |
| Weight decay (alpha) | An L2 penalty on network weights, discouraging overfitting |
| Dropout | Randomly zeroing neurons during training to prevent over-reliance on any one |
| Alternative data | Large, often unstructured datasets (satellite, text, tick data) where deep learning fits better |

## Recap

Neural networks aren't the default tool in quantitative finance because tabular data, modest effective sample sizes, and faint signal play against their usual strengths — but they can genuinely help on large alternative-data sets or as one voice in an ensemble, and weight decay plus early stopping (or dropout, in frameworks that support it) keep them from overfitting when you do use them. Next up, Lesson 9: Combining & Ensembling Models, where we bring Ridge, trees, boosting, and neural nets together.
