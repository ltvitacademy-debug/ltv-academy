# Script — Mixed Precision at Scale

## Segment 1 (title)

Training doesn't happen in a single precision -- it's a mix, chosen deliberately. This lesson covers why full fp32 is too slow and memory-hungry at scale, what goes wrong with naive fp16, and why bf16 became the practical default for large models.

## Segment 2 (steps)

fp16 has a narrow exponent range compared to fp32. Gradients during training span a wide dynamic range, and the small ones can underflow to exactly zero in fp16, silently stopping those weights from updating. The fix is loss scaling: multiply the loss by a scale factor before backpropagation to push small gradients into fp16's representable range, then divide the resulting gradients by that same factor before the optimizer step.

## Segment 3 (steps)

bf16 trades precision for range instead: it keeps fp32's full 8-bit exponent width, so it has the same dynamic range and doesn't underflow the way fp16 does, even though it has fewer mantissa bits. For LLM training, that trade is almost always worth it, and it means bf16 needs no loss scaling at all -- which removes an entire category of tuning fp16 requires.

## Segment 4 (code)

In practice: fp16 training needs a GradScaler wrapping the backward pass and optimizer step, dynamically adjusting its scale factor when it detects overflow. bf16 training skips all of that -- autocast to bfloat16, call backward, step the optimizer, done. That simplicity is a big part of why bf16, not fp16, became the default once Ampere-generation GPUs supported it natively.

## Segment 5 (outro)

FSDP and DeepSpeed both expose this as a config setting -- MixedPrecision dataclass fields in FSDP, a bf16 or fp16 block in DeepSpeed's JSON config. Precision affects how fast each step runs -- but a run can also slow down because of just one underperforming node, which is exactly what the next lesson covers.
