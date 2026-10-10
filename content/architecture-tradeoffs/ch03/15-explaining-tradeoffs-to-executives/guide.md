# Lesson 15 — Explaining Tradeoffs to Executives

**Chapter 3 · Applying Tradeoffs · Lesson 15 of 20**

## What you'll learn

- Why a technically correct explanation can still fail completely in front of an executive audience
- The structure that actually lands: business impact first, technical reasoning second
- How to translate each tradeoff from Chapters 1-2 into business-risk language
- A concrete before/after example of the same decision explained two different ways

## The explanation that's correct and the explanation that works are not the same thing

An architect who can correctly reason through a tradeoff — real-time vs. batch, build vs. buy, governance vs. agility — has done the hard technical work. Explaining that same reasoning to an executive audience is a genuinely different skill, and it fails in a predictable way when architects treat it as the same task: leading with the technical mechanism ("we chose Platform Events over Change Data Capture because we needed a custom payload schema for cross-system replay") in front of an audience whose actual question is "does this solve the problem I asked you to solve, and what does it cost." The technical reasoning isn't wrong — it's just answering a question nobody in that room asked first.

Executives are optimizing for a different set of concerns than the ones that drove the technical decision: revenue impact, risk exposure, cost, and timeline. A tradeoff explanation that leads with those concerns and only drops into technical mechanism when asked ("why") earns trust and gets a faster decision. A tradeoff explanation that leads with technical mechanism and only arrives at business impact at the end — if it arrives there at all — reads as either evasive or as a sign the architect hasn't actually connected the decision to what the business cares about, even when the underlying reasoning was sound the whole time.

## The structure that lands

- **Business impact, stated first, in one or two sentences.** What does this decision mean for cost, risk, timeline, or capability, in terms an executive already tracks? "This keeps our customer data integration running within our compliance window and costs about $X less per year than the alternative" is a complete first sentence. A sentence that opens with an API name is not.
- **The tradeoff, named honestly, including what we're giving up.** Executives generally trust a recommendation more, not less, when it names a real cost rather than presenting the choice as costless. "We're trading same-day visibility into record changes for a simpler, more reliable nightly sync" is a sentence an executive can actually evaluate and push back on if the tradeoff is wrong for their priorities.
- **Why this is the right tradeoff for this organization, specifically — and only then the technical mechanism, if asked.** The business reasoning (why this org's actual needs land on this side of the tradeoff) usually satisfies the question. The technical mechanism (which specific Salesforce feature implements it) is available on request, not required as the opening explanation.
- **What would make us revisit this later.** This is Lesson 8's "conditions for revisiting" translated into executive language — a specific, named trigger ("if we add a second region with its own compliance requirement, we'd need to reassess") rather than a vague "we'll keep an eye on it."

## The same decision, two ways

**Leads with mechanism (doesn't land):** "We decided to use Bulk API 2.0 instead of Platform Events for the warehouse sync because the job-based asynchronous model handles the record volume better and callers reconcile results using a key field since ordering isn't guaranteed."

**Leads with business impact (lands):** "The nightly data warehouse sync will run reliably at our current and projected data volume, and it costs significantly less to build and maintain than a real-time pipeline that nobody downstream actually needs — the warehouse reports are used for weekly and monthly reviews, not live dashboards. The tradeoff is that warehouse data will always be up to a day old, which matches how it's actually used today. If the finance team ever needs same-day warehouse numbers, that's the trigger to revisit this."

Both sentences describe the same underlying decision. Only the second one is something an executive without Salesforce expertise can actually evaluate, agree with, or push back on using information they actually have.

## Key terms

| Term | Meaning |
|---|---|
| Business impact framing | Stating a decision's effect on cost, risk, timeline, or capability before explaining its technical mechanism |
| Technical mechanism | The specific platform feature or implementation detail that carries out a decision, useful as supporting detail rather than an opening explanation |
| Revisit trigger | A specific, named future condition that would prompt reconsidering a decision, stated in business terms an executive can track |

## Lab

Take your ADR from Lesson 8's lab (the security-vs-usability or real-time-vs-batch scenario you documented). Rewrite its core decision as a 3-4 sentence executive explanation using this lesson's structure: business impact first, the tradeoff named honestly, why it fits this org, and a specific revisit trigger — with no API names or technical mechanism in the first two sentences.

## Check yourself

Can you explain why a technically correct explanation can still fail with an executive audience, using this lesson's own before/after example as a reference? Can you reproduce the four-part structure this lesson recommends for an executive-facing tradeoff explanation, in order?
