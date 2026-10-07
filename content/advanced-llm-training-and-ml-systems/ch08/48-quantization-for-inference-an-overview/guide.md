# Quantization for Inference, an Overview

Lesson 26 covered QLoRA — quantizing a frozen base model to 4-bit so it fits in memory *while fine-tuning*. This lesson covers a related but distinct use of quantization: compressing a finished model so it serves faster and cheaper. The underlying math (fewer bits per weight) overlaps, but the goal, the techniques used, and the tradeoffs being made are different enough to be worth separating clearly.

## What you'll learn

- How inference quantization differs in goal from QLoRA's training-time quantization
- The main inference quantization approaches in use today: bitsandbytes, GPTQ, AWQ
- What "calibration-based" quantization means and why it beats naive rounding
- The real tradeoff: memory and latency gains against measurable accuracy loss
- How to load a pre-quantized model with Transformers for inference

## Why quantize a finished model

A model's weights in bf16 take 2 bytes per parameter; in fp32, 4. An 8B-parameter model is roughly 16 GB in bf16 before a single token of KV cache is counted. Quantizing those weights to 8-bit or 4-bit integers cuts that memory footprint by 2x or 4x, which does three things at once: it lets a bigger model fit on a given GPU, it frees memory for a larger KV cache (and therefore more concurrent requests), and because decode is memory-bandwidth-bound (Lesson 47), moving fewer bytes per weight can directly speed up token generation, not just save space.

## The main approaches

- **bitsandbytes** — the same library used for QLoRA, also usable purely for inference via `load_in_8bit=True` or `load_in_4bit=True` on `from_pretrained`. Quantizes on the fly when the model loads; simplest to use, but not always the fastest at serving time compared to pre-quantized formats.
- **GPTQ** — a post-training quantization method that uses a small calibration dataset to minimize the error introduced by rounding each layer's weights to lower precision, solving a per-layer least-squares problem rather than rounding naively. Produces a quantized checkpoint saved once, loaded many times.
- **AWQ (Activation-aware Weight Quantization)** — also calibration-based, but specifically protects the small subset of weights that activations show to be most salient, quantizing the rest more aggressively. Often used via the `autoawq` library and widely supported by vLLM and TGI.

```python
# Loading a model someone already quantized with AWQ, for inference
from transformers import AutoModelForCausalLM, AutoTokenizer

model_id = "org/model-AWQ"  # a pre-quantized checkpoint on the Hub
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    device_map="auto",   # Transformers detects the AWQ config and
)                          # dispatches to the right kernels automatically
```

## Why calibration beats naive rounding

Simply rounding every weight to the nearest representable 4-bit value (round-to-nearest, RTN) is fast but throws away accuracy unevenly — some weights matter far more to the model's output than others. GPTQ and AWQ both use a small calibration set (a few hundred representative examples) to measure which weights' precision loss actually hurts outputs, and spend their "precision budget" protecting those, which is why calibrated methods consistently beat naive RTN at the same bit width on real benchmarks.

## The tradeoff that doesn't go away

Quantization is not free. At 8-bit, accuracy loss is usually negligible for most tasks; at 4-bit, it's typically small but measurable, and it grows at more aggressive settings (3-bit, 2-bit) or on tasks that depend on precise numeric or multi-step reasoning. The discipline from Chapter 7 applies directly here: never ship a quantized model on memory and latency numbers alone — re-run the same eval set used on the full-precision checkpoint and look at the delta before deciding a quantization level is acceptable for a given use case.

## Key terms

- **Inference quantization** — reducing a finished model's numeric precision to cut memory and speed up serving, as distinct from quantizing during training
- **GPTQ** — calibration-based post-training quantization that minimizes per-layer rounding error via a small calibration set
- **AWQ** — calibration-based quantization that protects activation-salient weights, quantizing the rest more aggressively
- **Round-to-nearest (RTN)** — naive quantization with no calibration; fast but less accurate than GPTQ/AWQ at the same bit width
