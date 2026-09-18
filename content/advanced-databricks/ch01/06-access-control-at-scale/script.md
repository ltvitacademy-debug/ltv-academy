# Script — Access Control at Scale

## Segment 1 (title)

Databricks & Delta Lake Lesson 42 covered GRANT and REVOKE, Lesson 43 covered row and column security on one table. This lesson is what happens when there are three hundred tables, not one.

## Segment 2 (code: reusable mask function)

Lesson 43's example masked one column on one table. The pattern that actually scales is a single reusable function, attached with ALTER TABLE SET MASK across every table that carries that column — one policy, enforced consistently everywhere.

## Segment 3 (code: scripting grants)

At a handful of tables, typing individual grant statements is fine. At hundreds, it isn't — generating them from information schema tables, or granting once at the schema level, is the real pattern instead of hundreds of hand-typed lines that drift out of sync.

## Segment 4 (code: SCIM-synced groups)

Lesson 47 already said groups, not individuals. The reason that holds up at scale is SCIM sync from an identity provider — group membership changes propagate automatically, so hundreds of grants attached to that group never need to be touched again as people join or leave.

## Segment 5 (outro)

Reusable masks, scripted grants, SCIM-synced groups — the patterns that survive past one table. Chapter One's done. Chapter Two: Auto Loader and ingestion at scale.
