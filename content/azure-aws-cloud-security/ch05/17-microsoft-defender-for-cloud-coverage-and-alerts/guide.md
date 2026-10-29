# Lesson 17 — Microsoft Defender for Cloud: Coverage and Alerts

**Chapter 5 · Cloud-Native Security Tooling · Lesson 1 of 4**

## What you'll learn

- What Microsoft Defender for Cloud actually covers out of the box, and
  what only turns on once you pay for a Defender plan
- How Secure Score is calculated from weighted recommendations, and why
  chasing the number isn't the same as reducing real risk
- The difference between a **recommendation** (a posture finding) and a
  **security alert** (an active detection), and why they come from
  different parts of the product
- What Defender CSPM's attack-path analysis adds that a flat list of
  recommendations never could

## Two tiers: free posture management, paid threat detection

Microsoft Defender for Cloud actually ships as two distinct layers, and
conflating them is the single most common source of confusion for
people new to it. The **Foundational CSPM** tier is free and turns on
automatically for every Azure subscription — it continuously assesses
configuration against best practices, feeds the Secure Score, and
covers any AWS or GCP accounts you connect through Defender for Cloud's
multicloud connectors too. It never generates a security alert, because
it isn't watching runtime behavior at all — it's a point-in-time
configuration assessment.

Threat detection is a separate, paid layer: the **Defender plans**,
enabled per resource type — Defender for Servers, Defender for Storage,
Defender for Containers, Defender for SQL, Defender for Key Vault,
Defender for App Service, Defender for DNS, Defender for Resource
Manager, Defender for APIs, and the Defender CSPM add-on. Each plan
watches its specific resource type for suspicious behavior and raises
**security alerts** when it finds something. Enable Defender for
Storage and you start getting alerts for things like access from a
known malicious IP or unusual data-extraction patterns against a
storage account; leave it off and that storage account only ever
produces configuration recommendations, never a behavioral alert.

## Secure Score: a prioritization tool, not a guarantee

Secure Score rolls every active recommendation up into one percentage,
but the arithmetic matters more than the final number. Recommendations
are grouped into security controls (e.g., "Enable MFA," "Remediate
vulnerabilities," "Encrypt data at rest"), and each control contributes
a score impact based on its severity and how many resources it affects.
That means two very different recommendations can carry the same
score weight, and a high-severity finding touching only a handful of
resources can move the score less than a lower-severity one touching
hundreds.

The practical consequence: don't triage by raw recommendation count or
chase 100% blindly. Sort by **potential score increase**, but cross-check
it against actual risk — a recommendation with a small score impact can
still represent your single most exploitable exposure if it sits on an
internet-facing, privileged resource.

## Recommendations vs. alerts vs. incidents

A **recommendation** is a static statement that a resource's current
configuration doesn't meet a best practice — "Management ports should
be closed on virtual machines," "Storage accounts should restrict
network access." It doesn't mean anything happened; it means something
could.

A **security alert** means a Defender plan observed a specific
suspicious event or behavior on a resource it's actively monitoring —
"Suspicious process executed," "Unusual Azure Resource Manager
operation," "Login from a Tor exit node." Alerts only exist where a
Defender plan is enabled; a resource type with no Defender plan turned
on can carry plenty of open recommendations and still never raise an
alert.

When Defender for Cloud can tie related alerts together — the same
actor, the same resource, a plausible attack sequence — it groups them
into an **incident**, so you triage one connected story instead of five
disconnected alert tiles. Each alert also carries a severity
(High/Medium/Low/Informational) and a MITRE ATT&CK tactic tag (Initial
Access, Persistence, Lateral Movement, and so on), which tells you
where in a typical attack chain that single event sits.

## Attack paths: what Defender CSPM adds on top

The paid **Defender CSPM** plan builds a cloud security graph — a model
of your resources and how they relate (network exposure, identity
assignments, data sensitivity) — and derives **attack paths** from it:
chains like "internet-exposed VM → has an unpatched vulnerability → has
a system-assigned managed identity → that identity holds Owner on the
subscription." That chain is far more actionable than its three
individual recommendations taken separately, because it tells you which
specific combination an attacker could actually walk, not just that
three unrelated things are each slightly wrong.

## A practical rollout order

1. Connect the subscription (and any AWS/GCP accounts) to Defender for
   Cloud.
2. Enable Defender plans only for the resource types you actually run
   in production — enabling everything by default has a real cost
   impact.
3. Triage the Secure Score dashboard by score impact and exposure, not
   recommendation count.
4. Review the Security alerts blade regularly, reading grouped
   incidents before individual alerts.
5. Forward alerts to Microsoft Sentinel or Microsoft Defender XDR if
   either is in your environment, so cloud alerts correlate with
   endpoint and identity signal instead of living in isolation.

## Key terms

| Term | Meaning |
|---|---|
| Foundational CSPM | Free, always-on posture assessment that produces recommendations and the Secure Score; generates no security alerts |
| Defender plan | A paid, per-resource-type add-on (Servers, Storage, Containers, SQL, etc.) that adds active threat detection and security alerts |
| Secure Score | A weighted percentage across security controls, driven by recommendation severity and affected resource count — a prioritization signal, not a risk guarantee |
| Security alert | A specific detected suspicious event on a resource covered by an active Defender plan, carrying severity and a MITRE ATT&CK tactic tag |
| Attack path | A Defender CSPM finding that chains multiple individually-weak conditions (exposure, vulnerability, identity privilege) into one exploitable sequence |

## Check yourself

You're ready for Lesson 18 when you can explain, without looking: why
can a subscription have dozens of open recommendations but zero
security alerts, and what specifically has to be true for that same
subscription to start producing alerts?
