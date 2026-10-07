# Script — Pruning

## Segment 1 (title)

Quantization shrinks how many bits represent each weight but keeps every weight. Pruning removes weights entirely, betting that many of them contribute little to the output. The two aren't competitors — they're usually combined.

## Segment 2 (steps)

That's the core distinction: quantization keeps every weight and lowers its precision, pruning removes weights outright. The question pruning has to answer is which weights to remove, and where they sit in the matrix.

## Segment 3 (steps)

Unstructured pruning zeros out individual weights anywhere, which reaches high sparsity with little accuracy loss — but a standard GPU kernel still has to check every entry, so it mostly saves storage, not compute, without specialized sparse kernels. Structured pruning removes whole rows, heads, or layers, chunks large enough that a dense kernel can simply skip them — that's what actually produces a real speedup. N to M patterns like two-of-four sit in between, matching dedicated sparse tensor cores on newer GPUs.

## Segment 4 (steps)

The simplest way to decide what to remove is magnitude pruning: weights closest to zero go first, on the assumption they matter least. It's cheap but ignores how weights interact, which is why aggressive single-shot pruning tends to hurt quality faster than quantization at a comparable footprint — teams instead prune a little, fine-tune, and repeat.

## Segment 5 (code)

Here's two-to-four sparsity in PyTorch: apply a mask that zeros exactly two of every four contiguous weights, then convert to a semi-structured sparse tensor so the layer runs on Ampere-and-newer sparse tensor cores instead of a dense kernel.

## Segment 6 (outro)

Pruning is a harsher cut than quantization, so it's almost always followed by fine-tuning. Next up, lesson fifteen: knowledge distillation, which trains a smaller model to imitate the original instead of editing it at all.
