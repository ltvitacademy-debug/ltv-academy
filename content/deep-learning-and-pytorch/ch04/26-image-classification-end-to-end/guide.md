# Image Classification, End to End

You've now met every piece individually: datasets, DataLoaders, conv blocks, pooling, batch norm, optimizers, schedulers, and checkpointing. This lesson wires them all together into one complete image classification pipeline, start to finish.

## What you'll learn

- The full shape of an image classification pipeline, end to end
- How `torchvision.datasets` and `transforms` fit in before the `DataLoader`
- How the pieces from Chapters 2-3 combine inside one training loop
- How to run inference on a single new image once training is done

## The six stages of the pipeline

```python
import torch
import torch.nn as nn
from torch.utils.data import DataLoader
from torchvision import datasets, transforms

# 1. Transforms -- turn raw images into normalized tensors
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5)),
])

# 2. Datasets + DataLoaders
train_data = datasets.CIFAR10("./data", train=True, download=True, transform=transform)
train_loader = DataLoader(train_data, batch_size=64, shuffle=True)
```

## Model, loss, optimizer, scheduler

```python
device = "cuda" if torch.cuda.is_available() else "cpu"
model = SimpleCNN(num_classes=10).to(device)

loss_fn = nn.CrossEntropyLoss()
optimizer = torch.optim.AdamW(model.parameters(), lr=1e-3, weight_decay=0.01)
scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=20)
```

`SimpleCNN` here is the model built in Lesson 24. Notice every other piece — the loss function, `AdamW`, `CosineAnnealingLR` — is exactly what you already learned in Chapters 2 and 3; nothing about this pipeline is new in isolation.

## The training loop

```python
for epoch in range(20):
    model.train()
    for images, labels in train_loader:
        images, labels = images.to(device), labels.to(device)

        optimizer.zero_grad()
        outputs = model(images)
        loss = loss_fn(outputs, labels)
        loss.backward()
        torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
        optimizer.step()

    scheduler.step()
```

This loop combines gradient clipping (Lesson 19) and a cosine schedule (Lesson 18) with the basic forward/backward/step pattern from Chapter 1 — a realistic training loop is just several lessons' worth of small techniques, stacked.

## Running inference on a single image

```python
model.eval()
with torch.no_grad():
    image = image.unsqueeze(0).to(device)   # add a batch dimension
    logits = model(image)
    predicted_class = logits.argmax(dim=1).item()
```

`model.eval()` disables dropout and switches batch norm to its running statistics; `torch.no_grad()` skips building a computation graph since no backward pass is needed; `unsqueeze(0)` adds back the batch dimension a single image is missing.

## Key terms

| Term | Meaning |
|---|---|
| `transforms.Compose` | Chains multiple image transforms into one callable pipeline |
| End-to-end pipeline | Data loading, model, training loop, and inference, wired together as one working system |
| `model.eval()` + `torch.no_grad()` | The standard pairing for running inference efficiently and correctly |
| `unsqueeze(0)` | Adds a batch dimension of size 1 to a single unbatched example |
