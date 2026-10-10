# Lesson 38 — Apex Code Review Checklist

**Chapter 5 · Applied Apex · Lesson 38 of 43**

## What you'll learn

- A practical, consolidated checklist for reviewing someone else's (or your own) Apex before it ships
- Why each checklist item maps back to a specific lesson earlier in this course
- How to review a trigger handler specifically, versus a general-purpose class
- What a reviewer should flag versus what's a reasonable judgment call
- How to use this checklist on a real pull request, not just in the abstract

## Why a checklist, and why now

Chapters 1 through 4 taught the individual pieces: types, collections, SOQL/DML, triggers, governor limits, security. Chapter 5 so far has been about applying them together in realistic projects. A code review checklist is the natural next step — it's the same knowledge, reorganized as the specific questions an experienced reviewer actually asks when reading someone else's Apex for the first time.

## The checklist

**Bulkification (Lesson 23, Lesson 27)**
- Is there a SOQL query or a DML statement inside a `for` loop? This is the single most common, most serious finding.
- If the code is a trigger, does it correctly assume it could receive up to 200 records in `Trigger.new`, not just one?

**Data access (Chapter 2)**
- Does DML that could partially fail use `Database.insert(records, false)` with its result actually checked (`isSuccess()`, `getErrors()`), rather than a plain `insert` that would throw and roll back the whole batch on one bad record — or vice versa, depending on what the business actually wants?
- Are relationship queries (Lesson 13) using the right direction — dot notation for parent lookups, a subquery for child relationships — rather than issuing a second separate query that didn't need to be separate?

**Triggers (Chapter 3)**
- Is there more than one trigger on the same object and event (Lesson 22)? If so, that's a finding — execution order across multiple triggers isn't guaranteed.
- Is there a recursion guard (Lesson 24) anywhere this trigger's own DML could cause it to re-fire itself?
- Is logic living directly in the trigger body instead of a handler class (Lesson 21)?

**Governor limits and design (Chapter 4)**
- Any hardcoded Ids — record Ids, RecordType Ids, Profile Ids (Lesson 28)?
- Is `with sharing`, `without sharing`, or `inherited sharing` chosen deliberately, and does the choice make sense for what this class does (Lesson 31)?
- If this code is reachable by an end user (a controller, a REST service), is CRUD/FLS actually enforced, not just sharing (Lesson 31)?

**Exception handling (Lesson 15, Lesson 16)**
- Is there an empty `catch (Exception e) {}` block anywhere, silently swallowing a real problem?
- Are custom exceptions used where they add real clarity, rather than catching everything as a generic `Exception`?

## Reviewing a trigger handler specifically

A trigger handler review should always start by confirming the handler takes the full `Trigger.new` / `Trigger.oldMap` (or equivalent) rather than being written as if it only ever receives one record — that single assumption, if wrong, invalidates almost everything else about the review. From there, work down the checklist above in order: bulkification first, then data access, then everything else.

## Flag vs. judgment call

Some items on this checklist are hard rules — a SOQL query inside a loop is always a finding, with no legitimate exception. Others are judgment calls a reviewer should raise as a question rather than a demand: whether a given situation genuinely needs the full Selector/Service layering from Lesson 29, for instance, depends on the actual complexity of that specific piece of automation, and a reasonable reviewer might disagree with the author's choice without it being wrong.

## Key terms

| Term | Meaning |
|---|---|
| Code review checklist | A consolidated, specific set of questions a reviewer checks against real code before it ships |
| Hard rule | A checklist item with no legitimate exception, such as SOQL/DML inside a loop |
| Judgment call | A checklist item where a reasonable disagreement between author and reviewer is legitimate |

## Lab

Take the Case routing handler you built in Lesson 34's lab. Run it against every item in this lesson's checklist, writing down a pass/fail/not-applicable for each one, and fix anything that genuinely fails. Then do the same for one other lab from an earlier chapter of your choice.

## Check yourself

Which single checklist item in this lesson would you check first when reviewing an unfamiliar trigger handler, and why does it matter more than the others? Can you give an example of a checklist item that's a hard rule versus one that's a legitimate judgment call?
