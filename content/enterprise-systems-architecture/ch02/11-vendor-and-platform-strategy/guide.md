# Lesson 11 — Vendor and Platform Strategy

**Chapter 2 · Enterprise Concerns · Lesson 11 of 22**

## What you'll learn

- The build-versus-buy decision, and why it recurs constantly in enterprise architecture
- Vendor consolidation versus best-of-breed as two competing platform strategies
- Where Salesforce's own platform model (core platform plus AppExchange) fits into this conversation
- How a System Architect contributes to a vendor and platform strategy conversation, as distinct from making the final call

## Build versus buy, over and over

One of the most recurring decisions in enterprise architecture is whether to build a capability on top of an existing platform or buy a purpose-built product for it. This decision isn't made once for the whole enterprise — it recurs for nearly every new requirement: should this new approval workflow be built natively in Salesforce, or should the company buy a dedicated contract-management product and integrate it in? Should a customer-facing portal be built on Salesforce Experience Cloud, or licensed from a specialized vendor? There's no universally correct answer; the right call depends on how central the capability is to the business's differentiation, how mature the buy-side option is, and how much ongoing maintenance burden the build-side option would create.

## Consolidation versus best-of-breed

At the platform-strategy level (rather than the single-requirement level), enterprises generally lean toward one of two overall postures:

- **Vendor consolidation.** Standardizing on a small number of platforms and vendors across as many capabilities as possible, even when a specialized point solution might be marginally better at any one function. The payoff is fewer integrations to maintain, simpler licensing, a single vendor relationship to manage, and often better internal expertise because staff aren't spread across a dozen different tools.
- **Best-of-breed.** Choosing the best available tool for each specific function, even if that means running many different vendors' products side by side. The payoff is that each capability gets the strongest available tool for that specific job, at the cost of more integration points to build and maintain, more vendor relationships, and more fragmented expertise.

Most real enterprises land somewhere between these two poles rather than purely at either end, and a System Architect's job is less about declaring one posture universally correct and more about making the current posture, and its trade-offs, explicit — because an organization that's drifted into a de facto best-of-breed sprawl without ever deciding to be best-of-breed is exactly the kind of accidental architecture this course has been warning about throughout Chapter 1.

## Where Salesforce fits

Salesforce's own commercial model nudges toward consolidation within its own ecosystem: a broad core platform (sales, service, marketing, and more) plus an extensive partner marketplace (AppExchange) for capabilities Salesforce doesn't build natively. This gives enterprises a middle path — standardizing on Salesforce as the platform while still picking a specialized AppExchange product for a specific function, which captures some of best-of-breed's quality benefit while keeping the integration and administrative burden lower than it would be with an entirely separate, unaffiliated product. A System Architect evaluating a build-versus-buy decision inside a Salesforce-centric enterprise should treat "build natively," "buy an AppExchange package," and "buy an entirely separate product requiring custom integration" as three genuinely distinct options, each with a different cost and risk profile, not a false choice between only two of them.

## The architect's actual contribution

A System Architect rarely has the final authority to pick a vendor or set a company-wide platform strategy — that's typically a decision for the governance body covered in Lesson 8, informed by budget and procurement considerations outside the architect's own remit. What the architect does contribute is a clear-eyed technical assessment: what would building this natively actually cost in ongoing maintenance, what integration burden would a given buy decision introduce, and how well does a given option fit the standards and integration boundaries the enterprise has already committed to. That assessment is what turns a vendor decision from a gut call into an informed one.

## Key terms

| Term | Meaning |
|---|---|
| Build versus buy | The recurring decision between building a capability on an existing platform versus purchasing a dedicated product |
| Vendor consolidation | A platform strategy standardizing on a small number of vendors across most capabilities |
| Best-of-breed | A platform strategy choosing the strongest available tool for each specific function, even across many vendors |
| AppExchange | Salesforce's partner marketplace for packaged, pre-built capabilities beyond the core platform |

## Lab

Pick a plausible enterprise requirement, such as "we need a tool to manage complex, multi-year customer contracts with renewal terms." Write one paragraph each evaluating three options: building this natively as custom Salesforce objects and automation, buying a specialized AppExchange contract-management package, and buying an entirely separate, non-Salesforce contract-management product requiring custom integration. For each, note at least one cost or risk a System Architect would need to flag to the governance body making the final call.

## Check yourself

Can you explain the difference between vendor consolidation and best-of-breed as platform strategies, including a real trade-off for each? Can you describe what a System Architect's actual contribution is to a vendor decision, as distinct from who makes the final call?
