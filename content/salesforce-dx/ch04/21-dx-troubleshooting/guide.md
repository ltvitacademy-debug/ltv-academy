# Lesson 21 — DX Troubleshooting

**Chapter 4 · Practice · Lesson 21 of 22**

## What you'll learn

- The most common error you'll hit, and the three real causes behind it
- How to read a deploy failure that names specific failed components
- Why a forceignore mistake looks like a missing-file bug
- What to do about metadata types with limited Metadata API coverage

## "No default Dev Hub found" (or similar Dev Hub errors)

This is the single most common early error, and it almost always has one of three causes, covered individually back in Lesson 4:

1. Dev Hub was never enabled in the target org's Setup.
2. The CLI was never authenticated to that org (`sf org login web --set-default-dev-hub` was never run).
3. An org is authenticated, but nothing was ever set as the *default* Dev Hub, and you didn't pass `--target-dev-hub` explicitly on the command.

Run `sf org list` first — it tells you immediately which of the three you're dealing with: no Dev Hub-flagged org at all (cause 1 or 2), or a Dev Hub-flagged org present but not marked default (cause 3, fixed with `sf config set target-dev-hub=<alias>`).

## Deploy failures naming specific components

A failed `sf project deploy start` typically names exactly which components failed and why — read that output carefully rather than assuming the whole deploy is broken. Common real causes: a compile error in an Apex class (fix the code, redeploy just that file); a failing Apex test when `--test-level` required running tests (the deploy is correctly blocking on genuinely broken code, not malfunctioning); a component referencing another component that doesn't exist yet in the target org (deploy order matters when dependencies aren't all included in the same deploy); or a scratch org that's hit resource limits for its edition.

## "My file isn't deploying and I don't know why"

Before assuming something is broken, check `.forceignore` (Lesson 7, Lesson 22). A pattern meant to exclude one thing can accidentally match more than intended — a loosely written glob pattern can silently exclude an entire folder you meant to keep. Run `sf project deploy preview --target-org myOrg` (Lesson 10) first; its output explicitly lists anything being ignored, which immediately tells you whether a forceignore rule, not a deploy bug, is the real cause.

## Scratch org creation hitting a limit

Scratch org creation can fail because the Dev Hub has hit its **active scratch org allocation** — the maximum number of non-expired scratch orgs a given Dev Hub edition is allowed at once. The fix isn't a CLI flag; it's actually deleting scratch orgs you're done with (`sf org delete scratch`, Lesson 5) rather than letting a growing pile of "I'll get back to this" orgs sit around until they expire naturally.

## Metadata types with limited API coverage

If a specific metadata type behaves unexpectedly when you retrieve or deploy it — missing entirely, or only partially captured — check Salesforce's published Metadata Coverage Report (Lesson 9) before assuming your project is misconfigured. Some types are retrieve-only, some only partially supported; that's a documented platform limitation, not something a different CLI flag will fix.

## Key terms

| Term | Meaning |
|---|---|
| Default Dev Hub error | Usually: not enabled, not authenticated, or not marked default |
| `sf project deploy preview` | Surfaces forceignore exclusions and conflicts before you assume a bug |
| Active scratch org allocation | The Dev Hub's limit on simultaneous non-expired scratch orgs |
| Metadata Coverage Report | Explains type-specific retrieve/deploy limitations that aren't bugs |

## Lab

A teammate reports: "I ran `sf org create scratch` and it says I can't create any more scratch orgs, but I deleted the one I was using yesterday." Walk through what you'd actually check — don't just guess — to find the real cause: is the deletion actually confirmed (`sf org list`, checking for lingering expired-but-not-deleted entries), or is a completely different, forgotten scratch org still active and counting against the same limit?

## Check yourself

Can you name the three distinct causes behind a "no default Dev Hub" error and how `sf org list` helps you tell them apart? Can you explain why `sf project deploy preview` is the right first step when a file mysteriously isn't deploying, before assuming the deploy command itself is broken?
