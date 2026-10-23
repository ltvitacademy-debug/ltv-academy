# Lesson 29 — Capstone Kickoff: a 5,000-Employee Organization

**Chapter 9 · Capstone: Enterprise Technical Architecture · Lesson 29 of 32**

## What you'll learn

- The organization this four-lesson capstone designs for, start to finish: Meridian Health Network
- Why its history as three separate hospital systems makes this a genuine architecture problem,
  not a toy exercise
- How to apply Chapter 2's single-instance-vs-multi-instance test to a real, specific situation
- Why Chapter 8's governance question has to be answered before a single module gets configured
- What it actually costs an organization when this foundational decision is gotten wrong

## The organization: Meridian Health Network

Meridian Health Network is the new parent holding company formed when three previously independent
hospital systems agreed to consolidate under one corporate umbrella: **St. Catherine's Medical
Center**, a 2,200-employee flagship hospital with outpatient clinics and the most mature IT
function of the three; **Lakeshore Regional Health**, two community hospitals totaling 1,600
employees, run for decades with a strong local-autonomy culture and real suspicion of "corporate"
mandates; and **Prairie View Health Partners**, a 1,200-employee rural network of a single hospital
and several clinics, whose IT function is the smallest and whose staff still remember a forced
systems consolidation eight years ago that went badly and cost two senior IT leaders their jobs.
Combined, Meridian Health Network has roughly 5,000 employees, three different legacy HR systems
(Workday at St. Catherine's, ADP Workforce Now at Lakeshore, a homegrown PeopleSoft-based module at
Prairie View), no shared IT service management platform, and a facilities function at each system
that still runs on phone calls and spreadsheets. The parent board wants one ServiceNow instance to
support IT service management, HR service delivery, and facilities management across all three
systems within eighteen months — and wants it done without repeating Prairie View's bad history.

## Question one: does this actually need more than one instance?

Chapter 2's instance-strategy lesson gave you the real test for a second production instance: is
there a genuine regulatory data-residency requirement that a single instance can't satisfy, or is
one of the business units truly independent — no operational need to ever share a customer record,
a CMDB, or a service catalog with the others? Apply that test honestly to Meridian. All three
systems operate in the same country under the same federal and state healthcare regulations, so
there's no data-residency argument for physical separation. And "independent" doesn't hold up
either: the whole reason the board is consolidating is that these three systems will increasingly
share patients through referrals, share corporate HR and finance functions, and need one combined
view of IT assets and incidents for executive reporting. By Chapter 2's own criteria, Meridian fails
both legitimate justifications for a second production instance. The historical autonomy is real
and matters — but it's a cultural and governance fact, not a technical one, and conflating the two
is exactly the mistake Chapter 2 warned against.

## Question two: what governance model actually fits three different cultures?

Technical feasibility isn't the whole problem. Chapter 8's governance question — who gets to make
which decisions, and how centralized or federated that authority should be — has to be answered
before any configuration work starts, precisely because Lakeshore's and Prairie View's cultures
are real and won't disappear just because a board memo says "one platform now." Prairie View's past
consolidation failure wasn't a technology failure; a post-mortem would likely show it was a
governance failure — decisions imposed top-down with no mechanism for a smaller system's legitimate
operational differences to be heard. Any architecture Meridian builds has to pair the technical
decision (one instance, as Question One established) with a governance model that gives each
hospital system a real, defined say in decisions that affect it specifically, while still having one
place where enterprise-wide decisions — security policy, upgrade cadence, data standards — get made
once and apply everywhere.

## Why this becomes an Architecture Decision Record, not a Slack thread

Chapter 1 introduced the ADR discipline specifically so that a decision like "one instance, with a
federated governance model" survives past the people in the kickoff meeting. Two years from now,
someone at Lakeshore will ask why they don't have their own instance the way they used to run their
own systems. Without a written record of the context (three merging systems, no real independence,
a real governance risk from Prairie View's history), the options actually considered, and the
reasoning behind the choice, that question has no durable answer — just whoever happens to remember
the kickoff conversation, if they're still around.

## The real stakes of getting this wrong

Getting the foundational instance-and-governance decision wrong doesn't fail quietly. Build three
siloed instances and Meridian pays Chapter 2's maintenance multiplier forever: three upgrade
schedules, three security models, three sets of integration endpoints for every shared vendor. Build
one instance with no real governance model and Meridian repeats Prairie View's history: decisions
imposed without local input, resentment, and eventually either quiet non-adoption or an expensive
re-architecture. The next three lessons work through the real decisions that follow from getting
this first one right.

## Key terms

| Term | Meaning |
|---|---|
| Independent business unit test | Chapter 2's criterion: does a unit have a genuine operational need to never share data or process with the others |
| Data residency requirement | A regulatory rule forcing certain data to stay physically within a region — not present at Meridian |
| Governance model | Chapter 8's question of who decides what, and how centralized or federated that authority is |
| Consolidation risk | The real organizational cost of imposing a platform decision without a mechanism for legitimate local input |

## Check yourself

Meridian's board asks why Lakeshore and Prairie View can't each just keep their own instance "since
they're used to running independently anyway." Using Chapter 2's actual test, explain why their
historical autonomy doesn't by itself justify a second production instance — and name the real
question this course would ask next.
