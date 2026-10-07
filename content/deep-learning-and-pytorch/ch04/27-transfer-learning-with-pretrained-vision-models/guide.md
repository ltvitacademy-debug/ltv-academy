# Transfer Learning With Pretrained Vision Models

Training a CNN from scratch, like you did last lesson, needs a lot of data and compute to work well. Most of the time, a better starting point already exists: a model pretrained on millions of images, whose early layers have already learned general-purpose visual features you can reuse directly.

## What you'll learn

- Why features learned on a large dataset transfer well to a new, smaller task
- How to load a pretrained model with `torchvision.models` using the current `weights=` API
- How to freeze a backbone and replace its classifier head for a new task
- The difference between feature extraction and fine-tuning

## Why pretrained features transfer

A network trained on a huge, diverse dataset learns early layers that detect edges, textures, and simple shapes — visual patterns useful for almost any image task, not just the one it was trained on. Only its later, more specialized layers are tightly bound to the original task. Transfer learning reuses the general early layers and replaces or retrains the specialized later ones for your new task.

## Loading a pretrained model

```python
from torchvision.models import resnet18, ResNet18_Weights

weights = ResNet18_Weights.DEFAULT
model = resnet18(weights=weights)
```

`ResNet18_Weights.DEFAULT` selects the best available pretrained weights for that architecture. The `weights=` argument is the current `torchvision` API — older code using `pretrained=True` still works in some versions but is deprecated in favor of this explicit weights enum.

## Freezing the backbone, replacing the head

```python
import torch.nn as nn

for param in model.parameters():
    param.requires_grad = False

model.fc = nn.Linear(model.fc.in_features, num_classes)
```

Setting `requires_grad = False` on every existing parameter means backpropagation won't update them — the pretrained backbone stays frozen. Replacing `model.fc` (ResNet's final classifier layer) with a fresh `nn.Linear` automatically makes that new layer trainable, since newly created parameters default to `requires_grad=True`. Only this new layer learns from your data.

## Matching the preprocessing the model expects

```python
preprocess = weights.transforms()
# applies the exact resize/crop/normalize pipeline
# the pretrained weights were trained with
```

Each pretrained `weights` object exposes the exact preprocessing it expects — getting this wrong (e.g. forgetting the normalization the original model used) can quietly hurt accuracy even if nothing errors out.

## Feature extraction vs. fine-tuning

Freezing the whole backbone and only training a new head is called **feature extraction** — fast and effective when your new dataset is small. **Fine-tuning** instead unfreezes some or all of the backbone (usually at a smaller learning rate than the new head) and lets it adjust slightly to the new task, often performing better when you have enough data to support it.

## Key terms

| Term | Meaning |
|---|---|
| Transfer learning | Reusing a model trained on one (usually large) task as a starting point for a new, related task |
| `weights=` API | torchvision's current way of specifying which pretrained weights to load |
| Feature extraction | Freezing the pretrained backbone and training only a new head |
| Fine-tuning | Unfreezing some or all of the backbone to adapt it further to the new task |
| `requires_grad` | Controls whether a parameter receives gradient updates during backpropagation |
