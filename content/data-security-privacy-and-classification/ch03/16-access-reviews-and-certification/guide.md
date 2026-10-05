# Lesson 16 — Access Reviews and Certification

**Chapter 3 · Access Control · Lesson 16 of 30**

## What you'll learn

- Why access reviews exist as a backstop for the controls earlier in this chapter
- The attestation model: owners certify, not IT
- A typical review cadence and the events that trigger an unscheduled one
- What "remediation" looks like when a review finds a problem

## The backstop this chapter has been building toward

RBAC (Lesson 13) organizes access into roles. Least privilege (Lesson 14) says each role should be narrow. Segregation of duties (Lesson 15) says no single person should control a whole sensitive process. All three are *preventive* — they try to stop a bad grant from happening in the first place. **Access reviews** are *detective* — they're the recurring check that catches whatever slipped through anyway: the permission creep from a Mover event nobody cleaned up, the SoD conflict nobody noticed when two roles were combined, the access a Leaver should have lost weeks ago.

## Attestation: owners certify, not IT

The defining feature of a real access review isn't that someone runs a report — it's **who signs off on what the report shows**. IT can generate a list of "everyone with access to the Customers table" in minutes. What takes a real process is getting the **data owner** (the person accountable for that data, from Data Governance Foundations) to look at that list, person by person, and **attest**: "yes, this person still needs this access" or "no, remove it."

This matters because IT usually can't judge whether access is still *needed* — only the business owner knows whether someone's still working on the project that justified the grant eighteen months ago. A review run entirely by IT, with no business attestation, catches technical anomalies but misses the far more common case: access that's technically fine and completely stale.

## A typical cadence, plus unscheduled triggers

Most organizations run access certifications on a recurring schedule — quarterly for the most sensitive systems, annually for lower-risk ones. But waiting for the calendar isn't enough on its own. Certain events should trigger an unscheduled review:

- A role change (the "Mover" event from Lesson 12) — review what the person's *new* manager actually needs them to have, and confirm the *old* access is gone
- A new regulation or audit finding that calls out a specific system or dataset
- A security incident involving the system, even if the specific account under review wasn't implicated
- A merger, reorganization, or new system integration that changes who should have access to what

## Remediation: what happens when a review finds a problem

Finding a problem is only half the process — a review that produces a report nobody acts on is theater. **Remediation** is the actual removal (or correction) of the flagged access, and a mature program tracks it with the same rigor as the review itself: who owns the remediation, by what date, and who confirms it actually happened. An access review that identifies ten stale grants and closes zero of them within a reasonable window isn't a control — it's a to-do list that never gets done.

## Key terms

| Term | Meaning |
|---|---|
| Access review (certification) | A recurring process where data owners attest whether existing access grants are still needed |
| Attestation | A data owner's formal sign-off that a specific person's access is still justified |
| Remediation | The actual correction — usually removal — of access flagged as no longer needed during a review |
| Review cadence | How often a system's access is reviewed on a schedule (e.g., quarterly, annually) |

## Lab

Pick a shared system you have access to and imagine you're the data owner running a review. List everyone you believe currently has access (or imagine a plausible list of 5-6 people). For each, write "keep" or "remove" and a one-line justification. Notice how much of that judgment requires knowing the business context — not just reading a permissions table.

## Check yourself

- Why is a review run entirely by IT, with no data-owner attestation, insufficient on its own?
- Name two events, besides the calendar, that should trigger an unscheduled access review.
