# Lesson 11 — Administrator Interviews

**Chapter 3 · Interviews · Lesson 11 of 19**

## What you'll learn

- The typical interview sequence for an Administrator role
- The core technical topics you should be able to explain, not just recognize
- How scenario and troubleshooting questions are actually graded
- A rehearsed framework for "tell me about a production incident you handled or would handle"
- How to turn your capstone project into a bank of specific, real answers

## The typical sequence

Most Administrator interview processes run through some combination of four stages, though not every company runs all four and the order can shift:

1. **Recruiter phone screen.** Resume walk-through, qualifications, salary expectations, and a high-level overview of the process ahead.
2. **Hiring manager interview.** Behavioral questions and role fit — why this org, why this team, how you work with non-technical stakeholders.
3. **Technical round.** Scenario questions, and sometimes a live screen-share where you're asked to configure something or walk through an org.
4. **Panel (sometimes).** Multiple interviewers, often repeating the same core technical and behavioral ground from different angles.

## Core technical topics

Be ready to explain these, not just pick the right multiple-choice answer:

- **Profiles, roles, and permission sets** — what each one actually controls, and why Salesforce split access control across three different mechanisms instead of one.
- **Org-wide defaults, role hierarchy, and sharing rules** — the layered model that decides who can see a record.
- **Validation rules vs. Flow** — when a simple validation rule is the right tool, and when the logic is complex enough to need Flow instead.
- **Data Loader vs. the Import Wizard** — volume limits, matching logic, and the data-quality considerations that come with each.
- **Change management basics** — sandbox types, and change sets or a deployment tool as the way changes move between environments.

## Scenario and troubleshooting questions

The most common Administrator scenario question is some version of: *"A user says they can't see a record they should be able to see. Walk me through how you'd troubleshoot that."*

Interviewers are not grading you on landing one correct answer. They're watching whether you troubleshoot in a sane order:

1. Object and field-level access (profile, permission sets) — can this user even touch this object at all?
2. Org-wide defaults — what's the baseline visibility for this object?
3. Role hierarchy and sharing rules — what's been granted on top of that baseline?
4. Manual sharing or Apex-managed sharing — the most specific, most recently-added exceptions.

Narrate this out loud as you go. Silently thinking it through and then announcing the answer looks like a guess; walking the layers in order looks like a process you'd actually use on the job.

## "Tell me about a production incident" — a rehearsed framework

This is a different question from the record-visibility scenario above, and candidates who
prepared only the troubleshooting-order answer are often caught flat-footed by it. Interviewers
ask some version of *"Walk me through a time something broke in production — or how you'd handle
it if it did"* specifically to see whether you think about an incident as more than just finding
the bug. A structured answer has five beats:

1. **Detect.** How did you (or would you) find out something was wrong — a user report, a
   monitoring alert, a scheduled check? Name the actual mechanism, not "I noticed."
2. **Contain.** What's the fastest safe thing to do to limit damage while you investigate — not
   the permanent fix yet. For a bad automation, that might mean deactivating the Flow temporarily;
   for a bad OWD change, reverting to the previous, more restrictive setting as an immediate
   stopgap.
3. **Communicate.** Who did you tell, and when — your manager, affected users, whoever owns the
   process that broke? Silence during an incident reads as either not noticing the severity or
   not knowing who needs to know.
4. **Root-cause.** What actually caused it, found through a real investigation (the layered
   troubleshooting order above, applied to whatever broke), not a guess.
5. **Prevent recurrence.** What changed afterward so the same thing can't happen the same way
   again — a validation rule, a bulk test added to your process, a monitoring alert that didn't
   exist before.

If you haven't personally handled a real production incident yet, it's fine to say so directly —
then walk through how you *would* handle one, using this same five-beat structure applied to a
specific, plausible scenario from your own capstone (a Flow that could fail silently under bulk
load, a sharing rule that could be misconfigured). A concrete, structured hypothetical beats a
vague "I'd investigate and fix it" every time, and it's a more honest answer than implying
experience you don't have yet.

## Using your capstone as your answer bank

Generic answers ("I'd check the security model") are forgettable. Specific ones aren't. Go back through the LTV Customer Management System capstone and pull out real examples:

- A real **migration or data-loading decision** you made, and why.
- A real **security model decision** — why you set org-wide defaults the way you did, and what sharing rule or permission set you added and why.
- A **growth story** — something you didn't know before this course that you now understand because you had to build it, not just read about it.
- A **pushback story** — a point where the "easy" configuration would have broken a best practice, and what you did instead.

## Key terms

| Term | Meaning |
|---|---|
| Org-wide defaults (OWD) | The baseline, most restrictive sharing setting for an object |
| Role hierarchy | Grants visibility upward through management chains on top of OWD |
| Sharing rule | An automatic exception that opens up access beyond OWD and role hierarchy for a defined group |
| Bulkification (admin-relevant) | Why automation needs to behave correctly across many records at once, not just one |

## Check yourself

Why do interviewers say they're grading the *order* of your troubleshooting steps, not just the final answer?
