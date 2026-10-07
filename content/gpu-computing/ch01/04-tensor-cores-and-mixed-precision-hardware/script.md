# Script — Tensor Cores & Mixed-Precision Hardware

## Segment 1 (title)

CUDA cores do one floating-point operation per cycle, per core. Modern NVIDIA GPUs also carry a second kind of core built for exactly one thing — small matrix multiplications — and it's why training keeps getting faster even on GPUs with the same CUDA core count.

## Segment 2 (steps)

A CUDA core computes one multiply-accumulate at a time. A tensor core computes an entire small matrix multiply-accumulate in a single operation. Since deep learning is overwhelmingly matrix multiplication, tensor cores push far more effective throughput through the same silicon — that's where the big "AI TFLOPS" number on a spec sheet comes from.

## Segment 3 (steps)

Four formats matter here. FP32 is the default, full range. FP16 halves the memory but has a narrow range that can underflow. BF16 keeps FP32's range with less mantissa precision. TF32 is a tensor-core-only format PyTorch uses automatically on Ampere and newer cards, even for ordinary FP32 matrix multiplies.

## Segment 4 (code)

Mixed precision in practice means wrapping your forward pass in autocast, which runs eligible operations like matmuls in FP16, while a GradScaler scales the loss up before backward so small gradients don't underflow to zero, then unscales before the optimizer step.

## Segment 5 (outro)

Remember the trade: tensor cores buy throughput, and each precision format trades range or memory for speed. Next up, lesson five: CPU versus GPU workload characteristics, closing out the architecture chapter.
