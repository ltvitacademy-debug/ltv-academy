# Lesson 28 — Capstone Kickoff

**Chapter 6 · Capstone · Lesson 28 of 32**

## What you'll learn

- The capstone project you'll build across Lessons 29–31
- Exactly what "done" looks like, as a concrete checklist
- Why this project is scoped around one tool, not many
- How each earlier chapter maps onto one specific part of the build

## The project: a refund agent, built the way this course argued for

Across three lessons, you'll build one project: a support agent that can
look up an order and issue a refund — small enough to finish, real enough
that every safety pattern from Chapters 4 and 5 has an actual job to do.
It is deliberately *not* a sprawling multi-tool system. A single
consequential tool (`issue_refund`) alongside one read-only one
(`get_order`) is enough surface area to apply approval checkpoints,
audit logging, stopping conditions, and sandboxing for real, without the
build ballooning into something you can't finish in three lessons.

## What "done" looks like

```
[ ] get_order (read-only) and issue_refund (consequential) tools,
    with real tool_use / tool_result schemas
[ ] An approval checkpoint on issue_refund (Lesson 19's design)
[ ] Rejections handled as tool_result + is_error (Lesson 19)
[ ] An audit log entry for every call, approved or rejected
[ ] A max-iteration + max-repeat-call stopping condition
[ ] A per-task cost budget and a one-record action-scope limit
[ ] Credentials scoped to refunds:write, orders:read only
```

That's the full checklist across all three build lessons — Lesson 29 covers
the first three items, Lesson 30 the audit/limits/sandboxing items, and
Lesson 31 turns the finished build into something actually deployable.

## Why one tool pair, done completely, beats five tools done halfway

A tempting instinct for a capstone is to add more tools to make it look
more impressive. Resist that here. The entire point of this project is to
demonstrate that every control from Chapters 4 and 5 is *real* and
*wired up*, not described in a paragraph — an approval checkpoint that
actually blocks execution, an audit log that actually has entries, a
budget that actually stops the loop. A five-tool agent with none of those
controls fully working teaches less than a two-tool agent where they all do.

## Mapping chapters to build steps

```
Ch 2 (tool schemas)   -> get_order / issue_refund definitions
Ch 4 (approval)       -> checkpoint + is_error rejection on issue_refund
Ch 5 (safety)         -> stopping conditions, budget, sandboxing, audit
Ch 5 L27 (monitoring) -> what you'd watch once this ran in production
```

Nothing in this capstone introduces a new concept — every piece is a
direct application of something Lessons 6 through 27 already covered. The
work now is building it, not learning it.

## Key terms

| Term | Meaning |
|---|---|
| Capstone scope | The deliberately small, two-tool project (get_order, issue_refund) used to apply every control from Chapters 4–5 |
| Done checklist | The concrete list of working features that defines capstone completion, not a vague goal |
| Consequential tool | `issue_refund` — the one tool in this project that needs approval, logging, and scope limits |

## Check yourself

Before starting Lesson 29, write out in your own words why `get_order`
doesn't need an approval checkpoint but `issue_refund` does — referencing
the rule of thumb from Lesson 18.
