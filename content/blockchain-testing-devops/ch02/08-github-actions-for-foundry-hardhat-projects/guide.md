# Lesson 8 — GitHub Actions for Foundry/Hardhat Projects

**Chapter 2 · CI/CD for Smart Contracts · Lesson 8 of 29**

## What you'll learn

- The real `foundry-toolchain` GitHub Action and a working CI workflow YAML
- What each step in that workflow actually does, in order
- What a passing run looks like in GitHub's own Actions UI — the list, the job summary, and the step logs
- Why `forge fmt --check` and `forge build --sizes` belong in CI alongside the test suite itself

## A real, working workflow

`foundry-rs/foundry-toolchain` is the official GitHub Action that installs Foundry on a runner. A minimal, real CI workflow for a Foundry project looks like this:

```yaml
name: CI
on:
  push:
  pull_request:
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
        with:
          submodules: recursive

      - name: Install Foundry
        uses: foundry-rs/foundry-toolchain@v1

      - name: Run Forge fmt
        run: forge fmt --check

      - name: Run Forge build
        run: forge build --sizes

      - name: Run Forge tests
        run: forge test -vvv
```

`submodules: recursive` matters specifically for Foundry projects, since dependencies (OpenZeppelin, forge-std) are usually installed as git submodules, not an npm-style package manager — skip it and the build fails on missing imports. `forge fmt --check` fails the build on unformatted code without rewriting anything, which is exactly what you want in CI (rewriting files in a CI run would leave the PR branch out of sync with what got tested). `forge build --sizes` catches a contract that's crept past the 24KB EIP-170 size limit before a deploy script ever tries it on a real network.

## What this looks like, running

Every push and PR triggers a run, visible in the repo's **Actions** tab as a list of workflow runs with their status:

![GitHub Actions' workflow run list, showing a real completed run with its status, branch, and duration](/courses/blockchain-testing-devops/ch02/08-github-actions-for-foundry-hardhat-projects/gh-actions-workflow-runs.png)

Clicking into a run shows the job summary — trigger, status, total duration, and which job(s) ran:

![A GitHub Actions job summary page, showing trigger event, Success status, and total duration for a real run](/courses/blockchain-testing-devops/ch02/08-github-actions-for-foundry-hardhat-projects/gh-actions-job-summary.png)

And the step-by-step log shows exactly which step ran, in order, with its own timing — this is where a failed `forge test` step shows you the actual revert or assertion failure:

![GitHub Actions' step-by-step log view for a job, each step expandable with its own timing](/courses/blockchain-testing-devops/ch02/08-github-actions-for-foundry-hardhat-projects/gh-actions-step-logs.png)

## Caching speeds this up

By default, `foundry-toolchain` caches RPC responses, Etherscan queries, and other fetched data in `~/.foundry/cache`, so fork tests (Lesson 4) and Etherscan verification calls in later jobs don't re-fetch from scratch on every single run.

## Key terms

| Term | Meaning |
|---|---|
| `foundry-toolchain` | The official GitHub Action that installs Foundry on a CI runner |
| `forge fmt --check` | Fails the build on unformatted code without rewriting it |
| `forge build --sizes` | Reports contract bytecode size, catching the 24KB limit before deploy |

## Check yourself

You're ready for Lesson 9 when you can explain, without looking: why does `submodules: recursive` matter specifically for a Foundry project's checkout step?
