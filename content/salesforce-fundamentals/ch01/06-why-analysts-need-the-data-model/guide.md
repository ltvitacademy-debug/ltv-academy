# Why Analysts Need to Understand the Data, Not Just Query It

This lesson closes out Chapter One with the single most important idea in this whole course:
knowing how to write a query is not the same skill as knowing whether the query's result means
what you think it means. A data model — how objects relate to each other — determines that
second thing, and skipping it is how competent analysts produce confidently wrong numbers.

## What you'll learn

- Why query syntax alone doesn't protect you from a wrong answer
- A concrete example of how the wrong relationship traversal silently double-counts data
- How this lesson sets up everything in Chapter 2 and beyond

## A syntactically perfect query can still be a wrong answer

Nothing about SOQL (or any query language) stops you from writing a query that runs successfully
and returns a number — and that number being wrong. A query only fails loudly when it's
syntactically broken. When it's *conceptually* wrong — built on a misunderstanding of how the
underlying objects relate — it fails silently. It returns a real result, formatted correctly, that
simply doesn't mean what you assumed it meant. That's a far more dangerous failure than a syntax
error, because nothing about the output looks suspicious.

## The classic failure: double-counting via the wrong relationship

Here's a concrete version of this mistake, using objects this course covers next: an Account
(a company) can have many Contacts (people at that company), and separately, an Account can have
many Opportunities (deals with that company). If an analyst wants "total pipeline value per
Account" and naively joins Account to Opportunity *through* Contact — instead of directly — every
Opportunity linked to an Account with three Contacts gets counted three times over. The query
runs. The number looks plausible. It's wrong by a factor that depends on how many Contacts happen
to exist per Account, which has nothing to do with the actual business question being asked. This
is exactly the kind of error that data-model literacy prevents and query syntax alone cannot.

## Why this is the whole point of this course

This is precisely why this course spends Chapter One on the platform and Chapters 2 through 6 on
objects and how they relate, before the next course in this path ever teaches SOQL syntax in
depth. An analyst who understands what Contacts, Opportunities, and Accounts actually represent —
and how they're really related — catches the double-counting mistake before it ever ships in a
report. An analyst who only knows query syntax ships it, and finds out when a sales VP asks why
the pipeline number looks too high.

## Key terms

| Term | Meaning |
|---|---|
| Silent failure | A query that runs successfully but returns a conceptually wrong result |
| Relationship traversal | Following a connection between objects (e.g., Account → Opportunity) |
| Double-counting | Counting the same record more than once due to a wrong relationship path |
| Data model literacy | Understanding how objects actually relate, not just how to query them |

## Check yourself

In the double-counting example above, why does joining Account to Opportunity *through* Contact
produce a wrong number, and what would the correct relationship path be instead?
