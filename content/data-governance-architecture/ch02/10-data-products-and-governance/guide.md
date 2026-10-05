# Lesson 10 — Data Products and Governance

**Chapter 2 · Operating Models · Lesson 10 of 30**

## What you'll learn

- "Data as a product," the second data-mesh principle from Lesson 9, in architectural depth
- The characteristics a data product has to have to actually earn that name
- Ports and data contracts: where governance actually attaches to a data product
- Why this idea generalizes beyond data mesh, into any of the other three models

## A product, not just a table

Lesson 9 introduced "data as a product" as one of data mesh's four principles: a domain treats the data it produces as a product with real consumers, not just a byproduct of some other process. This lesson goes deeper on what that actually requires architecturally, and shows why it's useful even outside a full data-mesh adoption.

## What makes something a data product, not just a dataset

A raw table in a database isn't automatically a data product. For something to earn that name, it generally needs to be:

- **Discoverable.** It shows up in a catalog, with enough description that someone outside the producing team can find it.
- **Addressable.** It has a stable, known way to be accessed — a consistent name or endpoint that doesn't change out from under consumers.
- **Trustworthy.** Its quality is known and communicated, not assumed — consumers can see whether it meets a stated bar.
- **Self-describing.** Its schema, meaning, and classification are documented alongside it, not kept in someone's head or a separate wiki that goes stale.
- **Interoperable.** It uses shared conventions (common identifiers, common formats) so it can actually be joined with other domains' products.
- **Secure.** Access control travels with the product itself, not as an afterthought bolted on by whoever consumes it later.

## Where governance actually attaches: ports and contracts

Architecturally, a data product has an **output port** — the defined interface other domains or systems actually consume (a table, an API, a file extract) — separate from however the product is built internally. Governance attaches at that output port, not at the internal implementation: a **data contract** travels with the output port, specifying the schema, the quality guarantees, the classification tags, and who's accountable for it. This is what lets a catalog or policy engine (whichever reference architecture pattern is in use) govern the product without needing to understand or reach into how the domain built it internally.

## Why this generalizes beyond data mesh

"Data as a product" is a data-mesh principle, but the practice of attaching governance metadata at a defined product boundary rather than at the raw table level is useful in a centralized or federated architecture too. A centralized hub can require every dataset registered in it to meet the data-product bar before publication; a federated shared schema (Lesson 7) can define what a compliant data contract has to include. Treating "data product" as the unit of governance — rather than "every individual table" — is a design choice any of the four models in this chapter can adopt, even if full data mesh isn't.

## Key terms

| Term | Meaning |
|---|---|
| Data product | Data treated and governed as a product with real consumers — discoverable, addressable, trustworthy, documented, interoperable, and secure |
| Output port | The defined, stable interface other systems actually consume a data product through |
| Data contract | The schema, quality guarantee, classification, and ownership information that travels with a data product's output port |

## Lab

Pick one dataset you know that's used by more than one team. Check it against the six characteristics above — discoverable, addressable, trustworthy, self-describing, interoperable, secure. Which ones does it actually meet, and which is the weakest?

## Check yourself

Can you list the six characteristics a data product needs, and explain in one sentence why governance attaches at the output port rather than at the product's internal implementation?
