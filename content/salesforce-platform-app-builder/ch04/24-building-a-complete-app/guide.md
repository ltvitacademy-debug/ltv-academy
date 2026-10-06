# Building a Complete App

**Chapter 4 · Delivering Applications · Lesson 24 of 24**

Twenty-three lessons built a toolkit, one piece at a time. This one uses all of it, in order, on a single small application — an internal IT Help Desk — to show what "building a complete app" actually looks like end to end, from the first object to the deployed, secured, adopted result.

## What you'll learn

- How to sequence an app build the way this course sequenced itself
- A complete, small worked example touching every chapter
- Where the decisions in a real build genuinely have trade-offs, not one right answer
- What to carry forward into Flow Automation, the next course

## The requirement

IT wants employees to submit help requests, have them routed to the right technician, track resolution time, and get manager visibility into anything that's been open too long.

## Step 1 — Chapter 1: data model

`Help_Desk_Ticket__c` is the core object: `Subject__c`, `Description__c`, `Priority__c` (picklist: Low/Medium/High/Critical), `Status__c` (picklist: New/In Progress/Waiting on User/Resolved), a lookup to `Asset__c` (the affected equipment, which may be blank), and a lookup to `User` for the assigned technician. Tickets relate to employees via the standard `CreatedBy` field rather than a custom lookup — no need to duplicate what Salesforce already tracks. `Asset__c` itself is modeled with a master-detail to `Account` (or `Account`'s existing asset object, where available) so equipment history rolls up naturally.

## Step 2 — Chapter 2: the interface

A **record page** built in Lightning App Builder shows the ticket's key fields in a **Dynamic Form** — `Asset__c` only appears once `Priority__c` is set, since "what broke" only matters after severity is triaged. A **Quick Action**, "Escalate," is a screen Flow (see Step 3) exposed as a button, so escalating a ticket is one click instead of five field edits. The **compact layout** for the ticket list shows Priority and Status so a technician can triage a queue without opening each record.

## Step 3 — Chapter 3: the logic

```
Validation Rule (Ticket_Requires_Description):
  AND( ISBLANK(Description__c), NOT(ISBLANK(Subject__c)) )
  -- blocks a ticket with a subject but no real description

Formula Field (Hours_Open__c):
  (NOW() - CreatedDate) * 24

Roll-Up Summary on Asset__c:
  COUNT(Help_Desk_Ticket__c) WHERE Status__c != "Resolved"
  -- "how many open tickets does this piece of equipment have"

Approval Process (Critical_Ticket_Manager_Review):
  Entry criteria: Priority__c = "Critical"
  -> routes to the requester's manager for visibility, not blocking
```

The Escalate quick action is a small **screen Flow**: it asks the technician for an escalation reason, sets `Priority__c` to "Critical," and lets that field change be what triggers the approval process above — Flow deciding *when*, the approval process still doing the *routing*, exactly the pattern from Lesson 17.

## Step 4 — Chapter 4: delivering it

**Security**: `Help_Desk_Ticket__c` OWD is Private. A sharing rule grants the IT Queue read/write to all tickets. A **Help Desk Technician** permission set grants object/field access and is assigned independently of each technician's base profile. **Reporting**: a summary report of open tickets by Priority feeds a dashboard component embedded directly on the Help Desk app's home page, run dynamically so each technician sees their own queue. **Deployment**: built and unit-tested in a Developer sandbox, validated against a Partial Copy sandbox's real-shaped ticket volume, promoted to production with a change set that includes the object, fields, validation rule, roll-up, Flow, approval process, permission set, and report — checked against its full dependency list before upload. **Adoption**: an in-App Prompt introduces the Escalate button to existing users, and a two-week usage report confirms technicians are working from the queue instead of email.

## What carries forward

This app used five of Chapter 3's tools and all of Chapter 4's delivery steps, but it only used the *simplest* form of Flow — a short screen Flow triggering an approval. Everything about record-triggered automation, loops, collections, subflows, and scheduled processing was deliberately out of scope here. That's exactly where **Flow Automation**, the next course in this path, picks up.

## Recap

A complete app is the same five-tool business-logic toolkit and the same four-layer delivery pipeline this course taught separately, applied together to one coherent requirement: object model, interface, logic, and delivery, in that order, each decision traceable to a specific lesson. The Help Desk Ticket app is small on purpose — the goal was showing the *sequence*, not the scale.

## Check yourself

Sketch, in your own words, the five Chapter 3 tools used in the Help Desk Ticket app and the one specific job each one does. Then name the Chapter 4 decision that ensures a technician can't see tickets assigned to a different technician's queue.
