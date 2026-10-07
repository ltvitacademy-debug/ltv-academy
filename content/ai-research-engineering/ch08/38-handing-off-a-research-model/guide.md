# Handing Off a Research Model

Chapter 7 closed with how a research engineer works with scientists and feedback inside the research phase. This chapter crosses a different boundary: the moment a result stops being "a checkpoint that beat the baseline" and starts being something another team has to run, serve, and keep running without you in the room. That transition fails more often from a bad handoff than from a bad model — a checkpoint file with no context is not a deliverable.

## What you'll learn

- Why a raw checkpoint is necessary but not sufficient as a handoff artifact
- Two real export paths — TorchScript and ONNX — and when each is the right one
- What a model card has to specify so the production team isn't guessing at your assumptions
- The minimum checklist that keeps a handoff from becoming an unmaintainable black box later

## Why "here's the checkpoint" isn't a handoff

A research repo runs in eager-mode Python, with a training loop, a Hydra config system, a dozen loose dependencies pinned (or not) in a requirements file, and preprocessing logic scattered across a `data.py` that assumes it's being imported alongside everything else. None of that is what a serving system wants. A serving system wants a self-contained artifact: weights plus a fixed computation graph plus a documented input/output contract, with no dependency on the rest of the research repo existing on disk.

Handing off `model_epoch_47.pt` and a Slack message is how a production team ends up reverse-engineering your preprocessing three months later, usually at 2am during an incident. The fix is packaging the model into a format designed to be loaded by something other than your own training script.

## Packaging with TorchScript

TorchScript captures a model as a serializable, optimizable graph that can be loaded without the original Python class definition. Tracing is the simplest path for a model with no data-dependent control flow:

```python
import torch

model.eval()
example_input = torch.randn(1, 3, 224, 224)

traced = torch.jit.trace(model, example_input)
traced.save("model_traced.pt")

# Elsewhere, with no dependency on your model's source code:
loaded = torch.jit.load("model_traced.pt")
output = loaded(example_input)
```

If the model has real control flow (an `if` branching on tensor values, a loop with a data-dependent trip count), `torch.jit.script(model)` compiles the actual Python logic instead of recording one execution path — trace the forward pass first, and only reach for `torch.jit.script` when tracing produces a graph that silently bakes in one branch.

## Packaging with ONNX

ONNX (Open Neural Network Exchange) targets interoperability: the same exported model can be loaded by Triton, ONNX Runtime, or non-PyTorch serving stacks. It's the right choice when the production team's serving infrastructure isn't PyTorch-specific, or when you want the option to swap inference runtimes later without re-exporting from research code:

```python
import torch

model.eval()
example_input = torch.randn(1, 3, 224, 224)

torch.onnx.export(
    model,
    example_input,
    "model.onnx",
    input_names=["pixel_values"],
    output_names=["logits"],
    dynamic_axes={"pixel_values": {0: "batch"}, "logits": {0: "batch"}},
    opset_version=17,
)
```

`dynamic_axes` matters in practice — without it, the exported graph hardcodes the batch size from `example_input`, and the production system silently gets a model that only accepts batch size 1.

## The model card: specifying assumptions explicitly

A model card (the format originated with Mitchell et al.'s "Model Cards for Model Reporting") is a short, structured document that makes the model's assumptions legible to someone who didn't train it:

```text
# Model Card: sparse-attention-classifier-v3

## Model details
- Architecture: ResNet-50 backbone + sparse attention head
- Training data: internal dataset v2.3 (see data_version in manifest)
- Export format: ONNX, opset 17

## Intended use
- Batch image classification, 1000-class taxonomy
- Not validated for images outside the training distribution's domain (medical, satellite)

## Metrics
- Held-out top-1 accuracy: 76.2% (eval harness: eval/run_eval.py, commit a3f91c2)
- Known weak class: "wolf" vs "coyote" (confused >30% of the time)

## Preprocessing contract
- Input: RGB, resized to 224x224, normalized with ImageNet mean/std
- Any deviation from this preprocessing invalidates the reported metrics
```

The preprocessing contract section is the one teams skip and regret — a model is only as correct as the guarantee that production preprocessing matches training preprocessing exactly.

## A minimal handoff checklist

- **Packaged inference artifact** — TorchScript or ONNX, not a raw state dict
- **Preprocessing code, pinned to a version** — the exact transform pipeline, not a description of it
- **One example input/output pair** — for the production team to verify parity after their own loading code runs
- **Eval harness + held-out score** — so a future regression is detectable (Lesson 40 covers this in depth)
- **Model card** — intended use, known weaknesses, preprocessing contract
- **An owner** — a name or team Slack channel for "this model is behaving strangely" six months from now

## Key terms

- **TorchScript** — PyTorch's format for serializing a model as a graph loadable without the original Python class, via tracing or scripting
- **ONNX** — an open, framework-agnostic model exchange format usable by serving stacks beyond PyTorch
- **Dynamic axes** — ONNX export metadata marking which tensor dimensions (e.g. batch size) should stay flexible rather than being hardcoded from the example input
- **Model card** — a structured document specifying a model's intended use, metrics, and preprocessing contract for a non-author audience
- **Preprocessing contract** — the exact input transform pipeline a model was trained against, which production must reproduce exactly for reported metrics to hold
