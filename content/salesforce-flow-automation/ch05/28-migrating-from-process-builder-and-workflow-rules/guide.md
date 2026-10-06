# Lesson 28 — Migrating From Process Builder and Workflow Rules

**Chapter 5 · Flow in Practice · Lesson 28 of 31**

## What you'll learn

- What "end of support" actually means for Workflow Rules and Process Builder, and what it doesn't
- How the Migrate to Flow tool converts existing automation, one rule at a time
- Why a migrated flow starts out inactive, and the one-click way to switch over safely
- Why a pile of freshly migrated 1:1 flows is exactly the automation-sprawl problem from two lessons ago

## End of support, not a shutdown

As of December 31, 2025, Salesforce **no longer supports** Workflow Rules and Process Builder — no further bug fixes, no new features, no guaranteed troubleshooting help. That is not the same as a shutdown: existing active workflow rules and processes **continue to run and execute automation** exactly as before. The practical message is "move off these on your own timeline, because we're not maintaining them anymore," not "this breaks on a specific date."

## The Migrate to Flow tool: one rule in, one flow out

Found in Setup under **Process Automation → Migrate to Flow**, the tool lists your existing workflow rules and processes and converts them **one at a time** — one Workflow Rule becomes one new Flow. It's not a bulk, all-at-once conversion, and it's deliberately a **1-to-1** mapping: whatever a single workflow rule did becomes a single new flow doing the same thing.

The tool is also smart about *which kind* of flow it creates:

- A workflow rule that **only updates fields** becomes a **before-save flow** — significantly faster than an after-save flow, since it updates the record in memory before the save rather than triggering a second save.
- A workflow rule with a **send email action, outbound message, or time-dependent action** becomes an **after-save flow** instead, because those actions aren't supported in a before-save context.

## Migrated flows start inactive — on purpose

After conversion, the **original workflow rule stays active** and the **new flow is created inactive**. Nothing about your org's live automation changes the moment you run the migration. This gives you room to open the new flow in Flow Builder, read through it, debug it with sample data, and confirm it behaves the same way the old rule did — before anything real depends on it. When you're satisfied, Salesforce provides a one-click **switch activations** action that deactivates the old workflow rule and activates the new flow together, so there's no window where both or neither are running.

## The trap: migrating 1:1 recreates the sprawl problem

Here's the catch worth calling out explicitly: if an object has eight old workflow rules, running Migrate to Flow on all eight gives you **eight new, separate flows** — technically modern, but structurally the exact automation sprawl covered in Automation Architecture two lessons back. The tool's job is converting old automation types into Flow syntax; it is not responsible for good flow architecture. Once you've migrated and verified each piece individually, the next real step is consolidating those newly migrated flows into one flow per object per trigger context, with Decision elements doing the branching — not leaving eight small flows standing in for eight old rules.

## Key terms

| Term | Meaning |
|---|---|
| End of support | No more bug fixes or new features from Salesforce; existing automation keeps running |
| Migrate to Flow | Setup tool that converts one workflow rule or process into one new flow |
| Switch activations | One-click action that deactivates the old rule and activates the new flow together |
| Post-migration consolidation | Combining freshly migrated 1:1 flows per the one-flow-per-object-per-context pattern |

## Check yourself

An object has five active workflow rules. You run Migrate to Flow on all five and activate each resulting flow individually. What have you actually accomplished, and what step from Lesson 26 still needs to happen?
