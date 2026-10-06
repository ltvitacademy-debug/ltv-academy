# Lesson 20 — Data Products and Data Assets

**Chapter 4 · Catalog and Glossary · Lesson 20 of 35**

## What you'll learn

- The difference between a data asset and a data product, and why it matters for access requests
- Where data products live — nested inside governance domains
- What a well-built data product actually contains: description, use case, contacts, linked assets
- How data products get measured, not just described, through an automated governance score

## One table vs. one package

A **data asset** is a single technical thing: one table, one file, one Power BI report — whatever Data Map scanned. A **data product** is something different: a curated bundle of related data assets, packaged around a specific, named use case, so someone can find the *whole picture* in one place instead of hunting down individual tables one at a time.

The example Microsoft's own documentation uses is a good one: instead of a business user requesting access to fifteen different tables separately to build a customer analysis, someone researches and curates a "Customer 360" data product once — and every other user who needs the same thing finds it, requests it, and gets everything they need in a single request.

## Where data products live

Data products aren't floating free — they belong to a **governance domain**. Opening a domain's detail page shows exactly how many data products (and glossary terms, OKRs, and critical data elements) live inside it.

![A governance domain's detail page for "Fraud Services," with business concept cards showing 4 data products, 9 glossary terms, 1 OKR, 1 critical data element, and 0 custom attributes.](/courses/microsoft-purview/ch04/20-data-products-and-data-assets/governance-domain-overview.png)
*A domain's "business concepts" row is a quick census of what's actually been built inside it — here, four data products and nine glossary terms.*

## What a data product actually contains

A well-built data product isn't just a name — its details page carries real substance:

- **Description and use case** — what this product is for, in plain business language
- **Terms of use and contacts** — who owns it, and the conditions attached to using it
- **Linked data assets, glossary terms, and critical data elements** — the actual tables, files, and reports packaged inside, plus the business vocabulary and sensitive-field tracking attached to them

Every data product needs an accountable **owner** — someone who shows up in the Contacts panel and is responsible for the product staying accurate and useful.

![A data product's Contacts panel, assigning "System Administrator" the role of "Data product owner."](/courses/microsoft-purview/ch04/20-data-products-and-data-assets/edit-contact-description.png)
*A real person, with a real role, attached to every data product — not an anonymous bundle of tables.*

## Measured, not just described

A data product isn't just a description — Purview automatically scores it against governance standards, and reports roll that scoring up across the whole catalog.

![A Data product details report, with KPI tiles for Classification, Ownership, Connection, DQ Measurement, Self serve, Compliant, Catalog, Certification, MDQ Linked assets, and MDQ usability, plus a bar chart of governance score by data product.](/courses/microsoft-purview/ch04/20-data-products-and-data-assets/data-governance-report-details.png)
*Ten governance KPIs, auto-calculated per data product — no one is manually tallying whether a product has an owner or a description. Chapter 5 covers these reports in depth.*

This matters because it closes the loop on curation: a data product with no description, no owner, and no classified columns scores poorly and shows up as a gap to fix — governance isn't a one-time act, it's a continuously measured state.

## Key terms

| Term | Meaning |
|---|---|
| Data asset | A single technical item scanned into the catalog — a table, file, or report |
| Data product | A curated bundle of related data assets, built around a named use case |
| Data product owner | The accountable contact responsible for a data product's accuracy and usefulness |
| Governance score | An automated, per-product score reflecting how well it meets governance standards |

## Lab

Pick three data assets you know of (real or hypothetical) that would naturally belong together — for example, three tables that together answer "who are our active customers." Describe the data product you'd build from them: a name, a one-sentence use case, and who should own it.

## Check yourself

Can you explain the difference between a data asset and a data product in one sentence? Can you name at least three things a well-built data product's details page should contain? Can you explain why a data product gets an automated governance score instead of just a description?
