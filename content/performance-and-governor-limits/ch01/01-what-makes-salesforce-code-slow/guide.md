# Lesson 1 — What Makes Salesforce Code Slow

**Chapter 1 · Performance Foundations · Lesson 1 of 16**

## What you'll learn

- Why Salesforce enforces strict resource limits that a normal on-premise application doesn't
- Where transaction time actually goes — network, client rendering, and server-side Apex/database work
- The handful of root causes behind almost every "this is slow" ticket on the platform
- How this course's three chapters build on each other, from foundations to diagnosis to fixes

## Multi-tenancy is why limits exist at all

Salesforce runs many customers' orgs on shared infrastructure — this is **multi-tenancy**. One org's runaway query or infinite loop can't be allowed to starve every other org sharing the same database and application servers. Salesforce's answer is **governor limits**: hard ceilings on things like how many database queries a single transaction can issue, how much memory it can hold, and how long its code can run on the server. A transaction that crosses a limit doesn't get throttled or slowed down — it throws an exception and rolls back entirely. This is the single most important fact to internalize before writing a line of Apex: on most platforms, "slow" means a bad user experience; on Salesforce, "slow enough to cross a limit" means the transaction fails outright. Performance work here isn't just about speed, it's about staying inside boundaries that are shared with every other customer on the same instance.

## Where transaction time actually goes

A user clicking "Save" on a record experiences one elapsed time, but that time is made of distinct pieces, and knowing which piece is slow determines what you actually fix:

- **Network and client rendering.** Time spent loading the Lightning page itself, fetching component metadata, and rendering the DOM in the browser. This is real, but it's a different problem from server-side performance, and the fixes (fewer components on a page, lazy loading) are different tools.
- **Server-side request handling and the Apex transaction.** Once a request reaches Salesforce's servers, it runs through triggers, flows, validation rules, and any Apex a click or API call fires. This is where governor limits apply, and it's the focus of this course.
- **Database work inside that transaction.** SOQL queries and DML statements the Apex (or a Flow, or a declarative automation) issues against the underlying database. This is frequently the single biggest contributor to a slow transaction, and it's where bulkification and query selectivity (both coming later this chapter) matter most.

A ticket that says "the page is slow" could mean any of these. The first diagnostic question is always: is this slow because of what's happening in the browser, or because of what's happening in a server-side transaction? The rest of this course is about the second category.

## The usual suspects

Across a huge range of real Salesforce performance problems, the root cause is almost always one of a short list:

1. **Non-bulkified code** — logic written assuming "one record at a time" that falls over (or hits a limit) the moment it runs against 200 records at once. Lesson 3 covers this in depth.
2. **Non-selective or unnecessary queries** — SOQL that scans far more of the table than it needs to, or that runs inside a loop instead of once. Lesson 4 covers this.
3. **Doing too much synchronously** — cramming work that doesn't need an immediate answer into the same transaction the user is waiting on, instead of deferring it to asynchronous Apex. Lesson 5 touches this; later courses on asynchronous Apex go deeper.
4. **Excess data volume per transaction** — processing far more records, fields, or related data than the operation actually requires. Chapter 3 returns to this directly.

## How this course is organized

Chapter 1 (this chapter) builds the foundational vocabulary: governor limits themselves, bulk processing, query optimization, and transaction-level limits. Chapter 2 is about measurement — debug logs, the Developer Console's tools, Event Monitoring, and a general troubleshooting method, because you cannot fix what you haven't diagnosed. Chapter 3 applies all of it to real fixes: triggers and flows, caching, reducing data volume, and a full case study that ties the whole course together.

## Key terms

| Term | Meaning |
|---|---|
| Multi-tenancy | Many customers' orgs sharing the same underlying infrastructure |
| Governor limit | A hard, enforced ceiling on a resource (queries, DML, CPU time, etc.) within a single transaction |
| Transaction | The full unit of server-side work triggered by one user action or API call, within which governor limits apply cumulatively |
| Bulkification | Writing code that handles a collection of records in one pass instead of one record at a time |

## Lab

A support rep reports: "Every time I update a Case's status in bulk from a list view, about 1 in 20 of my updates fails with an error, and the whole thing feels sluggish." Without looking at any code, write down three specific, testable hypotheses for what might be happening, based on the four "usual suspects" above. For each hypothesis, name one piece of evidence (a debug log line, an error message, or a specific governor limit) that would confirm or rule it out.

## Check yourself

Can you explain, in your own words, why Salesforce enforces governor limits instead of simply letting a slow transaction run longer? Can you name the three places transaction time can go, and explain why "the page is slow" isn't a complete diagnosis on its own?
