# Data Augmentation

Collecting more labeled images is expensive. Data augmentation is the cheap alternative: generate realistic variations of the images you already have — flipped, cropped, recolored — so the model sees more diversity without needing a single new label. This closes out the chapter.

## What you'll learn

- Why augmentation reduces overfitting instead of just adding "noise"
- How to build an augmentation pipeline with `torchvision.transforms.v2`
- Which augmentations suit natural images, and which can quietly break your labels
- Why augmentation is applied only to the training set, never to validation or test

## Why augmentation helps

A model that's only ever seen a cat facing left may stumble on a cat facing right, even though nothing about "catness" changed. Augmentation exposes the model to those harmless variations directly, so it learns to ignore them instead of accidentally keying on them. It's a close cousin of the regularization techniques from Chapter 3 — both make it harder for the model to overfit to incidental details of the training set.

## Building a pipeline with transforms.v2

```python
import torch
from torchvision.transforms import v2

train_transforms = v2.Compose([
    v2.RandomHorizontalFlip(p=0.5),
    v2.RandomCrop(32, padding=4),
    v2.ColorJitter(brightness=0.2, contrast=0.2),
    v2.ToImage(),
    v2.ToDtype(torch.float32, scale=True),
    v2.Normalize(mean=[0.491, 0.482, 0.447], std=[0.247, 0.243, 0.262]),
])
```

`transforms.v2` is torchvision's current transforms API; it's a drop-in-compatible upgrade over the original `transforms` module with broader input support. `RandomHorizontalFlip` mirrors the image left-right with some probability; `RandomCrop` with `padding` pads the image then crops back to the target size, shifting the subject's position slightly; `ColorJitter` perturbs brightness and contrast. `ToImage()` plus `ToDtype(..., scale=True)` is the v2 way of converting to a properly-scaled float tensor, taking the place of the older `ToTensor()`.

## Choosing augmentations that don't break the label

Not every transform is safe for every task. A horizontal flip is harmless for classifying "cat vs. dog," but it would actively break a task where left/right matters, like reading handwritten digits (a flipped 6 looks like a 9) or detecting text. The rule of thumb: an augmentation is safe only if a human would still assign the same label to the transformed image.

## Augment training data only

```python
train_data = datasets.CIFAR10("./data", train=True, transform=train_transforms)
val_data = datasets.CIFAR10(
    "./data", train=False,
    transform=v2.Compose([v2.ToImage(), v2.ToDtype(torch.float32, scale=True)]),
)
```

Augmentation exists to make training harder and more varied, which is the whole point — but validation and test data should reflect the real, unmodified distribution you'll actually see in production. Applying random augmentations there would make your evaluation metrics noisy and unrepresentative.

## Key terms

| Term | Meaning |
|---|---|
| Data augmentation | Generating label-preserving variations of existing training images to increase effective data diversity |
| `transforms.v2` | torchvision's current transforms API |
| `RandomHorizontalFlip` / `RandomCrop` / `ColorJitter` | Common augmentations for natural images: mirroring, shifted cropping, and color perturbation |
| Label-preserving | A transform that a human would agree doesn't change the correct label |
