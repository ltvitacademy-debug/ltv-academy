# Lesson 6 — Problem Table & Its Relationship to Incident

**Chapter 2 · Implementing Problem Management · Lesson 6 of 32**

## What you'll learn

- Where the Problem table (`problem`) sits in ServiceNow's table hierarchy
- The real field-level link between Incident and Problem: the `problem_id` reference field
- How the related list on a Problem record surfaces every linked Incident
- Why linking to an existing Problem — instead of opening a new investigation — is the whole point of implementing this correctly
- The difference in scope between "fix one ticket" (Incident) and "fix the thing that keeps causing tickets" (Problem)

## The Problem table extends Task, same as Incident

You already know from Course 2 of this path that the Incident table (`incident`) extends the base `task` table, inheriting fields like `short_description`, `priority`, `assignment_group`, and `state`. The Problem table (`problem`) follows the exact same pattern — it also extends `task`, which is why a Problem record looks structurally familiar the first time you open one: same base fields, same relationship to Task-driven features like activity logs and approvals.

What's different is purpose, not plumbing. An Incident record represents one instance of service disruption — a user can't log in right now. A Problem record represents the underlying cause that may be generating that disruption, possibly across many Incidents. ServiceNow doesn't merge these concepts at the table level; it connects them with a reference field.

## The real link: `problem_id` on Incident

The mechanism that ties the two tables together is a reference field on the Incident table called `problem_id`, pointing at a record on the Problem table. When an agent working an Incident recognizes it matches a known, ongoing investigation, they populate `problem_id` with that Problem's record — they are not duplicating data, they're pointing at it.

This is a deliberately simple design, and that simplicity is what makes it reliable at scale. One Problem record can have `problem_id` set on dozens of different Incident records, and each of those Incidents keeps all its own ticket-specific details (who reported it, what device, what time) while sharing one investigation.

## The related list: visibility in the other direction

A reference field only tells you the relationship from the Incident's side. ServiceNow's related-list mechanism provides the other direction: open any Problem record, and a related list titled something like "Incidents" shows every Incident record where `problem_id` points back at this Problem — automatically, with no manual maintenance required.

This is the real implementation payoff. A Problem manager investigating a root cause doesn't have to run a report or ask around to find out how many users were affected, or when the pattern started — the related list on the Problem record is a live, continuously updated roster of every impacted Incident. When the Problem is eventually resolved, that same related list is the basis for closing the loop: every linked Incident can be reviewed and updated to reflect that a fix (or a documented workaround) now exists.

## Why linking to an existing Problem beats opening a new one

The single biggest implementation risk in Problem Management isn't a missing field or a broken workflow — it's agents not finding an existing, relevant Problem record and opening a redundant investigation instead. If three agents each independently decide a VPN disconnect issue deserves its own Problem record, you now have three separate root-cause efforts, three sets of `cause_notes` (covered next lesson), and no single place where the real fix gets documented.

A well-implemented instance makes the existing-Problem search fast and obvious: a clear naming convention on Problem short descriptions, an assignment group that owns triage of new Problem candidates, and — once we reach Chapter 5's Knowledge Management coverage — searchable documentation that surfaces a matching Problem before anyone creates a new one. None of that is exotic configuration; it's largely a matter of making the `problem` table's existing related-list relationship something agents are actually trained to check first.

## Key terms

| Term | Meaning |
|---|---|
| `problem` table | The ServiceNow table for Problem Management records; extends `task`, same as `incident` |
| `problem_id` | Reference field on the Incident table pointing at the linked Problem record |
| Related list | A live, auto-populated list on a record showing every other record that references it — here, every Incident linked to a Problem |
| Root cause | The underlying condition responsible for one or more Incidents, investigated and documented on the Problem record |

## Check yourself

A new Incident comes in describing symptoms that sound exactly like an open Problem record from two weeks ago. Without looking anything up, explain: which field does the agent populate on the Incident, and what view on the Problem record lets the Problem manager instantly see that this is now the fourth linked Incident?
