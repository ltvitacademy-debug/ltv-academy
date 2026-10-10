# Lesson 15 — Package Versioning

**Chapter 3 · Packaging and Workflows · Lesson 15 of 22**

## What you'll learn

- The four-part version number format every package version carries
- Which parts you control and which the Dev Hub controls automatically
- What versionName and ancestry are for, separately from the version number
- The commands to create, list, and inspect package versions

## Four numbers, not three

A package version's number follows a **MAJOR.MINOR.PATCH.BUILD** format — for example, `1.2.0.3`. This looks like ordinary semantic versioning with an extra segment, and that extra segment is exactly the point:

- **MAJOR**, **MINOR**, **PATCH** — you set these yourself in `sfdx-project.json` or via `--version-number`, following your own judgment about the significance of a change (a breaking change bumps MAJOR, a backward-compatible feature bumps MINOR, a bug fix bumps PATCH).
- **BUILD** — the Dev Hub assigns this automatically and increments it every time you create a new version at the same MAJOR.MINOR.PATCH, so you never have to track it by hand. In `sfdx-project.json`, you'll often see `"versionNumber": "1.2.0.NEXT"` — the literal string `NEXT` telling the Dev Hub to compute the next build number itself rather than you guessing it.

## Creating a version

```bash
sf package version create --package "Expense Manager" --code-coverage --installation-key test1234 --wait 10
```

- `--code-coverage` calculates and records Apex code coverage for the version, required before a managed package version can later be promoted to released (Lesson 14).
- `--installation-key` sets a password-like protection customers must supply at install time, protecting the package's contents from unauthorized installation — the opposite choice from `--installation-key-bypass`, which you'd use for an internal unlocked package instead.

## versionName: a human label, separate from the number

Alongside the numeric version, every version carries a **versionName** — a free-text label like `"Spring Release"` or `"ver 1.2.0"` meant for humans, with no effect on install logic or ordering. The version number is what Salesforce and installing orgs reason about programmatically; versionName is purely for readability in your own release notes and Dev Hub listings.

## Ancestry: tracking what a version upgrades from

For managed packages specifically, each version can declare an **ancestor** — the specific prior version it's meant to upgrade from. Ancestry matters because Salesforce validates upgrade paths against it: it helps guarantee that a customer upgrading your package won't silently lose data or break because two incompatible versions' schemas collided. Ancestry is set via the `ancestorId` (or `ancestorVersion`) property when creating a new version, pointing at the specific previous version this one is a direct descendant of.

## Inspecting versions

```bash
sf package version list                    # all versions across your packages
sf package version report --package "Expense Manager@1.2.0-3"   # details on one specific version
```

## Key terms

| Term | Meaning |
|---|---|
| MAJOR.MINOR.PATCH.BUILD | The four-part package version number format |
| BUILD | The segment the Dev Hub auto-increments; often written as NEXT |
| versionName | A free-text, human-readable label for a version, with no effect on install logic |
| Ancestor version | The specific prior version a new managed package version is declared to upgrade from |

## Lab

A package currently has its latest released version at `2.1.0.5`. The team is about to ship a backward-compatible new feature (not a breaking change, not just a bug fix). Write out what the new version number should be, using `NEXT` for the segment the Dev Hub controls automatically, and explain which of MAJOR/MINOR/PATCH you bumped and why. Then explain, in your own words, why versionName wouldn't be a safe substitute for getting that numeric bump right.

## Check yourself

Can you name all four segments of a package version number and say which one the Dev Hub assigns automatically? Can you explain the practical difference between versionName and the version number itself, and what ancestry is used for?
