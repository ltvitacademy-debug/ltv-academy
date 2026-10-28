# Lesson 2 — Microsoft Entra Connect and Directory Synchronization

**Chapter 1 · Hybrid Identity: Connecting On-Prem AD to the Cloud · Lesson 2 of 32**

## What you'll learn

- What Microsoft Entra Connect actually is (formerly Azure AD Connect) and what job it does
- What objects and attributes actually get synchronized from on-prem AD to Entra ID
- How often synchronization runs by default, and the difference between an initial cycle and a delta cycle
- The difference between one-way synchronization and writeback features that flow a change back to on-prem

## Entra Connect: the sync engine, not the identity itself

**Microsoft Entra Connect** — renamed from **Azure AD Connect** — is the tool that actually does
the work behind "hybrid identity." It's software installed on a Windows Server on-premises,
running continuously as an agent that connects to on-prem Active Directory on one side and to
Entra ID on the other. It reads objects out of AD and creates or updates matching objects in
Entra ID according to configured synchronization rules. Entra Connect doesn't replace anything —
it's the bridge between two directories that still both exist.

## What actually gets synced

By default, Entra Connect synchronizes **user accounts** (with core attributes like
userPrincipalName, display name, and email), **groups** (security groups, and often distribution
groups), **devices** (useful for device-based Conditional Access later in this path), and
**contacts**. Passwords are never synchronized as plaintext — what moves for authentication
depends on the method chosen, covered in Lesson 3. An administrator can also scope what syncs at
all, filtering by organizational unit or attribute so that, for example, service accounts or a
specific business unit never leave the on-prem directory.

## Sync cycle: initial vs. delta, every 30 minutes by default

Entra Connect runs on a scheduler, and the default sync cycle interval is **30 minutes**. The very
first run after installation is a full **initial** sync, importing every object in scope. After
that, it runs **delta** syncs, which only pick up what's changed since the last cycle — a new
user, a group membership change, an updated phone number.

An administrator can check or trigger this directly from the `ADSync` PowerShell module installed
alongside Entra Connect:

```
Get-ADSyncScheduler

Start-ADSyncSyncCycle -PolicyType Delta

Start-ADSyncSyncCycle -PolicyType Initial
```

`Get-ADSyncScheduler` shows the current schedule and when the last cycle ran.
`Start-ADSyncSyncCycle -PolicyType Delta` forces an immediate delta sync instead of waiting for
the next scheduled run — useful right after making a change you don't want to wait 30 minutes for.
`-PolicyType Initial` forces a full re-import of everything in scope, the same thing that runs
automatically the first time Entra Connect is set up.

## One-way sync vs. writeback

Core object synchronization, in the default configuration, is **one-way**: on-prem AD to Entra
ID, every cycle. If an administrator edits a synced user's attribute directly in the Entra ID
portal, the next sync cycle silently overwrites that change, because on-prem AD is still the
source of truth — the cloud copy is not authoritative.

**Writeback** is the opt-in exception. The most common example is **password writeback**: a user
resets their own password through Entra ID's self-service password reset, and that new password
is written back down to on-prem AD so it still works for signing into on-prem resources too.
Without writeback enabled, a self-service cloud password reset would leave the on-prem password
unchanged and out of sync. Group writeback and device writeback exist for similar reasons, writing
specific cloud-created objects back down when an organization needs them to exist on-prem too.

## Example: HR adds a new hire at 9:05 a.m.

At 9:05 a.m., HR's onboarding process creates a new user account in on-prem AD. Entra Connect
isn't watching in real time — it waits for its next scheduled cycle. At 9:30 a.m., per the default
30-minute schedule, a delta sync runs, picks up the new account, and creates a matching object in
Entra ID with the same userPrincipalName. Within roughly 30 minutes, the new hire exists in both
directories, without anyone manually creating a second account anywhere.

## Key terms

| Term | Meaning |
|---|---|
| Microsoft Entra Connect | The on-prem tool (formerly Azure AD Connect) that synchronizes objects from on-prem AD to Entra ID |
| Sync cycle | A scheduled run of Entra Connect; delta cycles pick up only changes, initial cycles import everything in scope |
| One-way synchronization | The default direction of core object sync: on-prem AD to Entra ID only |
| Writeback | An opt-in feature, such as password writeback, that flows a specific change from Entra ID back down to on-prem AD |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: why would editing a synced user's
attribute directly in the Entra ID portal get silently overwritten at the next sync cycle?
