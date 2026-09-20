# Script — Assessing a Cross-Platform Migration Project

## Segment 1 (title)

This chapter turns everything you've learned about Oracle, MySQL, and PostgreSQL into a real skill: planning a migration off SQL Server. This lesson covers the step teams most often skip — assessing the project honestly before anyone commits to a timeline.

## Segment 2 (steps: the real inventory)

A migration estimate without a real inventory is a guess wearing a spreadsheet. List every object type from system catalogs, not documentation: tables and their row counts, procedures, functions, triggers, SQL Agent jobs, linked servers, and every login and permission grant. Undocumented objects are exactly the ones that break a migration late.

## Segment 3 (code: dependencies the inventory won't show)

An object list tells you what exists, not what depends on what. Cross-database queries and linked server calls are trivial in SQL Server and often impossible in the same form on the target platform. Application-embedded SQL is worse — it lives in code, not the database, so it never shows up in a database-only inventory at all.

## Segment 4 (steps: an honest timeline)

A credible estimate separates schema conversion, code conversion, data movement, application changes, and testing and cutover, because each has a different multiplier once real dependencies surface. Teams that extrapolate a total from "convert the schema" alone are almost always wrong, often by two or three times.

## Segment 5 (outro)

Finding a feature with no target-platform equivalent is fine during assessment — it's a planning problem. Finding it six weeks into development is a production problem. Next up: the specific key differences a SQL Server-to-Oracle migration has to address.
