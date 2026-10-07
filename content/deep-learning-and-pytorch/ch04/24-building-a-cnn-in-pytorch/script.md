# Script — Building a CNN in PyTorch

## Segment 1 (title)

You now know what a single convolution does. A convolutional neural network is just several of them stacked together, each building on the features the last one found, followed by a classifier head. Let's build one end to end.

## Segment 2 (code)

Almost every CNN is built from a repeating unit you've already met piece by piece: a convolution, then batch normalization, then a nonlinearity, often followed by pooling to shrink the spatial size. This block is the atom everything else is made of.

## Segment 3 (code)

Stack a few of these blocks and you get a feature extractor. Each block typically raises the channel count — more learned feature detectors — while pooling shrinks the spatial resolution, trading detail for richer features as you go deeper. For a thirty-two by thirty-two input, two pooling layers of stride two leave you with an eight by eight map at sixty-four channels.

## Segment 4 (code)

Getting from that feature map to a prediction just needs one bridge: flatten every dimension from index one onward into a single vector, leaving the batch dimension untouched, then feed that into a linear classifier head.

## Segment 5 (outro)

Everything here — the conv, the batch norm, the pooling — you've already seen individually; this lesson was about the assembly. Up next, lesson twenty-five: a closer look at pooling and feature maps.
