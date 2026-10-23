# Lesson 7 — Platform Architecture Lab

**Chapter 2 · Platform Architecture · Lesson 7 of 32**

## What you'll learn

- How to apply the instance-strategy decision from Lesson 4 to a real acquisition scenario
- How to recognize when Domain Separation would have sufficed, by contrasting this scenario against the more typical case
- How to draw a scoped-application boundary between a parent company's existing apps and a newly acquired subsidiary's needs
- How these three decisions — instance strategy, domain strategy, and scope boundaries — depend on each other rather than being made independently

## The scenario

LTV Industries, a mid-size company already running one ServiceNow production instance, has just
acquired a subsidiary headquartered in a country with a strict data-residency law: a defined
category of personal data belonging to that country's residents must physically remain within that
country's borders, not merely be access-restricted from outside it. The subsidiary runs its own
HR case management and its own incident process, uses some of the same ITSM concepts LTV Industries
already has configured, and will eventually need limited reporting visibility shared back to the
parent company's leadership. You're the Technical Architect asked to recommend the platform
architecture for bringing this subsidiary onto ServiceNow.

## Step 1 — Is a second production instance genuinely justified here?

Lesson 4's framework says: don't default to a second production instance — confirm the constraint
is real and can't be satisfied another way first. Here, that test comes back differently than it
usually does. The subsidiary's data-residency law requires certain personal data to physically stay
within that country's infrastructure. Domain Separation partitions data *logically* within one
instance, but the instance itself still runs on infrastructure in specific ServiceNow data-center
regions — it doesn't relocate underlying storage per domain. If LTV Industries' existing instance's
region can't satisfy the subsidiary's residency requirement, no amount of logical separation inside
that same instance fixes it. **This is the rare case where a second, regional production instance
is the right call** — not because the subsidiary is organizationally independent, but because the
law leaves no other path.

## Step 2 — Contrast with the far more typical acquisition

It's worth being explicit about why this case is unusual, because most acquisitions aren't like
this. If LTV Industries acquired a second subsidiary next year with no data-residency constraint —
just an ordinary business in the same regulatory environment — Lesson 4's default would apply
cleanly: don't stand up a second production instance just because it's a different legal entity.
Domain Separation would almost certainly suffice: give that subsidiary its own domain, keep its
incident and HR case data invisible to unrelated parts of the parent company, and let the parent's
top domain retain whatever cross-subsidiary reporting visibility leadership actually needs. The
residency law is the one fact in this scenario that flips the recommendation — remove it, and the
answer changes from "second instance" to "Domain Separation inside the existing one."

## Step 3 — Planning the scoped-application boundary

Even with a second, regional production instance for the data-residency-bound subsidiary, the
scope-boundary question from Lesson 6 still applies *inside* that new instance. The subsidiary's HR
case management and incident process are owned and operated by the subsidiary's own team, on their
own release cadence — that's a clean functional and ownership boundary, so they get their own
scoped application(s) rather than being forced into a copy of the parent's existing scope. Where the
subsidiary genuinely reuses ITSM concepts the parent already built well (a shared incident
categorization scheme, for instance), the right move isn't rebuilding it from scratch locally — it's
publishing that shared logic as its own versioned scoped application in the Application Repository,
so the subsidiary's instance pulls a specific, pinned version of it rather than re-implementing it
or depending on an always-changing copy.

```
Parent's existing instance:          Subsidiary's regional instance:
- parent's own scoped apps           - subsidiary's own HR/incident
  (unchanged)                           scoped apps (own team, own
- shared ITSM logic published as       release cadence)
  its own versioned scoped app      - pulls a PINNED version of the
                                        shared ITSM logic app, not
                                        always-latest
```

## Pulling the three decisions together

Notice the order these decisions actually depend on each other: the data-residency law determines
instance strategy first, because that constraint can't be satisfied logically. Only once the
instance topology is settled does the Domain Separation question become relevant *within* each
instance individually (does the subsidiary's own instance need further domain separation for its
own internal units? Possibly not, if it's small enough). And scope boundaries are decided last,
based on real team ownership, independent of which instance the resulting scoped applications
happen to live on. A Technical Architect who reaches for Domain Separation or scope-splitting
before confirming the instance question first is solving the wrong layer of the problem.

## Key terms

| Term | Meaning |
|---|---|
| Data-residency-driven instance | A second production instance justified by a regulatory requirement that logical separation alone can't satisfy |
| Typical acquisition case | An acquisition with no residency constraint, where Domain Separation inside the existing instance is the expected answer |
| Shared scoped application | Reusable logic published as its own versioned scoped application, consumed by a pinned version rather than rebuilt locally |
| Decision ordering | Instance strategy is decided first, Domain Separation second (within an instance), scope boundaries last |

## Check yourself

If LTV Industries' data-residency law had instead only restricted *where data could be viewed from*,
not where it had to physically reside, would the recommendation in Step 1 change — and to what?
