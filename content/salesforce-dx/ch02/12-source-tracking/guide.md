# Lesson 12 — Source Tracking

**Chapter 2 · Projects and Metadata · Lesson 12 of 22**

## What you'll learn

- What source tracking actually does under the hood
- How it changes the behavior of deploy and retrieve commands
- Conflict detection and how to resolve it
- When and why you'd deliberately disable it

## What "source-tracked" means

A **source-tracked** org — every scratch org by default, and some sandboxes if explicitly enabled — has the Salesforce CLI maintaining a record of exactly which metadata components have changed locally since the last sync, and which components have changed in the org since the last sync. This is the mechanism that makes `sf project deploy start` and `sf project retrieve start` smart: run with no narrowing flags, they don't blindly deploy or retrieve everything every single time — they act on just the changed set.

## How this changes deploy and retrieve behavior

On a source-tracked org, the very first `sf project deploy start` deploys everything in your project, because from the CLI's point of view, every local file is "new" relative to an empty tracking baseline. Every run after that deploys only the files that changed since the last deploy or retrieve — a one-line tweak to a single Apex class deploys just that class, not your entire `force-app` tree. The same logic applies in reverse to `sf project retrieve start`: the first run on a brand-new org has nothing to retrieve (nothing's changed yet), and later runs bring in only what changed in the org since you last synced — including changes made by teammates connected to the same org, not just your own.

Narrowing flags like `--source-dir`, `--metadata`, or `--manifest` still work on a tracked org — they just further restrict an already-tracked change set to a specific subset you name explicitly.

## Conflicts

Because both sides (local files and the org) can change independently between syncs, the CLI can detect a **conflict**: the same component changed both locally and in the org since the last sync, with no way to automatically know which version should win. The deploy and retrieve commands report conflicts directly rather than silently picking one side. To force the operation anyway and keep whichever side you're actively pushing or pulling:

```bash
sf project deploy start --ignore-conflicts --target-org myScratch
sf project retrieve start --ignore-conflicts --target-org myScratch
```

Using `--ignore-conflicts` means accepting that you're deliberately overwriting the other side's version — it's a decision to make consciously, not a default habit, since it can silently discard a teammate's change made directly in a shared org.

## Turning source tracking off

Source tracking has a real cost: it has to query and compare state on every operation, which adds time. In automated pipelines — especially CI jobs that spin up a scratch org, deploy a known-good manifest, run tests, and tear the org down — nobody needs change tracking for an org that exists for minutes and is deployed to exactly once. You can skip it at creation time:

```bash
sf org create scratch --definition-file config/project-scratch-def.json --no-track-source --target-dev-hub DevHub
```

Without tracking, deploy and retrieve commands require you to be explicit about what to move (`--source-dir`, `--manifest`, or `--metadata`), since there's no tracked change set for a flagless command to fall back on.

## Key terms

| Term | Meaning |
|---|---|
| Source tracking | The CLI's record of what's changed locally vs. in the org since the last sync |
| Conflict | A component changed on both sides (local and org) since the last sync |
| `--ignore-conflicts` | Forces a deploy or retrieve to proceed despite detected conflicts |
| `--no-track-source` | Disables source tracking at scratch org creation, often used for CI |

## Lab

Walk through this scenario on paper: you deploy your project to a fresh scratch org (full deploy, nothing tracked yet). A teammate, connected to the same org, adds a new field directly in Setup. Meanwhile, you edit the Apex class that will reference that field locally, but haven't deployed yet. Explain what `sf project retrieve start` would and wouldn't bring in at this point, and what would happen if you then ran `sf project deploy start` without first retrieving your teammate's field.

## Check yourself

Can you explain why the very first deploy to a scratch org always deploys everything, while later deploys only send what changed? Can you describe what a "conflict" is in source tracking terms, and name the flag that forces past one?
