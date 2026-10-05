# Lesson 16 — Access History and Query History · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Every chapter before this one taught you how to control access — roles, masking, row access policies. This chapter is about proving, after the fact, that those controls actually worked.

## S2 · STEPS CARD (two different questions)

The two foundational views for that live in SNOWFLAKE.ACCOUNT_USAGE. QUERY_HISTORY logs every query that ran — text, user, status, timing. ACCESS_HISTORY goes further: it logs the actual tables and columns a query touched.

## S3 · CODE CARD (QUERY_HISTORY)

Here's QUERY_HISTORY in practice: every query from the last 24 hours, newest first, with its status. This is your first stop for "did this even run, and did it succeed."

## S4 · CODE CARD (ACCESS_HISTORY)

ACCESS_HISTORY answers a narrower question: which tables and columns did a query actually read or write? direct_objects_accessed and base_objects_accessed are the key columns here.

## S5 · STEPS CARD (why text search isn't enough)

You can't substitute a text search on query text for this. A SELECT star from a view never names the underlying table in its own text — but ACCESS_HISTORY resolves that indirection and tells you the real object it touched.

## S6 · OUTRO CARD

One constraint to remember: ACCESS_HISTORY requires Enterprise Edition or higher, with up to three hours of latency. Next lesson: Account Usage Views — ACCESS_HISTORY and QUERY_HISTORY are just two views among dozens.
