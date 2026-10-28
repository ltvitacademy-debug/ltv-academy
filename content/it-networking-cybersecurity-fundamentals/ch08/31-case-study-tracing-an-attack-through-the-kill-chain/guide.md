# Lesson 31 — Case Study: Tracing an Attack Through the Kill Chain

**Chapter 8 · Putting It Together: Lab & Capstone · Lesson 31 of 32**

## What you'll learn

- How to walk a realistic attack through every stage of the Cyber Kill Chain from Lesson 16
- A real defensive control, drawn from Chapters 5 through 7, that could have detected or stopped each stage
- Why stopping an attack early is dramatically cheaper than stopping it late
- How to read an incident the way a SOC analyst does: stage by stage, not as one single event

## The scenario

Fairmont Logistics is a mid-sized shipping company. Over one week, an attacker takes them from a
simple internet scan all the way to stealing customer data — and at every single stage, a real,
specific control from this course could have caught it. Walking through all six stages at once,
with the matching defense named at each one, is the whole point of this lesson: an attack isn't
one event, it's a chain, and breaking any single link in it stops the rest from happening.

## Stage 1 — Reconnaissance

The attacker runs an automated internet-wide scan looking for companies with specific
internet-facing services exposed, the same kind of scan Lesson 30 showed you how to recognize in a
packet capture: one source hammering many ports in rapid succession. Fairmont's public IP range
gets caught in the sweep, and the attacker notes which ports respond.

**Defense that could have caught it:** Lesson 25's defense-in-depth model calls for a properly
tuned firewall and intrusion detection system (IDS) logging and alerting on scan patterns like
this, and Lesson 26's security policy should require exposing only the ports a business genuinely
needs — fewer open ports means less for a scan to even find.

## Stage 2 — Weaponization & Delivery

The attacker crafts a phishing email, disguised as an invoice from a known vendor, with a
malicious Word document attached — the social engineering pattern from Lesson 22. It's sent to a
Fairmont accounts-payable employee.

**Defense that could have caught it:** email filtering and attachment sandboxing stop a large
share of these before they ever reach an inbox, and Lesson 26's security-awareness training and
acceptable-use policy are what give an employee the instinct to question an unexpected invoice
attachment rather than open it.

## Stage 3 — Exploitation

The employee opens the attachment and enables macros when prompted. The macro runs a short script
that downloads and executes malicious code — the moment the attack actually succeeds.

**Defense that could have caught it:** disabling macros by default in Office documents from
outside the organization, combined with least-privilege access from Lesson 18's authorization
models (RBAC) — if that employee's account only has the access their role actually needs, the
macro's damage is contained even after it runs.

## Stage 4 — Installation

The malicious code installs a backdoor that persists even after a reboot, giving the attacker a
way back in whenever they choose — the kind of persistence mechanism Lesson 21 covered under
malware types.

**Defense that could have caught it:** endpoint detection and response (EDR) or antivirus software
watching for exactly this behavior — a new, unrecognized process establishing persistence — plus
routine monitoring that would flag an unexpected new startup entry.

## Stage 5 — Command & Control (C2)

The backdoor beacons out at a steady interval to a server the attacker controls, waiting for
instructions — the kind of regular, unfamiliar outbound pattern Lesson 30 taught you to notice in
a capture.

**Defense that could have caught it:** egress filtering and network monitoring as part of
defense-in-depth — a firewall rule blocking outbound traffic to known-bad destinations, or an
analyst noticing a workstation quietly talking to an unfamiliar IP on a fixed schedule.

## Stage 6 — Actions on Objectives

With C2 established, the attacker pulls customer records — names, addresses, payment details —
off Fairmont's file server and exfiltrates them out through the same C2 channel.

**Defense that could have caught it:** encrypting sensitive data at rest and in transit (Lessons
19 and 20) means stolen files are useless without the key, and Lesson 27's compliance frameworks
(NIST, ISO 27001) require the incident response and breach-notification process that determines
what Fairmont must do, and tell affected customers, once this is discovered.

## Why this matters: stopping it early is cheaper

Every stage that gets through makes the next one easier and the eventual cost higher. Blocking the
reconnaissance scan costs nothing but a sound firewall rule. Cleaning up after stage 6 means
forensic investigation, legal exposure, regulatory notification, and reputational damage. The kill
chain isn't just a way to describe an attack after it happens — it's a map of every point where a
defender had a chance to break the chain before it reached the end.

## Key terms

| Term | Meaning |
|---|---|
| Cyber Kill Chain | The staged sequence an attack typically follows, from reconnaissance to actions on objectives |
| Egress filtering | Firewall rules restricting outbound traffic, used to catch or block C2 beaconing |
| Least privilege | Giving an account only the access its role needs, limiting damage if that account is compromised |
| Breach notification | The legally required process of informing affected parties and regulators after a confirmed breach |

## Check yourself

At which single stage of this attack would blocking it have been both the cheapest and the most
effective — and why does stopping an attack later in the chain get progressively more expensive?
