# Deduplication Strategies

Lesson 28 showed that duplicate Accounts and Contacts are the most common data quality problem
in a long-running org, and that a `GROUP BY Name` query only catches exact matches. This lesson
covers what Salesforce gives you to deal with duplicates properly, and why the tooling only
gets you part of the way there.

## What you'll learn

- The two building blocks of Salesforce duplicate management: matching rules and duplicate rules
- How to review what those rules found using SOQL
- Why deduplication always needs automated rules **and** human review

## Matching rules and duplicate rules

Salesforce's built-in duplicate management is made of two pieces that work together:

- A **matching rule** defines when two records look like the same real-world entity. It compares
  chosen fields and can use **exact** or **fuzzy** matching. Salesforce provides standard
  matching rules for Accounts, Contacts, and Leads, and you can create your own.
- A **duplicate rule** uses a matching rule and decides what happens when a match is found. On
  create or edit it can **Allow** the save (optionally showing an alert) or **Block** it, and it
  can also **Report** the match so it is logged for later review.

You configure both in Setup under Duplicate Management.

```text
Exact:  'Acme Corp'  =  'Acme Corp'
Fuzzy:  'Acme Corp'  ~  'Acme Corporation'  ~  'ACME Corp.'
```

This is the gap that Lesson 28's query left open. `GROUP BY Name` only groups identical
values, so it misses near-matches. Fuzzy matching rules are designed for exactly those cases.

## Reviewing what the rules found

When a duplicate rule has the Report option enabled, the matches it finds are stored in two
objects you can query like any other data: `DuplicateRecordSet` (a group of suspected
duplicates) and `DuplicateRecordItem` (each record within a set).

```sql
SELECT DuplicateRecordSetId, RecordId
FROM DuplicateRecordItem
```

That gives you a real work list of suspected duplicates rather than a guess.

## Rules do not replace people

Rules **prevent** the obvious duplicates at entry and **detect** the likely ones afterward.
They cannot decide what is true. Two Accounts named "Global Supply" may be two genuinely
different companies, and when two records really are the same entity, someone has to decide
which record survives and which field values are correct before merging. The dependable
approach is automated rules to prevent and detect, then human review to decide and merge.

## Duplicates and your data loads

Duplicate rules can also run when records arrive through the API, including Data Loader
inserts. A row that matches an existing record under a Block rule fails and shows up in your
error file, which is a good thing to know before a large load rather than after.

## Key terms

| Term | Meaning |
|---|---|
| Matching rule | Defines how records are compared to decide whether they are likely duplicates |
| Duplicate rule | Decides what happens (Allow with alert, Block, Report) when a matching rule finds a match |
| Fuzzy matching | Matching that recognizes near-identical values, not just exact ones |
| DuplicateRecordSet | Object holding a group of records identified as suspected duplicates |
| Merge | Combining duplicate records into one surviving record |

## Check yourself

Your duplicate rule reports 300 suspected Account duplicates. Why shouldn't you automatically
merge every one of them, and how would you get the list into a spreadsheet for review?
