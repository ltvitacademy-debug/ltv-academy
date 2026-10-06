# Lesson 11 — Adding an Asset Manually

**Chapter 3 · Adding Assets · Lesson 11 of 33**

## What you'll learn

- When the full "Add Asset" flow is the right tool, versus Quick Additions or mass additions
- The full set of information a manual addition captures
- How category defaults (Chapter 2) flow into the add-asset form
- How to work through adding a specific, fully-detailed asset

## When you'd add an asset manually

Oracle Fusion Assets gives you three ways to create a new asset: a full manual add, Quick Additions (Lesson 12), and Mass Additions from Payables (Lesson 13). The full **Add Asset** flow is the right choice when an asset is unusual enough, or important enough, to need deliberate, field-by-field attention — a one-off building improvement, a high-value piece of machinery with a non-standard depreciation life, or any asset where you expect to override several category defaults rather than accept them as-is.

## What a manual addition actually captures

Adding an asset manually walks through several groups of information, most of which should feel familiar from earlier chapters:

- **Description and category** — what the asset is, and the category (Lesson 4) that will hand over default depreciation rules.
- **Location and key flexfield** — where the asset sits, and any key flexfield segments the business uses (Lesson 5).
- **Financial information** — the asset's cost, the book(s) it's being added to, the units (how many identical items this addition represents), and the date placed in service.
- **Depreciation information** — the method, life, and prorate convention, all pre-populated from the category book but overridable here.
- **Assignment information** — which cost center or expense account the depreciation expense should charge to, and optionally which employee the asset is assigned to.

## Walking through an example

Meridian Fabrication Co. buys a custom-built inspection robot for its quality lab: $85,000, no realistic resale/salvage value, expected to be useful for 7 years, placed in service March 15. It's a one-off — nothing else in Meridian's "Machinery" category looks like it — so the person adding it overrides the category's default 10-year life down to 7 years and sets salvage value to zero, while leaving the depreciation method (straight-line) and prorate convention (mid-month) at their category defaults.

That single addition now exists as an asset record: it will show up in every report from Lesson 30 onward, accumulate depreciation starting at its March 15 in-service date (prorated per Lesson 7's mid-month convention), and can be adjusted, transferred, or retired like any other asset in Chapters 4 and 5.

## Multiple distributions on one asset

A single asset doesn't have to charge its depreciation expense to just one cost center. If three departments jointly use the same inspection robot, the asset can be split across multiple **distributions**, each with its own percentage and expense account — the same underlying asset, cost, and depreciation schedule, allocated proportionally across the organization that actually benefits from it.

## Key terms

| Term | Meaning |
|---|---|
| Add Asset | The full manual asset-creation flow, used for one-off or non-standard additions |
| Units | How many identical physical items a single addition record represents |
| Distribution | A percentage allocation of an asset's depreciation expense to a specific cost center or expense account |

## Lab

Using Meridian's $85,000 inspection robot (7-year life, zero salvage, March 15 in-service date, straight-line, mid-month convention), calculate its full annual depreciation once it's past its first partial year. Then propose a two-way distribution split if both the Quality and Engineering departments use the robot equally.

## Check yourself

Without looking back, can you name the five information groups a manual asset addition captures, and explain what a distribution actually splits?
