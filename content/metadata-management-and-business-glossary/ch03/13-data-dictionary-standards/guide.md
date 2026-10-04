# Lesson 13 — Data Dictionary Standards

**Chapter 3 · Data Dictionaries · Lesson 13 of 25**

## What you'll learn

- Why a dictionary needs consistency standards even though much of it is auto-generated
- Three specific standards every dictionary should enforce
- A worked example showing a dictionary entry before and after standardization
- How this connects back to the naming and metadata standards covered earlier in this path

## Why standards still matter when the data is auto-generated

Lesson 12 showed that `INFORMATION_SCHEMA` auto-generates most of a dictionary entry's structural fields. That doesn't mean a dictionary is automatically consistent — the *values* those fields contain can still vary wildly across tables built by different teams, at different times, with different conventions. One table might use `CustID`, another `CustomerID`, another `customer_id`, all meaning the same thing. The schema is auto-documented; the *consistency* of what it documents still has to be deliberately maintained.

## Three standards every dictionary should enforce

1. **Naming convention compliance** — every documented column should follow the naming standard set in Data Governance Foundations (Lesson 20). A dictionary is a good place to actually *catch* naming violations, since it surfaces every column in one place for review.
2. **Mandatory description coverage** — every table and every column should have a non-empty description, not just the ones someone happened to get around to. A dictionary with 40% of columns documented isn't 40% useful; undocumented columns are exactly where confusion concentrates.
3. **Consistent terminology in descriptions** — if the glossary (Chapter 2) defines "Active Customer" one way, every dictionary description that references the concept of an active customer should use that same term, not independently reinvent the phrasing. This is the glossary-dictionary link from Lesson 11, enforced as a writing standard.

## A worked before/after

**Before standardization:**
- `CustID` — "the customer's ID number probably unique"
- `cust_active` — (no description)
- `LastPurch` — "date of last purchase I think"

**After standardization:**
- `CustomerId` — "Unique identifier for the customer record. Primary key."
- `IsActiveFlag` — "True when the customer qualifies as an Active Customer, per the business glossary definition. Recalculated nightly."
- `LastPurchaseDate` — "Date of the customer's most recent completed order."

The "after" version doesn't just add descriptions — it fixes naming (matching Data Governance Foundations' standard), removes hedging language ("probably," "I think" have no place in a dictionary entry), and explicitly links to the glossary term it implements.

## How this connects to earlier lessons in this path

This lesson is the data-dictionary-specific application of two ideas already covered: Data Governance Foundations' data standards (naming conventions) and this course's own metadata standards (Lesson 3's six core fields, ISO/IEC 11179's structure). A dictionary standard isn't a new idea — it's those two standards, enforced specifically on the dictionary artifact.

## Key terms

| Term | Meaning |
|---|---|
| Mandatory description coverage | A standard requiring every documented object to have a non-empty description, not just some |
| Terminology consistency | Using the glossary's exact wording in dictionary descriptions, rather than independently rephrasing |

## Lab

Take the table you documented in Lesson 12's lab. Check it against all three standards above: does every column follow a consistent naming convention, does every column have a real description, and does any description reference a business concept using different wording than your glossary (or a glossary you'd write) would use?

## Check yourself

Can you name all three dictionary standards from this lesson, and explain why "the schema is auto-generated" doesn't mean "the dictionary is automatically consistent"?
