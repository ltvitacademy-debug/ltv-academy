# Lesson 16 — Data Discovery in Unity Catalog · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Chapter Four turns from protecting data to making it findable — a table nobody can discover gets duplicated or ignored instead of reused.

## S2 · STEPS — Four ways to find data

Unity Catalog's discovery tools fall into four categories: AI-assisted search, keyword search, browsing in Catalog Explorer, and programmatic listing. This lesson focuses on search — the fastest path from needing data about something to an actual governed table.

## S3 · SCREENSHOT — The search bar

This is the real workspace search bar, reachable with Command or Control P from anywhere. For a Unity Catalog workspace, it reviews table names, table comments, column names, and column comments — so a cryptically named table with a good description is still findable.

## S4 · SCREENSHOT — Finding a table by meaning

Search also understands natural language — a query like "what should I use for geographies" surfaces tables with city or country columns even without that exact word. A confident match becomes a knowledge card, showing the table's AI-generated description right in the results.

## S5 · SCREENSHOT — Searching by tag

Every governed tag from the last two lessons is indexed, so tag colon key or tag colon key colon value finds every object carrying that tag directly — no need to browse catalogs by hand to find it.

## S6 · CODE — Finding objects without the UI

For scripted discovery, the same SHOW and DESCRIBE commands from any SQL engine work here too — SHOW TABLES, DESCRIBE TABLE EXTENDED. Same permissions apply, no UI required, which is exactly what a pipeline or CI job needs.

## S7 · OUTRO

Next lesson: lineage — once you've found a table, the real question becomes where its data actually came from, and everywhere it flows downstream.
