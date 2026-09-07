# Lesson 25 — Fact Tables vs. Dimension Tables · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~2 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Star schema asks you to sort every table into one of two roles. Get this
one distinction right, and the rest of the chapter falls into place.

## S2 · IMAGE: normalized-data-example.svg (normalized table)

Dimension tables describe things — products, dates, customers. Fact
tables store events — sales, orders, sign-ins. The key habit underneath
both is normalization: store each piece of information once, referenced
by key, instead of repeating it. Here, the sales table stores only a
ProductKey — a reference, not the product's full details.

## S3 · IMAGE: denormalized-data-example.svg (denormalized table)

Compare that to this: Product, Category, Color, and Size repeated on
every single row that shares a product. If you've ever exported a report
to Excel, this is almost always what you got — and splitting it back into
normalized fact and dimension tables is exactly what Power Query is for.

## S4 · IMAGE: star-schema-example-1.svg (star schema diagram)

In the finished shape, Sales is the fact table — it summarizes. Everything
around it is a dimension table — it filters and groups. Dimension tables
stay small; fact tables grow. Keeping them separate is what makes the
model efficient.

## S5 · OUTRO CARD (SVG: next lesson, LTV seal)

Next lesson, we put a name to this shape and look at exactly why Power BI
recommends it: star schema.
