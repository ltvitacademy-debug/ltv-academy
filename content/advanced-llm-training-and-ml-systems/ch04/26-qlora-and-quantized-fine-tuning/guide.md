# QLoRA & Quantized Fine-Tuning

LoRA already shrinks the trainable-parameter memory down to a sliver of the full model, but the frozen base weights still have to be loaded in full — in bf16, that's still 2 bytes per parameter, which for a 70-billion-parameter model is 140GB just to hold the frozen weights. QLoRA (Dettmers et al., 2023) removes that remaining bottleneck by quantizing the frozen base model to 4-bit precision, while still training full-precision LoRA adapters on top of it.

## What you'll learn

- What quantization means here, and why it can be applied to frozen weights specifically
- NF4 (NormalFloat4), the quantization format QLoRA introduces
- Double quantization: squeezing the quantization constants themselves
- How gradients still flow in full precision despite 4-bit frozen weights
- Setting up QLoRA in practice with `BitsAndBytesConfig` and `peft`

## Why frozen weights are a good quantization target

Quantization reduces numerical precision to save memory, at some cost to accuracy. Applying aggressive quantization to weights that are actively being trained is risky — the small value changes an optimizer needs to make can get lost in a coarse-grained number format. But LoRA's frozen base weights never change during training at all; they only need to be read during the forward pass. That makes them a comparatively safe target for aggressive quantization: a loss of precision in a value that's never updated is a one-time accuracy cost, not a training-stability problem.

## NF4: QLoRA's quantization format

QLoRA introduces **NF4 (NormalFloat4)**, a 4-bit format specifically designed around the empirical observation that pretrained neural network weights are approximately normally distributed. Rather than spacing the 16 representable values evenly (as a naive 4-bit integer format would), NF4 places more representable values near zero, where pretrained weights are typically densest, and fewer further out — minimizing quantization error for the actual distribution of values being stored, rather than for a uniform distribution that doesn't match real weight statistics.

## Double quantization

Quantizing a tensor to 4-bit values still requires storing per-block scaling constants (to map the 4-bit codes back to approximate real values), and at scale, those constants themselves add up to non-trivial memory. QLoRA applies **double quantization**: quantizing the quantization constants themselves to a lower precision, squeezing out additional memory savings (roughly another 0.5 bits per parameter on average) with negligible additional accuracy loss.

## How training still works in full precision

The frozen weights stay in 4-bit storage, but the forward and backward pass dequantize them on the fly to bf16 for the actual matrix multiplication — so the compute itself happens at a precision where gradients remain stable. The LoRA adapter matrices `A` and `B` are stored and trained in full precision (bf16) throughout, exactly as in standard LoRA. Only the frozen base weights live in 4-bit; everything that actually receives gradients stays at full training precision.

```python
import torch
from transformers import AutoModelForCausalLM, BitsAndBytesConfig
from peft import LoraConfig, get_peft_model

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_use_double_quant=True,
    bnb_4bit_compute_dtype=torch.bfloat16,
)

model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-3.1-70B",
    quantization_config=bnb_config,
    device_map="auto",
)

lora_config = LoraConfig(
    r=16, lora_alpha=32, lora_dropout=0.05,
    target_modules=["q_proj", "v_proj"],
    task_type="CAUSAL_LM",
)
model = get_peft_model(model, lora_config)
```

`bnb_4bit_compute_dtype=torch.bfloat16` is the setting that controls the on-the-fly dequantization precision used during the actual matrix multiplications — the base weights are stored in 4-bit, but every multiply happens in bf16.

## What this buys you

QLoRA was the technique that made fine-tuning genuinely large models (65-70B+ parameters) practical on a single high-end consumer or workstation GPU — the paper's headline result fine-tuned a 65B model on a single 48GB GPU, something full-precision LoRA alone couldn't do, since even the frozen bf16 weights wouldn't fit. The trade-off is a modest additional accuracy cost from 4-bit quantization (the paper's own benchmarks found this cost small relative to the memory savings for typical SFT-scale tasks), plus some throughput overhead from the repeated dequantize-on-the-fly step during training.

## Key terms

- **Quantization** — reducing numerical precision to save memory, applied here to frozen (non-trainable) weights
- **NF4 (NormalFloat4)** — QLoRA's 4-bit format, allocating representable values according to the normal distribution of real weights
- **Double quantization** — quantizing the quantization constants themselves for additional memory savings
- **`bnb_4bit_compute_dtype`** — the precision used for on-the-fly dequantized matrix multiplication during training
- **`BitsAndBytesConfig`** — the Hugging Face `transformers` configuration class controlling quantized model loading
