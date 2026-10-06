# Lesson 4 — Model Deployment Options

**Chapter 1 · Azure AI Foundry & Cloud AI Concepts · Lesson 4 of 24**

## What you'll learn

- The three ways to deploy a model from the Foundry catalog
- Why partner models need an Azure Marketplace subscription step
- What content filtering looks like by default
- Which capabilities actually differ between the three options

## Three deployment options

Picking a model in the catalog is only step one. You also choose *how* it gets deployed:

- **Standard deployment in a Foundry resource** — the recommended default. Widest range of capabilities: regional, data-zone, or global processing, standard and provisioned-throughput billing, content filtering, and keyless authentication.
- **Serverless API endpoint** — pay-as-you-go, with no compute quota required from your subscription. Regional only, and only available from AI hub-based projects.
- **Managed compute** — a dedicated virtual machine you select and pay for by the hour. Required for model families that don't support the other two options: Hugging Face models, NVIDIA NIMs, and custom models.

![The model catalog with the Deployment options filter open, Managed compute selected, and a grid of matching model cards.](/courses/azure-ai-cloud/ch01/04-model-deployment-options/catalog-filter-managed-compute.png)
*The model catalog's Deployment options filter — narrow the 10,000+ models down to the ones that support the option you need.*

Not every model supports every option. The catalog's **Deployment options** filter narrows 10,000+ models down to the ones that actually support what you're looking for, which saves you from picking a model and then discovering it can't be deployed the way you planned.

## Partner models and Azure Marketplace

Models sold directly by Microsoft (most Azure OpenAI and first-party Foundry models) deploy immediately. Models from **partners and community** — Cohere, Mistral, and others — route through Azure Marketplace instead:

![The Azure Marketplace subscription step shown before deploying a partner model for the first time in a project.](/courses/azure-ai-cloud/ch01/04-model-deployment-options/model-marketplace-subscription.png)
*Models from partners and community (Cohere, Mistral, and others) route through Azure Marketplace — you subscribe once per project, then deploy.*

The first time you deploy a given partner model in a project, you subscribe to its Marketplace offering — this is what lets Microsoft track and bill usage separately per publisher. After that first subscription, deploying more of that same model in the same project is instant.

## Content filtering is on by default

Every deployment wizard — serverless or standard — enables a content filter automatically:

![The deployment wizard showing the Content filter option enabled by default, screening for harmful content categories.](/courses/azure-ai-cloud/ch01/04-model-deployment-options/deploy-with-content-filter.png)
*Every deployment wizard enables a content filter by default, screening for hate, self-harm, sexual, and violent content before you even click Deploy.*

You can customize or disable it later, but you don't have to remember to turn safety on — it's part of the default path. We'll dig deeper into content safety specifically in Lesson 9.

## What actually differs between the three options

| Capability | Foundry resource | Serverless API | Managed compute |
|---|---|---|---|
| Content filtering | Yes | Yes | No |
| Custom content filtering | Yes | No | No |
| Keyless auth (Microsoft Entra ID) | Yes | No | No |
| Data processing region options | Regional, data-zone, global | Regional only | Regional only |
| Billing basis | Tokens + provisioned throughput | Tokens | Compute core-hours |

Microsoft's own recommendation is simple: default to a Foundry resource. Reach for serverless or managed compute only when the model you need doesn't support a Foundry resource deployment.

## Key terms

| Term | Meaning |
|---|---|
| Foundry resource deployment | The default, widest-capability deployment option |
| Serverless API endpoint | A pay-as-you-go deployment with no owned compute |
| Managed compute | A dedicated VM-backed deployment, billed per core-hour |
| Azure Marketplace subscription | A one-time, per-project step required before deploying most partner models |

## Check yourself

You're ready for Lesson 5 when you can explain, without looking: which deployment option does Microsoft recommend by default, and which two capabilities does it offer that serverless and managed compute don't?
