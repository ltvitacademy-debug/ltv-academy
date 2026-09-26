# Classification Metrics: Accuracy, Precision & Recall

In Lesson 1 a model scored 0.768 and a dummy that predicts "stayed" for everybody scored 0.764. Accuracy said the model was nearly as good as doing nothing, and that is only the beginning of what accuracy hides. Real classification problems are usually lopsided: few customers churn, few transactions are fraud, few patients have the disease. This lesson introduces the three metrics you will use every day, and shows how to read them from a confusion matrix.

## What you'll learn

- The four outcomes of a binary prediction and how to count them
- What accuracy, precision, and recall each measure, and how to compute them in scikit-learn
- Why accuracy misleads on imbalanced data, and what a dummy baseline reveals
- How to choose between precision and recall based on business cost

## Setup

The same setup is reused in Lessons 7 and 8. It rebuilds the churn pipeline from Chapter 1 on the illustrative customer data (`customers.py` from Lesson 1).

```python
from customers import make_customers
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline, make_pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.linear_model import LogisticRegression

df = make_customers()
X, y = df.drop(columns="churned"), df["churned"]
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, stratify=y, random_state=0)

num = ["age", "tenure_months", "monthly_spend", "support_calls"]
cat = ["plan", "region"]
pre = ColumnTransformer([
    ("num", make_pipeline(SimpleImputer(strategy="median"),
                          StandardScaler()), num),
    ("cat", make_pipeline(SimpleImputer(strategy="most_frequent"),
        OneHotEncoder(handle_unknown="ignore")), cat)])
model = Pipeline([("prep", pre),
                  ("clf", LogisticRegression(max_iter=1000))])
model.fit(X_train, y_train)
pred = model.predict(X_test)
```

The test set has 250 customers, 59 of whom churned (23.6%). "Churned" is our **positive class**: the event we are trying to catch.

## The confusion matrix

Every prediction on a yes/no problem lands in one of four cells:

- **True positive (TP):** predicted churn, and the customer did churn. A catch.
- **False positive (FP):** predicted churn, but the customer stayed. A false alarm.
- **False negative (FN):** predicted stay, but the customer churned. A miss.
- **True negative (TN):** predicted stay, and the customer stayed. Correctly ignored.

```python
from sklearn.metrics import confusion_matrix
print(confusion_matrix(y_test, pred))
tn, fp, fn, tp = confusion_matrix(y_test, pred).ravel()
print(tn, fp, fn, tp)
```

```
[[176  15]
 [ 43  16]]
176 15 43 16
```

Rows are the actual class (0 then 1), columns the predicted class. So 176 stayers were correctly kept, 15 were flagged wrongly, 43 churners were missed, and only 16 were caught.

## Three metrics from four counts

- **Accuracy** = (TP + TN) / all. The share of all predictions that were right.
- **Precision** = TP / (TP + FP). When the model says "churn", how often is it right?
- **Recall** = TP / (TP + FN). Of the customers who really churn, how many did the model find? (Also called sensitivity or the true positive rate.)

```python
from sklearn.metrics import (accuracy_score,
    precision_score, recall_score)
print(round(accuracy_score(y_test, pred), 3))
print(round(precision_score(y_test, pred), 3))
print(round(recall_score(y_test, pred), 3))
```

```
0.768
0.516
0.271
```

By hand: accuracy is (16 + 176) / 250 = 0.768; precision is 16 / (16 + 15) = 0.516; recall is 16 / (16 + 43) = 0.271. The model looks decent by accuracy, yet it finds barely a quarter of the customers who leave. That is the gap this lesson is about.

## Why accuracy misleads

With 76% of customers staying, a model that says "stayed" for everyone is 76% accurate while catching no churner at all. The `DummyClassifier` we met in Lesson 1 makes this concrete:

```python
from sklearn.dummy import DummyClassifier
dummy = DummyClassifier(strategy="most_frequent")
dummy.fit(X_train, y_train)
dp = dummy.predict(X_test)
print(round(accuracy_score(y_test, dp), 3))
print(recall_score(y_test, dp))
print(precision_score(y_test, dp, zero_division=0))
```

```
0.764
0.0
0.0
```

Accuracy 0.764, recall 0. Without `zero_division=0`, scikit-learn warns that precision is ill-defined, because the dummy never predicts "churn" and so the denominator TP + FP is zero. Always compare against a baseline, and always look at metrics for the class you care about.

`classification_report` prints precision, recall, and F1 for both classes at once:

```python
from sklearn.metrics import classification_report
print(classification_report(y_test, pred,
      target_names=["stayed", "churned"]))
```

```
              precision    recall  f1-score   support

      stayed       0.80      0.92      0.86       191
     churned       0.52      0.27      0.36        59

    accuracy                           0.77       250
   macro avg       0.66      0.60      0.61       250
weighted avg       0.74      0.77      0.74       250
```

The `stayed` row looks fine, while `churned`, the class the business cares about, has weak recall.

## Choose by cost, not by habit

Precision and recall pull in opposite directions, and which to favor depends on what each error costs:

- **Favor precision** when a false alarm is expensive. If each retention call costs money and annoys customers, you want the customers you flag to really be at risk.
- **Favor recall** when a miss is expensive. If losing a customer costs far more than a discount, you would rather over-flag than miss churners.

Precision and recall can also be requested as scoring names in cross-validation. Averaged over 5 folds on the full table, the same pipeline gave accuracy 0.793, precision 0.631, and recall 0.308:

```python
from sklearn.model_selection import cross_validate
r = cross_validate(model, X, y, cv=5,
    scoring=["accuracy", "precision", "recall"])
print(r["test_recall"].round(3), r["test_recall"].mean().round(3))
```

```
[0.319 0.319 0.234 0.333 0.333] 0.308
```

Recall is stable, low, and consistent across folds, so the weakness is real rather than noise.

## Recap

A confusion matrix counts TP, FP, FN, and TN. Accuracy is the share correct, precision is the reliability of positive predictions, and recall is the share of real positives found. On imbalanced data accuracy can look fine while recall is poor, so always compare with a dummy baseline and read the metrics for the positive class. Choose which to emphasize from the business cost of each error. Next, we combine precision and recall into a single score (F1) and learn to judge a model across all thresholds with ROC curves and AUC.
