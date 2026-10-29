# Lesson 4 — When a Workload Actually Needs a GPU, and When It Doesn't

**Chapter 1 · GPU Computing Fundamentals for Cloud Architects · Lesson 4 of 4**

## What you'll learn

- A grounded, honest framework for deciding GPU vs. CPU, built on
  what you learned in Lessons 1-3 rather than reflexive "AI means GPU"
  thinking
- Which workloads genuinely need a GPU's parallelism, and which ones
  only look like they do
- Why most traditional data processing and ETL work is a bad fit for
  GPUs, regardless of how much data is involved
- Why a CPU is frequently the *more* cost-effective choice for small
  models, classical ML, and inference at low volume — and why
  defaulting to GPU everywhere is a real FinOps mistake on top of an
  architectural one

## The actual test: does the workload live in large matrix math?

Lesson 1 established the real reason GPUs are fast: deep learning's
forward and backward passes are dominated by large matrix
multiplications that can be split across thousands of parallel cores
with no dependency between them. That's the test — not "does this
involve AI," but "is the dominant cost in this workload large,
parallelizable matrix/tensor math?"

**Workloads that genuinely pass this test:**

- Training a deep learning model of any real size — the matmuls in
  dense layers, convolutions, and transformer attention are exactly
  what Lesson 1 covered
- Fine-tuning an existing large model (subject to the memory math
  from Lesson 2 — and GPU is still the only practical option even
  when you need LoRA or quantization to make it fit)
- High-throughput inference serving for a deep learning model,
  especially at the batch sizes and concurrency where GPU parallelism
  actually gets exercised
- Classical workloads that are themselves matrix-heavy at scale —
  large dense linear algebra, certain scientific simulation, some
  computer vision preprocessing pipelines

**Workloads that look AI-adjacent but don't actually pass:**

- Traditional ETL and data transformation — filtering, joining,
  aggregating rows. This is fundamentally row-oriented, branchy,
  I/O-bound work, not dense matrix math. A GPU's thousands of simple
  cores bring nothing to a `WHERE` clause or a `GROUP BY`.
- Most classical ML — gradient-boosted trees (XGBoost, LightGBM),
  linear/logistic regression, random forests on tabular data of
  modest size. These algorithms don't reduce to the kind of large,
  dense matmul that justifies a GPU's cost; CPU implementations are
  often competitive or faster for realistic dataset sizes.
- Small models at low inference volume — a small model serving a
  handful of requests per second has no sustained parallel workload
  large enough to keep a GPU's cores busy; you'd be paying for
  thousands of idle cores.
- Preprocessing and feature engineering steps that are really just
  data wrangling with a machine learning label attached to the
  project.

## Why "just use a GPU" is a FinOps mistake, not just an architecture one

Everything this path has already covered about FinOps applies here
directly: a GPU VM costs meaningfully more per hour than an
equivalent CPU VM, and that cost is justified only when the workload
actually exercises the GPU's parallelism enough of the time to be
worth it. Provisioning an ND- or P-series instance for a job whose
real bottleneck is disk I/O or row-by-row branching logic means paying
for thousands of cores that sit idle — the GPU equivalent of
over-provisioning a VM size nobody is using.

The inverse mistake is just as real: forcing a genuinely large
training or fine-tuning job onto CPU to "save cost" can turn a job
that finishes in hours into one that takes weeks, which usually costs
far more in wall-clock time and compute-hours combined than the GPU
would have.

## A decision checklist

Before provisioning a GPU instance, ask, in order:

1. Is the dominant computational cost a large, parallelizable
   matrix/tensor operation (training or inference on a real deep
   learning model)? If no, start with CPU.
2. If yes — does the model/data actually fit the memory math from
   Lesson 2 on a realistic instance, or does it need LoRA,
   quantization, or multi-GPU sharding to fit?
3. Is this a single-node job (NC-series / G-series territory) or does
   it need multi-node interconnect (ND-series / P-series territory)?
4. At the expected request volume for inference, is there enough
   sustained load to keep the GPU's parallelism actually busy, or
   would a smaller CPU-based or CPU+smaller-model deployment serve it
   more cheaply?

## Key terms

| Term | Meaning |
|---|---|
| Matmul-bound workload | A workload whose dominant computational cost is large, parallelizable matrix/tensor multiplication — the real signal for needing a GPU |
| Classical ML | Non-deep-learning algorithms (gradient-boosted trees, linear models, random forests) that typically run efficiently on CPU for realistic dataset sizes |
| Idle-core cost | The FinOps waste of provisioning a GPU instance for a workload that never exercises enough parallelism to justify its cost |
| Decision checklist | The ordered set of questions — matmul-bound? fits in memory? single- or multi-node? sustained load? — used to choose GPU vs. CPU |

## Check yourself

You've completed Chapter 1 when you can explain, without looking: what
specific property of a workload (not "it's AI-related") actually
justifies putting it on a GPU, and why provisioning a GPU for a small
model at low inference volume is a FinOps mistake, not just a neutral
choice?
