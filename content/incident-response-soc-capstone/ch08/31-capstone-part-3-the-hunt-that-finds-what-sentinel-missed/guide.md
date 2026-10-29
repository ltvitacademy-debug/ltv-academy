# Lesson 31 — Capstone Part 3: The Hunt That Finds What Sentinel Missed

**Chapter 8 · Job-Ready Capstone: Full Incident Response Exercise · Lesson 31 of 32**

## What you'll learn

- How to turn an incident's own root cause into a hypothesis for a threat hunt, instead of
  treating the case as closed once the report is filed
- Why a technique family — not just one specific indicator — is what a good hypothesis is
  actually built on
- How a hunt can find a compromised account that never once triggered an existing analytics rule
- How a hunt's finding becomes a new, permanent detection instead of a one-time discovery

## The hypothesis: what else used this same playbook?

Lesson 30's after-action report closed Teresa Marsh's incident, but closing a report doesn't mean
the attacker's broader campaign is closed. Following Chapter 7's hypothesis-driven method and
using MITRE ATT&CK as the map, the hunt team frames a specific question instead of a vague one:
"The attacker used stolen credentials plus scheduled-task persistence (T1053.005) once — did they
also use a *different* persistence technique, from the same credential-theft wave, against a
*second* identity, specifically one that wouldn't trigger impossible-travel because the sign-in
geography looked ordinary?" That second half matters: a hunt aimed only at repeating Teresa's
exact indicators would miss an attacker who varied the pattern on purpose.

## The loop, run for real

The hunt follows Chapter 7's loop exactly. **Hypothesis:** stated above. **Investigate:** rather
than searching sign-in geography again, the team pivots to a technique Sentinel has no rule for
at all — inbox forwarding rules, MITRE ATT&CK technique T1114.003, a common way a compromised
mailbox quietly exfiltrates mail without ever showing up as a suspicious sign-in.

```
OfficeActivity
| where TimeGenerated > ago(14d)
| where Operation in ("New-InboxRule", "Set-Mailbox")
| where Parameters has "ForwardTo" or Parameters has "RedirectTo"
| extend Target = extract(@"(?i)(forwardto|redirectto).*?([\w.-]+@[\w.-]+)", 2, tostring(Parameters))
| where isnotempty(Target) and Target !endswith "@alderbrookwealth.com"
```

## The finding: a second account, never alerted on

The query returns one result the SOC had never seen before: **Daniel Oyelaran**, a Compliance
Operations Analyst, had an inbox rule created nine days *before* Teresa's incident, silently
forwarding any email containing "wire" or "transfer" to an external Gmail address. The sign-in
that created it came from a residential IP in the same metro area Daniel normally works from —
which is exactly why impossible travel never fired on it. **Document:** this is a second,
independently compromised account, caught not by an alert but by a hypothesis about a technique
family the original incident only hinted at.

## Turning the hunt into a permanent detection

Chapter 7's closing lesson is the whole point here: a hunt that stays a one-time manual query
never catches the next version of this. The team schedules the hunting query above as a new
Sentinel analytics rule — run hourly, entity-mapped to Account on the mailbox owner, severity
High, tagged to MITRE ATT&CK T1114.003, with the external-domain filter kept exactly as written.
The next inbox rule forwarding client financial mail off the tenant raises an incident on its own,
the way Teresa's impossible-travel sign-in always should have had a sibling rule watching mailbox
rules too.

## Key terms

| Term | Meaning |
|---|---|
| Hypothesis-driven hunt | A hunt that starts from a specific, falsifiable statement about attacker behavior, not a vague search |
| Technique family | A category of attacker behavior (MITRE ATT&CK technique) rather than one specific indicator |
| T1114.003 | MITRE ATT&CK's technique for email collection via forwarding rule |
| Hunt-to-detection | Converting a manual hunting query into a scheduled, entity-mapped analytics rule |

## Check yourself

Why did Daniel Oyelaran's compromised account never trigger the impossible-travel rule that
caught Teresa Marsh's, even though both accounts were compromised by what looks like the same
attacker?
