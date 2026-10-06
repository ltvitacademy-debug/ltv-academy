# Script — Field History Tracking

## Segment 1 (title)

A record's current values tell you where things stand right now — not how it got there. Field History Tracking is Salesforce's built-in answer: turn it on for the fields that matter, and every change is captured automatically, no extra code required.

## Segment 2 (screenshot: Field History Tracking object list)

From Setup, Field History Tracking opens one page listing every trackable object in the org — standard and custom — with how many fields are currently tracked and a View link into each.

## Segment 3 (screenshot: set history tracking fields)

Click into an object and you get a checklist of its fields. Most objects can track up to 20 fields. Tasks and Events are the exception — capped at 6 — and that limit catches admins off guard when they assume every object behaves the same way.

## Segment 4 (screenshot: Account History related list)

What gets recorded: old value, new value, date and time, and who made the change, all written automatically to the object's History related list — add it to the page layout and users can see it themselves, no admin request needed.

## Segment 5 (steps: the fine print)

Two exceptions worth knowing: multi-select picklists and long text fields only log that a change happened and who made it, not the specific values. And retention is 18 months in the UI, 24 via API — Field Audit Trail extends both if an org needs more.

## Segment 6 (outro)

Next up: List Views and Search Layouts, for shaping what users see when they're not looking at one record at a time.
