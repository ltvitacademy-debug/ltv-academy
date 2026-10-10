# Lesson 28 — Apex Best Practices and Design Patterns

**Chapter 4 · Governor Limits and Design · Lesson 28 of 43**

## What you'll learn

- A consolidated checklist of Apex best practices drawn from earlier chapters
- Why "best practice" in Apex usually means "avoids a specific, known failure mode," not an arbitrary style preference
- What a design pattern is, in the Apex community's practical sense
- Why hardcoded Ids are a recurring, avoidable source of bugs across sandboxes and orgs
- How this lesson sets up the Selector/Service layering pattern in Lesson 29

## Best practices are failure modes with names

Every "best practice" covered so far in this course exists because it prevents a specific, observed way Apex code breaks:

- **Bulkify everything** (Chapter 3, and Lesson 27): never put a SOQL query or DML statement inside a loop, because real data arrives in batches, not single records.
- **Avoid recursive triggers** (Lesson 24): guard against a trigger's own DML re-firing itself unexpectedly.
- **One trigger per object per event** (Lesson 22): keep execution order predictable when multiple pieces of automation touch the same object.
- **Handle exceptions deliberately** (Lesson 15): catch specific exception types where you can meaningfully recover, and don't let a `catch (Exception e) {}` block silently swallow real problems.
- **Check `isSuccess()` / inspect errors on partial-success DML** (Lesson 12): `Database.insert(records, false)` can silently skip failed records if you don't check the result.

None of these are stylistic opinions — each one maps directly to a bug you can reproduce.

## Avoid hardcoded Ids

A specific, very common mistake worth calling out on its own: never hardcode a record Id, a RecordType Id, or a Profile Id directly into Apex code as a literal string.

```apex
// DON'T DO THIS
if (acc.RecordTypeId == '012000000000AAA') { ... }
```

Record Ids are **not guaranteed to be the same across sandboxes, scratch orgs, and production**. Code deployed from a sandbox where a RecordType Id happened to be `012000000000AAA` will silently misbehave in production, where that same RecordType has a different Id — with no compile error to warn you, since the string is syntactically valid, just factually wrong in the new environment. The fix is to look up the value you need at runtime (e.g., query `RecordType` by `DeveloperName`, which is stable across environments) instead of embedding an environment-specific Id as a literal.

```apex
Id serviceRecordTypeId = Schema.SObjectType.Case.getRecordTypeInfosByDeveloperName()
    .get('Service_Request').getRecordTypeId();
```

## What "design pattern" means in Apex practice

A design pattern, in the general software sense, is a reusable, named solution to a recurring structural problem — not a Salesforce-specific feature, but a way of organizing code that the broader developer community has converged on because it works. In Apex, a few patterns show up constantly in professional codebases:

- **The trigger handler pattern** (Lesson 21) — delegate trigger logic to a handler class instead of writing logic directly in the trigger body.
- **Separation of concerns** — keeping data-access code, business-rule code, and presentation-facing code in distinct classes rather than one giant class that does everything.
- **The Selector/Service/Domain layering pattern** — a specific, widely-used convention for organizing where SOQL, business logic, and object-specific behavior each live, which Lesson 29 covers in depth.

These patterns are community conventions — some originated from specific open-source Apex frameworks (like the Apex Enterprise Patterns / fflib library) — rather than a structure Salesforce itself mandates. You'll see experienced Apex teams use variations of them, but there's no single "official" layered architecture enforced by the platform.

## Why this matters heading into Lesson 29

Everything in this lesson has been about writing individual pieces of Apex correctly. Lesson 29 shifts up a level: once you have more than a handful of classes, *where* you put query logic versus business logic versus trigger-handling logic starts to matter just as much as whether any single piece of code is correct.

## Key terms

| Term | Meaning |
|---|---|
| Best practice | A convention that exists specifically to avoid a known, reproducible failure mode |
| Hardcoded Id | A literal record/RecordType/Profile Id embedded in code, which breaks across environments |
| Design pattern | A reusable, named solution to a recurring code-organization problem |
| Separation of concerns | Keeping distinct responsibilities (data access, business logic, presentation) in distinct classes |

## Lab

Review a trigger handler class you wrote for an earlier chapter's lab (Chapter 3). Go through this lesson's checklist against it: is every SOQL query and DML statement outside any loop? Are there any hardcoded Ids? Is there a `catch` block that silently swallows exceptions? Write down what you find, and fix at least one real issue if you find one.

## Check yourself

Can you explain, with a concrete example, why a hardcoded RecordType Id that works correctly in a sandbox can silently break in production? Can you name three of this course's best practices and the specific failure each one prevents?
