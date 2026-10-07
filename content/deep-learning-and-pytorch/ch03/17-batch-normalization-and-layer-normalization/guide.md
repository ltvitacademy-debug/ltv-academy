# Batch Normalization & Layer Normalization

Deep networks can be surprisingly hard to train just because of how the distribution of activations drifts from layer to layer and from batch to batch. Normalization layers exist to tame that drift. This lesson covers the two you'll meet constantly: `BatchNorm`, the default in convolutional networks, and `LayerNorm`, the default in transformers.

## What you'll learn

- What normalization layers actually compute, and why they help training
- How `nn.BatchNorm2d` normalizes across the batch dimension, and why that makes it batch-size sensitive
- How `nn.LayerNorm` normalizes per sample instead, and why that suits sequence models
- Why both layers behave differently in `train()` vs `eval()` mode

## The core idea: normalize, then rescale

Both batch norm and layer norm do the same two things: first subtract the mean and divide by the standard deviation of some group of activations, then apply a learned scale (`gamma`) and shift (`beta`) so the network can undo the normalization if that's actually useful. The difference between them is entirely about *which* activations get grouped together for that mean and standard deviation.

## Batch normalization

`BatchNorm` computes statistics across the batch dimension, separately for each channel. It's the standard choice after convolutional layers:

```python
import torch.nn as nn

conv_block = nn.Sequential(
    nn.Conv2d(3, 64, kernel_size=3, padding=1),
    nn.BatchNorm2d(64),
    nn.ReLU(inplace=True),
)
```

During training, `BatchNorm2d` uses the current batch's mean and variance, and also updates a running estimate of them. During evaluation (`model.eval()`), it switches to using that stored running estimate instead of the current batch's statistics — which is exactly why batch norm behaves badly with a batch size of 1, or with batches that aren't representative of the full dataset.

## Layer normalization

`LayerNorm` normalizes across the feature dimension of a single sample instead of across the batch. That makes it completely insensitive to batch size, and it's why it's the default normalization in transformer architectures, where sequences can have wildly varying batch compositions:

```python
import torch.nn as nn

layer_norm = nn.LayerNorm(normalized_shape=512)

x = torch.randn(16, 10, 512)  # (batch, seq_len, features)
normalized = layer_norm(x)    # normalizes over the last dim, per token
```

## Choosing between them

As a rule of thumb: reach for `BatchNorm2d` in convolutional vision networks with reasonably large batch sizes, and reach for `LayerNorm` in sequence models and transformers, or anywhere your batch size is small or variable. Neither one is a strict replacement for the other — they normalize over different axes for different reasons.

## Key terms

| Term | Meaning |
|---|---|
| Normalization | Rescaling activations to have roughly zero mean and unit variance before a learned scale/shift |
| `nn.BatchNorm2d` | Normalizes per channel across the batch dimension; uses running statistics at eval time |
| `nn.LayerNorm` | Normalizes per sample across the feature dimension; unaffected by batch size |
| Running statistics | The moving-average mean/variance `BatchNorm` tracks during training and reuses at inference |
| `gamma` / `beta` | The learned scale and shift applied after normalization in both layers |
