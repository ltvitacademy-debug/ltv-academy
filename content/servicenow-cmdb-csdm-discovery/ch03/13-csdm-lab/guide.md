# Lesson 13 — CSDM Lab

**Chapter 3 · The Common Service Data Model (CSDM) · Lesson 13 of 26**

## What you'll learn

- How to apply the Business Service / Technical Service / CI chain to a real, already-documented system
- How to decide what counts as the Business Service versus the Technical Service for a concrete example
- How to confirm that CI relationships already documented actually connect top to bottom without gaps
- How to answer "what breaks" at three different altitudes for the same underlying scenario

## The scenario

Chapters 1 and 2 built a three-tier web application step by step: a web server CI, an application server CI, and a database server CI, connected by "runs on" and "depends on" relationships, with impact analysis tracing what happens if any one of them fails. That system was never given a name a business stakeholder would recognize — it existed purely as CIs and relationships. This lab fixes that by applying CSDM's layering to it, end to end.

Assume this application is the system a retail company uses to take and process customer orders online.

## Step 1 — Identify the Business Service

Ask the question Lesson 11 trained you to ask: what would a non-technical stakeholder call this, and what business outcome does it provide? For this scenario, the answer is "Customer Order Processing" — a name a VP of Sales or a customer service director would recognize and care about directly, without needing to know anything about servers or databases. "Customer Order Processing" becomes the Business Service record: defined by outcome ("customers can place and complete orders online"), not by technology.

## Step 2 — Identify the Technical Service

Next, work down one level, per Lesson 12's phased order: what's the technical capability that actually delivers Customer Order Processing? That's the three-tier application stack itself — call it the "Order Processing Application" Technical Service. It's built from, and depends on, the exact CIs Chapters 1 and 2 already modeled: the web server, the application server, and the database server. The Technical Service record is the bridge between the business-facing name and the real infrastructure underneath it.

## Step 3 — Confirm the CI relationships actually connect

Go back to the relationships built in Chapter 2. The web server should depend on the application server, which should depend on the database server (or the equivalent "runs on"/"depends on" chain your Chapter 2 work used). For the chain to work end to end, each of those three CIs needs to trace, without a gap, up to the "Order Processing Application" Technical Service, which in turn needs to trace up to the "Customer Order Processing" Business Service. If any one of those links is missing — say, the database server CI exists but was never connected to the Technical Service record — the chain breaks at exactly that point, and impact analysis run from the Business Service level would silently miss that CI entirely.

## Step 4 — Answer "what breaks" at three altitudes

With the chain confirmed, the database server CI failing can now be described correctly at every level: at the CI level, "the order database server is down." At the Technical Service level, "the Order Processing Application is degraded or unavailable." At the Business Service level, "Customer Order Processing is down — customers cannot place or complete orders." Each of those is accurate for its audience, and all three come from the same underlying fact, because the chain was modeled correctly from CI up through Technical Service to Business Service.

## Step 5 — Check your work

Before considering this modeled correctly, confirm three things: the Business Service is named and defined the way a business stakeholder would recognize it; the Technical Service is clearly built from real CIs, not left as an empty placeholder; and every CI from Chapters 1-2 traces upward through that Technical Service with no missing links. A CSDM model that's missing any one of those three isn't actually finished, even if some CIs and relationships exist somewhere in the CMDB.

## Key terms

| Term | Meaning |
|---|---|
| Customer Order Processing | This lab's example Business Service — the order-taking capability as the business recognizes it |
| Order Processing Application | This lab's example Technical Service — the three-tier stack that delivers Customer Order Processing |
| End-to-end trace | Confirming every CI connects upward through its Technical Service to its Business Service with no gaps |
| Broken chain | A missing link anywhere in the Business Service → Technical Service → CI path, which causes impact analysis to silently miss affected CIs |

## Check yourself

If the application server CI from Chapters 1-2 was never connected to the "Order Processing Application" Technical Service record, what specifically would go wrong the next time someone ran impact analysis from the Business Service level — and how would you discover the gap?
