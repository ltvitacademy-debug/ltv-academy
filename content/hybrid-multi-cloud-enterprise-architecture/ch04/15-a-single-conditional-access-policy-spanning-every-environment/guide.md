# Lesson 15 — A Single Conditional Access Policy Spanning Every Environment

**Chapter 4 · Hybrid Identity at Enterprise Scale · Lesson 3 of 4**

## What you'll learn

- Why Conditional Access can govern AWS sign-ins at all, once AWS IAM
  Identity Center is federated as an Entra ID enterprise application
- The real signals a Conditional Access policy evaluates — device
  compliance, location, sign-in risk, and the target app — and how to
  target "AWS IAM Identity Center" the same way you'd target SharePoint
- Why a federated AWS session isn't re-checked on every API call, and
  what sign-in frequency settings do about that
- How to extend one existing policy to cover AWS instead of writing a
  second, parallel set of AWS-only access rules

## Conditional Access already sees every federated app

Conditional Access (part of Entra ID P1/P2) doesn't have a notion of
"Azure resources" versus "everything else." It evaluates a sign-in —
who the user is, what group they're in, whether their device reports
as compliant through Intune, what network or country they're signing
in from, and what Identity Protection's risk engine thinks of this
specific attempt — and then it decides whether to allow it, block it,
or demand something extra (MFA, a compliant device) before access to a
*specific target application* is granted.

The key fact from Lesson 14 that makes this lesson possible: once AWS
IAM Identity Center is set up as a SAML enterprise application in your
Entra ID tenant, it **is** a target application, in exactly the sense
Conditional Access already understands. A policy that currently
targets "Office 365" or "SharePoint Online" can target "AWS IAM
Identity Center" using the identical mechanism — no separate AWS-side
access control concept, no second product to learn.

## Extending an existing policy instead of writing a new one

This matters because of what it replaces. The naive approach is: write
one Conditional Access policy for Microsoft 365 and Azure, and a
completely separate access-control story for AWS — maybe just "IAM
Identity Center requires MFA" configured inside AWS itself, with its
own rules, its own exceptions, and its own drift over time from
whatever the Azure-side policy says.

The better approach is to open the Conditional Access policy you
already trust — the one requiring, say, a compliant or
Microsoft-Entra-hybrid-joined device, phishing-resistant MFA, and a
block on legacy authentication — and add the "AWS IAM Identity Center"
app to its list of target resources alongside the Microsoft ones. Now
there is exactly one rule, enforced in exactly one place, and someone
signing into AWS gets evaluated by the same bar as someone signing
into Outlook. Change the policy once — tighten the MFA requirement,
add a new blocked country — and both environments move together.

## The signals that actually matter here

For a policy that's going to gate cloud infrastructure access, the
signals worth leaning on are:

- **Device compliance** (via Intune) — require the sign-in come from
  a managed, compliant machine, not an arbitrary browser
- **Multifactor authentication** — ideally phishing-resistant (FIDO2,
  Windows Hello for Business) for anyone with AWS admin-level
  permission sets
- **Sign-in risk**, from Entra ID Identity Protection — block or force
  re-verification on atypical travel, anonymized IPs, or leaked
  credential matches
- **Named locations** — flag or block sign-ins from outside expected
  corporate or VPN ranges

## What Conditional Access can't do once the token exists

One real limitation to know: Conditional Access evaluates the SAML
sign-in itself. Once IAM Identity Center issues short-lived AWS STS
credentials off the back of that assertion, the user's actual AWS API
calls aren't individually re-checked against the policy — AWS doesn't
ask Entra ID's permission for every S3 request. What you control
instead is *how often the user has to come back through Entra ID to
refresh that session*, using **sign-in frequency** settings on the
policy. A shorter frequency means a stale or now-risky session gets
re-evaluated sooner; it's the practical substitute for continuous
re-checking on a third-party relying party like AWS.

## Key terms

| Term | Meaning |
|---|---|
| Conditional Access | Entra ID's policy engine that allows, blocks, or adds requirements to a sign-in based on user, device, location, risk, and target app |
| Target application | The specific app (e.g. "AWS IAM Identity Center") a Conditional Access policy is scoped to enforce against |
| Device compliance | An Intune-reported signal confirming a device meets configured security requirements, usable as a Conditional Access condition |
| Sign-in frequency | A Conditional Access session control forcing re-authentication after a set interval — the practical stand-in for re-checking a federated AWS session |

## Check yourself

You're ready for Lesson 16 when you can explain, without looking: why
can a single existing Conditional Access policy be extended to cover
AWS instead of writing a new one, and why doesn't that policy get
re-evaluated on every individual AWS API call after sign-in?
