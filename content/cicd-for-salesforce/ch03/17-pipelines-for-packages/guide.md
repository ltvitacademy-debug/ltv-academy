# Lesson 17 — Pipelines for Packages

**Chapter 3 · Operating Pipelines · Lesson 17 of 19**

## What you'll learn

- How packaging changes the deployment target from "an org" to "a versioned package"
- The real `sf package create` / `sf package version create` commands and the Dev Hub they depend on
- Why every new package version starts as beta, and what has to happen before release
- A realistic CI pattern: a beta package version created automatically on every pull request

## Packages are a different deployment target

Everything through Lesson 16 deployed metadata directly into a specific org. **Second-generation packaging (2GP)** — specifically unlocked packages, the modern approach for internal, non-AppExchange packages — works differently: metadata gets bundled into a versioned, installable **package**, and that package version is what gets installed into any org, rather than metadata being deployed org-by-org. This matters for CI/CD because the pipeline's job shifts from "deploy to this org" to "produce a trustworthy, versioned artifact" — closer to how a typical software pipeline publishes a build artifact than to the direct-deploy pattern the rest of this course covers.

## Creating the package and a version

A package is declared once, as a container in `sfdx-project.json`:

```bash
sf package create \
  --name "Core Automation" \
  --package-type Unlocked \
  --path force-app \
  --target-dev-hub my-devhub
```

Every subsequent version comes from:

```bash
sf package version create \
  --package "Core Automation" \
  --installation-key-bypass \
  --wait 10 \
  --target-dev-hub my-devhub
```

Both commands require an authenticated **Dev Hub** — a special org enabled for package creation and scratch orgs, referenced explicitly with `--target-dev-hub` since, just like Lesson 9's target org, nothing about a CI runner implies a default. A scratch org definition file can be supplied (directly via `--definition-file`, or referenced in `sfdx-project.json`) to control what the ephemeral org used during version creation looks like.

## Every version starts as beta

A newly created package version is marked beta the moment it's created — that's true regardless of whether a human or a CI job triggered the command. Beta versions can be installed freely into scratch orgs and sandboxes for testing, which is exactly the right scope for a pipeline validating a pull request: creating a beta version automatically doesn't commit anyone to shipping it. Promoting a version to released (making it installable into production orgs) is a separate, deliberate step — again mirroring the Continuous Delivery pattern from Lesson 1 and 5, where the automated path produces something verified and ready, and a distinct, intentional action turns that into a real release.

## The 75% gate applies here too

Before a package version can be promoted and released, its Apex code has to meet the same minimum 75% code coverage requirement that gates any other production-bound Apex deployment (Lesson 2). A version that doesn't meet it can still be installed into scratch orgs and sandboxes for testing — just not released for general org installation — so a CI job validating coverage on every package version it creates catches this well before anyone attempts to promote it.

## A realistic CI pattern

A pipeline building packaged metadata commonly creates a new beta package version automatically whenever a pull request opens against the default branch, runs the package's tests against the scratch org that version creation spins up, and writes the resulting version ID back to the pull request (as a comment or a check) so a reviewer can install that exact version into their own scratch org and try it before approving. Promotion to released status stays a deliberate, separate action — not something that happens on every PR.

## Key terms

| Term | Meaning |
|---|---|
| Unlocked package (2GP) | A versioned, installable metadata bundle, the modern non-AppExchange packaging format |
| Dev Hub | A special org enabled for package creation and scratch orgs |
| `sf package version create` | The CLI command producing a new, beta-by-default package version |
| Package promotion | The deliberate action of marking a beta version released, making it production-installable |

## Lab

Write the two commands a CI job would run to: create a new version of an existing package named "Billing Extensions" using a Dev Hub aliased `release-devhub`, bypassing the installation key, and waiting up to 15 minutes. Then explain, in your own words, why creating that version automatically on every pull request is safe, while promoting it to released status is deliberately not automated the same way.

## Check yourself

Can you explain what changes about the deployment target once a team adopts packaging, compared to the direct org deploys earlier chapters covered? Can you explain why every new package version starts as beta, and what has to be true before one gets promoted to released?
