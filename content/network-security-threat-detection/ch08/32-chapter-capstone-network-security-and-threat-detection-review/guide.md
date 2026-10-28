# Lesson 32 — Chapter Capstone: Network Security & Threat Detection Review

**Chapter 8 · Capstone: Building a Layered Threat Detection Program · Lesson 32 of 32**

## What you'll learn

- How prevention, detection, and response fit together as one layered program, not seven
  disconnected topics
- A chapter-by-chapter recap of everything this course covered, tied back to the three labs and
  case study this chapter just walked through
- Why no single layer in the program — not the firewall, not the IDS, not the honeypot — is
  ever meant to catch everything on its own
- What comes next in this career path, now that this course is complete

## A layered program, not seven separate tools

Every chapter in this course is a layer in the same program, and this capstone is where they
stop being separate topics and start being one system. **Prevention** (Chapters 1 and 6) keeps
as much bad traffic and as many known weaknesses out as possible before anything has to detect a
thing. **Detection** (Chapters 2, 3, 5, and 7) is what catches what prevention didn't — signatures,
anomalies, intelligence, and deception, each catching a different shape of attacker behavior.
**Response** (Chapter 4) is what happens once something's actually caught: telemetry, process
trees, and the isolation that stops it from going further. Lesson 29's DMZ design, Lesson 30's
detection rules, and Lesson 31's exfiltration case study are what this looks like applied to one
real company, end to end.

## The course, chapter by chapter

- **Chapter 1 — Firewall Architecture & Network Segmentation.** Stateful vs. stateless
  firewalls, NGFWs and deep packet inspection, DMZ design, and VLAN segmentation — the
  prevention layer Lesson 29's lab put directly into practice.
- **Chapter 2 — Intrusion Detection & Prevention Systems.** IDS vs. IPS, signature-based vs.
  anomaly-based detection, and Suricata rule syntax — exactly what Lesson 30's lab wrote two
  working rules against.
- **Chapter 3 — Network Traffic Analysis.** NetFlow, flow-based monitoring, baselining normal
  traffic, and spotting exfiltration patterns — Signal 1 in Lesson 31's case study.
- **Chapter 4 — Endpoint Detection Deep Dive.** EDR telemetry, process trees, living-off-the-land
  detection, and isolation/containment — Signal 3 and the response in Lesson 31.
- **Chapter 5 — Threat Intelligence & Indicators of Compromise.** IOCs, threat intel feeds,
  STIX/TAXII, and OSINT — Signal 2 in Lesson 31's case study.
- **Chapter 6 — Vulnerability Assessment & Scanning.** Vulnerability scanners, authenticated vs.
  unauthenticated scans, reading a scan report, and the vulnerability management lifecycle — the
  other half of the prevention layer alongside Chapter 1.
- **Chapter 7 — Honeypots & Deception Technology.** Low- vs. high-interaction honeypots and
  deception technology — detection that works precisely because no legitimate user ever has a
  reason to touch a honeypot, making its alerts unusually high-fidelity.
- **Chapter 8 — Capstone.** A segmentation lab, a detection-rule lab, a real exfiltration case
  study, and this review — all seven chapters, applied together.

## No single layer catches everything

The exfiltration in Lesson 31 is the clearest proof of why this is a layered program at all:
the firewall rules from Chapter 1 didn't stop it, because the traffic looked like ordinary
outbound HTTPS. It took a flow baseline from Chapter 3, a threat intel match from Chapter 5, and
EDR telemetry from Chapter 4 together to catch what any one layer alone would have missed. A
honeypot from Chapter 7 or a vulnerability scan from Chapter 6 might have caught a different
attacker on a different day, using a different technique entirely — that's the point of building
several layers instead of trusting one.

## Key terms

| Term | Meaning |
|---|---|
| Prevention layer | Controls that keep known-bad traffic and known weaknesses out before detection has to catch anything |
| Detection layer | Signature, anomaly, intelligence, and deception-based controls that catch what prevention missed |
| Response layer | Telemetry, investigation, and containment actions taken once something is caught |
| Defense in depth | The principle that no single security layer is relied on to catch every attack |

## Check yourself

Of the eight chapters in this course, which single layer do you think would have been hardest
to replace in Lesson 31's exfiltration case — and what would the SOC have missed if that one
chapter's techniques simply didn't exist?

## Course complete

That's the full course. You've gone from a single stateful firewall rule to a layered program
that segments a network, writes its own detection rules, reads its own traffic baselines, acts on
threat intelligence, and responds to what its endpoints catch — the full toolkit a SOC analyst
applies every single day. Next up in this path: **SOC Operations, SIEM & Log Analysis**.
