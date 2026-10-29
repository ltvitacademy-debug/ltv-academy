# Lesson 2 — The NIST Zero Trust Architecture Tenets

**Chapter 1 · Zero Trust Principles · Lesson 2 of 4**

## What you'll learn

- The seven tenets NIST SP 800-207 defines as the basis of a Zero
  Trust Architecture (ZTA)
- What each tenet actually requires in practice, not just as a slogan
- How each tenet maps to identity, cloud, and automation controls you
  already know from courses 8 through 10
- Why these are tenets to converge toward, not a checklist you
  "finish" once

## Where these tenets come from

NIST Special Publication 800-207, *Zero Trust Architecture*, is the
real source document behind the term "Zero Trust" as it's used across
the security industry — not a product category, and not any one
vendor's marketing. Section 2.1 of that publication lays out seven
tenets that define what a Zero Trust Architecture actually commits to.
None of them say "buy this tool." They describe requirements a mature
architecture has to satisfy, using whatever combination of identity,
network, and monitoring controls gets there.

## The seven tenets

**1. All data sources and computing services are considered
resources.** Not just servers and databases — SaaS applications,
APIs, containers, and even IoT devices all count as resources that
need an access decision applied to them. If it holds or processes
data, it's in scope.

**2. All communication is secured regardless of network location.**
Being on the "internal" network earns a connection nothing. Every
request to a resource is authenticated and encrypted the same way,
whether it originates from the office LAN or from a hotel Wi-Fi
network halfway around the world.

**3. Access to individual enterprise resources is granted on a
per-session basis.** Trust granted for one session to one resource
doesn't carry forward automatically. This is the architectural reason
behind short-lived access tokens instead of long-lived sessions — you
already know this pattern from OAuth/OIDC access tokens that expire in
minutes, not VPN sessions that stay "logged in" all day.

**4. Access to resources is determined by dynamic policy — including
the observable state of client identity, application, and the
requesting asset — and may include other behavioral and environmental
attributes.** This is the tenet that justifies Conditional Access-style
policy: the decision isn't just "is this the right password," it's
identity plus device compliance plus location plus risk signal,
evaluated together, every time.

**5. The enterprise monitors and measures the integrity and security
posture of all owned and associated assets.** No device gets a
permanent pass just because it passed a compliance check once.
Posture — patch level, EDR status, configuration drift — is something
you continuously verify, the same way Intune compliance policies or
AWS Systems Manager inventory already work.

**6. All resource authentication and authorization are dynamic and
strictly enforced before access is allowed.** Authentication and
authorization aren't a one-time gate at login; they're re-evaluated
before each access is granted, and nothing proceeds until both pass.

**7. The enterprise collects as much information as possible about
the current state of assets, network infrastructure, and
communications, and uses it to improve its security posture.**
Telemetry isn't a side effect of Zero Trust — it's an input back into
the policy itself. Every signal your SIEM, XDR, or cloud-native
logging pipeline collects is meant to feed forward into better access
decisions, not just sit in a dashboard for after-the-fact investigation.

## Reading the tenets as a system, not a checklist

Notice what's missing from this list: there's no tenet that says
"deploy a ZTNA gateway" or "buy a CASB." NIST deliberately wrote these
as architectural requirements, not product requirements, because a
Zero Trust Architecture is built from whatever combination of your
existing identity provider, your cloud-native policy engines, your
EDR/XDR telemetry, and your network enforcement points gets you to
satisfy all seven at once. You already own pieces of this — Conditional
Access, Intune/Systems Manager posture checks, short-lived OAuth
tokens, SIEM pipelines. This course is about connecting those pieces
into one coherent architecture, not buying a new one.

## Key terms

| Term | Meaning |
|---|---|
| Zero Trust Architecture (ZTA) | The architecture NIST SP 800-207 defines, built to satisfy its seven tenets |
| Per-session access | Tenet 3: access granted for one session to one resource, not carried forward |
| Dynamic policy | Tenet 4: access decisions evaluated from identity, device, and context together, every time |
| Security posture | Tenet 5: the continuously monitored integrity/compliance state of a device or asset |

## Check yourself

You're ready for Lesson 3 when you can state, in your own words, what
each of the seven tenets actually requires — and name one control you
already know that helps satisfy each one.
