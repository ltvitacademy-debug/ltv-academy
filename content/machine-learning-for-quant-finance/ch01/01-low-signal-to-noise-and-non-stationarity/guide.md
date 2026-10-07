# Low Signal-to-Noise & Non-Stationarity

Welcome to Machine Learning for Quantitative Finance. This course assumes you already know supervised learning, unsupervised learning, and model validation from the Data Scientist path — what it teaches is how those familiar tools behave differently when the data is financial returns instead of images, text, or typical tabular business data. This first lesson sets up the single idea that explains almost everything unusual about this course: financial data has very little signal, and the little signal there is keeps changing.

## What you'll learn

- Why financial return data has an extremely low signal-to-noise ratio compared to the ML domains you've trained on before
- What R² actually means for a return-prediction model, and why 1–2% is a genuinely strong score, not a failure
- Why markets are non-stationary — relationships that worked yesterday decay or reverse ("alpha decay")
- Why this course devotes an entire later chapter (Chapter 4) to validation rigor that other ML domains barely need

## Signal buried in noise

In image classification, a well-trained model routinely clears 95–99% accuracy. In financial return prediction, a model that explains even 1–2% of next-period return variance (R² of 0.01–0.02) is often considered strong, and anything above roughly 5% out-of-sample should raise your suspicion that something is leaking. This isn't a sign that quant researchers are bad at machine learning — it's a structural fact about markets. In an efficient (or close to efficient) market, easily exploitable patterns get traded away quickly, and what's left for a model to find is faint.

```python
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score

# X_train/X_test: lagged return, volume, and factor features
# y_train/y_test: next-period return
model = LinearRegression()
model.fit(X_train, y_train)
preds = model.predict(X_test)

r2 = r2_score(y_test, preds)
print(f"Out-of-sample R^2: {r2:.4f}")
# A genuinely useful result here is often 0.005 to 0.02 -- and that's fine
```

Treat this as a calibration exercise: if your very first model on real return data reports an R² of 0.4, the far more likely explanation is a bug — look-ahead bias, a leaked label, or data misalignment — not a breakthrough.

## Markets don't stay still

Non-stationarity means the statistical properties of the data — volatility, correlations between assets, the strength of a given factor — shift over time instead of staying fixed like the pixel statistics of a photograph. A relationship a model learned from 2015–2019 data may simply not hold in a 2022 volatility regime. Worse, even a real, working signal tends to decay once enough market participants discover and trade on it — a phenomenon called **alpha decay**. The signal doesn't just get noisy; it can quietly stop existing.

```python
import pandas as pd

# A 252-trading-day rolling correlation between two factors
rolling_corr = features["momentum"].rolling(252).corr(features["value"])
print(rolling_corr.tail())
# A relationship stable for years can weaken or flip sign after a regime shift
```

A common practical response is to retrain or re-estimate models on a rolling or expanding window rather than once on all historical data, so the model tracks the current regime instead of an average of regimes that no longer applies.

## Why rigor matters more here

Low signal and a shifting data-generating process combine into a dangerous trap: with enough attempts, it is easy to find a model that looks great on historical data purely by chance, or because of subtle data leakage, even though it has no real predictive power going forward. That risk — explored fully in the next lesson — is exactly why Chapter 4 of this course is dedicated entirely to walk-forward validation, purged cross-validation, and detecting backtest overfitting. In most ML domains, a single train/test split is enough. In finance, it usually isn't.

## Key terms

| Term | Meaning |
|---|---|
| Signal-to-noise ratio | How much of the variation in the target is explainable signal vs. random noise |
| R² (coefficient of determination) | Share of variance in the target a model explains; 1–2% is often strong for returns |
| Non-stationarity | Statistical properties of the data (volatility, correlations) change over time |
| Alpha decay | A real predictive signal weakens or disappears as more participants trade on it |
| Regime | A period during which market statistical behavior is roughly stable |

## Recap

Financial returns carry very little signal, and the signal that exists keeps shifting as markets adapt — so a tiny R² can be a real result, and a huge one is usually a red flag. That combination of low signal and constant change is why this course treats validation as a first-class topic rather than an afterthought. Next up, Lesson 2: The Overfitting Problem in Finance, where we look at how easy it is to fool yourself into believing a strategy works.
