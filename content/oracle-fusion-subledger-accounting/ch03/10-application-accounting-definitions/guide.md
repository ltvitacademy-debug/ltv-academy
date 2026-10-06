# Application Accounting Definitions

Chapter 2 walked you through all four rule types: journal line rules, account rules, mapping sets (inside account rules), description rules, and supporting references. This lesson introduces the object that packages all of that together for one subledger application, inside a tool called the Accounting Methods Builder: the Application Accounting Definition, or AAD.

## What you'll learn

- What an Application Accounting Definition is and what it contains
- How an AAD relates to a single subledger application
- The relationship between journal entry rule sets and an AAD
- Why AADs exist as a distinct layer instead of just assigning rule sets directly to a ledger

## What an AAD actually packages

An **Application Accounting Definition** is a complete accounting configuration for one subledger application — Payables, Receivables, Fixed Assets, and so on. It gathers together every journal entry rule set you've defined for that application's event classes, along with any description rules and supporting references used throughout, into one coherent, nameable, versionable package.

Think back to the chain you learned in lesson 3: an accounting method points to rule sets per subledger application. An AAD is the object that actually sits at that "per subledger application" layer — it is the complete, named bundle of rules for one application that the accounting method references.

## Why package rules this way

If every journal entry rule set floated around independently with no higher-level grouping, a consultant configuring a ledger's accounting method would have to individually pick and assemble dozens of separate rule sets, one per event class, every time. By bundling everything for one subledger application into a single AAD, the accounting method only needs to reference one AAD per application — much simpler to assign, review, and manage. It also means an entire application's accounting configuration can be copied, versioned, and compared as one unit, which you'll rely on heavily in the next lesson.

## The Accounting Methods Builder

The tool used to build and manage AADs, along with the journal line rules, account rules, description rules, and supporting references that feed into them, is called the **Accounting Methods Builder**, often abbreviated AMB. Everything you built conceptually in Chapter 2 is, in practice, configured inside the Accounting Methods Builder, and an AAD is the top-level object you ultimately produce there for each subledger application.

## A concrete picture

Picture the Payables AAD for a company. It contains journal entry rule sets for the Invoices event class, the Payments event class, and the Prepayments event class, each built from the journal line rules and account rules you learned how to construct in Chapter 2. All of that — every rule set, for every event class, for Payables specifically — is wrapped into one named AAD, something like "Standard Payables Accounting." A separate AAD, built the same way, exists for Receivables, for Fixed Assets, and for every other SLA-enabled subledger application a company uses.

## Recap

An Application Accounting Definition bundles every journal entry rule set (and the description rules and supporting references used within them) for one subledger application into a single, named, versionable package, which is what an accounting method actually references for that application. Next up, lesson 11: copying and modifying seeded definitions, the safe way to customize the AADs Oracle ships out of the box.
