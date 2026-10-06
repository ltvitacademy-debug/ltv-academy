# Designing the Enterprise Structure

**Chapter 1 · Design and Configuration · Lesson 3 of 25**

Before you open a single configuration screen, you design on paper (or in your notes document). This lesson turns lesson 2's company profile into a concrete enterprise structure diagram: which legal entities exist, which ledger each one posts to, and which business unit processes transactions for each. Lesson 4 is where you actually build it in Oracle Fusion.

## What you'll learn

- How to translate "two legal entities, two locations" into ledgers, legal entities, and business units
- Why LTV needs two primary ledgers, not one
- The specific names you'll use for every structure element, for the rest of this capstone
- How this design sets up the chart of accounts work in lesson 5

## Start from the real structure, not the software

Enterprise structure design always starts from the business, not from Oracle Fusion's screens. LTV Manufacturing Corporation has exactly two legal entities: the US parent, which is its own legally distinct company, and LTV Manufacturing Canada ULC, a separate legal entity incorporated in Canada. Each legal entity has its own statutory reporting currency (USD for the US parent, CAD for the Canadian subsidiary), which is the single fact that drives the rest of this design — in Oracle Fusion, a primary ledger has exactly one currency, so two different functional currencies mean two primary ledgers.

## The worked design

```
LTV Manufacturing Corporation — Enterprise Structure
  Legal Entity: LTV Manufacturing Corporation (US)
    Primary Ledger: LTV US Primary Ledger        (USD, monthly, US GAAP)
    Business Unit:  US Manufacturing & Distribution BU

  Legal Entity: LTV Manufacturing Canada ULC
    Primary Ledger: LTV Canada Primary Ledger     (CAD, monthly, ASPE)
    Business Unit:  Canada Operations BU
```

- **Two legal entities** map one-to-one to the two real companies: the US parent and the Canadian subsidiary. This is not a judgment call — legal entities in Oracle Fusion must match real, legally distinct companies, and LTV genuinely has two.
- **Two primary ledgers**, one per legal entity, because of the currency difference just explained. Both ledgers use the **same chart of accounts structure** (lesson 5) and the **same calendar** (also lesson 5) — only the currency and the legal entity differ. Sharing structure and calendar is what makes consolidated reporting across both entities possible later.
- **Two business units**, one per legal entity, because each entity's transactions (purchasing, AP, AR) are processed independently by its own local team — Savannah for the US, Windsor for Canada. A business unit always references exactly one primary ledger, so this follows directly from having two ledgers.

## Why not one ledger for both entities

A tempting shortcut would be one ledger holding both entities, converting Canadian transactions to USD on entry. Oracle Fusion does support multiple legal entities under a single ledger, but only when they share the same ledger currency — and LTV's two entities do not. Forcing it would mean the Canadian subsidiary's statutory books are never actually in CAD, which fails a basic requirement of Canadian legal entity reporting. Two ledgers, one shared design, is the correct answer here — not a compromise.

## How this connects to what comes next

Lesson 4 takes this exact diagram and builds it: creating the two legal entities, the two primary ledgers, and the two business units in Oracle Fusion. Lesson 5 then designs the chart of accounts and calendar that both ledgers will share, and assigns the Company segment's balancing values (1000 for the US entity, 2000 for Canada) that tie every later transaction back to the entity that owns it.

## Key terms

| Term | Meaning |
|---|---|
| Legal entity | A real, legally distinct company that can own assets, owe liabilities, and be sued |
| Primary ledger | The ledger a legal entity's transactions post to; one currency, one chart of accounts, one calendar |
| Business unit | The organizational entity that actually processes transactions, tied to exactly one primary ledger |

## Recap

LTV Manufacturing Corporation's enterprise structure design is two legal entities, two primary ledgers (USD and CAD), and two business units — one full stack per real legal entity, sharing a common chart of accounts structure and calendar. Next up, lesson 4: configuring ledger, legal entity, and business units — building this exact design in Oracle Fusion.
