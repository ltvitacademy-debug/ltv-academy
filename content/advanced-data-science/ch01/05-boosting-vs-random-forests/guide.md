# Boosting vs. Random Forests

Random forests and gradient boosting are both ensembles of decision trees, and on tabular data they are the two most common "first serious models". People often say boosting is more accurate but fussier, and forests are safer but a bit weaker. Is that true? In this lesson we compare them on the illustrative churn table and let the numbers answer, including what happens when the training labels are noisy.

## What you'll learn

- How the two ensembles differ in construction: parallel averaging versus sequential correction
- What "variance reduction" and "bias reduction" mean here
- How to run a fair head-to-head comparison across several splits
- A practical rule for choosing between them

## Two ways to combine trees

**Random forest (bagging).** Grow many deep trees independently, each on a bootstrap sample of the rows and a random subset of features at each split, then average their predictions. Each tree is individually noisy and overfit, but the noise is different in each tree, so averaging cancels much of it. Bagging mainly reduces **variance**. Adding more trees never makes a forest worse in a meaningful way; it just settles down.

**Gradient boosting.** Grow small, shallow trees one after another. Each new tree is fitted to the errors the ensemble still makes, and its contribution is scaled by the learning rate. Boosting mainly reduces **bias**: it can build up complex patterns from simple pieces. But the trees are not independent, so adding more of them keeps fitting, and eventually it starts fitting noise.

## The experiment

We use the churn generator from Lesson 2 (6,000 customers, illustrative) with five different 75/25 train/test splits, and compare three models by test AUC:

```python
rf = RandomForestClassifier(
    n_estimators=300, min_samples_leaf=20,
    random_state=0, n_jobs=-1)

xg = xgb.XGBClassifier(
    n_estimators=58, learning_rate=0.1,
    max_depth=3, subsample=0.8,
    colsample_bytree=0.8, random_state=0)
```

A third model is XGBoost with library defaults. One practical note: in the scikit-learn version I ran (1.1), the forest cannot take missing values, so I filled `support_calls` gaps with the training median before fitting it. XGBoost accepted the blanks directly. Newer scikit-learn releases may handle this differently, so check the current docs.

For the second test, I randomly flipped 20% of the training labels (the test labels stay clean) to imitate a messy labeling process.

## Results

```
                  clean labels        20% training labels flipped
forest            0.828 (sd 0.006)    0.811
boost, defaults   0.797 (sd 0.008)    0.729
boost, tuned      0.835 (sd 0.006)    0.822
```

Numbers are mean test AUC over five splits. Three things stand out:

1. **Untuned boosting lost to the forest** by about 0.03 AUC. Library defaults (learning rate 0.3, depth 6, 100 trees in the version I ran) are aggressive for a table this small.
2. **Tuned boosting won, but modestly**: 0.835 versus 0.828, a gap of about one standard deviation across splits. A small edge, not a knockout. (One caveat: those tuned settings came from Lesson 4, where I tuned on one split's training rows, so treat this as a slightly favorable comparison for boosting.)
3. **Noisy labels hurt everything.** Untuned boosting was hit hardest, falling to 0.729. The tuned, shallow booster held up best at 0.822. The common claim that boosting always overfits noise is really a claim about deep, untuned boosting.

## Watching the trees accumulate

The chart in the video plots held-out AUC as trees are added, on one split, using this idea:

```python
p = np.array([t.predict_proba(X_va_filled.values)[:, 1]
              for t in rf.estimators_])
rf_curve = [roc_auc_score(y_va, p[:k].mean(axis=0))
            for k in range(1, 301)]
```

The forest curve rises quickly and then stays flat. The deep booster (learning rate 0.3, depth 6) peaks within about ten rounds and then declines, ending near 0.772. The shallow booster (learning rate 0.1, depth 3) peaks around round 95 at 0.827, then drifts down slowly. This is the practical difference: a forest is forgiving about tree count, and boosting needs early stopping or a tuned tree count.

## Choosing between them

- **Need a strong result fast, with little tuning?** Start with a forest. Its defaults are hard to get badly wrong.
- **Want the last bit of accuracy and willing to tune?** Boosting usually has the higher ceiling, especially with early stopping.
- **Data is small, noisy, or labels are unreliable?** Favor the forest, or a heavily regularized booster.
- **Need speed at prediction time or a small model?** Compare both; forests with hundreds of deep trees can be large.
- **Always** compare on several splits, as we did here, before deciding.

## Recap

A forest averages many independent deep trees to reduce variance; boosting builds shallow trees in sequence to reduce bias. On our churn data, a tuned booster edged out the forest, an untuned one lost clearly, and both suffered under noisy labels. The lesson generalizes: boosting rewards tuning and early stopping, forests reward simplicity. Next, we start a new chapter on time-series forecasting, beginning with the components of a time series.
