# IaC Concepts, Revisited for DBAs

You've likely at least heard of infrastructure as code (IaC) — declarative infrastructure
definitions kept in version control, applied by a tool instead of a person clicking through a
portal. This course doesn't re-teach IaC from scratch (this catalog has a full standalone
Terraform & Bicep course for that). What it does is apply IaC specifically to the part of the
stack DBAs own: the SQL Server instance itself, not the app tier around it.

## What you'll learn

- Why the same IaC principles that apply to app servers apply to SQL Server, with real
  DBA-specific wrinkles
- The difference between provisioning infrastructure and configuring what runs on it
- Where IaC tools stop being a good fit for DBA work, and why that boundary matters

## The same principles, a different target

The core IaC idea doesn't change for a database server: you write a declarative file that
describes the desired end state — "a SQL Server VM of this size, in this region, with this
storage" — check it into source control, and run it through a tool that reconciles reality to
match. No manual portal clicks, no "I think I set that setting on prod but I'm not sure," no
tribal knowledge locked in one person's head about how a server was actually built.

```hcl
# Not yet DBA-specific — this is the general IaC shape
resource "azurerm_mssql_server" "example" {
  name                = "sql-prod-01"
  resource_group_name = azurerm_resource_group.example.name
  location            = azurerm_resource_group.example.location
  version             = "12.0"
}
```

What's different for a DBA is what comes *after* provisioning. An app server is often done once
the VM boots and a deployment pipeline drops code on it. A SQL Server instance isn't done at
that point — you still have logins to create, `sp_configure` settings to set, maintenance jobs
to schedule, and a database to actually put on the thing. IaC tools model infrastructure well;
they model SQL Server internals poorly. That gap is exactly what the rest of this chapter works
through.

## Provisioning vs. configuration

It's worth being precise about two words this chapter uses constantly, because DBAs coming from
a manual-admin background often blur them together:

- **Provisioning** — bringing the compute/storage/networking resource into existence: the VM,
  the Azure SQL Database resource, the virtual network it sits in. This is what Terraform,
  Bicep, and ARM templates are built for.
- **Configuration** — setting the state of what's running on that resource once it exists:
  memory limits, MAXDOP, specific database options, logins, jobs. Some of this can be modeled
  in IaC-adjacent config-management tools (Lesson 25 covers that); a lot of it, in practice,
  still gets handled by a DBA-specific script.

Confusing the two is where IaC projects for database servers tend to go sideways — teams try to
force every SQL Server setting into a Terraform resource that doesn't cleanly support it, when
a short PowerShell/dbatools step immediately after provisioning would be far more direct
(Lesson 27 covers that combination explicitly).

## Why this matters for a DBA specifically

Three real, concrete benefits carry over directly from general IaC into DBA work:

- **Reproducibility** — spin up an identical dev or test SQL Server instance from the same
  template used for prod, instead of hoping a manually-built box matches.
- **Auditability** — a pull request against a `.tf` or `.bicep` file is a reviewable, permanent
  record of exactly what infrastructure changed and why, which a portal click history never
  gives you.
- **Disaster recovery** — if a server is destroyed, the IaC definition is the actual recipe to
  rebuild it, not a runbook someone wrote eighteen months ago and never re-validated.

## Key terms

| Term | Meaning |
|---|---|
| IaC (Infrastructure as Code) | Declarative infrastructure definitions kept in version control and applied by a tool |
| Provisioning | Bringing a compute/storage/networking resource into existence |
| Configuration | Setting the state of what's running on a resource once it exists |

## Check yourself

Why do most IaC tools model *provisioning* a SQL Server VM or Azure SQL Database well, but model
*configuring* that instance's internal settings (logins, `sp_configure` values, jobs) poorly?
What kind of tool tends to fill that gap instead?
