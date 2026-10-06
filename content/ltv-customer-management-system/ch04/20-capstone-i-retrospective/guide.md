# Lesson 20 — Capstone I Retrospective

**Chapter 4 · Analytics and Delivery · Lesson 20 of 20**

## What you'll learn

- A full recap of everything built across all twenty lessons, checked
  against the Lesson 1 Definition of Done
- What a retrospective is for, and why it's a genuine deliverable of this
  capstone, not a formality
- Honest lessons learned — what would go differently on a second pass
- Where to go next in the Salesforce Administrator path

## The Definition of Done, closed out

Lesson 1 set ten requirements. Here's where each one actually got built:

| # | Requirement | Built in |
|---|---|---|
| 1 | Complete lead-to-cash object model | Lessons 6–8 |
| 2 | At least two custom objects | Lesson 9 |
| 3 | Page layouts and a Lightning App Page | Lesson 10 |
| 4 | Role hierarchy, profiles, sharing rules | Lesson 11 |
| 5 | At least one record-triggered Flow | Lesson 12 |
| 6 | Validation rules on at least two objects | Lesson 13 |
| 7 | An approval process | Lesson 14 |
| 8 | Reports in folders, plus a dashboard | Lesson 15 |
| 9 | Clean, realistic sample data | Lesson 16 |
| 10 | Tested, documented, ready to present | Lessons 17–19 |

Every line, checked. That's what "finished" means for this capstone — not
a feeling, a specific list, closed row by row.

## What Cascade Foodservice Equipment Co. taught this build

One fictional company, carried consistently for twenty lessons, forced
every decision to be concrete instead of generic: Installation Project
and Service Contract exist because of a specific business reality, not
because "custom objects are good to practice." The three sharing rules
exist because of specific people — Marcus Webb, Angela Wu, Priya Nair —
sitting in specific places in the org chart, not because "sharing rules
are a Salesforce feature worth demonstrating." That's the real skill this
capstone was built to practice: translating a business situation into a
declarative build, not memorizing Setup menu paths.

## Honest lessons learned

- **Design-first discipline paid off.** Chapter 1's paper design (Lessons
  2–5) meant Chapter 2 had zero rework — every field and relationship
  built in Lessons 6–10 matched what was already decided.
- **Two fields got added mid-build, not pre-planned.** `Primary_Contact__c`
  (Lesson 13) and `Discount_Percent__c` / `Approval_Status__c` (Lesson 14)
  weren't in the original Lesson 3 data model — they emerged from
  automation requirements discovered in Chapter 3. That's realistic: a
  real data model evolves slightly as automation gets built against it,
  and documenting the addition honestly (as Lesson 18 does) matters more
  than pretending the original design anticipated everything.
- **Testing in Lesson 17 caught the value of negative tests.** Confirming
  something is correctly *blocked* is as important as confirming it's
  correctly visible — both were part of the plan from the start, which
  is what a security model actually requires to be trustworthy.

## This capstone as a portfolio artifact

What you have now, concretely: a working Developer Edition org, a data
model diagram, a security matrix, four validation rules, two Flows, one
approval process, three reports and a dashboard, realistic sample data,
a full test pass, and a written handoff document. That's not a
Trailhead badge — it's a defensible, explainable piece of work you built
end to end, for a consistent scenario, the way a real implementation
project actually runs.

## What's next

This closes Capstone I and the full build arc of the **Salesforce
Administrator** path. The next and final course in the path is
**Salesforce Career Preparation** — interview practice, resume and
LinkedIn positioning specific to this capstone, and mock technical
interviews that will draw directly on the Lesson 19 walkthrough you just
built.

## Key terms

| Term | Meaning |
|---|---|
| Retrospective | A structured look back at what was built and what was learned, not just a status report |
| Design evolution | A data model changing slightly as real automation requirements surface during the build |
| Portfolio artifact | A piece of finished, defensible work a candidate can walk an interviewer through in detail |

## Lab

Write your own one-page retrospective: the ten-row Definition of Done
table with "Built in Lesson ___" filled in for your own build, three
honest lessons learned, and one sentence on what you'd do differently on
a second pass.

## Check yourself

- Which two fields were added mid-build rather than planned in the
  original Lesson 3 data model, and why is that worth documenting
  honestly rather than hiding?
- What's the difference between a retrospective and a status report?
- What course comes next in the Salesforce Administrator path, and what
  does it build on from this capstone?
