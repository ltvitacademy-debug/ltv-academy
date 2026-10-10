# Lesson 10 — Performance Troubleshooting

**Chapter 2 · Measuring and Diagnosing · Lesson 10 of 16**

## What you'll learn

- A repeatable method for diagnosing "it's slow" reports, tying together every Chapter 2 tool
- Why reproduction has to come before any fix, no matter how obvious the cause looks
- How to tell a limit-exception failure apart from a merely-slow-but-successful transaction
- A worked example applying the method end to end

## A method, not a guess

By this point in the chapter you have four distinct diagnostic tools: debug logs with cumulative limit usage (Lesson 7), the Developer Console's Query Plan/Execute Anonymous/Logs tab (Lesson 8), Event Monitoring for org-wide patterns (Lesson 9), and the governor limit and scalability vocabulary from Chapter 1. Performance troubleshooting is the discipline of applying them in a consistent order instead of jumping straight to a guess about the cause:

1. **Reproduce the problem with evidence, not a description.** "It's slow" is not enough to act on. Get a specific scenario (which record, which user, which action) and, ideally, capture a debug log or pull an Event Monitoring record of the actual slow transaction. A description without reproduction risks fixing the wrong thing.
2. **Classify the failure mode.** Is this a hard failure (a governor limit exception, visible in the debug log as a thrown `LimitException`) or a soft failure (the transaction succeeds, but takes longer than it should)? These point to different next steps — a limit exception means something crossed a hard ceiling; a slow-but-successful transaction means something is inefficient but hasn't yet crossed a line.
3. **Locate where the time or limit usage actually went.** Use the Logs tab's Execution Overview (Lesson 8) to see which category (Apex, Workflow/Flow, Database) dominates, or the CUMULATIVE_LIMIT_USAGE block (Lesson 7) to see which specific limit is closest to its ceiling.
4. **Form a specific, testable hypothesis** about the root cause, grounded in Chapter 1's vocabulary — non-bulkified code, a non-selective query, excess synchronous work, or a transaction-boundary surprise (something else running in the same transaction).
5. **Test the hypothesis in isolation** using Execute Anonymous or the Query Plan tool, before touching the actual fix.
6. **Apply the fix, then re-measure** with the same tool that first surfaced the problem, to confirm the fix actually worked rather than assuming it did.

## Why reproduction has to come first, even when the cause "looks obvious"

It's tempting to skip straight to step 4 the moment a ticket mentions, say, a trigger you already suspect. But Lesson 5 covered exactly why this is risky: a limit exception's line number often points at the unlucky operation that happened to cross the ceiling, not the actual root cause, which might be unrelated automation running earlier in the same transaction. Fixing the trigger you suspected without reproducing and measuring first can "fix" a symptom while leaving the real cause (that other automation) untouched — and the ticket reopens a month later under slightly different conditions.

## Hard failure vs. soft failure: a worked distinction

```
// Hard failure — visible directly in the debug log as a thrown exception
System.LimitException: Too many SOQL queries: 101

// Soft failure — no exception at all, but CUMULATIVE_LIMIT_USAGE shows a transaction
// that completed successfully while using far more of its budget than it should need to
Number of SOQL queries: 94 out of 100
Number of CPU time (in ms): 9850 out of 10000
```

The first case is unambiguous and the debug log tells you exactly which limit and what number. The second is more dangerous precisely because nothing failed — the transaction succeeded, so unless someone is actually reading the CUMULATIVE_LIMIT_USAGE numbers (not just checking "did it work"), this transaction looks fine right up until the next bit of org growth or added automation pushes it over the edge into the first case.

## Key terms

| Term | Meaning |
|---|---|
| Reproduction | Confirming a specific, evidence-backed instance of the reported problem before diagnosing further |
| Hard failure | A transaction that throws a governor limit exception and rolls back entirely |
| Soft failure | A transaction that completes successfully but consumes an unhealthy share of its governor limit budget |
| Diagnostic hypothesis | A specific, testable guess at root cause, grounded in known performance anti-patterns, tested before a fix is applied |

## Lab

A user reports: "Updating a big batch of Opportunities from a list view sometimes works and sometimes gives an error, and I can't tell why." Walk through this lesson's six-step method on paper: write what evidence you'd ask for in step 1, what you'd check in the debug log to classify the failure in step 2, which Chapter 2 tool you'd use in step 3, and one specific, testable hypothesis (grounded in Chapter 1 vocabulary) you'd form in step 4 before writing any code.

## Check yourself

Can you list this lesson's six-step method from memory, in order? Can you explain, using your own example, the difference between a hard failure and a soft failure, and why a soft failure is arguably the more dangerous one to miss?
