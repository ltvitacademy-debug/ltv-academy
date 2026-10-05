# Lesson 24 — Program Management Case Study

**Chapter 5 · Sustaining Governance · Lesson 24 of 25**

## What you'll learn

- A full walkthrough applying every chapter of this course to one
  realistic, fictional scenario
- How a program's launch decisions in year one directly determine
  which sustaining-phase problems show up in year two
- How roadmap, funding, and maturity assessment work together as one
  response to a single real threat, not three separate exercises
- What this course's closing advice is for running a program that
  has to survive past its first year

## The scenario (fictional, illustrative)

**Brightfield Agritech**, a fictional mid-sized precision-agriculture
company, launched a data governance program eighteen months ago to fix
a specific pain: agronomy field data (soil readings, yield estimates,
equipment telemetry) and the finance team's commodity-pricing data
disagreed constantly, and nobody could say with confidence which
feed a grower-facing report should trust. This is a realistic
composite of the kind of program this course exists to run — not a
real company's data or its real governance program.

## Chapter 1, applied: launching with the right shape

Brightfield's governance lead wrote a charter scoped to exactly two
domains — agronomy field data and commodity pricing — rather than "all
company data," and ran a stakeholder analysis that surfaced an
unexpected blocker early: the field-equipment vendor's data format,
not either internal team, was the actual root inconsistency. A
governance council was chartered with both domains represented, and
the first data stewards were named from inside each team rather than
hired in from outside — people who already understood the data,
following this course's guidance on stewardship and onboarding.

## Chapter 2, applied: policy before tooling

Before buying any new software, the council wrote one real policy: all
grower-facing yield figures must be sourced from the normalized
agronomy feed, not directly from vendor telemetry, with a defined
workflow for exceptions and a named escalation path when a grower
disputed a number. Decision rights were explicit — the agronomy
steward could approve a new field-sensor source; only the council
could approve a change to the normalization logic itself, since that
affected every report downstream.

## Chapter 3, applied: measuring what mattered

The team tracked exactly two KPIs tied to the original pain, not a
long vanity list: the number of grower-facing reports with a
disputed number per month, and the time to resolve a disputed number
when one occurred. Both appeared on a single dashboard the council
reviewed monthly, and the first quarter's exec report led with the
dispute count dropping from double digits to near zero — the same
kind of specific, measurable value Chapter 3 teaches executives
actually weigh.

## Chapter 4, applied: the part that almost failed

Here is where Brightfield's program nearly stalled. Field agronomists
— the people entering soil readings every day — saw the new workflow
as one more app slowing down their fieldwork, and adoption lagged
badly outside the original pilot team for months. The fix wasn't a
new policy; it was Chapter 4's playbook applied directly: a
communication plan that stopped talking about "governance" and started
talking about growers getting fewer disputed numbers, hands-on
training sessions run by a respected senior agronomist rather than the
governance team, and a direct, documented response to the loudest
resistance — a field manager who argued the workflow added a step with
no benefit to his team specifically, answered with data showing his
team's own disputed-report rate before and after.

## Chapter 5, applied: the part this lesson is actually about

Eighteen months in, three things converged at once, which is exactly
why this course's final chapter exists:

- **Maturity assessment (Lesson 23):** scored high on policy and
  measurement, but only "developing" on adoption outside the original
  pilot team — matching the Chapter 4 struggle almost exactly, which
  is the assessment doing its job.
- **Roadmap (Lesson 21):** the adoption gap moved from "Later" to
  "Now" on the backlog, ahead of a planned expansion into a third
  domain that had been sitting in "Next" — evidence-driven
  re-sequencing, not a guess.
- **Funding (Lesson 22):** a company-wide cost review threatened the
  program's budget the same quarter. The value realization report led
  with the dispute-rate drop and the resolution-time improvement,
  framed for the CFO specifically as rework and risk avoided, and the
  budget was retained at its run-rate level — with the field-vendor
  data-format fix named explicitly as the next funded initiative.

## The result

Two years in, Brightfield's program hasn't needed a single new "launch"
— the same charter, council, and stewards from Chapter 1 are still
running it, now informed by a maturity assessment and a re-sequenced
roadmap instead of by guesswork. The adoption gap closed over the
following two quarters once training and communication matched the
people actually doing the work, not just the people who approved the
policy.

## This course's closing advice

A program's hardest problems rarely show up at launch — they show up
eighteen months in, when the first budget cycle ends, the first
champion gets reassigned, or the group that wasn't in the original
pilot has to adopt something they didn't help design. Chapter 5 exists
because surviving that moment takes the same rigor as Chapter 1's
launch: a roadmap that responds to evidence, a budget defended with
delivered value, and a maturity assessment honest enough to say which
dimension is still weak instead of only celebrating the ones that
aren't.

## Lab

Pick one governance program you've studied across this course (your
own organization's, Brightfield's, or a composite). Write three short
paragraphs: which dimension would score weakest in a maturity
assessment today, what roadmap horizon that gap belongs in, and one
sentence of how you'd frame that gap's cost to whichever executive
holds the budget.

## Check yourself

Can you walk through the Brightfield Agritech scenario from memory,
chapter by chapter, and explain why the program's year-two problems
were really about adoption and funding, not about anything that went
wrong with the original charter or policy?
