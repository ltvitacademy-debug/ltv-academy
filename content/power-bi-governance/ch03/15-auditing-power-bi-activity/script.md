# Lesson 15 — Auditing Power BI Activity · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Usage metrics answers who viewed a report. Auditing answers something broader: who did what, to which item, and when — across every action in the tenant.

## S2 · STEPS CARD (usage vs audit)

Usage metrics is one report's view counts, visible to its owner. The audit log is every logged action, tenant-wide, visible to admins and compliance reviewers — and it runs through Microsoft Purview's unified audit log, the same system Microsoft 365 uses across the board.

## S3 · SCREENSHOT (audit search columns)

Audit searches are saved jobs, not one-off queries — name, status, time range, who ran it, and how many results came back, so a reviewer can come back and check results later.

## S4 · SCREENSHOT (search results)

Each row is one logged event: when it happened, the IP address, who did it, what kind of action, and exactly which item it touched. This is how you'd find out who actually deleted something, not just who viewed it.

## S5 · SCREENSHOT (result detail)

And any single row expands into its full detail — down to a client app ID and a correlation ID. That raw detail is what turns "something happened" into a defensible answer for a real investigation.

## S6 · OUTRO CARD

That closes Chapter Three. Next up, Chapter Four: deployment pipelines — moving content safely from development to production.
