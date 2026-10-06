# Script — Reconciliation Rules and Matching Rules

## Segment 1 (title)

Everything in the last two chapters existed to get a bank account set up and a bank statement loaded. This lesson is where the real work of reconciliation begins: the rules that decide whether a statement line and a system transaction are the same thing.

## Segment 2 (steps)

A reconciliation rule set is the top-level object attached to a bank account — a named group of matching rules, and optionally tolerance rules, that together determine what automatic reconciliation is allowed to match. One rule set can serve multiple accounts that should behave the same way. A matching rule itself specifies the transaction source it's allowed to consider, a match type, group-by attributes, and the matching criteria — fields like amount, date, and sometimes a reference number.

## Segment 3 (steps)

There are five match types. One to one matches a single statement line to a single system transaction — the simplest and most common case. One to many matches one statement line against a group of transactions, like a lump sum deposit covering several receipts. Many to one is the reverse. Many to many matches groups against groups. And zero amount handles lines with no monetary value to compare.

## Segment 4 (steps)

A tolerance rule can soften a matching rule's exactness, allowing a small variance by percentage or flat amount and still reconciling automatically. But that tolerance only applies to one to one match type rules — the other match types don't support an associated tolerance. If a business needs tolerance on a many to many scenario, that has to be handled differently, usually manually.

## Segment 5 (outro)

A fictional example: Harborview Metals Inc uses a one to one rule with a two cent tolerance on its operating account, and a separate one to many rule for its lockbox account, where deposits often lump several payments together. Up next, lesson ten: how automatic reconciliation actually runs these rules.
