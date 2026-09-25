# Script — Lead Conversion Analysis

## Segment 1 (title)

Marketing hands sales a stream of leads, and leadership wants to know how many turn into real business. Let's build the native reports that answer it.

## Segment 2 (steps: three metrics)

Three numbers matter. Conversion rate, time to convert, and source quality. Converted leads don't disappear from Salesforce, they stay in the database with the Converted checkbox ticked, which is exactly what makes all three reportable. That is why a lead report is a real source of truth for marketing and sales alike.

## Segment 3 (code: matrix)

For rate by source, use the Leads report type as a matrix. Lead Source down the rows, Converted across the columns, and record count as the metric. Converted divided by the row total is your rate. The Leads with Converted Lead Information type adds the account, contact and opportunity. Read across a row, and you can see which sources convert and which only fill the funnel.

## Segment 4 (code: row-level formulas)

Two row-level formulas help. An IF that returns one for converted and zero for the rest, averaged by group, is the conversion rate. Converted date minus created date gives days to convert. Check date arithmetic in your own org before you publish. Group the days-to-convert average by source, and a slow source gets staffed differently from a fast one.

## Segment 5 (steps: cohort trap)

Beware the cohort trap. Leads created this month have barely had time to convert. Report on a closed period, or group by created month and expect recent months to still be climbing. Also check your org's real lead status values, and decide whether to exclude spam or unworked leads from the denominator, and say so on the report.

## Segment 6 (outro)

Conversion by campaign is a natural extension, and lesson 31 returns to it. Next up: opportunity analysis.
