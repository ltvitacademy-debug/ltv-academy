# Lesson 23 — Hunting Queries and Proactive Threat Hunting

**Chapter 6 · Incident Investigation in Sentinel · Lesson 23 of 32**

## What you'll learn

- What a **hunting query** actually is, and how it's fundamentally different from the analytics
  rules covered in Chapter 3
- Why hunting queries are the real, concrete implementation of the "proactive" half of the SOC
  maturity model from the previous course
- What Sentinel's built-in **hunting query gallery** actually provides, and how a custom hunt
  differs from it
- How a hunt that finds something real actually turns into a new incident or a new rule

## A hunting query runs on demand, not on a schedule

Chapter 3 covered scheduled analytics rules — KQL queries Sentinel runs automatically on a
recurring schedule, generating an alert the moment their logic matches. A **hunting query** is a
KQL query too, but it isn't scheduled and it doesn't generate an alert on its own. An analyst runs
it manually, on demand, against the workspace's log data, specifically to look for something that
hasn't already triggered an automated detection. That distinction matters: an analytics rule can
only ever catch a pattern someone already thought to write a rule for. A hunting query lets an
analyst go looking for a pattern nobody has formalized into a rule yet — which is exactly the gap a
purely alert-driven, reactive SOC can never close on its own.

## The real payoff of the proactive half

The previous course's lesson on SOC maturity named threat hunting as one of the three practices
that move a SOC from reactive to proactive, alongside continuous improvement and metrics-driven
management. Hunting queries are that practice, made concrete inside Sentinel specifically. Take
that course's own example: a slow, deliberate data exfiltration that stays just under every
threshold a correlation rule checks for. No analytics rule ever fires on it, because nothing about
it crosses a configured threshold. A hunting query built around a different question — "which
accounts have had sustained, low-volume outbound data transfer over the past 30 days?" — can
surface exactly that activity, because it isn't waiting for a rule's threshold to trip. It's
actively looking.

## The hunting query gallery: a real starting point

Sentinel ships with a built-in **hunting query gallery** — a library of pre-built KQL queries
organized by tactic (credential access, lateral movement, persistence, and more) that Microsoft
maintains and an analyst can run against their own workspace without writing KQL from scratch. A
gallery query is a genuinely useful starting point for a team new to hunting, and running one
regularly is itself a proactive practice. But the gallery can't anticipate every environment's
specific risk, so a maturing hunting program also writes **custom hunting queries** — KQL an
analyst builds themselves, targeted at a pattern specific to their own organization that no
pre-built query covers.

## When a hunt finds something real

A hunting query that turns up genuinely suspicious activity doesn't just sit there as a one-off
finding. The analyst can pivot straight from the hunt's results into a full investigation the same
way they would from any incident, and — critically — if the pattern the hunt found is one that
would be worth catching automatically going forward, it can be turned into a new scheduled
analytics rule. That loop, from a manual hunt to a new automated rule, is the continuous-improvement
practice from the maturity model in action: each real hunt result makes the reactive baseline a
little more complete.

## Key terms

| Term | Meaning |
|---|---|
| Hunting query | A KQL query run manually, on demand, to search for activity that hasn't triggered an alert |
| Hunting query gallery | Sentinel's built-in library of pre-built hunting queries organized by attack tactic |
| Custom hunting query | A hunting query an analyst writes for a pattern specific to their own environment |
| Proactive SOC | A SOC that adds hunting, rule tuning, and metrics tracking on top of alert response |

## Check yourself

A slow data exfiltration never crosses any correlation rule's threshold, so no analytics rule ever
fires on it. Explain why a hunting query, specifically, is the one tool in this lesson that could
still catch it.
