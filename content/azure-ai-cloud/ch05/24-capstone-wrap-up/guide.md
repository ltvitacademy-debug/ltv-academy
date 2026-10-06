# Lesson 24 — Capstone: Wrap-Up & Portfolio Presentation

**Chapter 5 · Capstone · Lesson 24 of 24**

## What you'll learn

- What to actually walk through in a five-minute capstone presentation
- Why naming a real limitation is stronger than claiming none exist
- What this course closes, chapter by chapter
- The one cleanup step that keeps your Azure bill from surprising you

## What to actually present

You don't need a polished deck. A five-minute walkthrough of the real thing you built, in this order, covers everything that matters:

```text
1. The model      -- what you deployed, and why that one
2. The deployment  -- Target URI live, Succeeded + Healthy
3. The security    -- one control, shown working (e.g. DefaultAzureCredential)
4. The monitoring  -- the diagnostic setting, and what it would catch
```

Walking through your own screen — the deployment's details page, the Key Vault secret, the diagnostic setting — is more convincing than any slide describing the same thing.

## Naming a real limitation beats claiming none

A capstone that claims to be flawless invites exactly one follow-up question it can't survive. A capstone that names a specific, real limitation shows you understand the system you built:

```text
NOT: "this endpoint is fully production-ready"

INSTEAD: "this deployment uses a single instance, so
a real production version would need autoscaling
(Lesson 15) before it could handle concurrent load."
```

That second framing does more work in an interview than the first ever could — it shows you know what you'd still need to build, not just what you already did.

## What this course closes

| Chapter | What it built |
|---|---|
| 1. Foundry & Cloud AI Concepts | Why cloud AI platforms exist, and what Foundry actually is |
| 2. Working With Azure AI Services | Deploying, searching, moderating, costing, and monitoring |
| 3. Cloud Infrastructure Basics | Compute, storage, networking, scaling, identity |
| 4. Multi-Cloud AI Awareness | The same jobs, on AWS Bedrock and Google Vertex AI |
| 5. Capstone | All of it, applied once, to one endpoint, by you |

Twenty-four lessons in, you've gone from "why does a cloud AI platform exist" to a deployed, secured, monitored endpoint you stood up yourself.

## Before you move on: clean up

Lesson 10 covered why token-billed and compute-billed AI resources need active cost management. The same logic applies to your capstone endpoint once you've presented it: a managed-compute deployment bills by the hour whether or not anyone's calling it. Delete the deployment (or let a shared-quota endpoint's 168-hour timer do it for you) once you've captured what you need — a screenshot of Succeeded and Healthy, and your diagnostic setting, are enough proof after the fact.

## Key terms

| Term | Meaning |
|---|---|
| Capstone | The applied, end-to-end project closing this course |
| Named limitation | A specific, honest gap in scope — stronger in an interview than a claim of completeness |

## What's next

This course is done, but the AI Engineer path isn't. The next course, **Docker & Deployment for AI Applications**, picks up exactly where this leaves off: packaging an AI application into a container so it runs the same way on your machine, in CI, and in production — the deployment problem from the other direction.

## Check yourself

Can you describe, in under five minutes and without notes, the model you deployed, one real security control you applied, and one honest limitation of what you built?
