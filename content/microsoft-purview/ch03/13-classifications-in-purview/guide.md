# Lesson 13 — Classifications in Purview

**Chapter 3 · Classification and Labels · Lesson 13 of 35**

## What you'll learn

- What a classification actually is, and what it's based on
- How classifications get applied — automatically during a scan, or by hand afterward
- Where classifications show up on an asset, and what details Purview tracks about each one
- Why table assets need classifications added manually, unlike files and columns

## What a classification is

A **classification** is a logical tag Purview assigns to a data asset based on the business context of what's actually in it — *Passport Number*, *Credit Card Number*, *Person's Name*, *SWIFT Code*, and hundreds more. Classifying your assets makes them easier to search, easier to govern, and easier to reason about from a risk standpoint: once you know *where* sensitive data types live across your estate, you can actually do something about protecting them.

Purview ships with **200+ built-in system classifications** out of the box, and you can define your own **custom classifications** on top — the next lesson covers that distinction in depth. Here's what a scanned table looks like once classification has run:

![Screenshot showing the classification of the Customer table in Azure SQL Database, with Email Address, Person's Name, and U.S. Phone Number listed under Schema classifications.](/courses/microsoft-purview/ch03/13-classifications-in-purview/classification-customers-example-1.png)
*Each classification here carries a thunderbolt icon — a visual signal that it's a system classification, applied automatically during the scan.*

## Automatic vs. manual application

Classifications can be applied two ways:

- **Automatically**, during a scan — Purview samples the data in file and column assets and compares it against whatever classification rules are included in the scan rule set attached to that scan.
- **Manually**, after the fact — through the asset's own detail page in the Unified Catalog, whenever a scan didn't (or couldn't) classify something you need tagged.

Start from an asset's **Overview** tab and select **Edit** to add a classification by hand:

![Screenshot showing the asset detail page for a file asset before any classifications have been added.](/courses/microsoft-purview/ch03/13-classifications-in-purview/asset-detail-page.png)
*No classifications yet — the Classifications section is empty until you add one.*

From the **Classifications** dropdown, pick whichever ones apply — system, custom, or both:

![Screenshot showing the Classifications dropdown with Credit Card Number (a system classification) and CustomerAccountID (a custom classification) both checked.](/courses/microsoft-purview/ch03/13-classifications-in-purview/select-classifications.png)
*Mixing a system classification with a custom one in the same selection is completely normal.*

Select **Save**, and the asset's Overview tab confirms what landed:

![Screenshot showing the asset's Overview tab after saving, now displaying Classifications (2): Credit Card Number and CustomerAccountID.](/courses/microsoft-purview/ch03/13-classifications-in-purview/confirm-classifications.png)
*Confirmed — both classifications now show on the asset.*

## One exception: table assets

Scanning automatically classifies **file and column assets**, but *not* **table assets** — classifications live on a table's columns, not the table row itself. If you want a classification to show up on the table asset's own Overview page, you have to add it manually, the same way shown above.

## What Purview tracks about each classification

Hover any applied classification to see its details card: the **classification name**, **who applied it** (a scan, or a specific user), **when** it was applied, and its **type** (system or custom). Users with the Data Curator role see even more — the sample count the scanner read, and how many distinct values it found in that sample.

## Key terms

| Term | Meaning |
|---|---|
| Classification | A logical tag describing the kind of data an asset contains, based on business context |
| System classification | One of 200+ Microsoft-provided classifications, available out of the box |
| Automatic classification | Applied during a scan, by comparing sampled data against the scan rule set's rules |
| Manual classification | Added by a user on an asset's Overview tab, any time after a scan |

## Lab

Find (or imagine) a table asset and one of its columns in the Unified Catalog. List which classifications you'd expect the column to pick up automatically from a scan, and explain why the table itself wouldn't show any classifications unless you added them by hand.

## Check yourself

Why doesn't scanning automatically apply a classification to a table asset itself, even though it does classify that table's individual columns?
