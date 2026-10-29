# Lesson 23 — Right-Sizing GPU Instances for Training vs. Inference

**Chapter 6 · Cost Optimization for AI and GPU Workloads · Lesson 23 of 32**

## What you'll learn

- Why "right-sizing" a GPU workload is really two separate sizing
  problems, not one, depending on whether you're training or serving
- Why training typically demands more GPU memory and compute, and
  often more than one GPU, than the same model needs at inference time
- Why inference on a small model frequently runs fine on a smaller,
  cheaper GPU — or even on a CPU — and what determines which side of
  that line a given model falls on
- How to approach a right-sizing decision as evidence-driven
  measurement rather than a default "biggest GPU available" choice

## Right-sizing is two different questions

Earlier in this path, right-sizing a CPU VM meant picking the smallest
instance that still comfortably handles your peak CPU and memory
load. GPU right-sizing starts from the same instinct, but it splits
into two genuinely different problems the moment you separate
training from inference, because the two workloads put very different
demands on the hardware.

**Training** has to hold, simultaneously, in GPU memory: the full set
of model parameters, the optimizer state (which for something like
Adam can be two to three times the size of the parameters themselves),
activations from the forward pass needed for backpropagation, and
gradients. That combination is why training a large model frequently
needs either a GPU with very large memory, or several GPUs working
together via the data- and model-parallelism techniques covered
earlier in this path.

**Inference** (serving a trained model to answer requests) only needs
enough memory to hold the model's parameters and the activations for
whatever's currently being processed — no optimizer state, no stored
gradients, no backward pass. For many models, especially smaller ones,
that's a dramatically smaller footprint than training the same model
required.

## Why training usually needs more memory and often more GPUs

Walk through why training's memory bill is so much larger than
inference's for the *same* model:

- **Parameters**: identical cost between training and inference —
  this part doesn't change.
- **Optimizer state**: training-only. Adam, the most common optimizer
  for deep learning, keeps a running first and second moment estimate
  per parameter — commonly two extra copies of the parameter count,
  often at higher precision than the model's own weights.
- **Activations**: training has to retain intermediate activations
  from the forward pass specifically so the backward pass can compute
  gradients against them. Inference discards each layer's activations
  the moment the next layer has consumed them, since there's no
  backward pass that will ever need them again.
- **Gradients**: training-only, roughly one more copy of the parameter
  count.

Add that up and a model that comfortably fits for inference on a
single mid-tier GPU can easily require several times that memory to
train — which is exactly why multi-GPU training clusters, and the
distributed training techniques from earlier chapters, exist in the
first place. Right-sizing a training job means sizing for the whole
stack of parameters, optimizer state, activations, and gradients, not
just the model's raw parameter count.

## Why inference can often go smaller — sometimes much smaller

Because inference drops the optimizer state and the retained
activations, the same model that needed a large multi-GPU cluster to
train can frequently serve inference requests on a single, smaller,
and far cheaper GPU. For genuinely small models, inference can run
acceptably on CPU entirely, with no GPU in the picture at all — a
small classical or lightweight model handling modest request volume
may never need the throughput a GPU provides, and paying for one
would be pure waste.

The right-sizing question for inference isn't "what GPU trained this
model" — it's "what's the smallest, cheapest compute (GPU or CPU) that
meets this model's actual latency and throughput requirements under
real traffic." That's a different evidence base than the training
question, and it has to be answered separately, with its own load
testing, not inherited from whatever hardware the training job used.

## Measure, don't default to the biggest GPU available

The practical right-sizing discipline, for either side of this split,
is the same habit you've built with CPU VMs, applied to GPU-specific
metrics:

- For training: track GPU memory utilization and compute utilization
  (e.g., via `nvidia-smi` or cloud-native GPU metrics) across a real
  training run. If memory headroom is large and compute utilization
  is consistently low, you're very likely paying for more GPU, or more
  GPUs, than the job needs.
- For inference: load-test the actual serving endpoint against
  realistic traffic patterns, and measure whether a smaller GPU tier —
  or CPU, for small enough models — still meets your latency and
  throughput targets. Only move up a tier once you have evidence the
  smaller option falls short, not before.

Defaulting to "the biggest GPU instance available" because it's
simplest to provision is exactly the instinct that drives the runaway
spend described in Lesson 21 — it trades a small amount of sizing
effort for a cost multiplier that compounds every hour the job runs.

## Key terms

| Term | Meaning |
|---|---|
| Optimizer state | Per-parameter tracking data (e.g., Adam's moment estimates) that training must keep in GPU memory; inference never needs it |
| Retained activations | Intermediate forward-pass outputs kept in memory during training for backpropagation; discarded immediately during inference |
| Right-sizing (training) | Choosing GPU memory/compute (and GPU count) based on parameters + optimizer state + activations + gradients, not just model size |
| Right-sizing (inference) | Choosing the smallest GPU or CPU tier that meets real latency/throughput requirements under load, measured separately from training |

## Check yourself

You're ready for Lesson 24 when you can explain, without looking: why
does training a given model typically require more GPU memory (and
sometimes more GPUs) than serving the same model for inference, and
why should the inference sizing decision be based on its own load
testing rather than inherited from the training job's hardware?
