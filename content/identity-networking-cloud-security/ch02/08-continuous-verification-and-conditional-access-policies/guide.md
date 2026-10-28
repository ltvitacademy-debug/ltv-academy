# Lesson 8 — Continuous Verification and Conditional Access Policies

**Chapter 2 · Zero Trust Networking Principles · Lesson 8 of 32**

## What you'll learn

- What continuous verification means, and how it differs from a one-time login check
- Why a session that looked safe at sign-in can stop being safe five minutes later
- How Conditional Access — which you've already seen at a basic level earlier in this
  catalog — is Zero Trust's "verify explicitly" tenet implemented in a real product
- Why Conditional Access policies are evaluated on every access attempt, not just once

## Verified once isn't the same as verified

A login screen answers one question: is this identity who it claims to be, right now, at
this moment. **Continuous verification** is the recognition that "right now, at this
moment" isn't good enough on its own — a session that passed every check at 9 a.m. can
look very different by noon. The device could lose its compliance status. The sign-in's
risk score could change if the same account suddenly appears to sign in from somewhere
else. The access token itself has a limited lifetime by design, forcing a fresh evaluation
rather than one login lasting indefinitely. Continuous verification means trust signals
get re-checked throughout a session, not just accepted once at the door and left alone.

## Conditional Access: Zero Trust's "verify explicitly," in practice

This is exactly where **Conditional Access**, which you learned at a basic level earlier
in this catalog, stops being just an MFA feature and becomes a real implementation of
Zero Trust. A Conditional Access policy doesn't fire once at initial sign-in and then step
aside — Entra ID re-evaluates its conditions on every single access attempt a user makes,
for as long as that user is active. Requiring MFA is "verify explicitly" in action: don't
just trust that the initial sign-in was legitimate, confirm it with a second factor on the
attempts that matter. Requiring a compliant device is "least privilege access" in action:
don't hand access to just any device that happens to have the right password. And treating
an unfamiliar location or new device as a trigger for re-verification is "assume breach" in
action: design the system to notice when something about an identity looks different,
rather than assuming nothing has changed since login.

## Not one gate — a gate on every request

The practical difference from a one-time login is scale and timing. A basic sign-in check
happens once. A Conditional Access policy requiring MFA, a compliant device, and a trusted
location is evaluated continuously: every time that user's session touches a protected
resource, Entra ID checks whether the conditions still hold. If the user's device falls
out of compliance mid-session, or the sign-in's risk level changes, the next access attempt
can be challenged or blocked — without waiting for the user to log out and back in. That's
the mechanism that turns "never trust, always verify" from a principle into something that
actually runs, continuously, in a real tenant.

## Example: a session that changes mid-stream

A user signs in from a managed laptop on a trusted network — MFA satisfied, device
compliant, location trusted, access granted. Twenty minutes later, that same laptop's
compliance check fails (a required security update hasn't installed). The user doesn't
need to be actively attacked for Conditional Access to react: the next time that session
tries to reach a protected resource, the device-compliance condition no longer holds, and
the policy can require remediation or block the attempt — mid-session, without a new
sign-in ever happening. That's continuous verification, not a one-time gate.

## Key terms

| Term | Meaning |
|---|---|
| Continuous verification | Re-checking trust signals throughout a session, not just once at initial login |
| Conditional Access | Entra ID's policy engine, evaluated on every access attempt, that implements Zero Trust's conditions-and-controls model |
| Risk signal | A piece of evidence (new device, unfamiliar location, risky sign-in pattern) that can change a session's trust level mid-stream |
| Verify explicitly | The Zero Trust tenet Conditional Access implements by checking signals like MFA and device compliance on every attempt |

## Check yourself

You're ready for Chapter 3 when you can explain, without looking: why does Conditional
Access evaluating its conditions on every access attempt, rather than once at login,
matter for a session whose device compliance changes partway through?
