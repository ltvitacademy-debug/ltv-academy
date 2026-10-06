# Users and User Accounts

Before any role, privilege, or data security policy matters, a user account has to exist. This lesson covers how Oracle Fusion user accounts come to be, what identifying information they carry, and the account lifecycle an administrator manages day to day.

## What you'll learn

- How user accounts are created in Oracle Fusion Cloud
- The link between a person record and their user account
- Account status: active, inactive, and locked
- Where you manage users: the Security Console's Manage Users task

## Where user accounts come from

In most Oracle Fusion Cloud implementations, a user account is created automatically the moment a worker record is created — for example, when HR hires an employee or an implementation team creates a contingent worker record. This is sometimes called **user account auto-creation**, and it is why so much of Fusion security assumes a worker/person record already exists before anyone talks about roles.

Accounts can also be created manually for people who aren't workers in the HR sense — an external auditor, a consultant, or an integration/service account used by an automated job. These are created directly through the **Manage Users** task.

## What a user account carries

A user account at minimum carries:

- **A unique user name** — usually the person's email address or a company-standard ID
- **A link back to a person record**, when one exists (an employee, contingent worker, or contact)
- **A password or single sign-on identity**, depending on how the company authenticates
- **An account status**

It does **not**, by itself, carry any access. A freshly created user account for a new hire at Castellan Robotics Inc. can sign in (once activated) and see essentially nothing until roles are provisioned — that provisioning step is covered starting in Lesson 9.

## Account status: active, inactive, locked

- **Active** — the account can sign in and use whatever access its roles provide.
- **Inactive** — the account exists but cannot sign in, typically because the associated person record has been terminated or the account was deliberately deactivated.
- **Locked** — a temporary state usually caused by repeated failed sign-in attempts; it is not the same as being deactivated and is normally cleared by an administrator or through a self-service password reset.

Deactivating a terminated employee's account promptly matters for more than tidiness: an active account tied to nobody who should still be accessing the system is exactly the kind of gap an auditor will flag in Lesson 14's security reports.

## Where you manage users

The **Manage Users** task, found in the Security Console (and also reachable from certain HR work areas for worker-linked accounts), is where an administrator searches for a user, views their account status, resets a password, or deactivates an account. You'll use this same task alongside role provisioning in Lesson 9.

## A note on the Castellan Robotics example

Throughout this course, worked examples use **Castellan Robotics Inc.**, a fictional mid-size manufacturer, purely to illustrate how these concepts apply in practice. Any resemblance to a real company is coincidental — no statistics or figures about any real organization are used.

## Key terms

| Term | Meaning |
|---|---|
| User account auto-creation | Automatic creation of a user account when a worker record is created |
| Manage Users | The task used to create, search, and maintain user accounts |
| Active / Inactive / Locked | The three account status states |

## Recap

A user account is the starting point for access, but it carries none by itself — most are auto-created from a worker record, some are created manually, and all of them move through active, inactive, and locked states that an administrator manages through Manage Users. Next up, Lesson 3: job roles, abstract roles, and data roles — the things that actually give a user account something to do.
