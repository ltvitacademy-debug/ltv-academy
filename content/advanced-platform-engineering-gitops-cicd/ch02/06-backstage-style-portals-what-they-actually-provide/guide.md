# Lesson 6 — Backstage-Style Portals: What They Actually Provide

**Chapter 2 · Building a Developer Self-Service Portal · Lesson 2 of 4**

## What you'll learn

- Why a developer portal is more than "the catalog with a nicer UI,"
  and what it adds on top
- What **TechDocs** is, and why docs-as-code solves the exact staleness
  problem a wiki has
- How Backstage's **plugin model** turns a thin core into a single
  page per service that shows live pipeline, runtime, and cost data
- Why all of this only works because it's built on the catalog from
  Lesson 5 — the portal has nowhere to put any of this without a real
  inventory underneath it

## More than a catalog with a nicer UI

Lesson 5 covered the catalog and software templates — the inventory
of what exists, and the mechanism for creating new things correctly.
A **developer portal** is the layer on top that developers actually
spend their day in: one web UI where a developer opens
`checkout-service`, and immediately sees who owns it, what it
depends on, whether its last deploy passed, whether its pods are
healthy right now, and how to read its documentation — without
leaving the page or pinging three different teams in Slack. Backstage
is the reference implementation most organizations building this
pattern either adopt directly or copy the architecture of, and it's
built from exactly two pieces beyond the catalog: **TechDocs** and a
**plugin model**.

## TechDocs: docs that live and die with the code

Every team has, at some point, written documentation on a wiki that
was accurate the day it was published and wrong three sprints later,
because nothing forced it to change when the code did. **TechDocs**
is Backstage's answer: documentation written as Markdown files
**committed in the same repository as the service itself**, built
with the static-site generator MkDocs, and then rendered directly
inside the service's catalog entry page.

```yaml
# mkdocs.yml, at the repo root next to catalog-info.yaml
site_name: 'checkout-service'
nav:
  - Home: index.md
  - Runbook: runbook.md
plugins:
  - techdocs-core
```

Because the docs live in the same pull request as the code change
that makes them necessary, a reviewer who requires updated docs for a
behavior change can enforce it the same way they'd enforce a passing
test — docs-as-code puts documentation under the same review and
versioning discipline as everything else, instead of leaving it as a
separate, unenforced chore.

## The plugin model: a thin core, real functionality at the edges

Backstage's core application is deliberately small: routing, the
catalog data model, authentication. Almost everything a developer
actually sees — CI/CD pipeline status, Kubernetes pod health, cloud
cost breakdowns, on-call schedules, API documentation viewers — is
contributed by a **plugin**, a self-contained frontend (and
sometimes backend) module that renders as a tab on an entity's page.
A plugin reads the entity's metadata to know what to fetch: a
Kubernetes plugin sees `checkout-service`'s annotations, knows which
namespace to query, and shows live pod status; a CI/CD plugin reads
the same entity and shows the status of its last several pipeline
runs. The result is that opening one service's page gives you tabs
like **Overview**, **CI/CD**, **Docs**, **Kubernetes**, and
**Dependencies** — each one backed by live data pulled by a plugin,
not a paragraph someone typed up and forgot to revisit.

## Why this only works on top of a real catalog

None of this is possible without Lesson 5's catalog underneath it.
A plugin only knows what to query because the entity it's rendering
has real metadata — an owner, a namespace annotation, a repo slug.
TechDocs only knows where to find a service's documentation because
the catalog entity points at it. The portal isn't a separate system
bolted onto the catalog; it's the catalog's data, surfaced usefully,
plus two mechanisms — docs-as-code and a plugin model — for keeping
that surface current without manual upkeep. That combination is what
actually distinguishes a developer portal from a wiki: a wiki is
somebody's best effort to describe a system from memory, and a portal
is a live view of the system itself.

## Key terms

| Term | Meaning |
|---|---|
| Developer portal | The UI layer built on top of the catalog where developers view ownership, docs, pipeline status, and runtime health for a service in one place |
| TechDocs | Backstage's docs-as-code system — Markdown committed in the service's own repo, built with MkDocs, rendered inside the catalog entry |
| Plugin | A self-contained module (frontend, sometimes backend) that renders a tab of live data — CI/CD status, Kubernetes health, cost — on an entity's page |
| Entity page | The per-service view in a portal that combines catalog metadata, TechDocs, and plugin-contributed tabs into one place |

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: why
does committing documentation in the same repo as the code it
describes solve a problem that a separate wiki can't, and what has to
already be true about a catalog entity before a Kubernetes plugin can
show that service's live pod health on its page?
