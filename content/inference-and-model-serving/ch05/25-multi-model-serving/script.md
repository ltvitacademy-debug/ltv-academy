# Script — Multi-Model Serving

## Segment 1 (title)

So far this course has mostly talked about scaling one model. In practice, most serving platforms run many models behind the same infrastructure. Multi-model serving is about sharing GPU capacity across all of them instead of buying a dedicated fleet for each.

## Segment 2 (steps)

Full model multiplexing keeps a repository of genuinely different models a server can load and serve side by side, each occupying its own weights in memory. LoRA adapter multiplexing fits a different case: when the variants are fine-tuned versions of the same base model, you can serve many of them from one shared base — which is exactly what per-tenant SaaS fine-tuning needs.

## Segment 3 (steps)

The base model's weights load once; each fine-tuned variant is a small LoRA adapter, often tens to a few hundred megabytes instead of the gigabytes a full model needs. A request simply names which adapter it wants, and the server applies it on top of the shared base.

## Segment 4 (code)

Here's a real vLLM command serving one Llama 3.1 8B base model with two named customer adapters loaded alongside it — swapping a few megabytes per customer instead of loading a whole separate model.

## Segment 5 (steps)

Sharing a GPU raises utilization, but without limits, one model's traffic spike can starve another's. That's why multi-model platforms need resource quotas capping how much memory or compute any one model can claim, priority tiers, and isolation so one model's bug can't take down everything sharing that GPU.

## Segment 6 (outro)

Full model multiplexing fits genuinely different models; LoRA adapters fit many fine-tuned variants of one base at a fraction of the cost — either way, quotas keep one model from starving another. Up next, lesson twenty-six: how does a request actually get routed to the right model, and what happens when that one fails?
