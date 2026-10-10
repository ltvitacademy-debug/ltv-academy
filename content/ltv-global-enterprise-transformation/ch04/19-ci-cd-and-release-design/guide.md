# Lesson 19 — CI/CD and Release Design

**Chapter 4 · Delivery Strategy · Lesson 19 of 33**

## What you'll learn

- How LTV Global packages its four business units' metadata for independent, coordinated releases
- The CI pipeline stages a change moves through before reaching production
- How release cadence aligns to Salesforce's own seasonal release calendar
- How the Change Advisory Board from the release-governance discipline applies to LTV Global specifically

## Unlocked packages per business unit

Building on Lesson 18's environment map, LTV Global organizes its metadata into **unlocked packages**, one per business unit, rather than one single, undifferentiated metadata set for the whole org. This lets Equipment Manufacturing & Sales ship a change to their Opportunity automation without that deployment bundling in whatever Parts & Aftermarket's team happens to have in progress on Parts Order at the same moment — each package has its own version history and can be deployed on its own schedule, while still deploying into the one shared, single global org from Lesson 7. Shared, cross-BU metadata (the core Equipment Asset object, the integration hub's Apex, anything genuinely common) lives in its own shared package that every BU package depends on, rather than being duplicated into each BU's own package.

## The CI pipeline

Every change, regardless of which BU package it belongs to, moves through the same automated pipeline stages before reaching production: a developer commits metadata changes to version control from their scratch org (Lesson 18); a CI pipeline automatically runs **Apex tests** against the change in a clean environment, catching failures before any human reviewer even looks at it; a peer review happens against the committed change, not against a live sandbox someone has to manually inspect; the change deploys to the shared integration sandbox if it touches integration logic, or directly to staging if it doesn't; and staging validation (including the load testing Lesson 17's performance NFR requires) happens before the change is eligible for a production release. No change reaches production without passing automated tests first — this is a gate, not a courtesy step.

## Release cadence

LTV Global aligns its own release cadence to Salesforce's seasonal release calendar, testing each BU package against a preview/sandbox release of the upcoming Salesforce platform release before it goes live for every org, so a Salesforce-side platform change never surprises LTV Global's own release schedule. Within that platform-level cadence, LTV Global runs its own more frequent release trains for BU-specific feature work — not tied to Salesforce's three-times-a-year cycle, since waiting for a platform release window to ship an ordinary feature change would badly mismatch the pace four active BU teams actually need.

## The Change Advisory Board

Because a single global org (Lesson 7) means one BU's release can affect every other BU sharing the same platform, LTV Global convenes a **Change Advisory Board (CAB)** — representation from each BU, the integration team, and the platform/architecture team — to review and approve releases that touch shared metadata or the integration hub before they reach production. BU-specific changes that touch only that BU's own package and have no shared dependency can move faster, without full CAB review, which keeps the CAB from becoming a bottleneck on every single change while still gating the changes that actually carry cross-BU risk.

## Why this connects back to the single-org decision

Every design choice in this lesson is a direct consequence of Lesson 7's single-org decision: packaging per BU, a CAB that specifically exists because of shared-platform risk, and a release cadence that has to respect Salesforce's own platform calendar on top of LTV Global's internal one. A multi-org design, had LTV Global chosen it, would have faced a genuinely different (not simply easier) release-governance problem — this course doesn't claim single-org eliminates release complexity, only that it changes its shape.

## Key terms

| Term | Meaning |
|---|---|
| Unlocked package | A deployable, versioned metadata package, used here one-per-business-unit |
| CI pipeline | The automated sequence of build, test, and review stages a change passes through before release |
| Release cadence | How often and on what schedule changes are promoted to production |
| Change Advisory Board (CAB) | The cross-functional body reviewing and approving releases that carry shared or cross-cutting risk |

## Lab

The Equipment Financing BU wants to skip CAB review for a change they insist "only touches our own package." Using this lesson's reasoning, write three or four sentences describing exactly what you'd check before agreeing that claim is true, and what would change your answer if the review turned up a dependency on shared metadata.

## Check yourself

Can you explain, in your own words, why LTV Global packages metadata per business unit instead of as one undifferentiated set? Can you state which kinds of changes require full Change Advisory Board review at LTV Global, and which kinds don't, and why that split exists?
