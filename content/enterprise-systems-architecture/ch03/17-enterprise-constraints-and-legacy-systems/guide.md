# Lesson 17 — Enterprise Constraints and Legacy Systems

**Chapter 3 · Enterprise Design · Lesson 17 of 22**

## What you'll learn

- Why legacy systems persist in enterprises long after anyone would choose to build them today
- The strangler-fig pattern for retiring a legacy system gradually, instead of all at once
- How to design around a legacy constraint honestly, rather than pretending it doesn't exist
- What technical debt means at the enterprise level, and why it compounds over time

## Legacy systems are a constraint, not a mistake to shame

Every enterprise architecture course eventually has to address the system nobody wants to talk about: the one running on a decades-old platform, maintained by one person who's been there since before most of the current staff, too deeply embedded in daily operations to simply switch off, and too fragile and undocumented to confidently modify. It's tempting to treat this as an embarrassing mistake someone made years ago. A more useful frame is that **legacy systems are a constraint the current architecture has to design around**, the same way a building's load-bearing wall is a constraint a renovation has to design around — not because anyone chose it today, but because it's simply part of the reality a current design has to work within.

## Why legacy systems persist

Legacy systems rarely persist out of inertia alone. Common, legitimate reasons include: the system still does its specific job correctly, and "correctly" is a high bar that a risky replacement project might not clear on day one; the cost and risk of migration (including the risk of losing decades of undocumented business logic embedded in the old system) genuinely outweighs the benefit of replacing it right now; or the system is deeply entangled with other processes in ways that make extraction far harder than it looks from the outside. A System Architect's job isn't to assume legacy systems persist only because nobody got around to fixing them — it's to understand the actual reason in this specific case, because that reason shapes what a realistic plan looks like.

## The strangler-fig pattern

One of the most widely used approaches for retiring a legacy system without a risky, all-at-once replacement is the **strangler-fig pattern** (named after the strangler fig vine, which gradually grows around a host tree until it eventually replaces it entirely). Applied to systems, the idea is: build new functionality around the legacy system's edges rather than inside it, gradually route more and more traffic or responsibility to the new components, and only decommission the legacy system once there's nothing left for it to do. A System Architect integrating Salesforce with a legacy system can apply this directly — for example, building a new Salesforce-based process that handles new transactions going forward, while the legacy system continues handling its existing historical data until a migration for that history is separately planned, rather than attempting a single cutover that replaces everything on one day.

## Designing honestly around a constraint

The discipline this lesson is building toward is refusing to pretend a legacy constraint doesn't exist just because it's inconvenient. If a legacy system can only produce a nightly batch file, the integration design has to accept that limitation rather than specifying a real-time flow and hoping the legacy system's owners will somehow make it work. If a legacy system's data quality is known to be unreliable for a specific field, the architecture has to account for that unreliability (through validation, reconciliation, or simply not relying on that field) rather than assuming it away. This connects directly back to Lesson 2's point about external systems generally: honest architecture is built on what a system can actually do, not on what would be convenient if it could.

## Technical debt at the enterprise level

**Technical debt** is the accumulated cost of past shortcuts — decisions made for short-term speed that create ongoing maintenance burden or constrain future options. At the enterprise level, technical debt isn't confined to code; it includes an undocumented legacy integration nobody fully understands anymore, a workaround built years ago to cover for a system limitation that's since gone unaddressed, or an accumulated pile of point-to-point integrations that never got consolidated into a cleaner pattern. Like financial debt, it compounds: each new system built around an existing piece of debt, without addressing it, makes the eventual cost of addressing it later higher, not lower.

## Key terms

| Term | Meaning |
|---|---|
| Legacy system | An older system, often business-critical, that a current architecture must design around rather than replace outright |
| Strangler-fig pattern | Gradually building new functionality around a legacy system's edges until it can be safely decommissioned |
| Technical debt | The accumulated cost of past shortcuts that creates ongoing maintenance burden or constrains future options |

## Lab

A company has a 20-year-old mainframe order-management system that still processes all historical order data accurately, but can only export a nightly flat file and has no modern API. Design, in writing, a strangler-fig approach for moving new order processing onto Salesforce and a modern integration layer, while the mainframe continues handling historical data until it's separately migrated. Be specific about what moves first, what stays on the mainframe longest, and what the nightly batch file is still needed for during the transition.

## Check yourself

Can you explain the strangler-fig pattern in your own words, including why it's generally preferred over an all-at-once legacy replacement? Can you give an example of enterprise-level technical debt that isn't a code-level problem?
