# Lesson 14 — Approval Processes

**Chapter 3 · Build: Automation and Security · Lesson 14 of 20**

## What you'll learn

- How to build a real approval process for Cascade: a discount beyond
  threshold needs Monica Reyes's sign-off before the deal can close
- The two new fields this approval process needs on Opportunity
- How to configure entry criteria, a single approval step, and the
  actions that fire on submission, approval, and rejection
- How this closes Requirement 7 from Lesson 1's Definition of Done

## Why Cascade needs this

Equipment packages at Cascade sometimes get discounted to win a deal —
but a rep discounting too deeply without anyone checking erodes margin
quietly, deal by deal. Monica Reyes, VP of Sales, wants visibility into
any discount past a set threshold before it's final — exactly the kind
of real approval scenario this lesson builds for real.

## Step 1 — Two new fields on Opportunity

| Field label (API name) | Type | Purpose |
|---|---|---|
| Discount Percent (`Discount_Percent__c`) | Percent | The discount the rep is proposing off list price |
| Approval Status (`Approval_Status__c`) | Picklist (Not Submitted / Pending Approval / Approved / Rejected) | Tracks where a submitted Opportunity stands in the approval process |

Create both under **Object Manager → Opportunity → Fields &
Relationships → New**, same as every other custom field in this
capstone.

## Step 2 — Building the approval process

**Setup → Process Automation → Approval Processes → Create New Approval
Process → Opportunity**

| Setting | Value |
|---|---|
| Name | Opportunity Discount Approval |
| Entry criteria | `Discount_Percent__c > 15` |
| Submitter | Record owner can submit |
| Initial submission actions | Field Update: `Approval_Status__c` = "Pending Approval"; **Lock Record** |

Locking the record on submission is deliberate: nobody should keep
editing Amount or Stage while Monica is deciding.

## Step 3 — The approval step

| Setting | Value |
|---|---|
| Step name | VP Discount Review |
| Assigned approver | Monica Reyes, specified user (not role-based) |
| Approval actions | Field Update: `Approval_Status__c` = "Approved"; **Unlock Record** |
| Rejection actions | Field Update: `Approval_Status__c` = "Rejected"; **Unlock Record**; Create Task: "Discount rejected — revise and resubmit" assigned to the Opportunity owner |

Monica is named directly as the approver rather than "the submitter's
manager," because the discount threshold applies regardless of which
branch of the role hierarchy the Opportunity owner sits in — a Key
Accounts deal from Priya Nair needs the same review as a New Business
deal from Tom Baptiste.

## Step 4 — Adding the Submit for Approval button

Add the standard **Submit for Approval** button to the Opportunity page
layout (alongside the approval history related list), so a rep can
submit directly from the record instead of needing a separate screen.

## Step 5 — Walking through it end to end

Tom Baptiste proposes a 20% discount on a deal in Negotiation/Review. He
sets Discount Percent to 20 and clicks Submit for Approval. The entry
criteria match, the record locks, and Approval Status flips to Pending
Approval. Monica Reyes gets the approval request, reviews the deal, and
either approves it — unlocking the record with Approval Status set to
Approved, letting Tom move it to Closed Won — or rejects it, which
unlocks the record, sets Approval Status to Rejected, and creates a Task
telling Tom to revise and resubmit.

## Key terms

| Term | Meaning |
|---|---|
| Entry criteria | The condition a record must meet before it can be submitted into an approval process |
| Specified user (approver) | An approval step assigned to one named person, rather than derived from the role hierarchy |
| Lock Record | An approval action that prevents further edits while a request is pending |

## Lab

Build the two new fields, the approval process, its one step, and the
Submit for Approval button. Walk through the Step 5 scenario in your own
org on a test Opportunity, testing both the approve and reject paths.

## Check yourself

- What entry criteria triggers Cascade's discount approval process?
- Why is Monica Reyes named directly as a specified-user approver
  instead of using "the submitter's manager"?
- What happens to the record the moment it's submitted, and why?
