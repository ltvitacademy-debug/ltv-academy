# Lesson 15 — Handling Failed Deployments

**Chapter 3 · Operating Pipelines · Lesson 15 of 19**

## What you'll learn

- The common real reasons a Salesforce deployment fails in CI, beyond "the code was wrong"
- How to actually read the error output a failed deploy gives you
- Why Salesforce has no built-in one-click rollback, and what teams do instead
- The pre-deploy snapshot habit that makes a recovery possible at all

## Reading a failure, not just seeing one

A red X on a GitHub Actions run tells you something failed; it doesn't tell you what. The actual diagnostic information lives in that step's log — for a deploy step run with `--json`, the output includes a structured list of component-level failures, each with a file, a line (for Apex), and a specific error message. Common real causes, beyond a straightforwardly wrong line of code:

- **Missing dependency metadata** — a component references a custom field, a custom object, or a permission set that isn't included in this deployment's manifest, so the target org has nothing to resolve the reference against.
- **Apex test failures** — a test asserting against data or configuration that doesn't exist in the target org the way it exists wherever the test was last verified.
- **Validation rule or required-field conflicts** — a deployed record-triggered automation runs during a test and collides with a validation rule already active in the target org.
- **Governor limit violations surfaced only under test data volumes** different from what a developer's own sandbox happened to have.

Reading the log top to bottom, stopping at the first failure rather than trying to interpret every line at once, is the practical habit Lesson 7 already pointed at — it holds just as true for a deploy failure as for any other step's failure.

## There is no built-in "undo" button

Salesforce has no native one-click rollback for a metadata deployment. Once a deploy succeeds, the org's metadata is simply in its new state — there's no platform feature that reverts it automatically. This is a genuinely different failure mode than most of the checks earlier chapters covered: those checks (tests, validation, static analysis) exist specifically to catch a problem *before* it reaches the org, because once it's there, getting back out is real, manual work.

## What teams actually do instead

The standard pattern combines two things:

- **Git revert and redeploy.** Revert the commit (or pull request) that introduced the problem, then redeploy the restored state — effectively, deploying backward to the previous known-good metadata. This works cleanly for a coupled set of changes; reverting and redeploying a single file in isolation is riskier if other components depended on it, so the safer default is reverting the full commit, not just the one file that looks broken.
- **A pre-deployment snapshot.** Before a production deploy, retrieve the metadata that deployment is about to touch into a dated backup folder:

```bash
sf project retrieve start \
  --manifest package.xml \
  --target-org production \
  --output-dir "backup/pre-deploy-$(date +%Y-%m-%d)"
```

If the git-revert path turns out to be messier than expected — say, the deployment also created new components a revert alone won't remove — that retrieved snapshot is the fallback you can redeploy directly, matching the "always have a fallback" principle from Lesson 6, applied here to recovery rather than to delta-deployment risk.

## What a rollback does not cover

A metadata rollback, however you perform it, does not touch **data** — reverting a Custom Field's metadata doesn't restore values a Flow already wrote to records using that field, and a change made directly in production outside of version control (an admin's manual click) was never captured by Git in the first place, so there's nothing to revert it to. Lesson 16 covers data and configuration deployment specifically because this gap is real and distinct from the metadata problem this lesson addresses.

## Key terms

| Term | Meaning |
|---|---|
| Component-level failure | A specific file/line/message in a deploy's structured error output |
| Git revert and redeploy | Reverting the offending commit, then redeploying the restored metadata state |
| Pre-deployment snapshot | A retrieved backup of metadata about to be touched, taken before deploying |
| `sf project retrieve start` | The CLI command that pulls metadata from an org into local files |

## Lab

Write the exact `sf project retrieve start` command you'd run immediately before a production deployment described by `package.xml`, saving the snapshot into a dated backup folder. Then describe, for a hypothetical failed deploy that both modified an existing Apex class and created a brand-new Custom Field, why a plain git revert alone might not be enough to fully undo it, and what additional step would be needed.

## Check yourself

Can you name three real causes of a Salesforce deployment failure beyond "the code was simply wrong"? Can you explain why Salesforce's lack of a built-in rollback makes the pre-deployment snapshot habit genuinely necessary rather than just good practice?
