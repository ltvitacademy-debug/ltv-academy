# Lesson 17 — The Real Alert Triage Process

**Chapter 5 · Alert Triage & Investigation Workflow · Lesson 17 of 32**

## What you'll learn

- The real four-step loop a Tier 1 analyst runs on every alert that lands in the queue
- The three possible outcomes of triage: true positive, false positive, and benign true positive — and why they're not the same thing
- Why triage speed matters even when most alerts turn out to be nothing
- Why triage accuracy matters just as much as speed, and what happens when it slips

## The triage loop: fire, review, classify, act

Everything in Chapters 2 through 4 — the SIEM, the log sources, the correlation rules — exists to
produce one thing: an **alert** landing in a queue in front of a Tier 1 analyst. What happens next
is the actual, repeatable job. An alert fires. The analyst reviews it — pulling up the underlying
event, the host or account involved, and whatever context the SIEM surfaces alongside it. The
analyst classifies it into one of three buckets. Then the analyst takes an initial action based on
that classification. That four-step loop — **fire, review, classify, act** — runs dozens or
hundreds of times in a single shift, and it is the foundation everything else in this chapter
builds on.

## Three outcomes, not two

New analysts often assume triage has two outcomes: real or fake. It actually has three, and the
third one is where a lot of the real skill lives.

A **true positive** means the alert accurately describes something that actually happened and that
something is genuinely bad — malicious or policy-violating activity that calls for a response. A
**false positive** means the alert is simply wrong: the correlation rule fired, but the activity it
flagged either didn't happen the way the rule assumed or didn't happen at all. A **benign true
positive** sits in between, and it's the one analysts new to the seat miss most often: the alert is
accurate — the activity it describes really did happen exactly as flagged — but the activity itself
is legitimate, not malicious.

A concrete example makes the difference clear. A correlation rule fires on "admin login from a new
geographic location." The analyst checks the raw authentication log and confirms the login really
did come from a new country, at the time the alert says, from the account it names — so the alert
is accurate. But it turns out the admin is traveling for a conference and logged in from their
laptop over hotel Wi-Fi, which an IT ticket from that morning confirms. The alert is a **benign true
positive**: it correctly described a real login from a new location, but that login wasn't an
attack. Compare that to the same rule firing on a login from a country the account's user has never
visited, at 3 a.m. their time, immediately followed by a failed attempt to add a second MFA device —
that pattern, once the analyst checks the underlying log data and confirms it, is a **true
positive**.

## Why triage speed matters

Every minute an alert sits untouched in a queue is a minute a real attacker, if there is one, keeps
operating undetected — connecting back to a command-and-control server, moving to another host, or
quietly collecting data to exfiltrate. Security teams call the total time an attacker spends inside
an environment before being found and stopped **dwell time**, and slow triage directly extends it.
A queue that takes six hours to work through doesn't just feel backed up — it means a genuine
intrusion sitting at hour one of that queue gets five extra hours of free movement before anyone
even looks at it.

## Why triage accuracy matters just as much

Speed without accuracy is just as dangerous as accuracy without speed. An analyst who rushes
through the queue and waves off every alert as "probably fine" without actually checking the
underlying data will eventually wave off a genuine true positive — and that's a missed real
incident, the worst possible outcome in a SOC. An analyst who goes the opposite direction and
escalates every unclear alert to Tier 2 "just in case," without doing the validation this chapter's
next lesson covers, burns Tier 2's time on things that were never real problems and trains the team
to treat escalations as noise. Both failure modes come from the same root cause: skipping the review
step and guessing at the classification instead of checking what the data actually shows.

## Key terms

| Term | Meaning |
|---|---|
| Alert | A notification generated when a correlation rule's conditions are met |
| Triage | The process of reviewing an alert and classifying it before acting on it |
| True positive | An alert that accurately describes real, malicious or policy-violating activity |
| False positive | An alert that is simply wrong — the activity didn't happen as described |
| Benign true positive | An alert that accurately describes real activity that turns out to be legitimate, not malicious |
| Dwell time | The total time an attacker operates inside an environment before being detected and stopped |

## Check yourself

An alert fires describing something that really did happen, exactly as the alert says — but the
activity turns out to be a legitimate admin task, not an attack. Which of the three triage outcomes
is this, and how is it different from a false positive?
