# Sequence Models for Market Data

Every model up to this point has treated each row of data — one date, one asset, one set of features — as an independent example. Sequence models drop that assumption deliberately: they look at an ordered window of history and let the model learn how that sequence, not just its latest snapshot, predicts what comes next. This lesson is a conceptual tour of RNNs, LSTMs, and Transformers applied to market data, and an honest look at why they're harder to validate correctly than anything covered so far.

## What you'll learn

- The core idea of RNNs, LSTMs, and GRUs for sequential data
- Transformers as the modern alternative, and why attention matters for sequences
- A simple illustrative Keras LSTM sketch
- Why sequence models compound the leakage risks from Chapter 4
- Where sequence models actually earn their place: short-horizon microstructure and high-frequency data

## RNNs, LSTMs, and GRUs

A Recurrent Neural Network (RNN) processes a sequence step by step, carrying forward a hidden state that's meant to summarize everything seen so far. In principle that lets it learn patterns that unfold over time — a slow build-up in volatility, a multi-day order-flow imbalance — rather than reacting only to the most recent value.

Plain RNNs struggle to carry information across long sequences (the classic vanishing-gradient problem). LSTMs (Long Short-Term Memory) and GRUs (Gated Recurrent Units) fix this with gating mechanisms that let the network learn what to keep, update, or forget at each step, making it practical to learn from longer windows of history.

```python
# Illustrative sketch -- not a tuned, production model
from tensorflow import keras
from tensorflow.keras import layers

window = 20   # 20 trading days of lookback
n_features = 12

model = keras.Sequential([
    layers.LSTM(32, input_shape=(window, n_features), return_sequences=False),
    layers.Dropout(0.3),
    layers.Dense(16, activation="relu"),
    layers.Dense(1),  # e.g., predicted next-period return
])
model.compile(optimizer="adam", loss="mse")
```

Each training example here is a 20-day window of 12 features, not a single day — the model sees the sequence, not just the latest row.

## Transformers and attention

Transformers replace recurrence with **attention**: instead of processing the sequence strictly step by step, an attention mechanism lets the model directly weigh how relevant every other position in the sequence is to the one it's currently predicting from. This avoids the vanishing-gradient issue entirely and parallelizes better during training, which is a large part of why Transformers have displaced RNNs/LSTMs as the default sequence architecture in most domains, including growing use in market-data research.

```python
# Illustrative sketch -- conceptual only
import torch
import torch.nn as nn

encoder_layer = nn.TransformerEncoderLayer(d_model=12, nhead=4, batch_first=True)
encoder = nn.TransformerEncoder(encoder_layer, num_layers=2)

# x: (batch, window, n_features)
encoded = encoder(x)                 # attends across the whole window
prediction = nn.Linear(12, 1)(encoded[:, -1, :])  # use the final position
```

## Why sequence models are harder to validate correctly in finance

Chapter 4 built an entire validation framework around one core problem: overlapping outcomes and information leakage between training and test sets. Sequence models make this worse, not better, in a specific way: a training example here isn't one row, it's a *window* of rows. If your sequence window is 20 days long and you step it forward one day at a time, consecutive training examples overlap by 19 out of 20 days. That's the same overlapping-labels problem from Chapter 1 and Chapter 4's purging logic, except now it applies to every input window, not just the label horizon — and it's easy to forget, because the leakage is baked into how you constructed the sequences, not just how you split them.

Combine that with finance's low signal-to-noise ratio (Chapter 1) and a model architecture with far more parameters than a gradient-boosted tree, and the risk of a sequence model memorizing noise rather than learning real temporal structure goes up substantially. A sequence model that looks impressive in a naive train/test split is often doing exactly this.

## Where sequence models actually earn their place

Given those risks, sequence models aren't a default upgrade over the tree-based and linear models from Chapter 2 — they're a tool for specific situations:

- **Short-horizon microstructure.** Order-book dynamics, bid-ask spread behavior, and very short-term price formation have genuine sequential structure that a snapshot-based model can't capture.
- **Genuinely more data.** High-frequency data generates enough examples to give a large-parameter model a realistic chance of learning signal instead of memorizing noise — something daily or weekly return data usually can't offer.

Outside those settings, the added complexity and validation risk of a sequence model often isn't worth it compared to the tree-based approaches from Chapter 2, properly validated with the tools from Chapter 4.

## Key terms

| Term | Meaning |
|---|---|
| RNN | A network that processes a sequence step by step, carrying forward a hidden state |
| LSTM / GRU | Gated RNN variants that handle longer sequences by learning what to keep or forget |
| Transformer / attention | An architecture that weighs relevance across the whole sequence directly, without strict recurrence |
| Window overlap leakage | Consecutive sequence-model training examples sharing most of their input window, extending Chapter 4's leakage concerns |

## Recap

Sequence models — RNNs, LSTMs, GRUs, and Transformers — learn from an ordered window of history rather than a single snapshot, which is powerful for genuinely sequential data but compounds the overlapping-window leakage risk from Chapter 4 and is especially prone to overfitting given finance's low signal-to-noise ratio. They earn their place mainly in short-horizon microstructure or high-frequency settings with enough data to support them. Next up, Lesson 23: NLP for financial text and news, where the "sequence" is language instead of price history.
