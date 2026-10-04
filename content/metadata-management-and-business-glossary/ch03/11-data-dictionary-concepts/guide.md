# Lesson 11 — Data Dictionary Concepts

**Chapter 3 · Data Dictionaries · Lesson 11 of 25**

## What you'll learn

- What a data dictionary is, and exactly how it differs from the business glossary
- Why a dictionary is organized around physical structures, not business concepts
- The core fields a dictionary entry needs that a glossary entry doesn't
- Why the two artifacts link together rather than replace each other

## What a data dictionary is

A **data dictionary** is a structured inventory of an organization's actual physical data structures — every table, every column, every data type, every constraint — described consistently enough to be searched and understood without opening the database itself. Where the business glossary (Chapter 2) answers "what does this concept mean to the business," the data dictionary answers "what is this specific table or column, structurally."

## Organized around structures, not concepts

Lesson 6 warned against organizing a *glossary* around tables, because business concepts don't map one-to-one onto physical structures. The data dictionary is the opposite case on purpose: it's organized *exactly* around tables and columns, because that's precisely what it's documenting. `dbo.Customer`, `dbo.Customer.CustomerId`, `dbo.Orders.OrderDate` — each physical object gets its own dictionary entry.

This is why a glossary and a dictionary are both necessary and why neither replaces the other: the glossary tells you what "Active Customer" means across however many tables calculate it; the dictionary tells you, for one specific table, exactly what's actually in it.

## What a dictionary entry needs that a glossary entry doesn't

Both still follow the six core metadata fields from Lesson 3 (name, definition, type, owner, status, reviewed date), but a dictionary entry adds structural facts a glossary term has no reason to carry:

- **Data type and length** — `VARCHAR(50)`, `DECIMAL(18,2)`, `DATETIME2`
- **Nullability** — can this column be empty, or is a value always required?
- **Constraints** — primary key, foreign key, check constraint, default value
- **Table/schema location** — exactly where this object physically lives

A glossary term like "Active Customer" doesn't have a data type — the concept itself isn't a column. But `dbo.Customer.IsActiveFlag`, the column that implements part of that concept, absolutely does.

## How the two artifacts link together

A well-built metadata program links glossary terms to the dictionary entries that implement them. "Active Customer" (glossary term) links to `dbo.Customer.IsActiveFlag` and the related columns that feed it (dictionary entries). Someone can start from either direction: read the business definition and follow the link to see exactly how it's calculated, or look at a column in a table and follow the link back to understand what it means in business terms. Chapter 5's data catalogs (Lesson 20 onward) are largely built around making this two-way link easy to navigate.

## Key terms

| Term | Meaning |
|---|---|
| Data dictionary | A structured inventory of physical data structures — tables, columns, types, constraints |
| Nullability | Whether a column is allowed to contain no value |
| Glossary-dictionary link | The connection between a business concept's definition and the physical columns that implement it |

## Lab

Pick one table you know well (from work, a personal project, or a public dataset). List its columns, and for each, note the data type and whether it's nullable — that's the skeleton of a dictionary entry. Then note which, if any, of those columns map to a business concept you could define in a glossary.

## Check yourself

Can you explain, without looking back, the difference between what a glossary entry documents and what a dictionary entry documents — and why a single business concept can map to multiple dictionary entries?
