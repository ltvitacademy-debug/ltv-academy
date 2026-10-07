# Architecture Ablations at Small Scale

Every lesson in this chapter so far has assumed the architecture, data mixture, and schedule are already decided, and focused on executing the run well. But those decisions themselves — which positional encoding, which normalization placement, which activation function — have to be made before the expensive run starts, and nobody tests them by training the full-size model five different ways. This closing lesson of the chapter covers how teams actually make those calls: architecture ablations at small scale.

## What you'll learn

- What an ablation study is, and why it's done small before it's done big
- Which architectural choices are commonly ablated in modern LLM pretraining
- The assumption this relies on: that relative rankings transfer across scale
- A concrete small-scale ablation workflow using Hugging Face `transformers`
- Where this assumption breaks down, and why it's checked, not just trusted

## What an ablation study is

An ablation study changes exactly one component of a system, holds everything else fixed, and measures the effect on an outcome metric — here, validation loss (or loss on a fixed small-scale compute budget). "Ablating" a component historically meant removing it entirely to see how much it mattered; in modern LLM architecture work the term has broadened to also cover swapping one choice for an alternative (one positional encoding scheme for another, one normalization scheme for another) and comparing results under matched conditions.

## What commonly gets ablated

A few architectural choices show up repeatedly in published ablation studies and internal model-design work:

- **Positional encoding** — absolute learned positions vs. rotary position embeddings (RoPE) vs. ALiBi, each with different extrapolation and efficiency properties.
- **Normalization placement and type** — pre-norm vs. post-norm transformer blocks, and LayerNorm vs. RMSNorm.
- **Activation function in the feed-forward block** — ReLU vs. GELU vs. SwiGLU-style gated activations.
- **Attention variants** — multi-head attention vs. grouped-query attention (GQA) vs. multi-query attention (MQA), trading some quality for substantially cheaper inference-time KV-cache memory.
- **Data mixture weights** (connecting back to Lesson 13) — ablated the same way: train small models on candidate mixtures, compare.

## The core assumption: rankings transfer across scale

The entire practice rests on an assumption that has to be checked rather than taken for granted: that if architecture A beats architecture B at a small scale (say, 50-150 million parameters, trained on a few billion tokens), A will still beat B at the scale you actually care about (billions of parameters, trillions of tokens). This usually holds for clear, structural wins — a genuinely better normalization scheme tends to help at every scale — but is not guaranteed, which is exactly why some design decisions get re-validated with a slightly larger, more expensive ablation before being locked in for the full run, rather than trusting the smallest, cheapest comparison blindly.

## A small-scale ablation workflow

In practice, an ablation is just training several small configs of the same codebase for the same token budget and comparing loss curves:

```python
from transformers import AutoConfig, AutoModelForCausalLM

base_config = AutoConfig.from_pretrained("config/small-base.json")

# Ablation variant: swap normalization
variant_config = AutoConfig.from_pretrained("config/small-base.json")
variant_config.rms_norm = True  # e.g. RMSNorm instead of LayerNorm

model_base = AutoModelForCausalLM.from_config(base_config)
model_variant = AutoModelForCausalLM.from_config(variant_config)

# Train both on the identical small dataset/token budget,
# with the identical learning-rate schedule and seed,
# then compare final validation loss.
```

Everything that isn't the thing being ablated — data, token budget, learning-rate schedule, random seed where feasible — is held fixed across variants, so any difference in the resulting loss curve can be attributed to the one change under test. Multiple seeds per variant are common practice, since a single run's noise can otherwise be mistaken for a real architectural effect.

## Why this matters for the rest of the chapter

This lesson closes the loop on Chapter 3: scaling laws (Lesson 14) tell you small cheap runs can predict large expensive ones for a fixed architecture; this lesson tells you the same cheap-run logic is how the architecture itself gets chosen in the first place, before a single dollar is spent on the Chinchilla-style compute-optimal run those scaling laws are planning.

## Key terms

- **Ablation study** — systematically removing or swapping one component while holding everything else fixed, to isolate its effect
- **RoPE / ALiBi** — rotary and linear-bias positional encoding schemes commonly compared in ablations
- **RMSNorm** — a simplified, commonly used alternative to LayerNorm, frequently ablated against it
- **GQA / MQA** — grouped-query and multi-query attention variants, ablated for inference-cost savings
- **Ranking transfer** — the (checked, not assumed) property that a small-scale ablation winner remains the winner at full scale
