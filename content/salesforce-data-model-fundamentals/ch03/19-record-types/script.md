# Script — Record Types

## Segment 1 (title)

Every lesson so far has treated an object's fields as fixed — one set of picklist values, one page layout. Record Types break that assumption: the same object can present itself differently depending on which kind of record it is.

## Segment 2 (screenshot: Account Type picklist)

A Record Type lets a single object support more than one business process, each with its own available picklist values and its own page layout — without creating a second object. A Partner-flavored Account might only ever need a handful of Type values, like Channel Partner, Installation Partner, or Technology Partner, instead of the full customer list.

## Segment 3 (screenshot: Industry picklist)

A different Record Type on the same object narrows a different picklist just as independently. Here, Industry has values removed from what's available to this particular Record Type — a shorter, more relevant list for whoever's creating that kind of record. Nothing is deleted globally; the master list still exists at the field level. A Record Type just controls what's offered.

## Segment 4 (screenshot: page layout step)

Picklist values are only half the picture. Creating a Record Type also walks through assigning it a page layout — which fields, sections, and related lists its users actually see. That assignment can even vary by profile, all for the exact same underlying record.

## Segment 5 (steps: what a Record Type controls)

Three things, together: available picklist values per field, the page layout assigned per profile, and which business process a record belongs to. One Record Type, three coordinated effects.

## Segment 6 (outro)

Next up: Schema Design Basics — pulling objects, fields, relationships, and now Record Types into actual data model decisions.
