# Lesson 4 — SOC Maturity Models: Reactive to Proactive

**Chapter 1 · What a SOC Actually Does · Lesson 4 of 32**

## What you'll learn

- The real distinction between a **reactive** SOC and a **proactive** one, and why almost every
  SOC starts out reactive
- What a purely reactive SOC actually looks like day to day, and its real limitation
- The concrete practices that move a SOC toward proactive: threat hunting, continuous improvement,
  and metrics-driven management
- How this maturity shows up across the rest of this course, chapter by chapter

## Reactive: responding only to what fires

A **reactive SOC** only investigates and responds to alerts as correlation rules raise them. It's
purely alert-driven — there's no capacity to look for anything that didn't already trigger a
rule. That's a reasonable place to start; every SOC begins here. But it has a real limitation:
anything that doesn't match an existing rule goes completely unnoticed, no matter how long it's
been happening, because nothing ever fires to put it in front of an analyst.

**Concrete example:** a slow, deliberate data exfiltration stays just under every threshold a
correlation rule checks for. In a purely reactive SOC, nothing ever fires, so nothing is ever
reviewed — the exfiltration can continue indefinitely, not because anyone missed it, but because
no alert ever existed for anyone to miss.

## Proactive: looking for what hasn't fired yet

A **proactive SOC** adds three things on top of alert response:

- **Threat hunting** — deliberately searching data for signs of compromise that existing rules
  wouldn't catch, exactly the Tier 3 responsibility covered in Lesson 2.
- **Continuous improvement** — turning what hunts and real incidents reveal into new, tuned
  correlation rules, instead of leaving known detection gaps unresolved. This is a direct preview
  of Chapter 4's rule-writing content.
- **Metrics-driven management** — tracking numbers like **mean time to detect (MTTD)** and
  **mean time to respond (MTTR)**, previewed further in Chapter 6, so the SOC knows objectively
  whether it's actually getting faster, instead of just assuming it is.

Applied to the exfiltration example above: a hunt is the one proactive practice that would
actually surface it, since it's the only one of the three that doesn't depend on an alert firing
in the first place.

## How a SOC actually matures

Maturity isn't a single flip from "reactive" to "proactive" — no SOC gets promoted overnight.
Proactive practices get layered on top of the reactive baseline over time, as staffing, tooling,
and experience grow: first, handle the alert queue reliably; then start tuning rules based on what
real incidents and early hunts reveal; then add dedicated hunting time; then start tracking
metrics to drive real decisions with leadership. Most real SOCs sit somewhere in between for a
long time, with pieces of proactive practice layered onto an otherwise reactive core.

## Where this shows up for the rest of the course

Chapters 2 and 3 cover the SIEM mechanics and log sources that make monitoring complete enough for
reactive response to even work. Chapter 4's correlation rule tuning is the continuous-improvement
practice that makes a SOC measurably more proactive. Chapter 6's dashboards and metrics are the
metrics-driven piece. Chapter 7's SOAR automation frees analyst time that proactive work actually
needs. Chapter 8's capstone case study ties all of it together in one realistic shift.

## Key terms

| Term | Meaning |
|---|---|
| Reactive SOC | A SOC that only investigates and responds to alerts as correlation rules fire them |
| Proactive SOC | A SOC that adds deliberate threat hunting, rule tuning, and metrics tracking on top of alert response |
| Threat hunting | Deliberately searching data for signs of compromise that existing detection rules wouldn't catch on their own |
| MTTD / MTTR | Mean time to detect / mean time to respond — the metrics a maturing SOC tracks to measure whether it's actually improving |

## Check yourself

Using the slow-exfiltration example from this lesson: explain why a purely reactive SOC would
never notice it, and name the one proactive practice from this lesson that would.

## Up next

That closes Chapter 1 — what a SOC actually does, who staffs it, how it's covered around the
clock, and how it matures. Chapter 2 opens with the tool nearly every one of those tiers, shifts,
and maturity practices actually runs on: **What a SIEM Actually Does**.
