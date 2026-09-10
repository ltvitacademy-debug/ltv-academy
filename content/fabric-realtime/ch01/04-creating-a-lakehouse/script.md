# Lesson 4 — Creating a Lakehouse · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Let's actually create one — a Fabric lakehouse, start to finish.

## S2 · STEPS CARD (creating one)

New item, search for lakehouse, name it, and create. It opens to
two empty areas — Files and Tables — both already backed by
OneLake, with no separate storage step required.

## S3 · SCREENSHOT CARD (load to table)

This is the real Fabric portal — right-click a raw file sitting
in Files, select load to tables, new table, and name it.

## S4 · CODE CARD (Files vs Tables)

Files is unstructured storage — Databricks Lesson 26's bronze
instinct, made literal. Tables holds real Delta tables — the
exact same format, transaction log, and guarantees from that
course's entire Chapter 2. And loading infers a schema behind the
scenes, exactly Foundations Lesson 40's infer schema cost, now
behind one click.

## S5 · OUTRO CARD

Raw files, and real Delta tables built from them, without ever
touching the original. Next lesson: Fabric lakehouse versus
Databricks lakehouse, the real differences, named directly.
