# Lesson 18 — GitHub Actions Basics

**Chapter 4 · CI/CD Concepts · Lesson 18 of 25**

## What you'll learn

- Where a workflow file lives, and the minimal structure that makes
  GitHub recognize it
- Finding and reading a workflow run on the Actions tab
- What a successful run actually shows you, step by step
- Reading step-level logs to understand exactly what ran

## Where a workflow lives

Every GitHub Actions workflow is a YAML file inside
`.github/workflows/` at the root of a repository — GitHub scans that
exact folder automatically, no separate registration step required.
Committing a file there is the entire "setup":

```yaml
name: Explore GitHub Actions
on: [push]
jobs:
  explore:
    runs-on: ubuntu-latest
    steps:
      - run: echo "This job was triggered by a push."
      - uses: actions/checkout@v4
      - run: echo "The repository has been cloned to the runner."
```

## Finding it on the Actions tab

Once that file is committed and pushed, GitHub runs it automatically
on the next matching event. Every run — past and present — shows up
on the repository's **Actions** tab:

![GitHub's repository navigation bar with the Actions tab highlighted.](/courses/git-cicd/ch04/18-github-actions-basics/actions-tab-global-nav-update.png)
*Every workflow run for this repository, across every workflow file, lives here.*
Source: [GitHub Docs — Quickstart for GitHub Actions](https://docs.github.com/en/actions/get-started/quickstart)

## Reading a completed run

Clicking into a run shows the summary GitHub generates for it — what
triggered it, how long it took, and whether each job succeeded:

![A workflow run summary: triggered via push, status Success, total duration 17s, with a green checkmark next to the job name in the sidebar.](/courses/git-cicd/ch04/18-github-actions-basics/actions-quickstart-job.png)
*Everything you need at a glance: what triggered this, how long it took, and whether it passed.*
Source: [GitHub Docs — Quickstart for GitHub Actions](https://docs.github.com/en/actions/get-started/quickstart)

## Reading step-level logs

Clicking into the job itself expands every step, in the order it
actually ran, each with its own timing and output:

![An expanded job log showing each step — Set up job, several echo commands, Check out repository code, List files in the repository — each with a green checkmark and a duration.](/courses/git-cicd/ch04/18-github-actions-basics/actions-quickstart-logs.png)
*This is where you actually debug a failing pipeline — click into the specific step that failed, not the job as a whole.*
Source: [GitHub Docs — Quickstart for GitHub Actions](https://docs.github.com/en/actions/get-started/quickstart)

When a real pipeline fails — a dbt test, a linter — this exact view is
where you find out which specific step failed and read its output,
rather than guessing from the job's overall red X.

## Key terms

| Term | Meaning |
|---|---|
| `.github/workflows/` | The exact folder GitHub scans for workflow files — no separate registration |
| Actions tab | Where every workflow run for a repository is listed |
| Run summary | The top-level view of a run: trigger, duration, and job status |
| Step log | The expanded, step-by-step output of one job's execution |

## Lab

1. Add a minimal workflow file to a real repository's
   `.github/workflows/` folder, triggered on push, with at least two
   `echo` steps.
2. Push it, then find the resulting run on the Actions tab.
3. Click into the job and read the expanded step logs — confirm each
   step ran in the order you wrote it.

## Check yourself

You're ready for Lesson 19 when you can find a specific past workflow
run on GitHub and read exactly which step ran, in what order, and how
long each one took — without guessing.
