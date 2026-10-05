# Lesson 8 — OneLake Security · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Workspace roles from Lesson 5 get you in the door. OneLake security decides what you see once you're inside.

## S2 · STEPS — What OneLake security is

Workspace roles gate access to the item itself. OneLake security is finer-grained — it lives inside a lakehouse or warehouse and controls which rows and columns someone actually sees, enforced wherever the data is read, not just in the Fabric UI.

## S3 · SCREENSHOT — Manage OneLake security entry point

You get there from a lakehouse's "..." menu — "Manage OneLake security," right alongside the notebook management options.

## S4 · SCREENSHOT — New role, Data step

The new-role wizard's Data step: all data, or selected data with an Edit button. Scoping to selected data is what makes row and column rules possible in the first place.

## S5 · SCREENSHOT — Row security editor, annotated

Here's the table selected, Row security and Column security tabs, and the actual filter: a SQL WHERE clause. Whatever goes after WHERE gets evaluated every time the data is queried — that's the row-level filter, enforced at read time.

## S6 · SCREENSHOT — Finished role

Once it's saved, the role shows its permission, its type, and two tabs — data in the role, and members in the role — both editable later.

## S7 · OUTRO

Next lesson: shortcuts — how a lakehouse can reference data that physically lives somewhere else entirely, and why OneLake security still has to be figured out at the source.
