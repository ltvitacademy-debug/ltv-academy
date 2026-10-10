# Lesson 10 — Branch Protection and Permissions

**Chapter 2 · Collaboration · Lesson 10 of 17**

## What you'll learn

- What a branch protection rule is and which specific behaviors it can enforce
- The most common protections teams apply to `main` and why each one exists
- How repository roles (read, triage, write, maintain, admin) differ on GitHub
- Why protecting `main` matters even more once a repo holds Salesforce metadata

## Branch protection rules

A **branch protection rule** is a setting, configured by a repository administrator, that restricts what can happen to a specific branch — almost always `main` or a release branch — regardless of who's trying to do it. Protection rules exist because Git, by default, lets anyone with write access push directly to any branch, force-push over history, or delete a branch outright. For a branch everyone depends on, that default is far too permissive.

Common protections a team applies to `main`:

- **Require a pull request before merging** — no direct pushes to `main` at all; every change must go through a PR, even for the repository owner.
- **Require approvals** — at least one (often more) reviewer must formally Approve before the PR can merge (tying directly back to Lesson 9).
- **Require status checks to pass** — automated checks (a test suite, a linter, a Salesforce validation-only deploy) must succeed before merging is allowed, regardless of human approval.
- **Require branches to be up to date before merging** — the PR's branch must have the latest `main` merged in before it can merge, preventing a PR from merging against a now-stale base.
- **Restrict who can push** — limits direct pushes (bypassing the PR requirement entirely) to specific people or teams, often just repository admins, for emergency situations.
- **Block force-pushes and branch deletion** — prevents anyone from rewriting or erasing `main`'s history, even by accident.

## Why each one earns its place

It's worth connecting each rule back to a concrete failure it prevents. Without "require a PR," someone can push an untested change straight to `main` with no review at all — the entire point of Lessons 7-9 becomes optional. Without "require status checks," a human reviewer can approve code that still fails its own test suite, because nobody's forcing the tests to actually run first. Without "require branches to be up to date," a PR reviewed and approved against an older version of `main` can introduce a regression the reviewer never actually saw, because `main` moved on after the review. Without blocking force-pushes, one mistaken `git push --force` can permanently erase commits other people are relying on.

## Repository roles

GitHub repositories (and most hosts) assign each collaborator a role that determines what they can do, independent of branch protection:

| Role | Can do |
|---|---|
| **Read** | View and clone the repository, comment on issues/PRs |
| **Triage** | Read, plus manage issues and PRs (labels, assignment) without write access to code |
| **Write** | Push branches, open PRs, and merge PRs that pass protection rules |
| **Maintain** | Write, plus manage some repository settings, excluding sensitive/destructive ones |
| **Admin** | Full control, including changing branch protection rules themselves |

Branch protection and repository roles work together, not instead of each other: someone with Write access can still be blocked from merging their own PR by a branch protection rule requiring another reviewer's approval — Write access lets you *propose* a change, not unilaterally *force* it through.

## Why this matters more for Salesforce metadata

Chapter 3 of this course gets into source-driven Salesforce development in depth, but it's worth flagging here: once a Git repository is the source of truth for a Salesforce org's metadata (Lesson 1), an unreviewed, unchecked push straight to `main` isn't just messy history — it's an unreviewed change heading toward a real production org, potentially bypassing whatever validation-deploy or sandbox-testing step the team relies on to catch a broken flow or an Apex class that fails a trigger's test coverage requirement. Branch protection on a Salesforce repo's `main` is one of the most direct controls a team has over what's allowed to reach production at all.

## Key terms

| Term | Meaning |
|---|---|
| Branch protection rule | A restriction on what can happen to a specific branch, regardless of who's trying |
| Required status check | An automated check that must pass before a PR can merge |
| Force-push | Overwriting a remote branch's history, which protection rules can block |
| Repository role | A collaborator's permission level (Read, Triage, Write, Maintain, Admin) |

## Lab

Write out a branch protection policy for a hypothetical Salesforce team's `main` branch: list which specific rules you'd turn on (from the list above), and for each one, write one sentence explaining the concrete failure it's meant to prevent. Then decide: should the repository admin themselves be exempt from the "require a PR" rule for emergency hotfixes? Justify your answer either way.

## Check yourself

Can you name at least four distinct branch protection rules and, for each, the specific problem it prevents? Can you explain why having Write access to a repository doesn't automatically mean you can merge your own PR?
