# Lesson 18 — Tagging and Cost Governance as an Architecture Concern

**Chapter 5 · Governance at Scale · Lesson 18 of 32**

## What you'll learn

- Why the FinOps tagging taxonomy you built in course 10 only works if
  it's enforced at the landing zone, not requested as a best practice
- How to enforce required tags with Azure Policy `Deny` and AWS tag
  policies, instead of relying on teams remembering
- Why cost allocation depends entirely on tag consistency, and what
  breaks when a required tag is free-text instead of constrained
- How to treat tag schema changes as an architecture change with its
  own review, not a quiet Slack message

## A tagging taxonomy is only as good as its enforcement

In course 10 you built a FinOps tagging taxonomy — keys like
`cost-center`, `environment`, `owner`, `workload`, each with an agreed set
of values. That taxonomy is genuinely useless if it lives only in a wiki
page. The moment it's "recommended," some resources get tagged correctly,
some get tagged inconsistently, and some don't get tagged at all, and a
cost report built on top of that data is wrong in ways that are hard to
even notice. The architecture decision this lesson is about is simple to
state and easy to skip: tagging has to be enforced at the point resources
are created, inside the landing zone, the same way a network boundary or
an encryption requirement is enforced — not requested after the fact.

## Enforcing required tags with Azure Policy

Azure Policy has built-in definitions purpose-built for this:
`Require a tag on resources` and `Require a tag and its value on
resources`, assignable with a `Deny` effect at the same management group
scope you used for the baseline initiative in Lesson 17. With `Deny` in
place, a resource that's missing `cost-center` or `environment` simply
can't be created — the deployment fails at `terraform apply` time, not
three months later when someone notices the cost report has an
"untagged" line item that's 20% of the bill. Azure Policy also supports
`modify` effects that can inherit a tag value down from a resource group
or subscription automatically, which matters because requiring a tag and
inheriting its value from a parent scope solves two different problems:
inheritance keeps a tag consistent across every resource in a scope,
while a `Deny` requirement catches the case where no value was ever set
at all.

## Enforcing it on AWS with tag policies and SCPs

AWS Organizations supports **tag policies**, which define the allowed
keys and values for a tag across an organization and report resources
that don't comply — useful for catching drift, but detective rather than
preventive on their own. The preventive half comes from an SCP (Lesson
17's mechanism) that denies resource-creation API calls unless a required
tag is present, using the `aws:RequestTag` condition key. Pairing the two
mirrors the Azure pattern exactly: the SCP is the `Deny`-at-creation
control, and the tag policy is the ongoing compliance report that catches
whatever the SCP's condition didn't account for.

## Why free-text tag values quietly break cost allocation

The taxonomy's value only holds if the values are constrained, not
free-text. If `cost-center` accepts any string, you'll eventually get
`platform-team`, `Platform Team`, and `platform_team` as three different
values describing the same team, and every cost report that groups by
`cost-center` now undercounts that team's real spend by splitting it
across three rows. This is why a mature tagging enforcement setup pairs
the `Deny`-if-missing policy with an **allowed values list** — Azure
Policy's `in` condition against an approved set, or an AWS tag policy's
explicit value list — so the tag isn't just present, it's one of a known
set of values that a cost dashboard can actually group by reliably.

## Tag schema changes are architecture changes

Because the tagging taxonomy is now enforced by policy that's defined in
Terraform (Lesson 17's pattern) and read by chargeback or showback
reporting that finance depends on, a change to the schema — adding a
required key, renaming an allowed value, changing which resource types a
tag applies to — is an architecture change with real consequences for
every team under that management group or OU. It belongs in a pull
request reviewed the same way a network change would be, not a message
in a Slack channel asking people to "start using the new tag going
forward." Treating the taxonomy itself as governed, versioned
infrastructure is what keeps cost governance from quietly rotting the
same way an unenforced tagging convention always does.

## Key terms

| Term | Meaning |
|---|---|
| Required tag policy | A policy (Azure Policy `Deny`, or an AWS SCP with `aws:RequestTag`) that blocks resource creation unless a specific tag is present |
| Tag inheritance | A mechanism (Azure Policy `modify`, resource group/subscription defaults) that applies a tag value down from a parent scope automatically |
| AWS tag policy | An AWS Organizations control that defines allowed keys/values for a tag and reports non-compliant resources across the org |
| Allowed values list | A constraint limiting a tag to a known, finite set of values so cost reports can group by it reliably |

## Check yourself

You're ready for Lesson 19 when you can explain, without looking: why
does enforcing that a tag is *present* solve a different problem than
enforcing what *values* it's allowed to have, and why does a tag schema
change deserve the same review as a network change?
