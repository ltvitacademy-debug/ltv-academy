# Lesson 8 — Conditional Access and MFA Basics

**Chapter 2 · Azure Identity: Microsoft Entra ID · Lesson 8 of 32**

## What you'll learn

- How Microsoft Entra ID enforces baseline MFA, and where that falls short on its own
- What a Conditional Access policy actually is: an if-this-then-that access rule
- The signals a policy can evaluate (who, where, what device, which app) and the controls it can apply
- Why Conditional Access is described as "layering on top of" MFA rather than replacing it

## Starting point: MFA is already covered — this is what sits above it

You've already learned the general idea of multi-factor authentication elsewhere in
this catalog — something you know plus something you have or are, and why combining
factors defeats a stolen password alone. Entra ID can enforce that baseline through
**Security defaults** or a tenant-wide MFA requirement: every user, every sign-in,
MFA required, no exceptions. That's simple and effective, but it's also blunt — it
treats a sign-in from the office on a company laptop exactly the same as a sign-in
from an unrecognized device on the other side of the world. **Conditional Access**
is Entra ID's answer to that bluntness.

## Conditional Access: an if-this-then-that policy engine

A **Conditional Access policy** is a rule with two parts: a set of **conditions**
(signals the policy evaluates about the sign-in) and a set of **controls** (what
happens if those conditions are met). In plain terms: *if* this is true about the
sign-in attempt, *then* require this before letting it through. Policies live under
Entra ID and require an **Entra ID P1** license (P2 adds risk-based signals) — this
is one of the premium features that license unlocks, which is why it came up back in
Lesson 6.

## The signals a policy can evaluate

A policy can check **who** is signing in (a specific user or group — Lesson 6's
security groups are exactly what you'd target here), **where** the sign-in is coming
from (a **named location**, meaning a defined IP range such as the corporate
office), **what device** is being used (whether it's a compliant, Intune-managed
device or an unknown one), and **which application** is being accessed (Exchange
Online differently from a line-of-business app, for instance).

## The controls a policy can apply

Once the conditions match, a policy applies one or more controls: **require MFA**,
**require a compliant device**, **require a password change**, or, at the far end,
**block access** outright. Multiple controls can combine — require both MFA *and* a
compliant device for a particularly sensitive app, for example.

## Why this is layering, not replacing

The real payoff is adaptive, risk-based enforcement instead of one blunt rule for
everyone. Basic, always-on MFA means every sign-in gets an MFA prompt, full stop.
Conditional Access lets you say something closer to: users inside the corporate
network on a known device skip the extra prompt, while the exact same user signing
in from an unfamiliar device or location outside that network gets stopped for MFA.
Conditional Access doesn't turn MFA off for anyone — it decides *when* to actually
demand it, based on real signals about the sign-in, rather than treating every
situation as equally risky.

## Example: a Finance Conditional Access policy

Condition: the signed-in user is a member of the Finance security group **and** the
sign-in's network location is not the corporate named location. Control: require
MFA. Result — a Finance analyst working from the office, on the known corporate
network, signs in with just a password; the same analyst signing in from a coffee
shop gets an MFA prompt before Entra ID lets them through. One policy, two outcomes,
driven entirely by the signal that changed.

## Key terms

| Term | Meaning |
|---|---|
| Conditional Access policy | An if-this-then-that access rule combining conditions and controls |
| Named location | A defined IP range (such as the corporate office) a policy can check a sign-in against |
| Security defaults | Entra ID's baseline, always-on MFA requirement with no conditional logic |
| Control | The action a Conditional Access policy applies when its conditions are met — e.g., require MFA, block access |

## Check yourself

You're ready for Chapter 3 when you can explain, without looking: what's the actual
difference between requiring MFA for every sign-in and requiring it through a
Conditional Access policy — and why would an admin prefer the second approach?
