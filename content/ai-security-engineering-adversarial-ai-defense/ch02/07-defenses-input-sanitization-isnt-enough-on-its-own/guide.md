# Lesson 7 — Defenses: Input Sanitization Isn't Enough on Its Own

**Chapter 2 · Prompt Injection Attacks and Defenses · Lesson 3 of 4**

## What you'll learn

- Why the instinctive fix — keyword and pattern filtering on
  incoming text — fails against prompt injection in a way it doesn't
  fail against classic injection flaws
- The specific reason natural language can't be denylisted the way a
  SQL grammar can be parameterized
- What a real, layered defense actually looks like once you accept
  there's no single input-side fix
- Why this lesson sets up the rest of the chapter: output validation
  and privilege separation, not input filtering, carry most of the
  real weight

## The instinct, and why it's reasonable

If you've spent any time on classic web application security, your
first instinct here is a good one: filter the input. Block known-bad
keywords, strip suspicious phrases like "ignore previous
instructions," reject messages that look like they're trying to
assert new authority. It's the same instinct that gives you input
validation against XSS, and it's not a bad instinct in general — it's
just insufficient here, and understanding *why* it's insufficient is
the most important idea in this lesson.

## Why keyword filtering fails against natural language

SQL injection has a fix that actually closes the hole: parameterized
queries. That works because SQL has a formal, bounded grammar — the
database can draw a hard structural line between "this is a command"
and "this is a value," and enforce it every time. Prompt injection
has no equivalent, because natural language has no bounded grammar
to parameterize against. There is no finite list of "the bad
phrases," because the same intent can be expressed in effectively
unlimited ways: paraphrased, translated into another language,
encoded (base64, Unicode homoglyphs, leetspeak substitutions),
split across multiple turns, or phrased as an innocent-sounding
hypothetical. Block one phrasing and a dozen semantically identical
ones remain unblocked, because you're not filtering a grammar — you're
trying to filter *meaning*, and meaning doesn't have a syntax checker.

This is the core architectural fact this chapter keeps returning to:
the attack surface for prompt injection is natural language itself.
You cannot denylist your way out of a surface that large. Any input
filter you build will catch the obvious, lazy attempts and miss the
ones that matter.

## Delimiting and labeling helps — but isn't a boundary

A common mitigation is to explicitly mark untrusted content when it
enters the prompt — wrapping retrieved documents or user input in
clear delimiters and instructing the model to treat anything inside
them as content to analyze, never as instructions to follow. This is
worth doing. It raises the bar. It is not a guarantee: a sufficiently
crafted piece of injected text can still attempt to talk its way out
of the delimiter, and the model's adherence to that boundary is a
matter of probability, not enforcement. Treat delimiting as a useful
layer, never as the fix.

## What a real defense looks like: layered, not singular

Because there's no single input-side fix, the only approach that
actually holds up is defense in depth, where the weight shifts away
from "catch it on the way in" toward controls that don't depend on
perfectly classifying text at all:

- **Output validation before action** — instead of only inspecting
  what comes in, inspect what the model is *about to do* before any
  consequential step executes. Does this action match what the user
  actually asked for?
- **Least-privilege tool access** — bound the damage a successful
  injection can cause by limiting what the model is capable of doing
  in the first place (the subject of Lesson 8, right after this one).
- **Human-in-the-loop approval** for consequential or irreversible
  actions — the same approval-gate pattern you saw applied to SOAR
  playbooks earlier in this path, where a high-risk automated action
  pauses for a person before it fires.
- **Monitoring and anomaly detection** — watching for behavior shifts
  and unusual instruction-like content in logs, as discussed in
  Lessons 5 and 6, rather than relying on a single filtering pass.
- **Red-teaming** — deliberately testing the system against injection
  attempts before an attacker does, which this course returns to in
  Chapter 7.

Input sanitization still belongs in that list — it's a reasonable
first layer that filters out the laziest attempts. It just can't be
the *only* layer, and treating it as sufficient is itself the
vulnerability.

## Key terms

| Term | Meaning |
|---|---|
| Denylisting | Blocking known-bad keywords or phrases — effective against a bounded grammar, not against open-ended natural language |
| Delimiting / content labeling | Marking untrusted content with explicit boundaries so the model is instructed to treat it as data, not command — a mitigation, not a guarantee |
| Defense in depth | Layering multiple, independent controls so that no single failure point compromises the whole system |
| Output validation | Checking what an action or response is about to do before it executes, rather than only filtering what came in |

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: why
does parameterized-query logic — the fix that actually solved SQL
injection — have no direct equivalent for prompt injection?
