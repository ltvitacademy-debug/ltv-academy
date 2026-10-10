# Lesson 24 — Deliverables: Integration and Security Diagrams

**Chapter 5 · Deliverables · Lesson 24 of 33**

## What you'll learn

- How to render LTV Global's integration landscape (Lessons 13-15) as a single landscape diagram
- How to render the security and sharing model (Lesson 11) as its own dedicated diagram
- Why these two diagrams stay separate rather than being combined into one crowded picture
- What each diagram needs to make instantly clear to someone who has never seen this scenario before

## The integration landscape diagram

LTV Global's integration landscape diagram shows every system from Lesson 13's hub decision, the hub itself at the center, and the specific mechanism connecting each system to it — exactly the set of facts a reader needs without re-reading three lessons of prose: Salesforce and Meridian ERP connected by a bidirectional arrow labeled "synchronous REST (orders) + nightly Bulk API batch (product/inventory)"; Salesforce and LedgerPoint connected by an arrow labeled "nightly SFTP batch, both directions, with reconciliation"; Salesforce, Meridian, and LedgerPoint each connected independently to Snowflake, labeled with their respective extraction mechanisms; and the three external APIs connected with their specific mechanism (External Services for parts-pricing, Apex callout for shipping-carrier and credit-check). Labeling every connection with its actual mechanism — not just drawing a generic line — is what makes this diagram do real work instead of just looking impressive.

## Why the diagram shows the hub, not twelve point-to-point lines

Because Lesson 13 rejected point-to-point integration in favor of a central hub, the diagram should visually reflect that decision: every system connects to the hub, and the hub's internal routing (the Enterprise Integration Patterns from Lesson 13) can be called out as a separate, zoomed-in inset rather than cluttering the main landscape view with routing logic. A diagram that accidentally drew twelve direct point-to-point lines, even if the underlying design used a hub, would misrepresent the architecture it's supposed to document — the diagram has to match the design, not just gesture at it.

## The security and sharing diagram

A separate diagram renders Lesson 11's security model: the role hierarchy (region over business unit) as a tree; the organization-wide defaults for each major object; the two named sharing rules (global key-accounts criteria-based rule, Global Escalations queue rule) as labeled exceptions layered on top of the hierarchy; and the external-user sharing-set relationship shown as a distinct, separate visibility track rather than merged into the internal hierarchy tree — visually reinforcing Lesson 11's point that dealers and end customers are never placed inside the internal hierarchy at all.

## Why these stay as two separate diagrams

It's tempting to combine integration and security into one "everything" diagram, but the two convey fundamentally different kinds of information — data flow versus visibility — and combining them produces a diagram dense enough that neither story reads clearly. A board member asking an integration question wants the integration diagram in front of them, uncluttered by role-hierarchy boxes; a board member asking a security question wants the reverse. Keeping them separate is a usability decision about the deliverable itself, not a sign the two domains are unrelated — the technical architecture document (Lesson 27) is exactly where the connections between them get explained in prose.

## What makes a diagram actually useful to someone new to the scenario

Both diagrams are tested against the same standard: could someone who has never read this capstone's earlier lessons look at the diagram and correctly state, within a minute, which systems exist, how they connect (for the integration diagram), or who can see what (for the security diagram)? A diagram that requires the earlier lessons' prose to be meaningful has failed at being a diagram — it's a decoration, not a deliverable.

## Key terms

| Term | Meaning |
|---|---|
| Integration landscape diagram | A diagram showing every integrated system, the hub, and each connection's actual mechanism |
| Security and sharing diagram | A diagram showing OWD, role hierarchy, sharing rules, and external-user sharing as a distinct track |
| Labeled connection | A diagram connection annotated with its actual mechanism, not a generic unlabeled line |

## Lab

Sketch, in words, the integration landscape diagram's connection list: for each of LTV Global's connections (Meridian, LedgerPoint, Snowflake x3, three external APIs), write the one-line label you'd put on that connection's arrow, exactly as specific as the example labels given in this lesson.

## Check yourself

Can you explain, in your own words, why the integration diagram should visually show the hub-and-spoke pattern rather than point-to-point lines, even as a simplification? Can you state why the security diagram shows external-user sharing as a separate track from the internal role hierarchy, rather than merging the two into one tree?
