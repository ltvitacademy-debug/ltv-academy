# Convolutions, Conceptually

Every network you've built so far treated an image as a flat vector of numbers, throwing away the fact that nearby pixels are related. A convolution is the operation that lets a network learn from that spatial structure directly, and it's the foundation of every vision architecture in this chapter.

## What you'll learn

- What a convolution actually computes, as a sliding-window operation
- What a kernel (filter), stride, and padding each control
- The formula for computing an output's spatial size
- How `nn.Conv2d`'s arguments map onto these concepts

## The sliding window, conceptually

A convolution slides a small grid of learned numbers — the kernel, or filter — across the input, and at each position computes a single dot product between the kernel and the patch of input it currently covers. Repeating that across every position produces a new grid of outputs called a feature map. Unlike a fully-connected layer, the same small kernel is reused at every spatial position, which is why convolutional layers have far fewer parameters than a fully-connected layer processing the same image.

## Stride and padding

**Stride** controls how far the kernel moves between positions. A stride of 1 slides the kernel one pixel at a time, producing a large, finely-sampled output; a stride of 2 skips every other position, shrinking the output and reducing compute.

**Padding** adds extra rows/columns (usually zeros) around the input's border before sliding the kernel, which controls whether the output shrinks, stays the same size, or could even grow relative to the input. Without padding, a kernel can never be centered exactly on a border pixel, so the output is always a bit smaller than the input.

## The output size formula

For one spatial dimension, with input size `H`, kernel size `K`, padding `P`, and stride `S`:

```python
# output size along one dimension
out = (H + 2 * P - K) // S + 1

# example: H=28, K=3, P=1, S=1
out = (28 + 2 * 1 - 3) // 1 + 1  # = 28, same size preserved
```

`padding=1` with a `3x3` kernel and `stride=1` is a common combination specifically because it preserves the input's spatial size — a pattern you'll see constantly in Lesson 24.

## Conv2d's arguments, mapped to the concepts above

```python
import torch.nn as nn

conv = nn.Conv2d(
    in_channels=3,    # e.g. RGB input
    out_channels=16,  # number of learned kernels/feature maps produced
    kernel_size=3,    # the sliding window's size
    stride=1,         # how far the window moves each step
    padding=1,        # zero-padding added to the input border
)
```

Each of the 16 output channels is produced by its own independently-learned `3x3x3` kernel (3 to match the input's channel depth), each scanning across the whole input and producing one feature map.

## Key terms

| Term | Meaning |
|---|---|
| Kernel / filter | A small learned grid of weights slid across the input |
| Feature map | The grid of outputs produced by sliding one kernel across the input |
| Stride | How many positions the kernel moves between each application |
| Padding | Extra border added to the input before convolving, controlling output size |
| Channel | A depth slice of the input/output (e.g. R, G, B, or a learned feature map) |
