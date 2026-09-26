# What Machine Learning Is

Welcome to Machine Learning Fundamentals, step five of the Data Scientist path. You already write Python, wrangle data in pandas, reason with statistics and explore datasets. This course is where you learn how a computer can *learn* patterns from that data, and, just as importantly, how to tell when it has learned something real. We start with the most basic question: what is machine learning?

## What you'll learn

- The difference between writing rules and learning rules from data
- The vocabulary used everywhere in ML: features, target, model, training, prediction
- How to fit and inspect a first model in scikit-learn
- Why the real test of a model is data it has not seen
- When machine learning is, and is not, the right tool

## Rules versus learning

In traditional programming, a person writes the rules. Rules plus data go in, and answers come out. Machine learning turns this around: you supply **data together with the known answers**, and an algorithm works out the rules. Those learned rules are the **model**. Once you have a model, you feed it new data where the answer is *not* known and it produces a prediction.

Imagine pricing houses. A rule-based approach might say "under 1,200 sq ft is $200k, under 2,200 is $320k, otherwise $450k". Someone had to guess those thresholds, and every new market or year means rewriting them. A machine-learning approach looks at past sales and finds the relationship itself.

## Your first model

The data below is generated with a fixed random seed, so you get identical numbers. It is **illustrative**: 60 made-up houses whose price loosely follows their size.

```python
import numpy as np
from sklearn.linear_model import LinearRegression

rng = np.random.default_rng(42)
size = rng.uniform(600, 3000, 60)                    # square feet
price = 50 + 0.12 * size + rng.normal(0, 25, 60)     # $1000s
X = size.reshape(-1, 1)          # scikit-learn wants a 2-D feature table

def rule_price(sqft):            # hand-written rules
    if sqft < 1200:
        return 200
    if sqft < 2200:
        return 320
    return 450

model = LinearRegression().fit(X, price)             # learned from data

print("rule   :", rule_price(1800))
print("learned:", round(model.predict([[1800]])[0], 1))
print("slope per sq ft:", round(model.coef_[0], 3),
      " intercept:", round(model.intercept_, 1))
```

Output:

```
rule   : 320
learned: 260.8
slope per sq ft: 0.119  intercept: 45.8
```

The learned model says each extra square foot adds about 0.119 thousand dollars (roughly $119), on a base of about $46k. It recovered, from noisy examples, a pattern close to the one we used to generate the data (0.12 and 50). Nobody typed those numbers into the model; `fit` found them.

## Vocabulary you will hear constantly

- **Example / sample / row**: one house, one customer, one order.
- **Features (X)**: the input columns the model can look at. Here, size.
- **Target / label (y)**: the answer we want to predict. Here, price.
- **Model**: the learned rules, stored as numbers inside a Python object.
- **Training / fitting**: the process of learning those numbers from data (`fit`).
- **Prediction / inference**: using a fitted model on new rows (`predict`).

## The chart

Plotting the examples and the model's line shows what "learning" meant here: the algorithm adjusted two numbers until the line sat close to the dots. (Styling code omitted.)

```python
import matplotlib.pyplot as plt
xs = np.linspace(600, 3000, 100)
plt.scatter(size, price)
plt.plot(xs, model.predict(xs.reshape(-1, 1)))
plt.xlabel("size (sq ft)"); plt.ylabel("price ($1000s)")
plt.show()
```

## The real test: data it has not seen

A model that memorizes the past is useless. What matters is how it performs on **new** data, houses that were not in the training set. This one idea drives almost everything in this course: how we split data, how we spot overfitting, how we choose between models.

## When to use machine learning

Use it when the pattern is too complicated or changes too often to write rules by hand, and you have plenty of past examples with answers. Do not use it when a clear rule already works ("apply a 10% discount to orders over $500"), when you have almost no data, or when you cannot tolerate any error. Also remember that a model can only learn what is in its data: biased or messy data produces a biased or messy model.

## Recap

Machine learning means learning the rules from examples instead of writing them. Data with known answers goes in; a model comes out; the model is judged on data it has never seen. Next up, lesson 2: supervised versus unsupervised learning.
