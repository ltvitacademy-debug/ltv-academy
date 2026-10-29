# Lesson 5 — Service Catalogs and Software Templates

**Chapter 2 · Building a Developer Self-Service Portal · Lesson 1 of 4**

## What you'll learn

- Why "nobody knows what services exist or who owns them" is the first
  problem a self-service portal has to solve, before it does anything
  else
- What a **software catalog** actually is — a real, queryable
  inventory of every service, API, and resource in the org, not a wiki
  page someone forgot to update
- How a **software template** scaffolds a brand-new service with
  CI/CD, monitoring, and infrastructure already wired in, instead of a
  developer copy-pasting from whichever repo they found first
- How catalog entities and templates work together so that everything
  a template creates is automatically registered, not manually added
  later

## The problem: nobody can answer "what do we have?"

Chapter 1 established that a platform is a product and that golden
paths beat infinite choice. But a golden path is only useful if
developers can actually find it, and a paved road is only safe if
someone can see every car currently on it. At real organizational
scale — hundreds of services, dozens of teams — the honest answer to
"what services do we run, and who owns each one" is usually a stale
wiki page, a spreadsheet nobody updates, or "ask around in Slack."
That's not a documentation problem. It's a missing source of truth,
and it's the first thing a developer self-service portal has to fix.

## The software catalog: a real inventory, not a wiki

A **software catalog** is a structured, queryable record of every
component in the organization — services, websites, libraries,
internal tools, APIs, data pipelines — along with who owns each one,
what it depends on, and what lifecycle stage it's in. The reference
implementation of this idea is **Backstage**, the open-source
developer portal framework originally built at Spotify and now a CNCF
graduated project. Backstage's catalog represents every component as
a YAML entity descriptor, usually committed right alongside the code
it describes:

```yaml
# catalog-info.yaml, in the root of the service's repo
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: checkout-service
  description: Handles cart checkout and payment capture
  tags:
    - payments
    - tier-1
  annotations:
    github.com/project-slug: acme-corp/checkout-service
spec:
  type: service
  lifecycle: production
  owner: group:payments-team
  dependsOn:
    - resource:default/checkout-db
    - component:default/inventory-service
```

That one file is what makes the entity real to the catalog. Backstage
ingests it, and the service instantly becomes searchable, shows up in
its owning team's view, and contributes a node to the dependency
graph. `kind` can be `Component`, `API`, `Resource`, `System`,
`Group`, or `User` — enough entity types to represent not just
services but the databases they depend on, the teams that own them,
and the higher-level systems they belong to. Crucially, this is a
**live inventory**, not documentation: if `checkout-service` stops
publishing a `catalog-info.yaml`, or its owner field is wrong, that's
immediately visible and fixable, instead of silently rotting the way
a wiki page does.

## Software templates: scaffolding, not copy-paste

Knowing what exists solves half the problem. The other half is how
new things get created in the first place. Without a template, a
developer starting a new service copies whichever existing repo looks
closest, strips out the business logic, and hopes they didn't also
copy a stale dependency pin or forget to update the CI config. Every
new service becomes a slightly different snowflake, and the paved
road from Chapter 1 quietly erodes one shortcut at a time.

A **software template** — Backstage calls this piece the
*Scaffolder* — is a self-service wizard, backed by a `template.yaml`,
that generates a new, correctly wired-up component on demand. A
developer picks a template from the catalog, fills in a short form,
and gets a brand-new repository with the pipeline, monitoring, and
infrastructure already connected — not a blank folder they have to
wire up themselves:

```yaml
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: nodejs-microservice
  title: Node.js Microservice (Golden Path)
spec:
  parameters:
    - title: Service details
      properties:
        name:
          type: string
          description: Name of the new service
        owner:
          type: string
          description: Owning team
  steps:
    - id: fetch-skeleton
      name: Fetch base template
      action: fetch:template
      input:
        url: ./skeleton
        values:
          name: ${{ parameters.name }}
    - id: publish
      name: Publish to GitHub
      action: publish:github
      input:
        repoUrl: github.com?repo=${{ parameters.name }}
    - id: register
      name: Register in catalog
      action: catalog:register
      input:
        repoContentsUrl: ${{ steps.publish.output.repoContentsUrl }}
        catalogInfoPath: /catalog-info.yaml
```

Three things happen in that one wizard run, in order: a skeleton
repository is generated from a templated source tree (CI/CD pipeline
config, a Dockerfile, a monitoring dashboard definition, and a
`catalog-info.yaml` all pre-filled), that repository is published to
GitHub, and — this is the part that closes the loop — the new
component is automatically registered in the catalog. Nobody has to
remember to add it to an inventory later, because the template that
created it also announced it.

## Why the pairing matters

The catalog and the templates reinforce each other. The catalog is
useless if new services don't reliably show up in it, and templates
that scaffold services without registering them just create more
invisible sprawl. Wired together, every new service a team spins up
through a golden-path template is, from the moment it's created,
already visible in the org-wide inventory with a real owner, a real
lifecycle stage, and a real dependency graph — which is exactly the
foundation the next three lessons build on: a portal that provides
more than a wiki, self-service infrastructure requests, and
org-wide scorecards all depend on the catalog being trustworthy data,
not best-effort documentation.

## Key terms

| Term | Meaning |
|---|---|
| Software catalog | A structured, queryable inventory of every service, API, and resource in the org, with real ownership and dependency data |
| Entity | One record in the catalog — a `Component`, `API`, `Resource`, `System`, `Group`, or `User` — described by a `catalog-info.yaml` |
| Software template (Scaffolder) | A self-service wizard that generates a new, correctly wired-up component from a form, instead of manual copy-paste |
| Golden-path template | A software template whose output already has CI/CD, monitoring, and infra wired in, matching the organization's paved road |

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: what
specifically goes wrong when a team scaffolds a new service from a
template that never calls `catalog:register`, and why is a
`catalog-info.yaml` committed in the repo a better source of truth
than a wiki page describing the same service?
