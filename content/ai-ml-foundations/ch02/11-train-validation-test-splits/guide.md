# Lesson 11 — Train/Validation/Test Splits

**Chapter 2 · Core ML Concepts · Lesson 11 of 30**

## What you'll learn

- Why one dataset needs to become (at least) two or three separate pieces
- What each of train, validation, and test is actually for
- What cross-validation is, and why it uses the data more efficiently
- The one rule that, if broken, invalidates everything you measured

## Why one dataset isn't enough

Lesson 4 established that you can't trust training performance alone — an overfit model can ace the data it trained on while failing on anything new. That means you need at least one slice of data the model never trains on, held back purely to check its work. In practice, serious ML work usually splits data into three pieces, not two, each with a distinct job:

- **Train set** — what the model actually learns from.
- **Validation set** — used *during development* to compare models, tune hyperparameters, and decide when to stop training. You look at this a lot, and that's exactly the problem (more below).
- **Test set** — touched only once, at the very end, to report a final, honest number. You do not use it to make any decisions.

## Why validation and test can't be the same set

Here's the part that's easy to miss: if you repeatedly check performance on a set and use that feedback to pick a model, tune settings, or decide when to stop — the model never directly trained on that data, but you, the human, trained your decisions on it. Information has leaked in through your choices, not the model's gradient updates. That's why a true test set has to be set aside and checked only once, at the very end, after every decision has already been made using the validation set alone.

```
Train (60%)        -> model learns here
Validation (20%)   -> you compare/tune/decide here, repeatedly
Test (20%)         -> touched ONCE, for the final honest number
```

## Cross-validation: a more data-efficient version of the same idea

With a small dataset, carving out a fixed validation slice wastes data the model could have trained on. **Cross-validation** fixes this: split the training data into several equal folds, and run several rounds where each fold takes a turn as validation while the rest are used for training, then average the results.

![A horizontal bar chart titled 'GroupKFold' with four rows labeled CV iteration 0 through 3, each a long bar of blue ('Training set') with a block of orange ('Testing set') in a different position along the bar, plus a 'class' row and a 'group' row below showing how samples are labeled and grouped — demonstrating that each iteration holds out a different slice as the test fold while training on the rest.](/courses/ai-ml-foundations/ch02/11-train-validation-test-splits/groupkfold-splits.png)

This is a genuine scikit-learn figure for `GroupKFold`, a cross-validation variant that also makes sure samples from the same group (for example, the same patient, or the same customer) never end up split across both the training and testing portions of the same fold — a safeguard directly related to the next lesson's topic, data leakage. Across the four iterations, every sample gets a turn in the held-out (orange) portion exactly once, and the final reported score is the average across all four rounds — a more robust estimate than any single split, because it isn't sensitive to exactly which rows happened to land in one particular validation slice.

## The one rule that invalidates everything

Whatever splitting strategy you use, the test set (or, within cross-validation, each fold's held-out portion) must never influence training or decision-making in any way — not for choosing features, not for picking hyperparameters, not even for deciding when to stop. The moment it does, your "honest" final number stops being honest, even if the mistake was subtle. This exact failure mode — information from outside the proper training data leaking into evaluation — is common enough, and serious enough, to get its own lesson: Lesson 16, data leakage.

## Recap

A single dataset needs to be split into at least a train set (to learn from) and a held-out set (to check work on), and serious workflows use three: train, validation (for ongoing decisions), and test (touched once, at the end). Cross-validation rotates which fold plays validation across several rounds, averaging the result for a more robust, data-efficient estimate. In every case, the held-out portion must never influence training decisions, or the resulting number stops being trustworthy. Next, Chapter 3 turns to the data itself, starting with cleaning it for ML.
