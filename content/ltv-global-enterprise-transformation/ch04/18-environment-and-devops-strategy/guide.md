# Lesson 18 — Environment and DevOps Strategy

**Chapter 4 · Delivery Strategy · Lesson 18 of 33**

## What you'll learn

- LTV Global's sandbox strategy across four business-unit dev teams and a shared integration layer
- Why a dedicated integration sandbox exists separately from the BU sandboxes
- How Salesforce DX and source-driven development fit a four-BU, single-org team structure
- Why environment strategy has to be decided before any CI/CD pipeline (Lesson 19) can be designed

## Why environment strategy comes before CI/CD

It's tempting to treat "which environments do we need" as a minor detail to settle once the pipeline is being built. It's actually the opposite order: a CI/CD pipeline (Lesson 19) is built to move changes *between* environments, so the environments themselves — what they're for, who owns them, how they relate to the single-org decision from Lesson 7 — have to exist as a deliberate design first.

## LTV Global's sandbox structure

Because LTV Global runs a single global org (Lesson 7) with four business units developing somewhat independently, the sandbox strategy has to give each BU room to work without stepping on the others, while still testing everything against the shared, single-org reality it will eventually deploy into:

- **Developer/partial sandboxes per BU team** — Equipment Manufacturing & Sales, Parts & Aftermarket, Field Service, and Equipment Financing each get their own sandbox(es) for day-to-day feature development, isolated from the other BUs' in-progress work.
- **One shared integration sandbox** — a dedicated environment where the Lesson 13 integration hub's connections to Meridian, LedgerPoint, Snowflake, and the external APIs are tested against realistic (not production) endpoints, specifically because integration bugs between systems are exactly the kind of problem that doesn't show up in an isolated BU sandbox that has no real connections configured at all.
- **A full sandbox for staging** — a production-like environment, including a representative data volume (connecting back to Lesson 17's point about testing at realistic scale, not sandbox-sized data), used for final validation before release.
- **Production** — the single global org every business unit and region actually uses.

## Why the integration sandbox is separate, not shared with any one BU

A natural question: why not just let each BU test its own integrations in its own sandbox? Because LTV Global's integrations run through one shared hub (Lesson 13), not through BU-specific connections — a change to the Meridian order-sync logic made by one BU's developer could affect every other BU depending on that same hub connection. A dedicated integration sandbox, owned by the integration team rather than any single BU, is where cross-BU integration changes get tested against each other before they reach staging, catching exactly the kind of conflict that four BUs working in isolated sandboxes would never surface until production.

## Salesforce DX and source-driven development

LTV Global adopts **Salesforce DX** and source-driven development: metadata lives in version control as the source of truth, not inside any one sandbox, and **scratch orgs** — temporary, disposable, source-driven environments — are used for individual feature development rather than long-lived sandboxes for every small change. This fits the four-BU structure well: a developer on the Equipment Financing team can spin up a scratch org scoped to exactly the metadata their feature touches, work in isolation, and tear it down when done, without needing a shared, limited-supply sandbox slot for every small change.

## Setting up Lesson 19

This lesson has established what environments exist and what each is for; it hasn't yet said how code and metadata actually move between them, how long-lived sandboxes get refreshed, or how a release gets promoted from the integration sandbox through staging to production. That's Lesson 19's job, built directly on top of this lesson's environment map.

## Key terms

| Term | Meaning |
|---|---|
| Sandbox | A separate, non-production Salesforce environment for development or testing |
| Integration sandbox | A dedicated, shared sandbox for testing the integration hub's external-system connections |
| Salesforce DX | Salesforce's source-driven development toolset, treating metadata in version control as the source of truth |
| Scratch org | A temporary, disposable, source-driven development environment |

## Lab

A Parts & Aftermarket developer argues their BU should get its own dedicated integration sandbox, separate from the other three BUs, "so we're not blocked waiting on anyone else." Using this lesson's reasoning about the shared integration hub (Lesson 13), write three or four sentences explaining what risk that split would reintroduce, and what you'd propose instead to address the developer's legitimate concern about being blocked.

## Check yourself

Can you list LTV Global's four environment tiers (BU sandboxes, integration sandbox, staging, production) and state what each one is specifically for? Can you explain why the integration sandbox is owned separately from any single business unit, rather than being folded into one BU's existing sandbox?
