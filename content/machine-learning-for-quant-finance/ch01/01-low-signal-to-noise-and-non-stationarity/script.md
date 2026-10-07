# Script — Low Signal-to-Noise & Non-Stationarity

## Segment 1 (title)

Welcome to Machine Learning for Quantitative Finance. This course builds on everything you already know about supervised learning, unsupervised learning, and validation from the Data Scientist path. What changes here is the data itself. This first lesson sets up the one idea that explains almost everything unusual in this course: financial data carries very little signal, and the signal that exists keeps changing.

## Segment 2 (steps)

In image or text models, strong accuracy, often above ninety five percent, is normal. In financial return prediction, a model explaining even one to two percent of next period return variance is often considered strong, and a much bigger number should make you suspicious of a bug rather than excited about a breakthrough. Markets are close to efficient, so easily exploitable patterns get traded away quickly, leaving only a faint signal behind.

## Segment 3 (code)

Here's a plain linear regression predicting next period return from lagged features, scored with r squared on a held out test set. The important habit is in how you read the number. An out of sample r squared around one to two percent can be a genuinely useful result. If your very first model reports forty percent, the far more likely explanation is look ahead bias, a leaked label, or misaligned data, not a discovery.

## Segment 4 (steps)

Markets are also non stationary. Volatility, correlations between assets, and the strength of any given factor shift over time instead of staying fixed. Even a real working signal tends to weaken once enough participants discover and trade on it, something called alpha decay. A common practical response is to re-estimate or retrain models on a rolling window so they track the current regime rather than an average of regimes that no longer applies.

## Segment 5 (outro)

Low signal plus a shifting data generating process is a dangerous combination: with enough attempts, it's easy to find something that looks great on history purely by chance. That's exactly why this course dedicates a full chapter later to validation rigor. Up next, lesson two: the overfitting problem in finance.
