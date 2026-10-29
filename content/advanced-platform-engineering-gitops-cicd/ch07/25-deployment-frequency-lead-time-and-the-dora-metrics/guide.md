# Lesson 25 — Deployment Frequency, Lead Time, and the DORA Metrics

**Chapter 7 · Platform Observability and Developer Experience · Lesson 1 of 4**

## What you'll learn

- What the DORA metrics actually are, where they came from, and why
  they became the industry-standard way to measure software delivery
- The four metrics themselves: deployment frequency, lead time for
  changes, change failure rate, and time to restore service
- Why two of them measure throughput and two measure stability — and
  why elite performers are good at both, not trading one for the other
- Where the raw data for each metric actually comes from in a GitOps
  and CI/CD platform like the one you've been building in this course

## Where the DORA metrics came from

DORA stands for **DevOps Research and Assessment**, a research team
(originally an independent group, later acquired by Google Cloud) that
spent years surveying tens of thousands of software teams and
correlating their practices against organizational performance. Their
findings were published in the book *Accelerate* and in the annual
*State of DevOps* report. The headline result: four specific,
measurable metrics reliably separate high-performing software
organizations from low-performing ones, regardless of industry,
company size, or tech stack. Those four metrics are what everyone now
calls "the DORA metrics," and they're the first thing a platform team
should instrument — not because a dashboard looks impressive, but
because they're the most evidence-backed proxy anyone has found for
"is this organization actually good at shipping software."

## The four metrics

**Deployment frequency** — how often an organization successfully
deploys code to production. Elite performers deploy on demand,
multiple times a day; low performers deploy less than once every six
months. This isn't about deploying for its own sake — it's a proxy for
batch size. Teams that deploy constantly are shipping small, low-risk
changes; teams that deploy rarely are shipping large, high-risk
changes almost by definition.

**Lead time for changes** — the time between a commit landing on the
main branch and that code successfully running in production. This is
the metric that most directly reflects your GitOps and CI/CD pipeline
design from earlier chapters: every manual approval gate, every flaky
test suite, every slow build step shows up here. Elite performers
measure this in hours; low performers measure it in months.

**Change failure rate** — the percentage of deployments to production
that result in a degraded service and require remediation (a hotfix,
a rollback, a patch). This is a stability metric, not a throughput
one. It directly reflects the quality of your testing, your canary and
progressive-delivery practices from Chapter 5, and the blast radius of
a typical change.

**Time to restore service** — when something does fail in production,
how long does it take to restore service. This is effectively MTTR
(mean time to restore) scoped specifically to deployment-caused
incidents. It reflects how good your rollback mechanisms, your
alerting, and your on-call practices actually are under pressure.

## Throughput and stability aren't a trade-off

The single most important — and most counter-intuitive — finding in
the DORA research is that these four metrics are **not** in tension
with each other. Teams don't have to choose between "moving fast" and
"being stable." Elite performers score well on all four
simultaneously: they deploy constantly, their lead time is short,
their change failure rate is low, and when something does break, they
fix it fast. The mechanism that makes this possible is exactly what
this course has been building toward — small changes, automated
pipelines, declarative GitOps state, and progressive delivery with
automated rollback all reduce the size and risk of each individual
change, which improves throughput and stability at the same time.

## Where the numbers actually come from

In a real platform, you don't survey anyone to get these numbers —
you pull them straight out of the systems you already operate:

```text
deployment_frequency  <- count of successful production deploys
                          from your CI/CD system or GitOps controller,
                          over a time window (per day, per week)

lead_time_for_changes <- deploy_timestamp - commit_timestamp
                          (first commit timestamp in the merged PR,
                           compared against the production sync event
                           from ArgoCD/Flux or your pipeline tool)

change_failure_rate   <- failed_deploys / total_deploys
                          where "failed" = rollback, hotfix, or
                          incident tagged to that deployment

time_to_restore       <- incident_resolved_at - incident_detected_at
                          for incidents tagged as deployment-caused
```

None of this requires a new tool bolted onto the side — it requires
tagging data you're already generating (commits, deploys, incidents)
consistently enough that you can join them together.

## Key terms

| Term | Meaning |
|---|---|
| DORA | DevOps Research and Assessment — the research group whose multi-year studies (published in *Accelerate* and the *State of DevOps* report) identified the four key metrics |
| Deployment frequency | How often an org successfully ships to production; a proxy for batch size and risk per change |
| Lead time for changes | Time from commit to that change running in production; reflects pipeline speed and gate friction |
| Change failure rate | Percentage of deployments that degrade production and need remediation; a stability metric |
| Time to restore service | How long it takes to recover once a deployment-caused incident happens |

## Check yourself

You're ready for Lesson 26 when you can explain, without looking: why
are deployment frequency and lead time called throughput metrics while
change failure rate and time to restore are called stability metrics,
and why does the DORA research say elite teams don't have to trade one
pair off against the other?
