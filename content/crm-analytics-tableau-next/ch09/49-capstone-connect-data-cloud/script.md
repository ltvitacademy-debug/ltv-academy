# Script — Capstone: Connect Data Cloud

## Segment 1 (title)

Cobalt Ridge's fifth question, which renewals show weak adoption, can't be answered from opportunity records alone. They show what was sold, not whether it's used. In this lesson you bring product usage in through Data Cloud, now branded Data 360, compute seat activation, and surface renewal risk in your app.

## Segment 2 (steps)

The flow has five hops. The product's usage summary becomes a data stream. The stream lands in a data lake object. You map it to the account in your data model. A calculated insight computes seat activation. And CRM Analytics pulls the result into its recipe, next to the pipeline.

## Segment 3 (code)

Keep the stream small. One row per customer account per day, for three thousand two hundred accounts. Account ID, snapshot date, licensed seats, and users active in ninety days. Pre-summarizing keeps volume low, and Data Cloud is generally consumption-priced, so check your org's credit usage before turning on frequent refreshes.

## Segment 4 (screenshot)

After the first load, check the stream's detail page. This is a real Data Cloud data stream from Trailhead, with sample data and older branding. Look at the last run status, last refreshed time, record counts, fields mapped, and the refresh history. Investigate any failed or partial run before building on the data.

## Segment 5 (code)

The calculated insight is seat activation at account grain: users active in the last ninety days divided by licensed seats, using the latest snapshot per account. Never sum across daily rows, because that multiplies both sides by the number of days. Both sources carry the Salesforce account ID, so the join is exact and identity resolution isn't needed.

## Segment 6 (steps)

Then connect it to CRM Analytics through a Data Cloud connection in Data Manager. Menu names depend on your release, so check current documentation. Schedule in order: refresh the stream, refresh the insight, then run the recipe. If the recipe runs first, the dashboard quietly shows old usage. Show a usage-as-of date on the page.

## Segment 7 (code)

The result answers question five. Ninety-six accounts renew in ninety days, holding twelve point four million. Seventeen are under forty percent seat activation and hold two point three million, about nineteen percent of renewing revenue. That list is something Customer Success can act on this week.

## Segment 8 (outro)

Next up: secure it properly, so each person sees only their own slice.
