# Lesson 11 — Executive Summaries

**Chapter 2 · Communicating Architecture · Lesson 11 of 17**

## What you'll learn

- The four things a good architecture executive summary must answer, and nothing more
- Why a strict one-page constraint is a feature, not a limitation
- How to translate real technical trade-offs into plain language without hiding the risk
- A before/after example turning dense SDD content into an executive summary

## One page, four questions

Lesson 10 named an executive's real question: "is this safe to invest in, and what could still go wrong?" An **executive summary** is the document that answers exactly that, and almost nothing else. A good one fits on a single page and answers four questions, in this order:

1. **What problem is being solved?** One or two sentences, framed in business terms a non-technical reader already cares about — not "we need to replace our integration middleware" but "order data currently takes up to two days to reach the warehouse system, causing fulfillment delays."
2. **What's the recommended solution, at a glance?** One or two sentences, naming the approach without implementation detail — "we recommend an event-driven integration that pushes order data to the warehouse system within minutes instead of days."
3. **What does it cost, and what's the timeline?** Budget range and rough schedule — the numbers an executive needs to decide whether to fund it, without a line-item breakdown.
4. **What's the real risk, and what decision is being asked for?** The honest remaining uncertainty — not hidden, not buried in jargon — and the specific thing the executive needs to approve or decide right now.

Everything else — the ERD, the sequence diagram, the ADRs, the full security model — belongs in the SDD this executive summary sits in front of, not in the summary itself.

## Why the one-page limit is a feature

It's tempting to think a one-page constraint means leaving things out that matter. In practice, the discipline of fitting an architecture decision into one page is what forces real clarity: if an architect can't explain the recommendation and its risk in a page, that's often a sign the recommendation itself isn't settled yet, not a sign the page limit is too strict. A long executive summary gets skimmed, not read, which defeats its purpose entirely — an executive summary that isn't read provides zero value regardless of how thorough it is. The one-page constraint is what keeps the document doing its actual job.

## Translating technical trade-offs without hiding risk

The hardest part of writing an executive summary honestly is translating real technical nuance into plain language without quietly deleting the risk along with the jargon. Compare these two ways of stating the same underlying fact:

- **Hiding the risk (bad):** "The new integration will be fast and reliable."
- **Translating honestly (good):** "The new integration delivers order data within minutes instead of days. The trade-off is that if the warehouse system is briefly unreachable, an order could be delayed until the next retry — we've budgeted for automated retry and alerting, but this isn't a zero-failure-risk design, and no real-time integration is."

The second version is still plain-language and still one or two sentences — it isn't longer or more technical, it's just honest about the real trade-off instead of implying there isn't one. An executive summary that only ever says things will work perfectly isn't more reassuring; it's just less trustworthy the first time something doesn't go perfectly, and the inevitable gap between "it will be fast and reliable" and reality becomes the executive's problem to explain upward, at the worst possible moment.

## A before/after example

**SDD excerpt (too dense for an executive):** "The solution implements an event-driven pattern using Salesforce Platform Events published on Order Status Change, consumed by a middleware subscriber that transforms the payload per the agreed mapping specification and delivers to the warehouse system's REST endpoint with exponential backoff retry on 5xx responses, capped at five attempts over 15 minutes."

**Executive summary translation:** "Order data will now reach the warehouse system within minutes of a sale closing, instead of the current two-day batch delay. If the warehouse system is temporarily down, the system retries automatically for up to 15 minutes before alerting our team — a major improvement over today's process, with a small, monitored window of risk rather than none at all."

Same underlying fact, same honest risk, translated for a reader who needs the conclusion and the real trade-off, not the mechanism.

## Key terms

| Term | Meaning |
|---|---|
| Executive summary | A one-page document answering what problem is being solved, what's recommended, what it costs, and what risk and decision remain |
| Translating without hiding risk | Restating a technical trade-off in plain language while keeping the real risk visible, rather than smoothing it away |

## Lab

Take the SDD-style technical excerpt below and write a four-question executive summary from it (problem, recommendation, cost/timeline estimate you can reasonably invent for the exercise, risk and decision needed): "The project will replace three disconnected lead-capture forms with a single Salesforce Web-to-Lead implementation feeding a Flow-based deduplication and assignment process, estimated at 6 weeks of build and $40,000, with the main open risk being that historical lead data in the three legacy systems has inconsistent formatting that may require manual cleanup before migration." Keep your summary to one page-equivalent (roughly 150-200 words) and make sure the risk survives the translation.

## Check yourself

Can you name the four questions a good executive summary answers, in order? Can you explain why a strict one-page limit improves an executive summary rather than weakening it? Can you give an example, in your own words, of translating a technical trade-off into plain language without deleting the risk along with the jargon?
