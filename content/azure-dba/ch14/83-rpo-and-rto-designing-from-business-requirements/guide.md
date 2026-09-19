# Lesson 83 — RPO & RTO — Designing from Business Requirements

**Chapter 14 · High Availability & Disaster Recovery · Lesson 83 of 95**

## What you'll learn

- What RPO and RTO actually measure, in plain terms
- Why they're business decisions first, and technology choices second
- How to derive real numbers from a stated business requirement instead of guessing
- How Chapter 13's backup strategy directly determines your achievable RPO

## Two numbers, two different questions

Recovery point objective (RPO) and recovery time objective (RTO) are the
two numbers that drive every HA/DR decision in this chapter, and they
answer two different questions:

| Term | Question it answers | Measured in |
|---|---|---|
| RPO — Recovery Point Objective | How much data are we willing to lose? | A span of time (e.g. "at most 15 minutes of data") |
| RTO — Recovery Time Objective | How long can we be down before we're back? | A span of time (e.g. "at most 1 hour of downtime") |

Neither one is a technology. RPO is not "we use log shipping." RTO is not
"we use Always On." They are business statements about acceptable pain,
made *before* anyone picks a tool — and the tool only gets chosen once
those numbers exist.

## Business decisions first, technology second

The mistake this lesson exists to prevent: picking a HA/DR technology
because it sounds impressive, then backing into whatever RPO/RTO it
happens to deliver. That's backwards. The real process runs the other
direction:

1. Ask the business: "if this system goes down, how much recent data can
   we afford to lose, and how long can we afford to be down?"
2. Write those answers down as RPO and RTO — in minutes or hours, not
   vague words like "not much" or "fast"
3. Only then choose a mechanism capable of hitting those numbers

A payroll system that runs once a month has a very different RPO/RTO than
a trading platform processing orders every second. There's no universally
"correct" RPO — it's correct only relative to what that specific business
actually needs and can afford.

## Deriving real numbers from a real requirement

Take a stated business requirement and work it into actual numbers:

*"Our order-processing database can't lose more than a few minutes of
orders, and if it goes down during business hours, we need to be back
within 30 minutes or we start losing customers to a competitor."*

That sentence converts directly:

```
Stated requirement                          RPO / RTO
"can't lose more than a few minutes"    ->   RPO = 5 minutes
"back within 30 minutes"                ->   RTO = 30 minutes

What that RPO rules out: nightly-only backups (RPO would be ~24 hours)
What that RPO requires: log backups/replication at least every 5 minutes
What that RTO rules out: manual restore-from-tape recovery
What that RTO requires: an automated or near-automated failover mechanism
```

Once the numbers are explicit, the technology choice almost picks itself —
and it's now defensible: you're not guessing, you're matching a mechanism
to a written requirement.

## Where this connects to backups

Chapter 13's backup strategy feeds directly into this chapter's RPO
calculation. Recall that log backups are the only backup type giving
point-in-time recovery — so your RPO can never be tighter than your log
backup frequency. If log backups run every 15 minutes, 15 minutes is the
best RPO physically possible from that strategy alone, no matter what
disaster recovery technology sits on top of it. Faster RPO requirements
push you toward continuous replication mechanisms (Always On, geo-
replication) rather than periodic backups at all.

## Key terms

| Term | Meaning |
|---|---|
| RPO (Recovery Point Objective) | The maximum acceptable amount of data loss, measured in time |
| RTO (Recovery Time Objective) | The maximum acceptable amount of downtime, measured in time |
| Business requirement | The stated, real-world tolerance for loss/downtime that RPO and RTO are derived from |

## Check yourself

You're ready for Lesson 84 when you can explain, without looking: given a
stated business requirement like "we can't lose more than 5 minutes of
data," why can't a nightly-backup-only strategy ever satisfy that RPO, and
in what order should RPO/RTO and technology choice actually happen?
