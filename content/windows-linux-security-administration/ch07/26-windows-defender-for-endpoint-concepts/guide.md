# Lesson 26 — Windows Defender for Endpoint Concepts

**Chapter 7 · Endpoint Protection & Monitoring · Lesson 26 of 32**

## What you'll learn

- What "onboarding" a device into Microsoft Defender for Endpoint actually does, and the common ways admins do it at scale
- How Defender Antivirus (the local signal) relates to Defender for Endpoint (the cloud EDR platform built on top of it)
- Why Defender for Endpoint correlates many alerts into a single incident instead of showing them one at a time
- What automated investigation and remediation (AIR) does, and where a human analyst still has to step in

## Device onboarding: how a machine starts reporting

Microsoft Defender for Endpoint (MDE) is Microsoft's commercial EDR platform, built on
the exact ideas from Lesson 25: continuous telemetry, behavioral detection, and the
ability to respond. Before any of that applies to a given machine, though, the device has
to be **onboarded** — registered with the Defender tenant so its sensor starts reporting.

Modern versions of Windows ship with that sensor built in; it just needs to be configured
and pointed at a tenant. At any real scale, admins do that through **Group Policy**,
**Microsoft Intune**, or **Microsoft Configuration Manager**, pushing the onboarding
configuration to hundreds or thousands of machines at once, rather than touching each
device individually. Non-Windows endpoints — including the Linux agent covered in the
next lesson — onboard the same way conceptually: install the sensor, register it with the
tenant, and it starts streaming telemetry.

## Defender Antivirus as one signal inside a larger platform

It helps to be precise about what's actually running on the box. **Microsoft Defender
Antivirus** is the signature- and heuristic-based antivirus engine built into Windows —
the same category of tool described in Lesson 25. You can check its status directly with
real PowerShell cmdlets:

```
Get-MpComputerStatus
Get-MpThreatDetection
Get-MpPreference
```

`Get-MpComputerStatus` reports whether real-time protection is running and whether
signatures are current. `Get-MpThreatDetection` lists what's actually been found on that
machine. `Get-MpPreference` shows the configured scan and exclusion settings. Defender for
Endpoint doesn't replace this engine — it layers behavioral EDR telemetry on top of it, so
the same onboarded device benefits from both signature-based scanning and behavioral
monitoring at once, exactly the combined model Lesson 25 described.

## From alerts to incidents

Once a device is onboarded and reporting, Defender for Endpoint raises an **alert**
whenever something on that device looks suspicious. A real intrusion almost never produces
just one alert. An attacker moving through a network triggers suspicious process behavior
on one machine, then a lateral login attempt on another, then an unusual outbound
connection from a third — each of those could raise its own separate alert.

Defender for Endpoint automatically **correlates related alerts into a single incident**,
grouping everything that looks like it belongs to the same attack campaign — whether it
touched one device or fifty — into one view. That matters operationally: an analyst
reviewing one incident with a clear timeline across five related alerts can act far faster
than one scrolling through fifty disconnected, unrelated-looking tickets.

## Automated investigation and remediation

**Automated investigation and remediation (AIR)** takes that correlation a step further.
For many supported alert types, Defender for Endpoint doesn't just wait for an analyst —
it automatically investigates, examining the file, the process tree, and related
artifacts, and reaches a verdict: malicious, suspicious, or benign. For high-confidence
malicious verdicts, it can remediate automatically, for example quarantining a file or
terminating a process, without waiting for a human to approve each step. Lower-confidence
verdicts get queued for an analyst to review rather than acted on automatically, so the
system leans toward human judgment whenever its own confidence is in doubt.

## Why this matters at scale

Together, onboarding at scale, alert-to-incident correlation, and automated remediation
are what let a comparatively small SOC team realistically cover a large fleet of
endpoints. Without correlation and automation, the sheer volume of individual alerts a
few thousand monitored machines generate would overwhelm any human team long before a real
attack got the attention it needed.

## Key terms

| Term | Meaning |
|---|---|
| Onboarding | Registering a device with the Defender for Endpoint tenant so its sensor starts reporting telemetry |
| Microsoft Defender Antivirus | The signature/heuristic-based local antivirus engine — one signal feeding the larger platform |
| Alert | A single flagged suspicious event on an onboarded device |
| Incident | A correlated group of related alerts, often across multiple devices, representing one attack story |
| Automated investigation and remediation (AIR) | Defender for Endpoint's automatic investigation of an alert, reaching a verdict and, for high-confidence cases, remediating without analyst action |

## Check yourself

Why does grouping alerts into a single incident matter more as the number of monitored
endpoints grows, rather than being a minor convenience?
