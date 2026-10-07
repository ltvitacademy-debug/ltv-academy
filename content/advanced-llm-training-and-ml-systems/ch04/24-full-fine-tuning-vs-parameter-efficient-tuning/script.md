# Script — Full Fine-Tuning vs. Parameter-Efficient Tuning

## Segment 1 (title)

With a formatted, properly masked dataset ready, there's one more decision before training: how much of the model actually gets updated. The naive answer — update everything — is full fine-tuning, and it works, but it's often far more expensive than necessary.

## Segment 2 (code)

Here's why. Weights, gradients, and Adam's optimizer state all scale with parameter count, and optimizer state alone needs two running estimates per parameter, usually kept in fp32 for numerical stability. Add it up and you're at roughly sixteen bytes per parameter — for a seven-billion-parameter model, over a hundred gigabytes before activations even enter the picture, more than a single high-end GPU holds.

## Segment 3 (code)

Parameter-efficient fine-tuning freezes almost all of that and trains only a small number of added parameters instead. Hugging Face's peft library's most widely used method, LoRA, does exactly this, freezing the original weights and training a small pair of low-rank matrices alongside them — notice the trainable percentage: a tiny fraction of a percent of the full model, which is where the massive memory win comes from.

## Segment 4 (steps)

This isn't strictly better in every way, though. Full fine-tuning keeps a modest quality edge, especially for a large shift away from the base model's original distribution, and teams with ample multi-GPU compute still choose it. PEFT's appeal is specifically for compute-constrained teams, or anyone maintaining many fine-tuned variants cheaply.

## Segment 5 (outro)

That's the conceptual trade-off: PEFT gives up a little achievable quality for a huge memory reduction. Next up: exactly how LoRA's low-rank matrices work, and how to choose rank and alpha.
