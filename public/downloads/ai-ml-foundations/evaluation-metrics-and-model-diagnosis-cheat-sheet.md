# Evaluation Metrics & Model Diagnosis Cheat Sheet

A compiled, one-page reference pulling together the metrics and diagnosis signatures taught
across Chapters 1, 2, and the capstone of AI/ML Foundations. Keep this open while you're
evaluating any model — the question "is this actually good?" always comes back to one of the
tables below.

---

## 1. The confusion matrix, in plain terms

For a binary classifier (the shape the capstone's malignant/benign model uses):

| | Predicted Negative | Predicted Positive |
|---|---|---|
| **Actually Negative** | True Negative (TN) | False Positive (FP) |
| **Actually Positive** | False Negative (FN) | True Positive (TP) |

Two different kinds of mistake live in that matrix, and they are almost never equally costly:

- **False Positive** — the model raised a flag that wasn't real (a false alarm).
- **False Negative** — the model missed something real (a miss).

Before you evaluate any model, decide which of those two mistakes is worse for the problem
you're actually solving. In the capstone's cancer-screening context, a false negative (a missed
malignant case) is far worse than a false positive (an unnecessary follow-up test) — that
decision should come *before* you look at the numbers, not after, so the numbers don't quietly
talk you into accepting the worse mistake.

## 2. The four core metrics

| Metric | Formula | Answers |
|---|---|---|
| **Accuracy** | (TP + TN) / Total | What fraction did the model get right, overall? |
| **Precision** | TP / (TP + FP) | Of everything the model flagged positive, how much was actually positive? |
| **Recall** | TP / (TP + FN) | Of everything that was actually positive, how much did the model catch? |
| **F1 score** | 2 × (Precision × Recall) / (Precision + Recall) | A single number balancing precision and recall when neither alone tells the full story |

**Accuracy alone is dangerous on imbalanced data.** If 95% of a dataset is one class, a model
that always predicts that class scores 95% accuracy while catching zero of the minority class.
Always pair accuracy with precision/recall, or look at the confusion matrix directly.

**Which of precision or recall to prioritize** depends entirely on which mistake (FP or FN) is
worse for your problem — the same decision from the confusion matrix section above. High-recall
problems (don't miss a real case) tolerate more false positives; high-precision problems (don't
cry wolf) tolerate more missed cases.

## 3. Overfitting vs. underfitting — the diagnostic table

You cannot tell these apart from training performance alone. You need the train/test comparison:

| | Train score | Test score | Gap | Verdict |
|---|---|---|---|---|
| **Underfit** | Low | Low | Small | Model is too simple — use a more expressive model, add features, train longer |
| **Good fit** | High | High | Small | Keep it |
| **Overfit** | Very high | Mediocre/Low | Large | Model memorized training noise — simplify, regularize, get more data, or stop training earlier |

A large train/test gap is the single clearest signature of overfitting. Two mediocre, close
scores is the signature of underfitting. Always compute both numbers before drawing a conclusion
about either problem.

## 4. Train / validation / test — what each one is for, and the one rule

| Split | Typical size | Used for |
|---|---|---|
| Train | ~60% | The model learns from this directly |
| Validation | ~20% | You compare models, tune settings, and decide when to stop — repeatedly, during development |
| Test | ~20% | Touched exactly once, at the very end, for the honest final number |

**The one rule that invalidates everything if broken:** the test set (or, in cross-validation,
each fold's held-out portion) must never influence any training or tuning decision. The moment
it does — even indirectly, even just to "peek" — the final number stops being honest.

## 5. Data leakage — the one question that catches almost every case

For any feature, ask: *at the real moment you'd need to make this prediction, would you
genuinely have this piece of information yet?* If the answer is "no," it's leaking, regardless
of how clean the code looks. The four common shapes:

| Shape | Example |
|---|---|
| Target leakage | A feature that's really a disguised consequence of the label itself |
| Train/test contamination | Fitting a scaler, imputer, or encoder on the full dataset instead of the training split only |
| Temporal leakage | Using data from after the prediction point to predict something earlier |
| Group leakage | The same entity (patient, customer) has rows split across both train and test |

## 6. Reading the capstone's own numbers as a worked reference

From the Breast Cancer Wisconsin capstone's baseline `LogisticRegression` (114 test samples):

```
Accuracy: 0.982
Confusion matrix:
                 Predicted malignant   Predicted benign
Actually malignant        41                  1
Actually benign            1                 71

Precision (malignant): 0.976   Recall (malignant): 0.976
Precision (benign):    0.986   Recall (benign):    0.986
```

Even at 98.2% accuracy, there is exactly one missed malignant case and one false alarm — neither
disappears just because the headline number looks strong. Read every model's results this way:
the matrix first, the per-class rates second, accuracy last.
