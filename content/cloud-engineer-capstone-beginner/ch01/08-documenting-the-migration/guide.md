# Lesson 8 — Documenting the Migration for the Team

**Chapter 1 · Beginner Capstone: Migrating the First Workload to Azure · Lesson 8 of 10**

## What you'll learn

- Why the migration isn't actually finished until someone other than Theo could operate it
- What a short runbook needs to cover, and what it can safely leave out
- How to document the new environment so "where does X live now" has a written answer
- Why documentation gets written before the cutover presentation, not after

## Why this step isn't optional

Right now, exactly one person — Theo — knows where the product images live, how `vm-catalog01`
is configured, and what the alert rule actually watches. If Theo is out sick during launch week,
or simply isn't the one who gets paged at 2 a.m., that knowledge needs to already be written
down somewhere Priya or another teammate can find it. A migration that only lives in one
person's head isn't actually done — it's just undocumented risk with a deadline attached.

## What the runbook needs to cover

A short, practical runbook — not a lengthy design document — covering exactly what someone would
need during an incident or a handoff:

- **Resource inventory**: the resource group name, and what's inside it — the storage account,
  container name and access tier, the VM name, size, and image, and the Log Analytics workspace
  — in one table, not scattered across chat history.
- **Where the images live now**: the Blob Storage container and the URL pattern the app builds,
  so "why isn't this image loading" has a documented starting point instead of a guess.
- **How to reach the VM**: the connection method (SSH, admin username) and where the application
  code and its service definition live on the VM, so restarting the app doesn't require
  reverse-engineering Lesson 5 from memory.
- **What the alert watches, and who it notifies**: the CPU threshold, the evaluation window, and
  the Action Group's membership — so an on-call teammate who gets the 2 a.m. email knows exactly
  what triggered it without guessing.
- **Known limitations**: explicitly restating the Lesson 2 scope — one VM, no auto-scaling, no
  CI/CD — so nobody assumes capabilities that were never built.

## A short example entry

```markdown
## Resource Inventory
| Resource | Name | Notes |
|---|---|---|
| Resource group | rg-driftwood-eastus-catalog | everything for this project |
| Storage account | stdriftwoodimages | Standard_LRS, StorageV2 |
| Blob container | product-images | Hot tier |
| VM | vm-catalog01 | Standard_B2s, Ubuntu 22.04 |
| Log Analytics workspace | law-driftwood-catalog | — |
| Alert | alert-catalog01-high-cpu | avg CPU > 80% for 5 min |
| Action Group | ag-driftwood-ops | emails Theo and Priya |
```

That table alone answers most of "what exists and where" without anyone needing to run a single
CLI command first.

## Why this comes before the cutover presentation

Lesson 9 is about presenting the go-live plan to Priya — and a presentation built on top of
documentation that doesn't exist yet is a presentation built on sand. Writing the runbook first
means Lesson 9's plan can reference something real and already written, instead of promising to
write it up "after launch," which is exactly when nobody has time to.

## Key terms

| Term | Meaning |
|---|---|
| Runbook | A short, practical document covering what's running, where, and how to operate or troubleshoot it |
| Resource inventory | A table listing every resource created for a project, by name and purpose |
| Tribal knowledge | Operational knowledge that exists only in one person's head, undocumented |
| Known limitations | An explicit statement of what a system deliberately does not do, to prevent false assumptions |

## Lab

Write your own resource inventory table and a short "known limitations" section for Driftwood's
migration, covering everything created from Lesson 3 onward. Keep it short enough that a
teammate could read the whole thing in under five minutes.

## Check yourself

You're ready for Lesson 9 when you can explain, from memory, why a migration that only exists in
one person's head isn't actually finished, and name the five things a short runbook needs to
cover for this project.
