# Lesson 18 — Defender for Endpoint Concepts, Revisited in XDR Context

**Chapter 5 · Microsoft Defender XDR · Lesson 18 of 32**

## What you'll learn

- Why Defender for Endpoint's onboarding, alerts, and AIR concepts don't change under Defender XDR — only where that telemetry ends up
- How endpoint alerts now become part of a broader, cross-product Defender XDR incident instead of standing alone
- What the real Sentinel data connector for Defender XDR actually brings into a Log Analytics workspace
- Why bringing that data into Sentinel matters even though Defender XDR already has its own unified portal

## Same concepts, a bigger picture

An earlier lesson in this path covered Defender for Endpoint on its own terms: onboarding a
device so its sensor starts reporting, Defender Antivirus as one local signal among several,
alert-to-incident correlation, and automated investigation and remediation (AIR). None of that
changes here — a device still has to be onboarded before it reports anything, and AIR still
reaches the same verdicts the same way.

What changes is where that telemetry goes next. Under Defender XDR, an endpoint alert isn't
just evaluated against other endpoint alerts anymore. It's evaluated against alerts from
Defender for Office 365, Defender for Identity, and Defender for Cloud Apps too, because all
four feed the same unified incident engine from Lesson 17. An endpoint alert that looked minor
on its own can turn out to be step three of a four-step incident that started with a phishing
email.

## The real Sentinel connector

Microsoft Sentinel doesn't have to treat Defender XDR as a separate silo, either. Sentinel has
a real data connector for Defender XDR (historically listed under its earlier name, Microsoft
365 Defender) that brings two things into a Sentinel workspace:

- **The already-correlated incidents** Defender XDR produced, so they show up in Sentinel's
  incident queue alongside everything else Sentinel is watching
- **The underlying raw event tables** that Defender XDR's own Advanced Hunting feature already
  queries — tables like `DeviceProcessEvents`, `DeviceNetworkEvents`, `DeviceLogonEvents`,
  `AlertInfo`, and `AlertEvidence`

## Why pull it into Sentinel at all

Defender XDR's own portal already shows unified incidents across its four workloads. The reason
to also connect it to Sentinel is scope: Sentinel can see data Defender XDR never will — a
firewall's logs, a VPN concentrator's logs, a non-Microsoft SaaS platform's audit log. Once the
Defender XDR connector is enabled, a Sentinel analyst can write one KQL query that joins
`DeviceLogonEvents` (an endpoint sign-in, from Defender XDR) against a VPN log table (from an
entirely different connector) to confirm whether a suspicious endpoint login lines up with a
legitimate remote-access session or looks like it came from somewhere else entirely. That kind
of cross-source correlation is something neither product can do alone.

## Key terms

| Term | Meaning |
|---|---|
| Onboarding (recap) | Registering a device with the Defender tenant so its sensor starts reporting — unchanged under XDR |
| AIR (recap) | Automated investigation and remediation — Defender for Endpoint's automatic verdict-and-response process, unchanged under XDR |
| Defender XDR data connector (Sentinel) | The Sentinel connector that ingests Defender XDR's correlated incidents and raw event tables into a Log Analytics workspace |
| Advanced Hunting schema tables | Real table names such as `DeviceProcessEvents`, `DeviceNetworkEvents`, `DeviceLogonEvents`, `AlertInfo`, `AlertEvidence` shared between Defender XDR's own hunting feature and Sentinel |

## Check yourself

An endpoint alert that looked low-priority on its own turns out to be connected to a phishing
email and an unusual SaaS sign-in. Explain, using what you learned here and in Lesson 17, why
that connection is something Defender for Endpoint by itself could never have shown you — and
what a Sentinel analyst gains by also having that data available via the connector.
