# Lesson 10 — The Dashboards Disagree

**Chapter 1 · Advanced Capstone: Kubernetes, Multi-Cloud, and a Cross-Team Incident · Lesson 10 of 26**

## What you'll learn

- Why two dashboards built off the exact same AKS cluster can report
  opposite stories during the same live incident
- What the reliability dashboard was built to catch, and what it caught
  roughly ninety minutes into the sale
- What the FinOps dashboard (built in Lesson 7) was built to summarize,
  and why its headline number looked healthy at that exact moment
- Why "the data disagrees" is itself a signal worth stopping for —
  not something to average away, dismiss, or wait out

## Ninety minutes into the sale

The sale has been live since the top of the lesson before this one, and
for the first hour everything Driftwood Outdoor Apparel's platform team
watches looks exactly like the load test from Lesson 8 predicted. Then
Casey Lindqvist, VP of Engineering, posts in the incident channel: the
**reliability dashboard** — the one tracking `checkout-api`'s real
request latency and error rate — is climbing. p95 latency on checkout
has gone from a 180ms baseline to over 2,000ms. The error rate, usually
a flat 0.3%, is past 5%. Customers are seeing timeouts at checkout,
during the biggest sale of the year.

Theo Bryant's first move is the one every cloud engineer reaches for:
pull up the cluster health dashboard and see what's actually
overloaded. He opens the **FinOps dashboard** built in Lesson 7 — and
it says the cluster is fine. Average CPU utilization across the AKS
cluster is 72%, comfortably under the 80% line that's supposed to mean
"time to scale." Average memory looks the same way. By every number on
that screen, there's capacity to spare.

## Two dashboards, two different jobs

Both dashboards are real, both are querying live data off the same AKS
cluster, and both are reporting correctly for what each was built to
answer:

| Dashboard | Built in | What it measures | The question it answers |
|---|---|---|---|
| Reliability dashboard | Lesson 8 (load-testing infra) | p95/p99 request latency and 5xx error rate, per service | "Is checkout-api actually serving requests well, right now?" |
| FinOps dashboard | Lesson 7 | Cluster-wide **average** CPU/memory utilization against requested capacity | "Are we over- or under-provisioned, overall?" |

Neither dashboard is lying. They're pointed at two different questions,
and right now those two questions have two different answers. That's
not a bug in either tool — it's the first real clue in this incident,
and the thing Theo has to resist doing is picking whichever dashboard
is more convenient to believe.

## Why this is the moment that matters

It would be easy to split the difference: "the FinOps dashboard says
we have headroom, so the latency spike must be something else — a
downstream dependency, a database, a network blip." That's a
reasonable-sounding guess, and it's exactly the kind of guess that
burns thirty minutes during a live incident chasing the wrong system.
The discipline this lesson is really teaching is: when two dashboards
built on the same underlying data disagree, that disagreement is the
most informative fact on the table. It means at least one of your
summaries is hiding something the other one is catching — and the job
right now is to find out which, not to pick a favorite.

## Key terms

| Term | Meaning |
|---|---|
| p95 latency | The response time below which 95% of requests complete — sensitive to a slow subset even if most traffic is fine |
| Error rate | The share of requests returning a 5xx (server error) response |
| Cluster-wide average | A single number computed across every node/pod in the cluster — by definition, it blends fast and slow together |
| Headline metric | The one number a dashboard is designed to be read at a glance — powerful, but only as good as what it averages away |

## Lab

1. Write down the two numbers Theo is looking at in this exact moment:
   checkout-api's p95 latency and error rate from the reliability
   dashboard, and the AKS cluster's average CPU utilization from the
   FinOps dashboard.
2. In one sentence, explain why an average and a percentile computed
   from the same underlying pods can legitimately disagree.
3. List what Theo does **not** yet know at the end of this lesson —
   he has a conflict, not a cause.

## Check yourself

You're ready for Lesson 11 when you can explain, without looking, why
both dashboards can be correct and still disagree, and why the right
next move is to investigate the disagreement itself rather than trust
whichever dashboard is more reassuring.
