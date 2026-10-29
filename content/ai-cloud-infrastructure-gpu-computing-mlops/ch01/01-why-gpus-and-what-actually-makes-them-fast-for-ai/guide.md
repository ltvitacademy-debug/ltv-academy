# Lesson 1 — Why GPUs, and What Actually Makes Them Fast for AI

**Chapter 1 · GPU Computing Fundamentals for Cloud Architects · Lesson 1 of 4**

## What you'll learn

- Why a CPU's design — a handful of complex, latency-optimized cores —
  is fundamentally different from a GPU's design — thousands of
  simpler, throughput-optimized cores
- Why training and running neural networks reduces, at the hardware
  level, almost entirely to enormous matrix multiplications
- What SIMT (single instruction, multiple threads) execution means,
  and why it maps so cleanly onto matrix math
- Why Tensor Cores and lower-precision math multiply effective
  throughput further, without simply adding more cores

## CPUs optimize for latency, GPUs optimize for throughput

You've spent this path provisioning compute for web apps, APIs, and
data platforms — all of it on CPUs. A modern server CPU has somewhere
between 4 and 128 cores, and each one is genuinely sophisticated:
deep out-of-order pipelines, branch prediction, large per-core caches,
speculative execution. The entire design goal is to finish *one*
instruction stream as fast as possible, including all the unpredictable
branching and pointer-chasing that real software does.

A GPU throws that design out. An NVIDIA A100, for example, packs 6,912
CUDA cores — but each one is far simpler than a CPU core, with no
sophisticated branch prediction and a much shallower pipeline. The
design goal isn't "finish one thing fast," it's "do the same operation
across a huge number of data elements at once." Think of a CPU as a
handful of expert chefs who can cook any dish quickly and adapt on the
fly, versus a GPU as a kitchen with thousands of line cooks who can all
chop vegetables simultaneously — useless for improvising a new recipe,
unbeatable when the task is identical, repetitive work at scale.

## Deep learning is, overwhelmingly, matrix multiplication

This is the fact that makes GPUs the default for AI: the forward and
backward passes of a neural network are, at the arithmetic level,
dominated by matrix multiplications.

- A dense (linear) layer's forward pass is a matrix multiply between
  a weight matrix and an activation matrix, plus a bias add and a
  nonlinearity.
- Training's backward pass computes gradients with more matrix
  multiplies, one per layer.
- Convolutional layers can be reshaped (via an operation called
  im2col) into matrix multiplications, which is exactly why GPUs that
  are good at matmul are also good at image models.
- Transformer attention — the mechanism behind every modern LLM — is
  built from `Q @ K^T` to score relevance, a softmax, and then a
  weighted sum against `V`. All of the heavy arithmetic is matmul.

So the operation that dominates AI compute cost is exactly the
operation a GPU's architecture was built to accelerate: millions of
independent multiply-accumulate operations that can all run at once
with no dependency on each other.

## SIMT: why "thousands of simple cores" actually works

GPU cores are grouped into warps (NVIDIA's term; 32 threads per warp)
that execute the *same instruction* across many threads simultaneously
— a model called SIMT, Single Instruction, Multiple Threads. When the
inner loop of a matrix multiply is "multiply two numbers, add the
result to an accumulator," you can issue that single instruction across
thousands of threads at once, each working on a different element of
the matrix.

CPUs have a version of this too — vector extensions like AVX-512 — but
with 8 or 16 lanes, not thousands. That gap in parallel lane count,
not raw clock speed, is the real reason a GPU can be an order of
magnitude faster than a CPU on the same matmul.

## Tensor Cores: specialized circuits for the exact pattern

Since the Volta architecture, NVIDIA GPUs have included Tensor Cores —
circuits purpose-built to perform a small matrix multiply-accumulate
(for example, a 4x4 block) in a single operation, usually at reduced
precision (FP16, BF16, and on newer chips INT8 or FP8). This isn't
"more CUDA cores" — it's a different, specialized circuit tuned for
exactly the pattern that dominates deep learning math, delivering far
more throughput per clock than general-purpose CUDA cores alone.

This is also why "mixed-precision training" is standard practice: run
the bulk of the matmul work in FP16/BF16 for speed, while accumulating
results in FP32 to avoid numerical instability. Azure's NC-series and
AWS's P-series instances (covered in Lesson 3) are built around GPUs
with exactly this Tensor Core capability.

## Key terms

| Term | Meaning |
|---|---|
| CUDA core | A single simple arithmetic unit on an NVIDIA GPU; thousands run the same instruction in parallel (SIMT) |
| SIMT | Single Instruction, Multiple Threads — the execution model where one instruction is applied across many threads at once |
| Tensor Core | A specialized circuit (since Volta) that performs a small matrix multiply-accumulate in one operation, often at reduced precision |
| Mixed precision | Running most compute in FP16/BF16 for speed while accumulating in FP32 for numerical stability |

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: why
does a GPU's "thousands of simple cores" design actually outperform a
CPU's "few complex cores" design specifically for deep learning, and
what role do Tensor Cores play beyond just adding more cores?
