# Lesson 18 — Deployment

**Chapter 4 · Analytics and Delivery · Lesson 18 of 25**

## What you'll learn

- The sandbox types Solstice's release process moves through, and what each one is for
- Change sets versus source-driven deployment, and which this capstone uses
- The `sf project deploy start` workflow, including validation-only runs
- A minimal CI pipeline that runs Apex tests automatically before deployment

## Sandbox types in Solstice's path to production

A Salesforce org typically has more than one non-production environment, each sized and refreshed differently for a different stage of work:

| Sandbox type | Typical use | Refresh interval |
|---|---|---|
| **Developer** | One developer's individual scratch-org-style work (this capstone's scratch orgs effectively fill this role) | On demand, frequent |
| **Developer Pro** | Larger data/storage allowance for a small team's shared dev work | On demand |
| **Partial Copy** | A sample of production data for realistic integration testing | Every 5 days |
| **Full** | A complete copy of production data and metadata, for final staging/UAT | Every 29 days |

This capstone's own work happens in scratch orgs (Lesson 5), but the release path toward Solstice's real production org would move a completed feature through a Partial Copy sandbox for integration testing before a Full sandbox or a final validation deployment to production.

## Change sets vs. source-driven deployment

A **change set** is Salesforce's point-and-click deployment tool: you select components in a sending org's Setup UI and push them to a connected receiving org. It works, but it has real limits for a project like this one — it has no concept of version history, no code review step built in, and it's easy to forget a dependency (a field a Flow references, a permission set a trigger's class needs). This capstone instead uses **source-driven deployment**: the Git repository from Lesson 5 is the single source of truth, and the Salesforce CLI deploys directly from those tracked files.

```bash
# Validate the deployment without actually deploying (a dry run)
sf project deploy start --source-dir force-app --dry-run --test-level RunLocalTests

# Deploy for real, running all local Apex tests as part of the deployment
sf project deploy start --source-dir force-app --test-level RunLocalTests
```

`--test-level RunLocalTests` runs every Apex test in the org (excluding managed-package tests) as part of the deployment itself — this is what actually enforces the 75% coverage requirement from Lesson 10 at deploy time, rather than leaving it to someone's memory to check first.

## A minimal CI pipeline

Source-driven deployment pairs naturally with continuous integration: a pipeline that runs automatically on every push, catching a broken test or a missing dependency before it ever reaches a shared org.

```yaml
# .github/workflows/deploy-check.yml
name: Validate Deployment
on: [pull_request]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install Salesforce CLI
        run: npm install -g @salesforce/cli
      - name: Authenticate to Dev Hub
        run: sf org login sfdx-url --sfdx-url-file <(echo "$DEVHUB_SFDX_URL") --set-default-dev-hub
      - name: Create scratch org and deploy
        run: |
          sf org create scratch --definition-file config/project-scratch-def.json --alias ci-scratch --set-default
          sf project deploy start --source-dir force-app --test-level RunLocalTests
```

Every pull request against this repository triggers this pipeline: a fresh scratch org is created, the full codebase deploys into it, and all local Apex tests run — a pull request can't merge if any of that fails, which is the deployment pipeline acting as the gate Lesson 2's maintainability non-functional requirement calls for.

## Key terms

| Term | Meaning |
|---|---|
| Sandbox | A non-production Salesforce org used for a specific stage of development or testing |
| Change set | Salesforce's point-and-click, UI-driven deployment tool between connected orgs |
| Source-driven deployment | Deploying directly from version-controlled metadata files, with Git as the source of truth |
| `--test-level RunLocalTests` | Deployment flag that runs all local Apex tests as part of the deploy, enforcing coverage |
| CI pipeline | An automated process that validates every change (build, deploy, test) before it merges |

## Lab

Run both `sf project deploy start` commands above (dry-run, then real) against your own scratch org from Lesson 5's project. Then write a `deploy-check.yml` GitHub Actions file matching the structure above for this project's repository.

## Check yourself

- Why does this capstone use source-driven deployment instead of change sets?
- What does `--test-level RunLocalTests` actually enforce during a deployment?
- What specifically does the CI pipeline prevent from happening, per this lesson?
