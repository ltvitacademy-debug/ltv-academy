# Configuring the Chart of Accounts and Calendar

**Chapter 1 · Design and Configuration · Lesson 5 of 25**

This is the lesson every later chapter leans on. The chart of accounts design here is the exact five-segment design you worked through in Enterprise Structures and Chart of Accounts — this lesson configures it for real, plus the calendar both ledgers share.

## What you'll learn

- The full five-segment chart of accounts, with every value you'll use for the rest of this capstone
- How the Company segment's balancing values tie to the two legal entities from lesson 4
- The natural accounts you'll actually transact against in Chapter 2 and investigate in Chapter 3
- The calendar structure, and why period 1 matters so much to this capstone

## The chart of accounts structure

```
LTV Manufacturing COA — five segments
  Segment 1: Company        (4 digits) — Balancing segment
  Segment 2: Cost Center     (3 digits) — Cost Center segment
  Segment 3: Account          (4 digits) — Natural Account segment
  Segment 4: Intercompany      (4 digits) — Intercompany segment
  Segment 5: Future              (3 digits) — reserved, no values enabled
```

Account combinations read as **Company-CostCenter-Account-Intercompany-Future**, for example `1000-420-7610-0000-000`.

## Company segment values (the balancing segment)

| Value | Entity |
|---|---|
| 1000 | LTV Manufacturing Corporation (US parent) |
| 2000 | LTV Manufacturing Canada ULC |

These values are what lesson 4's legal entity assignments actually hook into — every account combination used on a US transaction must carry 1000, every Canadian transaction must carry 2000, and Oracle Fusion enforces this through the primary balancing segment assignment.

## Cost center segment values

| Value | Cost center | Exists in |
|---|---|---|
| 410 | Assembly | Both entities |
| 420 | Fabrication | Both entities |
| 510 | Corporate Overhead | Both entities |

## Natural account values you'll use in this capstone

| Account | Name | Type |
|---|---|---|
| 1110 | Cash — Operating | Asset |
| 1210 | Accounts Receivable — Trade | Asset |
| 1250 | Intercompany Receivable | Asset |
| 1410 | Inventory — Raw Materials | Asset |
| 1710 | Fixed Assets — Machinery & Equipment | Asset |
| 1715 | Accumulated Depreciation — Machinery & Equipment | Contra-asset |
| 2110 | Accounts Payable — Trade | Liability |
| 2150 | Accrued Liabilities (GRNI) | Liability |
| 2410 | Intercompany Payable | Liability |
| 4100 | Product Revenue | Revenue |
| 7110 | Corporate Overhead Allocation Expense | Expense |
| 7410 | Utilities Expense | Expense |
| 7610 | Depreciation Expense — Machinery & Equipment | Expense |
| 7850 | Freight Out — Customer Shipments | Expense |

Account 7850 is new — added specifically to track freight charged on customer shipments. Remember that: it matters in Chapter 2 and becomes one of Chapter 3's six problems.

## Intercompany segment

Intercompany segment values mirror the Company segment exactly (1000, 2000), per the cross-validation rule that restricts an entity from recording an intercompany value equal to its own Company value — an intercompany leg always names the *other* entity.

## The calendar

**LTV Corporate Calendar** — a standard Gregorian monthly calendar, twelve periods per fiscal year, fiscal year equal to calendar year. This capstone's fiscal year is **2026**, and **Period 1, Jan-26, is the very first period this configuration will ever close** — which is exactly why Chapter 3's crisis lands on January 31: it's this company's first month-end close, on a brand-new configuration, with zero history of "we've done this before."

## Key terms

| Term | Meaning |
|---|---|
| Balancing segment | Company (1000/2000) — must net to zero per entity within its ledger |
| GRNI | Goods Received, Not Invoiced — the accrued liability for receipts without a matching invoice yet |
| Cross-validation rule | A rule restricting which segment value combinations are allowed together |

## Recap

LTV's chart of accounts is a five-segment design — Company, Cost Center, Account, Intercompany, Future — shared by both ledgers, with Company values 1000 (US) and 2000 (Canada) as the balancing segment. The LTV Corporate Calendar is a standard Gregorian monthly calendar, and Period 1, Jan-26, is this company's first-ever month-end close. Next up, lesson 6: configuring suppliers — the first master data you'll actually transact against.
