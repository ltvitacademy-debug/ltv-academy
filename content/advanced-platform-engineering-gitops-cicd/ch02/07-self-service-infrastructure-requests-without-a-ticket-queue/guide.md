# Lesson 7 — Self-Service Infrastructure Requests Without a Ticket Queue

**Chapter 2 · Building a Developer Self-Service Portal · Lesson 3 of 4**

## What you'll learn

- Why "file a ticket, wait for ops to run Terraform by hand" is the
  exact failure mode a self-service portal exists to remove
- How a software template — the same mechanism from Lesson 5 — can
  provision real infrastructure instead of just scaffolding code
- Why safety doesn't disappear when the ticket queue does: bounded
  parameters and vetted modules are what make self-service provisioning
  safe, not a human reading every request
- How a provisioned resource becomes a real `Resource` entity in the
  catalog, wired to the service that consumes it

## The ticket-queue problem

A developer needs a Postgres database for a new service. In most
organizations without a self-service platform, that means filing a
ticket, waiting for a platform or ops engineer to pick it up, and
waiting again while that engineer manually runs `terraform apply`
against a module they may not have touched in months. Multiply that
by every team that needs a database, a message queue, or a storage
bucket, and the platform team becomes a bottleneck queue instead of a
force multiplier — exactly the "customers waiting in line" failure
Lesson 2's "platform as a product" framing warned against. The fix
isn't removing Terraform. It's removing the human relay in the
middle.

## The same template mechanism, pointed at infrastructure

Lesson 5 introduced software templates that scaffold a new service.
The exact same mechanism — a form-driven wizard backed by a
`template.yaml` — can target infrastructure instead of code. A
developer opens a template called something like "Provision a
Postgres Database," fills in a short form (environment, size tier,
owning team), and the template's steps run a Terraform module with
those values as inputs, instead of a person in another timezone
running it by hand two days later:

```yaml
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: provision-postgres-db
  title: Provision a Postgres Database
spec:
  parameters:
    - title: Database details
      properties:
        environment:
          type: string
          enum: [dev, staging, prod]
        sizeTier:
          type: string
          enum: [small, medium, large]
  steps:
    - id: run-terraform
      name: Provision database
      action: terraform:run
      input:
        module: modules/postgres-db
        variables:
          environment: ${{ parameters.environment }}
          size_tier: ${{ parameters.sizeTier }}
    - id: register-resource
      name: Register database in catalog
      action: catalog:register
      input:
        catalogInfoPath: /generated/catalog-info.yaml
```

That `terraform:run` step is doing the same `terraform plan` and
`terraform apply` work from your Terraform & Bicep course — nothing
about Terraform itself changed. What changed is *who triggers it* and
*how fast*: a developer's form submission, not a ticket sitting in a
backlog.

## What actually keeps this safe

The obvious objection: if anyone can provision a database by filling
out a form, what stops someone from spinning up a prod-sized cluster
by accident, or requesting something nobody vetted? The answer isn't
a human approver reading every request — that's just the ticket
queue with a form in front of it. The real safety mechanism is in
what the template is allowed to expose:

- **The module is fixed and vetted.** The template only ever runs
  `modules/postgres-db`, a specific Terraform module the platform team
  already wrote, reviewed, and tested. The developer never writes or
  chooses arbitrary Terraform.
- **The parameters are bounded.** `sizeTier` is an enum of exactly
  three values, not a free-text field. A developer literally cannot
  request a configuration the platform team didn't already decide
  was acceptable.
- **Policy gates the dangerous cases, not a person.** A request for
  `environment: prod` can require an automated policy check or a
  lightweight, scoped approval step — a specific on-call engineer
  getting a single notification, not a general queue — without
  turning every request back into a ticket.

Self-service doesn't mean unconstrained. It means the constraints are
enforced by the module and the form instead of by a person
re-explaining them on every single request.

## Closing the loop with the catalog

The last step in the template — registering the new database as a
`Resource` entity — matters for the same reason it mattered for
software templates in Lesson 5. The provisioned database doesn't just
exist in the cloud provider's console where nobody can find it later;
it shows up in the catalog as a `Resource`, linked via `dependsOn` to
the `Component` that requested it. Six months later, when someone
asks "what's using this database, and is it safe to change its
instance size," that question has a real answer instead of requiring
someone to go hunting through a cloud console.

## Key terms

| Term | Meaning |
|---|---|
| Infrastructure self-service template | A software template whose steps run a Terraform module instead of scaffolding code, provisioning real infrastructure from a form |
| Bounded parameters | Form inputs constrained to a fixed set of vetted options (an enum, not free text), which is what keeps self-service safe without a human reviewing every request |
| `Resource` entity | The catalog entity kind used for infrastructure a service depends on — a database, queue, or bucket — linked via `dependsOn` to its consuming `Component` |
| Scoped approval | A narrow, automated or single-reviewer gate on a specific risky case (like a prod request), as opposed to a general ticket queue every request passes through |

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: why
is restricting a self-service infrastructure template's parameters to
an enum a better safety mechanism than requiring a human to approve
every request, and what breaks later if the provisioned database is
never registered as a `Resource` entity in the catalog?
