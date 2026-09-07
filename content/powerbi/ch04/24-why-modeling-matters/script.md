# Lesson 24 — Why Data Modeling Matters · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~2 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Every lesson in the last chapter was about cleaning one table at a time.
But real reports pull numbers from several tables at once — and without
something connecting them, Power BI has no idea they belong together.

## S2 · IMAGE: star-schema-example-1.svg (star schema diagram)

That something is a relationship, and the shape your tables and
relationships form together is your data model. Microsoft's recommended
shape is called star schema — one fact table at the center, storing the
events you're measuring, surrounded by dimension tables describing the
things involved in each event.

## S3 · IMAGE: create-manage-relationships-01.png (real model, six tables)

A real model can grow to a dozen tables or more, all linked by
relationships like these. Every line here tells Power BI how to carry a
filter from one table into another. Without that line, each table is an
island — filter by Product, and nothing happens to your sales numbers.

## S4 · OUTRO CARD (SVG: next lesson, LTV seal)

That's the problem this whole chapter solves. Next: telling fact tables
and dimension tables apart — the first step toward building a model that
actually holds together.
