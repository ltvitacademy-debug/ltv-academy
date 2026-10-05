# Lesson 8 — Governance Workflows

**Chapter 2 · Policies, Standards and Processes · Lesson 8 of 25**

## What you'll learn

- What a governance workflow is, and why procedures (Lesson 7) alone aren't enough
- The common stages every governance workflow shares, regardless of what it's processing
- Three concrete workflow examples you'll see in almost every real program
- Why the specific ticketing or catalog tool matters less than the defined path itself

## Why a procedure alone isn't enough

Lesson 7's procedure told one person the steps to follow for one task. A **governance workflow**
is the bigger picture: the full, repeatable path a request or issue takes as it moves between
*different* people and roles — requester, steward, owner, committee — until it reaches resolution.
A procedure answers "what do I do." A workflow answers "what happens to this after I hand it off,
and who's responsible for each step along the way." Without a defined workflow, resolution depends
on someone remembering to follow up — which is exactly the kind of informal, undocumented process
governance exists to replace.

## The stages every workflow shares

Regardless of what's moving through it — an access request, a data quality issue, a policy
exception — most governance workflows share the same backbone:

1. **Intake** — how the request or issue enters the system in the first place (a form, a ticket, a
   steward noticing something)
2. **Triage / classification** — sorting what kind of thing this is and how urgent it is (Lesson 9
   covers severity and escalation in depth)
3. **Routing** — getting it to the right person or role, using the RACI matrix from Lesson 5 to
   know who's Responsible for handling it
4. **Resolution** — the actual fix, decision, or approval
5. **Verification** — confirming the resolution actually solved the problem, not just closed the
   ticket
6. **Closure and documentation** — recording what happened, which feeds directly into the issue
   log and metrics Chapter 3 of this course covers

## Three workflows you'll see in almost every program

- **Access request workflow** — someone requests access to a dataset; routes to the data owner
  for approval, sometimes through a steward first; IT provisions access on approval; closure
  records who has access and why, supporting later audits.
- **Data quality issue workflow** — a steward or automated check flags a problem; it's triaged by
  severity; routed to the steward (or escalated per Lesson 9) for a fix; verified before closing.
- **Policy exception request workflow** — someone needs a temporary exception to a standard; the
  request states the business reason and the time-bound scope; routes to the owner and often the
  governance committee for approval; closure includes an expiration date so the exception doesn't
  quietly become permanent policy.

## Why the specific tool matters less than the path

Many organizations run these workflows through a ticketing system, a data catalog's built-in
workflow feature, or even a shared tracking spreadsheet for a small program. The tool is a delivery
mechanism, not the design — a beautifully configured workflow tool running an undefined process
just produces fast, untracked chaos instead of slow, untracked chaos. Design the stages, the
routing rules, and who's accountable at each step *before* picking or configuring a tool to run it.

## Key terms

| Term | Meaning |
|---|---|
| Governance workflow | The repeatable, multi-role path a request or issue follows from intake to closure |
| Triage | The stage where a request or issue is classified by type and urgency |
| Routing | Directing a request to the specific person or role responsible for acting on it next |

## Lab

Pick one of the three workflow examples above. Map its six stages for your own organization (or a
hypothetical one), naming who is involved at each stage using the roles from Chapter 1 — requester,
steward, owner, committee.

## Check yourself

Can you name the six stages every governance workflow shares, and explain the difference between
what a procedure answers and what a workflow answers?
