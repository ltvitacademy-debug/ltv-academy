# Features & Superposition

Lesson 30 treated each attention head as an independently-inspectable component. Individual neurons, though, usually resist that kind of clean inspection -- a single neuron often seems to fire for several unrelated concepts at once. This lesson covers the real explanation: superposition, and why "feature" rather than "neuron" is the right unit of analysis.

## What you'll learn

- What a "feature" is, as distinct from a neuron
- The superposition hypothesis from "Toy Models of Superposition"
- Why sparsity is what makes superposition work, and what it costs
- How to reproduce the toy model's core trade-off in a few lines of PyTorch

## Features vs. neurons

A **feature** is a specific, interpretable property a model represents -- "this token is a verb," "this text is in French," "this is DNA sequence data." A neuron is just one coordinate of a layer's activation vector. The clean intuitive hope is that each neuron represents one feature. In practice, many neurons are **polysemantic**: they activate for several unrelated features, making the neuron itself uninterpretable even though the underlying concepts the model is tracking are perfectly coherent.

## The superposition hypothesis

Anthropic's "Toy Models of Superposition" (Elhage et al., 2022) explains why this happens. A model can represent *more* features than it has dimensions by assigning each feature its own direction in activation space and letting those directions be non-orthogonal -- overlapping rather than perfectly separated. This is **superposition**. It works because real features are usually **sparse**: for any given input, only a small fraction of all possible features are actually active. If two overlapping features are rarely active at the same time, the interference between them barely matters in practice, so the model can trade a small amount of accuracy for a large amount of representational capacity.

This is the single most important reason individual neurons are often not directly interpretable: a neuron's activation can be a blend of several superposed features' contributions, not a clean signal for any one of them.

## Reproducing the trade-off

The toy model behind this result is small enough to run directly: compress more sparse features than you have hidden dimensions, then reconstruct them, and watch what the reconstruction loss does.

```python
import torch

n_features, d_hidden = 20, 5  # deliberately more features than hidden dimensions
W = torch.randn(d_hidden, n_features, requires_grad=True) * 0.1

def toy_model(features):
    hidden = features @ W.T                   # (batch, d_hidden) -- compressed, superposed representation
    reconstruction = torch.relu(hidden @ W)    # (batch, n_features) -- decompressed back out
    return reconstruction

sparsity = 0.95  # 95% of features are off for any given input -- realistic sparsity
raw = torch.rand(256, n_features)
mask = (torch.rand(256, n_features) > sparsity).float()
features = raw * mask

reconstruction = toy_model(features)
loss = ((reconstruction - features) ** 2).mean()
```

With `d_hidden` smaller than `n_features`, `W`'s twenty columns (one direction per feature) cannot all be mutually orthogonal in a 5-dimensional space -- there simply isn't room. What the real Toy Models of Superposition experiments show is that, given this constraint, the model doesn't just fail: it learns to pack feature directions close together anyway, accepting some interference error in `loss`, because the high sparsity mask means most pairs of overlapping features are rarely both active at once. Lower the sparsity (make more features active simultaneously) and that interference gets much more costly, which is exactly the capacity/sparsity trade-off the paper maps out.

## Key terms

| Term | Meaning |
|---|---|
| Feature | A specific, interpretable property a model represents, independent of any one neuron |
| Polysemantic neuron | A single neuron that activates for multiple unrelated features, making it individually uninterpretable |
| Superposition | Representing more features than available dimensions by giving them overlapping, non-orthogonal directions |
| Sparsity | The property that, for any given input, only a small fraction of all possible features are active |
| Capacity/sparsity trade-off | The relationship whereby higher feature sparsity lets a model pack in more superposed features at lower interference cost |

## Recap

Superposition is why individual neurons are often not interpretable: a model with more features than dimensions packs them into overlapping directions, which works only because real features are sparse. This is also exactly the problem the next lesson's technique is built to undo. Up next, Lesson 32: Sparse Autoencoders.
