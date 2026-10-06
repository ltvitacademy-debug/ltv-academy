# Script — Subledger Applications and Their Sources

## Segment 1 (title)

You've covered events, event classes and types, accounting methods, and the four rule types inside a journal entry rule set. Before Chapter 2 builds those rules in detail, this lesson surveys which Fusion modules actually plug into Subledger Accounting, and what "sources" means when SLA pulls data from a transaction.

## Segment 2 (steps)

"Subledger application" is a formal term: a module registered with Subledger Accounting, with its own event classes, event types, and sources. You already know several from earlier courses: Payables, Receivables, Fixed Assets, Cash Management, Cost Management, and Projects. Each has event classes specific to its own transactions, but every one plugs into the same engine.

## Segment 3 (steps)

A source is a specific piece of data from the originating transaction a rule can reference - the invoice amount, the supplier name, the natural account on a distribution, the transaction date. Every subledger application defines its own list of available sources. When you build a rule, you're picking from that defined list, not writing arbitrary code.

## Segment 4 (code)

The sources available depend entirely on the event class you're in. Payables invoice events offer a source like Supplier Name, because invoices have a supplier. A Fixed Assets depreciation event has no supplier - it offers sources like Asset Number or Depreciation Expense Account instead. Same engine, different vocabulary per module.

## Segment 5 (steps)

Here's the payoff for you as a consultant. Because the rule-building mechanics are identical across every subledger application, picking up a new one - say Fixed Assets - mostly means learning its specific sources and event classes, not learning a new system. That reuse is the whole point of one shared SLA engine.

## Segment 6 (outro)

So remember: subledger applications are formally registered modules with their own event classes and sources, but one shared engine. That closes out chapter one. Up next, chapter two begins with lesson five: journal line types and journal line rules, the first rule type you'll actually build.
