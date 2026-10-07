# Script — PyTorch Debugging Basics

## Segment 1 (title)

Closing out chapter one, this lesson is less about new API and more about habits — the handful of checks that catch most PyTorch mistakes in seconds instead of an hour of staring at a stack trace.

## Segment 2 (code)

Shape mismatches are the single most common error you'll see. PyTorch tells you exactly which two shapes it tried to combine and why — here, the inner dimensions ten and twenty don't match. Printing the shapes right before the failing line almost always finds the culprit faster than reading code.

## Segment 3 (code)

A loss that turns to NaN partway through training is especially frustrating because the stack trace doesn't point at the cause. Common causes include a learning rate that's too high, or a log of zero hiding somewhere in a custom loss. Checking with torch dot isnan right after computing the loss turns a confusing eventual crash into an immediate, localized one.

## Segment 4 (code)

Before reaching for a debugger, two plain tools solve most problems: printing a tensor's shape, dtype, and device, and writing assert statements that document your assumption and fail loudly exactly where it breaks. Sprinkling these in while you're developing a new model costs you nothing and saves you from chasing a confusing failure three layers downstream.

## Segment 5 (steps)

Run through this checklist before assuming a bug is something exotic: did you zero the gradients before backward? Are all your tensors on the same device, with shapes that match? And is the model in the right mode, train versus eval? In practice, the large majority of bugs you'll hit trace back to one of these five things.

## Segment 6 (outro)

That closes out chapter one — tensors, autograd, devices, a training loop, real data, and saving your work. Up next, chapter two: building real neural networks with nn.Module.
