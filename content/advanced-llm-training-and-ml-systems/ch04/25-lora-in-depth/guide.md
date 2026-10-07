# LoRA, in Depth

The previous lesson established that parameter-efficient fine-tuning freezes most of the model and trains a small number of added parameters instead. This lesson goes inside the most widely used method for doing that: LoRA, or Low-Rank Adaptation, from Hu et al.'s 2021 paper. Understanding the actual mechanics here matters because rank and alpha — the two numbers everyone tunes — only make sense once you've seen what they're controlling.

## What you'll learn

- The low-rank decomposition idea behind LoRA, concretely
- What rank (`r`) and alpha (`lora_alpha`) each control, and how they interact
- Which modules LoRA typically targets, and why
- Merging LoRA weights back into the base model for deployment
- LoRA's practical trade-offs: what it's good at, and where it falls short

## The core idea: low-rank weight updates

For any weight matrix `W` in the base model (say, a `4096 x 4096` attention projection), full fine-tuning would learn a full update `ΔW` of the same shape. LoRA's bet is that the *useful* update for adapting a pretrained model to a new task doesn't need full rank — it can be well-approximated by the product of two much smaller matrices:

```text
ΔW ≈ B @ A

where:
  A is (r x d_in)
  B is (d_out x r)
  r << min(d_in, d_out)   -- the "rank"
```

Instead of learning the full `d_out x d_in` matrix, LoRA learns `A` and `B`, which together have only `r * (d_in + d_out)` parameters — for `r=16` on a `4096 x 4096` matrix, that's roughly 131,000 parameters instead of nearly 17 million, over a 99% reduction for that single matrix. During the forward pass, the original frozen weight `W` and the low-rank update are both applied and summed:

```text
h = x @ W^T + (alpha / r) * (x @ A^T @ B^T)
```

`W` never changes. Only `A` and `B` receive gradients and get updated — which is exactly the mechanism behind the memory savings from the previous lesson.

## Rank and alpha: what they actually control

- **`r` (rank)** — the bottleneck dimension of `A` and `B`. Higher `r` gives the adapter more capacity to represent complex updates, at the cost of more trainable parameters (though still tiny relative to the full model). Common values range from 8 to 64 for typical SFT use cases; higher ranks are sometimes used for tasks requiring a larger behavioral shift.
- **`lora_alpha`** — a scaling factor applied to the low-rank update, as seen in the `alpha / r` term above. It controls how strongly the adapter's output affects the final result relative to the frozen base weights. A common convention is setting `lora_alpha` to roughly twice `r` (e.g., `r=16, lora_alpha=32`), though this is a starting heuristic, not a law — it's tuned like any other hyperparameter.

## Which modules to target

LoRA doesn't have to be applied everywhere — `target_modules` in `peft.LoraConfig` specifies exactly which weight matrices get a LoRA adapter. The most common default targets the attention projections, especially the query and value projections (`q_proj`, `v_proj`), since the original paper found these captured most of the useful adaptation signal at a good parameter-efficiency trade-off. Some setups extend coverage to `k_proj`, `o_proj`, and the feed-forward layers (`gate_proj`, `up_proj`, `down_proj`) for tasks that need more capacity, at the cost of more trainable parameters.

```python
from peft import LoraConfig, get_peft_model

config = LoraConfig(
    r=16,
    lora_alpha=32,
    lora_dropout=0.05,
    target_modules=["q_proj", "v_proj", "k_proj", "o_proj"],
    bias="none",
    task_type="CAUSAL_LM",
)
model = get_peft_model(base_model, config)
```

## Merging for deployment

After training, the adapter can be kept separate (loaded alongside the frozen base model at inference, which is cheap to store and lets many task-specific adapters share one base model) or merged directly into the base weights for a single, standalone checkpoint with no runtime overhead:

```python
merged_model = model.merge_and_unload()
merged_model.save_pretrained("llama-3.1-8b-my-task-merged")
```

`merge_and_unload()` computes `W_new = W + (alpha / r) * B @ A` for every adapted matrix and returns a regular model with no PEFT wrapper — useful when you want a single deployable artifact rather than base model plus adapter.

## Trade-offs

LoRA's quality typically comes close to full fine-tuning for moderate domain shifts, with dramatically lower memory and faster training, and the ability to swap between many small adapters cheaply. It tends to underperform full fine-tuning on tasks requiring the model to absorb a very large amount of new information or a very different behavioral distribution than pretraining covered — exactly the "large domain shift" case flagged as full fine-tuning's edge in the previous lesson.

## Key terms

- **LoRA (Low-Rank Adaptation)** — freezing base weights and training a low-rank pair of matrices (`A`, `B`) that approximate the useful weight update
- **Rank (`r`)** — the bottleneck dimension of the LoRA matrices; controls adapter capacity and parameter count
- **`lora_alpha`** — the scaling factor applied to the low-rank update relative to the frozen base weights
- **`target_modules`** — which weight matrices (e.g., `q_proj`, `v_proj`) receive a LoRA adapter
- **`merge_and_unload()`** — folds the LoRA update into the base weights, producing a standalone merged model
