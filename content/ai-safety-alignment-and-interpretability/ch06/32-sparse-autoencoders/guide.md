# Sparse Autoencoders

Lesson 31 established the problem: superposition packs more features than dimensions into overlapping neuron directions, so individual neurons mix multiple concepts together. This lesson covers the field's main tool for undoing that -- training a sparse autoencoder to re-expand a model's activations into a larger, more monosemantic basis.

## What you'll learn

- What a sparse autoencoder (SAE) does to a layer's activations
- The real results from "Towards Monosemanticity" and "Scaling Monosemanticity"
- The SAE loss function: reconstruction plus an L1 sparsity penalty
- A working, minimal SAE implementation in PyTorch

## The idea: decompress into a bigger, sparser basis

A **sparse autoencoder** takes a model's activations at some layer and encodes them into a much higher-dimensional, sparse hidden representation, then decodes back to the original dimension. If superposition is the model packing many features into few dimensions, an SAE deliberately does the opposite: it gives the decomposition many more directions to work with (the SAE's hidden layer is wider than the model's own layer), so that, ideally, each resulting direction corresponds to one coherent, human-interpretable feature instead of a blend of several.

Anthropic's "Towards Monosemanticity: Decomposing Language Models With Dictionary Learning" (2023) applied exactly this to a one-layer transformer, training an SAE on its activations and decomposing a 512-neuron layer into more than 4,000 learned features -- each noticeably more interpretable than the raw neurons, covering specific concepts like DNA sequences, legal language, and HTTP requests. "Scaling Monosemanticity" (2024) showed the same technique works on a production model: an SAE trained on the residual stream of a middle layer of Claude 3 Sonnet, with tens of millions of features, surfaced interpretable features for concrete entities (a "Golden Gate Bridge" feature) and abstract concepts (features related to sycophancy and deception) -- demonstrated publicly by artificially clamping the Golden Gate Bridge feature high in the "Golden Gate Claude" demo.

## The architecture and loss function

An SAE has an encoder mapping the model's activations into a sparse code, and a decoder mapping that code back:

```python
import torch
import torch.nn as nn

class SparseAutoencoder(nn.Module):
    def __init__(self, d_model, d_hidden):
        super().__init__()
        self.W_enc = nn.Linear(d_model, d_hidden, bias=True)
        self.W_dec = nn.Linear(d_hidden, d_model, bias=True)

    def forward(self, activations):
        features = torch.relu(self.W_enc(activations))   # (batch, d_hidden) -- sparse, mostly-zero code
        reconstruction = self.W_dec(features)             # (batch, d_model) -- back to activation space
        return reconstruction, features
```

`d_hidden` is set much larger than `d_model` -- an "expansion factor" of anywhere from 4x to several hundred x in real SAE training runs -- giving the encoder enough directions that it doesn't need to pack multiple features into one, the way the original model's own neurons do.

The loss function is what actually enforces sparsity and interpretability, not just the wider hidden layer on its own:

```python
def sae_loss(activations, reconstruction, features, l1_coeff=1e-3):
    recon_loss = ((reconstruction - activations) ** 2).mean()   # how well the SAE reconstructs the original activations
    sparsity_loss = features.abs().mean()                        # pushes most hidden features toward exactly zero
    return recon_loss + l1_coeff * sparsity_loss
```

`recon_loss` alone would let the SAE learn an arbitrary, dense re-encoding that reconstructs perfectly but isn't any more interpretable than the original neurons. The `L1` penalty on `features` is what forces most of the wide hidden layer to be off for any given input -- matching the real sparsity of the underlying features from Lesson 31 -- which is the pressure that pushes individual hidden units toward representing one clean feature each rather than a blend.

## Key terms

| Term | Meaning |
|---|---|
| Sparse autoencoder (SAE) | A model trained to decompose a layer's activations into a wider, sparser, more interpretable feature basis |
| Dictionary learning | The general family of techniques SAEs belong to, learning an over-complete basis ("dictionary") for a signal |
| Expansion factor | The ratio of an SAE's hidden dimension to the original activation dimension it's decomposing |
| L1 sparsity penalty | A loss term pushing most hidden-feature activations toward zero, enforcing sparse, interpretable codes |
| Monosemantic feature | A learned feature that corresponds to one coherent, human-interpretable concept rather than several blended ones |

## Recap

Sparse autoencoders undo superposition by decomposing activations into a wider, sparser basis, trained with a reconstruction-plus-L1 loss, and real runs of this technique found thousands of monosemantic features in a toy model and millions in a production model (Claude 3 Sonnet). That gives you a bottom-up way to find features; the next lesson covers a complementary, top-down technique for studying a single component directly. Up next, Lesson 33: Attention Head Analysis.
