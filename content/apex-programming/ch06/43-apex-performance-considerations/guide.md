# Lesson 43 — Apex Performance Considerations

**Chapter 6 · Apex Beyond the Basics · Lesson 43 of 43**

## What you'll learn

- A capstone review of every performance principle taught across this course, pulled into one place
- Why choosing the right collection type is itself a performance decision, not just a syntax choice
- A conceptual overview of when to reach for asynchronous Apex instead of synchronous
- How to think about performance as a design question you ask before writing code, not a fix you apply after
- What's genuinely next after this course, for a developer who wants to go deeper

## Pulling the threads together

This is the last lesson of Apex Programming, and it's deliberately a synthesis lesson rather than a new topic. Every performance idea here was taught somewhere earlier in the course — what's new is seeing them as one connected way of thinking, rather than a list of separate rules.

- **Bulkify everything** (Chapter 3, Lesson 27): never put a SOQL query or DML statement inside a loop. This is still, by a wide margin, the single highest-impact habit in this entire list.
- **Know your governor limits, and check them when it matters** (Chapter 4): the `Limits` class lets code defensively check its own consumption rather than guessing.
- **Choose the right collection for the job** (Lesson 4, revisited here): a `Set<Id>` for membership checks (`contains()` is efficient and the data has no meaningful order or duplicates); a `List` when order or duplicates matter; a `Map<Id, SObjectType>` anytime you need to look a record up by Id repeatedly, instead of searching a `List` linearly or — worse — re-querying.
- **Centralize queries and business logic deliberately** (Lesson 29): Selector/Service layering doesn't make code faster by itself, but it makes it much easier to find and fix a performance problem once your codebase has more than a few classes.
- **Avoid hardcoded, environment-specific values** (Lesson 28): not a performance issue directly, but a correctness issue that often surfaces as a confusing production-only failure, which costs real debugging time.

## Collection choice as a performance decision

A concrete example worth internalizing: checking whether a given Id exists in a collection of 10,000 Ids.

```apex
// Inefficient: List.contains() on a large list performs a linear scan
List<Id> idList = /* 10,000 Ids */;
Boolean found = idList.contains(someId); // scans up to 10,000 entries

// Efficient: Set.contains() is the appropriate structure for membership checks
Set<Id> idSet = new Set<Id>(idList);
Boolean foundFast = idSet.contains(someId);
```

Both compile, and both produce the correct answer — the difference is entirely about choosing the collection whose design actually matches what you're doing with it, which is exactly why Lesson 4 introduced `Set` as a distinct type instead of treating it as just "a List without duplicates."

## When to reach for asynchronous Apex

Lesson 35 introduced Batch Apex for large-volume work that doesn't fit one transaction. Two other asynchronous tools are worth knowing conceptually as you move beyond this course:

- **`@future` methods** — a simple way to run a method asynchronously, useful for offloading something like an HTTP callout (which isn't allowed from most trigger contexts) outside the main transaction.
- **Queueable Apex** (`implements Queueable`) — similar to `@future`, but supports more complex parameter types (objects, not just primitives) and can be chained, one job enqueueing another.

The common thread across all async Apex tools is the same reason Lesson 26 gave for asynchronous Apex getting different governor limits: work that doesn't need to finish before the user sees a response doesn't have to compete for the same real-time resources as work that does.

## Performance as a design question, not a fix

The habit this course wants you to leave with: ask "how will this behave at 200 records, not just 1?" *while designing* a trigger, a batch job, or a controller method — not after it fails in production. Every pattern in this lesson is cheap to apply from the start and expensive to retrofit once a feature is already built around the wrong assumption.

## What's next after this course

This course covered Apex as a language and its core data/trigger/governor-limit patterns. A Salesforce Architect's path from here typically continues into Lightning Web Components (the modern UI layer Apex methods like the ones in Lesson 41 commonly serve), Salesforce DX and CI/CD for how Apex actually gets built and deployed by a team, and integration patterns for how Apex fits into a broader enterprise architecture — all natural next steps once this course's fundamentals are solid.

## Key terms

| Term | Meaning |
|---|---|
| `@future` method | A simple asynchronous Apex method, useful for offloading callouts or other work outside the main transaction |
| Queueable Apex | An asynchronous Apex tool supporting richer parameter types and job chaining, an alternative to `@future` |
| Performance-by-design | Considering bulk behavior while designing code, rather than retrofitting it after a limit failure in production |

## Lab

Take any trigger handler you built in an earlier chapter's lab. Rewrite one part of it, if any exists, that uses a `List.contains()` check inside a loop to instead use a `Set` built once outside the loop. Then write a short paragraph (as if explaining to a teammate in a code review) describing one performance principle from this lesson that the original code either followed well or violated.

## Check yourself

Why is `Set<Id>.contains()` a better performance choice than `List<Id>.contains()` for a large collection used purely for membership checks? Can you name, from memory, the single highest-impact performance habit taught across this entire course?
