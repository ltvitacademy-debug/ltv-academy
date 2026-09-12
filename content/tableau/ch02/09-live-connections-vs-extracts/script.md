# Script — Live Connections vs. Extracts

## Segment 1 (title)

You've seen this toggle on every connection so far — Live versus Extract. This lesson is entirely about what it actually does.

## Segment 2 (screenshot: the toggle)

With Live, Tableau queries the original data source directly, every single time you interact with the view. No copy of the data exists inside Tableau — it's a direct window into the source. With Extract, Tableau pulls a snapshot out and stores it locally in its own Hyper engine, and from then on the view queries that local copy instead.

## Segment 3 (screenshot: architecture)

This architecture diagram shows both paths at once: the Tableau Data Engine on one side is the extract path, and the direct SQL Connector next to it is the live path. Both eventually feed the same rendering layer.

## Segment 4 (steps: choosing between them)

Live keeps data current but depends entirely on the source's speed. Extract is often much faster and works offline, but goes stale until refreshed. Tableau Public requires an extract — no live database connections allowed there at all.

## Segment 5 (outro)

Next lesson goes hands-on with extracts specifically: creating them, refreshing them, and managing what happens when the underlying file moves.
