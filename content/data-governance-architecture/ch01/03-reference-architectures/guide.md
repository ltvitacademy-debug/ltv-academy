# Lesson 3 — Reference Architectures

**Chapter 1 · Governance Architecture Foundations · Lesson 3 of 30**

## What you'll learn

- The difference between a reference architecture and a solution architecture
- Three common reference-architecture patterns used for governance specifically
- How a real vendor's published reference architecture illustrates the hub pattern
- Why starting from a pattern beats designing from a blank page

## Reference architecture vs. solution architecture

A **reference architecture** is a reusable, generalized template for solving a class of problem — it's meant to be adapted by many different organizations, not copied exactly. A **solution architecture** is what one specific organization actually builds: the reference architecture adapted to its real platforms, its real scale, and its real constraints. When a vendor or standards body publishes a "data governance reference architecture," they're publishing a starting template, not a finished design — the actual implementation (the solution architecture) still has to account for whatever that specific organization already runs.

## Three governance reference-architecture patterns

1. **Hub-and-spoke.** A single central metadata hub connects out to every data platform ("spoke") in the organization, pulling in metadata, lineage, and classification from each one into one place. This pattern pairs naturally with a centralized operating model (Lesson 6), though a hub can also serve a federated one if domain teams retain authority over what gets published into it.
2. **Catalog-of-catalogs (federated index).** Instead of one hub holding everything directly, each domain or platform runs its own catalog, and a lighter-weight central index registers where each domain catalog lives and what it covers — so a user can discover the right domain catalog without any one system holding all the detail. This pairs with federated governance (Lesson 7).
3. **Mesh of catalogs.** Fully distributed: there is no central index at all. Discovery works through shared standards (common metadata formats, common APIs) that every domain catalog conforms to, so systems can find each other's data without a central registry. This pairs with the data-mesh pattern (Lesson 9).

## A real example of the hub pattern

Microsoft publishes its own reference architecture for Microsoft Purview, and it's a clear real-world instance of the hub-and-spoke pattern: Purview acts as a central hub that connects out to data sources across different clouds and on-premises systems, building a map of what exists, how it's classified, and how it traces from source to report. Looking at a published vendor reference architecture like this is a useful habit before designing your own — it shows you which pattern a given platform is actually built to support, rather than guessing.

## Why start from a pattern

Designing a governance architecture from a completely blank page means re-solving problems other organizations have already solved — and re-making their mistakes. Starting from a known reference architecture pattern, then adapting it against the principles from Lesson 2 and the specific operating model the organization has chosen (Chapter 2), gets you to a defensible design far faster, and gives you a shared vocabulary ("we're running catalog-of-catalogs, not a hub") for talking about the design with other architects.

## Key terms

| Term | Meaning |
|---|---|
| Reference architecture | A reusable, generalized template for a class of problem, meant to be adapted |
| Solution architecture | One specific organization's actual, built implementation |
| Hub-and-spoke | A single central metadata hub connected to every platform |
| Catalog-of-catalogs | A lightweight central index registering distributed domain catalogs |
| Mesh of catalogs | Fully distributed discovery through shared standards, with no central index |

## Lab

For an organization you know, sketch (in words, two or three sentences) which of the three patterns its current catalog and metadata setup actually resembles — even if nobody designed it on purpose. Note anything that doesn't cleanly fit one pattern.

## Check yourself

Can you explain the difference between a reference architecture and a solution architecture, and name the three governance reference-architecture patterns from this lesson along with the operating model each one naturally pairs with?
