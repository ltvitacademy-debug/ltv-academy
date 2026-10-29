# Lesson 3 — Detection and Analysis: Confirming a Real Incident

**Chapter 1 · The Incident Response Lifecycle · Lesson 3 of 4**

## What you'll learn

- Why an alert is not automatically an incident, and what formally closes that gap
- How Detection & Analysis builds directly on the triage process already taught in SOC Operations & SIEM Fundamentals, now at incident scale
- What "understanding the nature" of a confirmed incident means in practice
- Why getting this phase wrong — in either direction — has real downstream costs

## An alert is a claim, not a fact

SOC Operations & SIEM Fundamentals already covered the triage loop — fire, review, classify, act —
and the three possible triage outcomes: true positive, false positive, and benign true positive.
Detection & Analysis, the second phase of the NIST SP 800-61 lifecycle, is that same discipline
applied at a different scale. An alert firing is a claim that something bad might be happening. It
is not, by itself, proof. The whole purpose of Detection & Analysis is to take that claim and either
confirm it as a real incident or rule it out — and when it is confirmed, to understand what kind of
incident it actually is before moving into the response phases that follow.

## From "suspicious" to "confirmed"

The difference between ordinary alert triage and Detection & Analysis at incident scale is mostly
one of stakes and scope. A single alert might triage out as a benign true positive in under a
minute. A potential incident takes more work precisely because getting it wrong is more expensive:
calling something an incident when it isn't wastes the response team's time and credibility; failing
to confirm something that genuinely is an incident lets real damage continue unchecked. An analyst
or team working Detection & Analysis pulls together everything the triage process already surfaces —
the raw logs, the host or account involved, related activity nearby in time — and goes further,
tracing how the activity started, what else it touched, and whether it's still ongoing.

## Understanding the incident's nature

Confirming that an incident is real is only half the job. The other half is understanding its nature
well enough to respond correctly, because the right response differs sharply by incident type.
Ransomware encrypting file shares calls for an immediate, aggressive isolation response. A single
compromised user account quietly accessing data it shouldn't calls for a careful, quieter approach so
the attacker doesn't realize they've been noticed and destroy evidence. A phishing email that was
reported before anyone clicked it may need almost no containment at all. Detection & Analysis is
where the team decides which of those situations it's actually dealing with — because that
determination is what Chapter 4 and Chapter 5's containment, eradication, and recovery work depends
on getting right.

## Why both directions of error cost something real

Just as the SOC Operations course taught that triage speed and triage accuracy both matter, the same
is true here, at higher stakes. A team that's too quick to declare "incident" over everything that
looks unusual burns its own response capacity and erodes trust in its judgment the next time it
raises an alarm. A team that's too slow or too skeptical to confirm a genuine incident gives an
attacker more time inside the environment — extending the dwell time the SOC Operations course
already introduced. Detection & Analysis exists specifically to get that call right, using evidence
rather than gut instinct, before the team commits to a response.

## Key terms

| Term | Meaning |
|---|---|
| Detection & Analysis | The NIST phase where an alert is formally confirmed as a real incident and its nature is understood |
| Confirmed incident | An alert that has been validated against real evidence as genuinely a security event requiring response |
| Incident nature | The specific type and scope of a confirmed incident, which determines the correct response |
| Dwell time | The total time an attacker operates inside an environment before being detected and stopped |

## Check yourself

A SIEM alert fires on a single user account accessing files it's never touched before. Explain, in
your own words, what Detection & Analysis has to establish before anyone moves into Containment —
and why confirming "this is real" isn't enough on its own.
