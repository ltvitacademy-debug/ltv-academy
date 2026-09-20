# Script — Reading a Real Org's Data Model

## Segment 1 (title)

This is the chapter finale, and it's deliberately practical: a small, realistic data model, read the way an analyst actually reads one — before writing a single query.

## Segment 2 (code: the data model)

Here's the slice: Account relates to Contact and Opportunity through Lookups. Opportunity relates to OpportunityLineItem through Master-Detail — line items can't exist without their Opportunity. And each line item connects to a Product through a pricebook entry.

## Segment 3 (steps: four steps)

Read it in order. Start at the object you were actually asked about. Follow each relationship one hop at a time and name its cardinality. Check whether any hop is really many-to-many and needs a junction object. Only then, plan the query — because now you know exactly what you can rely on.

## Segment 4 (outro)

You've now read a full, realistic data model the right way. Chapter Six shifts to who can actually see and do what in an org — starting with Users & Licenses.
