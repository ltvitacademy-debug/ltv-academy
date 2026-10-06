# Enterprise Structures Overview

Before you create a single legal entity or ledger, you need the map. Oracle Fusion's enterprise structures are a handful of interlocking building blocks, and almost every configuration mistake in real implementations traces back to someone configuring one block without understanding how it connects to the others. This lesson is that map.

## What you'll learn

- The four core enterprise structure building blocks and what each one represents
- How those blocks connect to each other (what belongs to what)
- Why this order matters: structures come before transactions
- A preview of where this course goes chapter by chapter

## The four building blocks

Oracle Fusion's enterprise structures rest on four core concepts:

```
Legal Entity        → a real-world company or legal organization
  Ledger             → the accounting "book" that records a legal entity's transactions
  Business Unit      → the operating unit that processes transactions (AP, AR, procurement...)
  Chart of Accounts  → the account structure the ledger uses to classify everything
```

- A **legal entity** is a real, legally registered organization — the kind of entity that can sign a contract, be sued, or owe tax. It is the legal "who."
- A **ledger** is the accounting record-keeping structure that accumulates a legal entity's (or several legal entities') financial transactions, using one chart of accounts, one calendar, and one currency.
- A **business unit** is the operational unit — a department, division, or even a whole subsidiary's worth of activity — that actually processes day-to-day transactions like invoices and sales orders, and that routes its accounting entries into a ledger.
- A **chart of accounts** is the classification scheme — the segments, like company, cost center, and account — that every transaction gets coded against before it lands in the ledger.

## How they connect

These four pieces are not independent; they are assigned to each other in a specific, layered way. One or more legal entities are assigned to a primary ledger. That ledger uses exactly one chart of accounts (through a structure instance) and one calendar. Business units are, in turn, assigned to a primary ledger and usually to a specific legal entity, so that every transaction a business unit processes knows which ledger — and which chart of accounts — it needs to post against.

```
Chart of Accounts  ──assigned to──▶  Ledger
Legal Entity        ──assigned to──▶  Ledger
Business Unit        ──assigned to──▶  Ledger (+ often a Legal Entity)
```

Get this wrong — for example, assign the wrong business unit to the wrong legal entity — and every transaction that business unit processes posts to the wrong set of books. This is why enterprise structure design happens once, carefully, before a single real transaction is entered.

## Why structure comes before transactions

Every later course in this path — General Ledger, Accounts Payable, Accounts Receivable, and beyond — assumes these four structures already exist and are assigned correctly. You cannot post an invoice without a business unit, you cannot run a business unit without a ledger behind it, and you cannot have a ledger without a chart of accounts. Enterprise structures are the foundation everything else is poured onto; a transaction course can teach you how to enter an invoice in five minutes, but if the enterprise structure underneath it is wrong, every invoice you enter inherits that mistake.

## Where this course goes from here

Chapter 2 builds legal entities and ledgers. Chapter 3 covers business units and reference data. Chapter 4 covers the calendars and currencies a ledger depends on. Chapter 5 is the chart of accounts itself — segments, value sets, hierarchies, and the rules that keep it clean. Chapter 6 puts all of it together in a realistic design exercise.

## Recap

Legal entities, ledgers, business units, and the chart of accounts are the four building blocks of an Oracle Fusion enterprise structure, and they are explicitly assigned to one another rather than existing independently. Next up, lesson 4: Functional Setup Manager, the tool that generates and tracks the task lists you'll use to actually build these structures.
