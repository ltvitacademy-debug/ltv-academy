# Field History Tracking

**Chapter 3 · Objects and Layouts · Lesson 23 of 36**

A record's current field values tell you where things stand right now. They don't tell you how it
got there — who changed the Stage from Negotiation back to Qualification, or when a case's
Priority was quietly bumped down. **Field History Tracking** is Salesforce's built-in answer: turn
it on for the fields that matter, and every change is captured automatically, with no extra code
and no extra clicks from the user making the change.

## What you'll learn

- Where to turn on field history tracking, object by object
- The field-count limits you'll actually run into
- What gets recorded for a tracked field, and what doesn't
- How to show the result to users with a History related list

## Turning it on, object by object

From Setup, **Field History Tracking** in the Quick Find box opens a single page listing every
trackable object in the org — standard and custom — with a **Number of Tracked Fields** column and
a **View** link to configure each one.

![The Setup "Field History Tracking" page, listing objects (Account, Case, Contract, Order, and several custom objects) with a Number of Tracked Fields column and View links, plus a "Show only tracked objects" checkbox.](/courses/salesforce-administration/ch03/23-field-history-tracking/field-history-tracking-object-list.png)
*One page for the whole org — every object that supports field history tracking shows up here, tracked or not.*

Clicking **View** (or reaching the same page from Object Manager → a specific object → **Fields &
Relationships** → **Set History Tracking**) opens a checklist: every field on that object, with a
checkbox to track it.

![A "Task Field History" field-tracking checklist, with several fields checked (Call Result, Completed Date/Time, Due Date, Name, Priority) and a red error reading "You have exceeded the maximum number of fields to track: 6."](/courses/salesforce-administration/ch03/23-field-history-tracking/set-history-tracking-fields.png)
*The field-count ceiling is real, and it's lower than people expect for Tasks and Events specifically.*

## The limits that actually bite

Most standard and custom objects can track up to **20 fields** each — a generous number most orgs
never hit. **Tasks and Events are the exception**: they're capped at **6 tracked fields** each, a
noticeably tighter limit that catches admins off guard if they assume every object behaves the
same way. (Salesforce's paid **Field Audit Trail** add-on raises the 20-field ceiling to 60 and
extends retention — out of scope for a default org, but worth knowing it exists.)

## What actually gets recorded

For a tracked field, every edit writes the **old value, the new value, the date and time, and
which user made the change** into that object's History related list. Two field types are tracked
differently: **multi-select picklists and long text fields** record *that* a change happened and
*who* made it, but not the specific old/new values — those field types are simply too large to
log value-by-value.

Retained history shows up to **18 months** in the UI, and up to **24 months** is available via
API — a scope worth knowing before promising a user "we can pull up exactly what this looked like
two years ago."

## Seeing it: the History related list

Once fields are tracked, add the object's **History** related list to its page layout, and every
qualifying change appears automatically — no Apex, no automation required.

![An "Account History" related list on a record page, showing three change entries with Date, Field, User, Original Value, and New Value columns — Billing Country changed from USA to US, Industry set to Consulting, Employees set to 500.](/courses/salesforce-administration/ch03/23-field-history-tracking/account-history-related-list.png)
*Every tracked change, who made it, and when — visible to any user who can see the record and its page layout.*

## Why this matters

Field History Tracking turns "I think someone changed that" into a fact a user can look up
themselves, on the record, without filing a request to an admin or pulling a report. It's the
first line of accountability for field-level changes — not a full audit system, but often enough
to settle the question of what changed and who changed it.

## Key terms

| Term | Meaning |
|---|---|
| Field History Tracking | The Setup feature recording old/new values, date, and user for tracked fields |
| Tracked field limit | 20 fields per object by default; 6 for Tasks and Events; raised to 60 via Field Audit Trail |
| History related list | The object-specific related list (e.g. Account History) that displays tracked changes |
| Field Audit Trail | A paid add-on that raises the field limit and extends retention beyond the default |

## Check yourself

Why does changing a multi-select picklist field show up differently in the History related list
than changing a standard picklist field?
