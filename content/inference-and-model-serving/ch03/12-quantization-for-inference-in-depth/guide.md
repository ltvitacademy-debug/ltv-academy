# Quantization for Inference, in Depth

Chapter 2 gave you the frameworks that run a model fast. This chapter gives you the techniques that make the model itself smaller and cheaper to run — starting with the single most widely used one: quantization. Every serving stack you'll touch in this path either ships with quantization support built in or treats it as the first lever an engineer reaches for when a model doesn't fit, or doesn't run fast enough.

## What you'll learn

- What quantization actually changes about a model's weights and activations
- Why quantization attacks the exact bottleneck that Lesson 4 identified in decode
- The difference between post-training quantization (PTQ) and quantization-aware training (QAT)
- Why precision reduction isn't free, and where the hidden costs show up

## What quantization changes

A model's weights are normally stored as 16-bit floating point numbers — FP16 or BF16. Quantization converts those weights (and sometimes the activations that flow between layers) to a lower-precision numeric format, most commonly 8-bit or 4-bit integers. Each weight is represented with a **scale** (and often a **zero-point**) that maps the narrow integer range back to something close to the original floating-point value. The model's architecture, layer count, and attention pattern don't change at all — only how many bits it takes to store each number.

This matters because of something you already know from Lesson 4: decode is **memory-bound**, not compute-bound. The GPU spends decode time moving weights and the KV cache through memory, not doing arithmetic. Cutting a weight from 16 bits to 4 bits roughly quarters the bytes that have to move for every forward pass — which is exactly the resource decode is starved for. Quantization also shrinks the model's footprint in GPU memory, which is often the harder constraint: an 8-billion-parameter model that needs about 16 GB in BF16 can need well under half that in 4-bit, which can be the difference between fitting on one GPU and needing two.

## Post-training quantization vs. quantization-aware training

- **Post-training quantization (PTQ)** — quantize an already-trained model's weights, typically using a small **calibration set** of representative inputs to decide good scale factors per layer (or per channel). No retraining is required, which is why PTQ is the default choice for inference — it's cheap, fast, and the technique behind GPTQ, AWQ, and bitsandbytes, all covered in Lesson 13.
- **Quantization-aware training (QAT)** — simulate quantization *during* training or fine-tuning, so the model's weights adapt around the precision loss before it's permanent. QAT typically preserves more accuracy at very low bit-widths, but it costs a training run, which most teams can't justify just to serve an existing model faster.

In practice, the large majority of inference quantization you'll encounter in production is PTQ, applied once to an open-weight checkpoint before it's deployed.

## Where the savings — and the costs — actually come from

- **Granularity matters.** Quantizing one scale factor per entire tensor ("per-tensor") is simplest but least accurate; quantizing per output channel or per small group of weights ("per-channel" / "group-wise", e.g. groups of 128 weights) preserves far more accuracy at a small metadata cost, and is standard in GPTQ and AWQ.
- **Dequantization isn't free.** Most kernels still compute in FP16 — quantized weights get unpacked back to floating point just before the matrix multiply. The speedup comes from moving fewer bytes to get there, not from doing arithmetic in INT4 itself (specialized INT8/FP8 compute paths exist on newer GPUs and are a partial exception).
- **Outliers are the hard part.** A small number of weight or activation values are often much larger in magnitude than the rest, and naive quantization wrecks accuracy trying to represent them in a narrow range. Every serious quantization method (covered in Lesson 13) exists largely to handle this problem well.

## Key terms

| Term | Meaning |
|---|---|
| Quantization | Representing weights/activations with fewer bits than the original FP16/BF16 training format |
| Scale / zero-point | The values that map a low-precision integer back to an approximate real number |
| Calibration set | Sample inputs used in PTQ to choose good per-layer scale factors |
| PTQ | Quantizing a model after training, no retraining required |
| QAT | Simulating quantization during training so weights adapt to it |
| Group-wise quantization | Using a separate scale per small group of weights instead of one per tensor |

## Recap

Quantization shrinks a model's memory footprint and the bytes its decode step has to move, directly targeting the memory-bound bottleneck from Lesson 4 — and it does this almost entirely through post-training quantization, calibrated once and never retrained. The granularity of that calibration, and how outliers are handled, is what separates a quantization method that barely loses accuracy from one that quietly breaks the model. Next up, Lesson 13: a close look at the specific INT8 and INT4 methods — GPTQ, AWQ, and bitsandbytes — that put this into practice.
