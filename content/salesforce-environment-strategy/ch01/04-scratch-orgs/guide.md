# Lesson 4 — Scratch Orgs

**Chapter 1 · Environments · Lesson 4 of 14**

## What you'll learn

- What a scratch org is and how it's fundamentally different from a sandbox
- How a scratch org's definition file and Dev Hub relationship work
- Scratch org lifespan: the default and maximum duration, and what expiration means
- When a scratch-org-based strategy fits better than a sandbox-based one
- Why scratch orgs push an org toward source-driven development by design

## A scratch org is built from source, not copied from an org

Every sandbox type in Lesson 3 shares one trait: it's created by copying an *existing* org — production's metadata, and for some types, production's data. A **scratch org** works the opposite way. It isn't copied from anywhere. It's a brand-new, temporary Salesforce org created from scratch (hence the name) based entirely on a **scratch org definition file** — a JSON file, checked into version control, that specifies the edition, features, and settings the org should have.

That difference matters more than it sounds. A sandbox inherits whatever accumulated configuration production happens to have at refresh time, good and bad. A scratch org starts empty and is built up only by applying source — metadata pushed or deployed from a repository. If something isn't captured in that source, it simply doesn't exist in the scratch org. This makes a scratch org a strict test of whether an org's configuration is actually fully represented in version control, which is exactly the discipline source-driven development is trying to enforce.

## Dev Hub and the creation flow

Scratch orgs are created from a **Dev Hub** — a production or Developer Edition org enabled to spawn them — using Salesforce CLI commands against a project's source and its scratch org definition file. Because creation is a CLI/source operation rather than a point-and-click Setup action, scratch orgs fit naturally into CI/CD pipelines: a build process can spin one up, deploy a branch's source into it, run automated tests against it, and tear it down automatically, all without a human ever logging in.

## Lifespan and expiration

Scratch orgs are deliberately temporary. At creation, a duration is chosen in days — the default is 7 days, and the maximum allowed is 30 days. Once a scratch org expires, it's gone permanently; there's no restoring it, and nothing of value should have been relying on it existing past that window. This is a feature, not a limitation: it forces the discipline that nothing important can live only inside a scratch org, because it's guaranteed to disappear.

This also means scratch orgs are a poor fit for anything meant to persist — don't use one as a long-running shared testing environment, and don't load real customer data into one. Salesforce's own guidance is to treat scratch org data as synthetic test data, not production-sourced records, which fits neatly with the metadata-only, disposable role this tier plays in the promotion path.

## Scratch orgs vs. sandboxes, revisited

Lesson 2 introduced this choice; with the mechanics now in view, the actual trade-off is:

| | Sandbox | Scratch org |
|---|---|---|
| Created by | Copying metadata (and sometimes data) from an existing org | Building from a definition file and source, from nothing |
| Lifespan | Persists until refreshed or deleted | Expires automatically, 7-day default, 30-day maximum |
| Best fit | Teams relying on a persistent, stateful environment | Teams practicing source-driven development, CI/CD pipelines |
| Risk if misused | Configuration drifts without ever being captured in source | Work is lost if it was never actually committed to source |

Neither replaces Lesson 3's sandboxes entirely — most real environment strategies still use Partial Copy and Full sandboxes for data-dependent testing and staging, since scratch orgs have no mechanism to carry real production data in. Scratch orgs specifically compete with Developer and Developer Pro sandboxes at the development tier.

## Key terms

| Term | Meaning |
|---|---|
| Scratch org | A temporary, disposable Salesforce org created from a definition file and source, not copied from an existing org |
| Scratch org definition file | A JSON file specifying the edition, features, and settings a scratch org should have |
| Dev Hub | A production or Developer Edition org enabled to create and manage scratch orgs |
| Scratch org lifespan | How long a scratch org exists before automatic, permanent expiration (default 7 days, maximum 30) |

## Lab

A team currently does all its development in long-lived Developer sandboxes that have accumulated years of configuration no one fully remembers building. They want to move to a source-driven, CI/CD-friendly approach using scratch orgs instead. Describe, as a short sequence of steps, what has to be true about their metadata *before* a scratch-org-based switch could safely happen — specifically, what risk does moving straight to scratch orgs expose if their existing sandbox configuration was never actually captured in version control?

## Check yourself

Can you explain the fundamental difference between how a sandbox is created and how a scratch org is created? Can you state the default and maximum scratch org lifespan, and explain why that expiration is treated as a deliberate design feature rather than a drawback to work around?
