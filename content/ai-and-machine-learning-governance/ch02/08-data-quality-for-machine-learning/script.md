# Lesson 8 — Data Quality for Machine Learning · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

If you know the six quality dimensions from Data Quality Management, this lesson applies every one of them specifically to training data.

## S2 · STEPS — Same dimensions, sharper consequence

Accuracy, completeness, consistency, validity, uniqueness, timeliness — none of that gets replaced here. What changes is the consequence of failing it. A report's quality problem is read by a person who brings judgment. A training data quality problem gets learned as a pattern and applied automatically to every future case.

## S3 · STEPS — Three dimensions in training data

Accuracy: a mislabeled example actively teaches the wrong association, not just one wrong fact. Completeness: missing values force unchosen assumptions, and missing whole population segments is a deeper failure covered in the bias lesson. Consistency: the same concept recorded two different ways can get learned as two different things.

## S4 · STEPS — Three more dimensions

Validity: an out-of-range value pulls the learned pattern toward nonsense. Uniqueness: duplicates overweight a pattern and can cause data leakage, where the same record shows up in both training and test data, making results look better than they are. Timeliness: stale training data learns a world that no longer exists, with no visible warning sign.

## S5 · STEPS — Why ML amplifies, not just repeats

A person reading a flawed report can apply skepticism. A model doesn't — it treats the patterns it learned as ground truth and extends them confidently to new cases. That's garbage in, garbage out, at scale: the flaw gets generalized and repeated indefinitely, not just copied once.

## S6 · OUTRO

Next lesson: bias in data specifically — the deeper look at how these quality failures, especially completeness and representation, turn into biased outcomes.
