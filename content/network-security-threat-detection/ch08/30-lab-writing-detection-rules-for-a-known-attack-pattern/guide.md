# Lesson 30 — Lab: Writing Detection Rules for a Known Attack Pattern

**Chapter 8 · Capstone: Building a Layered Threat Detection Program · Lesson 30 of 32**

## What you'll learn

- How to turn Lesson 7's Suricata rule syntax into a working rule against a real, specific
  attack pattern instead of a textbook example
- How to detect a known malicious tool by its default HTTP User-Agent string
- How to detect a beaconing pattern — regular, small, fixed check-ins — using `dsize` and
  `threshold`, not just a single content match
- Why tuning a rule to avoid false positives is as much a part of writing it as the match
  itself

## The scenario

Castellan Retail's SOC wants two new detection rules live before the next pen test: one for a
well-known SQL injection scanning tool, and one for the kind of beaconing behavior a real
command-and-control implant produces. Both rules build directly on Lesson 7's Suricata syntax —
action, header, options — applied to attack patterns that actually show up in SOC alert queues.

## Rule anatomy, as a quick refresher

Every Suricata rule has the same three parts: an **action** (`alert`, `drop`), a **header**
(protocol, source, direction, destination), and a set of **options** in parentheses (`msg`,
match conditions, and a unique `sid`). This lab writes both rules against that same structure.

## Rule 1: a known tool by its User-Agent

`sqlmap` is a widely used SQL injection testing tool, and in its default configuration it
identifies itself in the HTTP `User-Agent` header on every request it sends. An attacker running
it against Castellan's storefront with default settings is handing the SOC a free signature:

```
alert http any any -> $HOME_NET any (msg:"POLICY SQLMAP SCAN - DEFAULT USER-AGENT DETECTED";
flow:established,to_server; http.user_agent; content:"sqlmap"; nocase;
classtype:web-application-attack; sid:1000010; rev:1;)
```

`http.user_agent` is a **sticky buffer** — it restricts the `content` match that follows to just
the User-Agent header, instead of scanning the entire packet. `nocase` matters because an
attacker who's read this exact lesson could capitalize it as `SqlMap` and otherwise slip past a
case-sensitive match.

## Rule 2: a beacon by its shape, not its content

A real implant rarely announces itself in a header. What it does instead is **beacon**: check in
with its command-and-control server on a regular interval, with a small, consistently-sized
request. Lesson 7 covered single content matches; this pattern needs two more keywords —
`dsize` to catch the small, fixed size, and `threshold` to catch the regularity:

```
alert http any any -> $EXTERNAL_NET any (msg:"POLICY POSSIBLE C2 BEACON - FIXED URI, SMALL REQUEST";
flow:established,to_server; http.uri; content:"/update/check"; dsize:<100;
threshold: type threshold, track by_src, count 20, seconds 300; sid:1000011; rev:1;)
```

`dsize:<100` flags requests smaller than most legitimate traffic to that path would ever be.
`threshold` tells Suricata not to alert on one request — it waits until the same source hits that
pattern 20 times in 300 seconds, which is what separates "one odd request" from "something
checking in on a timer."

## Tuning: the step that keeps the SOC from drowning

A rule that's too broad generates alert fatigue, and an analyst who's seen the same false
positive fifty times stops reading alert fifty-one. Before either rule goes into production,
Castellan's SOC checks it against two things: does any *legitimate* internal tool also send
`sqlmap` in its User-Agent (none does, so Rule 1 ships as-is), and does the authorized vulnerability
scanner from Chapter 6 hit the beacon pattern's URI during its own scheduled scans (it does, so
Rule 2 adds an exception for the scanner's known source IP before it goes live).

## Key terms

| Term | Meaning |
|---|---|
| Sticky buffer | A Suricata keyword (e.g. `http.user_agent`) that restricts the following `content` match to one specific protocol field |
| `dsize` | A rule keyword matching on packet payload size, useful for catching unusually small or large requests |
| `threshold` | A rule keyword that only fires an alert after a match recurs a set number of times within a time window |
| Alert fatigue | The risk that overly broad rules generate so many false positives that analysts start ignoring real alerts |

## Check yourself

Rule 2 doesn't match on any specific malware string — it matches on size and frequency instead.
Why does that make it more durable against an attacker who changes their C2 tool next month,
compared to Rule 1's exact string match?
