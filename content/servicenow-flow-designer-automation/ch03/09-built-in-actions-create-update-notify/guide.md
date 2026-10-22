# Lesson 9 — Built-In Actions: Create, Update, Notify

**Chapter 3 · Flow Actions · Lesson 9 of 27**

## What you'll learn

- What an "action" is inside a flow, and why three built-in actions cover most real automations
- How Create Record builds a new record from data pills and static values
- How Update Record changes an existing record — often the triggering record itself
- How a notification action sends email without you writing a Notification from scratch
- Why these three actions, combined, are the actual backbone of most flows you'll build

## The three actions that do most of the work

Chapter 1 and 2 covered triggers, variables, data pills, conditions, and loops — the skeleton of
a flow. None of that skeleton does anything to a record on its own. The actions inside a flow are
where the real work happens, and in practice, the overwhelming majority of flows lean on just
three built-in actions: **Create Record**, **Update Record**, and a notification action. Before
you reach for Action Designer or IntegrationHub, check whether one of these three already solves
the problem — they usually do.

## Create Record

The Create Record action inserts a brand-new row on whatever table you point it at. You pick the
table (Incident, Change Request, a custom table, anything), then map field values using the same
data-pill mechanism from Lesson 5: pull a value from the trigger record, from an earlier step's
output, or type a static value directly. A flow triggered when a high-priority Incident is
created, for example, might use Create Record to automatically open a related Problem record,
with the Problem's short description populated from a data pill off the triggering Incident.
Create Record always produces a brand-new record — if you need to change something that already
exists, that's a different action.

## Update Record

Update Record modifies a record that already exists — most often the record that triggered the
flow in the first place, since that record is automatically available as a data pill. A flow
triggered on Incident update, for instance, might use Update Record to set the Incident's
`assignment_group` based on category, or to flip a custom field once a condition is met. Update
Record can also target a record looked up elsewhere in the flow (say, a Problem record that an
earlier Create Record step just made), not only the trigger record. The field-mapping mechanics
are identical to Create Record — data pills or static values — the only difference is whether the
action makes a new row or changes one that's already there.

## Notify: sending a message without starting from scratch

Course 3 of this path covered the real Notification mechanism — the admin-configured email
templates tied to tables and events. Flow Designer's notification-style action lets a flow fire
one of those existing notifications, or send a direct message, as a step — no new Notification
record has to be created for every flow that needs to email someone. In practice, a flow routes
data into the message (who to email, which record to reference, which template to use) and the
platform's existing notification infrastructure handles delivery. This is why Course 3 wasn't
wasted effort: Flow Designer builds on top of the notification system rather than replacing it.

## Reading these three together in a real flow

A realistic flow chains all three: a Record trigger fires when an Asset Request is submitted,
Create Record opens a formal request record for the fulfillment team, Update Record marks the
original submission as "In Progress," and a notification action emails the requester to confirm
their request was received. Each action does one job; the flow's value comes from chaining them
in the right order with the right data pills feeding each one.

## Key terms

| Term | Meaning |
|---|---|
| Create Record (action) | Built-in Flow Designer action that inserts a new record on a chosen table |
| Update Record (action) | Built-in Flow Designer action that modifies an existing record, often the trigger record |
| Notification action | A flow step that fires an existing Notification or sends a direct message |
| Field mapping | Populating a record's fields in an action using data pills or static values |

## Check yourself

You're ready for Lesson 10 when you can explain: if a flow needs to change the record that
triggered it, which action do you use — and why would Create Record be the wrong choice there?
