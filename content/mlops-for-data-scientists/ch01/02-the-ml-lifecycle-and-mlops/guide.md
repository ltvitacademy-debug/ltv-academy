# The ML Lifecycle & MLOps

Lesson 1 showed how models fail once they leave the notebook. To prevent those failures you need a map of everything a model goes through, and a name for the practice of managing that journey. That map is the **ML lifecycle**, and the practice is **MLOps**. This lesson defines both, shows how far along the maturity ladder most teams really are, and turns the lifecycle into a small runnable script that the rest of the course builds on.

## What you'll learn

- The stages of the ML lifecycle and why it is a loop, not a line
- What MLOps is, and how it relates to DevOps and to the notebook work you already do
- Three levels of MLOps maturity
- How to turn a notebook workflow into a repeatable script with a validation gate

## The lifecycle is a loop

Google Cloud's MLOps guide, which is widely cited, lists eight steps for an ML system: data extraction, data analysis, data preparation, model training, model evaluation, model validation, model serving and model monitoring. Other vendors group them differently, so check any source you use, but the shape is always the same. We can compress it into four phases:

1. **Prepare data:** get it, explore it, clean it, split it.
2. **Train and evaluate:** fit the model, score it, and validate that it is good enough.
3. **Deploy:** package and serve the model so an application can call it.
4. **Monitor:** watch inputs and predictions, and go back to step 1 when they degrade.

The arrow from step 4 back to step 1 is the important part. A deployed model is never finished, because the data keeps changing (lesson 1's slow failures). Most of your effort in a real ML project goes into the surrounding system, not the model. The same Google guide makes the point that only a small fraction of a real-world ML system is the ML code itself.

## What MLOps is

**MLOps** applies DevOps ideas (version control, automated testing, continuous integration and delivery, monitoring) to machine learning. It is more than DevOps, though, because an ML system has two extra moving parts: **data** and **models**. Code is not the only thing that changes. A new data extract can change behavior without a single line of code changing, and a model is an artifact produced by code plus data, so you must be able to trace it back to both.

That is why this course has a Versioning chapter (data, models, experiments), a Packaging chapter (serving), a CI/CD chapter (tests and validation), and a Monitoring chapter (drift and retraining).

## Three levels of maturity

Google's guide describes three levels. Most teams start at level 0 and move up as the cost of manual work becomes obvious:

- **Level 0, manual process:** a data scientist runs each step by hand, usually in a notebook, then hands over a model file. Releases are rare, and nothing is monitored.
- **Level 1, ML pipeline automation:** training is an automated pipeline that can be rerun on fresh data, with data validation and a model-validation step, so retraining is routine.
- **Level 2, CI/CD pipeline automation:** the pipeline code itself is tested, built and deployed automatically, so a change to the training logic is released as safely as a change to an application.

Other vendors define their own level schemes, so treat these levels as a way to talk about maturity rather than an official standard. Nobody needs level 2 for a first project, and this course builds toward it step by step.

## From notebook to repeatable script

The first move up the ladder is the smallest: put each lifecycle stage in a function so the whole run can be repeated with one command. Here is the churn workflow from Applied Machine Learning, using the illustrative `make_customers` data, as `lifecycle.py`:

```python
import joblib
from customers import make_customers
from churn_pipe import build_pipeline   # preprocessing + logistic regression
from sklearn.model_selection import train_test_split

def prepare():
    df = make_customers()
    X, y = df.drop(columns="churned"), df["churned"]
    return train_test_split(X, y, test_size=0.25,
                            stratify=y, random_state=0)

def train(X_train, y_train):
    return build_pipeline().fit(X_train, y_train)

def evaluate(model, X_test, y_test):
    return {"accuracy": round(model.score(X_test, y_test), 3)}

def main():
    X_train, X_test, y_train, y_test = prepare()
    print("prepare :", len(X_train), "train /", len(X_test), "test rows")
    model = train(X_train, y_train)
    metrics = evaluate(model, X_test, y_test)
    print("evaluate:", metrics)
    if metrics["accuracy"] >= 0.75:
        joblib.dump(model, "churn.joblib")
        print("validate: passed, model saved")
    else:
        print("validate: FAILED, model not saved")

if __name__ == "__main__":
    main()
```

Running `python lifecycle.py` twice gave identical output both times:

```
prepare : 750 train / 250 test rows
evaluate: {'accuracy': 0.768}
validate: passed, model saved
```

Three things changed compared with a notebook. Every stage has a name and can be tested on its own. Random seeds are fixed, so a rerun gives the same answer. And there is a **validation gate**: the model is only saved if it clears a threshold. The 0.75 bar here is arbitrary and illustrative; Chapter 4 replaces it with real automated validation against a baseline.

## Recap

The ML lifecycle is a loop of preparing data, training and evaluating, deploying, and monitoring. MLOps brings DevOps discipline to that loop and adds versioning for data and models. Teams climb from manual work (level 0) to automated training pipelines (level 1) to fully automated CI/CD for the pipeline itself (level 2). You can start today by turning notebook cells into functions with fixed seeds and a validation gate. To keep growing that script without chaos, it needs a sensible home. The next lesson covers how to structure an ML project.
