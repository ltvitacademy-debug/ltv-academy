# Lesson 1 — Capstone Kickoff and Requirements

**Chapter 1 · Design · Lesson 1 of 20**

## What you'll learn

- What this capstone actually is: one continuous, hands-on Salesforce build
  across 20 lessons, not 20 disconnected exercises
- The full requirements checklist your finished org must satisfy by Lesson 20
- How the four chapters map to the four phases of a real implementation
  project: design, build data, build automation and security, deliver
- What "portfolio-ready" means for this specific project

## What this capstone is

Every course earlier in this path — CRM Foundations, Data Model
Fundamentals, Administration, Security, Data Management, Reports &
Dashboards, Platform App Builder, Flow Automation, and Business Process
Automation — taught you one Salesforce skill at a time, mostly in
isolation. This capstone is different: you are going to build **one real
Salesforce implementation**, start to finish, for **one fictional
company**, applying every one of those skills together, in the order a
real Salesforce Administrator would actually use them on the job.

You will meet that company in Lesson 2, and every lesson after that — all
the way through Lesson 20 — builds on it. By the end, you'll have a working
org and a set of artifacts (a data model diagram, a security matrix, a
tested build, and a short write-up) you can genuinely show in an interview
or a portfolio.

## The requirements checklist

This is the Definition of Done for the whole capstone — the full list of
things your org must support by the time you finish Chapter 4. Keep this
list; every later lesson checks off one or more lines on it.

| # | Requirement | Where you'll build it |
|---|---|---|
| 1 | A complete lead-to-cash object model: Leads converting cleanly into Accounts, Contacts, and Opportunities | Chapter 2 |
| 2 | At least two custom objects modeling something the standard objects don't cover | Chapter 2 |
| 3 | Page layouts and at least one Lightning App Page built for how the company's own users actually work | Chapter 2 |
| 4 | A role hierarchy, a profile set, and sharing rules enforcing least-privilege access | Chapter 3 |
| 5 | At least one record-triggered Flow automating a real business process | Chapter 3 |
| 6 | Validation rules enforcing data quality on at least two objects | Chapter 3 |
| 7 | An approval process for a real approval scenario at this company | Chapter 3 |
| 8 | Reports organized into folders, plus an executive dashboard | Chapter 4 |
| 9 | Clean, realistic sample data — not placeholder junk like "Test Account 1" | Chapter 4 |
| 10 | The build tested end-to-end, documented, and ready to present | Chapter 4 |

## How the four chapters unfold

| Chapter | Focus | Lessons |
|---|---|---|
| 1 — Design | Meet the company, design the data model and security model on paper, plan the build order | 1–5 |
| 2 — Build: Data and Objects | Configure Accounts, Contacts, Leads with conversion mapping, Opportunities with named stages, custom objects, page layouts and Lightning pages | 6–10 |
| 3 — Build: Automation and Security | Implement the security model for real, build Flows, validation rules, and an approval process | 11–14 |
| 4 — Analytics and Delivery | Reports and dashboards, load sample data, test the build, document it, and present it | 15–20 |

Notice the order: **design before you click anything.** A real
implementation project fails when an admin opens Setup before deciding
what the data model and security model should look like. This capstone
makes you do the design work first, on purpose, in Chapter 1.

## What "portfolio-ready" means here

A portfolio-ready capstone isn't just "an org that doesn't error." It
means:

- **One real scenario, used consistently.** The same fictional company,
  the same named people, the same sales process — from Lesson 2 to Lesson
  20. No switching examples mid-course.
- **A declarative build you can defend.** You should be able to explain,
  in an interview, *why* you chose each field, each sharing rule, each
  Flow — not just that it exists.
- **Real artifacts, not just clicks.** A data model diagram, a security
  matrix, and a short written retrospective are deliverables of this
  capstone, same as the org itself.

## Key terms

| Term | Meaning |
|---|---|
| Capstone | A final, cumulative project that applies everything from prior courses in one build |
| Definition of Done | The fixed checklist above — what "finished" means for this specific project |
| Lead-to-cash | The object flow from a raw Lead through conversion to a won Opportunity |
| Declarative build | Configuration done with Salesforce's point-and-click tools (objects, Flow, validation rules) rather than code |

## Lab

Start a document called "Capstone Requirements Checklist" and copy the
10-row table above into it. Leave a blank "Built in Lesson ___" column next
to each row — you'll fill it in as you complete each requirement across
the next 19 lessons.

## Check yourself

- Name three of the ten requirements this capstone's finished org must
  satisfy.
- Why does Chapter 1 do design work before any configuration happens in
  Setup?
- What makes this capstone "portfolio-ready" beyond simply avoiding
  errors?
