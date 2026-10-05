# Lesson 16 — Active Metadata · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

This lesson closes Chapter Three with the idea everything else in the chapter was building toward: metadata that doesn't just sit there, it acts.

## S2 · STEPS — Passive vs active

Passive metadata sits in a catalog for a human to read — a description, an owner, a sample value. Useful, but someone has to go look. Active metadata triggers automated behavior the moment it's observed or changed, with no human needed for the triggering step itself. Same information, different question: does something actually act on it automatically?

## S3 · STEPS — Three examples

Classification-driven masking — tag a column sensitive, and a policy already attached to that tag enforces itself on every future query. Lineage-driven impact alerts — a schema change automatically notifies every downstream owner lineage shows depends on it. Usage-driven deprecation — a table unused for months gets flagged automatically, no manual audit required.

## S4 · STEPS — Needs event-driven architecture

Active metadata only works if the architecture can observe a change and emit an event the instant it happens — the push half of Lesson 12's harvesting choice, now mandatory. A purely pull-based architecture only knows the current state when it's asked, on a schedule. A sensitive column could sit unmasked for a full day waiting on a nightly crawl to notice its new tag.

## S5 · OUTRO

Chapter Three is done. Chapter Four turns the same idea toward security specifically — policies that read a tag and enforce access automatically, starting with the broad shape of security architecture itself.
