# Lesson 22 — LoRA & Parameter-Efficient Tuning, Conceptually · Voiceover script

Segments map 1:1 to slides. Target: ~3 minutes total.

---

## S1 · TITLE CARD

A full fine-tune updates every single weight in the model — potentially billions of
numbers. That's expensive to train and expensive to store, and if you want five different
fine-tuned variants, you're storing five full copies of a massive model. This lesson
covers the technique that fixes that: LoRA.

## S2 · CODE CARD: the core idea

Here's the core idea. Full fine-tuning trains the weight matrix directly — in a real
layer, that can be millions of parameters. LoRA instead freezes that weight completely,
and trains two small matrices, B and A, whose product approximates the change a full
fine-tune would have made. Not the weight itself — a small, learned detour added on top.
And that detour can be a tiny fraction of the original size.

## S3 · STEPS CARD: why it matters

That has real, practical consequences. Far fewer trainable parameters — often under one
percent of the full model — means less memory and much faster training. The resulting
adapter is megabytes, not gigabytes, so storing ten task-specific versions costs almost
nothing. Because the base model stays frozen and shared, you can swap different adapters
onto that same base for different tasks. And because the original weights are never
touched, the model's general capabilities are naturally preserved.

## S4 · STEPS CARD: two hyperparameters

Two settings you'll actually encounter. Rank controls the size of that bottleneck —
higher rank means more capacity to learn, but more parameters and less of the efficiency
win. Alpha is a scaling factor, tuned alongside rank, controlling how strongly the
adapter's output actually influences the model's behavior.

## S5 · STEPS CARD: merge or keep separate

Once training's done, you have a choice. Merge the adapter back into the original weight,
and you get zero extra inference latency — it behaves like a single fine-tuned model
again. Or keep it separate, and you can swap which adapter is loaded on top of the same
shared base, task by task.

## S6 · OUTRO CARD

Freeze the model, train a tiny detour, get an adapter small enough to swap like a plugin
— that's LoRA. Next lesson asks the question that actually matters once training is done:
how do you know it worked, and that it didn't quietly break something else? See you
there.
