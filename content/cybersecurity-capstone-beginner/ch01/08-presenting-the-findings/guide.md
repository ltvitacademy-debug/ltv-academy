# Lesson 8 — Presenting the Findings to the IT Manager

**Chapter 1 · Beginner Capstone: Baseline Security Hardening and the First Detection Rule · Lesson 8 of 10**

## What you'll learn

- Why presenting security work to a non-security manager is a different skill than doing the
  work itself
- A simple structure for the conversation: answer first, proof second, live demo third
- How to show the Sentinel rule firing on Lesson 6's test data without losing a non-technical
  audience in KQL syntax

## Building it was the easy part

Everything from Lesson 2 through Lesson 7 — the scoped checklist, the hardened servers, the
tested detection rule, the runbook — exists to support one 15-minute conversation with Dale.
That conversation is where the project either lands as something Dale trusts and keeps funding,
or as a pile of technical work he can't evaluate and half-trusts at best. A technically correct
project, presented badly, still under-delivers on the ask; a modest project, presented clearly,
earns the credibility to do more.

## Lead with the answer, not a tour

The biggest mistake in presenting security work to a manager is walking through every setting
changed on every server, in order, before saying what it actually means for Hartwell. Dale
doesn't need a line-by-line account of `sshd_config`; he needs to know Hartwell is measurably
safer than it was, and specifically how. Mara opens with the headline, in one sentence, before
showing anything:

> "Your four servers are now hardened to an industry-standard checklist, and we have a working
> alert that would have caught someone actually using a phished password — the exact scenario
> from two weeks ago."

Only after that does the walkthrough move to supporting detail, and only as much as the
conversation calls for:

1. **The headline** (15–20 seconds): what got done, stated as a sentence, not a list of commands.
2. **The "how"** (1–2 minutes): the four servers, the baseline standard applied (CIS Level 1), and
   the one detection rule — at the level Dale can actually evaluate, not the KQL itself.
3. **The proof, live** (2–3 minutes): a real demonstration, not just a claim.

## Demonstrating the rule, not just describing it

Describing a detection rule to a non-technical manager is far less convincing than watching it
work. Mara re-runs one of Lesson 6's `datatable` test scenarios live in Sentinel during the
meeting — the one that should fire — and shows Dale the resulting alert appear, including the
`UserPrincipalName` and `IPAddress` entity mapping on the incident. She also runs the scenario
that should *not* fire, and shows that it correctly produces nothing. Seeing both — the rule
catching the real pattern and staying quiet on a normal typo — does more to build Dale's trust
than any slide could, because it answers the unspoken worry every manager has about a new
detection rule: *is this going to bury my team in false alarms?*

## Translating technical proof into business language

Dale doesn't need to understand `join kind=inner` or `bin(TimeGenerated, 10m)` to trust the
result. Mara translates each piece of proof into what it means for him:

- "The rule looks for someone guessing wrong several times and then getting it right — which is
  what it looks like when a stolen password actually gets used."
- "We tested it against three scenarios, including a normal mistyped password, and confirmed it
  only fires on the real pattern — so your team won't get paged for every typo."
- "Everything is written down in a runbook, so this isn't something only I can maintain."

That last point matters specifically because it answers Lesson 1's underlying worry: Dale didn't
just want a one-time fix, he wanted to stop finding out about problems after the fact — and a
documented, demonstrated, working rule is the concrete answer to that.

## Key terms

| Term | Meaning |
|---|---|
| Headline-first structure | Stating the result before walking through supporting technical detail |
| Live demonstration | Showing a system actually work during the conversation, rather than only describing it |
| Translating to business language | Restating a technical result in terms of the risk it addresses, for a non-technical audience |

## Lab

Write out, word for word, the one-sentence headline you would say first to Dale (using this
lesson's example as a model), then outline the 1–2 minute "how" you'd give right after it.
Practice saying both out loud in under two minutes total.

## Check yourself

You're ready for Lesson 9 when you can explain why showing the rule fire on real test data
matters more than describing the KQL logic, and why that live demonstration directly answers the
unspoken worry behind "will this bury my team in false alarms?"
