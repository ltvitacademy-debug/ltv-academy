# Lesson 25 — Architecture Decision Records for Governance

**Chapter 5 · Governance Strategy · Lesson 25 of 30**

## What you'll learn

- What an architecture decision record (ADR) is, and why it's a short, specific document rather than a general-purpose one
- The standard ADR shape: title, status, context, decision, consequences
- Why governance architecture specifically benefits from ADRs — more than almost any other kind of decision
- When a decision is significant enough to deserve one, and when it isn't

## What an ADR actually is

An architecture decision record is a short, dated document that captures one specific decision: what was decided, the situation that made it necessary, and what trade-offs were accepted as a result. It is not a design document and not a status report — it's a historical record, written once at the time of the decision and rarely edited afterward (a later change gets its own new ADR, not an edit to the old one).

This is a widely used, lightweight practice in software and systems architecture generally, not a tool or a product. The appeal is its size: a good ADR is often one page or less, which is exactly why teams that would never finish a 40-page decision document actually keep ADRs up.

## The standard shape

Every ADR generally covers the same four things:

- **Status** — Proposed, Accepted, Deprecated, or Superseded (with a pointer to whichever ADR replaced it).
- **Context** — the situation and constraints that made a decision necessary. Not the full history — just enough that someone reading it in two years understands why this came up.
- **Decision** — what was actually decided, stated plainly.
- **Consequences** — what you gained and what you gave up. A decision with no stated downside almost always has one that just went unexamined.

## A real ADR template

```
ADR-014: Federated Governance Operating Model
Status: Accepted
Context: Business units run autonomous platforms
Decision: Federated model — central standards,
local stewardship, reviewed by the governance board
Consequences: + faster local decisions
Consequences: - central team must audit for drift
```

This is exactly the kind of decision Chapter 2's operating model lessons describe — centralized versus federated versus decentralized versus data mesh — and it's precisely the kind of decision that gets re-litigated endlessly in meetings if nobody wrote down why it was made the first time.

## Why governance architecture specifically needs these

Governance architecture is unusually full of exactly the decisions ADRs are built for: operating model choice (Chapter 2), platform selection among tools like the ones in Lesson 20, where policy enforcement lives (Lesson 19), and how security architecture draws its boundaries (Chapter 4). These decisions are expensive to reverse, easy to forget the reasoning behind, and constantly second-guessed by whoever wasn't in the original room. An ADR doesn't prevent someone from challenging the decision later — it just makes sure they're challenging the actual reasoning, not a reconstructed guess at it.

## When a decision deserves an ADR

Write one for decisions that are significant and hard to reverse: choosing an operating model, selecting a platform, setting a security boundary, granting a notable policy exception. Don't write one for routine, easily-reversed choices — that's what turns ADRs into unread busywork instead of a trusted record.

## Key terms

| Term | Meaning |
|---|---|
| ADR (architecture decision record) | A short, dated record of one specific architecture decision — context, decision, and consequences |
| Status | An ADR's current state: Proposed, Accepted, Deprecated, or Superseded |
| Context | The situation and constraints that made a decision necessary |
| Consequences | The trade-offs accepted by making the decision — both gains and costs |
| Superseded | A status meaning a newer ADR has replaced this one's decision |

## Lab

Pick one real architecture decision from earlier in this course — an operating model choice, a platform choice, or a policy exception — and write it as a complete ADR using the four-field template above: title and status, context, decision, and consequences (both a gain and a cost).

## Check yourself

Can you list the four parts of a standard ADR from memory, and explain why "Decision: use the federated model" without a Consequences section is an incomplete ADR?
