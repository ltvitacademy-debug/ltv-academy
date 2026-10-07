# Script — Devices: CPU, GPU & Moving Data

## Segment 1 (title)

GPUs can be fifty times faster than a CPU for deep learning because they run thousands of matrix multiplications in parallel. But PyTorch never moves data between devices for you — you have to say so explicitly, and that's what this lesson covers.

## Segment 2 (code)

Write device equals torch dot device, checking cuda dot is_available, once at the top of your script. Reusing that variable everywhere instead of hardcoding cuda or cpu is what makes your code device agnostic — it runs correctly whether or not a GPU is present.

## Segment 3 (code)

Dot to of device moves things. For a tensor it returns a new copy on that device; for a model it moves every parameter in place. Tensors stay separate copies on purpose, so you always know exactly where each one lives. The convention is: move the model once right after building it, and move every batch of input data inside the training loop.

## Segment 4 (steps)

PyTorch refuses to silently combine tensors on different devices — it raises a runtime error instead of guessing. Reading the error message carefully tells you exactly which two devices clashed, which narrows the search immediately. That error almost always means one of two things: you moved the model but forgot the input batch, or you created a new tensor with no device keyword and it defaulted to CPU.

## Segment 5 (code)

You can skip the extra copy by creating a tensor directly on the target device with the device keyword argument. And on Apple Silicon, PyTorch has a separate backend called mps that works the same way — same dot to pattern, different name.

## Segment 6 (outro)

One device variable, used everywhere, moved once for the model and every batch for the data. Up next, lesson four: putting tensors, autograd, and devices together into a complete training loop.
