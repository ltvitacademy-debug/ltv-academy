# Lesson 9 — Open-Source vs. Closed Models

**Chapter 2 · The LLM Landscape · Lesson 9 of 31**

## What you'll learn

- The real distinction: open-weight vs. closed, not "open-source" in the traditional software sense
- Real, currently-available open-weight model families and their actual license terms
- The genuine trade-offs on each side — not a simple "open is always better" story
- Why most teams end up using both, for different jobs

## "Open-weight" is the more accurate term

Lesson 8 introduced Llama as different from Claude, GPT, Gemini, and Grok: Meta publishes Llama's
trained weights for download instead of operating a hosted API as the primary way to use it. The
industry calls this "open-source," but that's slightly loose — you typically get the trained
weights and permission to use them under a license, not the original training data or the full
training code, which is what "open-source" means in traditional software. **Open-weight** is the
more precise term, and it's worth using.

## The real current field

As of this course's research, several genuinely open-weight families are actively maintained and
competitive:

- **Llama 4** (Meta) — a Scout variant (109B total / 17B active parameters, 10M-token context)
  and a larger Maverick variant (400B total / 17B active, 1M-token context), under the Llama 4
  Community license (with a multimodal-use carve-out that excludes EU-domiciled users/companies).
- **DeepSeek V4** (DeepSeek) — Flash and Pro checkpoints, MIT-licensed — one of the more
  permissive licenses available, close to no-strings-attached.
- **Qwen** (Alibaba) — the Qwen 3 family, spanning multiple open releases under varying licenses
  including Apache 2.0.
- **Mistral** — Mistral Small 4 (Apache 2.0) consolidates reasoning, multimodal understanding, and
  agentic coding into one open-weight model; Mistral also ships Large and Medium tiers.

Licenses genuinely differ — MIT and Apache 2.0 are close to unrestricted, while some
community-style licenses (like Llama's) carry specific usage or geographic restrictions. Reading
the actual license, not assuming "open" means "no restrictions," is part of evaluating any
open-weight model for real use.

## The real trade-offs

Neither side is simply "better." Closed, hosted-API models (Lesson 8's providers) give you a
managed, scaling, continuously-updated service with no infrastructure to run — but you're bound by
that provider's usage policies, pricing, and uptime, and you never get the weights themselves.
Open-weight models give you the opposite: you can self-host, fine-tune without external approval,
inspect and audit what you're running, and avoid being dependent on one company's roadmap — but
you own the operational burden of running GPUs, scaling inference, and keeping the deployment
secure and current yourself.

## Why most real teams use both

In practice, this isn't an either/or decision for most organizations. A team might use a closed
flagship model for the hardest, highest-stakes reasoning tasks, and a self-hosted open-weight
model for high-volume, cost-sensitive, or data-sensitive workloads where sending data to a
third-party API isn't acceptable. The right call depends on the task (Lesson 10), not a permanent
allegiance to one side.

## Key terms

| Term | Meaning |
|---|---|
| Open-weight | Downloadable trained model weights, usable under a specific license |
| Closed model | API-only access; weights are never distributed to users |
| MIT / Apache 2.0 | Permissive open-source-style licenses with few usage restrictions |
| Self-hosting | Running a model's inference on your own infrastructure instead of a vendor's API |

## Check yourself

Before Lesson 10, you're ready to move on when you can explain, without looking: why is
"open-weight" a more accurate term than "open-source" for a model like Llama 4?
