# Lesson 23 — Integration Landscape Diagrams

**Chapter 4 · Applying Integration Architecture · Lesson 23 of 28**

## What you'll learn

- Why a visual integration landscape diagram matters as its own architecture deliverable, not just a nice-to-have picture
- The specific elements every integration diagram should show: systems, direction, pattern, and frequency
- A worked example diagram described in structured text, since this lesson teaches the skill without screenshot tooling
- Why a diagram needs the same governance discipline as the integration inventory from Lesson 17 — kept current, not drawn once and forgotten

## A diagram is a communication tool, not decoration

An **integration landscape diagram** is a visual map of every system in an organization's integration footprint, the connections between them, and the key characteristics of each connection. Its value is specifically that it communicates the shape of a complex, multi-system landscape at a glance — something a list of 40 bullet points describing each integration individually simply can't do as quickly. A new team member, an auditor, or an architect evaluating the impact of retiring one system can look at a well-made diagram and immediately see which other systems would be affected, rather than reading through every individual integration's documentation to reconstruct the same picture mentally.

## What a complete diagram actually shows

A landscape diagram that's genuinely useful, rather than just decorative, includes four specific elements for every connection, not just a line between two boxes:

- **The systems themselves,** clearly labeled, including systems that aren't Salesforce (the ERP, the marketing platform, the data warehouse) — a diagram that only shows Salesforce's side of each connection is incomplete.
- **Direction of data flow,** shown with an arrow — does data flow one way, or both ways? A bidirectional sync looks very different, and carries different risk, than two separate one-way flows that happen to connect the same two systems.
- **The pattern used,** labeled on or near each connection line — synchronous, asynchronous/fire-and-forget, batch, event-driven — so a viewer immediately understands not just *that* two systems are connected but *how*, without having to look up separate documentation to find out.
- **Frequency,** labeled similarly — real-time, nightly, hourly, on-demand — which matters because frequency drives expectations about data freshness and is often the first thing someone needs to know when a business user asks "how current is this number."

## A worked example, described in text

Picture a retail company's landscape: Salesforce sits in the center. An arrow from the public website into Salesforce, labeled "REST API, real-time, one-way," represents new Leads flowing in. A bidirectional arrow between Salesforce and the ERP, labeled "iPaaS/MuleSoft, near-real-time, two-way," represents Opportunity and invoice data syncing both directions through a middleware hub (Lesson 4) rather than a direct point-to-point line. A one-way arrow from Salesforce to a data warehouse, labeled "Bulk API, nightly batch," represents the analytics sync from Lesson 13. A one-way arrow from Salesforce out to a marketing platform, labeled "Platform Event, fire-and-forget," represents the Lead-conversion notification from Lesson 11's worked example. Reading this diagram, anyone can immediately see that the ERP connection is the most operationally significant one (bidirectional, near-real-time, run through shared middleware) and that retiring the data warehouse would only affect a nightly batch job, not anything real-time-dependent — exactly the kind of impact assessment Lesson 17's lab asked for, made dramatically easier with a diagram in hand instead of reconstructing it from 40 separate documents.

## Keep it current, or it becomes actively misleading

A diagram drawn once during an initial architecture engagement and never updated again is worse than no diagram at all in one specific way: people trust it, keep making decisions based on it, and it quietly drifts out of sync with reality as new integrations get added and old ones get retired without anyone updating the picture. This is the same governance discipline Lesson 17 demands of the integration inventory, applied to its visual counterpart — the diagram should be generated from, or at minimum regularly reconciled against, the maintained inventory, not drawn once by a departing consultant and left to fossilize.

## Key terms

| Term | Meaning |
|---|---|
| Integration landscape diagram | A visual map of every system in an integration footprint, their connections, and each connection's key characteristics |
| Direction of data flow | Whether a connection moves data one way or both ways between two systems |

## Lab

Using this lesson's four required elements (systems, direction, pattern, frequency), describe in structured text (a bulleted list is fine — no drawing tool required) a landscape diagram for a company with: Salesforce, an on-premises inventory system (one-way, hourly batch feed into Salesforce), a customer support ticketing tool (two-way, real-time sync via REST callouts, point-to-point), and an e-signature platform (one-way, triggered on-demand when a contract needs signing, request-reply). For each connection, state which one you'd flag as the highest operational risk if that connection failed, and why.

## Check yourself

Can you name the four elements a complete integration landscape diagram should show for every connection? Can you explain why a diagram that's drawn once and never updated again can become actively misleading rather than just outdated?
