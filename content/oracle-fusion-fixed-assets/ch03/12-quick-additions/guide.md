# Lesson 12 — Quick Additions

**Chapter 3 · Adding Assets · Lesson 12 of 33**

## What you'll learn

- What Quick Additions trades away in exchange for speed
- The minimal set of fields it actually requires
- Why it leans even more heavily on category defaults than a manual addition
- When Quick Additions is the wrong tool, not just a faster one

## A deliberately smaller form

Quick Additions is a stripped-down version of the full Add Asset flow from Lesson 11, built for the overwhelming majority of additions that are completely routine: a standard laptop, a typical piece of office furniture, another unit of equipment identical to twenty others already on the books. Where a manual addition walks through five groups of information, Quick Additions asks for the handful of fields that can't be defaulted from anywhere else:

- **Description** — what the asset is.
- **Category** — which hands over the full set of depreciation defaults (method, life, convention, GL accounts) without the user seeing or confirming each one individually.
- **Cost and units** — how much, and how many identical items.
- **Date placed in service** — when the depreciation clock starts.
- **Book** — which book this addition belongs to.

Everything else — the depreciation method, the life, the prorate convention, every GL account — comes straight from the category book (Chapter 2) with no opportunity to review it on the Quick Additions screen itself. That's the entire point: for a routine asset, those defaults are already correct, so asking a person to re-confirm them on every single addition just adds friction without adding accuracy.

## Why this depends so heavily on category design

Quick Additions is only as good as the category structure behind it. If Meridian Fabrication Co.'s categories are well-designed (Lesson 4) — grouped by how assets actually depreciate — then Quick Additions correctly handles the vast majority of day-to-day additions with zero risk of a wrong default slipping through unnoticed. If categories are too coarse, Quick Additions will silently apply the wrong life or method to assets that needed different treatment, and nobody reviewing the Quick Additions screen would ever see it happen, because those fields simply aren't shown.

## When Quick Additions is the wrong tool

Quick Additions isn't a shortcut you can always reach for. It's the wrong tool whenever:

- The asset genuinely needs a non-default depreciation method, life, or account — go back to manual addition (Lesson 11).
- The asset needs to be split across multiple distributions at the point of addition.
- The asset needs a non-default location or key flexfield value beyond what Quick Additions exposes.

## Key terms

| Term | Meaning |
|---|---|
| Quick Additions | A stripped-down asset-creation flow for routine additions, relying entirely on category defaults |
| Default without confirmation | Quick Additions' defining trait — defaulted fields aren't shown for per-asset review |

## Lab

Meridian Fabrication Co. buys twelve identical standard laptops for its sales team: $1,400 each, placed in service the same day, all in the existing "Computer Equipment / Laptops" category with well-established defaults. Explain why Quick Additions is the right tool here, and what single field would force you back to a manual addition instead if, say, three of the twelve laptops were going to a different cost center than the other nine.

## Check yourself

Without looking back, can you list the fields Quick Additions actually asks for, and explain why it depends more heavily on good category design than a manual addition does?
