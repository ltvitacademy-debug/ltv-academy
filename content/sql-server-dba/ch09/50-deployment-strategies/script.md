# Script — Deployment Strategies

## Segment 1 (title)

Schema in source control answers where the truth lives. This lesson is about how that truth actually gets pushed to a database safely.

## Segment 2 (code: Manual vs. DACPAC)

Manual scripted deployment means hand-writing change scripts and running them in order — simple, but error-prone as environments multiply. DACPAC-based deployment compiles the intended schema and diffs it against the live target automatically, generating the change script instead of hand-writing it.

## Segment 3 (steps: Migration tools and zero downtime)

Migration-based tools — the category Flyway, Liquibase, and DbUp fill — track numbered, one-directional scripts instead of comparing states. For zero-downtime changes on a live table, expand-contract adds the new structure first, migrates usage, then removes the old one only once nothing depends on it.

## Segment 4 (outro)

However a change gets deployed, something needs to record what actually changed and when. Next up: change tracking — SQL Server's Change Tracking feature versus Change Data Capture.
