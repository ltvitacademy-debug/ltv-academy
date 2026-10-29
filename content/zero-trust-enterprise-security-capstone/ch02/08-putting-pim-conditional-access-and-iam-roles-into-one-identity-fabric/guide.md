# Lesson 8 — Putting PIM, Conditional Access, and IAM Roles into One Identity Fabric

**Chapter 2 · Verifying Identity Explicitly · Lesson 4 of 4**

## What you'll learn

- Why a hybrid/multi-cloud org needs one identity source of truth,
  not a separate identity silo per cloud
- How Microsoft Entra ID federates into AWS IAM Identity Center so
  AWS console and CLI access inherit the same Conditional Access and
  device-compliance checks you just spent three lessons on
- How PIM's "eligible, then activated, then time-boxed" model and
  AWS STS's temporary, expiring credentials are the same idea
  expressed in two different clouds
- How to describe this synthesis as one coherent identity-verification
  fabric, the way a capstone architecture review would expect

## The problem: identity silos per cloud

An org running Azure and AWS side by side can end up, almost by
accident, with two separate identity stories: Microsoft Entra ID
governs who can do what in Azure, while a completely separate set of
IAM users, groups, and access keys governs AWS — created by whoever
set up the AWS account first, often with no relationship to Entra ID
at all. That's not zero trust, it's two perimeters pretending to be
one. A user who leaves the company might get disabled in Entra ID
instantly and still hold a working set of AWS access keys for weeks,
because nothing connects the two systems' notion of "this person
should no longer have access to anything."

The fix isn't to rebuild identity twice as well as possible in each
cloud. It's to make Entra ID the single identity source of truth and
have every downstream system — Azure RBAC, AWS, SaaS apps — consume
that one identity rather than maintaining its own.

## Federating Entra ID into AWS IAM Identity Center

AWS IAM Identity Center (the successor to AWS SSO) supports federating
authentication to an external identity provider over SAML. Configured
this way, a user doesn't get a separate AWS username and password at
all: they sign in through Microsoft Entra ID, exactly as they would for
any other app, and IAM Identity Center maps that authenticated identity
to one or more **permission sets** — AWS's reusable definitions of what
a federated identity is allowed to do once it lands in a given AWS
account.

Because that sign-in goes through Entra ID, it's subject to the exact
same Conditional Access policy as everything else: the same device
compliance check from Lesson 7, the same risk evaluation, and — because
the federation endpoint is a CAE-enabled sign-in path — the same
continuous evaluation from Lesson 6. A user whose account gets disabled
or flagged as high-risk doesn't just lose Azure access; the same signal
that revokes their Microsoft 365 session degrades their path into AWS
too, because there's only one identity underneath both.

## PIM and AWS STS: the same idea, two implementations

Once a federated identity lands in AWS, it doesn't get standing,
permanent permissions either. AWS access through IAM Identity Center is
granted via **temporary credentials issued by AWS Security Token
Service (STS)** — short-lived, expiring credentials tied to an assumed
role and its permission set, rather than a long-lived access key sitting
on someone's laptop.

Line that up against what you already know from PIM: a user is
*eligible* for an Azure role, *activates* it with justification (and
often approval and MFA), and holds it for a *fixed, time-boxed* window
before it expires and has to be reactivated. AWS's model — assume a
role, receive credentials with a defined, limited lifetime, use them
until they expire — is the same underlying principle: privilege is
borrowed for a bounded window, not held indefinitely. Different cloud,
same design philosophy: time-boxed, justified, re-verified elevation
instead of standing admin rights.

## One fabric, not three separate controls

Put together, the fabric looks like this: Microsoft Entra ID is the
single identity source of truth for every human and workload identity
in the org. Conditional Access is the policy decision point that every
sign-in passes through — into Microsoft 365, into Azure, and into AWS
via the federated IAM Identity Center path alike — evaluating identity,
device compliance, and risk on every request, with Continuous Access
Evaluation keeping that decision fresh throughout the session rather
than only at sign-in. PIM governs time-boxed elevation to privileged
Azure roles; AWS STS-issued temporary credentials via assumed roles
govern time-boxed elevation to privileged AWS permissions, using the
same justification-and-expiry philosophy on the AWS side.

The point of a capstone-level architecture review isn't to name all
three pieces — it's to be able to trace one access request end to end
through them and show that there's no silent gap where a disabled
account, a non-compliant device, or an expired elevation could still
reach something, in either cloud.

## Key terms

| Term | Meaning |
|---|---|
| Identity source of truth | The single system (Microsoft Entra ID, in this design) that every downstream system authenticates against, rather than maintaining its own separate identity store |
| AWS IAM Identity Center | AWS's successor to AWS SSO; federates sign-in to an external identity provider over SAML and maps the authenticated identity to permission sets |
| Permission set | AWS's reusable definition of what a federated identity is permitted to do once it lands in a given AWS account |
| AWS STS (Security Token Service) | Issues short-lived, expiring temporary credentials tied to an assumed role, mirroring PIM's time-boxed elevation model on the AWS side |

## Check yourself

You're ready to move into Chapter 3 when you can trace a single access
request, end to end, through this fabric: a user signs in to reach an
AWS account through the federated path — name every point along that
path where identity, device, risk, or time-boxed elevation gets checked,
and what happens if any one of them fails.
