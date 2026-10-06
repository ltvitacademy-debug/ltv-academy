# Lesson 18 — Google Vertex AI, Overview

**Chapter 4 · Multi-Cloud AI Awareness · Lesson 18 of 24**

## What you'll learn

- What Model Garden is, and how it organizes Google's AI model catalog
- How one-click deployment from Model Garden actually works
- What a Vertex AI deployment configuration pane asks you to decide
- A current naming detail worth knowing: Vertex AI vs. "Gemini Enterprise Agent Platform"

## A third cloud, the same underlying problem

Two clouds down, one more to go. Google's answer to the problem Azure AI
Foundry and AWS Bedrock both solve — giving a developer one place to
find, deploy, and call a foundation model — is built around a catalog
called Model Garden and a managed serving layer called Vertex AI.

## Model Garden: one catalog, many families

![Searching Model Garden for Gemma 3 — Google's own models alongside partner and open-weight models, in one browsable catalog.](/courses/azure-ai-cloud/ch04/18-google-vertex-ai-overview/model-garden-search.png)

Google's own Gemini and Gemma models sit alongside partner models and
open-weight models like Llama and Mistral, all searchable from one
catalog instead of a vendor-by-vendor hunt across separate documentation
sites — the same role Azure AI Foundry's model catalog and Bedrock's
model picker play on their own clouds.

## One click, one target

![A model's own page in Model Garden — Deploy options lists Vertex AI as the one-click deployment target, right alongside Fine tune and Open notebook.](/courses/azure-ai-cloud/ch04/18-google-vertex-ai-overview/deploy-options-dropdown.png)

Pick a model and its own page offers Deploy options — fine-tune it, open
it in a notebook, view its code, or deploy it with one click. That
one-click path specifically targets Vertex AI, the managed endpoint
service underneath Model Garden that actually serves the model once
deployed.

## Configuring the actual endpoint

One click still opens a real configuration pane:

![The Deploy on Vertex AI pane — region, machine spec, and GPU type, the same decisions Lesson 12 walked through for Azure.](/courses/azure-ai-cloud/ch04/18-google-vertex-ai-overview/deploy-on-vertex-ai-pane.png)

Region, machine spec, GPU type — the same category of decision Lesson 12
walked through for Azure's own GPU VM families, just under Google's
naming for the equivalent choices.

## A name worth knowing both ways

```
Console & SDK:        "Vertex AI" — the name this lesson uses
Google's own docs now: "Gemini Enterprise Agent Platform"
```

Google's own documentation rebranded this whole product area to Gemini
Enterprise Agent Platform in 2026. The console, the SDK, and the
deployment pane you actually click through still say Vertex AI — which
is also the name this lesson, and most working engineers, still use day
to day. Worth recognizing both, since a job posting or a doc search might
use either.

## Key terms

| Term | Meaning |
|---|---|
| Model Garden | Google Cloud's browsable catalog of first-party, partner, and open-weight AI models |
| Vertex AI | The managed service that actually deploys and serves a model chosen from Model Garden |
| Gemini Enterprise Agent Platform | Google's current documentation-level rebrand of this product area (2026) |
| Machine spec | The GPU/accelerator and instance type a deployed model endpoint runs on |

## Check yourself

You're ready for Lesson 19 when you can explain, without looking: what's
the relationship between Model Garden and Vertex AI — which one is the
catalog, and which one actually runs the model?
