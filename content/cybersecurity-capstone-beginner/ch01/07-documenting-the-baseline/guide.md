# Lesson 7 — Documenting the Baseline for the Team

**Chapter 1 · Beginner Capstone: Baseline Security Hardening and the First Detection Rule · Lesson 7 of 10**

## What you'll learn

- Why a hardening project that lives only in Mara's head isn't actually finished
- The five sections every runbook entry needs to be reusable by someone else
- How to write the documentation for the Sentinel rule so the next analyst doesn't have to
  reverse-engineer the KQL from scratch
- The difference between a changelog entry and a runbook — and why this project needs both

## Tribal knowledge is a single point of failure

Everything from Lessons 2 through 6 is real, working, and verified — but right now, all of it
lives in Mara's head and her terminal history. If she's out sick the week a fifth server needs
hardening, or on vacation when the Sentinel rule throws an unexpected alert at 2 a.m., none of
that knowledge is actually usable by anyone else at Hartwell. Writing it down isn't bureaucratic
overhead tacked onto the real work — it's the step that turns a one-time favor for Dale into
something Hartwell's IT team can actually rely on and repeat.

## The runbook: five sections per checklist item

For the hardening side, Mara writes a runbook document with one entry per checklist item, each
following the same five-part structure:

1. **What it is** — a one-sentence description a non-specialist can follow (e.g., "Local
   administrator passwords are unique per server and rotated automatically via LAPS, instead of
   one password shared across machines").
2. **Why it matters** — the specific risk this check closes (e.g., "prevents one compromised
   local admin credential from granting access to every other server").
3. **How to apply it** — the exact command or setting, copied straight from Lessons 3 and 4, not
   paraphrased from memory.
4. **How to verify it** — the exact verification command, so the next person checking a fifth
   server doesn't have to guess whether it actually worked.
5. **Owner and review cadence** — who's responsible for this check staying true, and how often
   it gets re-verified (quarterly, for most of this checklist).

A sample entry, in the actual format that goes in the document:

```
### SSH key-only authentication (Linux)
What: Password authentication is disabled; only key-based SSH login is permitted.
Why: Removes the password-guessing attack surface entirely for remote access.
How: /etc/ssh/sshd_config -> PermitRootLogin no, PasswordAuthentication no, AllowUsers <list>
Verify: ssh <user>@<host> with a password explicitly disabled should be refused;
        sshd -T | grep -i passwordauthentication should print "no"
Owner: Security team. Review: quarterly, or immediately after any new server joins this role.
```

## Documenting the Sentinel rule specifically

The detection rule needs its own entry, written so a future analyst can understand *why* the
query is shaped the way it is, not just copy-paste it:

- The detection target in plain English (failed sign-ins followed by a success, within 10
  minutes).
- The finished KQL query itself, with the `Failures`/`Successes`/`join` structure intact.
- The rule's scheduling settings (run every 10 minutes, lookback 20 minutes, threshold > 0) and
  *why* lookback is longer than run frequency.
- The three test scenarios from Lesson 6 and their expected results — so if someone edits this
  query in six months, they have a ready-made regression test to re-run.
- Entity mappings, and what investigating an alert from this rule should look like first.

## A changelog isn't the same thing as a runbook

The runbook describes the *current* state of the baseline — what's true right now, on these four
servers. A short changelog entry, separately, records *what changed and when*: "2026-10-30 —
applied CIS Level 1 baseline to HRU-FILE01, HRU-APP01, hru-web01, hru-db01; created Sentinel rule
'Failed sign-in cluster followed by success.'" The runbook is what someone reads to understand
the system today; the changelog is what someone reads to understand how it got there. Hartwell
needs both, and conflating them into one document makes each harder to use for its actual
purpose.

## Key terms

| Term | Meaning |
|---|---|
| Runbook | A document describing the current state of a system's configuration, reusable by anyone on the team |
| Tribal knowledge | Operational knowledge that exists only in one person's head, not written anywhere |
| Review cadence | How often a documented check gets re-verified to confirm it's still true |
| Changelog | A chronological record of what changed and when, distinct from the current-state runbook |

## Lab

Write the five-part runbook entry (what, why, how, verify, owner/cadence) for the Windows
account lockout policy from Lesson 3, using the same format as the SSH example above.

## Check yourself

You're ready for Lesson 8 when you can explain why the Sentinel rule's documentation needs to
include the Lesson 6 test scenarios, not just the finished query, and why a runbook and a
changelog serve two different purposes rather than being the same document.
