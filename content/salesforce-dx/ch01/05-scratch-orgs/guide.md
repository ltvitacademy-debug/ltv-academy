# Lesson 5 — Scratch Orgs

**Chapter 1 · Salesforce DX Basics · Lesson 5 of 22**

## What you'll learn

- What a scratch org is and how it differs from a sandbox
- The four ways to create one, per the Salesforce CLI
- Key lifecycle facts: duration, expiration, and disposability
- The core commands to create, open, list, and delete scratch orgs

## A disposable org for one job

A **scratch org** is a full Salesforce org, created on demand from your Dev Hub, configured by a JSON definition file (covered in the next lesson), and meant to be thrown away. Unlike a sandbox — which is a long-lived copy of production that a whole team shares and that someone has to actively maintain — a scratch org exists to answer one narrow question: "does this feature work, built on exactly this configuration, right now?" When you're done, you delete it and create a fresh one next time. This disposability is the point, not a limitation: nobody has to clean up stale data, nobody's half-finished feature is sitting in an org someone else needs, and every scratch org starts from a known, reproducible baseline defined by its definition file.

Scratch orgs are also **source-tracked by default** — the CLI automatically keeps track of what's changed in them since your last sync, which Chapter 2's source tracking lesson covers in depth.

## Four ways to create a scratch org

The `sf org create scratch` command supports four creation methods, and three of its key flags (`--edition`, `--snapshot`, `--source-org`) are mutually exclusive with each other:

1. **From a definition file** — the normal path, and the one you'll use for the rest of this course:
   ```bash
   sf org create scratch --definition-file config/project-scratch-def.json --alias myScratch --set-default --target-dev-hub DevHub
   ```
2. **From just an edition flag**, with no definition file, for the simplest possible case.
3. **From a snapshot** (`--snapshot`), recreating a previously captured point-in-time copy of a scratch org — covered in Chapter 3.
4. **From an org shape** (`--source-org`), matching the features and settings of an existing org — also covered in Chapter 3.

## Lifecycle: duration and expiration

Scratch orgs expire automatically. The `--duration-days` flag sets how long one lives, from **1 to 30 days**, and if you don't specify it, the **default is 7 days**. Once a scratch org expires, it's gone — there's no way to extend an already-expired org or recover its contents. This is a deliberate constraint that keeps Dev Hub scratch org counts manageable and keeps developers in the habit of treating scratch orgs as disposable rather than as a long-term home for anything.

## The commands you'll use constantly

```bash
sf org open --target-org myScratch        # open the org in your browser
sf org list                               # see every org the CLI knows about, including scratch orgs
sf org delete scratch --target-org myScratch --no-prompt   # delete it early, before it expires on its own
```

If a creation request is taking a while, you can run it asynchronously with `--async`, which returns immediately with a job ID, and later resume waiting on it with `sf org resume scratch`.

## Key terms

| Term | Meaning |
|---|---|
| Scratch org | A disposable, source-tracked org created on demand from a Dev Hub |
| `--duration-days` | How many days (1-30, default 7) a scratch org lives before expiring |
| `sf org open` | Opens the specified org in your default browser |
| `sf org delete scratch` | Deletes a scratch org before it expires naturally |

## Lab

Using the Dev Hub you authenticated in Lesson 4 (or reasoning through it if you don't have one handy), run: `sf org create scratch --definition-file config/project-scratch-def.json --alias practice-org --set-default --duration-days 3`. Once it finishes, run `sf org open --target-org practice-org` to confirm it opens, then `sf org list` to see it listed. Finally, delete it early with `sf org delete scratch --target-org practice-org --no-prompt` rather than waiting the full 3 days — practicing the full disposability habit this lesson describes.

## Check yourself

Can you explain the core difference in purpose between a scratch org and a sandbox? Can you name all four ways to create a scratch org, and the valid range plus default for `--duration-days`?
