# Script — Formulas and Formula Functions

## Segment 1 (title)

Validation rules evaluate a formula. Approval entry criteria can use one. Formula fields are entirely formulas. Learn to read this syntax once, and you can read it in every tool this chapter covers.

## Segment 2 (screenshot: formula editor labeled)

Here's the Advanced Formula editor, the same one you'll land on throughout the platform. Simple Formula is a basic one-field UI; Advanced is the free-text box you'll actually use. Insert Field opens a picker for any field on the object, Insert Operator gives you math and logical operators without memorizing symbols, and Functions lists every formula function with its exact argument order. Check Syntax validates it all without saving.

## Segment 3 (screenshot: insert field menu)

Insert Field is worth a closer look, because it does more than list fields on the current object. Notice the ">" next to Account: that means there are related fields available too. A formula field on Contact can reach straight across to its parent Account, something like Account dot Account Number. Crossing objects this way is common, and it's one of the things new admins don't realize is possible until they see it work.

## Segment 4 (screenshot: functions menu)

The Functions panel is searchable and categorized, and every entry comes with its signature spelled out, like ROUND, which takes a number and the number of digits to round to. When you get an error about too many or too few parameters, this panel is where you check what the function actually expects instead of guessing.

## Segment 5 (screenshot: formula field usage)

And once a formula field exists, it isn't confined to one screen. The same field shows up on page layouts, in list views, and in reports, recalculated fresh every single time it's displayed. That's the key difference from a regular field: a formula field is never actually saved, so it never goes stale.

## Segment 6 (outro)

We've now covered every piece this chapter's tools depend on: approvals, validation, and the formula language underneath both. Last stop in Chapter 1: making sure the right person actually finds out when any of this fires.
