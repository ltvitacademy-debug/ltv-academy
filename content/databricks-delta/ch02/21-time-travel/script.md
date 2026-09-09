# Lesson 21 — Time Travel · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Now for one of Delta's most useful tricks — time travel.

## S2 · CODE CARD (querying older versions)

Version as of, or timestamp as of, queries the table exactly as it
looked at a past point — by version number or by date. Both return
an ordinary DataFrame, and every Foundations Chapter 4 method still
works on it, completely unchanged.

## S3 · CODE CARD (why it's possible)

This is only possible because of Lesson 17's remove action — it
marks a file as no longer current, but usually doesn't delete it
from disk right away. Time travel reconstructs an old version from
those still-present files, exactly as the log recorded them.

## S4 · CODE CARD (RESTORE)

And querying an old version doesn't change anything. Restore table
does — it deliberately makes that old version current again, which
is genuinely useful for undoing a bad merge or an accidental delete
cleanly.

## S5 · OUTRO CARD

But it's not a permanent backup — vacuum eventually deletes those
old files for good, past a retention window. Next lesson: update,
delete, and merge, the operations that actually generate this
history.
