# Lesson 29 — Flow Practice Lab: Lead Assignment

**Chapter 5 · Flow in Practice · Lesson 29 of 31**

## What you'll build

A single **before-save, record-triggered flow** on Lead that looks up the right owner from a territory-assignment object, falls back to a shared queue when no territory matches, and logs a real error if the lookup itself fails — using nothing but elements and patterns already covered in this course.

## The business problem

New leads come in from a web form with no owner assigned. Reps want leads routed automatically by **State**, pulled from a custom object (`Territory_Assignment__c`) that maps a state to the account executive who owns that territory. Not every state has a mapped territory yet, so unmatched leads need to land somewhere a human will actually see them — a shared **Unassigned Leads** queue — rather than silently staying ownerless.

## Step 1 — Start element and naming

Following Lesson 27's convention, the flow is named **`Lead - Before Save - Owner Assignment`**: Object, Trigger Context, Purpose. Start configuration: **Record-Triggered Flow**, object **Lead**, trigger **A record is created**, run the flow **Before Save** — field updates like `OwnerId` don't need a second save, so before-save is the faster, correct choice here (Lesson 22).

## Step 2 — Get the territory record

```
Element: Get Records
Label:   Get Territory Rule
Object:  Territory_Assignment__c
Filter:  State__c Equals {!$Record.State}
Store:   territoryMatch (first record only)
```

## Step 3 — Decision: was a territory found?

```
Element: Decision
Label:   Territory Match Found?
Outcome "Matched":  {!territoryMatch} Is Null  Equals  False
Default: "No Match"
```

## Step 4 — Two Assignment paths

```
Matched path:
  Element: Assignment
  Label:   Assign Owner From Territory
  Set:     {!$Record.OwnerId} = {!territoryMatch.Assigned_Owner__c}

No Match path:
  Element: Assignment
  Label:   Assign Owner To Fallback Queue
  Set:     {!$Record.OwnerId} = {!UnassignedLeadsQueueId}
```

Both paths converge back to the flow's end — a before-save flow has no further elements to run once `OwnerId` is set; the platform handles the actual save.

## Step 5 — A fault path that doesn't use a screen

Before-save and autolaunched flows can't use screen elements, so Lesson 20's `$Flow.FaultMessage` pattern needs a different destination here: a fault path off **Get Territory Rule**, routing to an Assignment element that writes the real error onto the record itself.

```
Fault path off Get Territory Rule:
  Element: Assignment
  Label:   Log Assignment Fault
  Set:     {!$Record.Lead_Assignment_Error__c} = {!$Flow.FaultMessage}
```

That one field gives an admin a real, debuggable error message on the Lead record itself, instead of a silent failure.

## Step 6 — Test it with Debug

Per Lesson 21, debug this flow with sample input before activating: a State value that matches an existing `Territory_Assignment__c` record (confirm `OwnerId` lands correctly) and a State value that matches nothing (confirm it falls back to the queue, not an error). Only after both cases pass cleanly is this ready to activate.

## Key terms

| Term | Meaning |
|---|---|
| Territory_Assignment__c | This lab's custom object mapping a State to an Assigned_Owner__c |
| Fallback queue | Where unmatched leads land instead of staying ownerless |
| Before-save flow | Chosen here because the only work is a field update (OwnerId) |

## Check yourself

Why does the fault path in this lab write to a field instead of showing a Display Text screen, and what earlier lesson explains why that choice was forced rather than optional?
