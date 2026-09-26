# Why Models Fail in Production

Welcome to MLOps for Data Scientists. By now you can build a model that scores well on a test set, and you have seen how to train, track and deploy one on Azure and AWS. This course is about what happens next. A model in a notebook is an experiment. A model in production is a small piece of software that other people depend on, running on data you did not choose, long after you stopped looking at it. **MLOps** is the set of engineering habits that keeps such a model working: version control, reproducible environments, automated tests, deployment pipelines and monitoring. Most of it is borrowed from software engineering, and we will apply it to ML rather than re-teach it. We start with the problem: how models actually fail.

## What you'll learn

- Why a good test score does not guarantee a good production model
- Three kinds of failure: loud, silent and slow
- A real demonstration of a silent failure, with numbers
- What a notebook hides, and what the rest of this course adds

## The gap between a test score and production

A test set answers one question: how does this model behave on data that looks like the training data? Production asks harder ones. Will the same code run on someone else's machine? Will tomorrow's input arrive in the same shape, units and column order? Will the world still look like last year's training data? Who notices if the answer to any of these is no?

We will use the churn model from Applied Machine Learning: the `make_customers` data from lesson 1 and a preprocessing-plus-logistic-regression pipeline from lesson 4, fitted on the training split. All data is illustrative. On the test set it scores 0.768 accuracy, and it predicts an average churn probability of 0.234, close to the real churn rate of 0.236.

## Loud failures: the code breaks

These are the easy ones, because someone notices. If a column is missing, or the data arrives as a bare NumPy array instead of a DataFrame, the pipeline raises an error:

```
KeyError: "['region'] not in index"
ValueError: Specifying the columns using strings is only supported for pandas DataFrames
```

Both are real messages from our pipeline. They are annoying, but they are honest. A crash is the model telling you something is wrong.

## Silent failures: the code runs, the answers are wrong

Silent failures are the dangerous ones. Suppose the production system sends `monthly_spend` in cents instead of dollars, or a data feed starts counting support calls differently. Nothing crashes. We simulate both on the test set:

```python
cents = X_test.assign(monthly_spend=X_test["monthly_spend"] * 100)
busy = X_test.assign(support_calls=X_test["support_calls"] + 2)

for name, data in [("as trained", X_test),
                   ("spend in cents", cents),
                   ("more support calls", busy)]:
    p = model.predict_proba(data)[:, 1]
    print(f"{name:20s} mean p(churn) {p.mean():.3f}"
          f"  accuracy {model.score(data, y_test):.3f}")
```

Real output:

```
as trained           mean p(churn) 0.234  accuracy 0.768
spend in cents       mean p(churn) 0.950  accuracy 0.260
more support calls   mean p(churn) 0.399  accuracy 0.728
```

The unit bug pushes the model to predict that 95% of customers will churn, and accuracy falls from 0.768 to 0.260, far worse than always guessing "stays". The model returned a valid-looking probability for every row and raised no warning. This is called **training-serving skew**: the data the model sees in production differs from what it saw in training.

## Slow failures: the world moves

The second scenario, more support calls, is milder: accuracy only drops to 0.728, but the average predicted risk jumps from 0.234 to 0.399. That is what **drift** looks like. Nothing is broken in the code; customers simply behave differently from the training data. In real life this happens gradually, so there is no single day when an alarm goes off. Chapter 5 covers detecting drift and deciding when to retrain.

## What a notebook hides

Notebooks are wonderful for exploration, but they hide the things production needs:

- **Data:** which file, which version, which query produced it?
- **Code:** cells run out of order, so the saved model may not match any top-to-bottom run.
- **Environment:** the library versions on your laptop.
- **People:** who owns the model after launch, and who gets paged?

Each of the next chapters answers one of these with a concrete tool.

## Recap

Test scores measure the past; production is the future. Models fail loudly (errors), silently (bad inputs, skew) and slowly (drift). Silent and slow failures are the costly ones, because nothing tells you they are happening. MLOps is the engineering discipline that makes those failures visible, reproducible and fixable. Next, we map the whole ML lifecycle and see where MLOps fits into it.
