# Lesson 17 — Testing

**Chapter 4 · Analytics and Delivery · Lesson 17 of 20**

## What you'll learn

- How to build a realistic test plan covering security, automation, and
  data quality, not just "click around and see if it breaks"
- How to test each custom profile's visibility against the Lesson 11
  security model
- How to test both Flows from Lesson 12, both success and edge cases
- How to test all four validation rules and the approval process with
  both a failing and a passing case
- How this closes Requirement 10 from Lesson 1's Definition of Done

A build nobody tested isn't finished — it's just unverified. This lesson
turns every earlier chapter's design into a checklist you actually run
through once, end to end.

## Section 1 — Security access tests

| Test | Steps | Expected result |
|---|---|---|
| Sales Rep visibility | Login As Tom Baptiste, view Opportunities list | Sees only his own Opportunities, not Priya Nair's |
| Role rollup | Login As Derek Oyelaran, view Opportunities | Sees Baptiste's and Kessler's records, not Nair's |
| Service sharing rule | Login As a Service Profile user, open a won Opportunity they don't own | Record is visible (Read Only), via the sharing rule |
| Customer Success sharing rule | Login As Angela Wu, open an unrelated Opportunity | Record is visible (Read Only), via the sharing rule |
| Key Accounts sharing rule | Login As Priya Nair, open an Installation Project tied to her Account | Record is visible (Read Only), via the sharing rule |
| Negative test | Login As Tom Baptiste, attempt to open a Service Contract | Blocked — no access, as designed |

## Section 2 — Flow tests

| Test | Steps | Expected result |
|---|---|---|
| Lead auto-assignment | Create a new Lead with any Lead Source | Owner is Jordan Kessler; a follow-up Task exists, due tomorrow |
| Service visit Screen Flow | Launch the Quick Action from a test Installation Project, log a visit | Install Status updates; Equipment Summary has the new note appended |
| Flow with no changes | Launch the Screen Flow, change nothing, click through | No unintended field is blanked or overwritten |

## Section 3 — Validation rule tests

Run each rule as a failing save, then a passing save:

| Rule | Failing case | Passing case |
|---|---|---|
| Loss Reason required | Set Stage to Closed Lost with Loss Reason blank | Add a Loss Reason, save succeeds |
| Decision Maker required | Move Stage to Negotiation/Review with no Primary Contact set | Set Primary Contact to a Contact flagged Decision Maker, save succeeds |
| Install Date not past | Set Target Install Date to yesterday | Set it to a future date, save succeeds |
| Annual Value positive | Set Annual Value to 0 | Set it to a positive number, save succeeds |

## Section 4 — Approval process tests

| Test | Steps | Expected result |
|---|---|---|
| Below threshold | Set Discount Percent to 10, attempt Submit for Approval | Submit button does nothing / entry criteria not met |
| Above threshold, approve | Set Discount Percent to 20, submit, approve as Monica Reyes | Record unlocks, Approval Status = Approved |
| Above threshold, reject | Set Discount Percent to 25, submit, reject as Monica Reyes | Record unlocks, Approval Status = Rejected, Task created |

## Section 5 — Report and dashboard checks

Confirm each Lesson 15 report returns the expected row counts and totals
against the Lesson 16 sample data, and that the Executive Dashboard
refreshes without error when run as Monica Reyes.

## Key terms

| Term | Meaning |
|---|---|
| Login As | A Salesforce admin feature that lets you view the org exactly as a specific user sees it |
| Negative test | A test that confirms access is correctly blocked, not just that access correctly works |
| Test plan | A written, repeatable checklist of what to verify, not an ad hoc click-through |

## Lab

Run every test in Sections 1–5 against your own org and record a pass/fail
for each row. Fix anything that fails before moving to Lesson 18 — a
documented build that doesn't actually work isn't portfolio-ready.

## Check yourself

- Why does Section 1 include a negative test (Tom Baptiste trying to open
  a Service Contract), not just positive-access tests?
- What's the difference between testing a validation rule's failing case
  and its passing case, and why test both?
- Which requirement from Lesson 1's Definition of Done does this lesson
  close?
