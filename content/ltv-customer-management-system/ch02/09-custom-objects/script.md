# Lesson 9 — Custom Objects · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Time to build the two custom objects your data model called for back in Lesson 3 — Installation Project and Service Contract, for real this time.

## S2 · STEPS — Creating a custom object

Both objects get created the same way. Set a label and plural label. The object name auto-fills the API name. Choose Auto Number for the record name format, since these records don't need a human-chosen name. And check the tab wizard so each object gets a visible tab.

## S3 · CODE — Installation Project fields

Installation Project gets seven fields: lookups to Opportunity and Account, a site address, a target install date, an install status defaulting to Scheduled, a lookup to the lead installer, and a long text equipment summary.

## S4 · CODE — Service Contract fields

Service Contract gets its own seven fields: lookups to Account and Installation Project, a contract start and end date, a service tier, an annual value, and a renewal status defaulting to On Track.

## S5 · STEPS — Lookup, confirmed

Every relationship field here is created as a Lookup, not Master-Detail — the same decision from Lesson 3, now actually selected in the wizard. Master-Detail would force Installation Project's sharing to follow Opportunity exactly, which conflicts with the separate sharing rule designed in Lesson 4.

## S6 · CODE — Tab visibility

Finally, set tab visibility per profile. Sales sees both tabs. Marcus Webb's Service profile sees Installation Project but not Service Contract. Angela Wu's Customer Success profile sees the reverse. Each team's navigation stays focused on what they actually work.

## S7 · OUTRO

Next lesson, you'll build the page layouts and a Lightning App Page that tie Accounts, Opportunities, and both of these custom objects together into one coherent view.
