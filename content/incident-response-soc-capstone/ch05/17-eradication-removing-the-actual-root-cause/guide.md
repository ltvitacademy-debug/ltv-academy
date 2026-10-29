# Lesson 17 — Eradication: Removing the Actual Root Cause

**Chapter 5 · Eradication & Recovery · Lesson 17 of 32**

## What you'll learn

- Why eradication has to remove three separate things — the attacker's tooling, the vulnerability that let the attacker in, and everything planted while they were inside — not just the first one
- How to find and remove the persistence mechanisms attackers commonly plant: a scheduled task, a rogue local account, and a registry Run key
- Why "the scan came back clean" is not the same claim as "eradication is complete"
- What happens when a team removes the symptom but leaves the root cause open, and why that's one of the most common real IR mistakes

## Three things eradication has to remove, not one

When a SOC says an incident has been "eradicated," it's tempting to hear that as "we ran a
scan and it came back clean." Real eradication is three separate jobs, and all three have to
finish before recovery can safely start. First, remove the malware or attacker tooling that
was actually running — the obvious part. Second, close the vulnerability or weakness that let
the attacker in in the first place, because leaving it open means nothing stops the same
attacker, or a different one, from walking back in through the same door. Third, find and
remove every persistence mechanism the attacker planted while they had access — things
specifically designed to survive a reboot, a password reset, or even a malware removal, so the
attacker's access quietly comes back on its own. Skipping any one of the three doesn't
eradicate the incident; it just hides it until it resurfaces.

## The scenario: Meridian Outpatient Billing

Meridian Outpatient Billing's SOC traced its incident back to an internet-facing Remote
Desktop Gateway server that was still running a version missing a critical security update —
one that had been available, and ignored, for several weeks. That's the root cause: not the
malware the attacker later installed, but the unpatched entry point itself. From there, the
attacker moved laterally to Meridian's billing database server and left three separate
footholds behind in case the first one was found: a new local administrator account named
`svc-helpdesk` created on both servers, a scheduled task named `SystemHealthCheck` configured
to relaunch a PowerShell-based remote access payload on every reboot, and a registry Run key
entry named `WinHealthSvc` on a billing clerk's workstation. Chapter 4's containment work
isolated the RD Gateway and the billing database server from the network — but isolating a
compromised system doesn't clean it. Eradication is what actually removes what's on it.

## Finding and removing the planted persistence

PowerShell gives the team a direct way to inventory and remove each of Meridian's three
persistence mechanisms. For the scheduled task:

```
Get-ScheduledTask -TaskName "SystemHealthCheck"
Unregister-ScheduledTask -TaskName "SystemHealthCheck" -Confirm:$false
```

`Get-ScheduledTask` confirms the task exists and shows its action before anything is deleted —
a responder who deletes blind, without first confirming what a task actually runs, risks
removing a legitimate scheduled job by mistake. `Unregister-ScheduledTask` then removes it
outright, with `-Confirm:$false` skipping the interactive prompt once the task has been
verified as the attacker's.

The rogue account and the registry persistence are removed the same way — confirm first, then
remove:

```
Get-LocalUser -Name "svc-helpdesk"
Remove-LocalUser -Name "svc-helpdesk"

Get-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Run"
Remove-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Run" -Name "WinHealthSvc"
```

`Get-LocalUser` and `Get-ItemProperty` each confirm the rogue entry exists and show exactly
what's there before `Remove-LocalUser` and `Remove-ItemProperty` take it out. Because account
creation and scheduled task creation both leave Windows Security event log entries, Meridian's
team cross-checks each removal against Event ID 4720 (a new local account was created) and
Event ID 4698 (a new scheduled task was created) across *every* host in scope, not just the
one where the persistence was first spotted, to make sure no fourth foothold was missed.

## Closing the root cause so the incident doesn't come back

None of that cleanup matters if the Remote Desktop Gateway stays unpatched. Removing
`svc-helpdesk`, the scheduled task, and the registry entry cleans up what the attacker did
after getting in — but the missing security update is *how* they got in, and it's still just
as missing after the cleanup as it was before. A SOC that eradicates the symptoms without
patching the root cause has, at best, bought itself a short delay before the same vulnerability
gets exploited again, by the same attacker checking back in or by anyone else scanning for it.
Eradication is complete only when the malware is gone, every planted persistence mechanism has
been removed and verified gone across every affected system, and the specific weakness that
allowed initial access has actually been closed.

## Key terms

| Term | Meaning |
|---|---|
| Eradication | The IR phase that removes attacker tooling, closes the vulnerability that allowed access, and removes any persistence mechanisms left behind |
| Root cause | The actual vulnerability or weakness that allowed initial access — distinct from the malware or symptoms it produced |
| Persistence mechanism | Something an attacker plants specifically to survive reboot, password reset, or malware removal, e.g. a scheduled task, rogue account, or registry Run key |
| Event ID 4720 / 4698 | Windows Security log entries for a new local account created / a new scheduled task created — useful for confirming no foothold was missed |

## Check yourself

You're ready for Lesson 18 when you can explain, without looking: why would deleting
Meridian's `svc-helpdesk` account and scheduled task, without patching the Remote Desktop
Gateway, still leave the incident unresolved?
