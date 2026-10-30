# Lesson 18 — Presenting the After-Action Report

**Chapter 1 · Advanced Capstone: Kubernetes, Multi-Cloud, and a Cross-Team Incident · Lesson 18 of 26**

## What you'll learn

- How presenting the Lesson 15 incident report to the broader
  engineering team differs from briefing Dana and Casey one-on-one
- The real agenda Theo runs: timeline, root cause, fix, follow-ups,
  open floor — and why it stays in that order
- Why a blameless postmortem culture depends on exactly how the
  meeting is run, not just on what the written report says
- How follow-up actions get converted from a table in a document into
  tracked tickets with owners, in front of the people who'll do them

## A different room, a different job

Briefing Dana Whitfield and Casey Lindqvist in Lesson 17 was about
business impact and trust at the leadership level. Presenting the
same incident to the broader engineering team — the people who'll
actually review their own Deployments for the same gap, build the next
dashboard panel, or get paged next time — is a different job. This
room already understands Kubernetes scheduling and cluster-wide
averages; they don't need the concepts re-explained from scratch. What
they need is the same honest mechanism, the same credit for what
caught it, and a clear, specific ask of what changes because of it.

## Running the meeting in the report's own order

Theo presents the Lesson 15 report close to its original structure,
because this room is exactly the audience that document's order was
built for:

1. **Timeline** — walked through quickly, since most of the room lived
   through at least part of it in the incident channel in real time
2. **Root cause** — the missing `topologySpreadConstraints` and the
   averaging blind spot, explained once, precisely, no re-litigating
3. **The fix** — the real YAML from Lesson 13, and the validation data
   from Lesson 14, shown together so the room sees cause and proof
   side by side
4. **What went right** — explicit credit to the reliability dashboard's
   independent design, named out loud, not left implicit
5. **Follow-up actions** — read from the table, each with its owner
   and due date restated in the room

## Keeping it blameless, by how the meeting runs

A written report can say "blameless postmortem" at the top and still
turn into a blame session if the meeting itself isn't run carefully.
Theo keeps the conversation on the mechanism — the missing constraint,
the dashboard's design gap — and actively redirects any question that
starts drifting toward "whose fault was this." The Deployment spec
that was missing the constraint was built in Lesson 4, by a different
part of the team, under a reasonable set of assumptions at the time;
naming that honestly, without framing it as someone's mistake, is what
keeps the room focused on fixing the gap instead of defending it.

## Turning the table into tickets, live

The follow-up actions table from Lesson 15 doesn't stay a table.
Theo converts each row into a tracked ticket in front of the room,
confirming the owner out loud and letting them push back on the due
date if it's wrong — a due date set without the owner's input is a
due date that quietly slips. By the end of the meeting, "add
`topologySpreadConstraints` to every Deployment's baseline template"
and the other three follow-ups exist as real, assigned, trackable work
items, not just a paragraph in a document.

## Key terms

| Term | Meaning |
|---|---|
| After-action report | The formal presentation of an incident report to a broader group, after the immediate response is over |
| Blameless postmortem | A review culture that stays focused on mechanisms and gaps, enforced by how the meeting is run, not just by the document's wording |
| Tracked ticket | A follow-up action converted into a real, assigned, due-dated work item instead of a line in a report |

## Lab

1. List the five-part agenda Theo runs, in order, and explain why root
   cause is presented before the fix rather than after.
2. Write one sentence describing how Theo redirects a question that
   starts drifting toward blame, without dismissing the question.
3. Explain why converting the follow-up table into tickets happens
   live in the meeting, with the owner present, rather than afterward.

## Check yourself

You're ready for Lesson 19 when you can explain, without looking, why
presenting to the broader engineering team is a different job than
briefing leadership, and what specifically keeps a postmortem
blameless in the room, not just on the page.
