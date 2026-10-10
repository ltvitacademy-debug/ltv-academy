# Lesson 10 — Retrieving and Deploying Source

**Chapter 2 · Projects and Metadata · Lesson 10 of 22**

## What you'll learn

- The two core commands that move metadata between your project and an org
- The key flags that narrow a deploy or retrieve to specific metadata
- How to preview a deploy before running it, and how test levels work
- What these commands replaced, so older tutorials make sense

## Two commands, two directions

```bash
sf project deploy start     # local project → org
sf project retrieve start   # org → local project
```

These two `sf`-style commands replace six deprecated `sfdx`-era commands: `force:source:push`, `force:source:pull`, `force:source:deploy`, `force:source:retrieve`, `force:mdapi:deploy`, and `force:mdapi:retrieve`. `project deploy start` covers what both `push` and `deploy` used to do; `project retrieve start` covers what both `pull` and `retrieve` used to do. The distinction that used to matter — source-tracked push/pull versus explicit deploy/retrieve — now lives inside how you call the same unified command, which Lesson 12 covers in depth.

## Deploying

With no narrowing flags, on a source-tracked org (like a fresh scratch org), `sf project deploy start` deploys every local change since the last sync — on the very first run, that means your entire project:

```bash
sf project deploy start --target-org myScratch
```

To deploy only specific metadata rather than everything:

```bash
sf project deploy start --source-dir force-app/main/default/classes --target-org myScratch
sf project deploy start --manifest manifest/package.xml --target-org myScratch
sf project deploy start --metadata ApexClass:MyController --target-org myScratch
```

## Previewing before you deploy

```bash
sf project deploy preview --target-org myScratch
```

This shows what a deploy would change — which components, any conflicts with changes already in the org, and anything the `.forceignore` file would exclude — without actually deploying anything. It's the safe way to check your work before committing to a real deploy, especially against a shared or production-bound target.

## Test levels

When Apex classes or triggers are part of a deploy, the `--test-level` flag controls which Apex tests run as part of validating it:

- **`NoTestRun`** — skips tests entirely (only allowed for development-type targets: sandbox, Developer Edition, trial, or scratch orgs — never production).
- **`RunSpecifiedTests`** — runs only the classes you name with `--tests`; each deployed class and trigger needs at least 75% coverage.
- **`RunLocalTests`** — runs every test in the org except tests belonging to installed managed/unlocked packages. This is the default behavior production deployments fall back to when Apex is involved.
- **`RunAllTestsInOrg`** — runs every test in the org, including package tests.

```bash
sf project deploy start --source-dir force-app --test-level RunLocalTests --target-org myScratch
```

## Retrieving

```bash
sf project retrieve start --manifest manifest/package.xml --target-org myScratch
```

On a fresh org with no changes yet, `project retrieve start` with no flags does nothing — there's nothing new to pull. On later runs, it brings in changes made directly in the org (by you or anyone else connected to it) into your local source-format files.

## Key terms

| Term | Meaning |
|---|---|
| `sf project deploy start` | Deploys local source into an org; replaces force:source:push/deploy and force:mdapi:deploy |
| `sf project retrieve start` | Retrieves org metadata into local source; replaces force:source:pull/retrieve and force:mdapi:retrieve |
| `sf project deploy preview` | Shows what a deploy would change, without actually deploying |
| `--test-level` | Controls which Apex tests run during a deploy (NoTestRun, RunSpecifiedTests, RunLocalTests, RunAllTestsInOrg) |

## Lab

Using a scratch org from Chapter 1 (or reasoning through it without one), run `sf project deploy preview --target-org myScratch` before deploying anything, note what it reports, then run `sf project deploy start --source-dir force-app/main/default/classes --test-level RunSpecifiedTests --tests MyControllerTest --target-org myScratch`. Explain in your own words why you'd want to preview before an unfamiliar deploy, especially one you didn't build yourself.

## Check yourself

Can you name which single deprecated commands each of `sf project deploy start` and `sf project retrieve start` replaced? Can you explain the difference between the four `--test-level` values and which org types `NoTestRun` is restricted to?
