# Lesson 11 — Gating Merges on Test & Audit Results

**Chapter 2 · CI/CD for Smart Contracts · Lesson 11 of 29**

## What you'll learn

- How GitHub's branch protection rules turn "CI passed" into "you literally cannot merge until CI passed"
- Why a passing check that isn't *required* is just a suggestion, not a gate
- How to combine Lessons 8-10's jobs (tests, lint, Slither) into one required-checks list
- Why a second human reviewer still belongs in the gate alongside the automated checks

## A green checkmark isn't a gate by itself

Everything built in Lessons 8-10 — the test job, the lint job, the Slither job — produces a status check on a pull request. But by default, a status check is purely informational: a reviewer *can* merge a PR with a red X next to it if nothing stops them. The gate only becomes real when a **branch protection rule** marks specific checks as **required**, which removes the "Merge" button's availability entirely until every required check is green.

## Wiring required status checks

In a repo's **Settings → Branches → Branch protection rules**, a rule for `main` with "Require status checks to pass before merging" turns on a search field where you pick which checks from your workflow are mandatory:

```yaml
# Conceptually, what a branch protection rule enforces —
# not a file you write; configured in repo Settings → Branches
required_status_checks:
  - lint          # Lesson 9
  - test          # Lesson 8 (forge test, fuzz + invariant suites)
  - slither        # Lesson 10
require_pull_request_reviews:
  required_approving_review_count: 1
```

Once `test` and `slither` are both in that required list, a PR that fails either one shows "Merging is blocked" directly in GitHub's UI — not a warning, an actual block on the merge button, enforced the same way for every contributor including repo admins if "Include administrators" is checked.

## Why a human reviewer still belongs in the list

Lesson 10 ended on the point that static analysis tools are a floor, not an audit — they only catch known patterns, not business-logic bugs. `required_approving_review_count: 1` (or higher, for a team handling real funds) keeps a human in the loop specifically for the category of bug automated tools structurally can't catch: "does this logic actually do what the spec says it should." The automated checks and the human review aren't redundant — they're catching different categories of problem, and the gate needs both.

## What this buys you

Once this is wired up, "all tests pass and Slither is clean" stops being a convention the team tries to follow and becomes a property of the repository itself — no PR can reach `main` without it, regardless of who's merging or how much of a hurry they're in. That's the actual payoff of Chapter 2: not that the checks exist, but that they're *enforced*, structurally, by the platform instead of by discipline.

## Key terms

| Term | Meaning |
|---|---|
| Branch protection rule | A repo setting that enforces conditions before a merge is allowed |
| Required status check | A CI job that must pass before the merge button becomes available |
| `required_approving_review_count` | Minimum number of human approvals required alongside automated checks |

## Check yourself

You're ready for Chapter 3 when you can explain, without looking: why is a status check that passes but isn't marked "required" not actually a gate?
