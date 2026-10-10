# Lesson 22 — DX Best Practices

**Chapter 4 · Practice · Lesson 22 of 22**

## What you'll learn

- A consolidated set of practices pulled from every prior lesson in this course
- Why each one exists, not just what it is
- How these practices reinforce each other rather than standing alone
- What to actually do differently on your next real project

## Version control discipline

Commit `sfdx-project.json`, everything under `config/`, your `.forceignore`, and all of `force-app/` to Git (Lessons 3, 7, 8). None of this is optional or personal preference — a teammate cloning your repo and running `sf project deploy start` against their own scratch org should get a working result with zero undocumented manual steps. If something has to exist for your project to deploy correctly, it has to be in Git.

## Treat scratch orgs as genuinely disposable

Don't let scratch orgs quietly accumulate. Delete them when you're done (Lesson 5, Lesson 20) instead of letting them expire passively — this isn't just tidiness, it's what keeps you from hitting your Dev Hub's active scratch org allocation at the worst possible moment (Lesson 21). If a scratch org took real setup effort to get right, that's exactly what an org snapshot (Lesson 17) is for — capture it once, stop re-paying the setup cost every time.

## Let source tracking do its job

Resist the urge to manually hunt for "what changed" before every deploy. Source tracking (Lesson 12) already knows; a flagless `sf project deploy start` on a tracked org sends exactly what changed since the last sync. Reach for `--source-dir`, `--metadata`, or `--manifest` when you specifically need to narrow beyond that, not as your default habit.

## Keep .forceignore intentional, not an afterthought

A sloppy `.forceignore` pattern is a common, confusing source of "my file won't deploy" bugs (Lesson 21). Write patterns deliberately, test them with `sf project deploy preview` (Lesson 10) before trusting them, and don't copy a `.forceignore` from an unrelated project without reading what it actually excludes.

## Package deliberately, not reflexively

Not everything needs to be a package. Unpackaged metadata in your default package directory is completely fine for org-specific configuration that will never be reused elsewhere. Reach for an unlocked package (Lesson 13) when metadata genuinely needs to move between multiple internal orgs as a versioned unit, and reserve managed packages (Lesson 14) for the specific case of distributing software you don't control the installation environment of. Picking the wrong one costs you real, hard-to-reverse decisions later — namespace linkage (Lesson 16) and release promotion (Lesson 14) both go one way only.

## Respect governor-limit and test-coverage discipline from day one

Even in a disposable scratch org, write Apex that would actually pass `--test-level RunLocalTests` in a real deploy (Lesson 10) — don't develop sloppy and assume you'll "fix tests later." Later deploys to real environments won't give you that option.

## Never commit secrets

Authentication happens through the CLI's own stored connections (`sf org login web`), never through credentials typed into a committed file. If a script needs to authenticate non-interactively (a CI pipeline, for instance), that's a JWT-based auth flow using a connected app and a private key kept out of version control — a topic beyond this course's scope, but the principle holds everywhere: nothing that grants access belongs in Git.

## Key terms

| Term | Meaning |
|---|---|
| Version control discipline | Everything required to deploy correctly must be committed, nothing assumed |
| Deliberate disposal | Actively deleting scratch orgs instead of letting them passively expire |
| Intentional `.forceignore` | Writing and testing ignore patterns rather than copying them blindly |
| Packaging deliberately | Choosing unpackaged, unlocked, or managed based on actual reuse/distribution needs, not habit |

## Lab

Review your own Lesson 19-20 practice project against this lesson's six practices, one at a time. For each one, write a sentence stating whether your project followed it, and if not, what you'd change. Then pick the single practice you think would have caused you the most trouble if you'd skipped it, and explain why, using a concrete failure scenario from Lesson 21.

## Check yourself

Can you name all six practices covered in this lesson without looking back? Can you explain, for at least two of them, a specific real consequence (tied to an earlier lesson) of ignoring that practice?
