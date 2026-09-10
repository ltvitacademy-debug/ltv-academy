# Lesson 44 — Environments: Dev, Test, and Prod

**Chapter 3 · Production Data Engineering · Lesson 44 of 70**

## What you'll learn

- Why one workspace for everything is the single most common early mistake
- Three workspaces, one Deployment Pipeline — Lesson 15's mechanism, applied deliberately
- What actually differs between dev, test, and prod
- Why you never point a dev pipeline at real production data

## The mistake this fixes

Every lesson in this course so far has lived in one Fabric
workspace — reasonable for learning, genuinely dangerous for a real
system. One workspace means one place where an untested change, a
bad KQL query, or an Eventstream misconfiguration can affect the
same data real users depend on, with nothing standing between "I
changed something" and "it's live."

## Three workspaces, one pipeline

```
Dev workspace    -- where changes are made and broken safely
Test workspace   -- where changes are verified before anyone relies on them
Prod workspace   -- where real users and real Activator alerts live
```

Lesson 15's Deployment Pipeline is the exact mechanism that moves
item definitions between these three — not a new concept, but a
deliberate policy for using it: nothing skips from dev straight to
prod. Everything passes through test first, every time, with no
exceptions made because a change "seems small."

## What actually differs between environments

```
Dev:   small/sample data, relaxed permissions, break things freely
Test:  production-shaped data (not real data), same permissions as prod
Prod:  real data, tightly scoped permissions, real Activator alerts firing
```

The KQL queries, Eventstream logic, and dashboard tiles should be
**identical** across all three — that's the entire point of
Lesson 15's item-definition-only deployment model. What differs is
the data underneath and who can touch what, never the logic itself.

## Why dev never touches real production data

Testing a new KQL query against real trip data sounds convenient,
but a bug in that untested query could write bad data into the same
table real dispatchers are watching, or trigger a real Activator
alert to real people over a mistake. Test environments use
production-**shaped** data — same schema, same rough scale — that's
safe to break, precisely so a mistake in dev or test can never
reach someone relying on prod.

## Key terms

| Term | Meaning |
|---|---|
| Dev / Test / Prod | Three separate workspaces, each with a different purpose and audience |
| Item-definition-only deployment | Logic moves between environments; data and permissions don't (Lesson 15) |
| Production-shaped data | Realistic test data that's safe to break, never the real thing |

## Check yourself

You're ready for Lesson 45 when you can explain, without looking: why
should the KQL queries and Eventstream logic be identical across dev,
test, and prod, when almost everything else about them differs?
