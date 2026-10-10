# Applying Activation Patching to Your Own Model

Lesson 21 picked a target: find out whether schema hallucination in SQL Pete traces back to a specific internal component failing to do its job. This lesson builds the tool for that — activation patching — and runs it against SQL Pete's actual weights using plain PyTorch hooks, because the more convenient library doesn't cover this model.

## What you'll learn

- What activation patching actually does, mechanically, between two forward passes
- Why TransformerLens — the usual tool for this — doesn't have a ready-made adapter for `Qwen2.5-Coder`
- How to capture and swap a residual-stream activation using raw PyTorch forward hooks
- How to read the result of a patch as causal evidence, and a real pitfall to avoid

## The idea: two runs, one swapped activation

Activation patching tests a causal claim about where in a model a specific piece of information lives. The recipe is always the same shape: run the model on a "clean" input that produces the behavior you care about, run it again on a "corrupted" input that doesn't, then take an internal activation from one run and splice it into the other run at the same layer and token position. If swapping that one activation flips the output, you've shown that activation is doing causal work — not just correlated with the outcome, but actually carrying the information that determines it. This is the same idea behind the ROME paper's causal tracing of factual associations in GPT and the IOI circuit paper's patching sweep across GPT-2 small; both use the technique to go from "this component's activations correlate with the right answer" to "this component's activation causes it."

For SQL Pete, the clean/corrupted pair is a minimal pair of generations: one prompt-and-response where the model names a real column correctly, and a near-identical prompt-and-response where it hallucinates one instead. The two sides of this chapter's experiment will be the residual-stream activation at a given decoder layer during the correct generation versus the same slot during the hallucinating one.

## Why not TransformerLens?

TransformerLens is the standard library for exactly this kind of work — it wraps a model in hooks for every component automatically so you don't have to write `register_forward_hook` calls by hand. It's worth checking before reaching for raw hooks. But as of this lab's build, TransformerLens's maintained model coverage includes the Qwen3 family (and, through its newer `TransformerBridge` adapter layer, a much broader but unevenly tested set of Hugging Face architectures) — it does not list Qwen2-family models, which is the architecture `Qwen2.5-Coder-1.5B-Instruct` is built on. Trying to load SQL Pete into `HookedTransformer.from_pretrained` is likely to fail outright or silently mis-map weights, neither of which you want to discover mid-experiment.

This is a real, common constraint in applied interpretability work, not a special case: a library's officially supported list lags behind whatever model you actually trained. The honest response isn't to force the tool to fit — it's to drop to the layer underneath. Every `transformers` model is a plain `torch.nn.Module`, and PyTorch's own `register_forward_hook` works on any of them regardless of whether a convenience library has gotten around to it.

## Hooking SQL Pete directly

Qwen2.5-Coder's decoder layers live at `model.model.layers[i]`, each one producing the residual-stream state for that layer as its output. A forward hook on that module can either read the activation (to capture it from the clean run) or overwrite it (to patch it into the corrupted run):

```python
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

MODEL_NAME = "Qwen/Qwen2.5-Coder-1.5B-Instruct"
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForCausalLM.from_pretrained(MODEL_NAME, torch_dtype="auto", device_map="auto")

captured = {}

def make_capture_hook(layer_idx):
    def hook(module, args, output):
        # output is the decoder layer's residual-stream state;
        # clone it so later in-place ops don't corrupt the saved copy
        captured[layer_idx] = output[0].detach().clone()
    return hook

def make_patch_hook(layer_idx):
    def hook(module, args, output):
        patched = (captured[layer_idx],) + output[1:]
        return patched
    return hook
```

The clean run registers `make_capture_hook` on the layer you're testing and generates the correct-column response, filling `captured[layer_idx]`. Then, with the capture hook removed and `make_patch_hook` registered on the same layer, the corrupted prompt runs again — but this time the chosen layer's residual stream is forcibly overwritten with the clean run's activation at generation time:

```python
TARGET_LAYER = 14  # swept across layers, not guessed once

handle = model.model.layers[TARGET_LAYER].register_forward_hook(make_capture_hook(TARGET_LAYER))
_ = model.generate(**clean_inputs, max_new_tokens=40)
handle.remove()

handle = model.model.layers[TARGET_LAYER].register_forward_hook(make_patch_hook(TARGET_LAYER))
patched_output = model.generate(**corrupted_inputs, max_new_tokens=40)
handle.remove()
```

Run this across a sweep of `TARGET_LAYER` values, not just one guess — the whole point is finding *which* layer's activation, when patched in, flips the hallucinated column name back to the correct one. A layer that changes nothing when patched is evidence it isn't where the relevant computation happens; a layer that flips the output is a real causal signal.

## Reading the result, and one real pitfall

A successful patch — corrupted input, clean activation spliced in, correct output recovered — is causal evidence that the patched layer's residual stream carries the information distinguishing "name the real column" from "hallucinate one." It is not yet evidence of *why* that layer has that information, which is exactly what Lesson 23 narrows in on at the attention-head level.

One practical trap worth knowing about before you hit it: recent versions of `transformers` can install their own internal forward hooks on every decoder layer when you pass `output_hidden_states=True`, in order to collect hidden states for you automatically. Running your own patching hooks on the same layers at the same time as `output_hidden_states=True` can produce mutual recursion — at best a confusing recursion error, at worst a silent `NaN` in your output with no error at all. Keep `output_hidden_states` off while your own hooks are doing the capturing and patching, and read the residual stream only from your own hook's `output` argument.

For a coarser first pass before committing to the full generate-twice-per-layer sweep above, Neel Nanda's attribution-patching technique approximates the effect of patching every component with just one clean forward pass, one corrupted forward pass, and one backward pass — cheap enough to screen every layer and head at once, at the cost of being an approximation that can be unreliable on large activations like a full residual stream. Using it to narrow down candidates before confirming with the exact patching shown above is the standard order of operations.

## Key terms

- **Activation patching** — swapping an internal activation between a clean and a corrupted forward pass to test whether that activation causally drives an output difference
- **Minimal pair** — two near-identical inputs differing only in the one factor under test, here a correct-column generation versus a hallucinating one
- **Forward hook** — a PyTorch callback (`register_forward_hook`) that runs after a module's forward pass, able to read or replace its output
- **Residual stream** — the running sum of a transformer's per-layer outputs that each layer reads from and writes back into, the common target for patching
- **Attribution patching** — a gradient-based approximation to full activation patching, useful for screening many components cheaply before confirming with exact patches

## Recap

Activation patching swaps a captured activation from a clean run into a corrupted run to test, causally, whether that activation drives an output difference — and because TransformerLens doesn't cover the Qwen2 architecture SQL Pete is built on, this lab does it with plain PyTorch forward hooks on `model.model.layers[i]` instead of a convenience wrapper. A layer-by-layer sweep, patched this way, is how you find which layer's residual stream carries the signal distinguishing a correct column name from a hallucinated one. Next up, Lesson 23: pushing this same method down to the level of a specific attention head, to test a real hypothesis about what it's doing.
