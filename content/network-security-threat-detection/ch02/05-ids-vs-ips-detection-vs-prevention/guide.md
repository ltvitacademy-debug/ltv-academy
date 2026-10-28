# Lesson 5 — IDS vs. IPS: Detection vs. Prevention

**Chapter 2 · Intrusion Detection & Prevention Systems · Lesson 5 of 32**

## What you'll learn

- What an Intrusion Detection System (IDS) watches, and why it can only alert — never block
- What an Intrusion Prevention System (IPS) does differently by sitting inline with live traffic
- The real tradeoff a SOC weighs when deciding whether a sensor should run in IDS mode or IPS mode
- Why many teams run a brand-new detection rule in IDS mode before ever trusting it to block in IPS mode

## IDS: a copy of the traffic, after the fact

An **Intrusion Detection System (IDS)** is a passive sensor. It doesn't sit in the direct path between two network segments — instead, a switch is configured to send it a **copy** of the traffic crossing a link, typically through a **SPAN port** (Switched Port Analyzer, Cisco's term) or a dedicated network **tap**, also called a mirror port. The IDS inspects that copy against its detection logic and, when something matches, it **raises an alert**. That's the entire extent of what an IDS can do on its own: it tells a human (or a downstream system like a SIEM) that something happened. It has no ability to stop the traffic it just flagged, because by the time it sees the copy, the original packet has already been delivered to its destination.

## IPS: the same logic, standing in the road

An **Intrusion Prevention System (IPS)** runs much of that same detection logic, but it's deployed **inline** — physically or logically placed directly in the path the traffic must travel through, the way a firewall is. Every packet passes through the IPS before it's allowed to continue. When the IPS matches something malicious, it can **drop the packet, reset the connection, or block the source** in real time, before the traffic ever reaches its target.

## The real tradeoff

That inline position is also the IPS's biggest liability. Because it sits directly in the traffic's path, a **false positive isn't just a noisy alert — it's a real outage**. If an IPS rule misfires on legitimate traffic (a vendor's unusual-but-valid API call, for instance), it blocks that traffic outright, and a business process goes down until someone finds and fixes the rule. An IDS can never cause that kind of outage, because it never touches the live packet — but that safety comes at a cost: an IDS **cannot stop an attack already in progress**. By the time its alert fires, the malicious traffic has already reached its destination; everything after that is incident response, not prevention.

## Why teams often start in IDS mode

Because of that tradeoff, it's common for a SOC to deploy a brand-new sensor or a newly written detection rule in **IDS mode first** — watching and alerting only, with no blocking enabled — while they tune it against real traffic and confirm its false-positive rate is low. Only once a rule has proven itself reliable in that passive mode does the team flip it to **IPS mode (sometimes called blocking mode)** and let it actually act on traffic. Many platforms, including Snort and Suricata (covered in Lesson 7), can run in either mode from the same rule set — the deployment mode, not the detection logic, is what decides whether a match results in an alert or a block.

## Key terms

| Term | Meaning |
|---|---|
| IDS (Intrusion Detection System) | A passive sensor that inspects a copy of traffic and raises alerts; cannot block traffic |
| IPS (Intrusion Prevention System) | An inline sensor that sits directly in the traffic path and can block matching traffic in real time |
| SPAN port / mirror port | A switch port configured to send a copy of traffic to a monitoring device like an IDS |
| False positive | A detection match on traffic that was actually legitimate |

## Check yourself

A SOC analyst wants to add a brand-new detection rule for a pattern they just read about in a threat report. Why would they typically deploy that rule in IDS mode before ever enabling it in IPS mode?
