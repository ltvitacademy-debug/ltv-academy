# Multi-Model Serving

So far this course has mostly talked about scaling *one* model. In practice, most serving platforms run many models behind the same infrastructure — a base chat model, a classifier, a summarizer, maybe dozens of fine-tuned variants for different customers. Multi-model serving is about sharing GPU capacity across all of them instead of buying a dedicated fleet for each.

## What you'll learn

- Why teams multiplex many models onto shared GPU infrastructure instead of isolating each one
- The two main multiplexing techniques: multiple base models, and multiple LoRA adapters on one base
- Why adapter multiplexing is dramatically cheaper per additional model
- Why isolation still matters even when utilization goes up

## Why multiplex at all

Buying a dedicated GPU (or GPU pool) for every model a company runs is simple, but wasteful — most models, most of the time, aren't fully using the GPU they're pinned to. Multi-model serving shares that capacity:

- **Cost efficiency** — one shared pool of GPUs serves many models instead of many underused, dedicated pools
- **Many small specialists beat one giant generalist** — some workloads are better served by several task-specific smaller models than one large general-purpose one, and multiplexing makes that affordable
- **Per-tenant variants** — a SaaS product fine-tuning a small model per customer needs a way to serve hundreds of near-identical models without hundreds of GPUs

## Two ways to multiplex a GPU

**Full model multiplexing.** A model server like NVIDIA Triton Inference Server keeps a *model repository* — a directory of distinct models it can load, unload, and serve side by side, within the GPU memory it has available. This works for genuinely different models, but every one of them occupies its own full set of weights in memory, so the number you can pack onto one GPU is limited and has to be budgeted carefully.

**LoRA adapter multiplexing.** When the "different models" are actually fine-tuned variants of the *same* base model, there's a much cheaper option: Low-Rank Adaptation (LoRA) adapters. The base model's weights are loaded once; each fine-tuned variant is represented by a small adapter — often tens to a few hundred megabytes rather than the gigabytes a full model needs. Serving frameworks like vLLM support loading many LoRA adapters alongside one base model and selecting which adapter to apply per request:

```bash
vllm serve meta-llama/Llama-3.1-8B-Instruct \
  --enable-lora \
  --lora-modules customer-a=/adapters/customer-a \
                 customer-b=/adapters/customer-b \
  --max-loras 8
```

A request simply specifies which adapter it wants, and the server applies it on top of the shared base weights — swapping a few megabytes instead of loading a whole separate model.

## Isolation still matters

Sharing a GPU raises utilization, but it also means one model's traffic spike can starve another's if nothing is managing the split. Multi-model platforms generally need:

- **Resource quotas** — a cap on how much GPU memory or compute share any one model can claim
- **Priority tiers** — so a lower-priority model's heavy load doesn't block a higher-priority one's requests
- **Isolation boundaries** — enough separation that one model's bug (a request that blows past its context limit, say) can't take down every other model sharing that GPU

## Key terms

| Term | Meaning |
|---|---|
| Model repository | A multi-model server's catalog of models it can load and serve side by side |
| LoRA adapter | A small set of fine-tuned weights applied on top of a shared base model |
| Adapter multiplexing | Serving many fine-tuned variants from one loaded base model |
| Resource quota | A cap limiting how much GPU memory/compute one model can consume |

## Recap

Multi-model serving shares GPU capacity across many models instead of dedicating a pool to each — full model multiplexing fits genuinely different models, while LoRA adapter multiplexing fits many fine-tuned variants of the same base at a fraction of the memory cost. Either way, quotas and priority tiers keep one model's load from starving another's. Next up, Lesson 26: once several models are available, how does a request get routed to the right one — and what happens when that one fails?
