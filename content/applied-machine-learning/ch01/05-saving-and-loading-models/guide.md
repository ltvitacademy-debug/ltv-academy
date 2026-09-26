# Saving & Loading Models

A model that only lives in your notebook session is a demo. To score customers tomorrow, hand your work to a teammate, or run it inside an application, you need to write the trained object to disk and read it back later. Because Lesson 4 packaged preprocessing and model as a single pipeline, this is a single call, and the reloaded object behaves exactly like the original. There are also real risks to know about: library versions, and the security of the file format.

## What you'll learn

- How to save and load a fitted pipeline with `joblib`
- How to verify that a reloaded model is identical, including in a fresh Python process
- Why scikit-learn versions matter and what to record next to the file
- The security and portability limits of pickle-based files, and where the alternatives fit

## Save the whole pipeline

We refit the churn pipeline from Lesson 4 (preprocessing plus logistic regression, illustrative data) and write it out with `joblib`, the library scikit-learn recommends for persisting estimators that hold large NumPy arrays.

```python
import joblib
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression

model = Pipeline([("prep", pre),
    ("clf", LogisticRegression(max_iter=1000))])
model.fit(X_train, y_train)

joblib.dump(model, "churn_model.joblib")
```

The `.joblib` extension is only a convention. Save the **entire pipeline, not just the classifier**. The file holds everything learned during `fit`: the imputer medians, the scaler statistics, the category lists, and the coefficients. If you saved only the last step, you would have to reconstruct the preprocessing by hand and hope you got it identical.

## Load it and check it

```python
import os, numpy as np
loaded = joblib.load("churn_model.joblib")

print(os.path.getsize("churn_model.joblib"), "bytes")
print(np.array_equal(model.predict_proba(X_test),
                     loaded.predict_proba(X_test)))
print(round(loaded.score(X_test, y_test), 3))
```

Output:

```
4590 bytes
True
0.768
```

The saved logistic-regression pipeline is tiny, and the reloaded copy produces exactly the same probabilities. Size depends on the model: the same pipeline with a 200-tree random forest (`n_estimators=200`) came to about 4.4 MB, and `joblib.dump(rf, path, compress=3)` shrank it to about 0.77 MB. That is a good trade for storage, at the cost of slower load and save.

The real test is a **fresh Python process**, which is what production looks like. Nothing from your notebook exists there; the file must be enough:

```python
import joblib, numpy as np, pandas as pd

loaded = joblib.load("churn_model.joblib")
new = pd.DataFrame([{"age": np.nan, "tenure_months": 5,
    "monthly_spend": 120.0, "support_calls": 4,
    "plan": "basic", "region": "central"}])
print(loaded.predict_proba(new).round(3), loaded.predict(new))
```

```
[[0.096 0.904]] [1]
```

A brand-new customer arrives as a raw row with a missing age and a region ("central") that never appeared in training. The pipeline imputes the age and encodes the unseen region as zeros, then predicts a 90% churn probability. All of that came from the file.

## Record what you saved

A model file on its own is a mystery. Save a small metadata record beside it: the library versions, the data it was trained on, the expected input columns, and the headline test score.

```python
import json, sklearn

meta = {
    "sklearn": sklearn.__version__,
    "joblib": joblib.__version__,
    "trained_on": "illustrative churn data",
    "features": list(X_train.columns),
    "test_accuracy": round(loaded.score(X_test, y_test), 3),
}
with open("churn_model.json", "w") as f:
    json.dump(meta, f, indent=2)
```

On the machine used to write this lesson, `sklearn` was `1.1.2` and `joblib` was `1.1.0`. Yours will differ, and that difference is the point.

## The version caveat

Joblib and pickle store the object's internal state, not a stable, documented format. scikit-learn does not guarantee that a model saved with one version loads correctly, or gives identical predictions, in another. When the versions differ you may get a warning like this (reproduced here by loading a file stamped with an older version number):

```
UserWarning: Trying to unpickle estimator Pipeline from version 0.24.2
when using version 1.1.2. This might lead to breaking code or invalid
results. Use at your own risk.
```

Newer scikit-learn releases use a dedicated warning class for this situation; check the current model-persistence docs for details. The safe practice is the same either way:

- Load in an environment with the **same scikit-learn, NumPy, and pandas versions** used for training, pinned in a `requirements.txt` or environment file.
- Read the saved metadata before loading and compare versions.
- When you upgrade scikit-learn, **retrain** from your code and data rather than trusting old files, then re-run your evaluation.

## Security and other limits

- **Never load a pickle or joblib file from a source you do not trust.** Loading can execute arbitrary code, so a malicious file is as dangerous as a malicious script.
- Custom Python functions used inside a pipeline (for example in a `FunctionTransformer`) are saved by reference, not by copy, so the same module must be importable when you load.
- The file is only readable by Python with compatible libraries. To serve a model from another language or runtime, look at portable formats such as ONNX, or at `skops`, a secure-persistence library from the scikit-learn ecosystem. Both change over time, so check their current documentation before adopting one.

## Recap

Persist the whole fitted pipeline with `joblib.dump` and restore it with `joblib.load`; check equality of predictions, and test in a fresh process. Store version and feature metadata alongside the file, load only in an environment matching your training versions, retrain rather than trust files across upgrades, and never load files you do not trust. With the workflow chapter complete, the next chapter turns to the question of how good a model really is, beginning with classification metrics.
