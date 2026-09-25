# Script — Cross Filters

## Segment 1 (title)

Standard filters look at the fields on the report's own records. A cross filter looks at related records. It answers questions like: which accounts have opportunities, and which accounts have none? These are among the most common cleanup lists analysts build.

## Segment 2 (screenshot: menu)

You'll find it on the Filters tab. Open the menu next to Add filter and choose Add Cross Filter. The same menu holds Add Filter Logic, which we'll use in the next lessons. It's easy to miss the first time.

## Segment 3 (screenshot: Edit Filter)

The cross filter reads like a sentence. Show Me accounts, with, a secondary object of opportunities. Change with to without and you flip the meaning: accounts that have no opportunities at all. Which related objects you can pick depends on the report type.

## Segment 4 (code: semi-join)

For a SOQL writer, this is a semi-join. Accounts with opportunities is WHERE Id IN a subquery of account Ids from Opportunity. Without is the anti-join, using NOT IN. Cross filters give you that pattern without writing a subquery.

## Segment 5 (steps: with, without, sub-filters)

In practice you have three moves. With keeps parents that have at least one matching child. Without keeps parents that have none. And sub-filters add conditions on the child, like accounts with opportunities over one hundred thousand dollars. In most orgs you can add up to three cross filters, each with a handful of sub-filters. Read the dialog like a sentence to confirm it says what you mean.

## Segment 6 (outro)

Next, we'll turn to bucketing, a way to group raw values into categories right inside the report.
