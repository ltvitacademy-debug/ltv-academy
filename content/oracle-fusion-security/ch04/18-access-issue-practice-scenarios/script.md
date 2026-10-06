# Script — Access Issue Practice Scenarios

## Segment 1 (title)

Lesson seventeen gave you the method. This lesson applies it to four realistic tickets at Castellan Robotics, each worked through the function-security, data-security split before landing on the actual fix.

## Segment 2 (steps)

Scenario one: a new AP Specialist can't even see the Create Invoice page. That's function security — no role was ever provisioned, because her job title had a trailing space that didn't match the role mapping's conditions, so autoprovisioning never fired. Fix the job field, then provision the role. Scenario two: a Senior Accountant sees far fewer invoices than expected after taking on a second business unit. That's data security — one of his two roles still points at a stale business unit value. Fix both roles to be consistent, rather than bolting on a third, broader role.

## Segment 3 (steps)

Scenario three: a regional controller's General Ledger numbers look off, but her data access set is actually correct — this isn't a security problem at all. A balancing segment value was never assigned a default ledger set during enterprise structure setup. That's implementation configuration, not security. Scenario four: a frustrated manager wants to just hand an AP Supervisor the full AP Manager role to stop the complaints. The actual gap turns out to be one narrow duty role — adjusting supplier payment terms — not the whole manager role, which would have also handed him payment approval he never asked for.

## Segment 4 (steps)

Every one of these confirms the same discipline: split function from data security first, resist the broad "just grant everything" fix, and don't assume every wrong-data complaint is a security problem.

## Segment 5 (outro)

Four tickets, one method. Up next, lesson nineteen: security in implementation and testing, closing out the course by placing all of this inside a full implementation project.
