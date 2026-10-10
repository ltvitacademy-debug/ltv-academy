# Lesson 11 — Prioritizing Risks

**Chapter 2 · Working Ambiguous Requirements · Lesson 11 of 21**

## What you'll learn

- A simple likelihood-and-impact approach to sorting risks, and why that's more useful than a flat list
- The difference between technical risk, delivery risk, and business risk, and why a design has to address all three
- Why a defensible design doesn't try to eliminate every risk it identifies
- How to triage risk in a case study from Chapter 1 using this framework

## Identifying risk is easy; prioritizing it is the actual skill

Once you can extract requirements (Lesson 9) and state assumptions (Lesson 10), a new problem shows up fast: almost any realistic scenario has more risks worth naming than there's time to address in a design or a presentation. Nimbus Mobile's telecom scenario (Lesson 6) alone has risk in data migration accuracy, in routing-system load during a real outage, in storage cost growth, and in the vendor contract behind Service Cloud Voice — naming all four isn't the hard part. Deciding which ones actually shape the design, and which get a one-sentence acknowledgment and nothing more, is.

## Likelihood and impact, not a flat list

A simple two-axis sort does most of the work: how likely is this risk to actually occur, and how bad is it if it does. A risk that's both likely and high-impact (in Lesson 6's terms, routing-system overload during a real regional outage, which both will happen eventually and would directly hurt customers mid-crisis) needs to visibly shape the design, not just get mentioned — this is exactly why that lesson's design treats outage alerts as a separate event-driven push rather than routing them through the same queue as ordinary customer interactions. A risk that's unlikely and low-impact (a brief vendor API version deprecation notice with a year of lead time) is worth one sentence acknowledging you considered it, and no further design effort. The risks that get management's and a panel's attention are the ones high on both axes — low-likelihood/low-impact risks don't deserve the same airtime, and treating every risk as equally urgent is itself a tell that a candidate hasn't actually prioritized anything.

## Three kinds of risk, not one

**Technical risk** is about whether the solution works as designed — governor limits, integration failure modes, data volume growing past what a pattern was built for. **Delivery risk** is about whether the team can actually build and ship it in the given timeframe — Meridian Outfitters' nine-month deadline (Lesson 1) is a delivery risk as much as the org-merge question is a technical one, since even the "don't merge the orgs" design still has to be built, tested, and launched on time. **Business risk** is about whether the organization, its customers, or its reputation are harmed even if the technical build succeeds — Brightwell Health's consent-record design (Lesson 3) exists specifically because the business risk of an unwanted health-related text message landing on a shared family phone is real even though nothing about that scenario is technically difficult to build correctly. A design that only ever discusses technical risk, and never delivery or business risk, is missing two-thirds of what a real engagement — and a real review board — cares about.

## A defensible design accepts some risk; it doesn't eliminate all of it

A common instinct is to try to engineer every identified risk down to zero, but that's neither realistic nor actually the standard a board or a client is holding a design to. The standard is that the highest-priority risks are visibly addressed by specific design choices, and the lower-priority ones are named, understood, and consciously accepted rather than silently ignored. Carrow Equipment's design (Lesson 4) accepts some residual risk that Salesforce Connect's live query to SAP could be slow during SAP's own peak load — the design doesn't eliminate that risk, it acknowledges it and notes that order-placement UX should show a loading state rather than assuming instant response, which is a proportionate response to a risk that's real but not severe enough to justify a bigger architectural investment.

## Key terms

| Term | Meaning |
|---|---|
| Likelihood/impact sort | Prioritizing risks by how probable they are and how severe the consequence would be if they occurred |
| Technical risk | Risk that the solution doesn't work as designed |
| Delivery risk | Risk that the team can't build and ship the solution in the given time and resources |
| Business risk | Risk of harm to the organization, customers, or reputation even if the technical build succeeds |
| Accepted risk | A lower-priority risk that is named and consciously tolerated rather than engineered away |

## Lab

Using Lesson 5's Public Sector Case Management scenario, identify one technical risk, one delivery risk, and one business risk. Rate each on likelihood and impact (high/medium/low), and state which one or two should visibly shape the design versus which should just be acknowledged and accepted.

## Check yourself

Can you explain why treating every identified risk as equally urgent is itself a design weakness, not a sign of thoroughness? Can you give one example each of technical, delivery, and business risk from any case study in this course?
