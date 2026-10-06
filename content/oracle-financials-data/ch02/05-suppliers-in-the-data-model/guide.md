# Suppliers in the Data Model

Chapter 1 introduced the idea that suppliers and customers both sit on top of a shared party layer. This lesson opens that up for suppliers specifically: which tables store a supplier's procurement-specific attributes, how a supplier connects back to its party identity, and where a supplier's sites and bank details live. Every invoice you study in Chapter 3 points back to a supplier defined here.

## What you'll learn

- The table that stores supplier-level procurement attributes, and its primary key
- How a supplier connects to its shared party identity
- The table that stores supplier sites, and why site-level attributes exist separately from the supplier header
- Where supplier bank account details are stored

## The supplier header: POZ_SUPPLIERS

Supplier-level attributes — purchasing defaults, tax classification, general classification — are stored in `POZ_SUPPLIERS`. Despite the `POZ_` prefix (a procurement-area prefix), this table is the one both Payables and Procurement rely on for the supplier record. Its primary key column is `VENDOR_ID`, a naming holdover from Oracle's older E-Business Suite terminology that Fusion kept for this key column even though the Fusion user interface always says "supplier," not "vendor." The supplier number itself (what a user would recognize on screen) is stored in a `SEGMENT1` column on this table — a reminder, from lesson 4, that flexfield-style segment columns show up even outside the chart of accounts.

## Connecting to identity: PARTY_ID

`POZ_SUPPLIERS` does not store the supplier's name or core identity directly. Instead, it carries a `PARTY_ID` column that points back to `HZ_PARTIES`, the shared Trading Community Architecture table introduced in lesson 1. This is the mechanic in action: the supplier's actual name and core identity live once in `HZ_PARTIES`; `POZ_SUPPLIERS` adds the procurement-specific role and attributes on top of that shared identity. If you ever need a supplier's name in a query, you are joining through `PARTY_ID` into `HZ_PARTIES` — it is not a column directly on the supplier table itself.

## Supplier sites: POZ_SUPPLIER_SITES_ALL_M

A single supplier can transact with your company from multiple addresses or under multiple operational arrangements — different remit-to addresses, different purchasing terms per location. That site-level detail lives in `POZ_SUPPLIER_SITES_ALL_M`, whose primary key is `VENDOR_SITE_ID`, with a `VENDOR_ID` foreign key tying each site back to its parent supplier in `POZ_SUPPLIERS`. Note the `_ALL` suffix from lesson 4: this table holds supplier sites across every business unit, so site-level attributes (like whether a given site is approved for payments) are often specific to one business unit even though the parent supplier record is shared.

Each site row carries its own operational flags — most notably whether that site is a valid **pay site** (payments can be issued to it) or a valid **purchasing site** (purchase orders can be issued against it). A supplier can have sites that are one, the other, or both, which is exactly the kind of detail that only lives at the site level, never on the supplier header.

## Supplier bank accounts

When a payment actually needs to be disbursed, Oracle Fusion needs to know where to send it. Supplier bank account details are stored in Oracle Payments schema tables, prefixed `IBY_`, most notably `IBY_EXT_BANK_ACCOUNTS`. These rows connect back to the relevant party (bank and branch are themselves represented as parties in `HZ_PARTIES`, another example of the shared identity layer being reused) and ultimately to the supplier or customer that owns the account. You won't need every column of this table for this course, but knowing it exists — and that bank details are not stored directly on `POZ_SUPPLIERS` — will save you a confused search later.

## Recap

Supplier-level attributes live in `POZ_SUPPLIERS` (primary key `VENDOR_ID`), which connects to the supplier's name and identity through `PARTY_ID` into `HZ_PARTIES`. Site-level detail — including pay-site and purchasing-site flags — lives separately in `POZ_SUPPLIER_SITES_ALL_M`, keyed by `VENDOR_SITE_ID`. Bank account details live in the `IBY_` Oracle Payments tables. Next up, lesson 6: customers, and the fuller Trading Community Architecture that supports both sides of the business.
