# Lesson 2 — GPU Memory, and Why It Becomes the Real Bottleneck

**Chapter 1 · GPU Computing Fundamentals for Cloud Architects · Lesson 2 of 4**

## What you'll learn

- Why a model's parameters, gradients, optimizer state, and
  activations all have to fit in GPU memory (VRAM) at the same time
- Why "CUDA out of memory" is the single most common training
  failure — far more common than a job simply running too slowly
- The real memory math behind fine-tuning a mid-size model, and why
  it can blow past a single GPU's VRAM long before compute is the
  constraint
- The difference between memory *capacity* (how much fits) and memory
  *bandwidth* (how fast data moves to and from the compute cores) —
  two distinct bottlenecks that get confused constantly

## Everything has to fit, at the same time

Lesson 1 covered why GPUs are fast at the matrix math behind deep
learning. Speed doesn't help if the job never starts. During training,
a GPU has to simultaneously hold, in its own on-board memory (VRAM):

- **Model parameters** — the weights themselves
- **Gradients** — one value per parameter, computed during backprop
- **Optimizer state** — bookkeeping the optimizer keeps per parameter
  (Adam, the most common optimizer, keeps two extra values per
  parameter — momentum and variance)
- **Activations** — the intermediate outputs of every layer, kept
  around during the forward pass so backprop can use them

None of this is optional, and none of it can spill cleanly to regular
system RAM without a serious performance penalty. This is why "CUDA
out of memory" is the error you'll see constantly in this field — not
because the GPU is slow, but because the job's working set is larger
than the VRAM physically installed on the card.

## The memory math, worked through

Take a 7-billion-parameter model, trained in FP16 (2 bytes per value):

- Weights: 7B × 2 bytes ≈ **14 GB**
- Gradients: 7B × 2 bytes ≈ **14 GB**
- Adam optimizer state, commonly kept in FP32 for stability (momentum
  + variance, 4 bytes each): 7B × 8 bytes ≈ **56 GB**
- Activations: varies with batch size and sequence length, but easily
  adds several more GB

Add it up and full fine-tuning of a 7B model can need **80-100+ GB**
of VRAM — more than a single 80 GB A100 or H100 has, before you've
even increased batch size. This is precisely why techniques like
LoRA (training a small set of adapter weights instead of the full
model), 8-bit or 4-bit quantization, gradient checkpointing (recomputing
activations instead of storing all of them), and multi-GPU memory
partitioning (DeepSpeed ZeRO, Fully Sharded Data Parallel) all exist —
every one of them is a direct response to this memory wall, not to a
compute shortage.

Inference is far lighter — you only need the weights plus, for an LLM,
a KV cache that holds attention keys/values for every generated token.
But that KV cache still grows with context length and batch size, and
long-context, high-concurrency inference can become memory-bound in
exactly the same way training does.

## Capacity vs. bandwidth: two different bottlenecks

It's worth separating two things that both get called "GPU memory":

- **Capacity** — the total VRAM on the card (e.g., 80 GB on an
  A100-80GB). This determines whether your model's working set fits
  at all.
- **Bandwidth** — how fast data moves between that memory and the
  GPU's compute cores, measured in GB/s or TB/s. Datacenter GPUs use
  High Bandwidth Memory (HBM) — HBM2e on the A100 delivers roughly
  2 TB/s, HBM3 on the H100 goes significantly higher — because feeding
  thousands of parallel cores fast enough to keep them busy is its own
  engineering problem, separate from capacity.

A job can be capacity-bound (it won't even load) or bandwidth-bound
(it loads, but compute cores sit idle waiting on data). Both show up
as "the GPU is the bottleneck," but the fix for each is completely
different — one needs more VRAM or a smaller working set, the other
needs faster memory or better data layout.

## Key terms

| Term | Meaning |
|---|---|
| VRAM | The memory physically on the GPU card, holding weights, gradients, optimizer state, and activations during training |
| Optimizer state | Per-parameter bookkeeping an optimizer like Adam maintains (e.g. momentum and variance), often the single largest memory consumer in training |
| Gradient checkpointing | Recomputing activations during backprop instead of storing all of them, trading compute time for memory |
| HBM (High Bandwidth Memory) | The memory technology used on datacenter GPUs, optimized for the extreme bandwidth thousands of parallel cores demand |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: why
can a 7B-parameter model need well over 80 GB of VRAM to fine-tune
even though the weights themselves are only 14 GB in FP16, and what's
the difference between a capacity-bound job and a bandwidth-bound one?
