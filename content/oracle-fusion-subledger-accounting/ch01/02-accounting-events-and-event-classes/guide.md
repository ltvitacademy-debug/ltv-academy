# Accounting Events and Event Classes

In the last lesson, you learned that subledger applications raise business events and hand them to Subledger Accounting. This lesson gets specific about what an "event" actually is in Oracle Fusion, and introduces two terms you will see on almost every SLA setup screen for the rest of this course: event class and event type.

## What you'll learn

- What an accounting event is, concretely
- The difference between an event class and an event type
- How an event carries data from the subledger into SLA
- Why this classification exists instead of just saying "an invoice happened"

## What an accounting event actually is

An accounting event is a business occurrence inside a subledger application that may require a journal entry. Validating an AP invoice is an event. Applying a receipt to a customer invoice in Receivables is an event. Adding a fixed asset, retiring it, or running depreciation are each events. Not every change to a transaction is an accounting event — editing a supplier's address is not — only changes with potential financial accounting impact qualify.

When a qualifying event happens, the subledger application does not just send SLA a vague message like "something happened on invoice 1001." It sends a structured package: what kind of event this is, which transaction it relates to, and the data SLA needs — amounts, dates, parties, and so on. That structured package is what lets a generic, shared engine handle wildly different transactions from wildly different subledgers.

## Event classes and event types

Oracle groups events into **event classes**, which represent a category of business transaction within a subledger application — for example, "Invoices" in Payables, or "Receipts" in Receivables. Within an event class, specific **event types** describe exactly what happened: within the Invoices event class, you might see event types like Invoice Validated, Invoice Adjusted, or Invoice Cancelled.

This two-level structure matters because accounting rules are usually written at the event class level (one set of rules handles every invoice-related event) but can be refined at the event type level when a specific situation — like a cancellation — needs different treatment than the normal case. Rather than writing one rule per transaction, a consultant writes rules once per event class and type, and every transaction of that kind, past and future, follows the same logic.

## A concrete example

Say Accounts Payable validates a $5,000 supplier invoice. Payables raises an accounting event: event class "Invoices," event type "Invoice Validated," with the invoice's distributions, amounts, supplier, and accounting date attached. Later, someone adjusts that invoice's amount. That is a different event: same event class, "Invoices," but event type "Invoice Adjusted." The rules you will build later in this course can treat the original validation and the later adjustment differently, even though both belong to the same event class, because the event type tells SLA exactly what occurred.

## Why this classification exists

Without event classes and event types, every rule a consultant writes would need to somehow identify, in plain conditional logic, what kind of transaction it was looking at every single time. By classifying events up front, Oracle gives consultants a stable, documented vocabulary to attach rules to — you will literally pick an event class and event type from a list when you build account rules and journal line rules in the next chapter.

## Recap

An accounting event is a business occurrence that may require a journal entry, and every event is classified by event class (the category of transaction, like Invoices) and event type (the specific thing that happened, like Invoice Validated). This classification is the vocabulary that every rule in Subledger Accounting is built against. Next up, lesson 3: accounting methods and rules, where this vocabulary gets attached to actual journal-building logic.
