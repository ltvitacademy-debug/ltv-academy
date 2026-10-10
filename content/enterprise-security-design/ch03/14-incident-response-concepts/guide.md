# Lesson 14 — Incident Response Concepts

**Chapter 3 · Security Governance · Lesson 14 of 15**

## What you'll learn

- The standard incident response lifecycle, and why having it defined in advance matters more than having the "right" tool
- Which of this course's earlier Salesforce-specific tools map onto each phase of that lifecycle
- Why containment and eradication are different steps, not one step, and why that distinction changes what you do first
- How a security architecture review (Lesson 11) and a documented data flow diagram (Lesson 13) make incident response faster when an incident actually happens

## A lifecycle, defined before you need it

**Incident response (IR)** is the structured process an organization follows when a security incident is suspected or confirmed. The value of having it defined as a lifecycle, in advance, is that an incident is exactly the wrong moment to be inventing a process — people are stressed, information is incomplete, and decisions made in the first hour often matter more than decisions made in the first week. A commonly used framing (drawn from NIST's incident response guidance) breaks this into phases:

1. **Preparation** — everything done before an incident: having monitoring in place (Lesson 4, 8), having documentation and evidence ready to consult (Lesson 13), having a defined team and escalation path, and having already rehearsed roughly what to do.
2. **Detection and analysis** — recognizing that something unusual is happening and figuring out what it actually is, how it started, and how far it's spread.
3. **Containment** — stopping the incident from getting worse *right now*, even before you fully understand it — isolating what's affected without necessarily having fixed the underlying cause yet.
4. **Eradication** — removing the actual cause once it's understood: revoking the compromised credential for good, patching the vulnerable code, correcting the misconfiguration.
5. **Recovery** — restoring normal operation, verified to be clean, and resuming business as usual.
6. **Lessons learned** — a deliberate after-action review that feeds back into Chapter 2's review process (Lesson 11), so the same gap doesn't recur.

## Why containment and eradication are different steps

It's tempting to treat "stop the bad thing" as one action, but containment and eradication solve different problems and often happen on different timescales. **Containment** is about limiting ongoing damage immediately, often with an imperfect or temporary action — freezing a user's account, revoking an active session, disabling a Connected App — even before you know exactly why the credential was compromised. **Eradication** is the deeper fix — rotating every secret the compromised credential could have touched, patching the code path that let a `without sharing` class be called where it shouldn't have been, correcting the integration's OAuth scope. Doing containment well and skipping eradication means the incident can recur the moment the temporary containment measure is lifted; trying to fully understand root cause before containing anything means damage keeps accumulating while you investigate.

## Salesforce-specific tools mapped to the lifecycle

This course has already introduced the concrete tools; incident response is where they get used together, under pressure, rather than individually:

| Phase | Relevant tool(s) from this course |
|---|---|
| Preparation | Review board process (Lesson 11), data flow diagrams and retained evidence (Lesson 13), Transaction Security Policies configured in advance (Lesson 8) |
| Detection and analysis | Event Log Files/Objects, Real-Time Event Monitoring (Lesson 8), Setup Audit Trail and Field Audit Trail (Lesson 4) |
| Containment | Freeze user, end session, or force a step-up challenge via a Transaction Security Policy (Lesson 8); revoking a Connected App's OAuth tokens (Lesson 10) |
| Eradication | Rotating a Shield Platform Encryption tenant secret if key material itself is suspected compromised (Lesson 7); correcting a permission set or sharing rule that allowed over-broad access (Lessons 1–2) |
| Recovery | Re-verifying Health Check score and review checklist (Lesson 11) before declaring the org "clean" |
| Lessons learned | Feeding the incident's specific gap back into the review board's checklist (Lesson 11), so future architecture reviews specifically check for it |

## Why preparation work pays off specifically here

A data flow diagram (Lesson 13) that's accurate and current means detection and analysis starts with "here's exactly where this data could have gone" instead of discovering the integration landscape for the first time mid-incident. A review board's documented sign-off history (Lesson 11, Lesson 13) means the lessons-learned phase can check "was this specific risk flagged during review and accepted, or was it simply missed" — a materially different finding, and one that changes what the organization actually needs to fix.

## Key terms

| Term | Meaning |
|---|---|
| Incident response (IR) | The structured process followed when a security incident is suspected or confirmed |
| Containment | Immediately limiting ongoing damage, often with a temporary measure, before root cause is fully understood |
| Eradication | Removing the actual underlying cause, once understood |
| Lessons learned | A deliberate after-action review feeding findings back into the architecture review process |

## Lab

A Transaction Security Policy flags an unusual bulk data export from a user account at 2 a.m. local time, inconsistent with that user's normal pattern. Walk through what a reasonable containment action would be versus what eradication would require, assuming the investigation later confirms the account's credentials were phished three days earlier. Then describe one specific thing you'd add to the review board's checklist (Lesson 11) as a direct result of this incident's lessons-learned phase.

## Check yourself

Can you list the six IR lifecycle phases in order, from memory? Can you explain, with your own example, why containment and eradication are meaningfully different steps rather than one combined action?
