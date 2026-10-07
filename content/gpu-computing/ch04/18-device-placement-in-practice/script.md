# Script — Device Placement in Practice

## Segment 1 (title)

Chapter three was about what happens on the GPU once work gets there. This chapter is about getting work there correctly from PyTorch — and the single most common source of bugs and silent slowdowns is a tensor or a model sitting on the wrong device.

## Segment 2 (code)

The standard pattern checks for a GPU once, with torch.cuda.is_available, and stores the result in a device variable instead of hardcoding cuda everywhere. That means the exact same script runs, just slower, on a machine with no GPU instead of crashing immediately.

## Segment 3 (code)

Both the model's parameters and every input tensor that reaches it have to live on the same device. Calling dot-to on the model moves it in place. Calling dot-to on a tensor returns a new tensor instead, which is why you have to reassign inputs equals inputs dot-to device — the original tensor is left exactly where it was.

## Segment 4 (steps)

Dot-cuda is an older, CUDA-specific shorthand for the same move. Dot-to device is the preferred, general form, because the same code path works whether device is cuda, cpu, or another backend, without an if statement scattered through the codebase.

## Segment 5 (code)

Forget to move one tensor, and PyTorch raises a clear runtime error right at the line where the mismatched tensors meet. It's almost always one tensor created fresh inside a function — often with torch.zeros and no device argument — that defaults to CPU and was never moved.

## Segment 6 (outro)

Up next, lesson nineteen: pinned memory and data transfer, where it stops being about getting a tensor onto the right device, and starts being about how fast it got there.
