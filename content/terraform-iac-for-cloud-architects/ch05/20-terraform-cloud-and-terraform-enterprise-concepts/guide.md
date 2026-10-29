# Lesson 20 — Terraform Cloud and Terraform Enterprise Concepts

**Chapter 5 · Terraform Workspaces & Environments · Lesson 20 of 32**

## What you'll learn

- What Terraform Cloud actually is: HashiCorp's managed service for
  remote state and remote plan/apply execution
- What a real review-before-apply workflow looks like, and why that's
  different from running `terraform apply` on your own laptop
- What Terraform Enterprise adds on top of Terraform Cloud's concept,
  and who actually needs it
- The honest list of what you give up by staying on plain open-source
  Terraform, and what Chapter 7 does instead

## Terraform Cloud: the managed service

Everything in this course so far has run from a local CLI against a
backend you configured yourself — an `azurerm` or `s3` backend block,
your own credentials, your own machine doing the actual `plan` and
`apply` work. **Terraform Cloud** (TFC) is HashiCorp's own managed
service that takes over several of those jobs:

```hcl
terraform {
  cloud {
    organization = "my-org"
    workspaces {
      name = "networking-prod"
    }
  }
}
```

The `cloud` block replaces a `backend` block entirely — state storage
becomes TFC's problem, not yours, with no storage account or S3
bucket to provision and secure yourself. More importantly, TFC can run
`plan` and `apply` **remotely**, on HashiCorp's own infrastructure,
instead of on your laptop or a CI runner you manage. A TFC
"workspace" (a different concept from the CLI's `terraform workspace`
from Lesson 17) connects to a VCS repo like GitHub, and a run kicks off
automatically on a push or pull request.

## Review before apply — a real UI, not just console output

This is the concrete thing TFC adds that plain Terraform doesn't have
built in: a web UI that shows a run's full plan output and holds it
for a human to review and click **Approve** before `apply` actually
executes. Instead of trusting that whoever ran `terraform apply` on
their laptop read the plan carefully, the plan output becomes a
reviewable artifact with a named approver, tied to a specific commit.
TFC also supports **Sentinel**, HashiCorp's policy-as-code framework —
a Sentinel policy can run between plan and apply and hard-block a run
that, say, creates an untagged resource or requests a VM size above an
approved list, before a human even gets to the approval step.

## Terraform Enterprise: the same model, self-hosted

**Terraform Enterprise** (TFE) is the same feature set — remote state,
remote runs, the review UI, Sentinel policies, team and permission
management — packaged to run **inside an organization's own network**
instead of on HashiCorp's SaaS. It exists for organizations with
compliance or data-residency requirements that genuinely can't send
plan output or state data to an external service, no matter how
reputable. The real cost is operational: TFE is software you install,
patch, and keep running yourself, which is exactly the kind of
infrastructure overhead TFC was built to let most organizations avoid
in the first place.

## What plain open-source Terraform doesn't give you

None of this is required to use Terraform well — every lesson in this
course so far has used the CLI and a backend you configured directly,
and that's a completely legitimate way to run Terraform in production.
What you don't get without TFC or TFE is the built-in review UI, remote
run execution, and Sentinel policy enforcement. Chapter 7 shows the
open-source-only alternative: running `terraform plan` inside a regular
CI/CD pipeline, posting its output to a pull request for human review,
and gating `apply` behind a manual approval step you build yourself
rather than one a managed platform provides out of the box.

## Key terms

| Term | Meaning |
|---|---|
| Terraform Cloud (TFC) | HashiCorp's managed SaaS: remote state storage, remote plan/apply execution, and a UI for reviewing a run before approving it |
| `cloud` block | Replaces a `backend` block to connect a configuration to a TFC organization and workspace |
| Sentinel | HashiCorp's policy-as-code framework, run between plan and apply in TFC/TFE to block non-compliant runs |
| Terraform Enterprise (TFE) | The self-hosted version of TFC's feature set, for compliance/data-residency requirements that rule out a SaaS |

## Check yourself

This closes Chapter 5. You're ready for Chapter 6 when you can explain,
without looking: what does the `cloud` block in a `terraform {}` block
actually replace, and what are the two concrete capabilities — beyond
state storage — that make Terraform Cloud different from running
`terraform apply` from your own laptop?
