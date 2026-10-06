# Customer Accounts, Sites and Contacts

Lesson 7 walked through creating a customer end to end. This lesson slows down on three pieces of that record — the account, its sites, and its contacts — because each one holds attributes that matter constantly once a customer is live and transacting.

## What you'll learn

- What lives at the account level versus the site level
- How multiple site uses on one address are handled, and what happens when they conflict
- The role of contacts, and why they're attached at different levels

## Account-level attributes

The customer account is where business-relationship attributes default from, unless something more specific overrides them:

- Payment terms (can still be overridden per transaction)
- Profile class, which in turn drives credit limit, statement cycle, and dunning behavior (lesson 9)
- The primary salesperson or account owner, often used for commission tracking and AutoAccounting sourcing
- Receivables activities tied to collector assignment for that account

## Site-level attributes

An account site inherits from the account but can carry its own overrides for things that genuinely differ by location:

- Tax registration or tax classification, when different sites are in different tax jurisdictions
- Bill-to language and currency, for customers with multilingual or multi-currency billing needs by location
- Specific site uses: Bill-To, Ship-To, or both. A single physical address can carry multiple uses (a small customer might have one office that's both billed and shipped to); a larger customer might designate one site purely Bill-To (accounts payable department) and a different site purely Ship-To (the warehouse).

## Setting a primary site

When a customer has multiple Bill-To sites (common for customers with regional purchasing offices), one is flagged as the **primary Bill-To** site, which becomes the default unless a transaction specifically selects another. The same concept applies to Ship-To sites. Getting the primary site wrong is a common support ticket: invoices quietly default to the wrong office until someone catches it on the first statement run.

## Contacts

A contact is a named person associated with a party or an account — not a login user, just a reference for "who do we call about this." Contacts can be attached at the party level (a general company contact, useful across any relationship with that party) or at the account level (someone specific to this selling relationship, like an accounts payable clerk who only deals with Receivables invoices). Typical contact roles include billing, collections, and technical/service contacts; Receivables uses the billing contact when routing statement or dunning correspondence if an email address is on file.

## A worked example

Cascade Outdoor Supply (from lesson 7) grows and opens a second warehouse in Boise. Northwind Fixtures Co. adds a second account site built from the new Boise address, flags it Ship-To only (orders for the Boise region ship there), while the original Spokane site remains the sole Bill-To, flagged primary. Cascade's accounting department asks that invoice questions go to a specific person, Dana Reyes; Northwind adds her as a billing contact at the account level, and from then on, statement emails reference her by name.

## Recap

The account level holds relationship-wide defaults like payment terms and profile class; the site level holds location-specific overrides like tax jurisdiction and site uses. A primary Bill-To (and primary Ship-To) governs defaulting when multiple sites exist, and contacts — attached at the party or account level — are who gets called or emailed, not application users. Next up, lesson 9: customer profiles and credit limits.
