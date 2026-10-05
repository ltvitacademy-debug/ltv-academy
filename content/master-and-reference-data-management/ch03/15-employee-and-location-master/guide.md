# Lesson 15 — Employee and Location Master

**Chapter 3 · Master Data Domains · Lesson 15 of 25**

## What you'll learn

- What belongs in an employee master record, and why HR is almost always its system of record
- What belongs in a location master record, and the different kinds of "location" organizations track
- Why these two internal-facing domains are usually simpler to govern than customer, product, or vendor master
- How employee and location master connect to the other domains in this chapter

## Employee master: the internal-facing customer master

An **employee master** record is the authoritative source of who works for the organization, structurally similar to customer and vendor master — a party model entry, a unique employee ID, name, contact information, and status (active, on leave, terminated) — but with attributes specific to employment: job title, job code, department or cost center, manager (which creates its own hierarchy, Lesson 16), hire date, and employment type (full-time, contractor, temp).

The key difference from customer and vendor master is where the data originates. Employee master data overwhelmingly comes from one place — the **HR system** (an HRIS or core HR module) — rather than from dozens of inconsistent external touchpoints. That single point of entry is why employee master, while still requiring governance, usually has far less of the matching-and-deduplication burden that dominates customer master work (Chapter 2). The hard part with employee data is less "which records are duplicates" and more "which downstream systems (IT provisioning, payroll, badge access, benefits) are kept in sync when HR makes a change" — a distribution problem, which Lesson 21 covers directly.

## Location master: more than a mailing address

A **location master** record identifies every physical site the organization cares about: offices, warehouses, retail stores, manufacturing plants, and sometimes customer or vendor sites referenced for logistics. A location record typically holds a unique location code, address, geocode (latitude/longitude), location type (warehouse, store, office), and the operational attributes that matter for that type — a warehouse's storage capacity, a store's operating hours, a plant's production lines.

Location master data gets used constantly in ways that aren't obvious until something breaks: shipping and logistics systems route deliveries by location code, retail reporting rolls sales up by store and then by region, and tax calculation engines often need an accurate location (sometimes down to the geocode) to apply the correct jurisdiction's tax rate. A location record with a stale or wrong address doesn't just misdirect mail — it can misroute a shipment or miscalculate a tax liability.

## Why these domains are usually "easier"

Both employee and location master tend to be more tractable governance problems than customer, product, or vendor master, for the same underlying reason: a small number of authoritative internal systems (HR for employees; facilities, store operations, or ERP for locations) generate the data, rather than dozens of external touchpoints with no shared identifier. That doesn't mean zero effort — reorganizations change employee hierarchies constantly, and companies routinely open, close, or relabel locations — but the core data-quality fight (matching fuzzy external records together) mostly doesn't apply here the way it does in Chapter 2's domains.

## How these domains connect to the rest of the chapter

Employee and location master aren't isolated — they show up as attributes *inside* other domains. A customer record's account manager references an employee ID. A vendor's primary receiving dock references a location code. A sales order references both a customer and a ship-to location. This is exactly why master data governance (Lesson 5) treats these as a connected system of record rather than five unrelated spreadsheets: a broken reference in any one domain propagates into every domain that points at it.

## Key terms

| Term | Meaning |
|---|---|
| HRIS | Human Resources Information System — the typical system of record for employee master data |
| Cost center | An organizational unit used to track and allocate costs, often attached to an employee record |
| Location code | A unique identifier for a physical site, used across logistics, retail, and tax systems |
| Geocode | A latitude/longitude pair attached to a location record, used for routing and distance calculations |

## Lab

Think about your own employer (current, past, or a company you know well). List three systems besides HR that need to know when an employee joins, changes role, or leaves (think IT access, payroll, badge/building access, benefits enrollment). For each one, note whether you believe the update happens automatically from the HR system or requires someone to re-enter it manually — that gap is the distribution problem Lesson 21 addresses.

## Check yourself

Why does this lesson describe employee and location master as generally "easier" governance problems than customer or vendor master, and what specific kind of effort do they still require even though matching and deduplication are less of an issue?
