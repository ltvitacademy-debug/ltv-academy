# Building a CNN in PyTorch

You now know what a single convolution does. A convolutional neural network is just several of them stacked together, each one building on the features the last one found, followed by a classifier head. This lesson builds one end to end.

## What you'll learn

- The standard conv -> batch norm -> activation -> pool "block" pattern
- How to stack multiple blocks so later layers see increasingly abstract features
- How to go from a 4D feature map to a flat vector for the final classifier
- How to assemble all of this inside an `nn.Module` subclass

## The conv block pattern

Almost every CNN is built from a repeating unit: a convolution, followed by batch normalization, followed by a nonlinearity, often followed by pooling to shrink the spatial size. You already met every one of these pieces in Chapter 3 and the last lesson — this is just where they combine.

```python
import torch.nn as nn

block = nn.Sequential(
    nn.Conv2d(3, 32, kernel_size=3, padding=1),
    nn.BatchNorm2d(32),
    nn.ReLU(inplace=True),
    nn.MaxPool2d(2),
)
```

Each block typically increases the channel count (more learned feature detectors) while shrinking the spatial resolution (via pooling or a strided convolution) — trading spatial detail for a richer feature representation as you go deeper.

## Stacking blocks into a full feature extractor

```python
import torch.nn as nn

class SimpleCNN(nn.Module):
    def __init__(self, num_classes=10):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3, padding=1),
            nn.BatchNorm2d(32),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2),
        )
        self.classifier = nn.Linear(64 * 8 * 8, num_classes)
```

For a 32x32 input, each `MaxPool2d(2)` halves the spatial size, so after two blocks the feature map is 8x8 with 64 channels — hence `64 * 8 * 8` flattened features going into the classifier.

## From feature map to prediction

```python
    def forward(self, x):
        x = self.features(x)          # (batch, 64, 8, 8)
        x = torch.flatten(x, 1)       # (batch, 64*8*8) -- keep dim 0 (batch)
        return self.classifier(x)     # (batch, num_classes)
```

`torch.flatten(x, 1)` flattens every dimension from index 1 onward into one, leaving the batch dimension (index 0) untouched — this is the standard bridge between a convolutional feature extractor and a linear classifier head.

## Key terms

| Term | Meaning |
|---|---|
| Conv block | A conv -> batch norm -> activation (-> pool) unit, repeated to build depth |
| Feature extractor | The stack of convolutional blocks that turns raw pixels into learned features |
| Classifier head | The final linear layer(s) mapping extracted features to class scores |
| `torch.flatten(x, 1)` | Collapses all dimensions from index 1 onward, preserving the batch dimension |
