# Script — Creating Azure SQL Servers & Databases

## Segment 1 (title)

Lesson 6's lab created a logical server, then a database inside it, through the Portal. That two-level hierarchy is the real resource model underneath Azure SQL Database — the same hierarchy the CLI exposes directly.

## Segment 2 (steps: the hierarchy)

A subscription holds resource groups, which hold logical servers, which hold one or more databases or elastic pools. The server owns authentication and firewall rules; the database owns its own compute, storage, and backup retention.

## Segment 3 (code: creating both with the CLI)

az sql server create takes a name, resource group, location, and admin credentials — the server name becomes part of a globally unique DNS name. az sql db create then takes edition, family, and capacity — the vCore knobs Lesson 9 covers in full.

## Segment 4 (outro)

Real environments increasingly script this instead of clicking through a wizard, because it's repeatable and reviewable. Next up: the purchasing models, service tiers, and compute options behind those edition and capacity flags.
