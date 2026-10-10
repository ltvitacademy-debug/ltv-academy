# Lesson 8 — Batch Apex Scope and State

**Chapter 2 · Working With Async Jobs · Lesson 8 of 16**

## What you'll learn

- Why Batch Apex is stateless by default, and what that means for instance variables
- How `Database.Stateful` changes that, and exactly what it does and doesn't preserve
- A worked example: counting records processed across every chunk
- How to decide whether a given batch job actually needs `Database.Stateful`

## Stateless by default

Lesson 5 established that every call to `execute` in a Batch Apex job is its own separate transaction. By default, that also means the batch job is **stateless**: any instance member variable you set in one chunk's `execute` call is *not* guaranteed to carry its value into the next chunk's `execute` call. Each chunk effectively starts fresh.

```apex
public class CountCasesBatch implements Database.Batchable<sObject> {
    // Without Database.Stateful, DO NOT rely on this surviving between chunks.
    public Integer casesProcessed = 0;

    public Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator('SELECT Id FROM Case');
    }

    public void execute(Database.BatchableContext bc, List<Case> scope) {
        casesProcessed += scope.size(); // resets between transactions without Database.Stateful
    }

    public void finish(Database.BatchableContext bc) {
        System.debug('Cases processed: ' + casesProcessed); // unreliable without Database.Stateful
    }
}
```

## `Database.Stateful`: opting into carrying state

Adding `Database.Stateful` to the class declaration (alongside `Database.Batchable<sObject>`) tells the platform to preserve instance member variables' values across transactions:

```apex
public class CountCasesBatch implements Database.Batchable<sObject>, Database.Stateful {

    public Integer casesProcessed = 0;

    public Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator('SELECT Id FROM Case');
    }

    public void execute(Database.BatchableContext bc, List<Case> scope) {
        casesProcessed += scope.size(); // now reliably accumulates across chunks
    }

    public void finish(Database.BatchableContext bc) {
        System.debug('Cases processed: ' + casesProcessed); // accurate total
        // A common finish() pattern: email the final count to an admin.
    }
}
```

With `Database.Stateful` in place, `casesProcessed` accumulates correctly across every chunk, and `finish` sees the true running total.

## What `Database.Stateful` does — and doesn't — preserve

Only **instance member variables** are preserved — fields declared on the class itself, like `casesProcessed` above. A `static` variable is not what `Database.Stateful` preserves (statics behave according to their own separate rules and shouldn't be relied on for this purpose). If your batch class needs a running total, an accumulating list of error messages, or any other value that has to survive from one chunk's `execute` call to the next, it needs to be an instance member, and the class needs to declare `Database.Stateful`.

## When you actually need it

Not every batch job needs `Database.Stateful`. If every chunk's work is fully independent — update each record in `scope` based only on fields already on that record, with no running total or shared counter needed — a stateless batch is simpler and has nothing extra to think about. Reach for `Database.Stateful` specifically when you need to:

- Count or summarize something across the whole job (like `casesProcessed` above).
- Accumulate a list of records that failed processing, to report in `finish`.
- Track any other value that genuinely needs to persist from one chunk to the next.

Adding `Database.Stateful` when you don't need it isn't harmful, but it's one more thing to reason about — default to stateless unless you have a specific value that needs to survive across chunks.

## Key terms

| Term | Meaning |
|---|---|
| Stateless (default) | Instance variables are not reliably preserved between a Batch Apex job's chunk transactions |
| `Database.Stateful` | Marker interface that preserves instance member variables' values across all of a batch job's transactions |
| Instance member variable | A field declared on the class itself — the only kind of value `Database.Stateful` preserves |

## Lab

Take the `ArchiveOldCasesBatch` class you wrote in Lesson 5's lab and add an instance variable `Integer errorCount` that increments whenever a record in a chunk fails to save (wrap the `update scope;` call in a try/catch for this). Add `Database.Stateful` to the class declaration, and write a `finish` method that debugs the final `errorCount` — explain in one sentence why this wouldn't give an accurate total without `Database.Stateful`.

## Check yourself

Can you explain, without looking it up, why a batch job's instance variables don't reliably carry values between chunks by default? Can you name two concrete use cases where `Database.Stateful` is genuinely needed, and one where a stateless batch is perfectly fine?
