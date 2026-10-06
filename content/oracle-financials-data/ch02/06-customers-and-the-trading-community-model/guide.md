# Customers and the Trading Community Model

Suppliers and customers are mirror images inside Oracle Fusion's data model: both are parties with a product-specific role layered on top. Lesson 5 covered the supplier side. This lesson covers the customer side, which runs through a few more tables than suppliers do, because Trading Community Architecture (TCA) was really built with customers — and the richer relationships they can have — in mind.

## What you'll learn

- Why HZ_PARTIES is described as "party-centric," and what that means in practice
- The difference between a party and a customer account
- Why one party can have several customer accounts
- How customer accounts connect to business units through account sites

## HZ_PARTIES: identity, with no business relationship yet

`HZ_PARTIES` is the master identity table for every party TCA knows about — a person, an organization, or a group — independent of any business relationship with your company. A row in `HZ_PARTIES` just says "this entity exists and has this name and type." It carries no financial data, no credit terms, nothing about how you do business with it. That's deliberate: the same table is reused for suppliers, customers, contacts, and even internal legal entities, so identity is captured once regardless of what role an entity eventually plays.

## HZ_CUST_ACCOUNTS: the business relationship

The moment your company starts actually doing business with a party as a customer — extending credit, setting payment terms, invoicing them — that relationship is recorded in `HZ_CUST_ACCOUNTS`. This is the **customer account**, and it's a distinct concept from the party itself. A single party can have more than one customer account: a real-world example is an individual who has a personal account, and separately, an account tied to a business they own. Both accounts point back to the same `HZ_PARTIES` row through `PARTY_ID`, but each account carries its own account number and its own credit and payment terms, because they represent different business relationships with the same underlying entity.

## Sites and site uses: where and why

A customer account can transact at more than one location, and for more than one purpose. `HZ_CUST_ACCT_SITES_ALL` stores each account's sites — addresses where you actually do business with that customer account — and, true to the `_ALL` naming convention from Chapter 1, these sites span business units, so each row ties back to a specific business unit context. On top of that, `HZ_CUST_SITE_USES_ALL` records the **business purpose** of a given site: the same physical address might be used as a bill-to site, a ship-to site, or both, and each use can carry its own attributes (payment terms are frequently set at the bill-to site-use level, not on the account as a whole).

## Why build it this way?

It would be simpler, on paper, to just store a customer's name and address directly on an invoice table. Oracle's TCA model exists instead because real businesses have relationships that don't fit that flat shape: the same company can be both a customer and a supplier to you; one legal entity can have several accounts with different terms; one address can serve multiple purposes. Modeling party, account, site, and site-use as separate layers is what lets all of that be represented without duplicating the underlying identity data every time a new relationship or location is added.

## Recap

`HZ_PARTIES` stores core identity with no business relationship attached. `HZ_CUST_ACCOUNTS` records the actual customer relationship, and one party can have multiple accounts. `HZ_CUST_ACCT_SITES_ALL` stores each account's addresses, scoped by business unit, and `HZ_CUST_SITE_USES_ALL` records what each site is used for — bill-to, ship-to, or both. Next up, lesson 7: sites, addresses, and contacts in more depth, including how the same pattern extends to the people who work at these organizations.
