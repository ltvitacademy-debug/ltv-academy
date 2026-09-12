# Script — Creating, Refreshing & Managing Extracts

## Segment 1 (title)

Last lesson explained why you'd choose an extract. This lesson is the hands-on side: creating one, refreshing it, and handling it when something goes wrong.

## Segment 2 (screenshot: extract history)

Once you select Extract and save the .hyper file, it becomes a snapshot — it won't update itself. Refreshing gives you two modes: Full Refresh re-pulls everything from scratch; Incremental Refresh appends only new rows since last time, based on a column you pick. Every refresh gets logged here, in Extract History, with a timestamp and row count — genuinely useful for troubleshooting stale dashboards.

## Segment 3 (screenshot: extract not found)

Extracts live as real files on disk. If that file moves or gets deleted, Tableau doesn't fail silently — it shows this Extract Not Found dialog with four honest options: locate it, remove it, deactivate it, or regenerate it entirely from the source.

## Segment 4 (steps: the recovery options)

Locate points Tableau to the file's new spot. Remove falls back to a live connection if the source is still reachable. Deactivate just pauses it. Regenerate rebuilds it from scratch, as if creating it fresh.

## Segment 5 (outro)

Next lesson moves from the connection itself to the data pane — data types, metadata, and field properties, and how Tableau decides what each field actually is.
