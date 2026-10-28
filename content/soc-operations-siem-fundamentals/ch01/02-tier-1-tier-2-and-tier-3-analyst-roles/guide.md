# Lesson 2 — Tier 1, Tier 2, and Tier 3 Analyst Roles

**Chapter 1 · What a SOC Actually Does · Lesson 2 of 32**

## What you'll learn

- The real three-tier structure most SOCs use to organize analyst work, and what each tier is
  actually responsible for
- What a Tier 1 analyst's day actually looks like: alert triage, initial investigation, escalation
- What separates Tier 2 from Tier 1 — deeper investigation and real incident response once an
  alert is escalated
- What Tier 3 does that the other two don't: proactive threat hunting, advanced analysis, and
  tuning the detection tools themselves
- The typical career path from this course into a real Tier 1 seat, and from there into Tier 2
  and beyond

## Tier 1: the first set of eyes on the queue

**Tier 1** is the first human to look at an alert once a correlation rule raises it. A Tier 1
analyst's job is to monitor the alert queue, do enough initial investigation to tell a true
positive from a false positive, gather basic context — who, what, when, from where — and either
close the alert out with notes or escalate it to Tier 2 when it exceeds their access, tooling, or
certainty.

**Concrete example:** a SIEM raises an alert for "multiple failed logins followed by a success" on
a user account. Tier 1 checks whether the login matches the user's normal device and location, and
whether there's a help-desk ticket for a forgotten password. If the pattern matches an ordinary
mistyped-password story, Tier 1 closes it with notes. If the successful login came from an unusual
country immediately after the failures, Tier 1 escalates — they don't have the access or the
confidence to make the call alone.

## Tier 2: deeper investigation and real incident response

**Tier 2** takes escalations from Tier 1. They have broader access and tooling — full endpoint
telemetry, the ability to correlate across multiple log sources — and make the actual call on
whether an escalation is a real incident. Once it is, Tier 2 performs the real incident response:
containment steps, coordinating with IT, and writing up what happened.

**Concrete example:** on that same escalated login alert, Tier 2 checks the source IP against
threat intelligence and finds it's associated with known botnet infrastructure. They pull EDR
telemetry from the affected endpoint and see unusual process activity consistent with compromise.
Confirmed, they disable the account and isolate the machine — the containment Tier 1 couldn't
authorize on their own.

## Tier 3: hunting, advanced analysis, and tuning the tools

**Tier 3** doesn't wait for alerts. Their job is **threat hunting** — proactively searching data
for signs of compromise that never triggered any existing rule — plus the most complex escalations,
malware and forensic analysis, and tuning the correlation rules and detection tooling themselves
based on what they find. That last piece is what feeds directly back into Chapter 4's rule-writing
content.

**Concrete example:** during a hunt, a Tier 3 analyst notices a specific living-off-the-land
technique that none of the SOC's existing correlation rules would catch. They build a new rule to
detect it going forward — closing a real gap that no Tier 1 or Tier 2 analyst could have closed on
their own, since neither tier owns the rule logic itself.

## The career path: where this course puts you

This course trains realistically for the Tier 1 seat: alert triage, investigation fundamentals,
and the SIEM mechanics covered in the rest of this chapter and the next. The typical real-world
progression from there is Tier 1 for roughly one to two years while building investigation
judgment on real alerts, then Tier 2 once that judgment is demonstrated, then Tier 3 or a
specialized role — threat hunting, detection engineering, incident response leadership — after
further experience. That's this course's own path: student, then Tier 1, then Tier 2 and beyond.

## Key terms

| Term | Meaning |
|---|---|
| Tier 1 analyst | First-line triage: monitors the alert queue, does initial investigation, escalates true or likely-true positives |
| Tier 2 analyst | Deeper investigation and real incident response once an alert is escalated — containment, coordination, writeups |
| Tier 3 analyst | Proactive threat hunting, advanced or forensic analysis, and tuning detection rules based on what's found |
| Escalation | Handing an alert or incident up to the next tier when it exceeds the current tier's access, tooling, or certainty |

## Check yourself

Using the failed-login-then-success alert from this lesson: what can a Tier 1 analyst determine on
their own, what forces them to escalate to Tier 2, and what might Tier 3 do afterward that neither
tier does?
