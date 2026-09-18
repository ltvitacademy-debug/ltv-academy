# Lesson 23 — Managed vs. Self-Hosted Kafka

**Chapter 5 · Kafka in the Cloud · Lesson 23 of 30**

## What you'll learn

- The real trade-off between managed Kafka (Confluent Cloud, Event Hubs) and self-hosted Kafka
- What "ops burden" actually means in concrete terms, not just as a buzzword
- Why self-hosting can be cheaper at very large, sustained scale
- A practical framework for which a real team should choose, and when

## The trade-off, stated honestly

Lessons 21 and 22 covered two managed paths: Confluent Cloud (real
Kafka, fully operated by Confluent) and Azure Event Hubs (a
Kafka-compatible endpoint, fully operated by Microsoft). Self-hosting
means running the brokers, ZooKeeper/KRaft (Lesson 14), and everything
else from Chapters 1–3 yourself — on your own VMs, your own
Kubernetes cluster, or your own data center. Neither option is simply
"better" — they trade different costs for different control.

## What "ops burden" concretely means

This isn't an abstract concern. Running Kafka yourself means someone
on the team is responsible for:

- **Capacity planning**: sizing broker count, disk, and network for
  peak throughput, ahead of time, and re-sizing as load grows.
- **Patching and upgrades**: applying Kafka version upgrades and
  security patches to every broker, without downtime, on your own
  schedule.
- **Replication and failure recovery** (Lesson 11): actually handling
  a broker failure at 3 a.m. — not just reading about how replication
  protects you, but being the one who confirms it worked.
- **ZooKeeper/KRaft operation** (Lesson 14): running and monitoring
  the cluster metadata layer itself, which has its own failure modes.
- **Monitoring** (Lesson 24): building and maintaining the
  observability that catches a problem before it becomes an outage.

A managed service — Confluent Cloud or Event Hubs — takes every one
of those off the team's plate. That's the entire value proposition:
paying for throughput and storage instead of paying an engineer's time
to do the list above.

## Why self-hosting can be cheaper at scale

The trade-off flips at sustained, very large scale. Managed services
price in a margin for the operational work they're doing for you —
reasonable, since real engineers and real infrastructure are behind
it. At a large enough sustained throughput, a team with the
in-house Kafka expertise to run it well can end up paying less in raw
infrastructure cost than they would in a managed service's throughput-
based pricing, because they're already absorbing the fixed cost of
having that expertise on staff for other reasons.

That's a real trade-off, not a rule of thumb that always favors one
side — it depends on the team's existing skill set, the actual
throughput involved, and whether the team already has the operational
muscle a self-hosted cluster demands.

## A practical decision framework

- **Reach for managed** (Confluent Cloud or Event Hubs) when the team
  doesn't already have deep Kafka operations experience, when
  throughput is moderate or unpredictable, or when getting started
  fast matters more than shaving infrastructure cost.
- **Reach for self-hosted** when the team already runs Kafka at scale
  with in-house expertise, when throughput is large and sustained
  enough that the math favors owning the infrastructure, or when full
  control over version, configuration, or data locality is a hard
  requirement a managed service can't meet.
- **Many real teams land in between**: self-hosted for a core,
  high-throughput system where the economics and control matter most,
  managed for smaller or newer workloads where speed of setup matters
  more than shaving cost.

## Key terms

| Term | Meaning |
|---|---|
| Ops burden | The concrete operational work — capacity planning, patching, failure recovery, monitoring — a managed service absorbs for you |
| Throughput-based pricing | How managed Kafka services typically charge, instead of by server count |
| Fixed cost of expertise | Why self-hosting can be cheaper for a team that already staffs Kafka operators for other reasons |

## Check yourself

You're ready for Lesson 24 when you can explain, without looking:
name three concrete operational responsibilities a managed Kafka
service takes off a team's plate, and describe one real situation
where self-hosting would actually be the cheaper choice.
