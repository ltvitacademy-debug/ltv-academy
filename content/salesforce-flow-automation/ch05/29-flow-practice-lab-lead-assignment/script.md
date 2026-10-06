# Script — Flow Practice Lab: Lead Assignment

## Segment 1 (title)

Time to build something real. This lab is one complete flow — automatic lead assignment by territory, with a safe fallback and real error logging — using nothing but elements already covered in this course.

## Segment 2 (steps: the business problem and the plan)

New leads arrive with no owner. We want them routed by State, using a custom object that maps a state to the account executive who owns it. Not every state has a mapping yet, so an unmatched lead needs to land in a shared queue a human will see — never silently ownerless.

## Segment 3 (code: start, get records, decision)

Named Lead - Before Save - Owner Assignment, following Lesson 27's convention exactly. Record-Triggered Flow, Lead, record created, before save — it's just a field update, so before-save is the faster, correct choice. Get Territory Rule queries Territory_Assignment__c where State equals the triggering lead's state. Then a Decision: Territory Match Found, checking whether that query actually returned something.

## Segment 4 (code: the two assignment paths)

Matched path: Assign Owner From Territory, setting OwnerId to the matched record's Assigned Owner. No-match path: Assign Owner To Fallback Queue, setting OwnerId to the Unassigned Leads queue instead. Two clean, labeled outcomes — no lead ever falls through without an owner.

## Segment 5 (code: the fault path, without a screen)

Before-save flows can't use a screen, so the FaultMessage pattern from Lesson 20 needs a different home here. A fault path off Get Territory Rule leads to an Assignment element — Log Assignment Fault — writing $Flow.FaultMessage straight onto a field on the record. No screen, same idea: a real, debuggable error instead of a silent failure.

## Segment 6 (outro)

Debug it both ways before activating — a state that matches, and a state that doesn't — confirming the owner lands correctly either way. Next up: Case Escalation, a second complete lab with its own real scenario.
