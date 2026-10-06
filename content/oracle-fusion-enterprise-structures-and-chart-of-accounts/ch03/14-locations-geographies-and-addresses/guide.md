# Locations, Geographies and Addresses

This lesson closes out Chapter 3 with the quiet, physical-world data that every other structure quietly leans on: locations, geographies, and addresses. They rarely get discussed with the excitement of a chart of accounts, but skip them and legal entities, business units, and tax calculations all start behaving strangely.

## What you'll learn

- The difference between a legal address, a location, and a geography
- Why geography data (country, state, postal code structures) needs to be accurate before address entry
- How locations get reused across legal entities, business units, and HR structures
- Where these tasks live in Setup and Maintenance

## Three related, but distinct, concepts

- **Legal address**: the specific, formal address tied to a legal entity's registration — the one a government would mail a notice to. Created and managed through **Manage Legal Address**.
- **Location**: a broader-purpose address record, used anywhere Oracle Fusion needs "a place" — a business unit's office, a shipping location, an HR work location. Created through **Manage Locations**. A location can reuse a legal address, but it doesn't have to be tied to legal registration at all.
- **Geography**: the hierarchical reference structure — country, state/province, city, postal code — that validates and standardizes every address entered anywhere in the system. Managed through **Manage Geographies**.

```
Geography (country → state → city → postal code)
    validates
        ↓
Address (street, city, state, postal code, country)
    used by
        ↓
Legal Address  (tied to legal entity registration)
  or
Location        (used generally: offices, shipping points, HR sites)
```

## Why geography accuracy comes first

If a country's geography structure in Oracle Fusion is incomplete or wrong — missing states, wrong postal code format — every address entered against that country inherits the problem: validation errors, inconsistent formatting, or addresses that silently fail to map to the correct tax jurisdiction. Oracle Fusion ships with predefined geography data for many countries, but validating (not assuming) that data is correct for the countries you're actually using is a real step, not a formality, especially for less common countries or shortly after a new Oracle Fusion release.

## Reuse across the enterprise

A single location, once created, can be reused across many contexts — the same physical office might be the work location for several business units, the shipping-from location for a warehouse, and the address referenced by a legal entity's registered legal address, all without re-entering the same street address three times. This reuse is intentional: it keeps address data consistent and avoids the data-quality nightmare of five slightly different spellings of the same street address scattered across the system.

## Where you'll do this work

```
Setup and Maintenance → search:
  "Manage Geographies"     (do this first, or verify it)
  "Manage Legal Address"   (for legal entity registration)
  "Manage Locations"       (general-purpose addresses)
```

## Recap

Legal address, location, and geography are three related but distinct concepts: geography validates and standardizes addresses, legal address is the formal address tied to legal registration, and a location is the general-purpose, reusable address record used throughout the enterprise. That closes Chapter 3 — business units, functions, reference data sets, and the addresses underneath them. Chapter 4 moves to calendars and currencies, the remaining two of a ledger's "4 Cs."
