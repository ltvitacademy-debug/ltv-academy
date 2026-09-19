# Lesson 15 — Connecting to Azure From PowerShell

**Chapter 4 · PowerShell for Azure & SQL · Lesson 15 of 18**

## What you'll learn

- `Connect-AzAccount` — the one command that opens an authenticated Azure session
- What happens after you run it: the sign-in prompt, and confirming which subscription you landed in
- Azure Cloud Shell — a real, zero-install way to get a PowerShell session already connected to Azure
- Disconnecting when you're done, and why that matters on a shared machine

## Connect-AzAccount

Once `Az` is installed (Lesson 14), connecting is one line:

```powershell
Connect-AzAccount
```

This opens a browser window for interactive sign-in — your normal
Azure username and password, plus MFA if your organization requires
it. Once signed in, the console prints your account, subscription,
and tenant:

```
Account       SubscriptionName    TenantId
-------       ----------------    --------
you@work.com  Production-East     a1b2c3d4-...
```

If you have access to more than one subscription, that output tells
you which one you landed in — worth checking before you run anything
that creates or deletes a resource. Switch to a different one with:

```powershell
Set-AzContext -Subscription "Dev-Sandbox"
```

## Azure Cloud Shell: zero-install

Every real environment eventually needs a machine you don't fully
control, or you just don't want to install anything locally to try
something quickly. **Azure Cloud Shell** — built into the Azure
Portal — solves that: a browser-based shell that's already signed in
to your Azure account, no local install of `Az` required at all.

![Azure Cloud Shell's shell-selector screen, showing a choice between Bash and PowerShell before the session starts.](/courses/powershell/ch04/15-connecting-to-azure/choose-shell.png)

The first time you open it, Cloud Shell asks you to choose **Bash or
PowerShell** — pick PowerShell, and you land in a session with `Az`
already loaded and already authenticated as you. No
`Connect-AzAccount` needed; the browser session itself is the
authentication.

![Azure Cloud Shell's first-run setup prompt, asking to create a storage account for the session's persistent file storage.](/courses/powershell/ch04/15-connecting-to-azure/getting-started.png)

The first-run setup also asks you to create a small storage account,
which Cloud Shell uses to persist your files (scripts, downloaded
output) between sessions. That's a one-time step per subscription —
after it's done, reopening Cloud Shell drops you straight into a
ready PowerShell prompt. It's genuinely worth knowing as an option:
for a quick check or a script you want to run from any browser
without setting up a local machine, Cloud Shell beats a full local
install.

## Disconnecting

```powershell
Disconnect-AzAccount
```

On a shared or non-personal machine, running this when you're done
matters the same way logging out of anything else does — an open
`Az` session left signed in is a real, avoidable exposure, especially
if that account has production access.

## Key terms

| Term | Meaning |
|---|---|
| `Connect-AzAccount` | Opens an interactive, browser-based sign-in to Azure |
| `Set-AzContext` | Switches the active subscription for the current session |
| Azure Cloud Shell | A browser-based shell in the Azure Portal, pre-authenticated, no local install |
| `Disconnect-AzAccount` | Ends the current session — worth running on shared machines |

## Check yourself

You're ready for Lesson 16 when you can explain, without looking:
what's the practical difference between running `Connect-AzAccount`
on your own machine versus opening Azure Cloud Shell, and when would
you reach for each?
