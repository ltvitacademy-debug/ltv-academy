# Architecture Decision Records: Writing Decisions Down

Lesson 1 named this chapter's real shift: a Staff/Principal engineer's highest-leverage output is often a decision, written down, not code. This lesson covers the specific tool that makes a decision actually stick — the Architecture Decision Record (ADR) — and why "we talked about it in a meeting" is not the same thing as a decision that survives contact with a team six months later.

## What you'll learn

- What an ADR actually is, and the specific problem it solves that a meeting or a Slack thread doesn't
- The standard ADR structure: context, decision, consequences, alternatives considered
- A real worked ADR for a decision Northbeam actually has to make
- Why writing down the alternatives you rejected is often more valuable than writing down what you chose

## The problem an ADR solves

A decision made in a meeting lives in the memory of whoever was in that meeting — and memory is lossy, selective, and leaves the building when people change teams or companies. Six months later, a new engineer asks "why do we use this vector database instead of that one," and the honest answer is too often "I think there was a meeting about it, let me ask around." That's not a documented decision; it's an oral tradition, and oral traditions get revised, misremembered, and eventually just re-litigated from scratch — wasting real engineering time re-deciding something that was already decided once.

An **Architecture Decision Record (ADR)** is a short, durable, written document that captures one specific decision: what was decided, why, what the alternatives were, and what trade-offs were explicitly accepted. It lives in the codebase or a shared decision log, not in anyone's memory, and it's written once, close to when the decision was made — not reconstructed from memory later.

## The standard ADR structure

```markdown
# ADR-014: Vector Database Selection for the Support Assistant

## Status
Accepted

## Context
Northbeam's support assistant needs a vector database to store and
query document embeddings for retrieval. Current scale: ~2M queries/
day, growing ~15%/month. Must support metadata filtering (by product
line and document access level) and stay within a $15K/month
infrastructure budget for this component.

## Decision
We will use [Vector DB X] for the support assistant's retrieval layer.

## Consequences
- Positive: native metadata filtering avoids a separate post-filter
  step; managed service means no in-house operational burden.
- Negative: locks us into this vendor's specific API; migrating later
  would require re-indexing ~40M embeddings, estimated at 2 engineer-weeks.
- Negative: at projected month-18 volume, cost crosses our $15K/month
  budget line — a review is scheduled for month 12 to reassess.

## Alternatives Considered
- [Vector DB Y]: cheaper at current scale, but no native metadata
  filtering — would require a slower, less accurate post-filter step.
- Self-hosted [open-source option]: no vendor lock-in and lower
  long-run cost, but requires in-house operational expertise the team
  does not currently have; revisit if team grows.
```

Every section earns its place: **Context** gives a future reader the situation as it actually was, not as it looks in hindsight. **Decision** is a single clear sentence — no hedging. **Consequences** names the real trade-offs accepted, including the negative ones, honestly. **Alternatives Considered** is the section most ADRs skip and the one that matters most.

## Why the rejected alternatives matter more than the decision itself

The single most common thing a Staff/Principal engineer is asked to defend isn't "what did we choose" — it's "why didn't we choose the other thing." Writing down the alternatives considered, and specifically *why* each one was rejected, means that question has a ready, written answer instead of requiring the original decision-maker to reconstruct their reasoning from memory, possibly after they've left the team or forgotten the specifics themselves. It also protects against a genuinely wasteful failure mode: a new engineer, unaware a path was already evaluated and rejected for good reason, re-proposing it eight months later and the team spending real time re-deriving the same conclusion.

## Key terms

| Term | Meaning |
|---|---|
| Architecture Decision Record (ADR) | A short, durable written document capturing one specific technical decision, its context, and its trade-offs |
| Alternatives Considered | The ADR section documenting rejected options and why — often more valuable than the decision itself |

## Check yourself

Why is "we discussed it in a meeting and decided" not an adequate substitute for a written ADR, even when the decision made was the right one?
