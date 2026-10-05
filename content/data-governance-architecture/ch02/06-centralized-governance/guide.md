# Lesson 6 — Centralized Governance

**Chapter 2 · Operating Models · Lesson 6 of 30**

## What you'll learn

- What centralized governance looks like as a built system, not just an org chart
- The three architectural components every centralized governance system needs
- The specific throughput and scaling risks a centralized architecture runs into
- The levers that let a centralized architecture scale further before it has to change models

## Beyond the org chart

Data Governance Foundations Lesson 11 covered centralized governance as an organizational question: one central team owns governance decisions, which gives maximum consistency but can become a bottleneck. This course takes that same model and asks a more technical question: what does a centralized governance *architecture* actually consist of, as a system?

## The three components centralized architecture needs

1. **A single enterprise metadata hub.** Every platform's metadata — tables, columns, definitions, classifications — flows into one central catalog. This is the hub-and-spoke pattern from Lesson 3, applied directly: the hub holds the detail, not just an index.
2. **A single policy engine.** One rule set, applied the same way regardless of which platform the data sits on. There's no per-domain variation to reconcile, because there's only one domain architecturally.
3. **A single access-provisioning queue.** Every access request — to any data, on any platform — routes through the same central team and the same approval process.

## Why this architecture gets real consistency

Because there's exactly one copy of the policy, the schema, and the approval process, centralized architecture sidesteps an entire category of problem that federated and decentralized architectures (Lessons 7 and 8) have to solve deliberately: there is no drift to reconcile, because there's nowhere for drift to come from. Auditing is simpler too — one system of record means one place to look, not several catalogs whose data has to be reconciled first.

## Where it breaks down

The architecture's single point of control is also its single point of failure and its single point of congestion. As the number of data sources and access requests grows, every one of them still has to pass through the same hub, the same policy engine, and the same approval queue — there's no way to parallelize across domains, because the model doesn't recognize domains as independent. This is the architectural version of the bottleneck Foundations Lesson 11 described at the org level: it isn't that the central team is slow or badly run, it's that the architecture gives them no mechanism to delegate without becoming a different model.

## Scaling levers that don't require changing the model

A centralized architecture can scale further than its default ceiling through automation, without becoming federated: self-service connectors that register a new data source into the hub without a manual onboarding project, automated classification that tags sensitivity without a person reviewing every field, and a workflow tool that routes routine access requests through pre-approved rules rather than a human reviewer for every request. These levers push the bottleneck further out — they don't remove it, because removing it architecturally is what the federated pattern in Lesson 7 is actually for.

## Key terms

| Term | Meaning |
|---|---|
| Enterprise metadata hub | The single central catalog holding metadata for every platform in a centralized architecture |
| Policy engine | The system component that evaluates and enforces governance rules |
| Access-provisioning queue | The central process that routes and approves data-access requests |

## Lab

For an organization running (or close to running) centralized governance, trace one real access request from submission to approval. Which of the three components — hub, policy engine, provisioning queue — does it actually pass through, and where did it wait the longest?

## Check yourself

Can you name the three architectural components of centralized governance, and explain in one sentence why the model's single point of control is architecturally the same thing as its bottleneck?
