# Lesson 86 — EXISTS vs. IN vs. JOIN for Existence Checks · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Which products have at least one sales order? Here are three completely
different-looking ways to ask that exact same question.

## S2 · CODE CARD (three query versions)

EXISTS, checking for a matching order line. IN, with a subquery listing
every product ID that has one. And a JOIN, with DISTINCT tacked on at
the end. All three are aiming at the same answer, but they get there
very differently.

## S3 · STEPS CARD (EXISTS/IN stop early / JOIN needs DISTINCT)

EXISTS stops the instant it finds one matching row — it never needs to
know HOW MANY matches exist, only whether any do at all. IN behaves
almost the same way here, and SQL Server often optimizes them nearly
identically. JOIN is doing something fundamentally different: a product
with five matching order rows produces five joined rows, not one.
That's exactly why the JOIN version needs DISTINCT just to get back to
the right answer — and that deduplication is real, avoidable extra
work.

## S4 · CODE CARD (the real risk)

And here's the real danger: forget that DISTINCT, and the query still
runs. It still returns real product names. It just quietly duplicates
every product that happens to have more than one matching order. That's
a correctness bug wearing the disguise of a working query — nothing
about it looks obviously wrong at a glance.

## S5 · OUTRO CARD

So when should you actually reach for JOIN here? When you need columns
FROM the related table — not just "does a match exist," but "what were
the order details." EXISTS and IN can only test for presence; they can
never hand back the matched row's own data. Match the tool to the real
question. Next lesson: SARGable versus non-SARGable WHERE clauses —
which ones can actually use an index. See you there.
