# Lesson 17 — Org Shapes and Org Snapshots Overview

**Chapter 3 · Packaging and Workflows · Lesson 17 of 22**

## What you'll learn

- What an org shape captures, and what it deliberately does not
- What an org snapshot captures that an org shape doesn't
- The commands for creating and using each
- When you'd reach for one versus the other

## Two different problems, two different features

Both org shapes and org snapshots exist to make scratch org creation faster and more realistic, but they solve different problems. An **org shape** captures an existing org's **features, settings, licenses, and limits** — the configuration describing what kind of org it is — without capturing any of its actual data or metadata content. An **org snapshot** goes further: it captures a scratch org's **metadata and data** together, as a point-in-time copy, so a new scratch org can be created already populated instead of starting empty.

## Org shapes: matching an org's configuration

If your production org has specific licenses, Platform features, or settings enabled that a plain Developer-edition scratch org wouldn't have by default, a plain `edition`-based definition file (Lesson 6) won't reproduce that environment. An org shape solves this:

```bash
sf org create shape --target-org myProdOrg
```

This captures the shape of `myProdOrg`. To build a scratch org matching it, the scratch org definition file uses `sourceOrg` instead of `edition`, set to the source org's 15-character org ID (not the full 18-character ID):

```json
{
  "orgName": "Shape-Matched Scratch Org",
  "sourceOrg": "00DB1230000Ifx5"
}
```

```bash
sf org create scratch --definition-file config/shape-scratch-def.json --target-dev-hub DevHub
```

If the Dev Hub, the source org, and the resulting shape are all on the same Salesforce release, that minimal file (just `orgName` and `sourceOrg`) is enough; during a release transition, you'd add a `release` option set to `previous` or `preview`.

## Org snapshots: a faster starting line

Setting up a scratch org that needs a long chain of setup steps — deploying a large volume of metadata, running data-seeding scripts, configuring complex settings — every single time is slow. An **org snapshot** captures a scratch org's metadata and data together as a reusable starting point:

```bash
sf org create snapshot --source-org myScratch --name baseline-snapshot --description "post-setup-script baseline, commit abc123"
```

Snapshot creation is asynchronous; check on it with `sf org get snapshot --name baseline-snapshot`. Two real constraints apply: the source scratch org used to create a snapshot can't itself have been created from a snapshot, and it can't have been created with a namespace. Once a snapshot exists, create new scratch orgs from it directly, skipping the setup entirely:

```bash
sf org create scratch --snapshot baseline-snapshot --target-dev-hub DevHub --wait 10
```

Both Dev Hub enablement and the Scratch Org Snapshots feature specifically need to be enabled in your Dev Hub org before snapshots work.

## Choosing between them

Use an org shape when the problem is "my scratch org needs the same configuration as a real org." Use an org snapshot when the problem is "creating a correctly set-up scratch org from scratch takes too long every single time." They're not mutually exclusive — a project could in principle use shape-matching to get the right configuration and still rely on snapshots to skip repeated setup work, though a snapshot's source org restrictions (no shape, no namespace) mean you can't combine the two on the exact same scratch org.

## Key terms

| Term | Meaning |
|---|---|
| Org shape | A captured copy of an org's features, settings, licenses, and limits (no data/metadata) |
| Org snapshot | A captured copy of a scratch org's metadata and data together, as a reusable starting point |
| `sf org create shape` | Captures the shape of a source org |
| `sf org create snapshot` | Captures a snapshot of a scratch org's metadata and data |

## Lab

A team's scratch orgs normally take 20 minutes to set up because of a long post-deploy data-seeding script. Separately, their production org has a specific add-on license their scratch orgs don't currently have. Identify which of org shapes or org snapshots solves each of these two problems, and write the CLI command sequence you'd use to solve the 20-minute setup problem specifically.

## Check yourself

Can you state, in one sentence each, what an org shape captures and what an org snapshot captures? Can you explain the two restrictions on a scratch org that's being used as the source for a new snapshot?
