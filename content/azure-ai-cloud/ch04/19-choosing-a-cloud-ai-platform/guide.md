# Lesson 19 — Choosing a Cloud AI Platform

**Chapter 4 · Multi-Cloud AI Awareness · Lesson 19 of 24**

## What you'll learn

- The four questions that actually decide a cloud AI platform choice
- How Azure, AWS, and Google's AI platforms map onto the same underlying job
- Why "which model is best" is rarely the deciding factor in practice
- A default heuristic for choosing, and when it's worth breaking

## The same job, three vendors

Three clouds, three AI platforms, the same underlying job — find a
model, deploy it, call it. Azure AI Foundry and Azure OpenAI Service,
AWS Bedrock, and Google's Vertex AI with Model Garden have all now been
covered on their own terms. This lesson is about actually deciding
between them.

## Four questions that actually matter

1. **Where's the data?** The model should move to the data, not the
   other way around — moving terabytes of documents or embeddings across
   clouds is slow and often expensive.
2. **Who's already there?** An existing AWS or GCP account, with its
   identity, networking, and billing already set up, outweighs a model
   that's marginally better on paper.
3. **Which models does each platform actually offer?** Some models
   launch exclusively, or first, on one specific cloud.
4. **What does the team already know?** Three clouds' worth of IAM
   quirks and CLI tools isn't free to learn on a deadline.

Notice what's *not* on this list as the deciding factor: which platform
has the single best model this month. Model quality converges fast
across providers, and most of these platforms host more than one
provider's models anyway.

## The same job, different names

```
Azure:   Azure AI Foundry  +  Azure OpenAI Service
AWS:     Bedrock           +  model picker by provider
Google:  Vertex AI         +  Model Garden
```

Strip away the branding and all three are solving the same problem —
a model catalog, and a managed service underneath it that actually
deploys and calls whatever you pick from that catalog.

## The honest default

```
if (your org already runs production workloads on cloud X):
    use cloud X's AI platform first
    switch only if it genuinely can't do the job
```

Most of the time, the best AI platform is the one your organization's
identity, networking, and billing already live on. Reach for a different
cloud only when there's a real reason — a model that's genuinely only
available elsewhere, or a data residency requirement the current cloud
can't meet — not because a different logo sounds more exciting.

## Key terms

| Term | Meaning |
|---|---|
| Data gravity | The tendency for compute to move toward where data already lives, since moving data is expensive |
| Vendor lock-in | The cost and difficulty of switching cloud providers once deeply integrated with one |
| Model exclusivity | A model being available on only one cloud platform, at least initially |

## Check yourself

You're ready for Lesson 20 when you can explain, without looking: why
isn't "which cloud has the best model" usually the deciding factor in a
real platform choice, even though it sounds like it should be?
