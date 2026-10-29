# Lesson 19 — Tagging for Cost Allocation Across Teams and Projects

**Chapter 5 · Cost Management & FinOps Fundamentals · Lesson 19 of 32**

## What you'll learn

- Why the grouping and filtering shown in Lesson 18 is worthless
  without a consistent tagging taxonomy behind it
- What a real cost-allocation tag taxonomy looks like, and the small
  set of keys most organizations standardize on
- How to enforce tags at creation time with **Azure Policy**, so an
  untagged resource can't be deployed in the first place
- How **AWS tag policies** (via AWS Organizations) do the same job on
  the AWS side, plus the Cost Allocation Tag activation step from
  Lesson 18

## Why tagging is the hinge the whole chapter turns on

Every grouping-by-tag and filter-by-tag workflow from Lesson 18
depends on one assumption that's easy to skip past: **the tag has to
exist, and it has to be correct.** A `team` tag with three different
spellings across three resource groups — `payments`, `Payments`, and
`pay-team` — doesn't group into one bucket in Cost Analysis or Cost
Explorer; it fragments into three. A resource with no tag at all
doesn't show up under any team's spend; it just sits in an
"Untagged" bucket that nobody is accountable for. Tagging strategy is
not a nice-to-have on top of FinOps — it's the mechanism that makes
the entire Inform phase possible.

## A real tag taxonomy

Most organizations converge on a small, consistent set of tag keys
rather than letting every team invent their own. A commonly used
starting set (illustrative — adapt the exact keys to your
organization, but keep the number small and the values enforced):

| Tag key | Example value | Why it exists |
|---|---|---|
| `team` or `owner` | `payments` | Who is accountable for this resource's cost and its health |
| `project` or `cost-center` | `checkout-redesign` | Which initiative or budget line this spend rolls up to |
| `environment` | `prod`, `staging`, `dev` | Separates production spend from non-production spend in every report |
| `application` | `checkout-api` | Groups resources belonging to the same logical application |

The value is not the taxonomy itself — it's **consistency**. A tag
scheme with five keys that every resource actually carries, with
values drawn from a fixed allowed list, beats a scheme with twenty
keys that half the resources are missing.

## Enforcing tags with Azure Policy

Writing a tag convention in a wiki page doesn't make engineers apply
it under deadline pressure. **Azure Policy** can enforce it at the
platform level instead. A common pattern uses a built-in policy
definition such as `Require a tag on resources` (or a custom policy
built from the same pattern), assigned at the subscription or
management group scope, with an effect of `Deny`:

```
# Conceptual shape of an Azure Policy assignment:
Policy definition: "Require a tag and its value on resources"
Parameters:
  tagName: "team"
Effect: Deny
Scope: subscription or management group
```

With that assignment in place, an attempt to deploy a resource
without a `team` tag is rejected outright at deployment time — not
flagged in a report a week later, but refused before it's created.
Azure Policy also supports an `Append` effect, which can inherit a tag
from a resource group onto any resource created inside it, reducing
how often an engineer has to type the tag by hand at all.

## Enforcing tags with AWS tag policies

AWS does the equivalent job through **AWS Organizations tag
policies**. A tag policy, attached to an organizational unit or the
whole organization, defines which tag keys are required, which
capitalization is enforced, and which values are allowed for a given
key — and then reports (and can be configured to prevent) any
resource that violates it:

```
# Conceptual shape of an AWS Organizations tag policy (JSON)
{
  "tags": {
    "team": {
      "tag_value": { "@@assign": ["payments", "platform", "data"] },
      "enforced_for": { "@@assign": ["ec2:instance", "s3:bucket"] }
    }
  }
}
```

And remember Lesson 18's detail: enforcing that a `team` tag exists
is a separate step from making it usable in Cost Explorer. Even a
perfectly enforced tag has to be **activated as a Cost Allocation
Tag** in the Billing console before Cost Explorer will let you group
or filter by it.

## Key terms

| Term | Meaning |
|---|---|
| Tag taxonomy | A small, consistent set of tag keys (team, project, environment, application) applied uniformly across resources |
| Azure Policy | Azure's governance service; can deny creation of an untagged resource or append an inherited tag automatically |
| AWS tag policy | An AWS Organizations feature that defines required/allowed tag keys and values across accounts in an OU |
| Untagged bucket | The catch-all grouping in Cost Analysis/Cost Explorer for spend with no value for the tag being grouped by |

## Check yourself

You're ready for Lesson 20 when you can explain, without looking: why
does an inconsistent tag value (like `payments` vs. `Payments`) break
cost allocation even though every resource technically has a tag, and
what's the difference between enforcing a tag's existence and
activating it as a Cost Allocation Tag in AWS?
