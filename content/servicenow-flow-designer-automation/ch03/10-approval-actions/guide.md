# Lesson 10 — Approval Actions

**Chapter 3 · Flow Actions · Lesson 10 of 27**

## What you'll learn

- Why a flow sometimes needs to stop and wait on a human decision instead of running straight through
- The real approval variants: a specific individual, anyone in a group, or everyone in a group
- What actually happens under the hood — the `sysapproval_approver` record an approver interacts with
- How the flow's execution pauses and resumes based on that record's outcome
- Where approval actions fit relative to the Create/Update/Notify actions from Lesson 9

## Not every step can run on its own

Create Record, Update Record, and notifications all run without asking anyone's permission —
they execute the instant the flow reaches them. Plenty of real business processes don't work that
way. A new-hire equipment request shouldn't provision a laptop until a manager signs off. A
change request above a certain risk level shouldn't move to implementation until a change
advisory board member approves it. Flow Designer's "Ask for Approval" family of actions is how
you model that real stop-and-wait behavior, instead of faking it with a Create Record and hoping
someone notices.

## The three real approval variants

Ask for Approval comes in distinct forms, and choosing the right one matters because they resolve
differently:

- **Approval from a specific individual** — one named person (often resolved via a data pill,
  like "the requester's manager") must respond. The flow waits on that one person alone.
- **Approval from a group — anyone** — any single member of a chosen group can approve or reject,
  and whichever response comes first resolves the whole step. Useful when any qualified person on
  a team can make the call.
- **Approval from a group — everyone** — every member of the group must approve before the step
  resolves; a single rejection (or everyone approving) closes it out. Useful for genuinely
  collective decisions, like a multi-person change advisory board.

## What's actually happening behind the action

An approval action isn't a cosmetic pause — it creates one or more real `sysapproval_approver`
records, the same approval record type that drives the Approvals module elsewhere on the
platform. Each approver sees their approval in their own approvals list, can approve or reject,
and typically can leave comments explaining the decision. The flow genuinely pauses execution at
that step — it is not polling in a loop or faking a delay — and only resumes once the relevant
approval record(s) reach a final state (approved or rejected).

## Branching on the outcome

Because the flow pauses and then resumes with a real outcome, you almost always follow an approval
action with an If/Else condition (Lesson 6) that checks whether the approval was approved or
rejected, and branches accordingly — Update Record to mark the request approved and move it
forward, or Update Record to mark it rejected and notify the requester why. The approval action
itself only produces the outcome; what the flow does with that outcome is ordinary flow logic you
already know.

## Key terms

| Term | Meaning |
|---|---|
| Ask for Approval | The Flow Designer action family that pauses a flow pending a human decision |
| sysapproval_approver | The real record each approver interacts with to approve or reject |
| Group approval — anyone | Any single group member's response resolves the approval step |
| Group approval — everyone | Every group member must approve before the step resolves |

## Check yourself

You're ready for Lesson 11 when you can explain: why would a change advisory board decision use
"approval from a group — everyone" instead of "approval from a group — anyone," and what record
type is actually created when that approval action runs?
