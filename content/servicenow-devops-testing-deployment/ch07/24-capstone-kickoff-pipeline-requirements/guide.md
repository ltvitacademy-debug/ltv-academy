# Lesson 24 — Capstone Kickoff: Pipeline Requirements

**Chapter 7 · Capstone: a Tested, Deployable Application Pipeline · Lesson 24 of 26**

## What you'll learn

- How to read a real stakeholder request and translate it into pipeline requirements
- Why instance strategy, Source Control, ATF, and Change Management all have to be decided together, not bolted on afterward
- How to identify the one business constraint (a timing window) that will shape every later decision in this capstone
- What "done" looks like for a requirements pass, before a single line of code or a single test step exists

## The request

A university's registrar's office has outgrown its spreadsheet-and-email process for
course registration exceptions — overrides, waitlist promotions, prerequisite
overrides — and wants it built as a scoped application on their ServiceNow instance:
**Course Registration**. The ask, in the registrar's own words during the kickoff
call: "We need something real. Not a demo. It has to be tested before it goes live,
and it absolutely cannot break during the first week of each semester, when every
student on campus is trying to register at once."

That one sentence contains three separate engineering problems, and this lesson's
job is to pull them apart before any building starts. Chapters 1 through 6 of this
course each solved one piece of exactly this kind of problem in isolation. The
capstone's job is to make all of them work together, for one real application,
end to end.

## Requirement 1 — instance strategy (Chapter 1)

Course Registration will live across the registrar's three ServiceNow instances:
Dev, Test, and Prod, exactly as Chapter 1 described. Development happens
exclusively in Dev. Every change — new table, new Flow, new ATF test — gets built
there first. Nothing touches Prod directly, ever, including "quick fixes," because
a quick fix made directly in Prod has no corresponding record anywhere else and
creates drift the moment anyone tries to promote the next real change. Test is
where the registrar's own staff will do user acceptance testing against something
that looks and behaves like production, without risking production data. This
capstone treats the three-instance pipeline as non-negotiable, not optional
overhead — it's the only way "tested before it goes live" is even possible to prove.

## Requirement 2 — Source Control (Chapter 3)

The Course Registration application gets connected to a Git repository from day
one, following the same connection pattern Chapter 3 walked through: the scoped
app is linked to a repository, and every commit from Dev becomes a reviewable diff
instead of an opaque Update Set. This matters more here than in a typical build,
because the registrar's IT director explicitly asked for "a paper trail" after a
past vendor made undocumented changes that nobody could explain six months later.
Git history is that paper trail. Every pull request against this repository is
where a second engineer reviews what changed and why, before it's eligible for
promotion toward Test.

## Requirement 3 — ATF coverage for critical paths (Chapter 4)

"Tested before it goes live" has to mean something specific, not just a feeling.
For Course Registration, the critical path is unambiguous: a student registers for
a course, and the system has to correctly handle both the happy path (a seat is
available) and the path that actually causes support tickets — a student tries to
register for a section that's already full. Chapter 4's ATF mechanics are exactly
the tool for proving this behavior automatically, every time a change is proposed,
rather than trusting a human to remember to click through it manually before each
release. Lesson 25 designs that coverage in detail; this lesson's job is just to
name it as a hard requirement now, before the Test Suite exists.

## Requirement 4 — how CI/CD meets Change Management (Chapter 5)

Chapter 5 drew the real tension between change velocity and change control. This
capstone resolves it the same way Chapter 5 recommended for an institution like a
university: every promotion from Test to Prod is still gated by a real Change
Request, with the ATF Test Suite's pass/fail result attached as evidence inside
that Change Request. The pipeline doesn't replace Change Management — it feeds it
better evidence, faster, so the Change Advisory Board is approving a promotion it
can actually verify instead of one it's taking on faith.

## Requirement 5 — the timing constraint (Chapter 6)

Here is the constraint that makes this capstone a real engineering problem instead
of a routine build: the registrar's office runs three peak enrollment weeks a
year — the first week of fall, spring, and summer terms — during which Course
Registration cannot be down, cannot be mid-deployment, and cannot be the subject of
any planned change at all. Chapter 6's deployment-timing and rollback planning
exists for exactly this situation. Every deployment window for this application has
to be scheduled around those three weeks, not during them, and a rollback plan has
to exist and be rehearsed on paper before the first real production deployment —
because "we'll figure out rollback if something breaks" is not an acceptable answer
when the thing breaking is course registration during peak enrollment.

## Key terms

| Term | Meaning |
|---|---|
| Scoped application | A self-contained ServiceNow application with its own tables, logic, and update set/source-control boundary — here, Course Registration |
| Critical path | The specific user action a test suite exists to protect — here, a student registering for a course, including the full-section rejection case |
| Peak enrollment week | The registrar's three annual high-traffic weeks; the hard constraint every deployment window in this capstone must avoid |
| Promotion | Moving a verified change from one instance to the next (Dev → Test → Prod) with Change Management gating the final step |

## Check yourself

Before moving to Lesson 25, write out — in one or two sentences each — the specific
instance strategy, Source Control setup, and timing constraint you'd put in this
capstone's requirements document. If you can't state the peak-enrollment
constraint in one sentence without looking back at this lesson, re-read the
timing section before building a single ATF test.
