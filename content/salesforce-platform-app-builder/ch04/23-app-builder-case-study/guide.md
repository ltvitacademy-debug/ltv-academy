# App Builder Case Study

**Chapter 4 · Delivering Applications · Lesson 23 of 24**

*This lesson follows a fictional company through a complete application build. No real company, product, or data is depicted — it's a worked exercise that applies every decision point from this course so far to one coherent scenario.*

## What you'll learn

- How to translate a vague business request into specific object-model and logic decisions
- Where each of this course's four chapters shows up in one real-shaped requirement
- Why the "obvious" first design usually isn't the right one
- A template for reading any future app-building request the same way

## The fictional company: Harborline Logistics

**Harborline Logistics** runs a regional truck fleet. Their request, as first written by an operations manager: *"We need a way to track when our trucks need maintenance, who's doing the repair, and make sure nothing expensive gets approved without someone checking it first."*

That sentence contains a data model, a process, and a control — three different chapters' worth of decisions, tangled together. The first job is untangling it.

## Chapter 1 decisions: the data model

Two real entities hide in that sentence: **trucks** (things that exist whether or not anything is being fixed) and **maintenance events** (things that happen to a truck, with their own date, cost, and status). That's a custom object, `Vehicle__c`, in a master-detail relationship to a new custom object `Maintenance_Request__c` — not a set of extra fields bolted onto `Vehicle__c` directly, because a vehicle has *many* maintenance events over its life, and fields can't repeat. Master-detail, not lookup, because a maintenance request has no meaning without its vehicle, and Harborline wants roll-up totals (Chapter 3) on the vehicle later. A third object, `Technician__c`, relates to `Maintenance_Request__c` by lookup, not master-detail — a technician's existence doesn't depend on any one repair.

## Chapter 2 decisions: what the user actually sees

A dispatcher doesn't need a maintenance request's twenty fields visible at once. The page layout surfaces Vehicle, Reported Issue, and Status up top; a **Dynamic Form** hides Cost, Approved By, and Approval Date entirely until Status reaches "Awaiting Approval" — fields an early-stage request has no business showing yet. A **compact layout** on `Vehicle__c` shows its current status and last-service date in the highlights panel so a dispatcher scanning a list never has to open a record just to triage it.

## Chapter 3 decisions: the logic

- A **roll-up summary field** on `Vehicle__c` sums `Maintenance_Request__c.Cost__c` for the year — "total spent keeping this truck running"
- A **validation rule** blocks saving a `Maintenance_Request__c` as "Completed" if `Cost__c` is blank — "nothing expensive gets approved" starts with "nothing gets marked done with no cost recorded"
- An **approval process** on `Maintenance_Request__c` with entry criteria `Cost__c > 2000` routes to the Fleet Director; under that threshold, a dispatcher's own approval is enough, so the approval process simply never fires
- This is deliberately an approval process, not a Flow-only solution, because the requirement is literally "someone checking it" — a named human, a visible decision, an audit trail — the exact shape Lesson 17 named as an approval process's job

## Chapter 4 decisions: delivering it

Security: `Maintenance_Request__c`'s OWD is Private, with a sharing rule granting the Fleet Director role read/write to all records (role hierarchy alone wouldn't reach the dispatchers, who sit in a separate branch). A dedicated **Fleet Maintenance** permission set grants object and field access, assigned to the pilot dispatch team first. Deployment: built in a Developer sandbox, validated in a Partial Copy sandbox against last quarter's real-shaped data, then promoted with a change set. Adoption: an in-app Prompt announces the new Status field to existing users on first login, and a feature-usage report checks weekly whether dispatchers are actually logging requests instead of falling back to the shared spreadsheet they used before.

## Recap

One ordinary-sounding request decomposed into a master-detail data model, Dynamic Forms and a compact layout for the UI, a roll-up summary plus a cost-threshold validation rule plus an approval process for the logic, and a private-OWD, permission-set-driven, sandbox-tested delivery plan. Every decision traces back to a specific lesson in this course — that traceability is the actual skill being tested here, not the specific scenario. Next, the capstone: building one complete app from scratch, end to end.

## Check yourself

Harborline later asks: "Can a technician see which trucks are assigned to them without seeing other technicians' workloads?" Using only tools from Chapters 3 and 4, describe the object relationship and the security setting that would answer this.
