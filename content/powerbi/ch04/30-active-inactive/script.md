# Lesson 30 — Active vs. Inactive Relationships · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~2 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Sometimes two tables need to connect more than one way. Here's how Power
BI decides which connection actually counts by default.

## S2 · IMAGE: candmrel_activerelview.png (two relationships diagram)

ProjectTickets has both an OpenedBy column and a SubmittedBy column —
both could reasonably relate to EmployeeRole. Two valid relationships,
same two tables. Power BI can only treat one as the default: active.

## S3 · IMAGE: candmrel_managerelactive.png (Manage relationships, OpenedBy active)

If the wrong one ends up active, your report isn't broken — it's just
answering a different question than you meant.

## S4 · IMAGE: candmrel_repcrossfilteractive.png (only sponsors showing)

Here, OpenedBy is active, so this visual only shows project sponsors —
the people who open tickets — instead of everyone who actually submitted
one.

## S5 · IMAGE: candmrel_managerelactivesubmittedby.png (switched to SubmittedBy)

Fix it in Manage relationships: uncheck OpenedBy, check SubmittedBy.
Only one can be active between the same two tables, so checking one
automatically unchecks the other.

## S6 · OUTRO CARD (SVG: next lesson, LTV seal)

An inactive relationship isn't gone — a DAX measure can activate it on
demand with USERELATIONSHIP, which you'll use later in the course. Next,
final lesson of the chapter: putting all of this together into one
complete model.
