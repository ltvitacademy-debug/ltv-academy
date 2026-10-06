# Lesson 1 — Why Cloud AI Platforms?

**Chapter 1 · Azure AI Foundry & Cloud AI Concepts · Lesson 1 of 24**

## What you'll learn

- The three ways a model actually gets into production
- What a cloud AI platform gives you that self-hosting doesn't
- How the code you write changes depending on which path you pick
- Why this course centers on Azure AI Foundry specifically

## Three paths to production

Every AI engineer eventually faces the same decision: where does the model actually run? There are three real options.

- **Self-hosted** — you buy or rent GPUs, install a serving stack (vLLM, Triton, TensorRT-LLM, or similar), and own every patch, driver update, and scaling decision forever.
- **Cloud AI platform** — a provider like Microsoft, AWS, or Google runs the model (or hosts it for you), and you call an API. This is the focus of this course.
- **Fully managed SaaS** — a finished product built on top of a model, where you don't make infrastructure decisions at all; you just use the product.

This course lives in the middle option, because it's where most AI engineering jobs actually sit: not deep infrastructure work, not just prompting a consumer app, but building real applications against a managed model layer.

## What you're actually buying

A cloud AI platform bundles four things that are each expensive to build yourself:

- **Elastic compute** — GPU capacity you don't procure, rack, cool, or depreciate. It scales up when traffic spikes and scales down when it doesn't.
- **A model catalog** — one contract gives you access to models from OpenAI, Meta, Mistral, DeepSeek, and others, instead of negotiating with each vendor separately.
- **Governance** — content filters, role-based access control, and audit logging come built in, instead of being a project you have to build and maintain yourself.
- **One bill** — you pay per token or per deployment-hour, instead of owning a GPU cluster that depreciates whether you use it or not.

## What changes in your code

The difference shows up directly in how you call the model. Self-hosted, you load a model file locally and manage the serving process yourself:

```python
model = load_model("./llama-3-70b")
reply = model.generate(prompt)
```

On a cloud AI platform, you create a client pointed at a managed endpoint and call it over the network:

```python
client = ChatCompletionsClient(
    endpoint="https://my-resource.services.ai.azure.com",
    credential=AzureKeyCredential(key),
)
reply = client.complete(messages=[...])
```

The prompt and the reply shape look nearly identical either way. What's different is everything underneath that line of code — and that's exactly the layer a cloud AI platform takes off your plate.

## Key terms

| Term | Meaning |
|---|---|
| Self-hosted | You own and operate the GPU infrastructure and serving stack |
| Cloud AI platform | A managed service (Azure AI Foundry, AWS Bedrock, Vertex AI) that runs models behind an API |
| Model catalog | A single platform's curated list of available models from multiple providers |
| Pay-per-token | A billing model based on usage rather than owned hardware |

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: what four things does a cloud AI platform give you that you'd otherwise have to build and maintain yourself?
