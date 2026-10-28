# Lesson 24 — Automating a Simple Incident Response Action

**Chapter 6 · Automating Operational Tasks · Lesson 24 of 32**

## What you'll learn

- Why "disable the account, revoke active sessions" is a well-understood, reversible action worth automating
- How to write a real PowerShell script that takes a compromised user's UPN and contains the account
- Where this fits on the automate-vs-human-in-the-loop line already covered in the Cybersecurity path's SOAR chapters
- Why this script is deliberately narrow, and what it is never meant to decide on its own

## A specific, bounded action — not "respond to the incident"

This lesson isn't about automating incident response in general. It's about automating one specific,
well-understood step that shows up inside almost every account-compromise incident: once a user's
account is confirmed or strongly suspected compromised, disable sign-in and kill any session the
attacker is already holding. That action is narrow, reversible (the account can be re-enabled the
moment the investigation clears it), and the correct response is the same every time it's needed —
exactly the profile of task this course has automated all chapter long, just applied to security
operations instead of cost or compliance.

## Why this specific action is safe to automate

The SOC Operations & SIEM Fundamentals course's SOAR chapters drew a clear line: SOAR automates the
well-understood, repeatable portion of a workload and leaves novel judgment calls, ambiguous
business context, and high-stakes irreversible actions to a human. Disabling a compromised account
and revoking its sessions sits squarely on the automatable side of that line — it's reversible, the
correct action doesn't change case to case, and delay has a real cost: every minute an attacker keeps
an active session is a minute they can keep acting as that user. What stays a human's job is
everything *around* this action — deciding the account is actually compromised in the first place,
investigating what the attacker did with the access, and deciding whether anything more drastic (like
terminating employment, which the SOAR chapters flagged as needing human sign-off regardless) is
warranted.

## The script: disable and revoke, given a UPN

This script uses the Microsoft Graph PowerShell SDK — the modern, supported way to manage Azure AD
(Entra ID) accounts from PowerShell. It takes one input, a user's UPN (the email-style
`user@company.com` sign-in name), and does exactly two things:

```
# contain-compromised-account.ps1
param(
    [Parameter(Mandatory = $true)]
    [string]$UserPrincipalName
)

Connect-MgGraph -Scopes "User.ReadWrite.All", "User.RevokeSessions.All"

$user = Get-MgUser -UserId $UserPrincipalName

Write-Output "Disabling sign-in for $($user.DisplayName) ($UserPrincipalName)..."
Update-MgUser -UserId $user.Id -AccountEnabled:$false

Write-Output "Revoking all active sessions for $($user.DisplayName)..."
Revoke-MgUserSignInSession -UserId $user.Id

Write-Output "Account contained. Investigation and re-enable are the next, human-decided step."
```

`Update-MgUser -AccountEnabled:$false` stops the account from signing in again. `Revoke-MgUserSignInSession`
invalidates the refresh tokens behind any session the account currently holds — without that second
call, a session the attacker opened before the account was disabled could keep working until its
access token naturally expires. Running both together closes that gap.

## Mandatory parameter — never guess the target

Note `[Parameter(Mandatory = $true)]` on `$UserPrincipalName`. This script is never meant to run
without an explicit, deliberately chosen target — there's no default user, no "run it on whoever
looks suspicious." A human (or an alert-triggered workflow that already did the judgment work of
identifying the compromised account) decides who, and passes that UPN in. The script's only job is
executing the same two actions correctly and instantly once that decision has already been made.

## What this script is never meant to decide

This script does not decide that an account is compromised — that determination, and everything that
follows from it, stays exactly where the SOAR chapters put it: with a person. It doesn't investigate,
it doesn't notify anyone automatically, and it doesn't re-enable the account once the investigation
clears — those are each separate, deliberate steps. Automating this one action is valuable precisely
because it's scoped this tightly: fast, reversible, and correct every time, with every judgment call
left to a human on either side of it.

## Key terms

| Term | Meaning |
|---|---|
| UPN | User Principal Name — a user's sign-in identifier in Entra ID, formatted like an email address |
| Account containment | Disabling sign-in and revoking active sessions to stop a compromised account from being used further |
| Revoke-MgUserSignInSession | A Microsoft Graph PowerShell cmdlet that invalidates a user's existing session tokens |
| Human-in-the-loop | A deliberate point in a process left for a person to decide, rather than automating it (Cybersecurity path, SOAR chapters) |

## Check yourself

You're ready for Chapter 7 when you can explain, without looking: why is disabling a compromised
account and revoking its sessions a reasonable action to automate, while deciding the account is
compromised in the first place is not?
