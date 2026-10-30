# Lesson 1 — The Business Ask: One Manager, One Worry

**Chapter 1 · Beginner Capstone: Baseline Security Hardening and the First Detection Rule · Lesson 1 of 10**

## What you'll learn

- Why "make us more secure" is never actually one request until you ask follow-ups
- The four things a hardening-and-detection ask needs before you touch a single server: scope, baseline, detection target, and deliverable
- How one specific near-miss should shape what the first detection rule is actually built to catch

## The ask

You're three weeks into your first job as a Security Analyst at **Hartwell Regional Utilities**,
a mid-size regional electric & water utility. Dale Granger, the IT Manager, catches you by the
break room on a Tuesday morning:

> "We had a close one last week. Someone in Billing almost clicked a link in a phishing email —
> caught it at the last second, more luck than process. I don't want to find out the hard way
> next time. Can you take a look at our security and tighten things up? And if something like
> this does get through, I'd like to actually know about it instead of finding out three weeks
> later."

That's the entire ask: one manager, one worry, no ticket, no spec, and no deadline except "soon."
This is exactly how real security work starts for a first project — not as a scoped engagement,
but as a sentence that sounds actionable and isn't, yet.

## Why "tighten things up" is a trap

Dale's sentence is really two different asks glued together, and each one hides real questions:

- **"Tighten things up"** — every server at Hartwell, or a representative slice? What does
  "tightened" even mean — a checklist someone can verify, or just a vague sense of "better"?
- **"Know about it"** — know about *what*, specifically? Every possible attack, or something
  tied to what almost happened? A detection system that alerts on everything alerts on nothing
  usefully; it has to watch for something in particular.

Neither of these is a hard question to answer. They're just questions nobody's asked yet — and
answering them is the actual first deliverable of this project, before any server gets touched.

## Turning the near-miss into a specific scope

A short follow-up conversation with Dale gets four concrete answers:

- **Scope**: not all of Hartwell's infrastructure — that's a multi-month engagement, not a first
  project. Dale agrees to a representative handful: two Windows servers (`HRU-FILE01`, the
  internal file and print server, and `HRU-APP01`, the server running the internal work-order
  application) and two Linux servers (`hru-web01`, the public-facing outage-reporting portal,
  and `hru-db01`, its backend database). Together they cover both operating systems and both an
  internal-only system and an internet-facing one.
- **Baseline**: "hardened" means brought up to a recognized, documented standard — not Mara's
  personal judgment call on what looks reasonably safe. Lesson 2 picks the specific standard and
  scopes exactly which checks apply.
- **Detection target**: not "detect every possible attack" — that's not a realistic first rule,
  and a rule tuned to catch everything catches nothing reliably. The near-miss points at a
  specific, realistic target instead: if a phished credential *does* get used, the attacker's
  first move is almost always to try signing in with it — often clumsily, with a handful of
  failed guesses before (or instead of) a successful one. That pattern, a cluster of failed
  sign-ins followed by a success, is the one thing this first detection rule is built to catch.
- **Deliverable**: a written hardening checklist Dale's team can reuse on future servers, plus
  one working detection rule Mara can actually demonstrate — not an open-ended audit with no
  finish line.

Written down, the real ask becomes:

> *"Harden Hartwell's two Windows servers (HRU-FILE01, HRU-APP01) and two Linux servers
> (hru-web01, hru-db01) to a documented baseline, and build one Microsoft Sentinel analytics
> rule that detects a cluster of failed sign-ins followed by a successful one — the pattern a
> phished credential would most likely produce if it were used."*

That sentence is now something a teammate could read and know exactly what to build.

## What you're NOT building

Scoping also means saying what's explicitly out of bounds for this project:

- A full penetration test or vulnerability scan of Hartwell's network — that's real,
  valuable work, but it's a different project with different tools.
- Every server Hartwell operates — four servers across both operating systems is enough to prove
  the baseline works and is repeatable; rolling it out everywhere comes after this project, not
  during it.
- A full SOC build-out with dozens of detection rules — one well-chosen rule, done properly, is
  the actual ask. More rules are a reasonable next step, not this step.

## Key terms

| Term | Meaning |
|---|---|
| Scope | The specific systems included in a project, stated explicitly rather than left as "everything" |
| Baseline | A documented, checkable standard for what "hardened" means, rather than a subjective judgment |
| Detection target | The one specific pattern a detection rule is built to catch, chosen for a real reason |
| Near-miss | An incident that almost happened — used here to pick a realistic, relevant detection target |

## Lab

Before reading Lesson 2, write your own one-paragraph requirement statement for the Hartwell ask,
covering: scope (which servers), baseline (what "hardened" will be measured against), detection
target (what pattern the rule should catch), and deliverable (what you'll actually hand to Dale).
Compare it against the example above.

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: why does the phishing near-miss
point specifically at "failed sign-ins followed by a success" as the detection target, rather than
some other pattern — and why is scoping to four servers a defensible choice instead of a cop-out?
