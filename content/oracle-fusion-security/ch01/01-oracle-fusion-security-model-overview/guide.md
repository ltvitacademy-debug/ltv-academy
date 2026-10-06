# Oracle Fusion Security Model Overview

Welcome to Oracle Fusion Security, the first course in the Security & Implementation stage of the Oracle Fusion Financials Consultant path. Every course up to this point has shown you how to configure and use a module — General Ledger, Payables, Receivables, Cash Management. This course steps back and asks a different question: how does Oracle Fusion decide who is allowed to do any of that in the first place? This lesson introduces the overall security model you'll spend the rest of the course going deeper on.

## What you'll learn

- Why Oracle Fusion uses role-based access control (RBAC) instead of granting access directly to users
- The four pieces that make up the model: users, roles, privileges, and data security policies
- The difference between "what you can do" and "what data you can do it to" — previewed here, covered in full in Lesson 5
- Where all of this is managed: the Security Console

## Why role-based access control

Oracle Fusion never grants access directly to a person. Every grant goes to a **role**, and a person gets access only by having that role provisioned to their user account. This indirection is deliberate: when a Payables Supervisor named Maria Chen leaves Castellan Robotics Inc. (our fictional example company for this course) and is replaced by a new hire, nobody has to rebuild her access from scratch. The new hire is provisioned the **Accounts Payable Supervisor** job role, and inherits exactly the access that role carries — no more, no less, and no guessing.

This approach is called Role-Based Access Control, or RBAC. It is the foundation of every access decision in Oracle Fusion Applications, not just Financials.

## The four pieces of the model

- **Users** — the actual person (or, less commonly, an integration account) who signs in. A user by itself has no access at all.
- **Roles** — the thing that actually carries access. Oracle Fusion uses four kinds of roles (job, abstract, duty, and data), which you'll learn in Lesson 3.
- **Privileges** — the smallest unit of "permission to do one specific thing," such as "void a payment" or "create a journal entry." Privileges are granted to duty roles, never directly to users.
- **Data security policies** — rules that say which rows of data a role's privileges actually apply to, such as "only invoices in the US Business Unit." Covered in depth starting in Lesson 5.

A simple way to hold the whole model in your head: a **user** is provisioned one or more **roles**; each role carries **privileges** (what you can do) and is paired with **data security policies** (what data you can do it to).

## Function security vs. data security — the preview

Two different questions get answered separately in Oracle Fusion:

1. Can this user open the Create Invoice page at all? That's **function security**.
2. Of the invoices that exist, which ones can this user actually see or act on? That's **data security**.

A user can pass the function security check and fail the data security check at the same time — they can open a page and still see zero rows, because nothing in their data security policies matches. That combination is one of the most common sources of "I can't see anything" support tickets, and you'll learn to diagnose it starting in Chapter 4.

## Where you manage all of this: the Security Console

Almost every security task in this course happens in one tool: the **Security Console**. From there, an administrator can view and compare roles, create or edit custom roles, provision roles to users, review a user's existing role assignments, and simulate what a given role can see using the Security Console's navigator preview. You'll open the Security Console for the first time in Lesson 2.

## Key terms

| Term | Meaning |
|---|---|
| Role-Based Access Control (RBAC) | Access is granted to roles, never directly to users; users get access by being provisioned a role |
| Privilege | The smallest grantable unit of "permission to perform one action" |
| Data security policy | A rule defining which rows of data a role's privileges apply to |
| Security Console | The Oracle Fusion tool used to view, build, and provision roles |

## Recap

Oracle Fusion never grants access to a person directly — it grants access to a role, and provisions that role to a user. Every role carries privileges (what you can do) and is scoped by data security policies (what data you can do it to), and the Security Console is where all of it is managed. Next up, Lesson 2: users and user accounts.
