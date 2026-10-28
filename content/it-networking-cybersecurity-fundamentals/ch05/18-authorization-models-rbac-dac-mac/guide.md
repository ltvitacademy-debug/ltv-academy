# Lesson 18 — Authorization Models: RBAC, DAC, MAC

**Chapter 5 · Authentication, Access Control & Cryptography Basics · Lesson 18 of 32**

## What you'll learn

- The difference between authentication (proving who you are) and authorization
  (deciding what you're allowed to do once you're in)
- Role-Based Access Control (RBAC): permissions tied to a job role, not a person
- Discretionary Access Control (DAC): the resource's owner decides who gets access
- Mandatory Access Control (MAC): centrally enforced labels and clearance levels, used
  where even the owner can't override the rules

## Authentication vs. authorization

Lesson 17 covered authentication — proving you are who you claim to be. Authorization
is the next, separate question: now that the system knows who you are, what are you
actually allowed to do? You can be fully authenticated (correct password, correct MFA
code) and still be authorized to do almost nothing, which is exactly how it should
work for most accounts in most organizations.

## Role-Based Access Control (RBAC)

RBAC assigns permissions to a **role**, and users get permissions by being assigned
to that role — not by granting access to each person individually. A new hire in the
Accounts Payable department is added to the "AP Clerk" role in the company's directory
service (an Active Directory security group, for example, or a Salesforce profile),
and instantly inherits every permission that role carries: access to the AP module,
not HR records, not the source code repository. When that employee changes jobs
internally, an admin swaps their role instead of individually re-auditing every
permission they've ever been given. This is the dominant model in business software —
Windows Active Directory groups, Salesforce profiles and permission sets, and most SaaS
admin consoles are all built around RBAC, because it scales cleanly as an organization
grows.

## Discretionary Access Control (DAC)

DAC puts the decision in the hands of whoever **owns** the resource. The owner of a
file or folder decides who else can read, write, or share it, and can change that
decision at any time, no central authority required. This is exactly how Windows NTFS
file permissions and Google Docs/Drive sharing work: if you create a spreadsheet in
Google Drive, you — the owner — click "Share" and decide who gets view or edit access.
DAC is flexible and fast for everyday collaboration, but it's also why it's considered
the weakest model from a security standpoint: a single careless or compromised owner
can expose a sensitive file to the wrong person, with nothing centrally stopping them.

## Mandatory Access Control (MAC)

MAC removes that discretion entirely. Access is decided centrally, using fixed
**labels** attached to both the resource and the user — classification levels like
Confidential, Secret, and Top Secret, matched against a user's cleared level. Even the
"owner" of a classified document can't just decide to share it with someone whose
clearance doesn't match; the system enforces the rule regardless of what any individual
wants. This is the model used in government and military systems, and in security-
hardened operating system features like SELinux, precisely because it closes the human
judgment gap that DAC leaves wide open.

## Comparing them side by side

A hospital's billing software is a good way to see all three in one place: RBAC
decides that "Billing Clerk" can see invoices but not clinical notes; a DAC-style
shared drive lets one department head choose to share a budget spreadsheet with a
colleague; and if the hospital also handles government research data, a MAC-style
classification system might separately gate access to that data regardless of what
any file owner or role assignment says.

## Key terms

| Term | Meaning |
|---|---|
| Authorization | Deciding what an already-authenticated user is allowed to do |
| RBAC | Permissions tied to a job role, assigned via group/profile membership |
| DAC | The resource's owner decides who gets access, and can change it any time |
| MAC | Centrally enforced labels/clearance levels that even the owner cannot override |

## Check yourself

A company wants an intern's file access to automatically shrink the day they're moved
to a lower-trust department, with no admin having to manually find and revoke each
file. Which model is built for that, and why would DAC alone fall short here?
