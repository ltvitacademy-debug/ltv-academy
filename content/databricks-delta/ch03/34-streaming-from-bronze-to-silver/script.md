# Lesson 34 — Streaming from Bronze to Silver · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Let's combine everything so far into one real pipeline —
streaming from bronze to silver.

## S2 · CODE CARD (cleaning logic)

The cleaning logic here is exactly Lesson 27's casting and
deduplication, plus Lesson 29's merge call — nothing new in the
logic itself.

## S3 · CODE CARD (foreachBatch)

But write stream has no merge sink built in — merge is a
table-level operation, not something a streaming write can call
directly. For each batch is the bridge: it hands each arriving
micro batch to an ordinary Python function as a regular, static
DataFrame, where merge works exactly as it always has.

## S4 · CODE CARD (full pipeline)

Put together: Autoloader feeds bronze, read stream treats it as a
growing table, and for each batch bridges back to that same merge
logic — every piece here is something you already know.

## S5 · OUTRO CARD

And this genuinely replaces a once-a-day scheduled job — new
bronze rows reach silver within minutes, not on the next day's
run. Next lesson: handling late-arriving data, a real streaming
complication.
