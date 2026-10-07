# Saving & Loading Models

Training can take minutes, hours, or days. If your script crashes, your laptop sleeps, or you simply want to use a trained model later without retraining it, you need to persist it to disk and load it back. PyTorch gives you two levels of saving: the recommended `state_dict` approach, and the whole-object approach, which is more fragile. This lesson covers both, plus how to resume training exactly where you left off.

## What you'll learn

- What a `state_dict` is and why saving one is the recommended approach
- How to save and load model weights with `torch.save` / `torch.load` / `load_state_dict`
- Why you must call `model.eval()` after loading for inference
- How to save and resume full training state, including the optimizer
- The difference between saving weights and saving the entire model object

## What a state_dict actually is

Every `nn.Module` (covered in depth in Lesson 8) exposes a `state_dict()` — an ordered Python dictionary mapping each layer's name to its learned tensor values:

```python
model.state_dict()
# OrderedDict([
#   ('linear.weight', tensor([[2.498]])),
#   ('linear.bias', tensor([-0.997])),
# ])
```

This dictionary contains only the numbers — no class definitions, no code. That's exactly why it's the recommended thing to save: it's portable, inspectable, and doesn't depend on your model's source code being importable in exactly the same way later.

## Saving and loading weights (the recommended way)

```python
import torch

# Save
torch.save(model.state_dict(), "model_weights.pt")

# Load -- you must already have an instance of the same model class
model = MyModel()
model.load_state_dict(torch.load("model_weights.pt"))
model.eval()   # set to evaluation mode before inference
```

`torch.save` serializes any Python object (here, the `state_dict`) to a file using Python's `pickle` protocol under the hood. `torch.load` reads it back. `load_state_dict` copies every saved tensor into the matching parameter of an already-constructed model — the model's architecture (the class definition) has to already exist in your code; only the numbers are restored.

## Why model.eval() matters

```python
model.eval()        # turns off dropout, uses running stats for batch norm
with torch.no_grad():
    predictions = model(test_inputs)
```

Some layers you'll meet in Chapter 3 (`nn.Dropout`, `nn.BatchNorm1d`) behave differently during training versus inference. `model.eval()` switches the whole model into inference behavior. Forgetting it after loading a model for inference is a very common, very confusing bug — the model loads fine and runs, but produces inconsistent or worse predictions than expected.

## Saving and resuming full training state

For resuming an interrupted training run, you need more than just the weights — you need the optimizer's internal state (like momentum buffers, covered in Lesson 11) and whatever epoch you stopped at:

```python
checkpoint = {
    "epoch": epoch,
    "model_state_dict": model.state_dict(),
    "optimizer_state_dict": optimizer.state_dict(),
    "loss": loss.item(),
}
torch.save(checkpoint, "checkpoint.pt")

# Resume later:
checkpoint = torch.load("checkpoint.pt")
model.load_state_dict(checkpoint["model_state_dict"])
optimizer.load_state_dict(checkpoint["optimizer_state_dict"])
start_epoch = checkpoint["epoch"] + 1
model.train()   # back to training mode
```

A checkpoint is just a Python dictionary with whatever keys you find useful — there's no fixed schema. Saving the optimizer's state matters because optimizers like Adam (Lesson 11) track per-parameter running statistics; resuming without them means momentum restarts from zero, which can visibly disrupt training for a while.

## Weights vs. the whole model object

```python
# Less recommended: saves the entire object, including class definition
torch.save(model, "whole_model.pt")
model = torch.load("whole_model.pt")
```

Saving the whole object is more convenient in the moment but more fragile: PyTorch pickles a reference to your model's class, so loading it later requires the exact same class definition to be importable in the exact same location in your code. Refactor or rename your model class, and old whole-model checkpoints can fail to load. The `state_dict` approach avoids this entirely, which is why it's the documented, recommended pattern.

## Key terms

| Term | Meaning |
|---|---|
| `state_dict` | An ordered dict mapping layer names to their learned tensors |
| `torch.save` / `torch.load` | Serialize/deserialize a Python object (model, checkpoint dict, etc.) to/from disk |
| `load_state_dict` | Copies saved tensor values into an existing model's parameters |
| `model.eval()` | Switches the model to inference behavior (e.g. disables dropout) |
| Checkpoint | A dictionary of whatever training state you need to resume later |

## Recap

Save `state_dict()`, not the whole model object, because it's portable and doesn't depend on your class definition staying importable exactly as-is. Always call `model.eval()` before inference on a loaded model, and bundle the optimizer's state into a checkpoint dictionary if you need to resume training exactly where you left off. Next up, Lesson 7: the debugging habits that catch most PyTorch mistakes before they waste your time.
