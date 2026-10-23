# Lesson 18 — The Elevated-Privilege security_admin Role

**Chapter 6 · Governance, Compliance & Audit · Lesson 18 of 24**

## What you'll learn

- Why `security_admin` needs a full lesson of its own, beyond the one-line mention in System Administration Lesson 9
- Precisely what `security_admin` lets a user bypass, and why that specific capability is so dangerous
- Why the role is deliberately session-scoped through Elevate Roles instead of held permanently, even by full admins
- The real governance practice: logging and alerting on every elevation event, not just restricting who can elevate
- How to reason about "who governs the governors" for any platform-level security control

## A quick recap, then the real depth

System Administration Lesson 9 introduced `security_admin` as a
troubleshooting detail: editing an ACL record requires elevating
through "Elevate Roles" under the profile icon, because `sys_security_acl`
has its own ACLs and even a full admin doesn't bypass them by default.
That lesson treated elevation as a step in a repeatable troubleshooting
order. This lesson treats it as what it actually is — one of the single
most consequential privilege boundaries on the entire platform, and
worth understanding precisely, not just operationally.

## What security_admin actually bypasses

Here is the detail that makes this role genuinely dangerous rather than
just inconveniently gated: when `security_admin` is active, ACL script
evaluation is bypassed specifically for edits to ACL records themselves.
Every other ACL on the platform — on Incident, on Change Request, on a
custom table — still runs its condition scripts normally for every other
user and every other operation. What elevation unlocks is narrower and
sharper: the ability to edit the rules that define access, without those
same rules' own script logic standing in the way of the edit.

That narrowness is exactly why it's so powerful. ACLs are the mechanism
that governs what every other role, every other user, and every other
table can do across the whole instance. A user who can freely rewrite
ACL records — add a condition that grants themselves access to a
restricted table, remove a role requirement that was protecting
sensitive data, widen a `write` ACL that was deliberately scoped narrow
— isn't just changing one record's behavior. They're changing the rules
that decide behavior everywhere else. A single careless or malicious ACL
edit, made with that bypass active, can quietly open access far beyond
whatever the admin intended to fix.

```
Normal ACL evaluation:                  With security_admin elevated:
Every table's ACL script runs            Editing sys_security_acl records
  for every user, every operation          specifically bypasses ACL
                                            script evaluation on THAT edit

Scope of the bypass: narrow (ACL record edits only)
Scope of the consequence: platform-wide (ACLs govern everything else)
```

## Why it's deliberately not always-on

Given how much leverage this role carries, permanently granting it
alongside the `admin` role would mean every admin session — checking a
ticket, updating a record, running a report — carries a live, standing
ability to silently rewrite the rules governing every table on the
platform. That's a wide blast radius to leave open for the 99% of an
admin's work that never touches an ACL record at all.

Elevate Roles narrows that window on purpose. `security_admin` only
becomes active for the current session, only when an admin explicitly
chooses to turn it on, and (depending on instance configuration) it can
expire and require re-elevation. The role exists; the bypass doesn't sit
live and available by default. An admin who genuinely needs to edit an
ACL elevates, makes the specific change, and the elevated session
eventually lapses rather than persisting as a quiet standing capability
nobody is watching.

## The real governance practice: logging the elevation itself

Scoping *when* the bypass is active only solves half the problem. The
other half is treating the elevation event itself as something worth
tracking — because the moment someone turns on `security_admin` is
exactly the moment the platform's own self-protection is about to be set
aside for an ACL edit. A mature governance posture doesn't just restrict
who *can* elevate; it logs every elevation, and alerts a security team
or administrator when one happens, the same way a bank logs every time
a vault is opened rather than only restricting who holds a key. If an
account elevates to `security_admin` at 2 a.m., or an account that
rarely touches ACLs suddenly elevates and edits several in a row, that's
a signal worth a human looking at — not an event that should pass by
unnoticed just because the user technically had the right to elevate.

```
Weak governance:                        Real governance:
- Restrict who CAN elevate               - Restrict who CAN elevate
- Elevation happens silently             - AND log every elevation event
- No one reviews elevation history       - AND alert on unusual elevation
                                            patterns (off-hours, unusual
                                            accounts, repeated edits)
```

## Who governs the governors

`security_admin` is a specific, concrete instance of a question that
applies to any system with layered access control: what stops the
mechanism that enforces the rules from itself being quietly rewritten by
someone with just enough access to reach it? ServiceNow's answer is
scoping the bypass to ACL edits specifically, requiring deliberate
session-level elevation to activate it, and — in a well-run instance —
treating every elevation as an audit-worthy event rather than routine
background noise. The next two lessons build directly on that last
point: Lesson 19 covers how ServiceNow's own audit logging tracks
changes like these, and Lesson 20 places that tracking inside the
compliance frameworks that often require it.

## Key terms

| Term | Meaning |
|---|---|
| `security_admin` | The role required to bypass ACL script evaluation specifically when editing ACL records |
| Elevate Roles | The profile-menu action that activates `security_admin` for the current session only |
| Scope of bypass vs. scope of consequence | The bypass applies narrowly to ACL edits; the consequences of a bad edit reach the whole platform |
| Elevation event | The act of turning on `security_admin` — itself a security-sensitive moment worth logging and alerting on |

## Check yourself

You're ready for Lesson 19 when you can explain, without looking: why
is it specifically the *editing of ACL records* that `security_admin`
bypasses, rather than ACL enforcement in general — and why does that
narrow bypass still justify treating every elevation event as something
worth logging and reviewing?
