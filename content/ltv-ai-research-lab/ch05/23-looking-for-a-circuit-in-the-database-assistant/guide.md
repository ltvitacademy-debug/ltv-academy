# Looking for a Circuit in the Database Assistant

Lesson 22 found which layer's residual stream, when patched, flips a hallucinated column name back to a correct one. That tells you *where* in the stack the relevant computation lands — it doesn't yet say *what* is computing it. This lesson narrows that down to a specific hypothesis about a specific attention head, and tests it the same causal way.

## What you'll learn

- The specific hypothesis this lesson tests: a "copying" head versus a hallucinating fallback
- Why this hypothesis is shaped like known induction-head behavior, and why that's a reason for caution, not proof
- How to patch a single attention head's output instead of a whole layer's residual stream
- What counts as a result here, and what doesn't

## The hypothesis: a copying head

SQL Pete's prompt format includes the schema — the relevant `CREATE TABLE` text or column list — directly in context, ahead of the natural-language question. That means the correct column name is, almost always, a token sequence that already appeared earlier in the same prompt. A model that's good at this task has every reason to develop something that behaves like a *copying* mechanism: look back at the schema text, find the token sequence that matches what's needed here, and reproduce it, rather than generating a plausible-sounding name from scratch.

That's structurally the same shape as the induction-head behavior documented in Anthropic's "A Mathematical Framework for Transformer Circuits" and its follow-up "In-context Learning and Induction Heads": a head that, having seen token B follow token A earlier in the context, predicts B again the next time A appears. Here, the "earlier occurrence" is the schema's own column name text, and the "prediction" is reproducing that same name when the query logic calls for it. The working hypothesis for this lesson: a specific attention head, probably in a middle-to-late layer, is responsible for attending back to the schema's column-name tokens and copying them forward — and when that head's attention pattern fails to lock onto the right span, the model falls back to a plausible but nonexistent name instead.

## Why this shape is a reason for caution, not proof

Induction heads are one of the better-replicated findings in interpretability — the original paper's own framing is that it found strong causal evidence in small attention-only models and weaker, correlational evidence in larger models with MLPs. That gap matters here: nothing guarantees SQL Pete has a head that looks like the clean, well-isolated induction heads found in toy models. It's equally possible the relevant computation is spread across several heads, mixed with other tasks a head is doing, or implemented differently because SQL Pete is a fine-tuned code model with a fundamentally different pretraining mix than the small models the induction-head literature was built on. The hypothesis is a reasonable first guess precisely because the task's structure resembles copy-from-context — not because any part of SQL Pete has been confirmed to contain a clean induction head.

## Narrowing the patch from a layer to a head

Lesson 22 patched an entire decoder layer's residual stream. Testing a specific-head hypothesis means patching only that head's contribution to the residual stream, leaving the rest of the layer's computation — the other heads, the MLP — untouched on the corrupted run. In a Qwen2.5-Coder decoder layer, the attention block's output projection is where every head's contribution gets summed back into the residual stream; hooking the attention submodule and replacing only one head's slice of its output isolates that head's effect:

```python
NUM_HEADS = model.config.num_attention_heads
HEAD_DIM = model.config.hidden_size // NUM_HEADS

captured_head = {}

def make_head_capture_hook(layer_idx, head_idx):
    def hook(module, args, output):
        # output here is the attention block's pre-projection per-head output,
        # shape [batch, seq, num_heads, head_dim]
        captured_head[(layer_idx, head_idx)] = (
            output[:, :, head_idx, :].detach().clone()
        )
    return hook

def make_head_patch_hook(layer_idx, head_idx):
    def hook(module, args, output):
        patched = output.clone()
        patched[:, :, head_idx, :] = captured_head[(layer_idx, head_idx)]
        return patched
    return hook
```

The exact tensor shape the attention submodule exposes depends on where you hook it — some implementations only expose the already-concatenated, already-projected output, in which case you'd hook earlier, at the per-head attention output before the output projection sums the heads together. Confirm the actual shape with a single `print(output.shape)` inside the hook before writing the patching logic around it; guessing the axis order here is the single most common way this kind of experiment silently produces nonsense.

Run this across a sweep of `(layer_idx, head_idx)` pairs at the layer Lesson 22 already identified as causally relevant, on the same correct-column-vs-hallucinated-column minimal pair. A head whose patched-in activation recovers the correct column name, while most other heads at that layer do nothing when patched, is the evidence for the copying-head hypothesis. A result spread thin across many heads with no single standout is evidence against a clean single-head circuit — and that's a legitimate, reportable outcome too, not a failed experiment.

## What actually counts as a result

A positive result here is narrow and causal: head `(layer_idx, head_idx)` patched from the correct-column run into the hallucinating run recovers the correct column name, and inspecting that head's attention pattern on the correct-column run shows it attending back to the matching span in the schema text. That combination — a causal patching result plus an attention pattern that matches the "copying" story — is suggestive evidence of the hypothesized mechanism. It is not proof that this head's only job is copying column names, and it is not proof that this is the *entire* explanation for schema hallucination; a hallucination could still occur for other reasons even when this head fires correctly. Lesson 24 writes up exactly this distinction — what the finding supports and what it doesn't — as the core of the write-up.

## Key terms

- **Induction head** — an attention-head mechanism, documented in prior interpretability work, that attends to an earlier occurrence of the current token and copies forward whatever followed it
- **Copying hypothesis** — this lesson's specific claim: a head attends back to the schema's column-name tokens and reproduces them, and its failure to do so correlates with hallucination
- **Per-head patching** — replacing only one attention head's contribution to a layer's output, rather than the whole layer's residual stream, to isolate that head's causal effect
- **Attention pattern** — the distribution of attention weights a head assigns across token positions, inspected here to check whether a head is actually attending to the matching schema span

## Recap

A layer found causally relevant in Lesson 22 doesn't say which component inside it is doing the work — this lesson narrows that to a specific, falsifiable hypothesis (a copying head reproducing schema column names) and tests it by patching one attention head's output instead of a whole layer, while staying honest that the induction-head literature's own strongest evidence comes from small, clean toy models, not fine-tuned 1.5B code models. Next up, Lesson 24: writing this finding up with the same rigor Project 3's write-up used, adapted for a mechanistic claim instead of a training result.
