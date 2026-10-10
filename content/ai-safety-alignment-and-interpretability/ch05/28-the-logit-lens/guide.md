# The Logit Lens

You already know that a decoder-only transformer ends with an unembedding matrix that turns the final residual-stream vector into logits over the vocabulary. The logit lens asks a deceptively simple question: what if you applied that same unembedding matrix to the residual stream at an earlier layer, before the model was "done"? This lesson walks through the technique nostalgebraist introduced in 2020, and the more refined version researchers built on top of it.

## What you'll learn

- Exactly how the logit lens works: applying the final unembedding to an intermediate activation
- How to implement it against a toy transformer's residual stream
- What nostalgebraist's original findings showed about how predictions sharpen across depth
- Why the logit lens's assumption can mislead, and what the tuned lens does differently
- How to read a logit-lens result without over-claiming what it proves

## The core idea

In a standard decoder-only transformer, the final step takes the last layer's residual-stream vector, applies a final layer norm, and multiplies by the unembedding matrix `W_U` to get logits over the vocabulary — the step you already know well from building a transformer from scratch. The logit lens applies that exact same final step to the residual stream at an *intermediate* layer, as if the model had stopped there. The resulting "logits" don't correspond to any output the model actually produced — the model kept computing — but they tell you what the model's current residual-stream state would predict if you forced a premature exit right at that layer.

## Implementing it

Because the logit lens reuses the model's own final unembedding and layer norm, it needs no extra training and only a few lines against a model you already have hooks into.

```python
import torch
import torch.nn.functional as F

def logit_lens(model, residual_stream_activation, top_k=5):
    """
    residual_stream_activation: (seq_len, d_model) at one chosen layer,
    captured the same way you captured activations in Lesson 26.
    """
    with torch.no_grad():
        normed = model.final_layer_norm(residual_stream_activation)
        logits = normed @ model.unembed.weight.T   # same W_U used at the real output
        probs = F.softmax(logits, dim=-1)
        top_probs, top_tokens = probs.topk(top_k, dim=-1)
    return top_probs, top_tokens

# Capture layer 4's residual stream with a forward hook, as in Lesson 26
captured = {}
handle = model.blocks[4].register_forward_hook(
    lambda m, i, o: captured.setdefault("layer_4", o.detach())
)
with torch.no_grad():
    model(input_ids)
handle.remove()

layer4_resid = captured["layer_4"][0]  # (seq_len, d_model), batch index 0
top_probs, top_tokens = logit_lens(model, layer4_resid)
```

Running this at every layer for the same input and decoding `top_tokens` back to strings at each depth gives you a layer-by-layer trace of "what the model would have guessed here" — exactly nostalgebraist's original visualization.

## What the original logit lens found

Applying this to GPT-2, nostalgebraist found that predictions form gradually rather than appearing fully formed: early layers often produce unreadable or near-random guesses, middle layers typically reach a plausible guess, and later layers progressively sharpen it until it matches the model's actual final output. A second, more surprising finding: by a KL-divergence measure, the residual stream's representation departs from looking like the input token almost immediately, after just the first layer — the model doesn't keep the input "lying around" in a recognizable form for long. And some tokens that are rare in the local context stayed decodable in intermediate layers in a way that suggested the model was holding onto them for later use, such as when the model needed to copy a token from earlier in the prompt.

## The catch: why this can mislead

The method rests on an assumption worth stating explicitly: it assumes the unembedding matrix trained for the final layer's residual-stream geometry is also a reasonable decoder for intermediate layers' geometry. That's not guaranteed. If the residual stream's "basis" rotates or reshapes somewhat across layers — which there's reason to think it does, to varying degrees in different models — then applying the final-layer unembedding to an earlier layer measures a mismatch between that layer's actual representation and the final layer's decoder, not necessarily the layer's own "true" prediction. The **tuned lens**, introduced by Belrose and colleagues, addresses this directly: instead of reusing the final unembedding as-is, it trains a separate small affine probe for each layer specifically to decode that layer's residual stream into a vocabulary distribution. The tuned lens was shown to be more predictive, more reliable, and less biased than the original logit lens, while confirming the same general story: predictions do sharpen gradually with depth.

## Reading a logit-lens result honestly

Treat a logit-lens trace as a useful, cheap window into how a prediction evolves across depth — not as a literal readout of the model's "intention" at each layer. It's a great way to see roughly when a correct prediction starts becoming visible, or to spot layers where the top guess changes in an interesting or informative way. It is not a causal explanation of why that guess emerged, and given the basis-mismatch concern above, treat an early-layer logit-lens prediction with real skepticism before drawing strong conclusions from it, especially on a model where the tuned lens hasn't been checked against it.

## Key terms

| Term | Meaning |
|---|---|
| Logit lens | Applying a transformer's final unembedding matrix (and final layer norm) to an intermediate residual-stream activation to see what it would predict at that depth |
| Unembedding matrix | The learned matrix (`W_U`) that converts a final residual-stream vector into logits over the vocabulary |
| Prediction sharpening | The pattern nostalgebraist observed: logit-lens guesses are vague in early layers and progressively sharpen into the model's actual final prediction |
| Basis-mismatch problem | The core caveat with the logit lens: it assumes the final layer's unembedding is a valid decoder for earlier layers, which may not hold if the residual stream's representation shifts across depth |
| Tuned lens | A refinement that trains a separate small probe per layer to decode that layer's residual stream, shown to be more reliable than reusing the final unembedding directly |

## Recap

The logit lens is a cheap, no-training way to see what a transformer "would have predicted" at any layer, by reusing its own final unembedding matrix — revealing that predictions sharpen gradually across depth, though the technique's basis-mismatch assumption means the tuned lens's per-layer probes are the more reliable version of the same idea. Next up, Lesson 29: Attribution Methods, where you'll use gradient-based techniques to attribute a model's output back to its inputs and internal components.
