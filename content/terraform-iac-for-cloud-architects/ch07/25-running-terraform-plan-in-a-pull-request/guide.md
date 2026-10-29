# Lesson 25 — Running terraform plan in a Pull Request

**Chapter 7 · Terraform in CI/CD · Lesson 1 of 4**

## What you'll learn

- Why a Terraform change deserves the same pull-request review as application
  code, and why that review is only useful if the reviewer can see the actual
  plan
- How to trigger a GitHub Actions workflow on `pull_request` so
  `terraform plan` runs automatically before anyone merges
- How to capture `terraform plan`'s output from a workflow step and post it
  back onto the pull request as a comment
- Why `continue-on-error` plus a separate status-check step keeps a failed
  plan from quietly disappearing instead of blocking the merge

## Why the plan belongs in the pull request

Application code gets reviewed before it merges — a teammate reads the diff
and says yes or no before the change ships. Infrastructure code deserves the
same discipline, but a raw `.tf` diff doesn't actually tell a reviewer what
will happen in the cloud. Adding one line to a `for_each` map, or changing a
single argument, can mean "create one new VM" or it can mean "destroy and
recreate twelve of them." The only way to know for sure is to run
`terraform plan` and read its output — so instead of trusting a reviewer to
run that locally, the pipeline runs it automatically and posts the result
directly onto the pull request, where the reviewer already is.

## Triggering on every pull request

The workflow's trigger is what makes this automatic. `on: pull_request` fires
the job every time a PR is opened or updated — no one has to remember to run
anything:

```yaml
name: Terraform Plan

on:
  pull_request:

permissions:
  contents: read
  pull-requests: write

jobs:
  plan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: hashicorp/setup-terraform@v3

      - name: Terraform Init
        run: terraform init

      - name: Terraform Plan
        id: plan
        run: terraform plan -no-color
        continue-on-error: true
```

`permissions: pull-requests: write` is required later in the job — without it
the workflow can run `plan` fine but won't be allowed to post a comment back
onto the PR. `continue-on-error: true` on the plan step matters too: a plan
that fails (a bad variable, a provider error) still needs to show up as a
comment on the PR, not just vanish because the step stopped the job early.

## Posting the plan as a PR comment

With the plan captured in `steps.plan.outputs.stdout`, `actions/github-script`
turns it into a real comment, using the same GitHub API a human would call by
hand:

```yaml
      - uses: actions/github-script@v7
        env:
          PLAN: "${{ steps.plan.outputs.stdout }}"
        with:
          script: |
            const body = `#### Terraform Plan\n\`\`\`\n${process.env.PLAN}\n\`\`\``;
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body,
            });

      - name: Terraform Plan Status
        if: steps.plan.outcome == 'failure'
        run: exit 1
```

`github.rest.issues.createComment` posts straight onto the pull request
`context.issue.number` is already running against — a pull request *is* a
GitHub issue under the hood, which is why the issues API works here. The
final `Terraform Plan Status` step is what actually fails the check if the
plan errored: because the plan step used `continue-on-error: true`, this
separate step is the one responsible for turning that failure into a red X
on the PR.

## Key terms

| Term | Meaning |
|---|---|
| `on: pull_request` | Workflow trigger that fires on every PR open and update |
| `continue-on-error: true` | Lets a step fail without stopping the job, so a later step can still report the result |
| `actions/github-script` | Official action that runs JavaScript with an authenticated GitHub API client already wired up |
| `steps.plan.outputs.stdout` | The captured console output of an earlier step, referenced by that step's `id` |

## Check yourself

You're ready for Lesson 26 when you can explain, without looking: why does
posting the real plan output as a PR comment give a reviewer something a
`.tf` file diff alone cannot?
