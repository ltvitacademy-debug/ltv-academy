# Lesson 21 — Knowledge Management Lab

**Chapter 5 · Implementing Knowledge Management · Lesson 21 of 32**

## What you'll learn

- How to reason through a full Knowledge Management implementation end to end, the way a real
  implementer would plan it before touching a single record
- How to split Knowledge Bases by audience for a company migrating off scattered Word documents
- How to specify a Draft-Review-Published approval flow that actually requires Knowledge manager
  sign-off, not just a state field with no gate behind it
- How to design a quarterly review process that catches articles nobody has touched in 12+ months

## The scenario

A mid-sized company has been running IT support on institutional memory and a shared drive full
of Word documents — some current, some years out of date, none of them searchable, none of them
reviewed by anyone but whoever wrote them. The company is migrating that content into ServiceNow
Knowledge Management. The implementation has three real requirements: separate the audience that
should see end-user guidance from the audience that should see internal runbooks; make sure nothing
goes live without a Knowledge manager actually reading it first; and build in a way to catch
articles that quietly go stale after the migration, instead of letting the same rot happen again
inside the new system.

## Step 1 — two Knowledge Bases, not one

The migration starts by creating two `kb_knowledge_base` records instead of dumping every
imported document into one pile. A **Self-Service** Knowledge Base holds the public-facing
content — password resets, how to request new software, how to connect to the guest network —
with Can Read open to all authenticated users and Can Contribute limited to the Knowledge
management team. An **IT Staff** Knowledge Base holds the internal runbooks — step-by-step
recovery procedures, internal escalation contacts, configuration details end users have no reason
to see — with both Can Read and Can Contribute limited to IT staff roles. Every imported Word
document gets triaged into one of these two Knowledge Bases before it becomes a `kb_knowledge`
record at all; that triage decision, audience first, is what the rest of the implementation
depends on.

## Step 2 — the Draft-Review-Published flow, with a real sign-off

Every migrated article starts life in **Draft**, regardless of how polished the original Word
document looked — a document nobody has reviewed inside ServiceNow's own workflow hasn't actually
been reviewed yet. A Flow Designer flow triggers when Workflow state changes to Draft to Review,
firing an **Ask for Approval** action to the Knowledge manager role. That approval is not optional
and not a formality: the flow holds the record at Review until the approval record resolves. On
approval, the flow sets Workflow state to Published and stamps the Published date; on rejection, it
returns the record to Draft with the reviewer's comments attached, so the original author — or
whoever inherited that Word document in the migration — knows exactly what to fix.

## Step 3 — a quarterly review process for 12+ month-old articles

Migrating five years of Word documents into Knowledge Management does not, by itself, stop content
from going stale again. The implementation adds a scheduled job that runs quarterly, checking every
Published article's last updated date, and flags anything untouched for 12 months or more into a
review list assigned to the Knowledge manager. That reviewer either confirms the article is still
accurate (which resets its clock) or pulls it back into Draft for a real update through the same
approval flow from Step 2. Articles that genuinely no longer apply move to Retired, preserving
their history instead of deleting them outright.

## Why the order matters

Doing these steps out of order breaks the implementation. Building the approval flow before the
two Knowledge Bases exist leaves no clear answer for who the approver even is, since IT Staff and
Self-Service content often needs different reviewers. Building the quarterly review cadence before
the approval flow exists gives it nothing to route flagged articles back through — a review with
no approval gate behind it is just a flag nobody is required to act on. Audience segmentation,
then the approval gate, then the review cadence that reuses that same gate: each step depends on
the one before it.

## Key terms

| Term | Meaning |
|---|---|
| Self-Service KB | The public-facing Knowledge Base, audience is all authenticated end users |
| IT Staff KB | The internal Knowledge Base, audience limited to IT staff roles |
| Ask for Approval | The Flow Designer action gating Review to Published, routed to the Knowledge manager |
| Quarterly review job | A scheduled check flagging Published articles untouched for 12+ months |

## Check yourself

You're ready for Lesson 22 when you can explain, without looking: why does this implementation
build the two Knowledge Bases before the approval flow, and why would skipping the quarterly
review cadence let the same problem that triggered this entire migration happen again?
