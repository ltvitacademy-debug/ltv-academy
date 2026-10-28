# Lesson 22 — Automating Tag Compliance Checks

**Chapter 6 · Automating Operational Tasks · Lesson 22 of 32**

## What you'll learn

- Why tags silently rot — a resource created without one doesn't announce that it's missing
- How to write a script that scans every resource in a subscription for required tags and reports what's missing
- Why this script needs to run on a schedule, not just once after a cleanup push
- How to read the compliance report and act on it

## Tags rot quietly

Chapter 1's tagging discipline and Lesson 21's `AutoShutdown` tag both depend on one assumption:
that the tags are actually there. That assumption breaks down fast in practice. Someone provisions
a VM through the portal at 11 PM without filling in the tags field. A script creates a storage
account and nobody updated it to set `CostCenter`. Nothing fails when a tag is missing — the
resource works exactly the same either way — which is precisely why missing tags go unnoticed for
months. Cost analysis (Lesson 28 of the Azure Administration course) quietly stops attributing that
resource's spend to the right project, and `AutoShutdown` schedules quietly skip VMs that were
supposed to be included. Nothing alerts anyone; the tag is just absent.

## What "required tags" means here

A subscription typically settles on a small set of **required tags** — commonly `CostCenter` and
`Environment` (values like `Production`, `Dev`, `Test`). The goal isn't to tag everything with
everything; it's to guarantee those specific keys exist on every resource, so cost reporting and
automation scripts that key off them never silently miss one.

## The compliance-check script

This script pulls every resource in the subscription, checks each one for the required tag keys,
and reports anything missing one:

```
# check-tag-compliance.ps1
$requiredTags = @("CostCenter", "Environment")
$allResources = Get-AzResource
$nonCompliant = @()

foreach ($resource in $allResources) {
    $tags = $resource.Tags
    foreach ($key in $requiredTags) {
        if (-not $tags -or -not $tags.ContainsKey($key)) {
            $nonCompliant += [PSCustomObject]@{
                Name         = $resource.Name
                ResourceType = $resource.ResourceType
                MissingTag   = $key
            }
        }
    }
}

$nonCompliant | Format-Table -AutoSize
```

Two details matter. First, `$tags.ContainsKey($key)` — not just checking whether `$tags` exists —
because a resource can have some tags and still be missing one specific required key. Second, the
**or** check: `-not $tags` catches a resource with no tags at all, since calling `.ContainsKey()` on
a null object would error out rather than report the resource as non-compliant.

## Running it on a schedule, not once

A one-time cleanup pass fixes today's non-compliant resources, but new ones get created every week,
and this script's entire value is catching those before they've been un-tagged for months. The same
Azure Automation runbook-and-schedule pattern from Lesson 21 applies here: publish this script as a
runbook, attach a weekly schedule, and let it email or log the non-compliant list automatically
rather than waiting for someone to remember to run it by hand.

## Reading and acting on the report

The output is a flat list — resource name, type, and which required tag it's missing. The follow-up
is almost always the same `Update-AzTag` call from Lesson 21, run against each resource in the
report, filling in the specific missing key with the correct value once someone (or a downstream
script, for well-known resource naming patterns) determines what it should be.

## Key terms

| Term | Meaning |
|---|---|
| Required tag | A tag key a subscription has decided must exist on every resource, e.g. CostCenter |
| Non-compliant resource | A resource missing one or more required tag keys |
| ContainsKey | A method that checks whether a specific key exists in a tag collection, distinct from checking whether any tags exist at all |
| Compliance report | The list of non-compliant resources and which tag each one is missing |

## Check yourself

You're ready for Lesson 23 when you can explain, without looking: why does a missing tag never
cause an error on its own, and why does that silence make a scheduled compliance-check script
necessary instead of a one-time cleanup?
