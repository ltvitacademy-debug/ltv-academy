# Lesson 2 — Identity Providers and the Identity Plane

**Chapter 1 · Identity Architecture at Enterprise Scale · Lesson 2 of 4**

## What you'll learn

- What an identity provider (IdP) actually is, and real examples enterprises use
- Why an IdP functions as the centralized system of record for identity, not just a login screen
- What the "identity plane" means — identity as infrastructure other security controls depend on
- A concrete example of what breaks when the identity plane isn't trustworthy

## The identity provider: a system of record, not just a login box

An **identity provider**, or **IdP**, is the centralized system an organization points
everything else at to answer one question: who is this, and are they who they claim to be?
Real, widely used IdPs include **Microsoft Entra ID** (formerly Azure AD), **Okta**, and **Ping
Identity**. Each one authenticates users, holds the authoritative directory of who they are, and
issues the tokens or assertions that downstream applications trust instead of running their own
password store. That last part matters: once an app trusts the IdP, the app itself stops being
the thing deciding who can sign in.

## Why identity became its own "plane"

The term **identity plane** borrows from the same idea as a network's control plane: a
dedicated layer of infrastructure that other systems constantly depend on and query, rather than
just one app among many. Once an organization adopts single sign-on, Conditional Access, and
Zero Trust, all three of those controls key off the IdP's decisions. Conditional Access
evaluates signals like device health, location, and risk score at the IdP, during sign-in,
before any application is reached. Zero Trust's "verify explicitly" principle depends on that
same IdP signal being trustworthy on every request, not just the first one. Single sign-on means
every connected app trusts the IdP's decision instead of checking a password itself.

## A concrete example: a Conditional Access policy

Here's what that dependency looks like in practice — a simplified version of a real Microsoft
Entra ID Conditional Access policy:

```
{
  "displayName": "Require MFA for Admin Roles",
  "state": "enabled",
  "conditions": {
    "users": { "includeRoles": ["Global Administrator"] },
    "applications": { "includeApplications": ["All"] }
  },
  "grantControls": {
    "operator": "AND",
    "builtInControls": ["mfa"]
  }
}
```

This policy requires MFA for every Global Administrator sign-in, across every connected
application. Notice where the decision happens: at the IdP, during sign-in, before the user ever
reaches the app they were trying to open.

## What breaks when the identity plane isn't trustworthy

If the IdP is misconfigured or compromised — an admin account without MFA, an overly broad
trusted-location setting — every downstream control inherits that weakness. Single sign-on means
one compromised IdP session can reach every connected app, not just one. Conditional Access
can't make a good decision from bad signals. Zero Trust's whole model collapses, because the
"verify" step it depends on is no longer reliable. That's the real cost of identity being a
plane: when it's solid, everything built on it is solid too, and when it isn't, nothing built on
it is either.

## Key terms

| Term | Meaning |
|---|---|
| Identity Provider (IdP) | Centralized system of record for identity and authentication |
| Identity plane | The idea that identity operates as a dedicated infrastructure layer other security controls query and depend on |
| Entra ID / Okta / Ping Identity | Real enterprise identity providers organizations point SSO and Conditional Access at |
| Conditional Access | Policy engine, evaluated at the IdP, that checks signals like device, location, and risk before granting access |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: why can a single compromised
IdP account be more damaging in an SSO-enabled organization than in one without SSO?
