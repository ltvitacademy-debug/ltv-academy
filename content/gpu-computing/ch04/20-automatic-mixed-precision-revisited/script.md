# Script — Automatic Mixed Precision, Revisited

## Segment 1 (title)

Your Deep Learning and PyTorch course introduced mixed precision as a speed trick. Here, with tensor cores and the compute-versus-memory distinction behind you, it's worth revisiting the same APIs with a clearer picture of why they actually work.

## Segment 2 (code)

Autocast wraps the forward pass and automatically runs numerically safe ops, like convolutions and matrix multiplies, in float16 or bfloat16, while keeping sensitive ops like loss computation in float32. Those are exactly the GEMM-heavy, compute-bound ops that benefit from tensor cores, which is where the real speedup is concentrated.

## Segment 3 (code)

Float16 has a much smaller exponent range than float32, so during backpropagation small gradients can underflow to exactly zero, silently killing learning. GradScaler works around that by scaling the loss up before backward so gradients scale up too, then unscaling before the optimizer step — and it skips the step entirely if scaling caused an overflow.

## Segment 4 (steps)

Bfloat16 has the same exponent range as float32, just less mantissa precision, so it doesn't suffer that underflow problem at all. Training with autocast in bfloat16 skips GradScaler entirely — simpler code, at the cost of a bit more rounding error per value.

## Segment 5 (outro)

Mixed precision is primarily a fix for compute-bound kernels — it's the direct payoff of everything chapter three taught you about telling compute-bound from memory-bound. Up next, lesson twenty-one: CUDA graphs, which cut launch overhead once the math itself is already cheap.
