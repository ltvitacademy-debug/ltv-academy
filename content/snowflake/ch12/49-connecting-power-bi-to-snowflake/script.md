# Script — Connecting Power BI to Snowflake

## Segment 1 (title)

Everything starts in the same place as any other Power BI source: Get Data. Snowflake isn't hidden in some special cloud category — it lives right under Database, alphabetically next to Redshift and BigQuery.

## Segment 2 (screenshot: Get Data dialog)

Select Database on the left, and Snowflake is right there in the list. Click Connect, and a small dialog opens asking for exactly two things.

## Segment 3 (screenshot: server and warehouse)

Server is your Snowflake account's hostname — the same one you'd use to log into Snowsight. Warehouse is the compute warehouse every query from this report will run against. That's not a minor detail — whatever warehouse you type here is the one burning credits every time this report refreshes.

## Segment 4 (screenshot: authentication)

Next comes authentication. The connector supports Snowflake username and password, or Microsoft Entra ID, including single sign-on where it's configured on the Snowflake side. Whichever role you authenticate as determines exactly what this report can see — the same role-based access control from earlier in this course, just being exercised by Power BI instead of a worksheet.

## Segment 5 (steps: what's still ahead)

Two things haven't happened yet. Advanced options — collapsed by default — is where you'd set a specific role, a database, or timeouts. And after Navigator lets you pick tables, the very last step asks Import or DirectQuery — a choice with real cost consequences specific to Snowflake.

## Segment 6 (outro)

Next lesson is entirely about that last choice: Import versus DirectQuery, and why every DirectQuery hits Snowflake compute and costs credits.
