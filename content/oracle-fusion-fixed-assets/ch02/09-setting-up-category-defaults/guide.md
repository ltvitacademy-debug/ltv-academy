# Lesson 9 — Setting Up Category Defaults

**Chapter 2 · Depreciation Setup · Lesson 9 of 33**

## What you'll learn

- How to actually configure a category book's default depreciation rules
- The full list of fields a category book controls
- How defaults interact with what a person adding an asset can override
- Why getting category defaults right before go-live avoids painful cleanup later

## From concept to configuration

Lesson 4 introduced category books conceptually: the combination of a category and a specific asset book, carrying default depreciation rules. This lesson is about actually setting those defaults up — the task every Oracle Fusion Assets implementation does before a single real asset is added.

For every category that will be used in a given book, someone configures a category book record with:

- **Depreciation method** — which of the four types from Lesson 6 applies.
- **Life in months** — the useful life, expressed in months for precision (a "5-year life" is stored as 60 months).
- **Prorate convention** — which prorate convention (Lesson 7) governs this category's first and last partial years in this book.
- **Salvage value percentage** — the default percentage of cost treated as residual value.
- **Cost accounts** — the default asset cost account and asset clearing account.
- **Depreciation accounts** — the default depreciation expense account and accumulated depreciation (reserve) account.
- **Other accounts** — default accounts for revaluation reserve, revaluation amortization, and gain/loss on retirement, used if and when those transactions ever happen for an asset in this category (Chapters 4 and 5).

## Defaults versus overrides

Every one of these fields defaults onto a new asset the moment someone selects its category — but defaults aren't walls. When adding an asset manually (Lesson 11), a user can typically override the life, the depreciation method, or even individual GL accounts for that one specific asset, if there's a genuine reason it needs different treatment than its category's defaults. The point of category defaults isn't to remove flexibility; it's to make the *common case* — ninety-some percent of assets that don't need special treatment — fast to add correctly.

This is also why category design (Lesson 4) and category defaults work together: a category structure that's too coarse forces constant manual overrides, which defeats the purpose of having defaults at all.

## Different books, different defaults, same category

Because category books are configured per book (not globally), the same category — say, "Machinery" — gets its own, independently configured category book record in the corporate book and in each tax book. A straight-line 10-year life in the corporate book and an accelerated 7-year table-based method in a tax book are two separate category book records, both pointing at the same category.

## Key terms

| Term | Meaning |
|---|---|
| Category book record | The actual configuration setting a category's default depreciation rules for one specific book |
| Life in months | How Oracle Fusion Assets stores useful life internally, for precision below whole years |
| Override | A deviation from a category default applied to one specific asset, where the business genuinely needs it |

## Lab

Meridian Fabrication Co. is setting up a "Delivery Vehicles" category in its corporate book: 5-year straight-line life, 10% salvage value, mid-month convention. Write out the category book record's key fields as you would configure them, then explain in one sentence what would need to happen differently if Meridian also wanted "Delivery Vehicles" to use a 5-year table-based method in its tax book.

## Check yourself

Without looking back, can you list four fields a category book record controls, and explain why the same category can have two different category book records?
