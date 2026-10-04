# Lesson 3 — Metadata Standards

**Chapter 1 · Metadata Foundations · Lesson 3 of 25**

## What you'll learn

- Why metadata needs its own standards, separate from the data standards covered in Data Governance Foundations
- ISO/IEC 11179, the most widely cited metadata registry standard
- The core elements a standardized metadata entry should always include
- A quick comparison of how this differs from the naming standards covered earlier in this path

## Why metadata needs standards of its own

Data Governance Foundations Lesson 20 covered data standards — rules about the *data itself* (account numbers are 10 digits, dates are ISO 8601). Metadata standards are one level up: rules about how you *describe* data consistently, so that descriptions written by different teams, in different systems, years apart, still mean the same thing and can be compared.

Without a metadata standard, one team's glossary entry might have a one-line definition and no owner field, while another team's entry has a three-paragraph definition, an owner, a steward, and a review date. Neither is wrong on its own, but you can't build a reliable catalog (Chapter 5) out of inconsistent entries — search, filtering, and quality scoring all depend on every entry having the same shape.

## ISO/IEC 11179 — the reference standard

**ISO/IEC 11179**, "Information technology — Metadata registries," is the most widely cited standard for structuring metadata about data elements. It doesn't mandate specific values — it mandates *which fields a complete metadata record should have* and how they relate to each other. Its core idea is the **data element**, built from three parts:

- **Object class** — what real-world thing is being described (e.g., "Customer")
- **Property** — the specific characteristic of that thing (e.g., "Date of Birth")
- **Representation** — how that characteristic is actually stored (e.g., a `DATE` value in `YYYY-MM-DD` format)

"Customer" + "Date of Birth" + a `DATE` representation together fully specify the data element in a way that's unambiguous and comparable to any other data element built the same way, at any organization that also follows ISO/IEC 11179.

## The core fields any standardized entry should have

Regardless of which specific standard an organization adopts, mature metadata practice converges on roughly the same required fields for any metadata entry:

1. **Name** — a unique, consistent identifier
2. **Definition** — what it means, in plain language
3. **Data type / representation** — how it's actually stored
4. **Owner / steward** — who is accountable for it
5. **Status** — active, deprecated, under review
6. **Last reviewed date** — when the entry was last confirmed accurate

A glossary or dictionary entry missing several of these isn't necessarily *wrong* — but it's incomplete, and incomplete entries are exactly what makes catalogs (Chapter 5) unreliable to search.

## How this differs from the naming standards you already covered

| | Data Governance Foundations, Lesson 20 (data standards) | This lesson (metadata standards) |
|---|---|---|
| Governs | The data values themselves | How you describe the data |
| Example rule | "Account numbers must be 10 digits" | "Every glossary entry must have a name, definition, owner, and status" |
| Violated by | A malformed account number in a table | A glossary entry with no owner listed |

Both matter, and they reinforce each other: a well-named, well-typed column (data standard) is much easier to document well (metadata standard) than a poorly named one.

## Key terms

| Term | Meaning |
|---|---|
| ISO/IEC 11179 | The reference standard for structuring metadata registries |
| Data element | Object class + property + representation — the atomic unit ISO/IEC 11179 builds metadata records around |
| Object class | The real-world thing a data element describes (e.g., "Customer") |

## Lab

Pick any field you've documented before (in a spreadsheet, a README, a ticket) — or one you use regularly but have never documented. Check it against the six core fields listed above. How many does it actually have? Write the one or two that are missing.

## Check yourself

Can you break any real data element down into its object class, property, and representation, and name all six core fields a standardized metadata entry should include?
