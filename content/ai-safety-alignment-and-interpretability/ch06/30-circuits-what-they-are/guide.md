# Circuits: What They Are

Chapter 5 gave you the toolkit for looking inside a model — probes, activation visualization, the logit lens, attribution. This chapter uses that toolkit for a specific, ambitious goal: reverse-engineering a transformer one circuit at a time. This lesson defines exactly what a "circuit" is and the framework researchers use to find one.

## What you'll learn

- What a circuit is, concretely, in terms of a model's actual weights and components
- The residual-stream framing from "A Mathematical Framework for Transformer Circuits"
- Why this is a reverse-engineering project, not just a visualization exercise
- How to isolate one component's contribution with a forward hook, as a first step toward circuit analysis

## A circuit is a subgraph that implements an algorithm

A **circuit** is a specific subset of a model's components — particular attention heads, particular MLP neurons, particular directions in the residual stream — connected by particular weights, that together implement one identifiable piece of the model's behavior. It's not a metaphor: a circuit is a real, traceable computational pathway through the network's actual parameters, the same way a subroutine is a real, traceable piece of a larger program.

This framing comes from Anthropic's "A Mathematical Framework for Transformer Circuits" (Elhage et al., 2021) and the earlier Distill essay "Zoom In: An Introduction to Circuits" (Olah et al., 2020), which argued that neural networks contain meaningful features connected by interpretable circuits, and that similar circuits recur across different models. Mechanistic interpretability takes that claim seriously as a research program: instead of asking only "what correlates with what" (the probing-classifier style of Chapter 5), it asks "which specific weights compute this behavior, and how."

## The residual stream as the circuit's wiring

The Mathematical Framework paper's key simplification is to treat the **residual stream** — the running sum of every layer's output, carried forward through the network — as a shared communication channel. Every attention head and MLP reads from this stream and additively writes back into it. Because the contributions are additive, you can treat each head as acting independently: head 5 in layer 3 reads some subspace of the residual stream, computes something, and adds its own contribution back in, without needing to route through any other specific head.

This is what makes circuit analysis tractable at all. Instead of one impenetrable function, you get a sum of independently-inspectable pieces — and a circuit is the subset of those pieces whose combined contribution produces a particular behavior.

## Isolating one component's contribution

Before you can trace a circuit across many heads, you need the basic move: capturing exactly what one head is contributing to the residual stream, for a real input. A PyTorch forward hook on the attention module does this directly.

```python
import torch

captured = {}

def save_head_output(layer_idx, head_idx, num_heads, d_head):
    def hook(module, input, output):
        # output shape: (batch, seq, d_model) -- the attention block's combined contribution
        batch, seq, d_model = output.shape
        heads = output.view(batch, seq, num_heads, d_head)
        captured[f"L{layer_idx}H{head_idx}"] = heads[:, :, head_idx, :].detach()
    return hook

handle = model.blocks[3].attn.register_forward_hook(
    save_head_output(layer_idx=3, head_idx=5, num_heads=8, d_head=64)
)
output = model(input_ids)
handle.remove()

head_activation = captured["L3H5"]  # (batch, seq, d_head) -- exactly this head's own contribution
```

Reshaping the attention block's combined output back into `(batch, seq, num_heads, d_head)` recovers each individual head's slice, since the block internally concatenates all heads before its output projection. This single captured tensor is the atomic unit every later lesson in this chapter builds on: once you can isolate one head's contribution, you can compare it across inputs, ablate it, or patch it into a different run.

## Key terms

| Term | Meaning |
|---|---|
| Circuit | A specific subgraph of a model's weights/components that implements an identifiable algorithm or behavior |
| Residual stream | The additive running sum every layer reads from and writes back into; the circuit's shared wiring |
| Component | An individual, independently-inspectable piece of the network — one attention head, one MLP, one neuron |
| Reverse engineering (of a model) | Recovering the algorithm a trained network implements from its weights, rather than assuming it from the architecture |
| Forward hook | A PyTorch mechanism for capturing (or later, modifying) a specific module's output during a real forward pass |

## Recap

A circuit is a concrete subgraph of a model's components — not a metaphor — that together implement one piece of behavior, and the residual stream's additive structure is what makes isolating and tracing those components possible at all. You just captured a single head's own contribution with a forward hook, the atomic building block for everything that follows. Next, Lesson 31: Features & Superposition, which explains why those components so rarely map one-to-one onto single, clean concepts.
