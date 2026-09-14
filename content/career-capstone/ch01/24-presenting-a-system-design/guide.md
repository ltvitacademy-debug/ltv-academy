# Lesson 24 — Presenting a System Design: Whiteboarding Like an Interview

**Chapter 1 · System Design for Data Engineers · Lesson 24 of 81**

## What you'll learn

- The four-step structure that carries almost any system design answer
- The single most common mistake — and why it happens under pressure
- What interviewers are actually listening for, beneath the diagram
- How to turn this chapter's four case studies into rehearsed material

## The structure that carries the answer

A system design interview isn't a test of whether you land on "the"
right answer — most of these problems don't have one. It's a test of
whether your *process* is sound. This chapter's four case studies
were all built the same way, in the same order, on purpose:

```
1. Clarify requirements   -- functional AND non-functional (Lesson 2)
2. Estimate the scale      -- rough numbers, out loud (Lesson 3)
3. Propose storage + processing model -- and say why (Lessons 4-5)
4. Discuss trade-offs      -- what you'd change if a constraint moved
```

Walking through these four steps, in order, out loud, is the entire
skill. Everything else — Lambda vs. Kappa, sharding, caching — is
material you plug into step 3 and 4, not a different skill.

## The most common mistake: skipping step 1

The single most common failure in a system design interview is
jumping straight to a proposed architecture before clarifying
requirements — designing a solution to a problem nobody stated. It
happens because silence feels like failure under pressure, so
candidates fill it with a diagram. But every one of this chapter's
case studies would produce a *different* design if one requirement
changed:

```
"A ride-sharing platform" -- alone, is not enough to design against

Ask first:  what's the freshness SLA for matching? (Lesson 18)
            is this single-region or global?
            what's the read/write ratio for trip history?

Only THEN propose storage, processing model, and grain.
```

Two or three good clarifying questions, asked before anything else,
signals more competence than an impressive-looking diagram built on
an assumption nobody confirmed.

## What interviewers are actually listening for

An interviewer is rarely grading the final diagram itself — they're
listening for the reasoning that produced it, because that's what
transfers to a job the diagram alone doesn't prove. Saying "I'm
choosing Kappa here because the source is durably replayable and one
codepath avoids drift" (Lesson 7's actual reasoning) is worth more
than a correct-looking box labeled "Kappa" with no justification.
Being asked "what would you do differently at 10x the scale" and
having a real answer — not panic — is the moment that actually
separates candidates.

## Turning four case studies into rehearsed material

Lessons 20-23 aren't just examples to remember — they're a template.
Practice narrating each one out loud, in the four-step structure,
without notes: requirements, estimate, proposal, trade-offs. The goal
isn't memorizing this course's specific answers; it's being able to
run the same four steps against a scenario you've never seen, because
you've rehearsed the *process* on four different ones already.

## Key terms

| Term | Meaning |
|---|---|
| The four-step structure | Clarify, estimate, propose, discuss trade-offs — in that order |
| Premature design | Proposing an architecture before requirements are clarified |
| Reasoning over result | What actually gets evaluated — the "why," not just the diagram |

## Check yourself

You're ready for Lesson 25 when you can explain, without looking: why
does jumping straight to a proposed architecture, before asking
clarifying questions, actually hurt a candidate's evaluation?
