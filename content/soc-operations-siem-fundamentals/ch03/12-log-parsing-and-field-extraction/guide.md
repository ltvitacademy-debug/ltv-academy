# Lesson 12 — Log Parsing and Field Extraction

**Chapter 3 · Log Sources & Collection · Lesson 12 of 32**

## What you'll learn

- What log parsing actually means: turning raw, unstructured log text into named, structured fields
- Why field extraction — not just storage — is what makes a log searchable and correlatable in a SIEM
- How a single raw log line gets broken into fields like source IP, username, and event type
- What normalization is, and why it matters when ten different log sources all name the same thing differently

## A log is just text until it's parsed

Every log source this chapter has covered — syslog, Windows Event Forwarding, agent- or
agentless-collected data — arrives at the SIEM as a string of raw text. On its own, that string is
barely more useful than a wall of text in a notepad file: you could search for exact substrings, but
you couldn't ask "show me every failed logon for user admin from any source IP" without first
knowing where in that string "admin" and the IP address actually sit. **Log parsing** is the process
of extracting structured fields — source IP, username, timestamp, event type, destination port — out
of that raw text, so each piece of information becomes something the SIEM can filter, sort, and
compare on individually.

## Watching one line get parsed

Take the same syslog line from Lesson 9:

```
<34>Oct 28 10:15:32 firewall01 sshd[1234]: Failed password for
invalid user admin from 203.0.113.55 port 51413 ssh2
```

To a human, the meaning is obvious. To a SIEM, that's still an unstructured string until a parser
runs — typically a regular expression, or a known schema like CEF's key-value pairs, which a parser
reads directly. After parsing, that same line becomes a set of named fields:

```
severity: Critical
process: sshd
event_type: Failed Logon
dest_user: admin
src_ip: 203.0.113.55
src_port: 51413
```

Now an analyst can run a search like `event_type=Failed Logon AND dest_user=admin` and get every
matching event across the entire log volume instantly — something that would mean scanning raw text
line by line without parsing.

## Why this matters more than it looks like it should

Field extraction isn't just a convenience for searching. It's the prerequisite for everything later
in this course. Chapter 4's correlation rules compare field values *across different log sources* —
for example, flagging when the same `src_ip` shows up in a failed-logon event and, minutes later, in
a successful one. That comparison is only possible because both events were parsed down to a shared
`src_ip` field. A wall of unparsed text has no fields to compare, which means no correlation rules,
no dashboards built on specific fields, and no meaningful search — just a very large, very expensive
archive nobody can actually use.

## Normalization: one name per concept

Real environments make this harder than one tidy example suggests, because different log sources
name the same concept differently — a firewall might log `src_ip`, a Windows event might log
`SourceAddress`, and a cloud service's API might call it `sourceIPAddress`. **Normalization** is
mapping all of those into one common field name the whole platform uses, often against a published
schema (Splunk's Common Information Model, or Microsoft Sentinel's Advanced Security Information
Model, ASIM, are real examples). Without normalization, a correlation rule written against `src_ip`
would quietly miss every event from a source that logged the same value under a different field
name — which is exactly the kind of gap that matters in a real investigation.

## Key terms

| Term | Meaning |
|---|---|
| Log parsing | Extracting structured, named fields out of raw, unstructured log text |
| Field extraction | The resulting structured data (source IP, username, event type, etc.) a SIEM can search on |
| Normalization | Mapping differently-named fields from different sources into one common field name |
| Common Information Model (CIM) / ASIM | Published schemas (Splunk / Microsoft Sentinel) defining the shared field names a platform normalizes to |

## Check yourself

You're ready for Chapter 4 when you can explain, without looking: why can't a correlation rule
compare events from two different log sources until both have been parsed and normalized to the
same field names?
