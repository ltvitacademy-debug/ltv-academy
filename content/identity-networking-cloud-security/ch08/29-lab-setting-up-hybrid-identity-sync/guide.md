# Lesson 29 — Lab: Setting Up Hybrid Identity Sync

**Chapter 8 · Capstone: Securing a Hybrid Cloud Environment · Lesson 29 of 32**

## What you'll learn

- How Caldwell Logistics installed and configured Microsoft Entra Connect to bring its on-prem Active Directory into Microsoft Entra ID
- Why the team chose password hash sync over federation, and the real operational tradeoffs behind that call
- The real cmdlets for confirming a sync actually ran, instead of assuming the wizard's green checkmark was the end of the story
- How to confirm that a Conditional Access policy from Chapter 2 actually reaches the accounts this sync just created

## The scenario: Caldwell Logistics

Caldwell Logistics runs a single on-premises Active Directory forest, `caldwell.local`, with roughly six hundred employees across three regional offices. The company is moving email and file storage to Microsoft 365, and every one of those on-prem accounts needs a matching identity in Microsoft Entra ID before any of that works. This lab walks through exactly how Caldwell's two-person infrastructure team set that sync up, verified it actually completed, and confirmed it connects cleanly to the Conditional Access policy the team already built in Chapter 2.

## Installing and configuring Microsoft Entra Connect

The Microsoft Entra Connect installer runs on a domain-joined member server — never on a domain controller. Caldwell's team chooses **Custom installation** instead of Express, because Express would sync every object in every OU using password hash sync with no filtering at all. Caldwell only wants three of its five OUs in scope for this phase; a legacy OU full of stale service accounts is deliberately held back until it's cleaned up. The custom wizard walks through picking **Password Hash Sync** as the sign-in method, selecting those three OUs under domain/OU filtering, and then running its first full synchronization.

## Why password hash sync, not federation

Federation was on the table, but it would mean standing up and maintaining an Active Directory Federation Services (ADFS) farm — a second tier of servers, a certificate renewal cycle, and a new on-prem dependency that becomes a single point of failure for every cloud sign-in if it's ever unavailable. Caldwell's infrastructure team is two people with no existing ADFS investment, so that cost isn't worth paying. **Password hash sync (PHS)** instead synchronizes a hash of each user's AD password hash (not the password itself) into Entra ID every few minutes, and the actual authentication decision happens inside Entra ID directly. That means Conditional Access and Identity Protection's risk-based sign-in — both built in Chapter 2 — work natively, with nothing extra to configure or patch on-prem. For a company with no smart-card or claims-based sign-in requirement, PHS is simply the smaller, simpler failure domain.

## Verifying the sync actually ran

Finishing the installation wizard is not the same as confirming the sync worked. `Get-ADSyncScheduler` shows the sync interval — thirty minutes by default — and `Start-ADSyncSyncCycle -PolicyType Delta` forces an immediate sync instead of waiting on that schedule. `Get-ADSyncConnectorRunStatus` surfaces any connector-space errors, the most common of which is a duplicate-attribute conflict that silently keeps one user from syncing while everyone else succeeds. In the Entra admin center, pulling up that user's profile should show **Directory synced: Yes** and a source of **Windows Server AD**.

## Confirming Conditional Access applies

Sync completing isn't the finish line either. Caldwell already has a Chapter 2 Conditional Access policy requiring MFA for sign-ins. The real check is pulling up a newly synced user's sign-in logs in the Entra admin center and confirming the Conditional Access tab shows that policy as **Success**, not **Not applied**. If the policy is scoped to a synced security group rather than all users, that group's own membership has to have synced too — otherwise the policy simply never evaluates against those accounts, and nobody notices until an audit or an incident.

## Key terms

| Term | Meaning |
|---|---|
| Microsoft Entra Connect | The on-prem agent that synchronizes on-prem AD objects into Microsoft Entra ID |
| Password hash sync (PHS) | A sync method that synchronizes a hash of the AD password hash, letting Entra ID evaluate sign-ins directly |
| Federation | An alternative sync method that defers authentication to an on-prem identity provider such as ADFS |
| Delta sync | An incremental sync cycle that only processes changes since the last run |

## Check yourself

You're ready for Lesson 30 when you can explain, without looking: why did Caldwell choose password hash sync over federation, and what's the one thing beyond "the sync finished" that you must verify to know a Conditional Access policy actually reaches the newly synced accounts?
