# Lesson 8 — Object-Level Security · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Object-level security — hiding entire tables and columns, not just filtering which rows show up.

## S2 · STEPS — Rows versus objects

Row-level security filters which rows a role sees — the table still exists for them, just with fewer rows. Object-level security goes a level further: it hides entire tables or columns from a role completely. For that role's members, it's as if the object doesn't exist in the model at all — the right tool for a field an audience should never even know is there.

## S3 · SCREENSHOT — Creating a role in Tabular Editor

Power BI Desktop has no built-in OLS editor. The most common path is an external tool, Tabular Editor — a role gets created there the same way any model object does, right-click Roles and Create.

## S4 · SCREENSHOT — Setting the Object Level Security property

With a role selected, every table and column exposes an Object Level Security property — one value per role. Default leaves it visible, Read explicitly documents visibility, and None hides the object entirely from that role's members.

## S5 · SCREENSHOT — The starting point

Before any change, every role typically starts at Default for every object. Nothing is hidden from anyone until someone deliberately sets a role's value to None.

## S6 · STEPS — Why hiding an object can break things

Setting an object to None doesn't quietly hide it — any visual, measure, or relationship a member of that role still encounters that references the hidden object returns an error, not a blank. Rolling out OLS on an existing model means auditing every report built on it for that role, before publishing the change.

## S7 · OUTRO

Next lesson: sharing and permissions — how reports and dashboards actually reach the people who need them.
