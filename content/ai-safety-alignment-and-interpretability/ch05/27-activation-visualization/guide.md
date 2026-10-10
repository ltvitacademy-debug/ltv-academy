# Activation Visualization

Before you can analyze a circuit or decompose a feature, you need to actually look at what's happening inside the model — raw attention patterns, activation magnitudes, which neurons fire on which tokens. This lesson covers that first diagnostic pass: pulling activations out of a toy transformer and visualizing them directly, the same instinct that led researchers to tools like BertViz and that underlies Anthropic's feature-visualization work.

## What you'll learn

- Why raw activation visualization is usually the first step before deeper circuit analysis, not a replacement for it
- How to capture and visualize attention patterns across heads and layers
- How to inspect per-neuron activation magnitudes across a token sequence
- What patterns are easy to spot this way, and what this method can't tell you on its own

## Why start with raw visualization

Activation visualization is the most direct possible interpretability move: run an input through the model, grab the numbers at some internal point, and look at them — as a heatmap, a line plot, a matrix. It doesn't train anything, like a probe does, and it doesn't require the heavier machinery of circuit analysis. Its value is exploratory: a well-chosen visualization can surface a striking pattern (a head that always attends to the previous token, a neuron that fires only on code syntax, a layer where magnitudes spike on one specific token type) that then becomes the starting point for deeper investigation. Anthropic's induction-heads work and the BertViz tool both grew directly out of this instinct: look first, hypothesize second, verify with more rigorous methods third.

## Visualizing attention patterns

In a decoder-only transformer built from scratch, each attention layer already computes a set of attention weight matrices — one per head, of shape `(seq_len, seq_len)` — before they're used to weight the value vectors. Hooking into that computation (or having your attention module optionally return the weights) gives you a direct object to visualize.

```python
import torch
import matplotlib.pyplot as plt

captured_attn = {}

def grab_attention_weights(module, inputs, output):
    # Assumes the attention module returns (attn_output, attn_weights)
    # attn_weights shape: (batch, n_heads, seq_len, seq_len)
    _, attn_weights = output
    captured_attn["layer_3"] = attn_weights.detach()

handle = model.blocks[3].attn.register_forward_hook(grab_attention_weights)
with torch.no_grad():
    model(input_ids)
handle.remove()

# Visualize one head's attention pattern for one example in the batch
head_idx, example_idx = 2, 0
attn_map = captured_attn["layer_3"][example_idx, head_idx].numpy()

plt.imshow(attn_map, cmap="viridis")
plt.xlabel("Key position (attended-to token)")
plt.ylabel("Query position (attending token)")
plt.title("Layer 3, Head 2 attention pattern")
plt.colorbar()
```

A bright diagonal band one step below the main diagonal, for example, is the classic visual signature of a **previous-token head** — exactly the building block that Anthropic's induction-heads research later tied to a specific, well-defined computational role in in-context learning.

## Inspecting raw activation magnitudes

A second, complementary view skips attention and looks directly at the residual-stream or MLP activation values themselves, across tokens and across a chosen set of neurons.

```python
captured_mlp = {}

def grab_mlp_activation(module, inputs, output):
    captured_mlp["layer_3_mlp"] = output.detach()  # shape: (batch, seq_len, d_mlp)

handle = model.blocks[3].mlp.register_forward_hook(grab_mlp_activation)
with torch.no_grad():
    model(input_ids)
handle.remove()

acts = captured_mlp["layer_3_mlp"][0]          # (seq_len, d_mlp) for one example
neuron_123_trace = acts[:, 123].numpy()         # this neuron's activation at every token

plt.plot(neuron_123_trace)
plt.xlabel("Token position")
plt.ylabel("Activation magnitude")
plt.title("Neuron 123, layer 3, across the sequence")
```

Plotted across many example sequences, a neuron trace like this can reveal a neuron that spikes reliably on a specific token type, syntactic boundary, or semantic category — a candidate for closer study, exactly the kind of observation that motivated Anthropic's later, more rigorous feature-decomposition work in "Towards Monosemanticity."

## What this method can and can't tell you

Raw visualization is excellent at surfacing candidate patterns fast, with almost no setup cost, and it's often the step that tells you where to point a more expensive method. But it has real limits. A single neuron rarely represents one clean human concept in isolation — the **superposition** phenomenon means individual neurons in realistic models often encode mixtures of many unrelated features, so a neuron's activation trace can look suggestively specific without actually corresponding to one tidy concept. And a vivid attention pattern shows you where attention weight goes, which is suggestive but not the same as a rigorous causal claim about why the model produced its final output — that connection still has to be established, often with the attribution methods covered in Lesson 29.

## Key terms

| Term | Meaning |
|---|---|
| Activation visualization | Directly inspecting raw activation values or attention patterns across layers and tokens, typically as a first exploratory step |
| Attention pattern | The matrix of attention weights from each query position to each key position within one head, visualizable as a heatmap |
| Previous-token head | An attention head whose pattern consistently attends one position back, visible as a sub-diagonal band, and a known building block of induction heads |
| Neuron activation trace | The sequence of activation values a single neuron produces across token positions in an input, used to spot candidate specialized neurons |
| Superposition | The phenomenon where a single neuron encodes a mixture of multiple, often unrelated features, limiting how literally a single neuron's visualized pattern can be interpreted |

## Recap

Raw activation and attention visualization is the fastest way to start looking inside a model — a hook, a heatmap, and a line plot can surface candidate patterns like previous-token heads or specialized neurons almost immediately — but superposition means a single striking pattern is a lead, not a settled explanation. Next up, Lesson 28: The Logit Lens, where you'll project an intermediate activation all the way out to a vocabulary distribution to see what the model "would have predicted" at that depth.
