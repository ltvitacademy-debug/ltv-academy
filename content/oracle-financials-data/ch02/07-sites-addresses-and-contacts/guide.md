# Sites, Addresses and Contacts

Lessons 5 and 6 each touched sites briefly — a supplier's pay site, a customer account's bill-to site — but didn't show how the raw address underneath all of them is actually stored, or how individual people (contacts) fit into the same party-based model. This lesson closes that gap, and gives you one more reason to appreciate why Oracle separated identity from role: the same physical address can be reused in more places than you'd expect.

## What you'll learn

- Where a raw address is stored, separate from any party's use of it
- How a party "uses" a location to create a party site
- Why supplier and customer site tables each add their own attributes on top of the same underlying pattern
- How individual contacts are represented, and linked to the organizations they work for

## The raw address: HZ_LOCATIONS

Before an address belongs to anyone, it's just a location: a street, city, state, postal code, and country. That raw data lives in `HZ_LOCATIONS`, independent of any party. The reason for this separation is reuse — the same physical address (say, a shared office building housing two different companies you deal with) can be referenced by more than one party without the raw address data being duplicated for each.

## A party's use of a location: HZ_PARTY_SITES

A party doesn't own a location directly either. `HZ_PARTY_SITES` is the table that connects a specific party to a specific location, representing the party's use of that address. One party can have several party sites (headquarters, warehouse, regional office), and in principle, the same location could be a party site for more than one party.

## Product-specific layers on top

Here's where lessons 5 and 6 connect back in. A party site, on its own, is generic — it doesn't know anything about purchasing or billing. Each product that cares about sites adds its own layer on top of the same underlying party-site relationship, with its own attributes:

- **Suppliers**: `POZ_SUPPLIER_SITES_ALL_M` adds purchasing/payment-specific flags like pay-site and purchasing-site
- **Customers**: `HZ_CUST_ACCT_SITES_ALL` adds account-specific attributes, and `HZ_CUST_SITE_USES_ALL` layers business purpose (bill-to, ship-to) on top of that

So a single real-world address can be represented, technically, four or five different ways depending on which layer you're looking at: as a raw location, as a party's site, and then again as whatever product-specific site record references it. This is exactly why "the address is wrong" is rarely a one-table fix — depending on what's actually wrong, the correction might belong at the raw location level, or at a product-specific site layer that's only used by one role.

## Contacts: people, not organizations

Individual people are represented the same way organizations are: as a row in `HZ_PARTIES`, just with a party **type** of Person instead of Organization. A person on their own isn't automatically "someone's contact" — that association is captured through `HZ_RELATIONSHIPS`, which records a relationship between two parties (for example, "is a contact of"), and more specifically through `HZ_ORG_CONTACTS`, which maps a person-party to an organization-party along with the role that person plays (billing contact, primary contact, and so on).

## Recap

Raw addresses live in `HZ_LOCATIONS`; a party's use of one is a row in `HZ_PARTY_SITES`; and each product (suppliers, customers) layers its own site-specific attributes on top of that same relationship. Contacts are person-type parties in `HZ_PARTIES`, linked to the organizations they work for through `HZ_RELATIONSHIPS` and `HZ_ORG_CONTACTS`. Chapter 2 is complete — you now have the identity and relationship layer this whole course depends on. Next up, Chapter 3: Payables and Receivables data, where you'll see exactly how a supplier or customer defined here shows up on an actual invoice.
