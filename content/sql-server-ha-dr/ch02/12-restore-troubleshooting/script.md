# Script — Restore Troubleshooting

## Segment 1 (title)

The last four lessons covered restores that go as planned. This lesson closes chapter two with the ones that don't — the specific errors that actually stop a restore in practice, and what each one is really telling you.

## Segment 2 (code: "database is in use")

Database is in use is the most common restore-blocking error, and it means exactly what it says: something else is still connected. Forcing single-user mode with rollback immediate kicks out other connections so the restore can get the exclusive access it needs.

## Segment 3 (code: file path mismatches)

A restore can still fail on file paths even with MOVE specified correctly. MOVE redirects where a file gets written — it doesn't create the folder. That folder has to already exist on the target server, or the restore fails with an operating system error.

## Segment 4 (steps: backup chain gaps)

A backup chain is exactly as strong as its weakest link. A missing or corrupted log backup doesn't just lose that one file's transactions — every log backup after the gap becomes unusable too, because SQL Server can't verify they connect to anything before them.

## Segment 5 (outro)

There's no partial restore across a gap in the chain. That closes chapter two on restore scenarios. Next up, chapter three begins: revisiting HA versus DR specifically for on-premises SQL Server.
