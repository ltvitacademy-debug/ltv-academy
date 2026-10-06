# Journal Line Types and Journal Line Rules

Chapter 1 gave you the map of SLA's architecture. Chapter 2 starts building the actual rules that live inside a journal entry rule set. This lesson covers the first rule type: journal line rules, and the seeded building block they are based on, journal line types.

## What you'll learn

- What a journal line type is and why it is mostly Oracle-seeded, not custom-built
- What a journal line rule adds on top of a journal line type
- How journal line rules decide which lines actually appear on a journal entry
- A worked example using a Payables invoice

## Journal line types: the seeded vocabulary of "kinds of lines"

A **journal line type** (JLT) is a seeded definition of a kind of accounting line that can appear on a journal entry for a given event class — things like "Invoice," "Tax," "Freight," "Rounding," or "Gain/Loss." Each journal line type is pre-configured by Oracle with properties like whether it normally represents a debit or a credit, and which accounting class it belongs to (accounting classes group related line types for reporting, like all the lines that make up "Liability" or "Expense"). You rarely create brand-new journal line types; you use the ones Oracle has already defined for each event class and build your own logic on top of them.

## Journal line rules: deciding which lines appear, and when

A **journal line rule** takes a journal line type and adds the specific logic for when that line should appear on a journal entry, and under what conditions. A single event class, like Payables Invoices, will have several journal line rules defined against it — one for the Invoice accounting class, one for Tax, one for Freight — and each invoice event will generate however many of those lines actually apply to that particular transaction.

Journal line rules can also include conditions, so a line only generates when certain criteria are met. For example, a Tax journal line rule might be configured to generate a line only if the invoice has a non-zero tax amount; invoices with no tax simply don't generate a tax line, because the rule's condition isn't satisfied.

## A worked example

Picture a $1,200 Payables invoice: $1,000 for goods, $100 in freight, and $100 in sales tax. When this invoice is validated, SLA evaluates every journal line rule defined for the Invoices event class under the active accounting method:

- The **Invoice** journal line rule fires, generating a credit line for $1,200 (what the company owes the supplier).
- The **Item Expense** journal line rule fires, generating a debit line for $1,000.
- The **Freight** journal line rule fires, generating a debit line for $100.
- The **Tax** journal line rule fires, generating a debit line for $100 (assuming tax is recoverable and debited to a tax account).

Four lines, two debits and two credits in terms of nature but still balancing in total ($1,200 credit = $1,000 + $100 + $100 debit), built automatically because each applicable journal line rule fired for the data present on this specific invoice.

## Merging and accounting class

Journal line rules also control whether multiple lines that would post to the exact same account should be merged into a single line instead of appearing separately — useful for keeping journal entries readable rather than listing dozens of tiny lines that all hit the same GL account. The accounting class assigned to each rule (Invoice, Tax, Freight, and so on) is also what downstream reports, like the Account Analysis Report you'll study in Chapter 5, use to group and label journal lines meaningfully.

## Recap

A journal line type is a seeded "kind of line" (Invoice, Tax, Freight) with built-in debit/credit and accounting-class properties. A journal line rule attaches real conditions to a journal line type, deciding exactly when that kind of line should generate on a specific transaction. Multiple journal line rules fire independently per event, together producing the full set of lines on a journal entry. Next up, lesson 6: account rules and account derivation, which decide exactly which GL account each of these lines actually posts to.
