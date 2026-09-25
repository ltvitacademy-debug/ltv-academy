# Script — Deleting Records Safely

## Segment 1 (title)

Deleting is the operation that deserves the most respect. This lesson covers the two delete options and the routine that keeps you out of trouble.

## Segment 2 (code: two delete operations)

Data Loader has two. Delete takes a CSV with an Id column, and the records go to the Recycle Bin, where they can be restored for about fifteen days. Hard Delete skips the Recycle Bin entirely. It's permanent. There is no undo.

## Segment 3 (steps: before you delete)

Follow the same routine every time. Export the records first, so you hold a copy of the originals. Rehearse in a sandbox, where a mistake costs nothing. Then run a small batch, check the success and error files, and only then run the full file.

## Segment 4 (code: the safety net, and its limits)

Know the limits of the safety net. Only a regular Delete can be restored from the Recycle Bin, and deleting a parent record can cascade to its child records. Hard Delete needs a special permission, and it's not something to grant casually.

## Segment 5 (outro)

That completes Data Loader: export, insert, update, upsert and delete. Next chapter: Workbench, a browser-based alternative, starting with an overview.
