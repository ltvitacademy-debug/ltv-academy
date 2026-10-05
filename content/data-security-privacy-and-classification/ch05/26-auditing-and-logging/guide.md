# Lesson 26 — Auditing and Logging

**Chapter 5 · Lifecycle and Compliance · Lesson 26 of 30**

## What you'll learn

- What an audit trail actually needs to capture to be useful
- A worked example of a well-formed audit log entry
- Why logs themselves need protection, not just the data they describe
- The tension between log retention and the retention schedules from Lesson 23

## Why "we have logs" isn't the same as "we have an audit trail"

Plenty of systems log *something* — error messages, request timings, stack traces. That's not the same as an **audit trail**: a record built specifically to answer "who did what, to which data, when, and with what outcome." An audit trail exists to support exactly the things earlier lessons depend on — proving access control (Chapter 3) was actually enforced, investigating a suspected breach (Lesson 27), and demonstrating to an auditor or regulator that a control works, not just that it was configured.

## What belongs in an audit log entry

A usable audit entry answers five questions every time, not just when someone remembers to ask them:

- **Who** — the authenticated identity that performed the action, not a shared service account that could be anyone
- **What** — the specific action taken (read, modified, exported, deleted) and which record or field it touched
- **When** — a precise, consistently-formatted timestamp
- **From where** — the originating system, IP address, or application
- **Outcome** — whether the action succeeded, failed, or was denied

A log line that just says "user accessed customer data" is close to useless for an investigation. "Who" needs to be a specific, attributable identity; "what" needs to name the actual record or field, not just the table.

## A worked example

```
TIMESTAMP:  2026-03-14T09:22:17Z
ACTOR:      j.alvarez@company.example (role: support_agent)
ACTION:     READ
RESOURCE:   customer_records.id=48213 (fields: email, phone)
SOURCE:     10.14.2.91 (internal VPN)
OUTCOME:    SUCCESS
```

Every field here answers one of the five questions. If this same customer later files a complaint about their data being viewed without cause, this entry — and every other one for that customer ID — is exactly what an investigation pulls up first.

## Logs need their own protection

A log is itself a sensitive asset: it often contains the same personal data it's describing (as the field list above shows), and if an attacker can edit or delete log entries after the fact, the audit trail stops being trustworthy evidence of anything. Two practices address this: restrict who can modify or delete logs — ideally nobody, through **tamper-evident** or append-only storage — and keep log access itself governed by the same least-privilege principle (Chapter 3) applied to any other sensitive data.

## The retention tension

Audit logs create a direct tension with Lesson 23's retention principles: you want logs retained *long enough* to support an investigation that might surface months after the fact, but logs that contain personal data are themselves subject to the same over-retention risk as any other personal data. Most organizations resolve this by setting a distinct, usually shorter, retention period specifically for logs — long enough to be useful for security and compliance purposes, short enough not to become its own breach liability.

## Key terms

| Term | Meaning |
|---|---|
| Audit trail | A record built to answer who did what, to which data, when, and with what outcome |
| Tamper-evident log | A log storage approach where any after-the-fact edit or deletion is detectable |
| Append-only | A storage pattern that only allows adding new records, never modifying or deleting existing ones |

## Lab

Pick one action in a system you use (logging into an app, editing a document, approving an expense). Write out what a well-formed audit entry for that action would contain, covering all five questions: who, what, when, from where, and outcome. Then check whether the real system you picked actually captures all five — most don't, on the first attempt.

## Check yourself

Can you name the five things a usable audit entry needs to capture, and explain why a log's own integrity — tamper-evidence — matters as much as what it records?
