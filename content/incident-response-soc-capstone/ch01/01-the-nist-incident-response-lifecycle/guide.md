# Lesson 1 — The NIST Incident Response Lifecycle

**Chapter 1 · The Incident Response Lifecycle · Lesson 1 of 4**

## What you'll learn

- The four phases of the NIST SP 800-61 incident response lifecycle, and what each one actually covers
- Why this lifecycle is drawn as a **cycle**, not a straight line, and what that shape is telling you
- Where everything you already learned about alert triage fits inside this bigger picture
- How Post-Incident Activity feeds directly back into Preparation, closing the loop

## Four phases, one real framework

Everything in the SOC Operations & SIEM Fundamentals course — alerts, triage, escalation, case notes
— happens inside a much larger structure. The U.S. National Institute of Standards and Technology
(NIST) documents that structure in **SP 800-61, the Computer Security Incident Handling Guide**, and
it's the framework real SOCs build their incident response programs around. It defines four phases:
**Preparation**, **Detection & Analysis**, **Containment, Eradication & Recovery**, and
**Post-Incident Activity**. This isn't an academic model nobody actually uses — it's the vocabulary
incident response plans, tabletop exercises, and job postings for IR analysts are written in. If you
can name these four phases and explain what belongs in each one, you can follow almost any real-world
incident response conversation.

**Preparation** is everything a team does before an incident ever happens: a written IR plan, a
trained team, the tools and access they'll need, already in place. **Detection & Analysis** is where
an alert gets formally confirmed as a real incident and its nature gets understood — this is the
triage process from the SOC Operations course, now operating at incident scale. **Containment,
Eradication & Recovery** is the active response: stop the attacker's access, remove what caused the
problem, and bring systems back to normal operation. **Post-Incident Activity** is the step teams
skip under deadline pressure and regret skipping: a lessons-learned review that asks what worked,
what didn't, and what needs to change.

## Why it's a cycle, not a line

A diagram that showed Preparation → Detection & Analysis → Containment/Eradication/Recovery →
Post-Incident Activity → *done* would be misleading, because it isn't done. The entire reason NIST
draws this as a loop with an arrow running from Post-Incident Activity back to Preparation is that
every real incident teaches a team something it didn't know before the incident started. Maybe the
IR plan didn't say who has the authority to take a production server offline at 2 a.m. Maybe a
critical log source turned out not to be feeding the SIEM. Maybe the team discovered, mid-incident,
that nobody had tested the backup restore process in over a year. Post-Incident Activity is where
those gaps get written down — and feeding them back into Preparation is what makes the *next*
incident go faster and cleaner than this one did. A team that treats Post-Incident Activity as
optional paperwork is a team that keeps relearning the same lessons during a live incident, which is
the worst possible time to learn them.

## A concrete walk through the loop

Picture a real sequence. **Preparation**: the SOC has a documented IR plan naming who to call, and
the team has already rehearsed isolating a compromised endpoint. **Detection & Analysis**: a SIEM
alert on unusual outbound traffic from a workstation gets triaged, validated against the raw logs,
and confirmed as a real compromise — not a false positive. **Containment, Eradication & Recovery**:
the team isolates the workstation from the network, removes the malware that caused the outbound
traffic, and restores the machine from a known-clean image. **Post-Incident Activity**: the team
reviews the timeline and realizes the alert sat in the queue for 40 minutes before anyone picked it
up — not because triage was slow, but because the on-call rotation wasn't clearly documented. That
finding goes back into **Preparation**, where the on-call rotation gets fixed before the next
incident, closing the loop.

## Key terms

| Term | Meaning |
|---|---|
| NIST SP 800-61 | The Computer Security Incident Handling Guide; the framework this four-phase lifecycle comes from |
| Preparation | The phase covering an IR plan, trained team, and ready tools/access, done before any incident |
| Detection & Analysis | The phase where an alert is formally confirmed as a real incident and its nature is understood |
| Containment, Eradication & Recovery | The phase that stops the attacker, removes the cause, and restores normal operation |
| Post-Incident Activity | The lessons-learned review that happens after an incident is resolved |

## Check yourself

Name the four NIST SP 800-61 phases in order, and explain in one sentence why Post-Incident Activity
pointing back to Preparation is what makes this a cycle instead of a one-time checklist.
