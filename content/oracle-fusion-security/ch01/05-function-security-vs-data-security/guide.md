# Function Security vs. Data Security

Chapter 1 has previewed this distinction twice already. This lesson covers it properly, because it's the single most useful mental model for diagnosing access problems in the rest of this course — and because it closes out Chapter 1 before Chapter 2 moves fully into data access mechanics.

## What you'll learn

- A precise definition of function security and what it secures
- A precise definition of data security and what it secures
- How the two combine (and fail independently) in practice
- Why this distinction is the first thing to check when troubleshooting

## Function security: "who can do what"

**Function security** is a statement of what actions a user can perform, and in which pages, of the application. It secures the code resources behind a page — the page itself, buttons and tabs on that page, and scheduled processes a user might kick off. Function security privileges are what get granted to duty roles, as covered in Lesson 4.

Function security answers questions like: can this user open the Create Invoice page? Can this user see the "Void Payment" button? Can this user run the "Import Payables Invoices" scheduled process? If the answer is no, the user typically can't even reach the screen or control in question — it's hidden or disabled, or the attempt is rejected outright.

## Data security: "who can do what, to which data"

**Data security** is a statement of what action can be taken against which data. It doesn't control whether a page opens — it controls which specific rows of data are visible or actionable once the page is open. A **data security policy** pairs a condition (essentially a filter, such as "Business Unit = US West") with a set of allowed actions on a database resource, and is attached to a role.

Data security answers questions like: of all the invoices that exist in the system, which ones can this particular user see? Of all the journal batches, which ones can this user post?

## How they combine — and how they fail independently

Every meaningful access check in Oracle Fusion runs through both layers, and they are independent of each other:

- **Pass function security, pass data security** → the user opens the page and sees the rows they should.
- **Fail function security** → the user can't open the page at all; data security is never evaluated because it never gets that far.
- **Pass function security, fail data security** → this is the classic "I can open the screen, but there's nothing in it" ticket. The user has the right duty role for the page, but no data security policy on any of their roles matches the rows they're trying to see.

That third combination is worth memorizing, because it is the single most common real-world access complaint, and it's also the one most often misdiagnosed. A support person who assumes "no data visible" means "no access at all" will often re-provision a job role that was already correct, when the actual fix is a data security policy or a business unit assignment.

## Why this is the first thing to check

When a Castellan Robotics Inc. user reports an access problem, the fastest diagnostic split is: "Can they reach the page or button at all?" If no, you're in function security territory — check the duty role and privilege chain from Lesson 4. If yes, but the data looks wrong or empty, you're in data security territory — check data security policies, data access sets, and business unit assignment, which Chapter 2 covers in detail. You'll practice this exact triage in Lesson 17 and Lesson 18.

## Key terms

| Term | Meaning |
|---|---|
| Function security | Controls which pages, controls, and processes a user can reach |
| Data security | Controls which rows of data a user can see or act on, once they've reached a page |
| Data security policy | A condition plus allowed actions on a resource, attached to a role |

## Recap

Function security gates whether you can reach a page or control at all. Data security gates which rows you can see or act on once you're there. They're independent, and "can open the page but sees nothing" is the signature of a data security gap, not a function security one. That diagnostic split carries through the rest of this course. Next up, Chapter 2 and Lesson 6: data security and data access sets.
