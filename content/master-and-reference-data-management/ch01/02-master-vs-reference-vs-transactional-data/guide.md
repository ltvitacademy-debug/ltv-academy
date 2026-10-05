# Lesson 2 — Master vs. Reference vs. Transactional Data

**Chapter 1 · MDM Foundations · Lesson 2 of 25**

## What you'll learn

- A clean, three-way split of organizational data: master, reference, and transactional
- How to tell them apart by volume, rate of change, and who defines them
- A worked example — one order record — showing all three types working together
- Why confusing reference data for master data (or vice versa) leads to the wrong governance approach

## Three categories, one real record

Every piece of data an organization keeps tends to fall into one of three buckets:

- **Master data** — the core entities: customers, products, vendors, employees, locations (Lesson 1). Defined and owned internally, changes slowly, relatively low volume.
- **Reference data** — standardized lists of allowed values used to classify or constrain other data: country codes, currency codes, unit-of-measure codes, status codes. Often defined externally (an ISO standard, a regulator) or centrally within the org, and changes rarely — a currency code list doesn't grow every day. Chapter 4 of this course is dedicated to reference data.
- **Transactional data** — the events: an order placed, a payment processed, a shipment sent. Time-stamped, generated continuously, and by far the highest volume of the three.

## Telling them apart

The fastest test: **does this record describe a thing, describe an allowed value, or describe an event?** A customer is a thing. A country code is an allowed value. An order is an event. Volume and change rate follow from that: things are relatively few and stable, allowed-value lists are small and very stable, events are numerous and constantly accumulating.

| | Master data | Reference data | Transactional data |
|---|---|---|---|
| What it is | Core business entities | Standardized code/lookup values | Business events |
| Example | Customer, Product, Vendor | Country code, Currency code, Status code | Order, Payment, Shipment |
| Volume | Low–moderate | Very low | Very high |
| Rate of change | Slow | Rare | Constant |
| Typically defined by | The organization itself | An external standard or a central internal authority | Generated automatically by business activity |

## One order, all three types at once

A single order record makes the relationship concrete. The order itself is **transactional data** — it happened at a specific moment and will never happen again in exactly that form. But almost every field on it points outward:

- `CustomerID` points to a **master data** record — which customer placed this order
- `CurrencyCode` and `CountryCode` point to **reference data** — standardized values like "USD" or "CA" that mean the same thing on every order, everywhere
- `OrderStatus` is also **reference data** — a controlled list like "Pending," "Shipped," "Cancelled," not free text

Without clean master data, you can't tell who placed the order. Without clean reference data, "Shipped," "shipped," and "SHP" might all mean the same thing but get counted as three different statuses in a report. Transactional data is only as trustworthy as the master and reference data it points to.

## Why the confusion costs you

Treating reference data like master data (giving every status code its own full MDM matching-and-stewardship workflow) is overkill — a status code list has maybe a dozen values and rarely needs fuzzy matching. Treating master data like reference data (hard-coding customer types into application code instead of governing them as real entities) under-invests in the thing most likely to cause real damage when it's wrong. Getting the category right determines which governance tools and processes in this course actually apply.

## Key terms

| Term | Meaning |
|---|---|
| Reference data | Standardized lists of allowed values (codes, categories) used to classify or constrain other data |
| Transactional data | Time-stamped records of business events, generated continuously at high volume |
| Code list | A specific instance of reference data — e.g., the list of valid country codes |

## Lab

Open any order, invoice, or transaction record you have access to (a bank statement line is fine). List every field on it, and sort each field into master, reference, or transactional. Count how many fields are reference data — most people are surprised how many there are.

## Check yourself

Can you explain, using the order-record example, why a single transactional record depends on both master data and reference data to be meaningful — and why mixing up which category a field belongs to leads to the wrong governance approach?
