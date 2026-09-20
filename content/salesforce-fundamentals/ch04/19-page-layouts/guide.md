# Page Layouts

Lesson 18 showed how a Record Type can change which fields show up on a record's page.
This lesson covers the mechanism that actually controls that: the **Page Layout**. It's
one of the most important concepts in this whole course for an analyst to internalize,
because it directly explains a confusing experience almost every analyst eventually hits:
a field showing up in a report or a query that the person who filed the ticket swears
doesn't exist on the record they're looking at.

## What you'll learn

- What a Page Layout actually controls
- Why a field can hold real data even when it isn't visible on a given page layout
- Why this matters specifically for an analyst reconciling a report against what a user sees on screen

## What a Page Layout controls

A **Page Layout** determines which fields, related lists, and buttons appear on a record's
detail and edit page in the Salesforce UI — and in what order, in what sections, and
whether a field is required, read-only, or editable on that page. Different Page Layouts
can be assigned to different Profiles or Record Types, which is exactly how the Record Type
example from Lesson 18 actually gets its different-fields-per-process behavior: the New
Business Record Type is paired with one Page Layout, the Renewal Record Type with another,
and each layout shows only the fields relevant to that process.

## A field can exist and hold data without being visible

This is the critical point for an analyst: **the Page Layout only controls what a user sees
on a page — it has no effect on the underlying data.** A field can be populated with real,
valid data and simply be left off a particular Page Layout, for any number of ordinary
reasons: it was relevant to an old process and never removed from the object, it's used
by an integration or a formula but not by the sales team's day-to-day screen, or an admin
simply didn't add it to that specific layout. That field still exists on the object, still
holds its data, and — critically — still shows up in reports and SOQL queries, which pull
directly from the underlying data model rather than from any Page Layout.

## Why this matters when reconciling a report against a screen

This is exactly the situation behind a common, confusing support conversation: a business
user looks at a report an analyst built, sees a field or a value they don't recognize, and
insists "that field doesn't exist on this record" — because it genuinely isn't on the Page
Layout they're looking at. The field is real; it's just not visible to them. Knowing that
Page Layouts and underlying data are two separate things lets an analyst resolve that
conversation correctly, instead of assuming their own report is wrong.

## Key terms

| Term | Meaning |
|---|---|
| Page Layout | Configuration controlling which fields, related lists, and buttons appear on a record's UI page |
| Field visibility | Whether a field appears on a given Page Layout — separate from whether it holds data |
| Profile / Record Type assignment | Different Page Layouts can be assigned per Profile or Record Type |

## Check yourself

A sales rep insists a field an analyst's report shows for their Opportunity "doesn't
exist." What's the most likely explanation, and why does that explanation not mean the
report itself is wrong?
