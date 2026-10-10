# Lesson 14 — SOSL vs. SOQL

**Chapter 3 · Search and SOSL · Lesson 14 of 23**

## What you'll learn

- The fundamental question each language is built to answer
- How governor limits differ between the two, and why that matters architecturally
- A decision framework for choosing between them on a real requirement
- A case where you genuinely need both in the same transaction

## Different questions, not competing syntaxes

It's tempting to think of SOSL as "SOQL but for text search," but the better mental model is that they answer fundamentally different questions:

- **SOQL** answers: "give me records from object X matching this exact field condition." You already know which object(s) you're looking in.
- **SOSL** answers: "find this text, and tell me which objects and records it showed up in." You may not know in advance which object type holds the match.

That second point is the real distinguishing feature. A single SOSL search can span multiple, unrelated object types in one call — `Account`, `Contact`, `Lead`, and a custom object all in the same `FIND` statement — something SOQL simply cannot do, since a SOQL query is always rooted in exactly one `FROM` object (ignoring its related subqueries).

## Governor limits differ meaningfully

Chapter 4 covers governor limits in more depth, but the headline numbers matter for choosing between the two right now. Per Apex transaction:

| | SOQL | SOSL |
|---|---|---|
| Queries/searches allowed | 100 synchronous / 200 asynchronous | 20 |
| Rows returned | 50,000 | 2,000 (shared across every object type in a multi-object search) |

That SOSL row cap is especially worth internalizing: a search across several object types in one `FIND` statement doesn't get 2,000 rows *per object* — the 2,000-row ceiling is a shared budget divided across all the object types in that single search. Narrowing a search to fewer objects (or adding per-object `LIMIT` inside `RETURNING`) is the documented way to get more rows for an object you actually care about.

## When to reach for which

A practical decision framework:

- **Use SOQL** when you already know the object, and your condition is a precise field match, range, or relationship — the overwhelming majority of Apex trigger and batch logic.
- **Use SOSL** when the user (or your logic) is matching free text against possibly several objects at once, and you genuinely don't know up front which object type holds the answer — classic use case: a global search box.
- **Use SOSL when performance matters on a loose text match.** A SOQL `LIKE '%term%'` with a leading wildcard can't use an index at all and scans broadly; SOSL is built around a search index designed specifically for this kind of lookup and is typically far more efficient for the same loose-text question.

## Using both together

It's entirely normal for one piece of Apex logic to use both in sequence: a SOSL search to find candidate records across several objects by free text, followed by a SOQL query (often a semi-join, from Lesson 11) against one specific object to pull the full set of fields you actually need for those matched IDs. Each language is doing the part it's actually good at — SOSL for the broad, fuzzy "where is this" question, SOQL for the precise "now give me exactly these fields" follow-up.

## Key terms

| Term | Meaning |
|---|---|
| SOQL | Precise field-based querying rooted in one known object |
| SOSL | Free-text search that can span multiple object types in one call |
| Shared SOSL row budget | SOSL's 2,000-row cap is divided across all object types in a single multi-object search, not per object |

## Lab

Write down a short list of three realistic feature requests (e.g., "a global search bar," "find all open cases for this account," "find every record anywhere that mentions this phone number"). For each one, decide whether SOQL or SOSL is the right tool, and justify the choice in one or two sentences using this lesson's decision framework.

## Check yourself

Why can a single SOSL search span multiple unrelated object types, while a single SOQL query cannot? Why is a SOQL LIKE '%term%' search generally a worse choice than SOSL for a loose, free-text lookup, even though both are technically capable of finding the same records?
