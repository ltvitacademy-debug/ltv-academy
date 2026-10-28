# Lesson 17 — What Defender XDR Actually Unifies

**Chapter 5 · Microsoft Defender XDR · Lesson 17 of 32**

## What you'll learn

- What Microsoft Defender XDR actually is, and why Microsoft renamed it from Microsoft 365 Defender
- The four Defender workloads it unifies, and what each one watches
- Why a single attack that touches email, identity, and an endpoint produces one correlated incident instead of several siloed alerts
- Where Defender XDR fits next to Microsoft Sentinel, which Chapter 6 picks up directly

## One console, four Defender products

**Microsoft Defender XDR** — renamed from **Microsoft 365 Defender** in 2023 — is Microsoft's
cross-domain detection and response platform. It doesn't replace the individual Defender
products; it sits on top of them and pulls their signal into one place: the unified portal at
**security.microsoft.com**. Four workloads feed it:

- **Defender for Endpoint** — devices (the EDR platform covered earlier in this path)
- **Defender for Office 365** — email and collaboration tools, covered next in Lesson 19
- **Defender for Identity** — on-prem Active Directory domain controllers, covered in Lesson 20
- **Defender for Cloud Apps** — SaaS application usage and cloud access patterns

Each of those products can still raise its own alerts on its own. What Defender XDR adds is a
layer above all four that looks for alerts that belong to the same story, regardless of which
product raised them.

## Why unification matters: one attack, four touchpoints

A real intrusion rarely stays inside one product's territory. Consider a realistic chain: an
attacker sends a phishing email with a credential-harvesting link — Defender for Office 365's
job. A user clicks it and types their password into a fake login page. The attacker then signs
in to a SaaS app from an unusual location using those stolen credentials — Defender for Cloud
Apps' job. From there they pivot to an on-prem account and attempt a Pass-the-Hash against a
domain controller — Defender for Identity's job. Finally they drop a malicious payload on the
victim's laptop — Defender for Endpoint's job.

Without unification, that's four separate alerts in four separate consoles, each looking like an
unrelated, low-priority event on its own. Defender XDR correlates them into **one incident**
with a single timeline spanning email, identity, cloud app, and endpoint — because they're
evidence of one attack, not four.

## Where this sits next to Sentinel

Defender XDR's unified incident view is itself a correlation engine, similar in spirit to what
Chapter 3 covered for Sentinel's analytics rules. It isn't a replacement for Sentinel, though —
Lesson 18 covers the real connector that lets Sentinel ingest Defender XDR's incidents and their
underlying raw event tables, so a SOC can correlate Microsoft's own cross-product story with
non-Microsoft data sources like firewalls, VPNs, and third-party SaaS logs inside Sentinel too.

## Key terms

| Term | Meaning |
|---|---|
| Microsoft Defender XDR | Microsoft's unified cross-domain detection platform, renamed from Microsoft 365 Defender in 2023; portal at security.microsoft.com |
| Defender for Endpoint | The device-focused EDR workload feeding Defender XDR |
| Defender for Office 365 | The email and collaboration-tool workload feeding Defender XDR |
| Defender for Identity | The on-prem Active Directory domain controller workload feeding Defender XDR |
| Defender for Cloud Apps | The SaaS/cloud-app usage workload feeding Defender XDR |
| Correlated incident | One grouped view of alerts from multiple Defender workloads that belong to the same attack |

## Check yourself

Walk through the phishing-to-endpoint attack chain above one more time, naming which Defender
workload would raise the alert at each step. Then explain, in one sentence, why reviewing that
as one Defender XDR incident is faster for a SOC analyst than reviewing it as four unrelated
alerts.
