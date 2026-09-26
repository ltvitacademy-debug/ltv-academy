# Script — Saving & Loading Models

## Segment 1 (title)

A model that only lives in your notebook is a demo. To score customers tomorrow, share your work, or run inside an application, you have to write the trained object to disk and read it back. Because our pipeline is one object, that's a single call. There are risks worth knowing, though.

## Segment 2 (steps)

Four things to get right. Save the whole pipeline, not just the classifier, so the preprocessing travels along. Verify the reload. Record the versions and features in a metadata file. And load only in a matching environment, from a source you trust.

## Segment 3 (code)

We use joblib. Dump writes the fitted pipeline to a file. Everything learned during fit is inside: the imputer medians, scaler statistics, category lists, and coefficients. This logistic pipeline is under five kilobytes. A two-hundred-tree forest version was about four point four megabytes, and compressing it brought that under one.

## Segment 4 (code)

Now the real test, a fresh Python process, which is what production looks like. Load the file, hand it a brand-new customer as a raw row, with a missing age and a region never seen in training, and it still predicts. Ninety percent churn probability, and it all came from the file.

## Segment 5 (code)

A model file on its own is a mystery, so save a small metadata record beside it: library versions, training data, the expected feature columns, and the test score. Write it as JSON.

## Segment 6 (steps)

Now the caveats. First, versions. Pickle-based files store internal state, and scikit-learn doesn't guarantee they load across versions. Pin your environment, and retrain after an upgrade. Second, security. Never load a file you don't trust, because loading can run arbitrary code. Third, custom functions must be importable when you load.

## Segment 7 (outro)

The workflow chapter is done. Next, how good is a model really? Lesson 6: classification metrics, accuracy, precision, and recall.
