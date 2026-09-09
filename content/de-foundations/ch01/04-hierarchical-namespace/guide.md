# Lesson 4 — Hierarchical Namespace

**Chapter 1 · Azure Data Lake & Storage · Lesson 4 of 62**

## What you'll learn

- A deeper look at what hierarchical namespace actually is, beyond the
  single checkbox from Lesson 2
- The real, official **upgrade** path for turning an existing Blob-only
  account into ADLS Gen2 — and its real constraints
- Why the easy creation-time checkbox is almost always the better choice

## Beyond the checkbox

Lesson 2 showed the one setting that enables hierarchical namespace at
creation time. What that setting actually does is give the storage
service a real directory **index** — a structure it maintains
internally, separate from the blobs themselves, that tracks which
directories exist, what's inside each one, and how they nest. That index
is exactly what makes a directory rename or delete one atomic operation
instead of a scan across every blob whose name happens to share a prefix.

## The official upgrade path

What if you already have a Blob-only storage account, full of data, and
*now* want ADLS Gen2? Microsoft provides a real, supported migration —
but it's a genuine multi-step process, not a checkbox:

![The Data Lake Gen2 migration blade in the Azure Portal, showing three steps: Review account changes before upgrading, Validate account before upgrading, and Upgrade account, all marked \"Not started.\"](/courses/de-foundations/ch01/04-hierarchical-namespace/upgrade-to-an-azure-data-lake-gen2-account-page.png)
*Three real steps: review, validate, then upgrade. Each one has to pass before the next runs.*

Run it through to completion, and the portal confirms it:

![The same Data Lake Gen2 migration blade, now showing a success banner and all three steps marked Completed with green checkmarks.](/courses/de-foundations/ch01/04-hierarchical-namespace/upgrade-to-an-azure-data-lake-gen2-account-completed.png)
*All three steps completed — the account now has hierarchical namespace enabled, without recreating it from scratch.*

## The real constraints on that upgrade

This isn't a free action, and Microsoft is explicit about the tradeoffs:

- **It's one-way.** There's no supported path back to a Blob-only
  account once you've upgraded. Microsoft's own guidance is to validate
  the upgrade in a non-production environment first.
- **Several features must be disabled first.** Blob snapshots,
  encryption scopes, immutable storage, and soft delete (for both blobs
  and containers) all block the validation step if they're currently
  enabled — you have to turn them off before upgrading, and can only
  re-enable the ones ADLS Gen2 still supports afterward.
- **Validation can fail outright.** The "Validate" step exists
  specifically because not every account configuration is eligible —
  you find out *before* committing, not after.

## Why the checkbox is almost always the better choice

Given all of that, deciding hierarchical namespace **at creation time**
(Lesson 2's checkbox) avoids every one of these constraints entirely.
The upgrade path exists as a genuine safety net for data that's already
landed in a Blob-only account — not as a reason to skip the decision
up front.

## Key terms

| Term | Meaning |
|---|---|
| Directory index | The internal structure hierarchical namespace maintains, separate from the blobs themselves |
| Data Lake Gen2 migration | The official, one-way upgrade path from Blob-only to ADLS Gen2 |
| Validation | The upgrade's pre-check step — some account configurations simply aren't eligible |

## Lab

In the Azure Portal, on any existing storage account:

1. Open the account's **Settings** → **Data Lake Gen2 migration**.
2. Read through **Step 1: Review account changes before upgrading**
   without proceeding — note which of your account's current features,
   if any, would need to be disabled first.

## Check yourself

You're ready for Lesson 5 when you can explain, without looking: name
two features that must be disabled before the Data Lake Gen2 upgrade
will pass validation, and why the upgrade is one-way.
