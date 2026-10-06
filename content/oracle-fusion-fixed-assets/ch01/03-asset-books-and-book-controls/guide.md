# Lesson 3 — Asset Books and Book Controls

**Chapter 1 · Fixed Assets Fundamentals · Lesson 3 of 33**

## What you'll learn

- What an asset book is, and why every asset must belong to one
- The three book classes: corporate, tax, and budget
- The key control settings defined once, at the book level
- How a book ties back to a specific ledger and chart of accounts

## An asset book is a container, not just a setting

Every asset you'll ever add in Oracle Fusion Assets belongs to an **asset book**. The book isn't a cosmetic label — it's the container that determines which ledger an asset's accounting lands in, which calendar its depreciation follows, and which set of default rules it inherits. Two companies running in the same Oracle Fusion instance, or even two legal entities in the same company, will typically each have their own corporate book, because each needs its own ledger, its own currency, and potentially its own accounting rules.

## Three book classes

Oracle Fusion Assets supports three kinds of books, and understanding which is which matters for everything that follows in this course:

- **Corporate book** — the primary book, used for financial statement reporting under the company's primary accounting standard (US GAAP, IFRS, etc.). Every asset starts life in a corporate book.
- **Tax book** — a secondary book that depreciates the same assets differently to satisfy tax reporting requirements (different method, life, or convention — covered in depth in Lesson 10). Tax books are populated from a corporate book via a **mass copy** process rather than manual entry.
- **Budget book** — used to forecast and plan future depreciation and capital spending without affecting actual financial or tax books at all.

## What gets set at the book level

When an asset book is created, several controls are fixed for every asset that will ever belong to it:

- **Ledger and chart of accounts** — the book is tied to one ledger, which determines the chart of accounts, currency, and accounting calendar it ultimately reports into.
- **Depreciation calendar** — the fiscal year/period structure Assets uses to calculate and allocate depreciation (Lesson 8 covers this in detail; it is not always identical to the GL calendar).
- **Allow mass changes / allow mass additions** — book-level switches controlling whether bulk processes are permitted for assets in this book.
- **Depreciation defaults** — default rounding rules, whether to allow depreciation below zero net book value, and similar calculation controls that apply uniformly to every asset in the book unless a category or asset overrides them.
- **Natural account defaults** — default general ledger accounts (asset clearing, cost, depreciation expense, accumulated depreciation, gain/loss) that categories and assets will draw from unless they specify their own.

## Why this matters before you add a single asset

Everything in Chapters 2–6 — categories, depreciation methods, mass additions, period close — happens **inside a book**. Get the book controls wrong (the wrong calendar, the wrong ledger), and every asset added to that book inherits the mistake. This is exactly why book setup is one of the first configuration tasks in any Oracle Fusion Assets implementation, done long before the first real asset is ever added.

## Key terms

| Term | Meaning |
|---|---|
| Asset book | The container tying assets to a ledger, calendar, and default rules; every asset belongs to exactly one corporate book |
| Corporate book | The primary book used for financial statement reporting |
| Tax book | A secondary book, populated by mass copy from a corporate book, used for tax reporting with potentially different depreciation rules |
| Mass copy | The process that copies corporate book asset data and transactions into an associated tax book |

## Lab

Fictional company **Meridian Fabrication Co.** operates in the United States and reports under US GAAP, but also needs to file a US federal tax return using different depreciation lives than its financial statements use. Describe, in two or three sentences, which book classes Meridian needs and how data would move between them.

## Check yourself

Can you explain, without looking back, why a tax book is never entered manually the way a corporate book is, and name two controls that are fixed at the book level rather than the asset level?
