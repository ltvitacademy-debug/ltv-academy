# Lesson 1 — Azure Storage Accounts · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Welcome to Data Engineering Foundations — the first of four courses
building toward real Azure data engineering. We start at the very
bottom of the stack: the Azure storage account.

## S2 · SCREENSHOT (create button)

A storage account is the top-level container for your data in Azure —
one unique namespace, one billing boundary. Every storage account
you'll ever create starts on this page, with a single Create button.

## S3 · SCREENSHOT (create wizard tabs)

That opens the creation wizard, and its own description tells you
everything you need to know up front: one storage account can hold
five different services — blobs, Data Lake Storage Gen2, Files,
Queues, and Tables. This whole chapter is about the first two of
those.

## S4 · STEPS CARD (three decisions)

Three decisions matter most when you create one. Performance —
Standard or Premium; this course uses Standard throughout. Redundancy
— how many copies of your data Azure keeps, and where; more copies,
more protection, more cost. And Kind — StorageV2, general purpose,
which is what supports every one of those five services, including
the hierarchical namespace that turns plain blob storage into a real
data lake.

## S5 · OUTRO CARD

One more thing before we move on: every hands-on lab in this entire
course uses the same real dataset — the NYC Taxi and Limousine
Commission's public trip data. Real dates, real fares, real scale.
Next lesson: the one setting that actually turns Blob storage into
ADLS Gen2. See you there.
