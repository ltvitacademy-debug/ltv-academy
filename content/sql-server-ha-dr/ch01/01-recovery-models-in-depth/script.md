# Script — Recovery Models, in Depth

## Segment 1 (title)

This course goes deeper than a basic recovery model overview. Here, the recovery model stops being a property you set once and becomes the foundation every backup strategy, restore scenario, and HA/DR design in this course is built on.

## Segment 2 (code: what each model actually promises)

SIMPLE truncates the log automatically — you can restore to your last backup and nothing more recent. FULL never truncates automatically, which is what makes point-in-time recovery possible. BULK_LOGGED trades some of that point-in-time guarantee for performance on bulk operations.

## Segment 3 (steps: why FULL is the default assumption)

Every restore scenario ahead, and nearly every HA/DR technology in this course, depends on log backups existing and being restorable in sequence. Availability Groups, log shipping, mirroring — none of it works under SIMPLE, where there's no log to ship.

## Segment 4 (outro)

A database stuck on SIMPLE that was supposed to support point-in-time recovery is a common, real failure mode discovered during an actual incident. Next up: designing a real full/differential/log backup strategy around this.
