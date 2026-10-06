# Actions and Quick Actions

**Chapter 2 · User Interface · Lesson 10 of 24**

## What you'll learn

- The full catalog of actions available to add to any page
- What makes a Global Action different from an object-specific action
- Where each type actually shows up in the Lightning UI
- What controls which actions a given user sees

## The full catalog

![A reference list of standard and custom actions — Post, New Task, Log a Call, and dozens more.](/courses/salesforce-platform-app-builder/ch02/10-actions-and-quick-actions/available-actions-list.png)

Every action you could add to a page — standard ones Salesforce
ships (Log a Call, New Task, New Case) and any custom quick action
your org has built — comes from this same catalog. Page layouts and
publisher layouts both pull from it.

## Global Actions: no record required

![The Global Actions menu, opened from the plus icon in the header, listing New Event, New Campaign, New Task, and more.](/courses/salesforce-platform-app-builder/ch02/10-actions-and-quick-actions/global-actions-menu.png)

The **plus icon** in the header opens Global Actions — available from
anywhere in the org, with **no record context required**. Creating a
new Contact or logging a new Task from a global action doesn't
require you to already be looking at a specific record.

## Object-specific actions: scoped to the record

![A record page's action overflow menu, showing object-specific actions like Submit for Approval and Change Owner.](/courses/salesforce-platform-app-builder/ch02/10-actions-and-quick-actions/action-overflow-menu.png)

On a record page, the action overflow menu is scoped to that **one
object type**. Actions like Submit for Approval, Change Owner, and
Sharing Hierarchy only make sense in the context of the record
already open — they wouldn't appear in Global Actions.

## Two kinds, different scope

| | Global action | Object-specific action |
|---|---|---|
| Record context | None required | Scoped to one object type |
| Found | Header plus icon, from anywhere | Record page action/overflow menu |
| Example | New Event, New Campaign | Submit for Approval, Change Owner |

A **quick action**, whether global or object-specific, is just a
shortcut — fewer fields than the full record form, built for speed.
What actually determines which actions a given user sees is the
**publisher layout** (global) or the **page/record page** (object-specific).

## Key terms

| Term | Meaning |
|---|---|
| Global action | An action usable from anywhere, with no record context |
| Object-specific action | An action scoped to one object type, shown on its records |
| Quick action | A shortcut form with fewer fields than the full record |
| Publisher layout | Controls which global actions a profile sees |

## Check yourself

A support rep wants a one-click "Log a Call" button available from
every screen in the org, not just from a Case record. Is that a
global action or an object-specific action, and why?
