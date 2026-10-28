# Lesson 24 — Azure Cloud Shell and Scripting Basics

**Chapter 6 · Azure CLI & PowerShell Administration · Lesson 24 of 32**

## What you'll learn

- What Azure Cloud Shell actually is, and why it needs nothing installed on your machine
- How its persistent file share works, and what happens to your files between sessions
- A simple real script, in both Bash and PowerShell, that loops over resources automatically
- When Cloud Shell is the right tool, and when your local CLI or PowerShell still makes more sense

## A shell that lives in the browser

Every command in Lessons 21-23 assumed the CLI or the `Az` module was installed locally. **Azure
Cloud Shell** removes that requirement entirely — it's a terminal that runs inside the Azure
Portal (or at `shell.azure.com`), with nothing to install, because Microsoft runs the shell for
you on a temporary machine behind the scenes. You pick your shell when you first open it:

```
Bash          -> the az CLI, pre-installed and ready
PowerShell    -> the Az module, pre-installed and ready
```

Both the Bash and PowerShell flavors come with the exact same tools from Lessons 21-23 already
installed — nothing in this course's CLI or PowerShell commands changes inside Cloud Shell, you
just don't have to set any of it up yourself first.

## Persistent storage: your files survive, the machine doesn't

The machine running your shell is temporary and gets torn down after you close the session — but
your files aren't, because the first time you launch Cloud Shell, Azure creates a small storage
account with an **Azure Files** share (typically around 5 GB) and mounts it as your home
directory, `$HOME`, automatically. Anything you save there — scripts, downloaded files, `az`
config — is still there the next time you open Cloud Shell, days or weeks later, even though the
underlying compute is brand new every session.

```
~/clouddrive        # the mounted Azure Files share — persists across sessions
~/myscript.sh        # anything you save in $HOME lives on that same share
```

One practical consequence worth knowing: Cloud Shell also times out after roughly 20 minutes of
inactivity, disconnecting the session — your files on the share are unaffected, but anything
still running in that shell (a long loop, an unsaved variable) is not.

## A real script: looping over resources automatically

This is the actual point of a script instead of one-off commands — doing the same thing across
every item in a list, without typing the command once per item. In Bash, using Lesson 21's
`--query` and `--output tsv` pattern:

```
for rg in $(az group list --query "[].name" --output tsv); do
  echo "Resource group: $rg"
  az resource list --resource-group "$rg" --output tsv --query "[].name"
done
```

The same loop in PowerShell, using Lesson 23's cmdlets:

```
foreach ($rg in (Get-AzResourceGroup)) {
  Write-Output "Resource group: $($rg.ResourceGroupName)"
  Get-AzResource -ResourceGroupName $rg.ResourceGroupName | Select-Object Name
}
```

Both scripts do the identical job: list every resource group, then list every resource inside
each one. `$(...)` in Bash and `Get-AzResourceGroup` in PowerShell each return a list the loop
then iterates over one item at a time — exactly the kind of repeatable, scriptable task the
prerequisite course's CLI lesson pointed toward, now actually written down as a reusable script
instead of typed by hand.

## When Cloud Shell, and when local

Cloud Shell is the right choice when you're on someone else's machine, want zero setup, or are
quickly checking something from a browser. Your own local CLI or PowerShell install is the right
choice for anything long-running, anything that needs to integrate with local files and editors,
or any script meant to run unattended on a schedule — Cloud Shell's session timeout and temporary
compute make it a poor fit for that. Most administrators end up using both: Cloud Shell for quick
checks, local tools for real scripting work.

## Key terms

| Term | Meaning |
|---|---|
| Azure Cloud Shell | A browser-based shell (Bash or PowerShell) with the CLI/Az module pre-installed |
| Azure Files share | The persistent storage Cloud Shell mounts as `$HOME` so files survive between sessions |
| Session timeout | Cloud Shell disconnects after roughly 20 minutes of inactivity |
| Script loop | Iterating a command (`for`/`foreach`) over every item in a list instead of running it once per item by hand |

## Check yourself

You're ready for Chapter 7 when you can explain, without looking: what actually persists between
two separate Cloud Shell sessions, and what does not — and why would you choose your local CLI
install over Cloud Shell for a script that needs to run unattended every night?
