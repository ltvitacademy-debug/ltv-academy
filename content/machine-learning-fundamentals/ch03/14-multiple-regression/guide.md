# Multiple Regression

One feature is rarely enough. A house's price depends on its size, but also its age, the number of bedrooms, the neighborhood, and more. **Multiple regression** extends the straight line from the last lesson to any number of features. The idea is unchanged, and scikit-learn's `LinearRegression` handles both with the same code. What changes is how you interpret the results.

## What you'll learn

- The multiple regression equation and what each coefficient means
- How to fit a multi-feature model and evaluate it on a held-out test set
- Why "holding the other features fixed" matters when you read coefficients
- Two common traps: correlated features and categorical inputs

## The model

```
price = intercept + b1 × sqft + b2 × beds + b3 × age
```

There is one coefficient per feature. With two features the model is a flat plane through the data; with three or more it's a *hyperplane* that you can't draw but that works the same way. Training still uses ordinary least squares: choose all the coefficients together to minimize the sum of squared residuals.

## Fit it and test it

We generate 200 illustrative houses. The built-in relationship is roughly $110 per square foot, $8,000 per bedroom, and minus $900 per year of age, plus noise. Bedrooms are deliberately tied to square footage, as in real housing data. As always, we hold out a test set.

```python
import numpy as np, pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score
rng = np.random.default_rng(7)
n = 200
sqft = rng.uniform(700, 3200, n)
beds = np.clip(np.round(sqft / 800 + rng.normal(0, 0.6, n)), 1, 6)
age = rng.uniform(0, 60, n)
price = (40000 + 110 * sqft + 8000 * beds
         - 900 * age + rng.normal(0, 20000, n))
X = pd.DataFrame({"sqft": sqft, "beds": beds, "age": age})
X_tr, X_te, y_tr, y_te = train_test_split(
    X, price, test_size=0.25, random_state=0)
m = LinearRegression().fit(X_tr, y_tr)
print(round(m.intercept_))
print(dict(zip(X.columns, m.coef_.round(1))))
print(round(r2_score(y_te, m.predict(X_te)), 3))
```

Output:

```
37727
{'sqft': 108.7, 'beds': 10304.3, 'age': -888.2}
0.952
```

## Reading coefficients

Each coefficient is the predicted change in price for a **one-unit increase in that feature, holding the other features fixed**. Here, each extra square foot adds about $108.70, and each additional year of age subtracts about $888. That "holding fixed" phrase is the whole difference from running three separate one-feature regressions: the model separates the effect of size from the effect of age even when they vary together.

To predict, pass a row with all features: a 1,500 sq ft, 3-bedroom, 10-year-old house comes out at about $222,824 (the model's estimate, not a real appraisal).

## Does adding features help?

Compare to a model using only square footage, scored on the same test set:

```python
m1 = LinearRegression().fit(X_tr[["sqft"]], y_tr)
print(round(r2_score(y_te, m1.predict(X_te[["sqft"]])), 3))
```

This prints 0.914, versus 0.952 for all three features. Adding age, which carries independent information, made a real improvement on data the model had not seen.

## Trap 1: correlated features

Square footage and bedrooms are strongly correlated (0.83 in this data). When features overlap, the model struggles to split credit between them. Notice the fitted `beds` coefficient is about $10,304 while the value we built in was $8,000. Predictions can stay accurate, but individual coefficients become unstable and harder to interpret, a problem called **multicollinearity**. Inspect correlations with `X.corr()`, and consider dropping or combining redundant features. The next lesson's regularization is another remedy.

## Trap 2: categorical features

Regression needs numbers, so encode categories first. One-hot encoding with `pd.get_dummies(..., drop_first=True)` turns a neighborhood column into 0/1 indicator columns and drops one to avoid redundancy. The coefficient on `area_south` is then the average price difference versus the dropped baseline, "north".

## Scale matters for interpretation, not accuracy

Coefficients are in the units of their features, so `sqft` (in the thousands) and `beds` (1 to 6) can't be compared directly by size. Standardizing features, from lesson 10, puts coefficients on a comparable scale. Ordinary linear regression predictions do not change when you rescale, but interpretation and the regularized models in lesson 15 do depend on it.

## Recap

Multiple regression fits one coefficient per feature by least squares, and each coefficient reads as "change in target per unit, holding the others fixed". Evaluate on a test set, watch for correlated inputs, and encode categories. Next: regularization, which keeps many-feature models from overfitting.
