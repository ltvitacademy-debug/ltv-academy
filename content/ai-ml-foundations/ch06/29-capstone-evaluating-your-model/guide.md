# Lesson 29 — Capstone: Evaluating Your Model

**Chapter 6 · Capstone · Lesson 29 of 30**

## What you'll learn

- Why a single accuracy number isn't enough, even a good one
- How to read a confusion matrix in terms of what actually happened
- Precision and recall, computed for both classes on real predictions
- Which of this model's mistakes would matter more in the real world
- What the trained model actually learned, from its own coefficients

## Accuracy — a start, not the finish

Lesson 28 produced 114 predictions. The simplest score is accuracy: the
fraction the model got right.

```
from sklearn.metrics import accuracy_score, confusion_matrix

acc = accuracy_score(y_test, y_pred)
cm = confusion_matrix(y_test, y_pred)
print(f"Accuracy: {acc:.3f}")
# Accuracy: 0.982
print(cm)
# [[41  1]
#  [ 1 71]]
```

98.2% sounds decisive, but lesson 27's second ground rule was no
cherry-picking — one number can't say *which* 2 of 114 predictions were
wrong, or whether both kinds of mistake cost the same. The confusion matrix
answers both.

## Reading the confusion matrix in human terms

`confusion_matrix` orders rows and columns by label — 0 (malignant) then 1
(benign) — so each cell has a concrete meaning:

| | Predicted malignant | Predicted benign |
|---|---|---|
| **Actually malignant** | 41 correct | **1 missed** |
| **Actually benign** | 1 false alarm | 71 correct |

Two kinds of mistake happened, and they are not equivalent. The single
false alarm (predicted malignant, actually benign) means one patient gets
an unnecessary follow-up test — unpleasant, but low-stakes. The single
missed case (predicted benign, actually malignant) means one real cancer
was told it was nothing — exactly the mistake evaluation metrics lesson 5
flagged as the one that matters most in a medical screening context. A
model that only reports 98.2% accuracy hides which kind of error it's
making; the confusion matrix doesn't.

## Precision and recall, for both classes

```
from sklearn.metrics import classification_report

print(classification_report(
    y_test, y_pred, target_names=data.target_names, digits=3))
```

```
              precision  recall  f1-score  support
   malignant      0.976   0.976     0.976       42
      benign      0.986   0.986     0.986       72
    accuracy                        0.982      114
```

For the malignant class, recall of 0.976 means the model caught 41 of the
42 true malignant cases in the test set (97.6%) — the same single miss the
confusion matrix already showed, just expressed as a rate instead of a
count. Precision of 0.976 for malignant means that of everything the model
*called* malignant, 97.6% actually was. Both numbers come from the same 114
predictions lesson 28 made; `classification_report` just presents them per
class instead of collapsed into one score.

## What the model actually learned

`LogisticRegression` is interpretable — its coefficients say how much each
feature pushes the prediction toward malignant or benign:

```
coefs = model.coef_[0]
# top 5 by absolute value:
# worst texture        -1.248
# radius error         -1.084
# worst area            -0.954
# worst concave points  -0.948
# worst radius          -0.945
```

Every one of the top 5 is negative, and in this encoding (0 = malignant,
1 = benign) a negative coefficient pushes toward malignant. In plain terms:
larger, more irregular tumor measurements — texture, area, radius, how
sharply the cell boundaries curve inward — push the model toward a
malignant prediction. That tracks with how pathologists actually describe
malignant tumors, which is a real (if informal) sanity check, not proof the
model is right.

## Recap

98.2% accuracy, from a confusion matrix of 41/1/1/71: one false alarm, one
missed malignant case — not equally costly mistakes, which is exactly why
accuracy alone isn't the full evaluation. Precision and recall per class
confirm the same picture with named rates instead of raw counts, and the
model's own coefficients show *why* it's making the calls it is. Lesson 30
wraps the whole capstone up: how to write this up, honestly, as a portfolio
piece.
