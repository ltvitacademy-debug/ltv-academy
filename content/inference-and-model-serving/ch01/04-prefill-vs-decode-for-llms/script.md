# Script — Prefill vs. Decode, for LLMs

## Segment 1 (title)

Every lesson so far has mentioned prefill and decode without fully unpacking them. This lesson makes that split the main event, because it's the single most important fact about how LLM inference actually runs on a GPU, and it's the reason LLM serving needed its own specialized frameworks.

## Segment 2 (steps)

Prefill processes the entire input prompt in one parallel forward pass — every prompt token, through every layer, at once. Its job is to build up the key and value tensors used by attention for every token so far. Because all those tokens are processed together, the GPU's math units stay busy. Prefill is compute-bound.

## Segment 3 (steps)

Decode generates output tokens one at a time, and each new token depends on every token before it. Each step is a small forward pass, but it has to read the key and value tensors for every prior token out of the KV cache in GPU memory. The actual compute is small; most of the time goes to moving data. Decode is memory-bound, which is exactly why batching decode steps together across requests matters so much.

## Segment 4 (steps)

This split drives everything downstream. Most APIs price input and output tokens differently, tracking their different cost profiles. Serving frameworks report prefill and decode throughput separately, because they're bound by different resources. And frameworks like vLLM and TensorRT-LLM are built from the ground up around this exact asymmetry.

## Segment 5 (outro)

Prefill builds the KV cache in parallel; decode reads and extends it one token at a time. That's why LLM serving looks so different from serving a classic model. Up next, lesson five: measuring inference performance across both phases.
