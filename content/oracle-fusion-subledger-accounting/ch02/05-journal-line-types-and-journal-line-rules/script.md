# Script — Journal Line Types and Journal Line Rules

## Segment 1 (title)

Chapter 1 gave you the map of SLA's architecture. Chapter 2 starts building the actual rules inside a journal entry rule set. First up: journal line rules, and the seeded building block underneath them, journal line types.

## Segment 2 (steps)

A journal line type is a seeded definition of a kind of line that can appear for an event class - Invoice, Tax, Freight, Rounding, Gain or Loss. Oracle pre-configures whether it's normally a debit or credit, and which accounting class it belongs to. You rarely build new ones; you build logic on top of the ones Oracle already defined.

## Segment 3 (steps)

A journal line rule takes a journal line type and adds the logic for when that line should actually appear, and under what conditions. One event class, like Payables Invoices, has several journal line rules - one for Invoice, one for Tax, one for Freight - and each transaction generates whichever lines actually apply to it.

## Segment 4 (code)

Picture a twelve hundred dollar invoice: a thousand for goods, a hundred freight, a hundred tax. Four journal line rules fire: Invoice credits twelve hundred, Item Expense debits a thousand, Freight debits a hundred, Tax debits a hundred. Two credits worth, two debits worth, balancing at twelve hundred - built automatically from whichever rules matched this transaction's data.

## Segment 5 (steps)

Journal line rules also control merging - lines hitting the same account can combine into one line instead of listing separately, which keeps the entry readable. And the accounting class on each rule, like Invoice or Tax, is what reports such as the Account Analysis Report later use to group and label lines meaningfully.

## Segment 6 (outro)

So remember: journal line types are the seeded vocabulary of line kinds, and journal line rules decide exactly when each kind generates, with what conditions. Up next, lesson six: account rules and account derivation, which decide exactly which GL account each of these lines posts to.
