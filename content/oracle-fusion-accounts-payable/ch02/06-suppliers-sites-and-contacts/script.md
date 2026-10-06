# Script — Suppliers, Sites and Contacts

## Segment 1 (title)

Chapter 1 kept mentioning "the supplier record" like it's one thing. It isn't. A supplier in Fusion is a small hierarchy - one supplier, potentially many sites, potentially many contacts - and most confusing supplier questions trace straight back to that hierarchy.

## Segment 2 (steps)

The supplier itself is the top-level legal entity record: name, tax registration, overall status. A supplier site is a specific location or arrangement with that supplier - an address plus operational controls like payment terms and tax details. A supplier contact is a person at that organization, not an address, who AP might reach or who manages the supplier's own portal access.

## Segment 3 (steps)

Here's the detail that trips people up: a site only becomes usable once it has an active site assignment to a business unit. That assignment is what lets a business unit actually transact against the site, and it's also where the sold-to business unit, the one carrying the liability, gets defined. No assignment means no transactions, no matter how complete the site otherwise looks.

## Segment 4 (steps)

Picture Brightfield's fictional supplier, Vantree Industrial Parts. One supplier record. Two sites - a Columbus distribution site and an Austin distribution site, each assigned to Brightfield's US business unit. And two contacts - one who handles invoice disputes, one who handles new orders. An invoice always attaches to a site, never to the supplier directly, because the site is what carries the address and terms that make the invoice complete.

## Segment 5 (outro)

Keep that three-level picture in mind - supplier, site, contact - because it's the skeleton the rest of this chapter hangs on. Up next, lesson seven: creating a supplier from scratch.
