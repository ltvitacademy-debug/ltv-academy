# Script — Capstone: A Simple Classification Project

## Segment 1 (title)

Lesson 27 loaded the data. This lesson is where the real work happens: split it correctly, scale it correctly, train a baseline model, and run it on data it's never seen. Four steps, real code, real numbers.

## Segment 2 (code)

Five hundred sixty-nine samples split into four hundred fifty-five for training, one hundred fourteen held back for testing. Stratify keeps the same benign-to-malignant ratio in both pieces, so the split doesn't accidentally dump most of one class into the test set.

## Segment 3 (code)

The scaler gets fit on the training data only, then applied to both splits. This matters: fitting it on everything before splitting would let the test set leak information into training — the exact mistake this course named back in chapter three.

## Segment 4 (code)

Training the baseline is two lines: create a LogisticRegression, call fit with the scaled training data and the labels. Same fit-the-model pattern this chapter has used since lesson 23 — just training from scratch instead of loading pretrained weights.

## Segment 5 (code)

Predict runs all one hundred fourteen held-out rows through the trained model. Here are the first ten true labels next to the first ten predictions — they match. A promising sign, not a final verdict. Lesson 29 checks all one hundred fourteen, properly.

## Segment 6 (outro)

Next lesson scores every one of those predictions honestly: accuracy, the full confusion matrix, and precision and recall for both classes — not just the number that looks best.
