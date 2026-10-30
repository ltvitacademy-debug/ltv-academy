# Lesson 10 — Wrap-Up: What You Hardened, and What's Next

**Chapter 1 · Beginner Capstone: Baseline Security Hardening and the First Detection Rule · Lesson 10 of 10**

## What you'll learn

- A recap of the full Hartwell Regional Utilities project, start to finish
- Which real, transferable skills this project actually demonstrated
- Why Hartwell's security program will need to grow well beyond this project, and in what
  general direction

## What actually happened, start to finish

Nine lessons ago, this project started with a worried sentence from Dale Granger over coffee:
*"Can you take a look at our security and tighten things up? And if something like this does get
through, I'd like to actually know about it."* Here's everything that sentence turned into:

1. **Lesson 1** — turned the vague ask into a specific, scoped project: four named servers, a
   documented baseline, and one detection target tied directly to the phishing near-miss.
2. **Lesson 2** — scoped a real hardening standard (CIS Benchmarks Level 1) down to exactly the
   checks that apply to those four servers.
3. **Lesson 3** — applied and verified the Windows checklist on `HRU-FILE01` and `HRU-APP01`:
   lockout policy, disabled services, LAPS, and Domain-profile firewall rules.
4. **Lesson 4** — applied and verified the Linux checklist on `hru-web01` and `hru-db01`: SSH
   hardening, `fail2ban`, automatic updates, and scoped `ufw` rules.
5. **Lesson 5** — wrote a real, sequence-aware KQL detection rule against `SigninLogs`, catching
   a cluster of failed sign-ins followed by a success.
6. **Lesson 6** — tested that rule against three synthetic scenarios before trusting it with real
   traffic, confirming a true positive and two correctly silent near-misses.
7. **Lesson 7** — documented the whole baseline and the rule in a reusable runbook, plus a
   separate changelog, so none of it depends on one person's memory.
8. **Lesson 8** — presented the findings to Dale: headline first, then a live demonstration of
   the rule actually firing and staying quiet where it should.
9. **Lesson 9** — handled a real pushback question about vendor access with evidence, not
   reassurance.

## The real skills, underneath the tools

None of these lessons were really "about" CIS Benchmarks or KQL alone — each one used those
tools to practice a transferable skill:

| Lesson(s) | Tool skill | Underlying real skill |
|---|---|---|
| 1 | — | Requirements clarification, tied to a real incident |
| 2 | CIS Benchmarks | Scoping a standard to what actually applies |
| 3–4 | Local security policy, LAPS, SSH, fail2ban, ufw | Verified, repeatable system hardening |
| 5–6 | KQL, Sentinel analytics rules | Building and testing a detection before trusting it |
| 7 | Runbook/changelog format | Making operational knowledge reusable by a team |
| 8–9 | — | Communicating technical risk and handling pushback credibly |

A hiring manager — or a real IT Manager like Dale — cares about this right-hand column far more
than which exact command was typed. CIS Benchmarks and KQL are the vehicle; scoping, verification,
testing before trusting, documentation, and clear communication under a real question are what
actually made this project succeed.

## What this project deliberately left out

This Beginner project was scoped smaller than Hartwell's full security program on purpose: four
servers instead of the entire environment, CIS Level 1 instead of Level 2, one detection rule
instead of a full rule library, and one stakeholder's sign-off instead of a cross-team security
review. That wasn't a limitation to apologize for — it was the correct scope for what Dale
actually asked for, and knowing how to scope a first project down is as real a skill as knowing
how to scope a mature program up.

## Where Hartwell's security program needs to grow next

One hardened handful of servers and one detection rule is a real, working start — not a finish
line. A single analyst, a single rule, and four servers out of everything Hartwell runs leaves
most of the organization exactly where it was before this project began. Hartwell's security
program will need to grow in every direction this Beginner project deliberately kept small:
far more systems brought under the same baseline, a broader library of detection rules covering
more attack patterns than just this one, and a level of process and oversight that goes beyond
what one new analyst and one IT manager can carry alone. Exactly what that growth looks like, and
how to build it, is its own body of work — not something this project tries to summarize in its
last few minutes.

## Key terms

| Term | Meaning |
|---|---|
| Transferable skill | A capability (like requirements clarification or verified hardening) that matters independent of the specific tool used |
| Scope discipline | Deliberately choosing what not to build, to match effort to the actual request |

## Lab

Write a short project summary, as if for a resume or portfolio, describing this Beginner capstone
in two or three sentences — focused on the skills demonstrated, not the tool names.

## Check yourself

You're ready to move on when you can list, from memory, all nine prior lessons' real skill (not
just the tool used), and explain in one sentence why four servers and one detection rule was the
right scope for this specific project, even though it leaves most of Hartwell's environment
untouched.
