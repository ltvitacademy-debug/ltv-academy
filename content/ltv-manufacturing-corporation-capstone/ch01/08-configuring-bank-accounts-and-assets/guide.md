# Configuring Bank Accounts and Assets

**Chapter 1 · Design and Configuration · Lesson 8 of 25**

This is the last configuration lesson before Chapter 2 puts the whole structure to work. Two pieces remain: the bank accounts LTV will disburse from and collect into, and the Fixed Assets setup — categories and books — needed before a single asset can be capitalized.

## What you'll learn

- LTV's two bank accounts and how each ties to its entity and currency
- Why Cash Management setup has to exist before bank reconciliation is possible
- The five fixed asset categories and two asset books LTV needs
- How this lesson's choices will matter again in Chapter 3

## Configuring bank accounts

| Bank | Account | Entity | Currency | Use |
|---|---|---|---|---|
| Regions Bank, Savannah, GA | ...7734 | LTV Manufacturing Corporation (US) | USD | Primary operating & disbursement account |
| Royal Bank of Canada, Windsor, ON | ...4420 | LTV Manufacturing Canada ULC | CAD | Canadian operating account |

Each bank account is set up with its own **bank, branch, and account** records, then assigned to its legal entity and linked to account 1110 (Cash — Operating) at the correct Company segment value — 1000 for Regions Bank, 2000 for Royal Bank of Canada. The Regions Bank account is also enabled for **electronic payment file transmission**, since Chapter 2's supplier payments go out by EFT from this account — remember this detail; it matters again when Chapter 2's bank reconciliation lesson loads January's statement.

## Configuring fixed asset categories and books

| Asset category | Depreciation method | Useful life |
|---|---|---|
| Manufacturing Equipment — Machinery | Straight-line | 10 years |
| Office Equipment | Straight-line | 5 years |
| Computer Equipment | Straight-line | 3 years |
| Furniture & Fixtures | Straight-line | 7 years |
| Building & Leasehold Improvements | Straight-line | 15 years |

Each category defaults to a natural account for cost (1710, Fixed Assets — Machinery & Equipment, for the manufacturing category) and a matching accumulated depreciation account (1715) and depreciation expense account (7610). Two asset books are configured — **LTV US Corporate Book** and **LTV Canada Corporate Book** — one per legal entity, consistent with every other structure decision in this chapter.

## Why the category list matters later

Five categories exist, each with a genuinely different useful life — 3, 5, 7, 10, and 15 years. This isn't decorative variety: assigning a capitalized asset to the *wrong* category produces a real, calculable difference in monthly depreciation, which is exactly the kind of setup-driven error a consultant has to be able to spot. Keep the Manufacturing Equipment (10-year) and Office Equipment (5-year) categories in mind in particular — they come up again in Chapter 2's asset capitalization lesson, and the difference between them becomes one of Chapter 3's six problems.

## Chapter 1 complete

With this lesson, Chapter 1's configuration is complete: two legal entities, two primary ledgers, two business units, a shared chart of accounts and calendar, four suppliers, three customers, two bank accounts, and the fixed asset categories and books. Everything from here forward is a transaction against this foundation.

## Key terms

| Term | Meaning |
|---|---|
| Asset book | A set of accounting rules (depreciation method conventions, calendar, ledger) that a capitalized asset is assigned to |
| Useful life | The number of periods over which an asset's cost is depreciated |

## Recap

LTV's two bank accounts — Regions Bank (USD, US entity) and Royal Bank of Canada (CAD, Canadian entity) — and its five fixed asset categories and two asset books are now configured, closing out Chapter 1. Next up, Chapter 2 begins with lesson 9: purchasing, from requisition to purchase order — the first real transaction run through this configuration.
