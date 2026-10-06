# Lesson 5 — General Ledger Setup Review

**Chapter 1 · General Ledger Fundamentals · Lesson 5 of 37**

## What you'll learn

- How a chart of accounts is built from segments, and what a segment qualifier does
- How legal entities, business units, and ledgers relate to each other
- What a data access set controls, and why it matters for security
- The Solara Fixtures setup this course's examples build on

## The chart of accounts is built from segments

A chart of accounts is not one field — it's several **segments** concatenated together, each drawing its allowed values from its own **value set**. Solara Fixtures' chart of accounts has four segments:

```
Company . Cost Center . Account . Intercompany
   01    .     200     .  1110  .      000
```

Three segments carry special **qualifiers** that tell General Ledger what role they play:

- **Balancing segment** (Company) — General Ledger automatically balances journal lines so each value of this segment nets to zero, which is what makes entity-level balance sheets possible.
- **Natural account segment** (Account) — tells Oracle whether a given value is an asset, liability, equity, revenue, or expense, which drives financial statement classification.
- **Intercompany segment** (Intercompany) — identifies transactions between legal entities within the same ledger, feeding the intercompany processing covered in Chapter 6.

A cost center segment (like Solara's second segment) has no special qualifier of its own, but is still central to reporting — it's simply a plain segment that happens to be used for departmental analysis.

## Legal entities, business units, and ledgers

These three terms get confused constantly, so it's worth being precise:

- A **legal entity** is a real registered entity — the thing that can sign a contract, sue, or be sued. Solara Fixtures, Inc. itself is a legal entity.
- A **business unit** is an operational grouping of activity — sales, purchasing, or receivables processing — that reports accounting results to a specific ledger. One legal entity can contain several business units.
- A **ledger**, as covered in Lesson 1, holds the actual chart of accounts, calendar, currency, and accounting method. One ledger can serve more than one legal entity (for example, the Company balancing segment separates them within the same ledger), or a group of legal entities might each have their own ledger.

## Data access sets: who can see what

A **data access set** controls which ledgers (or ledger sets) a user can access, and — optionally — which values of the balancing segment within those ledgers they're restricted to. It's assigned to a user through their job role, and it's the mechanism that lets, say, a cost center accountant see only their own company code's journals while a corporate controller sees all of them.

```
Data Access Set: "Solara US Full Access"
  Ledger: Solara Fixtures US
  Access: All balancing segment values, read/write
```

## What you'll be working against for the rest of this course

From Chapter 2 onward, every exercise assumes Solara Fixtures' primary ledger already exists with its four-segment chart of accounts, a standard monthly calendar, USD functional currency, and a data access set that gives you full read/write access. This course does not walk through creating that setup from scratch — that belongs to an implementation course — but understanding its shape is what makes the journal, posting, and allocation lessons ahead make sense.

## Key terms

| Term | Meaning |
|---|---|
| Segment | One concatenated piece of a chart of accounts code combination |
| Value set | The list of allowed values for a segment |
| Balancing segment | The segment GL automatically zeroes out per journal, usually company/entity |
| Natural account segment | The segment that classifies a value as asset/liability/equity/revenue/expense |
| Data access set | Controls which ledgers and balancing segment values a user can access |

## Check yourself

You're ready for Chapter 2 when you can explain, without looking: what does the balancing segment qualifier actually make General Ledger do automatically on every journal?
