# Lesson 12 — Compute Options for AI Workloads: CPU vs. GPU

**Chapter 3 · Cloud Infrastructure Basics for AI · Lesson 12 of 24**

## What you'll learn

- When CPU is actually enough for an AI workload, and when it isn't
- What GPU compute buys you, and where that cost is worth paying
- Azure's GPU VM families — NC, ND, and NV — and what each is actually for
- How managed services like Azure OpenAI sidestep the choice entirely
- How to check what GPU capacity a region actually has before designing around it

## Three ways to answer "what runs this?"

Every AI workload on Azure eventually needs hardware, and there are really
three answers:

**CPU** — fine for lightweight inference: small embedding models,
low-throughput APIs, classical ML scoring. No GPU required, no GPU cost.

**GPU** — earns its cost for training and heavy inference: fine-tuning an
LLM, generating embeddings at high throughput, running image or video
models. A CPU would simply be too slow to be useful here.

**Managed** — Azure OpenAI's pay-as-you-go tier and provisioned throughput
units (PTUs) abstract the hardware away entirely. You never pick a VM
size; you pay for tokens, or for a reserved slice of capacity.

Most of this course's Chapter 1-2 work (Azure OpenAI, Azure AI Foundry)
lives in that third category. This lesson is about the other two — what
happens when you self-host a model on Azure Machine Learning or AKS and
the VM size becomes your decision.

## Azure's GPU VM families

GPU VM names in Azure aren't just a GPU count — they signal the workload
they're built for:

```
NC-series   # NVIDIA GPUs — general AI/ML training & inference
ND-series   # NVIDIA GPUs — large-scale deep learning, multi-GPU
NV-series   # GPUs tuned for visualization, not training
```

NC-series is the default starting point for most training and inference
work. ND-series exists for models too large for a single GPU, spreading
across multiple GPUs per VM. NV-series is easy to pick by mistake — it's
built for visualization and virtual desktops, not for training a model.

## Checking what's actually available

GPU capacity is scarcer than regular compute, and availability varies by
region. Before committing a compute budget to a specific size, check what
a region actually has:

```
az vm list-skus \
  --location eastus \
  --size Standard_NC \
  --output table
```

This lists every NC-series size actually sellable in `eastus` right now —
a cheap sanity check before designing an architecture around a SKU that
turns out to be unavailable or on backorder in that region.

## Key terms

| Term | Meaning |
|---|---|
| NC-series | Azure's general-purpose GPU VM family for AI/ML training and inference |
| ND-series | GPU VM family for large-scale deep learning across multiple GPUs |
| NV-series | GPU VM family for visualization/virtual desktops — not for training |
| PTU | Provisioned Throughput Unit — reserved, predictable Azure OpenAI capacity, billed independent of VM size |
| `az vm list-skus` | CLI command that lists actual available VM sizes in a given region |

## Check yourself

You're ready for Lesson 13 when you can explain, without looking: why
would an NV-series VM be the wrong choice for fine-tuning a model, even
though its name suggests it has a GPU too?
