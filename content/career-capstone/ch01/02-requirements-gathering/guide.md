# Lesson 2 — Requirements Gathering: Functional vs. Non-Functional

**Chapter 1 · System Design for Data Engineers · Lesson 2 of 81**

## What you'll learn

- Functional requirements — what the system must actually do
- Non-functional requirements — how well it has to do it
- Why skipping this step is the single most common design mistake
- Turning a vague prompt into real requirements, using this track's own data

## Two different kinds of requirement

```
Functional:      "Show trip counts and average fare per vendor,
                  per hour, on a dashboard."
Non-functional:  "The dashboard must update within 5 minutes of a
                  trip completing, and stay available 99.9% of the time."
```

A **functional requirement** describes *what* the system does —
the feature itself. A **non-functional requirement** describes
*how well* it has to do it — speed, reliability, cost, scale.
Both are necessary, and neither is sufficient alone: a system that
does the right thing slowly, or the wrong thing quickly, both fail
the actual goal.

## Why skipping this step is the most common mistake

A vague prompt like "build a real-time dashboard for taxi trips"
doesn't actually specify a single non-functional requirement.
Jumping straight to "I'll use an Eventstream and a KQL Database"
(Fabric Lessons 19, 21) without first asking "how real-time does
real-time actually need to be?" risks over-building — Chapter 2 of
the Fabric course's entire hopping-window vs. tumbling-window
distinction (Lessons 30–31) only matters once you know the actual
freshness requirement.

## Turning a vague prompt into real requirements

```
Vague prompt:  "Build a system to analyze NYC taxi trips."

Functional questions to ask:
- Analyze for whom -- dispatchers, riders, city regulators?
- What decisions does this data drive?

Non-functional questions to ask:
- How fresh does the data need to be -- seconds, minutes, next-day?
- How many trips per day -- thousands, millions?
- What happens if the system is down for an hour?
```

Every one of these questions has a different correct system design
depending on the answer. A city regulator reviewing monthly
compliance reports needs none of Chapter 2 of the Fabric course's
real-time machinery at all; a live dispatcher dashboard needs most
of it.

## The SLA connection

Fabric Lesson 56 already covered SLAs and SLOs as the mechanism for
turning "fast enough" into an actual number. Requirements gathering
is where that number *comes from* in the first place — an SLO is
meaningless without a real requirement driving it, and a real
requirement is meaningless until it's been made concrete enough to
turn into one.

## Key terms

| Term | Meaning |
|---|---|
| Functional requirement | What the system must do — the feature itself |
| Non-functional requirement | How well it must do it — speed, reliability, cost, scale |
| Requirements gathering | Turning a vague prompt into concrete answers before choosing tools |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: why
can a system that does the right thing still fail, if it does it too
slowly or unreliably?
