# Script — Sharing Settings and Recalculation

## Segment 1 (title)

Chapter 4 goes beyond the basics, starting with the machinery that keeps access in sync as data and org structure change — and why that machinery isn't instantaneous.

## Segment 2 (steps: the Sharing Settings page)

Setup's Sharing Settings page is home to everything from Chapter 2: OWD per object, sharing rules, and a few org-wide toggles, including guest user record access, which gets its own lesson next. It's the single screen that shows the whole org's record-access model at a glance.

## Segment 3 (code: why recalculation exists)

Salesforce precomputes who can see what in sharing tables, so opening a record doesn't re-derive the whole chain on every click. Most changes — a new hire, a promotion, a reassigned opportunity — trigger recalculation automatically in the background. Large structural changes, like a role hierarchy redesign or retrofitting a sharing rule onto millions of existing records, can be triggered manually from a Recalculate button on the Sharing Settings page.

## Segment 4 (steps: what it actually does)

Recalculation walks every affected record, reevaluates access under the current model, and updates the sharing tables to match. For a small org it's instant. For millions of records and a deep hierarchy, it's a genuinely heavy background job that can take minutes to hours — and during that window, access still reflects the old model.

## Segment 5 (code: planning around it)

So when a big OWD or hierarchy change goes live, plan the timing for a low-usage window, don't assume the effect is instant — testing right away can show stale results until the job finishes — and for very large orgs, be aware of Salesforce's processing limits on a change this size.

## Segment 6 (outro)

The Sharing Settings page, and the recalculation job that keeps it honest behind the scenes. Next lesson covers guest users and community security — a different kind of access model entirely.
