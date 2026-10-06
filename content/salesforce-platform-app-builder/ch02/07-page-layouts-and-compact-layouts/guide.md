# Page Layouts and Compact Layouts

**Chapter 2 · User Interface · Lesson 7 of 24**

## What you'll learn

- What a page layout actually controls on a record
- What a compact layout controls instead — and why it's a different tool entirely
- Where a compact layout's fields actually show up
- The single most common mix-up between the two, and how to avoid it

## Page layout: the full record

![An annotated record page, showing the highlights panel, action buttons, and Related/Details tabs that a page layout controls.](/courses/salesforce-platform-app-builder/ch02/07-page-layouts-and-compact-layouts/record-page-layout-annotated.png)

A page layout controls the entire record page: the **highlights
panel** at the top, the **action buttons** (Edit, New Case, Follow),
and which **tabs** — Related, Details, Chatter — even exist. Fields,
sections, and related lists are all page layout territory.

## Compact layout: a completely different job

![The Compact Layout editor, moving fields from Available Fields into Selected Fields, capped at ten.](/courses/salesforce-platform-app-builder/ch02/07-page-layouts-and-compact-layouts/compact-layout-editor.png)

A compact layout does one narrow thing: pick **up to 10 fields**, in
**priority order**. No sections, no related lists, no buttons — just
a short, ordered list of the fields that matter most at a glance.

## Where that short list actually shows up

![Hovering an Account from a related record, showing the compact layout's chosen fields in the popup card.](/courses/salesforce-platform-app-builder/ch02/07-page-layouts-and-compact-layouts/compact-layout-in-use.png)

The compact layout's field list is what powers:

- The **highlights panel** at the top of the full record page
- The **record view on mobile**
- **Hover cards**, like the one above, when you preview a related record without opening it

## The two tools, side by side

```
Page Layout:
  controls the FULL record page
  every field, section, related list, button

Compact Layout:
  controls the SUMMARY view
  highlights panel + mobile + hover cards
  max 10 fields, in priority order
```

Confusing these two — assuming the highlights panel pulls from the
page layout, or that the compact layout controls the Related tab —
is the single most common mistake Platform App Builder exam-takers
make. They're configured in completely different places and do
completely different jobs.

## Key terms

| Term | Meaning |
|---|---|
| Page layout | Controls the full record page: fields, sections, related lists, buttons |
| Compact layout | Controls the summary view: up to 10 fields, in priority order |
| Highlights panel | The summary strip at the top of a record page, powered by the compact layout |
| Hover card | The quick-preview popup shown when hovering a related record link |

## Check yourself

A user says "I added a field to the Account page layout, but it's
not showing up when I hover an Account from a Contact." What's
actually missing, and which tool fixes it?
