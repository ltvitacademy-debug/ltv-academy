# Script — Rollback Planning

## Segment 1 (title)

Lesson 63: rollback planning. Every upgrade needs a real way out, not just an assumption that one exists.

## Segment 2 (code: The uncomfortable truth)

Here's the uncomfortable truth: for a major in-place upgrade, there's usually no supported way to downgrade a database back to the older version. SQL Server won't attach or restore a newer-version backup onto an older instance. Real rollback means restoring the pre-upgrade backup onto a separate instance that's still running the old version.

## Segment 3 (steps: What a real plan contains)

A plan that actually works has concrete pieces: a full backup taken right before the change and test-restored to prove it's good, a fallback target ready before you need it, and a decision point — who calls it and what symptoms trigger it — agreed on in advance, not improvised under pressure.

## Segment 4 (outro)

That's the end of chapter eleven, upgrades and patching. Next up: the capstone begins — lesson 64, you inherit a production server, and everything from this course comes together.
