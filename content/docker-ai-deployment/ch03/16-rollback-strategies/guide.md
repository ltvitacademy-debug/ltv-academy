# Lesson 16 — Rollback Strategies

**Chapter 3 · Deployment Patterns · Lesson 16 of 25**

## What you'll learn

- Why "rollback" means something different for blue-green vs. a rolling update
- What has to be true *before* a release for a fast rollback to actually be possible
- The AI-specific rollback case a plain web app never has to think about:
  rolling back the model without rolling back the code, or vice versa
- Why the real goal is detecting the need to roll back quickly, not just
  having a rollback mechanism

## Rollback means something different per pattern

Chapter 3 covered two release patterns, and "rollback" works differently
in each:

```
Blue-green rollback:
  flip routing back to blue -- the OLD environment never stopped
  running, so this is as fast as the original cutover was

Rolling-update rollback:
  run the SAME rolling process in reverse -- old version
  replaces new, instance by instance -- not instant, takes
  roughly as long as the forward rollout did
```

That's the real trade-off between the two patterns from Lessons 14-15:
blue-green's extra cost buys a rollback that's just as fast as the
deploy was; a rolling update's lower cost means its rollback is just as
gradual as its rollout was.

## What has to be true beforehand

A fast rollback isn't automatic — it depends on choices made before the
release even happens:

```
Required for a real rollback option:
  - the PREVIOUS image tag is still in the registry (Lesson 6),
    not overwritten or deleted
  - the previous image's config (env vars, resource limits)
    is recorded somewhere, not just "whatever it was"
  - database/schema changes in the new version are backward
    compatible with the old version's code, or rollback breaks data
```

That last point is easy to miss: if the new release changed a database
schema and you roll the *application* back without also reversing the
schema change, the old code can crash against the new schema. A safe
rollback plan is written before the release, not improvised during an
incident.

## The AI-specific case: model vs. code

A plain web app has one thing to roll back: the code. An AI app often has
two independent things that can each go wrong on their own:

```
Two separate rollback targets:
  Application code   (the serving logic, API, container image)
  Model / weights     (what's actually loaded and doing inference)

A bad release can be:
  - bad code, same model       -> roll back code only
  - same code, bad model        -> roll back model/weights only
  - both                        -> roll back both
```

Treating "redeploy the previous image" as the only rollback lever misses
cases where the code was fine and a newly-promoted model checkpoint was
the actual problem — which is common enough that model version and app
version are usually tracked, and rolled back, independently.

## Detection matters more than the mechanism

A rollback that takes 30 seconds is useless if it takes an hour to notice
something's wrong. The real first step of any rollback strategy is
automated detection — error rate, latency, and (for AI apps) output
quality signals — wired to actually trigger the rollback, not a human
noticing a spike in a dashboard by chance.

## Key terms

| Term | Meaning |
|---|---|
| Blue-green rollback | Flip traffic back to the still-running old environment — fast |
| Rolling-update rollback | Run the rollout in reverse, instance by instance — gradual |
| Schema compatibility | The old code must still work against the new schema, or rollback breaks |
| Model vs. code rollback | An AI app can need either rolled back independently, not just both together |

## Check yourself

You're ready for Lesson 17 when you can explain: why might rolling back
the application code NOT fix a bad release, if the actual problem was a
newly-promoted model checkpoint?
