# Lesson 16 — Data Leakage

**Chapter 3 · Working With Data for ML · Lesson 16 of 30**

## What you'll learn

- What data leakage actually is, in one precise definition
- The four common shapes it takes, with real examples of each
- Why leakage is dangerous specifically because it looks like success
- The one question that catches almost every case

## The definition this whole chapter has been building toward

**Data leakage** happens when information that would not legitimately be available at real prediction time ends up influencing the model during training or evaluation — making the model look far better during development than it will ever perform in production. Lessons 12, 14, and 15 each flagged a specific version of this ("fit on train only"); this lesson names the general problem all of those were protecting against.

## Why leakage is uniquely dangerous

Most ML mistakes make a model perform worse, which is annoying but obvious — low accuracy is a visible problem. Leakage does the opposite: it makes a model look *better* than it actually is, often dramatically so. A model that leaked information might show 98% test accuracy in development and then perform barely better than guessing once deployed, because the real world doesn't hand it the leaked information it was secretly relying on. **Suspiciously good performance is the single biggest warning sign of leakage** — if a result looks too good to be true for the problem's difficulty, it's worth auditing before celebrating.

## Four shapes leakage commonly takes

```
1. TARGET LEAKAGE
   predicting loan default, using a feature "days_to_payoff"
   -> that field often only gets set AFTER default happens

2. TRAIN/TEST CONTAMINATION
   imputer.fit_transform(full_df) instead of fit on train only
   -> test statistics leak into values used for training

3. TEMPORAL LEAKAGE
   predicting this month's churn using next month's usage data
   -> at real prediction time, next month hasn't happened yet

4. GROUP LEAKAGE
   the same patient's rows split across both train and test
   -> the model partly "recognizes" the patient, not the pattern
```

**Target leakage** is the most damaging because it's often invisible in the code — the feature `days_to_payoff` looks like an ordinary column, but it's actually derived from (or a consequence of) the outcome you're trying to predict, so of course it predicts the outcome almost perfectly. **Train/test contamination** is the mechanical version covered in the last three lessons — any `fit_transform` call must run on the training split only. **Temporal leakage** shows up constantly in time-series and forecasting problems, where it's tempting to use a convenient column that happens to be computed using data from after the prediction point. **Group leakage** is what Lesson 11's `GroupKFold` example specifically guarded against: if the same patient, customer, or entity contributes rows to both train and test, the model can partly succeed by recognizing that specific entity rather than learning the general pattern.

## The one question that catches almost every case

For any feature, at the moment you'd actually need to make this prediction in the real world, would you genuinely have this piece of information yet? If the honest answer is "no" — the field gets filled in after the outcome, it depends on data from the future relative to the prediction point, or it's really a disguised version of the label itself — that feature is leaking, no matter how clean the code looks. Running this check for every feature, explicitly, is one of the highest-value habits you can build as a practitioner.

## Recap

Data leakage is information that wouldn't be legitimately available at real prediction time influencing training or evaluation, and it's dangerous precisely because it makes performance look artificially great. It commonly shows up as target leakage (a feature derived from the outcome), train/test contamination (fitting preprocessing on the wrong data), temporal leakage (using future data to predict the past), or group leakage (the same entity split across train and test). The test for all four: would you actually have this information at real prediction time? This closes out Chapter 3 — you now have the full toolkit for turning raw data into something a model can honestly learn from. Chapter 4 goes deeper into one specific model family: neural networks and deep learning.
