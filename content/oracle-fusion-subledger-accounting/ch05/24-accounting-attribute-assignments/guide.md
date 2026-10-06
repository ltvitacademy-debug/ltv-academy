# Accounting Attribute Assignments

Throughout this course, you've assumed that SLA always knows things like the accounting date, the currency, and the amount for a journal entry. This lesson pulls back the curtain on how SLA actually knows those things: accounting attributes, and the assignments that tell SLA where to get each one.

## What you'll learn

- What an accounting attribute is, distinct from a source
- The two levels an accounting attribute can apply to: header or line
- Which accounting attributes are required, and why
- Where an accounting attribute assignment can be overridden

## Accounting attributes versus sources

You learned about sources back in lesson 4 — specific pieces of transaction data, like supplier name or invoice amount, that a rule can reference. **Accounting attributes** are a related but distinct concept: they are specific values that SLA itself needs, by name, to build a correctly structured journal entry — things like Accounting Date, Entered Amount, Entered Currency Code, and Distribution Type. An **accounting attribute assignment** is the configuration that tells SLA which source to actually pull, for a given event class, to populate that required attribute.

Put another way: a source is "data available from the transaction." An accounting attribute is "a specific thing SLA needs to know in order to function at all." An accounting attribute assignment is the wiring between them — which source feeds which required attribute.

## Header level versus line level

Each accounting attribute is associated with one of two levels. **Header-level** attributes, like Accounting Date, apply once per journal entry — the entry as a whole has one accounting date. **Line-level** attributes, like Entered Amount or Distribution Type, apply individually to each line, since different lines on the same entry can carry different amounts or represent different kinds of distributions.

## Required accounting attributes

Oracle designates certain accounting attributes as required for every event class: Accounting Date, Distribution Type, Entered Amount, Entered Currency Code, and First Distribution Identifier are examples. Without a valid assignment for each required attribute, SLA cannot build a complete journal entry for that event class — this is conceptually similar to the validation checks from lesson 14, just focused specifically on these foundational values rather than account derivation logic.

## Where assignments come from, and where they can be overridden

Most accounting attribute assignments are defaulted at the **event class** level by Oracle's seeded configuration — for most subledger applications, the default sourcing for something like Accounting Date is already sensible out of the box. But depending on the specific attribute, that default can be overridden at a more specific level: on a journal line type, or within a specific Application Accounting Definition, if a particular line or a particular company's configuration genuinely needs a different source for that attribute than the event-class default provides.

## Recap

Accounting attributes are the specific values SLA needs to build a journal entry (Accounting Date, Entered Amount, and others), distinct from sources, which are the raw transaction data available to draw from. Each attribute applies at the header or line level, several are required for every event class, and assignments default at the event class level but can be overridden on a journal line type or AAD when needed. Next up, lesson 25: subledger accounting troubleshooting practice, where you'll apply everything from this chapter to a realistic diagnostic scenario.
