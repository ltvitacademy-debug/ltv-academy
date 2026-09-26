# Statistics & Machine Learning Interview Questions

Statistics and machine learning rounds test judgment more than memorization. Interviewers want to hear you reason: state the idea, give a concrete example, and name a limit. Below are eleven questions that commonly appear in some form, with model answers grounded in the Harvest Table churn project. Treat them as a practice set, not a prediction, and rewrite each answer in your own words. Every numeric result shown was produced by running the code; figures are illustrative.

## What you'll learn

- Model answers for bias and variance, p-values, precision and recall, leakage, imbalance, regularization and A/B pitfalls
- Small experiments that make each idea concrete
- A structure for answering: idea, example, caveat

## 1. Explain the bias-variance trade-off

Bias is error from a model too simple to capture the pattern; variance is error from a model so flexible it fits noise. A too-simple model does poorly on both training and test data. A too-flexible one does great on training data and worse on new data. On a noisy synthetic dataset:

```python
for depth in [1, 3, None]:
    m = DecisionTreeClassifier(max_depth=depth, random_state=0)
    m.fit(Xtr, ytr)
    print(depth, round(m.score(Xtr, ytr), 3),
          round(m.score(Xte, yte), 3))
```

Output: `1 0.593 0.55`, `3 0.757 0.71`, `None 1.0 0.63`. Depth 1 underfits (high bias); the unlimited tree memorizes training data (1.0) but drops to 0.63 on test (high variance). Depth 3 balances the two. Mention that you choose complexity with cross-validation.

## 2. What is a p-value?

It is the probability of seeing a result at least as extreme as the one observed, assuming the null hypothesis is true. It is not the probability that the null is true, and not the size of the effect. A small p-value says the data would be surprising under "no effect"; it says nothing about whether the effect is large or valuable. Report effect size and a confidence interval alongside it.

## 3. Precision versus recall: which matters?

Precision is the share of flagged customers who really cancel; recall is the share of all cancellers you flag. Suppose 100 customers will cancel. Flagging 100 and catching 60 gives precision 0.60 and recall 0.60. Loosening the threshold to flag 300 and catch 80 gives precision about 0.27 and recall 0.80. Which is better depends on cost: a cheap retention email favors recall; an expensive discount call favors precision. Always tie the answer to the business cost.

## 4. What is data leakage? Give an example

Leakage is when information unavailable at prediction time influences training or evaluation. Common cases: a feature created after the outcome, or preprocessing (scaling, feature selection, imputation) fitted on all data before splitting. Here, selecting features on pure noise before cross-validation looks impressive:

```python
Xs = SelectKBest(f_classif, k=20).fit_transform(X, y)
cross_val_score(lr, Xs, y, cv=5).mean()   # leaky
pipe = make_pipeline(SelectKBest(f_classif, k=20), lr)
cross_val_score(pipe, X, y, cv=5).mean()  # proper
```

Random labels should score about 0.5. The leaky version printed 0.83; the pipeline version printed 0.49. The fix is to fit every step inside the cross-validation fold.

## 5. How do you handle class imbalance?

Say first that accuracy is misleading: with a 2% cancel rate, predicting "no cancel" for everyone scores 98%. Use precision, recall, PR-AUC, and stratified splits. Options include class weights, resampling, and choosing a threshold by cost. In a synthetic run with a 2% rate, plain logistic regression had accuracy 0.986, precision 0.833 and recall 0.40; with `class_weight="balanced"`, recall rose to 0.74 but precision fell to 0.128. Weighting moved the trade-off, it did not create information.

## 6. L1 versus L2 regularization

Both penalize large coefficients to reduce variance. L2 (ridge) shrinks coefficients toward zero; L1 (lasso) can set some exactly to zero, so it also selects features. On a regression with 20 features where 3 carry signal, lasso with alpha 5 kept 3 nonzero coefficients while ridge kept all 20. Scale features first, and choose the penalty strength by cross-validation.

## 7. What can go wrong in an A/B test?

Peeking, multiple comparisons, too small a sample, novelty effects, and unequal groups. Peeking is the classic one: in a simulation of an A/A test (no true difference) at a 5% significance level, stopping at the first "significant" result across five looks gave a false-positive rate of 14.2%, versus 5.1% with one planned look. Fix the sample size and duration in advance.

## 8. How large a sample do I need?

It depends on the baseline rate, the smallest effect worth detecting, the significance level and the power. To detect a rise from 10% to 11% with a 5% significance level and 80% power, the standard two-proportion formula gives about 14,700 per group. Small effects need large samples.

## 9. Why is running many tests a problem?

With 20 independent tests at 0.05, the chance of at least one false positive is 1 - 0.95^20, about 64%. Correct for it (Bonferroni or false discovery rate) or pre-register a primary metric.

## 10. How do you validate a churn model over time?

Use a time-based split: train on earlier periods, test on later ones, because random splits can leak future behavior and hide drift.

## 11. Random forest versus gradient boosting?

A random forest averages many deep trees trained independently on resampled data, mainly reducing variance. Gradient boosting builds shallow trees sequentially, each correcting the previous errors, and can be more accurate but is more sensitive to tuning and overfitting.

## Recap

Answer in three beats: the idea, a concrete example, a caveat. Connect metrics to business cost, guard against leakage, and be honest about uncertainty. Next, SQL and coding practice.
