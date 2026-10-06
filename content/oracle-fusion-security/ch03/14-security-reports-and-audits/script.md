# Script — Security Reports and Audits

## Segment 1 (title)

Lesson thirteen introduced segregation of duties conflicts and compensating controls. This lesson covers the reporting tools that make any of that reviewable — both what access someone has, and what they actually did.

## Segment 2 (steps)

The User and Role Access Audit Report answers "what access does this user or role actually have." It reports function security privileges and, optionally, data security policies, for one user, many users, or a specific role — essentially what the Security Console shows one user at a time, but as a structured, exportable report. It runs as a scheduled process, with parameters for population and whether to include data security. Before it returns anything meaningful, the Import User and Role Application Security Data process has to run first — a stale or never-run import is a common reason this report comes back looking empty.

## Segment 3 (steps)

Audit Trail, configured through Manage Audit Policies, answers a different question: what did this person actually do. It logs create, update, and delete activity on enabled business objects, including before and after values and who made the change. The two tools are complementary — access reporting is preventive, on potential access; audit trail is detective, on actual activity. Reviewing a suspicious transaction usually uses both.

## Segment 4 (steps)

At Castellan Robotics, the implementation team ran the access audit report once, right before go-live, to confirm nobody picked up unintended access during testing. That's necessary but not enough — running it on a recurring schedule, often quarterly, is what actually catches drift: a role mapping that over-provisions after a reorganization, or an employee who changed departments and never had old access removed.

## Segment 5 (outro)

Access reporting shows what someone has; audit trail shows what they did — and both are most valuable run on a recurring schedule, not just once at go-live. Up next, lesson fifteen: role design for a real company, bringing all of chapter three together.
