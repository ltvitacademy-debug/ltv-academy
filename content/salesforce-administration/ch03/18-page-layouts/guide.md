# Page Layouts

**Chapter 3 · Objects and Layouts · Lesson 18 of 36**

Chapter 2 covered the app someone works in and the navigation around it. Chapter 3 goes one
level deeper still: the object itself, and how its fields, related lists, and buttons are
arranged on the record page a user actually edits. The foundation of that arrangement, for
every standard and custom object, is the **page layout**.

## What you'll learn

- What a page layout controls, and what it doesn't
- Where page layouts live in Object Manager, and why an object can have several
- How page layout assignment ties into record types and profiles
- The relationship between page layouts and Lightning record pages (from Lesson 17)

## One object, several layouts

From Setup, open **Object Manager**, select an object, then **Page Layouts** in the left-hand
list. Most objects ship with one default layout, but it's common — and often necessary — for an
object to have several: a support team might see a **Problem** layout with fields for
root-cause analysis, while a sales team sees a **Suggestion** layout built around a completely
different set of fields, on the very same Case object.

![Object Manager's "Case Page Layouts" list, showing "6 Items": a table of page layouts — Suggestion, Question, Other, Problem, and more below — each with Created By and Modified By columns, a New button, and a Page Layout Assignment button.](/courses/salesforce-administration/ch03/18-page-layouts/case-page-layouts-list.png)
*Six page layouts on one Case object — each tuned to a different kind of case.*

## What a page layout actually controls

A page layout determines, for a given view of a record:

- Which fields appear, whether they're read-only or required, and how they're arranged into
  one or two columns
- Which related lists show up, and in what order
- Which buttons, links, and quick actions are available
- Which Lightning record page components a Dynamic Forms setup (an advanced, newer feature)
  can draw individual fields and sections from

Column arrangement is a real, visible choice: the same fields read very differently as a tight
two-column block versus a single stacked column, and that choice is part of what a page layout
defines.

![Two renderings of the same Energy Audit record's Details tab: a two-column layout with Energy Audit Name and Type of Installation side by side, versus a single-column layout with the same fields stacked vertically.](/courses/salesforce-administration/ch03/18-page-layouts/field-column-arrangement.png)
*Same fields, same record — the column arrangement alone changes how much scrolling a user does to see everything.*

## Page layout assignment: who sees which layout

A page layout only matters once it's **assigned**. From the Page Layout Assignment screen
reached off the object's Page Layouts list, an admin maps each **record type** (Chapter 3,
Lesson 20) and **profile** combination to a specific layout — either one layout applied to every
profile, or a different layout per profile.

![Step 2 of assigning a page layout: "Case Record Type: Suggestion," with a choice between "Apply one layout to all profiles" (selected, set to Suggestion) and "Apply a different layout for each profile."](/courses/salesforce-administration/ch03/18-page-layouts/assign-page-layouts-step.png)
*This is the same record-type-plus-profile resolution pattern you'll see again for Lightning record pages and compact layouts.*

## Page layouts vs. Lightning record pages

Lesson 17 covered Lightning pages — the Lightning App Builder's drag-and-drop canvas. Page
layouts are older and more field-focused; Lightning record pages are newer and more
component-focused, and in current orgs a Lightning record page's **Record Detail** component
still pulls its field content from the assigned page layout underneath it, unless that record
page has been upgraded to Dynamic Forms. The two systems work together, not as replacements for
each other, in most orgs today.

## Key terms

| Term | Meaning |
|---|---|
| Page layout | The configuration of fields, related lists, buttons, and actions shown on a record |
| Page Layout Assignment | The mapping of record type + profile combinations to a specific layout |
| Record Detail component | The Lightning record page component that renders a page layout's field content |
| Dynamic Forms | A newer, more granular alternative to pulling all fields from one page layout at once |

## Check yourself

A sales profile and a support profile both work the Case object, but see different fields and
related lists. What two things determine which page layout each of them actually sees?
