# Lesson 12 — Incident Severity Classification in Practice

**Chapter 3 · Detection & Analysis Deep Dive · Lesson 12 of 32**

## What you'll learn

- The four real-world factors that drive severity classification: business impact, data
  sensitivity, scope/spread, and regulatory implications
- Why severity isn't a purely technical judgment call made by the analyst alone
- How severity level directly drives resourcing and executive notification decisions
- Why two incidents with similar technical details can land at very different severity levels

## Severity is bigger than the technical details

Lessons 9 through 11 built the full picture of an incident: every related alert pulled together,
a reconstructed timeline, and a confirmed scope of everything the attacker touched. Severity
classification is what happens with that full picture — deciding how serious this incident
actually is. It's tempting to think severity is just about technical sophistication: how clever
the attack was, how many systems got touched. In practice, severity depends on four factors, and
technical sophistication is only loosely related to any of them: **business impact**, **data
sensitivity**, **scope/spread**, and **regulatory implications**.

## The four factors, one at a time

**Business impact** asks what's actually disrupted — a single workstation offline is very
different from the order-processing system going down. **Data sensitivity** asks what kind of
data was involved — internal meeting notes versus customer Social Security numbers carry very
different weight even in a technically similar breach. **Scope/spread** is the direct payoff of
Lesson 11's scoping work — one compromised account is a different incident than twelve accounts
across three business units. **Regulatory implications** asks whether the data or systems
involved trigger a legal notification requirement — healthcare data under HIPAA or payment card
data under PCI DSS can turn a contained technical incident into one with a legal clock running.

## A concrete example: same attack, different severity

Compare two incidents with nearly identical technical details — both start with a phishing email,
both result in one compromised account used for lateral movement. In the first, the account
belongs to a junior employee with access to nothing beyond shared internal documents, Lesson 11's
scoping confirms no further spread, and no regulated data was involved: a contained, moderate
incident. In the second, the account belongs to someone with access to a customer database
containing payment card numbers, scoping confirms the attacker queried that database, and PCI DSS
notification requirements now apply: the same technical attack chain, but a critical incident
with legal and executive implications the first one never had.

## Why severity drives resourcing, not just labeling

A severity level isn't a filing label — it's what decides how many people get pulled in and how
fast. A low-severity incident might stay with the on-call analyst. A high-severity incident pulls
in the IR team lead and starts executive briefings. A critical incident, especially one with
regulatory exposure, can mean legal counsel, a possible breach-notification clock, and executive
or even board notification within hours — and resourcing decisions built on an inaccurate severity
call, set too low, mean the wrong-sized team responds to a problem that actually needed more.

## Key terms

| Term | Meaning |
|---|---|
| Business impact | What operational function is actually disrupted by the incident |
| Data sensitivity | How sensitive the data involved is, e.g. internal notes vs. payment card data |
| Scope/spread | How many accounts, hosts, or systems the incident actually reaches, per Lesson 11's scoping |
| Regulatory implications | Whether the incident triggers a legal notification requirement, e.g. HIPAA or PCI DSS |

## Check yourself

Two incidents share the same technical attack chain, but one involves a junior employee's account
with no sensitive data access and the other involves access to a payment card database. Why can
these land at completely different severity levels?
