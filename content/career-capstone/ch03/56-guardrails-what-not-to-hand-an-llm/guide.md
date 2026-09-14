# Lesson 56 — Guardrails — What Not to Hand an LLM

**Chapter 3 · AI for Data Engineers (Bonus) · Lesson 56 of 81**

## What you'll learn

- The hard line on what never goes into a third-party LLM prompt
- Why "sounding confident" is not the same thing as "citing a real source"
- How the mapping and RCA verification steps from Lessons 54-55 connect to a bigger responsibility
- The data engineer's actual job when AI is in the loop: verify before trusting

## The hard line: never paste this in

Every AI-assisted workflow this chapter has covered — test generation,
RCA drafts, schema mapping — worked with sanitized examples: a
transformation spec, a stack trace, a column list. That's not an
accident. A third-party LLM prompt is, for practical purposes, data
leaving your control the moment you send it. Real customer PII,
secrets, connection strings, API keys, and anything covered by Fabric
& Real-Time Analytics Lesson 61's PII handling or Lesson 62's secrets
management rules never belongs in a prompt to a hosted model, no
matter how much faster it would make the draft.

```
Never paste into a third-party LLM prompt:
- real customer names, emails, SSNs, or other real PII
- API keys, connection strings, passwords, tokens
- unredacted production data of any kind
Instead: synthetic data, masked columns, or a schema with no rows
```

## "Sounds confident" is not "is correct"

This chapter has repeated one pattern across test generation, RCA,
and schema mapping: the LLM's output reads persuasively, complete
with specific numbers and confident phrasing, whether or not it's
right. That confidence is a property of how language models generate
text, not a signal of accuracy. What actually matters is whether a
claim can be traced to something real — a lesson number, a log line,
a sample row you checked yourself — not how smoothly it reads.
Citing a real, checkable source is worth more than any amount of
fluent-sounding certainty.

```
Low value:   "This is almost certainly a null-pointer issue."
High value:  "Log line 47 shows a NullPointerException at the
             partition-read step; partition 2024-03-past-cutoff
             is confirmed empty in the source table."
```

## The responsibility doesn't move

Lessons 53 through 55 each ended the same way: draft, then verify.
That's not a formality — it's the actual job. Handing a task to an
LLM doesn't transfer responsibility for the output; the engineer who
ships a schema mapping, a test suite, or an RCA is accountable for it
whether they typed every line themselves or reviewed an AI's draft.
Treating "the AI suggested it" as an excuse for a bad outcome gets
the responsibility exactly backward.

```
1. AI drafts   -> speeds up the first pass
2. Human verifies -> against real data, real logs, real systems
3. Human ships -> and owns the outcome, regardless of who drafted it
```

## Key terms

| Term | Meaning |
|---|---|
| Data leaving your control | What happens the moment sensitive data enters a third-party LLM prompt |
| Confident-but-unverified | Output that reads persuasively without a traceable, checkable source |
| Ownership of AI-assisted work | The human who ships a draft is accountable for it, same as any other work |

## Check yourself

You're ready for Lesson 57 when you can explain, without looking:
why is "the AI suggested it" never a valid explanation for a bad
schema mapping or a bad test case shipping to production?
