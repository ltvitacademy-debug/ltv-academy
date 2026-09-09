# Lesson 32 — Autoloader · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Files landing in a folder need their own tracking — Autoloader.

## S2 · CODE CARD (the problem)

Last lesson's watermark tracked new rows. Autoloader tracks new
files landing in a folder continuously — without re-scanning the
entire folder every time just to figure out what's already been
seen.

## S3 · CODE CARD (cloudFiles)

Spark dot read stream, with format cloud files, is Autoloader's
entry point. The checkpoint location tracks exactly which files
it's already processed — so rerunning this exact code only picks
up genuinely new files, automatically. No manual watermark column
at all.

## S4 · CODE CARD (schema handling)

And Autoloader infers a schema from arriving files once, and
caches it — a real, practical answer to Foundations' infer schema
cost concern, combined with this course's own schema evolution,
both at once.

## S5 · OUTRO CARD

This is bronze ingestion's real production replacement for a
one-time manual read. Next lesson: structured streaming basics,
the engine underneath Autoloader itself.
