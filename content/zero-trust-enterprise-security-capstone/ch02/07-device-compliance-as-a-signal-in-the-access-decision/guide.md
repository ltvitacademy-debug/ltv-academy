# Lesson 7 — Device Compliance as a Signal in the Access Decision

**Chapter 2 · Verifying Identity Explicitly · Lesson 3 of 4**

## What you'll learn

- Why the same valid credentials carry different risk depending on
  the device they're typed into
- How Intune compliance policies define what "compliant" actually
  means, and how that status reaches Microsoft Entra ID
- The difference between a hybrid Azure AD joined device and a
  compliant device as two distinct Conditional Access grant controls
- Why device compliance belongs inside the access decision itself,
  not as a separate IT-hygiene checklist run on the side

## Credentials alone don't tell you the real risk

Lesson 5 established that identity-plus-context, not network location,
is the real perimeter. Device is one of the biggest pieces of that
context, and it's easy to underweight. Picture two sign-ins with the
exact same username, password, and even the same passing MFA
challenge: one comes from a company-issued laptop that's encrypted,
patched, enrolled in Intune, and reporting a clean security posture.
The other comes from an unknown personal device with no management
agent, unknown patch level, and no visibility into whether it's
already compromised. Those two sign-ins are not the same risk, even
though the identity signal — a correctly authenticated user — looks
identical in both. A zero-trust access decision that only asks "is
this the right user?" is missing half the picture.

## What Intune compliance policies actually check

Microsoft Intune lets you define compliance policies per platform
(Windows, iOS/iPadOS, Android, macOS) that specify the conditions a
device has to meet to be marked **compliant**. Typical conditions
include:

- A minimum supported OS version
- Disk encryption enabled (BitLocker on Windows, FileVault on macOS)
- A device password or PIN requirement
- The device not being jailbroken or rooted
- A threat level reported through a connected endpoint-protection
  signal (for example, a Microsoft Defender for Endpoint connector)
  not exceeding a configured threshold

Intune evaluates the device against these rules on a recurring basis
and reports a simple compliance state back to Microsoft Entra ID.
That state — compliant or not compliant — is what Conditional Access
actually consumes; the policy itself, and all the granular rules
behind it, lives in Intune, while Entra ID sees only the resulting
signal at decision time.

## Two different device-trust signals, not one

It's worth being precise here, because Conditional Access actually
exposes two separate device-related grant controls, and they answer
different questions:

- **Require Hybrid Azure AD joined device** — asks whether the device
  is domain-joined on-premises and also registered with Microsoft
  Entra ID, which is about where the device came from and who
  provisioned it.
- **Require device to be marked as compliant** — asks whether Intune
  currently considers the device healthy against policy, which is
  about its present-day security posture.

A device can be hybrid-joined without being compliant (it was
provisioned correctly, but its disk encryption got disabled later),
and in principle compliance can be evaluated independently of join
type. Treating these as the same thing is a common design mistake —
an architecture review should ask explicitly which of the two a
policy is actually requiring, and whether that's the right one for
the resource being protected.

## Why this has to be inside the decision, not beside it

The point of folding device compliance into Conditional Access,
rather than running it as a separate IT audit, is timing: compliance
state has to be available at the exact moment the access decision is
made, combined with identity and risk in the same evaluation, so a
non-compliant device can be blocked or restricted on this request —
not flagged for someone to review next week. That's the same logic
Lesson 6 applied to session freshness: a signal that's only checked
periodically, out of band, isn't verifying explicitly. It's auditing
after the fact. Device compliance earns its place in the access
decision only when it's evaluated at request time, every time.

## Key terms

| Term | Meaning |
|---|---|
| Intune compliance policy | A per-platform rule set (OS version, encryption, PIN, jailbreak/root detection, threat level) that determines whether a device is marked compliant |
| Compliance state | The simple compliant / not-compliant signal Intune reports to Microsoft Entra ID, consumed by Conditional Access |
| Hybrid Azure AD joined | A device-provenance signal (on-prem domain join plus Entra ID registration) distinct from, and not the same as, compliance |
| Require device to be marked as compliant | The Conditional Access grant control that blocks or restricts access unless Intune currently reports the device as healthy |

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: why
are "hybrid Azure AD joined" and "marked as compliant" two different
Conditional Access signals, and why does compliance have to be
evaluated at the moment of the access decision rather than on a
periodic schedule?
