# Script — Pooling & Feature Maps

## Segment 1 (title)

Last lesson used MaxPool2d without stopping to unpack it. Pooling is simple, but it does a lot of work in a CNN — it shrinks feature maps, controls how much compute later layers need, and adds a useful bit of tolerance to small shifts. Let's take a closer look.

## Segment 2 (code)

Max pooling slides a window across each feature map and keeps only the maximum value inside it, discarding everything else. Keeping the strongest activation and throwing away its exact position is exactly what gives the network a little tolerance to the pattern shifting by a pixel or two.

## Segment 3 (code)

Average pooling does the same sliding window but takes the mean instead of the max, producing a smoother summary of the region. Max pooling tends to preserve sharp activations better, which is why it's the far more common default inside a CNN's body.

## Segment 4 (code)

Adaptive average pooling flips the setup: instead of choosing a window size, you choose the output size you want and it figures out the window automatically. Pooling down to a one-by-one output per channel is global average pooling, and it's extremely common right before a classifier head because it decouples the network from needing a fixed input image size.

## Segment 5 (outro)

Between convolutions and pooling, you now have the two core building blocks of a CNN's body. Up next, lesson twenty-six: image classification, end to end — putting the full pipeline together.
