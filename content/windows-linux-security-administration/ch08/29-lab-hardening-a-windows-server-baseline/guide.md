# Lesson 29 — Lab: Hardening a Windows Server Baseline

**Chapter 8 · Capstone: Hardening a Mixed Environment · Lesson 29 of 32**

## What you'll learn

- How to apply a CIS-based GPO baseline to a real server before it goes into production
- How to set Windows Firewall rules correctly across the Domain, Private, and Public profiles
- How to turn on BitLocker and make sure the recovery key actually survives a disaster
- How to configure audit policy for the events that matter, and deploy Sysmon for the
  visibility Windows doesn't give you out of the box

## The scenario

Meridian Fabrication is standing up `WIN-SRV-04`, a new file and print server that's about
to hold production data for the shop floor. Before it goes live, it has to pass the same
hardening checklist every server in this domain gets — and that checklist is just Chapters
1 through 3 of this course, applied in order.

## Step 1: Apply the CIS-based GPO baseline

`WIN-SRV-04` gets joined to the `Servers\FileServers` OU, which already has the
CIS-based baseline GPO from Lesson 6 linked to it — disabled SMBv1, a strong password and
lockout policy, restricted local Administrators group membership, and LAPS-managed local
admin credentials instead of a shared one. Joining the OU is what applies it; confirming it
actually landed is a separate step:

```
gpupdate /force
gpresult /r
Get-GPOReport -Name "WIN-SRV-Baseline" -ReportType Html -Path C:\Reports\baseline.html
```

`gpresult /r` shows which GPOs actually applied to this machine, in order — the baseline
report is what goes in the change ticket as proof the server left staging compliant.

## Step 2: Windows Firewall, profile by profile

Windows Firewall has three profiles, and a server sitting in a domain OU should never trust
all three equally. `WIN-SRV-04` only ever talks to the network as a domain member, so the
**Domain** profile is the one that matters: inbound SMB (445) and RDP (3389) are allowed, but
only from the management subnet, not from "Any." The **Private** and **Public** profiles stay
at their default deny-all-inbound — this server will never legitimately find itself on either
of those network types, so there's no rule to write for them at all; an unused profile locked
to deny is itself a control.

## Step 3: BitLocker, with the recovery key backed up

Data-at-rest protection means nothing if the drive isn't encrypted, and BitLocker means
nothing if the recovery key only lives on a sticky note:

```
manage-bde -on C: -RecoveryPassword
manage-bde -protectors -adbackup C:
```

That second command is the one teams skip — it escrows the recovery key to the computer
object in Active Directory, so if `WIN-SRV-04` ever fails to boot, the key is retrievable by
an admin in AD Users and Computers, not lost with a crashed disk.

## Step 4: Audit policy for the events that matter

Lesson 12's advanced audit policy, applied here, means enabling specific subcategories
instead of the four blunt legacy categories:

```
auditpol /set /subcategory:"Logon" /success:enable /failure:enable
auditpol /set /subcategory:"Security Group Management" /success:enable
auditpol /set /subcategory:"Security State Change" /success:enable
```

Logon success and failure, account/group management, and security state changes are the three
subcategories that generate the Event IDs from Lesson 10 — 4624, 4625, 4720, 4732 — without
flooding the Security log with noise the SOC will never read.

## Step 5: Deploy Sysmon

Native Windows logging stops at "a process ran." Sysmon, from Lesson 11, is what fills the
gap:

```
sysmon64.exe -i baseline-config.xml -accepteula
```

The baseline config (a SwiftOnSecurity-style ruleset) turns on process creation (Event ID 1),
network connection (Event ID 3), and file creation (Event ID 11) logging, written to
`Applications and Services Logs > Microsoft > Windows > Sysmon/Operational`. Once that's
confirmed flowing, `WIN-SRV-04` is ready for production.

## Key terms

| Term | Meaning |
|---|---|
| GPO baseline | A Group Policy Object enforcing a hardening standard (here, CIS-based) across all servers in an OU |
| Firewall profile | Domain, Private, or Public — Windows Firewall applies different rules depending on which network type is detected |
| AD-backed recovery key | A BitLocker recovery password escrowed to the computer's AD object, recoverable without the original disk |
| Audit subcategory | A granular audit setting (e.g. "Security State Change") that replaces the old all-or-nothing legacy categories |

## Check yourself

`WIN-SRV-04`'s Private and Public firewall profiles have no custom rules at all — they're
just left at default deny. Why is "nothing configured" still a real hardening decision here,
and not an oversight?
