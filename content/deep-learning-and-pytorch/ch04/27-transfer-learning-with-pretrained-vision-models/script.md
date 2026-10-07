# Script — Transfer Learning With Pretrained Vision Models

## Segment 1 (title)

Training a CNN from scratch needs a lot of data and compute to work well. Most of the time a better starting point already exists: a model pretrained on millions of images, whose early layers have already learned general-purpose visual features you can reuse directly.

## Segment 2 (code)

Loading one is a single call. ResNet18_Weights.DEFAULT selects the best available pretrained weights, and that weights argument is the current torchvision API for this — it replaced the older pretrained=True flag.

## Segment 3 (code)

To reuse the backbone without disturbing what it already learned, freeze every existing parameter by setting requires_grad to False, then replace the final classifier layer with a fresh linear layer sized for your number of classes. That new layer defaults to trainable, so it's the only thing that actually learns from your data.

## Segment 4 (steps)

That frozen-backbone approach is called feature extraction, and it's fast and effective on small datasets. Fine-tuning instead unfreezes some or all of the backbone, usually at a smaller learning rate, letting it adjust further — often better once you have enough data to support it. Either way, matching the exact preprocessing the pretrained weights expect matters more than it looks like it would.

## Segment 5 (outro)

Transfer learning is often the fastest path to a strong result, and it's why most real vision projects don't start from a random initialization. Up next, lesson twenty-eight: data augmentation, for getting more out of the data you already have.
