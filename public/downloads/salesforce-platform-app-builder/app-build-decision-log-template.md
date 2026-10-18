# App Build Decision Log Template

> The same four-chapter decomposition this course used on Harborline Logistics (Lesson 23) and
> the Help Desk Ticket app (Lesson 24) — data model, interface, logic, delivery, in that order.
> Copy this template for any new app request and fill it in before building anything in Object
> Manager. The traceability (every decision pointing back to a specific reason) is the actual
> skill being practiced, not the specific scenario.

## 0. The raw request, as first written

> *Write down the request exactly as the business stakeholder phrased it — usually a single
> sentence tangling together a data model, a process, and a control, the way Harborline's "track
> maintenance, know who's doing the repair, make sure nothing expensive gets approved without
> someone checking it" tangled three different chapters' worth of decisions together.*

```
Raw request:


```

## 1. Chapter 1 decisions — the data model

```
Real entities hiding in the request (list the nouns that are actually
separate objects, not just fields on an existing object):
 -
 -

For each new custom object:
  Object name:
  Master-Detail or Lookup to its parent?
  Why (does it genuinely depend on its parent for its existence,
  and do you need roll-up totals on the parent)?

Junction object needed? (Y/N) -- if yes, which two objects does it resolve?
```

## 2. Chapter 2 decisions — what the user actually sees

```
Page type (App Page / Record Page / Home Page):
Fields to hide via Dynamic Forms, and the condition that reveals them:
Compact layout fields (what a user needs to triage without opening the record):
Quick Action needed? (e.g. a one-click Escalate button backed by a small
screen Flow) -- Y/N, and what it does:
```

## 3. Chapter 3 decisions — the logic

```
Roll-up summary fields needed (what's being summed/counted, on which parent):
Validation rule(s) needed (what should be IMPOSSIBLE to save, and why):
Formula field(s) needed:
Approval process needed? (Y/N) -- entry criteria, and WHO it routes to
  Reminder: choose an approval process (not just a Flow) when the
  requirement is literally "a named human checks this" -- a visible
  decision and an audit trail, not just automated logic.
```

## 4. Chapter 4 decisions — delivering it

```
Security:
  OWD for each new object:
  Sharing rule needed? (who, and why the role hierarchy alone doesn't reach them)
  Permission set needed? (what it grants, who it's assigned to first)

Deployment:
  Built and tested in: _________ sandbox
  Validated against real-shaped data in: _________ sandbox
  Promoted via: Change Set (list every component it must include)

Adoption:
  How will existing users be told about this change?
  What will you check in 1-2 weeks to confirm people are actually using it,
  instead of falling back to whatever they used before?
```

## 5. Recap check

Before calling this app "built," confirm every decision above traces back to a specific line in
the raw request from Step 0 — if a decision doesn't trace back to anything the stakeholder
actually asked for, question whether it's scope creep.
