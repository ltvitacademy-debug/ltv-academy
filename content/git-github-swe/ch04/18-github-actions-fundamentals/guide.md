# Lesson 18 — GitHub Actions Fundamentals

**Chapter 4 · CI/CD Basics · Lesson 18 of 22**

## What you'll learn

- Where a workflow file lives, and the minimal structure GitHub needs
- The shape of a workflow: triggers, jobs, and steps
- Finding and reading a workflow run on the Actions tab
- Reading step-level logs to see exactly what ran, and when

## Where a workflow lives

Every GitHub Actions workflow is a YAML file inside
`.github/workflows/` at the root of a repository. GitHub scans that
exact folder automatically — committing a file there is the entire
setup, no separate registration step anywhere in GitHub's settings:

```yaml
# .github/workflows/explore.yml
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

Three pieces make up every workflow: `on` (the trigger — what event
starts this run), `jobs` (one or more units of work, each running on
its own fresh virtual machine), and `steps` (the ordered commands or
reusable actions inside a job). `uses: actions/checkout@v4` is the
single most common step in any workflow — it's a reusable, published
action that clones your repository onto the runner, since a fresh
virtual machine otherwise starts with no code on it at all.

## Finding it on the Actions tab

Once that file is committed and pushed, GitHub runs it automatically
on the next matching event. Every run — past and present, across every
workflow file in the repository — shows up on the **Actions** tab:

![GitHub's repository navigation bar — github/docs — showing Code, Issues 46, Pull requests 19, Discussions, and Actions, with the Actions tab highlighted.](/courses/git-github-swe/ch04/18-github-actions-fundamentals/actions-tab-global-nav-update.png)
*Every workflow run for this repository, across every workflow file, lives here.*
Source: [GitHub Docs — Quickstart for GitHub Actions](https://docs.github.com/en/actions/get-started/quickstart)

## Reading a completed run

Clicking into a run shows the summary GitHub generates for it — what
triggered it, how long it took, and whether each job succeeded:

![A workflow run summary for "Explore-GitHub-Actions": triggered via push 9 minutes ago by octocat, status Success, total duration 17 seconds, with a green checkmark next to the job in the sidebar.](/courses/git-github-swe/ch04/18-github-actions-fundamentals/actions-quickstart-job.png)
*Everything you need at a glance: what triggered this, how long it took, and whether it passed.*
Source: [GitHub Docs — Quickstart for GitHub Actions](https://docs.github.com/en/actions/get-started/quickstart)

## Reading step-level logs

Clicking into the job itself expands every step, in the order it
actually ran, each with its own timing and output:

![An expanded job log for "Explore-GitHub-Actions" showing each step — Set up job, several echo commands, Check out repository code, List files in the repository, Complete job — each with a green checkmark and a duration.](/courses/git-github-swe/ch04/18-github-actions-fundamentals/actions-quickstart-logs.png)
*This is where you actually debug a failing pipeline — click into the specific step that failed, not the job as a whole.*
Source: [GitHub Docs — Quickstart for GitHub Actions](https://docs.github.com/en/actions/get-started/quickstart)

When a real pipeline fails — a test suite, a linter, a build step —
this exact view is where you find out which specific step failed and
read its output, rather than guessing from the job's overall red X.

## Key terms

| Term | Meaning |
|---|---|
| `.github/workflows/` | The exact folder GitHub scans for workflow files — no separate registration |
| `on` | The trigger block defining what event starts a workflow run |
| Job | A unit of work in a workflow, running on its own fresh virtual machine |
| Step | One command or reusable action inside a job, run in order |
| Actions tab | Where every workflow run for a repository is listed |

## Lab

1. Add a minimal workflow file to a real repository's
   `.github/workflows/` folder, triggered on push, with at least two
   `echo` steps and a `uses: actions/checkout@v4` step.
2. Push it, then find the resulting run on the Actions tab.
3. Click into the job and read the expanded step logs — confirm each
   step ran in the order you wrote it, with its own duration.

## Check yourself

You're ready for Lesson 19 when you can find a specific past workflow
run on GitHub and read exactly which step ran, in what order, and how
long each one took — without guessing.
