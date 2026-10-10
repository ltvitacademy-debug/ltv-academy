# Lesson 13 — Monitoring Pipelines

**Chapter 2 · Pipelines in Practice · Lesson 13 of 19**

## What you'll learn

- Where every workflow run actually lives in the GitHub UI, and how to read a run's logs
- The difference between watching a pipeline live and finding out about a failure after the fact
- How to get a failure actively pushed to you instead of relying on someone checking the Actions tab
- What's actually worth tracking over time, beyond individual pass/fail runs

## Where runs live

Every workflow run for a repository appears under that repository's **Actions** tab. The left sidebar lists every workflow file by its `name:` field; clicking into one shows every past run of it, newest first, each with a status (success, failure, in progress) and a duration. Clicking into an individual run opens a live, streaming log broken out by job and by step — a green check next to a step that succeeded, a red X next to the one that failed, with the exact output that step produced. This is the same view Lesson 7 pointed at when you first pushed a workflow file; this lesson is about using it as an ongoing discipline, not just a one-time check.

## Pull, don't wait to be told

The Actions tab works, but it requires someone to go look. For a pipeline that runs dozens of times a day across a team, "someone eventually checks the Actions tab" is not a reliable monitoring strategy — failures sit unnoticed, sometimes for days, especially ones on branches nobody's actively watching. The practical fix is pushing failures to where people already are: a Slack or email notification step at the end of a job, conditioned to run **only on failure**:

```yaml
      - name: Notify on failure
        if: failure()
        run: echo "Pipeline failed — wire this step to your team's actual notification channel."
```

`if: failure()` is a GitHub Actions expression meaning "only run this step if an earlier step in the job failed" — exactly the behavior you want for a notification step you don't want firing on every successful run.

## Required checks make failures visible without a human looking at all

Lesson 11's branch protection rules do double duty as a monitoring mechanism: once a check is required, a failure is visible directly on the pull request itself, blocking the merge button, without anyone needing to separately check the Actions tab at all. This is a case where a quality gate and a monitoring mechanism are the same configuration serving two purposes — enforcement and visibility — rather than two separate things to build.

## What's worth tracking over time

A single run's pass/fail status answers "did this one deployment work." A healthy pipeline practice also tracks trends across runs: is average pipeline duration creeping up (a sign the delta-deployment fallback from Lesson 10 might be firing more often than expected, or the test suite is growing faster than anyone noticed), is a particular test flaky (passing and failing inconsistently with no code change — worth fixing before it erodes trust in the whole gate), and is the failure rate on a specific branch unusually high (often a sign that branch's underlying process, not the pipeline itself, is the actual problem). None of this requires exotic tooling — GitHub's own Actions run history already has the data; it just has to actually get looked at periodically, not just reacted to one failure at a time.

## Key terms

| Term | Meaning |
|---|---|
| Actions tab | The repository UI section listing every workflow and every run |
| `if: failure()` | A GitHub Actions step condition meaning "only run if an earlier step failed" |
| Required check | A branch-protection-enforced check that doubles as a visibility mechanism |
| Flaky test | A test that passes and fails inconsistently with no underlying code change |

## Lab

Add a failure-notification step to one of the workflow files from earlier lessons in this chapter, using `if: failure()`, and write one sentence on where you'd actually route that notification for a real team (a specific Slack channel, a specific distribution list) and why that destination, specifically, is more likely to get noticed than the Actions tab alone.

## Check yourself

Can you explain why relying solely on someone checking the Actions tab is an unreliable monitoring strategy for a busy pipeline? Can you name two things worth tracking across multiple pipeline runs over time, beyond a single run's pass/fail result?
