# Lesson 3 — Source-Driven Development

**Chapter 1 · Salesforce DX Basics · Lesson 3 of 22**

## What you'll learn

- What "source format" means and how it differs from the Metadata API's raw zip format
- Why Git becomes the actual source of truth in this model
- What a typical source-driven development loop looks like day to day
- How this connects to source tracking, covered in depth in Chapter 2

## Two formats, one underlying metadata

Salesforce metadata — the definition of a custom object, an Apex class, a Flow — can be represented in two different file layouts. The **Metadata API format** (sometimes called "mdapi format") bundles each type into a flatter structure designed for the Metadata API's deploy/retrieve zip calls; it's the format Ant-based migration tools historically used. The **source format** breaks the same metadata into a more granular, readable folder structure that mirrors how a developer actually organizes a project — individual files per component, consistent naming, and companion `-meta.xml` files holding each component's metadata-only attributes alongside its content file (an Apex class's `.cls` file sits next to its `.cls-meta.xml`, for instance).

Source-driven development is built entirely on source format. The Salesforce CLI converts between the two formats when it needs to talk to the Metadata API under the hood, but as a developer, you read, write, and commit source format files.

## Git is the actual source of truth

This is the practical consequence of Lesson 1's big idea. In a source-driven workflow:

1. A developer creates or modifies metadata — a new custom field, an updated Apex trigger — as local source-format files, usually while working against a personal scratch org.
2. Those files get committed to Git, exactly like any other code change: a commit message, a pull request, a code review.
3. A CI pipeline or a teammate deploys that same committed source into another org (another scratch org for testing, a sandbox for QA, production for release).
4. If something goes wrong, you can look at Git history to see exactly what changed and when — something that's genuinely difficult to reconstruct from an org's own change history alone.

The org, in this model, never holds information that doesn't also exist in Git. If a change was made directly in an org and never retrieved into the project, from the project's point of view, it effectively doesn't exist yet.

## What the day-to-day loop looks like

A simplified cycle, which Chapter 4's practice labs walk through directly: create or reuse a scratch org, deploy your project's current source into it (`sf project deploy start`), make a change either in the org's UI (a new field, a Flow edit) or in your local files (an Apex class), then sync that change in whichever direction it needs to go — pull from the org into your files, or push your files into the org. Commit the result to Git. Chapter 2's lesson on source tracking explains exactly how the CLI detects which files actually changed, so you're not re-deploying your entire project every time.

## Why this matters beyond convenience

Teams that skip source-driven development and keep developing directly in shared sandboxes tend to lose track of who changed what, struggle to reproduce a bug because nobody can say what the org looked like last Tuesday, and have no reliable way to automate testing before a release. Source-driven development doesn't eliminate the possibility of mistakes, but it makes every change visible, reviewable, and reversible — the same guarantees a software team gets from treating their code as the real, versioned artifact instead of trusting a running server's current state.

## Key terms

| Term | Meaning |
|---|---|
| Source format | The granular, per-component file layout used by Salesforce DX projects |
| Metadata API format (mdapi format) | The flatter, zip-oriented layout used by the raw Metadata API |
| `-meta.xml` file | The companion file holding a component's metadata attributes alongside its content file |
| Source of truth | The authoritative record of what metadata should exist — Git, in source-driven development |

## Lab

Pick any one Salesforce metadata type you're familiar with (a custom field, a Permission Set, a Flow). Write a short paragraph describing what you'd expect its source-format file(s) to look like — a readable file (or files) with a sensible name, versus a single opaque entry buried inside a larger retrieved zip. You don't need CLI access to do this: reason it through based on what source-driven development is trying to achieve.

## Check yourself

Can you explain the practical difference between source format and Metadata API format in your own words? Can you describe what it means to say "if a change isn't in Git, it effectively doesn't exist yet" in a source-driven workflow?
