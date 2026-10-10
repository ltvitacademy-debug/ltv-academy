# Lesson 13 — Justifying Rejected Alternatives

**Chapter 2 · Working Ambiguous Requirements · Lesson 13 of 21**

## What you'll learn

- Why a panel's "why didn't you just do X" question is testing breadth of consideration, not just defending the chosen answer
- How to build a rejected-alternatives table that's honest about trade-offs instead of strawmanning the alternative
- The difference between an alternative rejected for a good reason and one rejected only because it wasn't considered
- How to apply this to a design decision from an earlier case study

## The question behind "why didn't you just do X"

Every design decision in this course's case studies implicitly rejected at least one other reasonable approach — Lesson 1 rejected full org consolidation in favor of a unified profile layer; Lesson 4 rejected full data replication from SAP in favor of real-time external objects for pricing. A review-board panelist asking "why didn't you just merge the orgs" or "why not replicate everything from SAP" isn't necessarily challenging whether the chosen design is wrong — often they're testing whether the candidate actually considered the alternative and rejected it for a specific reason, or simply never thought of it. A design that happens to be correct but was arrived at without considering any alternative is much shakier under questioning than one that explicitly weighed two or three options and chose deliberately, even if the final answer is identical.

## Building a rejected-alternatives table

A rejected-alternatives table names each real alternative considered, the main trade-off it would have made differently, and the specific reason it was rejected for this scenario — not alternatives in general, this scenario specifically. For Lesson 4's Carrow Equipment pricing-and-inventory decision: **full data replication from SAP** was considered and rejected because dealers deciding whether to place an order need pricing and inventory current to the moment, and replication's inherent lag (however short) creates exactly the stale-inventory risk the scenario calls out as a real fulfillment problem. **A manual nightly price-list export** was considered and rejected for the same freshness reason, plus the added operational burden of someone maintaining a file-based export process indefinitely. Naming both alternatives, and giving each a distinct, scenario-specific reason for rejection, shows breadth that a single sentence — "we chose Salesforce Connect because it's real-time" — doesn't convey on its own.

## Don't strawman the alternative

A rejected-alternatives table only works if the rejected option is represented honestly, with its real strengths intact, not caricatured to make the chosen design look better by comparison. Full org consolidation (Lesson 1) really is architecturally cleaner in the long run than a unified profile layer bolted across three orgs — a fair rejected-alternatives entry says exactly that, and names the real reason it was rejected anyway (the nine-month deadline and data-quality risk), rather than pretending consolidation has no advantages at all. A panel can tell the difference between "I considered this fairly and rejected it for a specific reason" and "I'm describing a worse version of this alternative so my answer looks better," and the second one reads as evasive even when the final design recommendation is the right one.

## Rejected for a reason vs. rejected by omission

There's a real difference between an alternative that was actively considered and rejected for a stated reason, and one that simply never occurred to the candidate until the panel raised it. The first is a sign of thorough design work; the second, if it happens live during Q&A, isn't necessarily fatal — the right move is to engage with the alternative honestly in the moment ("that's a fair point; here's how I'd compare it against what I proposed") rather than pretending it was already considered when it clearly wasn't. Panels generally respond better to honest, in-the-moment reasoning about a genuinely new alternative than to a candidate bluffing that every possible option was already weighed before the question was asked.

## Key terms

| Term | Meaning |
|---|---|
| Rejected alternative | A reasonable design option that was considered and not chosen, for a specific, stated reason |
| Rejected-alternatives table | An artifact naming each alternative, its trade-off, and the scenario-specific reason it wasn't chosen |
| Strawmanning | Misrepresenting a rejected alternative's real strengths to make the chosen design look better by comparison |
| Rejection by omission | An alternative that wasn't actually considered until raised by someone else, as opposed to actively weighed and rejected |

## Lab

Pick one design decision from any case study in Chapter 1. Build a rejected-alternatives table with at least two real alternatives, each with its genuine strength stated honestly and the specific, scenario-based reason it was rejected for that case. Avoid strawmanning either alternative.

## Check yourself

Can you explain why a panel's "why didn't you just do X" question is often testing breadth of consideration rather than just challenging the final answer? Can you describe, in one sentence, the difference between a fair rejected-alternatives entry and a strawmanned one?
