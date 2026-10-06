# Testing Access as Another User

Chapter 2 has built up users, security contexts, role assignments, and provisioning. This closing lesson covers how you actually verify that all of it worked — without guessing, and without waiting for a user to file a ticket.

## What you'll learn

- The Security Console's Simulate Navigator feature and what it can tell you
- The difference between simulating function security and verifying data security
- Why a dedicated test user account is still the most reliable method for full verification
- A practical verification workflow you can reuse throughout this course

## Simulate Navigator: previewing function security

From the **Roles** tab in the Security Console, you can select a role or a specific user and choose **Simulate Navigator**. This opens a preview of the Navigator menu structure, showing every menu and task entry that could potentially be included, with a padlock icon marking anything not currently authorized. Two useful follow-up views are available from there: **View Roles That Grant Access** (which roles would unlock a given menu item) and **View Privileges Required for Menu** (the specific privileges behind it).

Simulate Navigator is fast and doesn't require logging in as anyone — but it only tells you about **function security**: which pages and menu items a role or user can reach. It cannot show you what data would actually appear once that page opens, because data security (Lesson 5) depends on the runtime context of an actual session.

## Verifying data security: why you still need a real test

Because Simulate Navigator stops at the function security layer, confirming that a user's data access actually looks right — the right invoices, the right ledger balances — still requires either the real user testing it themselves, or an administrator using a dedicated **test user account** provisioned with the identical role and data access assignments, then signing in as that test account to check what actually appears.

Using a test account (rather than quietly borrowing a real employee's credentials, which is never appropriate) is standard implementation practice. At Castellan Robotics Inc., before go-live, the implementation team creates test accounts mirroring each new job-role-plus-data-access combination — a test Accounts Payable Specialist for US Operations, a test General Ledger Accountant for the East Division data access set — and walks through each one's expected screens and data before a single real employee is provisioned.

## A practical verification workflow

1. Use **Simulate Navigator** first, to confirm function security: does the role unlock the pages it should, and nothing more?
2. If that looks right, sign in as a matching **test user account** to confirm data security: do the expected rows (and only the expected rows) appear?
3. If something's wrong, trace back through the chain from Lesson 4 (privilege → duty role → job role) for function security problems, or back through Lessons 6–8 (data access set, business unit, security context) for data security problems.

This two-step habit — simulate first, then test as a real account — will save you from the single most common implementation mistake: assuming a role "looks right" in the Security Console's role hierarchy and never actually confirming what a real session shows.

## Key terms

| Term | Meaning |
|---|---|
| Simulate Navigator | Security Console feature previewing a role/user's menu access (function security only) |
| Test user account | A dedicated account mirroring a real role/data assignment, used to verify actual behavior |

## Recap

Simulate Navigator verifies function security quickly, without logging in as anyone, but it cannot verify data security. A dedicated test user account, provisioned identically to the real assignment being tested, remains the reliable way to confirm what a user will actually see. Chapter 2 is complete. Next up, Chapter 3 and Lesson 11: financials job roles, applying everything from Chapters 1 and 2 to the specific roles used in GL, AP, and AR.
