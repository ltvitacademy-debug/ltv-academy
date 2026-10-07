# Anomaly Detection in Markets

Flash crashes, fat-finger trades, feed glitches, and genuine regime breaks all share one property that makes them hard to model: you don't have a labeled training set of "here are 500 examples of a flash crash." They're rare, they don't repeat the same way twice, and by the time you've seen enough of them to train a classifier, the next one will likely look different anyway. That's exactly the setting unsupervised anomaly detection is built for.

## What you'll learn

- Why anomaly detection in markets is fundamentally unsupervised, unlike classification
- How `IsolationForest` flags outliers by how easily they split off from the rest of the data
- How `OneClassSVM` and `EllipticEnvelope` offer different notions of "normal"
- Practical uses: flash-crash flags, data-quality checks, and risk-system alerts

## Why not just train a classifier

A classifier needs labeled examples of both classes. Crashes and data errors are rare, heterogeneous, and often unprecedented in their specific shape — the 2010 Flash Crash, a 2012 mini-crash in a single name, and a bad options-feed print are all "anomalies," but they don't look alike as feature vectors. Treating this as supervised classification means training a model to recognize a handful of past events and hoping the next one resembles them. Anomaly detection instead asks a different, better-posed question: "does this observation look like it came from the same distribution as everything else?" — answerable without ever having seen a crash before.

## IsolationForest: outliers are easy to isolate

```python
import pandas as pd
from sklearn.ensemble import IsolationForest

# features: e.g. 1-min return, bid-ask spread, trade volume z-score
features = pd.DataFrame({
    "ret_1m": returns_1m,
    "spread_z": spread_zscore,
    "volume_z": volume_zscore,
}).dropna()

iso = IsolationForest(n_estimators=200, contamination=0.01, random_state=0)
iso.fit(features)

scores = iso.decision_function(features)   # lower = more anomalous
is_anomaly = iso.predict(features)         # -1 = anomaly, 1 = normal
```

`IsolationForest` builds random trees that repeatedly split the feature space; the intuition is that an outlier — a return spike, a spread blowout — tends to get isolated into its own leaf in very few splits, because it sits far from the dense bulk of normal observations. Points that split off quickly, on average across many trees, get flagged as anomalies. `contamination` is your prior on what fraction of the data you expect to be anomalous; it directly sets the decision threshold.

## OneClassSVM and EllipticEnvelope: different notions of "normal"

```python
from sklearn.svm import OneClassSVM
from sklearn.covariance import EllipticEnvelope

ocsvm = OneClassSVM(kernel="rbf", nu=0.01, gamma="scale")
ocsvm.fit(features)
ocsvm_flags = ocsvm.predict(features)   # -1 = anomaly, 1 = normal

ee = EllipticEnvelope(contamination=0.01, random_state=0)
ee.fit(features)
ee_flags = ee.predict(features)         # -1 = anomaly, 1 = normal
```

`OneClassSVM` learns a boundary that encloses the dense region of "normal" data in feature space and flags anything outside it — flexible, with the `rbf` kernel letting the boundary take an irregular shape, but more expensive to tune (`nu`, `gamma`) on large datasets. `EllipticEnvelope` takes the opposite, simpler assumption: it fits a single Gaussian ellipse to the data (via a robust covariance estimate) and flags points far from its center — fast and interpretable, but a poor fit if your features are visibly non-Gaussian or multi-modal (e.g., spanning multiple regimes from the previous lesson).

## Where this gets used

In practice these models run as always-on monitors: flagging a price print that's wildly inconsistent with recent trading as a possible feed error before it hits a risk system, surfacing a trading day whose volume/spread/return combination looks nothing like its recent history as a candidate flash-crash or liquidity-event day for a human to review, and catching data-quality problems (a decimal-point error, a stale price) that would otherwise silently corrupt a backtest or a live signal.

## Key terms

| Term | Meaning |
|---|---|
| Anomaly detection | Unsupervised identification of observations that don't resemble the rest of the data, without labeled examples of the anomaly class |
| `IsolationForest` | Flags points that split off from the rest of the data in unusually few random tree splits |
| `OneClassSVM` | Learns a flexible boundary enclosing "normal" data; anything outside is flagged |
| `EllipticEnvelope` | Fits a robust Gaussian ellipse to the data; flags points far from its center |
| `contamination` / `nu` | The assumed fraction of anomalous points, which sets the decision threshold |

## Recap

Market anomalies — crashes, bad prints, data errors — are rare and don't repeat identically, so they're handled as unsupervised outlier detection rather than classification, whether via `IsolationForest`'s random-split isolation, `OneClassSVM`'s flexible boundary, or `EllipticEnvelope`'s Gaussian-ellipse assumption. Next, Lesson 13: Hierarchical Risk Parity, where we return to portfolio construction and use clustering structure itself to build more stable allocations than mean-variance optimization.
