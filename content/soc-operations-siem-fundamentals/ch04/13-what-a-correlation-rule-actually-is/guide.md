# Lesson 13 — What a Correlation Rule Actually Is

**Chapter 4 · Correlation Rules & Alert Logic · Lesson 13 of 32**

## What you'll learn

- What a correlation rule actually is: logic that fires on a combination or sequence of events, not a single event
- Why correlation rules need a time window, and what happens without one
- The real difference between a SIEM correlation rule and a network IDS signature like the ones you wrote in Lesson 7
- How to read the basic shape of a correlation rule: events, time window, threshold, action

## A rule that watches more than one thing at once

Most of what a SIEM collects is a single log line: one logon event, one firewall deny, one process launch. A **correlation rule** doesn't look at any one of those lines in isolation — it looks for a specific **combination or sequence of events**, often across more than one log source, happening within a defined **time window**.

The classic example: 5 failed logon events for the same user account, followed by 1 successful logon, all within 10 minutes. No single event in that sequence is alarming on its own — a failed login happens constantly, from typos. A success happens constantly too. It's the pattern across time — repeated failures immediately followed by success for the same account — that looks like a brute-force guess that landed, and that's exactly the shape a correlation rule is built to catch.

## Why the time window matters

Take the time window away and the rule falls apart. Five failed logins for the same account are unremarkable spread across a year — password typos accumulate. The same five failures inside 10 minutes, followed by a success, is a completely different signal. The time window is what turns a count into a pattern: it bounds how close together the events have to occur for the rule to consider them related. Every correlation rule needs one, whether it's 5 minutes, 1 hour, or 24 hours, matched to how fast the behavior it's hunting for would realistically happen.

## Correlation rule vs. network IDS signature

Lesson 7 covered signature-based detection rules, the kind Snort and Suricata use — a signature matches a single packet or payload pattern, in isolation, the moment it's seen (`content:"UNION SELECT"` fires the instant that string appears in one packet). A correlation rule is a different tool for a different job: it reasons across multiple events and across time, often pulled from more than one log source — a Windows authentication log here, a VPN log there — to recognize a pattern that no single event reveals. A signature answers "does this one thing look malicious?" A correlation rule answers "does this sequence of otherwise-normal-looking things add up to something malicious?"

## The basic shape of a correlation rule

Every correlation rule, regardless of vendor, is built from the same four pieces:

- **Event source(s)** — which logs it watches (e.g., Windows Security log, VPN authentication log)
- **Condition** — what each event must match (e.g., logon failure, same username)
- **Time window** — how close together the events must occur
- **Threshold / sequence** — how many occurrences, or what order, trips the rule
- **Action** — what happens when it fires (raise an alert, open a case, notify a channel)

Lesson 14 builds a real one from these exact pieces.

## Key terms

| Term | Meaning |
|---|---|
| Correlation rule | Logic that fires on a combination or sequence of events across one or more log sources within a time window |
| Time window | The span of time events must occur within for a correlation rule to treat them as related |
| Signature | A pattern matched against a single packet or payload, in isolation (the IDS/IPS approach from Lesson 7) |
| Threshold | The number of matching events required before a correlation rule fires |

## Check yourself

Without looking back: why does "5 failed logins, then 1 success, within 10 minutes" need all three pieces — the failures, the success, and the time window — to be a meaningful detection? What happens if you drop the time window?
