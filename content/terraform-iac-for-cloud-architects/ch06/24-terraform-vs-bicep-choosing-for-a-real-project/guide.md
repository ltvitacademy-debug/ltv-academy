# Lesson 24 — Terraform vs. Bicep: Choosing for a Real Project

**Chapter 6 · Bicep Deep Dive · Lesson 24 of 32**

## What you'll learn

- The real tradeoffs between Terraform and Bicep, not a vague "it
  depends"
- Why single-cloud vs. multi-cloud is the single biggest factor in
  the decision
- How existing team skills and tooling overhead change the
  calculation
- A practical framework for making this call on a real project, not
  just in theory

## What each tool actually gives you

You've now gone deep enough into both to compare them honestly,
resource by resource rather than by reputation. **Bicep** is
Azure-only — it can't touch AWS or Google Cloud at all — but in
exchange it's Microsoft's own first-party authoring layer: new Azure
resource types and API versions show up in Bicep the same day they
show up in ARM, there's zero extra tooling to install beyond the
Azure CLI, and there's no separate state file for you to store,
secure, or lock, because ARM itself already tracks what each
deployment created.

**Terraform** is multi-cloud by design — the same CLI and workflow
manage Azure, AWS, Google Cloud, Kubernetes, and hundreds of other
providers, and the Terraform Registry's module ecosystem is far
larger than Bicep's equivalent, the Azure Verified Modules program,
simply because it isn't limited to one cloud's user base. The real
cost, which Chapter 3 covered in depth, is that you manage state
yourself: a remote backend, locking, and the operational discipline
that comes with both.

## The factor that decides most of this: how many clouds

If a team deploys to Azure only, and has no credible near-term reason
to add AWS or Google Cloud, Bicep removes real overhead: no state
backend to stand up and secure, no provider version pinning to
manage, and day-one support for whatever Azure ships next. If a team
is already multi-cloud, or honestly expects to be within the life of
the project, Terraform's one-workflow-for-everything is worth the
state management overhead, because the alternative is maintaining a
different IaC tool per cloud with no shared patterns between them.

## Team skills and tooling overhead are real costs too

A team that already knows Terraform well, and only occasionally
touches Azure, often comes out ahead sticking with Terraform even for
Azure-only work — the cost of introducing a second IaC language and a
second set of CI/CD tooling can outweigh Bicep's state-free
simplicity. The reverse holds too: a team of Azure specialists with
no Terraform experience, building only Azure infrastructure, usually
gets to a working deployment faster in Bicep, with one less tool and
one less failure mode (a broken remote state backend) to operate.

## A practical framework

Ask, in order: **(1)** Is this Azure-only today, with no realistic
multi-cloud need on the horizon? If no, lean Terraform. **(2)** If
yes, does the team already have strong Terraform skills and existing
Terraform tooling (CI pipelines, remote backends, modules) in place?
If yes, staying on Terraform may still cost less than adding a second
tool. **(3)** If the team is Azure-first with limited or no Terraform
experience, Bicep's lower overhead — no state backend, first-party
support, Azure CLI is the only dependency — usually wins. None of
this is a universal rule; it's the same honest, factor-by-factor
evaluation you'd apply to any real tooling decision, applied to two
tools that, underneath the syntax, both ultimately exist to make
Azure infrastructure declarative and repeatable.

## Key terms

| Term | Meaning |
|---|---|
| Single-cloud vs. multi-cloud | The single biggest factor: Bicep only works for Azure, Terraform works across providers with one workflow |
| State management overhead | Terraform's real cost — a remote backend, locking, and operational discipline Bicep doesn't require |
| Azure Verified Modules | Microsoft's curated module program for both Bicep and Terraform, smaller than the general Terraform Registry ecosystem |
| Tooling overhead | The cost of introducing and maintaining a second IaC language/toolchain alongside one a team already knows |

## Check yourself

You're ready for Chapter 7 when you can explain, without looking: why
is "which clouds does this project actually need to support" a more
useful first question than "which tool is better," when choosing
between Terraform and Bicep?
