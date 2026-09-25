# Script — Dot-Notation Traversal

## Segment 1 (title)

Last lesson you took one hop up from a child to its parent. Now the question is how far a chain of dots can go.

## Segment 2 (code: chaining hops)

Select Name, Amount, Account dot Name, Account dot Owner dot Name, from Opportunity. Account is the relationship to the parent Account. Owner is the relationship from that Account to a User. Name is the field you finally want. Two dots, one flat query. In T-SQL that would be two joins.

## Segment 3 (code: relationship names)

Each hop uses a relationship name, not the field name. AccountId becomes Account, OwnerId becomes Owner. For custom lookups, double-underscore c becomes double-underscore r. You can mix standard and custom relationships in the same chain, and use the chain in WHERE and ORDER BY too.

## Segment 4 (steps: the five-level limit)

Here's the real limit. SOQL allows up to five levels of child-to-parent traversal in a single query. Go past that and the query is rejected. Each hop is a lookup on shared infrastructure, so Salesforce caps the work. Hitting the limit usually means you should query an intermediate object directly instead.

## Segment 5 (outro)

And if a link in the chain is empty, the query doesn't fail. That field just comes back null, like a left join. Next up, Lesson 14: Semi-Joins and Anti-Joins.
