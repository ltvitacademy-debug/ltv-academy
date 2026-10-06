# Script — Building a Complete App

## Segment 1 (title)

Twenty-three lessons built a toolkit, one piece at a time. This one uses all of it, in order, on a single small app — an internal IT help desk — to show what building a complete app actually looks like, from the first object to the deployed, secured, adopted result.

## Segment 2 (steps: the data model)

IT wants employees to submit requests, route them to the right technician, track resolution time, and give managers visibility into anything open too long. Help Desk Ticket is the core object: subject, description, priority, status, a lookup to the affected asset, and a lookup to the assigned technician. Asset itself master-details to Account, so equipment history rolls up naturally.

## Segment 3 (code: the interface and the logic)

A Dynamic Form only shows the Asset field once Priority is set. An Escalate quick action is a one-click screen Flow instead of five manual field edits. Underneath: a validation rule blocking a thin ticket, a formula field for hours open, a roll-up counting each asset's open tickets, and an approval process on critical priority that routes to the requester's manager — Flow deciding when, the approval process still doing the routing.

## Segment 4 (steps: delivering it)

Security: private org-wide default, a sharing rule for the IT queue, a dedicated technician permission set. Reporting: an open-tickets-by-priority dashboard, embedded right on the app's home page, run dynamically so each technician sees their own queue. Deployment: developer sandbox, then partial copy with realistic volume, then a change set with every dependency checked. Adoption: an in-app prompt for the new button, and a usage report to confirm it's actually replacing email.

## Segment 5 (code: what carries forward)

This app used five of chapter three's tools and all of chapter four's delivery steps — but only the simplest form of Flow, a short screen Flow triggering an approval. Everything about record-triggered automation, loops, collections, subflows, and scheduled processing was deliberately left out. That's exactly where Flow Automation, the next course, picks up.

## Segment 6 (outro)

Object model, interface, logic, delivery — the same sequence, every time, each decision traceable to a lesson. This closes Platform App Builder. Next course in the path: Flow Automation — record-triggered flows, loops, and the automation depth this capstone didn't need yet.
