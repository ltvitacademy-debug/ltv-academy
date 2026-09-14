# Script — Designing a Transformation Layer · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Lesson 13 landed raw data into bronze, untouched. The transformation layer is everything that turns that into something usable — the same bronze, silver, gold shape Databricks & Delta Lake already covered, applied here as a design component.

## S2 · CODE CARD (transformation idempotency)

A bronze-to-silver step that reruns on the same batch must not duplicate rows — Lesson 11's principle, and Databricks Lesson 29's exact mechanism: MERGE on the natural key, not plain append.

## S3 · CODE CARD (incremental vs. full-refresh)

Silver almost always needs incremental MERGE. A small gold table can just overwrite every run — simpler, and just as correct. A genuinely large gold aggregate needs the same incremental approach silver uses.

## S4 · CODE CARD (tracking what's new)

Choosing incremental only answers half the question — you still need a concrete way to know what's new. A watermark column, or Delta's Change Data Feed reading the transaction log directly.

## S5 · OUTRO CARD

Bronze in, silver clean, gold aggregated — each step idempotent, each refresh strategy chosen deliberately. Next up: designing a serving layer, where gold actually gets consumed.
