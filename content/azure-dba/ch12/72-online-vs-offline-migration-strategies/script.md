# Script — Online vs. Offline Migration Strategies

## Segment 1 (title)

Once a database is assessed as ready to move, there are two fundamentally different ways to move it. Offline: a scheduled downtime window, simpler to plan, but the window itself is the risk for a large database. Online: the source stays live while changes keep syncing, downtime shrinks to minutes, but the migration itself is more complex to run and monitor.

## Segment 2 (steps: the two paths)

Offline trades simplicity for a downtime window that can run long on a large database. Online trades a much shorter cutover for real complexity — someone has to watch sync lag stay healthy for the whole migration window, which can run hours or days. Neither is universally better; they trade complexity for downtime in opposite directions.

## Segment 3 (steps: what decides it)

Three factors decide it: database size and change rate, since a large high-write database makes an offline window painful; the business's actual downtime budget, since a nightly batch system tolerates offline fine while a 24/7 order system can't; and team readiness to actually monitor a live sync for as long as it runs.

## Segment 4 (outro)

This isn't purely a technical decision — it's a trade-off a DBA presents to the business: how much downtime each approach costs, versus how much complexity and monitoring each approach costs. Next up: migrating specifically to Azure SQL Database — compatibility considerations and the real migration path.
