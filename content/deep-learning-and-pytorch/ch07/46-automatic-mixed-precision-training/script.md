# Script — Automatic Mixed Precision Training

## Segment 1 (title)

Last lesson you converted whole tensors between formats by hand. In a real training loop you don't want to think at that level — some ops are safe in reduced precision, others need FP32 to stay stable. Automatic Mixed Precision does that triage for you.

## Segment 2 (code)

torch.autocast is a context manager. Inside it, PyTorch runs matrix multiplies and convolutions in a reduced precision dtype, while keeping sensitive ops like softmax and loss reductions in FP32. You don't rewrite the model — you just wrap the forward pass and loss computation, and PyTorch decides op by op which dtype is actually safe to use.

## Segment 3 (steps)

FP16's small range means small gradients can underflow to zero before they ever reach the optimizer, and that weight quietly stops learning. GradScaler fixes this by multiplying the loss by a large factor before backward, pushing those gradients back into range, then unscaling before the optimizer step.

## Segment 4 (code)

So the full FP16 step looks like this: autocast the forward pass and loss, call scaler.scale on the loss before backward, then scaler.step and scaler.update instead of calling optimizer.step directly. That update call also watches for inf or nan gradients and adjusts the scale automatically.

## Segment 5 (code)

BF16 keeps FP32's exponent range, so gradients rarely underflow in the first place. On hardware that supports it natively, the standard move is to skip GradScaler entirely — just autocast with bfloat16 and call backward and step as usual, which also means a slightly simpler training loop to maintain.

## Segment 6 (outro)

Next up: gradient accumulation, for when your GPU can't fit the batch size you actually want in memory.
