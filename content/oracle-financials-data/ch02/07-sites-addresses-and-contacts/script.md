# Script — Sites, Addresses and Contacts

## Segment 1 (title)

The last two lessons each touched sites briefly — a supplier pay site, a customer bill-to site — without showing how the raw address underneath is actually stored, or how individual contacts fit in. This lesson closes that gap.

## Segment 2 (steps)

Before an address belongs to anyone, it's just a location: street, city, state, postal code. That raw data lives in HZ_LOCATIONS, independent of any party. The reason is reuse — the same physical address, say a shared office building, can be referenced by more than one party without duplicating the raw data.

## Segment 3 (steps)

A party doesn't own a location directly either. HZ_PARTY_SITES connects a specific party to a specific location — the party's use of that address. One party can have several party sites: headquarters, a warehouse, a regional office.

## Segment 4 (steps)

A party site on its own is generic. Each product adds its own layer on top with its own attributes. Suppliers get pay-site and purchasing-site flags on POZ_SUPPLIER_SITES_ALL_M. Customers get account-specific attributes plus bill-to and ship-to business purpose. So the same address can technically be represented four or five different ways, which is why fixing "the address is wrong" is rarely a one-table job.

## Segment 5 (outro)

Individual people are represented the same way organizations are: a row in HZ_PARTIES, just with a party type of Person. That association to an organization is captured through HZ_RELATIONSHIPS, and more specifically HZ_ORG_CONTACTS, which maps a person to an organization along with their role, like billing contact. Chapter two is complete. Up next, chapter three: Payables and Receivables data.
