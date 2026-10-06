# Lesson 17 — AWS Bedrock, Overview

**Chapter 4 · Multi-Cloud AI Awareness · Lesson 17 of 24**

## What you'll learn

- What AWS Bedrock actually is, and how it compares to Azure AI Foundry
- How Bedrock's model picker works across multiple model providers
- What the Test Agent window lets you verify before an agent ships
- Bedrock's unified Converse API, instead of a per-vendor request shape
- The three things that specifically pull teams toward Bedrock

## Azure isn't the only cloud running production AI

Everything in this course up to now has been Azure — Azure OpenAI, Azure
AI Foundry, Azure AI Search. That's the right place to go deep, but a
credible AI engineer also knows the landscape beyond one cloud. AWS
Bedrock is the first stop: AWS's managed service for calling foundation
models without hosting them yourself.

## One console, several model providers

Bedrock's whole pitch is visible in its model picker:

![Bedrock's model picker — Amazon, Anthropic, Cohere, Meta, Mistral AI, and more, all behind one API, grouped by provider in the left column.](/courses/azure-ai-cloud/ch04/17-aws-bedrock-overview/bedrock-select-model.png)

Amazon's own Titan models sit alongside Anthropic's Claude, Meta's Llama,
Mistral AI, Cohere, and others — all grouped by provider in one console,
behind one API, instead of a separate account and SDK per vendor the way
calling each of those providers directly would require.

## Testing before anything ships

Before a Bedrock Agent goes anywhere near production, the Test Agent
window lets you step through a conversation turn by turn:

![Bedrock's Test Agent window — a conversation turn waiting on a tool's output, reviewed and submitted before the agent continues.](/courses/azure-ai-cloud/ch04/17-aws-bedrock-overview/bedrock-test-agent.png)

This example pauses on a tool call — an order-history lookup — showing
exactly what the tool wants to return before a human reviews it and hits
Submit to let the agent continue. It's the same review-before-you-commit
instinct this course has come back to with Azure deployments too.

## The same job, one unified call shape

```
aws bedrock-runtime converse \
  --model-id anthropic.claude-3-5-sonnet-20241022-v2:0 \
  --messages '[{"role":"user","content":[{"text":"Hello"}]}]'
```

The Converse API is one unified command — the same request shape whether
`model-id` points at Anthropic's Claude or Amazon's own Titan, instead of
a different request format per provider.

## Why teams reach for Bedrock specifically

- **Multi-model** — Claude, Titan, Llama, Mistral, and more behind one
  API, with no separate vendor accounts to juggle.
- **IAM-native** — the exact same AWS identity and permission model used
  everywhere else in an AWS account, rather than a separate auth system.
- **Serverless by default** — pay per token out of the box, with no
  endpoint to provision before the first call (provisioned throughput
  exists too, for predictable high-volume workloads).

## Key terms

| Term | Meaning |
|---|---|
| Bedrock | AWS's managed service for calling foundation models from multiple providers |
| Converse API | Bedrock's unified request/response shape, the same across every model provider it hosts |
| Test Agent | Bedrock's built-in panel for stepping through an agent's conversation and tool calls before shipping |
| Model provider | The company whose model is being called through Bedrock — Anthropic, Amazon, Meta, Mistral, Cohere, and others |

## Check yourself

You're ready for Lesson 18 when you can explain, without looking: what
does Bedrock's Converse API actually buy you compared to calling five
different model providers' own native SDKs directly?
