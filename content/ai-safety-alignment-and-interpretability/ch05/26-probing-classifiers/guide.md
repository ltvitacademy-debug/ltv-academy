# Probing Classifiers

This is the first hands-on lesson in the chapter: you'll train a probing classifier against a transformer's internal activations and see exactly what it can and can't tell you. Probing is one of the oldest interpretability tools still in active use, and it's the right place to start because it requires nothing more exotic than a hook and a logistic regression.

## What you'll learn

- What a probing classifier is and how it's trained
- How to pull a hidden-state activation out of a transformer using a forward hook
- Why high probe accuracy shows information is present and decodable, not that the model causally uses it
- Control tasks and selectivity: how researchers catch probes that are "cheating"
- Where probing fits as a diagnostic alongside the deeper circuit-level methods later in this course

## The basic idea

A probing classifier is a small auxiliary model — usually something as simple as a linear classifier or logistic regression — trained to predict some concept of interest (part of speech, sentiment, truthfulness, a syntactic category) from a frozen model's internal activations. The transformer itself is never updated; only the probe is trained, using the transformer's activations as fixed input features. If the probe can predict the concept well, that's evidence the concept is represented in a way that's linearly (or near-linearly) decodable from that activation. This technique goes back to Alain and Bengio's 2016 work on linear classifier probes for vision networks, and has become a standard tool for asking "is X information present at layer L" in language models too.

## Getting the activation: a forward hook

In a from-scratch decoder-only transformer, the cleanest way to grab an intermediate activation without modifying the model's forward pass is a PyTorch forward hook, registered on the residual stream output of whichever layer you want to probe.

```python
import torch
import torch.nn as nn

# Assume `model` is a decoder-only transformer with model.blocks[i]
# as each transformer block, and that it outputs residual-stream
# activations of shape (batch, seq_len, d_model).

captured = {}

def grab_activation(module, inputs, output):
    # output is the residual stream AFTER this block
    captured["layer_6"] = output.detach()

hook_handle = model.blocks[6].register_forward_hook(grab_activation)

with torch.no_grad():
    logits = model(input_ids)  # triggers the hook as a side effect

hook_handle.remove()

# Use the activation at the final token position as the probe's input feature
activations = captured["layer_6"][:, -1, :]  # shape: (batch, d_model)
```

With `activations` in hand, probing is just supervised learning: label each example with the concept you're testing (say, whether the input sentence is grammatically plural or singular), and train a small linear layer on top.

```python
probe = nn.Linear(activations.shape[-1], num_classes)
optimizer = torch.optim.Adam(probe.parameters(), lr=1e-3)
loss_fn = nn.CrossEntropyLoss()

for epoch in range(num_epochs):
    logits = probe(activations)          # the transformer is frozen
    loss = loss_fn(logits, labels)
    optimizer.zero_grad()
    loss.backward()                       # gradients flow only into the probe
    optimizer.step()
```

Because the transformer's parameters never receive gradients here, whatever the probe learns to do, it learns purely from the fixed representation the frozen model already produced.

## The core caveat: decodable is not the same as used

This is the single most important caveat in probing research, and it's worth stating precisely: a probe achieving high accuracy tells you the concept is present and linearly recoverable from that activation. It does not tell you that the model's own downstream computation actually reads or relies on that information to produce its output. A probe is a brand-new classifier, trained with its own gradient descent, completely separate from whatever computation the transformer itself performs afterward. The model could carry information in an activation that the probe easily decodes, while the model's later layers never actually route through that particular linear direction on the way to the final output. Probing establishes a correlational, representational claim — concept X is findable here — not a causal, mechanistic claim — the model uses concept X here to decide its output. Belinkov's 2021 survey on probing classifiers reviews exactly this gap, alongside the methodological fixes the field has developed.

## Control tasks: catching a probe that's cheating

A further wrinkle: a sufficiently expressive probe can achieve high accuracy on almost any labeling task purely by memorizing patterns in the training examples, even when the underlying representation doesn't meaningfully encode the concept in any generalizable way. Hewitt and Liang's control-task method addresses this directly — construct a second task with the same input distribution but random, meaningless labels, and check whether the probe also fits that random task well. **Selectivity** is defined as the gap between accuracy on the real task and accuracy on the random control task. A probe with high accuracy but low selectivity is mostly memorizing; a probe with high accuracy and high selectivity is better evidence that the representation genuinely encodes the concept you're testing for.

## Where probing fits in your toolkit

Treat probing as a fast, cheap first diagnostic: does layer L seem to carry concept X at all, in a form that's at least linearly accessible? It's an excellent way to narrow down where to look before reaching for a more expensive, more causally rigorous method. It is not, on its own, a circuit-level explanation of how the model computes anything — for that, later interpretability work turns to tools that test causal influence directly, such as intervening on activations and watching the effect on the output, rather than only reading them off.

## Key terms

| Term | Meaning |
|---|---|
| Probing classifier | A small auxiliary classifier trained on a frozen model's internal activations to test whether a concept is linearly decodable there |
| Forward hook | A PyTorch mechanism that lets you capture a module's output (e.g., a residual-stream activation) during the forward pass without modifying the model itself |
| Decodable vs. used | The key caveat: a probe showing a concept is decodable from an activation does not show the model's own computation causally uses that concept |
| Control task | A probing task with the same inputs but random, meaningless labels, used to detect whether a probe is just memorizing |
| Selectivity | The gap between a probe's accuracy on the real task and its accuracy on a control task; high selectivity is evidence against memorization |

## Recap

Probing classifiers give you a fast way to check whether a concept is linearly present in a transformer's activations, using nothing more than a forward hook and a small classifier trained on frozen features — but a high probe score only shows decodability, not causal use, which is why control tasks and selectivity scores matter. Next up, Lesson 27: Activation Visualization, where you'll look directly at raw activation patterns across layers and tokens as a first diagnostic step before deeper circuit analysis.
