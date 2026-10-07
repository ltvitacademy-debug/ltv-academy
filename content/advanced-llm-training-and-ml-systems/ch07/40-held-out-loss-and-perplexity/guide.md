# Held-Out Loss & Perplexity

Chapter 6 covered keeping a training run alive long enough to finish. This chapter asks the next question: once it finishes, how do you know the model is actually good? The simplest, cheapest signal — and the one you should already be computing because the training loop produces it almost for free — is held-out loss and its more interpretable cousin, perplexity. This lesson covers what they measure, what they don't, and why they're a necessary first check rather than a sufficient final answer.

## What you'll learn

- Why held-out (validation) loss is different from training loss and why that difference matters
- What perplexity is, how it's computed from loss, and why it's more interpretable than raw loss
- How to compute held-out loss and perplexity concretely
- Why a lower perplexity doesn't guarantee a better model for your actual use case
- How held-out loss connects to the benchmark and human evaluation methods in the rest of this chapter

## Held-out loss vs. training loss

Training loss tells you how well the model fits the exact batches it has been optimizing against; held-out loss — computed on a validation set the model never trains on — tells you how well that fit generalizes to data it hasn't memorized. The two can diverge: training loss can keep falling while held-out loss plateaus or rises, which is the signature of overfitting (the model increasingly fitting idiosyncrasies of the training data rather than learning patterns that generalize). For a model trained on a large, diverse pretraining corpus for a small number of epochs, this gap is usually small; for a heavily fine-tuned model trained on a narrow dataset for many epochs, it can be substantial, and is in fact mechanically related to the catastrophic forgetting risk from Lesson 27.

## What perplexity is

Perplexity is simply the exponential of the cross-entropy loss: `perplexity = exp(loss)`, where loss is the average negative log-likelihood the model assigns to the correct next token across the held-out set. Intuitively, it represents the model's average "effective branching factor" — a perplexity of 20 means the model is, on average, as uncertain about the next token as if it had to choose uniformly among 20 equally likely options. Lower is better, and because perplexity is an exponential transform of loss, small differences in loss translate into proportionally larger, more legible differences in perplexity, which is part of why practitioners report it rather than raw loss.

## Computing it

```python
import torch
import math
from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3.1-8B")
tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-3.1-8B")

@torch.no_grad()
def held_out_loss(text, model, tokenizer):
    inputs = tokenizer(text, return_tensors="pt")
    outputs = model(**inputs, labels=inputs["input_ids"])
    return outputs.loss.item()

loss = held_out_loss(validation_text, model, tokenizer)
perplexity = math.exp(loss)
```

The Hugging Face `evaluate` library also packages this as a ready-made metric (`evaluate.load("perplexity", module_type="metric")`), which computes perplexity for a list of texts against a specified model without requiring you to write the loss loop by hand — convenient for quick comparisons across checkpoints or models.

## Why it's necessary but not sufficient

Held-out loss and perplexity measure one specific thing well: how well the model predicts the next token on data drawn from a particular distribution. They do not directly measure whether the model follows instructions correctly, reasons accurately, avoids harmful outputs, or is useful for any particular downstream task — a model can have excellent perplexity on held-out web text while being mediocre at following instructions, because instruction-following is a different (and narrower) distribution than general web text. This is precisely why the rest of this chapter moves beyond held-out loss to standard benchmarks, human evaluation, and LLM-as-judge methods: each measures something perplexity structurally cannot.

## Key terms

- **Held-out (validation) set** — data the model never trains on, used to measure generalization rather than memorization
- **Perplexity** — `exp(loss)`, the exponential of cross-entropy loss, interpretable as an average effective branching factor
- **Overfitting gap** — the divergence between training loss (still falling) and held-out loss (plateauing or rising)
- **Cross-entropy loss** — the average negative log-likelihood the model assigns to the correct next token
- **Distributional mismatch** — the reason low perplexity on one data distribution doesn't guarantee good performance on a different downstream task
