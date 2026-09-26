# The ML Workflow

Beginners often picture machine learning as "pick an algorithm, call fit, done". In practice the algorithm is a small part of the job. Professional data scientists spend most of their time on the steps around the model: framing the question, preparing data, and checking honestly whether the result is any good. This lesson gives you the map of the whole workflow, so every later lesson has a place to sit on it.

## What you'll learn

- The six stages of a typical machine-learning project
- Why you define the metric and a baseline before building anything clever
- How to write a minimal but honest train, fit, evaluate loop in scikit-learn
- Why the test set is used once, at the end
- Why the workflow is a loop, not a straight line

## The six stages

1. **Frame the problem.** What decision will the prediction support? What is the target, and what does a good result mean in business terms? Pick a metric (accuracy, error in dollars, and so on) before you touch a model.
2. **Get and explore the data.** You already know this from the EDA course: check types, missing values, distributions, and whether the target is what you think it is.
3. **Prepare the data.** Split into train and test sets, clean, encode categories, scale, engineer features. This is chapter 2 of this course, and the biggest source of hidden mistakes.
4. **Train models.** Start with a simple **baseline**, then try one or two real algorithms.
5. **Evaluate.** Score on data the model has never seen, and look at where it fails, not just the headline number.
6. **Deploy and monitor.** Put the model where it can make predictions, and watch for performance drifting as the world changes. (Applied Machine Learning, the next course, covers the production workflow.)

Real projects loop: a poor evaluation sends you back to features, or even to reframing the problem.

## An honest minimal loop

We use scikit-learn's bundled breast-cancer dataset: 569 tumours, 30 measurements each, and a label for benign (1) or malignant (0).

```python
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.dummy import DummyClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier

data = load_breast_cancer(as_frame=True)
X, y = data.data, data.target
print(X.shape, y.value_counts(normalize=True).round(3).to_dict())

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, stratify=y, random_state=42)

models = {
    "baseline (majority class)": DummyClassifier(strategy="most_frequent"),
    "logistic regression": LogisticRegression(max_iter=5000),
    "random forest": RandomForestClassifier(random_state=42),
}
scores = {}
for name, m in models.items():
    m.fit(X_train, y_train)
    scores[name] = m.score(X_test, y_test)
    print(f"{name:26s} {scores[name]:.3f}")
```

Output:

```
(569, 30) {1: 0.627, 0: 0.373}
baseline (majority class)  0.629
logistic regression        0.958
random forest              0.958
```

Read this output carefully, because it teaches three things.

**The baseline matters.** 62.7% of the tumours are benign, so a "model" that always answers benign already scores 62.9% on the test set. Any real model must beat that, and knowing the baseline stops you being impressed by a mediocre number. Baselines are especially important when classes are imbalanced.

**The split protects you.** We fitted every model on `X_train` only and scored on `X_test`, rows the models never saw. Scoring on the training rows would flatter the model, and we will see exactly why in lessons 4 and 5.

**One number is not the whole story.** Both real models score 95.8%. For a medical screen, missing a malignant tumour is worse than a false alarm, so at the evaluation stage you would look at the kinds of errors, not only accuracy. Choosing the right metric is part of framing the problem.

The chart shows the same three scores (styling omitted):

```python
import matplotlib.pyplot as plt
plt.barh(list(scores), list(scores.values()))
plt.xlabel("accuracy on the held-out test set")
plt.show()
```

## Guard the test set

The test set is a one-shot exam. If you try ten models, tweak features, and pick whichever scores best on the test set, you have quietly trained on it, and its score is no longer honest. In lesson 7 you will meet the validation set, which is where all that experimenting belongs.

## Recap

An ML project is a loop of framing, data work, modelling and honest evaluation, with the model itself a small piece. Set a metric and a baseline first, split before you experiment, and only trust scores from data the model has not seen. Next up, lesson 4: bias, variance and generalization, the ideas that explain why models fail on new data.
