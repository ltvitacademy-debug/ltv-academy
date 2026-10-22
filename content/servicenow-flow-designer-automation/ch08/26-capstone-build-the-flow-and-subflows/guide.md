# Lesson 26 — Capstone: Build the Flow & Subflows

**Chapter 8 · Capstone: Automating a Real Business Process · Lesson 26 of 27**

## What you'll learn

- How to translate Lesson 25's five-step sketch into an actual Flow Designer build
- How the If/Else branch, the Call Subflow step, the Approval action, and a Create Record action chain together in one flow
- Why "Revoke Access" belongs in its own subflow, with real Inputs and Outputs
- How this build reuses Chapter 2, 3, and 4 mechanisms rather than inventing new ones

## Starting from the sketch, not from a blank canvas

Lesson 25 ended with five plain-language steps. That sketch is now the
build order. Open a new flow scoped to the contractor table, name it
something a future admin could understand on sight —
`"Contractor Offboarding - Access Revocation"` — and set its trigger to
the Scheduled trigger designed in Lesson 25: daily, querying for
`end_date` = today and `active` = true. Everything from here is just
Chapter 2 through Chapter 4's mechanisms, applied in sequence instead of
in isolated labs.

## The If/Else branch on contractor type

The first action in the flow body is an **If/Else**, the exact mechanism
from Lesson 6, built on a data pill from the trigger record: does
`contractor_type` equal "IT contractor"? IT contractors typically have
accounts in more systems — a VPN profile, elevated application roles, a
service account or two — while non-IT contractors usually only need their
base network account disabled. The branch doesn't duplicate logic for its
own sake; it exists because the two paths genuinely need different
handling downstream, which is the same test Lesson 6 used for when an
If/Else earns its place in a flow instead of being unnecessary complexity.

## Call Subflow: Revoke Access

Both branches then call the same subflow: **Revoke Access**. This is
exactly the Lesson 13/14 pattern — a self-contained unit of work with a
defined **Input** (the contractor's `sys_user` record) and a defined
**Output** (a revocation status: success or failed-with-reason). Inside
the subflow, the actual revocation actions differ by what was passed in,
but the calling flow doesn't need to know that detail — it calls the
subflow, waits for the status back, and continues. The real payoff here
isn't just tidiness: this same "Revoke Access" subflow could later be
called from an entirely different flow — a security-incident flow that
needs to cut off access immediately, for instance — without rebuilding
the logic. That reusability is the whole argument Lesson 13 made for
building a subflow instead of a flow in the first place.

## Approval: manager confirms equipment return

After the subflow returns its status, the flow fires an **Approval
action** — the Lesson 10 mechanism — assigned to the contractor's
`manager` field, asking them to confirm equipment (laptop, badge, any
hardware) was returned. This step runs regardless of the subflow's exact
outcome, because equipment return is a separate concern from system
access; a flow condition checks the subflow's output only to decide
whether to also flag the record for a security follow-up if revocation
failed.

## Create Record: the IT task

Finally, a **Create Record** action — the same built-in action family
from Lesson 9 — creates a task record assigned to the IT queue,
summarizing what happened: which contractor, which systems were revoked,
whether the manager's approval is still pending, and a clear instruction
to disable the account if that hasn't already happened automatically.
This is the step that turns "the flow ran" into "a human has something
concrete and assigned to act on," which matters any time automation
can't fully close out a process by itself.

## Key terms

| Term | Meaning |
|---|---|
| Call Subflow | A flow step that invokes a separate, reusable subflow and waits for its output before continuing |
| Subflow Input | Data the calling flow passes into a subflow — here, the contractor's user record |
| Subflow Output | Data the subflow returns to the calling flow — here, a revocation status |
| Approval action | A flow step that routes a request to a specific person (here, the contractor's manager) and pauses until they respond |

## Check yourself

Walk through, in your own words, exactly what data the "Revoke Access"
subflow receives as its Input and what it hands back as its Output — and
explain why the calling flow doesn't need to know *how* the subflow
revokes access, only that it did.
