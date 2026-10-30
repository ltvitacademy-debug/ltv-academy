# Lesson 15 — Handling the Compliance Officer's Follow-Up Question

**Chapter 1 · Intermediate Capstone: Multi-Source Detection and a Real Misconfiguration · Lesson 15 of 16**

## What you'll learn

- Why a real compliance follow-up question goes beyond "is this instance fixed"
- The difference between reassurance and evidence, and why only one of them actually answers the question
- How a one-time remediation check and a standing control answer two different halves of the same question
- Why "we fixed this one" is true but incomplete on its own

## The question

After the presentation in Lesson 14, Renee asks the obvious next question, the one a competent
compliance officer is supposed to ask: **"How do we know this is the only firewall rule with this
problem?"** It's a fair question, and "we fixed this one" doesn't answer it — fixing the rule that
got caught says nothing about whether the same kind of gap exists somewhere else nobody's looked
at yet.

## Why reassurance alone fails here

A weaker answer sounds like: "We're confident this won't happen again, we'll be more careful." That's
reassurance, not evidence — it gives Renee nothing to actually verify, and a compliance officer's
job is specifically to require evidence over confidence. Mara's answer needs two concrete parts,
each covering a different half of the question.

## Part 1: the one-time check

Before closing the incident, Mara ran a one-time audit of every currently configured firewall
rule's source scope against its documented justification — the same comparison that caught
`ALLOW-VENDOR-RDP-SUPPORT`'s mismatch, applied to every other rule on the perimeter firewall. That
audit found no other rule with this same class of gap right now. This answers the immediate part
of Renee's question with a checked fact, not a guess.

## Part 2: the standing control

The one-time audit only answers "right now." Renee's question also implies "and going forward?" —
which is exactly what the two-part control from Lesson 12 answers: every new rule or scope change
now requires documented justification and a second reviewer before going live, and a periodic
review keeps re-checking existing rules on an ongoing basis, not just this once.

## Putting the answer together

Mara's actual answer to Renee combines both parts plainly: "We checked every other rule against
its documented scope before closing this out, and found nothing else like it right now. Going
forward, every rule change requires a documented justification and a second reviewer before it
goes live, and we're auditing existing rules on a recurring schedule — so this isn't just a
one-time fix, it's a checkable process." That's answerable with evidence on both halves, not a
promise on either.

## Why this distinction matters beyond this one conversation

Any security program will eventually get a version of "how do you know this is the only one."
Having both a completed one-time check and a named standing control ready — not invented in the
moment — is what turns a hard question into a straightforward one.

## Key terms

| Term | Meaning |
|---|---|
| Remediation audit | A one-time check confirming no other instance of a found gap currently exists |
| Standing control | An ongoing process change meant to prevent or surface future instances |
| Evidence vs. reassurance | A checkable fact versus an unverifiable promise |

## Lab

Write the one-paragraph answer to "how do we know this is the only rule with this problem," using
both the one-time audit result and the standing control, in your own words.

## Check yourself

You're ready for Lesson 16 when you can name the two parts of a credible answer to this question
and explain what each one proves that the other doesn't.
