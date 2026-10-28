# Lesson 1 — What Microsoft Sentinel Actually Is

**Chapter 1 · Microsoft Sentinel Architecture · Lesson 1 of 32**

## What you'll learn

- What Microsoft Sentinel actually is, precisely, beyond "a SIEM you've heard of"
- Why being cloud-native changes the economics of running a SIEM, not just where it happens to run
- How Sentinel combines SIEM and SOAR in a single product, instead of needing two
- Where Sentinel sits today inside Microsoft's unified security operations experience

## From "a SIEM" to "this specific SIEM"

The previous course in this path named Microsoft Sentinel as one of several major SIEM
platforms in the industry, alongside Splunk, QRadar, and the Elastic Stack, and deliberately
stayed vendor-neutral. This course stops staying neutral. Microsoft Sentinel is a cloud-native
**SIEM (Security Information and Event Management)** and **SOAR (Security Orchestration,
Automation, and Response)** solution, built directly on Microsoft Azure. Everything from here
through the end of this path assumes you're working inside Sentinel specifically, so the rest
of this lesson is about what makes it a distinct product, not a repeat of what a SIEM does in
general.

## Cloud-native: a different cost and operations model

"Cloud-native" isn't a marketing label here — it describes a real architectural difference from
a traditional on-premises SIEM. An on-prem SIEM requires an organization to size and buy
physical (or virtualized) hardware up front, to guess at peak log volume months or years in
advance, and to patch, scale, and maintain that infrastructure themselves as volume grows.
Sentinel has none of that. There's no server to provision and no hardware to maintain — Sentinel
runs entirely on Azure's infrastructure, and an organization pays based on how much log data it
actually ingests and retains, not based on hardware it had to buy to handle a worst-case load.
That elasticity is the real-world payoff: a security team can turn on a new data source today
and scale to handle the extra volume automatically, without a procurement cycle.

## One product that both detects and responds

A traditional SIEM's core job is detection: collecting logs, correlating them, and surfacing
alerts for a human to act on. Sentinel does that too, but it also natively includes **SOAR**
capability — automated response actions, called playbooks, that can run the moment an alert
fires. A playbook might automatically disable a compromised user account, open a ticket, or
notify a Teams channel, with no analyst having to do it by hand. Bundling detection and
automated response into a single product, rather than bolting a separate SOAR tool onto a
SIEM afterward, is one of the things that distinguishes Sentinel's design from a lot of the
industry's older SIEM architecture.

## Where Sentinel sits today: unified with Defender XDR

Microsoft has increasingly unified Sentinel with Microsoft Defender XDR inside a single
console — the Microsoft Defender portal — rather than keeping them as two separate places an
analyst has to switch between. That unification is exactly why this course's title pairs
Sentinel with Defender XDR: Chapter 5 goes deep on what Defender XDR unifies, but from here on,
assume Sentinel's incidents, Defender signals, and KQL-based hunting increasingly live in one
connected experience, not two disconnected tools.

## Key terms

| Term | Meaning |
|---|---|
| Microsoft Sentinel | Microsoft's cloud-native SIEM + SOAR solution, built on Azure |
| SIEM | Security Information and Event Management — collects, correlates, and alerts on security data |
| SOAR | Security Orchestration, Automation, and Response — automates response actions, e.g. via playbooks |
| Cloud-native | Runs entirely on cloud infrastructure; no hardware to provision, pay for what's ingested/retained |
| Microsoft Defender portal | The unified console where Sentinel and Defender XDR increasingly live together |

## Check yourself

Without naming a specific feature, explain in your own words why "cloud-native" is an
economic and operational difference from an on-prem SIEM, not just a difference in where the
software happens to run.
