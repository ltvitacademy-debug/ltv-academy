# Lesson 4 — Error Handling in Automation Scripts

**Chapter 1 · Scripted Infrastructure: Why and How · Lesson 4 of 32**

## What you'll learn

- Why an automation script needs to handle errors deliberately, instead of letting one happen and
  pressing on
- How PowerShell's `try` / `catch` blocks let a script detect a failure and respond to it
  on purpose
- The real reason scripts need to fail loudly and stop: a failed step 2 shouldn't let step 3 run
  against a half-configured resource
- How to structure a multi-step automation script so one failure doesn't cascade into a mess

## Why silent failure is worse than no automation at all

A script that keeps running after a step fails can be more dangerous than doing the work by hand.
A person who clicks through a console notices immediately when something errors on screen and
stops. A script with no error handling doesn't notice anything — if step 2 fails, PowerShell often
just prints a red error message and moves straight on to step 3, as if nothing happened. The result
is infrastructure that's half set up, with later steps having run against resources that were never
actually created or configured correctly in the first place. That's a worse outcome than if the
script had never run, because now there's a mess to find and clean up instead of just a task still
waiting to be done.

## `try` / `catch`: handling failure on purpose

PowerShell's `try` / `catch` blocks let a script detect that a specific piece of code failed and
decide what to do about it, instead of leaving it to chance:

```
try {
    New-AzStorageAccount -ResourceGroupName "rg-prod" -Name "ltvdata01" `
        -Location "eastus" -SkuName "Standard_LRS"
}
catch {
    Write-Error "Failed to create storage account: $_"
    exit 1
}
```

Code inside `try` runs normally. If anything inside it throws a terminating error, control jumps
straight to `catch`, where the script can log exactly what went wrong (`$_` holds the error detail)
and decide how to respond. Here, that response is `exit 1` — stop the script entirely, with a
non-zero exit code a pipeline or scheduler can detect and flag as a failure.

## Why scripts should fail loudly and stop

That `exit 1` is doing real work, not just being dramatic. Imagine a three-step provisioning
script: step 1 creates a resource group, step 2 creates a storage account inside it, and step 3
configures a firewall rule on that storage account. If step 2 fails — say, the account name is
already taken somewhere in Azure — and the script presses on to step 3 anyway, step 3 tries to
configure a firewall rule on a storage account that doesn't exist. Depending on how that's written,
it might fail too, or worse, it might silently succeed against the wrong resource. Either way,
nobody finds out until much later, probably from a broken application instead of a script log.
Stopping immediately at step 2's failure means the person running the script finds out about the
real problem, at the moment it happened, instead of chasing a confusing symptom two steps removed
from the actual cause.

## Structuring a script around this

The practical takeaway: wrap each meaningful step of a multi-step script in its own `try`/`catch`,
and have the `catch` block stop the script rather than let execution continue past it. A script
that fails fast and loud is easier to trust than one that always finishes "successfully," because
"finished" and "correct" are only the same thing when every step along the way actually worked.

## Key terms

| Term | Meaning |
|---|---|
| `try` / `catch` | PowerShell blocks that run code and catch any error it throws, so the script can respond deliberately |
| `$_` | Inside a `catch` block, holds the details of the error that was just caught |
| Fail loudly | A script stops and reports clearly when something goes wrong, instead of continuing silently |
| Exit code | A number a script returns when it finishes; non-zero signals failure to a pipeline or scheduler |

## Check yourself

You're ready for Chapter 2 when you can explain, without looking: in a three-step provisioning
script, why is it worse for step 3 to run after step 2 has already failed than for the whole script
to just stop at step 2?
