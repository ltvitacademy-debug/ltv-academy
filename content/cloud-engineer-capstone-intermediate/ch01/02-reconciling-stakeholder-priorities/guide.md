# Lesson 2 — Reconciling Stakeholder Priorities

**Chapter 1 · Intermediate Capstone: Containers, CI/CD, and a Real Misconfiguration · Lesson 2 of 16**

## What you'll learn

- Priya's priority: reliability ahead of Driftwood's Spring collection launch, about ten weeks out
- Casey's priority: a repeatable, scalable platform instead of another one-off build
- Why those two priorities aren't actually in tension once you look at what each deliverable buys
- The single project plan Theo proposes, mapped to both asks

## Priya's angle: a launch is coming

Driftwood's Spring collection launch is roughly ten weeks away — the highest-traffic stretch of
the year for the storefront app. Priya's worry is specific: last time, one VM was a single point
of failure. A bad deploy, a disk filling up, or a traffic spike during launch week shouldn't mean
a 2am phone call. She wants something that survives a bad moment without her having to notice.

## Casey's angle: no more one-off builds

Casey's worry is different. Casey doesn't want Driftwood's infrastructure to be a collection of
systems that only work because Theo remembers exactly how he built them. Every piece of this
project should be describable in code, reviewable before it ships, and rebuildable by someone who
wasn't in the room the first time.

## These aren't actually competing asks

Laid out side by side, each of the four Lesson 1 deliverables turns out to serve both people at
once:

| Deliverable | Serves Priya (reliability) | Serves Casey (repeatability) |
|---|---|---|
| Containerize the app | Orchestration can restart a crashed instance automatically | The exact same image runs identically anywhere |
| Terraform | Infrastructure can be rebuilt fast after a bad change | No tribal knowledge — anyone can read the `.tf` files |
| CI/CD pipeline | Every deploy runs tests before it ships | No manual `kubectl` or portal clicks, ever |
| AWS backup target | A second copy of the app's data if Azure has a bad day | A defined, auditable DR process, not an ad hoc hope |

Nobody has to choose. The same four pieces of work satisfy a nervous IT Manager and a
platform-minded VP of Engineering, because reliability and repeatability turn out to be the same
coin, viewed from two directions.

## The one project plan

Theo writes a short scope document and brings it back to both of them:

**In scope:** containerize the storefront app (Lesson 3), provision Azure infrastructure —
networking, a container registry, and an AKS cluster — with Terraform (Lesson 4), build a GitHub
Actions CI/CD pipeline (Lesson 5), add an AWS S3 bucket as a backup target (Lesson 6), and wire up
nightly cross-cloud replication (Lesson 7) — all landing in a first real production deploy
(Lesson 8), well ahead of the Spring launch.

**Out of scope, for now:** migrating any part of the app to AWS, and multi-region failover inside
Azure. Those would be real projects on their own, and naming them explicitly as "not this time"
is part of what makes the scope document useful.

## Key terms

| Term | Meaning |
|---|---|
| Scope document | A short written statement of what's in and explicitly what's out of a project |
| Single point of failure | One component whose failure takes down the whole system, with nothing to take over |
| Snowflake environment | Infrastructure that only works because of undocumented, person-specific setup steps |
| Self-healing | A system (like a container orchestrator) that detects a failed instance and replaces it automatically |

## Lab

Fill in the two-column table yourself — Priya's concern, then Casey's concern — for each of the
four deliverables, before looking back at the table above. Where does your version differ, and
why?

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: why does Theo say these two
stakeholders' priorities aren't actually in tension, and what two things does the scope document
explicitly rule out?
