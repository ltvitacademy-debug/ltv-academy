# Lesson 1 — The Business Ask: A Board-Level HA/DR and Compliance Mandate

**Chapter 1 · Scoping the Production-Grade Platform · Lesson 1 of 26**

## What you'll learn

- The business scenario this entire capstone is built around
- Why a competitor's breach, not an internal finding, is what triggered this mandate
- The four concrete deliverables the board actually asked for
- How this capstone differs from the Beginner and Intermediate Azure Database Engineer capstones

## The company: Overlook Medical Group

**Overlook Medical Group** is a regional healthcare provider network — patient records,
appointment scheduling, and billing, running on Azure SQL. You've already met this company in two
earlier capstones in this path:

- The **Beginner** capstone built real backup and restore discipline for Overlook's database —
  before that project, backups existed only as a half-remembered habit, not a tested process.
- The **Intermediate** capstone diagnosed and fixed real performance problems in that same
  database — the kind of slow queries and blocking that show up once an application has real
  users and real data volume.

Both of those projects were started and finished by one person, solving one problem at a time.
This capstone is different, and the reason it's different is business, not technical.

## What actually triggered this project

A competitor healthcare network suffered a public data breach — it was in the news, patient
records were exposed, and it cost that competitor money, trust, and (reportedly) a drawn-out
regulatory response. Overlook's leadership read the same news everyone else did, and asked their
own board a question nobody likes being asked cold: **"Could that happen to us, and would we even
survive it if it did?"**

The honest answer, at the time, was no one actually knew. Overlook's database had never been
through a real disaster recovery test. Access to patient data was granted informally, over time,
by whoever happened to be on call. There was no audit trail a compliance officer could actually
hand to a regulator. And every piece of infrastructure that existed had been clicked together by
hand in the Azure Portal, with no record of exactly how, by whom, or whether it could be rebuilt
the same way twice.

## The board's four-part mandate

The board didn't ask for a vague "improve security." They asked for four specific, testable
things:

1. **A real, documented, tested disaster recovery plan** — with actual recovery point and
   recovery time targets, not a hope that backups exist somewhere.
2. **A real security and compliance posture** for patient data — encryption, least-privilege
   access, and an audit trail that holds up under a regulator's questions.
3. **Real automation** — health checks, backup verification, and alerting that don't depend on
   one person remembering to run a script.
4. **Infrastructure defined as code** — so the environment can be reviewed before it's deployed,
   and rebuilt identically if it ever needs to be.

Every chapter in this capstone builds exactly one of those four things, for real, against this
same company and the same database.

## Why this is the Advanced tier, not a repeat of Beginner or Intermediate

The Beginner and Intermediate capstones each solved one problem, manually, as an individual
contributor reacting to a known issue. This capstone is what happens after leadership decides one
person's tribal knowledge isn't an acceptable foundation for a healthcare company's production
database anymore. That's a genuinely different kind of work: provisioning through code review
instead of portal clicks, security controls a compliance officer can verify instead of trusting a
DBA's word, a DR plan that gets *tested under pressure* instead of assumed to work, and automation
that runs whether or not any specific person is on shift.

## What's ahead

The next lesson plans the architecture end to end — Bicep-provisioned infrastructure, security and
compliance controls, HA/DR, PowerShell automation, and a Data Factory ETL feed — before a single
piece of it gets built. Everything after that follows the plan.

## Key terms

| Term | Meaning |
|---|---|
| Overlook Medical Group | The fictional healthcare provider network this entire capstone is built around |
| Board-level mandate | A requirement coming from company leadership/governance, not from an individual DBA's own initiative |
| RPO / RTO | Recovery Point Objective / Recovery Time Objective — the concrete targets this capstone's DR plan has to meet (Chapter 4) |
| Infrastructure as Code (IaC) | Defining infrastructure in reviewable files instead of manual Portal clicks (Chapter 2) |

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: what are the board's four
specific deliverables, and why did a competitor's breach — not an internal audit — create the
pressure to finally build them?
