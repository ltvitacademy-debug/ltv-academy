# Full Fine-Tuning vs. Parameter-Efficient Tuning

With a formatted, properly masked dataset in hand, there's one more decision before training starts: how much of the model actually gets updated. The default, naive answer — update every parameter — is called full fine-tuning, and it works, but it's often far more expensive than necessary. This lesson lays out that trade-off, setting up the next two lessons (LoRA and QLoRA), which are the dominant parameter-efficient alternative.

## What you'll learn

- What full fine-tuning actually costs in GPU memory, and why
- What "parameter-efficient fine-tuning" (PEFT) means as a general strategy
- The memory accounting that makes PEFT attractive: optimizer state dominates, not just weights
- When full fine-tuning is still the right choice despite the cost
- How this decision sets up LoRA and QLoRA in the next two lessons

## What full fine-tuning costs

Full fine-tuning updates every parameter in the model, exactly like pretraining does, just starting from a pretrained checkpoint instead of random initialization. The memory cost comes from several components that all scale with total parameter count `N`:

- **Model weights** — `N` parameters, each typically 2 bytes in bf16.
- **Gradients** — another `N` values, same precision, one per parameter.
- **Optimizer state** — for Adam/AdamW, two additional running estimates (first and second moment) per parameter, typically kept in fp32 for numerical stability: `2 * N * 4 bytes`.

Adding this up, Adam-based full fine-tuning in mixed precision needs roughly 16-18 bytes per parameter just for weights, gradients, and optimizer state (before activations), which is why optimizer state, not the weights themselves, is usually the dominant memory cost. For a 7-billion-parameter model, that alone is well over 100GB — more than a single high-end GPU holds, before accounting for activation memory or any multi-GPU parallelism strategy.

```text
Per-parameter memory, Adam, mixed precision (rough):
  weights (bf16):        2 bytes
  gradients (bf16):       2 bytes
  optimizer state (fp32): 8 bytes  (2 moments x 4 bytes)
  ---------------------------------
  total:                 ~12-18 bytes/param (implementation-dependent)

7B params x ~16 bytes/param ≈ 112 GB  -- before activations
```

## What parameter-efficient fine-tuning (PEFT) means

Parameter-efficient fine-tuning is the general strategy of updating only a small subset of parameters — or a small number of newly added parameters — while leaving the vast majority of the pretrained weights frozen. Hugging Face's `peft` library implements several such methods, but by far the most widely used is **LoRA** (Low-Rank Adaptation), covered in full next lesson, which freezes the original weights entirely and trains a small pair of low-rank matrices injected alongside them.

The memory win comes directly from the accounting above: if only a small fraction of parameters are trainable, gradients and optimizer state only need to be stored for that small fraction, not for the full `N`. Frozen weights still need to be loaded (and, in bf16, still cost `2 * N` bytes), but the gradient and optimizer-state terms — the dominant cost in the table above — shrink dramatically.

```python
from peft import LoraConfig, get_peft_model
from transformers import AutoModelForCausalLM

model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3.1-8B")

lora_config = LoraConfig(
    r=16, lora_alpha=32, lora_dropout=0.05,
    target_modules=["q_proj", "v_proj"],
    task_type="CAUSAL_LM",
)
model = get_peft_model(model, lora_config)
model.print_trainable_parameters()
# e.g. "trainable params: 4.2M || all params: 7.5B || trainable%: 0.056%"
```

## When full fine-tuning is still the right call

PEFT isn't strictly better in every dimension — it's a trade-off. Full fine-tuning tends to have a modest quality edge, particularly for larger behavioral shifts (adapting to a very different domain or task distribution than the base model saw in pretraining), and avoids any added architectural complexity at inference time. Teams with ample multi-GPU compute, a large high-quality dataset, and a need for the absolute best achievable quality still choose full fine-tuning. PEFT's appeal is specifically for teams compute-constrained relative to the model size, or who need to maintain many different fine-tuned variants cheaply (since each LoRA adapter is tiny compared to a full model copy).

## Setting up the next two lessons

This lesson deliberately stopped at the conceptual trade-off: PEFT trades a small amount of achievable quality for a large reduction in trainable-parameter memory. The next lesson, "LoRA, in Depth," covers exactly how the low-rank matrices work mathematically and how rank and alpha are chosen; the lesson after that, "QLoRA," stacks 4-bit quantization of the frozen base weights on top of LoRA to shrink the memory footprint even further.

## Key terms

- **Full fine-tuning** — updating every model parameter during fine-tuning, with memory cost dominated by optimizer state
- **Parameter-efficient fine-tuning (PEFT)** — updating only a small subset or small number of added parameters, freezing the rest
- **Optimizer state** — Adam's per-parameter running moment estimates; typically the largest memory cost in full fine-tuning
- **`peft` library** — Hugging Face's library implementing LoRA and other parameter-efficient methods
- **`get_peft_model`** — the `peft` function that wraps a base model with a PEFT configuration (e.g., LoRA)
