# Lesson 12 — Segmenting a Hybrid Environment: Cloud and On-Prem Together

**Chapter 3 · Least-Privilege Access and Micro-Segmentation · Lesson 12 of 32**

## What you'll learn

- Why most real enterprises run a genuine hybrid environment — on-prem
  Active Directory alongside cloud identity — not one or the other
- How hybrid identity sync keeps on-prem AD and cloud identity from
  becoming two separately-governed systems with two different policies
- How Microsoft's AD tiering model (Tier 0/1/2) extends the
  micro-segmentation and least-privilege ideas from this chapter on-prem
- Why a Privileged Access Workstation closes a gap that policy alone can't

## Hybrid is the normal case, not the edge case

Every lesson so far in this chapter assumed a mostly cloud-native
environment: workloads with identity labels, ZTNA brokers, cloud
subscription roles. Most real enterprises aren't that clean. A company that
adopted cloud over the last decade almost always still runs an on-premises
Active Directory domain somewhere — file servers, line-of-business apps,
domain-joined workstations — alongside its cloud tenant. Treating those as
two separate security problems, governed by two different policies, is
exactly the gap an attacker looks for: a domain admin credential that's
tightly controlled in the cloud tenant but loosely controlled on-prem is
still a domain admin credential, and an attacker doesn't care which side of
the boundary they compromised it from.

## Hybrid identity sync: one identity, enforced in both places

**Microsoft Entra Connect** (the current name for what was long called
Azure AD Connect) is the real mechanism most enterprises use to keep
on-prem AD and cloud identity from drifting into two separate systems: it
synchronizes on-prem AD accounts, group memberships, and password hashes
into Microsoft Entra ID, so a user has one identity that both sides
recognize. Built on top of that sync, **hybrid Conditional Access** and
Entra's **Application Proxy** let the same identity-and-device policy that
governs a cloud app also govern an on-prem application a user reaches
remotely — the policy engine from Chapter 1 evaluating one consistent
identity, regardless of which side of the hybrid boundary the resource
actually sits on.

## The AD tiering model: least privilege, on-prem

Microsoft's documented **Active Directory tiering model** splits
privileged access into **Tier 0** (domain controllers and the identity
infrastructure that controls everything else), **Tier 1** (servers and
enterprise applications), and **Tier 2** (end-user workstations) — with a
hard rule that a credential valid at one tier is never allowed to log on to
a system at a more sensitive tier. A help desk technician's Tier 2
workstation-admin credential should never be usable to log on to a domain
controller, because if it were, compromising that one workstation would be
enough to compromise the entire domain. This is the same least-privilege,
blast-radius-limiting logic as Lesson 9's micro-segmentation, applied to
on-prem privilege levels instead of network traffic.

## Privileged Access Workstations: closing the gap policy can't

Tiering only works if a Tier 0 credential is never *typed* on a lower-tier,
less-trusted machine — because a workstation with malware on it can capture
credentials the instant they're entered, regardless of how well the tier
policy is written. A **Privileged Access Workstation (PAW)** is a hardened,
single-purpose machine used only for Tier 0 administration — no email, no
general web browsing, no everyday applications — so there's effectively
nothing on it that could be compromised and used to harvest the credential
the moment it's typed. PAWs are the physical, device-level enforcement of
the same rule the tiering model states on paper.

## One policy model, both sides of the boundary

Pulled together, this is what unifying a hybrid environment under one
policy model actually requires: identity sync so there's one identity
instead of two, hybrid Conditional Access so that one identity's access is
governed consistently regardless of which side of the boundary a resource
sits on, AD tiering so on-prem privilege respects the same least-privilege
logic as cloud roles, and PAWs so that policy is backed by a device that
can't undermine it. None of these pieces is new — each is a real,
documented part of the Microsoft identity stack — but an enterprise only
gets unified hybrid segmentation when all four are run together, under one
policy, rather than as separate on-prem and cloud programs.

## Key terms

| Term | Meaning |
|---|---|
| Microsoft Entra Connect | The sync mechanism that unifies on-prem AD accounts and cloud identity into one recognized identity |
| Hybrid Conditional Access | Applying the same identity-and-device policy to on-prem and cloud resources alike |
| AD tiering model (Tier 0/1/2) | Microsoft's model splitting privileged access by sensitivity, with a rule that credentials never cross upward between tiers |
| Privileged Access Workstation (PAW) | A hardened, single-purpose machine used only for the most sensitive tier of administration |

## Check yourself

This chapter is complete when you can explain, without looking: why does
treating on-prem AD and cloud identity as two separately-governed systems
create a real security gap rather than just an administrative inconvenience,
and what specific failure does a Privileged Access Workstation prevent that
the AD tiering rule alone cannot?
