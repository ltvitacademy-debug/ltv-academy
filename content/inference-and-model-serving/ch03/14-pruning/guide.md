# Pruning

Quantization (Lessons 12-13) shrinks how many bits represent each weight, but keeps every weight. Pruning takes a different approach: it removes weights — or whole structural pieces of the model — entirely, betting that many of them contribute little to the output. The two techniques aren't competitors; they're usually combined.

## What you'll learn

- The difference between unstructured and structured pruning, and why it determines whether pruning actually speeds up inference
- How magnitude-based pruning decides what to remove
- Why sparse weights alone don't guarantee a faster model
- How pruning and fine-tuning are combined to recover lost accuracy

## Unstructured vs. structured pruning

- **Unstructured pruning** zeros out individual weights anywhere in a matrix, based on some criterion (most commonly magnitude — see below). This can reach high **sparsity ratios** (the fraction of weights set to zero) with very little accuracy loss, because the model has enormous freedom in which specific weights go. The catch: a matrix with scattered zeros is still, mechanically, a dense matrix to a standard GPU matrix-multiply kernel — the hardware has to check each entry anyway, so unstructured sparsity mostly saves disk and transfer size, not inference compute, unless you have specialized sparse kernels.
- **Structured pruning** removes whole rows, columns, attention heads, or even entire layers — chunks large enough that a standard dense kernel can simply skip them. This is what actually translates into a smaller matrix multiply and real latency savings on commodity hardware, at the cost of needing a coarser, less flexible removal decision that tends to hurt accuracy more per weight removed.
- A useful middle ground is **semi-structured (N:M) sparsity** — for example "2:4", where exactly 2 of every 4 contiguous weights must be zero. NVIDIA's Ampere and newer GPUs have dedicated sparse tensor cores that accelerate exactly this pattern, which is why 2:4 has become the practical sparsity format to target when you want a real speedup rather than only a size reduction.

## Magnitude pruning: the simplest criterion

The most common way to decide what to remove is **magnitude pruning**: weights closest to zero are assumed to contribute least to the model's output, so they're the first candidates for removal. It's cheap to compute and surprisingly effective — but it's a local heuristic that ignores how weights interact, which is why naive single-shot magnitude pruning at high sparsity (removing, say, 50% or more of weights in one pass) tends to degrade quality faster than quantization to a comparable memory footprint. More sophisticated criteria weigh a weight's magnitude against its sensitivity (how much the loss changes if that weight is removed), similar in spirit to the Hessian-based correction GPTQ uses for quantization error (Lesson 13).

## Pruning rarely stands alone

Because removing weights is a harsher intervention than lowering their precision, pruning is almost always paired with **fine-tuning** afterward — a short additional training run that lets the remaining weights adjust and partially recover the accuracy lost from the ones that were zeroed out. Teams also commonly **iterate**: prune a modest amount, fine-tune, prune a bit more, fine-tune again, rather than removing the full target sparsity in a single pass. This iterative approach generally preserves more quality than one aggressive cut, at the cost of a slower, more expensive compression process — which is exactly the kind of quality-vs-cost trade-off Lesson 16 gives you a framework for evaluating.

## Key terms

| Term | Meaning |
|---|---|
| Sparsity ratio | The fraction of a model's weights set to exactly zero |
| Unstructured pruning | Removing individual weights anywhere, regardless of position |
| Structured pruning | Removing whole rows, heads, or layers so a dense kernel can skip them |
| N:M sparsity | A fixed pattern (e.g. 2:4) matching dedicated sparse hardware support |
| Magnitude pruning | Removing weights with the smallest absolute value first |

## Recap

Pruning removes weights instead of shrinking their precision, but unstructured pruning alone rarely speeds up inference without specialized kernels — it's structured or N:M sparsity, matched to hardware that actually supports it, that turns sparsity into real latency savings. Because pruning is a harsher cut than quantization, it's almost always followed by fine-tuning to recover accuracy. Next up, Lesson 15: knowledge distillation, which compresses a model by training a smaller one to imitate it rather than editing the original at all.
