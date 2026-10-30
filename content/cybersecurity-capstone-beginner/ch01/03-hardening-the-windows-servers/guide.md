# Lesson 3 — Hardening the Windows Servers

**Chapter 1 · Beginner Capstone: Baseline Security Hardening and the First Detection Rule · Lesson 3 of 10**

## What you'll learn

- How to apply and verify a local account lockout policy, instead of leaving it at Windows' lax
  defaults
- How to find and disable services that have no business running on a file server or an app
  server
- Why a shared local administrator password is a real risk, and how LAPS-style rotation closes it
- How to scope Windows Firewall rules to the Domain profile and confirm they actually applied

## Two servers, one checklist, applied for real

Lesson 2's scoped checklist now gets applied to `HRU-FILE01` (file and print) and `HRU-APP01`
(the internal work-order application). Every step below gets a command to prove it actually
landed — "I configured it" isn't the same as "I confirmed it," and only the second one survives
a follow-up question from Dale.

## Step 1: account lockout and password policy

Out of the box, Windows Server's default local policy is more permissive than Hartwell wants for
machines holding production billing data. Mara tightens the local security policy on both
servers:

```
secedit /export /cfg C:\baseline\before.inf
net accounts /lockoutthreshold:5 /lockoutduration:30 /lockoutwindow:30
secedit /export /cfg C:\baseline\after.inf
```

`net accounts` sets the account lockout threshold to 5 failed attempts, a 30-minute lockout
duration, and a 30-minute observation window. The two `secedit /export` calls aren't optional
flourish — they're the before/after proof that goes straight into the documentation Lesson 7
formalizes, showing exactly what changed and when.

## Step 2: disabling services that shouldn't be running

A clean install of Windows Server starts more services than a file server or a work-order app
actually needs, and every running service is one more thing an attacker reaching the box could
try to use. Mara checks what's running and disables what isn't needed:

```
Get-Service | Where-Object {$_.Status -eq "Running"} | Select-Object Name, DisplayName
Set-Service -Name "RemoteRegistry" -StartupType Disabled
Stop-Service -Name "RemoteRegistry"
```

`RemoteRegistry` (remote access to a machine's registry) is a classic example: it has legitimate
uses, but neither `HRU-FILE01` nor `HRU-APP01` needs it enabled by default, and leaving it running
is exactly the kind of unused attack surface a baseline is supposed to close.

## Step 3: rotating local administrator passwords

Both servers were sharing the same local administrator password — set once, years ago, and never
rotated since. That means one compromised credential on either machine is a compromised
credential on both. Mara moves both servers to **LAPS (Local Administrator Password Solution)**,
which generates a unique, randomized local admin password per machine and rotates it
automatically:

```
Get-LapsADPassword HRU-FILE01 -AsPlainText
Get-LapsADPassword HRU-APP01 -AsPlainText
```

Each server now has its own password, retrievable only by an authorized admin through LAPS, and
rotated on a schedule — so a compromised password on one server stops being a free pass onto
the other.

## Step 4: Windows Firewall, Domain profile only

Both servers only ever talk to the network as domain members — neither will legitimately find
itself on a Private or Public network. Mara leaves those two profiles at their default deny-all
and writes rules only for the Domain profile, scoped to the specific subnet that actually needs
access:

```
Set-NetFirewallProfile -Profile Domain -DefaultInboundAction Block
New-NetFirewallRule -DisplayName "SMB - Mgmt Subnet Only" -Direction Inbound -Protocol TCP -LocalPort 445 -RemoteAddress 10.20.5.0/24 -Profile Domain -Action Allow
```

That rule allows inbound SMB (file sharing) only from Hartwell's management subnet
(`10.20.5.0/24`), not from "Any" — exactly the same scoped-profile approach from Lesson 2's
checklist, now actually configured and ready to verify.

## Step 5: verifying it all actually applied

```
gpupdate /force
gpresult /r
Get-NetFirewallRule -DisplayName "SMB - Mgmt Subnet Only" | Get-NetFirewallAddressFilter
```

`gpresult /r` confirms which policies actually took effect on the machine, and checking the
firewall rule's address filter confirms the subnet restriction is really in place — not just
saved in a dialog box that never applied.

## Key terms

| Term | Meaning |
|---|---|
| Account lockout threshold | The number of failed logins allowed before an account locks temporarily |
| LAPS | Local Administrator Password Solution — unique, auto-rotated local admin passwords per machine |
| Domain firewall profile | The Windows Firewall profile active when a machine is connected as a domain member |
| gpresult /r | Shows which Group Policy settings actually applied to a machine, for verification |

## Lab

For `HRU-APP01`, write out the four commands (lockout policy, a service to disable, the LAPS
check, and a Domain-profile firewall rule) you'd run to apply this same checklist, and the one
verification command for each that proves it worked.

## Check yourself

You're ready for Lesson 4 when you can explain why Mara leaves the Private and Public firewall
profiles at default deny instead of writing rules for them, and why rotating to LAPS matters even
though both servers were already using strong individual account passwords.
