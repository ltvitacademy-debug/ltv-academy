# Lesson 8 — Scorecards and Tech-Debt Visibility Across Many Teams

**Chapter 2 · Building a Developer Self-Service Portal · Lesson 4 of 4**

## What you'll learn

- Why "which services are on an outdated runtime" is unanswerable by
  manual audit once an org has hundreds of services, and why a
  catalog-wide scorecard is the only thing that scales
- How Backstage's **Tech Insights** plugin turns raw facts about each
  service into pass/fail **checks**, aggregated into a **scorecard**
- How a scorecard surfaces real tech debt and compliance gaps across
  every team at once, without a human manually auditing each service
- Why none of this works without the catalog from Lesson 5 — a
  scorecard can only be as accurate as the entity data underneath it

## The question nobody can answer by hand

"Which of our services are still running Node 14, which is past end
of life?" At ten services, someone could answer that from memory. At
four hundred services spread across thirty teams, nobody can, and a
manual audit that tries will be stale again within a month as new
services ship and old ones get bumped. This is the same category of
problem the catalog solved for ownership in Lesson 5 — except now the
question isn't "what exists," it's "how healthy is what exists,
across the whole organization, right now."

## Tech Insights: facts, checks, and scorecards

Backstage's answer is the **Tech Insights** plugin, built in three
layers on top of the catalog:

- **Fact retrievers** collect a specific, concrete piece of data about
  every entity in the catalog — the Node.js version pinned in a
  repo's `package.json`, whether a security-scanning workflow file
  exists, how many days since that repo's CI last went green, whether
  a `catalog-info.yaml` declares an on-call owner.
- **Checks** evaluate a fact against a threshold and produce a
  pass/fail result: "runtime version is not end-of-life," "security
  scan ran within the last 7 days," "an on-call owner is declared."
- **Scorecards** aggregate a set of checks per entity into one
  readable view — commonly a grid where every row is a service, every
  column is a check, and every cell is a pass or fail.

```yaml
# tech-insights check config (conceptual)
checks:
  - id: runtime-not-eol
    name: Runtime is not end-of-life
    factRetrieverId: nodeVersionRetriever
    rule:
      operator: not_equals
      value: "14"
  - id: has-oncall-owner
    name: Declares an on-call owner
    factRetrieverId: catalogOwnerRetriever
    rule:
      operator: not_equals
      value: null
```

Run across every entity in the catalog, that configuration produces
one grid a platform or security team can scan in minutes: every
service still on Node 14 is a red cell in one column, every service
missing an on-call owner is a red cell in another, and the pattern of
red cells across hundreds of rows is the tech-debt picture that no
individual team, looking only at its own services, could ever see.

## What this actually makes visible at org scale

Three kinds of questions become answerable the moment scorecards run
against the whole catalog instead of one team's corner of it:

- **Migration tracking.** "How many services have moved off the
  deprecated base image, and which ones haven't?" becomes a literal
  count of red cells in one column, trackable week over week as a
  migration campaign progresses.
- **Compliance.** "Does every production service have security
  scanning enabled?" is a single check run everywhere at once, instead
  of a security team individually emailing thirty team leads and
  waiting for replies.
- **Golden-path adherence.** "Which services were scaffolded through
  the vetted template from Lesson 5, versus hand-rolled outside it?"
  turns the golden path from Chapter 1 into something measurable
  instead of aspirational — a check can look for the markers a golden
  path template leaves behind.

None of these were previously answerable without someone spending
days manually surveying every team. A scorecard makes them a standing,
always-current view.

## Why this only works on an accurate catalog

A scorecard check is only as good as the fact retriever feeding it,
and a fact retriever only works because it's reading real entity data
— a `package.json` in a repo the catalog correctly points at, an
owner field that's actually filled in. This is the same dependency
every lesson in this chapter has traced back to the same place: the
catalog from Lesson 5 is the foundation, the portal from Lesson 6
surfaces it, self-service provisioning from Lesson 7 keeps it growing
accurately, and scorecards here turn all of that accurate data into
org-wide visibility that no team-by-team audit could produce. A
developer self-service portal isn't four unrelated features — it's
one trustworthy inventory, viewed and acted on four different ways.

## Key terms

| Term | Meaning |
|---|---|
| Fact retriever | A component that collects one concrete piece of data about every catalog entity — a runtime version, a scan result, an owner field |
| Check | A pass/fail rule evaluating a fact against a threshold, such as "runtime is not end-of-life" |
| Scorecard | A grid aggregating many checks across many entities, surfacing tech debt and compliance gaps org-wide at a glance |
| Golden-path adherence | Whether a service was created through a vetted template versus built by hand outside it, made measurable by a scorecard check |

## Check yourself

You're ready to move on to GitOps Principles when you can explain,
without looking: why can't a single team answer "which services are
on an outdated runtime" by itself, and what has to already be true
about the catalog before a Tech Insights check can produce an
accurate pass/fail result for even one service?
