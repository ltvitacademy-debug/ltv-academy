# Lesson 10 — Delta Deployments

**Chapter 2 · Pipelines in Practice · Lesson 10 of 19**

## What you'll learn

- Why deploying an entire DX project on every single pipeline run doesn't scale
- What `sfdx-git-delta` actually does, and the real commands to generate and deploy a delta
- Why it needs full Git history to work, and what `fetch-depth: 0` has to do with that
- The fallback discipline Lesson 6 already told you to keep, applied specifically here

## The problem a delta deployment solves

A full deploy sends the entire contents of your source directory to the target org every time — every Apex class, every object, every Flow, whether or not it changed. On a small project that's fine. On a large org with hundreds of components, deploying everything on every pull request is slow, and slow pipelines quietly erode the "fast feedback" principle from Lesson 6. A **delta deployment** instead computes exactly which components changed between two Git commits and deploys *only* those.

## sfdx-git-delta, the real tool

**SFDX-Git-Delta (SGD)** is a community-maintained Salesforce CLI plugin — not an official Salesforce product — that compares two Git references and generates a `package.xml` of everything that changed, plus a `destructiveChanges.xml` for anything deleted or renamed. Install and run it:

```bash
sf plugins install sfdx-git-delta

sf sgd source delta \
  --to "HEAD" \
  --from "HEAD~1" \
  --output "."
```

This produces a `package/package.xml` (additions and modifications) and a `destructiveChanges/destructiveChanges.xml` (deletions) describing only what changed between the two commits. Deploy using those generated manifests instead of the whole source tree:

```bash
sf project deploy start \
  --manifest package/package.xml \
  --post-destructive-changes destructiveChanges/destructiveChanges.xml \
  --test-level RunLocalTests \
  --target-org ci-target
```

The plugin needs the `git` command line available on the runner (true by default on GitHub's hosted runners) and a reasonably current Node.js version.

## Why full Git history matters

SGD computes its diff by comparing two actual commits in the repository's history. A GitHub Actions checkout defaults to a **shallow clone** — just the single commit that triggered the run, with no history behind it. If SGD can't see the previous commit, it has nothing to diff against. The fix is telling the checkout action to fetch everything:

```yaml
      - name: Check out full history
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
```

`fetch-depth: 0` tells `actions/checkout` to pull the entire commit history instead of just the latest commit — the detail this lesson's delta commands depend on to have anything to compare against.

## Keeping the fallback Lesson 6 told you to keep

This is the concrete case Lesson 6's "always have a fallback" principle was written for. If the diff is computed against the wrong base commit — a force-push rewrote history, a merge commit confuses the comparison, a rename isn't detected correctly — SGD can produce an incomplete manifest, and a pipeline that blindly trusts it will deploy a partial, possibly broken change without anyone noticing until something's missing in the target org. The plugin's own maintainers advise getting a full-deployment pipeline working and trusted *first*, adding delta deployment as a speed optimization on top of it *second*, and keeping a manually-triggerable full-deploy workflow available as an escape hatch even after the delta path is working reliably — rather than removing the slower, safer option the moment the faster one seems to work.

## Key terms

| Term | Meaning |
|---|---|
| Delta deployment | Deploying only the metadata that changed between two Git commits |
| SFDX-Git-Delta (SGD) | Community CLI plugin that generates a delta package.xml / destructiveChanges.xml |
| `--post-destructive-changes` | Deploy flag applying a destructive-changes manifest alongside the regular deploy |
| Shallow clone | A checkout containing only the latest commit, with no history to diff against |
| `fetch-depth: 0` | Checkout setting that pulls full Git history instead of a shallow clone |

## Lab

Write the three commands, in order, a pipeline step would run to: install the `sfdx-git-delta` plugin, generate a delta between the current commit and the one before it outputting to the current directory, and deploy the resulting manifests with `RunLocalTests` against an org aliased `staging`. Then explain what would go wrong if you ran this against a checkout that used the default shallow clone instead of `fetch-depth: 0`.

## Check yourself

Can you explain, specifically, why SGD needs full Git history and what setting fixes that in a GitHub Actions checkout step? Can you explain why keeping a full-deploy fallback available matters even after a delta pipeline is working reliably?
