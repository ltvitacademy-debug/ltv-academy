# Lesson 12 — Flows

**Chapter 3 · Build: Automation and Security · Lesson 12 of 20**

## What you'll learn

- How to build a record-triggered Flow that automates new Lead ownership
  and follow-up for Cascade
- How to build a Screen Flow that lets Marcus Webb's team log a service
  visit without touching the object directly
- How Flow elements — triggers, decisions, record updates, screens — map
  onto a real business process instead of a generic tutorial example
- How this satisfies Requirement 5 from Lesson 1's Definition of Done

This lesson applies the Flow Automation course's concepts — record-triggered
Flows, Screen Flows, Get/Update/Create Records elements, decision logic —
directly against Cascade's org for the first time.

## Flow 1 — New Lead Auto-Assignment (record-triggered)

Lesson 7 said new Leads land in Jordan Kessler's queue "regardless of
source." This Flow is what actually makes that true, every time, instead
of relying on someone remembering to reassign a Lead by hand.

**Setup → Process Automation → Flows → New Flow → Record-Triggered Flow**

| Element | Configuration |
|---|---|
| Object | Lead |
| Trigger | A record is created |
| Entry condition | None — every new Lead qualifies |
| When to run | After the record is saved |
| Action 1 — Update Records | Set `OwnerId` to Jordan Kessler's user record |
| Action 2 — Create Records | New Task: Subject "Qualify new lead", `WhoId` = the Lead, `OwnerId` = Jordan Kessler, Due Date = Today + 1 |

Running this **after save**, as two actions on one Flow, means every new
Lead — trade show, website, referral, or dealer pass-along — lands owned
by Jordan with a same-day follow-up Task already sitting in his list,
instead of depending on a human to remember the hand-off.

## Flow 2 — Log a Service Visit (Screen Flow)

Marcus Webb's installers need a simple way to record what happened on an
on-site visit without opening the full Installation Project edit layout
and hunting for the right fields.

**Setup → Process Automation → Flows → New Flow → Screen Flow**

| Element | Configuration |
|---|---|
| Input variable | `recordId` — the Installation Project the user launched the Flow from |
| Get Records | Installation Project where Id = `recordId` |
| Screen 1 — "Visit Details" | Fields: Visit Notes (long text), New Install Status (picklist, same values as the object) |
| Update Records | Set `Install_Status__c` to the screen's picklist value; append the visit notes, with today's date, to `Equipment_Summary__c` |
| Screen 2 — "Confirmation" | Display text: "Visit logged. Status updated to {!NewStatus}." |

Add this Flow as a **Quick Action** on the Installation Project page
layout so an installer launches it directly from the record they're
standing in front of on a tablet, instead of navigating to Edit.

## Why these two, specifically

Both Flows automate something that was previously either manual (Lead
reassignment) or awkward (editing a full record from a phone to log a
visit) — not a generic "update a field" example disconnected from
Cascade's actual process. The record-triggered Flow enforces a rule
every single time with no human step to forget; the Screen Flow makes a
real field worker's job faster without giving them edit access to fields
they shouldn't touch (Opportunity, Account — both stay on the layout as
read-only, consistent with the Service Profile from Lesson 11).

## Key terms

| Term | Meaning |
|---|---|
| Record-triggered Flow | A Flow that runs automatically when a record is created, updated, or deleted — no user interaction |
| Screen Flow | A Flow with one or more interactive screens a user steps through, launched manually or from a Quick Action |
| Entry condition | The filter that decides which records a record-triggered Flow actually runs against |

## Lab

Build both Flows in your own org. Create a test Lead and confirm it lands
owned by Jordan Kessler with a Task already assigned. Then open a test
Installation Project, launch the Screen Flow from a Quick Action, log a
visit, and confirm Install Status and Equipment Summary both updated.

## Check yourself

- Why does the New Lead Auto-Assignment Flow run "after save" with two
  separate actions instead of a single field update?
- What input variable does the Screen Flow need to know which
  Installation Project it's updating?
- Why is this Flow added as a Quick Action instead of asking installers
  to use the standard Edit button?
