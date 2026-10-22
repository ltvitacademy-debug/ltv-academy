# Lesson 11 — Catalog Items & Categories

**Chapter 3 · Service Catalog Administration · Lesson 11 of 36**

## What you'll learn

- Where catalog items and categories actually live: `sc_cat_item` and `sc_category`
- How categories form a hierarchy, and how that hierarchy shapes the end-user browsing experience
- The core fields every catalog item needs: Short description, Price, Delivery time, Catalog
- How a catalog item relates to a Catalog (`sc_catalog`) — and why most orgs run just one
- Why the Service Catalog is the real front door to Service Request Management

## From ITIL concept to real table: sc_cat_item

Course 1 of this path introduced Service Request Management as an ITIL practice — the idea that routine, pre-approved requests (a new laptop, access to a shared drive, a software install) shouldn't flow through the same unstructured intake as an incident. The Service Catalog is where that concept becomes a real, administered object in ServiceNow. Every catalog item an end user can browse and order — "Request a Laptop," "New Hire Onboarding," "Request VPN Access" — is a row on the `sc_cat_item` table. As the administrator, building out the catalog means populating this table with items that are accurate, priced correctly, and routed to the right fulfillment process, not writing code.

A catalog item record carries the fields that make it usable by a non-technical requester:

- **Short description** — what shows on the catalog tile; needs to be understandable to someone who has never heard the word "ServiceNow."
- **Price** — optional, but real in orgs that charge back IT costs to a department; defaults to 0.00 when there's no chargeback model.
- **Delivery time** — a plain-language expectation ("3 business days") shown to the requester before they click Order Now, set by the admin based on the real fulfillment SLA.
- **Catalog** — a reference to which `sc_catalog` record this item belongs to (next section).
- **Category** — a reference to `sc_category`, controlling where the item appears when a user browses rather than searches.

## sc_catalog: one storefront, or several

`sc_catalog` is the table above `sc_cat_item` in the hierarchy — think of it as the storefront itself. Most organizations run exactly one catalog, simply named "Service Catalog," and every item an employee can order lives inside it. But the platform supports multiple catalogs for genuinely different audiences: a "Service Catalog" for internal employees and a separate "Customer Service Catalog" for external customers interacting through Customer Service Management, each with its own branding, its own set of visible categories, and its own access controls on who can even see it exists. As the administrator, deciding whether a new item belongs in an existing catalog or needs a new one is a real architecture decision, not a cosmetic one — it determines who can see the item at all.

## sc_category: building the hierarchy

`sc_category` records are what a requester actually clicks through before finding an item — "Hardware," then "Laptops & Desktops," then the specific item. Categories are self-referencing: a category has a Parent field that can point to another category record, which is how you build subcategories (Hardware > Laptops & Desktops) without a separate table for each level of depth. Each category also has an Order field controlling where it sits relative to its siblings on the catalog homepage, and can be scoped to a specific catalog so the same category name can mean something different in two different storefronts.

Getting this hierarchy right matters more than it looks: a flat list of fifty items with no categories forces every requester to scroll and guess; a category tree that's too deep forces three or four clicks before anyone reaches an item they request weekly. Good catalog administration means organizing categories the way the business actually talks about its services, not the way the backend tables happen to be organized.

## Putting it together

A requester's actual path is: open the Service Catalog (`sc_catalog`) → click through one or more categories (`sc_category`, parent to child) → land on a catalog item (`sc_cat_item`) → read its short description, price, and delivery time → click Order Now. Everything after that click — the variables they fill in, the approvals that fire, the request record that's created — is what the next several lessons in this chapter cover. But none of it happens without a correctly configured item sitting in a sensibly organized category first.

## Key terms

| Term | Meaning |
|---|---|
| `sc_cat_item` | The table storing every catalog item a requester can order |
| `sc_category` | The table storing catalog categories; self-referencing via a Parent field for subcategories |
| `sc_catalog` | The table representing a storefront; most orgs use one, but multiple are supported |
| Delivery time | The plain-language fulfillment expectation shown to the requester before ordering |
| Category hierarchy | Parent/child category structure that shapes how requesters browse to an item |

## Check yourself

A business unit wants a brand-new "Facilities" category with two subcategories, "Desk Moves" and "Badge Requests," visible only in the internal Service Catalog. Which three tables are involved in building this, and which field on `sc_category` creates the parent-child relationship between "Facilities" and its two subcategories?
