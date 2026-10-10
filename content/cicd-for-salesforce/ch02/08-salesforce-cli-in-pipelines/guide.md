# Lesson 8 — Salesforce CLI in Pipelines

**Chapter 2 · Pipelines in Practice · Lesson 8 of 19**

## What you'll learn

- How to extend Lesson 7's workflow with a real `sf project deploy start` step
- The deploy flags that matter most in a CI context: `--test-level`, `--wait`, `--async`, `--coverage-formatters`
- Why CI always runs the CLI non-interactively, and what that implies for every flag you choose
- How a deploy step's exit code becomes the thing that actually gates the rest of the pipeline

## Picking up where Lesson 7 left off

Lesson 7 built a workflow that installs the Salesforce CLI and confirms it works. The next step is the actual deploy:

```yaml
      - name: Deploy metadata
        run: |
          sf project deploy start \
            --source-dir force-app \
            --test-level RunLocalTests \
            --target-org ci-target \
            --wait 60 \
            --coverage-formatters json \
            --json
```

- **`--source-dir force-app`** — tells the CLI exactly which part of the DX project to deploy, matching whatever `packageDirectories` your `sfdx-project.json` defines.
- **`--test-level RunLocalTests`** — explicit, per the warning from Lesson 2: never let a shared CI pipeline fall back on the default test level.
- **`--target-org ci-target`** — the alias of whichever org this job authenticated into (Lesson 9 covers how that alias gets there).
- **`--wait 60`** — the CLI's default wait is 33 minutes; a large deployment with `RunLocalTests` can legitimately need longer, so pipelines often raise this explicitly rather than let a slow run get cut off mid-deploy.
- **`--coverage-formatters json`** — emits coverage data in a machine-readable format a later step could parse (for a coverage badge, a dashboard, or a quality-gate check in Lesson 11). Repeat the flag to emit more than one format if you need both a human report and a machine-readable one.
- **`--json`** — wraps the whole command's output as JSON instead of human-readable text, which is what later pipeline steps generally want to parse. A human reviewing a failed run would usually drop this flag locally to get a more readable error.

## Non-interactive by nature

Every flag choice in a CI context has to assume nobody is watching the terminal to answer a prompt. `sf project deploy start` with no `--target-org` would normally rely on whatever default org is set locally — that concept doesn't exist cleanly on a disposable CI runner that starts from nothing every time, which is exactly why Lesson 9's authentication step always ends by setting an explicit, named target org alias rather than relying on an implicit default.

## The exit code is the gate

A CI step's job, mechanically, is to run a command and check whether it exited with status 0 (success) or non-zero (failure). GitHub Actions stops the job the moment any step exits non-zero, unless you've explicitly told it to continue (`continue-on-error: true` — almost never what you want for a deploy step). This is what makes `sf project deploy start` a usable *gate*, not just a command: if any Apex test fails, if coverage falls short, if a component fails to compile, the command exits non-zero, the workflow step fails, GitHub marks the run red, and — if this step guards a pull request — the PR shows a failing check that blocks merge, assuming branch protection requires it.

## Key terms

| Term | Meaning |
|---|---|
| `--source-dir` | Which part of the DX project (matching `packageDirectories`) to deploy |
| `--wait` | Minutes the CLI waits for a deploy to finish before returning; default 33 |
| `--coverage-formatters` | Output format(s) for code coverage data; repeatable for multiple formats |
| Exit code | The success (0) / failure (non-zero) signal a CI step uses to gate the pipeline |
| `continue-on-error` | A GitHub Actions step setting that lets the job proceed even after a failing step |

## Lab

Write a complete deploy step for a workflow that: deploys only the `force-app/main/default` directory, uses `RunSpecifiedTests` for the single test class `AccountTriggerTest`, waits up to 15 minutes, and outputs JSON. Then explain, in one or two sentences, what would show up in the GitHub Actions UI if that Apex test failed, and why the pipeline would correctly refuse to proceed to any later step.

## Check yourself

Can you explain why `--wait` matters more in a CI pipeline than it does when you run the same command on your own laptop? Can you explain, mechanically, how a failing Apex test inside a deploy command turns into a red X on a pull request?
