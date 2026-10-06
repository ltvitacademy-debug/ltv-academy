# Lesson 4 — Asset Categories and Category Books

**Chapter 1 · Fixed Assets Fundamentals · Lesson 4 of 33**

## What you'll learn

- What an asset category is and how it's structured
- Why categories exist per book, not just once per company
- What a category book actually defaults onto a new asset
- How a well-designed category structure saves data entry for every future addition

## Categories group similar assets

An **asset category** groups assets that share the same accounting treatment — the same depreciation method, life, and GL accounts — so you don't have to re-specify those rules every time someone adds a forklift or a laptop. Oracle Fusion Assets structures a category as a combination of **segments**, typically a **major category** and a **minor category** (for example, major category "Computer Equipment," minor category "Laptops"). A company might have major categories for Computer Equipment, Office Furniture, Vehicles, Buildings, and Machinery, each split into minor categories that need their own depreciation rules.

## A category exists per book — not once, globally

This is the detail that trips people up: a category isn't configured once for the whole company. It's configured once **per asset book**. The combination of a category and a book is called a **category book**, and it's the category book — not the category by itself — that actually carries the default depreciation rules. That's necessary because a corporate book and a tax book legitimately depreciate the same category of asset differently: "Computer Equipment" might be 5-year straight-line in the corporate book and 5-year 200% declining balance (an accelerated method) in the tax book.

## What a category book defaults onto a new asset

When someone adds a new asset and selects a category, the category book for that asset's book hands over a set of defaults the person adding the asset doesn't have to re-type:

- **Depreciation method** — straight-line, declining balance, units of production, etc. (Lesson 6)
- **Useful life** — in years and months
- **Prorate convention** — how the first and last partial years of depreciation are handled (Lesson 7)
- **Default GL accounts** — asset cost, asset clearing, depreciation expense, accumulated depreciation, and gain/loss on retirement
- **Depreciation limits** — whether depreciation can continue below a salvage value, and ceiling amounts if applicable

Every one of these defaults can usually be overridden on an individual asset if it genuinely needs different treatment — but the point of category books is that most assets of the same type don't need an override, so most additions are fast.

## Designing categories well

A category structure that's too coarse (one category for "Equipment") loses the ability to apply different depreciation rules where they're genuinely needed. One that's too granular (a separate category for every model number) turns setup and maintenance into a burden with no accounting benefit. Good category design groups assets by **how they're actually depreciated and accounted for** — not by how a warehouse team might physically organize them.

## Key terms

| Term | Meaning |
|---|---|
| Asset category | A grouping of assets sharing the same accounting treatment, built from major/minor segments |
| Category book | The combination of a category and a specific asset book — this is where default depreciation rules actually live |
| Major/minor category | The segment structure (e.g., "Computer Equipment" / "Laptops") that forms a category's code |

## Lab

Fictional company **Meridian Fabrication Co.** owns CNC machines, office laptops, delivery vans, and a single owned warehouse building. Propose a major/minor category structure for these four asset types, and explain why you would (or wouldn't) give CNC machines and delivery vans separate minor categories under a shared major category.

## Check yourself

Can you explain, without looking back, why the same category can carry different depreciation rules in a corporate book versus a tax book, and name three defaults a category book hands to a new asset?
