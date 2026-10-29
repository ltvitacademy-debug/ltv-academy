# Lesson 28 — Disaster Recovery for Models and Training Infrastructure

**Chapter 7 · Scaling and Reliability for AI Infrastructure · Lesson 4 of 4**

## What you'll learn

- Why model artifacts and training checkpoints are critical assets
  that need the same backup and replication discipline you'd already
  apply to a production database
- How to set different RPO targets for checkpoints versus the
  production model registry, instead of one blanket backup policy
- Why a DR plan for AI infrastructure has to account for a failure
  mode ordinary DR planning doesn't: the failover region might not
  have the GPU capacity you need, even if everything else works
- What a realistic DR runbook for ML infrastructure actually tests

## The same DR discipline, applied to a different set of assets

Earlier in this path, disaster recovery meant protecting databases,
application state, and configuration: define an RTO (how long you can
be down) and an RPO (how much data you can afford to lose), then build
backup, replication, and failover to meet both. None of that changes
for AI infrastructure — what changes is the asset list. **Model
artifacts** (the trained weights that get deployed to serve
predictions) and **training checkpoints** (intermediate saves during a
long training run) are exactly as critical as a production database,
and exactly as capable of being lost permanently if nobody treats them
that way. A corrupted or deleted checkpoint can mean redoing weeks of
GPU-hours; a lost production model artifact can mean an outage with no
fast way back.

## Different assets need different RPOs

Not every ML artifact deserves the same backup policy, because losing
each one costs something different:

- **The production model registry** — the versioned, currently-served
  model artifacts — should have a near-zero RPO. These rarely change
  (a new version lands occasionally, not continuously), so replicating
  them to a secondary region synchronously or near-synchronously is
  cheap relative to what losing one would cost: an outage with no
  known-good model to fail back to.
- **Training checkpoints** — intermediate saves during a long run —
  can tolerate a larger RPO, because the cost of losing the most
  recent one is bounded and known: it's the GPU-hours since the last
  successful checkpoint, not an indefinite loss. The right RPO here is
  a business decision about how much re-training time you're willing
  to risk, balanced against how much checkpointing overhead you're
  willing to pay during every run.

```
# Illustrative: replicating a model registry and
# checkpoint store to a secondary region
az storage blob copy start-batch \
  --source-container model-registry \
  --destination-container model-registry-replica \
  --account-name primaryregistry \
  --destination-account-name secondaryregistry

aws s3 sync s3://training-checkpoints/run-482/ \
  s3://training-checkpoints-dr-replica/run-482/ \
  --storage-class STANDARD_IA
```

## The failure mode ordinary DR planning doesn't anticipate

A traditional DR plan for a stateless web service usually assumes
that, once you fail over, the secondary region can simply provide
equivalent compute on demand. That assumption breaks for GPU-backed
workloads, for exactly the reason covered in Lesson 25: the failover
region might not have the GPU SKU you need sitting available, even
though every other part of the failover — networking, data
replication, DNS — works perfectly. A DR plan that doesn't explicitly
address this isn't actually a complete plan; it's a plan that works
right up until the moment it needs GPU capacity that isn't there.

Addressing it means the same tools from Lesson 25, applied to DR
specifically: either hold a standing capacity reservation in the
failover region sized for your DR scenario, or define an explicit,
pre-approved degraded mode (a smaller model, a CPU-only serving path,
reduced request volume) that the failover plan falls back to when full
GPU capacity isn't available. Deciding this during an actual incident,
instead of in the plan, is how DR exercises turn into prolonged
outages.

## What a real DR runbook for ML infrastructure tests

A DR plan that's never exercised is a guess. A realistic runbook for
ML infrastructure periodically tests: restoring a model from the
registry's secondary-region replica and confirming it serves correct
predictions, not just that the file copied; restoring a training run
from its most recent checkpoint and confirming training resumes
correctly; and failing inference traffic over to the reserved or
degraded-mode capacity in the secondary region and confirming it
actually serves traffic within the latency SLOs from Lesson 27. Each
of those is a distinct test, because each protects against a
different failure.

## Key terms

| Term | Meaning |
|---|---|
| Model artifact | The trained, versioned weights deployed to serve predictions — treated with near-zero RPO in a production model registry |
| Training checkpoint | An intermediate save during a long training run; its acceptable RPO is a business decision about tolerable re-training time |
| RPO (Recovery Point Objective) | The maximum acceptable amount of data or work lost in a failure, set differently for checkpoints versus production models |
| Degraded mode | A pre-approved fallback (smaller model, CPU-only serving, reduced volume) a DR plan uses when full GPU capacity isn't available in the failover region |

## Check yourself

You've completed Chapter 7 when you can explain, without looking: why
should a production model registry and a training checkpoint store
have different RPOs, and what failure mode must an AI infrastructure
DR plan account for that a typical stateless-service DR plan doesn't?
