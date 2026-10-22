# Lesson 34 — CSA Exam Domain Review

**Chapter 8 · CSA Exam Preparation & Capstone · Lesson 34 of 36**

## What you'll learn

- The real domain areas the Certified System Administrator (CSA) exam covers
- Exactly which lesson, in which course, already taught each domain
- What's qualitatively true about the exam's format, without guessing at numbers
- How to turn two courses of scattered lessons into one domain-by-domain study pass

## Why this lesson exists

You've now finished two courses: Platform Fundamentals (course 2) and this
course, System Administration (course 3). Between them you've covered every
major area the CSA credential actually tests. This lesson doesn't teach
anything new — it's a map. For each domain ServiceNow's own exam blueprint
groups content into, you'll see exactly which earlier lesson already taught
it, so your review time goes to re-reading, not re-learning.

The CSA exam itself is a timed, multiple-choice and multiple-select exam
administered through an accredited testing provider, built around the
official CSA exam blueprint that ServiceNow publishes and updates per
release. Rather than quote a specific time limit, question count, or passing
score here — those details change across releases and are easy to get
wrong from memory — check the current blueprint on ServiceNow's own
certification page before you schedule your exam. What won't change release
to release is the shape of the content, which is what this review covers.

## Domain: Navigation & UI

The exam expects fluency with the Application Navigator, list and form
views, filters, and personal settings. That's Platform Fundamentals
Chapter 2 in full: Lesson 5 (The Application Navigator), Lesson 6 (Classic
UI vs. Workspaces), Lesson 7 (Agent Workspace Fundamentals), and Lesson 8
(System Settings & Personal Preferences). Platform Fundamentals Chapter 5
— Lesson 19 (Form Layout & Form Design), Lesson 20 (List Views & List
Layout), and Lesson 21 (Filters & Breadcrumbs) — rounds this domain out.
If any of those lesson titles don't immediately bring back the underlying
mechanic, that's your signal to re-read before test day, not to re-learn
from scratch.

## Domain: User Administration

This is users, groups, and roles — the exam's core people-and-permissions
territory. It's this course's own Chapter 1, lesson for lesson: Lesson 1
(Creating & Managing Users), Lesson 2 (Groups & Group Membership), Lesson 3
(Roles & Role Inheritance), and Lesson 4 (Delegated Administration). The
exam tends to test role inheritance and group-to-role relationships with
scenario questions rather than definitions, so Lesson 3's distinction
between a role you're assigned directly and one you inherit through a group
is worth a second pass.

## Domain: Database Administration (Tables & the Dictionary)

The exam's data-model questions map to Platform Fundamentals Chapter 3
(Tables & Relationships) and Chapter 4 (Dictionary Entries & Field Types).
Lesson 10 (What a Table Actually Is in ServiceNow), Lesson 11 (Base Tables
& Table Extension), Lesson 12 (The Task Table Hierarchy), and Lesson 13
(Reference Fields & Relationships) cover the structural side. Lesson 15
(The Dictionary & What It Controls), Lesson 16 (Common Field Types), and
Lesson 17 (Choice Lists & Their Configuration) cover the field-level side.
Table extension and the Task table hierarchy specifically come up often —
know why Incident and Change Request both extend Task, and what that buys
an administrator.

## Domain: Service Catalog

Entirely this course's Chapter 3: Lesson 11 (Catalog Items & Categories),
Lesson 12 (Variables & Variable Sets), Lesson 13 (Catalog UI Policies), and
Lesson 14 (Record Producers). The exam distinguishes a catalog item's
variables from a form's native fields, and tests whether you know when a
record producer is the right tool instead of a plain catalog item — both
exactly what Lessons 12 and 14 covered.

## Domain: Notifications

This course's Chapter 4 end to end: Lesson 16 (Notification Records &
Triggers), Lesson 17 (Email Templates), and Lesson 18 (Inbound Email
Actions). Expect scenario questions about what actually triggers a
notification — field changes, a specific condition, or an event — which is
the exact distinction Lesson 16 built around.

## Domain: Reporting

Platform Fundamentals Chapter 7: Lesson 28 (Building a Report), Lesson 29
(Performance Analytics: Overview), and Lesson 30 (Building a Dashboard).
The exam separates ad hoc reports from Performance Analytics — know that
PA tracks a metric's value over time, where a report is closer to a
point-in-time snapshot.

## Domain: Core Configuration — UI Policies, Data Policies, Business Rules, ACLs

Two chapters here. This course's Chapter 5 — Lesson 20 (UI Policies for
Form Behavior), Lesson 21 (Data Policies for Server-Side Field
Enforcement), Lesson 22 (UI Policy vs. Data Policy: When to Use Each), and
Lesson 23 (Business Rules: an Administrator's View) — covers form and
server-side behavior. This course's Chapter 2 — Lesson 6 (How ACLs
Actually Evaluate Access), Lesson 7 (Table-Level & Field-Level ACLs), and
Lesson 8 (ACL Conditions & Scripts) — covers access control. Lesson 22's
UI-policy-vs-data-policy comparison is one of the exam's favorite
scenario setups: a UI Policy that only hides a field client-side provides
no real enforcement if the exam's scenario asks about an Import Set or a
web service writing to that same field directly.

## Key terms

| Term | Meaning |
|---|---|
| CSA exam blueprint | ServiceNow's official, release-versioned list of domains and weightings the exam covers |
| Domain | One grouped topic area on the blueprint (e.g. User Administration, Service Catalog) |
| Scenario question | An exam question describing a situation rather than asking for a definition |
| Accredited testing provider | The third-party proctoring service that administers the exam under ServiceNow's certification program |

## Check yourself

Without looking back at this lesson, name all seven domain areas listed
above and, for each one, name at least one specific lesson from this course
or Platform Fundamentals that covered it. If you stall on a domain, that's
exactly where to spend your next review session.
