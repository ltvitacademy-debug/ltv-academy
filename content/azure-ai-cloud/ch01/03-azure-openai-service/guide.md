# Lesson 3 — Azure OpenAI Service

**Chapter 1 · Azure AI Foundry & Cloud AI Concepts · Lesson 3 of 24**

## What you'll learn

- What model families Azure OpenAI Service actually includes
- How to create an Azure OpenAI resource in the Azure portal
- The pricing tier situation (there's only one, for now)
- The deployment-name-versus-model-name gotcha that trips up almost everyone once

## One resource, many model families

Azure OpenAI Service gives you the same models OpenAI ships directly, wrapped in Azure's enterprise security, networking, and SLAs:

- **Chat models** — GPT-4o, GPT-4.1, and the o-series reasoning models.
- **Embeddings** — the text-embedding-3 family, used for search and retrieval-augmented generation (RAG).
- **Images & audio** — DALL-E, gpt-image-1, Whisper for speech-to-text, and text-to-speech models.
- **Enterprise wrapper** — private networking, content filtering, role-based access, and the compliance guarantees that come with any Azure resource.

It's worth knowing that this service is formally part of the Foundry Models catalog now — in current Microsoft docs you'll sometimes see it called "Azure OpenAI in Foundry Models." Day to day, people still just say "Azure OpenAI."

## Creating the resource

Azure OpenAI is a normal Azure resource — it's created the same way you'd create a storage account or a VM.

![The Create a resource search box in the Azure portal, with Azure OpenAI as a search result.](/courses/azure-ai-cloud/ch01/03-azure-openai-service/create-azure-openai-resource-portal.png)
*Create a resource, search for Azure OpenAI, and select it — this is a standard Azure resource like any other.*

On the **Basics** tab, you fill in the usual fields:

![The Basics tab of the Create Azure OpenAI wizard, showing subscription, resource group, region, name, and pricing tier fields.](/courses/azure-ai-cloud/ch01/03-azure-openai-service/create-resource-basic-settings.png)
*Subscription, resource group, region, a resource name, and a pricing tier — Standard S0 is the only tier available today.*

| Field | What it means |
|---|---|
| Subscription | Which Azure subscription owns (and bills) the resource |
| Resource group | The folder-like container the resource lives in |
| Region | Where the resource is hosted — affects latency and model availability |
| Name | A resource name used in its endpoint URL |
| Pricing tier | Currently just Standard S0 — Azure OpenAI doesn't offer tiered pricing the way some services do |

A few minutes after you select **Create**, Azure finishes provisioning:

![The deployment confirmation screen in the Azure portal, with a Go to resource button.](/courses/azure-ai-cloud/ch01/03-azure-openai-service/create-resource-go-to-resource.png)
*Once the deployment finishes, "Go to resource" takes you to the new Azure OpenAI resource — ready to deploy a model into.*

Select **Go to resource**, and you land on the new resource — but no model is deployed yet. Creating the resource and deploying a model are two separate steps, which we cover in the next two lessons.

## The gotcha: deployment name, not model name

This is the single most common mistake engineers make moving from OpenAI's API to Azure OpenAI. OpenAI's own API takes the model name directly in each request:

```python
client.chat.completions.create(model="gpt-4o", ...)
```

Azure OpenAI instead routes requests by **deployment name** — a name you chose yourself when you deployed the model, which can be anything, including something unrelated to the underlying model:

```python
client.chat.completions.create(model="my-support-bot-prod", ...)
```

The practical effect: you can swap which underlying model powers `my-support-bot-prod` (say, upgrading from GPT-4o to GPT-4.1) without changing a single line of application code, as long as the deployment name stays the same.

## Key terms

| Term | Meaning |
|---|---|
| Azure OpenAI resource | The Azure container that hosts your model deployments, keys, and endpoint |
| Deployment name | The name your code calls at request time — chosen by you, not the model vendor |
| Standard S0 | The one pricing tier currently offered for Azure OpenAI resources |
| Foundry Models | The umbrella catalog Azure OpenAI's models are now organized under |

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: why does Azure OpenAI use a "deployment name" instead of just letting you pass the model name directly, the way OpenAI's own API does?
