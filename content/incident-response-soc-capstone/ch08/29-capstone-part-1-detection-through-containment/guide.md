# Lesson 29 — Capstone Part 1: Detection Through Containment

**Chapter 8 · Job-Ready Capstone: Full Incident Response Exercise · Lesson 29 of 32**

## What you'll learn

- How a Sentinel analytics rule, entity mapping, and the investigation graph turn one alert into
  a scoped, confirmed incident — not a ticket you close on a first glance
- How to separate a real incident from a false positive using the same checks a working SOC
  actually runs, not guesswork
- Why scoping an incident often turns up a second compromised asset the original alert never
  named
- How to execute short-term containment — isolating a host and disabling an account — without
  destroying the evidence Lesson 30 will need

## 2:47 PM Friday — the alert fires

Alderbrook Wealth Partners is a 140-person registered investment advisor running Microsoft
Sentinel as its SIEM, Microsoft Defender for Endpoint on every laptop, and Microsoft Entra ID for
identity. At 2:47 PM, the impossible-travel analytics rule built in the Sentinel, Defender XDR &
KQL course fires: the self-join across `SigninLogs` catches the same account signing in
successfully from the Atlanta office, then again nine minutes later from an IP address
geolocated to Eastern Europe — far outside any travel time that gap allows. Entity mapping tags
`UserPrincipalName` as the Account entity: **tmarsh@alderbrookwealth.com**, Teresa Marsh, a
senior relationship manager who manages several of the firm's largest client accounts.

## 2:51 PM — triage, not panic

A fired rule is not yet a confirmed incident. The on-call analyst works the same checklist this
course's Chapter 3 laid out: check for a VPN exit node that would explain the foreign IP (none
registered for this tenant), check whether the user is a known traveler (Teresa's calendar and
manager both confirm she is at her desk in Atlanta, not abroad), and check the second sign-in's
other attributes — a device never seen on this account before, no multi-factor prompt satisfied
because MFA push fatigue let an approval through on autopilot. Every check moves this from
"noisy rule" toward "real incident," and a two-minute phone call to Teresa — who confirms she
approved an MFA prompt she didn't request, thinking it was a glitch — closes the question.

## 3:05 PM — the graph finds a second asset

Opening the incident's investigation graph shows more than the one flagged sign-in. The Account
entity links to a Host entity — **WKSTN-FIN-14**, Teresa's own Entra-joined laptop — through a
Defender for Endpoint alert raised nine minutes after the foreign sign-in: a PowerShell process
spawned from Outlook, downloading a remote-access tool to a temp folder. The original analytics
rule never mentioned this host; it only fired on sign-in geography. Scoping the incident through
the graph, not just reading the one alert that opened it, is what surfaces this second compromise.
Without this step the team would disable one account and miss an active foothold on a device.

## 3:20 PM — short-term containment, evidence-safe

With two confirmed entities, containment runs on both, in an order that protects evidence first.
Before touching WKSTN-FIN-14, the analyst triggers a memory and disk triage capture through
Defender for Endpoint's live response — volatile data like running processes and network
connections would otherwise be lost the moment the machine is touched. Only after that capture
completes does the team isolate the device (Defender's "Isolate device" action, which keeps
Defender connectivity alive for further live response) and disable Teresa's account in Entra ID,
revoking its active sign-in sessions and refresh tokens so the stolen credential stops working
immediately. The incident is now contained — not resolved. Eradication, recovery, and the written
report are Lesson 30's work.

## Key terms

| Term | Meaning |
|---|---|
| Entity mapping | The mechanism that ties an alert's raw fields to a structured Account or Host entity |
| Investigation graph | The visual map of every entity and alert connected to an incident, used here to find the second host |
| Evidence-safe containment | Capturing volatile evidence before an isolation or disable action that would destroy it |
| Short-term containment | An immediate action (isolate, disable) that stops the bleeding without yet removing root cause |

## Check yourself

If the analyst had skipped straight to disabling Teresa's account the moment the analytics rule
fired, without ever opening the investigation graph, what specifically would the SOC have missed —
and what would still have been active on the network?
