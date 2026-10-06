# Lesson 24 — The Real Cost of Fine-Tuning

**Chapter 4 · Fine-Tuning & Customization · Lesson 24 of 31**

## What you'll learn

- The five real cost components of a fine-tuning project — most teams only budget for one
- Why the training bill itself is usually the smallest line item, not the biggest
- The inference surcharge: a fine-tuned model is typically *more* expensive to run, not less
- The recurring cost nobody budgets for: what happens when the base model gets deprecated
- Why this closes the chapter: it's the honest finish to "when to fine-tune vs. prompt"

## Cost component 1 — data collection

Before any training compute is spent, you need hundreds of good, representative labeled
examples. Writing or collecting them, reviewing them for quality, and fixing the ones
that teach the model the wrong thing is almost always a **human-hours cost** — and it's
usually the single largest cost in the whole project, even though it never shows up on a
provider's pricing page.

## Cost component 2 — training compute

This is the part people actually budget for. OpenAI's fine-tuning jobs bill based on
`trained_tokens` — the total tokens the training run actually consumed (data size ×
epochs). As one indicator of real-world scale: third-party pricing trackers have cited
figures in the range of roughly **$1.50–$25 per million training tokens**, varying
significantly by base model size. Treat any specific number here as **approximate and
worth re-confirming directly against the provider's current pricing page before
budgeting** — these rates move, and this course prioritizes flagging that volatility over
quoting a number that will quietly go stale.

## Cost component 3 — the inference surcharge

This is the one people most often forget: a fine-tuned model is typically **more
expensive to call than the base model it was built from**, not less. Pricing trackers have
cited fine-tuned inference running at roughly **1.5× the base model's per-token rate** on
some providers. If your fine-tuned model replaces millions of base-model calls, that
surcharge compounds fast — run the math on your actual call volume before assuming
fine-tuning is the cheaper long-term option.

## Cost component 4 — storage and hosting

A full fine-tune produces a complete model-sized artifact that has to be stored and
served. A LoRA adapter (Lesson 22) is dramatically cheaper here — megabytes instead of
gigabytes — which is a real, structural cost advantage on top of its training-time
efficiency.

## Cost component 5 — the recurring tax: base model deprecation

This is the cost nobody puts in the initial budget. A fine-tune is built on top of one
specific base model version. When that base model is deprecated (Chapter 2, Lesson 12),
your fine-tune doesn't get a free upgrade — you have to **retrain from scratch on the new
base model**, repeating the data and compute cost, indefinitely, for as long as you keep
using it. A fine-tuning project isn't a one-time cost; it's a recurring maintenance
commitment tied to someone else's model lifecycle.

## Weighing it against the alternative

```
Prompting:    ~$0 setup, pay only per call, no retraining ever required
Fine-tuning:  data + training + (higher) inference + storage + re-tune on every deprecation
```

This is exactly why Lesson 20 said "prompt first": the full cost picture of fine-tuning is
wider, and more recurring, than a single training bill suggests.

## Key terms

| Term | Meaning |
|---|---|
| `trained_tokens` | What a fine-tuning job's compute cost is actually billed on |
| Inference surcharge | The extra per-token cost of calling a fine-tuned model vs. the base model |
| Recurring re-tuning cost | Having to redo training whenever the underlying base model is deprecated |
| Total cost of ownership | The full, ongoing cost picture — not just the one-time training bill |

## Lab

1. List the five cost components covered in this lesson, in the order they'd actually hit
   your budget over a project's lifetime.
2. Explain why a fine-tuned model's *inference* cost, not just its training cost, needs to
   be budgeted against real call volume.
3. Explain, referencing Lesson 12, why fine-tuning is a recurring commitment rather than a
   one-time cost.

## Check yourself

Chapter 4 is complete when you can list all five real cost components of a fine-tuning
project from memory, and explain in one sentence why the recurring re-tuning cost is the
one most teams fail to budget for.
