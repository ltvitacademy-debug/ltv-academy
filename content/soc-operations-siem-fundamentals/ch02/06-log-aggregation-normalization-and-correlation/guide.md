# Lesson 6 — Log Aggregation, Normalization, and Correlation

**Chapter 2 · SIEM Fundamentals · Lesson 6 of 32**

## What you'll learn

- What log aggregation means and why no single log source tells the full story
- Why normalization has to happen before you can compare logs from different vendors at all
- How correlation combines normalized events across sources to detect a pattern
- A concrete walk-through: a failed login on one system followed by a successful login
  elsewhere, from the same IP address

## Aggregation: logs in, from everywhere

An attacker's actions are almost never confined to one system — a firewall sees the
inbound connection, a server sees the login attempt, an endpoint agent sees what ran
afterward. Aggregation is the first step: pulling logs from firewalls, Windows and
Linux servers, endpoint agents, and applications into one central system, instead of
leaving an analyst to log into a dozen consoles separately to assemble the picture.

## Normalization: a common language for different vendors

Aggregation alone isn't enough, because every vendor formats its logs differently. A
Windows Event Log records a failed logon as `EventID 4625` with its own field names. A
Cisco ASA firewall logs the same kind of event under a completely different syslog
format. A Palo Alto firewall formats it differently still. Normalization maps each of
those into one shared schema, so "source IP" means the same field no matter which
vendor wrote the original line. Real schemas like Common Event Format (CEF) and the
Elastic Common Schema (ECS) exist specifically to solve this problem — they give
differently-formatted vendor logs a shared structure a SIEM can actually work with.

## Correlation: combining normalized events into one story

Only once events are normalized does correlation actually work. Say System A logs a
failed login attempt at 10:02 AM. A minute later, System B logs a successful login —
from that same source IP address. Neither event alone is remarkable; failed logins and
successful logins both happen constantly across any environment. Correlated together,
they become one incident with a working theory: someone testing stolen credentials, or
an attacker moving laterally after a first foothold.

## Why order matters: aggregate, then normalize, then correlate

This pipeline has to run in order. You can't correlate logs that are still in a dozen
incompatible vendor formats — a correlation rule looking for "source IP" has to be able
to find a field called that in every log it's comparing, which is exactly what
normalization guarantees. Skip normalization, and correlation either misses real
matches or has to be rebuilt per vendor, which defeats the point of a SIEM in the first
place.

## Key terms

| Term | Meaning |
|---|---|
| Aggregation | Pulling logs from many different sources into one central system |
| Normalization | Mapping different vendors' log formats into a common schema so events can be compared and searched together |
| Correlation | Combining normalized events across sources to detect a pattern, such as a failed login followed by a successful login from the same IP |
| CEF / ECS | Common Event Format and Elastic Common Schema — real-world examples of normalization schemas used to give differently-formatted vendor logs a shared structure |

## Check yourself

Why must normalization happen before correlation, not after?
