# Script — Model Families & Architecture Choices Today

## Segment 1 (title)

Almost every modern production LLM is still a decoder-only transformer at its core, but the components inside that transformer have shifted a lot since the original design. This lesson surveys the choices you'll see named in nearly every recent model's technical report.

## Segment 2 (steps)

Four components recur across current open model families. RoPE encodes token position by rotating the attention query and key vectors. RMSNorm is a cheaper normalization layer than LayerNorm. SwiGLU is a gated feed-forward activation that improves quality over a plain ReLU or GELU block. And grouped-query attention shares key and value heads across groups of query heads to shrink the memory cost of the KV cache. You'll find all four named explicitly in the config files of most current open-weights models.

## Segment 3 (code)

You can read these choices straight out of a model's config file. The ratio of key-value heads to attention heads alone tells you whether a model uses standard multi-head attention, multi-query attention, or grouped-query attention in between, and the activation function field usually hints at whether the MLP block uses SwiGLU-style gating.

## Segment 4 (steps)

The bigger split is dense versus Mixture-of-Experts. A dense model activates every parameter for every token. An MoE model instead routes each token to only a handful of expert sub-networks, so a model can have a very large total parameter count while only activating a small fraction of it per token. That buys more capacity per unit of compute, at the cost of routing and load-balancing complexity, plus added communication overhead when experts live on different devices in a distributed training job.

## Segment 5 (outro)

These architecture choices are what turns a compute budget into an actual model. Next up, lesson five: what a training run built on these choices actually costs in practice.
