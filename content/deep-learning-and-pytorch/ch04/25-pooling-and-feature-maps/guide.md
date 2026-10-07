# Pooling & Feature Maps

Last lesson used `nn.MaxPool2d(2)` without stopping to unpack it. Pooling is a simple operation, but it does a lot of work in a CNN: it shrinks feature maps, controls how much compute later layers need, and adds a useful amount of translation tolerance. This lesson takes a closer look.

## What you'll learn

- What a feature map actually represents, channel by channel
- How max pooling and average pooling differ, and when each is used
- How `nn.AdaptiveAvgPool2d` pools to a target size regardless of input size
- Why pooling makes a network somewhat tolerant to small shifts in the input

## Feature maps, revisited

Each output channel of a convolutional layer is a feature map: a 2D grid where each value says "how strongly did this particular learned pattern fire at this location." Early layers' feature maps tend to respond to simple patterns like edges and color gradients; deeper layers' feature maps respond to increasingly complex, abstract combinations of what earlier layers detected.

## Max pooling

`nn.MaxPool2d` slides a window across each feature map and keeps only the maximum value in each window, discarding the rest:

```python
import torch.nn as nn

pool = nn.MaxPool2d(kernel_size=2, stride=2)
# a 2x2 window, non-overlapping -- halves height and width
```

Max pooling keeps the strongest activation in each local region and throws away its exact position within that region — which is exactly what gives the network a small amount of tolerance to the pattern shifting by a pixel or two.

## Average pooling

`nn.AvgPool2d` works the same way but averages the window instead of taking its max:

```python
avg_pool = nn.AvgPool2d(kernel_size=2, stride=2)
```

Average pooling produces a smoother summary of the region; max pooling tends to preserve sharp, salient activations better. Max pooling is the far more common default inside a CNN's body.

## Adaptive pooling: pooling to a fixed output size

`nn.AdaptiveAvgPool2d` is a different, very useful tool: instead of specifying a window size and stride, you specify the *output size* you want, and it figures out the window automatically:

```python
gap = nn.AdaptiveAvgPool2d(output_size=(1, 1))
# global average pooling -- one value per channel,
# regardless of the incoming spatial size
```

Setting `output_size=(1, 1)` performs "global average pooling" — collapsing each channel's entire feature map down to a single number. This is extremely common right before a classifier head, because it means the network can accept variable input image sizes without the classifier's input dimension changing.

## Key terms

| Term | Meaning |
|---|---|
| Feature map | A 2D grid of activations showing where one learned pattern responded in the input |
| `nn.MaxPool2d` | Keeps the maximum value in each pooling window, discarding the rest |
| `nn.AvgPool2d` | Averages the values in each pooling window |
| `nn.AdaptiveAvgPool2d` | Pools to a specified output size regardless of input spatial size |
| Global average pooling | Adaptive pooling to `(1, 1)`, collapsing each channel to one value |
