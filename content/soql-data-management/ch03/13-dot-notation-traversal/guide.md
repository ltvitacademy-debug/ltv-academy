# Dot-Notation Traversal

Lesson 12 stopped at one hop: `Account.Name`. But nothing stops you chaining dot notation
further — up through as many parent relationships as the object model actually has. The
chain works exactly the way you'd guess. The part that isn't guessable is where it stops.

## What you'll learn

- How to chain dot notation across multiple relationship hops
- The real, enforced limit on how many levels deep a query can traverse
- Why that limit exists

## Chaining multiple hops

```sql
SELECT Quantity, UnitPrice,
       Opportunity.Account.Owner.Name
FROM OpportunityLineItem
```

Read it left to right: start at `OpportunityLineItem`, go up to its parent `Opportunity`,
up from there to *its* parent `Account`, up from there to the Account's `Owner` (a User
record), and pull that User's `Name`. Each `.` is one more hop up the relationship chain,
and each hop has to be a real relationship field that actually exists on the object you're
standing on — you can't skip a level.

## The real limit: five levels deep

Salesforce enforces a hard limit on standard relationships: **a SOQL query can traverse up
to five levels of parent relationships using dot notation.** `Opportunity.Account.Owner.Name`
above is three levels deep — well inside the limit. Push much further (a sixth or seventh
`.` in the chain) and the query is rejected before it ever runs, with an error pointing at
the relationship depth.

```sql
-- Five levels: right at the edge, but valid
A__r.B__r.C__r.D__r.E__r.SomeField

-- Six levels: SOQL rejects this
A__r.B__r.C__r.D__r.E__r.F__r.SomeField
```

## Why the limit exists

This isn't arbitrary. Every dot-notation hop is effectively another implicit lookup the
query engine has to resolve before it can return a single row, and Salesforce's governor
limits exist specifically to stop a query from silently becoming an expensive, deeply nested
traversal that would be slow and costly to execute on shared, multi-tenant infrastructure.
Five levels is generous enough for almost any real reporting need — if you're hitting the
limit, it's usually a sign the query should be restructured, not that the limit should be
higher.

## Key terms

| Term | Meaning |
|---|---|
| Dot-notation chain | Multiple `.` hops traversing several relationships in one query |
| Relationship depth limit | The maximum number of parent hops SOQL allows — five |
| Governor limits | Salesforce's platform-wide limits that keep queries predictable and cheap |

## Check yourself

`Opportunity.Account.Parent.Parent.Parent.Owner.Name` — how many levels deep is that
dot-notation chain, and does SOQL allow it?
