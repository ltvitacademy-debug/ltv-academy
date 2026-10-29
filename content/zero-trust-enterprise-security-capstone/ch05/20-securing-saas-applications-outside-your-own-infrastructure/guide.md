# Lesson 20 — Securing SaaS Applications Outside Your Own Infrastructure

**Chapter 5 · Zero Trust for Data and Applications · Lesson 4 of 4**

## What you'll learn

- Why the enforcement points from earlier chapters — network segments,
  identity providers you run, your own policy enforcement points —
  don't fully reach a SaaS application you don't host
- What shadow IT is, and why it's the starting point for almost every
  SaaS security program
- What a CASB (cloud access security broker) and an SSPM (SaaS
  security posture management) tool each actually do, and how they
  differ
- How conditional access extends past your own apps to govern the
  third-party and OAuth-connected apps employees sign into every day

## The boundary moves again — this time outside your infrastructure

Chapter 3's software-defined perimeter work assumed you control the
network path to the resource. Lesson 18's service mesh assumed you
control the services on both ends of a call. Lesson 19's workload
identity assumed the automation runs on infrastructure your cloud
platform (or a federated relationship with it) ultimately governs. A
SaaS application breaks all three assumptions at once: the vendor
hosts it, the vendor's infrastructure enforces access to it, and your
own policy enforcement points have no network path to intercept
traffic between an employee's browser and that vendor's servers at
all. Employees and departments adopt dozens to hundreds of SaaS tools
over time, frequently without IT ever provisioning or even knowing
about them — that unmanaged layer is called **shadow IT**, and most
SaaS security programs start by discovering how large it actually is,
because you can't apply zero-trust controls to an application nobody
registered.

## CASB: a broker that sits between users and SaaS apps

A cloud access security broker inserts itself into the path between
users and cloud applications — either as a proxy that traffic actually
routes through, or via API integrations that connect directly to the
SaaS vendor's own management APIs. From that vantage point, a CASB can
enforce the same categories of policy this course has covered for
first-party resources: block uploads of a file carrying a "Restricted"
sensitivity label to an unsanctioned app, require step-up
authentication for a risky sign-in to an approved one, or block access
entirely from a non-compliant device. A CASB is effectively how DLP and
conditional access — both covered earlier in this course for your own
apps — get extended out to reach an app you don't control the
infrastructure of.

## SSPM: checking the configuration of the apps themselves

A CASB mostly governs the path to a SaaS app. **SaaS security posture
management** looks inward at the app's own configuration — continuously
checking a connected SaaS tenant for dangerous settings: a public
sharing link left open on a sensitive folder, an admin account without
MFA enforced, an overly permissive default role assigned to every new
user, a third-party OAuth app granted far more scope than it needs.
These are misconfigurations within a vendor's platform that a CASB
sitting on the traffic path would never see, because they're not about
traffic at all — they're about settings. SSPM tools continuously scan
for exactly this class of drift and flag it for remediation, the SaaS
equivalent of a cloud security posture management scan against your
own infrastructure.

## Conditional access doesn't stop at apps you built

Chapter 2 covered conditional access as a policy evaluated continuously
against identity, device, and risk signals for your own applications.
That same engine, when properly extended, governs sign-ins to
third-party SaaS apps too — requiring MFA before a sign-in to an
approved vendor's app, blocking sign-in from a non-compliant device,
or blocking access entirely from an unexpected location — because the
identity provider sits in the authentication path for federated SaaS
sign-in even though the vendor hosts the application itself. The same
principle governs OAuth app consent: when an employee clicks "Allow"
on a third-party app requesting access to their mailbox or files
through OAuth, that app effectively becomes a long-lived, often
invisible integration with broad access — which is exactly why
governing and auditing OAuth app consent, not just the SaaS sign-in
itself, is now a core part of extending zero trust past your own
infrastructure's edge.

## Key terms

| Term | Meaning |
|---|---|
| Shadow IT | SaaS applications adopted by employees or departments without IT provisioning or visibility, and the usual starting point for SaaS security programs |
| CASB (cloud access security broker) | A proxy or API-based control point between users and SaaS apps that extends DLP and conditional-access-style policy to applications you don't host |
| SSPM (SaaS security posture management) | Continuous scanning of a connected SaaS tenant's own configuration for misconfigurations — open sharing links, missing MFA, over-permissive roles or OAuth grants |
| OAuth app consent | The approval an employee grants a third-party app to access their data through OAuth, creating a long-lived integration that needs its own governance and auditing |
| Federated SaaS sign-in | Authentication to a third-party SaaS app routed through your own identity provider, letting conditional access policy apply even though the app itself is hosted elsewhere |

## Check yourself

This is the end of Chapter 5. Before Chapter 6's maturity-model work,
make sure you can explain: why can't the network- and service-layer
enforcement points from earlier in this chapter reach a SaaS
application directly, and what two tools — plus one identity mechanism
— close that gap?
