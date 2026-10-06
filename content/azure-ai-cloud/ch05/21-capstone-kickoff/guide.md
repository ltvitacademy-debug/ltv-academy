# Lesson 21 — Capstone Kickoff

**Chapter 5 · Capstone · Lesson 21 of 24**

## What you'll learn

- What the capstone actually asks you to build, end to end
- The three deliverables, and which earlier chapter each one pulls from
- How to pick a model and deployment option you can realistically finish with
- The one checkbox that keeps this capstone from costing you anything

## What you're actually building

Twenty lessons in, this course has covered Foundry concepts, Azure AI services, cloud infrastructure, and a glance at the other major clouds. The capstone asks you to put the middle two chapters together into one real thing: deploy an actual model endpoint on Azure, secure it the way a production endpoint should be secured, and monitor it the way a production endpoint should be watched. Not a diagram of how you'd do it — the real endpoint, really deployed, in your own Azure subscription.

## The three deliverables

```text
1. A live endpoint  -- deployed, Succeeded, Healthy  (Ch.2)
2. A secured endpoint -- no hardcoded secret, access scoped  (Ch.3)
3. A monitored endpoint -- diagnostic logs flowing somewhere  (Ch.2/Ch.3)
```

Lesson 22 covers the first deliverable. Lesson 23 covers the second and third together, since securing and monitoring the same endpoint naturally happen side by side. Lesson 24 is about presenting all three as one piece of work.

## How this maps back to the course

| Deliverable | Pulls from |
|---|---|
| Live endpoint | Lesson 6 (SDK basics), Lesson 7 (deploying a model endpoint) |
| Secured endpoint | Lesson 14 (networking), Lesson 16 (managed identities & Key Vault) |
| Monitored endpoint | Lesson 10 (cost management), Lesson 11 (monitoring AI service usage) |

If any of these feel unfamiliar, that's a sign to glance back at that lesson before Lesson 22 — the capstone doesn't introduce new concepts, it applies the ones you already have to a real endpoint.

## Picking a model you can actually finish with

You don't need a frontier model or a production-scale deployment to complete this capstone — you need *something deployed and running*. A small model from the catalog, deployed through managed compute, is enough. If your subscription doesn't have spare VM quota, the catalog offers a shared-quota option on many models specifically for this situation:

```text
"I want to use shared quota and I acknowledge
 that this endpoint will be deleted in 168 hours."
```

That's a real checkbox in the Foundry deployment dialog — checking it borrows temporary quota instead of your own, with the trade-off that Microsoft deletes the endpoint automatically after a week. For a capstone you're going to screenshot, test, and tear down anyway, that trade-off works in your favor.

## Scoping it so it actually ships

The most common way this capstone stalls isn't technical difficulty — it's picking a model or a deployment configuration big enough that quota, approval, or cost turns into a multi-day delay. Favor the smallest model and the simplest deployment option that still gives you a real Target URI to call. You can always come back and deploy something bigger later; you can't come back and finish a capstone you never submitted.

## Key terms

| Term | Meaning |
|---|---|
| Shared quota | Temporary, Microsoft-provided VM quota for testing a managed-compute deployment, auto-deleted after 168 hours |
| Deliverable | One of the three required pieces of this capstone: live, secured, monitored |
| Target URI | The endpoint URL your deployed model exposes for inference — proof the deliverable is real |

## Lab

Write down, in two or three sentences: which model you're deploying, which deployment option (managed compute or serverless), and whether you're using shared quota or your own. That's the plan Lesson 22 puts into action.

## Check yourself

Can you name, without looking back, which earlier lesson each of the three capstone deliverables pulls its approach from?
