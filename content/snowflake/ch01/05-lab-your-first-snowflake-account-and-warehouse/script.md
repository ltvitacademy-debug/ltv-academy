# Script — Lab: Your First Snowflake Account & Warehouse

## Segment 1 (title)

This lesson is hands-on: sign up for a free 30-day trial at trial.snowflake.com, pick any cloud provider and region, and Snowflake emails you an account URL along with the username and password you set.

## Segment 2 (screenshot: sign-in screen)

Follow that link and sign in with the credentials you just created — the same sign-in screen every trial user lands on.

## Segment 3 (screenshot: new worksheet, default warehouse)

A new account isn't empty. It ships with a default role, ACCOUNTADMIN, a default warehouse, COMPUTE_WH, and a fresh worksheet with no database selected yet. Confirm it yourself with SELECT CURRENT_ROLE(), CURRENT_WAREHOUSE(), CURRENT_DATABASE().

## Segment 4 (steps: create your own warehouse)

Create your own warehouse instead of relying on the shared one: size X-Small, auto suspend after 60 seconds, auto resume on, and initially suspended so it doesn't burn credits before you need it.

## Segment 5 (steps: first real query)

Then create a database, a schema, a table, insert one row, and select it back. If that query returns your row, everything from architecture through warehouses just worked together for the first time in your own account.

## Segment 6 (outro)

Next up: Chapter 2, where you'll see exactly where Snowflake's SQL dialect diverges from the T-SQL you already know.
