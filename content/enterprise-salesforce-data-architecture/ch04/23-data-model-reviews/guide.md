# Lesson 23 — Data Model Reviews

**Chapter 4 · Applying Data Architecture · Lesson 23 of 26**

## What you'll learn

- Why a data model needs a recurring review process, not just a one-time design-phase sign-off
- What a structured data model review actually checks, beyond "does it work"
- The specific warning signs a review should be designed to catch
- How review cadence should scale with how much the org is changing

## Design-time review isn't enough

Every data model this course has covered — relationship design, master-detail vs. lookup, Big Objects, ownership models — gets a design review when it's first built. That one-time review catches problems that are visible at launch. It does nothing for the problems that only appear after six months of real usage: a field nobody uses anymore, a lookup relationship that's accumulated far more child records than anyone planned for, a custom object that's drifted from its original purpose because three different teams have each bolted their own meaning onto it. A **data model review** is a recurring, structured look at the schema as it actually exists in production, not as it was designed — and it exists specifically to catch the drift that no design-time review could have anticipated.

## What a structured review actually checks

A real data model review isn't an open-ended "does anything look wrong" conversation — it works through a consistent checklist so it catches the same categories of problem every time, regardless of who's running it:

- **Unused fields and objects.** Fields with no values populated in a meaningful fraction of records, or custom objects with no recent record creation, are candidates for retirement — every unused field is still a column Salesforce has to account for, still something a new admin has to puzzle over, and still a source of confusion in reports.
- **Relationship health.** Lookup or master-detail relationships where the child-record count per parent has grown far beyond what the relationship was designed for are a skew risk (Lesson 11) that a review should flag before it becomes a production incident, not after.
- **Classification and ownership drift.** Does every object still have a clear owner and an accurate sensitivity classification, or has reorganization left some objects with no one who can speak to why they exist or who's accountable for them?
- **Duplicate or overlapping objects.** Two custom objects that have independently grown to capture nearly the same concept — often a sign that two teams built similar things without discovering each other's work — are a consolidation opportunity.
- **Automation load.** A growing count of triggers, Flows, and validation rules on the same object, especially if some were built to work around limitations of others, is itself a data-architecture signal worth surfacing in a review, even though automation isn't a schema element per se.

## Who runs it, and how often

A data model review is naturally owned by the data architecture function (however that's organized — a dedicated architect, a center of excellence, a governance committee) with input from the business-side data owners (Lesson 14) who can speak to whether a field or object still matches a real business need. Cadence should scale with the rate of change: an org adding new integrations and custom objects monthly needs a far more frequent review than a stable org that rarely changes its schema. A common pattern is a lightweight review on a regular cadence (quarterly or semi-annually) plus a mandatory review triggered by any major event — a merger, a new business unit launch, a major release — rather than waiting for the next scheduled date.

## The output has to be actionable

A review that just produces a list of observations without an owner and a timeline for each one is close to worthless — the whole point of making this a recurring process is that findings get *acted on*, not re-discovered and re-documented at the next review with nothing having changed in between. Each finding needs an assigned owner and a disposition: fix now, schedule for the next release, or explicitly accept the risk and document why.

## Key terms

| Term | Meaning |
|---|---|
| Data model review | A recurring, structured assessment of a schema as it exists in production, distinct from a one-time design review |
| Schema drift | The gradual divergence between a data model's original design intent and its actual, evolved state |
| Relationship health check | Reviewing whether a relationship's actual child-record volume still matches what it was designed to handle |
| Review cadence | How frequently a data model review runs, typically scaled to how fast the org's schema is changing |

## Lab

An org has run for four years without a single data model review. Before the first one, list the five categories this lesson names (unused fields/objects, relationship health, classification/ownership drift, duplicate objects, automation load) and, for each, write one specific example of what a reviewer might realistically find in a four-year-old, never-reviewed org, and what action each finding should produce.

## Check yourself

Can you name the five categories a structured data model review checks, beyond simply "does it still work"? Can you explain why a review's cadence should scale with the rate of change in the org, rather than being fixed at the same interval for every org regardless of how much is changing?
