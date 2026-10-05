# Lesson 27 — Breach Response Concepts

**Chapter 5 · Lifecycle and Compliance · Lesson 27 of 30**

## What you'll learn

- The breach response lifecycle: detect, contain, assess, notify, remediate
- Who typically needs to be in the room once a breach is confirmed
- The concept behind GDPR's 72-hour notification expectation
- Why the audit trail from Lesson 26 is what makes assessment possible at all

## The lifecycle

A **data breach** is an incident where protected data is accessed, disclosed, altered, or destroyed without authorization. Organizations that handle breaches well — meaning faster containment and clearer communication, not zero breaches, since zero isn't realistic — follow roughly the same lifecycle:

1. **Detect** — something triggers the alarm: a monitoring alert, an unusual access pattern in the audit log, a report from an employee or outside researcher
2. **Contain** — stop the ongoing exposure first, before fully understanding it: revoke a compromised credential, isolate an affected system, close the specific access path being abused
3. **Assess** — determine what data was actually involved, how many individuals are affected, and how serious the likely impact is — this step depends entirely on having the audit trail and classification labels from earlier chapters already in place
4. **Notify** — inform the parties who need to know, on the timeline that applies, covered in detail below
5. **Remediate and review** — fix the underlying cause, not just the symptom, and document what the incident revealed about gaps in classification, access control, or monitoring

Containment deliberately comes before full assessment. Waiting until you know everything before acting lets the exposure continue; the lifecycle accepts an imperfect early picture in exchange for stopping the bleeding immediately.

## Who's in the room

A real breach response pulls in roles that rarely work together day to day: **security** (technical investigation and containment), **legal** (notification obligations and liability), a **privacy officer or DPO** (regulatory and data-subject-facing requirements), **communications** (what gets said publicly and to affected individuals), and **leadership** (decisions that carry business risk beyond any one team's authority). Most organizations that handle this badly haven't rehearsed it — the incident response plan that was never tested gets discovered to be incomplete in the middle of an actual incident, which is the worst possible time to find out.

## Notification — the GDPR concept

GDPR's breach notification framework (Articles 33–34) sets out two separate obligations, and the specific 72-hour figure is well known enough to cite directly: a controller must notify the relevant **supervisory authority** "without undue delay and, where feasible, not later than 72 hours" after becoming aware of a breach — unless the breach is unlikely to result in a risk to individuals. Separately, if the breach is likely to result in a **high risk** to individuals, the controller must also notify the **affected individuals themselves**, without undue delay. Not every breach triggers both notifications — the "likely risk" and "high risk" thresholds are deliberately different bars, and this lesson stops at that concept-level description rather than attempting to classify any specific scenario for you.

## Why assessment depends on earlier chapters

The assess step is often the bottleneck, and it's a direct payoff of everything from Chapters 2–5 of this course: classification labels (Chapter 2) tell you how sensitive the exposed data actually was; access logs (Lesson 26) tell you who touched it and when; and a documented retention schedule (Lesson 23) tells you whether the exposed data should have even still existed. An organization with none of that groundwork can't answer "how bad is this" quickly — it has to reconstruct the answer from scratch during the worst possible week to be doing so.

## Key terms

| Term | Meaning |
|---|---|
| Data breach | Unauthorized access, disclosure, alteration, or destruction of protected data |
| Containment | Stopping an ongoing exposure before the incident is fully understood |
| Supervisory authority | The regulatory body a controller must notify of a qualifying breach |
| High risk (notification trigger) | The threshold at which affected individuals, not just the regulator, must be notified |

## Lab

Sketch a one-page breach response outline for a hypothetical small organization: who would be the first person notified internally, which five roles from this lesson would need to be looped in and in what order, and what your rough containment step would be for a stolen employee laptop containing a cached customer export.

## Check yourself

Can you list the five stages of the breach response lifecycle in order, and explain why containment comes before full assessment rather than after it?
