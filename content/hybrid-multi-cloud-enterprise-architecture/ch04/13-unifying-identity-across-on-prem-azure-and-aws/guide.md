# Lesson 13 — Unifying Identity Across On-Prem, Azure, and AWS

**Chapter 4 · Hybrid Identity at Enterprise Scale · Lesson 1 of 4**

## What you'll learn

- Why a real enterprise ends up with three identity stores — on-prem
  Active Directory, Microsoft Entra ID, and AWS — and why that's a
  liability, not a feature
- How Microsoft Entra Connect turns an on-prem AD account into a real
  hybrid identity in Entra ID, including the difference between
  Password Hash Sync and Pass-through Authentication
- How that same Entra ID identity extends into AWS through AWS IAM
  Identity Center, instead of AWS getting its own separate user
  database
- Why SCIM provisioning is what keeps the join/move/leave lifecycle
  consistent across all three environments

## Three directories is the default, not a choice someone made

Walk into almost any enterprise that's been on-prem for a decade and
then adopted Azure and AWS, and you'll find three separate places
where "who is this person" gets answered: an on-prem Active Directory
domain controller, a Microsoft Entra ID tenant, and an AWS account (or
AWS Organization) with its own IAM users. Nobody designed that on
purpose — it's what happens when each environment got adopted on its
own timeline, by a different team, solving its own immediate problem.

The cost shows up later. A new hire needs an AD account to log into a
domain-joined laptop, a separate Entra ID account (or none, if nobody
remembered) to reach Microsoft 365 and Azure resources, and a separate
AWS IAM user if their job touches AWS. Three accounts means three
passwords, three MFA enrollments, and — the part that actually gets
companies breached or audited — three offboarding steps. Disable the
AD account on their last day and the AWS IAM user quietly keeps
working, because nothing ever told AWS the person left.

## Entra Connect: making on-prem AD and Entra ID one identity

The fix for the AD-to-Azure half of this is Microsoft Entra Connect
(the current name for what used to be Azure AD Connect): a sync agent
that runs on-prem, reads your Active Directory, and writes matching
user and group objects into your Entra ID tenant on a schedule. The
on-prem AD account stays authoritative — it's still where the account
actually lives — but Entra ID now has a synchronized copy that Azure,
Microsoft 365, and anything federated behind Entra ID can authenticate
against. This is what "hybrid identity" means in practice: one person,
one identity, represented in two places that stay in sync.

Entra Connect gives you a real choice for how the *password* part
works:

- **Password Hash Sync (PHS)** — a hash of the password hash is synced
  to Entra ID, so Entra ID can validate sign-ins on its own, even if
  the on-prem network is down. Simplest to run, and what most
  organizations use.
- **Pass-through Authentication (PTA)** — Entra ID forwards the actual
  sign-in attempt to a lightweight on-prem agent, which checks it
  against AD directly. The password validation never leaves on-prem,
  which some compliance teams require.

Either way, add **Seamless SSO** and a domain-joined Windows machine
can sign a user into Entra ID-backed resources without a visible
prompt at all — the on-prem Kerberos ticket does the work.

## Extending that identity into AWS

Entra Connect solves on-prem-to-Azure. It does nothing for AWS on its
own — and this is the mistake that recreates the three-directory
problem one level up. The correct pattern is **not** to give AWS its
own synced copy of AD. It's to make AWS trust the Entra ID identity
that already exists.

**AWS IAM Identity Center** (the successor to AWS SSO) is built for
exactly this: it acts as a SAML 2.0 service provider, with Entra ID as
the identity provider. Microsoft publishes a ready-made "AWS IAM
Identity Center" enterprise application in the Entra ID app gallery —
you configure it, exchange SAML metadata once, and from then on a user
who's already authenticated to Entra ID (with whatever Conditional
Access and MFA you've configured) can sign into the AWS access portal
and land in whichever AWS accounts and roles they've been assigned,
without AWS ever issuing them a separate password.

Provisioning the *right* users and groups into IAM Identity Center —
and removing them the moment they leave — is handled by **SCIM**
(System for Cross-domain Identity Management). Entra ID pushes user
and group changes to IAM Identity Center's SCIM endpoint automatically,
so the AD-to-Entra-ID sync you already have flows one hop further,
into AWS, without anyone touching an AWS console by hand.

## Key terms

| Term | Meaning |
|---|---|
| Entra Connect | On-prem sync agent that mirrors AD users/groups into Entra ID, creating one hybrid identity instead of two separate ones |
| Password Hash Sync (PHS) | Entra Connect option where a hash of the password hash syncs to Entra ID, letting Entra ID validate sign-ins independently |
| Pass-through Authentication (PTA) | Entra Connect option where sign-in validation happens on-prem via an agent, and the password never leaves the network |
| AWS IAM Identity Center | AWS's SSO service; acts as a SAML service provider so Entra ID can be its identity provider instead of AWS keeping its own users |
| SCIM | Protocol Entra ID uses to automatically provision and deprovision users/groups into IAM Identity Center as they change |

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: why
is "give AWS its own synced copy of Active Directory" the wrong fix
for the three-directory problem, and what does SCIM provisioning
actually keep in sync once Entra ID is federated into AWS IAM Identity
Center?
