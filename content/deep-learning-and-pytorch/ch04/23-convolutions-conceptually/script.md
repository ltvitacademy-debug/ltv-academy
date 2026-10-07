# Script — Convolutions, Conceptually

## Segment 1 (title)

Every network you've built so far treated an image as a flat vector, throwing away the fact that nearby pixels are related. A convolution lets a network learn from that spatial structure directly, and it's the foundation of every architecture in this chapter.

## Segment 2 (steps)

A convolution slides a small grid of learned weights, the kernel, across the input. At each position it computes one dot product between the kernel and the patch underneath it, then moves over by however many positions the stride specifies and does it again. The same small kernel gets reused at every position, which is why convolutional layers need far fewer parameters than a fully connected layer looking at the same image.

## Segment 3 (code)

Padding and stride together decide the output's size. Padding adds extra border around the input so the kernel can be centered even near the edges; stride controls how far it jumps between positions. The formula on screen shows why padding equal to one with a three-by-three kernel and stride of one is such a common combination — it keeps the output exactly the same size as the input.

## Segment 4 (code)

Conv2d's arguments map directly onto these ideas: in_channels matches the input's depth, out_channels is how many independently learned kernels — and therefore feature maps — you want, and kernel_size, stride, and padding control the sliding window itself.

## Segment 5 (outro)

Hold onto that output-size formula — you'll use it constantly once you start stacking layers. Up next, lesson twenty-four: building a real CNN in PyTorch.
