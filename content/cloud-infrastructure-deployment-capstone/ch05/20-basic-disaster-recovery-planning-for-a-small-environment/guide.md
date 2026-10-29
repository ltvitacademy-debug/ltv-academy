# Lesson 20 — Basic Disaster Recovery Planning for a Small Environment

**Chapter 5 · Backup & Disaster Recovery Basics · Lesson 20 of 32**

## What you'll learn

- What a **disaster recovery (DR) plan** actually needs to contain for a small-to-mid-size
  environment — not an enterprise architect's multi-region failover design
- Why RTO/RPO, tested backups, and a documented recovery procedure are the real, honest scope of
  what a job-ready cloud engineer owns
- Who needs to know **their role** before a disaster happens, not during one
- How this chapter's four lessons (RTO/RPO, backup policy, restore testing, and this plan) fit
  together into one coherent whole

## What this lesson is not

It's worth being explicit about scope, because "disaster recovery" can sound like it means
building active-active multi-region failover with automatic traffic shifting and a dedicated DR
site on standby. That's a real discipline, and large enterprises with dedicated DR architects do
build that. It is **not** what a cloud engineer owns for a small environment, and pretending
otherwise just means never actually finishing a DR plan because the bar was set at something
nobody on the team is resourced to build. The honest, job-ready scope is smaller and far more
achievable — and it's exactly the four things this chapter has already built toward.

## The four pieces of a real small-environment DR plan

A disaster recovery plan for a small environment is built almost entirely out of what the last
three lessons already covered, written down in one place:

1. **Known RTO and RPO** for each system (Lesson 17) — not guessed at during the incident, agreed
   on ahead of time.
2. **A configured backup policy** that actually satisfies those RPOs (Lesson 18) — not "we take
   backups," but backups frequent enough and retained long enough to matter.
3. **Backups that have actually been restore-tested** on a real cadence (Lesson 19) — not backups
   assumed to work because the job log says success.
4. **A documented recovery procedure** — the new piece this lesson adds: written steps for who
   does what, in what order, when a real outage happens.

```text
Small-environment DR plan (one page, not a binder):

System: Order database
  RTO: 4 hours        RPO: 1 hour
  Backup: AWS Backup plan, hourly, 30-day retention
  Last restore test: 2026-09-15 — passed
  Recovery steps: 1) Confirm outage with on-call  2) Restore latest
                  snapshot to new RDS instance  3) Repoint app config
                  4) Verify with smoke test  5) Notify stakeholders
  Owner: [named person], backup owner: [named person]
```

## The documented recovery procedure: the part people skip

Even teams that nail RTO/RPO, backup policy, and restore testing often stop short of writing down
the actual **steps** someone follows during a real incident — who restores what, in what order,
and who they tell. Without that written down, a 2 AM outage means someone improvising a recovery
procedure for the first time under pressure, even if every other piece was done right. The
procedure doesn't need to be long: it needs to name the exact resource to restore, the exact
command or console path to restore it with, and the exact person (by name or role, not "someone
on the team") who owns doing it.

## Ownership: knowing who, before it matters

The last piece a small environment's DR plan needs is **ownership** — a named person or role
responsible for each system's recovery, decided ahead of time, not sorted out by whoever happens
to be awake when the outage starts. This doesn't require a 24/7 NOC or a formal incident command
structure to be real; it just requires that the answer to "who restores this if it goes down" is
already written somewhere before the day it's needed, not improvised during the outage itself.
That's the honest, complete scope of DR planning this course asks a job-ready cloud engineer to
own: known objectives, a policy that meets them, proof the backups actually work, a written
procedure, and a named owner — not an enterprise DR architect's full multi-region mandate.

## Key terms

| Term | Meaning |
|---|---|
| Disaster recovery (DR) plan | The documented combination of RTO/RPO, backup policy, tested restores, and recovery procedure for a system |
| Recovery procedure | Written, specific steps for who restores what, in what order, during a real outage |
| Ownership | A named person or role responsible for a system's recovery, decided before a disaster, not during one |
| Enterprise DR scope | Multi-region failover and dedicated DR architecture — explicitly out of scope for this lesson's job-ready basics |

## Check yourself

You're ready for Lesson 21 when you can explain, without looking: what are the four pieces of a
basic DR plan for a small environment, and why does a written recovery procedure matter even if
RTO/RPO, backup policy, and restore testing are already all done correctly?
