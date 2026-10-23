# Lesson 14 — Capstone: Scoping the Implementation

**Chapter 4 · Capstone Kickoff · Lesson 14 of 26**

## What you'll learn

- How to turn Lesson 13's requirements document — conflicts included — into a real, time-boxed
  Phase 1 scope
- The actual resolution to the St. Catherine's/Lakeshore/Prairie View categorization conflict, and
  why it's a compromise, not a win for one side
- What gets explicitly deferred out of Phase 1, and the honest reason for each deferral
- How Phase 1 fits inside the board's eighteen-month consolidation window from Lesson 12
- Why Prairie View's trust concern gets a project-plan answer, not just a reassuring sentence

## Scoping is a decision, not a deadline

Scoping isn't picking a date and working backward — it's deciding, deliberately and in writing,
what's in this phase and what isn't, and being able to defend both halves of that list. Lesson 13
handed you a requirements document with one open conflict clearly flagged: three hospital systems
whose ticket-categorization habits don't map onto each other. That conflict doesn't get resolved by
avoiding it in the scoping conversation — it gets resolved first, because every other scoping
decision in this chapter depends on it.

## Resolving the categorization conflict

The resolution isn't "pick St. Catherine's scheme because it's the most detailed" or "pick
Prairie View's because it's the simplest to build." It's a two-layer design: one shared, corporate-
level top category list — Hardware, Software, Access, Facilities-Adjacent, Other — that every
domain uses, sitting above a layer of domain-specific subcategories that each hospital system
configures for itself within Domain Separation. St. Catherine's keeps its multi-tier detail as
subcategories under the shared top level, so its reporting still works. Lakeshore keeps local
control over its own subcategory list, satisfying its governance concern. Prairie View gets a real
starting structure instead of free text, without being forced into St. Catherine's full depth on
day one. Nobody gets everything they asked for, and that's the honest, correct outcome of a real
conflict — not a design failure.

## What's in Phase 1

Phase 1 — the scope this capstone actually builds in Chapter 5 — is the unified Service Desk's
core: incident management and request management on one shared service catalog front door, built on
the shared top-category/domain-subcategory model above, with domain-scoped ticket queues so a
Lakeshore agent sees Lakeshore's tickets and a Meridian executive can see a rollup across all three.
It includes a basic reporting layer at both the domain level and the corporate level — enough for
each system to run its own operations and for Meridian to report upward — and a defined training
and go-live plan for all three systems, sequenced rather than simultaneous.

## What's explicitly deferred, and why

Three things are deliberately out of Phase 1, each for a stated reason, not because they're
unimportant. HR service delivery and facilities management are deferred because Technical
Architecture scoped them as later phases of the same eighteen-month rollout, and bundling them into
this workstream would reintroduce exactly the all-at-once risk Lesson 12 scoped this chapter to
avoid. Advanced reporting and analytics dashboards beyond the basic domain-and-corporate rollup are
deferred because they depend on a Service Desk that's already live and generating real data — building
them first would mean designing against guesses. And a virtual agent or chatbot front end is
deferred because it adds a whole new support surface on top of a platform that hasn't gone live
anywhere yet — exactly the kind of scope creep a real implementation plan has to name and set aside
on purpose.

## A timeline that respects Prairie View's history

Lesson 13 made Prairie View's process concern a real requirement, not a soft one, and a scoping
document that ignores it hasn't actually resolved the conflict — it's just moved it downstream.
Against the board's eighteen-month window, this capstone sizes Phase 1 at roughly the first four to
five months: discovery and build first, then a staged go-live — starting with a pilot at one
system, incorporating what's learned, then rolling out to the remaining two — rather than a single
simultaneous cutover across all three. Each system's legacy process stays live and fully supported
until its own go-live date; nothing gets switched off out from under anyone before its replacement
is actually working. That sequencing, stated in the plan itself rather than promised verbally in a
meeting, is the real answer to "prove this isn't last time."

## Key terms

| Term | Meaning |
|---|---|
| Phase 1 scope | The specific, written boundary of what this workstream delivers now, agreed in advance |
| Deferred item | Work deliberately excluded from the current phase, with a stated reason, not an oversight |
| Shared top-category model | One corporate-level category list with domain-specific subcategories beneath it |
| Staged go-live | Rolling out to one system first, then the rest, instead of one simultaneous cutover |

## Check yourself

A Prairie View stakeholder asks why HR service delivery and facilities management aren't part of
this phase, given that the architecture already supports them. Using this lesson's reasoning —
not just "we ran out of time" — explain why deferring them is the correct scoping decision for
Phase 1, and what specifically in the plan addresses Prairie View's concern about being left behind
again.
