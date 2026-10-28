# Lesson 3 — Idempotency: Why a Script Should Be Safe to Rerun

**Chapter 1 · Scripted Infrastructure: Why and How · Lesson 3 of 32**

## What you'll learn

- What "idempotent" actually means for an automation script, in plain terms
- Why a script that isn't idempotent becomes dangerous the moment someone reruns it
- The real example this lesson is built around: checking whether a resource group exists before
  creating it, instead of blindly calling `New-AzResourceGroup` every time
- How to start building this check into your own scripts going forward

## What "idempotent" means

**Idempotent** is one of those words that sounds academic but describes something very practical:
a script is idempotent if running it once, or running it five times in a row, leaves the
infrastructure in exactly the same end state either way. It doesn't create duplicate resources on
the second run, and it doesn't error out because something it's trying to create already exists.
The goal isn't "run this exactly once and never again" — it's "run this as many times as you need
to, and trust that it always converges on the same correct result."

## Why this matters the moment a script gets reused

Scripts get rerun far more often than people expect — a deployment pipeline retries a failed step, a
teammate reruns last week's setup script against a new environment, or you rerun your own script
after fixing one line, not realizing it already created half the resources on the first attempt. If
the script isn't idempotent, any of those situations can leave you with duplicate resources,
confusing errors, or infrastructure in a state nobody intended. An idempotent script turns "did
this already run?" into a question that doesn't matter — you just run it again and get the same
correct outcome.

## The real example: checking before creating

Here's the pattern this lesson is built around. A script that blindly creates a resource group
every time it runs looks simple, but breaks the second time it's executed:

```
# NOT idempotent — fails on the second run
New-AzResourceGroup -Name "rg-prod" -Location "eastus"
```

The first run succeeds. Run that exact same line again — because the pipeline retried, or because
you reran the script — and it throws an error, because `rg-prod` already exists. The fix is to
check first, and only act if the check says you need to:

```
# Idempotent — safe to run any number of times
if (-not (Get-AzResourceGroup -Name "rg-prod" -ErrorAction SilentlyContinue)) {
    New-AzResourceGroup -Name "rg-prod" -Location "eastus"
}
```

`Get-AzResourceGroup` with `-ErrorAction SilentlyContinue` checks whether `rg-prod` already exists
without throwing an error if it doesn't. If it's missing, the script creates it. If it's already
there, the script does nothing and moves on — no error, no duplicate, no change in outcome whether
this is the first run or the fifth.

## The same pattern applies everywhere

This exact shape — check first, act only if needed — is the core of idempotent scripting, and it
applies far beyond resource groups. Before creating a storage account, check if one with that name
already exists. Before adding a tag, check if it's already set to the value you want. Before
creating a user account, check if it's already there. The specific cmdlet changes every time; the
pattern of "check, then act" doesn't.

## Key terms

| Term | Meaning |
|---|---|
| Idempotent | A script that produces the same end state whether run once or many times, without duplicating or erroring |
| `-ErrorAction SilentlyContinue` | A PowerShell parameter that suppresses an error instead of stopping the script, so a "does this exist" check doesn't fail loudly |
| Check-then-act | The core idempotent pattern: verify a resource's state before deciding whether to change it |
| End state | The actual condition of the infrastructure after a script runs, regardless of how many times it ran |

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: why does calling
`New-AzResourceGroup` directly, with no check beforehand, fail on a script's second run — and what
single change makes that script safe to run any number of times?
