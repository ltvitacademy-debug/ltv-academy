# Lesson 14 — RTO- and RPO-Driven Architecture Decisions

**Chapter 4 · Resilience and Disaster Recovery · Lesson 14 of 32**

## What you'll learn

- What **RTO** (Recovery Time Objective) and **RPO** (Recovery Point
  Objective) actually measure, and why they're different questions
- Why these two numbers, not a preference for a particular pattern,
  should be the thing that decides your DR architecture
- How RPO drives backup frequency and replication strategy, and how
  RTO drives standby capacity
- Why picking "active-active" before you know your RTO/RPO targets is
  backwards, and usually expensive

## Two different questions, one often confused for the other

**RTO — Recovery Time Objective** answers: *how long can this system
be down before the business impact is unacceptable?* It's measured in
time-to-restore — minutes, hours, days.

**RPO — Recovery Point Objective** answers a completely different
question: *how much data can we afford to lose, measured as time
since the last good copy?* An RPO of 15 minutes means that if disaster
strikes, you can tolerate losing whatever changed in the last 15
minutes — not that recovery itself takes 15 minutes.

Confusing the two is common and expensive. A system can have a tight
RTO (back up in 5 minutes) and a loose RPO (losing an hour of data is
fine) — think of a read-heavy content site where availability matters
far more than a few stale writes. Or the reverse: a loose RTO (a day
to restore is acceptable) with a tight RPO (losing even a minute of
transactions is not) — think of a financial ledger that can tolerate
some downtime but never a gap in its transaction history.

## Letting RPO drive backup frequency and replication

Once a workload has a real RPO target, the backup and replication
strategy falls out of it almost mechanically:

- **RPO of 24 hours** — a nightly backup job is genuinely sufficient.
  There's no need to pay for anything more sophisticated.
- **RPO of 1 hour** — nightly backups don't meet this; you need
  incremental backups or log shipping on an hourly cadence.
- **RPO of seconds, or zero** — only continuous, often synchronous,
  replication meets this. The secondary copy has to be updated as
  writes happen, not on a schedule.

Notice the direction of that reasoning: the business states how much
data loss it can tolerate, and *that* number tells you whether a
nightly `cron` backup job is adequate or whether you need database-level
synchronous replication. Starting from "we should have real-time
replication because it sounds more resilient" skips the step that
actually justifies the cost.

## Letting RTO drive standby capacity

RTO works the same way, but it drives a different decision: how much
infrastructure has to already exist, ready to take traffic, versus how
much can be built or restored after the disaster is declared.

- **RTO of days** — infrastructure can be rebuilt from Infrastructure
  as Code after the fact, and data restored from backup. No standing
  standby capacity is required at all, which is by far the cheapest
  option.
- **RTO of under an hour** — a **warm standby** is usually necessary:
  infrastructure that already exists in the DR region, running at
  reduced capacity, scaled up only when failover is declared.
- **RTO of seconds to minutes** — only a **hot standby**, running at
  full production capacity in the DR region already, can meet this.
  That capacity sits mostly idle until it's needed, and you pay for it
  the whole time.

A `terraform apply` that stands up an entire DR environment from
scratch might take twenty minutes once you include provider
provisioning time, DNS propagation, and application startup — which is
perfectly fine for an RTO measured in hours, and completely disqualifies
it for an RTO measured in minutes.

## Cost is the real tradeoff, and it should be explicit

Tighter RTO and RPO targets always cost more — in standing infrastructure
that sits idle most of the time, in replication tooling, in the
operational complexity of keeping a second environment current. That's
not a flaw in the model; it's the point of having the model. A business
should set RTO and RPO **per workload tier**, not as one blanket policy
for every system. The internal wiki does not need the same RPO as the
payments ledger, and building it to that standard anyway is just money
spent protecting against a cost the business never actually quantified.

## Key terms

| Term | Meaning |
|---|---|
| RTO (Recovery Time Objective) | The maximum acceptable time a system can be down before recovery — drives standby capacity |
| RPO (Recovery Point Objective) | The maximum acceptable data loss, measured as time since the last good copy — drives backup/replication frequency |
| Warm standby | DR infrastructure that already exists at reduced capacity, scaled up on failover |
| Hot standby | DR infrastructure already running at full capacity, ready to take traffic immediately |
| Cold / backup-restore DR | No standing DR infrastructure; everything is rebuilt and restored after a disaster is declared |

## Check yourself

You're ready for Lesson 15 when you can explain, without looking: given
a workload with an RTO of 4 hours and an RPO of 5 minutes, what backup
or replication strategy and what standby capacity would actually meet
those two targets — and why a nightly backup job alone would fail the
RPO even though it might satisfy the RTO?
