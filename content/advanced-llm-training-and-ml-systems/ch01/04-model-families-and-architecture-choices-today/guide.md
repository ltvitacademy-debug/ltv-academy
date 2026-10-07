# Model Families & Architecture Choices Today

Almost every modern production LLM is still a decoder-only transformer at its core, but the specific architectural choices inside that transformer have shifted substantially from the original 2017 "Attention Is All You Need" design. This lesson surveys the components you'll see named in nearly every recent model's technical report, and the dense-vs-sparse (Mixture-of-Experts) split that defines two different scaling strategies.

## What you'll learn

- The core architectural components used in current open-weights model families: RoPE, RMSNorm, SwiGLU, GQA/MQA
- The difference between a dense transformer and a Mixture-of-Experts (MoE) model
- Why attention variants like grouped-query attention exist and what problem they solve
- How to recognize these choices when you read a model's `config.json`

## The components that recur across model families

- **RoPE (Rotary Position Embedding)** — encodes token position by rotating query/key vectors in attention, rather than adding a separate learned or sinusoidal position embedding. Used by Llama, Mistral, Qwen, and most current open models.
- **RMSNorm** — a simplified, cheaper alternative to LayerNorm that normalizes by root-mean-square without re-centering the mean. Standard in Llama-family and most current architectures.
- **SwiGLU** — a gated activation function used in the feed-forward (MLP) blocks, replacing the plain ReLU/GELU feed-forward used in the original transformer. Shown in the PaLM and Llama papers to improve quality at the same parameter count.
- **Grouped-Query Attention (GQA)** — a middle ground between standard multi-head attention (every query head has its own key/value heads) and multi-query attention (all query heads share one key/value head). GQA groups several query heads per shared key/value head, cutting the size of the KV cache at inference time with a small quality cost relative to full multi-head attention.

```python
# A HF config snippet showing these choices explicitly
config = {
    "hidden_size": 4096,
    "num_attention_heads": 32,
    "num_key_value_heads": 8,      # GQA: 8 KV groups instead of 32 (would be MHA) or 1 (MQA)
    "rms_norm_eps": 1e-5,
    "hidden_act": "silu",          # SiLU/Swish, paired with gating for SwiGLU
    "rope_theta": 500000.0,
}
```

## Dense transformers vs. Mixture-of-Experts (MoE)

A **dense** transformer activates every parameter for every token — if the model has 70B parameters, all 70B participate in every forward pass. A **Mixture-of-Experts** model instead replaces (some of) the dense feed-forward blocks with multiple parallel "expert" feed-forward networks plus a small router network that selects only a handful of experts per token. The result is a model with a very large total parameter count but a much smaller number of *active* parameters per token — for example, a model might have well over 100B total parameters while only activating a small fraction of that per forward pass.

MoE's appeal is that it increases total model capacity (and often quality) without proportionally increasing the FLOPs cost per token, because unused experts simply aren't computed for a given token. The cost is engineering complexity: routing introduces load-balancing challenges (making sure experts are used roughly evenly), added communication overhead in distributed training (tokens may need to be routed to experts on different devices), and more complex serving infrastructure. Open examples of this family include Mixtral and DeepSeek-MoE-style architectures, both publicly documented as sparse MoE transformers.

## Context length and attention cost

Standard self-attention cost grows quadratically with sequence length, which is why extending context windows (from thousands to hundreds of thousands of tokens in recent model families) required more than just "train on longer sequences" — it typically pairs architectural choices (RoPE scaling/extrapolation techniques) with systems techniques like FlashAttention (memory-efficient, fused attention kernels) to make long-context training and inference actually tractable.

## Reading these choices in practice

When you open a model's `config.json` or technical report, you can now map nearly every field to a concrete design decision: `num_key_value_heads` tells you the attention variant (equal to `num_attention_heads` means standard MHA; 1 means MQA; anything in between means GQA), `hidden_act` and the MLP dimension ratio hint at SwiGLU-style gating, and the presence of a `router`/`num_experts` field signals an MoE architecture rather than a dense one.

## Key terms

- **RoPE** — rotary position embedding; encodes position via rotation of attention query/key vectors
- **RMSNorm** — a cheaper normalization layer than LayerNorm, used in most current open models
- **SwiGLU** — a gated feed-forward activation that improves quality over plain ReLU/GELU MLPs
- **GQA (Grouped-Query Attention)** — shares key/value heads across groups of query heads to shrink the KV cache
- **Mixture-of-Experts (MoE)** — a sparse architecture where a router activates only a subset of expert sub-networks per token

## Recap

Current model families share a common toolkit — RoPE, RMSNorm, SwiGLU, and GQA — layered onto the same decoder-only transformer backbone, while the dense-vs-MoE choice determines whether every parameter activates for every token or only a routed subset does. Next up, Lesson 5: what a training run built on these choices actually costs in practice.
