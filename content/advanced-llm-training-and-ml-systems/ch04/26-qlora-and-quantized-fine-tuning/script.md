# Script — QLoRA & Quantized Fine-Tuning

## Segment 1 (title)

LoRA already shrinks trainable-parameter memory to a sliver of the model, but the frozen base weights still load in full — in bf16, a 70-billion-parameter model is 140 gigabytes just to hold them. QLoRA removes that bottleneck by quantizing the frozen model to 4-bit, while still training full-precision adapters on top.

## Segment 2 (steps)

Frozen weights never get updated, so a one-time precision loss from quantization is far safer than quantizing something actively training. QLoRA's NF4 format allocates more representable values near zero, matching how pretrained weights actually distribute. Double quantization squeezes the scaling constants themselves too. Meanwhile the LoRA matrices stay in bf16 the whole time — anything that receives a gradient keeps full precision.

## Segment 3 (code)

In practice this is BitsAndBytesConfig: load in 4-bit, use the NF4 quant type, turn on double quantization, and set the compute dtype to bfloat16, which controls the precision every matrix multiply actually dequantizes to on the fly during training.

## Segment 4 (steps)

The payoff is real: QLoRA's headline result fine-tuned a 65-billion-parameter model on a single 48-gigabyte GPU — something full-precision LoRA alone couldn't do, since even just the frozen weights wouldn't have fit. The cost is a modest accuracy hit from 4-bit quantization and some dequantization overhead during training.

## Segment 5 (outro)

That's how a model this large gets fine-tuned on hardware far smaller than you'd expect. Up next: what fine-tuning — full or parameter-efficient — can quietly cost the model if you're not careful: catastrophic forgetting.
