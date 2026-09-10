# Lesson 65 — Blue-Green and Canary Deployments for Pipelines

**Chapter 3 · Production Data Engineering · Lesson 65 of 70**

## What you'll learn

- Refining Lesson 45's "deploy to prod" into two safer patterns
- Blue-green — two full environments, an instant switch, an instant rollback
- Canary — a small slice of real traffic first, then a gradual expansion
- Choosing between them for a real-time pipeline specifically

## Refining a single deploy step

Lesson 45's CI/CD pipeline treated "deploy to prod" as one step: the
new version goes live, all at once, for everyone. That's fine for a
low-risk change. For anything riskier — a new Window transformation
logic, a change to how `FareAmount` gets computed — two more careful
patterns exist, both aimed at limiting how much can go wrong before
anyone notices.

## Blue-green — two environments, an instant switch

```
Blue (current prod):   receiving all live trip events right now
Green (new version):   fully deployed, running, but receiving nothing yet

Switch: redirect the Eventstream's traffic from Blue to Green, all at once
Rollback: redirect it back to Blue, just as instantly, if something's wrong
```

**Blue-green** keeps two complete, independent environments running
side by side. The new version (green) is fully live and tested
before it ever receives real traffic — the actual switch is just a
routing change, which means rolling back is equally instant: point
traffic back at blue, and the old version is immediately serving
again, with nothing to "undo" in the new version itself.

## Canary — a small slice first

```
Route 95% of trip events to the current Window transformation
Route 5% of trip events to the new Window transformation
Watch: does the 5%'s output look correct? (Lesson 52's observability)
If yes -- increase to 25%, then 50%, then 100%
If no  -- route the 5% back, investigate, before it ever reaches everyone
```

**Canary** takes the opposite approach: instead of switching
everyone at once, a small percentage of real traffic goes to the
new version first, observed closely, before gradually increasing.
A bug affects only that small slice, not the whole system, and gets
caught with real production data instead of only production-shaped
test data (Lesson 44) — which occasionally reveals problems test
data genuinely can't.

## Choosing between them for a real-time pipeline

Blue-green suits a clean, all-or-nothing logic change where a
gradual rollout doesn't make sense — an Eventstream's storage
destination, for instance, can't sensibly be half-migrated. Canary
suits a change where "does this look right on real traffic" is a
meaningful, gradual question — a new aggregation logic in a Window
transformation, where correctness is easier to judge by watching
actual output than by declaring it correct in advance.

## Key terms

| Term | Meaning |
|---|---|
| Blue-green | Two full environments, an instant all-or-nothing switch and rollback |
| Canary | A small percentage of real traffic first, expanded gradually if it looks right |

## Check yourself

You're ready for Lesson 66 when you can explain, without looking: why
does a canary deployment sometimes catch bugs that production-shaped
test data (Lesson 44) genuinely can't?
