# Building a Multilayer Perceptron

Everything in this chapter so far — `nn.Module`, linear layers, activations, losses, optimizers — was building toward this lesson. A multilayer perceptron (MLP) is the simplest "real" neural network: a stack of linear layers separated by activations, exactly as in Lesson 9, now assembled into a full `nn.Module` subclass, trained with a real optimizer, on data from a real `DataLoader`. This is the first time every piece from Chapter 1 and Chapter 2 comes together in one script.

## What you'll learn

- How to structure an MLP as an `nn.Module` subclass with named submodules
- Choosing hidden layer sizes and depth, at a beginner's level of intuition
- Writing a complete training loop for a classification MLP, end to end
- Switching between `model.train()` and `model.eval()` correctly
- Evaluating accuracy on a held-out set

## Defining the MLP

```python
import torch.nn as nn

class MLP(nn.Module):
    def __init__(self, in_features, hidden_size, num_classes):
        super().__init__()
        self.layer1 = nn.Linear(in_features, hidden_size)
        self.relu1 = nn.ReLU()
        self.layer2 = nn.Linear(hidden_size, hidden_size)
        self.relu2 = nn.ReLU()
        self.output = nn.Linear(hidden_size, num_classes)

    def forward(self, x):
        x = self.relu1(self.layer1(x))
        x = self.relu2(self.layer2(x))
        return self.output(x)   # raw logits -- no softmax here

model = MLP(in_features=20, hidden_size=64, num_classes=3)
```

Notice the output layer returns raw logits with no activation on top — exactly what `nn.CrossEntropyLoss` (Lesson 10) expects. `hidden_size=64` and two hidden layers is a reasonable starting point for small tabular datasets; there's no universal correct answer, and Chapter 3 covers more principled ways to think about these choices.

## The full training loop, assembled

```python
import torch
from torch.utils.data import DataLoader, TensorDataset
import torch.optim as optim

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = MLP(in_features=20, hidden_size=64, num_classes=3).to(device)

loader = DataLoader(TensorDataset(X_train, y_train), batch_size=32, shuffle=True)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

model.train()
for epoch in range(20):
    for x_batch, y_batch in loader:
        x_batch, y_batch = x_batch.to(device), y_batch.to(device)

        optimizer.zero_grad()
        logits = model(x_batch)
        loss = criterion(logits, y_batch)
        loss.backward()
        optimizer.step()
```

Every piece here is something you already know: `DataLoader` from Lesson 5, `.to(device)` from Lesson 3, `CrossEntropyLoss` from Lesson 10, `Adam` and the three-call pattern from Lesson 11. `model.train()` before the loop puts the model in training mode (it matters once you add dropout or batch norm in Chapter 3; for a plain MLP like this it's mostly a habit worth building now).

## Evaluating accuracy

```python
model.eval()
correct, total = 0, 0

with torch.no_grad():
    for x_batch, y_batch in test_loader:
        x_batch, y_batch = x_batch.to(device), y_batch.to(device)
        logits = model(x_batch)
        predicted = logits.argmax(dim=1)   # highest-scoring class per example
        correct += (predicted == y_batch).sum().item()
        total += y_batch.size(0)

accuracy = correct / total
print(f"Test accuracy: {accuracy:.2%}")
```

`model.eval()` and `torch.no_grad()` both appear here, doing different jobs: `eval()` changes layer *behavior* (relevant for dropout/batch norm, not used here, but good practice), while `no_grad()` just skips building a computational graph since we don't need gradients during evaluation. `logits.argmax(dim=1)` picks out the index of the highest-scoring class for each example — the model's predicted class — which you then compare directly against the integer labels.

## Key terms

| Term | Meaning |
|---|---|
| Multilayer perceptron (MLP) | A stack of linear layers separated by activation functions |
| Hidden layer | Any layer between the input and the final output layer |
| `.argmax(dim=1)` | Returns the index of the largest value along a dimension; used to get predicted classes from logits |
| `model.train()` / `model.eval()` | Switches layer behavior between training mode and inference mode |

## Recap

An MLP is just `nn.Linear` and activation layers stacked inside an `nn.Module`, trained with the exact same `DataLoader` plus `zero_grad`/`backward`/`step` pattern you've been using all chapter, and evaluated with `model.eval()`, `torch.no_grad()`, and `argmax`. You've now built, trained, and evaluated a real neural network from scratch. Next up, Lesson 13: weight initialization, and why the random starting point for your parameters matters more than it might seem.
