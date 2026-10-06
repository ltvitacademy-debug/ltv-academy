# Business Logic Overview

**Chapter 3 · Business Logic · Lesson 13 of 24**

Chapters 1 and 2 gave your custom application a shape: objects, relationships, fields, page layouts, and Lightning pages. Shape alone doesn't make it an application a business can run on — it just makes it a place to type data in. **Business logic** is everything that makes the app enforce the rules a real business actually has: required fields that depend on other fields, numbers that calculate themselves, totals that roll up from child records, and approvals that route to the right person. This lesson maps the toolbox before the next five lessons open each tool in turn.

## What you'll learn

- The five declarative business-logic tools and what each one is actually for
- Where business logic fits in Salesforce's save order (the "order of execution")
- Why "declarative first" is the Platform App Builder's default posture
- How this chapter's lessons build on each other toward Lesson 18's decision framework

## The five tools in this chapter

| Tool | What it does | Lesson |
|---|---|---|
| Validation rule | Blocks a save when data violates a rule you define | 14 |
| Formula field | Calculates a read-only value from other fields, live, on every view | 15 |
| Roll-up summary field | Aggregates (COUNT/SUM/MIN/MAX) child records up to a master | 16 |
| Approval process | Routes a record through one or more human sign-offs | 17 |
| Flow | Multi-step logic: screens, branching, loops, record changes, callouts | 17 |

Apex triggers and code sit outside this chapter on purpose. A Platform App Builder's job is to solve as much as possible with these five tools before reaching for a developer — not because code is forbidden, but because declarative tools are faster to build, easier for another admin to read later, and don't need a sandbox deployment pipeline with test coverage to change on a Tuesday afternoon.

## Where logic fits in the save

Every record save follows a fixed order. The part that matters for this chapter:

1. Salesforce's own system validations run first (required fields, data types, max length)
2. **Your validation rules run next** — if any returns `TRUE`, the save stops here
3. Before-save Apex (if any) runs
4. The record is saved
5. After-save Apex, assignment rules, and **approval process entry criteria** are evaluated
6. **Flow automation** and any resulting field updates run, which can loop back through steps 2–5

Two things fall out of this order immediately. First, a validation rule can never see a value that a later flow is about to set — it only ever evaluates what's on the record at save time. Second, formula fields and roll-up summary fields aren't really "in" this order at all: a formula field has no stored value to save, and a roll-up summary recalculates when the *child* record changes, not when someone views the parent.

## Why this chapter is sequenced this way

Validation rules and formula fields (Lessons 14–15) share one editor — the same formula builder — so they're taught back to back. Roll-up summaries (Lesson 16) depend on the master-detail relationships from Chapter 1, so object design decisions made back then directly limit what Lesson 16 can do. Approval processes and Flow (Lesson 17) both route or branch logic across steps, which is why they're introduced together before Lesson 18 asks the real question every App Builder faces on the exam and on the job: for a given requirement, which of these five tools is actually the right one.

## Recap

Business logic is the enforcement layer on top of the data model: validation rules block bad saves, formula fields calculate, roll-up summaries aggregate from children, approval processes route for sign-off, and Flow handles everything more complex than a single rule. All five are declarative, all five show up somewhere in Salesforce's save order, and the next five lessons take each one in turn before Lesson 18 ties them into one decision framework.

## Check yourself

A record is created, and a validation rule and a Flow both reference the same field. The Flow is supposed to set that field to a value that would otherwise fail the validation rule. Walk through the order of execution above and explain whether the save will succeed, and why.
