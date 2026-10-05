# Lesson 4 — Landing Zones and Data Governance

**Chapter 1 · Cloud Governance Architecture · Lesson 4 of 25**

## What you'll learn

- What a "landing zone" is, and why it's more than just an empty subscription or account
- Azure Landing Zones (part of the Cloud Adoption Framework) and AWS Control Tower, side by side
- The specific guardrails a landing zone bakes in before any workload arrives
- Why a dedicated data/analytics landing zone pattern matters for governance specifically

## A landing zone is a pre-governed environment, not an empty one

A **landing zone** is a pre-configured, pre-governed subscription or account that a new workload "lands" into — already wired up with identity, networking, logging, and policy guardrails before a single resource is deployed. The alternative — handing a team a blank subscription or AWS account and trusting them to configure governance correctly themselves — is how most of the sprawl and drift described in Lesson 1 actually happens. A landing zone exists so that governance is the *starting* state, not something bolted on after the fact.

## Azure Landing Zones

Azure Landing Zones is the reference architecture published as part of Microsoft's **Cloud Adoption Framework (CAF)**. It defines a standard management group structure (typically something close to Platform / Landing Zones / Sandbox / Decommissioned), with the Platform management group holding shared services every workload subscription depends on:

- A **Management** subscription for centralized logging and monitoring
- A **Connectivity** subscription for shared networking (hub-and-spoke topology)
- An **Identity** subscription if domain controllers or identity infrastructure need to run in Azure itself

New workload subscriptions land under the "Landing Zones" management group, inheriting Azure Policy assignments, RBAC role assignments, and network connectivity automatically — without a human having to configure any of it per subscription.

## AWS Control Tower

AWS's equivalent is **AWS Control Tower**, built on top of AWS Organizations. Control Tower sets up a **landing zone** (the term is used almost identically in both clouds) with:

- A dedicated **Audit account** for centralized, tamper-resistant logging across every account in the organization
- A dedicated **Log Archive account** separate from the accounts doing actual work
- **Guardrails** — preventive controls (implemented as service control policies) and detective controls (implemented as AWS Config rules) that apply automatically to every account vended through Control Tower

When a new AWS account is needed, Control Tower's **account factory** provisions it pre-wired with these guardrails already active — the AWS parallel to a workload subscription landing under Azure's "Landing Zones" management group.

## Why this matters specifically for data governance

The general landing-zone pattern — centralized logging, baked-in policy, network guardrails — is valuable for governance in general. But it matters even more specifically for *data* governance because of one recurring pattern: organizations that build a **dedicated data/analytics landing zone** (a separate management group branch or OU specifically for data platform workloads) get a governance advantage that ad hoc placement never does. A data landing zone can pre-apply data-specific policy — mandatory encryption, mandatory private networking for storage accounts, mandatory tagging for data classification — to every data workload that lands in it, automatically, the same way a general landing zone pre-applies baseline security policy to every workload.

## Key terms

| Term | Meaning |
|---|---|
| Landing zone | A pre-configured, pre-governed subscription/account a new workload deploys into, with guardrails already active |
| Azure Landing Zones | The reference architecture under Microsoft's Cloud Adoption Framework for structuring management groups and subscriptions |
| AWS Control Tower | AWS's managed landing zone service, built on AWS Organizations, with an Account Factory for provisioning pre-governed accounts |
| Guardrail | A preventive or detective control applied automatically to every account/subscription in a landing zone |

## Lab

Sketch what a dedicated "data platform" landing zone would need, specifically: name three policy guardrails you'd want pre-applied to every subscription/account that lands in it (for example: mandatory encryption at rest, no public network access on storage, mandatory data-classification tags). You don't need to implement them — just name what you'd enforce automatically rather than hope for.

## Check yourself

Can you explain, in your own words, the difference between handing a team a blank subscription and landing them in a governed landing zone — and name one guardrail each from Azure Landing Zones and AWS Control Tower specifically?
