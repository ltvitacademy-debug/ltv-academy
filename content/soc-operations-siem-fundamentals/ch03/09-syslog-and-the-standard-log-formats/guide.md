# Lesson 9 — Syslog and the Standard Log Formats

**Chapter 3 · Log Sources & Collection · Lesson 9 of 32**

## What you'll learn

- What the syslog protocol actually is, and why it's the default logging language of Unix/Linux systems and nearly every network device
- How a raw syslog message is structured, including the priority value hiding at the front of every line
- The eight syslog severity levels, from Emergency down to Debug, and why they matter for alert tuning later in this course
- Why vendors adopted standardized formats like CEF and LEEF on top of syslog, instead of each one inventing its own layout

## Syslog: the common tongue of logging

**Syslog** is the standard protocol for message logging that originated on Unix systems decades ago
and is now spoken by almost everything that isn't Windows-native: Linux servers, firewalls, routers,
switches, and most network appliances. A device running syslog sends each log message to a
**syslog server** — which, in a SOC, is usually the SIEM itself or a log collector feeding it —
traditionally over **UDP port 514**, though many environments now use **TCP port 514** for delivery
guarantees, or **TCP port 6514** for syslog wrapped in TLS so the messages aren't sent in plaintext
across the network. Without syslog, every firewall and switch vendor would need its own proprietary
way to ship logs off the box, and a SIEM would need a custom listener for each one. Syslog gives the
SIEM one protocol to listen for, no matter whose hardware is talking.

## Anatomy of a syslog line

A real syslog message carries more structure than it first appears. Take this line from a firewall:

```
<34>Oct 28 10:15:32 firewall01 sshd[1234]: Failed password for invalid user admin from 203.0.113.55 port 51413 ssh2
```

The leading `<34>` is the **PRI** (priority) value, and it's not arbitrary — it's calculated as
`facility × 8 + severity`. Here, facility `4` (the `auth`/security facility) times 8 is 32, plus
severity `2` (Critical) equals 34. Everything after that is timestamp, hostname, the process that
logged it (`sshd`, process ID `1234`), and the message text itself. A SIEM's syslog parser reads
that PRI value first — it's how the SIEM instantly knows "this is an authentication-related message
at Critical severity" before it has even parsed a single word of the message.

## The eight severity levels

Syslog defines exactly eight severity levels, numbered 0 (most severe) through 7 (least severe):
**0 Emergency**, **1 Alert**, **2 Critical**, **3 Error**, **4 Warning**, **5 Notice**,
**6 Informational**, **7 Debug**. These levels exist so a SIEM — or an analyst — can filter noise by
threshold: a correlation rule watching for serious authentication failures might only fire on
severity 3 (Error) or worse, while a device dumping everything at severity 7 (Debug) is a candidate
for being excluded from ingestion entirely so it doesn't flood the platform with log volume nobody
will ever read.

## CEF and LEEF: syslog with a standardized body

Raw syslog only standardizes the envelope — the message text after the hostname can still be
anything the vendor wants, which is exactly the problem **CEF** (Common Event Format, originally
from ArcSight) and **LEEF** (Log Event Extended Format, from IBM QRadar) solve. Both are
standardized, key-value text layouts that vendors write their event data into, usually carried
inside a syslog message. A CEF line looks like:

```
CEF:0|Cisco|ASA|9.1|106023|Deny tcp src|6|src=203.0.113.55 dst=10.0.0.5 spt=51413 dpt=22
```

Because the fields after the pipe-delimited header are always `key=value` pairs, a SIEM can parse
`src=`, `dst=`, `spt=` (source port), and `dpt=` (destination port) the same way regardless of which
vendor sent it — one parser handles Cisco, Palo Alto, Check Point, or anything else that speaks CEF,
instead of needing one handwritten parser per product.

## Key terms

| Term | Meaning |
|---|---|
| Syslog | The standard logging protocol used by Unix/Linux systems and most network devices |
| PRI value | The `<N>` at the start of a syslog line, encoding `facility × 8 + severity` |
| Severity level | Syslog's 0 (Emergency) through 7 (Debug) scale for how serious a message is |
| CEF | Common Event Format — a standardized key-value body vendors write inside syslog messages |
| LEEF | Log Event Extended Format — IBM QRadar's equivalent standardized key-value body |

## Check yourself

You're ready for Lesson 10 when you can explain, without looking: why does a standardized format
like CEF matter to a SIEM, when raw syslog is already a shared transport protocol?
