# Lesson 5 — What a SIEM Actually Does

**Chapter 2 · SIEM Fundamentals · Lesson 5 of 32**

## What you'll learn

- What SIEM stands for and the one-sentence job it does for a SOC
- The four core functions every real SIEM performs: centralization, correlation, alerting, and retention
- Why correlation — not just storage — is the feature that actually makes a SIEM a SIEM
- How those four functions work together in a single realistic scenario

## SIEM: one tool, four jobs

SIEM stands for Security Information and Event Management. Strip away the vendor
marketing, and every real SIEM does four things: it **centralizes** logs from across
the environment into one place, **correlates** events across those sources in real
time, **alerts** when a pattern looks dangerous, and **retains** the data long enough
to investigate it later. Those four jobs, done together, are what separates a SIEM
from a folder full of log files — and they're the backbone this entire chapter builds
on.

## Centralization: logs, from everywhere, in one place

Without a SIEM, an environment's logs sit scattered — firewall logs on the firewall,
server logs on each server, endpoint logs wherever the agent stores them, application
logs inside the application. Centralization means pulling all of that into one system,
so an analyst isn't logging into a dozen different consoles to piece together what
happened. It's necessary groundwork, but on its own it's just storage.

## Correlation: finding patterns no single log reveals

Correlation is the feature that actually makes a SIEM valuable. A firewall logs a port
scan from an external IP address — on its own, that's noise; port scans happen
constantly. Minutes later, an endpoint agent logs an antivirus alert on a server sitting
behind that same firewall. Two separate systems, two separate log entries, each easy to
dismiss individually. A SIEM's correlation engine ties them together by source IP and
timing into a single incident — exactly the pattern a human watching either log alone
would never catch.

## Alerting: turning a detected pattern into an action

A correlated pattern is worthless if nobody sees it. Alerting is the step that turns
that detected pattern into a prioritized notification an analyst actually sees — a
ticket, a dashboard entry, a page — instead of a line buried somewhere in millions of
daily log events.

## Retention: logs stick around for investigation and compliance

Retention is easy to undervalue until it's needed. Forensic investigations often start
days, weeks, or months after an incident actually happened, and the only way to
reconstruct a timeline is if the logs are still there. Compliance frameworks like
PCI-DSS and HIPAA go further, requiring organizations to keep certain logs for a
defined minimum period — audited and provable, not just convenient to have around.

## Key terms

| Term | Meaning |
|---|---|
| SIEM | Security Information and Event Management — centralizes, correlates, and alerts on log data from across an environment |
| Centralization | Pulling logs from many different systems into one place |
| Correlation | Combining events across sources to detect a pattern that no single log would reveal on its own |
| Retention | Keeping logs for a defined period for later investigation or compliance requirements |

## Check yourself

Why does a SIEM's real value come from correlation rather than from simply storing a
large volume of logs in one place?
