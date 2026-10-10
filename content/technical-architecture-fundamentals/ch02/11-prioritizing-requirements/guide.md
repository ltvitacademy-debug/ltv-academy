# Lesson 11 — Prioritizing Requirements

**Chapter 2 · From Requirements to Blueprint · Lesson 11 of 19**

## What you'll learn

- Why "everything is a priority" is the same as having no priorities at all
- The MoSCoW method (Must, Should, Could, Won't) as a practical way to sort requirements
- Why prioritization is an architect's responsibility, not purely a product owner's
- How to handle a stakeholder who insists every requirement is a Must

## Not every requirement deserves the same weight

Once a project has a reasonably complete list of requirements, a predictable thing happens: there are more of them than can realistically be delivered in the time and budget actually available. That isn't a sign something went wrong in requirements gathering — it's the normal outcome of gathering requirements honestly. The problem only becomes real if nobody then sorts the list by what actually matters most, because a project that tries to treat every requirement as equally urgent ends up making that decision anyway, just badly and under pressure, usually by whichever requirement got discussed most recently or loudest.

## MoSCoW: a practical sorting method

One widely used way to prioritize is the **MoSCoW method**, which sorts every requirement into exactly one of four buckets:

- **Must have.** Without this, the solution doesn't meet its core purpose at all — launching without it isn't really launching the thing that was asked for.
- **Should have.** Important and genuinely valuable, but the solution is still meaningfully useful without it, at least for a first release.
- **Could have.** Desirable, nice-to-have, but low-impact if left out — the kind of thing that's easy to defend cutting under real time pressure.
- **Won't have (this time).** Explicitly out of scope for this release, not because it's a bad idea, but because it's been deliberately deferred — naming it out loud prevents it from quietly resurfacing as a surprise expectation later.

The method's value isn't really in the labels themselves — it's in forcing an honest conversation about which bucket each requirement actually belongs in, especially for the requirements someone wants to call "Must" out of habit or anxiety rather than because the solution genuinely fails its core purpose without them.

## Prioritization is architect work, not just product-owner work

It's tempting to treat prioritization as purely a business or product-owner decision — they own the backlog, so they decide the order. That's true for business value, but an architect brings something the business side often can't see on their own: which requirements are technically cheap to deliver together because they share underlying infrastructure, and which ones look independent on a list but actually depend on each other being built in a specific order. A requirement that looks like a "Could have" in isolation might actually be nearly free to deliver once a "Must have" requirement is already built, because they share the same object model change — information only an architect sitting in the prioritization conversation is positioned to surface. Prioritization done well is a negotiation between business value and technical reality, not a decision made by either side alone.

## When a stakeholder insists everything is a Must

A common, almost universal pattern: a stakeholder, asked to prioritize, labels every requirement "Must have," because from where they sit, everything genuinely does matter. The useful response isn't to argue about whether their requirements matter — they probably do. It's to reframe the question: "if we could only ship three of these ten Musts by the deadline, which three would you pick, and what happens to the business if the other seven slip to a later release?" That question forces a real trade-off to surface, because "everything is critical" collapses the moment someone has to actually choose under a real constraint, which is exactly the kind of constraint Lesson 7 covered — a fixed deadline or budget that the prioritization conversation has to respect, whether or not anyone likes it.

## Key terms

| Term | Meaning |
|---|---|
| MoSCoW method | A requirement-sorting technique: Must, Should, Could, Won't (this time) |
| Must have | A requirement without which the solution fails its core purpose |
| Won't have (this time) | A requirement explicitly deferred for this release, named rather than silently dropped |
| Prioritization | Negotiating delivery order between business value and technical reality |

## Lab

You have five requirements for a new customer onboarding process: (1) a welcome email automation, (2) a custom object to track onboarding milestones, (3) a dashboard showing onboarding progress across all customers, (4) a Slack alert when a customer misses a milestone, (5) an AI-generated personalized onboarding plan per customer. Sort all five into MoSCoW buckets, and write one sentence justifying your Must-have choice specifically — why the solution fails its core purpose without it.

## Check yourself

Can you explain why treating every requirement as equally urgent is itself a decision, just a worse one than deliberate prioritization? Can you name and define all four MoSCoW buckets? Can you explain why prioritization needs both business-value input and technical-reality input, with an example of information only an architect could surface?
