# Lesson 25 — Why Automation Scripts Belong in Source Control

**Chapter 7 · CI/CD for Infrastructure Scripts · Lesson 25 of 32**

## What you'll learn

- Why an infrastructure script belongs in Git the same way application code does, not as a loose
  file on someone's laptop
- How code review catches a dangerous line — like an unscoped resource deletion — before it ever
  runs against anything real
- Why version history gives you a rollback that a saved-over file never can
- How a shared repository gives the whole team visibility into what automation actually exists

## A script is code. Code goes in source control.

By this point in the course you've written scripts that create resources, tag them, reconcile
them across two clouds, and shut them down on a schedule. Every one of those scripts is just as
much "code" as anything a developer writes, and it deserves the same home: a **Git repository**,
not a folder on one person's machine. If the only copy of a script that rotates credentials across
forty storage accounts lives on your laptop, the team doesn't really have that automation — one
person does, and only as long as that laptop keeps working.

## Code review catches the mistake before it runs

The single biggest reason to put automation in source control isn't tidiness — it's that a
**pull request** puts a second set of eyes on a script before it can do damage. Consider a cleanup
script meant to delete old test resource groups:

```
# Pull request #142 — cleanup-test-resource-groups.ps1
- foreach ($rg in Get-AzResourceGroup -Tag @{env="test"}) {
+ foreach ($rg in Get-AzResourceGroup -Tag @{env="test"} | Where-Object Name -notlike "prod-*") {
      Remove-AzResourceGroup -Name $rg.ResourceGroupName -Force
  }
```

The original version trusts the `env=test` tag alone. A reviewer looking at the diff notices that
tagging mistakes happen, and asks for the `-notlike "prod-*"` safety filter before approving the
merge. That review happened on a diff, days before the script ever executed — which is the whole
point. A script sitting only on a laptop never gets that second look.

## Version history gives you a rollback

Every commit to a script is a saved snapshot. If a later change breaks something, you don't have
to remember what the working version looked like — you look it up and reverse it:

```
git log --oneline scripts/cleanup-test-rgs.ps1
git revert a3f9c21
```

`git log` shows every past version of that one file; `git revert` undoes a specific commit without
guessing. A script that only ever gets saved over, with no history, has no equivalent — once you
overwrite it, the previous working version is just gone.

## Team visibility: nobody flies blind

A shared repository also means the team actually knows what automation exists. Anyone can open the
repo and see the full list of scripts, read what each one does, and check who last changed it and
why, instead of automation being scattered across individual laptops where nobody else can find it,
audit it, or safely build on top of it.

## Key terms

| Term | Meaning |
|---|---|
| Source control (Git) | A system that tracks every saved change to a file over time, in a shared, central repository |
| Pull request (PR) | A proposed change submitted for review before it's merged into the main codebase |
| Code review | A second person examining a diff for mistakes or risks before it's approved |
| `git revert` | A Git command that undoes a specific past commit by creating a new commit that reverses it |

## Check yourself

You're ready for Lesson 26 when you can explain, without looking: how does a pull request catch a
dangerous line in a script before it ever runs, and why does that protection disappear if the
script only ever lives on one person's laptop?
