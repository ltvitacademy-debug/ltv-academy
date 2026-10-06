# Lesson 1 — The Salesforce Security Model Overview

**Chapter 1 · The Security Model · Lesson 1 of 24**

## What you'll learn

- The two questions every Salesforce security setting ultimately answers
- The building blocks: profiles, permission sets, field-level security, roles, OWD, sharing rules, manual sharing, and teams
- Why Salesforce layers these mechanisms instead of using one all-powerful setting
- How this chapter and the next map onto that layering, end to end

## Two questions, not one

Every access question in Salesforce reduces to two separate questions, and
mixing them up is the single most common security mistake new admins make:

1. **What can this user *do*, in general?** — Can they see the Account
   object at all? Create one? Edit the Industry field? This is **object and
   field-level access**, and it's controlled by **profiles**,
   **permission sets**, and **field-level security**.
2. **Which *records* can this user see or touch?** — Of the 50,000 Account
   records in the org, which ones does this specific user have in front of
   them? This is **record-level access**, and it's controlled by
   **organization-wide defaults (OWD)**, the **role hierarchy**,
   **sharing rules**, **manual sharing**, and **teams**.

A user can have full Edit access to the Account object (question 1) and
still see zero Account records (question 2), because nothing has granted
them access to any specific one. The two systems are independent, and they
stack: an action only succeeds if *both* checks pass.

![A new user record being created in Setup, with Role and Profile as separate required fields — the first clue that "what a user can do" and "which records they see" are controlled by two different settings.](/courses/salesforce-security-and-access-fundamentals/ch01/01-the-salesforce-security-model-overview/new-user-role-profile.jpg)

## The object/field layer — Chapter 1

Chapter 1 of this course covers the first question in depth: **Object
Permissions and CRUD** (Lesson 2), **Profiles** (Lesson 3), **Permission
Sets** (Lesson 4), **Field-Level Security** (Lesson 5), and how profiles
and permission sets combine into one effective set of access (Lesson 6).

![Object Manager's Object Access tab for Account, showing Create/Read/Edit/Delete/View All/Modify All columns across both Permission Set Groups and Profiles — the real matrix behind every "can this user do X" question.](/courses/salesforce-security-and-access-fundamentals/ch01/01-the-salesforce-security-model-overview/object-access-crud-matrix.jpg)

## The record layer — Chapter 2

Chapter 2 covers the second question: **Organization-Wide Defaults**
(Lesson 7) set the floor, the **Role Hierarchy** (Lesson 8) opens access
upward through management chains, **Sharing Rules** (Lesson 9) extend
access to groups that aren't in the hierarchy, and **Manual Sharing and
Teams** (Lessons 10–11) handle one-off and collaborative exceptions.
**Public Groups and Queues** (Lesson 12) are the reusable containers those
mechanisms share with, and Lesson 13 closes the chapter on two settings
admins misread constantly: **Controlled by Parent** and **Grant Access
Using Hierarchies**.

![The Role Hierarchy setup page in tree view — CEO at the top, each role beneath reporting up — the backbone of every record-level access decision covered in Chapter 2.](/courses/salesforce-security-and-access-fundamentals/ch01/01-the-salesforce-security-model-overview/role-hierarchy-tree.jpg)

## Why layer it at all?

A single permission bit per user, per object, would be unmanageable at real
scale — a 2,000-person sales org would need to hand-configure access
individually or accept that everyone sees everything. Layering lets
Salesforce keep broad, cheap-to-maintain defaults (profiles, OWD) while
still supporting precise, narrow exceptions (permission sets, sharing
rules, manual sharing) without those exceptions multiplying the baseline
configuration.

## Key terms

| Term | Meaning |
|---|---|
| Object/field-level access | What a user can do with an object or field at all — profiles, permission sets, FLS |
| Record-level access | Which specific records a user can see or touch — OWD, roles, sharing rules, manual sharing, teams |
| Effective access | The result after every applicable layer is combined — never just one setting read in isolation |

## Check yourself

A user reports they can't edit a field on an Account record they can
clearly see on screen. Which layer do you check first — object/field
access or record-level access — and why does seeing the record at all
already answer half the question?
