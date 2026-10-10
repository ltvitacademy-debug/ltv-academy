# Lesson 16 — Handling Objections on Integration and Scale

**Chapter 3 · Presenting and Defending · Lesson 16 of 21**

## What you'll learn

- The recurring objection patterns specific to integration architecture and scale decisions
- How to defend a real-time vs. batch choice under direct challenge
- How to respond when a panelist pushes on whether a scale assumption is actually safe
- How to apply model answers to objections drawn from earlier case studies

## Integration and scale objections test whether a number was reasoned or guessed

Where data-and-security objections (Lesson 15) often probe trade-offs between competing protections, integration-and-scale objections more often probe whether a specific design choice holds up as the actual numbers get bigger, change shape, or arrive faster than assumed. The strongest answers in this domain consistently point back to a specific, stated assumption (Lesson 10) and a specific, prioritized risk (Lesson 11) — the weakest answers reveal that a number in the design was never really reasoned through at all.

## Objection pattern one: "why real-time instead of batch" (or the reverse)

Carrow Equipment's design (Lesson 4) used Salesforce Connect for live pricing and inventory but let order history settle into Salesforce directly rather than querying SAP live every time. A panelist might push: "real-time integration is more complex and fragile than batch — why not just batch-sync pricing every fifteen minutes instead?" The model answer names the specific business consequence of the rejected alternative, the way Lesson 13 taught: "a fifteen-minute-old inventory number is exactly the staleness that creates the fulfillment problem this scenario calls out — a dealer could place an order against stock that sold out twelve minutes ago. The added integration complexity is the accepted cost of avoiding that specific, named business risk, not complexity for its own sake." This only works because the original design already reasoned through that trade-off in Lesson 4 — the answer isn't new, it's a restatement under pressure.

## Objection pattern two: "is your scale assumption actually safe"

Nimbus Mobile's design (Lesson 6) assumed interaction volume in the millions per month and used a tiered storage strategy accordingly. A panelist testing this might ask: "what happens if actual volume comes in at triple what you assumed?" The strongest response doesn't claim the assumption is definitely correct — it names the assumption's stated consequence (per Lesson 10's technique) and shows the design has headroom or a known next step: "the tiered approach was chosen specifically because it scales by moving the threshold between the live-query tier and the archive tier, not by redesigning the pattern itself — if volume comes in three times higher than assumed, the response is tuning that threshold and re-evaluating the archive tier's own capacity, not re-architecting from scratch." This answer is strong because it shows the design degrades gracefully under a wrong assumption, rather than breaking entirely — which is a meaningfully different, better answer than simply insisting the original number was right.

## Objection pattern three: "what's your fallback when the integration fails"

Any design with an external dependency — Alder Trust Bank's KYC vendor call (Lesson 2), Fenwick State's SIS integration (Lesson 7) — invites a direct question about failure handling. A weak answer treats this as an afterthought ("we'd add error handling"); a strong answer names the specific failure mode and the specific, scenario-appropriate response: for the KYC vendor call, "a failed verification call should not silently let an account open — the onboarding Flow routes to a manual review queue on verification failure, rather than either blocking indefinitely or defaulting to approval," which treats the integration's failure path as a first-class part of the design, not an edge case bolted on only when asked.

## Why this domain rewards knowing your own numbers

A candidate who can state why a specific threshold, interval, or volume assumption was chosen — and what happens if it's wrong — consistently outperforms one who can only state what the number is. Objections in this domain are rarely actually about whether the candidate chose the "right" number; they're testing whether there's real reasoning behind it that can flex when the premise changes.

## Key terms

| Term | Meaning |
|---|---|
| Staleness risk | The business cost of acting on data that is no longer current, central to real-time vs. batch objections |
| Graceful degradation | A design's ability to tolerate a wrong assumption through tuning rather than requiring a full redesign |
| Failure-path design | Treating an integration's failure mode as a first-class design decision, not an afterthought |

## Lab

Write a model answer to this objection about Lesson 1's Meridian Outfitters design: "Your inventory sync relies on each regional system publishing events — what happens to the storefront's inventory view if one region's event publisher goes down for an hour during the holiday launch?" Name the specific failure mode and a scenario-appropriate response, in the style shown above.

## Check yourself

Can you explain why a strong answer to a scale objection shows graceful degradation rather than insisting the original assumption was correct? Can you state, in one sentence, why a failure-path answer that was only invented in the moment it was asked is weaker than one already built into the original design?
