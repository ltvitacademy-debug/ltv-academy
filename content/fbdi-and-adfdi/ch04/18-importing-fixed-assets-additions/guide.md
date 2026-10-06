# Importing Fixed Assets Additions

Fixed Assets has a distinctive, two-step flavor of this pipeline that's worth calling out on its own: new assets are brought in as **Mass Additions**, and getting them from "staged" to "a depreciating asset on the books" takes one extra deliberate step beyond what you've seen so far.

## What you'll learn

- What a "mass addition" is, and where it can come from
- The interface table Fixed Assets uses, and how a row lands there
- The two-step create-then-post pattern specific to this module
- Why this module is a common companion to a Payables invoice conversion

## Where mass additions come from

A mass addition is a candidate fixed asset waiting to be formally added to the asset register — a building, a piece of equipment, a vehicle, a fleet of laptops. Mass additions arrive from two main sources: directly through the Mass Additions Create FBDI template, for data like a legacy asset register being converted at go-live, and automatically from Payables, when an invoice line gets coded as a capital asset purchase rather than an ordinary expense. Both paths land in the same place.

## The interface table

Both sources feed **FA_MASS_ADDITIONS**, the Fixed Assets staging table. A row here isn't yet a real asset — it's a candidate, holding details like a description, a cost, a unit, and a proposed asset category, waiting for someone (or some process) to review and formally create it.

## The two-step pattern: create, then post

Unlike journals or invoices, Fixed Assets additions typically go through two distinct actions even after staging: **Mass Additions Create**, which processes the staged rows in FA_MASS_ADDITIONS into formal, reviewable asset records, and a separate **posting** step that actually adds the asset to the books and starts depreciation. This extra step exists because a mass addition — especially one that arrived automatically from a Payables invoice — often benefits from a human review before it's treated as a finished, depreciating asset: confirming the asset category, useful life, and depreciation method are all correct before they're locked in.

## Why this pairs naturally with Payables conversions

Because one entire source of mass additions is capital-coded Payables invoice lines, a Fixed Assets consultant working a go-live conversion often finds themselves reviewing mass additions that trace directly back to invoices loaded in lesson 16 — which is a good example of why this course groups these five modules together: they aren't five unrelated topics, they're five connected stops a single implementation's data actually travels through.

## Recap

Fixed Assets additions stage into FA_MASS_ADDITIONS from either a dedicated FBDI template or automatically from capital-coded Payables invoices, and then go through a create step followed by a separate posting step before becoming a real, depreciating asset. Next up, lesson 19: importing bank statements, where the file itself often comes from a bank rather than from inside Oracle Fusion's own templates.
