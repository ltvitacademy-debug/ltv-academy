# Script — Compute Options for AI Workloads: CPU vs. GPU

## Segment 1 (title)

Every AI workload on Azure eventually asks the same question: what hardware actually runs this model? CPU, GPU, or a managed service that picks for you.

## Segment 2 (steps: three paths)

CPU handles lightweight inference fine — small embedding models, low-throughput APIs, classical ML scoring that never needed a GPU in the first place. GPU earns its cost for training and heavy inference — fine-tuning an LLM, generating embeddings at high throughput, running image or video models where a CPU would simply be too slow to be useful. And managed services like Azure OpenAI's pay-as-you-go tier and provisioned throughput units abstract the hardware away entirely — you never pick a VM size at all, you just pay for tokens or for a reserved slice of capacity.

## Segment 3 (code: GPU VM families)

When you do need to pick compute yourself — for a self-hosted model on Azure Machine Learning or AKS — Azure's GPU VMs are named by workload, not just GPU count. NC-series covers general AI and ML training and inference, the default starting point for most workloads. ND-series is built for large-scale deep learning with multiple GPUs per VM, for models too big for one card. NV-series is tuned for visualization and virtual desktops, not training — an easy mistake to make by VM name alone if you're only skimming the letters.

## Segment 4 (code: checking availability)

Before committing a compute budget to a specific size, check what a region actually has available — GPU capacity is scarcer than regular compute and varies region by region. The Azure CLI's az vm list-skus command, given a location and a size prefix like Standard_NC, lists every matching GPU size actually sellable in that region right now, before you design around a SKU that turns out to be unavailable.

## Segment 5 (outro)

CPU for light work, GPU for heavy work, managed when you'd rather not choose at all. Next up: where the data behind these models — and the embeddings they produce — actually live.
